/*
 * Static Canvas Embed
 * 把 ![[xxx.canvas]] 嵌入渲染成只读的静态预览（像图片一样），点击可打开原画布。
 * 不依赖核心「画布」插件：直接向 app.embedRegistry 注册 canvas 扩展。
 */
'use strict';

const { Component, Plugin } = require('obsidian');

const PALETTE = {
	'1': 'var(--color-red)',
	'2': 'var(--color-orange)',
	'3': 'var(--color-yellow)',
	'4': 'var(--color-green)',
	'5': 'var(--color-cyan)',
	'6': 'var(--color-purple)',
};

function colorOf(v) {
	if (!v) return '';
	if (PALETTE[v]) return PALETTE[v];
	if (/^#[0-9a-fA-F]{3,8}$/.test(v)) return v;
	return '';
}

/* 节点某边中点的画布坐标 */
function sidePoint(n, side) {
	switch (side) {
		case 'left': return [n.x, n.y + n.height / 2];
		case 'right': return [n.x + n.width, n.y + n.height / 2];
		case 'top': return [n.x + n.width / 2, n.y];
		default: return [n.x + n.width / 2, n.y + n.height];
	}
}

function sideVector(side) {
	switch (side) {
		case 'left': return [-1, 0];
		case 'right': return [1, 0];
		case 'top': return [0, -1];
		default: return [0, 1];
	}
}

/* 仿 Obsidian Canvas 的贝塞尔连线，附带两端方向（供箭头定向） */
function edgeGeom(a, b, fromSide, toSide) {
	const [x1, y1] = sidePoint(a, fromSide);
	const [x2, y2] = sidePoint(b, toSide);
	const off = Math.min(Math.hypot(x2 - x1, y2 - y1) * 0.3, 80);
	const [ax, ay] = sideVector(fromSide);
	const [bx, by] = sideVector(toSide);
	return {
		d: `M ${x1} ${y1} C ${x1 + ax * off} ${y1 + ay * off}, ${x2 + bx * off} ${y2 + by * off}, ${x2} ${y2}`,
		x1, y1, x2, y2,
		out: [ax, ay],
		in: [-bx, -by],
	};
}

/* 以 (px,py) 为尖端、沿单位方向 (dx,dy) 的箭头三角形顶点串 */
function arrowPoints(px, py, dx, dy, len) {
	const wing = len * 0.5;
	const bx = px - dx * len;
	const by = py - dy * len;
	return `${px},${py} ${bx - dy * wing},${by + dx * wing} ${bx + dy * wing},${by - dx * wing}`;
}

class StaticPreview extends Component {
	constructor(plugin, ctx, file, subpath) {
		super();
		this.plugin = plugin;
		this.ctx = ctx;
		this.file = file;
		this.subpath = subpath;
		this.containerEl = ctx.containerEl;
	}

	onload() {
		this.registerEvent(this.plugin.app.vault.on('modify', (f) => {
			if (f === this.file) this.loadFile();
		}));
		this.registerDomEvent(this.containerEl, 'click', () => {
			this.plugin.app.workspace.getLeaf('tab').openFile(this.file);
		});
	}

	/* 嵌入管线（initDOM）通过 loadFile 加载内容 */
	async loadFile() {
		this.containerEl.empty();
		this.containerEl.addClass('sce-root');
		await this.render();
	}

	requestSave() {}

	saveLocalData() {}

	async render() {
		const root = this.containerEl;
		let data = null;
		try {
			data = JSON.parse(await this.plugin.app.vault.cachedRead(this.file));
		} catch (e) {
			data = null;
		}
		const nodes = (data && Array.isArray(data.nodes))
			? data.nodes.filter((n) => n && typeof n.x === 'number' && n.type !== 'undefined')
			: null;
		root.empty();
		if (!nodes || !nodes.length) {
			root.createDiv({ cls: 'sce-error', text: `无法渲染 Canvas：${this.file.basename}` });
			return;
		}

		/* 包围盒（留边距），所有坐标转为百分比，随容器等比缩放 */
		let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
		for (const n of nodes) {
			minX = Math.min(minX, n.x);
			minY = Math.min(minY, n.y);
			maxX = Math.max(maxX, n.x + (n.width || 0));
			maxY = Math.max(maxY, n.y + (n.height || 0));
		}
		const pad = Math.max(20, (maxX - minX) * 0.02);
		minX -= pad; minY -= pad; maxX += pad; maxY += pad;
		const W = maxX - minX, H = maxY - minY;
		const byId = new Map(nodes.map((n) => [n.id, n]));
		const px = (v) => `${(v / W) * 100}%`;
		const py = (v) => `${(v / H) * 100}%`;

		const board = root.createDiv({ cls: 'sce-board' });
		board.setAttribute('style', `aspect-ratio:${W} / ${H};`);

		/* 连线层（在节点下方） */
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('class', 'sce-edges');
		svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
		svg.setAttribute('preserveAspectRatio', 'none');
		board.appendChild(svg);
		for (const e of (data.edges || [])) {
			const a = byId.get(e.fromNode);
			const b = byId.get(e.toNode);
			if (!a || !b) continue;
			const g = edgeGeom(a, b, e.fromSide || 'right', e.toSide || 'left');
			const stroke = colorOf(e.color) || 'var(--background-modifier-border-hover)';
			const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('d', g.d);
			path.setAttribute('fill', 'none');
			path.setAttribute('style', `stroke:${stroke};stroke-width:2px;vector-effect:non-scaling-stroke;`);
			svg.appendChild(path);
			/* 箭头与画布等比缩放（和文字 cqw 一致），常规宽度下屏幕约 8~10px */
			const len = W * 0.013;
			const ends = [
				['toEnd', g.x2, g.y2, g.in],
				['fromEnd', g.x1, g.y1, g.out],
			];
			for (const [key, px, py, dir] of ends) {
				if (e[key] !== 'arrow') continue;
				const head = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
				head.setAttribute('points', arrowPoints(px, py, dir[0], dir[1], len));
				head.setAttribute('style', `fill:${stroke};`);
				svg.appendChild(head);
			}
		}

		/* 节点：group 先画（垫底），其余后画 */
		const draw = (n, isGroup) => {
			const el = board.createDiv({ cls: `sce-node ${isGroup ? 'sce-group' : 'sce-card'}` });
			el.setAttribute('style', [
				`left:${px(n.x - minX)}`,
				`top:${py(n.y - minY)}`,
				`width:${px(n.width || 0)}`,
				`height:${py(n.height || 0)}`,
				`--sce-text-size:${(isGroup ? 12 : 16) / W * 100}cqw`,
			].join(';'));
			const color = colorOf(n.color);
			if (color) el.setAttribute('style', el.getAttribute('style') + `;--sce-color:${color};`);
			if (isGroup) {
				if (n.label) el.createDiv({ cls: 'sce-group-label', text: n.label });
			} else if (n.type === 'text') {
				el.createDiv({ cls: 'sce-text-body', text: n.text || '' });
			} else {
				/* file / link 等类型：显示文件名或链接兜底 */
				el.createDiv({
					cls: 'sce-text-body',
					text: n.type === 'file' ? (n.file || '').split('/').pop() : (n.url || n.text || n.type),
				});
			}
		};
		nodes.filter((n) => n.type === 'group').forEach((n) => draw(n, true));
		nodes.filter((n) => n.type !== 'group').forEach((n) => draw(n, false));
	}
}

class StaticCanvasEmbedPlugin extends Plugin {
	onload() {
		const reg = this.app.embedRegistry;
		this.prevCreator = (reg.embedByExtension && reg.embedByExtension['canvas']) || null;
		try { reg.unregisterExtension('canvas'); } catch (e) { /* 未注册过则忽略 */ }
		reg.registerExtension('canvas', (ctx, file, subpath) => new StaticPreview(this, ctx, file, subpath));
	}

	onunload() {
		const reg = this.app.embedRegistry;
		try { reg.unregisterExtension('canvas'); } catch (e) { /* 忽略 */ }
		if (this.prevCreator) reg.registerExtension('canvas', this.prevCreator);
	}
}

module.exports = StaticCanvasEmbedPlugin;

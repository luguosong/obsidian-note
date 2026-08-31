/*
 * Unified Media Preview
 * 点击普通图片 / Mermaid 图表 / 内嵌 Canvas（static-canvas-embed 渲染的 .sce-board）
 * 弹出全屏灯箱：滚轮以光标为锚点缩放、拖拽平移、双击或按钮重置、Esc 关闭。
 * 悬停图片 / Mermaid / Canvas / 代码块（shiki-highlighter 渲染的 expressive-code）
 * 时右上角浮现按钮条；代码块提供「复制 / 编辑此区块」，不参与灯箱。
 */
'use strict';

const { Plugin, setIcon, MarkdownView, Notice } = require('obsidian');

const MIN_SCALE = 0.05;
const MAX_SCALE = 20;
const ZOOM_STEP = 1.15;

let active = null; // 灯箱单例 { overlay, onKeydown }
let hovbar = null; // 悬停按钮条单例 { root, target }

function closeLightbox() {
	if (!active) return;
	const { overlay, onKeydown } = active;
	window.removeEventListener('keydown', onKeydown, true);
	overlay.remove();
	active = null;
}

function openLightbox(fill) {
	if (active) closeLightbox();
	hideHovbar();
	const state = { scale: 1, tx: 0, ty: 0 };

	const overlay = document.createElement('div');
	overlay.className = 'ump-overlay';
	const stage = overlay.createDiv({ cls: 'ump-stage' });
	const content = stage.createDiv({ cls: 'ump-content' });

	const apply = () => {
		content.style.transform = `translate(${state.tx}px, ${state.ty}px) scale(${state.scale})`;
	};
	const zoomAt = (clientX, clientY, factor) => {
		const r = content.getBoundingClientRect();
		const cx = clientX - (r.left + r.width / 2);
		const cy = clientY - (r.top + r.height / 2);
		const ns = Math.min(MAX_SCALE, Math.max(MIN_SCALE, state.scale * factor));
		const k = ns / state.scale;
		state.tx = cx - (cx - state.tx) * k;
		state.ty = cy - (cy - state.ty) * k;
		state.scale = ns;
		apply();
	};
	const reset = () => {
		state.scale = 1;
		state.tx = 0;
		state.ty = 0;
		apply();
	};

	fill(content);

	/* 滚轮缩放（以光标为锚点） */
	overlay.addEventListener('wheel', (e) => {
		e.preventDefault();
		zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0015));
	}, { passive: false });

	/* 拖拽平移；点在内容之外且未拖动时关闭 */
	let drag = null;
	stage.addEventListener('pointerdown', (e) => {
		if (e.button !== 0) return;
		drag = { x: e.clientX, y: e.clientY, tx: state.tx, ty: state.ty, moved: false };
		try { stage.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
		stage.addClass('ump-dragging');
	});
	stage.addEventListener('pointermove', (e) => {
		if (!drag) return;
		const dx = e.clientX - drag.x;
		const dy = e.clientY - drag.y;
		if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
		state.tx = drag.tx + dx;
		state.ty = drag.ty + dy;
		apply();
	});
	const endDrag = (e) => {
		if (!drag) return;
		const clickOutside = !drag.moved && !(e.target instanceof Element && e.target.closest('.ump-content'));
		try { stage.releasePointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
		stage.removeClass('ump-dragging');
		drag = null;
		if (clickOutside) closeLightbox();
	};
	stage.addEventListener('pointerup', endDrag);
	stage.addEventListener('pointercancel', endDrag);

	/* 工具栏 */
	const toolbar = overlay.createDiv({ cls: 'ump-toolbar' });
	const btn = (icon, tip, fn) => {
		const b = toolbar.createEl('button', { cls: 'ump-btn' });
		b.setAttribute('aria-label', tip);
		setIcon(b, icon);
		b.addEventListener('click', (e) => {
			e.stopPropagation();
			fn();
		});
		return b;
	};
	btn('zoom-in', '放大', () => zoomAt(window.innerWidth / 2, window.innerHeight / 2, ZOOM_STEP));
	btn('zoom-out', '缩小', () => zoomAt(window.innerWidth / 2, window.innerHeight / 2, 1 / ZOOM_STEP));
	btn('maximize', '重置', reset);
	btn('x', '关闭（Esc）', closeLightbox);

	/* 双击重置 */
	stage.addEventListener('dblclick', (e) => {
		e.preventDefault();
		reset();
	});

	/* 键盘：Esc 关闭，+/- 缩放，0 重置，方向键平移 */
	const onKeydown = (e) => {
		if (e.key === 'Escape') closeLightbox();
		else if (e.key === '+' || e.key === '=') zoomAt(window.innerWidth / 2, window.innerHeight / 2, ZOOM_STEP);
		else if (e.key === '-') zoomAt(window.innerWidth / 2, window.innerHeight / 2, 1 / ZOOM_STEP);
		else if (e.key === '0') reset();
		else if (e.key.startsWith('Arrow')) {
			const step = 60;
			if (e.key === 'ArrowLeft') state.tx += step;
			if (e.key === 'ArrowRight') state.tx -= step;
			if (e.key === 'ArrowUp') state.ty += step;
			if (e.key === 'ArrowDown') state.ty -= step;
			apply();
		}
	};
	window.addEventListener('keydown', onKeydown, true);

	document.body.appendChild(overlay);
	active = { overlay, onKeydown };
}

function nodeSize(el) {
	const r = el.getBoundingClientRect();
	return { w: Math.max(1, r.width), h: Math.max(1, r.height) };
}

/* ---------- 三种媒体的灯箱填充 ---------- */

function fillBoard(content, board) {
	const { w } = nodeSize(board);
	const clone = board.cloneNode(true);
	clone.style.width = `${w}px`;
	clone.style.cursor = 'default';
	content.appendChild(clone);
}

function fillMermaid(content, mermaid) {
	const svg = mermaid.querySelector('svg');
	if (!svg) return;
	const { w, h } = nodeSize(svg);
	/* 连同 .mermaid 包装一起克隆，保留主题适配规则的作用域：
	   暗色主题下 Obsidian 用 .theme-dark .mermaid > svg 反相滤镜配暗色 */
	const clone = mermaid.cloneNode(true);
	const csvg = clone.querySelector('svg');
	csvg.style.width = `${w}px`;
	csvg.style.height = `${h}px`;
	csvg.style.maxWidth = 'none';
	content.appendChild(clone);
}

function fillImg(content, img) {
	const el = content.createEl('img', { cls: 'ump-img' });
	el.src = img.src;
	el.alt = img.alt || '';
	el.draggable = false;
}

const FILLS = {
	canvas: fillBoard,
	mermaid: fillMermaid,
	img: fillImg,
};

/* 识别点击/悬停目标属于哪种媒体；仅限笔记正文区 */
function mediaAt(t) {
	if (!t.closest('.markdown-source-view, .markdown-preview-view, .cm-editor')) return null;
	const board = t.closest('.sce-board');
	if (board) return { type: 'canvas', el: board };
	const mermaid = t.closest('.mermaid');
	if (mermaid && mermaid.querySelector('svg')) return { type: 'mermaid', el: mermaid };
	const img = t.closest('img');
	if (img && img.src && !img.closest('a')) return { type: 'img', el: img };
	/* 代码块（shiki 渲染的 expressive-code），阅读视图与 live preview 均接管 */
	const fig = t.closest('.expressive-code figure.frame');
	if (fig) return { type: 'code', el: fig };
	return null;
}

/* ---------- 悬停按钮条（放大 / 编辑） ---------- */

function hideHovbar() {
	if (!hovbar) return;
	hovbar.root.remove();
	hovbar = null;
}

function showHovbar(m) {
	if (hovbar && hovbar.target === m.el) return;
	hideHovbar();
	const root = document.createElement('div');
	root.className = 'ump-hovbar';
	const r = m.el.getBoundingClientRect();
	root.style.top = `${Math.round(r.top + 6)}px`;
	root.style.right = `${Math.round(window.innerWidth - r.right + 6)}px`;
	const mk = (icon, fallback, tip, fn) => {
		const b = root.createEl('button', { cls: 'ump-btn' });
		b.setAttribute('aria-label', tip);
		setIcon(b, icon);
		if (!b.querySelector('svg')) setIcon(b, fallback);
		b.addEventListener('click', (e) => {
			e.stopPropagation();
			fn(b);
		});
		return b;
	};
	if (m.type === 'code') {
		mk('copy', 'copy', '复制代码', (b) => copyCodeBlock(m, b));
		mk('pencil', 'edit-3', '编辑此区块', () => {
			hideHovbar();
			editMedia(m);
		});
	} else {
		mk('scan', 'maximize', '放大查看', () => {
			openLightbox((content) => FILLS[m.type](content, m.el));
		});
		if (m.type === 'canvas') {
			/* Canvas 有两种编辑逻辑：改笔记里的嵌入语法，或跳转到 .canvas 原件 */
			mk('pencil', 'edit-3', '编辑嵌入', () => {
				hideHovbar();
				editMedia(m);
			});
			mk('external-link', 'link', '打开原件', () => {
				hideHovbar();
				openOriginal(m);
			});
		} else {
			mk('pencil', 'edit-3', m.type === 'mermaid' ? '编辑源码' : '编辑嵌入', () => {
				hideHovbar();
				editMedia(m);
			});
		}
	}
	document.body.appendChild(root);
	hovbar = { root, target: m.el };
}

/* 代码块复制：直接写 pre 的文本（对勾反馈即真实复制结果），
   不依赖 shiki 内部 DOM 结构 */
function copyCodeBlock(m, btn) {
	const pre = m.el.querySelector('pre');
	copyWithFeedback(pre ? pre.textContent : '', btn);
}

/* ---------- 「编辑此区块」：定位并选中编辑器中的区块源码 ---------- */

function basenameOf(src) {
	const raw = (src || '').split('?')[0].split('/').pop() || '';
	try {
		return decodeURIComponent(raw);
	} catch (e) {
		return raw;
	}
}

function escapeRe(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* 文本偏移 → 编辑器行/列 */
function toLineCh(text, index) {
	const before = text.slice(0, index);
	const nl = before.lastIndexOf('\n');
	return { line: nl < 0 ? 0 : before.split('\n').length - 1, ch: index - (nl + 1) };
}

function embedRe(name) {
	const esc = escapeRe(name);
	return new RegExp(
		`!\\[\\[[^\\]\\n]*${esc}[^\\]\\n]*\\]\\]|!\\[[^\\]\\n]*\\]\\([^)\\n]*${esc}[^)\\n]*\\)`,
		'g',
	);
}

/* 嵌入语法在源码里的检索名：图片取文件名，canvas 取嵌入 src */
function embedNameFor(m) {
	if (m.type === 'img') return basenameOf(m.el.src);
	if (m.type === 'canvas') {
		const embed = m.el.closest('.internal-embed');
		return embed ? embed.getAttribute('src') || '' : '';
	}
	return null;
}

/* 跳转打开媒体原件（目前仅 canvas：打开 .canvas 画布文件） */
function openOriginal(m) {
	const name = embedNameFor(m);
	if (name) {
		const af = app.workspace.getActiveFile();
		app.workspace.openLinkText(name, af ? af.path : '');
	}
}

/* 从悬停元素反查其所在的 MarkdownView——笔记不必是当前活动叶 */
function viewFromElement(el) {
	let found = null;
	app.workspace.iterateAllLeaves((leaf) => {
		if (!found && leaf.view && leaf.view.containerEl && leaf.view.containerEl.contains(el)) found = leaf.view;
	});
	return found instanceof MarkdownView ? found : null;
}

function editMedia(m) {
	const view = viewFromElement(m.el) || app.workspace.getActiveViewOfType(MarkdownView);
	if (!view || !view.editor) return;

	let sel = null;
	/* live preview：经 CM6 posAtDOM 从 DOM 精确定位 */
	const cm = view.editor.cm;
	const cmHost = m.el.closest('.cm-editor');
	if (cm && cmHost && cmHost === cm.dom) {
		try {
			sel = locateByCM(cm, m);
		} catch (e) { /* 转文本检索兜底 */ }
	}
	/* 兜底：在编辑器全文中检索源码 */
	if (!sel) sel = locateByText(view.editor.getValue(), m);
	if (!sel) {
		new Notice('未在当前笔记中找到该区块的源码（可能是转嵌内容）');
		return;
	}

	const applySelTo = (ed) => {
		if (!ed) return;
		ed.setSelection(sel.from, sel.to);
		ed.scrollIntoView({ from: sel.from, to: sel.to }, true);
		ed.focus();
	};
	/* 阅读模式切回源码：view.setMode 在部分环境会 reject
	   （实测 TypeError: getFoldInfo is not a function），走 leaf.setViewState；
	   切换是异步重建，选中要在完成后对新编辑器做，否则会丢 */
	let mode = null;
	try { mode = view.getMode(); } catch (e) { /* 部分实例 getMode 返回空 */ }
	if (!mode) {
		try { mode = view.getState().mode; } catch (e) { /* 同上 */ }
	}
	if (mode === 'preview') {
		const leaf = view.leaf;
		const vs = leaf.getViewState();
		const target = { type: 'markdown', state: Object.assign({}, vs.state, { mode: 'source' }), active: true };
		Promise.resolve(leaf.setViewState(target))
			.catch(() => { /* 切换失败也尝试选中旧编辑器 */ })
			.finally(() => {
				const mv = leaf.view;
				applySelTo(mv && mv.editor ? mv.editor : view.editor);
			});
	} else {
		applySelTo(view.editor);
	}
}

function locateByCM(cm, m) {
	const anchor = m.el.closest('.cm-embed-block') || m.el;
	const pos = cm.posAtDOM(anchor, 0);
	const doc = cm.state.doc;
	if (m.type === 'mermaid' || m.type === 'code') {
		/* 从小部件位置回退到起始围栏行，再走到闭合围栏（mermaid 与普通代码块同理） */
		let start = doc.lineAt(pos).number;
		while (start > 1 && !doc.line(start).text.trimStart().startsWith('```')) start--;
		let end = start + 1;
		while (end <= doc.lines && !doc.line(end).text.trimStart().startsWith('```')) end++;
		if (end > doc.lines) return null;
		const l1 = doc.line(start);
		const l2 = doc.line(end);
		return { from: { line: l1.number - 1, ch: 0 }, to: { line: l2.number - 1, ch: l2.text.length } };
	}
	/* 图片/Canvas 嵌入：定位所在行，再选中行内的嵌入语法 */
	const name = embedNameFor(m);
	const l = doc.lineAt(pos);
	let pick = null;
	if (name) {
		const mm = l.text.match(embedRe(name));
		if (mm && mm.index >= 0) pick = { index: mm.index, length: mm[0].length };
	}
	if (!pick) pick = { index: 0, length: l.text.length };
	return { from: { line: l.number - 1, ch: pick.index }, to: { line: l.number - 1, ch: pick.index + pick.length } };
}

function locateByText(text, m) {
	const scope = m.el.closest('.markdown-preview-view') || m.el.closest('.cm-editor');
	if (m.type === 'mermaid') {
		/* 渲染序第 N 张 ↔ 源码第 N 个 mermaid 围栏（阅读模式全量渲染，序号可靠） */
		let idx = -1;
		if (scope) idx = Array.prototype.indexOf.call(scope.querySelectorAll('.mermaid'), m.el);
		const re = /```mermaid[^\n]*\n[\s\S]*?```/g;
		const matches = Array.from(text.matchAll(re));
		const pick = idx >= 0 ? matches[idx] : matches[0];
		if (!pick) return null;
		return { from: toLineCh(text, pick.index), to: toLineCh(text, pick.index + pick[0].length) };
	}
	/* 代码块：按块文本内容寻址匹配源码围栏；不数 figure 序号，
	   避开 mermaid 等不经 EC 渲染的围栏造成的序号错位；
	   同文本块重复出现时，用渲染序中同文本块的出现次数对齐 */
	const pre = m.el.querySelector('pre');
	const body = pre ? pre.textContent.replace(/\n+$/, '') : '';
	if (!body) return null;
	const cand = Array.from(text.matchAll(/```[^\n]*\n([\s\S]*?)```/g))
		.filter((mm) => (mm[1] || '').replace(/\n+$/, '') === body);
	if (!cand.length) return null;
	let dup = 0;
	if (scope) {
		for (const f of scope.querySelectorAll('.expressive-code figure.frame')) {
			if (f === m.el) break;
			const t = (f.querySelector('pre') || {}).textContent || '';
			if (t.replace(/\n+$/, '') === body) dup++;
		}
	}
	const target = cand[Math.min(dup, cand.length - 1)];
	return { from: toLineCh(text, target.index), to: toLineCh(text, target.index + target[0].length) };
	/* 嵌入语法：按同名嵌入在视图内的先后次数对齐到第 k 处出现 */
	const name = embedNameFor(m);
	if (!name) return null;
	const re = embedRe(name);
	const found = [];
	let mm;
	while ((mm = re.exec(text))) found.push(mm);
	if (!found.length) return null;
	let k = 0;
	if (scope) {
		if (m.type === 'img') {
			for (const it of scope.querySelectorAll('img')) {
				if (it === m.el) break;
				if (basenameOf(it.src) === name) k++;
			}
		} else {
			for (const e of scope.querySelectorAll('.internal-embed')) {
				if (e.contains(m.el)) break;
				if ((e.getAttribute('src') || '') === name) k++;
			}
		}
	}
	const pick = found[Math.min(k, found.length - 1)];
	return { from: toLineCh(text, pick.index), to: toLineCh(text, pick.index + pick[0].length) };
}

/* ---------- 嵌入块顶部文件路径标头（仿代码块嵌入的路径条） ---------- */

const HEADER_CLS = 'ump-file-header';

/* 解析嵌入的完整库内路径（如 附件/xxx.png）；解析失败回退为链接原文 */
function resolveEmbedPath(embed) {
	const src = (embed.getAttribute('src') || '').split('|')[0].split('#')[0];
	if (!src) return '';
	let sourcePath = '';
	app.workspace.iterateAllLeaves((leaf) => {
		if (!sourcePath && leaf.view && leaf.view.file && leaf.view.containerEl && leaf.view.containerEl.contains(embed)) {
			sourcePath = leaf.view.file.path;
		}
	});
	const file = app.metadataCache.getFirstLinkpathDest(src, sourcePath);
	return file ? file.path : src;
}

/* 剪贴板写入失败（如失焦限制）时的兜底 */
function fallbackCopy(text, done) {
	const ta = document.createElement('textarea');
	ta.value = text;
	ta.style.position = 'fixed';
	ta.style.opacity = '0';
	document.body.appendChild(ta);
	ta.select();
	try { document.execCommand('copy'); } catch (e) { /* 忽略 */ }
	ta.remove();
	done();
}

/* 写剪贴板并在按钮上做对勾反馈；写入失败（如失焦限制）走 fallbackCopy 兜底。
   文件路径条复制按钮与代码块复制按钮共用 */
function copyWithFeedback(text, btn) {
	const done = () => {
		setIcon(btn, 'check');
		btn.addClass('ump-copied');
		setTimeout(() => {
			setIcon(btn, 'copy');
			btn.removeClass('ump-copied');
		}, 1200);
	};
	try {
		navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
	} catch (e) {
		fallbackCopy(text, done);
	}
}

function buildHeader(embed) {
	const bar = document.createElement('div');
	bar.className = HEADER_CLS;
	const path = resolveEmbedPath(embed);
	bar.dataset.path = path;
	const text = bar.createDiv({ cls: 'ump-file-header-text' });
	text.textContent = path;
	const btn = bar.createEl('button', { cls: 'ump-file-header-copy' });
	btn.setAttribute('aria-label', '复制文件路径');
	setIcon(btn, 'copy');
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		copyWithFeedback(bar.dataset.path || '', btn);
	});
	return bar;
}

function decorateEmbeds(scope) {
	scope.querySelectorAll('.internal-embed').forEach((embed) => {
		if (!embed.classList.contains('image-embed') && !embed.classList.contains('sce-root')) return;
		let hasHeader = false;
		for (const child of embed.children) {
			if (child.classList.contains(HEADER_CLS)) { hasHeader = true; break; }
		}
		if (hasHeader) return;
		embed.prepend(buildHeader(embed));
	});
}

let embedObserver = null;
let decorateScheduled = false;

function scheduleDecorate() {
	if (decorateScheduled) return;
	decorateScheduled = true;
	requestAnimationFrame(() => {
		decorateScheduled = false;
		decorateEmbeds(document.body);
	});
}

class UnifiedMediaPreviewPlugin extends Plugin {
	onload() {
		/* 点击媒体 → 灯箱（放大查看按钮也复用此路径）；代码块不参与灯箱 */
		this.registerDomEvent(document, 'click', (evt) => {
			if (active) return;
			if (evt.button !== 0 || evt.ctrlKey || evt.metaKey || evt.shiftKey || evt.altKey) return;
			const t = evt.target;
			if (!(t instanceof Element) || t.closest('.ump-overlay') || t.closest('.ump-hovbar')) return;
			const m = mediaAt(t);
			if (!m || m.type === 'code') return;
			evt.preventDefault();
			evt.stopPropagation();
			openLightbox((content) => FILLS[m.type](content, m.el));
		}, { capture: true });

		/* 悬停媒体 → 右上角浮现按钮条 */
		this.registerDomEvent(document, 'mousemove', (evt) => {
			if (active) return;
			const t = evt.target;
			if (!(t instanceof Element)) return;
			if (hovbar && (hovbar.root.contains(t) || hovbar.target.contains(t))) return;
			const m = mediaAt(t);
			if (m) showHovbar(m);
			else hideHovbar();
		});

		/* 滚动/改窗口后按钮位置失准，直接隐藏 */
		this.registerDomEvent(document, 'scroll', () => hideHovbar(), { capture: true });
		this.registerDomEvent(window, 'resize', () => hideHovbar());

		/* 图片 / canvas 嵌入顶部展示文件路径（live preview 小部件动态挂载，用观察器跟进） */
		embedObserver = new MutationObserver(scheduleDecorate);
		embedObserver.observe(document.body, { childList: true, subtree: true });
		scheduleDecorate();
	}

	onunload() {
		closeLightbox();
		hideHovbar();
		if (embedObserver) {
			embedObserver.disconnect();
			embedObserver = null;
		}
		document.querySelectorAll('.' + HEADER_CLS).forEach((el) => el.remove());
	}
}

module.exports = UnifiedMediaPreviewPlugin;

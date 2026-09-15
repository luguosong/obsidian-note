# mattpocock-skills 更新日志 — 更新方法

- 笔记：`网页裁剪/mattpocock-skills 更新日志.md`
- 上游：https://raw.githubusercontent.com/mattpocock/skills/refs/heads/main/CHANGELOG.md

本笔记是上游 CHANGELOG.md 的全量中文翻译，只做**增量翻译**：翻译本地尚未收录的版本段落，插入正文顶部；已翻译的旧版本段落一律不动。

## 步骤

1. **定位截止版本**：读笔记 `# mattpocock-skills` 标题后的第一个 `## x.y.z` 版本标题，即已翻译的截止版本。这是权威依据——顶部维护说明 callout 里的「最新版本号」应与之一致，不一致时以正文为准并顺手改正 callout。→ 完成标准：拿到准确的截止版本号。

2. **拉取上游**：

   ```bash
   curl -sL "https://raw.githubusercontent.com/mattpocock/skills/refs/heads/main/CHANGELOG.md" -o /tmp/mp_new.md
   ```

   → 完成标准：文件首行为 `# mattpocock-skills`，其后是 `## x.y.z` 版本标题（若拿到的是 404 提示页则判失败，报告并中止本篇）。

3. **截取增量**：取上游从第一个版本标题起、到截止版本标题（不含）为止的全部内容。以「截止版本标题出现与否」为界，不做号段推断；若截止版本标题在上游找不到，改为逐版本与本地已有版本标题比对，仅取本地没有的版本。无增量时报告「已是最新（x.y.z）」，本篇结束。→ 完成标准：拿到待翻译原文，其中不含任何本地已有版本。

4. **翻译**：按 defuddle skill 的「学术翻译规范」（`.zcode/skills/defuddle/SKILL.md`）翻译，并遵守本笔记的既有约定：

   - 变更类型小节标题照译并保留英文原文：`### Patch Changes` → `### 补丁变更 (Patch Changes)`、`### Minor Changes` → `### 次要变更 (Minor Changes)`、`### Major Changes` → `### 主要变更 (Major Changes)`。
   - 条目前缀照译：`Thanks [@mattpocock](…)！ - ` → `感谢 [@mattpocock](…)！ —— `；PR 号与 commit 哈希的 Markdown 链接原样保留；`**Breaking change:**` 译作 **破坏性变更：**。
   - 术语采用「中文(English)」格式，译法与笔记既有译文保持一致，拿不准时先 grep 笔记里该术语的既有译法。既有译法：智能体(agent)、技能(skill)、子智能体、框架(harness)、用户调用(user-invoked)、模型调用(model-invoked)、盘问(grill)、工单(ticket)、决策工单(decision ticket)、阻塞边(blocking edges)、前沿(frontier)、战争迷雾(fog of war)、引导词(leading word)、上下文指针(context pointer)、单一真理源(single source of truth)、渐进披露(progressive disclosure)、曳光弹(tracer bullet)、接缝(seam)、宽面重构(wide refactor)、扩展-收缩(expand–contract)、阶段(phase)、晋升桶(promoted bucket)、第一手资料(primary source)、分诊标签(triage labels)。
   - 反引号内的技能名、文件路径、设置键、命令、环境变量一律原样保留；版本标题 `## x.y.z` 不译。
   - 嵌套列表用 Tab 缩进（每层一个 Tab），与既有段落一致。
   → 完成标准：增量全部译完，格式与既有版本段落一致（`## 版本号` + `### 变更类型` + 无序列表）。

5. **插入**：将译文插入笔记 `# mattpocock-skills` 标题之后、原第一个版本标题之前，保持段落间空行。→ 完成标准：新版本段落在最前，原有内容一字未动。

6. **标注日期**：每个新增版本标题和每条新增记录都标注日期，来源是上游 git 仓库（北京时间 UTC+8，取 committer date）：

   ```bash
   git clone --bare https://github.com/mattpocock/skills.git /tmp/mp_skills.git  # 已存在则跳过
   git --git-dir=<mp_skills.git 绝对路径> log -1 --format=%cI v<x.y.z>   # 版本标题日期（tag）
   git --git-dir=<mp_skills.git 绝对路径> log -1 --format=%cI <哈希>     # 条目日期（取条目里 [`哈希`] 的值）
   ```

   - 版本标题格式 `## x.y.z（YYYY-MM-DD）`；条目日期追加在该条**首行行尾**，格式 `（YYYY-MM-DD）`；嵌套子条目与续行段落不标。
   - tag 尚未打时，该版本日期取其内最新条目的 commit 日期。
   - 注意：从 Python/脚本调 git 时 `--git-dir` 必须用 Windows 绝对路径（如 `C:/Users/.../mp_skills.git`），`/tmp/...` 只在 Git Bash 内有效。
   → 完成标准：每个新增版本标题与每条新增记录首行行尾均带日期，日期与版本顺序一致（越往下越早）。

7. **刷新维护说明**：callout 中「最新版本号」改为上游最新版本号，「翻译时间」改为当天日期（`date +%F` 取）。→ 完成标准：callout 的版本号与正文首个版本标题一致。

## 验证

- `# mattpocock-skills` 后第一个版本标题 == callout 最新版本号 == 上游最新版本。
- 插入点上下衔接处空行正确；全文无重复版本标题（对每个新版本号 `grep -c "^## <版本>"` 计数为 1）。
- 抽查 1-2 条新译文：反引号内容未被翻译，PR/commit 链接完整，术语与既有译文一致，嵌套列表为 Tab 缩进。
- 每个新增版本标题与每条新增记录首行行尾均带日期；嵌套子条目行首为 Tab 者无日期（`grep -cP '^\t+.*（20\d\d-\d\d-\d\d）$'` 计数为 0）。

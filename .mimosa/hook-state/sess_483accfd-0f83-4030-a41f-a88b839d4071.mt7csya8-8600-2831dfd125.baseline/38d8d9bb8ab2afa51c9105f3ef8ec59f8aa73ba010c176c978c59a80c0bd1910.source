---
name: doc-update
description: 一键更新登记在册的持续跟踪型笔记（如 Claude Code 更新日志的增量翻译）。手动调用，不自动触发。
disable-model-invocation: true
---

# 持续更新笔记

逐篇更新「跟踪上游来源、需要定期增量维护」的笔记。每篇笔记登记在下方**更新登记表**中，各自的更新方法在 `notes/` 下独立成文——更新一篇笔记时只读它自己的方法文件。

## 流程

1. **确定范围**：用户在参数中点名某篇笔记时只更新该篇，未点名则更新登记表全部。→ 完成标准：本次要更新的笔记清单明确。
2. **逐篇执行**：按登记表顺序，读该笔记对应的方法文件，完整执行其中全部步骤；一篇更新完毕并通过其验证步骤后，才开始下一篇。→ 完成标准：每篇笔记要么落盘了更新，要么确认「已是最新」。
3. **汇总报告**：全部处理完后逐篇报告结果——更新到的版本/日期、已是最新、或失败原因。→ 完成标准：本次范围内登记表的每一行都有明确结论。

## 更新登记表

| 笔记 | 更新方法 |
|---|---|
| `网页裁剪/Claude Code 更新日志.md` | [notes/claude-code-changelog.md](notes/claude-code-changelog.md) |
| `网页裁剪/mattpocock-skills 更新日志.md` | [notes/mattpocock-skills-changelog.md](notes/mattpocock-skills-changelog.md) |

## 登记新笔记

用户要求把某篇笔记纳入持续更新时：在登记表追加一行，并在 `notes/` 下新建方法文件，写清五件事——**上游来源**、**截止锚点**（从哪里判断增量）、**增量合并规则**（翻译规范、插入位置）、**需同步刷新的元数据**、**验证步骤**。

本 skill 的权威副本在 `.claude/skills/doc-update/`（Claude Code 读取）；`.zcode/skills/doc-update` 是指向它的目录联接（junction），ZCode 经联接读取同一份文件——新增或修改任何文件只写 `.claude` 副本，无需另行同步。git 会跟随联接把 `.zcode` 侧文件一并入库，属正常现象，不要当作重复清理。

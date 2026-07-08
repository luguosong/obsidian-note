# superpowers 触发机制 — Resources

> 一手源优先。superpowers 的"官方文档"就是它自己的 SKILL.md——不信参数记忆，只信这些文件 + 实测行为。

## Knowledge

- **Skill: `using-superpowers` (SKILL.md)**
  路径：`~/.claude/plugins/cache/claude-plugins-official/superpowers/6.1.0/skills/using-superpowers/SKILL.md`
  superpowers 的「调度总则 / bootloader」。核心三条：① 进入任何回复（含澄清提问）前先查 skill；② 1% 可能相关就 invoke；③ process skill 先于 implementation skill。附 Red Flags 表（你在合理化跳过 skill 的 12 种念头）。**触发机制课的一手源，必读。**
  （plugin cache 路径含版本号 `6.1.0`，升级后会变；若失效用 `find ~/.claude/plugins/cache -ipath '*superpowers*using-superpowers*SKILL.md'` 重定位。）

- 各 skill 的 `description` frontmatter（第 1 课有汇总，第 2 课有全图）
  **description 就是触发契约**——每个 superpowers 描述都以 "Use when…" 开头。匹配发生在 description 文本上，不在 skill 名字上。这是"为什么该上场没上场"的诊断起点。
  一行抓全部 description：`sed -n '/^---/,/^---/p' ~/.claude/plugins/cache/claude-plugins-official/superpowers/*/skills/*/SKILL.md | grep -E '^(name|description):'`

- [Claude Code Skills 官方文档](https://docs.claude.com/en/docs/claude-code/skills)
  skill 的发现与匹配由 harness 完成：按 description 对当前上下文做相关性判断后 surface，模型再用 Skill 工具 invoke。`using-superpowers` 因 description 是 "Use when starting any conversation" 而在每次会话开头被注入 system prompt——这就是它"常驻"的原因。**URL 待人工复核。**

## Wisdom (Communities)

- 待补：superpowers / Claude Code 用户社区（Anthropic 官方 Discord、GitHub `obra/superpowers` discussions）。用户如不愿加入社区，在此注明。

## Gaps

- **缺：** Claude Code harness 内部"description → 相关性 → surface"的确切算法未公开。本工作区以 `using-superpowers` 的行为描述 + 实测为准，不臆测闭源细节。
- **待核实：** 上方官方文档 URL 需人工点开确认（不要凭记忆当真）。

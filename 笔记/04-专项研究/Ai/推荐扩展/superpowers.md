---
分类:
  - "[[推荐扩展]]"
关联笔记:
描述:
排序:
分组:
创建时间: 2026-06-25 09:29
修改时间: 星期四 25日 六月 2026 09:29:44
---
# superpowers

> Claude Code **superpowers** 插件（`claude-plugins-official/superpowers@6.0.3`）的 skill 速查表。
> 核心规则：**只要某 skill 有 1% 可能适用，就必须在回复前先调用它**（含澄清提问）；优先级：用户指令 > superpowers skill > 系统默认。

**入口与编排**

| Skill | 何时触发 |
|---|---|
| `using-superpowers` | 每次对话开始时——建立如何发现与使用 skill 的机制，要求在任何回复（含澄清提问）前先调用相关 skill |
| `using-git-worktrees` | 开始需要与当前工作区隔离的功能开发，或执行实现计划前——确保存在隔离工作区（原生工具或 git worktree 兜底） |
| `dispatching-parallel-agents` | 面对 2+ 个可在无共享状态、无顺序依赖下并行处理的独立任务时 |

**设计与规划**

| Skill | 何时触发 |
|---|---|
| `brainstorming` | **任何创意工作前必须用**：创建功能、构建组件、新增能力或修改行为；在实现前探索用户意图、需求与设计 |
| `writing-plans` | 有了 spec 或需求、要做多步骤任务时，在动代码前——编写实现计划 |

**执行与实现**

| Skill | 何时触发 |
|---|---|
| `executing-plans` | 有了写好的实现计划，要在**带审查检查点的独立会话**中执行时 |
| `subagent-driven-development` | 在**当前会话**中执行包含独立任务的实现计划时 |
| `test-driven-development` | 实现任何功能或修复 bug 时，在写实现代码前——先写测试（TDD） |

**调试与验证**

| Skill | 何时触发 |
|---|---|
| `systematic-debugging` | 遇到任何 bug、测试失败或非预期行为时，**在提出修复方案前**——系统化定位根因 |
| `verification-before-completion` | 即将声称工作「完成/修复/通过」、在提交或建 PR 前——必须运行验证命令并确认输出；**始终先证据后断言** |

**代码审查**

| Skill | 何时触发 |
|---|---|
| `requesting-code-review` | 完成任务、实现重大功能或合并前——验证工作满足需求 |
| `receiving-code-review` | 收到代码审查反馈、在采纳建议前；尤其当反馈含糊或技术存疑时——要求技术严谨与验证，而非表演式认同或盲目实现 |

**收尾与沉淀**

| Skill | 何时触发 |
|---|---|
| `finishing-a-development-branch` | 实现完成、所有测试通过，需要决定如何整合工作时——给出合并 / PR / 清理的结构化选项 |
| `writing-skills` | 创建新 skill、编辑现有 skill 或部署前验证 skill 时 |

---

> **调用方式**：Claude Code 中通过 `Skill` 工具调用，或输入 `/superpowers:<skill名>`（如 `/superpowers:brainstorming`）。
> **Skill 类型**：**Rigid**（`test-driven-development`、`systematic-debugging`——严格按步骤、不可简化）/ **Flexible**（其余——按上下文调整）。skill 本体会标明属于哪类。
> **来源**：`~/.claude/plugins/cache/claude-plugins-official/superpowers/6.0.3/skills/<name>/SKILL.md`

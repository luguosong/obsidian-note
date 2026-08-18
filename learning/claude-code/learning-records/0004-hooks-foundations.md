# 第 4 课：Hooks 基础（生命周期自动化）

用户在学完安装/配置、核心工作流、安装原理后，主动要求「系统性学习 hook」。据此新增第 4 课，聚焦 hooks 的**核心心智模型**而非罗列全部事件：确定性控制（vs CLAUDE.md 建议）→ 生命周期三档节奏 → 三层配置骨架 → stdin/stdout 通信协议 → 决策能力分类 → 安全。hooks 占据 NOTES.md 课程顺序第 2 位，但因用户按兴趣点插入，实际编号顺延为 0004（sub-agents 顺延到更后）。

## Evidence
- 用户原话：「learning/claude-code 继续学习，这次系统性学习一下 hook」。
- 讲解基于**抓取的官方文档原文**（`docs.anthropic.com/.../hooks` 参考手册，约 3400 行 markdown），非参数化记忆——事件目录、matcher 规则、退出码语义、JSON 决策字段、Windows PowerShell 写法均逐条核对。
- 关键事实锚点（后续引用无需重复论证）：①事件分「每会话/每轮/每工具调用」三档节奏；②配置永远三层嵌套（事件→matcher→handler）；③只有 `exit 2` 阻断，`exit 1` 会放行；④富控制走 stdout 的 JSON，任何退出码都会被读；⑤命令 hook 以用户完整权限执行，`claude -p` 不弹信任对话框。

## Implications
- 用户延续「重底层机制」的偏好（呼应 0003）——本课把重心放在 stdin/stdout 协议与退出码语义，而非「敲哪条配置」。后续 hook 课可继续 under-the-hood。
- hooks 是大主题，已拆分：本课只讲**机制骨架**，footer 预告第 5 课「Hooks 实战食谱」（auto-lint / 审计日志 / 安全护栏的可跑配方）。用户若确认，再建 0005。
- 用户在 Windows，本课已针对性给出 `"shell": "powershell"` 与 `$env:CLAUDE_PROJECT_DIR` 的正确写法；后续 hook 示例默认提供 PowerShell 版。
- 尚未建 hooks 速查参考文档（`reference/hooks-cheatsheet.html`）——teach skill 鼓励为语法密集主题建 cheat sheet，已在收尾向用户提议，按需再建。

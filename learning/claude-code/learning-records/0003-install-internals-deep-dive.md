# 第 3 课：安装原理深入（irm | iex 与 npm）

用户在学完安装/配置（第 1 课）与核心工作流（第 2 课）后，主动要求深入 `irm https://claude.ai/install.ps1 | iex` 的安装原理，以及它与 npm 安装的区别。据此新增第 3 课，插在核心工作流之后，Sub-agents 顺延为第 4 课。

## Evidence
- 用户原话：详细讲解 `irm https://claude.ai/install.ps1 | iex` 的安装原理，它与使用 npm 安装有什么区别。
- 讲解基于**抓取的脚本原文**（curl 拉取 install.ps1，约 90 行）与 npm registry 元数据（`@anthropic-ai/claude-code` 现要求 Node ≥22），非参数化记忆。

## Implications
- 用户关注「底层机制/原理」，不满足于「敲哪条命令」——后续课程可适当加入 under-the-hood 视角（如 MCP transport、Hooks 的 stdin/stdout 协议）。
- 已在课程里建立两条事实锚点，后续引用无需重复论证：①原生安装下载独立二进制、不依赖 Node；②脚本用 manifest 的 SHA256 做完整性校验。
- 课程顺序不必严格线性：用户会按兴趣点插入深入课，编号递增即可，用 footer/nav 维持可导航性。

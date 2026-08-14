# Notes

## 用户偏好
- 中文教学。
- **从零起步**：JS 模块系统（ESM/CommonJS）、打包工具都基本没深入过 —— 第一课起点要低。
- 目标是"原理/白盒"，不满足于会配 `remotes`/`exposes`。
- 在真实项目里用着 MF —— 例子尽量往真实场景靠（可让用户贴项目配置来锚定）。
- 强制交互协议：每轮回复结束用 `ask_user` 提一个与上下文相关的后续问题（用户环境规则）。

## 教学策略
- **知识为主（knowledge-heavy）**：difficulty is the enemy，地基课要低难度、多图、单一收获。
- 顺序：地图 → 模块系统 → 打包/chunk → 动态加载 → MF 核心（container / remoteEntry / shared）→ Federation Runtime / Manifest（MF 2.0）。
- 配图优先（mermaid），每课一个小而具体的收获。

## 待确认
- 用户项目具体用的技术栈：Webpack 原生 `ModuleFederationPlugin` / `@module-federation/enhanced`（MF 2.0）/ Rspack / Vite / Next.js？
  —— 后续可让用户贴一段真实 MF 配置，用来锚定例子与"读懂自己项目配置"这一目标。

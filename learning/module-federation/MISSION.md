# Mission: 深入理解 Module Federation 原理

## Why
用户在真实项目中已经用到 Module Federation，但停留在"会配 `remotes`/`exposes`、不懂原理"。目标是从零把它的**运行原理**以及**牵涉到的相关技术**（JS 模块系统、打包工具、运行时加载、依赖共享）彻底吃透——把它从黑盒变成白盒，能讲清"一个远程模块从构建到在宿主应用里跑起来"的完整链路。

## Success looks like
- 能用自己的话讲清 Module Federation 解决的问题，以及 host / remote / expose / shared 之间的关系
- 能说清 JS 模块系统（ESM / CommonJS）与打包（chunk、动态 `import()`）如何支撑 MF
- 能讲清 remoteEntry、container、shared scope、Federation Runtime 的运行时链路（并能画出来）
- 能读懂自己项目里的 MF 配置，解释每个字段"为什么在这"
- 理解 MF 2.0 相比 webpack 内置版新增了什么（Runtime / Manifest / 类型提示）及其原理

## Constraints
- 从零起步：JS 模块系统与打包基础都要先补——视为 mission 的一部分（"相关技术"），不是绕路
- 以原理/机制为主、配置为辅；例子尽量贴合真实项目
- 主要知识源：module-federation.io（有中文文档）、webpack / rspack 官方文档、MDN
- 中文教学

## Out of scope
- 具体某框架（Next.js / Vue 等）的 MF 集成细节——先搞懂通用原理，框架集成按需再说
- 生产部署 / CI 的 MF 运维——不在当前"原理"目标内

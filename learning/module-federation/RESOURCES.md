# Module Federation Resources

## Knowledge

- [官方文档：Module Federation（module-federation.io）](https://module-federation.io/)
  MF 2.0 的权威文档，含 Quick Start、运行时、Manifest、shared 等。**有中文版**（[module-federation.io/zh](https://module-federation.io/zh)）。用于：所有 MF 概念与 API 的事实性查证（首选源）。

- [Webpack 官方：Module Federation 概念](https://webpack.js.org/concepts/module-federation/)
  MF 最初诞生地（Webpack 5 内置）。用于：理解 container / host / remote 的原始概念与 `ModuleFederationPlugin`。

- [Rspack 官方：Module Federation 指南](https://rspack.rs/guide/features/module-federation)
  现代 Rust 打包器视角的 MF 实现。用于：对照理解"MF 已与打包器解耦"、跨 bundler 的一致行为。

- [MDN：JavaScript 模块（ES Modules）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
  高可信的模块系统基础。用于：从零补 `import`/`export`、ESM vs 传统脚本这层"相关技术"地基。

- [GitHub：module-federation/core](https://github.com/module-federation/core)
  MF 2.0 源码与 README。用于：确认 2.0 相对 webpack 内置版新增了什么（Runtime / Manifest / 类型提示 / Devtool）。

- [GitHub：module-federation/module-federation-examples](https://github.com/module-federation/module-federation-examples)
  跨框架 / 跨 bundler 的官方可运行示例集合。用于：需要"能跑的最小例子"时对照。

## Wisdom (Communities)

- [GitHub Discussions（module-federation/core）](https://github.com/module-federation/core/discussions)
  MF 团队与用户活跃地。用于：原理疑问、版本协商 / shared 冲突等实战问题。

- [Module Federation Discord](https://discord.gg/n69NnT3ACV)
  官方 Discord。用于：实时提问、跟进 2.0 演进。

## Gaps
- "Federation Runtime 到底如何解析并加载一个 remote"的单篇深挖文档偏少——可能需要读源码 / 用 Chrome Devtool 扩展观察，后续按需补充。

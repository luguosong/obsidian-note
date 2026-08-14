# 起点：JS 模块系统与打包基本从零

用户在真实项目中使用 Module Federation，但自评对 JS 模块系统（ESM/CommonJS）与打包工具（webpack、chunk、动态 `import()`）"都还不太熟"。这把第一课的起点定得很低：先补"模块系统 → 打包 → 动态加载"这层地基，再进入 MF 原理。

**Implications**：教学以知识/原理为主、配图优先；不能一上来堆 MF 配置或运行时 API。MF 的"相关技术"地基（模块、打包）本身就是 mission 的一部分，先教它们不算离题。

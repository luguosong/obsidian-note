---
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[Impeccable README]]"
描述: 面向 AI 编码智能体的设计指导 skill，含 1 个 skill、23 个命令、45 条确定性设计反模式检测规则，覆盖设计系统、无障碍、响应式与收尾打磨。
排序: 9000
分组: 设计与 UI 生成
创建时间: 2026年07月03日
---
# Impeccable

面向 AI 编码智能体的**设计指导** skill（跨 Claude Code/Cursor/Codex/Gemini 等多工具），含 1 个 skill、23 个命令、45 条确定性设计反模式检测规则，把"好看"从主观判断变成可执行的检查项。

## 安装

```bash
npx impeccable install
```

交互式自动检测工具目录（`~/.claude`/`~/.codex`/`.cursor`）并询问范围。脚本式：`npx impeccable install --providers=claude,codex,cursor --scope=project`。

## 使用

所有命令通过单一 `/impeccable` 调用。核心：

| 命令 | 作用 |
| --- | --- |
| `/impeccable init` | 一次性配置，写 PRODUCT.md / DESIGN.md |
| `/impeccable craft` | 完整「先塑形再构建」流程，带可视化迭代 |
| `/impeccable critique` | UX 设计评审（层级、清晰度、情感共鸣） |
| `/impeccable audit` | 技术质量检查（a11y、性能、响应式） |
| `/impeccable polish` | 收尾打磨、对齐设计系统、发布就绪 |
| `/impeccable harden` | 错误处理、i18n、文本溢出、边界情况 |

> 完整 23 个命令（含 `distill`/`bolder`/`quieter`/`live` 等）见 [[Impeccable README]]。

## 相关

- 完整说明：[[Impeccable README]]
- 同类：[[taste-skill]]、[[awesome-design]]

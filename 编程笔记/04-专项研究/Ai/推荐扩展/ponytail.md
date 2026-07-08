---
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[ponytail README]]"
  - "[[skills]]"
  - "[[Hooks]]"
描述: ponytail 把「懒散资深开发者」思维植入 AI 代理——写代码前强制走一把「是否必要→复用→标准库→原生平台→已装依赖→一行→最小实现」的决策梯子，只写任务真正需要的代码，且永不牺牲验证、错误处理、安全与可访问性。
排序: 3000
分组: 工程方法论与工作流
创建时间: 2026年06月25日
---
# ponytail

把「懒散资深开发者」思维植入 AI 代理的 Claude Code 插件：写代码前强制走一遍「是否必要 → 复用 → 标准库 → 原生平台 → 已装依赖 → 一行 → 最小实现」的决策梯子，在第一个成立的层级停下。靠 [[Hooks]] 注入规则、[[skills]] 提供命令。

## 安装

依次发送两个命令：

```
/plugin marketplace add DietrichGebert/ponytail
```

```
/plugin install ponytail@ponytail
```

> 桌面应用无 `/plugin` 命令，需从 UI 安装；其他平台见 [[ponytail README]]。

## 使用

强度级别（会话内用 `/ponytail` 切换）：

| 级别 | 适用 |
| --- | --- |
| `lite` | 轻量提醒 |
| `full`（默认） | 平衡模式 |
| `ultra` | 严重过度工程时强力压制 |
| `off` | 暂时关闭 |

斜杠命令：

| 命令 | 作用 |
| --- | --- |
| `/ponytail [lite\|full\|ultra\|off]` | 设置级别，或不带参数查看当前级别 |
| `/ponytail-review` | 审查当前 diff 的过度工程，给出删除清单 |
| `/ponytail-audit` | 审查整个代码库的过度工程 |
| `/ponytail-debt` | 把推迟的 `ponytail:` 快捷方式收进账本 |
| `/ponytail-gain` | 显示影响记分板（更少代码 / 更低成本 / 更快速度） |
| `/ponytail-help` | 上述命令速查 |

## 相关

- 完整说明：[[ponytail README]]
- 工作原理：[[Hooks]]、[[skills]]

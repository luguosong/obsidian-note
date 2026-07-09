---
排序: 4000
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[pua README]]"
描述: 用中西大厂 PUA 话术 + 系统化调试方法论驱动 AI 穷尽所有方案才允许放弃的 Claude Code 插件，把 AI 激发为高能动性资深工程师。
分组: 工程方法论与工作流
创建时间: 2026年06月26日
---
# pua

用中西大厂「PUA 话术」+ 系统化调试方法论驱动 AI **穷尽所有方案才允许放弃**的 Claude Code 插件，把 AI 激发为高能动性的资深工程师。失败逐级升压 L1→L4，强制切换本质不同的方案。

## 安装

Claude Code：

```
/plugin marketplace add tanweai/pua
/plugin install pua@pua-skills
```

多工具通用（Codex/Cursor 等）：`npx skills add tanweai/pua --skill pua`。

## 使用

对话中输入 `/pua` 激活，或失败 2 次以上 / 说出"换个方法""try harder"等挫败短语时自动触发。命令：

| 命令 | 作用 |
| --- | --- |
| `/pua:pua` | 核心引擎（三条红线 + 压力升级 + 方法论路由） |
| `/pua:on` / `/pua:off` | 默认模式开关（新会话自动加载） |
| `/pua:flavor` | 切换 14 种大厂味道（阿里/字节/华为/腾讯/Musk/Amazon…） |
| `/pua:p7` / `/pua:p9` / `/pua:p10` | 骨干 / Tech Lead（管 Agent 团队）/ CTO 模式 |
| `/pua:pua-loop` | 自动迭代模式（跑到完成或中止信号） |
| `/pua:kpi` | 生成段位 / KPI 报告卡 |

> 完整 16 个命令（含团队状态、孤儿回收等）见 [[pua README]]。

## 相关

- 完整说明：[[pua README]]

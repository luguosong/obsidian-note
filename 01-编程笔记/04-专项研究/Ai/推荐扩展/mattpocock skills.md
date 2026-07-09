---
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[mattpocock skills README]]"
  - "[[skills]]"
  - "[[SubAgent]]"
描述: Matt Pocock 开源的 Claude Code skill 集，针对 AI 编码四大失败模式（错位/啰嗦/跑不通/泥球），用需求盘问、TDD、领域建模、架构优化等纪律辅助做真正的工程而非氛围编码。共 38 个：1 个必先运行的前置配置 + Mattpocock 主力 19 + Other 按需 18，主力与按需各自按职能分组。
排序: 1000
分组: 工程方法论与工作流
创建时间: 2026年06月28日
---
# mattpocock skills

## 安装

```shell
# 通过npx安装
npx skills@latest add mattpocock/skills
```

> [!warning] 
> 
> `setup-matt-pocock-skills` 这个skill必装,用来初始化项目的
## skill

初始化项目：

| skill                    | 描述                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| setup-matt-pocock-skills | 询问你想要使用哪个问题跟踪器（GitHub、Linear 或本地文件）<br>询问你在整理工单时应用了哪些标签（/triage 使用标签）<br>询问你想在哪里保存我们创建的任何文档 |

让ai理解你的需求：

| skill           | 描述      |
| --------------- | ------- |
| grill-me        | 用于非代码用途 |
| grill-with-docs |         |

修bug:

| skill           | 描述  |
| --------------- | --- |
| tdd             |     |
| diagnosing-bugs |     |

## CONTEXT.md

建立一种共同语言,帮助 agent 解码项目中使用的术语。

通过 grill-with-docs skill 实现 

共同语言除了减少冗长之外还有很多其他好处：

变量、函数和文件命名保持一致 ，使用共享语言
因此， 代码库对 AI 代理更容易导航
AI 代理还花费更少的 token（令牌）进行思考 ，因为它可以访问更简洁的语言
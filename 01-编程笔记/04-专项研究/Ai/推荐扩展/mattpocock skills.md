---
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[mattpocock skills README]]"
  - "[[Ask Matt 工程技能路由器]]"
描述: Matt Pocock 开源的 Claude Code skill 集，针对 AI 编码四大失败模式（错位/啰嗦/跑不通/泥球），用需求盘问、TDD、领域建模、架构优化等纪律辅助做真正的工程而非氛围编码。共 38 个：1 个必先运行的前置配置 + Mattpocock 主力 19 + Other 按需 18，主力与按需各自按职能分组。
排序: 1000
分组: 工程方法论与工作流
创建时间: 2026年06月28日
---
# mattpocock skills

[github仓库](https://github.com/mattpocock/skills)

Matt Pocock 开源的 Claude Code skill 集，针对 AI 编码的四大失败模式（错位/啰嗦/跑不通/泥球），用需求盘问、TDD、领域建模等纪律辅助做真正的工程。本篇仅速查常用 skill，完整 38 个清单见 [[mattpocock skills README]]。

## 安装

```shell
# 通过 npx 安装
npx skills@latest add mattpocock/skills
```

> [!warning] 必装前置
> `setup-matt-pocock-skills` 必须勾选安装——它负责项目初始化，是使用其它 skill 的前提。

## 项目初始化配置

| skill                    | 触发方式 | 描述                                                                                                  |
| ------------------------ | ---- | --------------------------------------------------------------------------------------------------- |
| setup-matt-pocock-skills | 手动触发 | 询问你想要使用哪个问题跟踪器（GitHub、Linear 或本地文件）<br><br>询问你在整理工单时应用了哪些标签（/triage 使用标签）<br><br>询问你想在哪里保存我们创建的任何文档 |

## 询问该用哪个 skill

| skill    | 触发方式 | 描述                                                                                      |
| -------- | ---- | --------------------------------------------------------------------------------------- |
| ask-matt | 手动触发 | 询问哪个 Skills(技能)或流程适合你的情况。这是该仓库中用户调用 Skills(技能)的路由器。<br><br>注意：只局限于 mattpocock 包含的 skill |

## 开发工作流

### 搞明白需求

| skill           | 触发方式 | 描述                                             |
| --------------- | ---- | ---------------------------------------------- |
| grill-me        |      | 用于非代码用途                                        |
| grill-with-docs |      | 审查会话，同时构建你的项目领域模型，锐化术语并内联更新 CONTEXT.md 和 ADRs。 |
|                 |      |                                                |

## 改善代码库

| skill                         | 描述                  |
| ----------------------------- | ------------------- |
| improve-codebase-architecture | 可以帮助你拯救已经变成一团糟的代码库。 |

## CONTEXT.md

> [!note] 定义
> `CONTEXT.md` 建立项目的**共同语言**，帮助 agent 解码项目中使用的术语、减少冗长输出。通过 `grill-with-docs` skill 构建。

> [!tip] 共同语言的收益
> - **变量、函数和文件命名保持一致**，使用共享语言
> - 因此，**代码库对 AI 代理更容易导航**
> - AI 代理还**花费更少的 token（令牌）进行思考**，因为它可以访问更简洁的语言

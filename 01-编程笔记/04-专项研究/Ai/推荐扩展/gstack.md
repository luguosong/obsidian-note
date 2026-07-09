---
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[gstack README]]"
描述: Y Combinator CEO Garry Tan 开源的 Claude Code skill 包，内置 23 个模拟 CEO/设计师/工程经理/QA 等角色的专家 skill 与 8 个核心工具，让单兵开发者拥有初创团队的协同能力。
排序: 7000
分组: 工程方法论与工作流
创建时间: 2026年06月25日
---
# gstack

> [!warning] 个人体验
> 已卸载——太重了。某些 skill 很好用，但一大堆用不到的内容占用上下文，还把 skill 目录搞得很混乱。此处保留速查备查。

Garry Tan（YC CEO）开源的 Claude Code [[skills]] 包，23 个模拟初创团队各角色（CEO、设计师、工程经理、QA、安全官、发布工程师）的 skill + 8 个工具，覆盖思考→规划→构建→审查→测试→发布→反思全流程。

## 安装

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack \
  && cd ~/.claude/skills/gstack && ./setup
```

团队模式（仓库共享、推荐）与多 host 安装见 [[gstack README]]。

## 使用

调用：Claude Code 中直接输入 `/<命令名>`（如 `/office-hours`），无需前缀。按官方分类：

| 分类 | 代表命令 |
| --- | --- |
| 计划与规划评审 | `spec`、`office-hours`、`plan-ceo-review`、`plan-eng-review`、`plan-design-review`、`autoplan` |
| 设计 | `design-consultation`、`design-shotgun`、`design-html`、`design-review` |
| 质量与审查 | `review`、`qa`、`qa-only`、`devex-review`、`cso`、`investigate`、`health` |
| 发版与部署 | `ship`、`landing-report`、`land-and-deploy`、`canary`、`benchmark` |
| 浏览器与抓取 | `browse`、`open-gstack-browser`、`scrape`、`skillify` |
| 文档与内容 | `document-generate`、`document-release`、`diagram`、`make-pdf` |
| 回顾与学习 | `retro`、`learn` |
| 安全护栏 | `careful`、`freeze`/`unfreeze`、`guard` |
| 配置与维护 | `setup-deploy`、`setup-gbrain`、`sync-gbrain`、`gstack-upgrade` |
| 上下文 / iOS | `context-save`/`context-restore`；`ios-qa`、`ios-fix`、`ios-design-review` |

> 完整 53 个命令逐条说明见 [[gstack README]]。

## 相关

- 完整说明：[[gstack README]]

---
排序: 8000
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[taste-skill README]]"
描述: 赋予 AI 良好品味的 skill 包，阻止其生成乏味、套路化的劣质前端 UI（anti-slop），用更强的布局、排版、动效与间距取代模板化输出。
分组: 设计与 UI 生成
创建时间: 2026年07月03日
---
# taste-skill

赋予 AI **良好品味**的 skill 包，阻止其生成乏味、套路化的劣质前端 UI（anti-slop），用更强的布局、排版、动效与间距取代千篇一律的模板化输出。

## 安装

```bash
npx skills add https://github.com/Leonxlnx/taste-skill
```

也可按安装名装单个技能，如 `--skill "design-taste-frontend"`。

## 使用

taste-skill 是 SKILL.md 集合（**无斜杠命令**），安装后 AI 在生成前端时自动套用设计纪律。默认技能 `design-taste-frontend`（v2 实验版）读取需求、推断设计语言，并提供三个可调旋钮：

| 旋钮 | 作用 |
| --- | --- |
| `DESIGN_VARIANCE` | 布局实验性（低：居中/干净 · 高：非对称/现代） |
| `MOTION_INTENSITY` | 动画深度（低：悬停 · 高：滚动/磁吸） |
| `VISUAL_DENSITY` | 单视口信息密度（低：疏朗 · 高：密集仪表盘） |

另有 `image-to-code`、`redesign-existing-projects`、`minimalist-ui`、`industrial-brutalist-ui` 等变体技能，完整 13 个见 [[taste-skill README]]。

## 相关

- 完整说明：[[taste-skill README]]
- 同类：[[Impeccable]]、[[awesome-design]]

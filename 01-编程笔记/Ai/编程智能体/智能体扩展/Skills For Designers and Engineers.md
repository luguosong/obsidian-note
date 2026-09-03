---
排序: 5750
描述: Emil Kowalski 的设计工程 skills 集，12 个 skill 的用途与使用时机速查表
分组:
分类: "[[智能体扩展]]"
创建时间: 2026年08月31日
---
# Skills For Designers and Engineers

Emil Kowalski（曾在 Vercel、Linear 工作）面向设计师与工程师开源的设计工程 skills，核心是动画决策与 UI 打磨的「品味」：agent 不缺写代码的能力，缺的是选对缓动曲线、用半透明阴影而非实线边框这类细节判断。这些小问题不断累积，决定界面是惊艳还是平庸。

- [仓库](https://github.com/emilkowalski/skills)

## 安装

```bash
npx skills@latest add emilkowalski/skills
```

## Skill 用法一览

| Skill | 用途 | 使用时机 |
| --- | --- | --- |
| [emil-design-eng](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md) | 主技能：Emil 的 UI 打磨哲学，组件设计、动画决策、让软件手感出色的隐形细节 | 想让 agent 整体带上这套设计品味时 |
| [animate](https://github.com/emilkowalski/skills/blob/main/skills/animate/SKILL.md) | 从零构建 web 动画：按「是否该动、什么目的、哪个工具、哪些属性、曲线与时长、如何被打断与退出」的顺序做决策，并写出实现 | 要求给组件加动画、加动效、做转场时 |
| [animate-expo](https://github.com/emilkowalski/skills/blob/main/skills/animate-expo/SKILL.md) | React Native / Expo 版构建：手势、sheet、屏幕转场、触觉反馈，动效不占 JS 线程（Reanimated + Gesture Handler） | 在 Expo 应用里做动画手势，或修真机卡顿时；web 端用 animate |
| [review-animations](https://github.com/emilkowalski/skills/blob/main/skills/review-animations/SKILL.md) | 按高工艺标准严格审查动效代码：默认挑毛病，批准需要挣得 | **需显式调用**；审查某次改动里的动效时 |
| [improve-animations](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md) | 以资深动效顾问身份审计全库动画，产出按优先级排序、可独立执行的改进计划（只读不改码） | 说「改善整体动画手感」「出动效修复路线图」时 |
| [find-animation-opportunities](https://github.com/emilkowalski/skills/blob/main/skills/find-animation-opportunities/SKILL.md) | 扫描 UI 找出「该动而没动」之处并逐个给出精确配方，同时拒绝不该动的地方（只读不改码） | 问「这里有什么能做成动画」「让它更有生命感」时 |
| [animation-vocabulary](https://github.com/emilkowalski/skills/blob/main/skills/animation-vocabulary/SKILL.md) | 动效术语反查词典：把模糊描述翻译成精确术语（「弹一下的东西」就是 Pop in） | 说不出动效名字，想用准确的词去 prompt 时 |
| [apple-design](https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md) | Apple 的界面设计与流体动效原则（WWDC 讲座提炼、转译到 web）：spring、手势、材质与纵深、排版、减弱动效 | 构建或审查手势驱动 UI、spring 动画、Apple 风格交互时 |
| [write-swift](https://github.com/emilkowalski/skills/blob/main/skills/write-swift/SKILL.md) | 写现代 Swift：值类型建模、Swift 6 数据竞争安全、协议与泛型、性能与 ARC、Swift Testing | 写、审、迁移 Swift，或排查并发错误、数据竞争、循环引用、性能问题时 |
| [pick-ui-library](https://github.com/emilkowalski/skills/blob/main/skills/pick-ui-library/SKILL.md) | 按任务从 Emil 亲自背书的清单里选库（toast、图表、拖拽、虚拟化等），不让 AI 手搓组件或装进弃坑包 | **需显式调用**；前端任务需要选型时 |
| [prototype](https://github.com/emilkowalski/skills/blob/main/skills/prototype/SKILL.md) | 把一段 UI 描述做成多个真正不同的版本，放进可视化切换器里现场翻选、当场定稿 | **需显式调用**；想在多种 UI 方案之间对比拍板时 |
| [ask-sonner](https://github.com/emilkowalski/skills/blob/main/skills/ask-sonner/SKILL.md) | Sonner（React toast 库）使用指南：安装接线、toast() 选型、promise 与 loading、样式主题、定位与常见问题排障 | 用 Sonner，或排查 toast 不出现、重复、丢样式、被弹窗遮挡等问题时 |

> [!note] 触发方式
> 标注「需显式调用」的 skill 带 `disable-model-invocation: true`，agent 不会自动触发，必须用户点名；其余 skill 依据描述中的使用时机自动激活。

## 动画相关 skill 的分工

四个动画 skill 各管一段、互不越界（各自的 SKILL.md 开头就互相划界）：

- **animate** 建：把动效需求直接写成实现
- **review-animations** 审：只针对单个 diff 的严格审查
- **improve-animations** 断：只读审计全库，产出可交给其他 agent 执行的改进计划
- **find-animation-opportunities** 找：只读扫描，为该加动效之处提出精确配方

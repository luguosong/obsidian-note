---
排序: 2750
描述: VoltAgent 维护的 DESIGN.md 设计风格合集（73 份），从主流网站提取设计语言文档，放进项目根目录即可让 AI 编程智能体生成风格一致的 UI
分组:
分类: "[[智能体扩展]]"
创建时间: 2026年08月25日
---
# awesome-design-md

[仓库](https://github.com/voltagent/awesome-design-md)

## 简介

[DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) 是 Google Stitch 提出的概念：一份纯文本的**设计系统文档**，AI 智能体读取它来生成视觉一致的 UI。无需 Figma 导出、无需 JSON schema，就是一个 markdown 文件，放进项目根目录即可。

| 文件 | 谁读它 | 定义什么 |
| ---- | ---- | ---- |
| `AGENTS.md` | 编程智能体 | 项目怎么构建 |
| `DESIGN.md` | 设计智能体 | 项目长什么样 |

本仓库收录了从 73 个真实网站提取的 DESIGN.md 文件，每份都包含深度分析（设计模式、tokens、规则），而非表面模仿。每个站点附带 `DESIGN.md`、`preview.html`、`preview-dark.html`（浅色/深色视觉目录）。

## 设计风格一览

### AI 与 LLM 平台

| 站点 | 风格特征 |
| ---- | ---- |
| [Claude](https://getdesign.md/claude/design-md) | Anthropic 的 AI 助手。暖赤陶色点缀、干净的编辑式排版 |
| [Cohere](https://getdesign.md/cohere/design-md) | 企业级 AI 平台。鲜艳渐变、数据密集的仪表盘风格 |
| [ElevenLabs](https://getdesign.md/elevenlabs/design-md) | AI 语音平台。暗色电影感 UI、声波美学 |
| [Minimax](https://getdesign.md/minimax/design-md) | AI 模型提供商。大胆的暗色界面配霓虹点缀 |
| [Mistral AI](https://getdesign.md/mistral.ai/design-md) | 开放权重 LLM 提供商。法式工程极简主义、紫色调 |
| [Ollama](https://getdesign.md/ollama/design-md) | 本地运行 LLM。终端优先、单色极简 |
| [OpenCode AI](https://getdesign.md/opencode.ai/design-md) | AI 编程平台。以开发者为中心的暗色主题 |
| [Replicate](https://getdesign.md/replicate/design-md) | 通过 API 运行 ML 模型。干净的白色画布、代码为先 |
| [Runway](https://getdesign.md/runwayml/design-md) | AI 创意工具平台。电影节式的编辑美学——电影感暗色首屏、纸白色阅读区、单一无衬线字体、纯黑药丸形 CTA |
| [Together AI](https://getdesign.md/together.ai/design-md) | 开源 AI 基础设施。技术蓝图式设计 |
| [VoltAgent](https://getdesign.md/voltagent/design-md) | AI 智能体框架。纯黑画布、翡翠绿点缀、终端原生风 |
| [xAI](https://getdesign.md/x.ai/design-md) | 马斯克的 AI 实验室。冷峻单色、未来主义极简 |

### 开发者工具与 IDE

| 站点 | 风格特征 |
| ---- | ---- |
| [Cursor](https://getdesign.md/cursor/design-md) | AI 优先的代码编辑器。流畅的暗色界面、渐变点缀 |
| [Expo](https://getdesign.md/expo/design-md) | React Native 平台。暗色主题、紧字距、代码为中心 |
| [Lovable](https://getdesign.md/lovable/design-md) | AI 全栈构建器。俏皮的渐变、友好的开发者审美 |
| [Raycast](https://getdesign.md/raycast/design-md) | 效率启动器。精致的暗色外框、鲜艳渐变点缀 |
| [Superhuman](https://getdesign.md/superhuman/design-md) | 高速邮件客户端。高级暗色 UI、键盘优先、紫色光晕 |
| [Vercel](https://getdesign.md/vercel/design-md) | 前端部署平台。黑白精准、Geist 字体 |
| [Warp](https://getdesign.md/warp/design-md) | 现代终端。类 IDE 暗色界面、块状命令 UI |

### 后端、数据库与 DevOps

| 站点 | 风格特征 |
| ---- | ---- |
| [ClickHouse](https://getdesign.md/clickhouse/design-md) | 快速分析数据库。黄色点缀、技术文档风格 |
| [Composio](https://getdesign.md/composio/design-md) | 工具集成平台。现代暗色调配彩色集成图标 |
| [HashiCorp](https://getdesign.md/hashicorp/design-md) | 基础设施自动化。企业级的干净、黑白配色 |
| [MongoDB](https://getdesign.md/mongodb/design-md) | 文档数据库。绿叶品牌、面向开发者文档 |
| [PostHog](https://getdesign.md/posthog/design-md) | 产品分析。俏皮的刺猬品牌形象、开发者友好暗色 UI |
| [Sanity](https://getdesign.md/sanity/design-md) | Headless 内容平台。暗色优先的编辑式营销页面——112px 展示字号、IBM Plex Mono 技术眉标、珊瑚红唯一点缀只留给最高优先级 CTA |
| [Sentry](https://getdesign.md/sentry/design-md) | 错误监控。暗色仪表盘、数据密集、粉紫点缀 |
| [Supabase](https://getdesign.md/supabase/design-md) | 开源 Firebase 替代品。暗色翡翠绿主题、代码优先 |

### 生产力与 SaaS

| 站点                                                  | 风格特征                     |
| --------------------------------------------------- | ------------------------ |
| [Cal.com](https://getdesign.md/cal/design-md)       | 开源日程工具。干净的中性 UI、开发者导向的简洁 |
| [Intercom](https://getdesign.md/intercom/design-md) | 客户消息。友好的蓝色调、对话式 UI 模式    |
| [Linear](https://getdesign.md/linear.app/design-md) | 面向工程师的项目管理。极致极简、精准、紫色点缀  |
| [Mintlify](https://getdesign.md/mintlify/design-md) | 文档平台。干净、绿色点缀、阅读体验优化      |
| [Notion](https://getdesign.md/notion/design-md)     | 一体化工作区。温暖的极简主义、衬线标题、柔和表面 |
| [Resend](https://getdesign.md/resend/design-md)     | 开发者邮件 API。极简暗色主题、等宽字体点缀  |
| [Zapier](https://getdesign.md/zapier/design-md)     | 自动化平台。暖橙色、友好的插画驱动        |

### 设计与创意工具

| 站点 | 风格特征 |
| ---- | ---- |
| [Airtable](https://getdesign.md/airtable/design-md) | 电子表格-数据库混合。多彩、友好、结构化数据审美 |
| [Clay](https://getdesign.md/clay/design-md) | 创意机构。有机形状、柔和渐变、艺术指导式排版 |
| [Figma](https://getdesign.md/figma/design-md) | 协作设计工具。鲜艳多色、俏皮而专业 |
| [Framer](https://getdesign.md/framer/design-md) | 网站构建器。大胆的黑与蓝、动效优先、设计导向 |
| [Miro](https://getdesign.md/miro/design-md) | 可视化协作。亮黄点缀、无限画布美学 |
| [Webflow](https://getdesign.md/webflow/design-md) | 可视化网页构建器。蓝色点缀、精致的营销站审美 |

### 金融科技与加密

| 站点 | 风格特征 |
| ---- | ---- |
| [Binance](https://getdesign.md/binance/design-md) | 加密交易所。单色底上的大胆币安黄、交易大厅般的紧迫感 |
| [Coinbase](https://getdesign.md/coinbase/design-md) | 加密交易所。干净的蓝色标识、信任导向、机构感 |
| [Kraken](https://getdesign.md/kraken/design-md) | 加密交易平台。紫色点缀的暗色 UI、数据密集的仪表盘 |
| [Mastercard](https://getdesign.md/mastercard/design-md) | 全球支付网络。暖奶油色画布、轨道式药丸形状、编辑式温暖感 |
| [Revolut](https://getdesign.md/revolut/design-md) | 数字银行。流畅的暗色界面、渐变卡片、金融科技的精准 |
| [Stripe](https://getdesign.md/stripe/design-md) | 支付基础设施。标志性的紫色渐变、300 字重的优雅 |
| [Wise](https://getdesign.md/wise/design-md) | 国际转账。亮绿点缀、友好而清晰 |

### 电商与零售

| 站点 | 风格特征 |
| ---- | ---- |
| [Airbnb](https://getdesign.md/airbnb/design-md) | 旅行市场。暖珊瑚色点缀、摄影驱动、圆角 UI |
| [Meta](https://getdesign.md/meta/design-md) | 科技零售商店。摄影优先、明暗双表面、Meta 蓝 CTA |
| [Nike](https://getdesign.md/nike/design-md) | 运动零售。单色 UI、超大写 Futura 字体、满幅摄影 |
| [Shopify](https://getdesign.md/shopify/design-md) | 电商平台。暗色优先的电影感、霓虹绿点缀、超细展示字体 |
| [Starbucks](https://getdesign.md/starbucks/design-md) | 咖啡零售旗舰。四层大地绿系统、暖奶油画布、专有 SoDoSans 字体 |

### 媒体与消费科技

| 站点 | 风格特征 |
| ---- | ---- |
| [Apple](https://getdesign.md/apple/design-md) | 消费电子。高级留白、SF Pro 字体、电影感图像 |
| [HP](https://getdesign.md/hp/design-md) | PC 与打印机制造商。纯白画布、HP 电光蓝信号 CTA、几何 Forma DJR Micro 字体、蓝色燕尾装饰 |
| [IBM](https://getdesign.md/ibm/design-md) | 企业技术。Carbon 设计系统、结构化的蓝色调 |
| [NVIDIA](https://getdesign.md/nvidia/design-md) | GPU 计算。绿与黑的能量感、技术力量美学 |
| [Pinterest](https://getdesign.md/pinterest/design-md) | 视觉发现平台。红色点缀、瀑布流网格、图片优先 |
| [PlayStation](https://getdesign.md/playstation/design-md) | 游戏主机零售。三表面渠道布局、青色悬停缩放交互 |
| [SpaceX](https://getdesign.md/spacex/design-md) | 航天科技。冷峻黑白、满幅图像、未来主义 |
| [Spotify](https://getdesign.md/spotify/design-md) | 音乐流媒体。暗色上的鲜艳绿、粗字体、专辑封面驱动 |
| [The Verge](https://getdesign.md/theverge/design-md) | 科技编辑媒体。酸性薄荷绿与紫外光点缀、Manuka 展示字体 |
| [Uber](https://getdesign.md/uber/design-md) | 出行平台。大胆黑白、紧凑排版、都市能量 |
| [Vodafone](https://getdesign.md/vodafone/design-md) | 全球电信品牌。纪念碑式大写展示字、Vodafone 红章节条带 |
| [WIRED](https://getdesign.md/wired/design-md) | 科技杂志。纸白的大开报纸密度、自定义衬线、墨蓝链接 |

### 汽车

| 站点 | 风格特征 |
| ---- | ---- |
| [BMW](https://getdesign.md/bmw/design-md) | 豪华汽车。暗色高级表面、精准的德式工程美学 |
| [BMW M](https://getdesign.md/bmw-m/design-md) | 高性能汽车。赛车启发的强对比、M 三色点缀、精准驱动的布局 |
| [Bugatti](https://getdesign.md/bugatti/design-md) | 豪华超跑。影院黑的画布、单色的严苛克制、纪念碑式展示字体 |
| [Ferrari](https://getdesign.md/ferrari/design-md) | 豪华汽车。明暗对照法的黑白编辑风、极致稀疏的法拉利红 |
| [Lamborghini](https://getdesign.md/lamborghini/design-md) | 豪华汽车。纯黑教堂般肃穆、金色点缀、LamboType 定制新怪诞体 |
| [Renault](https://getdesign.md/renault/design-md) | 法国汽车。鲜艳的极光渐变、NouvelR 专有字体、零圆角按钮 |
| [Tesla](https://getdesign.md/tesla/design-md) | 电动汽车。激进的减法设计、电影感满视口摄影、Universal Sans 字体 |

### 复古 Web · 怀旧系列

周六特别系列——从 1990 年代网页提取的 DESIGN.md，放进项目即可让 AI 生成年代精准的复古 UI。

| 站点 | 风格特征 |
| ---- | ---- |
| [Dell (1996)](https://getdesign.md/dell-1996/design-md) | 目录时代的企业网页。字面意义的黑色页面边框、平面色块"缎带卡片"、粗 Helvetica-Black 标题配 Times Roman 正文、手工切割的 GIF 贴纸（NEW! 爆炸角标、奖印章、斜面产品照） |
| [Nintendo.com (2001)](https://getdesign.md/nintendo-2001/design-md) | Y2K"主机铬合金"网页。拉丝紫蓝斜切金属面板、半调点状碳素导航泛着琥珀光、描边 Arial-Black 游戏盒艺术字标压在电路板主视觉上、像素马里奥欢迎气泡 |

## 每份 DESIGN.md 的内部结构

所有文件遵循 [Stitch DESIGN.md 规范](https://stitch.withgoogle.com/docs/design-md/specification/)并做了扩展：

| # | 章节 | 捕获内容 |
| -- | ---- | ---- |
| 1 | Visual Theme & Atmosphere | 情绪、密度、设计哲学 |
| 2 | Color Palette & Roles | 语义名 + 十六进制值 + 功能角色 |
| 3 | Typography Rules | 字体族、完整层级表 |
| 4 | Component Stylings | 按钮、卡片、输入框、导航（含状态） |
| 5 | Layout Principles | 间距比例、网格、留白哲学 |
| 6 | Depth & Elevation | 阴影系统、表面层级 |
| 7 | Do's and Don'ts | 设计护栏与反模式 |
| 8 | Responsive Behavior | 断点、触控目标、折叠策略 |
| 9 | Agent Prompt Guide | 快速颜色参考、即用提示词 |

## 使用方式

1. 把某站点的 `DESIGN.md` 复制到项目根目录；
2. 告诉 AI 智能体按它构建 UI 即可。

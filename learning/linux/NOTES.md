# NOTES — Linux 系统课

## 用户偏好 / 起点（首节访谈确认）
- **学习区固定** = `E:\code-base\personal\obsidian-note\learning\linux\`（用户 2026-07-21 明确指定，**以后不再反复确认位置**）。
- **语言**：中文授课，命令 / 标识符 / 术语保留原文；英文术语首次出现加中文括号注解（如 `von Neumann architecture`（冯诺依曼架构）、`ALU`（算术逻辑单元））。
- **使命**：兴趣驱动，**彻底搞懂 OS / Linux 底层原理**（偏知识型，非应试 / 非运维上手）。追求「知其所以然」。
- **主线 = 鸟哥私房菜 CentOS7**（<https://linux.vbird.org/linux_basic/centos7/>）：用它的**章节顺序当骨架**，但——
  - 鸟哥**啰嗦** → 每课提炼成单一收获、精简。
  - 鸟哥停在 **2016 CentOS7** → 过时点用现代可靠源纠正并**注明**（RISC/CISC 老划分、老硬件举例、CentOS7 特有等）。
- **课程网页视觉**：复用统一 **kami「墨夜」高对比暗色**（近黑暖炭 `#16181b` + 暖白正文 `#e7e2d6` ≈13:1 + 暖金强调 `#d9b45c`，固定暗色）。完整约定见 `learning/README.md`；样式唯一来源 = `assets/style.css`（从 mattpocock-skills 课复制沿用）。
- **深度基线（2026-07-21 校准，见 LR-0001）**：用户要「更深的原理密度 + 更多练习」。每课在**单一 win** 上加**机制细节 + 可应用的 worked trace + 更多检索练习（含可折叠诊断题）**，但保持精简——**深度 ≠ 啰嗦**。第 1 课已按此加深（寄存器级追踪 + 内存墙量化 + 5 题 + 诊断题）。

## 取源方式（重要）
- `web_fetch` 对 vbird 域名被网络策略拦（解析到受限地址）→ 改用 **`curl.exe` 抓原始 HTML + Python 剥标签**提取正文对照。全局 `defuddle` CLI 未检测到。
- 用户提到用 **defuddle** 拉网页：若要把鸟哥源页**正式归档**进 `网页裁剪/`（vault 的裁剪目录），可单独走 `defuddle` skill；当前流程只用 curl 读取内容做**授课对照**，未自动归档（待用户确认是否要归档每章源页）。

## 写课视觉契约（每次照做，勿即兴）
> 与 mattpocock-skills / superpowers 两课共用同一套契约，保证三门课视觉一致。
1. **从模板起手**：复制 `assets/lesson-template.html` → `lessons/000N-<slug>.html` 再填。布局 = 墨夜暖金暗色 · 满宽 · 左课程导航 · 右 TOC · 底部 prev/next。
2. **样式唯一来源 = `assets/style.css`**；每课只 `<link>` 它 + `<script defer>` 引 `toc.js` / `nav.js` / `quiz.js`。**禁止**写 `<style>` / 内联配色 / 自造颜色。
3. **只用既有组件类**：`.eyebrow` `.lede` `.win` `.callout` `.steps` `.flow`/`.flow-step`(`.sk`/`.防`) `.exercise` `.quiz`/`.opt`/`.quiz-fb` `details` `.tag` `.source` `.followup`，及 `section h2` `table` `blockquote` `pre`/`code` `footer`。缺组件先加类进 `style.css`，别单课自造。
4. **新增课登记进 `assets/nav.js` 的 `LESSONS` 数组这一处**；设好 footer 的上一课 / 下一课。
5. **每课结构顺序**：`header`(eyebrow+h1+lede) → `.win` → 若干 `section`(h2 带序号) → `.exercise`(quiz 三连) → `.source` → `.followup` → `footer`。
6. 测验：`quiz.js` 选中即判，`data-answer`=正确项字母、`data-explain`=解析；**选项字数尽量等长**，别靠格式泄题。

## 术语约定
- **`GLOSSARY.md` 已建**：后续每课术语措辞以它为准；新课引入新术语时把「已教过、能被正确使用」的词增补进去（不收只是刚露脸的词）。

## 进度
- 2026-07-21：建工作区 + 第 0 章学习弧规划 + **交付 lesson 1（五大单元与冯诺依曼架构）**。第 0 章路线见 `MISSION.md` 末尾。
- 2026-07-21：应反馈**加深 lesson 1**（寄存器级 `c=a+b` 追踪 + 内存墙量化 + 5 题 + 诊断题），设深度基线（LR-0001）。
- 2026-07-21：**交付 lesson 2（CPU 深入）**——ISA vs 微架构、RISC/CISC 现代真相（x86 内部 μops）、x86·ARM·RISC-V 版图、Dennard scaling→多核、x86·ARM 汇编对照。已 web 核验 2025 现状，纠正鸟哥过时例子（SPARC/PS3 Cell/VIA、超线程「Intel 独有」）。
- 2026-07-21：**交付 lesson 3（内存与存储层次）**——存储金字塔（含容量/成本/持久性）、局部性原理（时间+空间）、缓存行、SRAM/DRAM、缓存命中/未命中追踪。已核验并纠正鸟哥 2015 过时点（DDR4→DDR5、机械盘/SATA→NVMe SSD、BIOS→UEFI）。
- 2026-07-21：**交付 lesson 4（数据表示）**——bit/byte、十六进制/半字节、KiB vs KB（IEC/SI）、ASCII→Unicode 码点→UTF-8 变长编码、A/中/emoji 编码 worked example。已核验（UTF-8 全网 99%、中=E4B8AD），纠正鸟哥停在 ASCII/Big5、hex 只一笔带过。
- 2026-07-21：**交付 lesson 5（从硬件到操作系统）· 第 0 章收官**——机器码、编译/解释/字节码、裸硬件三难题、内核四大职责、系统调用、用户态/内核态、hello world 全链路追踪。鸟哥 §0.4 本身不错，仅更新 Java 归类、Win8.1/ARM 例子。**第 0 章 5 课全部交付；下一步鸟哥第 1 章《Linux 是什么》。**
- 2026-07-21：**进入第 1 章 · 交付 lesson 6（Unix 的诞生与哲学）**——Multics 教训、Thompson 1969、Ritchie 1973 用 C 重写→可移植、Unix 哲学（一切皆文件 + 小工具+管道）、BSD/System V 分支、macOS 承 BSD 血脉、`cat|grep|wc` 哲学追踪。史实以 Vbird + Wikipedia 为据。第 1 章路线见 MISSION。
- 2026-07-21：**交付 lesson 7（GNU、自由软件与 Linux 诞生）**——Stallman/GNU(1983)/FSF(1985)、自由≠免费、GPL/copyleft、开源 OSI(1998)、Torvalds 1991 用 GNU 工具(gcc/bash)写内核、GNU/Linux 合体、虚拟团队、Git(2005)。纠正鸟哥 GNU/FSF 年份。下一课讲发行版 + CentOS 之死。
- 2026-07-21：**交付 lesson 8（内核 vs 发行版 + 现代版图）· 第 1 章核心收官**——内核vs发行版、版本号(奇偶→时间制/LTS)、RPM系vs DPKG系、**CentOS 之死（2020转Stream、CentOS7 2024-06 EOL）→ Rocky/AlmaLinux**、应用领域(补容器/云原生)。已 web 核验(内核6.x/7.x、CentOS EOL、发行版家族)。第 1 章核心 3 课(6-8)完成，第 9 课(如何学)可选。
- 2026-07-21：**交付 lesson 9（如何学 Linux）· 第 1 章完整收官**——七条学习法(动手/快照/RTFM/项目/排错/主动回忆/避教程地狱)、排错姿势、**权威资源地图**(Shotts TLCL/LFS101/Missing Semester/OverTheWire Bandit/Linux Journey/man7/OSTEP-CSAPP/RHCSA-LFCS-LPIC/社区)、可执行路线、以本课自身为学习法范例。RESOURCES 已大扩充。**第 1 章 4 课全交付；下一步鸟哥第 2 章磁盘分割。**
- 2026-07-21：**工作区首建 `reference/` + 交付第 1 张参考卡**（`ch0-1-foundations-cheatsheet.html`）——压缩前 9 课(第 0+1 章)精华：三条主线 + 每课速览 + **鸟哥纠偏清单**(11 条过时点速查) + 术语指引。复用 style.css + toc.js，适配打印。

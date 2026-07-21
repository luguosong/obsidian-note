# Linux 系统课 Resources

> 一手源优先，不信参数记忆。**主线 = 鸟哥私房菜（章节骨架）**；**事实以现代可靠源为准**（鸟哥停在 2016 CentOS7）。

## Knowledge

### 主线（章节骨架）
- **[鸟哥的 Linux 私房菜 · 基础学习篇（CentOS 7）](https://linux.vbird.org/linux_basic/centos7/)**
  中文 Linux 入门经典，章节体系完整——**当骨架/ 目录用**。注意：2016 年停更、以 CentOS7 为基，硬件举例与部分工具已过时，具体知识点须交叉核对。第 0 章计算机概论：<https://linux.vbird.org/linux_basic/centos7/0105computers.php>

### 计算机底层 / 体系结构（第 0 章纠偏与深化）
- **[Dive Into Systems（免费在线教材）](https://diveintosystems.org/)**
  免费、现代、面向系统的入门教材。§5.2 The von Neumann Architecture 精确覆盖五大单元 / 存储程序 / 指令周期 / 冯诺依曼瓶颈——**lesson 1 的首选一手源**。
- **[Computer Systems: A Programmer's Perspective（CSAPP）](https://csapp.cs.cmu.edu/)**（Bryant & O'Hallaron，CMU）
  「从程序员视角看计算机系统」。用于：程序如何在硬件上运行、内存层次、链接、异常控制流。
- **[Computer Organization and Design（Patterson & Hennessy）](https://www.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6)**
  体系结构圣经（RISC-V / ARM / MIPS 版）。用于：CPU 指令周期、流水线、ISA、RISC/CISC。
- **[Von Neumann architecture — Wikipedia](https://en.wikipedia.org/wiki/Von_Neumann_architecture)**
  快速权威参考：五单元、存储程序、冯诺依曼瓶颈、与 Harvard 架构对比。
- **[Latency Numbers Every Programmer Should Know（交互版 · colin-scott）](https://colin-scott.github.io/personal_website/research/interactive_latency.html)**
  寄存器/缓存/内存/SSD/网络各层延迟的数量级速查（可选年份）。用于：量化「内存墙」、建立存储层次直觉。lesson 1 延迟表即取自此量级（2024：L1≈0.7ns / DRAM≈70ns）。
- **[RISC vs CISC — Clayton Cafiero（UVM cs2210）](https://www.uvm.edu/~cbcafier/cs2210/content/02_basics_of_architecture/risc_vs_cisc.html)**
  干净的学术解释：RISC/CISC 划分 + 现代 x86 内部 μops、界线已模糊。**lesson 2 首选。**
- **ISA 版图速查**：[Wikipedia · ISA 对比](https://en.wikipedia.org/wiki/Comparison_of_instruction_set_architectures)、[Apple silicon](https://en.wikipedia.org/wiki/Apple_silicon)、[RISC-V](https://en.wikipedia.org/wiki/RISC-V) —— x86/ARM/RISC-V 2025 版图与时间线。用于：lesson 2 纠正鸟哥过时的 CPU 举例。
- **[OpenStax · Introduction to Computer Science §5.5 Memory Hierarchy](https://openstax.org/books/introduction-computer-science/pages/5-5-memory-hierarchy)**
  免费权威教材，存储金字塔 + 局部性讲得干净。**lesson 3 首选。**
- **[Wikipedia · Locality of reference](https://en.wikipedia.org/wiki/Locality_of_reference)**
  时间/空间局部性的权威定义与例子。用于：解释「为什么缓存有效」。
- **[Wikipedia · UTF-8](https://en.wikipedia.org/wiki/UTF-8) / [Unicode](https://en.wikipedia.org/wiki/Unicode)**
  码点→字节的变长规则、ASCII 兼容、字节区间。**lesson 4 首选。**
- **[Wikipedia · Binary prefix](https://en.wikipedia.org/wiki/Binary_prefix) + [W3Techs 编码占比](https://w3techs.com/technologies/overview/character_encoding)**
  KiB/MiB（IEC 1024）vs KB/MB（SI 1000）标准；UTF-8 全网 ~99% 占比。用于：lesson 4 的 KiB vs KB 与 UTF-8 现状。

### 操作系统本体（后续章节主源）
- **[Operating Systems: Three Easy Pieces（OSTEP，免费）](https://pages.cs.wisc.edu/~remzi/OSTEP/)**（Arpaci-Dusseau，UW–Madison）
  免费 OS 教材，三条主线 virtualization / concurrency / persistence。用于：进程、调度、虚拟内存、文件系统的**权威原理源**——鸟哥后续章节的底层纠偏都靠它。**lesson 5 起成为主源。**
- **内核 / 系统调用 / 用户态速查**：[Wikipedia · Kernel](https://en.wikipedia.org/wiki/Kernel_(operating_system))、[System call](https://en.wikipedia.org/wiki/System_call)、[User/kernel space](https://en.wikipedia.org/wiki/User_space_and_kernel_space) —— 内核四大职责、系统调用、用户/内核态保护的权威定义。用于：lesson 5。
- **[The Linux man-pages project（man7.org，Michael Kerrisk）](https://man7.org/linux/man-pages/)**
  Linux 系统调用 / 库函数 / 命令的权威手册。用于：具体命令与系统调用的**当前正确行为**（替代鸟哥里过时的选项）。
- **[Arch Wiki](https://wiki.archlinux.org/)**
  质量极高的实操 Linux 参考（虽面向 Arch，但通用知识准确、更新及时）。用于：现代工具链、systemd、磁盘/文件系统实操。

### Linux/Unix 历史与开源（第 1 章）
- **[Wikipedia · History of Unix](https://en.wikipedia.org/wiki/History_of_Unix)** —— Multics→Thompson/Ritchie→BSD/System V 的权威时间线。lesson 6 首选。
- **[《The Art of Unix Programming》（Eric Raymond，免费在线）](http://www.catb.org/~esr/writings/taoup/html/)** —— Unix 哲学最经典的系统阐述。
- **[Wikipedia · Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy)** —— McIlroy 原始表述与后世提炼。
- **[GNU · Linux and the GNU System](https://www.gnu.org/gnu/linux-and-gnu.html)** —— Stallman 亲述「为什么叫 GNU/Linux」。lesson 7「合体」论点的源头。
- **[GNU · What is Free Software（四种自由）](https://www.gnu.org/philosophy/free-sw.html) + [OSI · Open Source Definition](https://opensource.org/osd)** —— 自由/开源的权威定义。
- **[Wikipedia · History of Linux](https://en.wikipedia.org/wiki/History_of_Linux)** —— Torvalds、Minix、BBS 帖、虚拟团队时间线。lesson 7。

### 发行版与内核现状（第 8 课）
- **[CentOS 官方 · CentOS Linux vs Stream](https://www.centos.org/cl-vs-cs/) + [endoflife.date/centos](https://endoflife.date/centos)** —— CentOS 终止、Stream 转向、各版本 EOL 权威依据。lesson 8「CentOS 之死」。
- **[kernel.org · Active kernel releases](https://www.kernel.org/releases.html)** —— 当前内核版本与 LTS 列表。用于：核对内核版本现状（远超鸟哥的 4.0）。
- **[Rocky Linux](https://rockylinux.org/) / [AlmaLinux](https://almalinux.org/)** —— RHEL 免费重编译替代品（老 CentOS 接班人）官网。
- **[DistroWatch](https://distrowatch.com/)** —— 发行版总览与流行度排行。用于：了解发行版版图。

### 学 Linux · 权威学习资源（第 9 课，全部核验）
- **免费书**：[The Linux Command Line — William Shotts（免费 PDF）](https://linuxcommand.org/tlcl.php)（命令行圣经）、[How Linux Works — Brian Ward](https://nostarch.com/howlinuxworks3)（讲底层运转，贴深理解）。
- **官方 / 大学课程**：[Linux Foundation · Introduction to Linux LFS101（免费）](https://training.linuxfoundation.org/training/introduction-to-linux/)、[MIT · The Missing Semester](https://missing.csail.mit.edu/)（CLI/脚本/Git 等必备技能）。
- **交互实练**：[OverTheWire · Bandit](https://overthewire.org/wargames/bandit/)（命令行闯关）、[Linux Journey](https://linuxjourney.com/)、[Linux Survival](https://linuxsurvival.com/)、[ExplainShell](https://explainshell.com/)（逐段解释命令）。
- **权威参考**：[man7.org（man pages，Michael Kerrisk）](https://man7.org/linux/man-pages/)、[Arch Wiki](https://wiki.archlinux.org/) + 各发行版官方文档。
- **深挖底层（mission 主源）**：[OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/) / [CSAPP](https://csapp.cs.cmu.edu/)（追到内核/系统调用/虚拟内存）。
- **认证（可选目标）**：RHCSA（Red Hat）、LFCS（Linux Foundation）、LPIC（LPI）——考纲公开免费，可作目标驱动学习的骨架。
- **资源合集**：[getvmio/free-linux-resources（GitHub）](https://github.com/getvmio/free-linux-resources)、[It's FOSS · 免费 Linux 书](https://itsfoss.com/learn-linux-for-free/)。

## Wisdom (Communities)
> 兴趣驱动，暂列高信噪比社区；**是否加入 / 偏好待用户确认**。
- **[Unix & Linux Stack Exchange](https://unix.stackexchange.com/)** —— 高信噪、强 moderation 的问答场。用于：把「我对某原理的理解」拿去验证、查具体行为的权威回答。
- **[r/linux4noobs](https://www.reddit.com/r/linux4noobs/) / [r/linux](https://www.reddit.com/r/linux/)** —— 新手友好 + 综合社区。用于：概念澄清、实践经验交流。
- **中文**：[V2EX · Linux 节点](https://www.v2ex.com/go/linux)、[Linux 中国](https://linux.cn/) —— 中文实践者聚集地。

## Gaps
- **鸟哥全书的过时点清单**尚未系统化——每进一章时逐节核对，把纠偏记进对应 lesson 与 NOTES。
- **社区偏好待确认**：用户是否愿意加入上述任一社区（兴趣驱动，非必需）。

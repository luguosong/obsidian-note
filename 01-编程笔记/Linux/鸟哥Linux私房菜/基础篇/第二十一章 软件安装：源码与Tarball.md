---
描述: 从源码（Tarball）编译安装软件的流程：gcc 编译、make/Makefile、动态函数库（ldconfig/ldd）、patch 更新与完整性校验（据鸟哥原作改写，已更新至 Rocky/AlmaLinux 9 当前状态）。
排序: 22000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0520source_code_and_tarball.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-09-06
---
# 第二十一章 软件安装：源码与Tarball

> [!info] 关于本章
> 以鸟哥原作（CentOS 7 版）为骨架，已更新到当前 **Rocky/AlmaLinux 9 / RHEL 9** 状态（CentOS 7 已于 2024-06-30 EOL）：包管理用 `dnf`、默认编译器为 **GCC 11**（可用 GCC Toolset 取更新版）、网络时间服务默认为 `chronyd`。术语统一为大陆通行写法。

Linux 上的软件几乎都遵循 GPL 等开放源码许可，提供源码可供修改。理解"源码如何变成可执行文件"这条链路，既能在需要时自行编译安装软件，也能在编译出错时做基本排查。本章介绍最传统的软件安装方式——从 Tarball 源码包编译安装。

## 21.1 源码安装与升级简介

### 21.1.1 什么是源码、编译器与可执行文件

Linux 上一个文件能否执行，看的是是否具有 `x` 权限；但操作系统真正认识的可执行文件是**二进制文件**（binary program，ELF 格式），如 `/usr/bin/passwd`、`/usr/bin/touch`。shell 脚本本身只是文本，最终仍由 bash 这个二进制程序解释执行。

用 `file` 命令可以区分二者：

```bash
# 二进制可执行文件：显示 ELF ...
$ file /bin/bash
/bin/bash: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked
  (uses shared libs), for GNU/Linux ..., stripped

# shell 脚本：显示 ... shell script, ASCII text executable
$ file /usr/bin/ls
/usr/bin/ls: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV) ...
```

> [!note] 关键概念
> - **源码**：人类可读的程序代码（纯文本），机器无法直接执行；
> - **编译器**：把源码翻译成机器码（二进制）的工具，相当于"翻译官"；
> - **可执行文件**：经编译、链接生成的二进制程序，机器能直接执行。

编写源码用任意文本编辑器（vim、VS Code 等），Linux 上最经典的编程语言是 C，标准编译器是 **gcc**。整个流程：源码（`*.c`）→ 编译器编译 → 目标文件（`*.o`）→ 链接函数库 → 可执行文件。

```mermaid
flowchart LR
    src["源码<br/>*.c"] -->|gcc 编译| obj["目标文件<br/>*.o"]
    obj -->|链接函数库| exe["可执行文件<br/>ELF 二进制"]
```
*图：gcc 编译流程（源码 → 目标文件 → 链接函数库 → 可执行文件）*

### 21.1.2 什么是函数库

**函数库**（library）是一段可被调用以完成特定功能的代码集合，类似"子函数"。例如 Linux 的 **PAM 模块**提供统一的身份认证机制，任何需要验证用户登录的程序都可以调用它，而不必各自实现认证逻辑；需要加密的网络连接则常调用 OpenSSL 函数库。

源码中若调用了外部函数库，编译时就必须把这些函数库链接进来，才能生成正确的可执行文件。函数库分**动态**与**静态**两类（见 [21.5](#2151-动态与静态函数库)）。

![[vbird-dd31816ab798059b.gif]]
*图：程序运行时引用外部动态函数库*

Linux 内核与系统提供的大量函数库及头文件（header），主要放在 `/usr/include`、`/usr/lib`、`/usr/lib64`，编写或编译驱动、底层程序时常用。

### 21.1.3 什么是 make 与 configure

用 gcc 直接编译大型软件几乎不可行——一个软件（如 Apache、Linux 内核源码）动辄数百 MB、成百上千个源文件，逐条手敲编译与链接指令会非常繁琐。`make` 工具就是为此而生：它读取当前目录下的 `Makefile`（或 `makefile`）文本文件，按其中记录的规则自动判断哪些源码变动了，并据此编译、链接、更新可执行文件。

那 `Makefile` 怎么来？软件作者通常会提供一个**检测脚本**（一般叫 `configure` 或 `config`）来检查用户的运行环境并自动生成 `Makefile`。检测的内容大致包括：

- 是否有合适的编译器（如 gcc）能编译本软件；
- 本软件依赖的函数库和其它软件是否已存在；
- 操作系统平台与内核版本是否合适；
- 内核头文件（header include）是否齐全（编译驱动时必需）。

> [!note] 为什么不能跨发行版直接复制可执行文件
> 不同发行版的函数库路径、版本、默认编译器、内核版本都可能不同。在 Rocky 9 上编译出的二进制程序，拿到 Debian 或 Ubuntu 上通常**无法运行**——它链接的函数库在那里路径或版本对不上。所以同一套软件要在不同平台运行，**必须在该平台重新编译**，这正是源码的价值所在。

![[vbird-f253cc1ed68995d1.gif]]
*图：通过 configure 与 make 进行编译的流程*

### 21.1.4 什么是 Tarball

源码是纯文本，在网上传输很费带宽。把软件所有源码文件先用 `tar` 打包、再压缩，就是 **Tarball**。常见扩展名：

| 压缩格式 | 扩展名 | 特点 |
|---|---|---|
| gzip | `*.tar.gz` / `*.tgz` | 速度最快，传统主流 |
| bzip2 | `*.tar.bz2` | 压缩率更高 |
| **xz** | **`*.tar.xz`** | **压缩率最高，当前主流** |
| zstd | `*.tar.zst` | 解压快、压缩率好，新发行版渐多 |

解压一个 Tarball 后，里面通常有：

- 源码文件；
- 检测脚本（`configure` 或 `config`）；
- 简易说明与安装说明（`INSTALL`、`README`）。

`README` 和 `INSTALL` 最重要——安装前**务必先读**。

### 21.1.5 如何安装与升级软件

需要安装或升级软件的常见原因：需要新功能、旧版本有安全漏洞、旧版本性能或能力不足。**安全漏洞一旦披露应立即更新。**

安装方式分两大类：

| 方式 | 优点 | 缺点 |
|---|---|---|
| **从源码编译**（Tarball） | 弹性最大，可定制功能、跨平台 | 流程繁琐，依赖需自行解决 |
| **用预编译包**（RPM/dnf、deb/apt） | 省去编译，自动解决依赖 | 不能改功能，依赖特定发行版 |

预编译包机制：Red Hat 系（Fedora/CentOS/Rocky/AlmaLinux/RHEL）用 **RPM** 管理 + **dnf** 在线更新；Debian 系用 **dpkg** + **APT**。本章讲 Tarball，RPM/dnf 留待下一章。

Tarball 安装的基本流程：

1. 从厂商网站下载 Tarball；
2. 解压，得到一堆源码文件；
3. 用 gcc 把源码编译成目标文件（`*.o`）；
4. 用 gcc 把目标文件与函数库链接成可执行文件；
5. 把可执行文件与相关配置文件安装到主机相应路径。

第 3、4 步通常由 `make` 自动完成。系统里至少要有 `gcc` 和 `make`。

## 21.2 用 gcc 编译的简单范例

> [!tip] 准备编译环境
> Rocky/AlmaLinux 9 默认**不安装**编译器。先装好开发工具组：
> ```bash
> # 安装编译器、make 等开发工具
> sudo dnf groupinstall "Development Tools"
> # 或单独装
> sudo dnf install gcc gcc-c++ make
> # 编译驱动等还需内核头文件（版本与当前内核一致）
> sudo dnf install kernel-devel kernel-headers
> ```

### 21.2.1 单文件：打印 Hello World

用 C 写第一个程序：

```c
// hello.c
#include <stdio.h>
int main(void)
{
    printf("Hello World\n");
}
```

编译并运行：

```bash
$ gcc hello.c                    # 默认生成 a.out
$ ./a.out
Hello World

$ gcc -c hello.c                 # 只编译成目标文件，不链接
$ ls hello*
hello.c  hello.o                 # 生成了 hello.o

$ gcc -o hello hello.o           # 链接成指定名称的可执行文件
$ ./hello
Hello World
```

默认（不加参数）生成 `a.out`；`-c` 只编译不链接，产生目标文件 `*.o`；`-o` 指定输出文件名。

### 21.2.2 主、子函数链接

实际程序常被拆成多个源文件。下面 `thanks.c` 调用 `thanks_2.c` 里的子函数：

```c
// thanks.c —— 主程序
#include <stdio.h>
int main(void)
{
    printf("Hello World\n");
    thanks_2();                  // 调用子函数
}
```

```c
// thanks_2.c —— 子函数
#include <stdio.h>
void thanks_2(void)
{
    printf("Thank you!\n");
}
```

分别编译成目标文件，再链接：

```bash
$ gcc -c thanks.c thanks_2.c     # 生成 thanks.o、thanks_2.o
$ gcc -o thanks thanks.o thanks_2.o
$ ./thanks
Hello World
Thank you!
```

> [!note] 为什么先编译目标文件再链接
> 拆成多个源文件后无法一次编译完成。先生成各自的目标文件，再链接成可执行文件的好处：**只改了某个源文件时，只需重编那一个 `*.o`，再链接即可**，其余未改动的目标文件无需重新编译。这对大型软件（编译耗时数十分钟到数小时）极其重要，`make` 正是利用这一特性做增量编译。

常用的额外编译选项：

```bash
$ gcc -O -c thanks.c thanks_2.c   # -O 启用优化（生成更快的代码）
$ gcc -Wall -c thanks.c thanks_2.c # -Wall 开启详细警告信息
```

更多选项查 `man gcc`。

### 21.2.3 调用外部函数库

要计算 `sin(90°)`，需调用数学函数库 `libm.so`：

```c
// sin.c
#include <stdio.h>
#include <math.h>
int main(void)
{
    float value;
    value = sin(3.14 / 2);        // 注意：参数用弧度，90°≈1.57 弧度
    printf("%f\n", value);
}
```

编译时链接数学库：

```bash
$ gcc sin.c -lm -L/lib64 -I/usr/include
$ ./a.out
1.000000
```

选项含义：

| 选项 | 含义 |
|---|---|
| `-l<名称>` | 链接名为 `lib<名称>.so` 的函数库，`lib` 前缀与 `.so`/`.a` 后缀省略。如 `-lm` → `libm.so` |
| `-L<路径>` | 在指定路径下搜索函数库（默认已含 `/lib64`、`/usr/lib64`，可省略） |
| `-I<路径>` | 在指定路径下搜索头文件（默认已含 `/usr/include`，可省略） |

> [!tip] 新版 GCC 的便利
> 现代 GCC（RHEL 9 自带的 GCC 11）对数学库这类常用库常会自动链接，直接 `gcc sin.c` 也能编译通过。但显式写 `-lm` 是更稳妥、可移植的做法。

### 21.2.4 gcc 常用选项小结

| 选项 | 作用 |
|---|---|
| `-c` | 只编译成目标文件（`*.o`），不链接 |
| `-O` | 启用优化（还有 `-O2`、`-O3`） |
| `-l<名称>` | 链接指定函数库 |
| `-L<路径>` | 函数库搜索路径 |
| `-I<路径>` | 头文件搜索路径 |
| `-o <文件名>` | 指定输出文件名 |
| `-Wall` | 输出详细警告信息 |

`-Wall`、`-O` 这类可选参数常被称为**标志**（FLAGS），C 程序的对应变量简称 `CFLAGS`，在 `make` 中会反复用到。

## 21.3 用 make 简化编译

### 21.3.1 为什么用 make

假设一个程序由 `main.c`、`haha.c`、`sin_value.c`、`cos_value.c` 四个源文件组成，且用到数学库。手工编译要敲四条 `gcc -c` 加一条链接，每次重编都要重来。改用 `make`，只需在目录下写一个 `makefile`：

```makefile
main: main.o haha.o sin_value.o cos_value.o
	gcc -o main main.o haha.o sin_value.o cos_value.o -lm
# 注意：第二行行首是 <Tab>，不是空格
```

之后：

```bash
$ rm -f main *.o                  # 清掉旧产物
$ make                            # make 自动读 makefile 并编译
cc    -c -o main.o main.c
cc    -c -o haha.o haha.c
cc    -c -o sin_value.o sin_value.c
cc    -c -o cos_value.o cos_value.c
gcc -o main main.o haha.o sin_value.o cos_value.o -lm

$ make                            # 不改源码再 make，什么都不会做
make: 'main' is up to date.
```

> [!note] make 相比 shell 脚本的优势
> 写成 shell 脚本每次都全量重编；而 `make` 会**根据文件时间戳自动判断哪些源文件改动过，只重编受影响的目标文件**，再按依赖关系更新可执行文件。这能大幅节省大型项目的编译时间。

make 的三大好处：简化编译指令、只重编改动过的文件、按依赖关系更新可执行文件。

### 21.3.2 Makefile 基本语法与变量

基本规则：

```makefile
目标(target): 依赖文件1 依赖文件2
<Tab>	生成命令
```

要点：

- `#` 是注释；
- 命令行**必须以 `<Tab>` 开头**（不能是空格）；
- 目标与依赖文件之间用 `:` 隔开。

可定义多个目标，例如 `clean` 用于清理：

```makefile
main: main.o haha.o sin_value.o cos_value.o
	gcc -o main main.o haha.o sin_value.o cos_value.o -lm
clean:
	rm -f main main.o haha.o sin_value.o cos_value.o
```

```bash
$ make clean                      # 只执行 clean 目标
$ make clean main                 # 先清理再编译
```

**用变量简化重复内容**（与 bash 变量略有不同）：

```makefile
LIBS = -lm
OBJS = main.o haha.o sin_value.o cos_value.o
main: ${OBJS}
	gcc -o main ${OBJS} ${LIBS}
clean:
	rm -f main ${OBJS}
```

变量语法要点：

- 变量与值以 `=` 隔开，两边可有空格；
- 变量名左侧不能有 `<Tab>`；
- `=` 两边不能有 `:`；
- 习惯上变量名用大写字母；
- 引用变量：`${变量}` 或 `$(变量)`；
- shell 环境变量（如 `CFLAGS`）可直接使用。

**`CFLAGS` 的优先级**（从高到低）：

1. make 命令行中设置的值（如 `CFLAGS="-Wall" make`）；
2. Makefile 中指定的值；
3. shell 原有的环境变量。

常用自动变量：`$@` 代表当前目标名（target）。

```makefile
main: ${OBJS}
	gcc -o $@ ${OBJS} ${LIBS}     # $@ 即 main
```

更多规则参考 [GNU make 手册](https://www.gnu.org/software/make/manual/make.html)。

## 21.4 Tarball 的管理与建议

### 21.4.1 编译所需的基础软件

从源码编译软件至少需要：

| 组件 | 说明 | Rocky/AlmaLinux 9 安装 |
|---|---|---|
| **C 编译器** | GNU `gcc` 是 Linux 上自由软件的事实标准 | `dnf install gcc gcc-c++` |
| **make / autoconf** | `make` 按依赖关系编译；`autoconf`（含 `automake`、`libtool`）用于生成 `configure` 脚本 | `dnf install make autoconf` |
| **内核库与头文件** | 编译驱动或与内核交互的程序必需 | `dnf install kernel-devel kernel-headers` |

> [!tip] 一键装齐开发环境
> ```bash
> sudo dnf groupinstall "Development Tools"
> ```
> 该组包含 gcc、make、autoconf 等常用开发工具。RHEL 9 默认 GCC 为 **11.2.1**；需要更新版本可启用 **GCC Toolset**（如 `dnf install gcc-toolset-13`）。

现代发行版默认偏向桌面/服务器使用，**默认不安装**编译工具链——所以新手常遇到的"找不到 gcc""无法使用 make"多半是没装开发工具。

### 21.4.2 Tarball 安装的基本步骤

绝大多数 Tarball 软件的安装步骤：

1. **解压**：把 Tarball 解到 `/usr/local/src`；
2. **读说明**：进入新目录，仔细阅读 `INSTALL` 与 `README`（很重要！）；
3. **解决依赖**：按 `INSTALL`/`README` 的说明装好依赖软件；
4. **生成 Makefile**：运行 `./configure` 检测环境并生成 `Makefile`；
5. **编译**：`make`；
6. **安装**：`make install`。

对应的命令套路：

```bash
./configure          # 检测环境，生成 Makefile（--prefix 指定安装目录）
make clean           # 清掉上次残留的目标文件（可选但推荐）
make                 # 编译
make install         # 安装到预定目录
```

> [!warning] 步骤必须依次成功
> 这几步是**串行依赖**关系：`./configure` 失败 → 没有 `Makefile` → 后面全做不了；`make` 失败 → 没有可执行文件 → `make install` 无从安装。任何一步出错都必须先排查解决，再继续下一步。

`./configure` 最关键的参数是 `--prefix=/path`，指定软件未来安装到哪个目录；不指定时默认 `/usr/local`。其它参数用 `./configure --help` 查看。

### 21.4.3 安装目录建议（如何卸载、升级）

Linux 发行版自带的软件装在 `/usr` 下；自行编译的软件**建议装在 `/usr/local`**，源码解压到 `/usr/local/src`。这样便于与系统软件区分，也方便多人协作交接。

以 Apache 为例，发行版包的文件散布在 `/etc/httpd`、`/usr/lib64`、`/usr/bin`、`/usr/share/man`（配置、函数库、可执行文件、手册）。若把 Tarball 装到默认 `/usr/local`，文件会混进 `/usr/local/{etc,bin,lib,man}`，**多款软件混在一起，卸载时难以追溯来源**。

更好的做法是给每款软件单独的子目录，例如装到 `/usr/local/apache`：

```
/usr/local/apache/etc      # 配置文件
/usr/local/apache/bin      # 可执行文件
/usr/local/apache/lib      # 函数库
/usr/local/apache/man      # 手册
```

卸载时只需 `rm -rf /usr/local/apache`。

> [!note] 单独目录的代价
> 单独目录便于卸载，但 `/usr/local/apache/bin` 不在 `PATH` 里，执行命令要用绝对路径或把该目录加入 `PATH`；对应的手册目录也要加入 man 的搜索路径。在 `/etc/man_db.conf` 中加一行：
> ```
> MANPATH_MAP /usr/local/apache/bin /usr/local/apache/man
> ```

Tarball 升级的麻烦：相互依赖的软件（如 PHP + MySQL + Apache）需要按顺序编译，升级其中一个可能牵连其它重新编译。

> [!tip] 优先用包管理
> 如今绝大多数常用软件都已被社区打包成 RPM/dnf 包。RHEL 系有 **EPEL** 仓库（[fedoraproject.org/wiki/EPEL](https://docs.fedoraproject.org/en-US/epel/)）补充大量额外软件。除非要用专有软件或冷门软件，否则优先 `dnf install`，比 Tarball 省事得多、也更容易升级维护。

### 21.4.4 实例：编译安装 NTP

> [!info] 现代背景
> RHEL 9 / Rocky 9 默认用 **chronyd** 同步时间（已装好并启用），日常无需自行编译 NTP。这里仅以 NTP 源码为例**演示 Tarball 安装流程**，源码可从 [ntp.org](https://www.ntp.org/downloads/) 下载。

要求：

- Tarball 放在 `/root`；
- 源码解到 `/usr/local/src`；
- 安装到 `/usr/local/ntp`。

步骤：

```bash
# 1. 解压并读说明
$ cd /usr/local/src
$ tar -Jxf /root/ntp-4.2.8p.tar.xz       # xz 压缩用 -J
$ cd ntp-4.2.8p
$ less INSTALL                            # 务必先读 INSTALL 与 README

# 2. 查看可用参数，再生成 Makefile
$ ./configure --help | less               # 重点看 --prefix 等
$ ./configure --prefix=/usr/local/ntp --enable-all-clocks --enable-parse-clocks
...
checking for gcc... gcc                   # 确认找到 gcc
...
config.status: creating Makefile          # 成功生成 Makefile

# 3. 编译并安装
$ make clean; make
$ make check                              # 可选：自检
$ make install                            # 安装到 /usr/local/ntp
```

完成后 `/usr/local/ntp` 下会生成 `bin`、`sbin`、`lib`、`man` 等子目录。

### 21.4.5 用 patch 更新源码

软件升级时往往只改了少数几处代码，下载整个新版 Tarball 既费带宽又费时间。更高效的做法是：作者公布新旧版本之间的差异文件（**patch file**），用户只更新变化部分。

`diff` 命令可以列出两个文件的差异，`patch` 命令据此把旧文件更新为新版本。基本用法：

```bash
patch -p数字 < patch_file
```

`-p数字` 表示从 patch file 里记录的路径中**去掉几层目录**（即去掉几个 `/`）。

示例：把 `main-0.1` 升级到 `main-0.2`：

```bash
# patch file 首行记录的路径形如 main-0.1/cos_value.c
# 当前在 main-0.1 目录中，需去掉一层目录名，故用 -p1
$ patch -p1 < ../main_0.1_to_0.2.patch
patching file cos_value.c
patching file main.c
patching file Makefile
patching file sin_value.c

$ make clean main                          # 重新编译
$ ./main
version 0.2                                # 已更新到 0.2 版
...
```

> [!warning] patch 只改源码，仍需重新编译
> patch 更新的是**源码文本**，不是可执行文件。打完 patch 后必须重新 `make`，才能得到更新后的程序。打错了可还原：`patch -R < patch_file`。

跨多个版本的升级，需**按版本顺序依次**打多个 patch（如 2.4.20→2.4.26 要依次打 6 个 patch）；除非有人已比对过首尾版本并发布了合并 patch。

## 21.5 函数库管理

### 21.5.1 动态与静态函数库

| 维度 | 静态函数库 | 动态函数库 |
|---|---|---|
| 扩展名 | `libxxx.a` | `libxxx.so`（带版本号，如 `libxxx.so.1`） |
| 编译时 | 整个库被**复制进**可执行文件 | 只在可执行文件中留一个**指向指针** |
| 文件大小 | 较大 | 较小 |
| 独立运行 | 可独立运行 | 运行时**必须能找到**该 `.so` 文件，路径不可乱改 |
| 升级 | 库升级后，所有用到它的程序都**需重新编译** | 库升级后，程序**无需重编**（直接指向新库，前提是文件名不变） |
| 磁盘/内存 | 多份副本，浪费 | 多个程序共享一份，节省 |

> [!note] 现代主流是动态函数库
> Linux 软件之间依赖关系极其复杂，若都用静态库，升级一个库就要重编海量程序。动态函数库只需升级库本身，依赖它的程序无需变动——这是当前所有发行版的默认选择。绝大多数函数库放在 `/usr/lib64`、`/usr/lib`（部分较新的发行版做了 usrmerge，把 `/lib64`、`/lib` 合并为指向 `/usr/lib64`、`/usr/lib` 的符号链接；RHEL 9/Rocky 9 仍保留独立的 `/lib64`）。内核模块放在 `/lib/modules/$(uname -r)/`。

### 21.5.2 ldconfig 与 /etc/ld.so.conf

内存的读取速度远高于硬盘。若把常用的动态函数库预先加载到内存缓存，程序调用时就不必每次从硬盘读，从而加快启动。这由 `ldconfig` 配合 `/etc/ld.so.conf` 完成。

把动态函数库加入缓存的步骤：

1. 在 `/etc/ld.so.conf.d/yourfile.conf` 中写入函数库**所在的目录**（是目录，不是文件）；
2. 运行 `ldconfig` 读取配置，把相关函数库加载到缓存，并记录到 `/etc/ld.so.cache`。

![[vbird-1266e2be8ad00544.gif]]
*图：用 ldconfig 把动态函数库预加载到内存*

```bash
$ ldconfig [-f conf] [-C cache]
$ ldconfig [-p]
# -f conf   用 conf 替代默认的 /etc/ld.so.conf
# -C cache  用 cache 替代默认的 /etc/ld.so.cache
# -p        列出当前缓存中的所有函数库

# 示例：把 MariaDB 函数库加入缓存
$ vim /etc/ld.so.conf.d/mariadb.conf
/usr/lib64/mysql                           # 新增这一行

$ ldconfig                                 # 无任何输出，正常
$ ldconfig -p | grep mysql                 # 查询是否已加载
```

自行编译安装的软件若带动态函数库，可照此将其目录写入 `/etc/ld.so.conf.d/*.conf` 后执行 `ldconfig`。

### 21.5.3 用 ldd 查看动态函数库依赖

`ldd` 用于查询一个可执行文件（或 `.so`）依赖哪些动态函数库：

```bash
$ ldd [-vdr] filename
# -v  显示详细版本信息
# -d  显示缺失的链接点
# -r  显示 ELF 相关错误

# 示例：查看 /usr/bin/passwd 依赖的库
$ ldd /usr/bin/passwd
...
        libpam.so.0 => /lib64/libpam.so.0      # PAM 模块
        libpam_misc.so.0 => /lib64/libpam_misc.so.0
        libaudit.so.1 => /lib64/libaudit.so.1  # audit 子系统
        libselinux.so.1 => /lib64/libselinux.so.1  # SELinux
...

# 示例：查看 libc.so.6 自身还依赖什么（-v 显示版本来源）
$ ldd -v /lib64/libc.so.6
```

排查"依赖属性"问题（某软件缺库无法运行）时，`ldd` 是第一利器。

## 21.6 校验文件完整性

从网上下载的软件包有可能被篡改。每个文件的内容与大小不同，用一个**哈希指纹**即可唯一刻画它；一旦被改动，哈希值必然变化。Linux 发行版的 ISO 镜像下载页都会同时公布校验值（如 Rocky Linux 镜像页提供 SHA-256）。

### 21.6.1 md5sum / sha256sum

```bash
$ sha256sum [-bct] filename
$ sha256sum --check checksum_file
# -b  以二进制方式读取
# -c  对照校验文件验证（filename 是含哈希值的文件）
# -t  以文本方式读取（默认）
```

示例：下载 NTP 源码包后核对官方公布的 MD5：

```bash
$ md5sum ntp-4.2.8p.tar.gz
b98b0cbb72f6df04608e1dd5f313808b  ntp-4.2.8p.tar.gz
# 与官网公布的值比对，一致即未被篡改
```

> [!warning] MD5 / SHA-1 已不安全
> MD5 与 SHA-1 早已被密码学界证明存在碰撞攻击，**不能再用于安全校验**。当前推荐 **SHA-256** 及以上（`sha256sum`），发行版镜像与主流软件的官方校验值也已统一切换到 SHA-256。本节保留 md5sum 的用法仅为对照历史命令。

> [!tip] 完整性巡检
> 把系统中最容易被木马替换的关键文件（如 `/etc/passwd`、`/etc/shadow`、`/etc/group`、所有 SUID/SGID 程序等）的哈希值定期记录下来，再用定时任务（cron / systemd timer）每日比对，能尽早发现入侵。示例如下：
> ```bash
> # 1. 生成待监控文件列表（含 SUID/SGID 程序）
> ls /etc/{passwd,shadow,group} > important.file
> find /usr/sbin /usr/bin -perm /6000 >> important.file
>
> # 2. 生成指纹库
> for f in $(cat important.file); do sha256sum "$f"; done > finger1.file
> chattr +i finger1.file            # 设为不可修改，防篡改
> ```

## 21.7 重点回顾

- 源码是纯文本，需经编译器（Linux 上标准为 **gcc**）编译、链接后，才能生成系统认识的可执行文件（ELF 二进制）；
- 开放源码加速了软件更新与漏洞修补；
- 编译时可调用其它软件提供的**函数库**来复用功能（如 PAM、OpenSSL）；
- `make` 配合 `Makefile` 简化了大型项目的编译指令，并支持**增量编译**（只重编改动过的目标文件）；
- **Tarball** = `tar` 打包 + 压缩（gzip/bzip2/xz/zstd），内含源码、`configure`、`README`/`INSTALL`；
- 编译所需基础软件：`gcc`、`make`、`autoconf`、`kernel-devel`/`kernel-headers`（Rocky/AlmaLinux 9 用 `dnf groupinstall "Development Tools"` 一次装齐）；
- 函数库分动态（`*.so`）与静态（`*.a`）；现代主流是**动态函数库**，升级时无需重编依赖程序；
- `patch` 只更新源码，打完仍需重新编译；打错可 `patch -R` 还原；
- `ldconfig` 配合 `/etc/ld.so.conf.d/*.conf` 构建动态函数库缓存；`ldd` 查看可执行文件的库依赖；
- 校验文件完整性用 `sha256sum`（MD5/SHA-1 已不安全）。

## 21.8 习题

1. **实作**：从 [ntp.org](https://www.ntp.org/downloads/) 下载一份 NTP 源码 Tarball，按 21.4.4 的流程编译安装到 `/usr/local/ntp`，并用 `sha256sum` 校验下载文件未被篡改。
2. **实作**：写一个由两个 `.c` 文件组成的小程序（一个主程序调用另一个子函数），先用 `gcc -c` 分别编译、再链接；再改写成 `Makefile`，体会 `make` 的增量编译——只改其中一个 `.c` 后重新 `make`，观察哪些命令被执行。
3. **思考**：为什么在 Rocky 9 上编译出的二进制程序，直接复制到 Debian 上通常无法运行？从函数库路径与版本的角度说明。
4. **进阶**：为本机一组关键系统文件（`/etc/passwd`、`/etc/shadow`、所有 SUID/SGID 程序）建立 SHA-256 指纹库，并用 systemd timer 或 cron 每日自动比对，发现变化即报告。

## 延伸阅读

- [GNU make 手册（官方）](https://www.gnu.org/software/make/manual/make.html)
- [GCC manual（官方）](https://gcc.gnu.org/onlinedocs/)
- [Red Hat: Developing C and C++ applications in RHEL 9](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/developing_c_and_cpp_applications_in_rhel_9/)
- [EPEL — Fedora Project](https://docs.fedoraproject.org/en-US/epel/)
- [SHA-2 — Wikipedia](https://en.wikipedia.org/wiki/SHA-2)
- [ld.so — Wikipedia（动态链接器）](https://en.wikipedia.org/wiki/Dynamic_linker)

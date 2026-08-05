---
描述: RPM/SRPM 软件包管理，以及 dnf 软件源（仓库）的使用（据鸟哥原作改写，已更新至 Rocky/AlmaLinux 9 / RHEL 9 当前状态）。
排序: 23000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0520rpm_and_srpm.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-09-09
---
# 第二十二章 软件安装：RPM、SRPM与DNF

> [!info] 关于本章
> 本章以鸟哥《Linux 私房菜 — 基础学习篇》第二十二章为骨架，已更新到 **Rocky/AlmaLinux 9 / RHEL 9 当前状态**：包管理主线由 `yum` 切换为 `dnf`（`yum` 仍作 `dnf` 的软链接保留兼容）；引入 **module / AppStream** 软件源；补 **EPEL / CRB** 与 **Flatpak / Snap / AppImage** 跨发行版方案；术语统一为大陆通行写法。CentOS 7 已于 2024-06-30 EOL，仅作历史对照。

源码编译虽然可以客制化，但对发行版发布者与一般用户而言，软件管理负担很重。把软件预先在相同的硬件与操作系统上编译好、按统一格式打包、再附上查询/安装/卸载/升级机制——这就是 **软件包管理器**。在 Linux 界，Red Hat 系用 RPM，Debian 系用 dpkg。

## 22.1 软件管理器简介

### 22.1.1 Linux 两大主流：RPM 与 DPKG

发行商先在固定平台上把软件编译好，连同依赖信息、安装脚本一起打包成特殊格式的文件，再对外发布。客户端通过特定指令安装时，包内的脚本会先检测依赖的前驱软件是否存在，满足条件才安装，安装完成后再把信息登记到本机数据库，便于将来升级与卸载。

| distribution 代表 | 包管理机制 | 主要命令 | 在线升级机制（命令） |
| --- | --- | --- | --- |
| Red Hat / Fedora / Rocky / AlmaLinux | RPM | `rpm`、`rpmbuild` | **DNF（`dnf`）**，`yum` 仍作兼容软链接 |
| Debian / Ubuntu | DPKG | `dpkg` | APT（`apt`、`apt-get`） |

### 22.1.2 什么是 RPM 与 SRPM

**RPM（RedHat Package Manager）**：把已经编译好的二进制程序、配置文件、依赖清单等一起打包，安装时按包内记录检查主机是否满足依赖，满足才装，安装后把软件信息写入 RPM 数据库，便于查询、升级、卸载。

RPM 的优点：编译已完成，传输与安装方便；信息已入库，查询、升级、卸载便利。

RPM 的缺点（软件包环境依赖问题）：

1. 包的运行环境必须与打包环境一致或相当；
2. 必须满足软件声明的依赖；
3. 卸载时要按依赖顺序，底层软件（被依赖者）不能先删，否则上层软件集体失效；
4. 不同发行版、甚至同一发行版的不同大版本之间，RPM 包通常不通用。

**SRPM（Source RPM）**：内含**未编译的源码**与 spec 文件、依赖说明、`configure`/`Makefile` 参数。安装 SRPM 时先在本机编译成 RPM，再安装。因此可以**修改编译参数**，重新打包成适合本机环境的 RPM，而不必与原作者的打包环境一致。

| 文件格式 | 文件名格式 | 能否直接安装 | 内含程序类型 | 能否改参数再编译 |
| --- | --- | --- | --- | --- |
| RPM | `xxx.rpm` | 可 | 已编译二进制 | 不可 |
| SRPM | `xxx.src.rpm` | 不可 | 未编译源码 | 可 |

> [!note] 为什么 Rocky/AlmaLinux 能与 RHEL 二进制兼容
> Red Hat 发布 RHEL 时会同时释出 SRPM。Rocky Linux、AlmaLinux 等社区发行版就是把这些 SRPM 收集起来，在相同硬件与编译环境下**重新编译**为 RPM 再发布，从而与 RHEL 二进制兼容。SRPM 也是这套体系得以存在的基础。

### 22.1.3 软件包命名与架构

RPM 与 SRPM 的命名格式：

```text
xxxxxxxxx.rpm        # 已编译、打包完成的 RPM
xxxxx.src.rpm        # 含未编译源码的 SRPM
```

完整文件名各字段以 `-` 分隔，例如 `rp-pppoe-3.11-5.el9.x86_64.rpm`：

```text
rp-pppoe  -  3.11  -  5       .el9.x86_64  .rpm
软件名      版本     释出次数   适用平台       扩展名
```

- **软件名**：包的名称；
- **版本**：主版本.次版本（如 3.11）；
- **释出次数（Release）**：同一版本因 bug 修复或编译参数调整而重新打包的次数；
- **适用平台**：编译时针对的硬件架构。

| 架构标记 | 说明 |
| --- | --- |
| `i386` / `i586` / `i686` | 早期 32 位 x86 等级，**现已基本退出主流** |
| **`x86_64`** | 64 位 x86，**当前 PC 与服务器主流** |
| **`aarch64`** | 64 位 ARM，服务器（Ampere、AWS Graviton）快速增长 |
| `noarch` | 不区分架构，多为脚本、文档、数据型软件 |

> [!info] 当前主流只有 x86_64 / aarch64 / noarch
> Rocky/AlmaLinux 9 / RHEL 9 仅发布 64 位版本，常见架构为 `x86_64` 与 `aarch64`。x86_64 硬件可运行旧版 i686 软件，反之不行。

### 22.1.4 RPM 的优点与依赖问题

RPM 在打包时同步登记软件版本、打包者、依赖的其他软件、功能说明、所含全部文件清单等信息，并在本机维护一个 RPM 数据库。安装时据此检查依赖：若依赖项缺失，默认拒绝安装。

这正是 RPM 最被诟病的"软件依赖（dependency）"问题——为复用功能，很多软件以**动态链接库**形式提供能力（如 PAM 认证模块），而发行版又常把软件拆成"运行时（runtime）"与"开发（devel）"两类，于是依赖链层层嵌套。

### 22.1.5 依赖问题的解决：DNF 软件源

要破解依赖地狱，思路是：把所有软件的依赖关系汇总成清单，安装时先查清单、与本地已装软件比对，缺失的依赖一次性全部取来装上。这就是 **DNF（Dandified YUM）** 的由来。

DNF 服务器（即**软件源 / 仓库，repository**）一侧维护软件包与依赖清单（`repodata`）；客户端有安装需求时，先下载清单到本地缓存，与本地 RPM 数据库比对，确定要下载哪些包，再回到仓库取包并调用 RPM 机制完成安装——**最终落地仍走 RPM**。

![[vbird-faf5dbd4b5c1df71.gif]]
*图：DNF（原 YUM）的工作流程（客户端拉取清单 → 比对本地数据库 → 下载所需软件包 → 交 RPM 安装）*

> [!tip] 为什么要分多个"软件源"
> 同一个仓库服务器上的包性质不同：发行版原版（BaseOS/AppStream）、更新（updates）、第三方附加（EPEL/CRB）等，分类后用不同仓库 URL 区分，便于按需启用。

## 22.2 RPM 软件管理程序：rpm

> [!tip] rpm 与 dnf 的分工
> 日常**安装/升级/卸载已交由 `dnf` 处理**（自动解决依赖）；`rpm` 命令的实战价值主要在**查询（query）**与**验证（verify）**——查某个文件属于哪个包、验证包文件是否被改动，这两类操作 `dnf` 不替代。

### 22.2.1 RPM 默认安装路径

RPM 包安装时按内嵌规则把文件分发到固定目录，并把软件信息写入数据库：

| 目录 | 内容 |
| --- | --- |
| `/etc` | 配置文件，如 `/etc/crontab`、`/etc/yum.repos.d/` |
| `/usr/bin` | 可执行文件 |
| `/usr/lib`、`/usr/lib64` | 动态链接库 |
| `/usr/share/doc` | 使用手册与说明文档 |
| `/usr/share/man` | man page |

RPM 数据库位置：

| 发行版 | 数据库路径 | 后端 |
| --- | --- | --- |
| CentOS 7 / RHEL 7 | `/var/lib/rpm/`（`Packages` 等文件） | Berkeley DB |
| **Rocky/AlmaLinux 9 / RHEL 9** | `/var/lib/rpm/`（常软链到 `/usr/lib/sysimage/rpm/`），主文件 `rpmdb.sqlite` | **SQLite** |

> [!warning] 不要删除 RPM 数据库目录
> 数据库存放着所有已装软件的版本、文件清单、依赖、数字签名等。删除会让升级、查询、验证全部失效。重建用 `rpm --rebuilddb`。

### 22.2.2 RPM 安装（install）

```bash
# 基本安装
rpm -i /mnt/Packages/rp-pppoe-3.11-5.el9.x86_64.rpm

# 常用：显示进度与详细信息
rpm -ivh package_name
# -i install  -v 详细信息  -h 进度条

# 一次装多个包
rpm -ivh a.rpm b.rpm *.rpm

# 从 URL 安装
rpm -ivh https://site/path/pkgname.rpm
```

常用安装选项：

| 选项 | 用途与风险 |
| --- | --- |
| `--nodeps` | 跳过依赖检查强制安装。**危险**：依赖项缺失会导致软件运行异常 |
| `--replacefiles` | 强行覆盖已被其他包占用的文件。覆盖不可逆，慎用 |
| `--replacepkgs` | 重新安装已装过的包 |
| `--force` | `--replacefiles` + `--replacepkgs` 的综合 |
| `--test` | 仅测试能否安装、能否满足依赖，不真正安装 |
| `--nosignature` | 跳过数字签名校验 |
| `--prefix 新路径` | 把包装到非默认目录（仅对支持重定位的包有效） |
| `--noscripts` | 不执行包内安装前/后的脚本 |

> [!tip] 优先用 -ivh，慎用 --force
> 遇到问题逐项排查，少用"暴力安装法"。能用 `dnf install ./本地包.rpm` 解决依赖时优先用 dnf。

### 22.2.3 RPM 升级与更新（upgrade/freshen）

| 选项 | 行为 |
| --- | --- |
| `-Uvh` | 未安装则直接安装；已安装则升级到新版 |
| `-Fvh` | **仅升级**已安装的包；未安装的不会装上 |

> [!note]
> 早期没有 `dnf`、网络又差时，常从镜像站批量下载新版 RPM 后用 `rpm -Fvh *.rpm` 一次性升级已装包。现在直接 `dnf upgrade` 即可，这种笨办法已不必要。

### 22.2.4 RPM 查询（query）

查询走两条路：查**本机已装软件**（信息来自 RPM 数据库）；查**某个 RPM 文件**（用 `-qp` 解析文件头）。查询已装软件只需软件名，不必带版本；查询 RPM 文件必须给完整文件名。

```bash
rpm -qa                     # 列出所有已装软件
rpm -q[licdR] 软件名         # 查已装软件的各类信息
rpm -qf /某/文件             # 查某文件属于哪个已装包
rpm -qp[licdR] 文件名.rpm    # 查未安装的 RPM 文件信息
```

| 子选项 | 含义 |
| --- | --- |
| `-q` | 仅查询是否安装 |
| `-qa` | 列出所有已装包 |
| `-qi` | 详细信息（开发商、版本、说明） |
| `-ql` | 列出该包提供的全部文件与目录 |
| `-qc` | 仅列配置文件 |
| `-qd` | 仅列文档 |
| `-qR` | 列出该包依赖的文件/能力 |
| `-qf` | 由文件反查所属包 |
| `-q --scripts` | 列出安装前/后脚本（可用于排查） |

示例：

```bash
# 是否安装了 logrotate
rpm -q logrotate

# 列出 logrotate 提供的全部文件
rpm -ql logrotate

# 详细信息
rpm -qi logrotate

# 安装 logrotate 还需要哪些前提
rpm -qR logrotate

# /bin/sh 由哪个包提供
rpm -qf /bin/sh

# 查某个未安装 RPM 文件的需求
rpm -qpR filename.rpm
```

例题：

1. 列出系统以 `c` 开头的软件数量：`rpm -qa | grep ^c | wc -l`
2. Apache 的 RPM 包名是 `httpd`，查它的所有配置文件：`rpm -qc httpd`
3. 配置文件已被改、想重装：`rpm -ivh http://web/path/httpd-x.x.x.rpm --replacepkgs`
4. 误删 `/etc/crontab`，不知属于哪个包：`rpm -qf /etc/crontab` 查出所属包后重装。

### 22.2.5 RPM 验证与数字签名（verify/signature）

验证（verify）用 `/var/lib/rpm` 数据库的内容，**比对系统当前实际文件**——找出哪些文件被改动过（容量、权限、时间、内容指纹等）。常用于排查"文件被改"或"是否被入侵"。

```bash
rpm -Va                    # 验证所有已装包
rpm -V 软件名              # 验证某个包
rpm -Vp 某个.rpm           # 用某 RPM 文件作基准验证
rpm -Vf /系统上的某文件    # 验证某文件所属包
```

输出行的 9 个标志位含义（标志位为对应字母表示"该项有变化"，点 `.` 表示一致）：

| 标志 | 含义 |
| --- | --- |
| `S` | 文件大小（Size）变化 |
| `M` | 模式（类型/权限 rwx）变化 |
| `5` | MD5 摘要变化（内容被改） |
| `D` | 设备主/次设备号变化 |
| `L` | 符号链接路径变化 |
| `U` | 所有者（user）变化 |
| `G` | 所属组（group）变化 |
| `T` | 修改时间（mtime）变化 |
| `P` | 能力（capabilities）变化 |

文件类型标记（出现在标志位与文件名之间）：

| 标记 | 含义 |
| --- | --- |
| `c` | 配置文件（config） |
| `d` | 文档（documentation） |
| `l` | 许可证文件（license） |
| `r` | README |
| `g` | ghost 文件（异常状态） |

例如：

```text
..5....T.  c /etc/logrotate.conf
```

表示该文件是配置文件（`c`），内容摘要（`5`）与修改时间（`T`）发生了变化——**配置文件被改属正常**；若可执行二进制（无 `c` 标记的 binary）出现 `5`，则需高度警惕是否被入侵。

> [!tip] 入侵排查利器：rpm -Va
> 鸟哥曾借此发现主机被植入后门——系统里所有 `*.patch` 文件被恶意替换，连 `init` 都被改，最终靠 `rpm -Va` 一举揪出全部被篡改的 binary。配置文件被改是常态，**二进制被改才是危险信号**。

- **数字签名（digital signature）**

`rpm -V` 只能验证"包内文件与数据库记录是否一致"，无法保证包本身的来源可信。为此引入**数字签名**：厂商用自己的私钥为每个包生成签名，并公开对应的公钥；安装时 rpm 用本地导入的公钥校验包签名，签名不匹配或找不到公钥就警告并拒绝。

Red Hat 系使用 **GPG（GNU Privacy Guard）** 作为签名系统。RHEL/Rocky/AlmaLinux 的 GPG 公钥随系统预置：

```bash
# 公钥位置（RHEL/Rocky/AlmaLinux 9）
ls /etc/pki/rpm-gpg/                # 各仓库公钥
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-rockyofficial

# 已导入的公钥以"包"形式列出
rpm -qa | grep pubkey
rpm -qi gpg-pubkey-xxxxxxxx-xxxxxxxx
```

> [!note]
> 通过 `dnf` 安装的包默认走仓库的 `gpgcheck=1`，公钥由发行版预导入。手动 `rpm -ivh` 安装外部包时若遇到 `NOKEY` 警告，可用 `--import` 导入对方公钥，或加 `--nosignature` 跳过（仅可信来源才这么做）。

### 22.2.6 RPM 卸载与数据库重建（erase/rebuilddb）

卸载用 `-e`。**必须按依赖顺序自上而下卸载**：底层被依赖的包（如 `pam`、`openssl`）若被强制删，所有依赖它的软件会同时失效，系统可能直接停摆。

```bash
rpm -e pam-devel          # 卸载 pam-devel，无依赖问题
rpm -e pam                # 报错：libpam.so.0 被众多包依赖
rpm -e pam --nodeps       # 强删 = 系统级灾难，勿做
```

数据库损坏时用 `--rebuilddb` 重建：

```bash
rpm --rebuilddb
```

## 22.3 DNF 软件源机制

`dnf`（Dandified YUM）是 `yum` 的下一代重写，**自 Fedora 22 / RHEL 8 起成为默认**，RHEL/Rocky/AlmaLinux 9 中 `yum` 仅作 `dnf` 的软链接保留兼容。它通过解析 RPM 包头中的依赖关系，自动生成依赖解决方案，从而自动处理安装、升级、卸载的依赖链。

### 22.3.1 dnf 的查询、安装、升级、卸载

```bash
dnf [选项] [子命令] [参数]

# 常用选项
#   -y                        所有交互自动回答 yes
#   --installroot=/some/path  装到指定根目录
#   --enablerepo=NAME         临时启用某仓库
#   --disablerepo=NAME        临时禁用某仓库
```

| 子命令 | 作用 |
| --- | --- |
| `search 关键字` | 按名称或描述模糊搜索 |
| `list` / `list available` / `list installed` / `list updates` | 列出所有/可装/已装/可升级的包 |
| `info 包名` | 包的详细信息 |
| `provides 文件路径` | 由文件反查提供它的包（类似 `rpm -qf`，但含未装包） |
| `install 包名` | 安装（自动解决依赖） |
| `upgrade [包名]` | 升级（不接包名则升级全部） |
| `remove 包名` | 卸载 |
| `repolist [all\|enabled]` | 列出仓库 |
| `clean all` | 清理本地缓存 |

示例：

```bash
# 搜索 RAID 相关软件
dnf search raid

# 看 mdadm 的详细信息
dnf info mdadm

# 哪些包可升级
dnf list updates

# 谁提供了 /usr/bin/passwd
dnf provides /usr/bin/passwd

# 装 pam-devel
dnf install pam-devel

# 卸载 pam-devel
dnf remove pam-devel
```

> [!note] dnf 缓存目录
> dnf 的元数据与下载缓存位于 **`/var/cache/dnf/`**（`yum` 时代是 `/var/cache/yum/`）。改了仓库配置后若出现清单不同步，跑 `dnf clean all` 清掉旧缓存即可。

### 22.3.2 dnf 配置文件与软件源

主配置文件 `/etc/dnf/dnf.conf`；仓库定义放在 **`/etc/yum.repos.d/*.repo`**（每个 `.repo` 文件可含一个或多个仓库段）。仓库段常用字段：

| 字段 | 含义 |
| --- | --- |
| `[repo-id]` | 仓库 ID（中括号必填，必须唯一） |
| `name=` | 仓库说明（任意） |
| `mirrorlist=` / `metalink=` | 镜像自动选择列表（可注释掉） |
| `baseurl=` | **固定仓库地址**（最关键） |
| `enabled=1` / `0` | 是否启用 |
| `gpgcheck=1` | 是否校验包的 GPG 签名 |
| `gpgkey=` | 公钥文件路径 |

> [!note] repodata 是仓库的标志
> 一个目录能否作为 dnf 仓库，关键看它下面有没有 **`repodata/`** 目录（依赖清单与元数据）。改 `baseurl` 时认准这个。

Rocky/AlmaLinux 9 默认启用的官方仓库：

| 仓库 | 内容 |
| --- | --- |
| `baseos` | 系统核心组件（OS 底层） |
| `appstream` | **AppStream**：用户态应用、运行时、构建工具，含 **module 流** |
| `extras` | 附加软件（如 `epel-release`） |

查看与清理：

```bash
dnf repolist all          # 列出所有仓库及启用状态
dnf clean all             # 清缓存（改 baseurl 后常用）
```

> [!tip] 改 baseurl 后注意同步缓存
> 改了 `baseurl` 但保留原 `[repo-id]`，本地缓存可能与服务器清单不同步，导致更新失败。改完跑一次 `dnf clean all`。

### 22.3.3 软件组（group）

软件组把一组相关软件打包提供（如 "Development Tools"、"Server with GUI"），常用于一次性装好整套环境：

```bash
dnf group list                       # 列出全部软件组
dnf group info "Development Tools"   # 看组内成员
dnf groupinstall "Development Tools" # 装一整组
dnf groupremove "Development Tools"  # 卸一整组
# 新版 dnf 也支持统一写法：
dnf install @development
```

> [!note] groupinstall 默认不装可选包
> 软件组成员分 `mandatory`（必装）/`default`（默认装）/`optional`（可选，默认不装）。要让它默认把可选包也装上，可在 `/etc/dnf/dnf.conf` 加一行 `group_package_types=default,mandatory,optional`。

### 22.3.4 module（AppStream 流）

RHEL 8 起引入 **module / AppStream**：同一个软件可提供多个**流（stream）**，对应不同主版本（如 `nodejs:18`、`nodejs:20`），让用户在同一发行版大版本内选择所需软件版本，无需等发行版升级。

```bash
dnf module list                  # 列出所有模块及其流
dnf module list nodejs           # 看 nodejs 模块的可用流
dnf module install nodejs:20     # 装指定流（含其默认 profile）
dnf module enable nodejs:20      # 仅启用某流，不装
dnf module reset nodejs          # 重置选择，回到默认
dnf module disable nodejs        # 禁用某流
```

> [!info] RHEL/Rocky 9 的一个变化
> 与 RHEL 8 不同，RHEL 9 不再为 AppStream 模块**预定义默认流**，使用 module 时需要用户显式指定要启用哪条流。

### 22.3.5 EPEL、CRB 等第三方软件源

发行版官方仓库不可能覆盖所有软件。常见的补充来源：

| 软件源 | 提供方 | 内容 |
| --- | --- | --- |
| **EPEL**（Extra Packages for Enterprise Linux） | Fedora 社区 | 面向 RHEL/Rocky/AlmaLinux 的高质量附加软件包 |
| **CRB**（Code Ready Builder，RHEL 8 时叫 PowerTools） | 发行版官方 | 编译 EPEL 等附加包所需的 -devel 包与构建工具 |
| **ELRepo** | 社区 | 内核、内核模块、驱动（如 NVIDIA）、`kernel-ml`（主线内核） |

启用 EPEL 最简单的方式：

```bash
dnf install epel-release          # 装完即自动启用 EPEL 仓库
dnf config-manager --enable crb   # Rocky 9 启用 CRB（EPEL 的部分包依赖它）
```

> [!tip] 临时启用 / 禁用仓库
> 不想常开某个仓库时，在 `.repo` 里设 `enabled=0`，要用时一行命令临时启用即可，不污染默认更新：
> ```bash
> dnf --enablerepo=epel install R
> ```

例题：用 EPEL 装 R 语言

```bash
dnf install epel-release
dnf --enablerepo=epel install R
```

**用本地光盘当软件源**（无网络时）：

```bash
mount /dev/sr0 /mnt
cat > /etc/yum.repos.d/cdrom.repo <<'EOF'
[mycdrom]
name = local dvdrom
baseurl = file:///mnt
gpgcheck = 0
enabled = 0
EOF

dnf --enablerepo=mycdrom install 软件名
```

### 22.3.6 跨发行版方案：Flatpak / Snap / AppImage

RPM/dnf 解决了发行版**内部**的依赖，但同一软件在不同发行版间仍需分别打包。近年出现了**跨发行版**的统一分发方案：

| 方案 | 形态 | 特点 |
| --- | --- | --- |
| **Flatpak** | 沙箱化应用 + 运行时（runtime） | 主推桌面应用；与 Flathub 仓库配合；Red Hat 系生态友好 |
| **Snap** | 自包含包 + snapd 守护进程 | Ubuntu 主推，跨发行版；商店为 Snapcraft |
| **AppImage** | 单个可执行文件 | 下载即运行，无需安装、无需守护进程 |

它们都把应用连同依赖**打包成自包含**的单元、与系统库隔离，从而绕开了"每个发行版都要单独打包"的问题，适合发布**桌面应用**（浏览器、IDE 等）。服务器与系统级软件仍以发行版原生的 RPM/dnf 为主。

### 22.3.7 全系统自动升级

最简单的自动升级是定时任务 + `dnf -y upgrade`，但**推荐用官方的 `dnf-automatic` 包**，它自带 timer 单元，更可控：

```bash
dnf install dnf-automatic
# 编辑 /etc/dnf/automatic.conf：upgrade_type = security（仅安全升级）或 default（全升级）
systemctl enable --now dnf-automatic.timer
```

> [!warning] 升级 kernel 后需重启
> 自动升级若装了新内核（`kernel`、`kernel-core` 等），**必须重启**才会真正生效。运维上常见做法是配合 `dnf-automatic` 只装安全更新，定期人工安排重启窗口。

### 22.3.8 管理抉择：RPM 还是 Tarball

| 场景 | 推荐 |
| --- | --- |
| 发行版仓库提供的软件 | **优先 dnf**（维护期长、安全更新有保障、依赖自动处理） |
| 官方提供独立仓库 / RPM | 加 `.repo` 后走 dnf |
| 单机特殊软件、无 RPM | Tarball 手动编译 |
| 想试新版但不想覆盖旧版 | Tarball 装到 `/usr/local`（与系统 RPM 隔离，可并存） |
| 同一软件要部署到大量主机 | 值得花成本做成 RPM / 自建仓库统一分发 |

简言之：**有 RPM 就优先 RPM**，依赖实在解不开或需要特殊编译参数时才退回 Tarball。

### 22.3.9 基础服务管理：以 Apache（httpd）为例

部署一个服务的"五步口诀"：

1. **安装**：`dnf install 软件名`
2. **启动**：`systemctl start 软件名`
3. **开机自启**：`systemctl enable 软件名`
4. **防火墙放行**：`firewall-cmd --permanent --add-service=服务名 && firewall-cmd --reload`
5. **测试**：用客户端验证服务是否正常

以 Web 服务器（LAMP 栈）为例：

```bash
# 1. 安装（Apache + PHP + MariaDB，RHEL/Rocky 9 经 module 提供新版本）
dnf install httpd php mariadb-server

# 2、3. 启动 + 开机自启
systemctl daemon-reload
systemctl enable --now httpd

# 4. 防火墙放行 http（默认 firewalld）
firewall-cmd --permanent --add-service=http
firewall-cmd --reload
firewall-cmd --list-all

# 5. 测试：浏览器打开 http://localhost
```

![[vbird-07b92c2bdb6f7857.webp]]
*图：浏览器访问 `http://localhost` 看到 Apache 默认欢迎页，即说明服务已正常运行*

> [!note] RHEL/Rocky 9 的 LAMP 版本
> httpd 仍为 2.4 系列；PHP 与 MariaDB 走 AppStream **module**，可按需选 `php:8.0`/`8.1`/`8.2`、`mariadb:10.11` 等流。

## 22.4 SRPM 的使用：rpmbuild（可选）

> [!note] rpm 与 rpmbuild 已分离
> 新版中 RPM 与 SRPM 的命令已分开：**SRPM 编译打包用 `rpmbuild`**，不再是 `rpm`。

### 22.4.1 --rebuild / --recompile

下载到 SRPM 但不想改任何参数，可直接编译：

| 选项 | 行为 |
| --- | --- |
| `rpmbuild --rebuild file.src.rpm` | 编译 + 打包成 RPM，**不安装**；产物在 `~/rpmbuild/RPMS/` |
| `rpmbuild --recompile file.src.rpm` | 编译 + 打包 + **安装** |

编译成功时中间文件会自动清理，失败时保留中间产物供排查。

### 22.4.2 rpmbuild 工作目录

从 CentOS 6 起，SRPM 的安装、编译、产物目录都与**操作者家目录**挂钩（不再像旧版统一放在 `/usr/src/redhat/`）。以 root 操作为例：

| 目录 | 内容 |
| --- | --- |
| `~/rpmbuild/SPECS` | **`*.spec` 配置文件**（最重要的入口） |
| `~/rpmbuild/SOURCES` | 源码 tarball、patch、配置文件 |
| `~/rpmbuild/BUILD` | 编译过程的中间文件 |
| `~/rpmbuild/RPMS` | 编译产物（按架构分子目录：`x86_64/`、`noarch/` 等） |
| `~/rpmbuild/SRPMS` | 重新打包出的 SRPM |

```bash
# 把 SRPM 装到家目录（不编译）
rpm -ivh ntp-*.src.rpm        # 会出 mockbuild warning，可忽略

# 查看 SPECS 目录中的 spec 文件
ls ~/rpmbuild/SPECS
```

> [!info]
> 早期 SRPM 必须用 root 操作、源码放在 `/usr/src/redhat/`；现在任何用户都能在自己的 `~/rpmbuild/` 下完成。编译 SRPM 还需要 `gcc`、`make`、`rpmbuild` 等工具——即 "Development Tools" 软件组：`dnf groupinstall "Development Tools"`。

### 22.4.3 *.spec 配置文件

`*.spec` 是把 SRPM 编译成 RPM 的"配方"，整体结构由若干以 `%` 开头的段组成。

**头部字段（包的基本信息）：**

| 字段 | 含义 |
| --- | --- |
| `Summary` | 一句话功能说明 |
| `Name` | 软件名（构成 RPM 文件名的一部分） |
| `Version` | 版本号 |
| `Release` | 打包次数（也构成文件名） |
| `License` | 授权方式 |
| `URL` | 上游官网 |
| `Source0`、`Source1`… | 源码来源（可有多个） |
| `Patch0`、`Patch1`… | 补丁文件（可有多个） |
| `Requires` | **运行时**依赖（安装时检查） |
| `BuildRequires` | **编译时**依赖（仅在打包时检查） |

最终 RPM 文件名形如：`{Name}-{Version}-{Release}.{Arch}.rpm`。

**主要段：**

| 段 | 作用 |
| --- | --- |
| `%description` | 详细说明（`rpm -qi` 看到的就是这里） |
| `%prep` | 编译前预处理：解压源码、打补丁 |
| `%build` | 编译过程，对应 `./configure && make` |
| `%install` | 安装到 `BUILDROOT`，对应 `make install` |
| `%files` | 列出该包最终要发布的文件与目录 |
| `%changelog` | 更新历史 |

`rpm -qi` 查到的那些元数据，本质都来自 `*.spec` 头部与 `%description`。

### 22.4.4 rpmbuild -ba / -bb

```bash
rpmbuild -ba xxx.spec   # 同时产出 RPM 与 SRPM
rpmbuild -bb xxx.spec   # 仅产出 RPM
```

执行流程：进入 `BUILD/` → 按 `Name`-`Version` 建工作目录 → 解压 `SOURCES/` 中的源码 → 执行 `%prep` / `%build` / `%install` → 按 `%files` 打包 → 产物落到 `RPMS/<arch>/` 与（`-ba` 时）`SRPMS/`。

### 22.4.5 打包自己的软件：示例

以鸟哥教程里那个 `main` 小程序为例，演示从源码到 RPM 的完整流程。

准备源码与补丁（放到 `~/rpmbuild/SOURCES/`）：

```bash
cd ~/rpmbuild/SOURCES
# 假设官网提供 main-0.1.tar.gz 和一个升级到 0.2 的 patch
# main-0.1.tgz
# main_0.1_to_0.2.patch
```

编写 `~/rpmbuild/SPECS/main.spec`：

```specfile
Name:           main
Version:        0.1
Release:        1%{?dist}
Summary:        Shows sin and cos value.
License:        GPLv2
URL:            http://linux.vbird.org/
Source0:        main-0.1.tgz
Patch0:         main_0.1_to_0.2.patch

%description
This package will let you input your name and calculate sin cos value.

%prep
%setup -q
%patch0 -p1

%build
make clean main

%install
mkdir -p %{buildroot}/usr/local/bin
install -m 755 main %{buildroot}/usr/local/bin

%files
/usr/local/bin/main

%changelog
* Wed Sep 09 2015 VBird Tsai <vbird@mail.vbird.idv.tw> 0.2
- build the program
```

编译：

```bash
cd ~/rpmbuild/SPECS
rpmbuild -ba main.spec
# 产物：
#   ~/rpmbuild/SRPMS/main-0.1-1.el9.src.rpm
#   ~/rpmbuild/RPMS/x86_64/main-0.1-1.el9.x86_64.rpm
```

安装并验证：

```bash
dnf install ~/rpmbuild/RPMS/x86_64/main-0.1-1.el9.x86_64.rpm
rpm -ql main          # /usr/local/bin/main
rpm -qi main          # 看到自己的元数据
```

## 22.5 重点回顾

- 为免去用户编译负担，发行版预先在固定平台编译、打包软件并提供查询/安装/卸载机制——即**软件包管理器**。两大主流：Red Hat 系的 RPM 与 Debian 系的 dpkg；
- **RPM** 内含已编译二进制，安装便捷但对环境要求严格；信息登记到 RPM 数据库（Rocky/RHEL 9 在 `/var/lib/rpm`，SQLite 后端），便于查询、升级、卸载；
- **SRPM** 内含未编译源码与 spec，可在本机修改编译参数后重打包；
- RPM 最大问题是**依赖**；自 RHEL 8 起由 **`dnf`**（`yum` 的下一代）自动解决，`yum` 仍作软链接兼容；
- dnf 通过**软件源（仓库）**分发软件，仓库以 `repodata` 为标志，配置文件在 `/etc/yum.repos.d/*.repo`；RHEL/Rocky 9 默认启用 `baseos` / `appstream` / `extras`；
- **AppStream module** 允许在同一发行版大版本内选择软件的不同主版本流；
- **EPEL** 提供附加软件，**CRB** 是其依赖的构建工具仓库，**ELRepo** 主打内核与驱动；
- **Flatpak / Snap / AppImage** 是跨发行版的应用分发方案，绕开"每发行版一打包"问题，主要面向桌面应用；
- 部署服务的五步口诀：**安装 → 启动 → 开机自启 → 防火墙放行 → 测试**；
- SRPM 用 `rpmbuild` 编译，配方在 `*.spec`，工作目录在 `~/rpmbuild/`。

## 延伸阅读

- [RPM Package Manager — 官方站点](https://rpm.org/)
- [Red Hat: Managing software with the DNF tool（RHEL 9 官方文档）](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_software_with_the_dnf_tool/)
- [Rocky Linux Documentation — DNF package manager](https://docs.rockylinux.org/guides/package_management/dnf_package_manager/)
- [EPEL — Fedora Project Wiki](https://docs.fedoraproject.org/en-US/epel/)
- [Flatpak](https://www.flatpak.org/) / [Snapcraft](https://snapcraft.io/) / [AppImage](https://appimage.org/)
- [GNU Privacy Guard (GPG)](https://www.gnupg.org/)

---
描述: Rocky Linux 9 的安装流程（Anaconda 安装器）、GPT/UEFI 分区方案与多重开机要点（据鸟哥原作改写，已更新至当前 Rocky/AlmaLinux 9 状态）。
排序: 4000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0157installcentos7.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-05-06
---
# 第三章 安装Rocky Linux 9

> [!info] 关于本章
> 本章以鸟哥《Linux 私房菜 — 基础学习篇》第三章为骨架，将原基于 CentOS 7 的安装流程**更新到当前 Rocky Linux 9 / AlmaLinux 9 状态**（CentOS 7 已于 2024-06-30 EOL）。关键现代化点：默认 **UEFI + GPT**、**systemd**、**NetworkManager**（RHEL 9 已移除旧 network-scripts）、**firewalld**、**chronyd**、GNOME 桌面默认走 **Wayland**、包管理器 **dnf**、默认文件系统 **xfs**、内核 5.14 系。术语统一为大陆通行写法。

Linux 发行版日趋成熟，安装也越来越简单。但前一章的基础认知（GPT 分区表、引导加载程序、挂载、软件选择）仍然需要。本章以搭建一台"练习机"为目标，用最简单的方式走完安装流程。

## 3.1 练习机规划：分区与软件选择

### 3.1.1 主机角色与硬件假设

本机目标是练习 Linux 各项技术，因此希望尽可能多地安装组件，包括图形桌面。发行版选择与 RHEL 9 二进制兼容的社区版本——**Rocky Linux 9**（或 AlmaLinux 9；二者安装器同为 Anaconda，流程一致，任选其一）。

> [!tip] 虚拟机练习
> 对 Linux 还不熟，建议用虚拟机练习。虚拟化方案可选 **KVM/libvirt**（Linux 原生）、**VirtualBox** 或 **VMware**。本节假设一台典型虚拟机：2 vCPU、2–4 GB 内存、40–50 GB 虚拟磁盘（virtio 接口，设备名 `/dev/vda`）、一块桥接网卡。

### 3.1.2 分区方案（GPT/UEFI）

现代 x86 主板默认 **UEFI** 启动，磁盘分区表默认 **GPT**——不再需要 CentOS 7 时代为小磁盘强制 GPT 的 `inst.gpt` 参数。建议的练习机分区方案：

| 挂载点/用途 | 容量 | 文件系统 | 装置类型 | 说明 |
|---|---|---|---|---|
| `/boot/efi` | 200–600 MB | EFI System Partition (vfat) | 标准分区 | UEFI 引导分区，取代旧 BIOS boot |
| `/boot` | 1 GB | xfs | 标准分区 | 内核与引导文件 |
| `/` | 20–30 GB | xfs | LVM | 根目录 |
| `/home` | 5–10 GB | xfs | LVM | 用户数据 |
| `swap` | 1–2 GB | swap | LVM | 交换空间 |
| 剩余 | 留空 | — | — | 预留供后续章节练习 |

> [!note] 为何用 LVM
> **LVM（逻辑卷管理）** 允许弹性增减文件系统容量。RHEL/Rocky 默认就用 LVM 管理根目录与数据卷。其进阶版 **LVM Thin Provision（精简配置）** 按实际写入量分配空间，多个精简卷可共享同一个池。LVM 将在后续章节详述。

> [!tip] swap 该多大
> 老规则建议 swap 为内存的 1.5–2 倍，那是内存昂贵的年代的产物。当今内存充裕，swap 主要用于休眠与极端紧张时兜底，1–2 GB 通常足够。系统频繁使用 swap 往往说明内存不足，应加内存而非加大 swap。是否启用休眠决定是否需要 swap ≥ 内存。

### 3.1.3 安装前检查清单

| 项目 | 建议值 |
|---|---|
| 安装介质 | Rocky Linux 9 DVD 或 Minimal ISO（x86_64），从 `rockylinux.org/download` 下载 |
| 架构 | x86_64（当前主流） |
| 启动方式 | UEFI（推荐）/ Legacy BIOS |
| 分区表 | GPT（UEFI 默认） |
| 引导加载程序 | GRUB 2，安装到磁盘（UEFI 下写入 ESP） |
| 网络 | DHCP 或静态 IP（如 `192.168.1.100/24`） |
| 主机名 | 自定，如 `rocky.study.local` |
| 软件选择 | Minimal Install / Server / Server with GUI（按需） |
| 时间同步 | chronyd（默认启用），NTP 服务器可用 `ntp.aliyun.com`、`cn.ntp.org.cn` |

## 3.2 安装 Rocky Linux 9 的主流程

各主流 Linux 发行版的安装步骤大同小异，核心环节如下：

1. 准备启动介质（U 盘/光盘/ISO）并在 UEFI/BIOS 中设置启动顺序；
2. 选择安装模式与内核参数，进入 **Anaconda** 安装器；
3. 本地化：时区、语言、键盘；
4. 安装源与软件选择；
5. 磁盘分区；
6. 网络、主机名、root 密码与普通用户；
7. 首次启动的初始设置。

### 3.2.1 启动介质与 UEFI 启动

将 ISO 写入 U 盘。Windows 下可用 **Rufus** 或 **Ventoy**；Linux 下最简单的是 `dd`，或对 isohybrid 镜像直接 `cp`：

```bash
# 假设 U 盘为 /dev/sdc，ISO 为 Rocky-9-latest-x86_64-dvd.iso
sudo dd if=Rocky-9-latest-x86_64-dvd.iso of=/dev/sdc bs=4M status=progress conv=fsync
# 或直接复制（仅对支持 UEFI 启动的混合镜像有效）
sudo cp Rocky-9-latest-x86_64-dvd.iso /dev/sdc
sync
```

> [!warning] 写整个盘而非分区
> `of=/dev/sdc` 是写入整个设备，不是某个分区（`/dev/sdc1`）。写错对象会破坏数据。写入后 U 盘会被重新分区，原数据全部丢失。

开机时进入 UEFI 设置（常见按键 `Del`、`F2`、`F12`）。Rocky/AlmaLinux 9 的引导镜像已签名，**Secure Boot 可保持开启**；仅当需要安装未签名的第三方驱动时才临时关闭。设置 U 盘优先启动。

### 3.2.2 Anaconda 安装主界面

从介质启动后，菜单提供：正常安装、测试介质后安装、故障排查（Troubleshooting，含救援模式、内存测试 memtest86+）。

进入安装器后第一屏选择**安装界面语言**——这会影响默认系统语言与 locale。随后进入 Anaconda 的**主控制中心**：所有设置项（本地化、软件、系统）集中在同一页，可任意顺序点击修改。

![[vbird-52e37ae7ba65e008.webp]]
*图：Anaconda 的统一设置主界面（Rocky 9 与之一致）*

> [!note] 左上角的"完成"
> Anaconda 的确认按钮一律在**左上角**（标 Done/完成），而非传统的右下角——初次使用容易找不到。

### 3.2.3 本地化：时区、语言、键盘

- **时间与日期**：在地图或下拉菜单中选择时区（亚洲/上海，UTC+8）。开启 **Network Time**（NTP）可联网校时，默认走 chronyd。
- **键盘布局**：按需添加中文输入法切换组合（如 `Super+Space`）。
- **语言支持**：可额外安装简体中文（`zh_CN.UTF-8`）locale。

### 3.2.4 安装源与软件选择

- **安装源**：本地介质（默认 ISO）、硬盘上的 ISO 文件，或网络源（HTTP/HTTPS/NFS URL）。局域网自建安装服务器走千兆/万兆网络，速度远超 DVD。
- **软件选择**：这是决定装什么的关键项。常见基础环境：

| 环境 | 说明 |
|---|---|
| **Minimal Install** | 最小安装，仅命令行，资源占用最低，服务器生产环境首选 |
| **Server** | 无图形界面的服务器常用组件 |
| **Server with GUI** | 含 GNOME 图形桌面的服务器 |
| **Workstation** | 面向桌面/工作站的图形环境 |
| **Custom Operating System** | 自定义额外组件 |

> [!tip] 初学者建议
> 练习机选 **Server with GUI**（GNOME 桌面），既熟悉图形操作又能练习服务器组件。生产服务器一律 **Minimal**——少装一个组件就少一个攻击面。Rocky 9 桌面默认使用 **Wayland** 显示协议（Xorg 作备用）。

选定后安装器会检查依赖并解决软件包关系。

### 3.2.5 磁盘分区与文件系统

在"系统 → 安装目的地"中选择目标磁盘，并选**自定义（Custom）**分区方式进入手动分区界面。先选择**标准分区**还是 **LVM** 作为装置类型，再点 `+` 添加各挂载点。

**装置类型**对照：

| 类型 | 说明 |
|---|---|
| 标准分区 | 传统分区，如 `/dev/vda1` |
| **LVM** | 逻辑卷，可弹性伸缩，本练习机根目录、`/home`、`swap` 用它 |
| LVM Thin Provision | 精简配置 LVM，按需分配空间 |

**文件系统**对照：

| 文件系统 | 说明 |
|---|---|
| **xfs** | RHEL/Rocky 默认，擅长大容量管理，格式化快 |
| ext4 | 经典 Linux 文件系统，带日志，仍受支持但已非默认 |
| swap | 内存交换，无挂载点 |
| **EFI System Partition** | UEFI 引导分区，vfat 格式 |
| vfat | 与 Windows 共享数据时可用（FAT32/exFAT） |

> [!note] 关键区别：UEFI 与旧 BIOS
> UEFI 系统必须有 **EFI System Partition**（约 200–600 MB，vfat 格式，挂载到 `/boot/efi`）存放引导文件——这是 GPT/UEFI 时代的标准分区，取代 CentOS 7 在 BIOS+GPT 时需要的 2 MB `biosboot` 分区。引导加载程序 GRUB 2 安装到 ESP，不再写到 MBR。

按 3.1.2 的方案依次建立各分区后，"完成"时安装器会弹出**汇总更改**对话框，确认磁盘分区表化为 GPT 并格式化，点 **接受更改** 即可。

### 3.2.6 网络与主机名

Rocky 9 网络由 **NetworkManager** 统一管理（RHEL 9 已移除旧 `network-scripts`/ifcfg 机制，NetworkManager 是唯一网络配置工具）。在"网络与主机名"中：

- 打开网卡开关，勾选**自动连接**，开机后自动启用；
- 主机名填入如 `rocky.study.local`；
- 需要静态 IP 时，点 **配置 → IPv4**，方法选手动，填 IP/掩码/网关/DNS。

> [!info] 网卡命名规则
> 现代网卡名按总线/插槽位置命名（如 `enp0s3`、`ens33`、`eno1`），不再用旧的 `eth0`。**一致性可预测命名**（Predictable Network Interface Names）让网卡名与物理位置绑定，更换硬件也不会乱序。

### 3.2.7 root 密码与普通用户

设置 **root 密码**时，安装器会评估强度。弱密码需点两次"完成"才能强制通过。**生产环境务必用强密码**（≥ 12 位、含大小写/数字/符号，避免个人信息）。

接着建立一个**日常登录的普通用户**，并勾选"**使此用户成为管理员**"——该用户将被加入 `wheel` 组，能用 `sudo` 执行管理命令，无需 root 密码。

> [!warning] 日常用普通用户，必要时 sudo
> 远程管理应**禁止 root 直接登录**（SSH `PermitRootLogin no`），改用普通用户 + `sudo`。养成从一开始就用普通账号的习惯，避免误操作。

### 3.2.8 首次启动与初始设置

安装完成、重启后，**Server with GUI** 会进入首次设置向导（许可协议、kdump 等），同意许可即可进入登录界面（GNOME 显示管理器 GDM）。

> [!tip] anaconda-ks.cfg 与 Kickstart
> 安装过程的所有选择都会被记录到 `/root/anaconda-ks.cfg`。这是 **Kickstart** 自动安装脚本——下次想批量部署一模一样的系统，编辑此文件即可无人值守安装。

> [!note] kdump 要不要开
> **kdump** 在内核崩溃时捕获内存转储，供内核开发者调试。普通使用可关闭以省内存；服务器排障时建议开启。Rocky 9 默认询问是否启用。

### 3.2.9 内存测试与笔记本安装参数（选读）

启动介质的 Troubleshooting 菜单提供 **memtest86+**，可对内存做长时间压力测试，用于组装新机后的稳定性验证（俗称"烧机"）。

笔记本因集成显卡与省电机制，偶尔导致安装失败。可在启动菜单按 `e`（或 `Tab`）编辑启动项，临时加内核参数绕过：

```bash
nomodeset modprobe.black=nouveau
```

`nomodeset` 禁用内核模式设置，避免显卡驱动问题；确属老旧 BIOS/ACPI 兼容问题的老硬件，可试 `apm=off acpi=off`。

## 3.3 多重开机（选读）

### 3.3.1 要不要多重开机

> [!warning] 新手不建议多重开机
> 现今虚拟机（KVM/VirtualBox/VMware/Hyper-V）已能胜任绝大多数场景，且图形性能大幅改善。多重开机（在一台物理机上装多个系统）有破坏分区表与引导的风险，新手请优先用虚拟机。仅在需要独占 GPU/直接硬件访问时才考虑。

### 3.3.2 UEFI 多系统与 GRUB 2

UEFI 时代多系统引导比 MBR 时代简单：每个系统在 **EFI System Partition** 下有自己的引导项（如 `\EFI\rocky`、`\EFI\Microsoft\Boot`），通过 UEFI 启动菜单或 GRUB 2 的 `os-prober` 选择。先装 Windows（占 ESP）再装 Rocky，GRUB 2 通常能自动发现 Windows 并加入选单；若没有，可在 `/etc/grub.d/40_custom` 手动添加 `chainloader` 条目后执行：

```bash
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

> [!info] 救援模式
> 引导被覆盖（如重装 Windows 后 UEFI 启动项丢失）时，用 Rocky 安装介质启动 → Troubleshooting → **Rescue a Rocky System**，挂载原系统到 `/mnt/sysimage`，`chroot` 进去后重装 GRUB 或重建 ESP 启动项：
> ```bash
> chroot /mnt/sysimage
> grub2-install /dev/vda      # BIOS 系统
> # UEFI 系统则重建 grub.cfg 并用 efibootmgr 注册启动项
> grub2-mkconfig -o /boot/grub2/grub.cfg
> exit
> reboot
> ```

## 3.4 重点回顾

- 安装前应规划好分区、引导加载程序、软件选择等；
- 练习机建议分区：`/boot/efi`、`/boot`、`/`、`/home`、`swap`；
- UEFI 系统默认 GPT，必须有 EFI System Partition（取代旧 BIOS boot）；
- 现代发行版默认用 LVM 管理根目录与数据卷，默认文件系统 xfs；
- Anaconda 把所有设置集中在主界面，确认按钮在左上角；
- Rocky 9 默认 systemd、NetworkManager、firewalld、chronyd，桌面默认 Wayland；
- 日常用普通用户 + `sudo`，禁止 root 直接远程登录；
- 生产服务器选 Minimal Install；练习机选 Server with GUI；
- 安装选择记录在 `/root/anaconda-ks.cfg`，可作 Kickstart 模板；
- 多重开机优先用虚拟机替代；UEFI 多系统靠 ESP 分区 + GRUB 2 os-prober。

## 3.5 习题

- **最小分区**：安装时系统至少要求哪两个分区？
  > 答：根目录 `/` 与交换空间 `swap`（UEFI 系统另需 EFI System Partition）。
- **UEFI 与 BIOS 的关键区别**：UEFI 系统为什么必须有 ESP？它取代了旧 BIOS+GPT 方案中的哪个分区？
  > 答：ESP（vfat）存放引导文件，UEFI 固件直接读取它启动 GRUB；它取代了 BIOS+GPT 方案中的 2 MB `biosboot` 分区。
- **swap 大小**：一台 8 GB 内存、不做休眠的服务器，swap 设多大合适？
  > 答：约 1–2 GB 即可（或不设）；休眠才需 swap ≥ 内存。
- **网卡命名**：现代网卡为什么不再叫 `eth0`？
  > 答：采用一致性可预测命名（按总线/插槽），名与物理位置绑定，避免多网卡时顺序漂移。

## 延伸阅读

- [Rocky Linux 文档](https://docs.rockylinux.org/)
- [RHEL 9 安装指南（Anaconda）](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/performing_a_standard_rhel_9_installation/)
- [GNU GRUB Manual](https://www.gnu.org/software/grub/manual/grub/grub.html)
- [Unified Extensible Firmware Interface — Wikipedia](https://en.wikipedia.org/wiki/UEFI)
- [Logical Volume Manager — Wikipedia](https://en.wikipedia.org/wiki/Logical_volume_management)
- [NetworkManager 项目](https://networkmanager.dev/)

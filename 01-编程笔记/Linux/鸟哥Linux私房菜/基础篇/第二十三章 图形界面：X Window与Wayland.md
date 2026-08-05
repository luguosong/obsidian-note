---
描述: X Window System（X Server/X Client）架构与启动流程，并介绍当前默认显示协议 Wayland 与 XWayland（据鸟哥原作改写，已更新至 2026 年 Rocky/AlmaLinux 9 状态）。
排序: 24000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0590xwindow.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-09-19
---
# 第二十三章 图形界面：X Window与Wayland

> [!info] 关于本章
> 本章以鸟哥原作（CentOS 7 版）为骨架，已更新到当前 **Rocky/AlmaLinux 9 / RHEL 9** 状态，术语统一为大陆通行写法。关键现代化点：**GNOME 与 KDE 当前默认显示协议已由 X11/Xorg 迁移到 Wayland**，旧 X11 应用通过 **XWayland** 兼容层运行；包管理器 `yum`→`dnf`。CentOS 7 已于 2024-06-30 EOL，仅在作历史对照时提及。

Linux 上的图形界面（GUI）传统上称为 **X Window System**（简称 X 或 X11）。它是一个**基于网络架构的客户端/服务器图形系统**，可跨网络、跨操作系统平台运行。在 Linux 桌面化的进程中，X11 扮演了关键角色；而当前（2026）主流发行版的默认图形栈已迁移到更现代的 **Wayland** 协议，X11 通过 XWayland 兼容层继续可用。

## 23.1 什么是 X Window System

### 23.1.1 X Window 的发展简史

X Window System 最早由 **MIT** 于 1984 年在 Unix System V 上开发。设计初衷是让窗口界面**与硬件无关**——以应用程序而非操作系统的概念开发，从而具备可移植性。由于希望通过网络进行图形界面的存取，X 发展出一系列网络协议，吸引众多厂商加入。

| 时间节点 | 事件 |
|---|---|
| 1984 | MIT 推出 X Window System |
| 1987 | 发布 **X11** 版本，取得明显进步，"X11" 由此得名 |
| 1992 | **XFree86** 计划成立（X + Free software + x86），长期维护 X11R6 |
| 1994 | 发布 X11R6，后续版本（如 X11R6.3）沿用此架构 |
| 2004 | 因授权问题 XFree86 式微，**Xorg 基金会**接手维护，发布 X11R6.8 |
| 2005+ | Xorg 发布 X11R7.x |

> [!note] 关于 X 的几个要点
> - 在 Unix Like 系统上，GUI 被称为 **X** 或 **X11**；它是一个**软件**而非操作系统。
> - X11 利用**网络架构**进行图形界面的执行与绘制，可跨网络跨平台。
> - 当代主流发行版使用的 X 实现均由 **Xorg 基金会**提供。
> - X11 使用 **MIT 授权**（类 GPL 的开放源码授权）。

### 23.1.2 从 X11 到 Wayland（现代默认）

X11 已有 40 余年历史，积累了大量遗留包袱：客户端彼此可互相窥探、网络透明带来安全与性能开销、输入与渲染管线复杂。现代桌面需要更简单、更安全、更高效的显示协议。

| 维度 | X11（Xorg） | **Wayland**（当前默认） |
|---|---|---|
| 架构 | 客户端/服务器，X Server 掌管一切 | 合成器（compositor）即显示服务器，客户端彼此隔离 |
| 安全 | 客户端可互相监听输入与画面 | 客户端彼此隔离，更安全 |
| 网络 | 原生支持网络透明（X 转发 `ssh -X`） | 协议本身不跨网络，远程需借助 RDP/VNC/wayvnc 等 |
| 现代 GPU | 历史包袱多，合成路径长 | 设计贴近现代 GPU，更流畅 |

> [!info] Wayland 当前状态（2026）
> - **RHEL 9 / Rocky 9 / AlmaLinux 9**、Fedora、Ubuntu 的 **GNOME 默认 Wayland**，GDM 登录界面齿轮里仍可选 "GNOME on Xorg"；
> - **KDE Plasma 6**（2024 起）默认 Wayland；
> - 旧 X11 应用通过 **XWayland** 兼容层运行，几乎无感；
> - NVIDIA 专有驱动已支持 Wayland；
> - 仅在偏远场景（依赖原生 X 转发、X 抓屏的旧程序、部分工业软件）才需切回 Xorg 会话；RHEL 10 / Rocky 10 / AlmaLinux 10 已趋向 Wayland-only。

本章后续仍以 X11/Xorg 架构为主线讲解——Wayland 的合成器、Window Manager、Display Manager 等概念都源自 X11，理解 X11 是理解现代 Linux 图形栈的基础。

### 23.1.3 主要元件：X Server / X Client / Window Manager / Display Manager

X Window System 基本分为两个元件：**X Server** 与 **X Client**。X Server 管理硬件，X Client 是应用程序。X Client 把想呈现的画面告知 X Server，由 X Server 通过它管理的硬件把结果绘制出来。

![[vbird-676f89c8a1d70164.gif]]
*图：X Window System 的架构*

**X Server：硬件管理、屏幕绘制、字体提供**

X Server 负责管理主机的显示相关硬件与驱动：

- 输入设备：键盘、鼠标、手写板等；
- 输出设备：显示器、分辨率、色彩深度；
- 显卡（含驱动程序）；
- 显示字体。

> [!note] X Server 与内核/systemd 的关系
> 开机时内核与 systemd 已识别硬件，但 X Window 在 Linux 里只是一套软件，有自己的配置文件与驱动栈。因此在 `multi-user.target` 下要进入图形界面，必须额外加载 X Server 所需驱动。X Server 同时会把输入设备的动作（键盘、鼠标事件）告知 X Client。

**X Client：处理 X Server 报告的事件**

X Client 接收来自 X Server 的输入事件，运算后得到绘图数据，再回传给 X Server 描绘到屏幕。X Client 也叫 **X Application**。每个 X Client 彼此独立、不知道对方的存在，因此多个 X Client 的窗口常互相重叠。

> [!tip] X 架构的核心优势
> X Client 只负责产生绘图数据，本身不绘图、不接触硬件。客户端用的是什么硬件、什么操作系统，服务器端的 X Client 根本不需要知道——这就是 X11 可跨网络跨平台运行的根因。

![[vbird-df7eafeed7329c64.gif]]
*图：X Server 客户端的操作系统与 X Client 的沟通*

**Window Manager（WM）：特殊的 X Client**

X Client 自身不知道它在屏幕上的位置与大小。为统筹窗口，出现了 **Window Manager**——它本身也是一个 X Client，专职管理所有 X Client 的窗口，提供：

- 控制元素：任务栏、桌面背景等；
- 虚拟桌面（virtual desktop）；
- 窗口控制：大小、重叠、移动、最小化等。

| 常见 Window Manager | 全称 |
|---|---|
| **GNOME** | GNU Network Object Model Environment |
| **KDE** | K Desktop Environment |
| **XFCE** | XForms Common Environment |
| twm | Tab Window Manager（最精简） |

每种 WM 的显示引擎各不相同，切换 WM 不只是换皮，连渲染引擎都变。

**Display Manager：提供登录界面**

在 `graphical.target` 下，tty1 出现的图形登录界面就是 **Display Manager**。它负责登录环境，并加载用户选择的 Window Manager、语系等。RHEL/Rocky 上默认使用 GNOME 的 **GDM（GNOME Display Manager）**。登录后选用哪种 WM 可在 GDM 上选择。

### 23.1.4 X Window 的启动流程

要启动 X，需先启动管理硬件与绘图的 X Server，再载入 X Client（通常以 WM 管理）。两条路径：

1. 在文本界面登录后用 `startx` 启动；
2. 通过 Display Manager（`graphical.target`）登录。

**`startx`：脚本，负责查找参数**

`startx` 是一个 shell script，作用是查找用户或系统默认的 X Server / X Client 配置文件，再调用 `xinit` 启动。语法：

```bash
# X client 参数写在 -- 前，X server 参数写在 -- 后
startx [X client 参数] -- [X server 参数]

# 例：以 16 位色彩深度启动 X
startx -- -depth 16
```

`startx` 的参数查找顺序（前面优先）：

| 元件 | 查找顺序 |
|---|---|
| X Server 参数 | 命令行参数 → `~/.xserverrc` → `/etc/X11/xinit/xserverrc` → 执行 `/usr/bin/X` |
| X Client 参数 | 命令行参数 → `~/.xinitrc` → `/etc/X11/xinit/xinitrc` → 执行 `xterm` |

**`xinit`：实际启动 X**

`startx` 找到参数后调用 `xinit`：

```bash
xinit [client option] -- [server or display option]
```

用户无 `~/.xinitrc` 时，`startx` 相当于执行：

```bash
xinit /etc/X11/xinit/xinitrc -- /usr/bin/X
```

`/usr/bin/X` 就是 Xorg 的链接（X Server 主程序）。

**X 启动的端口**

X11 协议规定 X Server 监听 **TCP 6000**（display `:0`）、6001（`:1`）依此类推。出于安全考虑，现代发行版默认用 **Unix domain socket** 而非 TCP。多个 X 可同时存在：

| X 实例 | 显示编号 | 默认终端 | 网络端口（如启用 TCP） |
|---|---|---|---|
| 第一个 X | `hostname:0` | tty2 | 6000 |
| 第二个 X | `hostname:1` | tty3 | 6001 |

> [!note] systemd 下的 tty 按需启动
> RHEL/Rocky 9 由 systemd 管理 tty，**用到才启动**（与旧版默认开 6 个 tty 不同）。若只用到 tty1，第一个 X 会落在 tty2，第二个落在 tty3，依此类推。

### 23.1.5 X 启动流程测试（动手）

> [!warning] 本节为 X11 架构演示
> 此动手环节需在 **Xorg 会话**下进行（Wayland 下无法直接 `X :1 &` 启动第二个 X Server）。在 Rocky/AlmaLinux 9 的 GDM 登录界面齿轮里选 "GNOME on Xorg" 后再操作。

可在 tty1 执行以下命令，到 tty3 观察结果（`Ctrl+Alt+F3` 切换）：

```bash
# 1. 在 :1 启动一个空的 X Server（& 放后台，会自动跳到 tty3）
X :1 &

# 2. 在该 X 上启动几个 X Client（注意 -display :1）
xterm -display :1 &
xterm -display :1 &
xclock -display :1 &
xeyes -display :1 &

# 3. 安装并启动最精简的 Window Manager（Rocky 9）
#    dnf install xorg-x11-twm xorg-x11-apps
twm -display :1 &

# 4. 结束时按顺序 kill 掉这些后台任务
kill %1 %2 %3 %4 %5 %6
```

> [!tip] 这个演示说明了什么
> 没装 WM 之前，`xterm`、`xclock` 等窗口能显示但**不能移动、不能调整大小、彼此重叠**；装上 `twm` 后右键可弹出菜单、窗口可拖动缩放——这直观展示了 **Window Manager** 的作用，以及 X Server 与 X Client 彼此分离的架构。

### 23.1.6 是否需要启用图形界面

| 用途 | 是否需要图形栈 |
|---|---|
| 网络服务器（Web/DB/邮件等） | **不需要**。配置文件都是纯文本，SSH 即可管理；图形栈徒增攻击面与资源占用 |
| 桌面工作站（办公、美编、多媒体） | 需要 |
| 数据可视化、图形处理工作站 | 需要 |

> [!tip] 服务器原则
> Linux 服务器的主流形态是无图形界面。除非有明确的图形应用需求，否则服务器不应默认安装图形栈——既省资源也减少安全风险。当前即使单板计算机（如 Raspberry Pi）性能也足以跑图形界面，"能不能跑"不是问题，"该不该开"才是。

## 23.2 X Server 配置文件与设置

X Server 管理显卡、屏幕分辨率、鼠标按键、字体等。相关路径：

| 用途 | 路径 |
|---|---|
| X Server 配置文件 | `/etc/X11/xorg.conf`、`/etc/X11/xorg.conf.d/*.conf` |
| 显示模块 | `/usr/lib64/xorg/modules/` |
| 显卡驱动模块 | `/usr/lib64/xorg/modules/drivers/` |
| X11 字体 | `/usr/share/X11/fonts/` |
| 系统字体 | `/usr/share/fonts/` |

### 23.2.1 解析 xorg.conf

查看 X 版本：

```bash
X -version
# 或
Xorg -version
```

> [!note] 现代发行版已不再需要 xorg.conf
> 从 CentOS 6 起，X Server 每次启动都会**自动侦测**显卡、屏幕并选最佳驱动，`/etc/X11/xorg.conf` 已非必需。仅当需要覆盖自动检测结果时才手动创建。局部改动建议放进 `/etc/X11/xorg.conf.d/*.conf`（例如 `00-custom.conf`）。日志在 `/var/log/Xorg.0.log`，其前几行会说明实际使用了哪份配置。

`xorg.conf` 由若干 `Section ... EndSection` 段落组成：

```text
Section "section name"
    ……与该 section 有关的设置项……
EndSection
```

常见 section：

| Section | 作用 |
|---|---|
| `Module` | 载入到 X Server 的模块（如 `glx`） |
| `InputDevice` | 键盘、鼠标等输入设备 |
| `Files` | 字体目录、模块路径 |
| `Monitor` | 显示器规格（水平/垂直刷新率） |
| `Device` | **显卡芯片驱动设置**（最关键） |
| `Screen` | 绑定 `Device` 与 `Monitor`，设置分辨率与色彩深度 |
| `ServerLayout` | 选择本 X Server 实际取用上面哪几组配置 |

可用 `Xorg -configure`（在 `multi-user.target` 下）生成一份探测当前硬件的模板配置 `xorg.conf.new`，再据此修改：

```bash
Xorg -configure                        # 生成 /root/xorg.conf.new
X -config /root/xorg.conf.new          # 测试
mv /root/xorg.conf.new /etc/X11/xorg.conf.d/00-custom.conf   # 启用
```

`Device` 段示例（`Driver` 决定用哪块显卡驱动）：

```text
Section "Device"
    Identifier  "Card0"
    Driver      "qxl"          # 虚拟机常见；物理机可能是 intel/amdgpu/nouveau/nvidia/vesa
    BusID       "PCI:0:2:0"
EndSection
```

> [!tip] 显卡驱不起来时的救急
> 若检测到了显卡却无法启动 X，可临时把 `Device` 段的 `Driver` 改成 `"vesa"` 或 `"modesetting"`（通用驱动）以最低能力启动图形界面，再排查。

### 23.2.2 字体管理

Xorg 默认字体目录记录在 `/etc/X11/fontpath.d/`（以符号链接指向 `/usr/share/fonts/`、`/usr/share/X11/fonts/` 下的实际字体）。现代字体管理统一使用 **fontconfig**（`fc-` 系列命令）：

```bash
# 1. 安装字体包（以中文 Noto CJK 为例，推荐）
dnf install google-noto-sans-cjk-ttc-fonts

# 2. 手动安装字体文件：把 .ttf/.otf 复制到 /usr/share/fonts/ 下自定义目录
mkdir -p /usr/share/fonts/myfonts
cp /path/to/*.ttf /usr/share/fonts/myfonts/

# 3. 刷新字体缓存
fc-cache -f -v

# 4. 列出已识别字体
fc-list | grep -i noto
```

> [!note] 现代 CJK 字体
> 原 CentOS 7 时代用 `cjkuni-uming/ukai`（明体/楷体）；当前 Rocky/AlmaLinux 9 推荐使用 **Google Noto CJK** 或思源黑体/宋体（Source Han Sans/Serif），覆盖更全、渲染更佳。

### 23.2.3 显示器参数微调

分辨率问题通常与**显示器的刷新率（refresh rate）**相关，而非显卡。用 `xrandr` 查询与切换（仅 Xorg 会话）：

```bash
xrandr                  # 列出当前支持的分辨率与刷新率
xrandr -s 1280x800      # 切到指定分辨率
```

> [!note] Wayland 下的显示器设置
> `xrandr` 只在 Xorg 会话生效。Wayland 下需用各自合成器的工具：GNOME 用「设置 → 显示器」，或命令行的 `wlr-randr`、`gnome-monitor-config`。

若需强制自定义分辨率（旧显示器/怪屏），用 `gtf` 或更现代的 `cvt` 生成 Modeline，写入 `xorg.conf.d/*.conf` 的 `Monitor` 段：

```bash
gtf 1024 768 75 -x
# 输出形如：
# Modeline "1024x768_75.00"  81.80  1024 1080 1192 1360  768 769 772 802  -HSync +Vsync
```

```text
Section "Monitor"
    Identifier   "Monitor0"
    Modeline "1024x768_75.00"  81.80  1024 1080 1192 1360  768 769 772 802  -HSync +Vsync
EndSection
```

重启 X 使其生效：从 X 会话按 `Ctrl+Alt+Backspace`（需在键盘设置里启用），或 `systemctl isolate multi-user.target; systemctl isolate graphical.target`。

## 23.3 显卡驱动程序安装范例

Xorg 自带的开源驱动已覆盖绝大多数硬件。仅在需要 **3D 加速、GPU 计算、最新显卡的完整功能**时才需安装厂商驱动。当前 x86 显卡三大厂商：**NVIDIA、AMD、Intel**。

> [!info] 现代化提示
> - **Intel / AMD 开源驱动**（内核 `i915` / `amdgpu`）已含于内核，开箱即用，无需手动安装；
> - **NVIDIA 专有驱动**：在 RHEL/Rocky/AlmaLinux 9 上推荐通过 **RPM Fusion** 仓库 `dnf install` 安装，而非 `.run` 文件；
> - 安装编译环境：`dnf groupinstall "Development Tools"` + `dnf install kernel-devel kernel-headers`。

### 23.3.1 NVIDIA

Xorg 自带的开源 `nouveau` 驱动功能有限。要使用完整 3D 加速与 GPU 计算，需安装 NVIDIA 专有驱动。传统 `.run` 安装包流程：

```bash
# 1. 查看显卡型号（无需拆机）
lspci | grep -Ei '(vga|3d|display)'

# 2. 安装编译环境
dnf update
dnf groupinstall "Development Tools"
dnf install kernel-devel kernel-headers

# 3. 屏蔽 nouveau
cat > /etc/modprobe.d/blacklist-nouveau.conf <<'EOF'
blacklist nouveau
options nouveau modeset=0
EOF

# 4. 重建 initramfs 与 GRUB 配置，重启确认 nouveau 未加载
dracut --force
grub2-mkconfig -o /boot/grub2/grub.cfg
reboot
lsmod | grep nouveau          # 应无输出

# 5. 切到文本界面后运行 .run 安装包
systemctl isolate multi-user.target
sh NVIDIA-Linux-x86_64-<版本>.run
```

> [!tip] 推荐用 RPM Fusion 替代 .run
> RHEL/Rocky/AlmaLinux 9 上更推荐启用 [RPM Fusion](https://rpmfusion.org/) 后执行 `dnf install akmod-nvidia`，由 akmod 在内核升级时自动重编，免去手动 `.run` 的维护负担。

安装完成后：

- `Device` 段的 `Driver` 变为 `nvidia`；
- `/usr/lib64/xorg/modules/drivers/` 下出现 `nvidia_drv.so`；
- `.run` 方式可用 `nvidia-installer --update` 升级；RPM Fusion 方式随 `dnf upgrade` 升级；
- 日志在 `/var/log/nvidia*.log` 与 `/var/log/Xorg.0.log`。

### 23.3.2 AMD

AMD 显卡开源驱动（内核 `amdgpu` / `radeon`）已进入主线内核，多数情况开箱即用。如需 AMD 官方 PRO 驱动（专业卡、特定计算场景），通过 [ELRepo](http://elrepo.org/) 仓库安装：

```bash
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
dnf install https://www.elrepo.org/elrepo-release-9.el9.elrepo.noarch.rpm
# 具体包名以 ELRepo 当前提供为准
dnf --enablerepo=elrepo search amdgpu
```

> [!note] AMD 开源化
> 不同于 NVIDIA，AMD 的 Linux 显卡栈已全面开源，内核 `amdgpu` 驱动配合 Mesa（开源 OpenGL/Vulkan 实现）已能满足桌面与大多数游戏、计算需求。仅在专业图形/计算软件认证场景下才需 PRO 驱动。原 CentOS 7 时代的旧专有驱动 `fglrx` 已被 AMD 于 2017 年废弃，不再可用。

### 23.3.3 Intel

Intel 核显驱动（内核 `i915` + X 的 `modesetting`/`intel` DDX + Mesa）全部开源、含于发行版，**通常无需手动安装**。Intel 芯片组整合的核显（笔记本与台式机主流）开箱即用。

```bash
# 确认驱动模块存在
ls /usr/lib64/xorg/modules/drivers/ | grep -E 'intel|modesetting'
# 现代 Xorg 通常用 modesetting DDX，配合内核 i915
```

> [!tip] 现代Intel显卡的驱动栈
> 第 12 代及更新的 Intel 核显需配合较新的内核（6.x）与 Mesa 才能完整支持。Rocky/AlmaLinux 9 默认内核与 Mesa 版本足以支持到 Alder Lake / Raptor Lake 主流型号；最新型号可考虑启用 [ELRepo kernel-ml](https://elrepo.org/) 或迁移到 Fedora 获得新内核。

## 23.4 重点回顾

- Unix Like 系统上的 GUI 最早源自 MIT 1984 年开发的 X Window System，1987 年定型 X11，1994 年演进到 X11R6，故又称 X 或 X11。
- X11 最初由 XFree86 计划维护，后由 **Xorg 基金会**接手，使用 MIT 开放源码授权。
- **当前主流发行版（含 RHEL/Rocky/AlmaLinux 9、Fedora、Ubuntu）的 GNOME/KDE 默认已迁移到 Wayland**，旧 X11 应用通过 **XWayland** 兼容层运行。
- X11 架构核心：**X Server 管理硬件与绘图，X Client 是应用程序**；X Client 把要呈现的画面数据交给 X Server 绘制。
- 每个 X Client 互不感知，需通过特殊的 X Client——**Window Manager**（GNOME/KDE/XFCE/twm 等）——管理窗口的位置、大小、重叠、移动。
- **Display Manager**（如 GDM）提供图形登录界面。
- `startx` 是查找 X Server / X Client 启动脚本的脚本，调用 `xinit` 实际启动 X；多个 X 实例用 `-display :0`、`:1` 区分。
- Xorg 配置位于 `/etc/X11/xorg.conf` 与 `/etc/X11/xorg.conf.d/*.conf`；现代发行版自动侦测，配置文件已非必需。
- 包管理器 `yum`→`dnf`；Intel/AMD 开源驱动已含于内核，NVIDIA 推荐通过 RPM Fusion 安装。

## 延伸阅读

- [X Window System — Wikipedia](https://en.wikipedia.org/wiki/X_Window_System)
- [Wayland — Wikipedia](https://en.wikipedia.org/wiki/Wayland_(display_server_protocol))
- [Xorg 官方网站](https://www.x.org/)
- [Wayland 官方网站](https://wayland.freedesktop.org/)
- [RHEL 9 文档：从 Xorg 迁移到 Wayland](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/administering_the_system_using_the_gnome_desktop_environment/transitioning-from-xorg-to-wayland-in-rhel_administering-the-system-using-the-gnome-desktop-environment)
- [RPM Fusion 仓库](https://rpmfusion.org/)

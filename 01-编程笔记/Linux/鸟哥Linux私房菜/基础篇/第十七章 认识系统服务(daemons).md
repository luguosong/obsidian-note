---
描述: systemd 守护进程（daemon）与服务管理：unit 类型、systemctl 命令、target 操作环境、service/timer 配置文件（据鸟哥原作改写，已更新至 Rocky/AlmaLinux 9 状态）。
排序: 18000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0560daemons.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-08-14
---
# 第十七章 认识系统服务（daemons）

> [!info] 关于本章
> 本章以鸟哥原作（CentOS 7 版）为骨架，已更新到当前 **Rocky/AlmaLinux 9 / RHEL 9** 状态：systemd 为主线（版本约 250+）、`ss` 替代旧 `netstat`、`firewalld` 后端为 nftables、时间同步用 `chronyd`，术语统一为大陆通行写法。CentOS 7 已于 2024-06-30 EOL，仅作历史对照。

在类 Unix 系统中，**daemon（守护进程）** 是常驻内存、提供某种系统或网络功能的进程。达成的功能称为 **service（服务）**，而运行这个 service 的后台进程就是 daemon。例如周期性任务调度这个 service，由 `crond` 这个 daemon 实现。

> [!note] daemon 与 service 的关系
> service 是"功能"，daemon 是"实现该功能的程序/进程"。二者常互换使用：没有 daemon 在后台运行，就没有 service。daemon 程序习惯以 `d` 结尾命名（如 `atd`、`crond`、`sshd`、`httpd`），在 `ps`/`top` 中常见 `{xxx}d` 形态的进程即是。

## 17.1 从 init 到 systemd

### 17.1.1 System V 的 init（历史背景）

早期的 SysV init 由内核第一个启动 `init`（PID 1），再由它唤起所有服务。其管理机制要点：

| 要点 | 说明 |
|---|---|
| 启动脚本 | 集中在 `/etc/init.d/`，用 bash 脚本处理 `start`/`stop`/`restart`/`status` |
| 服务分类 | **stand alone**（独立启动、常驻内存、响应快）与 **super daemon**（由 `xinetd`/`inetd` 统管，按需唤醒） |
| 服务相依性 | 手动启动时 init 不自动处理依赖 |
| 执行等级（runlevel） | 0–6 共 7 级，常用 1（单用户维护）、3（纯文本）、5（图形）；通过 `/etc/rc.d/rc[0-6].d/SXXdaemon` 软链接到 `/etc/init.d/daemon` 控制启动顺序 |
| 默认启动 | `chkconfig daemon on/off`；`chkconfig --list` 观察 |
| 切换等级 | `init 3`/`init 5` 等 |

CentOS 7 起改用 systemd，部分旧脚本以兼容形式保留。现代发行版中 SysV init 已基本退出历史舞台。

### 17.1.2 systemd 及其 unit 分类

systemd 的核心改进：

| 特性 | 说明 |
|---|---|
| 并行启动 | 无依赖的服务同时启动，开机速度大幅提升 |
| 按需激活（on-demand） | 常驻内存，配合 socket/path 等机制即时响应 |
| 依赖自检 | 启动 B 而它依赖 A 时，自动先启动 A |
| unit 分类管理 | 将服务按功能分为 `service`/`socket`/`target`/`timer`/`path` 等类型 |
| target 集合 | 把一组 daemon 组合为 target，替代 runlevel |
| 兼容 init 脚本 | 旧的 init 脚本仍可被管理（但失去高级特性） |

> [!note] systemd 的局限
> runlevel 仅有 1/3/5 对应部分 target；`systemctl` 语法固定不可自定义参数；手动启动（非经 systemctl）的服务无法被 systemd 管理；systemd 启动过程不接受标准输入交互。

**配置文件目录（优先级从低到高）**：

| 目录 | 用途 |
|---|---|
| `/usr/lib/systemd/system/` | 软件包官方提供的启动脚本，类似旧 `/etc/init.d/`，**不建议直接修改** |
| `/run/systemd/system/` | 系统运行中产生的脚本，优先级高于上一项 |
| `/etc/systemd/system/` | 管理员自定义脚本，优先级最高；开机是否启用取决于此目录的软链接 |

开机实际是否启动某服务，看 `/etc/systemd/system/` 下的设置；真正的脚本内容在 `/usr/lib/systemd/system/`。

**unit 类型（看扩展名区分）**：

| 扩展名 | 类型 | 说明 |
|---|---|---|
| `.service` | service unit | 最常见，一般系统/网络服务 |
| `.socket` | socket unit | IPC socket 监听，按需激活对应 daemon（类似旧 super daemon） |
| `.target` | target unit | 一组 unit 的集合，用于构建操作环境 |
| `.mount` / `.automount` | mount unit | 文件系统挂载相关（含 NFS） |
| `.path` | path unit | 监测特定文件/目录（如打印队列） |
| `.timer` | timer unit | 定时任务，比 cron 更精细（支持秒级） |

## 17.2 通过 systemctl 管理服务

systemd 所有操作统一由 `systemctl` 完成（取代旧 `service`/`chkconfig`/`init`）。

> [!warning] 当前状态 vs 开机默认状态
> 服务有两个独立维度：**当前是否运行**（`active`/`inactive`）与**开机是否默认启动**（`enabled`/`disabled`）。`stop` 一个运行中的服务不影响下次开机是否启动；反之亦然。两者须分别处理。

### 17.2.1 管理单一服务

```bash
systemctl [command] [unit]
```

| 命令 | 作用 |
|---|---|
| `start` | 立即启动 |
| `stop` | 立即关闭 |
| `restart` | 重启（stop 再 start） |
| `reload` | 不重启进程，重新加载配置 |
| `enable` | 设置开机默认启动 |
| `disable` | 设置开机默认不启动 |
| `status` | 查看状态（含运行、默认、近期日志） |
| `is-active` | 当前是否运行 |
| `is-enabled` | 开机是否默认启用 |

```bash
# 观察服务状态（重点看 Loaded 与 Active 两行）
systemctl status atd.service
#   Loaded: loaded (...; enabled)       ← 开机默认是否启动
#   Active: active (running) since ...  ← 当前运行状态
#   Main PID: 1350 (atd)                ← 主进程 PID
#   CGroup: ...                         ← 所属控制组
```

> [!tip] 不要用 kill 关闭服务
> 用 `kill` 终止服务后，systemd 会失去对该服务的监控。正确做法是 `systemctl stop`。

**Active（当前运行）状态**：

| 状态 | 含义 |
|---|---|
| `active (running)` | 有一或多个进程在运行 |
| `active (exited)` | 一次性任务正常执行完毕，无常驻进程（如挂载、配额检查） |
| `active (waiting)` | 运行中，等待其他事件触发 |
| `inactive` | 未运行 |

**enabled（开机默认）状态**：

| 状态 | 含义 |
|---|---|
| `enabled` | 开机启动 |
| `disabled` | 开机不启动 |
| `static` | 不能自行 enable，但可被其他 enabled 服务唤醒（被依赖） |
| `mask` | 被强制注销，无论如何都无法启动（`unmask` 恢复） |

**mask 注销示例**：当某服务会被其他 unit 间接唤醒（如 `cups.service` 会被 `cups.socket`、`cups.path` 激活），单纯 `stop`/`disable` 无效。可用 `mask` 强制注销：

```bash
systemctl mask cups.service     # 实际是软链接到 /dev/null
systemctl start cups.service    # Failed: Unit cups.service is masked.
systemctl unmask cups.service   # 恢复
```

### 17.2.2 观察所有服务

```bash
systemctl list-units --type=service --all   # 列出所有 service（含未启动）
systemctl list-unit-files --type=service     # 列出所有已安装的 unit 文件
systemctl                                     # 等同 list-units（仅已加载）
```

`list-units` 显示当前已加载的 unit（含运行状态）；`list-unit-files` 显示磁盘上所有 unit 文件的安装状态（`enabled`/`disabled`/`static`/`mask`）。

### 17.2.3 target 操作环境（替代 runlevel）

target 是一组 unit 的集合，取代旧的 runlevel。常用 target：

| target | 说明 |
|---|---|
| `graphical.target` | 图形界面（包含 `multi-user.target`） |
| `multi-user.target` | 纯文本多用户模式（对应 runlevel 3） |
| `rescue.target` | 救援模式 |
| `emergency.target` | 紧急模式（比 rescue 更底层） |
| `shutdown.target` | 关机流程 |
| `getty.target` | 控制本机 tty 登录数量 |

```bash
systemctl get-default                    # 查看默认 target
systemctl set-default multi-user.target  # 设置默认 target
systemctl isolate multi-user.target      # 不重启切换到纯文本模式
systemctl isolate graphical.target       # 切换到图形模式
```

> [!warning] target 切换用 isolate，不是 start/stop
> service 用 `start`/`stop`；target 切换操作环境用 `isolate`。`systemctl stop graphical.target` 不会返回 multi-user 模式。

便捷命令：

```bash
systemctl poweroff     # 关机
systemctl reboot       # 重启
systemctl suspend      # 暂停（状态存内存，断电即失，唤醒快）
systemctl hibernate    # 休眠（状态存硬盘，可断电，唤醒速度取决于硬盘）
systemctl rescue       # 进入救援模式
systemctl emergency    # 进入紧急模式
```

### 17.2.4 服务依赖关系

```bash
systemctl list-dependencies [unit]      # 列出该 unit 依赖哪些 unit
systemctl list-dependencies --reverse   # 反向：谁依赖（使用）此 unit
```

例：`graphical.target` 依赖 `multi-user.target`；反向查询可知 `multi-user.target` 被 `graphical.target` 使用。出问题时可顺依赖链定位。

### 17.2.5 daemon 运行相关目录与端口对应

除配置文件目录外，daemon 运行还涉及：

| 目录/文件 | 用途 |
|---|---|
| `/etc/sysconfig/*` | 各服务初始化参数（RHEL 系；网络配置在 `network-scripts/`） |
| `/var/lib/` | 服务产生的数据（如数据库） |
| `/run/` | daemon 运行时临时文件（lock、PID 文件） |

```bash
systemctl list-sockets    # 查看所有监听中的 socket 文件位置
```

**网络服务与端口对应**：一台主机只有一个 IP，却可提供多种网络服务，靠 **端口号（port）** 区分。服务名与端口的对照表在 `/etc/services`：

```bash
cat /etc/services
# ssh     22/tcp      # The Secure Shell (SSH) Protocol
# http    80/tcp      www www-http   # WorldWideWeb HTTP
# https   443/tcp     # HTTP over TLS
```

格式：`<服务名> <端口/协议> <别名> # 说明`。协议为 TCP（可靠连接）或 UDP（无连接、快）。

![[vbird-780878fdd683d3b4.gif]]
*图：port 与 daemon 的对应关系*

> [!warning] 不要随意改 /etc/services
> 端口与服务名的对照是约定俗成的。修改可能导致协议异常。如需自定义端口，改服务自身配置（如 sshd 的 `Port`），而非改此文件。

### 17.2.6 关闭不必要的网络服务

systemd 会把许多基础运行进程纳入管辖，因此默认 daemon 数量很多，多数是系统基础，无需改动。**真正需要关注的是会产生网络监听端口的服务**。

现代发行版用 `ss`（iproute2 套件）观察端口，旧 `netstat`（net-tools）已弃用：

```bash
ss -tlunp      # 列出所有监听的 TCP/UDP 端口及对应进程
# -t TCP  -u UDP  -l 监听  -n 数字地址/端口  -p 显示进程
```

定位到无用服务后关闭：

```bash
systemctl stop avahi-daemon.service avahi-daemon.socket
systemctl disable avahi-daemon.service avahi-daemon.socket
```

> [!tip] 同时 stop 与 disable，并连带关闭 socket/path
> 只 `stop service` 不够——对应的 `.socket`/`.path` 会在有请求时重新唤醒 service。要彻底关闭，三者一起 `stop`+`disable`，或用 `mask` 注销。

## 17.3 service 类型的配置文件

### 17.3.1 配置文件目录约定

`/usr/lib/systemd/system/` 下是软件包官方配置，**不宜直接改**。自定义应放在 `/etc/systemd/system/`，常见做法：

| 路径 | 用途 |
|---|---|
| `/etc/systemd/system/<name>.service.d/*.conf` | 增量覆盖（追加设置到官方配置） |
| `/etc/systemd/system/<name>.service.wants/*` | 启动本服务后顺带启动的软链接 |
| `/etc/systemd/system/<name>.service.requires/*` | 启动本服务前必须先启动的软链接 |

修改任何 unit 文件后须执行 `systemctl daemon-reload` 重新加载。

### 17.3.2 service 配置项

一个 `.service` 文件分三段。以 `sshd.service` 为例：

```ini
[Unit]
Description=OpenSSH server daemon
After=network.target sshd-keygen.service
Wants=sshd-keygen.service

[Service]
EnvironmentFile=/etc/sysconfig/sshd
ExecStart=/usr/sbin/sshd -D $OPTIONS
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartSec=42s

[Install]
WantedBy=multi-user.target
```

**[Unit] 段**——说明与依赖：

| 参数 | 说明 |
|---|---|
| `Description` | 简易说明（`list-units`/`status` 显示用） |
| `Documentation` | 文档（`man:`/`http:`/`file:`） |
| `After` | 在指定 unit 之后启动（仅排序，不强制依赖） |
| `Before` | 在指定 unit 之前启动（仅排序） |
| `Requires` | 强依赖：前置 unit 必须启动，否则本 unit 不启动 |
| `Wants` | 弱依赖：希望顺带启动，但不强制 |
| `Conflicts` | 冲突 unit，互斥不可共存 |

**[Service] 段**——实际执行：

| 参数 | 说明 |
|---|---|
| `Type` | 启动方式：`simple`（默认，`ExecStart` 启动后常驻）、`forking`（fork 出子进程作为主服务，父进程退出）、`oneshot`（一次性任务，完成即结束）、`dbus`、`idle` |
| `EnvironmentFile` | 环境变量文件 |
| `ExecStart` | 启动命令（不支持 `<`/`>`/`|`/`&` 等 shell 特殊字符，需 shell 语法时改用 `Type=oneshot` 或包进脚本） |
| `ExecStartPre`/`ExecStartPost` | 启动前/后额外命令 |
| `ExecStop` / `ExecReload` | 停止 / 重载命令 |
| `Restart` | 进程退出后是否自动重启 |
| `RemainAfterExit` | 进程全部退出后仍标记为 active（适合 `oneshot`） |
| `KillMode` | 终止范围：`process`（仅主进程）/`control-group`（含子进程）/`mixed`/`none` |
| `RestartSec` | 重启前等待时长 |

**[Install] 段**——启用（enable）时挂入哪个 target：

| 参数 | 说明 |
|---|---|
| `WantedBy` | 通常为 `*.target`，`enable` 时建立软链接到此 target 的 `.wants/` |
| `Also` | 本 unit enable 时一并 enable 的 unit |
| `Alias` | 别名 |

> [!note] 配置规则
> - 同一参数重复设置时后者覆盖前者；赋空值（如 `After=`）可重置。
> - 布尔值：`1`/`yes`/`true`/`on` 为真，`0`/`no`/`false`/`off` 为假。
> - 空行及 `#`/`;` 开头为注释。

### 17.3.3 模板单元（@ 语法）：启动多份服务

当需要用不同配置启动同一程序多份（如多个 vsftpd 实例、多个 tty），systemd 提供 **模板单元**：

```
模板文件：  名称@.service
实例文件：  名称@实例名.service
```

`@` 后的"实例名"会替换模板中的 `%i`/`%I` 变量。例如 `getty@tty1.service` 实际由 `getty@.service` 生成，`%I` = `tty1`：

```ini
# /usr/lib/systemd/system/getty@.service（节选）
[Service]
ExecStart=-/sbin/agetty --noclear %I $TERM
```

同理 `/usr/lib/systemd/system/vsftpd@.service` 中 `%i` 指向配置文件名：

```ini
[Service]
Type=forking
ExecStart=/usr/sbin/vsftpd /etc/vsftpd/%i.conf
```

启动一个监听 2121 端口的实例，无需新建脚本：

```bash
# 1. 建配置文件
cp /etc/vsftpd/vsftpd.conf /etc/vsftpd/vsftpd3.conf
#    在 vsftpd3.conf 中设 listen_port=2121
# 2. 直接启动实例（自动使用 vsftpd3.conf）
systemctl start vsftpd@vsftpd3.service
```

> [!tip] 调整本机 tty 数量
> 默认 tty 数量在 `/etc/systemd/logind.conf` 的 `NAutoVTs` 控制。改完执行 `systemctl restart systemd-logind.service`。临时启用额外 tty：`systemctl start getty@tty8.service`，无需新建脚本。

### 17.3.4 实例：编写自己的 service

将备份脚本做成服务。先写脚本 `/backups/backup.sh`：

```bash
#!/bin/bash
source="/etc /home /root /var/lib /var/spool/{cron,at,mail}"
target="/backups/backup-system-$(date +%Y-%m-%d).tar.gz"
[ ! -d /backups ] && mkdir /backups
tar -zcvf ${target} ${source} &> /backups/backup.log
```

```bash
chmod a+x /backups/backup.sh
```

再写 unit 文件 `/etc/systemd/system/backup.service`：

```ini
[Unit]
Description=backup my server
Requires=atd.service

[Service]
Type=simple
ExecStart=/bin/bash -c "echo /backups/backup.sh | at now"

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl start backup.service
```

> [!note] 一次性服务的状态
> 上例 `backup.service` 只是把任务丢给 `atd`，执行完即退出，`Active` 显示 `inactive (dead)` 是正常的——脚本本身不常驻内存。

## 17.4 timer 类型的配置文件（cron 的现代替代）

systemd 内置 `timers.target`，可用 `.timer` unit 实现定时任务。相比 cron 的优势：日志完善（便于调试）、可与任意 unit 结合、可绑定 cgroup 限制资源、**精度到秒甚至毫秒**（cron 最小到分）。

使用前提：`timers.target` 已启动；存在配套的 `sname.service` 与 `sname.timer`。

**[Timer] 段主要参数**：

| 参数 | 说明 |
|---|---|
| `OnActiveSec` | timers.target 启动多久后执行 |
| `OnBootSec` | 开机完成后多久执行 |
| `OnStartupSec` | systemd 首次启动后多久执行 |
| `OnUnitActiveSec` | 所管 unit 上次启动后隔多久再执行 |
| `OnUnitInactiveSec` | 所管 unit 上次停止后隔多久再执行 |
| `OnCalendar` | 按日历时间（非相对周期）触发 |
| `Unit` | 指定触发的 service（默认同名） |
| `Persistent` | 配合 `OnCalendar`，开机后补执行错过的任务（类似 anacron） |

**OnCalendar 时间格式**：

```
语法：星期  YYYY-MM-DD  HH:MM:SS
例：  Sun   *-*-*      02:00:00      # 每周日凌晨 2 点
```

间隔时间单位：`us`（微秒）、`ms`（毫秒）、`s`/`m`/`h`/`d`/`w`/`month`/`y`。小单位写前、大单位写后，如 `10s 300m`。口语词：`now`/`today`/`tomorrow`/`hourly`/`daily`/`weekly`/`monthly`。

**周期触发示例**（开机 2 小时后首跑，之后每 2 天跑一次）：

```ini
# /etc/systemd/system/backup.timer
[Unit]
Description=backup my server timer

[Timer]
OnBootSec=2hrs
OnUnitActiveSec=2days

[Install]
WantedBy=timers.target
```

```bash
systemctl daemon-reload
systemctl enable --now backup.timer
systemctl list-timers          # 查看所有 timer 及下次触发时间
```

> [!tip] 只 enable timer，不 enable service
> 周期任务由 timer 触发 service，故 `backup.service` 保持 `disabled`，只 `enable backup.timer` 即可。

**日历触发示例**（每周日凌晨 2 点，错过的补跑）：

```ini
# /etc/systemd/system/backup2.timer
[Unit]
Description=backup my server timer2

[Timer]
OnCalendar=Sun *-*-* 02:00:00
Persistent=true
Unit=backup.service

[Install]
WantedBy=timers.target
```

## 17.5 常见服务说明

下表列出 Rocky/AlmaLinux 9 / RHEL 9 上常见的若干服务（仅举要，完整列表用 `systemctl list-unit-files --type=service` 查看）。服务器场景下，非必要的网络服务应关闭。

| 服务 | 类别 | 说明 |
|---|---|---|
| `sshd` | 网络 | 远程登录（加密），服务器核心服务 |
| `chronyd` | 系统 | 网络时间同步（取代旧 `ntpd`） |
| `crond` | 系统 | 周期性任务调度（`/etc/crontab`） |
| `atd` | 系统 | 一次性定时任务 |
| `firewalld` | 系统/网络 | 默认防火墙（后端为 nftables；用 `firewall-cmd` 管理） |
| `NetworkManager` | 系统/网络 | 网络连接管理（`nmcli`），现代发行版默认启用 |
| `systemd-journald` | 系统 | systemd 原生日志（二进制，`journalctl` 查询） |
| `rsyslog` | 系统 | 结构化日志（落 `/var/log/`），与 journald 配合 |
| `auditd` | 系统 | SELinux 审计日志（`/var/log/audit/`） |
| `smartd` | 系统 | 硬盘状态监测与告警 |
| `irqbalance` | 系统 | 多核系统下中断（IRQ）均衡分配 |
| `tuned` | 系统 | 系统调优配置（RHEL 系特有） |
| `polkit` | 系统 | PolicyKit 权限管理 |
| `dbus` | 系统 | 应用间消息总线 |
| `gdm` | 系统 | GNOME 图形登录管理器（纯文本服务器可不开） |
| `cups` | 系统/网络 | 打印服务（无打印机关闭；端口 631） |
| `avahi-daemon` | 系统/网络 | mDNS/Bonjour 局域网服务发现（服务器通常关闭） |
| `postfix` | 网络 | 邮件发送（系统任务邮件依赖，即便非 mail server 也常启用） |
| `httpd` / `nginx` | 网络 | Web 服务器（按需） |
| `mariadb` / `mysqld` | 网络 | 数据库（按需） |
| `nfs-server` | 网络 | 网络文件系统 |
| `smb` / `nmb` | 网络 | SMB（Windows 文件共享） |
| `libvirtd` | 系统 | 虚拟化管理（不用虚拟化可关闭） |

> [!note] 日志：rsyslog 与 journald
> 现代系统有两套日志协同工作：**systemd-journald**（二进制日志，常驻，`journalctl` 查询）与 **rsyslog**（结构化文本日志，落 `/var/log/`，持久化）。前者捕获快、后者便于传统分析与工具链。

## 17.6 重点回顾

- **service**（服务/功能）由 **daemon**（守护进程）实现；daemon 程序常以 `d` 结尾命名。
- systemd 取代 SysV init：并行启动、按需激活、依赖自检、单一 `systemctl` 命令管理。
- unit 按扩展名分类：`.service`/`.socket`/`.target`/`.path`/`.timer`/`.mount` 等。
- 服务有两维状态：当前 `active`/`inactive`、开机 `enabled`/`disabled`/`static`/`mask`，须分别管理。
- `start`/`stop`/`restart`/`reload` 控当前；`enable`/`disable` 控开机默认；`isolate` 切 target；`mask` 强制注销。
- `target` 替代 runlevel：常用 `multi-user.target`（文本）与 `graphical.target`（图形）。
- 配置文件：官方在 `/usr/lib/systemd/system/`，自定义在 `/etc/systemd/system/`，改后须 `daemon-reload`。
- `.service` 三段：`[Unit]`（说明/依赖）、`[Service]`（执行）、`[Install]`（挂入 target）。
- 模板单元 `名称@.service` 配合 `%i` 可启动多份实例。
- `.timer` 是 cron 的现代替代，精度到秒，配合 `timers.target`。
- 观察网络端口用 `ss -tlunp`（替代旧 `netstat`）；不必要的网络服务应关闭。

## 17.7 习题

1. `ss -tln` 与 `ss -tlnp` 输出有何差异？如何找出占用某端口的进程？
   `-p` 显示占用端口的进程名与 PID；不加 `-p` 只看端口。定位进程后可用 `systemctl status <PID>` 查所属服务。

2. 如何列出系统所有开机默认启动的服务？如何查看某服务当前是否运行？
   `systemctl list-unit-files --type=service`（看默认状态）；`systemctl is-active <unit>` 或 `systemctl status <unit>`（看当前）。

3. 情境：要让 sshd 在 222 端口额外启动一份实例，步骤？
   (1) 复制配置 `cp /etc/ssh/sshd_config /etc/ssh/sshd2_config`，加 `Port 222`；(2) 复制 unit `cp /usr/lib/systemd/system/sshd.service /etc/systemd/system/sshd2.service`，把 `ExecStart` 改为 `/usr/sbin/sshd -f /etc/ssh/sshd2_config -D $OPTIONS`；(3) `systemctl daemon-reload`；(4) 若 SELinux 阻止非标准端口，执行 `semanage port -a -t ssh_port_t -p tcp 222`；(5) `systemctl enable --now sshd2`；(6) `ss -tlnp \| grep ssh` 验证 22 与 222 均在监听。

## 延伸阅读

- [systemd 官方文档（freedesktop.org）](https://systemd.io/)
- [systemd.service — man 页](https://www.freedesktop.org/software/systemd/man/systemd.service.html)
- [systemd.timer — man 页](https://www.freedesktop.org/software/systemd/man/systemd.timer.html)
- [Red Hat 9：使用 systemd 管理系统](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_systems_with_systemd/)
- [systemd — Wikipedia](https://en.wikipedia.org/wiki/Systemd)

---
描述: 进程（process）的状态、观察与管理，job control，以及 SELinux 初探（据鸟哥原作改写，已更新至 Rocky/AlmaLinux 9 当前状态）。
排序: 17000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0440processcontrol.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-08-08
---
# 第十六章 进程管理与SELinux初探

> [!info] 关于本章
> 本章以鸟哥《Linux 私房菜 — 基础学习篇》第十六章为骨架，已将原基于 CentOS 7 的内容更新到 **Rocky/AlmaLinux 9 / RHEL 9** 当前状态：`yum`→`dnf`、PID 1 由 `systemd` 接管（`init` 仅作历史对照）、内核版本升至 5.14/6.x，术语统一为大陆通行写法（程序 program ↔ 进程 process 严格区分）。CentOS 7 已于 2024-06-30 EOL。

一个程序（program）被加载到内存中运行，内存中那个正在运行的实例就称为**进程（process）**。系统上所有运行的任务都以进程形态存在。本章讲清进程的状态、进程间控制、工作管理，以及强化文件访问安全性的 SELinux。

## 16.1 什么是进程 (process)

Linux 下一切操作都与权限有关，而系统判定权限的依据是 [第十三章账号管理](https://linux.vbird.org/linux_basic/0410accountmanager.php) 提到的 UID/GID 与文件属性。**触发任何一个事件时，系统都会将其定义为一个进程，并给予一个 ID（PID），同时依据触发该进程的用户属性，给予该 PID 一组有效权限**。此后该 PID 能进行的动作，就由这组权限决定。

### 16.1.1 程序与进程 (program & process)

**程序（program）**：通常为二进制可执行文件，存放在硬盘、SSD 等存储介质上，是静态的实体文件。

**进程（process）**：程序被触发后，执行者的权限与属性、程序代码与所需数据等被加载到内存，操作系统给予这个内存中的单元一个识别码（PID）。可以说，进程是一个**正在运行中的程序实例**。

![[vbird-7105be581bdbbc62.gif]]
*图：程序被加载成为进程及相关数据的示意图*

> [!note] 同一个程序，不同用户执行，权限不同
> 程序本身的权限有三组人马（r/w/x），不同用户执行同一个 program 时，系统给予的权限不同。例如 `touch` 命令：root 执行时取得 UID/GID = 0/0 的权限，普通用户执行时则取得该用户自身的权限。环境变量、当前工作目录等也随用户而异。

![[vbird-a4ebe919b3be113d.gif]]
*图：程序与进程之间的差异*

**子进程与父进程**：登录系统取得 bash 后，再用 bash 去执行 `/usr/bin/passwd`、`touch` 等指令，这些后来触发的 PID 就是**子进程**，原来的 bash 是**父进程**。每个进程的父进程通过 **PPID（Parent PID）** 标识。子进程可以继承父进程的环境变量。

![[vbird-9b3bbb8b2d5bdb4b.gif]]
*图：进程间的父子关系*

> [!tip] 擒贼先擒王
> 如果关闭一个有问题的进程后它又自动重生（且 PID 不同），多半存在一个父进程会重新派生它。找出父进程并终止它才是治本之策（前提是它不是 `systemd`/`crond` 这类本应常驻的守护进程）。

**fork and exec**：Linux 进程调用通常采用 fork-and-exec 流程：

![[vbird-c27758961ac8a785.gif]]
*图：进程使用 fork and exec 调用的情况*

1. 父进程以 **fork** 方式复制一个与自身几乎相同的临时进程（只有 PID 不同，多出 PPID 指向父进程）；
2. 该临时进程再以 **exec** 方式加载实际要执行的程序代码，最终成为子进程。

**守护进程（daemon）**：常驻内存、负责系统或网络服务的进程。例如 `crond`（定时任务）、`rsyslogd`（日志）、`sshd`（远程登录）、`httpd`/`nginx`（Web）、`named`（DNS）、`postfix`（邮件）等。命名上习惯加 `d` 后缀以示 daemon。网络服务启动后会监听某个端口（port），供外部客户端连接。

### 16.1.2 Linux 的多用户多任务环境

Linux 是**多用户（multi-user）**、**多任务（multitasking）****系统**：

- **多用户**：同一系统上可有多个账号，每个账号权限受限，仅 root 拥有至高权限。每个人登录后取得的 shell PID 不同，因此环境互不干扰（各自的 `~/.bashrc` 等配置独立生效）。
- **多任务**：CPU 在多个进程间快速切换（CPU 调度，注意这不是 crontab 那种"定时任务调度"），每个进程在一秒内或多或少都被执行若干指令，宏观上看似同时运行。Linux 的调度机制能较充分地压榨硬件性能。
- **多个虚拟终端**：默认提供若干文字界面终端（`tty1`~`tty6`）与一个图形界面（`tty1` 或单独的 wayland/tty），可用 `Ctrl+Alt+F1~F7` 切换。某进程卡死时，可切到另一个终端用 `ps` 找出后 `kill` 掉。
- **进程独立性**：进程之间可能独立、也可能有依赖。一个进程崩溃通常不会拖垮整个系统，可被单独终止再重启，无需重启整机。

> [!note] 资源瓶颈
> 多用户多任务下，当用户或进程过多，CPU 与内存可能吃紧。系统变慢时第一步是找出最耗资源的进程（用 `top`），再决定是优化、限流还是升级硬件。

## 16.2 工作管理 (job control)

**工作管理（job control）**是在 bash 单一终端界面下，**同时管理多个工作的机制**。例如在一个 bash 里一边复制文件、一边搜索、一边写 vim。

### 16.2.1 什么是工作管理？

要点：

- job control 管理的都是**当前 bash 的子进程**，无法跨终端（不能从 `tty1` 管理 `tty2` 的 job）；
- 即便有多个终端可用，仍需要 job control：系统可在 `/etc/security/limits.conf` 限制用户最大登录会话数，某些用户可能只有一个会话可用；
- **前台（foreground）**：当前可以接收输入、显示提示符的环境；
- **后台（background）**：可自行运行的工作，不能用 `Ctrl+C` 终止，可用 `bg`/`fg` 调度；
- 后台"运行中"的进程不能等待终端输入（所以 `vim` 这类交互程序不能在后台 running，只能 stopped）。

### 16.2.2 job control 的管理

**`&`：把命令丢到后台运行**

```bash
# 将 /etc 备份到 /tmp/etc.tar.gz，并在后台执行（输出重定向，避免污染前台）
[root@study ~]# tar -Jpcf /tmp/etc.tar.xz /etc > /tmp/log.txt 2>&1 &
[1] 14432   # [job number] PID
```

`[1]` 是工作号（job number，仅对当前 bash 有效），`14432` 是 PID。完成后会显示：

```text
[1]+  Done                    tar -Jpcf /tmp/etc.tar.xz /etc
```

> [!warning] 后台命令务必重定向 stdout/stderr
> 后台进程的 stdout/stderr 默认仍输出到当前屏幕，会盖掉提示符、且无法用 `Ctrl+C` 停止。习惯做法是 `> /tmp/log.txt 2>&1 &`，把输出导向文件。

**`Ctrl+Z`：把当前工作丢到后台暂停**

在 vim 一般模式下按 `Ctrl+Z`：

```text
[root@study ~]# vim ~/.bashrc
# 按 Ctrl+Z
[1]+  Stopped                 vim ~/.bashrc
```

`+` 代表最近被丢入后台、且默认被 `fg` 取回的那个工作；`Stopped` 是其状态。

**`jobs`：观察后台工作**

```bash
[root@study ~]# jobs [-lrs]
# -l 同时列出 PID；-r 仅列运行中；-s 仅列暂停中
[root@study ~]# jobs -l
[1]- 14566 Stopped                 vim ~/.bashrc
[2]+ 14567 Stopped                 find / -print
```

**`fg`：把后台工作拿到前台**

```bash
[root@study ~]# fg %jobnumber   # % 可省略；fg 默认取 + 号工作
[root@study ~]# fg %1
[root@study ~]# fg -            # 取 - 号工作
```

**`bg`：让后台暂停的工作继续运行**

```bash
[root@study ~]# find / -perm /7000 > /tmp/text.txt
# 按 Ctrl+Z
[3]+  Stopped   find / -perm /7000 > /tmp/text.txt
[root@study ~]# bg %3 ; jobs
[3]   Running   find / -perm /7000 > /tmp/text.txt &
```

**`kill`：向工作发送信号**

```bash
[root@study ~]# kill -signal %jobnumber
[root@study ~]# kill -l        # 列出所有可用信号（小写 L）
```

常用信号（详见 `man 7 signal`）：

| 信号 | 名称 | 含义 |
|---|---|---|
| `-1` | SIGHUP | 让进程重新读取配置文件（类似 reload） |
| `-2` | SIGINT | 等同 `Ctrl+C` |
| `-9` | SIGKILL | 强制立即终止（可能留下半成品，如 vim 的 `.swp`） |
| `-15` | SIGTERM | 以正常方式终止（默认值） |
| `-19` | SIGSTOP | 等同 `Ctrl+Z`，暂停进程 |

> [!tip] `-9` 与 `-15` 的区别
> `-15` 让进程做清理工作（如 vim 会删除 `.filename.swp`）；`-9` 直接强杀，残留 `.swp`。优先用 `fg` 取回正常退出；只有无法正常终止时才用 `-9`。
>
> 注意：`kill` 后接纯数字默认是 PID，接 `%数字` 才是 job number。`kill -9 1` 会杀 `systemd` 导致系统崩溃，绝不可做；`kill -9 %1` 才是杀 1 号工作。

### 16.2.3 离线管理问题

job control 的"后台"仍与终端相关。**远程会话断开（离线、注销）后，bash 后台的工作会被终止**，不会继续运行。

长时间任务且不能放后台时，两种方案：

- 用 `at` 将任务交给系统后台（`atd`），与终端无关；
- 用 `nohup`（no hang up）让命令在注销后继续运行。

```bash
# nohup 不支持 bash 内建命令，必须用外部命令
[root@study ~]# nohup ./sleep500.sh &
[2] 14812
nohup: ignoring input and appending output to 'nohup.out'
[root@study ~]# exit
```

再次登录后用 `pstree` 可见 `sleep500.sh` 仍在运行。由于已脱离终端，其输出被重定向到 `~/nohup.out`。

## 16.3 进程管理

进程管理对系统管理员至关重要：能否执行某项工作取决于进程权限；系统繁忙时需要找出最耗资源的进程并处理；有问题的进程需要定位移除；重要任务需要更高的优先级。

### 16.3.1 进程的观察

常用工具：静态的 **`ps`**、动态的 **`top`**、树状的 **`pstree`**。

**`ps`：截取某个时间点的进程状态**

```bash
ps aux    # 观察系统所有进程（注意没有减号）
ps -lA    # 同样观察所有进程
ps axjf   # 连带进程树状态
```

**仅观察自己的 bash 相关进程：`ps -l`**

```text
[root@study ~]# ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
4 S     0 14830 13970  0  80   0 - 52686 poll_s pts/0    00:00:00 sudo
4 S     0 14835 14830  0  80   0 - 50511 wait   pts/0    00:00:00 su
4 S     0 14836 14835  0  80   0 - 29035 wait   pts/0    00:00:00 bash
0 R     0 15011 14836  0  80   0 - 30319 -      pts/0    00:00:00 ps
```

各字段含义：

| 字段 | 含义 |
|---|---|
| `F` | 进程标志（process flags）：4 表示 root 权限；1 表示仅 fork 未 exec） |
| `S` | 进程状态 STAT：`R` 运行中、`S` 可唤醒睡眠、`D` 不可唤醒睡眠（通常等待 I/O）、`T` 停止（暂停或被追踪）、`Z` 僵尸 |
| `UID`/`PID`/`PPID` | 拥有者 UID / 进程 PID / 父进程 PID |
| `C` | CPU 使用率（百分比） |
| `PRI`/`NI` | Priority / Nice，越小越优先被 CPU 执行（详见 [16.3.3](#)） |
| `ADDR`/`SZ`/`WCHAN` | 内存相关：内核函数地址 / 占用内存大小 / 当前等待的内核函数（`-` 表示运行中） |
| `TTY` | 登录终端；远程为 `pts/n` |
| `TIME` | 实际占用 CPU 的时间（非挂钟时间） |
| `CMD` | 触发该进程的命令 |

**观察所有进程：`ps aux`**

```text
[root@study ~]# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.2  60636  7948 ?        Ss   Aug04   0:01 /usr/lib/systemd/systemd ...
root         2  0.0  0.0      0     0 ?        S    Aug04   0:00 [kthreadd]
....(中略)....
root     14836  0.0  0.1 116140  2960 pts/0    S    Aug04   0:00 -bash
```

`ps aux` 各列：`USER`、`PID`、`%CPU`、`%MEM`、`VSZ`（虚拟内存 KiB）、`RSS`（物理内存 KiB）、`TTY`（无则 `?`）、`STAT`、`START`、`TIME`、`COMMAND`。

**进程树：`ps axjf` 或 `pstree`** 可见父子进程的层层衍生关系（如 `systemd → sshd → sshd → bash → sudo → su → bash → ps`）。

**僵尸进程（zombie）**：进程应已结束，但父进程未能完整回收，残留于内存。CMD 列出现 `<defunct>` 标志即僵尸：

```text
apache  8683  0.0  0.9 83384 9992 ?   Z  14:33   0:00 /usr/sbin/httpd <defunct>
```

> [!warning] 僵尸进程的处理
> 大量僵尸通常说明程序编写不良。僵尸进程本身已无法控制，其父进程最终多是 PID 1 的 `systemd`（不能杀）。可先找其直接父进程尝试处理；若内核的回收机制仍无法清理，最终只能 `reboot`。

**`top`：动态观察进程变化**

```bash
[root@study ~]# top [-d 秒数] [-bnp]
```

运行中可按的键：`?` 帮助、`P` 按 CPU 排序、`M` 按内存排序、`N` 按 PID 排序、`T` 按 TIME+ 排序、`k` 给某 PID 发信号、`r` 重设 nice 值、`q` 退出、数字键 `1` 切换多核显示。

```text
top - 00:53:59 up  6:07,  3 users,  load average: 0.00, 0.01, 0.05
Tasks: 179 total,   2 running, 177 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  2916388 total,  1839140 free,   353712 used,   723536 buff/cache
KiB Swap:  1048572 total,  1048572 free,        0 used.  2318680 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
 18804 root      20   0  130028   1872   1276 R   0.5  0.1   0:00.02 top
     1 root      20   0   60636   7948   2656 S   0.0  0.3   0:01.70 systemd
```

上半部分（前 5 行）是系统资源概况，重点关注：

- **第 1 行**：当前时间、开机时长（`up`）、登录用户数、1/5/15 分钟**平均负载**（load average）。该值大于 CPU 核心数时说明系统开始排队。
- **第 2 行**：进程总数及各状态计数，注意 `zombie` 是否为 0。
- **第 3 行**：`%Cpu(s)` 各项，重点关注 `wa`（I/O wait）——系统变慢常因 I/O 阻塞；多核机按 `1` 展开各核。
- **第 4-5 行**：物理内存（`Mem`）与交换空间（`Swap`）。`Swap` 用量越少越好，超过 20% 通常说明物理内存不足。

下半部分各进程列：`PID`、`USER`、`PR`、`NI`、`%CPU`、`%MEM`、`TIME+` 等。默认按 `%CPU` 排序。

```bash
# 批次输出 2 次到文件
top -b -n 2 > /tmp/top.txt

# 持续观察单一 PID（$$ 是当前 bash 的 PID）
echo $$
top -d 2 -p 14836
```

**`pstree`：进程树**

```bash
[root@study ~]# pstree [-A|U] [-up]
# -A 用 ASCII 连接；-p 列出 PID；-u 列出 owner
[root@study ~]# pstree -Aup
systemd(1)-+-ModemManager(745)-+-{ModemManager}(785)
          |                   `-{ModemManager}(790)
          |-sshd(1326)---sshd(13923)---sshd(13927,dmtsai)---bash(13928)---...
```

可清楚看到**所有进程都挂在 PID 1 的 `systemd` 下**——`systemd` 是内核启动的第一个用户态进程。当子进程老是杀不掉时，用 `pstree` 找父进程很方便。

### 16.3.2 进程的管理

进程间通过**信号（signal）**互相控制。常用信号见前文 [kill 表](#)。查询完整列表用 `kill -l` 或 `man 7 signal`。

**`kill -signal PID`**：把信号发给某个 PID（或 `%jobnumber`）。

```bash
# 让 rsyslogd 重新读取配置（信号 1 = SIGHUP）
# 先找 PID：
ps aux | grep 'rsyslogd' | grep -v 'grep' | awk '{print $2}'
# 再发信号：
kill -SIGHUP $(ps aux | grep 'rsyslogd' | grep -v 'grep' | awk '{print $2}')

# 查看是否重启过
tail -5 /var/log/messages
```

> [!warning] `kill` 后接数字与 `%数字` 含义不同
> `kill -9 1` 是对 PID 1（`systemd`）发强杀——会搞崩系统，绝对禁止。`kill -9 %1` 是对当前 bash 的 1 号工作发强杀，才是 job control 用法。

**`killall -signal 命令名`**：按命令名（而非 PID）发信号，可一次作用于同名进程。

```bash
[root@study ~]# killall [-iIe] [command name]
# -i 交互式逐个询问；-I 忽略大小写；-e 要求完整匹配命令名（≤15 字符）

[root@study ~]# killall -1 rsyslogd          # 给所有 rsyslogd 发 SIGHUP
[root@study ~]# killall -i -9 bash           # 逐个询问是否杀 bash
```

### 16.3.3 关于进程的执行顺序

系统同一时刻有大量进程，CPU 调度决定哪个先执行，依据是**优先级（Priority）**。

**Priority 与 Nice**

`PRI` 由内核动态调整，用户无法直接修改。用户能调的是 **Nice 值（NI）**，二者大致关系：

> PRI(new) ≈ PRI(old) + nice

注意是"大致"——PRI 是内核综合决定，nice 只是影响因素之一。

![[vbird-c5b8d9e47c57cfd4.gif]]
*图：没有优先级的进程队列示意*

![[vbird-6cdc84fd40c9691a.gif]]
*图：有优先级的进程队列示意（高优先级进程被调度次数更多）*

Nice 值范围与权限规则：

| 角色 | nice 可调范围 | 备注 |
|---|---|---|
| root | -20 ~ 19 | 可调任意进程 |
| 普通用户 | 0 ~ 19 | 只能调自己的进程，且只能往**高**调（数值变大、变慢），以防抢占资源 |

**`nice`：新启动命令时指定 nice**

```bash
[root@study ~]# nice [-n N] command
# N 是"在原 nice 基础上再加"的值，不是直接指定

# 原本 nice 为 10，再 -5，最终为 5
[root@study ~]# nice -n -5 vim &
```

**`renice`：调整已存在 PID 的 nice**

```bash
[root@study ~]# renice [number] PID
[root@study ~]# renice -5 14836
14836 (process ID) old priority 10, new priority -5
```

> [!note] nice 值会继承
> 调整父进程的 nice，其后续 fork 出的子进程也会继承。`top` 运行中按 `r` 同样可以 renice。

### 16.3.4 系统资源的观察

**`free`：观察内存使用**

```bash
[root@study ~]# free [-b|-k|-m|-g|-h] [-t] [-s N -c N]
# -h 自动单位；-t 显示 Mem+Swap 总量；-s N 每 N 秒输出

[root@study ~]# free -m
              total        used        free      shared  buff/cache   available
Mem:           2848         346        1794           8         706        2263
Swap:          1023           0        1023
```

> [!tip] 内存被"用光"是正常的
> Linux 会把最近用过的文件数据缓存（cache）在内存里以加速下次访问，所以物理内存接近用满是健康现象。真正要关注的是 **`available`**（实际可用）和 **Swap 用量**——Swap 用量持续高说明物理内存不足，应加内存。Swap 性能远低于物理内存。

**`uname`：查阅系统与内核信息**

```bash
[root@study ~]# uname [-asrmpi]
# -a 全部；-r 内核版本；-m 硬件名（如 x86_64）

[root@study ~]# uname -a
Linux study.rocky 5.14.0-362.el9.x86_64 #1 SMP ... x86_64 GNU/Linux
```

> [!info] 现代 RHEL 9 内核
> Rocky/AlmaLinux 9 默认内核为 5.14.x（基于 Linux 5.14 LTS）；CentOS 7 时代是 3.10。内核版本可用 `uname -r` 或 `cat /proc/version` 查看。

**`uptime`：系统启动时间与平均负载**（等同 `top` 第 1 行）

```bash
[root@study ~]# uptime
 02:35:27 up  7:48,  3 users,  load average: 0.00, 0.01, 0.05
```

**`netstat` / `ss`：追踪网络或套接字**

> [!info] netstat → ss
> `netstat` 来自旧版 `net-tools`，RHEL 9 默认不再安装；现代替代是 `iproute2` 套件中的 **`ss`**。仍可用 `dnf install net-tools` 安装 `netstat`。两者常用参数兼容。

```bash
# 列出正在监听的网络服务及其 PID（旧 netstat 写法）
ss -tulnp
# 等价于 netstat -tulnp

# Proto Local Address ... PID/Program name
# tcp  LISTEN 0 128 0.0.0.0:22  ... 1326/sshd
```

`ss`/`netstat` 还列出本地 **Unix domain socket**（`unix` 协议行），是本机进程间通信用的套接字文件（socket file）。两进程通过 socket file 互通数据。

**`dmesg`：分析内核产生的消息**

开机时内核会检测硬件，这些消息存于内存受保护区，用 `dmesg` 读取：

```bash
[root@study ~]# dmesg | more
[root@study ~]# dmesg | grep -i nvme     # 查找 NVMe 相关信息
```

> [!tip] 现代的日志统一入口
> RHEL 7+ 起，所有启动与运行日志由 **`journald`**（`systemd` 的一部分）统一收集，用 `journalctl` 查询，比 `dmesg`/`/var/log/messages` 更完整。`dmesg` 仍可用作快速查看内核环形缓冲区。

**`vmstat`：动态侦测系统资源变化**

可侦测 CPU / 内存 / 磁盘 I/O，用于定位繁忙系统的瓶颈。

```bash
[root@study ~]# vmstat [延迟 [次数]]    # CPU/内存等
[root@study ~]# vmstat -d               # 磁盘读写统计
[root@study ~]# vmstat 1 3              # 每秒一次，共 3 次
procs ------------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd    free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 1838092   1504 722216    0    0     4     1    6    9  0  0 100  0  0
```

字段分组含义：

| 分组 | 关键字段 | 含义 |
|---|---|---|
| procs | `r` / `b` | 等待运行的进程数 / 不可唤醒（阻塞）进程数；越多越忙 |
| memory | `swpd`/`free`/`buff`/`cache` | 同 `free` |
| swap | `si` / `so` | 从磁盘 swap 换入 / 换出量；数值大说明内存紧张、性能差 |
| io | `bi` / `bo` | 从磁盘读 / 写磁盘的块数；越大 I/O 越忙 |
| system | `in` / `cs` | 每秒中断数 / 上下文切换数 |
| cpu | `us`/`sy`/`id`/`wa`/`st` | 用户态 / 内核态 / 空闲 / I/O 等待 / 被虚拟机盗用 |

`wa`（I/O wait）持续高通常意味着磁盘是瓶颈。

## 16.4 特殊文件与进程

### 16.4.1 具有 SUID/SGID 权限的命令执行状态

回顾 [第六章的 SUID/SGID/SBIT](https://linux.vbird.org/linux_basic/0220filemanager.php)。SUID 的关键在于"程序变成进程的那一刻"权限发生切换：普通用户触发 `passwd` 后，新进程通过 SUID 取得了**文件 owner（root）的权限**。

```text
[dmtsai@study ~]$ passwd
# 按 Ctrl+Z 暂停
[1]+  Stopped   passwd
[dmtsai@study ~]$ pstree -uA
        |-sshd---sshd---sshd(dmtsai)---bash-+-passwd(root)
        |                                   `-pstree
```

可见 `passwd` 由 `bash` 衍生，但 owner 变成了 root——这就是 SUID 在进程层面的体现。

查找系统中所有 SUID/SGID 文件：

```bash
find / -perm /6000
```

### 16.4.2 /proc/* 代表的意义

`/proc` 是内核维护的**虚拟文件系统**，存放于内存。每个进程的 PID 都对应 `/proc/<PID>/` 一个目录，整个系统的运行参数则直接放在 `/proc/` 下。

```bash
[root@study ~]# ll /proc/1
-r--r--r--. 1 root root 0 ... cmdline   # 该进程启动时的命令串
-r--------. 1 root root 0 ... environ   # 该进程的环境变量
lrwxrwxrwx. 1 root root 0 ... exe       # 可执行文件的符号链接

[root@study ~]# cat /proc/1/cmdline
/usr/lib/systemd/systemd--switched-root--system--deserialize24
```

常见系统级 `/proc` 文件：

| 文件 | 内容 |
|---|---|
| `/proc/cmdline` | 加载内核时传入的参数 |
| `/proc/cpuinfo` | CPU 信息（频率、型号、特性） |
| `/proc/devices` | 已注册的主要设备号 |
| `/proc/filesystems` | 当前已加载的文件系统 |
| `/proc/interrupts` | IRQ 分配状态 |
| `/proc/ioports` | 设备 I/O 端口地址 |
| `/proc/loadavg` | 1/5/15 分钟平均负载（`top`/`uptime` 的数据来源） |
| `/proc/meminfo` | 内存信息（`free` 的数据来源） |
| `/proc/modules` | 已加载的内核模块（驱动） |
| `/proc/mounts` | 已挂载的文件系统 |
| `/proc/partitions` | 分区信息 |
| `/proc/version` | 内核版本（`uname -a`） |

### 16.4.3 查询已开启文件或已执行进程开启的文件

**`fuser`：由文件找出正在使用它的进程**

```bash
[root@study ~]# fuser [-umv] [-k [-i] [-signal]] file/dir
# -u 列出 owner；-m 上溯到文件系统顶层（umount 失败时排查用）；
# -v 详列；-k 向使用该文件的 PID 发 SIGKILL；-i 配合 -k 询问

[root@study ~]# fuser -uv .
                     USER        PID ACCESS COMMAND
/root:               root      13888 ..c.. (root)bash
```

`ACCESS` 列含义：`c` 当前目录、`e` 可执行、`f` 打开的文件、`r` 根目录、`F` 打开且等待响应、`m` 共享库。

```bash
# 找出占用 /home 文件系统的进程
fuser -muv /home
# 强制踢掉占用者（会逐个询问）
fuser -mki /home
```

**`lsof`：列出被进程打开的文件名**（与 `fuser` 方向相反——由进程找文件）

```bash
[root@study ~]# lsof [-aUu] [+d]
# -a 多条件同时成立；-U 仅 Unix socket；-u 用户；+d 目录

lsof                         # 列出所有已打开文件（输出极多）
lsof -u root -a -U           # root 的 Unix socket
lsof +d /dev                 # /dev 下被打开的设备
lsof -u root | grep bash     # root 的 bash 打开的所有文件
```

**`pidof`：找出正在运行的程序的 PID**

```bash
[root@study ~]# pidof [-sx] program_name
# -s 只列一个；-x 同时列 PPID

[root@study ~]# pidof systemd rsyslogd
1 742
```

## 16.5 SELinux 初探

SELinux（Security-Enhanced Linux）由美国国家安全局（NSA）开发，已整合进 Linux 内核。在现代 RHEL / Rocky / AlmaLinux 上 SELinux 已是完备、易用的内核模块。**除非有特殊第三方软件不兼容，否则建议保持 SELinux 开启**。

### 16.5.1 什么是 SELinux

**设计目标**：调查发现系统问题多数源于**内部资源的误用**（如管理员图省事把 `/var/www/html/` 设为 `777`）。SELinux 正是为控管这类误用而生。

**传统权限模型：自主访问控制（DAC, Discretionary Access Control）**

依据进程的 owner/group 与文件的 rwx 决定能否访问。DAC 的两大困扰：

- **root 无限制**：进程一旦取得 root 权限，可访问任意资源；
- **用户可随意改权限**：把目录设为 `777` 后，任何人（程序）都能任意访问。

**SELinux 的方案：强制访问控制（MAC, Mandatory Access Control）**

针对**特定进程 + 特定文件资源**进行细粒度控管。即使你是 root，使用 `httpd` 这个进程时也只能访问策略允许的资源——**控制主体变成了"进程"而非"用户"**。每个文件资源也针对进程设置了可访问的类型。SELinux 提供预置**策略（policy）**，策略内含大量**规则（rule）**供开关。

![[vbird-1380d538f96bfb39.webp]]
*图：使用 DAC / MAC 产生的不同结果（以 Apache 为例）*

### 16.5.2 SELinux 的运作模式

SELinux 通过 MAC 控管**主体（Subject=进程）**对**目标（Object=文件资源）**的访问。涉及四个核心概念：

| 概念 | 含义 |
|---|---|
| **主体（Subject）** | 进程 |
| **目标（Object）** | 文件资源（文件系统） |
| **策略（Policy）** | 预置的规则集合；RHEL 9 默认 `targeted`（限制网络服务、放松本机）。另有 `minimum`（targeted 的精简版）、`mls`（完整严格） |
| **安全性上下文（security context）** | 类似 rwx 的标签；主体与目标的安全性上下文必须匹配才能访问 |

![[vbird-003a398dbb5d63d4.gif]]
*图：SELinux 运作各元件的相关性*

主体要访问目标，需先通过**策略规则**放行，再进行**安全性上下文比对**，最后还要满足传统 rwx 权限——三关全过才能访问。任何一关失败都会出现"权限不符"。

**安全性上下文（Security Context）**

用 `ls -Z` / `ps -eZ` 查看：

```text
[root@study ~]# ls -Z
-rw-------. root root system_u:object_r:admin_home_t:s0     anaconda-ks.cfg
-rw-r--r--. root root unconfined_u:object_r:admin_home_t:s0 regular_express.txt

[root@study ~]# ps -eZ | grep cron
system_u:system_r:crond_t:s0-s0:c0.c1023  1338 ?  00:00:01 crond
```

安全性上下文用冒号分为四段，重点关注前三段：

> **身份标识（Identify） : 角色（Role） : 类型（Type）** `[:敏感度]`

| 字段 | 常见值 | 含义 |
|---|---|---|
| 身份标识 | `unconfined_u` | 不受限用户（普通登录 bash 产生的文件） |
|  | `system_u` | 系统自身产生的文件/进程 |
| 角色 | `object_r` | 文件/目录资源 |
|  | `system_r` | 进程 |
| 类型（最重要） | 文件称 **type**，进程称 **domain** | targeted 策略下，type/domain 是否匹配决定能否访问 |

> [!note] targeted 策略下，type 字段才是关键
> 在 `targeted` 策略下，身份标识与角色基本不影响判断，**核心看 type**：进程的 domain 与文件的 type 必须在策略规则里被允许匹配，才能访问。

以 `crond` 为例：

```text
# crond 进程
system_u:system_r:crond_t:s0-s0:c0.c1023  1338 ?  crond

# crond 相关文件
-rwxr-xr-x. root root system_u:object_r:crond_exec_t:s0        /usr/sbin/crond
-rw-r--r--. root root system_u:object_r:system_cron_spool_t:s0  /etc/crontab
drwxr-xr-x. root root system_u:object_r:system_cron_spool_t:s0  /etc/cron.d
```

![[vbird-20583330515b852a.webp]]
*图：主体进程的 domain 与目标文件的 type 的关系（以 crond 为例）*

流程：触发具有 `crond_exec_t` 类型的 `/usr/sbin/crond` → 进程获得 `crond_t` 这个 domain → 策略允许 `crond_t` 读取 `system_cron_spool_t` 类型的文件 → 配合 rwx 通过 → crond 才能读到 `/etc/cron.d/` 下的配置。

> [!warning] type 错误时，即便 777 也读不了
> 若把配置文件放到错误位置导致 type 不对，**即使权限是 777，crond 也无法读取**——这正是 SELinux 的价值。

实测：把在 root 家目录建好的 cron 配置用 `mv` 移到 `/etc/cron.d/`，会保留原 `admin_home_t` type：

```bash
[root@study ~]# vim checktime
10 * * * * root sleep 60s
[root@study ~]# mv checktime /etc/cron.d
[root@study ~]# systemctl restart crond
[root@study ~]# tail /var/log/cron
# ... Unauthorized SELinux context ... file_context=unconfined_u:object_r:admin_home_t:s0
# ... (root) FAILED (loading cron table)
```

type 不匹配，crond 拒绝加载该文件。

### 16.5.3 SELinux 三种模式的启动、关闭与观察

SELinux 有三种模式：

| 模式 | 行为 |
|---|---|
| **enforcing** | 强制模式，运行中并实际限制 domain/type |
| **permissive** | 宽容模式，运行中但仅记录警告、不实际拦截（用于排错） |
| **disabled** | 关闭，完全不运作 |

![[vbird-8b70a7438315e848.webp]]
*图：SELinux 三种模式与实际运作流程*

并非所有进程都受 SELinux 管制（如本机的 `bash` 通常是 `unconfined_t`，直接走 rwx）。受限进程（confined，如 `crond_t`、`httpd_t`、`ftpd_t`）才走完整流程：disabled 直接放行；permissive 拦不住但记录；enforcing 拦截并记录。

**观察与切换**：

```bash
[root@study ~]# getenforce          # 查当前模式
Enforcing

[root@study ~]# sestatus            # 详细状态（含策略、模式、配置文件默认）
[root@study ~]# sestatus -b         # 额外列出规则布尔值

[root@study ~]# setenforce 0        # 临时切到 permissive
[root@study ~]# setenforce 1        # 临时切到 enforcing
```

配置文件 `/etc/selinux/config`：

```text
SELINUX=enforcing       # enforcing | permissive | disabled
SELINUXTYPE=targeted    # targeted | minimum | mls
```

> [!warning] 模式与策略切换需重启
> 在 enforcing/permissive 之间切换可用 `setenforce`（无需重启，但 `disabled` 无法用 `setenforce` 切换）；**切换策略、或从 disabled 切到启用**都必须重启。从 disabled 切到启用时，系统需为所有文件重新写入 SELinux 标签（relabel），开机较慢、且完成后还需再重启一次。
>
> 若启用后大量服务因 `/lib/xxx` 无权读取启动失败（relabel 出错），可先切到 permissive，再 `restorecon -Rv /` 还原所有标签。

### 16.5.4 SELinux 策略内的规则管理

**查询规则布尔值：`getsebool` / `sestatus -b`**

```bash
[root@study ~]# getsebool [-a] [规则名]
[root@study ~]# getsebool -a | grep httpd
httpd_enable_homedirs --> off
```

**查询规则细节：`seinfo` / `sesearch`**（来自 `setools` 包，`dnf install setools-console`）

```bash
[root@study ~]# seinfo            # 统计：Classes/Types/Booleans 数量等
[root@study ~]# seinfo -u         # 列出所有身份标识
[root@study ~]# seinfo -t         # 列出所有类型

# 找出 crond_t 能读取的文件 type
sesearch -A -s crond_t | grep spool

# 查 httpd_enable_homedirs 规则允许的 type
sesearch -A -b httpd_enable_homedirs
```

**修改规则布尔值：`setsebool`**

```bash
[root@study ~]# setsebool [-P] 规则名 [0|1]
# -P 持久化写入配置（务必加，否则重启失效）

[root@study ~]# setsebool -P httpd_enable_homedirs 1   # 会跑一会儿
```

### 16.5.5 SELinux 安全性上下文的修改

**手动修改：`chcon`**

```bash
[root@study ~]# chcon [-R] [-t type] [-u user] [-r role] 文件
[root@study ~]# chcon [-R] --reference=范例档 文件

chcon -v -t system_cron_spool_t /etc/cron.d/checktime
chcon -v --reference=/etc/shadow /etc/cron.d/checktime
```

**恢复默认 type：`restorecon`**（推荐，最省事）

```bash
[root@study ~]# restorecon [-Rv] 文件或目录
[root@study ~]# restorecon -Rv /etc/cron.d
restorecon reset /etc/cron.d/checktime context ... shadow_t ... -> ... system_cron_spool_t ...
```

**查询/管理默认 type：`semanage fcontext`**

`restorecon` 之所以能"恢复"，是因为系统记录了每个目录的默认 type，用 `semanage` 查询与增改：

```bash
[root@study ~]# semanage {login|user|port|interface|fcontext} -l
[root@study ~]# semanage fcontext -{a|d|m} [-frst] file_spec

# 查询默认
semanage fcontext -l | grep -E '^/etc |^/etc/cron'

# 为自定义目录 /srv/mycron 增加"默认 type 为 system_cron_spool_t"
semanage fcontext -a -t system_cron_spool_t "/srv/mycron(/.*)?"
restorecon -Rv /srv/mycron
```

> [!tip] 日常工作流
> SELinux 排错三件套：**`restorecon -Rv`** 恢复默认 type（最常用）、**`semanage fcontext -a`** 为非标准目录增加默认、**`setsebool -P`** 开关规则布尔值。`chcon` 改的 type 在 `restorecon` 后会被覆盖，优先用 `semanage + restorecon`。

### 16.5.6 一个网络服务案例及日志协助

SELinux 出错时如何被发现？靠 **`auditd`**（审计守护进程）配合 **`setroubleshootd`**（错误诊断）将 SELinux 拒绝事件与建议处理方法写入日志。

> [!info] 现代（RHEL 7+）的日志链路
> `auditd` → `audispd` → `sedispatch` → 转成 setroubleshoot 消息 → 写入 `journalctl` 与 `/var/log/messages`（旧）/ `/var/log/audit/audit.log`。在 RHEL 9 上首选 `journalctl -t setroubleshoot` 查询。
>
> 必装包：`dnf install setroubleshoot-server`，装完重启 `auditd`（或 `systemctl restart auditd`）。

**示例：用 vsftpd（FTP 服务）演示 SELinux 排错**

```bash
# 准备账号与软件
useradd -s /sbin/nologin ftptest
echo "ftptest:myftp123" | chpasswd
dnf install vsftpd
systemctl enable --now vsftpd
ss -tlnp | grep vsftpd      # 监听 21 端口

# 给 ftptest 家目录放些测试文件
echo "testing" > ~ftptest/test.txt
```

**问题一：匿名/普通用户读不了某些文件**——优先查 rwx 是否正确（如 `/var/ftp/pub/` 下文件缺少 `r`）。

**问题二：普通用户无法从家目录下载**——rwx 都正确却报权限错，疑似 SELinux。把 `setenforce 0` 切到 permissive 后能下载，即可确认是 SELinux 引起。

```bash
[root@study ~]# setenforce 0
[root@study ~]# curl ftp://ftptest:myftp123@localhost/~/test.txt
testing                  # 在 permissive 下能读，确认是 SELinux 拦截
[root@study ~]# setenforce 1

# 查日志，找到 sealert 提示的 ID
journalctl -t setroubleshoot | tail
# 或：grep sealert /var/log/messages | tail

# 根据提示运行 sealert 看建议
sealert -l 3a57aad3-a128-461b-966a-5bb2b0ffa0f9
```

`sealert` 会列出若干候选方案（带可信度），常见的是启用某个布尔值：

```bash
# 本例建议启用 ftp_home_dir（允许 ftp 访问用户家目录）
setsebool -P ftp_home_dir 1
curl ftp://ftptest:myftp123@localhost/~/test.txt
testing                  # 成功
```

**问题三：非标准目录访问**——`sealert` 提示需改 type。参考 `/var/ftp` 的 type：

```bash
[root@study ~]# ll -Zd /var/ftp
drwxr-xr-x. root root system_u:object_r:public_content_t:s0 /var/ftp

[root@study ~]# semanage fcontext -a -t public_content_t "/srv/gogogo(/.*)?"
[root@study ~]# restorecon -Rv /srv/gogogo
```

**问题四：自定义端口**——vsftpd 改监听 555 端口后启动失败，`sealert` 提示需为端口加 type：

```bash
[root@study ~]# vim /etc/vsftpd/vsftpd.conf
listen_port=555
[root@study ~]# systemctl restart vsftpd       # 启动失败

[root@study ~]# semanage port -a -t ftp_port_t -p tcp 555
[root@study ~]# systemctl restart vsftpd       # 成功
[root@study ~]# curl ftp://localhost:555/pub/
```

> [!note] 排错思路小结
> 1. 先用 `setenforce 0` 切 permissive 复现，确认是否 SELinux 问题；记得切回 `setenforce 1`。
> 2. 查 `journalctl -t setroubleshoot` / `sealert -l <ID>`，按建议二选一：
>    - 建议改**规则布尔值** → `setsebool -P 规则 1`；
>    - 建议改**文件 type** → `semanage fcontext -a -t 类型 "路径(/.*)?"` + `restorecon -Rv 路径`；
>    - 建议改**端口 type** → `semanage port -a -t 类型 -p tcp 端口`。

## 16.6 重点回顾

- **程序（program）**：静态的二进制可执行文件；**进程（process）**：程序被触发后加载到内存、被赋予 PID 与权限的运行实例。
- 进程有父子关系（PPID 标识），整个进程树的根是 PID 1 的 **`systemd`**（CentOS 7 时代前是 `init`）。
- 进程派生遵循 **fork-and-exec**：父进程 fork 出临时副本，子进程再 exec 加载实际程序。
- 常驻内存的服务进程称为**守护进程（daemon）**，命名常带 `d` 后缀。
- **job control** 管理当前 bash 的子进程：前台（foreground）/ 后台（background）；关键操作：`&`、`Ctrl+Z`、`jobs`、`fg`、`bg`、`kill %n`。
- 进程观察：`ps`（静态）、`top`（动态）、`pstree`（树状）。
- 进程间通过**信号（signal）**互相控制，常用 `kill` / `killall`；记住 `1`（SIGHUP）、`9`（SIGKILL）、`15`（SIGTERM）。
- 进程优先级由 PRI 决定，用户只能通过 **nice** 值微调；`nice`/`renice`/`top` 三种调整方式。普通用户只能把自己的进程 nice 调高（变慢）。
- 系统资源观察：`free`（内存）、`uname`（内核）、`uptime`（负载）、`ss`/`netstat`（网络）、`dmesg`/`journalctl`（内核/日志）、`vmstat`（综合）。
- **SELinux** 通过 **MAC（强制访问控制）** 补强传统 **DAC** 的不足，控制主体是**进程**而非用户。
- SELinux 运作三要素：主体（进程）→ 策略规则 → 安全性上下文（type/domain 匹配）→ rwx，三关全通过才放行。
- 安全性上下文 `身份:角色:类型`，targeted 策略下 **type 最关键**。
- SELinux 三种模式：`enforcing` / `permissive` / `disabled`；策略主要是 `targeted`；配置文件 `/etc/selinux/config`。
- 观察与切换：`getenforce`、`sestatus`、`setenforce`。
- 修改规则布尔值：`getsebool` / `setsebool -P`；修改文件 type：`chcon`（手动）/ `restorecon`（恢复默认）/ `semanage fcontext`（管理默认）。
- SELinux 出错排查：`auditd` + `setroubleshoot` 写入 `journalctl` / `/var/log/audit/audit.log`；`sealert -l <ID>` 给出候选方案。

## 16.7 习题

- 简述程序（program）与进程（process）的区别？
  - 程序是磁盘上可执行的文件，文件名唯一；进程是程序被加载到内存后、带 PID 与权限的运行实例。同一程序可被同一/不同用户多次执行为多个进程，权限各不相同，进程间相互独立。
- 如何查阅 `crond` 这个守护进程的 PID 与 PRI？
  - `ps -lA | grep crond` 或 `ps aux | grep crond`。
- 如何修改 `crond` 进程的优先级？
  - 先 `ps` 找到 PID，再 `renice -n <number> PID`。
- 一般用户能否调整他人进程的 nice？自己进程的 nice 调到 10 后能否再调回 5？
  - 不能。一般用户只能调自己进程的 nice，且只能调高（数值变大、变慢），故调到 10 后不能再降回 5。
- 如何确认网卡在开机时被识别？
  - `dmesg | grep -i eth` 或 `journalctl -k | grep -i <网卡名>`。

## 延伸阅读

- [Process (computing) — Wikipedia](https://en.wikipedia.org/wiki/Process_(computing))
- [signal(7) — Linux manual page](https://man7.org/linux/man-pages/man7/signal.7.html)
- [Security-Enhanced Linux — Wikipedia](https://en.wikipedia.org/wiki/Security-Enhanced_Linux)
- [SELinux documentation — NSA / GitHub](https://github.com/SELinuxProject/selinux)
- [Red Hat: Using SELinux](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/using_selinux/index)
- [/proc file system — kernel.org](https://docs.kernel.org/filesystems/proc.html)

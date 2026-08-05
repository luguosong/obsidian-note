---
描述: 磁盘配额(xfs_quota)、软件 RAID(mdadm)与 LVM 逻辑卷管理（据鸟哥原作改写，已更新至 Rocky/AlmaLinux 9 当前状态）。
排序: 15000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0420quota.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-07-28
---
# 第十四章 磁盘配额(Quota)与进阶文件系统管理

> [!info] 关于本章
> 本章以鸟哥《Linux 私房菜 — 基础学习篇》第十四章为骨架，已更新到当前 **Rocky/AlmaLinux 9 / RHEL 9** 状态。默认文件系统仍为 **XFS**，`xfs_quota`、`mdadm`、`lvm2` 仍是标配工具，命令语法基本不变；RAID 监控已纳入 **systemd**（`mdmonitor.service`）。CentOS 7 已于 2024-06-30 EOL，文中仅在作历史对照时提及。

Linux 作为多用户多任务系统，常有多个用户共享同一磁盘空间。为公平分配磁盘容量，需要**磁盘配额（Quota）**；为追求性能与可靠性，需要**磁盘阵列（RAID）**；为弹性调整文件系统大小，需要**逻辑卷管理（LVM）**。本章围绕这三者展开。

## 14.1 磁盘配额 (Quota) 的应用与实现

### 14.1.1 什么是 Quota

Quota 用于限制用户/群组在某个文件系统或目录上可使用的磁盘容量（block）或文件数量（inode）。

常见用途：

| 场景 | 限制对象 |
|---|---|
| WWW 服务器 | 每个用户的网页空间容量 |
| 邮件服务器 | 每个用户的邮箱容量 |
| 文件服务器 | 每个用户可用的网络硬盘空间（教学环境最常见）|
| 系统主机 | 某一群组/用户的最大配额；某一目录（project）的最大配额 |

> [!note] XFS 的 project 模式
> 旧版 EXT 家族文件系统的 quota 只能针对**整个文件系统**（挂载点）设置；XFS 支持 **project 模式**，可针对**个别目录**（非文件系统）设置配额。XFS 的 quota 整合在文件系统内部，通过 `xfs_quota` 直接报告各目录使用率，比 `du` 等工具快很多。

Quota 的使用限制：

- **EXT 家族**只能针对整个文件系统；XFS 可用 project 模式针对目录。
- **内核必须支持 quota**：当前主流发行版（RHEL 9 等）默认内核均已支持。
- **只对一般用户有效**：`root` 不能被限制（系统数据几乎都是它的）。
- **SELinux**：默认启用时，quota 可能仅允许针对 `/home` 设置；针对其他目录需放宽 SELinux 规则。

### Quota 的限制项目

XFS 文件系统的 quota 分三个维度：

- **限制对象**：user（用户）、group（群组）、project（目录）。`grpquota` 与 `prjquota` **不可同时启用**。
- **限制资源**：
    - **inode 用量**：限制可建立的文件**数量**；
    - **block 用量**：限制磁盘**容量**（更常用）。
- **soft / hard / grace time**：

| 项目 | 含义 |
|---|---|
| **hard** | 绝对上限，超过即锁定写入 |
| **soft** | 警告阈值；超过后进入宽限期 |
| **grace time** | 宽限时间（默认 7 天）；超过 soft 后开始倒数，倒数结束 soft 即取代 hard |

> [!tip] soft / hard / grace time 的关系
> 用量 < soft：正常使用；soft ≤ 用量 < hard：可继续写入但每次登录警告，grace time 倒数；用量 = hard：锁定。grace time 倒数期间若用量回落到 soft 以下，宽限期停止。

![[vbird-18e85b2678449752.gif]]
*图：soft、hard、grace time 的关系*

### 14.1.2 XFS 文件系统的 Quota 实现范例

本章用一个完整范例贯穿 Quota 设置。目标：

- 5 个用户（`myquota1`~`myquota5`），密码都是 `password`，初始群组为 `myquotagrp`；
- 每个用户磁盘容量限制 hard=300 MB、soft=250 MB，文件数量不限；
- 群组 `myquotagrp` 总量限制 soft=950 MB、hard=1 GB；
- 共享目录 `/home/myquota`（project 模式）：soft=450 MB、hard=500 MB；
- grace time = 14 天。

> [!warning] group 与 project 不可并存
> 同一文件系统上 `grpquota` 与 `prjquota` 只能启用其一。下文先演示 group 模式，再切到 project 模式。

准备账号环境：

```bash
# 用脚本批量创建账号
[root@study ~]# vim addaccount.sh
#!/bin/bash
groupadd myquotagrp
for username in myquota1 myquota2 myquota3 myquota4 myquota5
do
    useradd -g myquotagrp $username
    echo "$username:password" | chpasswd
done
mkdir /home/myquota
chgrp myquotagrp /home/myquota
chmod 2770 /home/myquota

[root@study ~]# sh addaccount.sh
```

### 14.1.3 实现 Quota 流程-1：文件系统的支持与观察

XFS 的 quota 必须在挂载时启用，**不能通过 `mount -o remount` 临时启用**，必须写入 `/etc/fstab` 或在初始挂载时指定。不要在根目录上设置 quota，会让文件系统过于复杂；下文以 `/home` 为例。

先确认 `/home` 是独立的 xfs 文件系统：

```bash
[root@study ~]# df -hT /home
Filesystem              Type  Size  Used Avail Use% Mounted on
/dev/mapper/rl-home     xfs   5.0G   67M  5.0G   2% /home
```

修改 `/etc/fstab`，在第 4 字段 `defaults` 后追加 quota 参数：

```bash
[root@study ~]# vim /etc/fstab
/dev/mapper/rl-home  /home  xfs  defaults,usrquota,grpquota   0 0

[root@study ~]# umount /home
[root@study ~]# mount -a
[root@study ~]# mount | grep home
/dev/mapper/rl-home on /home type xfs (rw,relatime,seclabel,attr2,inode64,usrquota,grpquota)
```

quota 挂载参数对照：

| 参数 | 别名 | 限制对象 |
|---|---|---|
| `uquota` | `usrquota` / `quota` | 用户 |
| `gquota` | `grpquota` | 群组 |
| `pquota` | `prjquota` | 单一目录（与 `grpquota` 互斥）|

> [!warning] /etc/fstab 写错会导致无法开机
> 修改后务必先 `mount -a` 测试通过再重启。卸载 `/home` 前需让所有普通用户注销。

### 14.1.4 实现 Quota 流程-2：观察 Quota 报告数据

`xfs_quota` 是 XFS quota 的统一管理命令，子命令分报告类与管理类：

```bash
[root@study ~]# xfs_quota -x -c "指令" [挂载点]
# -x  专家模式，后接 -c 子命令
# -c  后跟子命令，报告类子命令：
#     print   列出文件系统及 quota 挂载参数
#     df      类似 df，可加 -b/-i/-h
#     report  列出当前 quota，-ugr 选对象、-bi 选资源
#     state   显示 quota 启用状态
```

示例：

```bash
# 列出所有文件系统及 quota 支持
[root@study ~]# xfs_quota -x -c "print"
Filesystem          Pathname
/                   /dev/mapper/rl-root
/home               /dev/mapper/rl-home (uquota, gquota)

# /home 各用户配额
[root@study ~]# xfs_quota -x -c "report -ubih" /home
User quota on /home (/dev/mapper/rl-home)
                        Blocks                            Inodes
User ID      Used   Soft   Hard Warn/Grace     Used   Soft   Hard Warn/Grace
---------- --------------------------------- ---------------------------------
root           4K      0      0  00 [------]      4      0      0  00 [------]
myquota1      12K      0      0  00 [------]      7      0      0  00 [------]

# quota 启用状态
[root@study ~]# xfs_quota -x -c "state"
User quota state on /home (/dev/mapper/rl-home)
  Accounting: ON    Enforcement: ON
Group quota state on /home (/dev/mapper/rl-home)
  Accounting: ON    Enforcement: ON
Project quota state on /home (/dev/mapper/rl-home)
  Accounting: OFF   Enforcement: OFF
Blocks grace time: [7 days 00:00:30]
```

### 14.1.5 实现 Quota 流程-3：限制值设置方式

`limit` 设置容量/数量限制，`timer` 设置 grace time：

```bash
[root@study ~]# xfs_quota -x -c "limit [-ug] b[soft|hard]=N i[soft|hard]=N name"  挂载点
[root@study ~]# xfs_quota -x -c "timer [-ug] [-bir] Ndays"  挂载点
# limit  bsoft/bhard: block 的 soft/hard；isoft/ihard: inode 的 soft/hard
# timer  设置 grace time，可针对 user/group 与 block/inode
```

按范例设置：

```bash
# 5 个用户：soft=250M, hard=300M
[root@study ~]# for i in 1 2 3 4 5; do
>   xfs_quota -x -c "limit -u bsoft=250M bhard=300M myquota$i" /home
> done

# 群组：soft=950M, hard=1G
[root@study ~]# xfs_quota -x -c "limit -g bsoft=950M bhard=1G myquotagrp" /home

# grace time 设为 14 天
[root@study ~]# xfs_quota -x -c "timer -ug -b 14days" /home
```

验证 quota 生效（以 `myquota1` 测试）：

```bash
[root@study ~]# su - myquota1
[myquota1@study ~]$ dd if=/dev/zero of=123.img bs=1M count=310
dd: error writing '123.img': Disk quota exceeded
[myquota1@study ~]$ exit
[root@study ~]# xfs_quota -x -c "report -ubh" /home
                        Blocks
User ID      Used   Soft   Hard Warn/Grace
---------- ---------------------------------
myquota1     300M   250M   300M  00 [13 days]   # 已超 soft，grace time 开始倒数
myquota2      12K   250M   300M  00 [------]
```

### 14.1.6 project 的限制（针对目录限制）

project 模式可针对**目录**限制容量，不受目录内文件所属用户影响。由于 `grpquota` 与 `prjquota` 互斥，需先取消 group、启用 project：

```bash
# 1. 修改 /etc/fstab：删 grpquota，加 prjquota
[root@study ~]# vim /etc/fstab
/dev/mapper/rl-home /home xfs  defaults,usrquota,prjquota  0 0

[root@study ~]# umount /home; mount -a
[root@study ~]# xfs_quota -x -c "state"
Project quota state on /home (/dev/mapper/rl-home)
  Accounting: ON          Enforcement: ON
```

project 需指定「项目 ID ↔ 目录」「项目名 ↔ 项目 ID」两组映射，分别写入 `/etc/projects` 与 `/etc/projid`：

```bash
# 2.1 项目 ID 与目录对应
[root@study ~]# echo "11:/home/myquota" >> /etc/projects
# 2.2 项目名与 ID 对应
[root@study ~]# echo "myquotaproject:11" >> /etc/projid
# 2.3 初始化项目
[root@study ~]# xfs_quota -x -c "project -s myquotaproject"

# 3. 设置项目配额：soft=450M, hard=500M
[root@study ~]# xfs_quota -x -c "limit -p bsoft=450M bhard=500M myquotaproject" /home
```

测试（连 root 在该目录下也受限）：

```bash
[root@study ~]# dd if=/dev/zero of=/home/myquota/123.img bs=1M count=510
dd: error writing '/home/myquota/123.img': No space left on device
```

> [!tip] project 模式的实际价值
> 当 WWW 服务所有文件都属 `httpd` 用户时，按用户限 quota 无法区分不同目录；project 模式可按目录限额，不管文件 owner。这是 project 配额最大的实务价值。

### 14.1.7 XFS quota 的管理与额外指令对照表

`xfs_quota` 的管理子命令：

| 子命令 | 作用 |
|---|---|
| `disable` | 暂停强制管制（仍会计数）；最常用 |
| `enable`  | 恢复管制，与 `disable` 对应 |
| `off`     | 完全关闭；之后只能卸载重挂才能恢复，慎用 |
| `remove`  | 必须在 `off` 状态下执行；移除所有 quota 设置 |

```bash
# 暂时关闭 → 仍可超量写入
[root@study ~]# xfs_quota -x -c "disable -up" /home
[root@study ~]# dd if=/dev/zero of=/home/myquota/123.img bs=1M count=520   # 不报错
# 恢复管制
[root@study ~]# xfs_quota -x -c "enable -up" /home

# 完全关闭并移除 project 限制
[root@study ~]# xfs_quota -x -c "off -up" /home
[root@study ~]# xfs_quota -x -c "remove -p" /home
[root@study ~]# umount /home; mount -a
```

> [!warning] remove -p 会清空所有 project 设置
> `remove -p` 删除该文件系统上的**全部** project 限制，无法只撤销单个，只能逐个重新设置。

XFS 与 EXT 家族 quota 对照：

| 流程 | XFS | EXT 家族 |
|---|---|---|
| `/etc/fstab` 参数 | `usrquota` / `grpquota` / `prjquota` | `usrquota` / `grpquota` |
| quota 配置文件 | 不需要 | `quotacheck` 生成 |
| 设置用户/群组限制 | `xfs_quota -x -c "limit ..."` | `edquota` / `setquota` |
| 设置 grace time | `xfs_quota -x -c "timer ..."` | `edquota` |
| 设置目录限制 | `xfs_quota -x -c "limit -p ..."` | 无 |
| 观察报告 | `xfs_quota -x -c "report ..."` | `repquota` / `quota` |
| 启用/关闭 | `xfs_quota -x -c "disable\|enable ..."` | `quotaoff` / `quotaon` |
| 发送警告信 | 当前版本不支持 | `warnquota` |

### 14.1.8 不更动既有系统的 quota 实例

若邮件目录 `/var/spool/mail` 当初未独立分区，又想对邮箱容量设限，可用**符号链接**把它并入已设配额的 `/home`：

1. 将 `/var/spool/mail` 整体移动到 `/home/mail`；
2. `ln -s /home/mail /var/spool/mail` 建立符号链接；
3. 对 `/home` 设置 quota。

> [!warning] SELinux 注意
> 当前发行版默认启用 SELinux，目录搬移后可能触发权限问题，需先临时关闭 SELinux 或调整规则。

## 14.2 软件磁盘阵列 (Software RAID)

### 14.2.1 什么是 RAID

RAID（Redundant Arrays of Independent Disks，独立冗余磁盘阵列）通过软件或硬件将多块磁盘整合成一块更大的虚拟磁盘，兼具存储与数据保护功能。等级（level）不同则功能不同。

**RAID-0（条带模式，stripe）：性能最佳**

将数据按 chunk（一般 4K~1M）切片后交错写入各盘。N 块盘组成的 RAID-0，每盘只承担 1/N 数据量，读写性能近似 N 倍，总容量为各盘之和。

代价：**任何一块盘损坏，整组数据全部丢失**。用不同容量盘组成 RAID-0 时，小盘用完后性能下降。

![[vbird-a3954f86f0654d26.gif]]
*图：RAID-0 的写入示意*

**RAID-1（镜像模式，mirror）：完整备份**

同一份数据完整写入两块盘。总容量为单盘容量（少 50%）。写入性能一般（受限于总线复制），读取性能较好（多个进程读同一份数据时可负载均衡）。任何一块盘损坏，数据仍完整。

![[vbird-0a507e2dd4b7e2a7.gif]]
*图：RAID-1 的写入示意*

**RAID 1+0 与 RAID 0+1**

先两两组成 RAID-1，再把多组 RAID-1 组成 RAID-0，即 RAID 1+0。兼顾 RAID-1 的安全与 RAID-0 的性能。RAID 1+0 重建时只需从镜像盘直接复制，性能远好于 RAID 5/6 的整体重建，是当前存储厂商**最推荐**的等级。

![[vbird-e1af8d7dd8127d88.webp]]
*图：RAID-1+0 的写入示意*

**RAID-5：性能与备份的均衡**

至少 3 块盘。写入类似 RAID-0 的条带，但每个循环额外写入一份**奇偶校验（parity）**，且 parity 轮流落在不同盘上。任何一块盘损坏都可用其余盘的 parity 重建。总容量为 (N-1) 块盘。只能容忍 1 块盘损坏。

**RAID-6**：用 2 块盘容量存 parity，可同时容忍 2 块盘损坏。

![[vbird-6acc5646b04e8d51.gif]]
*图：RAID-5 的写入示意*

**热备盘（spare disk）**

不属于当前 RAID 等级、平时不参与读写的备用盘。RAID 中某盘损坏时，spare disk 被自动拉入阵列并立即开始重建（rebuild）。配合热插拔可在不关机下完成更换。

**RAID 等级对照（n 块盘）**

| 项目 | RAID0 | RAID1 | RAID10 | RAID5 | RAID6 |
|---|---|---|---|---|---|
| 最少磁盘数 | 2 | 2 | 4 | 3 | 4 |
| 最大容错磁盘数 | 无 | n-1 | n/2 | 1 | 2 |
| 数据安全性 | 无 | 最佳 | 最佳 | 好 | 比 RAID5 好 |
| 理论写入性能 | n | 1 | n/2 | <n-1 | <n-2 |
| 理论读出性能 | n | n | n | <n-1 | <n-2 |
| 可用容量 | n | 1 | n/2 | n-1 | n-2 |
| 典型应用 | 性能优先、数据不重要 | 数据与备份 | 服务器、云系统常用 | 数据与备份 | 数据与备份 |

> [!note] RAID5/6 性能受 parity 计算影响
> RAID5/6 每次写入都要计算 parity，软件 RAID 时由 CPU 计算，性能与系统硬件相关，读/写都不会刚好等于磁盘数量。

> [!tip] 等级选型
> 云虚拟化环境对响应延迟敏感，RAID5/6 性能偏弱不考虑，首选 RAID10。大文件冷存储（如模拟输出数据）选 RAID6 兼顾容量与安全。

### 14.2.2 软件 RAID 与硬件 RAID

| 维度 | 硬件 RAID | 软件 RAID |
|---|---|---|
| 实现 | 磁盘阵列卡，专用芯片处理（含 parity 计算）| 操作系统用 CPU 与 I/O 总线模拟 |
| 性能 | 不占用系统总线，支持热插拔，较好 | 占用系统资源，但现代 CPU 已足够 |
| 成本 | 中高端卡昂贵；低端主板 RAID 常只支持 RAID0/1 | 免费 |
| 驱动 | 需 OS 有对应驱动 | 无需 |
| Linux 设备名 | `/dev/sd[a-p]`（走 SCSI 驱动）| `/dev/md0`、`/dev/md1`... |

> [!note] Intel 南桥 RAID 在 Linux 下被识别为软件 RAID
> Intel 芯片组自带的"硬件 RAID"在 Linux 下会被视为 md 设备，设备名常为 `/dev/md126`、`/dev/md127`，分区名为 `/dev/md126p1` 之类。

Linux 软件 RAID 工具是 `mdadm`，以分区或整盘为单位，支持 RAID0/1/5/10 与 spare disk，支持在线（文件系统正常使用时）抽换分区。

### 14.2.3 软件磁盘阵列的设置

`mdadm --create` 创建阵列：

```bash
[root@study ~]# mdadm --create /dev/md[0-9] --auto=yes --level=[015610] \
> --chunk=Nk --raid-devices=N --spare-devices=N /dev/sdX /dev/sdY...
# --create           创建 RAID
# --auto=yes         自动建立 /dev/md0 等设备
# --chunk=Nk         chunk（stripe）大小，常用 64K 或 512K
# --raid-devices=N   数据盘数量
# --spare-devices=N  热备盘数量
# --level=           RAID 等级（0/1/5/6/10）
# --detail           查看阵列详情
```

范例目标：用 4 个 1GB 分区组 RAID-5，chunk=256K，加 1 个 1GB 分区作 spare，挂载到 `/srv/raid`。先用 `gdisk` 切出 5 个 1GB 分区（GPT 类型 `FD00` Linux RAID）。

```bash
# 创建 RAID-5（vda{5,6,7,8} 为数据盘，vda9 为 spare）
[root@study ~]# mdadm --create /dev/md0 --auto=yes --level=5 --chunk=256K \
> --raid-devices=4 --spare-devices=1 /dev/vda{5,6,7,8,9}
mdadm: array /dev/md0 started.

[root@study ~]# mdadm --detail /dev/md0
/dev/md0:
        Version : 1.2
     Raid Level : raid5
     Array Size : 3142656 (3.00 GiB)
   Raid Devices : 4
  Total Devices : 5
          State : clean
 Active Devices : 4
Working Devices : 5
    Spare Devices : 1
     Chunk Size : 256K

    Number   Major   Minor   RaidDevice State
       0     252        5        0      active sync   /dev/vda5
       1     252        6        1      active sync   /dev/vda6
       2     252        7        2      active sync   /dev/vda7
       5     252        8        3      active sync   /dev/vda8
       4     252        9        -      spare          /dev/vda9
```

查看阵列状态（另一种方式）：

```bash
[root@study ~]# cat /proc/mdstat
Personalities : [raid6] [raid5] [raid4]
md0 : active raid5 vda8[5] vda9[4](S) vda7[2] vda6[1] vda5[0]
      3142656 blocks super 1.2 level 5, 256k chunk, algorithm 2 [4/4] [UUUU]
```

> [!note] /proc/mdstat 字段含义
> 第一行：md0 为 raid5，使用 vda5~vda8 四块数据盘，`[S]` 表示 spare。第二行 `[m/n]` 表示需要 m 块、n 块正常；`[UUUU]` 表示 4 块全部正常，`_` 表示异常。

格式化时按 RAID 几何优化 XFS：chunk=256K（`su=256k`）、数据盘数 4 减 1=3（`sw=3`）、数据宽度=256K×3=768K：

```bash
[root@study ~]# mkfs.xfs -f -d su=256k,sw=3 -r extsize=768k /dev/md0
[root@study ~]# mkdir /srv/raid
[root@study ~]# mount /dev/md0 /srv/raid
[root@study ~]# df -Th /srv/raid
Filesystem     Type  Size  Used Avail Use% Mounted on
/dev/md0       xfs   3.0G   33M  3.0G   2% /srv/raid
```

### 14.2.4 模拟 RAID 错误的救援模式

`mdadm --manage` 管理阵列成员：

```bash
[root@study ~]# mdadm --manage /dev/md[0-9] [--add 设备] [--remove 设备] [--fail 设备]
# --add     加入新盘
# --remove  移除盘
# --fail    标记为出错
```

模拟 `vda7` 故障，观察 spare 自动接管：

```bash
[root@study ~]# mdadm --manage /dev/md0 --fail /dev/vda7
mdadm: set /dev/vda7 faulty in /dev/md0
# 立即查看会看到 vda9 进入 rebuilding、vda7 为 faulty
# 等待重建完成后，vda9 变为 active sync、vda7 为 faulty
```

替换坏盘的流程：

1. `mdadm --manage /dev/md0 --remove /dev/vda7`（从阵列移除）；
2. 关机换上新盘（或热插拔）；
3. `mdadm --manage /dev/md0 --add /dev/vda7`（新盘加入，自动成为 spare）。

> [!tip] 在线替换
> 整个替换过程文件系统照常可用——这正是 RAID 加 spare disk 的价值。

### 14.2.5 开机自动启动 RAID 并自动挂载

将阵列 UUID 写入 `/etc/mdadm.conf`，并把文件系统写入 `/etc/fstab`：

```bash
# 取得 RAID UUID
[root@study ~]# mdadm --detail /dev/md0 | grep -i uuid
           UUID : 2256da5f:4870775e:cf2fe320:4dfabbc6

[root@study ~]# vim /etc/mdadm.conf
ARRAY /dev/md0 UUID=2256da5f:4870775e:cf2fe320:4dfabbc6

# 取得文件系统 UUID 并写入 fstab
[root@study ~]# blkid /dev/md0
/dev/md0: UUID="494cb3e1-5659-4efc-873d-d0758baec523" TYPE="xfs"
[root@study ~]# vim /etc/fstab
UUID=494cb3e1-5659-4efc-873d-d0758baec523  /srv/raid xfs defaults 0 0

[root@study ~]# umount /dev/md0; mount -a   # 验证挂载无错误
```

> [!note] RHEL 9 的 mdadm.conf 与 mdmonitor
> 当前发行版（RHEL 9 等）`mdadm.conf` 位于 `/etc/mdadm.conf`，可用 `mdadm --detail --scan >> /etc/mdadm.conf` 自动生成 ARRAY 行。阵列健康状态默认由 systemd 的 `mdmonitor.service` 监控，可在 `/etc/mdadm.conf` 配置 `MAILADDR` 接收故障告警邮件。

### 14.2.6 关闭软件 RAID（重要）

练习环境用完务必关闭 RAID 并清空成员盘上的 metadata，否则后续重新分区同一磁盘时会莫名报错（系统会从旧 metadata 重建阵列，名变 `/dev/md127`）：

```bash
# 1. 卸载并删除 fstab 中相关行
[root@study ~]# umount /srv/raid
[root@study ~]# vim /etc/fstab     # 删除/注释 /srv/raid 行

# 2. 覆写 RAID 与各盘的 metadata
[root@study ~]# dd if=/dev/zero of=/dev/md0 bs=1M count=50
[root@study ~]# mdadm --stop /dev/md0
[root@study ~]# for i in 5 6 7 8 9; do dd if=/dev/zero of=/dev/vda$i bs=1M count=10; done

[root@study ~]# cat /proc/mdstat    # 确认 unused devices: <none>
[root@study ~]# vim /etc/mdadm.conf # 删除/注释 ARRAY 行
```

> [!warning] dd 千万别写错盘
> `dd if=/dev/zero` 写错磁盘会清空全部数据。操作前务必核对盘符。

> [!tip] 实战请用不同物理盘
> 本章为练习在同一块盘上用多个分区组 RAID。真实环境应用多块不同物理盘组 RAID，才能获得跨盘的读写性能与容错能力。

## 14.3 逻辑卷管理器 (Logical Volume Manager)

LVM 的核心价值是**弹性调整文件系统容量**（在线扩缩），而非性能或备份。它把多个物理分区整合成一块可动态增减的大磁盘。

### 14.3.1 什么是 LVM：PV、PE、VG、LV

LVM 通过软件把多个物理分区（或整盘）组合成一块看似独立的大磁盘（VG），再从 VG 切出可使用的逻辑卷（LV），最终格式化挂载。

| 组件 | 全称 | 说明 |
|---|---|---|
| **PV** | Physical Volume（物理卷）| 实际分区/磁盘，需将系统 ID 设为 `8E00`（LVM），再 `pvcreate` 转换 |
| **VG** | Volume Group（卷组）| 由多个 PV 组合成的大磁盘，是 LVM 的「池」|
| **PE** | Physical Extent（物理盘区）| LVM 最小存储单元（默认 4 MB），类似文件系统的 block |
| **LV** | Logical Volume（逻辑卷）| 从 VG 切出、可格式化使用的「分区」，设备名 `/dev/VG名/LV名` |

> [!note] PE 与最大容量
> LVM1 在 32 位系统上 LV 最多 65534 个 PE，默认 4 MB PE 下 LV 上限约 256 GB。**LVM2 + 64 位系统已无此限制**，当前发行版默认均为 LVM2。

LV 容量 = LV 内 PE 总数 × PE 大小。扩缩容本质是增减 LV 中的 PE（PE 在 VG 内、各 LV 间交换）。

![[vbird-3ec054ae0a090eb5.gif]]
*图：PE 与 VG 的关系*

**LV 写入模式**

| 模式 | 说明 |
|---|---|
| **线性（linear）** | 默认模式。一个分区写满后才用下一个分区 |
| **条带（striped）** | 数据拆分并行写入多个分区，类似 RAID-0；任一分区损坏则数据全毁 |

> [!warning] LVM 默认线性模式
> LVM 的价值是弹性容量，不是性能或备份。要性能+备份请用 RAID。striped 模式任一盘损坏会丢全部数据，不建议。

![[vbird-38037d89d0abac8f.webp]]
*图：LVM 各组件的实现流程*

### 14.3.2 LVM 实现流程

LVM 需内核支持与 `lvm2` 软件包，当前主流发行版默认均已安装。

范例目标：4 个 1GB 分区（ID `8E00`）组成 VG `vbirdvg`（PE=16MB），从中切出 2GB 的 LV `vbirdlv`，格式化为 xfs 挂载到 `/srv/lvm`。

先用 `gdisk` 切出分区，再分阶段处理。

**PV 阶段**

```bash
[root@study ~]# pvcreate /dev/vda{5,6,7,8}      # 创建 PV
[root@study ~]# pvscan                          # 查看所有 PV
[root@study ~]# pvdisplay /dev/vda5             # 查看单个 PV 详情
# pvremove 删除 PV 属性
```

**VG 阶段**

```bash
[root@study ~]# vgcreate -s 16M vbirdvg /dev/vda{5,6,7}   # 建 VG，PE=16MB
[root@study ~]# vgscan
[root@study ~]# vgdisplay vbirdvg
  VG Size               2.95 GiB
  PE Size               16.00 MiB
  Total PE              189
  Free  PE / Size       189 / 2.95 GiB

# 把剩余的 vda8 也加入 VG（扩容）
[root@study ~]# vgextend vbirdvg /dev/vda8
# 其它：vgscan / vgdisplay / vgreduce（移除 PV）/ vgchange（启停）/ vgremove
```

**LV 阶段**

```bash
[root@study ~]# lvcreate -L 2G -n vbirdlv vbirdvg    # 从 VG 切 2GB 给 LV
[root@study ~]# lvscan
  ACTIVE            '/dev/vbirdvg/vbirdlv' [2.00 GiB] inherit
# 其它：lvdisplay / lvextend / lvreduce / lvresize / lvremove
```

> [!warning] 引用 LV 必须用全名
> 后续命令中 LV 要用全名 `/dev/vbirdvg/vbirdlv`，不能只写 `vbirdlv`。

格式化挂载：

```bash
[root@study ~]# mkfs.xfs /dev/vbirdvg/vbirdlv
[root@study ~]# mkdir /srv/lvm
[root@study ~]# mount /dev/vbirdvg/vbirdlv /srv/lvm
```

### 14.3.3 放大 LV 容量

LVM 的招牌能力是在线放大文件系统，数据不受影响。流程：

1. **VG 有剩余容量**（不够就加盘 → `pvcreate` → `vgextend`）；
2. **`lvresize` 扩大 LV**；
3. **放大文件系统**：XFS 用 `xfs_growfs`，ext4 用 `resize2fs`。

> [!warning] XFS 只能放大、不能缩小
> XFS 不支持在线缩小容量。需要缩小请用 ext4（`resize2fs` 可缩）。

范例：给 `/srv/lvm` 增加 500MB（实际会被 PE 取整到 512MB）：

```bash
# 1. 确认 VG 剩余容量够
[root@study ~]# vgdisplay vbirdvg | grep Free
  Free  PE / Size       124 / 1.94 GiB

# 2. 放大 LV（在线，无需卸载）
[root@study ~]# lvresize -L +500M /dev/vbirdvg/vbirdlv
  Size of logical volume vbirdvg/vbirdlv changed from 2.00 GiB to 2.50 GiB.

# 3. 放大 XFS 文件系统
[root@study ~]# xfs_growfs /srv/lvm
[root@study ~]# df -Th /srv/lvm
Filesystem                  Type  Size  Used Avail Use% Mounted on
/dev/mapper/vbirdvg-vbirdlv xfs   2.5G  111M  2.4G   5% /srv/lvm
```

> [!note] 放大的本质
> `xfs_growfs` 通过新增 allocation group（block group）来扩展，原文件系统数据不变，新容量反馈到 superblock。严格说不是「重新格式化」，只对新增部分格式化并回写 superblock。

### 14.3.4 LVM Thin Volume（精简配置）

Thin Pool 允许「按需分配」：先建一个较小的存储池（thin pool），再从中切出**宣告容量很大**的 LV，LV 实际用多少才从池中占多少。

典型场景：

- 池只有 1 GB，却可对外提供 3 个 10 GB 的 LV（每个实际用量 < 10%）；
- 预告用户「有 5 TB 可用」，但实际物理空间逐步扩容。

> [!warning] 超分配的风险
> 所有 thin LV 的**实际总用量**不能超过 thin pool 的真实容量，否则数据损坏。监控 thin pool 占用率是管理重点。

范例：从 `vbirdvg` 切 1GB 作 thin pool `vbirdtpool`，再产生 10GB 的 thin LV `vbirdthin1`：

```bash
# 1. 建 thin pool
[root@study ~]# lvcreate -L 1G -T vbirdvg/vbirdtpool

# 2. 从 thin pool 产生 10GB 的 LV（VG 本身没那么大也行）
[root@study ~]# lvcreate -V 10G -T vbirdvg/vbirdtpool -n vbirdthin1

# 3. 格式化挂载
[root@study ~]# mkfs.xfs /dev/vbirdvg/vbirdthin1
[root@study ~]# mkdir /srv/thin
[root@study ~]# mount /dev/vbirdvg/vbirdthin1 /srv/thin
[root@study ~]# df -Th /srv/thin
Filesystem                     Type  Size  Used Avail Use% Mounted on
/dev/mapper/vbirdvg-vbirdthin1 xfs    10G   33M   10G   1% /srv/thin

# 4. 写 500MB 数据后查看 thin pool 占用
[root@study ~]# dd if=/dev/zero of=/srv/thin/test.img bs=1M count=500
[root@study ~]# lvs vbirdvg
  LV         VG      Attr       LSize  Pool       Data%  Meta%
  vbirdlv    vbirdvg -wi-ao----  2.50g
  vbirdthin1 vbirdvg Vwi-aotz-- 10.00g vbirdtpool  4.99
  vbirdtpool vbirdvg twi-aotz--  1.00g             49.93  1.81
# thin LV 看似用了 5%，实际 thin pool 已占用近 50%
```

### 14.3.5 LVM 的 LV 磁盘快照

快照（snapshot）记录某一时刻 LV 的状态。快照区与原 LV **共享未改动的数据块**；原 LV 某块被改动前，旧数据先复制到快照区（COW，copy-on-write）。因此快照容量可以很小，却是高效的「时间点备份」工具。

![[vbird-c5fa774edab10ebc.gif]]
*图：LVM 快照区的备份示意*

> [!note] 快照的关键约束
> - 快照与原 LV 必须在同一 VG；
> - 快照区容量必须能装下「两次快照之间被改动的数据量」，否则快照失效；
> - thin pool 快照限制较多（非 thin 池内 LV 的快照需设为只读），当前发行版下仍建议用传统快照。

**创建并使用快照**

```bash
# 1. 查 VG 剩余 PE
[root@study ~]# vgdisplay vbirdvg | grep Free
  Free  PE / Size       26 / 416.00 MiB

# 2. 给 vbirdlv 建快照 vbirdsnap1，分配全部 26 PE
[root@study ~]# lvcreate -s -l 26 -n vbirdsnap1 /dev/vbirdvg/vbirdlv
# -s  快照；-n 名称；-l PE 数；最后是原 LV 全名

# 3. 挂载快照（XFS 相同 UUID 需加 nouuid）
[root@study ~]# mount -o nouuid /dev/vbirdvg/vbirdsnap1 /srv/snapshot1
[root@study ~]# df -Th /srv/lvm /srv/snapshot1
# 两边内容、容量完全一致
```

**用快照还原系统**

直接格式化原 LV 会让原数据全部涌入快照区（快照区装不下会丢数据），**正确做法是先把快照 dump 成备份文件**，再格式化原 LV 恢复：

```bash
# 1. 在原 LV 上做改动（增删目录）后，用 xfsdump 把快照区备份出来
[root@study ~]# xfsdump -l 0 -L lvm1 -M lvm1 -f /home/lvm.dump /srv/snapshot1

# 2. 删快照、格式化原 LV、从 dump 恢复
[root@study ~]# umount /srv/snapshot1
[root@study ~]# lvremove /dev/vbirdvg/vbirdsnap1
[root@study ~]# umount /srv/lvm
[root@study ~]# mkfs.xfs -f /dev/vbirdvg/vbirdlv
[root@study ~]# mount /dev/vbirdvg/vbirdlv /srv/lvm
[root@study ~]# xfsrestore -f /home/lvm.dump -L lvm1 /srv/lvm
# 数据回到快照时的状态
```

> [!tip] 快照的两种用法
> 1. **备份还原**：把快照 dump 出来作为时间点备份；
> 2. **测试环境**：把原 LV 当母盘、快照当工作盘，测试完删快照即恢复原状——虚拟机/教学环境批量复制测试机的高效手段。比对原 LV 与快照内容还能看到最近改了哪些文件。

### 14.3.6 LVM 相关指令汇整与关闭 LVM

**LVM 指令对照表**

| 任务 | PV | VG | LV | 文件系统（XFS / ext4）|
|---|---|---|---|---|
| 搜索 | `pvscan` | `vgscan` | `lvscan` | `lsblk`、`blkid` |
| 创建 | `pvcreate` | `vgcreate` | `lvcreate` | `mkfs.xfs` / `mkfs.ext4` |
| 列出 | `pvdisplay` | `vgdisplay` | `lvdisplay` | `df`、`mount` |
| 增大 | — | `vgextend` | `lvextend`（`lvresize`）| `xfs_growfs` / `resize2fs` |
| 减小 | — | `vgreduce` | `lvreduce`（`lvresize`）| 不支持 / `resize2fs` |
| 删除 | `pvremove` | `vgremove` | `lvremove` | 卸载、重新格式化 |
| 改属性 | `pvchange` | `vgchange` | `lvchange` | `/etc/fstab`、remount |

**关闭 LVM**（顺序：LV → VG → PV）

```bash
# 1. 卸载所有 LV（含快照与 thin）
[root@study ~]# umount /srv/lvm /srv/thin /srv/snapshot1

# 2. 先删 thin LV → thin pool → 普通 LV
[root@study ~]# lvremove /dev/vbirdvg/vbirdthin1 /dev/vbirdvg/vbirdtpool
[root@study ~]# lvremove /dev/vbirdvg/vbirdlv

# 3. 停用 VG 并删除
[root@study ~]# vgchange -a n vbirdvg
[root@study ~]# vgremove vbirdvg

# 4. 删除 PV 属性
[root@study ~]# pvremove /dev/vda{5,6,7,8}

# 5. 用 gdisk 把分区 ID 改回普通文件系统（8300）
```

> [!warning] 删除分区前必须先清 LVM
> 若不先关闭 LVM 就删底层分区，系统会出大问题。务必按 LV → VG → PV 顺序拆解。

## 14.4 重点回顾

- Quota 公平分配磁盘资源，可限制容量（block）或文件数（inode）；
- Quota 有 `soft` / `hard` / `grace time` 三个关键阈值；
- EXT 家族只能针对整个文件系统限制，**XFS 可针对目录**（project 模式）；
- Quota 需内核与文件系统双重支持，挂载参数含 `usrquota` / `grpquota` / `prjquota`；
- `xfs_quota` 子命令：`report` / `print` / `limit` / `timer` / `disable` / `enable` / `off` / `remove`；
- RAID 分硬件与软件，Linux 用 `mdadm` 实现软件 RAID，等级 RAID0/1/10/5/6 各有取舍；
- 选型依据：**容量、性能、数据可靠性**；硬件 RAID 设备名 `/dev/sd[a-p]`，软件 RAID 为 `/dev/md[0-9]`；
- `/proc/mdstat` 查看软件 RAID 状态；
- LVM 强调**弹性调整容量**，组件 PV / VG / PE / LV，可格式化的是 LV；
- LVM thin volume 可超分配、按需占用；LVM 快照是高效的时间点备份/测试工具；
- XFS 用 `xfs_growfs` 在线放大，**不能缩小**。

## 14.5 本章习题

**情境模拟题：在 RAID 之上构建 LVM**

目标：兼顾 RAID 的性能/备份与 LVM 的弹性。需求：会磁盘管理（RAID + LVM）。前提：3 个分区 `/dev/vda{5,6,7}`。

1. 用 `gdisk` 把 `vda{5,6,7}` 的分区类型设为 `FD00`（Linux RAID）；
2. 用 `mdadm` 建 RAID-5：
    ```bash
    [root@study ~]# mdadm --create /dev/md0 --auto=yes --level=5 \
    > --raid-devices=3 /dev/vda{5,6,7}
    [root@study ~]# mdadm --detail /dev/md0 | grep -i uuid
    [root@study ~]# vim /etc/mdadm.conf   # 写入 ARRAY 行
    ```
3. 在 `/dev/md0` 上建 LVM（PE 取默认，VG=`raidvg`，LV=`raidlv`）：
    ```bash
    [root@study ~]# pvcreate /dev/md0
    [root@study ~]# vgcreate raidvg /dev/md0
    [root@study ~]# lvcreate -L 1.5G -n raidlv raidvg
    ```
4. 格式化为 xfs 并挂载到 `/srv/raidlvm`，写入 `/etc/fstab`；
5. 之后的管理（RAID 热备替换、LVM 扩缩容）沿用本章方法。

**简答题**

- 若要让批量新建的每个用户都有 soft/hard = 40 MB/50 MB 的容量配额，应如何在新建账号脚本里加入？
    - 先为 `/home` 配置好 quota 环境，再在 `do...done` 循环末尾加一行：`xfs_quota -x -c "limit -u bsoft=40M bhard=50M ${username}" /home`。
- 要让 RAID 具备防硬件损坏的数据保护能力，可选哪些等级？
    - RAID-1、RAID-5、RAID-6（RAID-10 同样具备）。
- 默认 LVM 是否具有「备份」功能？
    - 有，即 LV 快照（snapshot）功能。
- 三块盘在 BIOS 阶段由 RAID 芯片整合成一块大磁盘，Linux 下设备名是什么？
    - 硬件 RAID 对 Linux 是一块完整磁盘，设备名为 `/dev/sda`；若是 Intel 芯片组 RAID，则可能为 `/dev/md127` 等。

## 14.6 参考资料与延伸阅读

- [XFS Quotas — XFS Official Documentation](https://xfs.org/docs/xfsdocs-xml-dev/XFS_User_Guide/tmp/en-US/html/xfs-quotas.html)
- [RAID — Wikipedia](https://en.wikipedia.org/wiki/RAID)
- [mdadm — Wikipedia](https://en.wikipedia.org/wiki/Mdadm)
- [Logical Volume Manager (Linux) — Wikipedia](https://en.wikipedia.org/wiki/Logical_Volume_Manager_(Linux))
- [mdstat — Linux RAID Wiki](https://raid.wiki.kernel.org/index.php/Mdstat)
- [Thin Provisioning — Wikipedia](https://en.wikipedia.org/wiki/Thin_provisioning)

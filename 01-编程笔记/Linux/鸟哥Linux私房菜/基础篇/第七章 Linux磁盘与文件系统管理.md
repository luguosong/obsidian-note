---
描述: 磁盘分区、文件系统(xfs/ext4)、inode/block、挂载、LVM 与 UUID 等概念（据鸟哥原作改写，已更新至 Rocky/AlmaLinux 9 当前状态）。
排序: 8000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0230filesystem.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-06-26
---
# 第七章 Linux磁盘与文件系统管理

> [!info] 关于本章
> 本章以鸟哥《Linux 私房菜 — 基础学习篇》第七章为骨架，已将原基于 CentOS 7 的内容更新至 **Rocky/AlmaLinux 9 / RHEL 9** 当前状态（默认文件系统仍为 **xfs**，分区工具以 **gdisk/parted** 为主，GPT/UEFI 已全面取代 MBR/BIOS，NVMe 已普及），术语统一为大陆通行写法。CentOS 7 已于 2024-06-30 EOL，仅作历史对照提及。

系统管理员的核心任务之一是管理磁盘与文件系统：分区不可太大（浪费容量）也不能太小（无法存储）。本章重点是理解文件系统的内部结构（inode / block / superblock），并掌握分区、格式化、检验、挂载的完整流程。

## 7.1 认识 Linux 文件系统

Linux 最传统的文件系统是 EXT2。理解 Linux 文件系统要从 EXT2 入手，而文件系统建立在磁盘之上，故先复习磁盘的物理组成与分区。

### 7.1.1 磁盘组成与分区的复习

**机械硬盘（HDD）的物理组成**

- 圆形**盘片**（记录数据的介质）；
- **机械手臂**及其上的**磁头**（读写盘片数据）；
- **主轴马达**带动盘片旋转，使磁头可读写数据。

盘片上的物理结构（详见第零章）：

- **扇区（sector）**：最小物理存储单位，传统 512 Byte，现代先进格式化 4 KB；
- **磁道（track）**：同一同心圆上扇区的集合；
- **柱面（cylinder）**：多盘片同一磁道的组合；
- 早期分区以柱面为最小单位，现代分区以**扇区**为最小单位；
- 分区表主要有两种：**MBR**（限制多）与 **GPT**（较新，支持容量超过 2 TB）。

| 分区表 | 最大磁盘 | 主分区数 | 工具 |
|---|---|---|---|
| **MBR**（DOS） | 2 TB | 4 个主分区（或 3 主 + 1 扩展） | `fdisk` |
| **GPT** | 远超 2 TB（理论上 ZB 级） | 128 个 | `gdisk` / `parted` |

> [!note] 现代环境
> 2026 年主流平台已全部走 **UEFI + GPT** 路线，新装系统几乎不再使用 MBR。RHEL/Rocky/AlmaLinux 9 安装时默认使用 GPT。

**Linux 的磁盘设备文件名**

| 类型 | 设备文件名示例 | 说明 |
|---|---|---|
| SATA / SAS / USB | `/dev/sd[a-p]` | 实体磁盘 |
| **NVMe** | `/dev/nvme[0-9]n[0-9]` | 当前高性能 SSD 主流 |
| 虚拟机（virtio） | `/dev/vd[a-p]` | KVM 等虚拟化 |
| 软件 RAID | `/dev/md[0-9]` | `mdadm` 创建 |
| LVM | `/dev/mapper/VG-LV` 或 `/dev/VG/LV` | 逻辑卷 |

分区文件名为磁盘文件名加数字，如 `/dev/nvme0n1p1`、`/dev/sda1`、`/dev/vda2`。

### 7.1.2 文件系统特性

磁盘分区后必须**格式化（format）**才能使用。格式化的目的是把分区建造成操作系统识别的**文件系统格式（filesystem）**——不同操作系统的文件属性、权限模型不同，故格式各异。

| 操作系统 | 常见文件系统 |
|---|---|
| Windows 98 之前 | FAT / FAT16 |
| Windows 2000+ | NTFS |
| Linux 传统 | Ext2 / Ext3 / **Ext4** |
| Linux 现代（RHEL 系默认） | **XFS** |
| Linux 其它 | Btrfs、ZFS 等 |

传统上一个分区只能格式化为一个文件系统（filesystem ≈ partition）。但 **LVM** 与**软件 RAID** 等技术打破了这一限制：一个分区可格式化为多个文件系统（LVM），多个分区也能合成一个文件系统。因此现在更准确的说法是——**一个可被挂载的数据块称为一个文件系统**，而不一定等同于一个分区。

**inode / block / superblock**

文件系统将文件数据分两部分存放：权限与属性 → **inode**；实际内容 → **data block**；此外用 **superblock** 记录整体信息。

| 组成 | 作用 |
|---|---|
| **superblock** | 记录文件系统整体信息：inode/block 的总量、使用量、剩余量、文件系统格式等 |
| **inode** | 记录文件属性，一个文件占用一个 inode，并记录其数据所在的 block 号码 |
| **data block** | 实际存放文件内容；文件大则占用多个 block |

这种通过 inode 索引找到 block 的存取方式称为**索引式文件系统（indexed allocation）**，读取效率高。

![[vbird-5554ac4e04b073ed.webp]]
*图：inode/block 数据存取示意（索引式）*

**对比：FAT 文件系统**

U 盘常用的 FAT 没有 inode，每个 block 号码记录在前一个 block 中，必须顺序读取。数据分散时磁头需多次寻道，性能差——这正是 Windows 需要"磁盘碎片整理"的根源。

![[vbird-d24522edee09877f.webp]]
*图：FAT 文件系统数据存取示意*

> [!tip] Linux 文件系统基本不需要碎片整理
> Ext2/3/4 与 XFS 都是索引式文件系统，分配算法已尽量减少碎片。日常使用无需像 FAT/NTFS 那样定期整理。

### 7.1.3 Linux 的 EXT2 文件系统（inode）

EXT2 以 inode 为核心。为避免海量 inode/block 集中难管，EXT2 格式化时划分为多个**区块组（block group）**，每组有独立的 inode/block/superblock 系统。

![[vbird-f6b5713b55ef37f8.webp]]
*图：EXT2 文件系统示意图*

文件系统最前端有一个**启动扇区（boot sector）**，可安装引导程序，从而支持多重引导——不必覆盖整盘唯一的 MBR。每个区块组包含六部分：

**data block（数据区块）**

EXT2 支持 1 K / 2 K / 4 K 三种 block 大小，格式化时固定。block 大小决定文件系统的容量上限：

| Block 大小 | 1 KB | 2 KB | 4 KB |
|---|---|---|---|
| 最大单一文件 | 16 GB | 256 GB | 2 TB |
| 最大文件系统总容量 | 2 TB | 8 TB | 16 TB |

block 使用规则：

- block 大小与数量格式化后不再变动；
- 每个 block 最多只能放一个文件的数据；
- 文件大于 block 时占用多个 block；
- 文件小于 block 时，剩余空间无法被其他文件使用（造成浪费）。

> [!example] 空间浪费示例
> 若使用 4 K block，存 10000 个 50 Byte 的小文件：实际数据仅 `50 × 10000 ≈ 488 KB`，但每个文件独占一个 4 K block，浪费 `4046 × 10000 ≈ 38.6 MB`。

**inode table（inode 表）**

inode 记录的文件信息包括：访问模式（r/w/x）、拥有者与群组、容量、ctime / atime / mtime、SetUID 等标志、以及指向实际数据的 **pointer**。

inode 特性：

- 每个 inode 大小固定（EXT2 为 128 Byte，**Ext4 / XFS 可设为 256 Byte**）；
- 每个文件仅占用一个 inode；
- 文件系统能创建的文件总数与 inode 数量有关；
- 系统读取文件时先找到 inode，校验权限后再读 block。

由于单个 inode 仅 128 Byte 而要记录大量 block 号码，EXT2 采用 **12 个直接 + 1 个间接 + 1 个双间接 + 1 个三间接**的指针结构。

![[vbird-eec2168f05558735.webp]]
*图：inode 结构示意*

> [!info] Ext4 的进步
> Ext4 的 inode 扩展到 256 Byte，使用 **extent** 取代多层间接指针，记录大文件更高效；支持单一文件 16 TB、文件系统总容量 1 EB，并原生支持 ACL 与 SELinux 标签。

**superblock（超级区块）**

superblock 记录整个文件系统的基本信息，是文件系统的"门面"——它损坏则整个文件系统难以恢复。记录内容：

- inode / block 总量、已用量、剩余量；
- inode / block 大小；
- 挂载时间、最近写入时间、最近 `fsck` 检验时间；
- **valid bit**：已挂载为 0，未挂载为 1。

第一个区块组含主 superblock，后续区块组中可能含有备份，用于救援。一般 superblock 大小为 1024 Byte。

**其余三部分**

| 区段 | 作用 |
|---|---|
| **Filesystem Description** | 描述每个区块组的起止 block 号、各区段位置 |
| **block bitmap** | 位图，标记哪些 block 空闲；新增/删除文件时更新 |
| **inode bitmap** | 位图，标记哪些 inode 空闲 |

**dumpe2fs：查询 Ext 家族 superblock**

`dumpe2fs` 用于观察 Ext2/3/4 的 superblock 信息。RHEL 9 默认使用 xfs，需先格式化一个 ext4 分区才能查询：

```bash
# 查看 superblock 与各区段信息
dumpe2fs [-bh] 设备文件名
# -b：列出坏轨保留区
# -h：仅列出 superblock

# 找出系统已格式化的设备与类型
blkid

# 仅看 superblock
dumpe2fs -h /dev/sda5
```

输出上半部为 superblock（UUID、Inode count、Block count、Block size、Inode size、Journal size 等），下半部为每个 block group 的细节。

### 7.1.4 与目录树的关系

**目录**

建立目录时，文件系统分配 1 个 inode 与至少 1 个 block：inode 记录目录权限属性，block 记录该目录下的**文件名与其 inode 号码对应表**。

![[vbird-756c12c1f50554ad.webp]]
*图：目录的 block 内文件名与 inode 号码对应示意*

```bash
# 查看文件占用的 inode 号码
ls -li
```

> [!note] 目录的 block 数量
> 目录下文件过多导致一个 block 容不下时，系统会分配更多 block。`ls -l` 看到的目录大小总是 block 大小的倍数。

**文件**

建立普通文件时，分配 1 个 inode 与按文件大小计算的若干 block。例如 4 K block 下建立 100 KB 文件，会分配 1 个 inode 与 25 个 block（若超出 12 个直接指针，再加 1 个间接 block 记录号码）。

**目录树读取流程**

读取 `/etc/passwd` 时，系统从挂载点逐级解析：`/` 的 inode → `/` 的 block（找 `etc`）→ `etc/` 的 inode → `etc/` 的 block（找 `passwd`）→ `passwd` 的 inode → `passwd` 的 block。每一步都会校验权限。

> [!important] 挂载点即入口
> 挂载点一定是目录，是进入该文件系统的入口。文件系统必须挂载到目录树才能被使用。

### 7.1.5 EXT2/EXT3/EXT4 文件的存取与日志式文件系统

**新增文件时文件系统的步骤**

1. 校验用户对目标目录是否有 w 与 x 权限；
2. 根据 **inode bitmap** 找空闲 inode，写入权限/属性；
3. 根据 **block bitmap** 找空闲 block，写入数据，更新 inode 的 block 指针；
4. 同步更新 inode bitmap、block bitmap 与 superblock。

inode table 与 data block 称为**数据区**；superblock、block bitmap、inode bitmap 称为**元数据（metadata）**，每次新增、删除、编辑都会变动。

**数据不一致（Inconsistent）状态**

若写入过程中遭遇突然断电或系统崩溃，metadata 与实际数据区可能不一致。早期 Ext2 重启时通过 superblock 的 valid bit 与 state 字段判断是否强制执行 `e2fsck` 全盘一致性检查——但全盘扫描极耗时间，对服务器恢复极不友好。

**日志式文件系统（Journaling filesystem）**

为快速恢复，日志式文件系统在磁盘上划出一块**日志区（journal）**，按三步记录写入：

```mermaid
flowchart LR
    A["1. 预备<br/>日志区记录待写信息"] --> B["2. 实际写入<br/>写入数据并更新 metadata"]
    B --> C["3. 结束<br/>日志区标记完成"]
```

崩溃后只需检查日志区即可定位问题，无需扫描整个文件系统。**Ext3 / Ext4 是 Ext2 的日志式升级版，向下兼容 Ext2**；XFS 也是日志式。`dumpe2fs` 输出中可看到 `Journal inode`、`Journal size` 等字段。

### 7.1.6 Linux 文件系统的运作

所有数据须加载到内存后 CPU 才能处理。由于磁盘读写远慢于内存，Linux 采用**异步（asynchronously）处理**：

- 文件加载到内存后，未被修改的部分标记为**干净（clean）**；
- 被修改后（如用 `nano` 编辑）标记为**脏（dirty）**；
- 系统不定时将 dirty 数据写回磁盘；也可用 `sync` 手动触发；
- 正常关机会自动 `sync`；异常断电可能导致数据未回写，重启后需做磁盘检验，甚至文件系统损坏（磁盘本身未必坏）。

> [!tip] 内存会被用光是正常的
> Linux 会把空闲内存用作**缓存（page cache）**以加速读写，因此内存"用尽"是正常且有益的现象，并非泄漏。可用 `free -h`、`vmstat` 观察。

### 7.1.7 挂载点的意义

每个文件系统有独立的 inode/block/superblock，需通过**挂载（mount）**接入目录树。挂载点一定是目录，作为进入该文件系统的入口。

```bash
# 不同挂载点对应不同文件系统：inode 号码不同
ls -lid / /boot /home

# 根目录的 . 与 .. 指向同一个 inode
ls -ild /  /.  /..
```

通过判断 inode 号码可确认不同文件名是否为同一文件。

### 7.1.8 其他 Linux 支持的文件系统与 VFS

Linux 支持多种文件系统：

| 类别 | 代表 |
|---|---|
| 传统文件系统 | ext2、minix、MS-DOS、FAT（`vfat` 模块）、iso9660（光盘） |
| 日志式文件系统 | **ext3 / ext4**、ReiserFS、NTFS、JFS、**XFS**、**Btrfs**、ZFS |
| 网络文件系统 | NFS、SMB/CIFS |

查看支持与已加载的文件系统：

```bash
# 内核支持的文件系统驱动
ls -l /lib/modules/$(uname -r)/kernel/fs

# 当前已加载的文件系统
cat /proc/filesystems
```

**VFS（Virtual Filesystem Switch）**

Linux 内核通过 **VFS** 这一层统一管理所有文件系统：用户与程序无需关心底层分区是什么文件系统，VFS 自动调度对应的驱动读取。

![[vbird-18e57b1921d3727f.gif]]
*图：VFS 文件系统示意*

### 7.1.9 XFS 文件系统简介

RHEL / Rocky / AlmaLinux 9 **默认文件系统为 XFS**（与 CentOS 7 一脉相承）。

**为什么选 XFS？**

- Ext 家族采用**预分配**全部 inode/block 的方式格式化，大容量磁盘格式化极慢（数十 TB 的 ext4 格式化可能耗时几十分钟）；
- XFS 采用**动态分配**，格式化速度极快；
- XFS 由 SGI 设计，专为高容量磁盘与高性能场景优化，特别适合虚拟化巨型文件；
- Ext4 绝大多数功能 XFS 都具备。

> [!note] Btrfs
> SUSE / openSUSE 默认 Btrfs；RHEL 9 也重新支持 Btrfs（作为可选）。Btrfs 提供快照、压缩、子卷等现代特性，但企业部署仍以 XFS / Ext4 为主。

**XFS 的三个分区**

XFS 在数据分布上分为：

| 区域 | 作用 |
|---|---|
| **数据区（data section）** | 类似 Ext 的 block group，分为多个**分配组（Allocation Group, AG）**；包含 superblock、空闲空间管理、inode 分配与跟踪。inode 与 block **按需动态创建**，故格式化极快 |
| **日志区（log section）** | 记录文件系统变化（即 journal），崩溃后据此快速修复。可指定外部设备（如 SSD）作日志区以加速 |
| **实时区（realtime section）** | 新建文件时先在此区的 extent 块中分配，再写入数据区。extent 大小格式化时指定（4 K ~ 1 G） |

XFS 的 block 可在 512 B ~ 64 K 之间设置（Linux 环境因内存分页上限通常用 4 K），inode 容量 256 B ~ 2 M（默认 256 B 已够用）。

**xfs_info：观察 XFS 文件系统**

```bash
# 观察挂载点或设备的 superblock 信息
xfs_info 挂载点|设备文件名

# 示例：查看 /boot
df -T /boot
xfs_info /dev/vda2
```

输出关键字段：

| 字段 | 含义 |
|---|---|
| `isize` | inode 容量（如 256 Byte） |
| `agcount` / `agsize` | AG 数量与每个 AG 的 block 数 |
| `sectsz` | 逻辑扇区大小（如 512 Byte） |
| `bsize` | block 大小（如 4 K） |
| `blocks` | 文件系统总 block 数 |
| `sunit` / `swidth` | 与 RAID stripe 相关 |
| `log` | 日志区位置（`internal` 表示内置）与大小 |
| `realtime` | 实时区配置 |

## 7.2 文件系统的简单操作

### 7.2.1 磁盘与目录的容量

**df：列出文件系统整体使用量**

`df` 直接读取 superblock，速度极快。

```bash
df [-ahikHTm] [目录或文件名]
# -a：列出所有文件系统（含 /proc 等）
# -h：人类易读格式（G/M/K）
# -H：以 1000 进位（而非 1024）
# -T：连同文件系统类型一起列出
# -i：以 inode 数量而非磁盘容量显示
```

```bash
# 易读格式列出
df -h

# 查看某目录所在分区的剩余容量
df -h /etc

# 查看各分区可用 inode 数（小文件多时关注此项）
df -ih
```

> [!warning] 留意根目录剩余容量
> 所有数据由根目录衍生。根目录剩余容量为 0 时系统将严重故障。一般使用率超 90% 就应警惕。
>
> 另：`/proc`、`/sys` 挂载在内存中，不占磁盘空间，`df` 显示 0 是正常现象；`/dev/shm` 是用内存模拟的 tmpfs，存取极快但重启即失。

**du：评估目录占用容量**

`du` 会实际扫描文件系统，比 `df` 慢。

```bash
du [-ahskSm] 文件或目录
# -a：列出所有文件与目录（默认仅统计目录）
# -h：人类易读格式
# -s：只显示总量
# -S：不包含子目录的加总

# 检查根目录下各一级目录占用量
du -sm /*
```

### 7.2.2 硬链接与符号链接：ln

Linux 下链接有两种：**硬链接（hard link）** 与**符号链接（symbolic link / 软链接）**。

**Hard Link（硬链接）**

文件名只与目录有关，文件内容则与 inode 有关。hard link 只是在某目录下新增一条"文件名 → inode 号码"的关联记录，并不创建新文件。

```bash
# 建立 hard link
ln /etc/crontab .

# 观察两文件名指向同一 inode（号码相同、链接数变为 2）
ll -i /etc/crontab crontab
```

![[vbird-7b2f11e8e58b20e8.gif]]
*图：硬链接文件读取示意*

特点：

- 删除其中一个文件名，inode 与 block 仍然存在，可通过另一文件名访问（**安全**）；
- 不增加 inode、几乎不占磁盘空间；
- 限制：**不能跨文件系统**；**不能链接目录**（会破坏目录树中 `..` 的语义，形成死结）。

**Symbolic Link（符号链接，类似 Windows 快捷方式）**

符号链接是一个**独立的新文件**，其内容是指向目标**文件名**的路径。目标文件被删除后，符号链接将无法打开。

```bash
# 建立符号链接
ln -s /etc/crontab crontab2

ll -i /etc/crontab /root/crontab2
# 两文件 inode 不同；符号链接的大小 = 目标路径字符串的字节数
```

![[vbird-64ca639f80e316cf.gif]]
*图：符号链接文件读取示意*

**ln 命令对照**

```bash
ln [-sf] 来源文件 目标文件
# 不加参数：hard link
# -s：symbolic link
# -f：目标已存在则先删除再建立
```

> [!warning] 修改符号链接等于修改源文件
> 用编辑器编辑符号链接时，实际修改的是其指向的原始文件。
>
> 若 `ln -s /bin /root/bin` 后进入 `/root/bin` 删除其中文件，等同删除 `/bin` 内的文件——删除符号链接本身须用 `rm /root/bin`。

**目录的链接数**

空目录至少含 `.` 与 `..` 两项，故新建空目录的链接数为 2（自身 + 内部的 `.`）；其上层目录的链接数会 +1（因为新目录的 `..` 指向它）。

```bash
mkdir /tmp/testing1
ls -ld /tmp         # 链接数 +1
ls -ld /tmp/testing1  # 链接数为 2
```

## 7.3 磁盘的分区、格式化、检验与挂载

新增磁盘后需依次：

1. **分区**：建立可用的 partition；
2. **格式化**：建立文件系统；
3. **检验**（可选）：检查文件系统一致性；
4. **挂载**：建立挂载点目录并挂入。

### 7.3.1 观察磁盘分区状态

**lsblk：列出所有块设备**

```bash
lsblk [-dfimpt] [device]
# -d：仅列出设备本身，不含分区
# -f：同时列出文件系统（含 UUID）
# -i：ASCII 线段输出
# -p：列出完整设备路径
# -t：列出详细参数（队列机制、预读量等）
```

输出字段：`NAME`（设备名）、`MAJ:MIN`（主/次设备号，内核据此识别）、`RM`（可卸载）、`SIZE`、`RO`（只读）、`TYPE`（disk/part/lvm/rom）、`MOUNTPOINT`。

**blkid：列出设备 UUID 与类型**

UUID（universally unique identifier）是系统赋予每个设备的唯一识别码，作挂载标识比设备名更可靠。

```bash
blkid
# 输出含设备名、UUID、TYPE（如 xfs / ext4 / vfat / swap / LVM2_member）
```

**parted：查看分区表类型**

```bash
parted 设备文件名 print
```

输出中 `Partition Table:` 字段标明 `gpt` 或 `msdos`（MBR）。这是判断使用 `gdisk` 还是 `fdisk` 的依据。

### 7.3.2 磁盘分区：gdisk / fdisk

| 分区表 | 工具 | 备注 |
|---|---|---|
| **GPT** | `gdisk`（或 `parted`） | 现代主流 |
| MBR | `fdisk` | 遗留小磁盘 |

> [!warning] 工具不可混用
> MBR 分区表上不要用 `gdisk`，GPT 上不要用旧版 `fdisk`——可能造成分区记录全毁。

**gdisk 交互**

```bash
gdisk /dev/vda   # 注意是整盘设备，不加数字
```

进入后按 `?` 查看命令。常用：

| 命令 | 作用 |
|---|---|
| `p` | 打印分区表 |
| `n` | 新增分区 |
| `d` | 删除分区 |
| `w` | 写入并退出（生效） |
| `q` | 不保存退出 |

> [!tip] 安全练习
> 在 `gdisk` 中随便操作都不影响系统，只要退出时按 `q` 而非 `w` 即可。

**新增分区示例**

```
Command (? for help): n
Partition number (4-128, default 4):      # 回车用默认
First sector (...) or {+-}size{KMGTP}:    # 回车用默认
Last sector (...) or {+-}size{KMGTP}: +1G  # 关键：用 +容量 指定大小
Hex code or GUID (..., Enter = 8300):      # 回车用默认（Linux 文件系统）

Command (? for help): p   # 检查
Command (? for help): w   # 写入
```

常见分区类型代码：`8300` Linux 文件系统、`8200` Linux swap、`8E00` Linux LVM、`0700` Microsoft basic data。按 `L` 可列出全部。

**partprobe：让内核重读分区表**

对正在使用的磁盘改分区后，内核不会立即更新。执行：

```bash
partprobe -s
```

可避免重启。删除正在使用的分区前，必须先卸载该分区上的文件系统或 swap。

> [!warning] 不要操作使用中的分区
> 卸载（`umount`）、停用 swap（`swapoff`）后再删除分区，否则内核无法更新分区表，甚至影响系统稳定。

### 7.3.3 磁盘格式化（建立文件系统）

`mkfs` 是统一入口，会调用具体工具（`mkfs.xfs`、`mkfs.ext4`、`mkfs.vfat` 等）：

```bash
mkfs[Tab][Tab]   # 列出系统支持的所有 mkfs 子命令
```

**mkfs.xfs**

```bash
mkfs.xfs [-b bsize] [-d parms] [-i parms] [-l parms] [-L label] [-f] [-r parms] 设备名
# -b：block 容量（512 ~ 64 K，Linux 上限 4 K）
# -d：data section 参数（agcount / agsize / su / sw / sunit / swidth 等）
# -i：inode 参数（size，最小 256 B）
# -l：log 参数（internal / logdev / size）
# -r：realtime 参数（extsize）
# -L：设置 Label
# -f：强制（设备已有文件系统时）
```

```bash
# 默认参数格式化
mkfs.xfs /dev/vda4

# 按 CPU 核心数设置 AG 数（提升并发性能）
mkfs.xfs -f -d agcount=2 /dev/vda4

# 确认结果
blkid /dev/vda4
```

> [!example] XFS 配合 RAID 的性能优化（可选）
> 若使用硬件/软件 RAID，格式化时对齐 stripe 可提升性能。例如 stripe 256 K、8 盘 RAID 5（1 个 parity）：
> `mkfs.xfs -f -d agcount=2,su=256k,sw=7 -r extsize=1792k /dev/vda4`
> 或用 sector 数：`sunit=512`（=256 K/512 B）、`swidth=3584`（=7×sunit）。

**mkfs.ext4**

```bash
mkfs.ext4 [-b size] [-L label] 设备名
# -b：block 大小（1K/2K/4K）

mkfs.ext4 /dev/vda5
```

Ext4 默认值适合大多数场景，默认配置写在 `/etc/mke2fs.conf`。可用 `dumpe2fs -h` 查看结果。

**mkfs 综合入口**

```bash
mkfs -t vfat /dev/vda5
mkfs -t xfs  /dev/vda4
```

### 7.3.4 文件系统检验

> [!warning] 检验前必须卸载
> `xfs_repair` 与 `fsck.ext4` 在扫描时可能修改文件系统，**被检查的分区务必先卸载**。根目录有问题时需进入救援模式。

**xfs_repair**

```bash
xfs_repair [-fnd] 设备名
# -f：后接是文件而非实体设备
# -n：仅检查不修改
# -d：单人维护模式下检查根目录（危险，慎用）

xfs_repair /dev/vda4   # 检查流程共 7 个 phase
```

**fsck.ext4**

```bash
fsck.ext4 [-pf] [-b superblock] 设备名
# -p：自动回答 yes
# -f：强制详细检查
# -D：优化目录配置
# -b：使用备份 superblock（4K block 备份在 32768 号 block）

# 使用备份 superblock 救援
dumpe2fs -h /dev/vda5 | grep 'Blocks per group'
fsck.ext4 -b 32768 /dev/vda5
```

### 7.3.5 文件系统挂载与卸载

**挂载前注意事项**

- 单一文件系统不应重复挂载到多个挂载点；
- 单一目录不应重复挂载多个文件系统；
- 挂载点目录理论上应为空（非空目录挂载后，原内容会被暂时隐藏，卸载后恢复）。

**mount**

```bash
mount -a
mount [-l]
mount [-t 文件系统] UUID='' 挂载点      # 推荐
mount [-t 文件系统] LABEL='' 挂载点
mount [-t 文件系统] 设备文件名 挂载点

# -a：按 /etc/fstab 挂载所有未挂载项
# -l：增列 Label
# -t：指定文件系统类型（xfs / ext4 / vfat / iso9660 / nfs ...）
# -o：附加参数（见下表）
```

`-o` 常用参数：

| 参数 | 说明 |
|---|---|
| `async` / `sync` | 异步/同步写入，默认 async |
| `atime` / `noatime` | 是否更新访问时间；性能优先用 noatime |
| `ro` / `rw` | 只读 / 读写 |
| `auto` / `noauto` | 是否允许 `mount -a` 自动挂载 |
| `exec` / `noexec` | 是否允许执行二进制 |
| `suid` / `nosuid` | 是否允许 SUID |
| `user` / `nouser` | 是否允许普通用户挂载 |
| `defaults` | = `rw,suid,dev,exec,auto,nouser,async` |
| `remount` | 重新挂载（用于改参数或修复只读根） |

> [!note] 自动识别文件系统
> 现代 Linux 通常不需 `-t`，内核会读取 superblock 并匹配 `/etc/filesystems` 与 `/proc/filesystems`、`/lib/modules/$(uname -r)/kernel/fs/` 中的驱动自动尝试挂载。
>
> 推荐用 **UUID** 而非设备名挂载——设备名在不同主机可能变化，UUID 唯一可靠。

**挂载示例**

```bash
# 用 UUID 挂载 xfs
mkdir -p /data/xfs
mount UUID="e0a6af55-26e7-4cb7-a515-826a8bd29e90" /data/xfs

# 挂载 ext4
mkdir /data/ext4
mount UUID="899b755b-1da4-4d1d-9b1c-f762adb798e1" /data/ext4

# 挂载光盘（iso9660，自动只读）
mount /dev/sr0 /data/cdrom

# 挂载 vfat U 盘，指定中文编码
mount -o codepage=950,iocharset=utf8 UUID="35BC-6D6B" /data/usb

# 重新挂载根目录（救援/修复时常用）
mount -o remount,rw,auto /

# 将目录挂载到另一目录（bind）
mount --bind /var /data/var
```

> [!note] NTFS 支持
> RHEL 系默认不含 NTFS 驱动，需安装 `ntfs-3g`（EPEL 仓库）后方可挂载 NTFS U 盘/移动硬盘。

**umount**

```bash
umount [-fn] 设备文件名或挂载点
# -f：强制卸载（如 NFS 不可达）
# -l：立即卸载（比 -f 更强）

umount /dev/vda4       # 用设备名
umount /data/ext4      # 用挂载点
```

> [!tip] target is busy
> 若卸载时报 `target is busy`，表示有进程在使用该文件系统（如当前 shell 在该目录内）。`cd /` 离开挂载点即可；用 `lsof 挂载点` 或 `fuser -v 挂载点` 可查出占用进程。

### 7.3.6 磁盘/文件系统参数修订

**mknod：手动建立设备文件**

Linux 一切皆文件，设备靠 `major:minor` 数值标识。现代系统会自动生成设备文件，但在 `chroot` 等特殊场景下需手动建立：

```bash
mknod 设备文件名 [bcp] Major Minor
# b：块设备（如磁盘）
# c：字符设备（如键盘、鼠标）
# p：FIFO 管道文件

mknod /dev/vda10 b 252 10
```

常见设备号：`/dev/sda` = 8:0~15、`/dev/sdb` = 8:16~31、`/dev/loop0` = 7:0。完整列表见内核文档 `Documentation/devices.txt`。

**xfs_admin：修改 XFS 的 UUID 与 Label**

```bash
xfs_admin [-lu] [-L label] [-U uuid] 设备名
# -l：列出 Label
# -u：列出 UUID
# -L：设置 Label
# -U：设置 UUID

xfs_admin -L vbird_xfs /dev/vda4
mount LABEL=vbird_xfs /data/xfs

# 用 uuidgen 生成新 UUID
uuidgen
xfs_admin -U <新UUID> /dev/vda4
```

**tune2fs：修改 ext4 的 Label 与 UUID**

```bash
tune2fs [-l] [-L Label] [-U uuid] 设备名
# -l：类似 dumpe2fs -h
# -L：修改 Label
# -U：修改 UUID
```

## 7.4 设置开机挂载

### 7.4.1 开机挂载 /etc/fstab 及 /etc/mtab

**系统挂载限制**

- 根目录 `/` 必须最先挂载；
- 其它挂载点必须为已存在的目录，遵循 FHS；
- 同一挂载点同一时间只能挂载一次；
- 同一分区同一时间只能挂载一次；
- 卸载前须将工作目录移出挂载点。

**/etc/fstab 六个字段**

```text
[设备/UUID/LABEL]  [挂载点]  [文件系统]  [文件系统参数]  [dump]  [fsck]
```

| 字段 | 内容 |
|---|---|
| 1 | 设备文件名 / `UUID=xxx` / `LABEL=xxx`（推荐 UUID） |
| 2 | 挂载点（目录；swap 写 `swap`） |
| 3 | 文件系统类型：xfs / ext4 / vfat / swap / nfs 等 |
| 4 | 挂载参数：`defaults` / `noatime` / `ro` 等，多个用逗号分隔 |
| 5 | 是否被 `dump` 备份（现代通常填 0） |
| 6 | 开机时 `fsck` 检查顺序（0 不检查；xfs 自检填 0） |

```bash
# RHEL 9 典型的 /etc/fstab
cat /etc/fstab
# UUID=94ac5f77-...  /boot  xfs  defaults  0 0
# /dev/mapper/rl-root  /  xfs  defaults  0 0
# /dev/mapper/rl-swap  swap  swap  defaults  0 0
```

**新增开机挂载项**

```bash
# 1. 编辑 fstab，在最后追加
nano /etc/fstab
UUID="e0fa7252-..."  /data/xfs  xfs  defaults  0 0

# 2. 测试语法（关键！写错可能导致无法开机）
mount -a
df /data/xfs
```

> [!warning] fstab 写错会导致无法开机
> 修改 `/etc/fstab` 后务必 `mount -a` 测试。若已无法正常开机进入紧急模式，根目录通常为只读，需执行 `mount -n -o remount,rw /` 才能编辑修复。
>
> 实际运行中的挂载信息记录在 `/etc/mtab` 与 `/proc/mounts`。

### 7.4.2 特殊设备 loop 挂载（映像档不烧录即用）

**挂载 ISO 映像**

```bash
mount -o loop /tmp/Rocky-9-x86_64-dvd.iso /data/rocky_dvd
df /data/rocky_dvd   # 通过 /dev/loop0 访问
```

**用大文件制作 loop 设备**

无需重新分区，就能"凭空"得到一个文件系统——对虚拟机、容器场景非常有用：

```bash
# 1. dd 建立一个 512 MB 空文件
dd if=/dev/zero of=/srv/loopdev bs=1M count=512
# if=输入文件（/dev/zero 不断输出 0）
# of=输出文件
# bs=每次块大小；count=块数；总容量 = bs × count

# 2. 格式化为 xfs
mkfs.xfs -f /srv/loopdev
blkid /srv/loopdev   # 得到 UUID

# 3. 挂载
mount -o loop UUID="..." /mnt

# 4. 写入 /etc/fstab 永久挂载（loop 设备建议用文件名而非 UUID）
# /srv/loopdev  /data/file  xfs  defaults,loop  0 0
```

> [!note] 现代 systemd 已自动识别 loop
> 当前发行版可省略 `-o loop`，系统会自动识别，但为兼容性建议显式写出。

## 7.5 内存交换空间（swap）的建置

swap（交换空间）的作用：当物理内存不足时，把内存中暂时不用的进程与数据挪到磁盘的 swap 区，腾出内存给当前需要的进程。使用 swap 时磁盘灯会频繁闪烁（性能远低于内存）。

> [!note] 现代 swap 的意义
> 当前台式机/笔记本内存普遍 ≥ 8 GB，日常使用几乎不触发 swap。但**服务器仍建议建立 swap**：应对突发流量、支持**休眠（hibernate）**（休眠时把内存状态写入 swap）、某些程序（数据库、JVM）也会利用 swap。zram（在内存中压缩的 swap）在嵌入式/低内存场景日益流行。

swap 可由两种方式建立：**实体分区**或**大文件**。

### 7.5.1 使用实体分区建置 swap

步骤：

1. 用 `gdisk` 分出一个分区，类型代码设为 `8200`（Linux swap）；
2. `mkswap` 格式化；
3. `swapon` 启用；
4. `free` / `swapon -s` 观察。

```bash
# 分区（gdisk 内）
# Command: n → 选号 → +512M → Hex code: 8200
partprobe

mkswap /dev/vda6
blkid /dev/vda6   # TYPE="swap"

swapon /dev/vda6
free -h           # Swap 总量增加
swapon -s         # 列出当前 swap 设备

# 写入 /etc/fstab 永久启用
# UUID="6b17e4ab-..."  swap  swap  defaults  0 0
```

### 7.5.2 使用文件建置 swap

无需独立分区，用 `dd` 创建文件即可：

```bash
# 1. 建立 128 MB 文件
dd if=/dev/zero of=/tmp/swap bs=1M count=128

# 2. 格式化为 swap
mkswap /tmp/swap

# 3. 启用
swapon /tmp/swap
swapon -s

# 4. 写入 /etc/fstab（注意：文件型 swap 必须用文件名，不能用 UUID，
#    因为系统只查块设备）
# /tmp/swap  swap  swap  defaults  0 0

# 5. 测试
swapoff /tmp/swap /dev/vda6   # 先全部关闭
swapon -a                     # 按 fstab 重新启用
```

> [!warning] 关闭 swap
> 用 `swapoff 设备/文件` 卸载 swap。不要直接删除正在使用的 swap 文件，须先 `swapoff`。

## 7.6 文件系统的特殊观察与操作

### 7.6.1 磁盘空间的浪费问题

文件系统挂载后即使没存数据也会有损耗——superblock、inode table、bitmap 等元数据都占空间。`ls -l` 输出第一行的 `total` 就是该目录所有条目占用 block 数 × block 大小。

```bash
ll -sh
# total 12K —— 每个 block 4K，3 个文件各占一个 block
```

小文件越多，浪费越明显（见 7.1.3 的空间浪费示例）。

### 7.6.2 利用 GNU parted 进行分区（可选）

`parted` 同时支持 MBR 与 GPT，且能一行命令完成非交互分区，适合脚本化：

```bash
parted [设备] [指令 [参数]]
# 常用指令：
#   mkpart [primary|logical|extended] [ext4|vfat|xfs] 开始 结束
#   print                    显示分区表
#   rm [分区号]              删除分区
#   mklabel gpt|msdos        重置分区表（危险！数据全失）
#   unit mb                  统一单位

parted /dev/vda print
parted /dev/vda unit mb print

# 非交互新建 512 MB 分区
parted /dev/vda mkpart primary fat32 36.0GB 36.5GB
partprobe
mkfs -t vfat /dev/vda7
```

> [!warning] mklabel 会清除全盘数据
> `parted /dev/sdX mklabel gpt`（或 `msdos`）会把现有分区表与所有数据全部抹除。只能在空盘或确认放弃数据时使用，且**无法复原**。

## 7.7 重点回顾

- 一个可被挂载的数据通常称为**文件系统（filesystem）**，而非严格意义上的分区；
- Ext 系文件系统的核心要素：**superblock**（整体信息）、**inode**（文件属性 + block 指针）、**data block**（实际内容）；数据存取为**索引式**；
- 文件系统划分为多个区块组（Ext）或分配组（XFS），每组独立管理；
- **日志式文件系统**（Ext3/4、XFS）通过独立的日志区快速恢复一致性；
- Linux 用内存做大量 page cache 加速读写，"内存用光"是正常现象；
- **硬链接**只是目录中多一条指向同一 inode 的文件名；**符号链接**是独立文件，类似 Windows 快捷方式；
- 磁盘使用流程：分区（`gdisk` / `parted`）→ 格式化（`mkfs.xfs` / `mkfs.ext4`）→ 挂载（`mount`）；
- 推荐用 **UUID** 标识文件系统进行挂载；开机挂载写入 `/etc/fstab`，修改后必须 `mount -a` 测试；
- XFS 默认适合大容量、高性能场景；`xfs_info` 观察、`xfs_admin` 改 UUID/Label；
- swap 可用独立分区或大文件建立；文件型 swap 在 fstab 中必须用文件名而非 UUID。

## 7.8 本章习题

**情境模拟一：恢复本章练习对磁盘的修改**

新增了多个分区后，恢复到初始状态：

1. 卸载所有自建文件系统与 swap：`umount /data/ext4 /data/xfs /data/file /data/win`、`swapoff /dev/vda6 /tmp/swap`；
2. 编辑 `/etc/fstab`，删除本章新增的行（保留系统原有项）；
3. 用 `parted /dev/vda rm 号` 或 `gdisk` 删除自建分区，`partprobe` 刷新，删除 swap 与 loop 文件。

**情境模拟二：为团队建立独立的 1 GB 项目文件系统**

1. `gdisk /dev/vda` 新建 1 GB 分区，`+1G`，`w` 写入；
2. `partprobe` 刷新；
3. `mkfs.xfs -f /dev/vda4` 格式化；
4. `mkdir /srv/myproject`；
5. 编辑 `/etc/fstab`，追加 `/dev/vda4 /srv/myproject xfs defaults 0 0`（生产环境建议用 UUID）；
6. `mount -a` 测试，`df /srv/myproject` 验证；
7. `chgrp project /srv/myproject && chmod 2770 /srv/myproject` 设置群组共享权限（`2xxx` 让新建文件自动继承群组）。

**简答题**

- "开机时提示磁盘有问题"通常是**文件系统损坏**（superblock / inode / block 区记录出错）而非磁盘物理损坏。异常断电常导致文件系统损坏，重建文件系统即可，无需换盘。
- `file1` 与 `file2` 互为硬链接：删除 `file1` 后 `file2` 仍是正常文件；再用编辑器新建同名 `file1`，系统会分配新的 inode 与 block，与原文件无关，`file2` 内容不受影响。

## 延伸阅读

- [ext4 — Wikipedia](https://en.wikipedia.org/wiki/Ext4)
- [XFS — Wikipedia](https://en.wikipedia.org/wiki/XFS)
- [Comparison of file systems — Wikipedia](https://en.wikipedia.org/wiki/Comparison_of_file_systems)
- [XFS User Guide（官方）](https://xfs.org/docs/xfsdocs-xml-dev/XFS_User_Guide/tmp/en-US/html/)
- [Linux assigned devices (major/minor) — kernel.org](https://www.kernel.org/doc/Documentation/devices.txt)
- [Universal Unique Identifier — Wikipedia](https://en.wikipedia.org/wiki/Universally_unique_identifier)

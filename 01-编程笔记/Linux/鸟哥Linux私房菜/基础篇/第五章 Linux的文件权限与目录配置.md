---
描述: Linux 文件权限（owner/group/others 的 rwx、数字与符号法）与 FHS 标准目录配置（据鸟哥原作改写，已更新至 Rocky/AlmaLinux 9 当前状态）。
排序: 6000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0210filepermission.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-06-03
---
# 第五章 Linux的文件权限与目录配置

> [!info] 关于本章
> 本章以鸟哥《Linux 私房菜 — 基础学习篇》第五章（CentOS 7 版）为骨架，已更新到当前 **Rocky/AlmaLinux 9 / RHEL 9** 状态：`yum`→`dnf`、`lsb_release` 已在 EL9 中移除（改用 `/etc/os-release`）、内核版本升至 5.14、`/bin` 等符号链接合并（usrmerge）保持现状，术语统一为大陆通行写法（档案→文件、设定→设置、登入→登录、登录档→日志等）。

Linux 最优秀的地方之一在于其多人多任务环境。为了让各用户的数据相互保密，文件权限管理至关重要。Linux 将可访问文件的身份分为三类：**owner（拥有者）/ group（群组）/ others（其他人）**，三种身份各有 **read / write / execute（r/w/x）** 权限。

## 5.1 用户与群组

Linux 是多人多任务的系统，常有多人同时使用同一台主机。"用户与群组"是一套健全的安全防护机制：

- **文件拥有者（owner）**：每个人有自己的私人空间。例如把私人邮件转存为文件放在家目录，可设置为"只有拥有者本人能读写"，他人即便知道文件存在也无法查看内容。
- **群组（group）**：团队协作时最有用。例如 projecta 组的成员可互相修改组内文件，projectb 组成员则不能访问 projecta 的文件；同一账号可同时从属多个群组（如老师同时加入两个专题组）。
- **其他人（others）**：既不是拥有者、也不属于该群组的人。

![[vbird-31f5848725cc44e1.webp]]
*图：每个文件的拥有者、群组与 others 的关系*

> [!note] root 是"万能的天神"
> 系统中有一个特殊账号 **`root`**（UID 0），几乎不受权限限制，可访问任何文件。日常操作应避免直接用 root 登录，需要时用 `su -` 临时切换、完成后 `exit` 返回。

**记录账号与群组的文件**

默认情况下，系统所有账号与 root 的信息都记录在以下三处，切勿随意删除：

| 文件 | 记录内容 |
|---|---|
| `/etc/passwd` | 所有账号与一般用户的基本信息 |
| `/etc/shadow` | 个人密码（加密） |
| `/etc/group` | 所有群组名称 |

## 5.2 Linux 文件权限概念

### 5.2.1 文件属性

查看文件属性最常用的命令是 `ls`。`ls -al` 列出所有文件（含隐藏文件，即文件名以 `.` 开头的文件）的详细权限与属性：

```text
[dmtsai@study ~]$ su -                # 切换为 root 身份
[root@study ~]# ls -al
total 48
dr-xr-x---.  5    root     root    4096  May 29 16:08 .
dr-xr-xr-x. 17    root     root    4096  May  4 17:56 ..
-rw-------.  1    root     root    1816  May  4 17:57 anaconda-ks.cfg
-rw-------.  1    root     root     927  Jun  2 11:27 .bash_history
-rw-r--r--.  1    root     root      18  Dec 29  2013 .bash_logout
-rw-r--r--.  1    root     root     176  Dec 29  2013 .bash_profile
-rw-r--r--.  1    root     root     176  Dec 29  2013 .bashrc
drwxr-xr-x.  3    root     root      17  May  6 00:14 .config
-rw-r--r--.  1    root     root    1864  May  4 18:01 initial-setup-ks.cfg
[   1   ][  2 ][   3  ][  4 ][    5   ][     6     ] [       7       ]
[  权限  ][链接][拥有者][群组][文件大小 ][ 修改日期  ] [      文件名     ]
```

![[vbird-a9c9ef5cd4936032.gif]]
*图：文件属性示意图（七栏）*

**第一栏共 10 个字符**，是整个 Linux 文件权限的核心：

![[vbird-5527ee3199a78a75.gif]]
*图：文件的类型与权限（10 个字符）*

- **第 1 个字符**：文件类型。

| 字符 | 类型 | 说明 |
|---|---|---|
| `d` | 目录 | 如 `.config` |
| `-` | 普通文件 | 如 `initial-setup-ks.cfg` |
| `l` | 链接文件（link） | 类似 Windows 的快捷方式 |
| `b` | 块设备文件 | 可随机存取的存储设备（硬盘等） |
| `c` | 字符设备文件 | 一次性读取的串口设备（键盘、鼠标等） |

- **第 2–10 个字符**：三组 `rwx`，依次为 **拥有者 / 群组 / 其他人** 各自的权限。`r`（read）、`w`（write）、`x`（execute）位置固定；无该权限则显示 `-`。

> [!note] 权限判定是排他的优先级 cascade
> 三组权限**只取一组生效**：内核按"是不是拥有者 → 是否属于该群组 → 其他人"的顺序判定，命中哪一档就只用哪一档的 `rwx`，其余两组对该用户不再生效。例如你是拥有者，即使群组档比拥有者档权限更大，也只按拥有者档判定。

> [!tip] 权限是"针对账号"设计的
> 不论哪一组权限，针对的都是"账号"。群组权限规范的是"加入这个群组的账号具有什么权限"，主角是账号（人），不是群组本身。

**其余各栏含义**

| 栏 | 含义 |
|---|---|
| 第 2 栏 | 有多少文件名链接到同一 inode |
| 第 3 栏 | 拥有者账号 |
| 第 4 栏 | 所属群组 |
| 第 5 栏 | 文件大小（默认字节） |
| 第 6 栏 | 修改日期（距今过久则仅显示年份；`ls -l --full-time` 显示完整时间） |
| 第 7 栏 | 文件名（以 `.` 开头为隐藏文件） |

> [!tip] 乱码与语系
> 若终端因中文语系显示乱码，可临时 `export LC_ALL=en_US.utf8` 切换为英文；永久修改可编辑 `/etc/locale.conf`（设置 `LANG`）。

**例题**：若某文件类型与权限为 `-rwxr-xr--`，意义为何？

> 拆分为 `[-][rwx][r-x][r--]`：普通文件；拥有者可读可写可执行；群组可读可执行；其他人只读。

**文件权限的重要性**

- **系统保护**：系统关键文件（如 `/etc/shadow`）权限设为对所有人不可访问，只有 root 能读取——root 不受权限限制。
- **团队协作与数据共享**：通过群组权限让团队成员共同读写某些目录，非本团队者无权访问。
- **权限设置不当的危害**：若把只有 root 才能执行的命令（关机、拨号、用户管理等）开放给所有人，系统可能被误操作或恶意破坏。

### 5.2.2 改变文件属性与权限

常用三个命令：

| 命令 | 作用 |
|---|---|
| `chgrp` | 改变所属群组（change group） |
| `chown` | 改变拥有者（change owner），也可同时改群组 |
| `chmod` | 改变权限（含 SUID/SGID/SBIT 等特殊位） |

**chgrp：改变所属群组**

目标群组必须存在于 `/etc/group` 中，否则报错。

```bash
[root@study ~]# chgrp [-R] 目录名/文件名 ...
# -R：递归变更，连同子目录下所有文件一起改
[root@study ~]# chgrp users initial-setup-ks.cfg
[root@study ~]# chgrp testing initial-setup-ks.cfg
chgrp: invalid group: 'testing'   # 群组不存在，报错
```

**chown：改变拥有者**

拥有者必须是 `/etc/passwd` 中已存在的账号。`chown` 可同时改拥有者与群组，用冒号 `:` 分隔（推荐，避免账号名中含 `.` 造成歧义）；也支持 `chown .group file` 只改群组。

```bash
[root@study ~]# chown [-R] 账号名称 文件或目录
[root@study ~]# chown [-R] 账号名称:群组名称 文件或目录

[root@study ~]# chown bin initial-setup-ks.cfg          # 拥有者改为 bin
[root@study ~]# chown root:root initial-setup-ks.cfg    # 拥有者与群组都改回 root
```

> [!note] 何时需要 chown
> `cp` 复制文件时会沿用执行者的属性与权限。若把文件拷贝给其他用户，接收者可能因权限不足无法修改，需用 `chown` 转移拥有者。

**chmod：改变权限**

权限设置有两种方法——**数字法**与**符号法**。

**数字法**：将 `rwx` 对应分数相加——`r=4、w=2、x=1`，每种身份各自累加。

| 权限 | 计算 | 数值 |
|---|---|---|
| `rwx` | 4+2+1 | 7 |
| `r-x` | 4+0+1 | 5 |
| `r--` | 4+0+0 | 4 |
| `---` | 0+0+0 | 0 |

```bash
[root@study ~]# chmod [-R] xyz 文件或目录
# xyz 为三位八进制数字，如 754
[root@study ~]# chmod 777 .bashrc      # -rwxrwxrwx
[root@study ~]# chmod 754 filename     # -rwxr-xr--
[root@study ~]# chmod 644 .bashrc      # -rw-r--r--（普通文件常用默认值）
```

**符号法**：用 `u/g/o/a` 代表身份（user/group/others/all），`+/-/=` 增删设权限，`r/w/x` 指定具体权限。一般形式为 `chmod 身份 操作 权限 目标`：

| 身份 | 操作 | 示例 | 说明 |
|---|---|---|---|
| `u`（拥有者） | `=`（设置） | `chmod u=rwx .bashrc` | 直接覆盖拥有者权限为 `rwx` |
| `go`（群组与其他） | `=`（设置） | `chmod go=rx .bashrc` | 群组与他人设为 `r-x` |
| `a`（所有人） | `+`（增加） | `chmod a+w .bashrc` | 所有人追加 `w`，其余权限不变 |
| `a`（所有人） | `-`（移除） | `chmod a-x .bashrc` | 所有人去掉 `x`，其余权限不变 |

```bash
[root@study ~]# chmod u=rwx,go=rx .bashrc   # 设置：拥有者 rwx，群组与他人 r-x
[root@study ~]# chmod a+w .bashrc            # 增加：所有人都加 w
[root@study ~]# chmod a-x .bashrc            # 移除：所有人都去掉 x
```

> [!note] +、-、= 的区别
> `=` 是直接赋值（覆盖原权限）；`+`/`-` 只增减指定项，未指定的权限保持不变。仅想"加上可执行权限"而不清楚原权限时，用 `chmod a+x filename` 最方便。

### 5.2.3 目录与文件的权限意义

同样的 `rwx`，对"普通文件"和"目录"含义大不相同。

**对普通文件**（文件存放实际数据）：

| 权限 | 含义 |
|---|---|
| `r` | 可读取文件的实际内容 |
| `w` | 可编辑、新增、修改文件**内容**（**不含**删除文件本身） |
| `x` | 该文件具有可被系统执行的权限 |

> [!warning] Linux 不靠扩展名判断可执行
> Windows 用 `.exe`/`.bat` 等扩展名判断是否可执行；Linux 文件能否执行**只看是否有 `x` 权限**，与文件名无关。但"有 `x` 权限"不等于"能执行成功"——还得看文件内容是否为可执行的代码。

**对目录**（目录记录的是文件名清单）：

| 权限 | 含义 |
|---|---|
| `r` | 可读取目录结构清单（能用 `ls` 列出文件名） |
| `w` | 可改动目录结构清单：新建/删除/重命名/移动其中的文件或目录（**不论被删文件本身权限如何**） |
| `x` | 可进入该目录成为工作目录（能用 `cd` 进入） |

> [!warning] 能否进入目录只看 x，开放浏览至少要给 rx
> 目录的 `x` 是"进入该目录的钥匙"。没有 `x`，即使有 `r` 也只能看到文件名（且 `ls -l` 会显示一堆问号），无法 `cd` 进入、无法读取目录下文件的内容。**开放目录给浏览至少给 `r`+`x`；`w` 不可随便给**——有 `w` 就能删除目录下任何文件（哪怕该文件属于 root）。

| 对象 | 内容 | r | w | x |
|---|---|---|---|---|
| 文件 | 实际数据 | 读到内容 | 修改内容 | 执行内容 |
| 目录 | 文件名清单 | 读到文件名 | 修改文件名（增删改名） | 进入该目录（钥匙） |

**例题**：目录权限 `drwxr--r--`，账号 vbird 不属于 root 群组，权限如何？

> vbird 仅属 others，只有 `r`：能列出文件名，但无 `x` 故**不能 `cd` 进入**该目录。

**例题**：文件 `/home/dmtsai/the_root.data` 权限为 `-rwx------`，属 root；dmtsai 对自己家目录有 `rwx`。dmtsai 能否删除该文件？

> dmtsai 对此文件属 others，无法读/写/执行其**内容**；但该文件位于 dmtsai 的家目录下，dmtsai 对该目录有完整 `rwx`，因此可以**删除这个文件名**（目录的 `w` 权限）。

**操作所需的最小权限**（针对 `/dir1/file1` 与 `/dir2`）：

| 操作 | /dir1 | /dir1/file1 | /dir2 | 说明 |
|---|---|---|---|---|
| 读取 file1 内容 | `x` | `r` | — | 须能进入 /dir1 |
| 修改 file1 内容 | `x` | `rw` | — | 进入并改写 |
| 执行 file1 | `x` | `rx` | — | 进入并能运行 |
| 删除 file1 | `wx` | — | — | 只需目录的写与执行 |
| 复制 file1 到 /dir2 | `x` | `r` | `wx` | 读源、写目标目录 |

> [!tip] 很多操作只需 x，r 非必备
> 已知文件位置时，"摸黑"也能操作，`r` 主要用于 `ls` 列目录与 `[Tab]` 补全文件名。没有 `r`，补全会失效。

> [!note] 现代 Linux 的 ACL 扩展
> 传统 ugo/rwx 只有三个身份档位，无法精确表达"给某个特定用户单独授权"。**POSIX ACL**（`setfacl`/`getfacl`）可为指定用户或群组单独设置权限，是 ugo 模型的精细补充，现代发行版（含 Rocky/AlmaLinux 9）默认支持。详见后续章节。

### 5.2.4 文件种类与扩展名

Linux 一切皆文件——连设备、通信接口也有专属文件。除普通文件（`-`）与目录（`d`）外，还有：

| 类型 | 字符 | 说明 |
|---|---|---|
| 普通文件（regular） | `-` | 含纯文本文件（ASCII，配置文件多属此类）、二进制可执行文件（如 `cat`）、数据格式文件（如 `/var/log/wtmp`，需用 `last` 读取） |
| 目录 | `d` | 目录 |
| 链接文件（link） | `l` | 类似 Windows 快捷方式 |
| 块设备文件 | `b` | 存储类设备（硬盘等，随机存取），多在 `/dev`（如 `/dev/sda`、`/dev/nvme0n1`） |
| 字符设备文件 | `c` | 串口设备（键盘、鼠标等，一次性读取） |
| 数据接口文件（socket） | `s` | 网络数据通信，常在 `/run` 或 `/tmp` |
| 数据传输文件（FIFO, pipe） | `p` | first-in-first-out，用于解决多进程同时访问文件的冲突 |

**Linux 文件扩展名**

Linux 文件能否执行由 `x` 权限决定，与扩展名无关。但为便于理解，常用扩展名标识用途：

| 扩展名 | 用途 |
|---|---|
| `*.sh` | shell 脚本 |
| `*.tar`、`*.tar.gz`、`*.zip`、`*.tgz`、`*.Z` | 压缩包 |
| `*.html`、`*.php` | 网页文件 |

> [!warning] 网络下载的可执行文件无法运行？
> 文件在网络传输过程中，权限属性会被改变（如丢失 `x`）。这是常见现象，需手动 `chmod +x` 恢复。

**文件名长度限制与禁用字符**

- 单一文件或目录最大文件名约 **255 字节**（ASCII 约 255 个字符，中文约 128 个字）。现代 ext4 / xfs / btrfs 均支持。
- 文件名避免使用这些 shell 特殊字符：`` * ? > < ; & ! [ ] | \ ' " ` ( ) { } ``
- 文件名以 `.` 开头为隐藏文件；避免以 `-` 或 `+` 开头（易与命令选项混淆）。

## 5.3 Linux 目录配置

### 5.3.1 Linux 目录配置的依据——FHS

各发行版的配置文件、可执行文件、目录布局之所以大同小异，是因为有一套标准——**FHS（Filesystem Hierarchy Standard，文件系统层次标准）**。FHS 规定特定目录应放置何种数据，使独立软件开发商、系统制作者、运维人员都能遵循统一布局。当前版本为 **FHS 3.0**（2015 年发布，2025 年由 freedesktop.org 重新接手维护）。

FHS 按两个维度将目录分为四类：

| | 可分享（shareable） | 不可分享（unshareable） |
|---|---|---|
| **不变（static）** | `/usr`（软件放置处） | `/etc`（配置文件） |
| | `/opt`（第三方软件） | `/boot`（开机与内核文件） |
| **可变（variable）** | `/var/mail`（用户邮箱） | `/var/run`（进程相关） |
| | `/var/spool/news`（新闻组） | `/var/lock`（进程相关） |

- **可分享**：可挂载给网络上其他主机使用（执行文件、用户邮件等）。
- **不可分享**：仅与本机相关（设备文件、socket 等）。
- **不变**：不随系统运行而变（函数库、文档、配置等）。
- **可变**：经常变化（日志、邮件队列等）。

FHS 仅定义三层主目录下应放置的内容：

| 目录 | 含义 |
|---|---|
| `/`（root，根目录） | 与开机系统有关 |
| `/usr`（Unix software resource） | 与软件安装/执行有关 |
| `/var`（variable） | 与系统运行过程有关 |

> [!note] root 的两种含义
> "root"在 Linux 中既指**系统管理员账号**，也指**根目录 `/`**，按上下文区分。

**根目录 `/` 的内容**

FHS 建议：根目录所在分区应尽量小，应用软件不要与根目录同分区——这样性能更佳、文件系统也不易出问题。

| 目录 | 应放置的内容 |
|---|---|
| `/bin` | 单人维护模式下仍可用的通用命令（`cat`、`chmod`、`cp`、`bash` 等）。**EL9 起为 `/usr/bin` 的符号链接** |
| `/boot` | 开机所需文件：Linux 内核（`vmlinuz`）、开机菜单与 grub2 配置等 |
| `/dev` | 所有设备文件（`/dev/null`、`/dev/zero`、`/dev/tty`、`/dev/sd*`、`/dev/nvme*` 等） |
| `/etc` | 系统主要配置文件（`/etc/passwd`、`/etc/fstab`、`/etc/issue` 等）；不建议放可执行文件 |
| `/lib` | 开机及 `/bin`、`/sbin` 命令调用的函数库；含 `/lib/modules/`（内核模块）。**EL9 起为 `/usr/lib` 的符号链接** |
| `/media` | 可移除设备挂载点（软盘、光盘、U 盘等） |
| `/mnt` | 临时挂载额外设备 |
| `/opt` | 第三方软件安装目录 |
| `/run` | 开机后产生的信息（PID 等）；可用内存模拟（tmpfs），不占磁盘 |
| `/sbin` | 开机、修复、还原系统所需的命令，仅 root 用于"设置"系统（`fdisk`、`fsck`、`mkfs` 等）。**EL9 起为 `/usr/sbin` 的符号链接** |
| `/srv` | 网络服务启动后所需的数据目录（如 `/srv/www`） |
| `/tmp` | 临时文件，任何人都能访问；FHS 建议开机时清空 |

FHS 建议可存在的目录：

| 目录 | 应放置的内容 |
|---|---|
| `/home` | 用户家目录（`~` 代表当前用户家目录，`~dmtsai` 代表 dmtsai 的家目录） |
| `/lib64` | 64 位函数库。**EL9 起为 `/usr/lib64` 的符号链接** |
| `/root` | 系统管理员 root 的家目录（单人维护模式下也能访问） |

> [!note] /bin、/sbin、/lib 的合并（usrmerge）
> 早期救援模式只挂载根目录，故 `/etc`、`/bin`、`/dev`、`/lib`、`/sbin` 必须与 `/` 同分区。现代发行版（含 Rocky/AlmaLinux 9）已将 `/bin`→`/usr/bin`、`/sbin`→`/usr/sbin`、`/lib`→`/usr/lib`、`/lib64`→`/usr/lib64` 做成符号链接（即 **usrmerge** 趋势），`/usr` 也可设为只读而系统仍正常运行，救援时一并挂载。

**Linux 另外两个重要虚拟目录**（非 FHS 必需，但常见）：

| 目录 | 说明 |
|---|---|
| `/proc` | 虚拟文件系统，数据在内存中：系统内核、进程信息、设备状态、网络状态等，不占磁盘 |
| `/sys` | 虚拟文件系统，记录内核与硬件信息（已加载模块、检测到的设备等），不占磁盘 |

**`/usr` 的内容**

`/usr` 是 Unix Software Resource（非 user），放置可分享、不变的数据，类似 Windows 的 `C:\Windows\` + `C:\Program files\`。系统安装后此目录占用最多磁盘容量。

| 目录 | 应放置的内容 |
|---|---|
| `/usr/bin/` | 所有一般用户可用的命令（EL9 已合并原 `/bin`） |
| `/usr/lib/` | 与 `/lib` 功能相同（EL9 已合并） |
| `/usr/local/` | 本机自行下载安装的软件（非发行版自带），便于与系统自带版本区分管理 |
| `/usr/sbin/` | 非系统正常运行所必需的系统命令（如网络服务 daemon），EL9 已合并原 `/sbin` |
| `/usr/share/` | 只读的共享数据（几乎都是文本，跨架构可读）：含 `/usr/share/man`（man 手册）、`/usr/share/doc`、`/usr/share/zoneinfo` |
| `/usr/include/` | C/C++ 头文件与包含文件 |
| `/usr/src/` | 源码（内核源码建议放 `/usr/src/linux/`） |

**`/var` 的内容**

`/var` 在系统运行后才逐渐占用磁盘，存放常态性变动的数据（缓存、日志、进程文件、数据库等）。

| 目录 | 应放置的内容 |
|---|---|
| `/var/cache/` | 程序运行产生的缓存 |
| `/var/lib/` | 程序运行需使用的状态数据（如 `/var/lib/mysql/`、`/var/lib/rpm/`） |
| `/var/log/` | **日志目录**，重要文件 `/var/log/messages`、`/var/log/wtmp`（记录登录者信息）等 |
| `/var/mail/` | 个人邮箱（与 `/var/spool/mail/` 互为链接） |
| `/var/lock/` | 设备/资源上锁文件（现已挪到 `/run/lock`） |
| `/var/run/` | 进程/服务 PID（现已链接到 `/run`） |
| `/var/spool/` | 队列数据，用后即删（邮件队列、打印队列、`/var/spool/cron/` 定时任务等） |

### 5.3.2 目录树

Linux 所有文件与目录都从根目录 `/` 开始，呈树状分支，故称"目录树"。其特性：

- 起点为根目录 `/`；
- 每个目录既可使用本地分区的文件系统，也可挂载网络文件系统（如 NFS）；
- 每个文件在目录树中的完整路径唯一。

```bash
[dmtsai@study ~]$ ls -l /
lrwxrwxrwx.   1 root root    7 May  4 17:51 bin -> usr/bin
dr-xr-xr-x.   4 root root 4096 May  4 17:59 boot
drwxr-xr-x.  20 root root 3260 Jun  2 19:27 dev
drwxr-xr-x. 131 root root 8192 Jun  2 23:51 etc
drwxr-xr-x.   3 root root   19 May  4 17:56 home
lrwxrwxrwx.   1 root root    7 May  4 17:51 lib -> usr/lib
lrwxrwxrwx.   1 root root    9 May  4 17:51 lib64 -> usr/lib64
drwxr-xr-x.   2 root root    6 Jun 10  2014 media
drwxr-xr-x.   2 root root    6 Jun 10  2014 mnt
drwxr-xr-x.   3 root root   15 May  4 17:54 opt
dr-xr-xr-x. 154 root root    0 Jun  2 11:27 proc
dr-xr-x---.   5 root root 4096 Jun  3 00:04 root
drwxr-xr-x.  33 root root  960 Jun  2 19:27 run
lrwxrwxrwx.   1 root root    8 May  4 17:51 sbin -> usr/sbin
drwxr-xr-x.   2 root root    6 Jun 10  2014 srv
dr-xr-xr-x.  13 root root    0 Jun  2 19:27 sys
drwxrwxrwt.  12 root root 4096 Jun  3 19:48 tmp
drwxr-xr-x.  13 root root 4096 May  4 17:51 usr
drwxr-xr-x.  22 root root 4096 Jun  2 19:27 var
```

![[vbird-56849a93775fee81.webp]]
*图：目录树架构示意*

> [!tip] 为何建议把 /var 独立分区
> 按 FHS 思路，将 `/var` 独立分区可保护系统：`/var`（日志、缓存、邮件）膨胀或损坏时，根目录仍可正常进入救援模式。

### 5.3.3 绝对路径与相对路径

| 类型 | 定义 | 示例 |
|---|---|---|
| 绝对路径 | 由根目录 `/` 写起 | `/home/dmtsai/.bashrc` |
| 相对路径 | 相对于当前路径，开头非 `/` | `../var/log`、`./run.sh` |

两个特殊目录：`.` 代表当前目录，`..` 代表上一层目录。

例如当前在 `/home`，进入 `/var/log`：

```bash
cd /var/log       # 绝对路径
cd ../var/log     # 相对路径
```

> [!note] ./run.sh 是什么意思
> 当前目录不在标准的可执行目录（`/bin`、`/usr/bin` 等）中时，执行当前目录下的脚本必须显式指定路径。`./` 代表"当前目录"，故 `./run.sh` 即"执行当前目录下名为 `run.sh` 的文件"。

### 5.3.4 发行版的观察

除 FHS 外，还有 **LSB（Linux Standard Base）** 标准。检查系统信息的现代方法：

```bash
# 1. 内核版本与架构
[dmtsai@study ~]$ uname -r      # 内核版本（Rocky 9 为 5.14.x）
5.14.0-362.el9.x86_64
[dmtsai@study ~]$ uname -m      # 架构
x86_64

# 2. 发行版信息（推荐方式：/etc/os-release）
[dmtsai@study ~]$ cat /etc/os-release
NAME="Rocky Linux"
VERSION="9.x (Blue Onyx)"
ID="rocky"
ID_LIKE="rhel centos fedora"
...

# 3. 一站式查看（systemd 提供）
[dmtsai@study ~]$ hostnamectl   # 同时显示 OS、版本、内核、架构
```

> [!warning] lsb_release 已在 EL9 中移除
> `redhat-lsb-core`（提供 `lsb_release`）在 RHEL 8 中已被弃用、在 **RHEL 9 / Rocky 9 / AlmaLinux 9 中彻底移除**，`dnf install redhat-lsb-core` 会失败。请改用 `cat /etc/os-release` 或 `hostnamectl`。包管理器 `yum` 在 EL9 中也已由 **`dnf`** 取代（`yum` 仍作为符号链接兼容保留）。

## 5.4 重点回顾

- Linux 每个文件可分别给拥有者、群组、其他人三种身份各自的 `rwx` 权限；每个账号可从属多个群组。
- `ls -l` 第一栏共 10 个字符：第 1 个为文件类型（`d/-/l/b/c` 等），其余三组 `rwx` 依次为拥有者/群组/其他人的权限；文件名以 `.` 开头为隐藏文件。
- 修改群组用 `chgrp`、拥有者用 `chown`、权限用 `chmod`；`chmod` 有数字法（`r=4, w=2, x=1`）与符号法（`u/g/o/a` 搭配 `+/-/=`）。
- **对文件**：`r` 读内容、`w` 改内容（不含删除）、`x` 可执行。
- **对目录**：`r` 列文件名、`w` 增删改名、`x` 进入目录；能否进入某目录只看 `x`。
- 开放目录浏览至少给 `r`+`x`，`w` 不可随便给；能否读取文件内容还与所在目录的 `x` 权限有关。
- 文件名最长约 255 字节；避免 shell 特殊字符与以 `-`/`+` 开头。
- FHS 定义三层主目录：`/`、`/usr`、`/var`；四类目录特性：shareable/unshareable × static/variable。
- 现代 EL9 发行版已将 `/bin`、`/sbin`、`/lib`、`/lib64` 符号链接合并到 `/usr` 下。
- 绝对路径从 `/` 写起，否则为相对路径。
- EL9 中 `lsb_release` 已移除，改用 `/etc/os-release`、`hostnamectl`；`yum`→`dnf`。

## 延伸阅读

- [Filesystem Hierarchy Standard 3.0（freedesktop.org 维护）](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html)
- [Filesystem Hierarchy Standard — Wikipedia](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)
- [Comparison of file systems（文件名长度限制）— Wikipedia](https://en.wikipedia.org/wiki/Comparison_of_file_systems)
- [chmod(1) — Linux man page](https://man7.org/linux/man-pages/man1/chmod.1.html)
- [Access control list — Wikipedia（POSIX ACL）](https://en.wikipedia.org/wiki/Access_control_list)
- [Red Hat Enterprise Linux Release Dates](https://access.redhat.com/articles/red-hat-enterprise-linux-release-dates)

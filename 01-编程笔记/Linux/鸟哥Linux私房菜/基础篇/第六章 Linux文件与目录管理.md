---
描述: 文件与目录的路径、属性、复制移动删除与查找等日常管理操作（据鸟哥原作改写，已更新至 Rocky/AlmaLinux 9 当前状态）。
排序: 7000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0220filemanager.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-06-16
---
# 第六章 Linux文件与目录管理

> [!info] 关于本章
> 本章以鸟哥《Linux 私房菜 — 基础学习篇》第六章为骨架，已将示例环境更新至 **Rocky/AlmaLinux 9 / RHEL 9**（CentOS 7 已于 2024-06-30 EOL），术语统一为大陆通行写法。RHEL 9 默认文件系统为 **xfs**，包管理用 **dnf**（取代 yum），`/bin`、`/sbin` 等已合并为 `/usr/bin`、`/usr/sbin` 的符号链接。

## 6.1 目录与路径

### 6.1.1 相对路径与绝对路径

- **绝对路径**：由根目录 `/` 写起，如 `/usr/share/doc`。
- **相对路径**：不由 `/` 写起，相对于当前工作目录。例如从 `/usr/share/doc` 进入 `/usr/share/man`，可写 `cd ../man`。

> [!tip] 何时用哪种
> - **脚本与定时任务**（cron 等）中务必用**绝对路径**——执行环境不可控，相对路径会因工作目录不同而失效。
> - **交互式操作**用相对路径更便捷，目录层级深时尤甚。

### 6.1.2 目录的相关操作

特殊目录符号：

| 符号 | 含义 |
|---|---|
| `.` | 当前目录 |
| `..` | 上一层目录 |
| `-` | 上一个工作目录 |
| `~` | 当前用户的家目录 |
| `~account` | 用户 account 的家目录 |

> [!note] 根目录的上层就是它自己
> 根目录 `/` 下也有 `.` 和 `..`，`ls -al /` 可见两者属性完全一致——根目录的上一层指向它自己。

**cd（change directory）**：切换工作目录。

```bash
cd ~dmtsai           # 进入用户 dmtsai 的家目录
cd                   # 回到自己的家目录（等同 cd ~）
cd ..                # 到上一层目录
cd -                 # 回到上一个工作目录
cd /var/spool/mail   # 绝对路径
cd ../postfix        # 相对路径（须确认当前目录）
```

> [!tip] 善用 Tab 补全
> bash 默认支持文件名与命令补全，多按 `[Tab]` 可避免输入错误。

**pwd（print working directory）**：显示当前目录，`-P` 显示真实路径（解析符号链接）。由于 `/var/mail` 是指向 `/var/spool/mail` 的符号链接，在 `/var/mail` 下 `pwd -P` 会显示 `/var/spool/mail`。

**mkdir（make directory）**：建立新目录。

```bash
mkdir [-mp] 目录名
# -m 直接设置权限（不受 umask 影响）
# -p 递归建立上层目录

mkdir -p /home/bird/testing/test1   # 一并建立缺失的上层
mkdir -m 711 test2                  # 建立权限为 rwx--x--x 的目录
```

**rmdir**：仅能删除**空**目录，`-p` 连同上层空目录一起删除。要删除非空目录需用 `rm -r`。

### 6.1.3 可执行文件搜索变量：$PATH

为何在任何目录下输入 `ls` 都能执行？因为 shell 按**环境变量 `PATH`** 列出的目录依次搜索可执行文件。

```bash
echo $PATH
# /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
```

`PATH` 由若干目录组成，以冒号 `:` 分隔，**有顺序**——先找到的先执行。

> [!warning] 不要把当前目录 `.` 加入 PATH
> 若在 `PATH` 中加入 `.`，攻击者可在 `/tmp` 等公共可写目录放置与系统命令同名的恶意脚本；当 root 在该目录执行命令时就会被"中标"。安全性永远优先于一点点方便。

要点：

- 不同身份的用户默认 `PATH` 不同，可执行的命令也不同；
- `PATH` 可修改：`PATH="${PATH}:/root"`；
- 用**绝对路径**或**相对路径**直接指定命令最准确；
- 命令应放到标准目录下才方便执行；
- bash 内建命令（如 `history`）不在 PATH 中，用 `type` 而非 `which` 查询。

## 6.2 文件与目录管理

### 6.2.1 文件与目录的检视：ls

```bash
ls [-aAdfFhilnrRSt] 文件或目录
ls [--color={never,auto,always}] 文件或目录
ls [--full-time] 文件或目录
```

常用选项：

| 选项 | 作用 |
|---|---|
| `-a` | 全部文件，含以 `.` 开头的隐藏文件 |
| `-A` | 同 `-a` 但不包括 `.` 和 `..` |
| `-d` | 仅列目录本身，不列其内容 |
| `-f` | 不排序直接列出 |
| `-F` | 附加类型符号：`*` 可执行、`/` 目录、`=` socket、`\|` FIFO |
| `-h` | 容量人类可读（GB、KB） |
| `-i` | 显示 inode 号 |
| `-l` | 长格式，含属性与权限 |
| `-r` | 反向排序 |
| `-R` | 连同子目录一并列出 |
| `-S` | 按容量排序 |
| `-t` | 按时间排序 |
| `--full-time` | 完整时间格式 |
| `--time={atime,ctime}` | 显示访问时间或属性变更时间 |

```bash
ls -al ~                 # 家目录全部文件含属性
ls -alF --color=never ~  # 不着色，附加类型符号
ls -al --full-time ~     # 完整修改时间
```

> [!tip] ll 命令别名
> 多数发行版默认把 `ll` 设为 `ls -l` 的别名（alias），这是 bash 的 alias 功能。

### 6.2.2 复制、删除与移动：cp、rm、mv

**cp（copy）**

```bash
cp [-adfilprsu] source destination
cp [options] source1 source2 ... directory
```

| 选项 | 作用 |
|---|---|
| `-a` | 相当于 `-dr --preserve=all`，完整保留属性（备份常用） |
| `-d` | 来源为符号链接时，复制链接本身而非指向的文件 |
| `-f` | 强制；目标存在且无法打开则移除后重试 |
| `-i` | 覆盖前询问 |
| `-l` | 建立硬链接（hard link） |
| `-p` | 连同属性（权限、所有者、时间）一并复制 |
| `-r` | 递归复制（用于目录） |
| `-s` | 复制为符号链接（即"快捷方式"） |
| `-u` | 仅当目标比来源旧或不存在时才复制（备份常用） |

> [!warning] cp 默认会改变属性
> 不加 `-a`/`-p` 时，复制后的文件所有者变为操作者本人，时间也更新。备份 `/etc/shadow` 等敏感文件或配置文件时**必须**用 `-a` 或 `-p`。`-a` 在 SELinux 环境下还会一并复制 SELinux 属性、xattr 等。

```bash
cp ~/.bashrc /tmp/bashrc              # 复制并改名
cp -i ~/.bashrc /tmp/bashrc           # 覆盖前询问
cp -a /var/log/wtmp /tmp/wtmp_2       # 完整保留属性
cp -r /etc /tmp                       # 递归复制目录
cp -s bashrc bashrc_slink             # 建立符号链接
cp -l bashrc bashrc_hlink             # 建立硬链接
cp -u ~/.bashrc /tmp/bashrc           # 仅当来源较新才覆盖
```

复制时需明确四点：是否需要完整保留来源属性？来源是否为符号链接？是否为特殊文件（FIFO、socket）？是否为目录？

**rm（remove）**

```bash
rm [-fir] 文件或目录
# -f 强制，忽略不存在的文件；-i 删除前询问；-r 递归删除（极危险！）
```

```bash
rm -i bashrc              # 询问确认
rm -i bashrc*             # 通配符批量
rm -r /tmp/etc            # 递归删除目录
\rm -r /tmp/etc           # 反斜线忽略 alias，不再逐个询问
```

> [!warning] 慎用 rm -r
> `rm -r` 会递归删除且不再确认，root 执行时尤为危险——删错 `/etc` 等系统目录会导致系统崩溃。用 `\rm` 可绕过 `-i` alias，但务必先确认路径。

> [!tip] 删除以 `-` 开头的文件
> 文件名以 `-` 开头时，`rm -aaa-` 会被误判为选项。用 `rm ./-aaa-` 或 `rm -- -aaa-` 即可。

**mv（move / rename）**

```bash
mv [-fiu] source destination
mv [options] source1 source2 ... directory
# -f 强制覆盖；-i 覆盖前询问；-u 仅当来源较新才覆盖
```

```bash
mv bashrc mvtest             # 移入目录
mv mvtest mvtest2            # 改名
mv bashrc1 bashrc2 mvtest2   # 多个来源，目标须为目录
```

批量改名可用 `rename`（见 `man rename`）。

### 6.2.3 取得文件名与目录名称

```bash
basename /etc/sysconfig/network   # → network（取文件名）
dirname /etc/sysconfig/network    # → /etc/sysconfig（取目录名）
```

常用于脚本中拆分完整路径。

## 6.3 文件内容查阅

| 命令 | 作用 |
|---|---|
| `cat` | 从第一行开始显示 |
| `tac` | 从最后一行反向显示（cat 倒写） |
| `nl` | 显示并加行号 |
| `more` | 一页一页翻 |
| `less` | 可前后翻页、搜索 |
| `head` | 看前几行 |
| `tail` | 看后几行 |
| `od` | 以二进制方式读取 |

### 6.3.1 直接检视：cat、tac、nl

**cat（concatenate）**

```bash
cat [-AbEnTv] 文件
# -A  相当于 -vET，列出特殊字符
# -b  非空行加行号
# -E  行尾显示 $
# -n  所有行加行号
# -T  Tab 显示为 ^I
# -v  列出不可见特殊字符
```

```bash
cat /etc/issue
cat -n /etc/issue          # 加行号
cat -A /etc/man_db.conf    # 显示 Tab(^I) 与行尾($)
```

> [!note] Windows 与 Linux 换行差异
> Linux 换行为 `\n`（`$`），Windows 为 `\r\n`（`^M$`）。用 `cat -A` 可一眼看出文件来自哪个系统。

**tac**：反向显示（最后一行先输出）。

**nl**：加行号打印，比 `cat -n` 多了格式控制。

```bash
nl [-bnw] 文件
# -b a/t   空/不空行编号
# -n ln/rn/rz  行号左对齐/右对齐/右对齐补零
# -w N     行号占位字符数
```

### 6.3.2 可翻页检视：more、less

**more**：逐页向下翻，关键操作：

| 按键 | 作用 |
|---|---|
| 空格 | 向下翻一页 |
| Enter | 向下翻一行 |
| `/字符串` | 向下搜索 |
| `:f` | 显示文件名与当前行 |
| `q` | 离开 |
| `b` / `Ctrl-b` | 往回翻（仅对文件有效，对管线无效） |

**less**：比 more 弹性大，**可向前翻**，是 `man` 的默认分页器。

| 按键 | 作用 |
|---|---|
| 空格 / PageDown | 向下翻一页 |
| PageUp | 向上翻一页 |
| `/字符串` | 向下搜索 |
| `?字符串` | 向上搜索 |
| `n` / `N` | 重复 / 反向重复搜索 |
| `g` / `G` | 跳到第一行 / 最后一行 |
| `q` | 离开 |

### 6.3.3 数据截取：head、tail

`head` / `tail` 都以**行**为单位截取，默认各 10 行。

```bash
head [-n N] 文件       # 前 N 行；-n -N 表示不显示最后 N 行
tail [-n N] 文件       # 后 N 行；-n +N 表示从第 N 行开始
tail -f 文件           # 持续监测，新内容实时显示，Ctrl-c 退出
```

```bash
head -n 20 /etc/man_db.conf           # 前 20 行
head -n -100 /etc/man_db.conf         # 不显示最后 100 行
tail -n +100 /etc/man_db.conf         # 从第 100 行开始
tail -f /var/log/messages             # 持续监测日志
```

> [!tip] 取第 11–20 行
> 用管线组合：`head -n 20 文件 | tail -n 10`。
> 带行号：`cat -n 文件 | head -n 20 | tail -n 10`。
> 管线 `|` 把前一命令的输出交给后一命令继续处理。

### 6.3.4 非纯文本文件：od

`od` 以二进制读取文件，可查看 ASCII 与数值对照。

```bash
od [-t TYPE] 文件
# TYPE: a(默认字符) c(ASCII) d(十进制) f(浮点) o(八进制) x(十六进制)
# 可组合，如 oCc 同时输出八进制数值与字符
```

```bash
od -t c /usr/bin/passwd       # 以 ASCII 查看 ELF 可执行文件
od -t oCc /etc/issue          # 八进制数值 + 字符对照
echo password | od -t oCc     # 查 password 的 ASCII 对照
```

### 6.3.5 修改文件时间或新建文件：touch

每个文件记录三种时间：

| 时间 | 含义 | 更新时机 |
|---|---|---|
| **mtime**（modification time） | 内容变更时间 | 文件内容被修改 |
| **ctime**（status time） | 状态变更时间 | 权限或属性被改变 |
| **atime**（access time） | 访问时间 | 文件内容被读取（如 `cat`） |

`ls` 默认显示 mtime；用 `--time=atime` / `--time=ctime` 切换。

```bash
touch [-acdmt] 文件
# -a 仅改 atime；-m 仅改 mtime
# -c 仅修改时间，不新建文件
# -d "日期" 指定日期；-t [YYYYMMDDhhmm] 指定时间
```

```bash
touch testtouch                 # 新建空文件，三个时间都置为当前
touch -d "2 days ago" bashrc    # 把 atime/mtime 改为两天前
touch -t 201406150202 bashrc    # 把 atime/mtime 改为指定时刻
```

> [!note] ctime 无法伪造
> 无论怎样操作，`ctime` 总记录**最近一次状态变更的当前时刻**——`cp -a`、`touch -d` 都无法复制或回退 ctime。`touch` 最常见的两种用途：**新建空文件**、**把 mtime/atime 刷成当前时间**。

## 6.4 文件与目录的默认权限与隐藏权限

### 6.4.1 文件默认权限：umask

新建文件/目录时的默认权限由 `umask` 决定。

```bash
umask          # 数字形式，如 0022（只看后三位）
umask -S       # 符号形式，如 u=rwx,g=rx,o=rx
umask 002      # 设置
```

默认起点：**文件** `rw-rw-rw-`（666，不给 x），**目录** `rwxrwxrwx`（777，目录必须有 x）。`umask` 是要"屏蔽掉"的权限位。

> [!warning] umask 是"屏蔽位"，不是减法
> 正确算法是按位去掉对应权限：`umask 022` 时，目录 `777 & ~022 = 755`，文件 `666 & ~022 = 644`。**不要直接相减**——当 umask 含奇数位（如 003）时，`666-003=663` 会凭空出现 x 权限，这是错的。

```bash
umask          # 0022
touch test1; mkdir test2
ll -d test*    # test1: -rw-r--r--; test2: drwxr-xr-x
```

> [!tip] 协作场景设 umask 002
> 多人同组协作时，若 umask 是 022，新建文件组内只读、无法共同编辑。把 umask 改为 `002` 后，新建文件为 `-rw-rw-r--`，组内可写。这在搭建 SAMBA、FTP 等文件服务器时尤为关键。root 默认 umask 022（安全优先），普通用户通常为 002。

### 6.4.2 文件隐藏属性：chattr、lsattr

> [!info] xfs 支持有限
> `chattr`/`lsattr` 完整功能源于 ext2/3/4。RHEL 9 默认的 **xfs** 仅支持部分参数（`A`、`a`、`d`、`i`、`S` 等），ext4 支持最全。

**chattr（设置隐藏属性）**

```bash
chattr [+-=][ASacdistu] 文件或目录
```

| 属性 | 作用 |
|---|---|
| `A` | 不更新 atime，减少磁盘 I/O（建议用挂载参数 `noatime` 替代） |
| `S` | 修改同步写入磁盘 |
| `a` | **只能追加，不能删除/修改**，仅 root 可设置（日志文件常用） |
| `c` | 自动压缩/解压 |
| `d` | 不被 `dump` 备份 |
| `i` | **不可删除、改名、链接、写入**，仅 root 可设置（系统安全利器） |
| `s` / `u` | 删除时彻底清除 / 保留以备恢复 |

```bash
touch attrtest; chattr +i attrtest
rm attrtest        # Operation not permitted —— root 也删不掉
chattr -i attrtest # 解除
```

**lsattr（查看隐藏属性）**

```bash
lsattr [-adR] 文件或目录
# -a 含隐藏文件；-d 仅目录本身；-R 递归
```

> [!warning] 不要给 /etc/shadow 设 +i
> 给 `/etc/shadow` 加 `+i` 后将无法新建用户（密码文件不能写入）。出问题排查时记得检查 chattr 属性。

### 6.4.3 文件特殊权限：SUID、SGID、SBIT

除 rwx 外，还有 `s`/`t` 三个特殊权限位，与**进程**（process）概念强相关。

```bash
ls -ld /tmp ; ls -l /usr/bin/passwd
# drwxrwxrwt  … /tmp          ← 末位 t = SBIT
# -rwsr-xr-x  … /usr/bin/passwd ← 属主位的 s = SUID
```

**SUID（Set UID，4）**：`s` 出现在**属主**的 x 位。

- 仅对**二进制可执行程序**有效（不能用于脚本和目录）；
- 执行者需对该程序有 x 权限；
- 执行期间，执行者**暂时获得程序所有者的权限**。

经典例子：`/usr/bin/passwd` 有 SUID，普通用户执行它时短暂获得 root 权限，从而能修改 `/etc/shadow`（平时只有 root 可写）。`cat` 没有 SUID，所以 `cat /etc/shadow` 读不到。

![[vbird-463839a83cda201d.gif]]
*图：SUID 程序执行过程示意*

**SGID（Set GID，2）**：`s` 出现在**属组**的 x 位。

对**文件**：执行期间获得程序属组的权限（如 `locate` 借助 slocate 组读取 mlocate.db）。

对**目录**（更常用）：用户在此目录下新建的文件，**其属组继承目录的属组**——团队协作共享目录的关键机制。

**SBIT（Sticky Bit，1）**：`t` 出现在 **others** 的 x 位，仅对目录有效。目录有 SBIT 时，用户只能删除/改名**自己拥有**的文件——即便对目录有 w 权限也不能动别人的文件。`/tmp` 就是典型：人人可写，但只能删自己的。

**设置方法**：在 chmod 数字前加一位。

| 数字 | 权限 | chmod 示例 |
|---|---|---|
| 4 | SUID | `chmod 4755 file` → `-rwsr-xr-x` |
| 2 | SGID | `chmod 2770 dir` → `drwxrws---` |
| 1 | SBIT | `chmod 1755 dir` → `drwxr-xr-t` |

```bash
chmod 6755 test   # -rwsr-sr-x（SUID+SGID）
chmod 7666 test   # -rwSrwSrwT（大写 S/T 表示"空"：无 x 却设了 s/t，权限无意义）
```

> [!note] 大写 S/T 的含义
> `s`/`t` 取代的是 `x`。若原本没有 `x`（如 666），就会显示为大写 `S`/`T`，表示"设置了特殊位但没有执行权"——SUID 也就失去意义。

也可用符号：SUID `u+s`、SGID `g+s`、SBIT `o+t`。

### 6.4.4 观察文件类型：file

```bash
file ~/.bashrc                   # ASCII text
file /usr/bin/passwd             # setuid ELF 64-bit LSB …，含 SUID 信息
file /var/lib/mlocate/mlocate.db # data
```

`file` 能判断文件格式（ASCII / 二进制 / 数据）、架构、是否动态链接、是否含 SUID 等。

## 6.5 命令与文件的搜索

### 6.5.1 命令搜索：which、type

`which` 按 `PATH` 搜索可执行文件的完整路径。

```bash
which [-a] command   # -a 列出所有匹配，不止第一个
which ls             # /usr/bin/ls
which which          # 可能命中 alias
```

> [!note] bash 内建命令查不到
> `which history` 找不到——`history` 是 bash 内建命令，不在 PATH 目录中。用 `type history` 查看。

### 6.5.2 文件搜索：whereis、locate、find

**优先级**：`whereis` / `locate`（查索引，快）→ `find`（直接扫磁盘，慢但灵活）。

**whereis**：只在特定目录（`/usr/bin`、`/usr/share/man` 等）查找。

```bash
whereis [-bmsu] 名字
# -b 二进制；-m man page；-s 源码；-u 其它
whereis passwd
whereis -m passwd      # 只找 man page
whereis -l             # 列出会查询的目录
```

**locate**：从预建索引 `/var/lib/mlocate/mlocate.db` 查找，极快，但索引通常每天更新一次——新建文件可能查不到，需 `updatedb` 手动刷新。

```bash
locate [-iclr] 关键字
# -i 忽略大小写；-c 仅计数；-l N 限 N 行；-r 正则
locate -l 5 passwd
updatedb               # 手动刷新索引（耗时，因要扫全盘）
```

> [!info] plocate 取代 mlocate
> RHEL 9 仓库中 **plocate** 已成为 locate 的现代实现——索引更小、查询更快，命令用法兼容。`mlocate` 仍可用但已停止维护。安装：`dnf install plocate`。

**find**：直接扫描文件系统，速度慢但条件最丰富。

```bash
find [路径] [选项] [动作]
```

**按时间**（atime / ctime / mtime，单位"天"）：

| 写法 | 含义 |
|---|---|
| `-mtime n` | n 天前那 24 小时内修改过 |
| `-mtime +n` | n 天之前（不含第 n 天）修改过 |
| `-mtime -n` | n 天之内（含第 n 天）修改过 |
| `-newer file` | 比 file 还新 |

```bash
find / -mtime 0            # 过去 24 小时内修改过
find /etc -newer /etc/passwd
```

![[vbird-278478614208d945.gif]]
*图：find 的时间参数意义（`+4` / `4` / `-4`）*

**按用户/组**：`-uid n`、`-gid n`、`-user name`、`-group name`、`-nouser`、`-nogroup`。

```bash
find /home -user dmtsai
find / -nouser            # 找无主文件（删除账号后的残留、源码编译产物）
```

**按权限与名称**：

| 选项 | 作用 |
|---|---|
| `-name filename` | 按文件名（支持 `*` 通配符） |
| `-size [+-]N[c/k/M/G]` | 按大小（c=字节，k/M/G） |
| `-type [fdlbcsp]` | 按类型（f 普通、d 目录、l 链接、b/c 设备、s socket、p FIFO） |
| `-perm mode` | 权限**恰好等于** mode |
| `-perm -mode` | 权限**完全包含** mode |
| `-perm /mode` | 权限**任一包含** mode |

```bash
find / -name passwd
find / -name "*passwd*"
find /run -type s                    # 找 socket
find / -size +1M
find /usr/bin /usr/sbin -perm /6000  # 含 SUID 或 SGID（4+2=6）
```

**额外动作 `-exec`**：对结果执行命令。

```bash
find /usr/bin /usr/sbin -perm /7000 -exec ls -l {} \;
```

![[vbird-650df12002492588.gif]]
*图：find 的 -exec 动作*

要点：

- `{}` 代表 find 找到的每个结果；
- `-exec` 到 `\;` 之间是要执行的命令（`\;` 用反斜线转义，避免被 shell 解释）；
- `-exec` 后的命令**不支持别名**，只能用 `ls -l` 不能用 `ll`。

## 6.6 权限与命令的关系

| 用户想做的事 | 目录所需权限 | 文件所需权限 |
|---|---|---|
| 进入目录（`cd`） | `x` | — |
| 在目录内 `ls` 列出 | `x` + `r` | — |
| 读文件内容（`cat` 等） | `x`（到所在目录） | `r` |
| 修改文件（`vi`/`nano`） | `x` | `r` + `w` |
| 新建/删除文件 | `x` + `w` | — |
| 执行目录下的命令 | `x` | `x` |

> [!tip] 沿路径每一级目录都需要 x
> 要读 `/home/student/www/index.html`，从根开始每一级目录（`/`、`/home`、`/home/student`、`/home/student/www`）都要有 `x` 权限。任一级不通（如 `/home/student` 是 `700` 且不属于你），后面再开放也读不到。

**例**：执行 `cp /dir1/file1 /dir2` 所需最小权限——`dir1` 需 `x`、`file1` 需 `r`、`dir2` 需 `w`+`x`。

## 6.7 重点回顾

- 绝对路径由 `/` 写起；相对路径相对当前目录；
- 特殊目录符号：`.`、`..`、`-`、`~`、`~account`；
- 目录操作：`cd`、`pwd`、`mkdir`、`rmdir`（仅删空目录，非空用 `rm -r`）；
- 命令能否执行取决于 `PATH` 变量；不建议把 `.` 加入 PATH；
- `ls` 查看属性，`-d`/`-a`/`-l` 最常用；`ll` 通常是 `ls -l` 的别名；
- 复制/删除/移动：`cp`、`rm`、`mv`；`cp` 备份要加 `-a`；
- 查看内容：`cat`、`tac`、`nl`、`more`、`less`、`head`、`tail`、`od`；
- 三种时间：`atime`/`ctime`/`mtime`，`ls` 默认显示 mtime，`touch` 可改 atime/mtime 但**改不了 ctime**；
- 默认权限由 `umask` 决定（屏蔽位，按位与运算，不是减法）；
- 隐藏属性：`chattr`/`lsattr`，`+a` 只追加、`+i` 不可变（xfs 仅部分支持）；
- SUID（4，文件）/ SGID（2，文件或目录）/ SBIT（1，目录）三位特殊权限；
- `file` 看文件类型；`which`/`type` 找命令；`whereis`/`locate` 查索引找文件，`find` 直接扫磁盘。

## 6.8 本章习题

**情境模拟：多人协作目录配 SGID**

alex 与 arod 同属附加组 project，需共同开发 `/srv/ahome/`，且不允许其他人进入。

```bash
groupadd project
useradd -G project alex
useradd -G project arod
mkdir /srv/ahome
chgrp project /srv/ahome
chmod 2770 /srv/ahome      # 关键：SGID 让新文件继承 project 组
```

加 SGID 后，alex/arod 在此目录新建的文件属组都是 project，配合各自的 umask 002（组内可写），两人即可互相修改对方文件。若只用 `770`，新建文件属组仍是建文件者本人的私有组，组内他人无法编辑。

**简答题**

- 绝对路径 vs 相对路径：前者由 `/` 起，后者相对当前目录。
- 改目录名：`mv /home/test /home/test2`。
- `PATH` 的意义：指定命令搜索目录。
- `umask` 033 与 044 时新建文件/目录的权限？
  - 033：文件 `-rw-r--r--`、目录 `drwxr--r--`；
  - 044：文件 `-rw--w--w-`、目录 `drwx-wx-wx`。
- SUID 的四个要点：仅对二进制程序有效 / 执行者需有 x / 仅运行时有效 / 暂时获得所有者权限。
- 查 `/usr/bin/passwd` 的（1）传统权限 `ls -al`、（2）类型 `file`、（3）隐藏属性 `lsattr`。
- 找所有含 SUID 的文件：`find / -perm /4000`。
- 找 `/etc` 下 50K–60K 的文件并详细列出：`find /etc -size +50k -a -size -60k -exec ls -l {} \;`。
- 找 `/etc` 下大于 50K 且不属于 root 的文件：`find /etc -size +50k -a ! -user root -type f -exec ls -l {} \;`。
- 找 `/etc` 下大于 1500K 或容量为 0 的文件：`find /etc -size +1500k -o -size 0`。

## 延伸阅读

- [File system permissions — Wikipedia](https://en.wikipedia.org/wiki/File_system_permissions)
- [setuid / setgid / Sticky Bit — Wikipedia](https://en.wikipedia.org/wiki/Setuid)
- [find (命令) — Wikipedia](https://en.wikipedia.org/wiki/Find_(command))
- [plocate 项目主页](https://plocate.buster.lt/)
- [RHEL 9 管理文件与目录（官方文档）](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_basic_system_settings/assembly_managing-files-and-directories_assembly_managing-files-and-directories)
- [Filesystem Hierarchy Standard — Wikipedia](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)

---
描述: Linux 用户与组账号管理、ACL 细粒度权限、身份切换（su/sudo）、PAM 身份验证与大量建号（据鸟哥原作改写，已更新到 Rocky/AlmaLinux 9 当前状态）。
排序: 14000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0410accountmanager.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-07-22
---
# 第十三章 Linux账号管理与ACL权限设置

> [!info] 关于本章
> 本章以鸟哥《Linux 私房菜 — 基础学习篇》第十三章为骨架，已更新到当前 **Rocky / AlmaLinux 9 / RHEL 9** 状态，术语统一为大陆通行写法。
> 关键现代化点：包管理用 **dnf**；批量设密码用 `chpasswd`（`passwd --stdin` 在 RHEL 9 已移除）；密码加密默认从 SHA512 改为 **yescrypt**；外部身份验证由 **authselect** 取代旧的 `authconfig`；TCP Wrappers（`tcpd`/LIBWRAP）随 RHEL 9 一并移除；PAM 失败计数改用 `pam_faillock.so`。

登录 Linux 必须有账号与密码。不同用户应拥有不同权限，通过 user/group 的特殊权限设置可规范出不同的协作项目。除 root 外，Linux 还可创建其他管理员账号、规范 UID/GID、限制用户可用的系统资源（`ulimit`、`umask` 等）。本章梳理账号与组管理、ACL 进阶权限、身份切换、PAM 验证机制与大量建号。

## 13.1 Linux 的账号与组

### 13.1.1 用户标识符：UID 与 GID

登录时输入的是账号名称，但内核其实只认识 **ID**（数字）。账号与 ID 的对应记录在 `/etc/passwd` 中。每个登录用户至少取得两个 ID：

- **UID**（User ID，用户标识符）
- **GID**（Group ID，组标识符）

文件的拥有者与所属组也以 UID/GID 记录；当 `ls` 等命令显示属主、属组名时，是系统根据 `/etc/passwd`、`/etc/group` 将数字反向解析成名称。

> [!warning] 不要随意改动账号的 UID
> UID 是权限判定的依据。把某账号的 UID 改成不存在的值，原本属主是该账号的文件就不再显示账号名（而是显示原始数字），可能导致账号无法访问自家目录、相关服务异常。改坏后必须立即改回 `/etc/passwd`。

### 13.1.2 用户账号

用户登录的简要流程：

1. 系统在 `/etc/passwd` 查找账号，读出对应的 UID、GID、家目录与登录 shell；
2. 进入 `/etc/shadow` 核对密码（密文比对）；
3. 通过后进入 shell。

因此 `/etc/passwd` 与 `/etc/shadow` 是账号管理的两个核心文件，备份账号时务必同时备份。

**`/etc/passwd` 文件结构**

每行一个账号，以 `:` 分隔，共 7 个字段：

| 字段 | 含义 | 示例 |
|---|---|---|
| 1. 账号名称 | 供人类记忆的登录名 | `root` |
| 2. 密码 | 早期放密文，现已移到 `/etc/shadow`，固定为 `x` | `x` |
| 3. UID | 用户标识符 | `0` |
| 4. GID | 主组标识符，对应 `/etc/group` | `0` |
| 5. 说明信息 | 注释/全名（`chfn` 修改） | `root` |
| 6. 家目录 | 登录后进入的目录 | `/root` |
| 7. Shell | 登录 shell；`/sbin/nologin` 表示禁止登录 | `/bin/bash` |

UID 取值范围与含义：

| 范围 | 类别 | 说明 |
|---|---|---|
| 0 | 系统管理员 | UID 为 0 即 root 级权限；可有多条 UID=0 的账号，但**强烈不建议** |
| 1–999（含 `SYS_UID_MIN~MAX`） | 系统账号 | 给系统服务（`sshd`、`apache`、`nginx` 等）使用，通常不可登录（shell 为 `/sbin/nologin`）；其中 1–200 由发行版预建，201–999 供管理员自建系统账号 |
| 1000–60000 | 可登录账号 | 一般用户；现代内核（6.x）支持到 2³²−1 |

> [!note] RHEL 9 默认范围
> `/etc/login.defs` 中 `UID_MIN 1000`、`UID_MAX 60000`、`SYS_UID_MIN 201`、`SYS_UID_MAX 999`，与 CentOS 7 一致。普通用户从 1000 起。

**`/etc/shadow` 文件结构**

由于 `/etc/passwd` 必须让所有进程可读（`-rw-r--r--`），密文放在其中易被暴力破解，因此现代 Linux 把密文与密码策略搬到 `/etc/shadow`（权限 `-rw-------`/`----------`，仅 root 可读写）。每行 9 个字段，以 `:` 分隔：

| 字段 | 含义 |
|---|---|
| 1. 账号名称 | 与 `/etc/passwd` 对应 |
| 2. 加密密码 | 经 yescrypt/SHA512 等算法单向加密的密文；前缀 `!` 或 `*` 表示已锁定/无效；为空表示无密码 |
| 3. 最近修改密码日期 | 自 1970-01-01 起的天数 |
| 4. 密码不可更改天数 | 第 3 字段起多少天内不可改密；`0` 表示随时可改 |
| 5. 密码需要重新设置天数 | 多少天后必须改密；`99999` 表示无强制 |
| 6. 密码过期前警告天数 | 过期前几天开始警告 |
| 7. 密码过期后宽限天数 | 过期多少天后密码彻底失效（无法登录） |
| 8. 账号失效日期 | 自 1970-01-01 起的天数；到期后账号不可用（与密码无关） |
| 9. 保留 | 预留 |

> [!tip] 密码忘记怎么办
> - **普通用户忘记密码**：root 用 `passwd 用户名` 直接重设（无需旧密码）。
> - **root 忘记密码**：重启进入**单用户模式**（GRUB 编辑内核行加 `rw init=/sysroot/bin/sh` 或 `rd.break`），或用 Live USB 挂载根分区后清空 `/etc/shadow` 中 root 的密码字段，重启后即可免密登录，再立即 `passwd` 设置新密码。

查看当前密码加密算法：

```bash
grep -E 'ENCRYPT_METHOD' /etc/login.defs       # 查看默认算法
authselect current | grep -i crypt              # RHEL 9 推荐方式
```

### 13.1.3 关于组：有效与初始组、groups、newgrp

**`/etc/group` 文件结构**

每行一个组，4 个字段：

| 字段 | 含义 |
|---|---|
| 1. 组名称 | 如 `root`、`wheel` |
| 2. 组密码 | 已移到 `/etc/gshadow`，固定为 `x` |
| 3. GID | 组标识符 |
| 4. 成员列表 | 以 `,` 分隔的附加组成员；**以本组为初始组的用户不在此列** |

**`/etc/gshadow`** 字段：组名称 / 组密码（`!` 或空表示无合法密码、无组管理员）/ 组管理员账号 / 组成员（与 `/etc/group` 第 4 字段相同）。

![[vbird-05417ac84f32a576.webp]]
*图：账号相关文件之间的 UID/GID 与密码关联*

**初始组 vs 有效组**

- **初始组（initial group）**：`/etc/passwd` 第 4 字段 GID 对应的组；用户登录即拥有该组权限，无需在 `/etc/group` 第 4 字段再列出。
- **有效组（effective group）**：用户创建新文件时归属的组。用户可同时属于多个组（附加组），但任一时刻只有一个有效组。

**`groups`**：查看当前用户所属的全部组，**第一个即为有效组**。

```bash
$ groups
dmtsai wheel users       # 有效组为 dmtsai
```

**`newgrp 组名`**：切换有效组。会启动一个**新 shell**，在新 shell 中有效组变更；退出用 `exit`。要求目标组必须是当前用户已属于的组。

![[vbird-5da81da5268ba201.gif]]
*图：newgrp 通过启动新 shell 切换有效 GID*

```bash
$ newgrp users
$ groups
users wheel dmtsai       # 有效组已切到 users
$ touch test2 && ls -l test2
-rw-r--r--. 1 dmtsai users 0 ... test2     # 新文件属组是 users
$ exit                   # 退出 newgrp 子 shell
```

> [!note] 组管理员机制
> `/etc/gshadow` 支持为组指定"组管理员"，由其通过 `gpasswd` 增删成员，减轻 root 负担。现代发行版有 `sudo` 之后该机制已很少使用。

## 13.2 账号管理

### 13.2.1 新增与移除用户

**`useradd`：创建用户**

```bash
useradd [-u UID] [-g 初始组] [-G 次要组] [-mM] \
        [-c 说明] [-d 家目录] [-s shell] [-e 失效日] [-f 宽限天] 用户名
```

| 选项 | 作用 |
|---|---|
| `-u UID` | 指定 UID |
| `-g 初始组` | 指定主组（已存在的组名） |
| `-G 次要组` | 加入附加组（可多个，逗号分隔） |
| `-m` | 强制创建家目录（普通账号默认） |
| `-M` | 强制不创建家目录（系统账号默认） |
| `-c 说明` | `/etc/passwd` 第 5 字段 |
| `-d 家目录` | 指定家目录绝对路径 |
| `-s shell` | 指定登录 shell |
| `-r` | 创建系统账号（UID 取自 SYS_UID 区间，默认不建家目录） |
| `-e YYYY-MM-DD` | 账号失效日（shadow 第 8 字段） |
| `-f N` | 密码过期后 N 天失效（shadow 第 7 字段）；`-1` 表示永不失效 |

示例：

```bash
# 默认创建（家目录权限 700，自动建同名初始组）
useradd vbird1

# 指定 UID=1500、初始组=users
useradd -u 1500 -g users vbird2

# 创建系统账号（UID<1000，不建家目录）
useradd -r vbird3
```

**`useradd` 默认值与参考文件**

```bash
useradd -D                       # 显示默认值（来自 /etc/default/useradd）
```

| 默认项 | 含义 |
|---|---|
| `GROUP=100` | 公共组机制下的默认主组；RHEL 系默认用**私有组机制**（与账号同名），不参考此值 |
| `HOME=/home` | 家目录基目录 |
| `INACTIVE=-1` | shadow 第 7 字段；`-1` 表示密码过期后不失效 |
| `EXPIRE=` | shadow 第 8 字段（账号失效日） |
| `SHELL=/bin/bash` | 默认登录 shell |
| `SKEL=/etc/skel` | 家目录骨架目录，新建家目录从此复制 |
| `CREATE_MAIL_SPOOL=yes` | 是否建邮箱 |

`useradd` 参考的三个文件：`/etc/default/useradd`、`/etc/login.defs`、`/etc/skel/*`。

`/etc/login.defs` 关键项：

| 项 | 说明 |
|---|---|
| `PASS_MAX_DAYS 99999` | shadow 第 5 字段 |
| `PASS_MIN_DAYS 0` | shadow 第 4 字段 |
| `PASS_WARN_AGE 7` | shadow 第 6 字段 |
| `UID_MIN 1000` / `UID_MAX 60000` | 普通用户 UID 范围 |
| `SYS_UID_MIN 201` / `SYS_UID_MAX 999` | 系统账号 UID 范围 |
| `UMASK 077` | 家目录 umask，故权限为 700 |
| `ENCRYPT_METHOD YESCRYPT` | RHEL 9 密码加密默认（CentOS 7 为 SHA512） |
| `CREATE_HOME yes` | 默认创建家目录 |
| `USERGROUPS_ENAB yes` | `userdel` 时若初始组无成员则一并删除 |

**私有组 vs 公共组机制**

| 机制 | 行为 | 代表发行版 |
|---|---|---|
| 私有组机制 | 每个用户自动建一个同名初始组，家目录权限 700 | **RHEL / Fedora / CentOS / Rocky / AlmaLinux** |
| 公共组机制 | 所有用户共用 `users` 组（GID=100），家目录可互相访问 | SuSE 等早期发行版 |

**`passwd`：设置/修改密码**

```bash
passwd [账号名]                 # root 改任意账号；不加账号 = 改自己
passwd [-l] [-u] [-S] [-n 天] [-x 天] [-w 天] [-i 天] 账号
```

| 选项 | 作用 |
|---|---|
| `-l` / `-u` | 锁定 / 解锁（在 shadow 密码字段前加/去 `!`） |
| `-S` | 查看密码状态（`PS` 正常、`LK` 已锁定） |
| `-n` / `-x` / `-w` / `-i` | 对应 shadow 第 4/5/6/7 字段 |
| `--stdin` | 从标准输入读密码（**RHEL 9 已移除**，改用 `chpasswd`） |

> [!warning] `passwd --stdin` 在 RHEL 9 已被移除
> 自 util-linux 2.36 起 `passwd --stdin` 废弃，Rocky/AlmaLinux 9 不再支持。批量设密码改用：
> ```bash
> echo "用户名:密码" | chpasswd        # 推荐
> ```

密码策略（由 PAM `pam_pwquality.so` 强制）：

- 不能与账号相同；
- 避免字典单词；
- 长度通常 ≥ 8（由 `/etc/security/pwquality.conf` 的 `minlen` 控制）；
- 避免个人信息、简单关系式；
- 推荐大小写 + 数字 + 特殊字符组合。

root 可设任意弱密码；普通用户改密需先输旧密码，且受 PAM 强度检查约束。

**`chage`：查看/修改密码参数**

```bash
chage [-l] [-d 日期] [-E 日期] [-I 天] [-m 天] [-M 天] [-W 天] 账号
```

| 选项 | 作用 |
|---|---|
| `-l` | 列出详细密码参数 |
| `-d YYYY-MM-DD` | shadow 第 3 字段 |
| `-E YYYY-MM-DD` | shadow 第 8 字段 |
| `-I 天` | shadow 第 7 字段 |
| `-m 天` | shadow 第 4 字段 |
| `-M 天` | shadow 第 5 字段 |
| `-W 天` | shadow 第 6 字段 |

> [!tip] 强制首次登录改密
> ```bash
> useradd agetest
> echo "agetest:初始密码" | chpasswd
> chage -d 0 agetest       # 把"上次改密日"设为 1970-01-01，迫使下次登录立即改密
> ```

**`usermod`：修改用户属性**

```bash
usermod [-cdegGlsuLU] 用户名
```

与 `useradd` 选项基本一致，额外：

| 选项 | 作用 |
|---|---|
| `-a` | 与 `-G` 合用，**追加**附加组（不替换原附加组） |
| `-l 新名` | 改账号名 |
| `-L` / `-U` | 锁定 / 解锁密码 |

> [!warning] 改附加组务必用 `-aG`
> `usermod -G groupA user` 会**覆盖**原附加组列表；要追加必须 `usermod -aG groupA user`。

为系统账号补建家目录：

```bash
cp -a /etc/skel /home/vbird3
chown -R vbird3:vbird3 /home/vbird3
chmod 700 /home/vbird3
```

**`userdel`：删除用户**

```bash
userdel [-r] 用户名          # -r 连同家目录与邮箱一并删除
```

> [!warning] 删号前先查残留文件
> 用户长期使用后可能在 `/home`、`/var/spool/mail`、`/var/spool/cron/` 等处留有文件。删号前先：
> ```bash
> find / -user 用户名 -ls    # 排查后再 userdel -r
> ```
> 若仅"暂时停用"，**不要**用 `userdel`：把 shell 改 `/sbin/nologin`，或锁定密码（`passwd -l`、`usermod -L`），或把 shadow 第 8 字段（账号失效日）设为 0/已过日期。

### 13.2.2 用户自查功能：id、chfn、chsh

**`id [用户名]`**：查看 UID/GID 与所属全部组。

**`finger`**（默认未安装）：查看用户账号信息（登录名、全名、家目录、shell、上次登录、邮箱、`.plan`）。RHEL 9 需手动安装：`dnf install finger`。现代多改用 `getent passwd 用户名`。

**`chfn`**（change finger）：修改自己的全名、办公室、电话等（写入 `/etc/passwd` 第 5 字段）。

**`chsh`**（change shell）：修改自己的登录 shell。

```bash
chsh -l                    # 列出 /etc/shells 中的合法 shell
chsh -s /bin/bash          # 改为 bash
```

> [!note] 为什么普通用户能改 `/etc/passwd`
> `chsh`、`chfn`、`passwd` 这些命令本身带 **SUID** 权限（`-rwsr-xr-x`），运行时临时以 root 身份写入系统文件，但仅允许修改当前用户自己的字段。

### 13.2.3 新增与移除组

**`groupadd`**：建组（`-g GID` 指定 GID；`-r` 建系统组）。

**`groupmod`**：改组（`-g GID`、`-n 新名`）。**不要随意改 GID**，否则引用旧 GID 的文件属组会变成数字。

**`groupdel 组名`**：删组。**不能删除**任何用户的初始组——必须先确认 `/etc/passwd` 中无用户以此为初始组。

**`gpasswd`**：组管理员机制。

```bash
# root 操作
gpasswd 组名                       # 给组设密码
gpasswd -A user1 组名              # 指定 user1 为组管理员
gpasswd -M user1,user2 组名        # 批量设成员
gpasswd -r 组名                    # 移除组密码
gpasswd -R 组名                    # 让组密码失效

# 组管理员 / 用户操作
gpasswd -a user 组名               # 加入组
gpasswd -d user 组名               # 退出组
```

### 13.2.4 账号管理实例

**任务一**：创建多个用户，部分加入同一附加组，部分禁止登录。

| 账号 | 全名 | 附加组 | 可登录 | 密码 |
|---|---|---|---|---|
| myuser1 | 1st user | mygroup1 | 是 | password |
| myuser2 | 2nd user | mygroup1 | 是 | password |
| myuser3 | 3rd user | 无 | 否 | password |

```bash
groupadd mygroup1
useradd -G mygroup1 -c "1st user" myuser1
useradd -G mygroup1 -c "2nd user" myuser2
useradd -c "3rd user" -s /sbin/nologin myuser3

echo "myuser1:password" | chpasswd
echo "myuser2:password" | chpasswd
echo "myuser3:password" | chpasswd
```

**任务二**：协作开发，多人共享目录 `/srv/projecta`，各自仍有独立家目录。

```bash
groupadd projecta
useradd -G projecta -c "projecta user" pro1
useradd -G projecta -c "projecta user" pro2
useradd -G projecta -c "projecta user" pro3
echo "pro1:password" | chpasswd
echo "pro2:password" | chpasswd
echo "pro3:password" | chpasswd

mkdir /srv/projecta
chgrp projecta /srv/projecta
chmod 2770 /srv/projecta     # SGID：组内新文件自动继承属组 projecta
```

> [!note] SGID 在协作目录的作用
> 目录设了 SGID（`chmod 2xxx` 或 `g+s`）后，组内任何人在此目录新建的文件/子目录都会**继承目录的属组**（`projecta`），从而组内其他人都能读写——这是多人协作的标准做法。

**任务二的延伸需求**：让 myuser1（不在 projecta 组）能**只读**访问 `/srv/projecta`，但**不能修改**。传统 owner/group/others 模型无法满足"给某一个单独用户单独授权"——这正是 ACL 的用武之地（见 13.3）。

### 13.2.5 外部身份验证简介

除本机账号外，Linux 常接入外部身份验证服务：

| 服务 | 用途 |
|---|---|
| **LDAP** | 跨主机统一账号（企业常用，配合 389-DS / OpenLDAP） |
| **Active Directory (AD)** | 通过 `realmd` / `sssd` 加入 Windows 域 |
| **NIS** | 早期 Sun 的网络信息系统，已基本淘汰 |
| **FreeIPA / IdM** | RHEL 的统一身份管理（集 LDAP + Kerberos + DNS + CA） |

RHEL 9 用 **`authselect`** 取代了 CentOS 7 的 `authconfig` / `authconfig-tui`：

```bash
authselect list                       # 列出可用 profile
authselect select sssd --with-sssd    # 启用 SSSD（用于 AD/LDAP）
authselect current                    # 查看当前 profile
```

> [!warning] 不要再手编 `/etc/pam.d/system-auth`
> RHEL 9 起 `system-auth` 等 PAM 文件由 `authselect` 自动生成，手工修改会被覆盖。改 PAM 应通过 `authselect` 创建自定义 profile。

## 13.3 主机的细部权限规划：ACL 的使用

### 13.3.1 什么是 ACL

**ACL（Access Control List）** 提供传统 owner/group/others + r/w/x 之外的**细粒度权限**：可针对**单个用户**或**单个组**单独授予 r/w/x，突破"一个文件只有一个属主、一个属组"的限制。

ACL 可控制三个维度：

- **user**：针对单个用户；
- **group**：针对单个组；
- **mask**：限制 ACL 中 user/group 条目所能赋予的最大有效权限。

现代文件系统（ext4、xfs、btrfs）默认都支持 ACL，无需额外挂载选项。RHEL 9 默认的 **xfs** 即开箱支持。

### 13.3.2 ACL 的设置技巧：setfacl、getfacl

**`setfacl`**

```bash
setfacl [-bkRd] [{-m|-x} acl参数] 目标
```

| 选项 | 作用 |
|---|---|
| `-m` | 添加/修改 ACL 条目 |
| `-x` | 删除指定 ACL 条目 |
| `-b` | 清除所有 ACL 条目 |
| `-k` | 清除默认 ACL（仅目录） |
| `-R` | 递归 |
| `-d` | 设置**默认 ACL**（仅目录；目录下新建的文件/子目录会继承） |

ACL 条目语法：

| 语法 | 含义 |
|---|---|
| `u:用户:权限` | 给某用户授予权限（如 `u:vbird1:rx`） |
| `g:组:权限` | 给某组授予权限 |
| `m:权限` | 设置 mask（最大有效权限） |
| `o:权限` | 修改 others 权限 |
| `d:u:用户:权限` | 默认 ACL（继承到子项） |

**`getfacl 文件名`**：查看 ACL。

```bash
$ touch acl_test1
$ setfacl -m u:vbird1:rx acl_test1
$ ls -l acl_test1
-rw-r-xr--+ 1 root root 0 ... acl_test1     # 注意末尾多出 +，表示带 ACL
$ getfacl acl_test1
# file: acl_test1
# owner: root
# group: root
user::rw-
user:vbird1:r-x        # 针对单独用户的 ACL
group::r--
mask::r-x              # 最大有效权限
other::r--
```

**mask 的含义**：ACL 中 user/group 条目的**有效权限 = 设置值 ∩ mask**。调小 mask 可一次性收紧所有 ACL 条目。

```bash
$ setfacl -m m:r acl_test1
$ getfacl acl_test1
user::rw-
user:vbird1:r-x        #effective:r--    ← x 被 mask 滤掉，实际只剩 r
mask::r--
```

**实战：让 myuser1 只读访问 /srv/projecta**

```bash
# root 操作
setfacl -m u:myuser1:rx /srv/projecta
getfacl /srv/projecta
# user::rwx
# user:myuser1:r-x
# group::rwx
# mask::rwx
# other::---

# 用 myuser1 验证
cd /srv/projecta               # 可进入
touch testing                  # Permission denied，无法写
```

**默认 ACL：让目录下新建文件继承**

```bash
setfacl -m d:u:myuser1:rx /srv/projecta
# 之后在 /srv/projecta 下新建的文件/子目录都会带 user:myuser1:r-x
```

**移除指定条目**（注意：`-x` 不接权限部分）：

```bash
setfacl -x u:myuser1 /srv/projecta          # 删当前 ACL 条目
setfacl -x d:u:myuser1 /srv/projecta        # 删默认 ACL 条目
setfacl -m u:pro3:- /srv/projecta           # 给 pro3 设"无任何权限"（必须写 -，不能留空）
setfacl -b /srv/projecta                    # 清除全部 ACL
```

> [!tip] ACL 看一眼就懂
> 凡是 `ls -l` 看到 `+`，就说明该文件带了 ACL；要看详情用 `getfacl`。`+` 之后传统 9 位权限位的 group 部分实际显示的是 **mask**，不是属组的真实权限——以 `getfacl` 为准。

## 13.4 用户身份切换

### 13.4.1 su

```bash
su [-lm] [-c "命令"] [用户名]
```

| 选项 | 作用 |
|---|---|
| `-` 或 `-l` | **login-shell** 方式切换（重读 PATH/MAIL/HOME 等环境变量，推荐） |
| `-m` / `-p` | 保留当前环境变量 |
| `-c "命令"` | 以目标身份执行一次命令后立即返回 |

```bash
$ su -              # 切换为 root，需 root 密码，环境变量完全切到 root
# exit

$ su - -c "head -n 3 /etc/shadow"     # 只以 root 跑一次命令
```

> [!warning] 务必用 `su -` 而非 `su`
> 不加 `-` 是 **non-login shell**，会保留原用户的 `PATH`、`MAIL`、`PWD` 等变量，导致 root 命令找不到、收错邮箱等隐蔽问题。切换身份一律用 `su -` 或 `su -l 用户名`。
>
> root 切到任何用户**无需密码**；普通用户切换需目标用户密码。

`su` 的痛点：多人共管时，人人都得知道 root 密码。`sudo` 解决了这一点。

### 13.4.2 sudo 与 visudo

`sudo` 让授权用户**用自己的密码**（甚至免密）执行 root 或其他用户的命令，授权规则写在 `/etc/sudoers`。

**`sudo` 流程**

1. 用户执行 `sudo 命令`，系统查 `/etc/sudoers` 是否有授权；
2. 有授权则要求**输入用户自己的密码**（root 用 sudo 不需要；目标身份 = 当前身份也不需要）；
3. 验证通过后执行命令；
4. **5 分钟内**再次 sudo 无需重新输密（`timestamp_timeout`，可调）。

**`sudo` 用法**

```bash
sudo [-b] [-u 用户] 命令
```

| 选项 | 作用 |
|---|---|
| `-u 用户` | 以指定用户身份执行（默认 root） |
| `-b` | 后台执行 |

```bash
sudo -u sshd touch /tmp/mysshd          # 以 sshd 身份建文件（sshd 是 nologin，su 进不去）
sudo -u vbird1 sh -c "mkdir ~/www; cd ~/www; echo hi > index.html"   # 多命令用 sh -c
```

**`visudo`：编辑 /etc/sudoers 的唯一正确方式**

`/etc/sudoers` 有严格语法，写错会让 sudo 整体不可用。`visudo` 在保存时**自动校验语法**，所以**永远用 `visudo`**，不要直接 `vim /etc/sudoers`。

**规则语法**：`用户  主机=(可切换身份)  可执行命令`

```sudoers
root    ALL=(ALL)       ALL           # 默认规则
vbird1  ALL=(ALL)       ALL           # 允许 vbird1 以任意身份执行任意命令
%wheel  ALL=(ALL)       ALL           # wheel 组成员都可 sudo（% 表示组）
%wheel  ALL=(ALL)       NOPASSWD: ALL # 免密 sudo
```

四个字段的含义：

| 字段 | 含义 |
|---|---|
| 用户/组 | 哪些账号可用 sudo；`%组名` 表示组成员 |
| 主机 | 可在哪台主机执行（一般写 `ALL`，集中 sudoers 时才有意义） |
| (可切换身份) | 可切换为何种身份执行命令；`(ALL)` 表示任意 |
| 命令 | 可执行的命令（**绝对路径**）；`ALL` 表示任意 |

> [!note] RHEL 9 默认开放 wheel 组
> 自 CentOS 7 起，`/etc/sudoers` 默认已启用 `%wheel ALL=(ALL) ALL`。安装时勾选"让此用户成为管理员"的账号会被加入 `wheel` 组，故可使用 sudo——这就是普通用户能 sudo 的原因。

**限定可执行的命令**

```sudoers
# 只允许 myuser1 用 root 身份执行 passwd 改别人密码
myuser1  ALL=(root)  /usr/bin/passwd
```

> [!warning] 上面的写法有漏洞
> `myuser1` 仍可执行 `sudo passwd`（无参数 = 改 root 密码）或 `sudo passwd root`。要堵漏洞，用否定 + 通配：
> ```sudoers
> myuser1 ALL=(root)  !/usr/bin/passwd, /usr/bin/passwd [A-Za-z]*, !/usr/bin/passwd root
> ```
> 这样允许 `passwd 用户名`，但禁止裸 `passwd` 和 `passwd root`。

**用别名批量授权**

```sudoers
User_Alias  ADMINS = pro1, pro2, pro3, myuser1
Cmnd_Alias  PWDMGMT = !/usr/bin/passwd, /usr/bin/passwd [A-Za-z]*, !/usr/bin/passwd root
ADMINS  ALL=(root)  PWDMGMT
```

别名名**必须全大写**。修改时只需调整 `User_Alias` / `Cmnd_Alias` 两行。

**`sudo su -`：用自己密码变成 root**

```sudoers
User_Alias ADMINS = pro1, pro2, pro3
ADMINS  ALL=(root)  /bin/su -
```

授权用户执行 `sudo su -` 即可用**自己的密码**直接变成 root，root 密码不外流——多人共管的常用技巧。

## 13.5 用户的特殊 shell 与 PAM 模块

### 13.5.1 特殊的 shell：/sbin/nologin

将账号的 shell 设为 `/sbin/nologin`，该账号即使有密码也无法取得交互 shell，登录时会显示：

```
This account is currently not available.
```

但这**不代表账号完全不能用系统资源**——它仍可作为系统服务的运行身份（如 `apache`、`nginx`、`sshd`）。典型用途：纯邮件账号、数据库账号、Web 服务账号。

自定义提示信息：建立 `/etc/nologin.txt`，nologin 用户登录时显示该文件内容。

> [!note] `/etc/nologin` 与 `/etc/nologin.txt` 不是一回事
> - `/etc/nologin.txt`：nologin shell 的**提示文案**。
> - `/etc/nologin`（无 `.txt`）：PAM `pam_nologin.so` 检查的**冻结文件**——只要它存在，**所有非 root 用户**都无法登录系统（root 与已登录用户不受影响）。常用于维护前驱赶用户。

### 13.5.2 PAM 模块简介

过去每个程序各自实现身份验证，导致一套主机有多套认证、密码可能不同步。**PAM（Pluggable Authentication Modules，可插拔认证模块）** 提供统一的验证 API：程序把认证需求交给 PAM，PAM 调用一组模块完成验证并返回结果。

![[vbird-418334b3d039bce8.gif]]
*图：PAM 模块与程序的关系*

PAM 的优势：程序与具体认证机制解耦；账号、密码、指纹、双因素等都能通过模块接入，一套机制对多个程序生效。`passwd`、`login`、`su`、`sudo`、`sshd` 都用 PAM。

### 13.5.3 PAM 模块设置语法

程序调用 PAM 时，PAM 会去 `/etc/pam.d/程序名` 找同名配置文件。例如 `passwd` 调用 PAM：

1. 用户执行 `/usr/bin/passwd`；
2. passwd 调 PAM；
3. PAM 读 `/etc/pam.d/passwd`；
4. 按配置文件依次调用相关模块做验证；
5. 把结果回传给 passwd；
6. passwd 据此决定下一步。

`/etc/pam.d/passwd` 示例（RHEL 9）：

```
#%PAM-1.0
auth        include      password-auth
account     include      password-auth
password    substack     password-auth
-password   optional     pam_gnome_keyring.so use_authtok
password    substack     postlogin
```

每行 3 个字段：**验证类别（type）  控制标志（control flag）  模块 [参数]**。

> [!info] `include` / `substack` 的含义
> `include password-auth` 表示"调用 `/etc/pam.d/password-auth` 文件作为本类别的验证流程"。RHEL 9 把通用规则抽到 `password-auth`、`postlogin` 等文件（由 `authselect` 生成），各程序文件 `include` 它们即可。

**四个验证类别（type）**

| 类别 | 作用 |
|---|---|
| `auth` | 认证身份（验证账号密码） |
| `account` | 授权（账号是否有效、是否过期、是否允许此刻登录） |
| `session` | 登录/注销会话期间的环境准备与日志记录 |
| `password` | 修改密码时的校验与更新 |

通常顺序：`auth`（验明身份）→ `account`（授权）→ `session`（建会话）→ 必要时 `password`。

**四个控制标志（control flag）**

| 标志 | 验证失败时 | 验证成功时 |
|---|---|---|
| `required` | **继续**后续模块，但最终回报失败（用于写日志） | 继续 |
| `requisite` | **立即终止**并回报失败 | 继续 |
| `sufficient` | 继续 | **立即终止**并回报成功（成功即够） |
| `optional` | 继续 | 继续（仅显示信息，不参与放行） |

![[vbird-7927c995dc7f0c6d.gif]]
*图：PAM 控制标志的回报流程*

### 13.5.4 常用模块简介

PAM 相关文件位置：

| 路径 | 内容 |
|---|---|
| `/etc/pam.d/*` | 各程序的 PAM 配置 |
| `/usr/lib64/security/*` | PAM 模块本体（`.so`） |
| `/etc/security/*` | PAM 的额外配置（`limits.conf`、`pwquality.conf` 等） |
| `/usr/share/doc/pam-*/` | 模块说明文档 |

常用模块：

| 模块 | 作用 |
|---|---|
| `pam_unix.so` | 传统的账号/密码验证、会话日志、密码更新；功能最全，使用最广 |
| `pam_pwquality.so` | 密码强度检查（字典、长度、复杂度），配置文件 `/etc/security/pwquality.conf`；取代早期的 `pam_cracklib.so`，完全向后兼容 |
| `pam_securetty.so` | 限制 root 只能从 `/etc/securetty` 列出的"安全终端"登录 |
| `pam_nologin.so` | `/etc/nologin` 存在时拒绝非 root 用户登录 |
| `pam_selinux.so` | 在验证前后关闭/打开 SELinux 上下文 |
| `pam_loginuid.so` | 设置登录进程的 audit loginuid |
| `pam_env.so` | 读 `/etc/security/pam_env.conf` 设置环境变量 |
| `pam_limits.so` | 读 `/etc/security/limits.conf` 设置资源上限（即 `ulimit` 的来源） |
| `pam_faillock.so` | **RHEL 9 默认**的失败锁定模块（替代早期的 `pam_tally2.so`），连续输错密码后锁定账号 |

> [!note] RHEL 9 的 PAM 变化
> - `pam_tally2.so` 已被 `pam_faillock.so` 取代；
> - `pam_cracklib.so` 早已被 `pam_pwquality.so` 取代；
> - TCP Wrappers（`pam_tcpd.so` / `tcpd`）随 RHEL 9 一并移除，`/etc/hosts.allow`、`/etc/hosts.deny` 不再生效——访问控制改用 `firewalld` / `nftables`。

**`login` 的 PAM 验证流程（简化）**

1. **auth**：先 `pam_securetty.so`（root 检查 `/etc/securetty`）→ `pam_env.so`（设环境变量）→ `pam_unix.so`（验密码）→ `pam_faillock.so`（失败计数）；
2. **account**：`pam_nologin.so`（检查 `/etc/nologin`）→ `pam_unix.so` + `pam_succeed_if.so`（账号有效性）；
3. **password**：`pam_pwquality.so`（强度）→ `pam_unix.so`（用 yescrypt/SHA512 写入 shadow）；
4. **session**：`pam_selinux.so`（关/开 SELinux）→ `pam_limits.so`（资源上限）→ 写 `/var/log/secure`。

> [!tip] 为什么 root 不能 telnet 登录却能 ssh 登录
> telnet 走 `login`，而 `login` 的 auth 阶段含 `pam_securetty.so`，远程动态终端 `pts/N` 不在 `/etc/securetty` 中，故拒绝 root。sshd 的配置 `/etc/pam.d/sshd` 默认不含 `pam_securetty.so`，因此没有这个限制。（telnet 本身已不安全，RHEL 9 默认不再提供。）

### 13.5.5 其他相关文件：limits.conf 与日志

**`/etc/security/limits.conf`**

```text
# 账号     类型    项目      值
vbird1    soft    fsize     90000      # 软上限：单文件 90MB
vbird1    hard    fsize    100000      # 硬上限：单文件 100MB
@pro1     hard    maxlogins   1        # 组：同时只能 1 个登录
*         soft    nofile   65536       # 全体：最大文件描述符
```

| 字段 | 说明 |
|---|---|
| 账号 | 用户名；`@组名` 表示组 |
| 类型 | `soft`（警告线）/ `hard`（强制上限） |
| 项目 | `fsize`（文件大小）/ `nofile`（文件描述符数）/ `nproc`（进程数）/ `maxlogins`（最大登录数）/ `cpu`（CPU 分钟数）/ `as`（地址空间）等 |
| 值 | 数值（`fsize` 单位 KB） |

> [!note] systemd 服务的资源限制另算
> `limits.conf` 只对通过 PAM 登录的会话生效。systemd 服务（如 Nginx、Java 后端）的资源上限由 unit 文件里的 `[Service]` 段（`LimitNOFILE=`、`MemoryMax=` 等）控制，改完 `systemctl daemon-reload`。两套机制不互通。

**日志**

PAM 的认证记录写到 `/var/log/secure`（rsyslog）以及 systemd-journald。排查登录失败、sudo 异常时优先查这里：

```bash
grep sshd /var/log/secure
journalctl -u sshd -e               # 等价查询，更现代
```

## 13.6 Linux 主机上的用户信息传递

### 13.6.1 查询用户：w、who、last、lastlog

| 命令 | 作用 |
|---|---|
| `id [用户]` | 查 UID/GID/所属组 |
| `w` | 查**当前在线**用户及其正在运行的命令 |
| `who` | 查当前在线用户（比 `w` 简洁） |
| `last` | 查历史登录记录（来源 `/var/log/wtmp`） |
| `lastlog` | 列出所有账号的最近登录时间（来源 `/var/log/lastlog`） |

```bash
$ w
 01:49:18 up 25 days,  3:34,  3 users,  load average: 0.00, 0.01, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
dmtsai   tty2                      07Jul24 12days  0.03s  0.03s -bash
dmtsai   pts/0    192.168.1.100    00:18    6.00s  0.31s  0.11s sshd: dmtsai
```

### 13.6.2 用户对谈：write、mesg、wall

| 命令 | 作用 |
|---|---|
| `write 用户 [终端]` | 给指定在线用户发消息（`Ctrl-D` 结束输入） |
| `mesg n` / `mesg y` | 拒绝/接受他人 `write`（root 的消息**无法**拒绝） |
| `wall "消息"` | 给**所有**在线用户广播（含自己） |

```bash
write vbird1 pts/2
Hello, please don't do anything wrong...
# 按 Ctrl-D 结束

wall "I will shutdown the server in 10 minutes."
```

### 13.6.3 用户邮箱：mail

每个用户在 `/var/spool/mail/用户名` 有一个邮箱文件。命令行收发邮件用 `mail`（来自 `mailx` 包）：

```bash
# 发信（结尾输入 . 单独成行结束）
mail -s "标题" vbird1
Hello, nice to meet you.
.
EOT

# 从文件重定向内容
mail -s "bashrc" dmtsai < ~/.bashrc

# 通过管道
ls -al ~ | mail -s "myfile" root

# 收信（交互式 & 提示符）
mail
```

收信时常用命令：`h`（看信头）、`数字`（读第 N 封）、`d N`（删除）、`s N 文件`（存盘）、`q`（退出并应用删除）、`x`（退出不应用更改）。

## 13.7 大量创建账号的方法

### 13.7.1 账号检查工具

| 命令 | 作用 |
|---|---|
| `pwck` | 校验 `/etc/passwd` 与 `/etc/shadow` 一致性、家目录是否存在 |
| `grpck` | 校验 `/etc/group` 与 `/etc/gshadow` |
| `pwconv` | 把 `/etc/passwd` 中的密码同步到 `/etc/shadow`（修复手工改坏的情况） |
| `pwunconv` | 反向（把 shadow 写回 passwd 并删除 shadow，**不要用**） |
| `chpasswd` | 批量改密：读 `用户名:密码` 行，加密后写入 `/etc/shadow` |

```bash
echo "vbird3:新密码" | chpasswd        # 单个
# 大量：cat passwords.txt | chpasswd
```

### 13.7.2 大量创建账号脚本（RHEL 9 版）

RHEL 9 没有 `passwd --stdin`，改用 `chpasswd`。示例脚本：

```bash
#!/bin/bash
# accountadd.sh — 批量创建/删除账号
# 配合 accountadd.txt（每行一个账号名）使用
export PATH=/usr/sbin:/usr/bin:/sbin:/bin

usergroup=""        # 需要的附加组（留空则不设）
pwmech="openssl"    # openssl=随机密码；account=与账号同名
homeperm="no"       # yes 则把家目录权限改为 711

action="${1:?Usage: $0 [create|delete]}"
[ ! -f accountadd.txt ] && { echo "缺少 accountadd.txt"; exit 1; }

[ -n "$usergroup" ] && groupadd -r "$usergroup"
: > outputpw.txt

while read -r username; do
    [ -z "$username" ] && continue
    case "$action" in
        create)
            usegrp=$([ -n "$usergroup" ] && echo "-G $usergroup" || echo "")
            useradd $usegrp "$username"
            if [ "$pwmech" = openssl ]; then
                usepw=$(openssl rand -base64 6)
            else
                usepw="$username"
            fi
            echo "$username:$usepw" | chpasswd      # RHEL 9 用 chpasswd
            chage -d 0 "$username"                   # 首次登录强制改密
            [ "$homeperm" = yes ] && chmod 711 "/home/$username"
            echo "username=$username, password=$usepw" >> outputpw.txt
            ;;
        delete)
            echo "deleting $username"
            userdel -r "$username"
            ;;
        *)
            echo "Usage: $0 [create|delete]"; exit 1 ;;
    esac
done < accountadd.txt
```

配套的 `accountadd.txt`：

```text
std01
std02
std03
std04
std05
```

执行：

```bash
chmod +x accountadd.sh
./accountadd.sh create
cat outputpw.txt       # 账号与初始密码对照表
```

> [!tip] 教学场景的用法
> 用 `openssl rand` 生成随机初始密码，配合 `chage -d 0` 强制首次登录改密。打印 `outputpw.txt` 裁成纸条发给学生，学生首次登录即被要求设自己的新密码——管理员无需知道最终密码。

## 13.8 重点回顾

- Linux 内核以 **UID/GID** 识别用户与组，账号名只是给人看的；对应关系在 `/etc/passwd`、`/etc/group`；
- `/etc/passwd` 7 字段：账号名、密码占位（`x`）、UID、GID、说明、家目录、shell；
- `/etc/shadow` 9 字段：账号名、加密密码、改密日期、最短天数、最长天数、警告天数、宽限天数、账号失效日、保留；
- UID=0 即 root；系统账号 1–999；普通账号 1000–60000；
- 用户可属多个组：写入 `/etc/passwd` GID 的叫**初始组**，其余叫**附加组**；新建文件归属的组叫**有效组**，可用 `newgrp` 切换；
- 账号管理命令：`useradd` / `usermod` / `userdel` / `passwd` / `chage`；组管理：`groupadd` / `groupmod` / `groupdel` / `gpasswd`；
- `useradd` 参考 `/etc/default/useradd`、`/etc/login.defs`、`/etc/skel/`；RHEL 系采用**私有组机制**（自动建与账号同名的组）；
- 用户自查：`id` / `chfn` / `chsh`（均依赖 SUID）；
- **ACL** 突破传统三身份三权限限制，可对单个用户/组单独授权；`setfacl` 设置、`getfacl` 查看；mask 决定 ACL 条目的最大有效权限；默认 ACL 让目录下新文件继承；
- 身份切换：`su -`（需目标密码）与 `sudo`（用自己密码，靠 `/etc/sudoers` 授权，**只能用 `visudo` 编辑**）；
- `/sbin/nologin` 让账号无法取得交互 shell 但仍可作服务运行身份；`/etc/nologin` 是冻结非 root 登录的开关；
- **PAM** 提供统一认证 API；配置在 `/etc/pam.d/`，四类（auth/account/session/password）+ 四标志（required/requisite/sufficient/optional）；
- RHEL 9 现代化：`pam_faillock`（替代 `pam_tally2`）、`pam_pwquality`（替代 `pam_cracklib`）、TCP Wrappers 已移除、`passwd --stdin` 已移除（用 `chpasswd`）、`authselect` 替代 `authconfig`、密码加密默认从 SHA512 改为 **yescrypt**；
- 查询用户：`w` / `who` / `last` / `lastlog`；对谈：`write` / `mesg` / `wall`；邮箱：`mail`。

## 延伸阅读

- [passwd(5) — Linux man page](https://man7.org/linux/man-pages/man5/passwd.5.html)
- [shadow(5) — Linux man page](https://man7.org/linux/man-pages/man5/shadow.5.html)
- [sudoers(5) — sudo 官方手册](https://www.sudo.ws/docs/man/sudoers.man/)
- [PAM — Wikipedia](https://en.wikipedia.org/wiki/Pluggable_Authentication_Modules)
- [RHEL 9 Configuring authentication and identity（authselect / SSSD 官方文档）](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_authentication_and_identity)
- [Access Control Lists — Arch Wiki（ACL 实践参考）](https://wiki.archlinux.org/title/Access_Control_Lists)

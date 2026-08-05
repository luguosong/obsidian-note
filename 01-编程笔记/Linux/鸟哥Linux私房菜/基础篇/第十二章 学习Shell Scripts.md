---
描述: Shell 脚本语法、条件判断、循环、函数与调试，自动化管理系统（据鸟哥原作改写，已更新至 Rocky/AlmaLinux 9 当前状态）。
排序: 13000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0340bashshell-scripts.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-07-17
---
# 第十二章 学习Shell Scripts

> [!info] 关于本章
> 以鸟哥《Linux 私房菜 — 基础学习篇》第十二章为骨架，已更新至 **Rocky/AlmaLinux 9 / RHEL 9** 当前状态：服务管理全面使用 **systemd**（`/etc/init.d/*` 仅作历史对照），网络端口查询推荐用 **`ss`** 替代已废弃的 `netstat`，bash 语法本身（bash 5.x）在当前版本完全兼容。术语统一为大陆通行写法。

Shell script 是利用 shell 功能编写的程序——一个纯文本文件，把 shell 语法、内建与外部命令、正则表达式、管道与数据流重定向组合起来，达成自动化处理目的。它既是"批处理文件"，也是一门解释型语言，无需编译即可执行。

## 12.1 什么是 Shell Scripts

### 12.1.1 为什么要学习 shell scripts

如果只是"会用" Linux，不学 shell script 也能凑合；但想真正驾驭主机、做自动化运维，shell script 不可不知。核心理由：

| 场景 | 说明 |
|---|---|
| **自动化管理** | 查询日志、监控资源、跟踪流量、批量建账号、定时备份——交给脚本自动跑，比手动可靠 |
| **服务与启动流程** | 自 CentOS 7 起 systemd 取代 SysV init，但 systemd unit 之外仍有大量服务脚本、启动钩子用 shell 编写；`/etc/init.d/*` 是 SysV 时代遗留 |
| **简易入侵检测** | 周期性分析日志，发现异常（如某 IP 多次失败连接）即自动加固防火墙 |
| **连续命令单一化** | 把一长串命令汇总进一个脚本，执行脚本即执行整段流程（如防火墙规则批量加载、`/etc/rc.d/rc.local` 启动钩子） |
| **数据处理** | 搭配 `awk`/`sed`/`grep` 处理文本数据，比开数据库更轻量 |
| **跨平台** | 几乎所有 Unix-Like 系统都能跑 shell script；语法是纯文本，学习曲线平缓 |

> [!warning] shell script 不适合做什么
> shell script 调用的是外部命令与 bash 工具，频繁 fork 子进程，**速度与 CPU 资源效率远不如编译型语言**。系统管理、侦测、批处理是它的强项；大量数值运算、高性能场景请用 C / Go / Python 等。

### 12.1.2 第一个脚本的编写与执行

shell script 是纯文本，编写时需遵守 bash 命令解析规则：

1. 命令**从上而下、从左而右**分析与执行；
2. 命令、选项、参数间的多个空白被忽略；
3. 空白行被忽略，`[Tab]` 推开的空白视同空格；
4. 读到回车（CR）即尝试执行该行；
5. 一行内容太长可用 `\` + `[Enter]` 延伸到下一行；
6. `#` 之后的内容为注释，被忽略（第一行 `#!` 例外）。

**执行方式**：

| 方式 | 说明 | 权限要求 |
|---|---|---|
| 绝对路径 / `./shell.sh` | 直接执行，需脚本在 `${PATH}` 中或用 `./` 调用 | `r` + `x` |
| `bash shell.sh` / `sh shell.sh` | 用解释器执行，启动子进程 | 仅需 `r` |
| `source shell.sh` / `. shell.sh` | 在**当前 shell** 中执行（不启动子进程） | 仅需 `r` |

> [!tip] 为何 `sh` 能执行 bash 脚本
> RHEL 9 上 `/bin/sh` 是 `/bin/bash` 的符号链接（POSIX 模式）。`sh -n script.sh` 检查语法、`sh -x script.sh` 跟踪执行过程。

**第一个脚本**：建议把自编脚本统一放在 `~/bin/` 下便于管理。

```bash
[dmtsai@study ~]$ mkdir -p ~/bin; cd ~/bin
[dmtsai@study bin]$ vim hello.sh
```

```bash
#!/bin/bash
# Program:
#       This program shows "Hello World!" in your screen.
# History:
# 2026/08/05    First release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
echo -e "Hello World! \a \n"
exit 0
```

执行：

```text
[dmtsai@study bin]$ bash hello.sh
Hello World !
```

**脚本结构分解**：

| 段 | 作用 |
|---|---|
| `#!/bin/bash` | **shebang**：声明本脚本使用的解释器。缺这行系统可能无法判断用哪个 shell 执行 |
| `#` 注释段 | 除首行 `#!` 外，所有 `#` 开头为注释。建议写明：功能、版本、作者、建文件日期、历史 |
| 主要环境变量 | `PATH`、`LANG` 等预先设置，便于脚本内直接调用外部命令而不必写绝对路径 |
| 主程序 | 实际逻辑（如 `echo`） |
| `exit 0` | 定义回传值。`$?` 可读到该值，`0` 表示成功；可用 `exit n` 自定义错误码 |

> [!note] 回传值 `$?`
> `exit 0` 表示脚本正常结束；非 0 通常表示出错。下游脚本或命令可据此做条件判断。

### 12.1.3 编写 shell script 的良好习惯

脚本是"写一次、读无数次"的工件，规范化的档头与注释对未来维护至关重要。建议每个脚本档头记录：

- 功能、版本、作者与联系方式、版权声明；
- History（修改历史）；
- 特殊命令尽量用**绝对路径**；
- 运行时依赖的环境变量预先声明。

代码风格上：

- 用 `vim`（带语法检查）而非 `vi`；
- 嵌套代码用 `[Tab]` 缩进，提升可读性；
- 复杂逻辑段加注释。

## 12.2 简单的 shell script 练习

### 12.2.1 简单范例

**对话式脚本：用 `read` 接收用户输入**

```bash
[dmtsai@study bin]$ vim showname.sh
#!/bin/bash
# Program:
#    User inputs his first name and last name.  Program shows his full name.
# History:
# 2026/08/05    First release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p "Please input your first name: " firstname
read -p "Please input your last name:  " lastname
echo -e "\nYour full name is: ${firstname} ${lastname}"
```

**随日期变化：用 `date` 生成文件名**

数据库每日备份，希望文件名带日期避免覆盖。下例让用户输入前缀，再以前天、昨天、今天的日期创建三个空文件：

```bash
[dmtsai@study bin]$ vim create_3_filename.sh
#!/bin/bash
# Program:
#    Program creates three files, which named by user's input and date command.
# History:
# 2026/08/05    First release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

# 1. 让用户输入文件名
echo -e "I will use 'touch' command to create 3 files."
read -p "Please input your filename: " fileuser

# 2. 防止用户直接按 Enter，用默认值
filename=${fileuser:-"filename"}

# 3. 用 date 取得日期
date1=$(date --date='2 days ago' +%Y%m%d)  # 前两天
date2=$(date --date='1 days ago' +%Y%m%d)  # 前一天
date3=$(date +%Y%m%d)                      # 今天
file1=${filename}${date1}
file2=${filename}${date2}
file3=${filename}${date3}

# 4. 建立文件
touch "${file1}"
touch "${file2}"
touch "${file3}"
```

**数值运算：加减乘除**

bash 默认只支持整数运算。两种写法：

```bash
# 写法一：declare
declare -i total=${firstnu}*${secnu}

# 写法二（推荐）：$(( )) 算术展开
total=$((${firstnu}*${secnu}))
```

> [!tip] 推荐用 `$(( ))`
> `var=$((运算内容))` 易记且括号内可加空格。运算符：`+ - * / %`（`%` 取余）。

```bash
[dmtsai@study bin]$ vim multiplying.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
echo -e "You SHOULD input 2 numbers, I will multiplying them! \n"
read -p "first number:  " firstnu
read -p "second number: " secnu
total=$((${firstnu}*${secnu}))
echo -e "\nThe result of ${firstnu} x ${secnu} is ==> ${total}"
```

需要小数运算时用 `bc`：

```text
[dmtsai@study bin]$ echo "123.123*55.9" | bc
6882.575
```

**计算 pi**：`bc -l` 提供数学库函数，`4*a(1)` 等于 π（`a` 是反正切函数）。

```bash
[dmtsai@study bin]$ vim cal_pi.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
echo -e "This program will calculate pi value. \n"
echo -e "You should input a float number to calculate pi value.\n"
read -p "The scale number (10~10000) ? " checking
num=${checking:-"10"}
echo -e "Starting calculate pi value.  Be patient."
time echo "scale=${num}; 4*a(1)" | bc -lq
```

`scale` 越大越精确，但耗时越长；不建议超过 5000。

### 12.2.2 script 的执行方式差异 (source, sh script, ./script)

不同执行方式影响 bash 环境。

**直接执行（子进程）**：用绝对/相对路径或 `bash`/`sh` 调用脚本，会启动**一个新的子 bash** 来执行脚本内容。子进程结束后，其中定义的变量、操作**不会传回父进程**。

```text
[dmtsai@study bin]$ echo ${firstname} ${lastname}
    <==父进程里这两个变量不存在
[dmtsai@study bin]$ bash showname.sh
Please input your first name: VBird
Please input your last name:  Tsai

Your full name is: VBird Tsai
[dmtsai@study bin]$ echo ${firstname} ${lastname}
    <==脚本结束后，父进程里依然没有这两个变量
```

![[vbird-1178f32b297e8f6a.gif]]
*图：直接执行时，脚本在子进程中运行，变量不传回父进程*

**`source` 执行（父进程）**：在**当前 shell** 中执行脚本，所有变量与操作直接作用于当前环境。这就是为什么修改 `~/.bashrc` 后要让其立即生效要用 `source ~/.bashrc` 而非 `bash ~/.bashrc`。

```text
[dmtsai@study bin]$ source showname.sh
Please input your first name: VBird
Please input your last name:  Tsai

Your full name is: VBird Tsai
[dmtsai@study bin]$ echo ${firstname} ${lastname}
VBird Tsai  <==变量在当前 shell 中生效
```

![[vbird-4cd83d7cf376c373.gif]]
*图：`source` 执行时，脚本在父进程中运行，变量保留*

## 12.3 善用判断式

### 12.3.1 利用 test 命令的测试功能

`test` 命令检测文件属性或条件，结果通过 `$?` 或 `&&` / `||` 体现：

```bash
[dmtsai@study ~]$ test -e /dmtsai && echo "exist" || echo "Not exist"
Not exist
```

`test` 常用测试标志：

**文件类型判断**

| 标志 | 意义 |
|---|---|
| `-e` | 文件名是否存在（常用） |
| `-f` | 是否存在且为**普通文件**（常用） |
| `-d` | 是否存在且为**目录**（常用） |
| `-b` | 是否为 **block device**（块设备） |
| `-c` | 是否为 **character device**（字符设备） |
| `-S` | 是否为 **Socket** 文件 |
| `-p` | 是否为 **FIFO**（管道）文件 |
| `-L` | 是否为**符号链接** |

**文件权限检测**（注意：root 常有例外）

| 标志 | 意义 |
|---|---|
| `-r` | 是否有读权限 |
| `-w` | 是否有写权限 |
| `-x` | 是否有执行权限 |
| `-u` | 是否有 **SUID** 属性 |
| `-g` | 是否有 **SGID** 属性 |
| `-k` | 是否有 **Sticky bit** |
| `-s` | 是否为**非空文件** |

**两文件比较**

| 标志 | 意义 |
|---|---|
| `-nt` | file1 比 file2 **新**（newer than） |
| `-ot` | file1 比 file2 **旧**（older than） |
| `-ef` | 两文件是否指向同一 inode（可用于判断硬链接） |

**整数比较**（`test n1 -eq n2`）

| 标志 | 意义 |
|---|---|
| `-eq` | 等于 |
| `-ne` | 不等于 |
| `-gt` | 大于 |
| `-lt` | 小于 |
| `-ge` | 大于等于 |
| `-le` | 小于等于 |

**字符串判断**

| 写法 | 意义 |
|---|---|
| `test -z string` | 字符串**为空**则 true |
| `test -n string` | 字符串**非空**则 true（`-n` 可省略） |
| `str1 == str2` | 相等 |
| `str1 != str2` | 不等 |

**多重条件**

| 标志 | 意义 |
|---|---|
| `-a` | AND：两条件同时成立 |
| `-o` | OR：任一条件成立 |
| `!` | 取反 |

**综合示例**：输入文件名，判断是否存在、类型、权限：

```bash
[dmtsai@study bin]$ vim file_perm.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

echo -e "Please input a filename, I will check the filename's type and permission. \n\n"
read -p "Input a filename : " filename
test -z ${filename} && echo "You MUST input a filename." && exit 0
test ! -e ${filename} && echo "The filename '${filename}' DO NOT exist" && exit 0
test -f ${filename} && filetype="regular file"
test -d ${filename} && filetype="directory"
test -r ${filename} && perm="readable"
test -w ${filename} && perm="${perm} writable"
test -x ${filename} && perm="${perm} executable"
echo "The filename: ${filename} is a ${filetype}"
echo "And the permissions for you are : ${perm}"
```

> [!warning] root 用户的权限检测
> root 对很多权限限制无效，用 root 执行上述脚本结果可能与 `ls -l` 不符。建议用普通用户测试。

### 12.3.2 利用判断符号 [ ]

中括号 `[ ]` 与 `test` 等价，更常用在 `if` 语句中：

```bash
[dmtsai@study ~]$ [ -z "${HOME}" ] ; echo $?
```

> [!warning] 中括号的三个易错点
> 1. **中括号两端、每个元素之间都必须有空格**分隔：`[□"$HOME"□==□"$MAIL"□]`；
> 2. 中括号内的**变量最好用双引号**括起来；
> 3. 中括号内的**常量最好用单/双引号**括起来。
>
> 不加引号的后果：当 `name="VBird Tsai"` 时，`[ ${name} == "VBird" ]` 会被展开成 `[ VBird Tsai == "VBird" ]`，bash 报错 `[: too many arguments`。

> [!tip] `==` 与 `=`
> bash 中两者结果相同；按惯例，`=` 用于赋值，`==` 用于判断。中括号内既然是"判断"，用 `==` 更清晰。

示例：Y/N 选择脚本

```bash
[dmtsai@study bin]$ vim ans_yn.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p "Please input (Y/N): " yn
[ "${yn}" == "Y" -o "${yn}" == "y" ] && echo "OK, continue" && exit 0
[ "${yn}" == "N" -o "${yn}" == "n" ] && echo "Oh, interrupt!" && exit 0
echo "I don't know what your choice is" && exit 0
```

### 12.3.3 Shell script 的位置参数 ($0, $1...)

脚本可以接收命令行参数，对应关系：

```text
/path/to/scriptname  opt1  opt2  opt3  opt4
       $0             $1    $2    $3    $4
```

| 变量 | 意义 |
|---|---|
| `$#` | 参数**个数** |
| `"$@"` | **独立**的参数列表：`"$1" "$2" "$3" "$4"`（每个独立加引号，**推荐使用**） |
| `"$*"` | 代表**一整串**：`"$1c$2c$3c$4"`，`c` 为分隔字符（默认空格） |

> [!tip] 始终用 `"$@"`
> 当参数内含空格或双引号时，`$@`（不带引号）与 `"$@"`（带引号）结果不同。脚本中接收参数**统一用 `"$@"`** 最安全。

示例：

```bash
[dmtsai@study bin]$ vim how_paras.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

echo "The script name is        ==> ${0}"
echo "Total parameter number is ==> $#"
[ "$#" -lt 2 ] && echo "The number of parameter is less than 2.  Stop here." && exit 0
echo "Your whole parameter is   ==> '$@'"
echo "The 1st parameter         ==> ${1}"
echo "The 2nd parameter         ==> ${2}"
```

```text
[dmtsai@study bin]$ bash how_paras.sh theone haha quot
The script name is        ==> how_paras.sh
Total parameter number is ==> 3
Your whole parameter is   ==> 'theone haha quot'
The 1st parameter         ==> theone
The 2nd parameter         ==> haha
```

**`shift`：参数变量号码偏移**

`shift` 移除最前面的若干参数；后接数字表示一次移除几个。

```bash
[dmtsai@study bin]$ vim shift_paras.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

echo "Total parameter number is ==> $#"
echo "Your whole parameter is   ==> '$@'"
shift
echo "Total parameter number is ==> $#"
echo "Your whole parameter is   ==> '$@'"
shift 3
echo "Total parameter number is ==> $#"
echo "Your whole parameter is   ==> '$@'"
```

```text
[dmtsai@study bin]$ bash shift_paras.sh one two three four five six
Total parameter number is ==> 6
Your whole parameter is   ==> 'one two three four five six'
Total parameter number is ==> 5   <==移除 one
Your whole parameter is   ==> 'two three four five six'
Total parameter number is ==> 2   <==再移除 three
Your whole parameter is   ==> 'five six'
```

## 12.4 条件判断式

### 12.4.1 利用 if.... then

**单层条件**

```bash
if [ 条件判断式 ]; then
    条件成立时执行的命令
fi
```

多个条件可拆成多个 `[ ]`，括号间用 `&&`（AND）/ `||`（OR）连接：

> `[ "${yn}" == "Y" -o "${yn}" == "y" ]`
> 等价于
> `[ "${yn}" == "Y" ] || [ "${yn}" == "y" ]`

**`if ... else`**

```bash
if [ 条件判断式 ]; then
    成立时执行
else
    不成立时执行
fi
```

**`if ... elif ... else`**

```bash
if [ 条件一 ]; then
    条件一成立
elif [ 条件二 ]; then
    条件二成立
else
    都不成立
fi
```

> [!note] elif 后要有 then，else 后不要 then
> `elif` 仍是判断式，需接 `then`；`else` 是兜底，后面直接写命令块。

将 `ans_yn.sh` 改写为 `if` 版：

```bash
[dmtsai@study bin]$ vim ans_yn-3.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p "Please input (Y/N): " yn

if [ "${yn}" == "Y" ] || [ "${yn}" == "y" ]; then
    echo "OK, continue"
elif [ "${yn}" == "N" ] || [ "${yn}" == "n" ]; then
    echo "Oh, interrupt!"
else
    echo "I don't know what your choice is"
fi
```

**示例：检测主机常见网络服务端口**

> [!warning] 现代替代：`ss` 取代 `netstat`
> `netstat` 已被废弃（来自 net-tools 包），RHEL 9 默认未安装。改用 **`ss -tuln`**（iproute2 包，功能等价）。

```text
[dmtsai@study ~]$ ss -tuln
Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port  Process
tcp   LISTEN 0      128          0.0.0.0:22         0.0.0.0:*
tcp   LISTEN 0      5            127.0.0.1:631      0.0.0.0:*
```

常见端口对照：

| 端口 | 服务 |
|---|---|
| 22 | SSH |
| 80 | HTTP（WWW） |
| 443 | HTTPS |
| 21 | FTP |
| 25 | SMTP（邮件） |
| 631 | CUPS（打印） |

下例用 `ss` 检测 22/80/21/25 是否监听：

```bash
[dmtsai@study bin]$ vim netstat.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

echo "Now, I will detect your Linux server's services!"
echo -e "The www, ftp, ssh, and mail(smtp) will be detected! \n"

testfile=/dev/shm/ss_checking.txt
ss -tuln > ${testfile}
testing=$(grep ":22 " ${testfile})
if [ "${testing}" != "" ]; then
    echo "SSH is running in your system."
fi
testing=$(grep ":80 " ${testfile})
if [ "${testing}" != "" ]; then
    echo "WWW is running in your system."
fi
testing=$(grep ":21 " ${testfile})
if [ "${testing}" != "" ]; then
    echo "FTP is running in your system."
fi
testing=$(grep ":25 " ${testfile})
if [ "${testing}" != "" ]; then
    echo "Mail is running in your system."
fi
```

**示例：日期差计算（倒计时）**

`date --date="YYYYMMDD" +%s` 把日期转成自 1970-01-01 起的秒数，相减得时间差。下例计算距离某个目标日期还剩多少天多少小时：

```bash
[dmtsai@study bin]$ vim cal_countdown.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

echo "This program will try to calculate :"
echo "How many days before your target date..."
read -p "Please input your target date (YYYYMMDD ex>20261231): " date2

date_d=$(echo ${date2} | grep '[0-9]\{8\}')
if [ "${date_d}" == "" ]; then
    echo "You input the wrong date format...."
    exit 1
fi

declare -i date_target=$(date --date="${date2}" +%s)
declare -i date_now=$(date +%s)
declare -i date_total_s=$((${date_target}-${date_now}))
declare -i date_d=$((${date_total_s}/60/60/24))

if [ "${date_total_s}" -lt "0" ]; then
    echo "The date was $(($((-1)*${date_d}))) days ago"
else
    declare -i date_h=$(($((${date_total_s}-${date_d}*60*60*24))/60/60))
    echo "The date will come after ${date_d} days and ${date_h} hours."
fi
```

### 12.4.2 利用 case..... esac 判断

当变量有多个固定取值时，`case` 比 `if-elif` 更清晰：

```bash
case  $变量名称 in
  "第一个变量内容")
    程序段
    ;;
  "第二个变量内容")
    程序段
    ;;
  *)                  # 通配，相当于 else
    其他情况的处理
    exit 1
    ;;
esac                  # case 反过来写
```

> [!note] 语法要点
> - 关键字 `case`，结尾 `esac`（case 反过来写）；
> - 每个分支用双引号括值，`)` 结尾；
> - 每段末尾两个分号 `;;`；
> - `*)` 兜底所有未匹配值。

示例：

```bash
[dmtsai@study bin]$ vim hello-3.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

case ${1} in
  "hello")
    echo "Hello, how are you ?"
    ;;
  "")
    echo "You MUST input parameters, ex> {${0} someword}"
    ;;
  *)
    echo "Usage ${0} {hello}"
    ;;
esac
```

`case` 中 `$变量` 的两种来源：

- **直接传入**：`script.sh variable` → `$1`（systemd 之外遗留的服务脚本常用）；
- **交互输入**：`read` 让用户输入。

### 12.4.3 利用 function 功能

**函数（function）** 把重复代码封装成自定义命令：

```bash
function fname() {
    程序段
}
```

> [!warning] 函数必须先定义后调用
> shell 脚本是**从上而下**顺序执行，`function` 定义必须出现在调用之前——这一点与传统编译型语言差异很大。

示例：

```bash
[dmtsai@study bin]$ vim show123-2.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

function printit(){
    echo -n "Your choice is "     # -n 不换行
}

echo "This program will print your selection !"
case ${1} in
  "one")
    printit; echo ${1} | tr 'a-z' 'A-Z'
    ;;
  "two")
    printit; echo ${1} | tr 'a-z' 'A-Z'
    ;;
  "three")
    printit; echo ${1} | tr 'a-z' 'A-Z'
    ;;
  *)
    echo "Usage ${0} {one|two|three}"
    ;;
esac
```

**函数有自己的内建变量**：函数内 `$0` 是函数名，`$1`、`$2` 是函数调用时传入的参数，**与脚本主体的 `$1` 相互独立**。

```bash
[dmtsai@study bin]$ vim show123-3.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

function printit(){
    echo "Your choice is ${1}"   # 这里的 $1 来自函数调用
}

echo "This program will print your selection !"
case ${1} in
  "one")
    printit 1
    ;;
  "two")
    printit 2
    ;;
  "three")
    printit 3
    ;;
  *)
    echo "Usage ${0} {one|two|three}"
    ;;
esac
```

`bash show123-3.sh one` 输出 `Your choice is 1`——`printit 1` 中的 `1` 成了函数内的 `$1`。

## 12.5 循环 (loop)

### 12.5.1 while do done, until do done (不定循环)

**`while`**（当条件成立时持续循环）：

```bash
while [ condition ]
do
    程序段
done
```

**`until`**（当条件成立时终止循环，与 while 相反）：

```bash
until [ condition ]
do
    程序段
done
```

示例：要求输入 `yes`/`YES` 才停止

```bash
[dmtsai@study bin]$ vim yes_to_stop.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

while [ "${yn}" != "yes" -a "${yn}" != "YES" ]
do
    read -p "Please input yes/YES to stop this program: " yn
done
echo "OK! you input the correct answer."
```

示例：累加 1+2+...+100

```bash
[dmtsai@study bin]$ vim cal_1_100.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

s=0
i=0
while [ "${i}" != "100" ]
do
    i=$(($i+1))
    s=$(($s+$i))
done
echo "The result of '1+2+3+...+100' is ==> $s"
```

### 12.5.2 for...do...done (固定循环)

已知循环次数或范围时用 `for`：

```bash
for var in con1 con2 con3 ...
do
    程序段
done
```

每次循环 `var` 依次取 `con1`、`con2`、`con3`……。

示例：

```bash
[dmtsai@study bin]$ vim show_animal.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

for animal in dog cat elephant
do
    echo "There are ${animal}s.... "
done
```

示例：遍历 `/etc/passwd` 所有账号

```bash
[dmtsai@study bin]$ vim userid.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
users=$(cut -d ':' -f1 /etc/passwd)
for username in ${users}
do
    id ${username}
done
```

示例：用 `ping` 扫描网段 192.168.1.1~100

```bash
[dmtsai@study bin]$ vim pingip.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
network="192.168.1"
for sitenu in $(seq 1 100)
do
    ping -c 1 -w 1 ${network}.${sitenu} &> /dev/null && result=0 || result=1
    if [ "${result}" == 0 ]; then
        echo "Server ${network}.${sitenu} is UP."
    else
        echo "Server ${network}.${sitenu} is DOWN."
    fi
done
```

> [!tip] bash 内建序列写法
> `$(seq 1 100)` 可用 bash 内建的 `{1..100}` 替代；字母序列同理：`{a..g}`。

示例：列出目录内每个文件的权限

```bash
[dmtsai@study bin]$ vim dir_perm.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p "Please input a directory: " dir
if [ "${dir}" == "" -o ! -d "${dir}" ]; then
    echo "The ${dir} is NOT exist in your system."
    exit 1
fi

filelist=$(ls ${dir})
for filename in ${filelist}
do
    perm=""
    test -r "${dir}/${filename}" && perm="${perm} readable"
    test -w "${dir}/${filename}" && perm="${perm} writable"
    test -x "${dir}/${filename}" && perm="${perm} executable"
    echo "The file ${dir}/${filename}'s permission is ${perm} "
done
```

### 12.5.3 for...do...done 的数值处理

C 风格的 `for` 循环，适合数值递变：

```bash
for (( 初始值; 限制值; 执行步阶 ))
do
    程序段
done
```

| 字段 | 含义 | 示例 |
|---|---|---|
| 初始值 | 循环变量起始值 | `i=1` |
| 限制值 | 满足条件则继续循环 | `i<=100` |
| 执行步阶 | 每次循环后变量变化量 | `i++` 或 `i=i+1` |

示例：累加 1 到用户输入的数

```bash
[dmtsai@study bin]$ vim cal_1_100-2.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p "Please input a number, I will count for 1+2+...+your_input: " nu

s=0
for (( i=1; i<=${nu}; i=i+1 ))
do
    s=$((${s}+${i}))
done
echo "The result of '1+2+3+...+${nu}' is ==> ${s}"
```

### 12.5.4 搭配随机数与数组的实验

综合运用数组、随机数、循环与条件判断。下例从一份餐厅列表中随机推荐一家：

```bash
[dmtsai@study bin]$ vim what_to_eat.sh
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

eat[1]="麦当劳"
eat[2]="肯德基"
eat[3]="日式便当"
eat[4]="兰州拉面"
eat[5]="黄焖鸡米饭"
eat[6]="沙县小吃"
eat[7]="桂林米粉"
eat[8]="麻辣烫"
eat[9]="泡面"
eatnum=9

check=$(( ${RANDOM} * ${eatnum} / 32767 + 1 ))
echo "You may eat: ${eat[${check}]}"
```

> [!note] `${RANDOM}`
> bash 内建随机数变量，范围 0~32767。`check = ${RANDOM} * ${eatnum} / 32767 + 1` 把它映射到 `[1, eatnum]` 区间。

## 12.6 shell script 的跟踪与 debug

bash 提供调试参数，无需直接执行也能发现问题：

```bash
bash [-nvx] scripts.sh
```

| 选项 | 作用 |
|---|---|
| `-n` | 不执行，仅检查**语法**问题 |
| `-v` | 执行前先把脚本内容输出到屏幕 |
| `-x` | 把**执行过程**（每条命令）显示到屏幕，**最常用** |

示例：检查语法

```bash
[dmtsai@study ~]$ bash -n dir_perm.sh
# 语法无误则无任何输出
```

示例：跟踪执行过程

```text
[dmtsai@study ~]$ bash -x show_animal.sh
+ PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:/root/bin
+ export PATH
+ for animal in dog cat elephant
+ echo 'There are dogs.... '
There are dogs....
+ for animal in dog cat elephant
+ echo 'There are cats.... '
There are cats....
```

带 `+` 号的是被执行的命令行，依据它可定位脚本执行到哪一步出错。

> [!tip] 学习方法
> 多看、多模仿、改成适合自己的样式。Linux 系统自带大量服务脚本（systemd unit、`/usr/sbin/` 下的运维脚本），用 `vim` 阅读它们最前面的注释段（功能、`description`、`config` 等）通常就能立刻明白脚本用途。

## 12.7 重点回顾

- shell script 是用 shell 功能编写的**解释型程序**（纯文本），组合 shell 语法、外部命令、正则表达式、管道、重定向达成自动化处理；
- shell script 适合**系统管理**，不适合大量数值运算（频繁 fork 子进程，速度慢、CPU 开销大）；
- 脚本命令**从上而下、从左而右**执行；执行需 `r` 权限，直接调用需 `r+x`；
- 良好习惯：首行 shebang `#!/bin/bash`，档头写明功能 / 版本 / 作者 / 历史；
- 对话式脚本用 `read`；每次执行结果不同的数据用 `date`；
- `source` 执行的脚本在**当前 shell** 中运行（变量保留），其余方式启动子进程（变量不传回）；
- 判断式用 `test` 或 `[ ]`；中括号两端与元素间必须有空格，变量加双引号；
- `$0`/`$1`/`$@`/`$#` 是特殊位置参数；接收参数统一用 `"$@"`；
- 条件判断：`if...then...elif...else...fi` 适合范围判断，`case...in...esac` 适合固定取值；
- 函数 `function` 必须先定义后调用，函数内 `$0`/`$1` 与脚本主体相互独立；
- 循环：`while`/`until`（不定循环）、`for...in`（固定循环）、`for ((...))`（C 风格数值循环）；
- 用 `bash -x script.sh` 跟踪执行过程做调试。

## 12.8 本章习题

1. 编写脚本，计算距离下次生日还有多少天（提示：`date --date="YYYYMMDD" +%s` 转秒数相减）。

   ```bash
   #!/bin/bash
   read -p "Please input your birthday (MMDD, ex> 0709): " bir
   now=$(date +%m%d)
   if [ "$bir" == "$now" ]; then
       echo "Happy Birthday to you!!!"
   elif [ "$bir" -gt "$now" ]; then
       year=$(date +%Y)
       total_d=$(( ($(date --date="$year$bir" +%s) - $(date +%s)) / 60/60/24 ))
       echo "Your birthday will be $total_d days later"
   else
       year=$(( $(date +%Y) + 1 ))
       total_d=$(( ($(date --date="$year$bir" +%s) - $(date +%s)) / 60/60/24 ))
       echo "Your birthday will be $total_d days later"
   fi
   ```

2. 让用户输入一个数字，程序从 1 累加到该数字（`while` 循环练习）。

   ```bash
   #!/bin/bash
   read -p "Please input an integer number: " number
   i=0
   s=0
   while [ "$i" != "$number" ]
   do
       i=$(($i+1))
       s=$(($s+$i))
   done
   echo "the result of '1+2+3+...$number' is ==> $s"
   ```

3. 编写脚本，将 `/etc/passwd` 第一列（账号名）取出，每行按 `The 1 account is "root"` 格式输出（数字为行号，`for` + `cut` 练习）。

   ```bash
   #!/bin/bash
   accounts=$(cat /etc/passwd | cut -d':' -f1)
   for account in $accounts
   do
       declare -i i=$i+1
       echo "The $i account is \"$account\" "
   done
   ```

## 延伸阅读

- [Bash — GNU Project](https://www.gnu.org/software/bash/)
- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [ShellCheck — shell script 静态检查工具](https://www.shellcheck.net/)
- [Greg's Wiki — Bash FAQ / Pitfalls](https://mywiki.wooledge.org/)

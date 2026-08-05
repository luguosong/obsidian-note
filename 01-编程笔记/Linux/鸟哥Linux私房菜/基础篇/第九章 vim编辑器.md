---
描述: vim 编辑器的三种模式与核心操作，系统管理员必备的文本编辑技能（据鸟哥原作改写，已更新至当前 Rocky/AlmaLinux 9 与 vim 9 状态）。
排序: 10000
分组:
分类: "[[基础篇]]"
创建时间: 2026年08月05日
来源: https://linux.vbird.org/linux_basic/centos7/0310vi.php
发布者: 鸟哥的Linux私房菜
发布时间: 2015-07-07
---
# 第九章 vim编辑器

> [!info] 关于本章
> 本章以鸟哥《Linux 私房菜 — 基础学习篇》第九章为骨架，已更新到当前 Rocky/AlmaLinux 9 状态（`vi` 默认即 `vim`、`dnf` 安装、UTF-8 默认编码），术语统一为大陆通行写法。文末附 vim 9 / Neovim 简述。

系统管理员的核心工作之一是修改各类服务的配置文件，而 Linux 的配置文件几乎都是纯文本，因此至少要熟练掌握一种命令行文本编辑器。所有 Linux 发行版都内置 `vi`，很多命令（`crontab`、`visudo`、`edquota` 等）也以 `vi` 作为默认编辑界面，所以 `vi`/`vim` 是必学工具。

## 9.1 vi 与 vim

Linux 绝大多数配置文件以 ASCII 纯文本形式存在，用简单文本编辑器即可修改。命令行下的文本编辑器很多（emacs、nano、joe、vim 等），但 `vi` 是所有 Unix-Like 系统都会内置的编辑器。

### 9.1.1 为何要学 vim

- 所有 Unix-Like 系统都内置 `vi`，其它编辑器不一定存在；
- 许多命令默认调用 `vi` 作为编辑界面（`crontab`、`visudo`、`edquota` 等）；
- `vim` 具备程序编辑能力，能以颜色高亮语法、辅助排错；
- 程序体积小，启动与编辑速度快。

`vim`（Vi IMproved）是 `vi` 的进阶版。它会根据文件扩展名或文件内容自动判断语言，用不同颜色高亮关键字与语法结构，相当于一个"程序编辑器"。`vim` 还支持正则表达式搜索、多文件编辑、块选择等 `vi` 没有的功能。

> [!tip] vi 与 vim 的关系
> 现代发行版（含 Rocky/AlmaLinux 9）中，`vi` 命令默认已由 `vim` 提供（通过 `vim-minimal`/`vim-enhanced` 包或 alias），输入 `vi` 实际启动的就是 `vim`。两者基本操作完全一致，`vim` 多出的功能见 9.3 节。

## 9.2 vi 的使用

`vi` 分三种模式：

| 模式 | 英文 | 作用 |
|---|---|---|
| 一般指令模式 | command mode | 启动后的默认模式。可移动光标、删除、复制、粘贴；无法输入文字 |
| 编辑模式 | insert mode | 在一般指令模式下按 `i`/`I`/`o`/`O`/`a`/`A`/`r`/`R` 进入，左下角显示 `-- INSERT --` 或 `-- REPLACE --`；按 `Esc` 退回一般指令模式 |
| 命令行模式 | command-line mode | 在一般指令模式下按 `:` / `/` / `?` 进入，光标移到最底行；用于搜索、保存、替换、退出、显示行号等 |

> [!warning] 模式切换的关键
> 一般指令模式可与另外两个模式互相切换，但**编辑模式与命令行模式之间不能直接切换**——必须先按 `Esc` 回到一般指令模式。

![[vbird-636b47a34e6e2635.gif]]
*图：vi 三种模式的相互关系*

### 9.2.1 简易操作范例

以新建 `welcome.txt` 为例：

```bash
$ vim welcome.txt      # 启动 vim 进入一般指令模式
```

按下 `i` 进入编辑模式（左下角显示 `-- INSERT --`），输入文字；按 `Esc` 回到一般指令模式；输入 `:wq` 保存并退出。

若文件权限为只读（如 `-r--r--r--`），可用 `:wq!` 强制写入，但前提是当前用户对该文件确有写权限。

### 9.2.2 常用按键

以下按键均在**一般指令模式**下使用（除非另注）。`n` 代表一个数字前缀，表示重复次数。

**光标移动**

| 按键 | 作用 |
|---|---|
| `h` `j` `k` `l` 或方向键 | 左 / 下 / 上 / 右移动一个字符 |
| `Ctrl`+`f` / `Ctrl`+`b` | 向下 / 向上翻一页（等同 Page Down / Page Up） |
| `Ctrl`+`d` / `Ctrl`+`u` | 向下 / 向上翻半页 |
| `0` 或 `Home` | 移到本行行首 |
| `$` 或 `End` | 移到本行行尾 |
| `G` | 移到文件最后一行 |
| `nG` | 移到第 n 行（如 `20G`） |
| `gg` | 移到第一行（等同 `1G`） |
| `n`+`Enter` | 向下移动 n 行 |

**搜索与替换**

| 按键 | 作用 |
|---|---|
| `/word` | 向下搜索字符串 word |
| `?word` | 向上搜索字符串 word |
| `n` | 重复上一个搜索动作 |
| `N` | 反向重复上一个搜索动作 |
| `:n1,n2s/word1/word2/g` | 在 n1 到 n2 行间把 word1 全部替换为 word2 |
| `:1,$s/word1/word2/g` | 全文把 word1 替换为 word2 |
| `:1,$s/word1/word2/gc` | 同上，替换前逐处确认（confirm） |

**删除、复制与粘贴**

| 按键 | 作用 |
|---|---|
| `x` / `X` | 向后 / 向前删除一个字符（等同 Delete / Backspace） |
| `nx` | 连续向后删除 n 个字符 |
| `dd` | 删除当前行 |
| `ndd` | 向下删除 n 行 |
| `d1G` / `dG` | 删除从当前行到第一行 / 最后一行 |
| `d0` / `d$` | 删除从光标到行首 / 行尾 |
| `yy` | 复制当前行 |
| `nyy` | 向下复制 n 行 |
| `y1G` / `yG` | 复制到第一行 / 最后一行 |
| `y0` / `y$` | 复制到行首 / 行尾 |
| `p` / `P` | 粘贴到下一行 / 上一行 |
| `J` | 当前行与下一行合并 |
| `u` | 撤销上一步 |
| `Ctrl`+`r` | 重做 |
| `.` | 重复上一个动作 |

> [!note] 数字 = 重复次数
> `vi` 中数字前缀表示动作重复次数：`5yy` 复制 5 行，`20j` 下移 20 行，`50dd` 删除 50 行。

**进入编辑模式**

| 按键 | 作用 |
|---|---|
| `i` / `I` | 从光标处 / 当前行第一个非空白字符处插入 |
| `a` / `A` | 从光标下一个字符 / 当前行行尾插入 |
| `o` / `O` | 在下一行 / 上一行新增一行并插入 |
| `r` / `R` | 替换一个字符 / 持续替换直到按 `Esc` |
| `Esc` | 退回一般指令模式 |

**命令行模式（保存、退出等）**

| 按键 | 作用 |
|---|---|
| `:w` | 保存 |
| `:w!` | 强制保存（受文件权限约束） |
| `:q` | 退出 |
| `:q!` | 强制退出不保存 |
| `:wq` / `:wq!` | 保存后退出 / 强制保存后退出 |
| `ZZ` | 文件改动过则保存退出，否则直接退出 |
| `:w [filename]` | 另存为新文件 |
| `:r [filename]` | 读入另一文件内容，插到光标所在行之后 |
| `:n1,n2 w [filename]` | 把 n1 到 n2 行另存 |
| `:! command` | 暂时退出 vim 执行 shell 命令 |
| `:set nu` / `:set nonu` | 显示 / 取消行号 |

### 9.2.3 案例练习

把 `/etc/man_db.conf`（RHEL 9 默认存在）复制到 `/tmp/vitest/` 后用 vim 打开，按下列步骤操作：

1. `mkdir /tmp/vitest && cd /tmp/vitest`
2. `cp /etc/man_db.conf . && vim man_db.conf`
3. `:set nu` 显示行号
4. `43G` 再 `59→`，看光标处小括号内的文字（`as`）
5. `gg` 后 `/gzip`，定位到约第 93 行
6. `:29,41s/man/MAN/gc` 在 29–41 行替换并逐处确认（按 `y` 共 13 处）
7. 全部撤销：连续按 `u`，或 `:q!` 不保存退出后重开
8. `66G` → `6yy` 复制 6 行 → `G` 到末尾 → `p` 粘贴
9. `113G` → `16dd` 删除 113–128 行（共 16 行）
10. `:w man.test.config` 另存
11. `25G` → `15x` 删除 15 个字符（出现 `tree`）
12. `1G` → `O` 在上一行新增并输入 `I am a student...` → `Esc`
13. `:wq` 保存退出

### 9.2.4 交换文件与崩溃恢复

`vim` 编辑文件时会在同目录建立交换文件（swap file）`.filename.swp`，记录编辑动作。若编辑过程中断电、被 `kill` 或网络掉线，交换文件不会自动删除，下次打开同一文件时 vim 会提示：

```text
E325: ATTENTION
Found a swap file by the name ".man_db.conf.swp"
...
Swap file ".man_db.conf.swp" already exists!
[O]pen Read-Only, (E)dit anyway, (R)ecover, (D)elete it, (Q)uit, (A)bort:
```

六个选项：

| 选项 | 含义 |
|---|---|
| `O` | 以只读方式打开（仅查看） |
| `E` | 忽略交换文件直接编辑（慎用，可能与他人的修改冲突） |
| `R` | 加载交换文件内容以恢复未保存的工作（恢复后仍需手动删除 `.swp`） |
| `D` | 删除交换文件（确认其无用时常用） |
| `Q` | 退出本次编辑 |
| `A` | 中止本次编辑 |

> [!tip] 后台挂起 vim
> 在一般指令模式下按 `Ctrl`+`z` 可把 vim 挂到后台，回到 shell；用 `fg` / `jobs` 调回。这是模拟"中断"或临时退出编辑的常用手段。

## 9.3 vim 的额外功能

`vim` 相对 `vi` 增加的核心功能：语法高亮、块选择、多文件编辑、多窗口、关键字补全、环境配置。

![[vbird-71f4a0acf541068e.webp]]
*图：vim 用颜色高亮语法（注释行、关键字等区分显示）*

### 9.3.1 块选择（Visual Block）

按 `v` / `V` / `Ctrl`+`v` 进入可视模式：

| 按键 | 选择方式 |
|---|---|
| `v` | 按字符选择 |
| `V` | 按行选择 |
| `Ctrl`+`v` | 按矩形块选择 |
| `y` / `d` / `p` | 复制 / 删除 / 粘贴选区 |

![[vbird-ef3caf05ed111a2e.webp]]
*图：vim 块选择示意*

块选择适合对齐文本的批量操作——例如一次给多行的同一列加注释、复制一段列。

### 9.3.2 多文件编辑

一个 vim 同时打开多个文件：`vim file1 file2`。常用命令：

| 按键 | 作用 |
|---|---|
| `:n` | 切到下一个文件 |
| `:N` | 切到上一个文件 |
| `:files` | 列出当前打开的所有文件 |

跨文件复制时，用 `:n` / `:N` 切换缓冲区，复制的行直接 `p` 到另一文件，避免用鼠标导致 Tab 被转成空格。

### 9.3.3 多窗口（分割）

`:sp [filename]` 把窗口水平分割；不带文件名则两个窗口显示同一文件（同步滚动，便于对照）。

| 按键 | 作用 |
|---|---|
| `:sp [filename]` | 上下分割窗口 |
| `Ctrl`+`w` 然后 `j` / `↓` | 光标移到下方窗口 |
| `Ctrl`+`w` 然后 `k` / `↑` | 光标移到上方窗口 |
| `Ctrl`+`w` 然后 `q` | 关闭当前窗口（等同 `:q`） |

![[vbird-cb80f4c627428421.webp]]
*图：vim 窗口分割*

### 9.3.4 关键字补全

`vim` 支持基于上下文的关键字补全：

| 按键 | 补全来源 |
|---|---|
| `Ctrl`+`x` `Ctrl`+`n` | 当前文件已出现的文字 |
| `Ctrl`+`x` `Ctrl`+`f` | 当前目录下的文件名 |
| `Ctrl`+`x` `Ctrl`+`o` | 按扩展名调用语法关键字（Omni completion） |

使用第三种时，文件扩展名须正确（如 `.html`、`.c`、`.py`），否则 vim 不会调用对应语法。现代 vim/Neovim 通过 LSP 可获得更强的补全体验（见文末）。

![[vbird-079247b425135d3f.webp]]
*图：vim 关键字补全*

### 9.3.5 环境配置：~/.vimrc 与 ~/.viminfo

`vim` 会把编辑历史（搜索高亮、上次光标位置等）记到 `~/.viminfo`，所以再次打开同一文件时光标会停在上次离开的行。

环境参数可写入配置文件 `~/.vimrc`（用户级，默认不存在需自建；系统级 `/etc/vimrc` 不建议改动）。常用项：

| 参数 | 作用 |
|---|---|
| `set nu` / `set nonu` | 显示 / 取消行号 |
| `set hlsearch` / `set nohlsearch` | 搜索高亮开 / 关 |
| `set autoindent` | 自动缩进 |
| `set backup` | 保存时生成 `filename~` 备份 |
| `set ruler` | 右下角显示光标位置 |
| `set showmode` | 左下角显示当前模式 |
| `set backspace=2` | 允许退格键删除任意字符 |
| `syntax on` / `syntax off` | 语法高亮开 / 关 |
| `set bg=dark` / `set bg=light` | 配色基调 |

示例 `~/.vimrc`：

```vim
" 双引号为注释
set hlsearch
set backspace=2
set autoindent
set ruler
set showmode
set nu
syntax on
```

> [!tip] 配置文件中冒号可省
> `~/.vimrc` 中写 `set hlsearch` 与 `:set hlsearch` 效果相同；注释用双引号 `"`，不要误用 `#`。

### 9.3.6 vim 常用按键速查图

![[vbird-6f83fdba1c909f12.webp]]
*图：vim 常用按键速查*

## 9.4 其他注意事项

### 9.4.1 编码问题

乱码几乎都源于编码不一致。能否正确显示取决于四点：系统 locale（`/etc/locale.conf`）、终端的 `LANG`/`LC_ALL`、文件原始编码、终端程序本身的编码设置——只要**文件编码与终端编码一致**，就能正常显示。

> [!note] 当前默认：UTF-8
> Rocky/AlmaLinux 9 默认 locale 为 `zh_CN.UTF-8` 或 `en_US.UTF-8`，文件默认 UTF-8。Big5 已基本退出大陆环境；GB18030 是大陆强制标准，UTF-8 是互联网与 Linux 默认。新文件一律用 UTF-8 即可避免绝大多数乱码。

### 9.4.2 DOS 与 Linux 的换行符

Windows（DOS）换行为 `CR+LF`（`^M$`），Linux 为 `LF`（`$`）。Shell 脚本若带 `^M` 可能无法执行。用 `dos2unix` / `unix2dos` 转换（RHEL 9 需 `dnf install dos2unix`）：

```bash
$ dos2unix [-kn] file [newfile]    # DOS → Unix
$ unix2dos [-kn] file [newfile]    # Unix → DOS
# -k  保留原 mtime
# -n  保留原文件，输出到新文件：dos2unix -n old new
```

> [!warning] 跨系统拷贝脚本务必先转换
> 在 Windows 编辑的脚本上传到 Linux 前，或反向复制纯文本时，记得用这两个工具统一换行符，否则脚本可能因 `^M` 报错。

### 9.4.3 编码转换：iconv

`iconv` 在不同文本编码间转换：

```bash
$ iconv --list                              # 列出支持的编码
$ iconv -f 原编码 -t 新编码 filename [-o newfile]
```

示例（Big5 → UTF-8）：

```bash
$ iconv -f big5 -t utf8 vi.big5 -o vi.utf8
$ file vi.utf8
vi.utf8: UTF-8 Unicode text
```

> [!note] 繁简转换 ≠ 编码转换
> 繁体 UTF-8 与简体 UTF-8 的差异在用字（如「程式」vs「程序」），需用专门的简繁转换工具（如 OpenCC），`iconv` 只能转码、不能转字形。

## 9.5 vim 9 与 Neovim

> [!info] 现代化进展
> 截至 2026 年，Vim 主线为 **9.x**：9.0（2022 年）引入 **Vim9 脚本**语言，执行速度大幅提升；9.1（2024 年）、9.2 相继发布。**Neovim** 是 Vim 的现代化分支，内置 LSP 客户端、Tree-sitter 高亮、异步插件等，是当前许多开发者的主力编辑器。两者按键与操作习惯基本兼容，本章内容在两者中通用。
>
> Rocky/AlmaLinux 9 仓库默认提供 `vim-enhanced`（**Vim 8.2**），Vim 9.x 需源码编译或通过第三方仓库安装；RHEL 10 起默认提供 Vim 9.x。Neovim 可 `dnf install neovim`（可能需启用 EPEL 仓库）。

## 9.6 重点回顾

- Linux 配置文件多为纯文本，`vim` 是通用编辑工具；
- `vim` 既是文本编辑器也是程序编辑器（语法高亮、辅助排错）；
- 三种模式：一般指令模式、编辑模式、命令行模式；编辑模式与命令行模式之间不能直接切换，须先按 `Esc`；
- 数字前缀表示重复次数（`5yy` 复制 5 行、`20j` 下移 20 行）；
- `G` / `gg` 跳到文件末 / 首；`0` / `$` 跳到行首 / 尾；
- 替换命令：`:n1,n2s/old/new/g`、`:1,$s/old/new/gc`；
- `u` 撤销、`Ctrl`+`r` 重做、`.` 重复上一动作；
- 进入编辑模式只需记住 `i`、`o`、`R`；
- `vim` 自动生成 `.swp` 交换文件，崩溃后可用 `vim -r` 或 `:recover` 恢复；
- `Ctrl`+`v` 块选择、`:sp` 分割窗口、`Ctrl`+`x` `Ctrl`+`o` 关键字补全；
- 环境配置写入 `~/.vimrc`；编码转换用 `iconv`、换行符转换用 `dos2unix` / `unix2dos`。

## 延伸阅读

- [Vim — Wikipedia](https://en.wikipedia.org/wiki/Vim_(text_editor))
- [Vim 官方站点](https://www.vim.org/)
- [Vim 在线帮助](https://vimhelp.org/)
- [Neovim — Wikipedia](https://en.wikipedia.org/wiki/Vim_(text_editor)#Forks)
- [dos2unix — Wikipedia](https://en.wikipedia.org/wiki/Unix2dos)
- [iconv — Wikipedia](https://en.wikipedia.org/wiki/Iconv)

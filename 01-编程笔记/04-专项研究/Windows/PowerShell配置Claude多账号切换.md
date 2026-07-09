---
分类:
  - "[[Windows]]"
关联笔记:
描述: 通过 PowerShell 函数模拟 bash 的命令级环境变量前置，实现 claude / claude-a / claude-b 多账号切换。
排序:
分组:
创建时间: 2026年07月01日
---
# PowerShell配置Claude多账号切换

## 需求背景

在 WSL/bash 里，习惯用这样的函数管理多个 Claude 账号：

```bash
claude-a() { CLAUDE_PROFILE=a ANTHROPIC_AUTH_TOKEN="xxx" claude "$@"; }
claude-b() { CLAUDE_PROFILE=b ANTHROPIC_AUTH_TOKEN="yyy" claude "$@"; }
```

bash 的关键能力是 **`VAR=val cmd`**——变量只在 `cmd` 这次执行期间生效，命令结束自动消失，不会污染当前 shell。希望在 Windows 的 PowerShell 里实现同样效果，并且让直接输入 `claude` 默认走 a 账号。

## 三个关键原理

### 1. PowerShell 没有「命令级变量前置」，用 `$env:` + try/finally 模拟

bash 的 `VAR=val cmd` 是一条语句、单次生效；PowerShell **没有等价语法**，`$env:VAR = "x"` 会写入**当前会话**。所以要用 `try/finally` 在命令结束后手动清除变量，模拟「单次」效果：

```powershell
function claude-b {
    $env:CLAUDE_PROFILE = "b"
    $env:ANTHROPIC_AUTH_TOKEN = "yyy"
    try {
        claude @args
    } finally {
        Remove-Item Env:CLAUDE_PROFILE -ErrorAction SilentlyContinue
        Remove-Item Env:ANTHROPIC_AUTH_TOKEN -ErrorAction SilentlyContinue
    }
}
```

- `finally` 块**无论正常退出还是异常（Ctrl+C）都会执行**，保证环境变量一定被清理。
- `Remove-Item ... -ErrorAction SilentlyContinue` 避免变量不存在时报错。

### 2. `@args` 透传所有参数

PowerShell 的 `@args` 等价于 bash 的 `"$@"`，把调用者传进来的所有参数原样转给真实命令。这样 `claude-b --resume`、`claude -p "xxx"` 都能正常工作。

### 3. 让 `claude` 默认走 a：用 `$script:` 缓存真实路径，避免函数递归

要覆盖 `claude` 这个命令名，就得定义一个**同名函数**。但函数体内若再写 `claude`，就会**无限递归调用自己**。

解决办法：在 profile 加载阶段（此时还没定义同名函数）先用 `Get-Command` 解析出真实 claude 的完整路径，缓存到 `$script:RealClaudePath`，之后函数体用 `&` 调用该路径而非命令名：

```powershell
# 在定义同名函数之前，先缓存真实可执行文件路径
$script:RealClaudePath = (Get-Command claude -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1).Source
if (-not $script:RealClaudePath) { $script:RealClaudePath = "D:\nvm-nodejs\claude.ps1" }

function claude {
    $env:CLAUDE_PROFILE = "a"
    $env:ANTHROPIC_AUTH_TOKEN = "xxx"
    try {
        & $script:RealClaudePath @args   # 用路径调用，不会递归
    } finally {
        Remove-Item Env:CLAUDE_PROFILE -ErrorAction SilentlyContinue
        Remove-Item Env:ANTHROPIC_AUTH_TOKEN -ErrorAction SilentlyContinue
    }
}
```

关键点：
- **顺序很重要**：`Get-Command` 必须在定义同名函数**之前**执行，否则它会解析到函数本身而非真实程序。
- `-CommandType Application` 限定只找应用程序/可执行文件，跳过函数和别名。
- `$script:` 作用域让变量在 profile 整个会话内可见，各函数都能引用。

## 完整 profile 配置

写入 `$PROFILE`（PowerShell 7 路径：`C:\Users\<用户名>\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`）：

```powershell
# ===== Claude 多账号切换函数 =====
$script:RealClaudePath = (Get-Command claude -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1).Source
if (-not $script:RealClaudePath) { $script:RealClaudePath = "D:\nvm-nodejs\claude.ps1" }

# 默认走 a 账号：直接输入 claude 即可
function claude {
    $env:CLAUDE_PROFILE = "a"
    $env:ANTHROPIC_AUTH_TOKEN = "<token-a>"
    try {
        & $script:RealClaudePath @args
    } finally {
        Remove-Item Env:CLAUDE_PROFILE -ErrorAction SilentlyContinue
        Remove-Item Env:ANTHROPIC_AUTH_TOKEN -ErrorAction SilentlyContinue
    }
}

# 显式指定 a 账号（与默认 claude 等价）
function claude-a {
    $env:CLAUDE_PROFILE = "a"
    $env:ANTHROPIC_AUTH_TOKEN = "<token-a>"
    try {
        & $script:RealClaudePath @args
    } finally {
        Remove-Item Env:CLAUDE_PROFILE -ErrorAction SilentlyContinue
        Remove-Item Env:ANTHROPIC_AUTH_TOKEN -ErrorAction SilentlyContinue
    }
}

# 切换到 b 账号
function claude-b {
    $env:CLAUDE_PROFILE = "b"
    $env:ANTHROPIC_AUTH_TOKEN = "<token-b>"
    try {
        & $script:RealClaudePath @args
    } finally {
        Remove-Item Env:CLAUDE_PROFILE -ErrorAction SilentlyContinue
        Remove-Item Env:ANTHROPIC_AUTH_TOKEN -ErrorAction SilentlyContinue
    }
}
```

## 使用方式

| 命令 | 走的账号 |
| --- | --- |
| `claude` | a（默认） |
| `claude-a` | a |
| `claude-b` | b |

参数正常透传，如 `claude --resume`、`claude-b -p "xxx"`。修改 profile 后**新开窗口**生效，或在当前窗口执行 `. $PROFILE` 重新加载。

## bash 与 PowerShell 对照

| 能力 | bash | PowerShell |
| --- | --- | --- |
| 单次命令前置变量 | `VAR=val cmd`（语法原生支持） | 无等价语法，需 `$env:` + `try/finally` 手动清理 |
| 函数定义 | `name() { ... }` | `function name { ... }` |
| 透传所有参数 | `"$@"` | `@args` |
| 同名命令覆盖 | 直接定义同名函数，用 `command cmd` 或绝对路径调真实程序 | 定义同名函数前缓存真实路径，用 `& $path` 调用 |

---
描述: WSL (Ubuntu 26.04) 内已安装软件清单与开发环境版本
排序:
分组:
分类: "[[wsl]]"
创建时间: 2026年08月19日
---
# 本机WSL环境

> [!note] 扫描思路（供后续 agent 维护本表参考）
> 比 Windows 侧简单，两条渠道交叉即可：
>
> 1. **命令路径探测**：`command -v <cmd>` 扫 PATH，版本各自 `-v/--version` 取。apt 装的在 `/usr/bin`，用户级工具在 `~/.local/bin` / `~/.nvm` / `~/bin`。
> 2. **apt 清单兜底**：`dpkg -l` 交叉核对漏项。
>
> 维护规则：新软件默认直接补进对应分类，不必逐个确认。

## 系统概览

| 项目 | 值 |
|---|---|
| 发行版 | Ubuntu 26.04 LTS (resolute) |
| 内核 | 6.18.33.2-microsoft-standard-WSL2（宿主 WSL 2.7.10.0） |
| 用户 / Shell | luguosong（默认用户）/ bash |
| systemd | 已启用（`/etc/wsl.conf` `[boot] systemd=true`），docker、cron 等以服务运行 |
| 资源 | 32 核 / 15G 内存（未配 `.wslconfig` 限额）；虚拟磁盘 1T，已用 68G |
| 时区 / Locale | Asia/Shanghai；C.UTF-8 |

## 开发环境版本

当前主力开发环境（截至 2026-08-19 全量扫描）：

| 环境 | 版本 | 说明 |
|---|---|---|
| JDK | OpenJDK 21.0.12（LTS） | apt 安装，`/usr/bin/java`；未设 `JAVA_HOME` |
| Node.js | 24.19.0（nvm for Linux 管理） | `~/.nvm/versions/node/v24.19.0`；npm 11.17.0 |
| pnpm | 11.22.0 | 首选包管理器，随 node 版本走 |
| Python | 3.14.4 | 系统自带 + apt；pip 25.1.1，全局 `break-system-packages=true` |
| Maven | 3.9.12 | apt 安装，`/usr/share/maven`；`~/.m2` 无 settings.xml（用中央仓库） |
| Docker | 引擎 29.7.2 | **原生 docker-ce 装在 WSL 内**（systemd 服务），非 Docker Desktop 集成，与 Windows 侧 Desktop 相互独立 |
| GCC / Make | 15.2.0 / 4.4.1 | build-essential，C/C++ 编译 |
| Git | 2.53.0 | `core.autocrlf=input`；user 与 Windows 侧一致 |
| gh | 2.46.0 | GitHub CLI，apt 安装 |

## 已安装

### AI 编程助手

| 软件 | 说明 | 安装位置 |
|---|---|---|
| Claude Code | AI 编程 CLI，当前 2.1.235 | `~/.local/bin/claude`（native 安装，版本在 `~/.local/share/claude`） |
| rtk | token 优化代理，自动改写 Claude Code 命令省 token | `~/.local/bin` |

### CLI 与终端

| 软件 | 说明 | 安装位置 |
|---|---|---|
| git / gh | 版本控制 + GitHub CLI | `/usr/bin` |
| jq | JSON 命令行处理 | `/usr/bin` |
| vim | 文本编辑器 9.1 | `/usr/bin` |
| tmux | 终端复用 3.6 | `/usr/bin` |
| jdtls | Eclipse JDT Language Server（Java LSP） | `~/.local/bin` |
| ossutil | 阿里云 OSS 命令行工具 | `~/bin` |

### Python 工具（pip 用户级）

| 软件 | 说明 | 安装位置 |
|---|---|---|
| pytest | 测试框架 | `~/.local/bin` |
| httpx | HTTP 客户端 CLI | `~/.local/bin` |

### 构建与容器

| 软件 | 说明 | 安装位置 |
|---|---|---|
| docker-ce + containerd | 原生容器引擎，systemd 托管 | `/usr/bin`，socket `/var/run/docker.sock` |
| build-essential | gcc / g++ / make 编译链 | `/usr/bin` |

## 换源情况

- apt：官方源 `archive.ubuntu.com`（未换国内镜像）
- npm / pnpm registry：官方 `registry.npmjs.org`（未换镜像）
- Maven：默认中央仓库（无 `~/.m2/settings.xml`）

## 未安装

按需补装，无排期。

| 软件 | 说明 |
|---|---|
| Rust / Go | 无相关项目，需要时 rustup / apt 装 |
| Gradle | Java 备选构建，需要时 SDKMAN 管理 |
| SDKMAN | 多版本 JDK / Gradle 管理（Windows 侧待装清单同款） |
| zsh / starship / fzf 等 | 终端增强，bash + tmux 目前够用 |
| kubectl / cmake / lazygit | 暂无场景 |

## 与 Windows 侧的关系

- 代码与笔记在 Windows 盘（`/mnt/e/...`），通过 9P 挂载访问，IO 慢——项目级工作建议克隆进 WSL 原生文件系统。
- Windows 侧已装 Docker Desktop（引擎 29.6.1）；本 WSL 内是独立原生 docker-ce（29.7.2），两者不共享镜像与容器。
- 版本对齐：JDK 21 / Node 24 / Python 3.14 / Maven 3.9，与 [[本机环境]] 基本同代，跨端开发无缝切换。

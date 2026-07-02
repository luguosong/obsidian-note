---
分类:
  - "[[Windows]]"
关联笔记:
描述:
排序:
分组:
创建时间: 2026年07月01日
---
# Windows开发环境概览

本机开发环境的基本安装情况，包括各工具的版本、安装位置与关键环境变量。所有版本信息截至 **2026年07月01日**。

> [!info] 系统信息
> - **操作系统**：Microsoft Windows 11 家庭中文版（10.0.26200）
> - **用户目录**：`C:\Users\10545`

## 工具一览表

> 版本信息截至 **2026年07月01日**。「最新版」列为同期官方发布的最新稳定版，便于日后比对是否需要升级。

| 工具 | 当前版本 | 最新稳定版 | 安装位置 | 官网 / 下载地址 |
| --- | --- | --- | --- | --- |
| Git | 2.55.0 | 2.55.0 ✅ | `D:\Git` | https://git-scm.com/download/win |
| Node.js | v24.18.0 (LTS) | v24.18.0 (Krypton) ✅ | `D:\nvm\nodejs` → `D:\nvm\v24.18.0` | https://nodejs.org |
| npm | 11.16.0 | — | 随 Node 安装 | 随 Node |
| nvm-windows | — | 1.2.2 | `D:\nvm` | https://github.com/coreybutler/nvm-windows/releases |
| Python | 3.13.7 | 3.14.6 ⚠️ | `D:\Python` | https://www.python.org/downloads |
| pip | 26.1 | — | 随 Python 安装 | 随 Python |
| uv | 0.11.26 | 0.11.26 ✅ | `C:\Users\10545\.local\bin` | https://docs.astral.sh/uv |
| Java (JDK) | 21.0.11 (LTS) | — | `C:\Users\10545\.jdks\ms-21.0.11` | https://learn.microsoft.com/java/openjdk |
| Maven | 3.9.16 | 3.9.16 ✅ | `D:\apache-maven-3.9.16` | https://maven.apache.org/download.cgi |
| Docker | 29.2.1 | — | `C:\Program Files\Docker\Docker` | https://www.docker.com/products/docker-desktop |
| SVN (TortoiseSVN) | 1.14.5 | 1.14.9 ⚠️ | `D:\TortoiseSVN` | https://tortoisesvn.net/downloads.html |

## Git

```
版本：git version 2.55.0.windows.1
安装位置：D:\Git
```

- 全局配置文件位于 `C:\Users\10545\.gitconfig`，安装级配置在 `D:\Git\etc\gitconfig`。
- 升级方式：重新运行 [Git for Windows](https://git-scm.com/download/win) 安装包覆盖安装，或在新版终端执行 `winget upgrade --id Git.Git`（依赖 winget 源同步）。

## Node.js 与 nvm

```
版本：v24.18.0 (LTS Krypton)
安装位置：D:\nvm-nodejs（符号链接）→ D:\nvm\v24.18.0
nvm 配置：D:\nvm\settings.txt
```

- 通过 **nvm-windows** 管理多版本，根目录 `D:\nvm`，符号链接 `D:\nvm-nodejs` 指向当前激活版本。
- 切换版本需在**交互式终端**（CMD / PowerShell）执行：

```powershell
nvm list              # 查看已安装版本
nvm install 24.18.0   # 安装指定版本
nvm use 24.18.0       # 切换版本
```

> [!warning] nvm 必须在交互式终端运行
> nvm-windows 会在非交互式 shell（如自动化脚本、Git Bash 非交互调用）中静默失败并弹窗提示。所有 `nvm` 命令都应在真实的 CMD / PowerShell 窗口内执行。

## Python

```
版本：Python 3.13.7
安装位置：D:\Python
pip：26.1
```

- 单一安装于 `D:\Python`，对应的 Scripts 目录为 `D:\Python\Scripts`。
- 包管理可选用 [[uv]]（推荐，极快）或 `pip`。

> [!tip] WindowsApps 的 python 存根（已修复）
> `C:\Users\10545\AppData\Local\Microsoft\WindowsApps\python.exe` 原本是应用商店的重定向存根（指向 `AppInstallerPythonRedirector.exe`），并非真实 Python，会在 PATH 中抢占 `python` 命令并弹出应用商店。
>
> 已于 **设置 → 应用 → 高级应用设置 → 应用执行别名** 中关闭 `python.exe` / `python3.exe`，存根被删除。现在 `where python` 直接指向 `D:\Python\python.exe`，无干扰。

## uv

```
版本：0.11.26
安装位置：C:\Users\10545\.local\bin
```

- 采用 standalone 独立安装（不依赖某个 Python 版本），官方推荐方式。
- 自更新命令：`uv self update`（走 GitHub API，可能触发限流，必要时直接下载 [release 二进制](https://github.com/astral-sh/uv/releases) 替换）。

## Java

```
版本：OpenJDK 21.0.11 (LTS)
安装位置：C:\Users\10545\.jdks\ms-21.0.11
环境变量：JAVA_HOME = C:\Users\10545\.jdks\ms-21.0.11
```

- 采用 Microsoft Build of OpenJDK，通过 IDEA 的 `.jdks` 目录管理。
- `.jdks` 下应只保留当前使用的 JDK，旧版本残留会占用大量空间（每个约 300MB）。

## Maven

```
版本：Apache Maven 3.9.16
安装位置：D:\apache-maven-3.9.16
环境变量：MAVEN_HOME = D:\apache-maven-3.9.16
```

- 本地仓库与镜像配置在 `D:\apache-maven-3.9.16\conf\settings.xml`。

> [!tip] 升级 Maven 步骤
> 1. 下载新版 `apache-maven-x.x.x-bin.zip`，解压到 `D:\` 下。
> 2. 以管理员身份更新系统环境变量：`MAVEN_HOME` 指向新目录，PATH 中的 `\bin` 路径同步替换。
> 3. 重开终端，`mvn -v` 确认版本后再删除旧目录。

## Docker

```
版本：Docker version 29.2.1
安装位置：C:\Program Files\Docker\Docker
```

- 通过 **Docker Desktop** 提供，使用前需先启动 Docker Desktop（守护进程默认未运行）。

## SVN

```
命令行版本：svn 1.14.5 (TortoiseSVN 附带)
安装位置：D:\TortoiseSVN
```

- 通过 **TortoiseSVN** 提供完整的 SVN 客户端能力，包含两部分：
  - **图形界面**：`TortoiseProc.exe`（资源管理器右键集成，日常提交 / 更新 / 解决冲突最常用）。
  - **命令行客户端**：`D:\TortoiseSVN\bin\svn.exe`（终端执行 `svn` 命令，版本 1.14.5）。
- 常用 GUI 辅助工具：`TortoiseMerge.exe`（差异比对 / 合并）、`TortoiseBlame.exe`（追溯修改历史）、`SubWCRev.exe`（替换文件中的版本号宏）。
- 命令行版本会随 TortoiseSVN 安装，**安装时需勾选 "command line client tools"** 才会部署 `svn.exe`。
- Git 已经是主流，SVN 主要用于维护一些历史遗留仓库。

> [!tip] 升级方式
> 重新运行 [TortoiseSVN 安装包](https://tortoisesvn.net/downloads.html) 覆盖安装即可，会保留已有的右键菜单与关联配置。

## 关键环境变量

| 变量 | 值 | 级别 |
| --- | --- | --- |
| `JAVA_HOME` | `C:\Users\10545\.jdks\ms-21.0.11` | 系统 |
| `MAVEN_HOME` | `D:\apache-maven-3.9.16` | 系统 |
| `NVM_HOME` | `D:\nvm` | 系统 |
| `NVM_SYMLINK` | `D:\nvm-nodejs` | 系统 |

> [!note] 修改环境变量后需重开终端
> 修改系统级环境变量（`MAVEN_HOME`、`Path` 等）后，已打开的终端窗口不会自动刷新，需关闭重开才能生效。

## 维护建议

- **定期清理旧版本**：JDK、Node（nvm）等工具升级后，旧版本目录若不再使用应及时删除，避免占用磁盘空间。
- **避免重复安装**：同一工具（如 uv）只保留一种安装方式，防止 PATH 中多份冲突。
- **PATH 顺序敏感**：当存在多个同名可执行文件时，PATH 中靠前的路径优先级更高，配置时需留意先后顺序。

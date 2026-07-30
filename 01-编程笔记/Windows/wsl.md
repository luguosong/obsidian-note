---
描述:
排序:
分组:
创建时间: 2026年07月22日
---
# wsl

## 安装和初始化配置

### 安装

```shell
# 查看可安装版本
wsl --list --online

# 安装指定发行版
wsl --install -d <发行版名称>

# 查看已安装发行版
wsl --list --verbose

# 进入指定虚拟机
wsl -d Ubuntu

# 设置默认发行版
wsl --set-default Ubuntu-22.04
wsl # 直接进入默认虚拟机

```

将wsl移动到指定硬盘：

```shell
# 3.1 正常安装到默认路径后关闭
wsl --shutdown

# 3.2 导出
wsl --export Ubuntu-22.04 D:\WSL\Ubuntu-22.04.tar

# 3.3 卸载默认路径版本
wsl --unregister Ubuntu-22.04

# 3.4 导入到目标磁盘
wsl --import Ubuntu-22.04 D:\WSL\Ubuntu-22.04 D:\WSL\Ubuntu-22.04.tar --version 2

# 3.5(import方式默认root登录,需手动建普通用户)
wsl -d Ubuntu-22.04 -u root useradd -m -s /bin/bash <username>
wsl -d Ubuntu-22.04 -u root passwd <username>
```


### 首次设置root用户密码

标准安装流程只会引导创建普通用户并设其密码,root 账户默认没有设置密码

```shell
# 进入 WSL 后,普通用户执行,首次初始化root用户密码
sudo passwd root
```

### 卸载wsl发行版

```shell
# 卸载指定发行版(数据一并删除,不可恢复)
wsl --unregister Ubuntu-22.04
```

## 配置网络模式

| 模式 | 关键字 | 支持版本 | 特点 |
|---|---|---|---|
| NAT（默认） | `nat` | 所有版本 | WSL 独立内网 IP，需 portproxy 才能外部访问 |
| 镜像模式 | `mirrored` | Win11 22H2+ | 共享宿主机网卡和 IP，端口直通 |
| 虚拟交换机/桥接（实验性） | 需自建 Hyper-V 外部交换机 | 需手动配置 | WSL 拿到独立局域网 IP，类似虚拟机桥接 |

三种模式中，镜像和桥接通过 `.wslconfig` 配置。该文件位于 Windows 用户主目录：`C:\Users\10545\.wslconfig`（等价于 `%UserProfile%\.wslconfig`，在资源管理器地址栏输入 `%UserProfile%` 可直达；文件默认不存在，需手动新建）。改完执行 `wsl --shutdown` 重启 WSL 生效。NAT 是默认模式，无需该文件。

### NAT 模式（默认）

开箱即用，宿主机用 `localhost` 即可访问 WSL 服务。要让局域网其它机器访问，用 `netsh` 转发端口：

```shell
# WSL 内网 IP（每次重启都会变）
wsl hostname -I
# 将宿主机 4000 端口转发到 WSL 的 4000，对外监听所有网卡
netsh interface portproxy add v4tov4 listenport=4000 listenaddress=0.0.0.0 connectport=4000 connectaddress=<WSL_IP>
```

### 镜像模式（mirrored）

Win11 22H2+。把宿主机网卡镜像进 Linux，共享 IP、端口直通，宿主机与 WSL 直接用 `127.0.0.1` 互通，无需端口转发。

```ini
[wsl2]
networkingMode=mirrored
```

```shell
wsl --shutdown   # 改完重启生效
```

### 桥接模式（bridged，已废弃）

> [!warning] 自 WSL 2.4.5 起已废弃，推荐用镜像模式。需先在 Hyper-V 建外部虚拟交换机，WSL 才能从物理网络拿到独立 IP（类似虚拟机桥接）。

```ini
[wsl2]
networkingMode=bridged
```

> [!note] 参考文档
> - [Accessing network applications with WSL — Microsoft Learn](https://learn.microsoft.com/en-us/windows/wsl/networking)
> - [Advanced settings configuration in WSL — Microsoft Learn](https://learn.microsoft.com/en-us/windows/wsl/wsl-config)

## 更新WSL

```shell
# 查看当前版本
wsl --version

# 更新
wsl --update
```


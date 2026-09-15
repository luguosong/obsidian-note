---
描述: 用 wsl --manage --move 一条命令把发行版从 C 盘搬到 D 盘，含搬前备份与旧版兼容方案
排序:
分组:
分类: "[[wsl]]"
创建时间: 2026年09月01日
---
# WSL搬家

**新版 WSL 已经支持直接移动发行版**：`wsl --manage <发行版> --move <新位置>` 一条命令搞定，不需要再用以前的 `export → unregister → import` 绕一圈（见 [WSL 2.3.11 · Discussion #11789](https://github.com/microsoft/WSL/discussions/11789)）。

## 推荐做法

假设你的发行版是 `Ubuntu`，准备搬到 `D:\WSL\Ubuntu`。

先用 **PowerShell** 查看实际发行版名称：

```powershell
wsl -l -v
```

例如：

```text
  NAME      STATE     VERSION
* Ubuntu    Running   2
```

然后关闭 WSL：

```powershell
wsl --shutdown
```

执行搬家：

```powershell
wsl --manage Ubuntu --move "D:\WSL\Ubuntu"
```

完成后启动：

```powershell
wsl -d Ubuntu
```

整个过程相当于：

```text
C盘
└─ AppData\Local\...\ext4.vhdx
          │
          ▼
D盘
└─ WSL
   └─ Ubuntu
      └─ ext4.vhdx
```

你的 `/home`、软件、Docker 环境、配置等都会一起过去，不需要重装。

## 搬之前建议备份

由于 WSL 的 `--move` 在部分版本中出现过权限 / 磁盘移动相关问题（见 [Issue #40716](https://github.com/Microsoft/WSL/issues/40716)），重要环境建议先做一次备份。

```powershell
wsl --shutdown

wsl --export Ubuntu "D:\WSL\ubuntu-backup.tar"
```

然后再执行搬家：

```powershell
wsl --manage Ubuntu --move "D:\WSL\Ubuntu"
```

确认 Ubuntu 能正常启动后，再删除备份文件 `D:\WSL\ubuntu-backup.tar`。

## 如果提示不认识 --manage / --move

先升级 WSL：

```powershell
wsl --update
wsl --shutdown
```

查看版本：

```powershell
wsl --version
```

微软官方仍然支持 `--export` / `--import` 方案作为兼容方式（见 [WSL 的基本命令 · Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/wsl/basic-commands)）。

> [!warning] 不要手动剪切 ext4.vhdx
> WSL 还保存了发行版磁盘位置等注册信息，直接把 `AppData` 里的 `ext4.vhdx` 剪切到 D 盘，容易导致发行版无法启动。

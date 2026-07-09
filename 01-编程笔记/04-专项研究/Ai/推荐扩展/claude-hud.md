---
排序: 2750
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[claude-hud README]]"
描述: Claude Code 状态栏插件，在输入框下方实时显示上下文用量、工具活动、子智能体状态与待办进度。
分组: 状态可视化
创建时间: 2026年06月26日
---
# claude-hud

Claude Code 状态栏插件，在输入框下方实时显示**上下文用量、正在使用的工具、正在运行的子智能体、待办事项进度**——始终可见，无需切换面板。

## 安装

```
/plugin marketplace add jarrodwatts/claude-hud
/plugin install claude-hud
/claude-hud:setup
```

> Linux 需 `TMPDIR=~/.cache/tmp claude`；Windows 缺 Node.js 时先装 Node.js LTS。装完 `/reload-plugins` 并重启。

## 使用

`/claude-hud:setup` 后重启，状态栏即出现 HUD。命令：

| 命令 | 作用 |
| --- | --- |
| `/claude-hud:setup` | 首次配置，写入 statusLine |
| `/claude-hud:configure` | 引导式自定义：预设（Full/Essential/Minimal）、布局、各元素开关，保存前可预览 |

## 相关

- 完整说明：[[claude-hud README]]

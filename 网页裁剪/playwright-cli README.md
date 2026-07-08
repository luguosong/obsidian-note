---
分类:
  - "网页裁剪"
标题: "用于常见 Playwright 操作的命令行界面(CLI)：录制并生成代码、检查选择器并截屏"
描述: "面向编码智能体(coding agent)的 Playwright 命令行界面(CLI)，以技能(Skill)工作流替代 MCP，在有限上下文窗口内更节省词元(token)。"
来源: "https://github.com/microsoft/playwright-cli"
发布者: "GitHub-microsoft"
发布时间:
创建时间: "2026-07-03T17:42:50+08:00"
---

## playwright-cli

带有技能(Skill)的 Playwright 命令行界面(CLI)

### Playwright 命令行界面(CLI)与 Playwright MCP 的对比

本软件包提供了 Playwright 的命令行界面(CLI)。如果你使用的是**编码智能体(coding agent)**，那么它是最佳选择。

- **命令行(CLI)**：现代**编码智能体(coding agent)**越来越倾向于使用以技能(Skill)形式暴露的、基于命令行(CLI)的工作流，而非 MCP，因为命令行(CLI)调用更节省词元(token)：它避免了将庞大的工具模式(schema)和冗长的可访问性树(accessibility tree)加载进模型上下文，使智能体能够通过简洁、专用的命令执行操作。这使得「命令行(CLI) + 技能(Skill)」更适合高吞吐量的编码智能体——它们必须在有限的上下文窗口内平衡浏览器自动化、大型代码库、测试与推理。
- **MCP**：对于受益于持久状态、丰富的内省(introspection)以及对页面结构进行迭代推理的专用智能体(agent)循环而言，MCP 仍然有其价值——例如探索性自动化、自愈式(self-healing)测试，或长时间运行的自主工作流，在这些场景下，维持连续的浏览器上下文比词元(token)成本更重要。了解更多关于 [Playwright MCP](https://github.com/microsoft/playwright-mcp) 的信息。

### 核心特性

- **节省词元(token)**。不会强制将页面数据塞入大语言模型(LLM)。

### 环境要求

- Node.js 18 或更新版本
- Claude Code、GitHub Copilot 或任何其他编码智能体(coding agent)。

## 快速开始

## 安装

```text
npm install -g @playwright/cli@latest
playwright-cli --help
```

### 安装技能(Skill)

Claude Code、GitHub Copilot 等工具会使用本地安装的技能(Skill)。

```text
playwright-cli install --skills
```

### 无技能(Skill)模式运行

将你的智能体(agent)指向该命令行(CLI)，让它自行运作。它会自动从 `playwright-cli --help` 读取技能(Skill)：

```text
使用 playwright-cli 测试 https://demo.playwright.dev/todomvc 上的"添加待办"流程。
运行 playwright-cli --help 查看可用命令。
```

## 演示

```bash
> 使用 playwright 技能(skill)测试 https://demo.playwright.dev/todomvc/。
  为所有成功和失败的场景截图。
```

你的智能体(agent)会运行各种命令，但这并不意味着你不能手动操作它：

```text
playwright-cli open https://demo.playwright.dev/todomvc/ --headed
playwright-cli type "Buy groceries"
playwright-cli press Enter
playwright-cli type "Water flowers"
playwright-cli press Enter
playwright-cli check e21
playwright-cli check e35
playwright-cli screenshot
```

## 有头模式(Headed)运行

Playwright 命令行(CLI)默认以无头(headless)模式运行。如果你想看到浏览器，请在 `open` 时传入 `--headed`：

```text
playwright-cli open https://playwright.dev --headed
```

## 会话(Session)

Playwright 命令行(CLI)默认将浏览器配置(profile)保存在内存中。在会话(session)内，你的 cookie 和存储状态会在各次命令行(CLI)调用之间保留，但当浏览器关闭时就会丢失。使用 `--persistent` 可将配置保存到磁盘，以便在浏览器重启后依然持久化。

你可以通过会话(session)为不同项目使用不同的浏览器实例。在调用时传入 `-s=` 即可指定与某个特定浏览器通信。

```text
playwright-cli open https://playwright.dev
playwright-cli -s=example open https://example.com --persistent
playwright-cli list
```

你可以使用 `PLAYWRIGHT_CLI_SESSION` 环境变量来运行你的编码智能体(coding agent)：

```text
PLAYWRIGHT_CLI_SESSION=todo-app claude .
```

或者指示它在调用前加上 `-s=` 前缀。

按如下方式管理你的会话(session)：

```text
playwright-cli list                     # 列出所有会话(session)
playwright-cli close-all                # 关闭所有浏览器
playwright-cli kill-all                 # 强制结束所有浏览器进程
```

## 监控

使用 `playwright-cli show` 可打开一个可视化仪表板(dashboard)，让你查看并控制所有正在运行的浏览器会话(session)。当你的编码智能体(coding agent)在后台运行浏览器自动化时，如果你想观察其进度或介入帮忙，这个功能很有用。

```text
playwright-cli show
```

[![Image](https://private-user-images.githubusercontent.com/883973/549975133-99df739d-106a-4520-b004-bb315db41da7.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODMwNzIwNTEsIm5iZiI6MTc4MzA3MTc1MSwicGF0aCI6Ii84ODM5NzMvNTQ5OTc1MTMzLTk5ZGY3MzlkLTEwNmEtNDUyMC1iMDA0LWJiMzE1ZGI0MWRhNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzAzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcwM1QwOTQyMzFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iZGJjYWIyODA0ZTMxNDMwM2Q2OGI0MTZhNDk5ZmYwMzVlZjJkZmRkOGIyODNhYjkzY2Q1NDgyZWFhMDg4MDVmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.qmLLbYyCXGWwHaGtFKglKxPBW48gZCpGrkjIvKAWMTg)](https://private-user-images.githubusercontent.com/883973/549975133-99df739d-106a-4520-b004-bb315db41da7.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODMwNzIwNTEsIm5iZiI6MTc4MzA3MTc1MSwicGF0aCI6Ii84ODM5NzMvNTQ5OTc1MTMzLTk5ZGY3MzlkLTEwNmEtNDUyMC1iMDA0LWJiMzE1ZGI0MWRhNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzAzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcwM1QwOTQyMzFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iZGJjYWIyODA0ZTMxNDMwM2Q2OGI0MTZhNDk5ZmYwMzVlZjJkZmRkOGIyODNhYjkzY2Q1NDgyZWFhMDg4MDVmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.qmLLbYyCXGWwHaGtFKglKxPBW48gZCpGrkjIvKAWMTg)

该仪表板(dashboard)会打开一个包含两种视图的窗口：

- **会话(Session)网格** —— 按工作区(workspace)分组显示所有活动会话，每个会话都带有实时屏幕广播(screencast)预览、会话名称、当前 URL 和页面标题。点击任意会话可放大查看。
- **会话(Session)详情** —— 显示所选会话的实时视图，带有标签栏、导航控件（后退、前进、重新加载、地址栏）以及完整的远程控制。点击视口即可接管鼠标和键盘输入；按下 Escape 键释放控制。

在网格视图中，你还可以关闭正在运行的会话，或删除非活动会话的数据。

## 命令

### 核心

```text
playwright-cli open [url]               # 打开浏览器，可选择导航到指定 url
playwright-cli goto <url>               # 导航到某个 url
playwright-cli close                    # 关闭页面
playwright-cli type <text>              # 向可编辑元素输入文本
playwright-cli click <ref> [button]     # 在网页上执行点击
playwright-cli dblclick <ref> [button]  # 在网页上执行双击
playwright-cli fill <ref> <text>        # 向可编辑元素填充文本
playwright-cli fill <ref> <text> --submit # 填充文本并按下回车键
playwright-cli drag <startRef> <endRef> # 在两个元素之间执行拖放
playwright-cli drop <ref> --path=<file> # 将文件拖放到元素上（来自页面外部）
playwright-cli drop <ref> --data="k=v"  # 将数据拖放到元素上
playwright-cli hover <ref>              # 悬停在页面元素上
playwright-cli select <ref> <val>       # 在下拉框中选择一个选项
playwright-cli upload <file>            # 上传一个或多个文件
playwright-cli check <ref>              # 勾选复选框或单选按钮
playwright-cli uncheck <ref>            # 取消勾选复选框或单选按钮
playwright-cli snapshot                 # 捕获页面快照以获取元素引用(ref)
playwright-cli snapshot --filename=f    # 将快照保存到指定文件
playwright-cli snapshot <ref>           # 对特定元素拍快照
playwright-cli snapshot --depth=N       # 为提高效率限制快照深度
playwright-cli eval <func> [ref]        # 在页面或元素上执行 JavaScript 表达式
playwright-cli dialog-accept [prompt]   # 接受对话框
playwright-cli dialog-dismiss           # 关闭对话框
playwright-cli resize <w> <h>           # 调整浏览器窗口大小
```

### 导航

```text
playwright-cli go-back                  # 返回上一页
playwright-cli go-forward               # 前进到下一页
playwright-cli reload                   # 重新加载当前页面
```

### 键盘

```text
playwright-cli press <key>              # 按下键盘上的某个按键，如 \`a\`、\`arrowleft\`
playwright-cli keydown <key>            # 按下键盘按键
playwright-cli keyup <key>              # 松开键盘按键
```

### 鼠标

```text
playwright-cli mousemove <x> <y>        # 将鼠标移动到指定位置
playwright-cli mousedown [button]       # 按下鼠标
playwright-cli mouseup [button]         # 松开鼠标
playwright-cli mousewheel <dx> <dy>     # 滚动鼠标滚轮
```

### 保存为

```text
playwright-cli screenshot [ref]         # 对当前页面或元素截图
playwright-cli screenshot --filename=f  # 以指定文件名保存截图
playwright-cli screenshot --hires       # 以完整设备像素比(device pixel ratio)截图
playwright-cli pdf                      # 将页面保存为 PDF
playwright-cli pdf --filename=page.pdf  # 以指定文件名保存 PDF
```

### 标签页

```text
playwright-cli tab-list                 # 列出所有标签页
playwright-cli tab-new [url]            # 创建新标签页
playwright-cli tab-close [index]        # 关闭某个浏览器标签页
playwright-cli tab-select <index>       # 选择某个浏览器标签页
```

### 存储

```text
playwright-cli state-save [filename]    # 保存存储状态
playwright-cli state-load <filename>    # 加载存储状态

# Cookie
playwright-cli cookie-list [--domain]   # 列出 cookie
playwright-cli cookie-get <name>        # 获取某个 cookie
playwright-cli cookie-set <name> <val>  # 设置某个 cookie
playwright-cli cookie-delete <name>     # 删除某个 cookie
playwright-cli cookie-clear             # 清除所有 cookie

# 本地存储(LocalStorage)
playwright-cli localstorage-list        # 列出 localStorage 条目
playwright-cli localstorage-get <key>   # 获取 localStorage 的值
playwright-cli localstorage-set <k> <v> # 设置 localStorage 的值
playwright-cli localstorage-delete <k>  # 删除 localStorage 条目
playwright-cli localstorage-clear       # 清除所有 localStorage

# 会话存储(SessionStorage)
playwright-cli sessionstorage-list      # 列出 sessionStorage 条目
playwright-cli sessionstorage-get <k>   # 获取 sessionStorage 的值
playwright-cli sessionstorage-set <k> <v> # 设置 sessionStorage 的值
playwright-cli sessionstorage-delete <k>  # 删除 sessionStorage 条目
playwright-cli sessionstorage-clear     # 清除所有 sessionStorage
```

### 网络

```text
playwright-cli route <pattern> [opts]   # 模拟(mock)网络请求
playwright-cli route-list               # 列出活动的路由(route)
playwright-cli unroute [pattern]        # 移除路由(route)
```

### 开发者工具(DevTools)

```text
playwright-cli console [min-level]      # 列出控制台(console)消息
playwright-cli requests                 # 列出页面加载以来的所有网络请求
playwright-cli request <index>          # 显示某个特定请求的详情
playwright-cli run-code <code>          # 运行 playwright 代码片段
playwright-cli run-code --filename=f    # 从文件运行 playwright 代码
playwright-cli tracing-start            # 开始记录追踪(trace)
playwright-cli tracing-stop             # 停止记录追踪(trace)
playwright-cli video-start [filename]   # 开始录制视频
playwright-cli video-chapter <title>    # 为视频添加章节标记
playwright-cli video-show-actions       # 在视频中为每个操作添加标注(callout)
playwright-cli video-hide-actions       # 停止在视频中标注操作
playwright-cli video-stop               # 停止录制视频
playwright-cli show                     # 打开可视化仪表板(dashboard)
playwright-cli show --annotate          # 启动仪表板用于 UI 审查 / 设计反馈
playwright-cli generate-locator <ref>   # 为元素生成 playwright 定位器(locator)
playwright-cli highlight <ref>          # 显示持久的高亮覆盖层
playwright-cli highlight <ref> --style= # 以自定义 CSS 样式高亮
playwright-cli highlight <ref> --hide   # 隐藏特定元素的高亮
playwright-cli highlight --hide         # 隐藏页面上的所有高亮
```

### open 命令参数

```text
playwright-cli open --browser=chrome    # 使用指定浏览器
playwright-cli attach --extension=chrome # 通过 Playwright 扩展(Extension)连接
playwright-cli attach --cdp=chrome      # 按通道(channel)附加到正在运行的 Chrome/Edge
playwright-cli attach --cdp=<url>       # 通过 CDP 端点附加
playwright-cli detach                   # 分离已附加的会话，外部浏览器保持运行
playwright-cli open --persistent        # 使用持久化配置(profile)
playwright-cli open --profile=<path>    # 使用自定义配置目录
playwright-cli open --config=file.json  # 使用配置文件
playwright-cli close                    # 关闭浏览器
playwright-cli delete-data              # 删除默认会话的用户数据
```

### 快照(Snapshot)

在每条命令执行后，playwright-cli 都会提供当前浏览器状态的快照(snapshot)。

```bash
> playwright-cli goto https://example.com
### 页面
- 页面 URL：https://example.com/
- 页面标题：Example Domain
### 快照(Snapshot)
[快照(Snapshot)](.playwright-cli/page-2026-02-14T19-22-42-679Z.yml)
```

你也可以使用 `playwright-cli snapshot` 命令按需拍快照。下面的所有选项可以按需组合使用。

```text
# 默认行为 —— 保存到以时间戳命名的文件
playwright-cli snapshot

# 保存到文件，当快照是工作流结果的一部分时使用
playwright-cli snapshot --filename=after-click.yaml

# 对某个元素拍快照，而不是整个页面
playwright-cli snapshot "#main"

# 为提高效率限制快照深度，之后再拍局部快照
playwright-cli snapshot --depth=4
playwright-cli snapshot e34

# 包含每个元素的边界框(bounding box)，格式为 [box=x,y,width,height]
playwright-cli snapshot --boxes
```

### 定位元素

默认情况下，使用快照(snapshot)中的引用(ref)来与页面元素交互。

```text
# 获取带有引用(ref)的快照
playwright-cli snapshot

# 使用引用(ref)进行交互
playwright-cli click e15
```

你也可以使用 CSS 选择器或 Playwright 定位器(locator)。

```text
# CSS 选择器
playwright-cli click "#main > button.submit"

# 角色(role)定位器
playwright-cli click "getByRole('button', { name: 'Submit' })"

# 测试 id(test id)
playwright-cli click "getByTestId('submit-button')"
```

### 会话(Session)

```text
playwright-cli -s=name <cmd>            # 在命名会话中运行命令
playwright-cli -s=name close            # 停止某个命名浏览器
playwright-cli -s=name delete-data      # 删除某个命名浏览器的用户数据
playwright-cli list                     # 列出所有会话(session)
playwright-cli close-all                # 关闭所有浏览器
playwright-cli kill-all                 # 强制结束所有浏览器进程
```

### 本地安装

如果全局 `playwright-cli` 命令不可用，可以通过 `npx playwright-cli` 尝试本地版本：

```text
npx --no-install playwright-cli --version
```

当本地版本可用时，在所有命令中使用 `npx playwright-cli`。否则，将 `playwright-cli` 安装为全局命令：

```text
npm install -g @playwright/cli@latest
```

## 配置文件

Playwright 命令行(CLI)可以使用 JSON 配置文件进行配置。你可以通过 `--config` 命令行选项指定配置文件：

```text
playwright-cli --config path/to/config.json open example.com
```

Playwright 命令行(CLI)默认会从 `.playwright/cli.config.json` 加载配置，这样你就不必每次都指定它。

配置文件模式(schema)
```typescript
{
  /**
   * 要使用的浏览器。
   */
  browser?: {
    /**
     * 要使用的浏览器类型。
     */
    browserName?: 'chromium' | 'firefox' | 'webkit';

    /**
     * 将浏览器配置(profile)保留在内存中，不保存到磁盘。
     */
    isolated?: boolean;

    /**
     * 用于持久化浏览器配置(profile)的用户数据目录路径。
     * 默认会创建临时目录。
     */
    userDataDir?: string;

    /**
     * 传递给
     * @see https://playwright.dev/docs/api/class-browsertype#browser-type-launch-persistent-context
     * 的启动选项。
     *
     * 这对于设置 \`channel\`、\`headless\`、\`executablePath\` 等选项很有用。
     */
    launchOptions?: playwright.LaunchOptions;

    /**
     * 浏览器上下文(context)的上下文选项。
     *
     * 这对于设置 \`viewport\` 等选项很有用。
     */
    contextOptions?: playwright.BrowserContextOptions;

    /**
     * Chrome 开发者工具协议(DevTools Protocol, CDP)端点，用于在 Chromium 系浏览器中连接到已有的浏览器实例。
     */
    cdpEndpoint?: string;

    /**
     * 随连接请求发送的 CDP 头部(header)。
     */
    cdpHeaders?: Record<string, string>;

    /**
     * 连接 CDP 端点的超时时间（毫秒）。默认为 30000（30 秒）。传入 0 可禁用超时。
     */
    cdpTimeout?: number;

    /**
     * 用于连接到已有 Playwright 服务器的远程端点。
     */
    remoteEndpoint?: string;

    /**
     * 作为 Playwright 页面初始化脚本添加的 TypeScript 文件路径。
     */
    initPage?: string[];

    /**
     * 作为初始化脚本添加的 JavaScript 文件路径。
     * 这些脚本会在每个页面中、于该页面自身的脚本之前被执行。
     */
    initScript?: string[];
  },

  /**
   * 若指定，则会将会话的 Playwright 视频保存到输出目录。
   */
  saveVideo?: {
    width: number;
    height: number;
  };

  /**
   * 保存输出文件的目录。
   */
  outputDir?: string;

  /**
   * 是否将快照、控制台消息、网络日志及其它会话日志保存到文件或标准输出。默认为 "stdout"。
   */
  outputMode?: 'file' | 'stdout';

  console?: {
    /**
     * 返回的控制台消息级别。每个级别都包含更严重级别的消息。默认为 "info"。
     */
    level?: 'error' | 'warning' | 'info' | 'debug';
  },

  network?: {
    /**
     * 允许浏览器请求的来源(origin)列表。默认允许全部。同时匹配 \`allowedOrigins\` 和 \`blockedOrigins\` 的来源将被阻止。
     */
    allowedOrigins?: string[];

    /**
     * 阻止浏览器请求的来源(origin)列表。同时匹配 \`allowedOrigins\` 和 \`blockedOrigins\` 的来源将被阻止。
     */
    blockedOrigins?: string[];
  };

  /**
   * 指定用于测试 id(test id)的属性，默认为 "data-testid"。
   */
  testIdAttribute?: string;

  timeouts?: {
    /*
     * 配置默认操作超时时间：https://playwright.dev/docs/api/class-page#page-set-default-timeout。默认为 5000 毫秒。
     */
    action?: number;

    /*
     * 配置默认导航超时时间：https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout。默认为 60000 毫秒。
     */
    navigation?: number;
  };

  /**
   * 是否允许从文件系统的任意位置上传文件。
   * 默认(false)情况下，文件上传仅限于 MCP roots 内的路径。
   */
  allowUnrestrictedFileAccess?: boolean;

  /**
   * 指定用于代码生成的语言。
   */
  codegen?: 'typescript' | 'none';
}
```
通过环境变量配置

| 环境变量 |
| --- |
| `PLAYWRIGHT_MCP_ALLOWED_HOSTS` 逗号分隔的主机列表，允许此服务器从中提供服务。默认为服务器绑定的主机。传入 '*' 可禁用主机检查。 |
| `PLAYWRIGHT_MCP_ALLOWED_ORIGINS` 分号分隔的可信来源(origin)列表，允许浏览器请求。默认允许全部。重要提示：*不*构成安全边界，且*不影响*重定向。 |
| `PLAYWRIGHT_MCP_ALLOW_UNRESTRICTED_FILE_ACCESS` 允许访问工作区 roots 之外的文件。也允许不受限制地访问 file:// URL。默认情况下，对文件系统的访问仅限于工作区根目录（若未配置 roots 则为当前工作目录 cwd），并且禁止导航到 file:// URL。 |
| `PLAYWRIGHT_MCP_BLOCKED_ORIGINS` 分号分隔的来源(origin)列表，阻止浏览器请求。阻止名单(blocklist)先于允许名单(allowlist)求值。若未配合允许名单使用，不匹配阻止名单的请求仍被允许。重要提示：*不*构成安全边界，且*不影响*重定向。 |
| `PLAYWRIGHT_MCP_BLOCK_SERVICE_WORKERS` 阻止 Service Worker。 |
| `PLAYWRIGHT_MCP_BROWSER` 要使用的浏览器或 Chrome 通道(channel)，可能值：chrome、firefox、webkit、msedge。 |
| `PLAYWRIGHT_MCP_CAPS` 逗号分隔的额外能力(capability)列表，可能值：vision、pdf。 |
| `PLAYWRIGHT_MCP_CDP_ENDPOINT` 要连接的 CDP 端点。 |
| `PLAYWRIGHT_MCP_CDP_HEADERS` 随连接请求发送的 CDP 头部(header)，可指定多个。 |
| `PLAYWRIGHT_MCP_CDP_TIMEOUT` CDP 连接的超时时间。 |
| `PLAYWRIGHT_MCP_CONFIG` 配置文件的路径。 |
| `PLAYWRIGHT_MCP_CONSOLE_LEVEL` 返回的控制台消息级别："error"、"warning"、"info"、"debug"。每个级别都包含更严重级别的消息。 |
| `PLAYWRIGHT_MCP_DEVICE` 要模拟的设备，例如："iPhone 15"。 |
| `PLAYWRIGHT_MCP_EXECUTABLE_PATH` 浏览器可执行文件的路径。 |
| `PLAYWRIGHT_MCP_EXTENSION` 连接到正在运行的浏览器实例（仅限 Edge/Chrome）。需要安装 "Playwright MCP Bridge" 浏览器扩展。 |
| `PLAYWRIGHT_MCP_GRANT_PERMISSIONS` 授予浏览器上下文(context)的权限列表，例如 "geolocation"、"clipboard-read"、"clipboard-write"。 |
| `PLAYWRIGHT_MCP_HEADLESS` 是否以无头(headless)模式运行浏览器，默认为无头。 |
| `PLAYWRIGHT_MCP_IGNORE_HTTPS_ERRORS` 忽略 HTTPS 错误。 |
| `PLAYWRIGHT_MCP_INIT_PAGE` 要在 Playwright 页面对象上执行的 TypeScript 文件路径。 |
| `PLAYWRIGHT_MCP_INIT_SCRIPT` 作为初始化脚本添加的 JavaScript 文件路径。该脚本会在每个页面中、于该页面自身的脚本之前被执行。可多次指定。 |
| `PLAYWRIGHT_MCP_ISOLATED` 将浏览器配置(profile)保留在内存中，不保存到磁盘。 |
| `PLAYWRIGHT_MCP_SANDBOX` 是否启用浏览器沙箱(sandbox)。 |
| `PLAYWRIGHT_MCP_OUTPUT_DIR` 输出文件目录的路径。 |
| `PLAYWRIGHT_MCP_PROXY_BYPASS` 绕过代理的逗号分隔域名，例如 ".com,chromium.org,.domain.com"。 |
| `PLAYWRIGHT_MCP_PROXY_SERVER` 指定代理服务器，例如 "[http://myproxy:3128](http://myproxy:3128/)" 或 "socks5://myproxy:8080"。 |
| `PLAYWRIGHT_MCP_SAVE_TRACE` 是否将会话的 Playwright 追踪(trace)保存到输出目录。 |
| `PLAYWRIGHT_MCP_SAVE_VIDEO` 是否将会话视频保存到输出目录。例如 "--save-video=800x600"。 |
| `PLAYWRIGHT_MCP_SECRETS_FILE` 以 dotenv 格式包含密钥(secrets)的文件路径。 |
| `PLAYWRIGHT_MCP_STORAGE_STATE` 用于隔离会话(isolated session)的存储状态文件路径。 |
| `PLAYWRIGHT_MCP_TEST_ID_ATTRIBUTE` 指定用于测试 id(test id)的属性，默认为 "data-testid"。 |
| `PLAYWRIGHT_MCP_TIMEOUT_ACTION` 以毫秒为单位指定操作超时时间，默认为 5000 毫秒。 |
| `PLAYWRIGHT_MCP_TIMEOUT_NAVIGATION` 以毫秒为单位指定导航超时时间，默认为 60000 毫秒。 |
| `PLAYWRIGHT_MCP_USER_AGENT` 指定用户代理(user agent)字符串。 |
| `PLAYWRIGHT_MCP_USER_DATA_DIR` 用户数据目录的路径。若未指定，将创建一个临时目录。 |
| `PLAYWRIGHT_MCP_VIEWPORT_SIZE` 以像素为单位指定浏览器视口(viewport)大小，例如 "1280x720"。 |

## 特定任务

已安装的技能(Skill)包含针对常见任务的详细参考指南：

- **运行和调试 Playwright 测试** —— 运行、调试并管理 Playwright 测试套件。
- **请求模拟(mocking)** —— 拦截并模拟网络请求。
- **运行 Playwright 代码** —— 执行任意 Playwright 脚本。
- **浏览器会话管理** —— 管理多个浏览器会话(session)。
- **规格(spec)驱动测试（规划 / 生成 / 自愈）** —— 以书面规格(spec)驱动测试。
- **存储状态（cookie、localStorage）** —— 持久化并恢复浏览器状态。
- **测试生成** —— 从交互操作生成 Playwright 测试。
- **追踪(Tracing)** —— 记录并检查执行追踪(trace)。
- **视频录制** —— 捕获浏览器会话视频。
- **检查元素属性** —— 获取元素 id、class 或快照中不可见的任意属性。

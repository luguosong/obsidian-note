---
分类:
  - "网页裁剪"
标题: "启动 Policy Tool"
描述: "《Java 教程》安全课程，介绍如何通过命令行启动 Policy Tool 图形工具，以及用户策略文件的默认位置。"
来源: "https://docs.oracle.com/javase/tutorial/security/tour1/wstep1.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 启动 Policy Tool

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 启动 Policy Tool

要启动 Policy Tool，只需在命令行键入以下内容：

```bash
policytool
```

这将调出 Policy Tool 窗口。

每当 Policy Tool 启动时，它会尝试用*用户策略文件*中的策略信息填充此窗口。用户策略文件默认在你主目录中名为 `.java.policy`。如果 Policy Tool 找不到用户策略文件，它会发出警告并显示一个空白的 Policy Tool 窗口（一个有标题和按钮但没有数据的窗口），如下图所示。

![空白的 Policy Tool 窗口](https://docs.oracle.com/javase/tutorial/figures/security/ptBlank1.gif)

然后你可以继续打开现有策略文件或创建新策略文件。

第一次运行 Policy Tool 时，你将看到空白的 Policy Tool 窗口，因为用户策略文件尚不存在。你可以立即继续创建新策略文件，如下一步所述。

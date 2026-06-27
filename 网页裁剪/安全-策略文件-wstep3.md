---
分类:
  - "网页裁剪"
标题: "保存策略文件"
描述: "《Java 教程》安全课程，介绍如何通过 Policy Tool 的「另存为」命令将策略文件保存到指定目录（如 C:\Test），并退出工具。"
来源: "https://docs.oracle.com/javase/tutorial/security/tour1/wstep3.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 保存策略文件

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 保存策略文件

要保存你一直在创建的新策略文件，从 **File** 菜单选择 **Save As** 命令。这将显示 **Save As** 对话框。

[[安全-控制应用|控制应用程序快速教程]]课程中的示例假设你将策略文件存储在 `C:` 驱动器的 `Test` 目录中。

导航到 `Test` 目录。键入文件名 `examplepolicy` 并单击 **Save**。

策略文件现已保存，其名称和路径显示在标记为 `Policy File` 的文本框中。

![显示策略文件的 PolicyTool 窗口](https://docs.oracle.com/javase/tutorial/figures/security/WQ1ptWithFilename1.gif)

通过从 **File** 菜单选择 **Exit** 退出 Policy Tool。

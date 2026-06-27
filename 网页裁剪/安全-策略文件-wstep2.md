---
分类:
  - "网页裁剪"
标题: "授予所需权限"
描述: "《Java 教程》安全课程，介绍如何在 Policy Tool 中创建策略条目，通过 CodeBase 和 SignedBy 指定代码来源并授予权限。"
来源: "https://docs.oracle.com/javase/tutorial/security/tour1/wstep2.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 授予所需权限

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 授予所需权限

要创建新条目，单击主 Policy Tool 窗口中的 **Add Policy Entry** 按钮。这将显示如下图所示的策略条目对话框。

![策略条目对话框](https://docs.oracle.com/javase/tutorial/figures/security/AddEntryBlank1.gif)

策略条目为来自特定*代码源*的代码指定一个或多个权限——来自特定位置(URL) 的代码、由特定实体签名的代码，或两者兼有。

**CodeBase** 和 **SignedBy** 文本框指定你要将要在文件中添加的权限授予哪个代码。

- **CodeBase** 值指示代码源位置；你将权限授予来自该位置的代码。空的 **CodeBase** 条目表示「任何代码」——代码来自哪里无关紧要。
- **SignedBy** 值指示存储在密钥库中的证书的别名。该证书中的公钥用于验证代码上的数字签名。你将权限授予由别名指定的密钥库条目中公钥对应的私钥签名的代码。**SignedBy** 条目是可选的；省略它表示「任何签名者」——代码是否被签名或由谁签名无关紧要。

如果你同时有 **CodeBase** 和 **SignedBy** 条目，则权限仅授予既来自指定位置*又*由命名别名签名的代码。

你可以将权限授予存储示例的位置(URL) 的所有代码。

在策略条目对话框的 **CodeBase** 文本框中键入以下 URL：

```text
https://docs.oracle.com/javase/tutorial/security/tour1/examples/
```

**注意：** 这是一个 URL。因此，它必须始终使用斜杠作为分隔符，而不是反斜杠。

将 **SignedBy** 文本框留空，因为你没有要求代码被签名。

---

**注意：** 要将权限授予不仅来自前面指定目录、而且来自 `security` 目录*及其子目录*的任何代码（`.class` 文件），在 **CodeBase** 框中键入以下 URL：

```text
https://docs.oracle.com/javase/tutorial/security/
```

---

你已指定代码的来源（**CodeBase**），以及代码不必被签名（因为没有 **SignedBy** 值）。

现在你已指定此策略条目，因此单击策略条目对话框中的 **Done** 按钮。Policy Tool 窗口现在包含一行表示策略条目，显示 `CodeBase` 值。

![PolicyTool 窗口，显示新策略条目](https://docs.oracle.com/javase/tutorial/figures/security/WQ1ptOneCB1.gif)

**注意：** 我们将在下一课中授予此新策略条目的权限。

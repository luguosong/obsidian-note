---
分类:
  - "网页裁剪"
标题: "平台环境"
描述: "《Java 教程》Java 核心类库路线课程，介绍应用程序运行的平台环境，以及用于检查和配置平台环境的 API，涵盖配置实用工具、系统实用工具和 PATH 与 CLASSPATH。"
来源: "https://docs.oracle.com/javase/tutorial/essential/environment/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 平台环境

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：平台环境

应用程序运行在*平台环境(platform environment)*中，由底层操作系统、Java 虚拟机、类库以及应用程序启动时提供的各种配置数据定义。本课描述应用程序用于检查和配置其平台环境的某些 API。本课由三节组成：

- [[Java核心类库-平台环境-配置实用工具|配置实用工具]]描述用于访问应用程序部署时或应用程序用户提供的配置数据的 API。
- [[Java核心类库-平台环境-系统实用工具|系统实用工具]]描述 `System` 和 `Runtime` 类中定义的其他 API。
- [[Java核心类库-平台环境-PATH与CLASSPATH|PATH 和 CLASSPATH]]描述用于配置 JDK 开发工具和其他应用程序的环境变量。

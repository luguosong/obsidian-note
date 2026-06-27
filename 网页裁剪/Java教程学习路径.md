---
分类:
  - "网页裁剪"
标题: "Java教程学习路径"
描述: "面向初学者和进阶者的Java平台学习路径指南，涵盖基础知识、进阶主题、客户端开发与服务端开发四大方向。"
来源: "https://docs.oracle.com/javase/tutorial/tutorialLearningPaths.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T16:05:47+08:00"
---

# Java教程学习路径

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

你是一位正在学习 Java 语言的学生，还是一位希望拓展技能栈的专业人士？如果你对 Java 平台的广度感到有些无所适从，以下几条推荐的学习路径将帮助你从 Java 学习中获得最大收益。

[![[java-paths-newtojava.webp]]](#newtojava "Java 初学者")

[![[java-paths-buildingon.webp]]](#buildingon "Java 进阶主题")

[![[java-paths-client.webp]]](#client "Java UI 与富互联网应用")

[![[java-paths-server.webp]]](#server "中间件与服务端相关主题")

---

## 初识 Java (New To Java) {#newtojava}

![[java-paths-abc_blocks_petri_lummema_01.webp]] 以下学习路径对初学者最为有用：

- [[Java入门指南]]—— Java 技术简介，以及安装 Java 开发软件并用它创建一个简单程序的课程。
- [[学习Java语言]] —— 描述类(classes)、对象(objects)、继承(inheritance)、数据类型(datatypes)、泛型(generics)和包(packages)等核心概念的课程。
- [[Java核心类库]] —— 关于异常(exceptions)、基本输入/输出(basic I/O)、并发(concurrency)、正则表达式(regular expressions)和平台环境(platform environment)的课程。

## 在基础之上进阶 (Building On The Foundation) {#buildingon}

![[java-paths-brunurb_LegoBlocks_brunurb.webp]] 准备好深入这项技术了吗？请参阅以下主题：

- [[集合]] —— 关于使用和扩展 Java 集合框架(Java Collections Framework)的课程。
- [[Lambda表达式]]：学习如何在应用程序中使用 Lambda 表达式以及为何使用。
- [[聚合操作]]：探索聚合操作、流(Streams)与 Lambda 表达式如何协同工作，以提供强大的过滤能力。
- [[将程序打包为JAR文件]] —— 关于创建和签名 JAR 文件的课程。
- [[国际化]] —— 介绍如何设计软件，使其能够轻松地适应（本地化）各种语言和地区。
- [[反射]] —— 一种 API，用于表示（"反射"）当前 Java 虚拟机(Java Virtual Machine)中的类、接口和对象。
- [[安全]] —— 帮助保护应用程序免受恶意软件侵害的 Java 平台特性。
- [[JavaBeans]] —— Java 平台的组件技术。
- [[扩展机制]] —— 如何使自定义 API 可供运行在 Java 平台上的所有应用程序使用。
- [[泛型进阶]] —— 对类型系统的增强，支持对各种类型的对象进行操作，同时提供编译时类型安全。

## 钟情于客户端？ (Cherish the Client?) {#client}

![[java-paths-rihard_Computer_LCD_display.webp]]

如果你想专注于开发基于 Java 的桌面解决方案和富互联网应用(rich Internet applications)，请参阅以下主题：

- [[JavaFX入门]] —— 一组示例应用程序集合，旨在帮助你开始完成常见的 JavaFX 任务。
- [[Scene Builder入门]] —— 逐步演示如何使用 JavaFX Scene Builder 工具创建一个简单的问题跟踪应用程序。
- [[使用Swing创建图形用户界面]] —— 全面介绍在 Java 平台上创建图形用户界面(GUI)。
- [[部署]] —— 如何使用 JAR 文件打包应用程序和小程序(applets)，并使用 Java Web Start 和 Java 插件(Java Plug-in)进行部署。
- [[二维图形]] —— 如何在应用程序中显示和打印二维图形。
- [[全屏独占模式API]] —— 如何编写能够更充分利用用户图形硬件的应用程序。

## 痴迷于服务端！ (Fervor Over Server!) {#server}

![[java-paths-Anonymous_server.webp]]

如果你有兴趣掌握对中间件(middleware)、服务端(server-side)或 Web 应用程序开发至关重要的技能，请参阅以下学习路径：

- [[JDBC数据库访问]] —— 介绍一种用于在 Java 应用程序与各种数据库及数据源之间建立连接的 API。
- [[JMX]] —— Java 管理扩展(Java Management Extensions)提供了一种标准方式来管理应用程序、设备和服务等资源。
- [[JNDI]] —— Java 命名与目录接口(Java Naming and Directory Interface)支持访问诸如 DNS 和 LDAP 等命名与目录服务。
- [[JAXP]] —— 介绍用于 XML 处理的 Java API(Java API for XML Processing, JAXP) 1.4 技术。
- [[RMI]] —— 远程方法调用(Remote Method Invocation)API 允许一个对象调用运行在另一个 Java 虚拟机上的对象的方法。
- [[并发]] —— Java 平台提供了若干 API 来帮助你开发多线程程序。

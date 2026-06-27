---
分类:
  - "网页裁剪"
标题: "JMX 通知"
描述: "《Java 教程》JMX 路线课程，介绍 JMX API 的通知机制，演示如何让 MBean 生成通知以信号状态变化、检测事件或问题，并给出运行示例。"
来源: "https://docs.oracle.com/javase/tutorial/jmx/notifs/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# JMX 通知

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：通知

JMX API 定义了一种机制，使 MBeans 能够生成通知，例如用于信号状态变化、检测到的事件或问题。

要生成通知，MBean 必须实现接口 [`NotificationEmitter`](https://docs.oracle.com/javase/8/docs/api/javax/management/NotificationEmitter.html) 或继承 [`NotificationBroadcasterSupport`](https://docs.oracle.com/javase/8/docs/api/javax/management/NotificationBroadcasterSupport.html)。要发送通知，你需要构造类 [`javax.management.Notification`](https://docs.oracle.com/javase/8/docs/api/javax/management/Notification.html) 或其子类（例如 [`AttributeChangedNotification`](https://docs.oracle.com/javase/8/docs/api/javax/management/AttributeChangeNotification.html)）的一个实例，并将该实例传递给 [`NotificationBroadcasterSupport.sendNotification`](https://docs.oracle.com/javase/8/docs/api/javax/management/NotificationBroadcasterSupport.html#sendNotification-javax.management.Notification)。

每个通知都有一个源。源是生成通知的 MBean 的对象名称。

每个通知都有一个序列号。当顺序很重要且存在通知以错误顺序被处理的风险时，此编号可用于对来自同一源的通知进行排序。序列号可以为零，但最好是来自给定 MBean 的每个通知的编号递增。

[[JMX-MBeans-标准MBeans|标准 MBeans]] 中的 [`Hello`](https://docs.oracle.com/javase/tutorial/jmx/examples/Hello.java) MBean 实现实际上实现了通知机制。但是，为简单起见，该课中省略了此代码。`Hello` 的完整代码如下：

```java
package com.example;

import javax.management.*;

public class Hello
        extends NotificationBroadcasterSupport
        implements HelloMBean {

    public void sayHello() {
        System.out.println("hello, world");
    }

    public int add(int x, int y) {
        return x + y;
    }

    public String getName() {
        return this.name;
    }

    public int getCacheSize() {
        return this.cacheSize;
    }

    public synchronized void setCacheSize(int size) {
        int oldSize = this.cacheSize;
        this.cacheSize = size;

        System.out.println("Cache size now " + this.cacheSize);

        Notification n = new AttributeChangeNotification(this,
                                sequenceNumber++, System.currentTimeMillis(),
                                "CacheSize changed", "CacheSize", "int",
                                oldSize, this.cacheSize);

        sendNotification(n);
    }

    @Override
    public MBeanNotificationInfo[] getNotificationInfo() {
        String[] types = new String[]{
            AttributeChangeNotification.ATTRIBUTE_CHANGE
        };

        String name = AttributeChangeNotification.class.getName();
        String description = "An attribute of this MBean has changed";
        MBeanNotificationInfo info = 
                new MBeanNotificationInfo(types, name, description);
        return new MBeanNotificationInfo[]{info};
    }
    
    private final String name = "Reginald";
    private int cacheSize = DEFAULT_CACHE_SIZE;
    private static final int DEFAULT_CACHE_SIZE = 200;
    private long sequenceNumber = 1;
}

此 `Hello` MBean 实现继承了 `NotificationBroadcasterSupport` 类。`NotificationBroadcasterSupport` 实现了 `NotificationEmitter` 接口。

操作和属性的设置方式与标准 MBean 示例相同，不同之处在于 `CacheSize` 属性的 setter 方法现在定义了一个 `oldSize` 值。此值记录设置操作之前 `CacheSize` 属性的值。

通知由 JMX 类 `AttributeChangeNotification` 的实例 `n` 构造，该类继承 `javax.management.Notification`。通知在 `setCacheSize()` 方法定义内从以下信息构造。此信息作为参数传递给 `AttributeChangeNotification`。

- 通知源的对象名称，即由 `this` 表示的 `Hello` MBean
- 一个序列号，即 `sequenceNumber`，设置为 1 并递增增加
- 一个时间戳
- 通知消息的内容
- 已更改属性的名称，在本例中为 `CacheSize`
- 已更改属性的类型
- 旧的属性值，在本例中为 `oldSize`
- 新的属性值，在本例中为 `this.cacheSize`

然后通知 `n` 被传递给 `NotificationBroadcasterSupport.sendNotification()` 方法。

最后，定义 [`MBeanNotificationInfo`](https://docs.oracle.com/javase/8/docs/api/javax/management/MBeanNotificationInfo.html) 实例来描述 MBean 为给定类型通知生成的不同通知实例的特征。在本例中，发送的通知类型是 `AttributeChangeNotification` 通知。

## 运行 MBean 通知示例

你将再次使用 JConsole 与 `Hello` MBean 交互，这次是发送和接收通知。此示例需要 Java SE 平台版本 6。

1. 如果尚未这样做，请将 [`jmx_examples.zip`](https://docs.oracle.com/javase/tutorial/jmx/examples/jmx_examples.zip) 保存到你的 `work_dir` 目录中。
2. 在终端窗口中使用以下命令解压示例类包。
	```bash
	unzip jmx_examples.zip
3. 从 `work_dir` 目录中编译示例 Java 类。
	```bash
	javac com/example/*.java
4. 启动 `Main` 应用程序。
	```bash
	java com.example.Main
	将生成 `Main` 正在等待某事发生的确认。
5. 在同一台机器上的不同终端窗口中启动 JConsole。
	```bash
	jconsole
	```
	显示"新连接"对话框，呈现你可以连接的正在运行的 JMX 代理列表。
6. 在"新连接"对话框中，从列表中选择 `com.example.Main` 并单击"连接"。
	显示平台当前活动的摘要。
7. 单击 MBeans 选项卡。
	此面板显示当前注册在 MBean 服务器中的所有 MBeans。
8. 在左侧框架中，展开 MBean 树中的 `com.example` 节点。
	你会看到由 `Hello` 创建并注册的示例 MBean `Hello`。如果单击 `Hello`，你会看到其在 MBean 树中的 Notifications 节点。
9. 在 MBean 树中展开 `Hello` MBean 的 Notifications 节点。
	注意面板是空白的。
10. 单击"订阅"按钮。
	在 Notifications 节点标签中显示当前收到的通知数量(0)。
11. 在 MBean 树中展开 `Hello` MBean 的 Attributes 节点，并将 `CacheSize` 属性的值更改为 150。
	在启动 `Main` 的终端窗口中，显示此属性更改的确认。注意 Notifications 节点中显示的已收到通知数量已更改为 1。
12. 再次在 MBean 树中展开 `Hello` MBean 的 Notifications 节点。
	显示通知的详细信息。
13. 要关闭 JConsole，选择"连接" -> "退出"。

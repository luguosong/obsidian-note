---
分类:
  - "网页裁剪"
标题: "标准 MBeans"
描述: "《Java 教程》JMX 路线课程，通过 HelloMBean 示例介绍标准 MBean 的定义（接口+实现类）、属性与操作的设计模式，以及如何创建 JMX 代理管理资源并用 JConsole 交互。"
来源: "https://docs.oracle.com/javase/tutorial/jmx/mbeans/standard.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 标准 MBeans

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 标准 MBeans

本节展示一个简单标准 MBean 的示例。

标准 MBean 通过编写一个名为 `SomethingMBean` 的 Java 接口和一个实现该接口的名为 `Something` 的 Java 类来定义。接口中的每个方法定义 MBean 中的一个属性或操作。默认情况下，每个方法定义一个操作。属性和操作是遵循特定设计模式的方法。标准 MBean 由 MBean 接口和类组成。MBean 接口列出所有公开属性和操作的方法。类实现此接口并提供受检测资源的功能。

以下各节检查标准 MBean 的示例和管理该 MBean 的简单启用 JMX 技术的代理(JMX 代理)。

## MBean 接口

以下是一个基本 MBean 接口 [`HelloMBean`](https://docs.oracle.com/javase/tutorial/jmx/examples/HelloMBean.java) 的示例：

```java
package com.example;

public interface HelloMBean {

    public void sayHello();
    public int add(int x, int y);

    public String getName();

    public int getCacheSize();
    public void setCacheSize(int size);
}
```

按照约定，MBean 接口采用实现它的 Java 类的名称，加上后缀 *`MBean`*。在本例中，接口名为 `HelloMBean`。实现此接口的 `Hello` 类在下一节中描述。

根据 JMX 规范，MBean 接口由可读且可能可写的命名和类型化属性组成，此外还有可由 MBean 管理的应用程序调用的命名和类型化操作。`HelloMBean` 接口声明两个操作：Java 方法 `add()` 和 `sayHello()`。

`HelloMBean` 声明两个属性：`Name` 是只读字符串，`CacheSize` 是可读写的整数。声明 getter 和 setter 方法以允许受管理的应用程序访问和可能更改属性值。根据 JMX 规范的定义，*getter* 是任何不返回 void 且名称以 `get` 开头的公共方法。getter 使管理器能够读取属性值，其类型为返回对象的类型。*setter* 是任何接受单个参数且名称以 `set` 开头的公共方法。setter 使管理器能够在属性中写入新值，其类型与参数的类型相同。

这些操作和属性的实现如下节所示。

## MBean 实现

以下 [`Hello`](https://docs.oracle.com/javase/tutorial/jmx/examples/Hello.java) Java 类实现了 `HelloMBean` MBean 接口：

```java
package com.example;

public class Hello ...
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
        ...

        this.cacheSize = size;
        System.out.println("Cache size now " + this.cacheSize);
    }
    ...

    private final String name = "Reginald";
    private int cacheSize = DEFAULT_CACHE_SIZE;
    private static final int
        DEFAULT_CACHE_SIZE = 200;
}
```

简单的 `Hello` 类提供了 `HelloMBean` 声明的操作和属性的定义。`sayHello()` 和 `add()` 操作极其简单，但实际操作可以根据需要简单或复杂。

还定义了获取 `Name` 属性以及获取和设置 `CacheSize` 属性的方法。在本示例中，`Name` 属性值永远不会改变。然而，在实际场景中，此属性可能会随着受管理资源的运行而改变。例如，该属性可能表示正常运行时间或内存使用量等统计信息。这里，该属性仅仅是名称 `Reginald`。

调用 `setCacheSize` 方法使你能够将 `CacheSize` 属性从声明的默认值 200 更改。在实际场景中，更改 `CacheSize` 属性可能需要执行其他操作，例如丢弃条目或分配新条目。此示例只是打印一条消息来确认缓存大小已更改。但是，可以定义更复杂的操作来代替简单的 `println()` 调用。

定义了 `Hello` MBean 及其接口后，现在可以用它们来管理它们所代表的资源，如下节所示。

## 创建 JMX 代理来管理资源

一旦资源被 MBeans 检测，该资源的管理就由 JMX 代理执行。

JMX 代理的核心组件是 MBean 服务器。MBean 服务器是一个管理对象服务器，MBeans 在其中注册。JMX 代理还包括一组用于管理 MBeans 的服务。有关 MBean 服务器实现的详细信息，请参阅 [`MBeanServer`](https://docs.oracle.com/javase/8/docs/api/javax/management/MBeanServer.html) 接口的 API 文档。

以下 [`Main`](https://docs.oracle.com/javase/tutorial/jmx/examples/Main.java) 类代表一个基本的 JMX 代理：

```java
package com.example;

import java.lang.management.*;
import javax.management.*;

public class Main {

    public static void main(String[] args)
        throws Exception {

        MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();
        ObjectName name = new ObjectName("com.example:type=Hello");
        Hello mbean = new Hello();
        mbs.registerMBean(mbean, name);

        ...

        System.out.println("Waiting forever...");
        Thread.sleep(Long.MAX_VALUE);
    }
}
```

JMX 代理 `Main` 首先通过调用 [`java.lang.management.ManagementFactory`](https://docs.oracle.com/javase/8/docs/api/java/lang/management/ManagementFactory.html) 类的 `getPlatformMBeanServer()` 方法获取平台创建和初始化的 MBean 服务器。如果平台尚未创建 MBean 服务器，则 `getPlatformMBeanServer()` 通过调用 JMX 方法 [`MBeanServerFactory.createMBeanServer()`](https://docs.oracle.com/javase/8/docs/api/javax/management/MBeanServerFactory.html#createMBeanServer--) 自动创建一个 MBean 服务器。`Main` 获取的 `MBeanServer` 实例名为 `mbs`。

接下来，`Main` 为它将创建的 MBean 实例定义一个对象名称。每个 JMX MBean 必须有一个对象名称。对象名称是 JMX 类 [`ObjectName`](https://docs.oracle.com/javase/8/docs/api/javax/management/ObjectName.html) 的实例，必须符合 JMX 规范定义的语法。即，对象名称必须包含一个域和一组键属性。在 `Main` 定义的对象名称中，域是 `com.example`（示例 MBean 所在的包）。此外，键属性声明此对象的类型为 `Hello`。

创建一个名为 `mbean` 的 `Hello` 对象实例。然后通过将对象和对象名称传递给 JMX 方法 [`MBeanServer.registerMBean()`](https://docs.oracle.com/javase/8/docs/api/javax/management/MBeanServer.html#registerMBean-java.lang.Object-javax.management.ObjectName-) 的调用，将名为 `mbean` 的 `Hello` 对象以对象名称 `name` 注册为 MBean 服务器 `mbs` 中的 MBean。

将 `Hello` MBean 注册到 MBean 服务器后，`Main` 只是等待对 `Hello` 执行管理操作。在本示例中，这些管理操作是调用 `sayHello()` 和 `add()`，以及获取和设置属性值。

## 运行标准 MBean 示例

检查完示例类后，你现在可以运行示例。在本示例中，使用 JConsole 与 MBean 交互。

要运行示例，请按以下步骤操作：

1. 将 JMX API 示例类包 [`jmx_examples.zip`](https://docs.oracle.com/javase/tutorial/jmx/examples/jmx_examples.zip) 保存到你的工作目录 `work_dir`。
2. 在终端窗口中使用以下命令解压示例类包。
	```bash
	unzip jmx_examples.zip
	```
3. 从 `work_dir` 目录中编译示例 Java 类。
	```bash
	javac com/example/*.java
	```
4. 如果你运行的是 Java 开发工具包(JDK) 版本 6，请使用以下命令启动 `Main` 应用程序。
	```bash
	java com.example.Main
	```
	如果你运行的 JDK 版本早于版本 6，则需要使用以下指定选项启动 `Main` 应用程序，以公开应用程序进行监控和管理。
	```bash
	java -Dcom.sun.management.jmxremote example.Main
	```
	将显示 `Main` 正在等待某事发生的确认。
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
	你会看到由 `Main` 创建并注册的示例 MBean `Hello`。如果单击 `Hello`，你会看到其在 MBean 树中关联的 Attributes 和 Operations 节点。
9. 在 MBean 树中展开 `Hello` MBean 的 Attributes 节点。
	显示由 `Hello` 类定义的 MBean 属性。
10. 将 `CacheSize` 属性的值更改为 150。
	在启动 `Main` 的终端窗口中，生成此属性更改的确认。
11. 在 MBean 树中展开 `Hello` MBean 的 Operations 节点。
	可以看到 `Hello` MBean 声明的两个操作 `sayHello()` 和 `add()`。
12. 通过单击 `sayHello` 按钮调用 `sayHello()` 操作。
	JConsole 对话框通知你方法已成功调用。在运行 `Main` 的终端窗口中生成消息 *"hello, world"*。
13. 为 `add()` 操作提供两个要相加的整数，然后单击 `add` 按钮。
	答案显示在 JConsole 对话框中。
14. 要关闭 JConsole，选择"连接" -> "退出"。

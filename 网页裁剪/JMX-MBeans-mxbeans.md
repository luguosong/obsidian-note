---
分类:
  - "网页裁剪"
标题: "MXBean"
描述: "《Java 教程》JMX 课程，介绍 MXBean——一种只引用预定义数据类型集合的特殊 MBean，确保任何客户端都能使用，无需访问模型特定的类。涵盖 MXBean 接口定义、操作、返回类型、注册与运行示例。"
来源: "https://docs.oracle.com/javase/tutorial/jmx/mbeans/mxbeans.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# MXBean

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## MXBean

本节解释一种特殊类型的 MBean，称为 *MXBean*。

*MXBean* 是一种只引用预定义数据类型集合的 MBean。这样，你可以确保你的 MBean 能被任何客户端（包括远程客户端）使用，而无需客户端访问表示 MBean 类型的模型特定类。MXBean 提供了一种便捷的方式来将相关值捆绑在一起，而无需专门配置客户端来处理这些捆绑包。

与标准 MBean 一样，MXBean 通过编写一个名为 `SomethingMXBean` 的 Java 接口和一个实现该接口的 Java 类来定义。然而，与标准 MBean 不同，MXBean 不要求 Java 类名为 `Something`。接口中的每个方法定义 MXBean 中的一个属性或操作。注解 `@MXBean` 也可用于注解 Java 接口，而不再要求接口名称后跟 MXBean 后缀。

MXBean 存在于 Java 2 平台标准版(J2SE) 5.0 软件中，位于 [`java.lang.management`](https://docs.oracle.com/javase/8/docs/api/java/lang/management/package-summary.html) 包中。然而，除了 `java.lang.management` 中定义的标准集合外，用户现在可以定义自己的 MXBean。

MXBean 背后的主要思想是，MXBean 接口中引用的类型（如 [`java.lang.management.MemoryUsage`](https://docs.oracle.com/javase/8/docs/api/java/lang/management/MemoryUsage.html)，本例中是 [`java.lang.management.MemoryMXBean`](https://docs.oracle.com/javase/8/docs/api/java/lang/management/MemoryMXBean.html)）被映射到一组标准类型，即所谓的*开放类型(Open Types)*，它们定义在 [`javax.management.openmbean`](https://docs.oracle.com/javase/8/docs/api/javax/management/openmbean/package-summary.html) 包中。确切的映射规则出现在 MXBean 规范中。然而，一般原则是简单类型（如 int 或 String）保持不变，而复杂类型（如 `MemoryUsage`）被映射到标准类型 [`CompositeDataSupport`](https://docs.oracle.com/javase/8/docs/api/javax/management/openmbean/CompositeDataSupport.html)。

MXBean 示例由以下文件组成，这些文件可在 [`jmx_examples.zip`](https://docs.oracle.com/javase/tutorial/jmx/examples/jmx_examples.zip) 中找到：

- `QueueSamplerMXBean` 接口
- 实现 MXBean 接口的 `QueueSampler` 类
- MXBean 接口中 `getQueueSample()` 方法返回的 `QueueSample` Java 类型
- `Main`，设置并运行示例的程序

MXBean 示例使用这些类执行以下操作：

- 定义一个管理 `Queue<String>` 类型资源的简单 MXBean
- 在 MXBean 中声明一个 getter `getQueueSample`，它在调用时获取队列的快照并返回一个 Java 类 `QueueSample`，该类将以下值捆绑在一起：
	- 获取快照的时间
		- 队列大小
		- 该时刻队列的头部
- 在 MBean 服务器中注册 MXBean

## MXBean 接口

以下代码展示了示例 [`QueueSamplerMXBean`](https://docs.oracle.com/javase/tutorial/jmx/examples/QueueSamplerMXBean.java) MXBean 接口：

```java
package com.example;

public interface QueueSamplerMXBean {
    public QueueSample getQueueSample();
    public void clearQueue();
}
```

注意，声明 MXBean 接口的方式与声明标准 MBean 接口完全相同。`QueueSamplerMXBean` 接口声明了一个 getter `getQueueSample` 和一个操作 `clearQueue`。

## 定义 MXBean 操作

MXBean 操作在 [`QueueSampler`](https://docs.oracle.com/javase/tutorial/jmx/examples/QueueSampler.java) 示例类中声明，如下所示：

```java
package com.example;

import java.util.Date;
import java.util.Queue;

public class QueueSampler
                implements QueueSamplerMXBean {

    private Queue<String> queue;

    public QueueSampler (Queue<String> queue) {
        this.queue = queue;
    }

    public QueueSample getQueueSample() {
        synchronized (queue) {
            return new QueueSample(new Date(),
                           queue.size(), queue.peek());
        }
    }

    public void clearQueue() {
        synchronized (queue) {
            queue.clear();
        }
    }
}
```

`QueueSampler` 定义了 MXBean 接口声明的 `getQueueSample()` getter 和 `clearQueue()` 操作。`getQueueSample()` 操作返回一个 `QueueSample` Java 类型的实例，该实例使用 [`java.util.Queue`](https://docs.oracle.com/javase/8/docs/api/java/util/Queue.html) 方法 `peek()` 和 `size()` 返回的值以及 [`java.util.Date`](https://docs.oracle.com/javase/8/docs/api/java/util/Date.html) 的实例创建。

## 定义 MXBean 接口返回的 Java 类型

`QueueSampler` 返回的 `QueueSample` 实例在 [`QueueSample`](https://docs.oracle.com/javase/tutorial/jmx/examples/QueueSample.java) 类中定义，如下所示：

```java
package com.example;

import java.beans.ConstructorProperties;
import java.util.Date;

public class QueueSample {

    private final Date date;
    private final int size;
    private final String head;

    @ConstructorProperties({"date", "size", "head"})
    public QueueSample(Date date, int size,
                        String head) {
        this.date = date;
        this.size = size;
        this.head = head;
    }

    public Date getDate() {
        return date;
    }

    public int getSize() {
        return size;
    }

    public String getHead() {
        return head;
    }
}
```

在 `QueueSample` 类中，MXBean 框架调用 `QueueSample` 中的所有 getter，将给定实例转换为 [`CompositeData`](https://docs.oracle.com/javase/8/docs/api/javax/management/openmbean/CompositeData.html) 实例，并使用 `@ConstructorProperties` 注解从 `CompositeData` 实例重建 `QueueSample` 实例。

## 在 MBean 服务器中创建和注册 MXBean

到目前为止，已经定义了：MXBean 接口和实现它的类，以及返回的 Java 类型。接下来，必须创建 MXBean 并在 MBean 服务器中注册它。这些操作由标准 MBean 示例中使用的同一个 [`Main`](https://docs.oracle.com/javase/tutorial/jmx/examples/Main.java) 示例 JMX 代理执行，但相关代码未在[[JMX-MBeans-标准MBeans|标准 MBean]]课程中展示。

```java
package com.example;

import java.lang.management.ManagementFactory;
import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;
import javax.management.MBeanServer;
import javax.management.ObjectName;

public class Main {

    public static void main(String[] args) throws Exception {
        MBeanServer mbs =
            ManagementFactory.getPlatformMBeanServer();

        ...
        ObjectName mxbeanName = new ObjectName("com.example:type=QueueSampler");

        Queue<String> queue = new ArrayBlockingQueue<String>(10);
        queue.add("Request-1");
        queue.add("Request-2");
        queue.add("Request-3");
        QueueSampler mxbean = new QueueSampler(queue);

        mbs.registerMBean(mxbean, mxbeanName);

        System.out.println("Waiting...");
        Thread.sleep(Long.MAX_VALUE);
    }
}
```

`Main` 类执行以下操作：

- 获取平台 MBean 服务器。
- 为 MXBean `QueueSampler` 创建对象名称。
- 为 `QueueSampler` MXBean 创建要处理的 `Queue` 实例。
- 将 `Queue` 实例提供给新创建的 `QueueSampler` MXBean。
- 以与标准 MBean 完全相同的方式在 MBean 服务器中注册 MXBean。

## 运行 MXBean 示例

MXBean 示例使用你在[[JMX-MBeans-标准MBeans|标准 MBean]]节中使用的 [`jmx_examples.zip`](https://docs.oracle.com/javase/tutorial/jmx/examples/jmx_examples.zip) 包中的类。此示例需要 Java SE 平台版本 6。要运行 MXBean 示例，请按照以下步骤操作：

1. 如果尚未这样做，将 [`jmx_examples.zip`](https://docs.oracle.com/javase/tutorial/jmx/examples/jmx_examples.zip) 保存到你的 `work_dir` 目录中。
2. 在终端窗口中使用以下命令解压示例类包。
	```text
	unzip jmx_examples.zip
	```
3. 从 `work_dir` 目录中编译示例 Java 类。
	```text
	javac com/example/*.java
	```
4. 启动 `Main` 应用程序。将生成 `Main` 正在等待某事发生的确认。
	```text
	java com.example.Main
	```
5. 在同一台机器上的不同终端窗口中启动 JConsole。将显示「新建连接」对话框，呈现你可以连接的正在运行的 JMX 代理列表。
	```text
	jconsole
	```
6. 在「新建连接」对话框中，从列表中选择 `com.example.Main` 并单击「连接」。
	将显示平台当前活动的摘要。
7. 单击「MBeans」选项卡。
	此面板显示当前在 MBean 服务器中注册的所有 MBean。
8. 在左侧框架中，展开 MBean 树中的 `com.example` 节点。
	你将看到由 `Main` 创建和注册的示例 MBean `QueueSampler`。如果单击 `QueueSampler`，你将在 MBean 树中看到其关联的「属性」和「操作」节点。
9. 展开「属性」节点。
	你将看到 `QueueSample` 属性出现在右侧窗格中，其值为 `javax.management.openmbean.CompositeDataSupport`。
10. 双击 `CompositeDataSupport` 值。
	你将看到 `QueueSample` 的值 `date`、`head` 和 `size`，因为 MXBean 框架已将 `QueueSample` 实例转换为 `CompositeData`。如果你将 `QueueSampler` 定义为标准 MBean 而不是 MXBean，JConsole 将找不到 `QueueSample` 类，因为它不在其类路径中。如果 `QueueSampler` 是标准 MBean，你在检索 `QueueSample` 属性值时会收到 `ClassNotFoundException` 消息。JConsole 找到 `QueueSampler` 这一事实证明了在通过通用 JMX 客户端（如 JConsole）连接到 JMX 代理时使用 MXBean 的有用性。
11. 展开「操作」节点。
	将显示一个用于调用 `clearQueue` 操作的按钮。
12. 单击 `clearQueue` 按钮。
	将显示方法成功调用的确认。
13. 再次展开「属性」节点，并双击 `CompositeDataSupport` 值。
	`head` 和 `size` 值已重置。
14. 要关闭 JConsole，选择「连接」->「退出」。

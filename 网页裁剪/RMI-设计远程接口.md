---
分类:
  - "网页裁剪"
标题: "设计远程接口"
描述: "《Java 教程》RMI 课程，介绍计算引擎的核心协议设计，定义 Compute 远程接口与 Task 接口，阐述远程方法、RemoteException、泛型类型参数与对象序列化要求。"
来源: "https://docs.oracle.com/javase/tutorial/rmi/designing.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 设计远程接口

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 设计远程接口

计算引擎的核心是一个协议，它允许将任务提交给计算引擎、计算引擎运行这些任务，并将这些任务的结果返回给客户端。此协议在计算引擎支持的接口中表达。此协议的远程通信如下图所示。

![[RMI--rmi-3.gif]]

每个接口包含一个方法。计算引擎的远程接口 `Compute` 允许将任务提交给引擎。客户端接口 `Task` 定义计算引擎如何执行提交的任务。

[`` `compute.Compute` ``](https://docs.oracle.com/javase/tutorial/rmi/examples/compute/Compute.java) 接口定义了可远程访问的部分，即计算引擎本身。以下是 `Compute` 接口的源代码：

```java
package compute;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Compute extends Remote {
    <T> T executeTask(Task<T> t) throws RemoteException;
}
```

通过扩展接口 `java.rmi.Remote`，`Compute` 接口将自己标识为一个可以从另一个 Java 虚拟机调用其方法的接口。任何实现此接口的对象都可以是远程对象。

作为远程接口的成员，`executeTask` 方法是远程方法。因此，此方法必须定义为能够抛出 `java.rmi.RemoteException`。当通信失败或协议错误发生时，RMI 系统从远程方法调用抛出此异常。`RemoteException` 是受检异常，因此调用远程方法的任何代码都需要通过捕获它或在 `throws` 子句中声明它来处理此异常。

计算引擎所需的第二个接口是 `Task` 接口，它是 `Compute` 接口中 `executeTask` 方法的参数类型。[`` `compute.Task` ``](https://docs.oracle.com/javase/tutorial/rmi/examples/compute/Task.java) 接口定义了计算引擎与其需要完成的工作之间的接口，提供了启动工作的方式。以下是 `Task` 接口的源代码：

```java
package compute;

public interface Task<T> {
    T execute();
}
```

`Task` 接口定义了单个方法 `execute`，它没有参数也不抛出异常。因为该接口不扩展 `Remote`，所以此接口中的方法不需要在其 `throws` 子句中列出 `java.rmi.RemoteException`。

`Task` 接口有一个类型参数 `T`，它表示任务计算的结果类型。此接口的 `execute` 方法返回计算结果，因此其返回类型是 `T`。

`Compute` 接口的 `executeTask` 方法反过来返回传递给它的 `Task` 实例执行的结果。因此，`executeTask` 方法有自己的类型参数 `T`，将其自己的返回类型与传递的 `Task` 实例的结果类型关联起来。

RMI 使用 Java 对象序列化机制在 Java 虚拟机之间按值传输对象。要使对象被视为可序列化，其类必须实现 `java.io.Serializable` 标记接口。因此，实现 `Task` 接口的类也必须实现 `Serializable`，用于任务结果的对象的类也必须如此。

只要任务是 `Task` 类型的实现，`Compute` 对象就可以运行不同类型的任务。实现此接口的类可以包含任务计算所需的任何数据和计算所需的任何其他方法。

以下是 RMI 如何使这个简单的计算引擎成为可能。因为 RMI 可以假设 `Task` 对象是用 Java 编程语言编写的，所以计算引擎以前未知的 `Task` 对象的实现会根据需要由 RMI 下载到计算引擎的 Java 虚拟机中。此功能使计算引擎的客户端能够定义要在服务器机器上运行的新类型的任务，而无需在该机器上显式安装代码。

由 `ComputeEngine` 类实现的计算引擎实现了 `Compute` 接口，使不同的任务可以通过调用其 `executeTask` 方法提交给它。这些任务使用任务的 `execute` 方法实现运行，结果返回给远程客户端。

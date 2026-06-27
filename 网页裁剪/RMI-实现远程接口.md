---
分类:
  - "网页裁剪"
标题: "实现远程接口"
描述: "《Java 教程》RMI 课程，讲解如何实现计算引擎的 ComputeEngine 类，涵盖声明远程接口、定义构造函数、实现远程方法、RMI 中对象传递规则、安全管理与向注册表导出远程对象。"
来源: "https://docs.oracle.com/javase/tutorial/rmi/implementing.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 实现远程接口

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 实现远程接口

本节讨论为计算引擎实现类的任务。通常，实现远程接口的类至少应执行以下操作：

- 声明正在实现的远程接口
- 为每个远程对象定义构造函数
- 为远程接口中的每个远程方法提供实现

RMI 服务器程序需要创建初始远程对象并将它们*导出*到 RMI 运行时，这使它们可用于接收传入的远程调用。此设置过程可以封装在远程对象实现类本身的方法中，也可以完全包含在另一个类中。设置过程应执行以下操作：

- 创建并安装安全管理器
- 创建并导出一个或多个远程对象
- 在 RMI 注册表（或另一个命名服务，如可通过 Java 命名与目录接口访问的服务）中注册至少一个远程对象，以用于引导

以下是计算引擎的完整实现。[`` `engine.ComputeEngine` ``](https://docs.oracle.com/javase/tutorial/rmi/examples/engine/ComputeEngine.java) 类实现远程接口 `Compute`，并包含用于设置计算引擎的 `main` 方法。以下是 `ComputeEngine` 类的源代码：

```java
package engine;

import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import compute.Compute;
import compute.Task;

public class ComputeEngine implements Compute {

    public ComputeEngine() {
        super();
    }

    public <T> T executeTask(Task<T> t) {
        return t.execute();
    }

    public static void main(String[] args) {
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }
        try {
            String name = "Compute";
            Compute engine = new ComputeEngine();
            Compute stub =
                (Compute) UnicastRemoteObject.exportObject(engine, 0);
            Registry registry = LocateRegistry.getRegistry();
            registry.rebind(name, stub);
            System.out.println("ComputeEngine bound");
        } catch (Exception e) {
            System.err.println("ComputeEngine exception:");
            e.printStackTrace();
        }
    }
}
```

以下各节讨论计算引擎实现的每个组件。

## 声明正在实现的远程接口

计算引擎的实现类声明如下：

```java
public class ComputeEngine implements Compute
```

此声明说明该类实现了 `Compute` 远程接口，因此可用于远程对象。

`ComputeEngine` 类定义了一个实现单个远程接口而没有其他接口的远程对象实现类。`ComputeEngine` 类还包含两个只能在本地调用的可执行程序元素。其中第一个元素是 `ComputeEngine` 实例的构造函数。第二个元素是 `main` 方法，用于创建 `ComputeEngine` 实例并使其对客户端可用。

## 定义远程对象的构造函数

`ComputeEngine` 类有一个不带参数的构造函数。构造函数的代码如下：

```java
public ComputeEngine() {
    super();
}
```

此构造函数只调用超类构造函数，即 `Object` 类的无参数构造函数。尽管即使从 `ComputeEngine` 构造函数中省略，超类构造函数也会被调用，但为了清晰起见，将其包含在内。

## 为每个远程方法提供实现

远程对象的类为远程接口中指定的每个远程方法提供实现。`Compute` 接口包含单个远程方法 `executeTask`，其实现如下：

```java
public <T> T executeTask(Task<T> t) {
    return t.execute();
}
```

此方法实现了 `ComputeEngine` 远程对象与其客户端之间的协议。每个客户端为 `ComputeEngine` 提供一个 `Task` 对象，该对象具有 `Task` 接口的 `execute` 方法的特定实现。`ComputeEngine` 执行每个客户端的任务，并将任务的 `execute` 方法的结果直接返回给客户端。

## 在 RMI 中传递对象

远程方法的参数或返回值可以是几乎任何类型，包括本地对象、远程对象和基本数据类型。更精确地说，只要实体是基本数据类型、远程对象或*可序列化*对象（意味着它实现接口 `java.io.Serializable`）类型的实例，任何类型的实体都可以传递给或从远程方法传递。

某些对象类型不满足这些标准中的任何一个，因此不能传递给或从远程方法返回。这些对象中的大多数（如线程或文件描述符）封装了仅在单个地址空间内有意义的信息。许多核心类，包括 `java.lang` 和 `java.util` 包中的类，实现了 `Serializable` 接口。

管理参数和返回值如何传递的规则如下：

- 远程对象实质上按引用传递。*远程对象引用*是一个桩(stub)，它是实现远程对象实现的完整远程接口集合的客户端代理。
- 本地对象使用对象序列化按副本传递。默认情况下，复制所有字段，除了标记为 `static` 或 `transient` 的字段。默认序列化行为可以按类逐个覆盖。

按引用传递远程对象意味着远程方法调用对对象状态所做的任何更改都反映在原始远程对象中。传递远程对象时，接收方只能使用那些是远程接口的接口。实现类中定义的或类实现的非远程接口中定义的任何方法对该接收方不可用。

例如，如果你传递对 `ComputeEngine` 类实例的引用，接收方将只能访问计算引擎的 `executeTask` 方法。该接收方将看不到 `ComputeEngine` 构造函数、其 `main` 方法或其对 `java.lang.Object` 的任何方法的实现。

在远程方法调用的参数和返回值中，不是远程对象的对象按值传递。因此，在接收 Java 虚拟机中创建对象的副本。接收方对对象状态所做的任何更改仅反映在接收方的副本中，而不反映在发送方的原始实例中。发送方对对象状态所做的任何更改仅反映在发送方的原始实例中，而不反映在接收方的副本中。

## 实现服务器的 main 方法

`ComputeEngine` 实现中最复杂的方法是 `main` 方法。`main` 方法用于启动 `ComputeEngine`，因此需要执行必要的初始化和内务处理来准备服务器接受来自客户端的调用。此方法不是远程方法，这意味着它不能从不同的 Java 虚拟机调用。因为 `main` 方法声明为 `static`，所以该方法完全不与对象关联，而是与类 `ComputeEngine` 关联。

## 创建并安装安全管理器

`main` 方法的首要任务是创建并安装安全管理器，它保护对系统资源的访问免受在 Java 虚拟机内运行的不受信任的下载代码的影响。安全管理器确定下载的代码是否有权访问本地文件系统或可以执行任何其他特权操作。

如果 RMI 程序未安装安全管理器，RMI 将不会为作为远程方法调用的参数或返回值接收的对象下载类（本地类路径除外）。此限制确保下载代码执行的操作受安全策略约束。

以下是创建并安装安全管理器的代码：

```java
if (System.getSecurityManager() == null) {
    System.setSecurityManager(new SecurityManager());
}
```

## 使远程对象对客户端可用

接下来，`main` 方法创建 `ComputeEngine` 的实例并使用以下语句将其导出到 RMI 运行时：

```java
Compute engine = new ComputeEngine();
Compute stub =
    (Compute) UnicastRemoteObject.exportObject(engine, 0);
```

静态 `UnicastRemoteObject.exportObject` 方法导出提供的远程对象，以便它可以接收来自远程客户端的远程方法调用。第二个参数（一个 `int`）指定使用哪个 TCP 端口来监听对象的传入远程调用请求。通常使用值零，它指定使用匿名端口。然后，实际端口将在运行时由 RMI 或底层操作系统选择。然而，也可以使用非零值来指定用于监听的特定端口。一旦 `exportObject` 调用成功返回，`ComputeEngine` 远程对象就准备好处理传入的远程调用。

`exportObject` 方法返回导出远程对象的桩。注意，变量 `stub` 的类型必须是 `Compute`，而不是 `ComputeEngine`，因为远程对象的桩只实现导出远程对象实现的远程接口。

`exportObject` 方法声明它可以抛出 `RemoteException`，这是一种受检异常类型。`main` 方法用其 `try` / `catch` 块处理此异常。如果未以这种方式处理异常，则必须在 `main` 方法的 `throws` 子句中声明 `RemoteException`。如果必要的通信资源不可用（例如请求的端口已用于其他目的），则导出远程对象的尝试可能抛出 `RemoteException`。

在客户端可以调用远程对象的方法之前，它必须首先获取对远程对象的引用。获取引用的方式与程序中获取任何其他对象引用的方式相同，例如通过将引用作为方法返回值的一部分或作为包含此类引用的数据结构的一部分来获取。

系统提供了一种特定类型的远程对象，即 RMI 注册表，用于查找对其他远程对象的引用。RMI 注册表是一个简单的远程对象命名服务，它使客户端能够按名称获取对远程对象的引用。注册表通常仅用于定位 RMI 客户端需要使用的第一个远程对象。然后，该第一个远程对象可能提供查找其他对象的支持。

`java.rmi.registry.Registry` 远程接口是在注册表中绑定（或注册）和查找远程对象的 API。`java.rmi.registry.LocateRegistry` 类提供了用于合成对特定网络地址（主机和端口）上的注册表的远程引用的静态方法。这些方法创建包含指定网络地址的远程引用对象，而不执行任何远程通信。`LocateRegistry` 还提供了用于在当前 Java 虚拟机中创建新注册表的静态方法，尽管此示例不使用这些方法。一旦远程对象在本地主机上的 RMI 注册表中注册，任何主机上的客户端都可以按名称查找远程对象，获取其引用，然后调用对象上的远程方法。注册表可以由主机上运行的所有服务器共享，或者单个服务器进程可以创建和使用自己的注册表。

`ComputeEngine` 类使用以下语句为对象创建名称：

```java
String name = "Compute";
```

然后代码将该名称添加到服务器上运行的 RMI 注册表。此步骤稍后使用以下语句完成：

```java
Registry registry = LocateRegistry.getRegistry();
registry.rebind(name, stub);
```

此 `rebind` 调用对本地主机上的 RMI 注册表进行远程调用。与任何远程调用一样，此调用可能导致抛出 `RemoteException`，由 `main` 方法末尾的 `catch` 块处理。

注意以下关于 `Registry.rebind` 调用的内容：

- `LocateRegistry.getRegistry` 的无参数重载合成本地主机上和默认注册表端口 1099 上的注册表引用。如果注册表创建在 1099 以外的端口上，则必须使用具有 `int` 参数的重载。
- 对注册表进行远程调用时，传递的是远程对象的桩，而不是远程对象本身的副本。远程实现对象（如 `ComputeEngine` 的实例）永远不会离开创建它们的 Java 虚拟机。因此，当客户端在服务器的远程对象注册表中执行查找时，返回的是桩的副本。因此，在这种情况下，远程对象实际上按（远程）引用传递而不是按值传递。
- 出于安全原因，应用程序只能 `bind`、`unbind` 或 `rebind` 远程对象引用与在同一主机上运行的注册表。此限制防止远程客户端删除或覆盖服务器注册表中的任何条目。然而，可以从任何主机（本地或远程）请求 `lookup`。

一旦服务器在本地 RMI 注册表中注册，它就打印一条消息，指示它已准备好开始处理调用。然后，`main` 方法完成。不需要有线程等待来保持服务器存活。只要有对 `ComputeEngine` 对象的引用存在于另一个 Java 虚拟机（本地或远程）中，`ComputeEngine` 对象就不会被关闭或被垃圾回收。因为程序在注册表中绑定对 `ComputeEngine` 的引用，所以它可以从远程客户端（注册表本身）到达。RMI 系统保持 `ComputeEngine` 的进程运行。`ComputeEngine` 可用于接受调用，并且在其绑定从注册表删除*并且*没有远程客户端持有对 `ComputeEngine` 对象的远程引用之前，不会被回收。

`ComputeEngine.main` 方法中的最后一段代码处理可能出现的任何异常。代码中可能抛出的唯一受检异常类型是 `RemoteException`，无论是通过 `UnicastRemoteObject.exportObject` 调用还是通过注册表 `rebind` 调用。在任一情况下，程序在打印错误消息后除了退出之外做不了太多。在某些分布式应用程序中，从远程调用失败中恢复是可能的。例如，应用程序可以尝试重试操作或选择另一个服务器来继续操作。

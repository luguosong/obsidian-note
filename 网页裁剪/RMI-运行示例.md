---
分类:
  - "网页裁剪"
标题: "运行示例程序"
描述: "《Java 教程》RMI 课程，演示如何配置安全策略文件、启动 RMI 注册表、启动计算引擎服务器与客户端，阐述 java.rmi.server.codebase 等系统属性的作用。"
来源: "https://docs.oracle.com/javase/tutorial/rmi/running.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 运行示例程序

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 运行示例程序

## 关于安全的说明

服务器和客户端程序在安装了安全管理器的情况下运行。当你运行任一程序时，你需要指定安全策略文件，以便代码被授予运行所需的安全权限。以下是示例策略文件 [`server.policy`](https://docs.oracle.com/javase/tutorial/rmi/examples/server.policy)，用于在 Solaris 或 Linux 上运行的服务器程序：

```text
grant codeBase "file:///home/ann/src/" {
    permission java.security.AllPermission;
};
```

以下是示例策略文件 [`client.policy`](https://docs.oracle.com/javase/tutorial/rmi/examples/client.policy)，用于在 Solaris 或 Linux 上运行的客户端程序：

```text
grant codeBase "file:///home/jones/src/" {
    permission java.security.AllPermission;
};
```

以下是 Windows 的示例 `server.policy` 文件：

```text
grant codeBase "file://C:/home/ann/src/" {
    permission java.security.AllPermission;
};
```

以下是 Windows 的示例 `client.policy` 文件：

```text
grant codeBase "file://C:/home/jones/src/" {
    permission java.security.AllPermission;
};
```

---

**注意：** `codeBase` 值的确切含义取决于末尾的字符。带尾随 `/` 的 `codeBase` 匹配指定目录中的所有类文件（不匹配 JAR 文件）。带尾随 `/*` 的 `codeBase` 匹配该目录中包含的所有文件（类文件和 JAR 文件）。带尾随 `/-` 的 `codeBase` 匹配目录中的所有文件（类文件和 JAR 文件）以及递归地匹配该目录中包含的子目录中的所有文件。有关更多信息，请参阅[默认策略实现和策略文件语法](https://docs.oracle.com/javase/8/docs/technotes/guides/security/PolicyFiles.html)。

---

对于这些示例策略文件，程序本地类路径中的类被授予所有权限，因为本地应用程序代码是受信任的，但从其他位置下载的代码不授予任何权限。因此，计算引擎服务器限制它执行的任务（其代码未知是否受信任，可能是恶意的）执行任何需要安全权限的操作。示例客户端的 `Pi` 任务不需要任何权限来执行。

在此示例中，服务器程序的策略文件名为 `server.policy`，客户端程序的策略文件名为 `client.policy`。

## 启动服务器

启动计算引擎之前，你需要启动 RMI 注册表。RMI 注册表是一个简单的服务器端引导命名设施，它使远程客户端能够获取对初始远程对象的引用。它可以用 `rmiregistry` 命令启动。在执行 `rmiregistry` 之前，你必须确保你将在其中运行 `rmiregistry` 的 shell 或窗口没有设置 `CLASSPATH` 环境变量，或者有 `CLASSPATH` 环境变量但不包含你要下载到远程对象客户端的任何类的路径。

要在服务器上启动注册表，执行 `rmiregistry` 命令。此命令不产生输出，通常在后台运行。对于此示例，注册表在主机 `mycomputer` 上启动。

**Microsoft Windows**：

```bash
javaw rmiregistry -J-Djava.rmi.server.codebase=file://C:/home/ann/public_html/classes/
```

**Solaris 或 Linux**：

```bash
rmiregistry -J-Djava.rmi.server.codebase=file:///home/ann/public_html/classes/ &
```

如这些示例所示，在服务器上启动注册表时，你必须使用 `java.rmi.server.codebase` 属性指定服务器的类在网络上的可访问位置。你也可以使用 HTTP URL：

```bash
javaw rmiregistry -J-Djava.rmi.server.codebase=http://mycomputer.example.com/~ann/classes/
```

有关 `java.rmi.server.codebase` 和其他 RMI 系统属性的更多信息，请参阅 [`java.rmi` 属性](https://docs.oracle.com/javase/8/docs/technotes/guides/rmi/javarmiproperties.html)。

默认情况下，注册表在端口 1099 上运行。要在不同端口上启动注册表，请在命令行上指定端口号。不要忘记取消设置 `CLASSPATH` 环境变量。

**Microsoft Windows**：

```bash
javaw rmiregistry -J-Djava.rmi.server.codebase=file://C:/home/ann/public_html/classes/ 2001
```

**Solaris 或 Linux**：

```bash
rmiregistry -J-Djava.rmi.server.codebase=file:///home/ann/public_html/classes/ 2001 &
```

注册表启动后，你可以启动服务器。你需要确保 `compute.jar` 文件和远程对象实现类都在你的类路径中。启动计算引擎时，你需要使用 `java.rmi.server.codebase` 属性指定服务器的类在网络上的可访问位置。在此示例中，可供下载的服务器端类是 `Compute` 和 `Task` 接口，它们在用户 `ann` 的 `public_html\classes` 目录中的 `compute.jar` 文件中可用。计算引擎服务器在主机 `mycomputer` 上启动，与启动注册表的主机相同。

**Microsoft Windows**：

```bash
java -cp C:\home\ann\src;C:\home\ann\public_html\classes\compute.jar ^
     -Djava.rmi.server.codebase=file://C:/home/ann/public_html/classes/ ^
     -Djava.rmi.server.hostname=mycomputer.example.com ^
     -Djava.security.policy=server.policy ^
        engine.ComputeEngine
```

**Solaris 或 Linux**：

```bash
java -cp /home/ann/src:/home/ann/public_html/classes/compute.jar \
     -Djava.rmi.server.codebase=file:///home/ann/public_html/classes/ \
     -Djava.rmi.server.hostname=mycomputer.example.com \
     -Djava.security.policy=server.policy \
        engine.ComputeEngine
```

上面的 `java` 命令定义了以下系统属性：

- `java.rmi.server.codebase` 属性指定位置（代码库 URL），可以从该位置下载源自*此*服务器的类的定义。如果代码库指定目录层次结构（而不是 JAR 文件），则必须在代码库 URL 的末尾包含尾随斜杠。
- `java.rmi.server.hostname` 属性指定要放入此 Java 虚拟机中导出的远程对象的桩中的主机名或地址。此值是客户端尝试通信远程方法调用时使用的主机名或地址。默认情况下，RMI 实现使用 `java.net.InetAddress.getLocalHost` API 指示的服务器 IP 地址。然而，有时此地址不适用于所有客户端，完全限定的主机名会更有效。为确保 RMI 使用可从所有潜在客户端路由到的服务器主机名（或 IP 地址），请设置 `java.rmi.server.hostname` 属性。
- `java.security.policy` 属性用于指定包含你打算授予的权限的策略文件。

## 启动客户端

注册表和计算引擎运行后，你可以启动客户端，指定以下内容：

- 客户端使用 `java.rmi.server.codebase` 属性提供其类（`Pi` 类）的位置
- `java.security.policy` 属性，用于指定包含你打算授予各种代码片段的权限的安全策略文件
- 作为命令行参数，服务器的主机名（以便客户端知道在哪里定位 `Compute` 远程对象）和计算中要使用的小数位数

在另一台主机上启动客户端（例如名为 `mysecondcomputer` 的主机），如下所示：

---

**Microsoft Windows**：

```bash
java -cp C:\home\jones\src;C:\home\jones\public_html\classes\compute.jar ^
     -Djava.security.policy=client.policy ^
        client.ComputePi mycomputer.example.com 45
```

**Solaris 或 Linux**：

```bash
java -cp /home/jones/src:/home/jones/public_html/classes/compute.jar \
     -Djava.security.policy=client.policy \
        client.ComputePi mycomputer.example.com 45
```

注意，类路径在命令行上设置，以便解释器可以找到客户端类和包含接口的 JAR 文件。

启动客户端后，显示以下输出：

```text
3.141592653589793238462643383279502884197169399
```

下图说明了 `rmiregistry`、`ComputeEngine` 服务器和 `ComputePi` 客户端在程序执行期间从何处获取类。

![[RMI--rmi-5.gif]]

当 `ComputeEngine` 服务器在注册表中绑定其远程对象引用时，注册表下载桩类所依赖的 `Compute` 和 `Task` 接口。这些类从 `ComputeEngine` 服务器的 Web 服务器或文件系统下载，具体取决于启动服务器时使用的代码库 URL 类型。

因为 `ComputePi` 客户端的类路径中有 `Compute` 和 `Task` 接口，所以它从其类路径加载它们的定义，而不是从服务器的代码库。

最后，当 `Pi` 对象通过 `executeTask` 远程调用传递给 `ComputeEngine` 对象时，`Pi` 类被加载到 `ComputeEngine` 服务器的 Java 虚拟机中。服务器从客户端的 Web 服务器或文件系统加载 `Pi` 类，具体取决于启动客户端时使用的代码库 URL 类型。

---

**注意：** 参阅 [RMI 安全建议](https://docs.oracle.com/javase/8/docs/technotes/guides/rmi/rmi_security_recommendations.html)以改进 RMI 应用程序的安全性。

---

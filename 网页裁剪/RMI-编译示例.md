---
分类:
  - "网页裁剪"
标题: "编译示例程序"
描述: "《Java 教程》RMI 课程，演示如何构建接口 JAR 文件、服务器类和客户端类，配置网络可访问的类文件位置以支持 RMI 运行时代码下载。"
来源: "https://docs.oracle.com/javase/tutorial/rmi/compiling.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 编译示例程序

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 编译示例程序

在部署计算引擎等服务的真实场景中，开发者可能会创建一个 Java 归档(JAR) 文件，其中包含供服务器类实现和客户端程序使用的 `Compute` 和 `Task` 接口。接下来，开发者（可能是接口 JAR 文件的同一开发者）将编写 `Compute` 接口的实现，并将该服务部署在客户端可用的机器上。客户端程序的开发者可以使用 JAR 文件中包含的 `Compute` 和 `Task` 接口，独立开发使用 `Compute` 服务的任务和客户端程序。

在本节中，你将学习如何设置 JAR 文件、服务器类和客户端类。你将看到客户端的 `Pi` 类将在运行时下载到服务器。此外，`Compute` 和 `Task` 接口将在运行时从服务器下载到注册表。

此示例将接口、远程对象实现和客户端代码分为三个包：

- `compute` —— [`Compute`](https://docs.oracle.com/javase/tutorial/rmi/examples/compute/Compute.java) 和 [`Task`](https://docs.oracle.com/javase/tutorial/rmi/examples/compute/Task.java) 接口
- `engine` —— [`ComputeEngine`](https://docs.oracle.com/javase/tutorial/rmi/examples/engine/ComputeEngine.java) 实现类
- `client` —— [`ComputePi`](https://docs.oracle.com/javase/tutorial/rmi/examples/client/ComputePi.java) 客户端代码和 [`Pi`](https://docs.oracle.com/javase/tutorial/rmi/examples/client/Pi.java) 任务实现

首先，你需要构建接口 JAR 文件以提供给服务器和客户端开发者。

## 构建接口类的 JAR 文件

首先，你需要编译 `compute` 包中的接口源文件，然后构建包含其类文件的 JAR 文件。假设用户 `waldo` 编写了这些接口并将源文件放在 Windows 的 `C:\home\waldo\src\compute` 目录或 Solaris/Linux 的 `/home/waldo/src/compute` 目录中。给定这些路径，你可以使用以下命令编译接口并创建 JAR 文件：

**Microsoft Windows**：

```bash
cd C:\home\waldo\src
javac compute\Compute.java compute\Task.java
jar cvf compute.jar compute\*.class
```

**Solaris 或 Linux**：

```bash
cd /home/waldo/src
javac compute/Compute.java compute/Task.java
jar cvf compute.jar compute/*.class
```

---

由于 `-v` 选项，`jar` 命令显示以下输出：

```text
added manifest
adding: compute/Compute.class(in = 307) (out= 201)(deflated 34%)
adding: compute/Task.class(in = 217) (out= 149)(deflated 31%)
```

现在，你可以将 `compute.jar` 文件分发给服务器和客户端应用程序的开发者，以便他们使用这些接口。

使用 `javac` 编译器构建服务器端或客户端类后，如果这些类中的任何一个需要被其他 Java 虚拟机动态下载，你必须确保其类文件放在网络可访问的位置。在此示例中，对于 Solaris 或 Linux，此位置是 `/home/*user*/public_html/classes`，因为许多 Web 服务器允许通过构造为 `http://host/~*user*/` 的 HTTP URL 访问用户的 `public_html` 目录。如果你的 Web 服务器不支持此约定，你可以使用 Web 服务器层次结构中的不同位置，或者你可以使用文件 URL。文件 URL 在 Solaris 或 Linux 上采用 `file://home/*user*/public_html/classes/` 形式，在 Windows 上采用 `file://C:/home/*user*/public_html/classes/` 形式。你还可以根据需要选择其他类型的 URL。

类文件的网络可访问性使 RMI 运行时能够在需要时下载代码。RMI 不定义自己的代码下载协议，而是使用 Java 平台支持的 URL 协议（例如 HTTP）来下载代码。注意，使用完整的、重量级的 Web 服务器来提供这些类文件是不必要的。例如，可以找到一个简单的 HTTP 服务器，它提供通过 HTTP 使类可供 RMI 下载所需的功能。
另请参阅[远程方法调用主页](http://www.oracle.com/technetwork/java/javase/tech/index-jsp-136424.html)。

## 构建服务器类

`engine` 包只包含一个服务器端实现类 `ComputeEngine`，即远程接口 `Compute` 的实现。

假设 `ComputeEngine` 类的开发者用户 `ann` 将 `ComputeEngine.java` 放在 Windows 的 `C:\home\ann\src\engine` 目录或 Solaris/Linux 的 `/home/ann/src/engine` 目录中。她将类文件部署在 `public_html` 目录的子目录 `C:\home\ann\public_html\classes`（Windows）或 `/home/ann/public_html\classes`（Solaris/Linux）中供客户端下载。此位置可通过某些 Web 服务器访问为 `http://*host*:*port*/~ann/classes/`。

`ComputeEngine` 类依赖于 `compute.jar` JAR 文件中包含的 `Compute` 和 `Task` 接口。因此，构建服务器类时，类路径中需要 `compute.jar` 文件。假设 `compute.jar` 文件位于 Windows 的 `C:\home\ann\public_html\classes` 目录或 Solaris/Linux 的 `/home/ann/public_html\classes` 目录中。给定这些路径，你可以使用以下命令构建服务器类，然后将它们复制到网络可访问的位置：

**Microsoft Windows**：

```bash
cd C:\home\ann\src
javac -cp C:\home\ann\public_html\classes\compute.jar ^
    engine\ComputeEngine.java
mkdir C:\home\ann\public_html\classes\engine
cp engine\ComputeEngine.class C:\home\ann\public_html\classes\engine
```

**Solaris 或 Linux**：

```bash
cd /home/ann/src
javac -cp /home/ann/public_html/classes/compute.jar \
    engine/ComputeEngine.java
mkdir /home/ann/public_html/classes/engine
cp engine/ComputeEngine.class /home/ann/public_html/classes/engine
```

---

**注意：** 脱字符(`^`) 是 Windows 中的行继续符，而反斜杠(`\`) 是 Solaris 和 Linux 中的行继续符。行继续符使你能够在命令提示符中输入跨越多行的命令。

---

`ComputeEngine` 的桩类实现了 `Compute` 接口，该接口引用 `Task` 接口。因此，这两个接口的类定义需要可被网络访问，以便其他 Java 虚拟机（如注册表的 Java 虚拟机）接收桩。客户端 Java 虚拟机的类路径中已经有这些接口，因此它实际上不需要下载它们的定义。`public_html` 目录下的 `compute.jar` 文件可以达到此目的。

现在，计算引擎已准备好部署。你可以现在部署，也可以等到构建客户端之后再部署。

## 构建客户端类

`client` 包包含两个类，`ComputePi`（主客户端程序）和 `Pi`（客户端对 `Task` 接口的实现）。

假设客户端类的开发者用户 `jones` 将 `ComputePi.java` 和 `Pi.java` 放在 Windows 的 `C:\home\jones\src\client` 目录或 Solaris/Linux 的 `/home/jones/src/client` 目录中。他将类文件部署在 `public_html` 目录的子目录 `C:\home\jones\public_html\classes`（Windows）或 `/home/jones/public_html\classes`（Solaris/Linux）中供计算引擎下载。此位置可通过某些 Web 服务器访问为 `http://*host*:*port*/~jones/classes/`。

客户端类依赖于 `compute.jar` JAR 文件中包含的 `Compute` 和 `Task` 接口。因此，构建客户端类时，类路径中需要 `compute.jar` 文件。假设 `compute.jar` 文件位于 Windows 的 `C:\home\jones\public_html\classes` 目录或 Solaris/Linux 的 `/home/jones/public_html\classes` 目录中。给定这些路径，你可以使用以下命令构建客户端类：

**Microsoft Windows**：

```bash
cd C:\home\jones\src
javac -cp C:\home\jones\public_html\classes\compute.jar ^
    client\ComputePi.java client\Pi.java
mkdir C:\home\jones\public_html\classes\client
cp client\Pi.class ^
    C:\home\jones\public_html\classes\client
```

**Solaris 或 Linux**：

```bash
cd /home/jones/src
javac -cp /home/jones/public_html/classes/compute.jar \
    client/ComputePi.java client/Pi.java
mkdir /home/jones/public_html/classes/client
cp client/Pi.class \
    /home/jones/public_html/classes/client
```

只有 `Pi` 类需要放在 `public_html\classes\client` 目录中，因为只有 `Pi` 类需要可供下载到计算引擎的 Java 虚拟机。现在，你可以运行服务器，然后运行客户端。

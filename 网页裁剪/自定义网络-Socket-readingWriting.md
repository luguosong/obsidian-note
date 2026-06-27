---
分类:
  - "网页裁剪"
标题: "从套接字读取和写入套接字"
描述: "《Java 教程》自定义网络课程，通过 EchoClient 示例演示如何用 Socket 类建立与服务器的连接，并通过套接字发送和接收数据。"
来源: "https://docs.oracle.com/javase/tutorial/networking/sockets/readingWriting.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 从套接字读取和写入套接字

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 从套接字读取和写入套接字

让我们看一个简单的示例，说明程序如何使用 `Socket` 类建立到服务器程序的连接，然后客户端如何通过套接字向服务器发送数据和从服务器接收数据。

示例程序实现了一个客户端 [`EchoClient`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/EchoClient.java)，它连接到回显服务器。回显服务器从其客户端接收数据并将其回显。示例 [`EchoServer`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/EchoServer.java) 实现了一个回显服务器。（或者，客户端可以连接到任何支持 [Echo 协议](http://tools.ietf.org/html/rfc862) 的主机。）

`EchoClient` 示例创建一个套接字，从而获得到回显服务器的连接。它从标准输入流读取用户输入，然后通过将文本写入套接字将该文本转发到回显服务器。服务器通过套接字将输入回显给客户端。客户端程序读取并显示服务器传回的数据。

注意，`EchoClient` 示例既写入又读取其套接字，从而向回显服务器发送数据并从回显服务器接收数据。

让我们逐步分析程序并研究有趣的部分。`EchoClient` 示例中 [[Java核心类库-异常-tryResourceClose|`try` -with-resources]] 语句中的以下语句至关重要。这些语句建立客户端和服务器之间的套接字连接，并在套接字上打开 [`PrintWriter`](https://docs.oracle.com/javase/8/docs/api/java/io/PrintWriter.html) 和 [`BufferedReader`](https://docs.oracle.com/javase/8/docs/api/java/io/BufferedReader.html)：

```java
String hostName = args[0];
int portNumber = Integer.parseInt(args[1]);

try (
    Socket echoSocket = new Socket(hostName, portNumber);        // 第1条语句
    PrintWriter out =                                            // 第2条语句
        new PrintWriter(echoSocket.getOutputStream(), true);
    BufferedReader in =                                          // 第3条语句
        new BufferedReader(
            new InputStreamReader(echoSocket.getInputStream()));
    BufferedReader stdIn =                                       // 第4条语句
        new BufferedReader(
            new InputStreamReader(System.in))
)
```

`try` -with-resources 语句中的第一条语句创建一个新的 [`Socket`](https://docs.oracle.com/javase/8/docs/api/java/net/Socket.html) 对象并将其命名为 `echoSocket`。此处使用的 `Socket` 构造函数需要你要连接的计算机名称和端口号。示例程序使用第一个 [[Java核心类库-平台环境-cmdLineArgs|命令行参数]] 作为计算机名称（主机名），使用第二个命令行参数作为端口号。当你在计算机上运行此程序时，请确保你使用的主机名是你要连接的计算机的完全限定 IP 名称。例如，如果你的回显服务器运行在计算机 `echoserver.example.com` 上并监听端口号 7，并且你想使用 `EchoServer` 示例作为回显服务器，请首先从计算机 `echoserver.example.com` 运行以下命令：

```bash
java EchoServer 7
```

之后，使用以下命令运行 `EchoClient` 示例：

```bash
java EchoClient echoserver.example.com 7
```

`try` -with-resources 语句中的第二条语句获取套接字的输出流并在其上打开一个名为 `out` 的 `PrintWriter`。类似地，第三条语句获取套接字的输入流并在其上打开一个名为 `in` 的 `BufferedReader`。示例使用读取器和写入器，以便它可以通过套接字写入 Unicode 字符。如果你还不熟悉 Java 平台的 I/O 类，你可能希望阅读[[Java核心类库-基本IO|基本 I/O]]。

程序下一个有趣的部分是 `while` 循环。该循环使用 `try` -with-resources 语句第四条语句中创建的 `BufferedReader` 对象 `stdIn`，从标准输入流一次读取一行。然后循环通过将其写入连接到套接字的 `PrintWriter` 立即将该行发送到服务器：

```java
String userInput;
while ((userInput = stdIn.readLine()) != null) {
    out.println(userInput);
    System.out.println("echo: " + in.readLine());
}
```

`while` 循环中的最后一条语句从连接到套接字的 `BufferedReader` 读取一行信息。`readLine` 方法等待直到服务器将信息回显给 `EchoClient`。当 `readline` 返回时，`EchoClient` 将信息打印到标准输出。

`while` 循环继续，直到用户键入输入结束字符。也就是说，`EchoClient` 示例从用户读取输入，将其发送到 Echo 服务器，从服务器获取响应并显示它，直到到达输入结束。（你可以通过按 **Ctrl-C** 键入输入结束字符。）`while` 循环然后终止，Java 运行时自动关闭连接到套接字和标准输入流的读取器和写入器，并关闭到服务器的套接字连接。Java 运行时自动关闭这些资源，因为它们是在 `try` -with-resources 语句中创建的。Java 运行时按创建它们的相反顺序关闭这些资源。（这是好的，因为连接到套接字的流应该在套接字本身关闭之前关闭。）

这个客户端程序直接且简单，因为回显服务器实现了简单的协议。客户端向服务器发送文本，服务器将其回显。当你的客户端程序与更复杂的服务器（如 HTTP 服务器）通信时，你的客户端程序也会更复杂。然而，基础知识与此程序中的基本相同：

1. 打开套接字。
2. 打开套接字的输入流和输出流。
3. 根据服务器的协议读取和写入流。
4. 关闭流。
5. 关闭套接字。

只有第 3 步因客户端而异，取决于服务器。其他步骤基本相同。

---

**上一页：** 什么是套接字？
**下一页：** 编写套接字的服务器端

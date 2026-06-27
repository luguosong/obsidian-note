---
分类:
  - "网页裁剪"
标题: "编写套接字的服务器端"
描述: "《Java 教程》自定义网络课程，通过 KnockKnock 笑话服务器/客户端示例演示如何编写套接字服务器端，涵盖 ServerSocket、accept、协议类、多客户端支持。"
来源: "https://docs.oracle.com/javase/tutorial/networking/sockets/clientServer.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 编写套接字的服务器端

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 编写套接字的服务器端

本节向你展示如何编写服务器及其配套客户端。客户端/服务器对中的服务器提供 Knock Knock 笑话。Knock Knock 笑话受孩子们喜爱，通常是不太高明的双关语的载体。它们是这样的：

**服务器**：「Knock knock!」（咚咚！）
**客户端**：「Who's there?」（谁呀？）
**服务器**：「Dexter.」（德克斯特。）
**客户端**：「Dexter who?」（哪个德克斯特？）
**服务器**：「Dexter halls with boughs of holly.」（德克斯特用冬青枝装饰大厅。*双关*）
**客户端**：「Groan.」（呻吟。）

示例由两个独立运行的 Java 程序组成：客户端程序和服务器程序。客户端程序由单个类 [`KnockKnockClient`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/KnockKnockClient.java) 实现，与上一节的 [`EchoClient`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/EchoClient.java) 示例非常相似。服务器程序由两个类实现：[`KnockKnockServer`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/KnockKnockServer.java) 和 [`KnockKnockProtocol`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/KnockKnockProtocol.java)。`KnockKnockServer` 类似于 [`EchoServer`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/EchoServer.java)，包含服务器程序的 `main` 方法并执行监听端口、建立连接、读写套接字的工作。[`KnockKnockProtocol`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/KnockKnockProtocol.java) 类提供笑话。它跟踪当前笑话、当前状态（已发送 knock knock、已发送线索等），并根据当前状态返回笑话的各种文本片段。此对象实现了协议——客户端和服务器商定用于通信的语言。

下一节详细查看客户端和服务器的每个类，然后向你展示如何运行它们。

## Knock Knock 服务器

本节逐步讲解实现 Knock Knock 服务器程序 [`KnockKnockServer`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/KnockKnockServer.java) 的代码。

服务器程序首先创建一个新的 [`ServerSocket`](https://docs.oracle.com/javase/8/docs/api/java/net/ServerSocket.html) 对象来监听特定端口（参见以下代码段中粗体显示的语句）。运行此服务器时，选择一个尚未专用于其他服务的端口。例如，此命令启动服务器程序 `KnockKnockServer`，使其监听端口 4444：

```bash
java KnockKnockServer 4444
```

服务器程序在 `try` -with-resources 语句中创建 `ServerSocket` 对象：

```java
int portNumber = Integer.parseInt(args[0]);

try (
    ServerSocket serverSocket = new ServerSocket(portNumber);
    Socket clientSocket = serverSocket.accept();
    PrintWriter out =
        new PrintWriter(clientSocket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(
        new InputStreamReader(clientSocket.getInputStream()));
) {
```

`ServerSocket` 是一个 [`java.net`](https://docs.oracle.com/javase/8/docs/api/java/net/package-frame.html) 类，提供客户端/服务器套接字连接服务器端的系统无关实现。如果 `ServerSocket` 的构造函数无法监听指定端口（例如，端口已被使用），则抛出异常。在这种情况下，`KnockKnockServer` 别无选择，只能退出。

如果服务器成功绑定到其端口，则 `ServerSocket` 对象成功创建，服务器继续下一步——接受来自客户端的连接（`try` -with-resources 语句中的下一条语句）：

```java
clientSocket = serverSocket.accept();
```

[`accept`](https://docs.oracle.com/javase/8/docs/api/java/net/ServerSocket.html#accept--) 方法等待直到客户端启动并在此服务器的主机和端口上请求连接。（假设你在名为 `knockknockserver.example.com` 的计算机上运行了服务器程序 `KnockKnockServer`。）在此示例中，服务器在第一个命令行参数指定的端口号上运行。当请求连接并成功建立时，accept 方法返回一个新的 [`Socket`](https://docs.oracle.com/javase/8/docs/api/java/net/Socket.html) 对象，该对象绑定到相同的本地端口，并将其远程地址和远程端口设置为客户端的地址和端口。服务器可以通过此新 `Socket` 与客户端通信，并继续在原始 `ServerSocket` 上监听客户端连接请求。此特定版本的程序不监听更多客户端连接请求。然而，在[支持多个客户端](#later)中提供了该程序的修改版本。

服务器成功建立与客户端的连接后，它使用以下代码与客户端通信：

```java
try (
    // ...
    PrintWriter out =
        new PrintWriter(clientSocket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(
        new InputStreamReader(clientSocket.getInputStream()));
) {
    String inputLine, outputLine;

    // 发起与客户端的对话
    KnockKnockProtocol kkp = new KnockKnockProtocol();
    outputLine = kkp.processInput(null);
    out.println(outputLine);

    while ((inputLine = in.readLine()) != null) {
        outputLine = kkp.processInput(inputLine);
        out.println(outputLine);
        if (outputLine.equals("Bye."))
            break;
    }
```

此代码执行以下操作：

1. 获取套接字的输入和输出流，并在其上打开读取器和写入器。
2. 通过写入套接字发起与客户端的通信（粗体显示）。
3. 通过读取和写入套接字与客户端通信（`while` 循环）。

第 1 步已经很熟悉了。第 2 步以粗体显示，值得几句评论。上面代码段中的粗体语句发起与客户端的对话。代码创建一个 `KnockKnockProtocol` 对象——跟踪当前笑话、笑话内当前状态等的对象。

创建 `KnockKnockProtocol` 后，代码调用 `KnockKnockProtocol` 的 `processInput` 方法获取服务器发送给客户端的第一条消息。对于此示例，服务器说的第一件事是「Knock! Knock!」。接下来，服务器将信息写入连接到客户端套接字的 [`PrintWriter`](https://docs.oracle.com/javase/8/docs/api/java/io/PrintWriter.html)，从而将消息发送给客户端。

第 3 步编码在 `while` 循环中。只要客户端和服务器仍然有话要说，服务器就读取和写入套接字，在客户端和服务器之间来回发送消息。

服务器以「Knock! Knock!」发起对话，因此之后服务器必须等待客户端说「Who's there?」。结果，`while` 循环在输入流的读取上迭代。`readLine` 方法等待直到客户端通过向其输出流（服务器的输入流）写入内容来响应。当客户端响应时，服务器将客户端的响应传递给 `KnockKnockProtocol` 对象，并向 `KnockKnockProtocol` 对象请求合适的回复。服务器立即通过调用 println 经由连接到套接字的输出流将回复发送给客户端。如果从 `KnockKnockServer` 对象生成的服务器响应是「Bye.」，这表示客户端不再需要更多笑话，循环退出。

Java 运行时自动关闭输入和输出流、客户端套接字和服务器套接字，因为它们是在 `try` -with-resources 语句中创建的。

## Knock Knock 协议

[`KnockKnockProtocol`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/KnockKnockProtocol.java) 类实现客户端和服务器用于通信的协议。此类跟踪客户端和服务器在对话中的位置，并提供服务器对客户端语句的响应。`KnockKnockProtocol` 对象包含所有笑话的文本，并确保客户端对服务器的语句给出适当的响应。当服务器说「Knock! Knock!」时，客户端说「Dexter who?」是不行的。

所有客户端/服务器对都必须有一些协议来相互交流；否则，来回传递的数据将毫无意义。你自己的客户端和服务器使用的协议完全取决于它们为完成任务所需的通信。

## Knock Knock 客户端

[`KnockKnockClient`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/KnockKnockClient.java) 类实现与 `KnockKnockServer` 对话的客户端程序。`KnockKnockClient` 基于上一节[[自定义网络-Socket-readingWriting|从套接字读取和写入套接字]]中的 `EchoClient` 程序，你应该有些熟悉。但我们还是会过一遍程序，并在服务器中发生的事情背景下查看客户端中发生的事情。

当你启动客户端程序时，服务器应该已经在运行并监听端口，等待客户端请求连接。因此，客户端程序做的第一件事是打开一个连接到在指定主机名和端口上运行的服务器的套接字：

```java
String hostName = args[0];
int portNumber = Integer.parseInt(args[1]);

try (
    Socket kkSocket = new Socket(hostName, portNumber);
    PrintWriter out = new PrintWriter(kkSocket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(
        new InputStreamReader(kkSocket.getInputStream()));
)
```

创建其套接字时，`KnockKnockClient` 示例使用第一个命令行参数的主机名，即网络上运行服务器程序 `KnockKnockServer` 的计算机的名称。

`KnockKnockClient` 示例在创建其套接字时使用第二个命令行参数作为端口号。这是一个*远程端口号*——服务器计算机上的端口号——是 `KnockKnockServer` 监听的端口。例如，以下命令运行 `KnockKnockClient` 示例，其中 `knockknockserver.example.com` 是运行服务器程序 `KnockKnockServer` 的计算机的名称，4444 是远程端口号：

```bash
java KnockKnockClient knockknockserver.example.com 4444
```

客户端的套接字绑定到任何可用的*本地端口*——客户端计算机上的端口。记住服务器也会获得一个新套接字。如果你使用上一个示例中的命令行参数运行 `KnockKnockClient` 示例，则此套接字绑定到你运行 `KnockKnockClient` 示例的计算机上的本地端口号 4444。服务器的套接字和客户端的套接字是连接的。

接下来是实现客户端和服务器之间通信的 `while` 循环。服务器先说话，所以客户端必须先监听。客户端通过读取连接到套接字的输入流来做到这一点。如果服务器确实说话了，它说「Bye.」并且客户端退出循环。否则，客户端将文本显示到标准输出，然后从用户那里读取响应，用户键入标准输入。用户键入回车后，客户端通过连接到套接字的输出流将文本发送到服务器。

```java
while ((fromServer = in.readLine()) != null) {
    System.out.println("Server: " + fromServer);
    if (fromServer.equals("Bye."))
        break;

    fromUser = stdIn.readLine();
    if (fromUser != null) {
        System.out.println("Client: " + fromUser);
        out.println(fromUser);
    }
}
```

当服务器询问客户端是否想听另一个笑话、客户端说不、服务器说「Bye.」时，通信结束。

客户端自动关闭其输入和输出流以及套接字，因为它们是在 `try` -with-resources 语句中创建的。

## 运行程序

你必须先启动服务器程序。为此，像运行任何其他 Java 应用程序一样，使用 Java 解释器运行服务器程序。将服务器程序监听的端口号指定为命令行参数：

```bash
java KnockKnockServer 4444
```

接下来，运行客户端程序。注意，你可以在网络上的任何计算机上运行客户端；它不必与服务器在同一台计算机上运行。将运行 `KnockKnockServer` 服务器程序的计算机的主机名和端口号指定为命令行参数：

```bash
java KnockKnockClient knockknockserver.example.com 4444
```

如果你太快，可能会在服务器有机会初始化并开始在端口上监听之前启动客户端。如果发生这种情况，你将看到来自客户端的堆栈跟踪。如果发生这种情况，只需重启客户端。

如果你在第一个客户端连接到服务器时尝试启动第二个客户端，第二个客户端会挂起。下一节[支持多个客户端](#later)讨论支持多个客户端。

当你在客户端和服务器之间成功建立连接时，你将看到屏幕上显示以下文本：

```text
Server: Knock! Knock!
```

现在，你必须响应：

```text
Who's there?
```

客户端回显你键入的内容并将文本发送到服务器。服务器以其众多 Knock Knock 笑话之一的第一行响应。现在你的屏幕应包含此内容（你键入的文本是粗体）：

```text
Server: Knock! Knock!
Who's there?
Client: Who's there?
Server: Turnip
```

现在，你响应：

```text
Turnip who?
```

同样，客户端回显你键入的内容并将文本发送到服务器。服务器以笑话语回应。现在你的屏幕应包含此内容：

```text
Server: Knock! Knock!
Who's there?
Client: Who's there?
Server: Turnip
Turnip who?
Client: Turnip who?
Server: Turnip the heat, it's cold in here! Want another? (y/n)
```

如果你想听另一个笑话，键入 **y**；如果不想，键入 **n**。如果你键入 **y**，服务器再次以「Knock! Knock!」开始。如果你键入 **n**，服务器说「Bye.」，从而导致客户端和服务器都退出。

如果你在任何时候打错了字，`KnockKnockServer` 对象会捕获它，服务器会以类似这样的消息响应：

```text
Server: You're supposed to say "Who's there?"!
```

然后服务器重新开始笑话：

```text
Server: Try again. Knock! Knock!
```

注意，`KnockKnockProtocol` 对象对拼写和标点符号很讲究，但对大小写不介意。

## 支持多个客户端

为了保持 `KnockKnockServer` 示例简单，我们将其设计为监听和处理单个连接请求。然而，多个客户端请求可以进入同一端口，因此也进入同一个 `ServerSocket`。客户端连接请求在端口处排队，因此服务器必须按顺序接受连接。然而，服务器可以通过使用线程同时为它们服务——每个客户端连接一个线程。

此类服务器的基本逻辑流如下：

```text
while (true) {
    accept a connection;
    create a thread to deal with the client;
}
```

线程根据需要从客户端连接读取和写入。

---

**试试这个：**

修改 `KnockKnockServer` 使其可以同时为多个客户端服务。两个类组成我们的解决方案：[`KKMultiServer`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/KKMultiServer.java) 和 [`KKMultiServerThread`](https://docs.oracle.com/javase/tutorial/networking/sockets/examples/KKMultiServerThread.java)。`KKMultiServer` 永远循环，监听 `ServerSocket` 上的客户端连接请求。当请求进来时，`KKMultiServer` 接受连接，创建一个新的 `KKMultiServerThread` 对象来处理它，将 accept 返回的套接字交给它，并启动线程。然后服务器回去监听连接请求。`KKMultiServerThread` 对象通过从套接字读取和写入来与客户端通信。运行新的 Knock Knock 服务器 `KKMultiServer`，然后连续运行多个客户端。

---

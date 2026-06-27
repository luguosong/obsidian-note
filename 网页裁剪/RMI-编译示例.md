---
分类:
  - "网页裁剪"
标题: "Compiling the Example Programs (The Java™ Tutorials >        
            RMI)"
描述: "This RMI Java tutorial describes the Java RMI system. It walks through a complete client/server example"
来源: "https://docs.oracle.com/javase/tutorial/rmi/compiling.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[RMI-概述|An Overview of RMI Applications]]

[[RMI-服务器|Writing an RMI Server]]

[[RMI-设计远程接口|Designing a Remote Interface]]

[[RMI-实现远程接口|Implementing a Remote Interface]]

[[RMI-客户端|Creating a Client Program]]

[[RMI-示例|Compiling and Running the Example]]

Compiling the Example Programs

[[RMI-运行示例|Running the Example Programs]]

[[RMI-示例|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/rmi/TOC.html) • [[RMI-运行示例|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Compiling the Example Programs

In a real-world scenario in which a service such as the compute engine is deployed, a developer would likely create a Java Archive (JAR) file that contains the `Compute` and `Task` interfaces for server classes to implement and client programs to use. Next, a developer, perhaps the same developer of the interface JAR file, would write an implementation of the `Compute` interface and deploy that service on a machine available to clients. Developers of client programs can use the `Compute` and the `Task` interfaces, contained in the JAR file, and independently develop a task and client program that uses a `Compute` service.

In this section, you learn how to set up the JAR file, server classes, and client classes. You will see that the client's `Pi` class will be downloaded to the server at runtime. Also, the `Compute` and `Task` interfaces will be downloaded from the server to the registry at runtime.

This example separates the interfaces, remote object implementation, and client code into three packages:

- `compute` – [`Compute`](https://docs.oracle.com/javase/tutorial/rmi/examples/compute/Compute.java) and [`Task`](https://docs.oracle.com/javase/tutorial/rmi/examples/compute/Task.java) interfaces
- `engine` – [`ComputeEngine`](https://docs.oracle.com/javase/tutorial/rmi/examples/engine/ComputeEngine.java) implementation class
- `client` – [`ComputePi`](https://docs.oracle.com/javase/tutorial/rmi/examples/client/ComputePi.java) client code and [`Pi`](https://docs.oracle.com/javase/tutorial/rmi/examples/client/Pi.java) task implementation

First, you need to build the interface JAR file to provide to server and client developers.

## Building a JAR File of Interface Classes

First, you need to compile the interface source files in the `compute` package and then build a JAR file that contains their class files. Assume that user `waldo` has written these interfaces and placed the source files in the directory `C:\home\waldo\src\compute` on Windows or the directory `/home/waldo/src/compute` on Solaris or Linux. Given these paths, you can use the following commands to compile the interfaces and create the JAR file:

**Microsoft Windows**:

```bash
cd C:\home\waldo\src
javac compute\Compute.java compute\Task.java
jar cvf compute.jar compute\*.class
```

**Solaris or Linux**:

```bash
cd /home/waldo/src
javac compute/Compute.java compute/Task.java
jar cvf compute.jar compute/*.class
```

---

The `jar` command displays the following output due to the `-v` option:

```yaml
added manifest
adding: compute/Compute.class(in = 307) (out= 201)(deflated 34%)
adding: compute/Task.class(in = 217) (out= 149)(deflated 31%)
```

Now, you can distribute the `compute.jar` file to developers of server and client applications so that they can make use of the interfaces.

After you build either server-side or client-side classes with the `javac` compiler, if any of those classes will need to be dynamically downloaded by other Java virtual machines, you must ensure that their class files are placed in a network-accessible location. In this example, for Solaris or Linux this location is `/home/*user*/public_html/classes` because many web servers allow the accessing of a user's `public_html` directory through an HTTP URL constructed as `http://host/~*user*/`. If your web server does not support this convention, you could use a different location in the web server's hierarchy, or you could use a file URL instead. The file URLs take the form `file://home/*user*/public_html/classes/` on Solaris or Linux and the form `file://C:/home/*user*/public_html/classes/` on Windows. You may also select another type of URL, as appropriate.

The network accessibility of the class files enables the RMI runtime to download code when needed. Rather than defining its own protocol for code downloading, RMI uses URL protocols supported by the Java platform (for example, HTTP) to download code. Note that using a full, heavyweight web server to serve these class files is unnecessary. For example, a simple HTTP server that provides the functionality needed to make classes available for downloading in RMI through HTTP can be found at .  
Also see [Remote Method Invocation Home](http://www.oracle.com/technetwork/java/javase/tech/index-jsp-136424.html).

## Building the Server Classes

The `engine` package contains only one server-side implementation class, `ComputeEngine`, the implementation of the remote interface `Compute`.

Assume that user `ann`, the developer of the `ComputeEngine` class, has placed `ComputeEngine.java` in the directory `C:\home\ann\src\engine` on Windows or the directory `/home/ann/src/engine` on Solaris or Linux. She is deploying the class files for clients to download in a subdirectory of her `public_html` directory, `C:\home\ann\public_html\classes` on Windows or `/home/ann/public_html/classes` on Solaris or Linux. This location is accessible through some web servers as `http://*host*:*port*/~ann/classes/`.

The `ComputeEngine` class depends on the `Compute` and `Task` interfaces, which are contained in the `compute.jar` JAR file. Therefore, you need the `compute.jar` file in your class path when you build the server classes. Assume that the `compute.jar` file is located in the directory `C:\home\ann\public_html\classes` on Windows or the directory `/home/ann/public_html/classes` on Solaris or Linux. Given these paths, you can use the following commands to build the server classes and then copy them to a network-accessible location:

**Microsoft Windows**:

```bash
cd C:\home\ann\src
javac -cp C:\home\ann\public_html\classes\compute.jar ^
    engine\ComputeEngine.java 
mkdir C:\home\ann\public_html\classes\engine
cp engine\ComputeEngine.class C:\home\ann\public_html\classes\engine
```

**Solaris or Linux**:

```bash
cd /home/ann/src
javac -cp /home/ann/public_html/classes/compute.jar \
    engine/ComputeEngine.java
mkdir /home/ann/public_html/classes/engine
cp engine/ComputeEngine.class /home/ann/public_html/classes/engine
```

---

**Note:** The carat (`^`) is the line continuation character in Windows, while the backslash (`\`) is the line continuation character in Solaris and Linux. The line continuation character enables you to enter a command that spans multiple lines in a command prompt.

---

The stub class for `ComputeEngine` implements the `Compute` interface, which refers to the `Task` interface. So, the class definitions for those two interfaces need to be network-accessible for the stub to be received by other Java virtual machines such as the registry's Java virtual machine. The client Java virtual machine will already have these interfaces in its class path, so it does not actually need to download their definitions. The `compute.jar` file under the `public_html` directory can serve this purpose.

Now, the compute engine is ready to deploy. You could do that now, or you could wait until after you have built the client.

## Building the Client Classes

The `client` package contains two classes, `ComputePi`, the main client program, and `Pi`, the client's implementation of the `Task` interface.

Assume that user `jones`, the developer of the client classes, has placed `ComputePi.java` and `Pi.java` in the directory `C:\home\jones\src\client` on Windows or the directory `/home/jones/src/client` on Solaris or Linux. He is deploying the class files for the compute engine to download in a subdirectory of his `public_html` directory, `C:\home\jones\public_html\classes` on Windows or `/home/jones/public_html/classes` on Solaris or Linux. This location is accessible through some web servers as `http://*host*:*port*/~jones/classes/`.

The client classes depend on the `Compute` and `Task` interfaces, which are contained in the `compute.jar` JAR file. Therefore, you need the `compute.jar` file in your class path when you build the client classes. Assume that the `compute.jar` file is located in the directory `C:\home\jones\public_html\classes` on Windows or the directory `/home/jones/public_html/classes` on Solaris or Linux. Given these paths, you can use the following commands to build the client classes:

**Microsoft Windows**:

```bash
cd C:\home\jones\src
javac -cp C:\home\jones\public_html\classes\compute.jar ^
    client\ComputePi.java client\Pi.java
mkdir C:\home\jones\public_html\classes\client
cp client\Pi.class ^
    C:\home\jones\public_html\classes\client
```

**Solaris or Linux**:

```bash
cd /home/jones/src
javac -cp /home/jones/public_html/classes/compute.jar \
    client/ComputePi.java client/Pi.java
mkdir /home/jones/public_html/classes/client
cp client/Pi.class \
    /home/jones/public_html/classes/client
```

Only the `Pi` class needs to be placed in the directory `public_html\classes\client` because only the `Pi` class needs to be available for downloading to the compute engine's Java virtual machine. Now, you can run the server and then the client.
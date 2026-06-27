---
分类:
  - "网页裁剪"
标题: "RMI-运行示例"
描述: "This RMI Java tutorial describes the Java RMI system. It walks through a complete client/server example"
来源: "https://docs.oracle.com/javase/tutorial/rmi/running.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# RMI-运行示例

Documentation

[[RMI-概述|An Overview of RMI Applications]]

[[RMI-服务器|Writing an RMI Server]]

[[RMI-设计远程接口|Designing a Remote Interface]]

[[RMI-实现远程接口|Implementing a Remote Interface]]

[[RMI-客户端|Creating a Client Program]]

[[RMI-示例|Compiling and Running the Example]]

[[RMI-编译示例|Compiling the Example Programs]]

Running the Example Programs

[[RMI-编译示例|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/rmi/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/rmi/end.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Running the Example Programs

## A Note About Security

The server and client programs run with a security manager installed. When you run either program, you need to specify a security policy file so that the code is granted the security permissions it needs to run. Here is an example policy file, [`server.policy`](https://docs.oracle.com/javase/tutorial/rmi/examples/server.policy) to use with the server program running on Solaris or Linux:

```text
grant codeBase "file:///home/ann/src/" {
    permission java.security.AllPermission;
};
```

Here is an example policy file, [`client.policy`](https://docs.oracle.com/javase/tutorial/rmi/examples/client.policy) to use with the client program running on Solaris or Linux:

```text
grant codeBase "file:///home/jones/src/" {
    permission java.security.AllPermission;
};
```

Here is an example `server.policy` file for Windows:

```text
grant codeBase "file://C:/home/ann/src/" {
    permission java.security.AllPermission;
};
```

Here is an example `client.policy` file for Windows:

```text
grant codeBase "file://C:/home/jones/src/" {
    permission java.security.AllPermission;
};
```

---

**Note:** The exact meaning of a `codeBase` value depends on the characters at the end. A `codeBase` with a trailing `/` matches all class files (not JAR files) in the specified directory. A `codeBase` with a trailing `/*` matches all files (both class and JAR files) contained in that directory. A `codeBase` with a trailing `/-` matches all files (both class and JAR files) in the directory and recursively all files in subdirectories contained in that directory. See [Default Policy Implementation and Policy File Syntax](https://docs.oracle.com/javase/8/docs/technotes/guides/security/PolicyFiles.html) for more information.

---

For these example policy files, all permissions are granted to the classes in the program's local class path, because the local application code is trusted, but no permissions are granted to code downloaded from other locations. Therefore, the compute engine server restricts the tasks that it executes (whose code is not known to be trusted and might be hostile) from performing any operations that require security permissions. The example client's `Pi` task does not require any permissions to execute.

In this example, the policy file for the server program is named `server.policy`, and the policy file for the client program is named `client.policy`.

## Starting the Server

Before starting the compute engine, you need to start the RMI registry. The RMI registry is a simple server-side bootstrap naming facility that enables remote clients to obtain a reference to an initial remote object. It can be started with the `rmiregistry` command. Before you execute `rmiregistry`, you must make sure that the shell or window in which you will run `rmiregistry` either has no `CLASSPATH` environment variable set or has a `CLASSPATH` environment variable that does not include the path to any classes that you want downloaded to clients of your remote objects.

To start the registry on the server, execute the `rmiregistry` command. This command produces no output and is typically run in the background. For this example, the registry is started on the host `mycomputer`.

**Microsoft Windows**:

```text
javaw rmiregistry -J-Djava.rmi.server.codebase=file://C:/home/ann/public_html/classes/
```

**Solaris or Linux**:

```text
rmiregistry -J-Djava.rmi.server.codebase=file:///home/ann/public_html/classes/ &
```

As these examples demonstrate, when you start the registry on the server, you must specify where the server's classes are network accessible with the `java.rmi.server.codebase` property. You can also use an HTTP URL instead:

```text
javaw rmiregistry -J-Djava.rmi.server.codebase=http://mycomputer.example.com/~ann/classes/
```

See [`java.rmi` Properties](https://docs.oracle.com/javase/8/docs/technotes/guides/rmi/javarmiproperties.html) for more information about the `java.rmi.server.codebase` and other RMI system properties.

By default, the registry runs on port 1099. To start the registry on a different port, specify the port number on the command line. Do not forget to unset your `CLASSPATH` environment variable.

**Microsoft Windows**:

```text
javaw rmiregistry -J-Djava.rmi.server.codebase=file://C:/home/ann/public_html/classes/ 2001
```

**Solaris or Linux**:

```text
rmiregistry -J-Djava.rmi.server.codebase=file:///home/ann/public_html/classes/ 2001 &
```

Once the registry is started, you can start the server. You need to make sure that both the `compute.jar` file and the remote object implementation class are in your class path. When you start the compute engine, you need to specify, using the `java.rmi.server.codebase` property, where the server's classes are network accessible. In this example, the server-side classes to be made available for downloading are the `Compute` and `Task` interfaces, which are available in the `compute.jar` file in the `public_html\classes` directory of user `ann`. The compute engine server is started on the host `mycomputer`, the same host on which the registry was started.

**Microsoft Windows**:

```bash
java -cp C:\home\ann\src;C:\home\ann\public_html\classes\compute.jar ^
     -Djava.rmi.server.codebase=file://C:/home/ann/public_html/classes/ ^
     -Djava.rmi.server.hostname=mycomputer.example.com ^
     -Djava.security.policy=server.policy ^
        engine.ComputeEngine
```text

**Solaris or Linux**:

```bash
java -cp /home/ann/src:/home/ann/public_html/classes/compute.jar \
     -Djava.rmi.server.codebase=file:///home/ann/public_html/classes/ \
     -Djava.rmi.server.hostname=mycomputer.example.com \
     -Djava.security.policy=server.policy \
        engine.ComputeEngine
```

The above `java` command defines the following system properties:

- The `java.rmi.server.codebase` property specifies the location, a codebase URL, from which the definitions for classes originating *from* this server can be downloaded. If the codebase specifies a directory hierarchy (as opposed to a JAR file), you must include a trailing slash at the end of the codebase URL.
- The `java.rmi.server.hostname` property specifies the host name or address to put in the stubs for remote objects exported in this Java virtual machine. This value is the host name or address used by clients when they attempt to communicate remote method invocations. By default, the RMI implementation uses the server's IP address as indicated by the `java.net.InetAddress.getLocalHost` API. However, sometimes, this address is not appropriate for all clients and a fully qualified host name would be more effective. To ensure that RMI uses a host name (or IP address) for the server that is routable from all potential clients, set the `java.rmi.server.hostname` property.
- The `java.security.policy` property is used to specify the policy file that contains the permissions you intend to grant.

## Starting the Client

Once the registry and the compute engine are running, you can start the client, specifying the following:

- The location where the client serves its classes (the `Pi` class) by using the `java.rmi.server.codebase` property
- The `java.security.policy` property, which is used to specify the security policy file that contains the permissions you intend to grant to various pieces of code
- As command-line arguments, the host name of the server (so that the client knows where to locate the `Compute` remote object) and the number of decimal places to use in the calculation

Start the client on another host (a host named `mysecondcomputer`, for example) as follows:

---

**Microsoft Windows**:

```text
java -cp C:\home\jones\src;C:\home\jones\public_html\classes\compute.jar ^
     -Djava.security.policy=client.policy ^
        client.ComputePi mycomputer.example.com 45
```

**Solaris or Linux**:

```bash
java -cp /home/jones/src:/home/jones/public_html/classes/compute.jar \
     -Djava.security.policy=client.policy \
        client.ComputePi mycomputer.example.com 45
```text

Note that the class path is set on the command line so that the interpreter can find the client classes and the JAR file containing the interfaces.

After you start the client, the following output is displayed:

```text
3.141592653589793238462643383279502884197169399
```

The following figure illustrates where the `rmiregistry`, the `ComputeEngine` server, and the `ComputePi` client obtain classes during program execution.

![[RMI--rmi-5.gif]]

When the `ComputeEngine` server binds its remote object reference in the registry, the registry downloads the `Compute` and `Task` interfaces on which the stub class depends. These classes are downloaded from either the `ComputeEngine` server's web server or file system, depending on the type of codebase URL used when starting the server.

Because the `ComputePi` client has both the `Compute` and the `Task` interfaces available in its class path, it loads their definitions from its class path, not from the server's codebase.

Finally, the `Pi` class is loaded into the `ComputeEngine` server's Java virtual machine when the `Pi` object is passed in the `executeTask` remote call to the `ComputeEngine` object. The `Pi` class is loaded by the server from either the client's web server or file system, depending on the type of codebase URL used when starting the client.

---

**Note:** See [RMI Security Recommendations](https://docs.oracle.com/javase/8/docs/technotes/guides/rmi/rmi_security_recommendations.html) to improve the security of your RMI applications.

---
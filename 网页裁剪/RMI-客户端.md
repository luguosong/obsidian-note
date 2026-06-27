---
分类:
  - "网页裁剪"
标题: "创建 RMI 客户端程序"
描述: "《Java 教程》RMI 路线课程，演示计算引擎客户端的实现，包括 ComputePi 主类和实现 Task 接口的 Pi 类，展示 RMI 动态代码加载的机制。"
来源: "https://docs.oracle.com/javase/tutorial/rmi/client.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 创建 RMI 客户端程序

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 创建客户端程序

计算引擎是一个相对简单的程序：它运行交给它的任务。计算引擎的客户端更为复杂。客户端需要调用计算引擎，但它还必须定义计算引擎要执行的任务。

在我们的示例中，两个独立的类构成客户端。第一个类 `ComputePi` 查找并调用 `Compute` 对象。第二个类 `Pi` 实现 `Task` 接口并定义计算引擎要完成的工作。`Pi` 类的工作是计算圆周率 π 到一定数量的小数位。

非远程的 [`Task`](https://docs.oracle.com/javase/tutorial/rmi/examples/compute/Task.java) 接口定义如下：

```java
package compute;

public interface Task<T> {
    T execute();
}
```java

调用 `Compute` 对象方法的代码必须获取对该对象的引用、创建一个 `Task` 对象，然后请求执行该任务。任务类 `Pi` 的定义稍后展示。`Pi` 对象用单个参数构造，即结果的所需精度。任务执行的结果是一个 `java.math.BigDecimal`，表示计算到指定精度的 π。

以下是主客户端类 [`client.ComputePi`](https://docs.oracle.com/javase/tutorial/rmi/examples/client/ComputePi.java) 的源代码：

```java
package client;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.math.BigDecimal;
import compute.Compute;

public class ComputePi {
    public static void main(String args[]) {
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }
        try {
            String name = "Compute";
            Registry registry = LocateRegistry.getRegistry(args[0]);
            Compute comp = (Compute) registry.lookup(name);
            Pi task = new Pi(Integer.parseInt(args[1]));
            BigDecimal pi = comp.executeTask(task);
            System.out.println(pi);
        } catch (Exception e) {
            System.err.println("ComputePi exception:");
            e.printStackTrace();
        }
    }    
}
```

与 `ComputeEngine` 服务器一样，客户端首先安装安全管理器。此步骤是必要的，因为接收服务器远程对象存根的过程可能需要从服务器下载类定义。要让 RMI 下载类，必须有一个安全管理器生效。

安装安全管理器后，客户端构造一个名称用于查找 `Compute` 远程对象，使用与 `ComputeEngine` 绑定其远程对象相同的名称。此外，客户端使用 `LocateRegistry.getRegistry` API 合成对服务器主机上注册表的远程引用。第一个命令行参数 `args[0]` 的值是运行 `Compute` 对象的远程主机的名称。然后客户端调用注册表上的 `lookup` 方法，按名称在服务器主机的注册表中查找远程对象。所使用的 `LocateRegistry.getRegistry` 的特定重载（具有单个 `String` 参数）返回对命名主机和默认注册表端口 1099 处注册表的引用。如果注册表创建在 1099 以外的端口上，必须使用具有 `int` 参数的重载。

接下来，客户端创建一个新的 `Pi` 对象，将第二个命令行参数 `args[1]` 解析为整数后传递给 `Pi` 构造器。此参数指示计算中使用的小数位数。最后，客户端调用 `Compute` 远程对象的 `executeTask` 方法。传递给 `executeTask` 调用的对象返回一个 `BigDecimal` 类型的对象，程序将其存储在变量 `result` 中。最后，程序打印结果。下图描绘了 `ComputePi` 客户端、`rmiregistry` 和 `ComputeEngine` 之间的消息流。

![[rmi-client-rmi-4.gif]]

`Pi` 类实现 `Task` 接口并计算 π 到指定数量小数位的值。对于此示例，实际算法并不重要。重要的是该算法计算量大，意味着你会希望它在功能强大的服务器上执行。

以下是实现 `Task` 接口的类 [`client.Pi`](https://docs.oracle.com/javase/tutorial/rmi/examples/client/Pi.java) 的源代码：

```java
package client;

import compute.Task;
import java.io.Serializable;
import java.math.BigDecimal;

public class Pi implements Task<BigDecimal>, Serializable {

    private static final long serialVersionUID = 227L;

    /** pi 计算中使用的常量 */
    private static final BigDecimal FOUR =
        BigDecimal.valueOf(4);

    /** pi 计算期间使用的舍入模式 */
    private static final int roundingMode = 
        BigDecimal.ROUND_HALF_EVEN;

    /** 小数点后的精度位数 */
    private final int digits;
    
    /**
     * 构造一个任务，计算 pi 到指定精度。
     */
    public Pi(int digits) {
        this.digits = digits;
    }

    /**
     * 计算 pi。
     */
    public BigDecimal execute() {
        return computePi(digits);
    }

    /**
     * 计算 pi 到指定小数位数的值。该值
     * 使用 Machin 公式计算：
     *
     *          pi/4 = 4*arctan(1/5) - arctan(1/239)
     *
     * 以及 arctan(x) 的幂级数展开到
     * 足够的精度。
     */
    public static BigDecimal computePi(int digits) {
        int scale = digits + 5;
        BigDecimal arctan1_5 = arctan(5, scale);
        BigDecimal arctan1_239 = arctan(239, scale);
        BigDecimal pi = arctan1_5.multiply(FOUR).subtract(
                                  arctan1_239).multiply(FOUR);
        return pi.setScale(digits, 
                           BigDecimal.ROUND_HALF_UP);
    }
    /**
     * 计算所提供整数的反正切的值（以弧度为单位），
     * 到指定的小数位数。该值使用反正切的
     * 幂级数展开计算：
     *
     * arctan(x) = x - (x^3)/3 + (x^5)/5 - (x^7)/7 + 
     *     (x^9)/9 ...
     */   
    public static BigDecimal arctan(int inverseX, 
                                    int scale) 
    {
        BigDecimal result, numer, term;
        BigDecimal invX = BigDecimal.valueOf(inverseX);
        BigDecimal invX2 = 
            BigDecimal.valueOf(inverseX * inverseX);

        numer = BigDecimal.ONE.divide(invX,
                                      scale, roundingMode);

        result = numer;
        int i = 1;
        do {
            numer = 
                numer.divide(invX2, scale, roundingMode);
            int denom = 2 * i + 1;
            term = 
                numer.divide(BigDecimal.valueOf(denom),
                             scale, roundingMode);
            if ((i % 2) != 0) {
                result = result.subtract(term);
            } else {
                result = result.add(term);
            }
            i++;
        } while (term.compareTo(BigDecimal.ZERO) != 0);
        return result;
    }
}
```

注意，所有可序列化的类，无论是直接还是间接实现 `Serializable` 接口，都必须声明一个名为 `serialVersionUID` 的 `private` `static` `final` 字段，以保证版本之间的序列化兼容性。如果该类没有发布过以前的版本，则此字段的值可以是任何 `long` 值，类似于 `Pi` 使用的 `227L`，只要该值在未来版本中一致使用即可。如果该类以前发布的版本没有显式声明 `serialVersionUID`，但与该版本的序列化兼容性很重要，则新版本的显式声明值必须使用以前版本的默认隐式计算值。可以对以前的版本运行 `serialver` 工具以确定其默认计算值。

此示例最有趣的特性是 `Compute` 实现对象在 `Pi` 对象作为参数传递给 `executeTask` 方法之前，从不需要 `Pi` 类的定义。此时，该类的代码由 RMI 加载到 `Compute` 对象的 Java 虚拟机中，调用 `execute` 方法，并执行任务的代码。结果（在 `Pi` 任务的情况下是 `BigDecimal` 对象）被交还给调用客户端，在那里用于打印计算结果。

所提供的 `Task` 对象计算 `Pi` 值这一事实对 `ComputeEngine` 对象无关紧要。你也可以实现一个任务，例如，使用概率算法生成随机素数。该任务也将是计算密集型的，因此是传递给 `ComputeEngine` 的好候选者，但它需要非常不同的代码。当 `Task` 对象传递给 `Compute` 对象时，也可以下载此代码。就像需要时引入计算算法一样，需要时也会引入生成随机素数的代码。`Compute` 对象只知道它接收的每个对象都实现 `execute` 方法。`Compute` 对象不知道、也不需要知道实现做什么。

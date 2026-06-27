---
分类:
  - "网页裁剪"
标题: "下载扩展"
描述: "《Java 教程》扩展机制课程，介绍下载扩展——通过 JAR 文件清单的 Class-Path 或 Extension-List 头引用的扩展，并通过 AreaApplet 示例演示下载扩展的创建与安装。"
来源: "https://docs.oracle.com/javase/tutorial/ext/basics/download.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 下载扩展

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 下载扩展

下载扩展是 JAR 文件中的一组类（和相关资源）。JAR 文件的清单可以包含引用一个或多个下载扩展的头。扩展可以通过以下两种方式之一引用：

- 通过 Class-Path 头
- 通过 Extension-List 头

注意，清单中每种最多允许一个。由 Class-Path 头指示的下载扩展仅在下载它们的应用程序（如 Web 浏览器）的生命周期内下载。它们的优点是客户端上没有安装任何东西；缺点是每次需要时都会下载它们。由 Extension-List 头下载的下载扩展安装在下载它们的 JRE 的 /lib/ext 目录中。它们的优点是第一次需要时下载；随后无需下载即可使用。但是，如本教程后面所示，它们的部署更复杂。

由于使用 Class-Path 头的下载扩展更简单，让我们首先考虑它们。例如，假设 a.jar 和 b.jar 是同一目录中的两个 JAR 文件，并且 a.jar 的清单包含此头：

```text
Class-Path: b.jar
```

则 b.jar 中的类作为 a.jar 中类的扩展类。a.jar 中的类可以调用 b.jar 中的类，而无需在类路径上命名 b.jar 的类。a.jar 本身可能是也可能不是扩展。如果 b.jar 不在与 a.jar 相同的目录中，则 Class-Path 头的值应设置为 b.jar 的相对路径名。

充当下载扩展的类没有什么特别之处。它们之所以被视为扩展，仅仅是因为它们被某个其他 JAR 文件的清单引用。

为了更好地理解下载扩展的工作原理，让我们创建一个并投入使用。

## 一个示例

假设你想创建一个使用上一节 `RectangleArea` 类的小程序：

```java
public final class RectangleArea {
    public static int area(java.awt.Rectangle r) {
        return r.width * r.height;
    }
}
```

在上一节中，你通过将包含 RectangleArea 类的 JAR 文件放入 JRE 的 lib/ext 目录，使其成为已安装扩展。通过使其成为已安装扩展，你使任何应用程序都能像使用 Java 平台的一部分一样使用 RectangleArea 类。

如果你想能够从小程序中使用 RectangleArea 类，情况略有不同。例如，假设你有一个使用 RectangleArea 类的小程序 `AreaApplet`：

```java
import java.applet.Applet;
import java.awt.*;

public class AreaApplet extends Applet {
    Rectangle r;

    public void init() {
        int width = 10;
        int height = 5;

        r = new Rectangle(width, height);
    }

    public void paint(Graphics g) {
        g.drawString("The rectangle's area is "
                      + RectangleArea.area(r), 10, 10);
    }
}
```

此小程序实例化一个 10 x 5 的矩形，然后使用 RectangleArea.area 方法显示矩形的面积。

但是，你不能假设每个下载并使用你的小程序的人都会在其系统上（作为已安装扩展或其他方式）提供 RectangleArea 类。解决此问题的一种方法是从服务器端提供 RectangleArea 类，你可以通过将其用作下载扩展来实现。

要了解如何做到这一点，假设你已将 `AreaApplet` 捆绑在名为 AreaApplet.jar 的 JAR 文件中，并且 RectangleArea 类捆绑在 RectangleArea.jar 中。为了使 RectangleArea.jar 被视为下载扩展，RectangleArea.jar 必须列在 AreaApplet.jar 清单的 Class-Path 头中。AreaApplet.jar 的清单可能如下所示：

```text
Manifest-Version: 1.0
Class-Path: RectangleArea.jar
```

此清单中 Class-Path 头的值是 RectangleArea.jar，未指定路径，指示 RectangleArea.jar 与小程序的 JAR 文件位于同一目录中。

## 关于 Class-Path 头的更多信息

如果小程序或应用程序使用多个扩展，你可以在清单中列出多个 URL。例如，以下是有效的头：

```text
Class-Path: area.jar servlet.jar images/
```

在 Class-Path 头中，列出的任何不以「 / 」结尾的 URL 都假定为 JAR 文件。以「 / 」结尾的 URL 指示目录。在前面的示例中，images/ 可能是包含小程序或应用程序所需资源的目录。

注意，清单文件中只允许一个 Class-Path 头，并且清单中的每一行不得超过 72 个字符。如果需要指定的类路径条目多于一行的容量，你可以将它们扩展到后续的续行。每个续行以两个空格开头。例如：

```text
Class-Path: area.jar servlet.jar monitor.jar datasource.jar
  provider.jar gui.jar
```

未来的版本可能会删除每个头只能有一个实例以及行限制为 72 个字符的限制。

下载扩展可以「菊花链」连接，这意味着一个下载扩展的清单可以有一个 Class-Path 头引用第二个扩展，第二个扩展可以引用第三个扩展，依此类推。

## 安装下载扩展

在上面的示例中，小程序下载的扩展仅在加载小程序的浏览器仍在运行时可用。但是，如果小程序和扩展的清单中都包含附加信息，小程序可以触发扩展的安装。

由于此机制扩展了平台的核心 API，因此其使用应谨慎应用。它很少适用于单个或少量应用程序使用的接口。所有可见符号都应遵循反向域名和类层次结构约定。

基本要求是小程序及其使用的扩展都在其清单中提供版本信息，并且它们都被签名。版本信息允许 Java 插件确保扩展代码具有小程序期望的版本。例如，AreaApplet 可以在其清单中指定一个 areatest 扩展：

```text
Manifest-Version: 1.0
Extension-List: areatest
areatest-Extension-Name: area
areatest-Specification-Version: 1.1
areatest-Implementation-Version: 1.1.2
areatest-Implementation-Vendor-Id: com.example
areatest-Implementation-URL: http://www.example.com/test/area.jar
```

area.jar 中的清单将提供相应的信息：

```text
Manifest-Version: 1.0
Extension-Name: area
Specification-Vendor: Example Tech, Inc
Specification-Version: 1.1
Implementation-Vendor-Id: com.example
Implementation-Vendor: Example Tech, Inc
Implementation-Version: 1.1.2
```

小程序和扩展都必须由同一签名者签名。对 jar 文件签名将就地修改它们，在其清单文件中提供更多信息。签名有助于确保只安装受信任的代码。签名 jar 文件的一种简单方法是首先创建一个密钥库，然后使用它来保存小程序和扩展的证书。例如：

```bash
keytool -genkey -dname "cn=Fred" -alias test  -validity 180
```

系统将提示你输入密钥库和密钥密码。生成密钥后，可以对 jar 文件进行签名：

```bash
jarsigner AreaApplet.jar test
jarsigner area.jar test
```

系统将提示你输入密钥库和密钥密码。有关 keytool、jarsigner 和其他安全工具的更多信息，请参阅 [Java 2 平台安全工具摘要](https://docs.oracle.com/javase/8/docs/technotes/guides/security/SecurityToolsSummary.html)。

以下是 AreaDemo.html，它加载小程序并导致扩展代码被下载和安装：

```html
<html>
<body>
  <applet code="AreaApplet.class" archive="AreaApplet.jar"/>
</body>
</html>
```

首次加载页面时，用户被告知小程序需要安装扩展。随后的对话框通知用户有关已签名小程序的信息。接受两者会将扩展安装在 JRE 的 lib/ext 文件夹中并运行小程序。

重启 Web 浏览器并加载同一网页后，只会显示有关小程序签名者的对话框，因为 area.jar 已经安装。如果在不同的 Web 浏览器中打开 AreaDemo.html（假设两个浏览器使用相同的 JRE），情况也是如此。

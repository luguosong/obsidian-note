---
分类:
  - "网页裁剪"
标题: "将 XML 数据读取到 DOM"
描述: "《Java 教程》JAXP DOM 课程，详细介绍如何通过读取现有 XML 文件构建文档对象模型，涵盖创建程序骨架、导入类、错误处理、实例化工厂、配置验证和显示 DOM 节点。"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/dom/readingXML.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 将 XML 数据读取到 DOM

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 将 XML 数据读取到 DOM

在本节中，你将通过读取现有 XML 文件来构建文档对象模型。

---

**注意 -** 在 [[JAXP-XSLT|可扩展样式表语言转换]]中，你将看到如何将 DOM 写出为 XML 文件。（你还将看到如何相对轻松地将现有数据文件转换为 XML。）

---

## 创建程序

文档对象模型提供了让你创建、修改、删除和重新排列节点的 API。在尝试创建 DOM 之前，了解 DOM 的结构方式很有帮助。这一系列示例将通过一个名为 DOMEcho 的示例程序使 DOM 内部结构可见，安装 JAXP API 后你可以在目录 *INSTALL\_DIR*/jaxp-*version*/samples/dom 中找到它。

### 创建骨架

首先，构建一个简单的程序来读取 XML 文档到 DOM 中，然后再写回。

从应用程序的正常基本逻辑开始，并检查命令行是否提供了参数：

```java
public class DOMEcho {

    static final String outputEncoding = "UTF-8";

    private static void usage() {
        // ...
    }

    public static void main(String[] args) throws Exception {
        String filename = null;

        for (int i = 0; i < args.length; i++) {
            if (...) {
                // ...
            }
            else {
                filename = args[i];
                if (i != args.length - 1) {
                    usage();
                }
            }
        }

        if (filename == null) {
            usage();
        }
    }
}
```

此代码执行所有基本设置操作。DOMEcho 的所有输出使用 UTF-8 编码。如果未指定参数则调用的 usage() 方法只是告诉你 DOMEcho 期望什么参数，因此代码未在此处显示。还声明了一个文件名字符串，它将是 DOMEcho 解析到 DOM 中的 XML 文件名。

### 导入所需类

在本节中，所有类都单独命名，以便你可以看到每个类来自哪里，如果你想参考 API 文档的话。在示例文件中，import 语句使用更短的形式，如 javax.xml.parsers.*。

这些是 DOMEcho 使用的 JAXP API：

```java
package dom;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
```

这些类用于解析 XML 文档时可能抛出的异常：

```java
import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.*
```

这些类读取示例 XML 文件并管理输出：

```java
import java.io.File;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
```

最后，导入 DOM 的 W3C 定义、DOM 异常、实体和节点：

```java
import org.w3c.dom.Document;
import org.w3c.dom.DocumentType;
import org.w3c.dom.Entity;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
```

### 处理错误

接下来，添加错误处理逻辑。最重要的一点是，符合 JAXP 的文档构建器在解析 XML 文档遇到困难时必须报告 SAX 异常。DOM 解析器实际上不必在内部使用 SAX 解析器，但由于 SAX 标准已经存在，将其用于报告错误是有意义的。因此，DOM 应用程序的错误处理代码与 SAX 应用程序的非常相似：

```java
private static class MyErrorHandler implements ErrorHandler {

    private PrintWriter out;

    MyErrorHandler(PrintWriter out) {
        this.out = out;
    }

    private String getParseExceptionInfo(SAXParseException spe) {
        String systemId = spe.getSystemId();
        if (systemId == null) {
            systemId = "null";
        }

        String info = "URI=" + systemId + " Line=" + spe.getLineNumber() +
                      ": " + spe.getMessage();
        return info;
    }

    public void warning(SAXParseException spe) throws SAXException {
        out.println("Warning: " + getParseExceptionInfo(spe));
    }

    public void error(SAXParseException spe) throws SAXException {
        String message = "Error: " + getParseExceptionInfo(spe);
        throw new SAXException(message);
    }

    public void fatalError(SAXParseException spe) throws SAXException {
        String message = "Fatal Error: " + getParseExceptionInfo(spe);
        throw new SAXException(message);
    }
}
```

如你所见，DomEcho 类的错误处理器使用 PrintWriter 实例生成输出。

### 实例化工厂

接下来，将以下代码添加到 main() 方法中，以获取可以为我们提供文档构建器的工厂实例。

```java
public static void main(String[] args) throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

    // ...
}
```

### 获取解析器并解析文件

现在，将以下代码添加到 main() 中以获取构建器实例，并使用它来解析指定文件。

```java
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
DocumentBuilder db = dbf.newDocumentBuilder();
Document doc = db.parse(new File(filename));
```

被解析的文件由 main() 方法开头声明的 filename 变量提供，该变量在运行程序时作为参数传递给 DOMEcho。

### 配置工厂

默认情况下，工厂返回一个不了解命名空间的非验证解析器。要获得验证解析器或了解命名空间的解析器（或两者），你可以使用以下代码配置工厂来设置其中一个或两个选项。

```java
public static void main(String[] args) throws Exception {

    String filename = null;
    boolean dtdValidate = false;
    boolean xsdValidate = false;
    String schemaSource = null;

    for (int i = 0; i < args.length; i++) {
        if (args[i].equals("-dtd"))  {
            dtdValidate = true;
        }
        else if (args[i].equals("-xsd")) {
            xsdValidate = true;
        }
        else if (args[i].equals("-xsdss")) {
            if (i == args.length - 1) {
                usage();
            }
            xsdValidate = true;
            schemaSource = args[++i];
        }
        else {
            filename = args[i];
            if (i != args.length - 1) {
                usage();
            }
        }
    }

    if (filename == null) {
        usage();
    }

    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

    dbf.setNamespaceAware(true);
    dbf.setValidating(dtdValidate || xsdValidate);

    // ...

    DocumentBuilder db = dbf.newDocumentBuilder();
    Document doc = db.parse(new File(filename));
}
```

如你所见，命令行参数的设置使你可以通知 DOMEcho 对 DTD 或 XML Schema 执行验证，并且工厂被配置为命名空间感知并执行用户指定的任何类型的验证。

---

**注意 -** 符合 JAXP 的解析器不要求支持这些选项的所有组合，即使参考解析器支持。如果你指定了无效的选项组合，工厂在你尝试获取解析器实例时会生成 ParserConfigurationException。

---

有关如何使用命名空间和验证的更多信息在 [[JAXP-DOM-validating|使用 XML Schema 验证]]中提供，其中将描述上述摘录中缺少的代码。

### 处理验证错误

SAX 标准规定的对验证错误的默认响应是什么都不做。JAXP 标准要求抛出 SAX 异常，因此你使用与 SAX 应用程序完全相同的错误处理机制。特别是，你使用 DocumentBuilder 类的 setErrorHandler 方法为其提供一个实现 SAX ErrorHandler 接口的对象。

---

**注意 -** DocumentBuilder 还有一个你可以使用的 setEntityResolver 方法。

---

以下代码配置文档构建器以使用 [[JAXP-DOM-readingXML|处理错误]]中定义的错误处理器。

```java
DocumentBuilder db = dbf.newDocumentBuilder();
OutputStreamWriter errorWriter = new OutputStreamWriter(System.err,
                                         outputEncoding);
db.setErrorHandler(new MyErrorHandler (new PrintWriter(errorWriter, true)));
Document doc = db.parse(new File(filename));
```

你目前看到的代码已设置文档构建器并配置它按请求执行验证。错误处理也已就位。然而，DOMEcho 尚未做任何事情。在下一节中，你将看到如何显示 DOM 结构并开始探索它。例如，你将看到实体引用和 CDATA 部分在 DOM 中的样子。也许最重要的是，你将看到文本节点（包含实际数据）如何驻留在 DOM 中的元素节点下。

## 显示 DOM 节点

要创建或操作 DOM，清楚了解 DOM 中节点的结构方式很有帮助。本教程的这一部分暴露 DOM 的内部结构，以便你可以看到它包含什么。DOMEcho 示例通过回显 DOM 节点然后将它们打印到屏幕上来做到这一点，并使用适当的缩进使节点层次结构明显。这些节点类型的规范可以在 [DOM Level 2 核心规范](http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113)中 Node 的规范下找到。下表改编自该规范。

表 3-1 节点类型

| 节点 | nodeName | nodeValue | Attributes |
| --- | --- | --- | --- |
| Attr | 属性名称 | 属性值 | null |
| CDATASection | #cdata-section | CDATA 部分的内容 | null |
| Comment | #comment | 注释的内容 | null |
| Document | #document | null | null |
| DocumentFragment | #document-fragment | null | null |
| DocumentType | 文档类型名称 | null | null |
| Element | 标签名称 | null | NamedNodeMap |
| Entity | 实体名称 | null | null |
| EntityReference | 引用的实体名称 | null | null |
| Notation | 表示法名称 | null | null |
| ProcessingInstruction | 目标 | 除目标之外的整个内容 | null |
| Text | #text | 文本节点的内容 | null |

---
分类:
  - "网页裁剪"
标题: "使用 SAX 解析 XML 文件"
描述: "《Java 教程》JAXP SAX 课程，通过 SAXLocalNameCount 示例演示如何用 SAX 解析器处理 XML 数据，涵盖创建骨架、导入类、设置 I/O、实现 ContentHandler、处理内容事件、设置解析器与错误处理。"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/sax/parsing.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 使用 SAX 解析 XML 文件

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 使用 SAX 解析 XML 文件

在实际应用程序中，你会希望使用 SAX 解析器处理 XML 数据并用它做一些有用的事情。本节考察一个示例 JAXP 程序 SAXLocalNameCount，它在一个 XML 文档中仅使用元素的 localName 组件来计算元素数量。为简化起见，命名空间名称被忽略。此示例还展示了如何使用 SAX ErrorHandler。

## 创建骨架

SAXLocalNameCount 程序创建在一个名为 SAXLocalNameCount.java 的文件中。

```java
public class SAXLocalNameCount {
    static public void main(String[] args) {
        // ...
    }
}
```

因为你将独立运行它，所以需要一个 main() 方法。而且你需要命令行参数，以便告诉应用程序要处理哪个文件。在 [`SAXLocalNameCount.java`](https://docs.oracle.com/javase/tutorial/jaxp/sax/examples/SAXLocalNameCount.java) 文件中找到示例的完整代码。

## 导入类

应用程序将使用的类的导入语句如下。

```java
package sax;
import javax.xml.parsers.*;
import org.xml.sax.*;
import org.xml.sax.helpers.*;

import java.util.*;
import java.io.*;

public class SAXLocalNameCount {
    // ...
}
```

javax.xml.parsers 包包含 SAXParserFactory 类，它创建所使用的解析器实例。如果它无法生成与指定配置选项匹配的解析器，则抛出 ParserConfigurationException。（稍后你将看到更多关于配置选项的内容）。javax.xml.parsers 包还包含 SAXParser 类，这是工厂为解析返回的类。org.xml.sax 包定义了 SAX 解析器使用的所有接口。org.xml.sax.helpers 包包含 DefaultHandler，它定义了将处理解析器生成的 SAX 事件的类。java.util 和 java.io 中的类是提供哈希表和输出所需的。

## 设置 I/O

首要任务是处理命令行参数，在此阶段它们仅用于获取要处理的文件名。main 方法中的以下代码告诉应用程序你希望 SAXLocalNameCount 处理哪个文件。

```java
static public void main(String[] args) throws Exception {
    String filename = null;

    for (int i = 0; i < args.length; i++) {
        filename = args[i];
        if (i != args.length - 1) {
            usage();
        }
    }

    if (filename == null) {
        usage();
    }
}
```

这段代码将 main 方法设置为在遇到问题时抛出 Exception，并定义了告诉应用程序要处理的 XML 文件名所需的命令行选项。代码这部分的其他命令行参数将在本课后面查看验证时讨论。

你运行应用程序时给出的 filename 字符串将被内部方法 convertToFileURL() 转换为 java.io.File URL。这由 SAXLocalNameCount 中的以下代码完成。

```java
public class SAXLocalNameCount {
    private static String convertToFileURL(String filename) {
        String path = new File(filename).getAbsolutePath();
        if (File.separatorChar != '/') {
            path = path.replace(File.separatorChar, '/');
        }

        if (!path.startsWith("/")) {
            path = "/" + path;
        }
        return "file:" + path;
    }

    // ...
}
```

如果运行程序时指定了不正确的命令行参数，则会调用 SAXLocalNameCount 应用程序的 usage() 方法，在屏幕上打印出正确的选项。

```java
private static void usage() {
    System.err.println("Usage: SAXLocalNameCount <file.xml>");
    System.err.println("       -usage or -help = this message");
    System.exit(1);
}
```

更多 usage() 选项将在本课后面讨论验证时查看。

## 实现 ContentHandler 接口

SAXLocalNameCount 中最重要的接口是 ContentHandler。此接口需要一些方法，SAX 解析器调用这些方法以响应各种解析事件。主要的事件处理方法是：startDocument、endDocument、startElement 和 endElement。

实现此接口最简单的方法是扩展 org.xml.sax.helpers 包中定义的 DefaultHandler 类。该类为所有 ContentHandler 事件提供空操作方法。示例程序扩展了该类。

```java
public class SAXLocalNameCount extends DefaultHandler {
    // ...
}
```

---

**注意 -** DefaultHandler 还为 DTDHandler、EntityResolver 和 ErrorHandler 接口中定义的其他主要事件定义了空操作方法。你将在本课后面了解更多关于这些方法的内容。

---

接口要求这些方法中的每一个都抛出 SAXException。此处抛出的异常被发送回解析器，解析器再将其发送给调用解析器的代码。

## 处理内容事件

本节展示处理 ContentHandler 事件的代码。

当遇到开始标记或结束标记时，标记的名称作为字符串传递给 startElement 或 endElement 方法（视情况而定）。当遇到开始标记时，它定义的任何属性也会在 Attributes 列表中传递。在元素中找到的字符作为字符数组传递，同时传递字符数量（长度）和指向第一个字符的数组偏移量。

### 文档事件

以下代码处理开始文档和结束文档事件：

```java
public class SAXLocalNameCount extends DefaultHandler {

    private Hashtable tags;

    public void startDocument() throws SAXException {
        tags = new Hashtable();
    }

    public void endDocument() throws SAXException {
        Enumeration e = tags.keys();
        while (e.hasMoreElements()) {
            String tag = (String)e.nextElement();
            int count = ((Integer)tags.get(tag)).intValue();
            System.out.println("Local Name \"" + tag + "\" occurs "
                               + count + " times");
        }
    }

    private static String convertToFileURL(String filename) {
        // ...
    }

    // ...
}
```

这段代码定义了当解析器遇到被解析文档的开始点和结束点时应用程序做什么。ContentHandler 接口的 startDocument() 方法创建一个 java.util.Hashtable 实例，在元素事件中它将被解析器在文档中找到的 XML 元素填充。当解析器到达文档末尾时，调用 endDocument() 方法，获取哈希表中包含的元素名称和计数，并在屏幕上打印消息告诉用户每种元素被找到多少次。

这两个 ContentHandler 方法都抛出 SAXException。你将在设置错误处理中了解更多关于 SAX 异常的内容。

### 元素事件

如文档事件中所述，startDocument 方法创建的哈希表需要用解析器在文档中找到的各种元素填充。以下代码处理开始元素事件：

```java
public void startDocument() throws SAXException {
    tags = new Hashtable();
}

public void startElement(String namespaceURI,
                         String localName,
                         String qName,
                         Attributes atts)
    throws SAXException {

    String key = localName;
    Object value = tags.get(key);

    if (value == null) {
        tags.put(key, new Integer(1));
    }
    else {
        int count = ((Integer)value).intValue();
        count++;
        tags.put(key, new Integer(count));
    }
}

public void endDocument() throws SAXException {
    // ...
}
```

这段代码处理元素标记，包括开始标记中定义的任何属性，以获取命名空间通用资源标识符(URI)、本地名称和该元素的限定名称。然后 startElement() 方法用每种元素类型的本地名称及其计数填充 startDocument() 创建的哈希映射。注意，当调用 startElement() 方法时，如果未启用命名空间处理，则元素和属性的本地名称可能为空字符串。代码通过在简单名称为空字符串时使用限定名称来处理这种情况。

### 字符事件

JAXP SAX API 还允许你使用 ContentHandler.characters() 方法处理解析器传递给应用程序的字符。

---

**注意 -** 字符事件未在 SAXLocalNameCount 示例中演示，但为完整性起见，本节包含简要描述。

---

解析器不要求一次返回任何特定数量的字符。解析器可以一次返回单个字符到数千个字符，仍然是符合标准的实现。因此，如果你的应用程序需要处理它看到的字符，明智的做法是让 characters() 方法将字符累积在 java.lang.StringBuffer 中，并仅在你确定所有字符都已找到时才对它们进行操作。

当元素结束时你完成文本解析，因此通常在此时执行字符处理。但你也可能希望在元素开始时处理文本。这对于文档式数据是必要的，这类数据可以包含与文本混合的 XML 元素。例如，考虑这个文档片段：

`**<para>**This paragraph contains **<bold>**important**</bold>** ideas.**</para>**`

初始文本 This paragraph contains 被开始 <bold> 元素终止。文本 important 被结束标记 </bold> 终止，而最终文本 ideas. 被结束标记 </para> 终止。

严格来说，字符处理器应该扫描与号字符(&)和左尖括号字符(<)，并用字符串 &amp; 或 &lt; 适当地替换它们。这在下一节中解释。

### 处理特殊字符

在 XML 中，实体是一个有名称的 XML 结构（或纯文本）。通过名称引用实体会导致它被插入到文档中实体引用的位置。要创建实体引用，你用与号和分号包围实体名称：

`&entityName;`

当你处理包含许多特殊字符的大块 XML 或 HTML 时，可以使用 CDATA 部分。CDATA 部分的作用类似于 HTML 中的 <code>...</code>，甚至更强：CDATA 部分中的所有空白都是重要的，其中的字符不被解释为 XML。CDATA 部分以 <!\[\[CDATA\[ 开始，以 \]\]> 结束。

CDATA 部分的示例如下所示。

`<p><termdef id="dt-cdsection" term="CDATA Section"<<term>CDATA sections</term> may occur anywhere character data may occur; they are used to escape blocks of text containing characters which would otherwise be recognized as markup. CDATA sections begin with the string "<code>&lt;![CDATA[</code>" and end with the string "<code>]]&gt;</code>"`

解析后，此文本将显示如下：

CDATA sections may occur anywhere character data may occur; they are used to escape blocks of text containing characters which would otherwise be recognized as markup. CDATA sections begin with the string " <!\[CDATA\[" and end with the string "\]\]> "。

CDATA 的存在使得正确回显 XML 有点棘手。如果要输出的文本不在 CDATA 部分中，则文本中的任何尖括号、与号和其他特殊字符都应替换为适当的实体引用。（替换左尖括号和与号最重要，其他字符将被正确解释而不会误导解析器。）但如果输出文本在 CDATA 部分中，则不应进行替换，从而产生类似前面示例中的文本。在诸如我们的 SAXLocalNameCount 应用程序这样的简单程序中，这并不特别严重。但许多 XML 过滤应用程序会希望跟踪文本是否出现在 CDATA 部分中，以便它们能正确处理特殊字符。

## 设置解析器

以下代码设置解析器并启动它：

```java
static public void main(String[] args) throws Exception {

    // 解析命令行参数的代码
    //（如上所示）
    // ...

    SAXParserFactory spf = SAXParserFactory.newInstance();
    spf.setNamespaceAware(true);
    SAXParser saxParser = spf.newSAXParser();
}
```

这些代码行创建一个 SAXParserFactory 实例，由 javax.xml.parsers.SAXParserFactory 系统属性的设置决定。要创建的工厂通过将 setNamespaceAware 设置为 true 来支持 XML 命名空间，然后通过调用其 newSAXParser() 方法从工厂获取 SAXParser 实例。

---

**注意 -** javax.xml.parsers.SAXParser 类是一个包装器，定义了许多便利方法。它包装（不太友好的）org.xml.sax.Parser 对象。如果需要，你可以使用 SAXParser 类的 getParser() 方法获取该解析器。

---

你现在需要实现所有解析器必须实现的 XMLReader。应用程序使用 XMLReader 告诉 SAX 解析器要对相关文档执行什么处理。XMLReader 由 main 方法中的以下代码实现。

```java
// ...
SAXParser saxParser = spf.newSAXParser();
XMLReader xmlReader = saxParser.getXMLReader();
xmlReader.setContentHandler(new SAXLocalNameCount());
xmlReader.parse(convertToFileURL(filename));
```

这里，你通过调用 SAXParser 实例的 getXMLReader() 方法为解析器获取 XMLReader 实例。然后 XMLReader 将 SAXLocalNameCount 类注册为其内容处理器，以便解析器执行的操作将是处理内容事件中所示 startDocument()、startElement() 和 endDocument() 方法的操作。最后，XMLReader 通过以设置 I/O 中定义的 convertToFileURL() 方法生成的 File URL 形式传递相关 XML 文件的位置，告诉解析器要解析哪个文档。

## 设置错误处理

你现在可以开始使用解析器了，但实现一些错误处理更安全。解析器可以生成三种错误：致命错误、错误和警告。当发生致命错误时，解析器无法继续。因此，如果应用程序不生成异常，则默认错误事件处理器会生成一个。但对于非致命错误和警告，默认错误处理器从不生成异常，也不显示任何消息。

如文档事件中所示，应用程序的事件处理方法抛出 SAXException。例如，ContentHandler 接口中 startDocument() 方法的签名定义为返回 SAXException。

```java
public void startDocument() throws SAXException { /* ... */ }
```

SAXException 可以使用消息、另一个异常或两者构造。

因为默认解析器仅为致命错误生成异常，并且默认解析器提供的错误信息有些有限，所以 SAXLocalNameCount 程序通过 MyErrorHandler 类定义了自己的错误处理。

```java
xmlReader.setErrorHandler(new MyErrorHandler(System.err));

// ...

private static class MyErrorHandler implements ErrorHandler {
    private PrintStream out;

    MyErrorHandler(PrintStream out) {
        this.out = out;
    }

    private String getParseExceptionInfo(SAXParseException spe) {
        String systemId = spe.getSystemId();

        if (systemId == null) {
            systemId = "null";
        }

        String info = "URI=" + systemId + " Line="
            + spe.getLineNumber() + ": " + spe.getMessage();

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

与设置解析器中所示 XMLReader 被指向正确的内容处理器的方式相同，这里通过调用 XMLReader 的 setErrorHandler() 方法将其指向新的错误处理器。

MyErrorHandler 类实现了标准的 org.xml.sax.ErrorHandler 接口，并定义了一个方法来获取解析器生成的任何 SAXParseException 实例提供的异常信息。此方法 getParseExceptionInfo() 只是通过调用标准 SAXParseException 方法 getLineNumber() 和 getSystemId() 获取 XML 文档中发生错误的行号和运行它的系统的标识符。然后将此异常信息馈送到基本 SAX 错误处理方法 error()、warning() 和 fatalError() 的实现中，这些方法被更新以发送关于文档中错误的性质和位置的适当消息。

### 处理非致命错误

当 XML 文档未通过有效性约束时，会发生非致命错误。如果解析器发现文档无效，则生成错误事件。此类错误由验证解析器在给定文档类型定义(DTD)或模式时生成，当文档具有无效标记、在不允许的位置找到标记或（在模式的情况下）当元素包含无效数据时。

关于非致命错误需要理解的最重要的原则是它们默认被忽略。但如果文档中发生验证错误，你可能不希望继续处理它。你可能希望将此类错误视为致命的。

要接管错误处理，你重写 DefaultHandler 中作为 ErrorHandler 接口一部分处理致命错误、非致命错误和警告的方法。如上一节代码摘录所示，SAX 解析器向这些方法中的每一个传递 SAXParseException，因此在发生错误时生成异常就像将其抛回一样简单。

---

**注意 -** 检查 org.xml.sax.helpers.DefaultHandler 中定义的错误处理方法可能很有启发。你会看到 error() 和 warning() 方法什么也不做，而 fatalError() 抛出异常。当然，你总是可以重写 fatalError() 方法以抛出不同的异常。但如果你的代码在发生致命错误时不抛出异常，则 SAX 解析器会抛出。XML 规范要求如此。

---

### 处理警告

警告也默认被忽略。警告是信息性的，只能在存在 DTD 或模式时生成。例如，如果元素在 DTD 中被定义两次，则生成警告。它不是非法的，也不会导致问题，但你可能想知道它，因为它可能不是有意的。针对 DTD 验证 XML 文档将在本节中展示。

## 不带验证运行 SAX 解析器示例

以下步骤说明如何在不带验证的情况下运行 SAX 解析器示例。

### 不带验证运行 SAXLocalNameCount 示例

1. 将 [`SAXLocalNameCount.java`](https://docs.oracle.com/javase/tutorial/jaxp/sax/examples/SAXLocalNameCount.java) 文件保存在名为 `sax` 的目录中。
2. 按如下方式编译文件：
	javac sax/SAXLocalNameCount.java
3. 将示例 XML 文件 [`` `rich_iii.xml` ``](https://docs.oracle.com/javase/tutorial/jaxp/sax/examples/rich_iii.xml) 和 [`` `two_gent.xml` ``](https://docs.oracle.com/javase/tutorial/jaxp/sax/examples/two_gent.xml) 保存在 `data` 目录中。
4. 在 XML 文件上运行 SAXLocalNameCount 程序。
	选择 data 目录中的一个 XML 文件并在其上运行 SAXLocalNameCount 程序。这里，我们选择在文件 rich\_iii.xml 上运行程序。
	java sax/SAXLocalNameCount data/rich_iii.xml
	```text
	The XML file rich\_iii.xml contains an XML version of William Shakespeare's play *Richard III*. When you run the SAXLocalNameCount on it, you should see the following output.
	```
	```text
	Local Name "STAGEDIR" occurs 230 times
	Local Name "PERSONA" occurs 39 times
	Local Name "SPEECH" occurs 1089 times
	Local Name "SCENE" occurs 25 times
	Local Name "ACT" occurs 5 times
	Local Name "PGROUP" occurs 4 times
	Local Name "PLAY" occurs 1 times
	Local Name "PLAYSUBT" occurs 1 times
	Local Name "FM" occurs 1 times
	Local Name "SPEAKER" occurs 1091 times
	Local Name "TITLE" occurs 32 times
	Local Name "GRPDESCR" occurs 4 times
	Local Name "P" occurs 4 times
	Local Name "SCNDESCR" occurs 1 times
	Local Name "PERSONAE" occurs 1 times
	Local Name "LINE" occurs 3696 times
	```
	SAXLocalNameCount 程序解析 XML 文件，并提供它包含的每种类型 XML 标记实例数量的计数。
5. **在文本编辑器中打开文件 data/rich\_iii.xml。**
	要检查错误处理是否工作，从 XML 文件中的条目删除结束标记，例如从第 21 行删除结束标记 </PERSONA>，如下所示。
	`21 <PERSONA>EDWARD, Prince of Wales, afterwards King Edward V.</PERSONA>`
6. **再次运行 SAXLocalNameCount。**
	这次，你应该看到以下致命错误消息。
	Exception in thread "main" org.xml.sax.SAXException: Fatal Error: URI=file:data/rich_iii.xml Line=21: The element type "PERSONA" must be terminated by the matching end-tag "</PERSONA>".
	如你所见，当遇到错误时，解析器生成了 SAXParseException，它是 SAXException 的子类，标识了发生错误的文件和位置。

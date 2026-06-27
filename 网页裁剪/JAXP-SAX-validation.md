---
分类:
  - "网页裁剪"
标题: "实现 SAX 验证"
描述: "《Java 教程》JAXP SAX 课程，介绍如何为 SAXLocalNameCount 程序启用验证（DTD 与 XML Schema），涵盖选择解析器实现、可忽略空白、配置工厂、设置解析器属性、关联模式、错误处理及 DTD 警告。"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/sax/validation.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 实现 SAX 验证

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 实现 SAX 验证

示例程序 SAXLocalNameCount 默认使用非验证解析器，但它也可以激活验证。激活验证允许应用程序判断 XML 文档是否包含正确的标记或这些标记是否处于正确的顺序。换句话说，它可以告诉你文档是否*有效*。然而，如果未激活验证，它只能判断文档是否格式良好，如上一节中你从 XML 元素删除结束标记时所示。要使验证成为可能，XML 文档需要与 DTD 或 XML 模式关联。SAXLocalNameCount 程序支持这两种选项。

## 选择解析器实现

如果未指定其他工厂类，则使用默认的 SAXParserFactory 类。要使用来自不同制造商的解析器，你可以更改指向它的环境变量的值。你可以从命令行执行此操作：

```text
java -Djavax.xml.parsers.SAXParserFactory=yourFactoryHere [...]
```

你指定的工厂名称必须是完全限定的类名（包含所有包前缀）。有关更多信息，请参阅 SAXParserFactory 类的 newInstance() 方法中的文档。

## 使用验证解析器

到目前为止，本课集中于非验证解析器。本节考察验证解析器，以了解当你使用它解析示例程序时会发生什么。

关于验证解析器必须理解两点：

- 需要模式或 DTD。
- 因为存在模式或 DTD，所以会尽可能调用 ContentHandler.ignorableWhitespace() 方法。

## 可忽略空白

当存在 DTD 时，解析器不再对它知道无关的空白调用 characters() 方法。从只对处理 XML 数据感兴趣的应用程序的角度来看，这是一件好事，因为应用程序永远不会被纯粹为使 XML 文件可读而存在的空白打扰。

另一方面，如果你正在编写一个过滤 XML 数据文件的应用程序，并且希望输出同样可读的文件版本，那么该空白就不再是无关的：它是必不可少的。要获取这些字符，你需要在应用程序中添加 ignorableWhitespace 方法。要处理解析器看到的任何（通常）可忽略空白，你需要添加类似以下代码来实现 ignorableWhitespace 事件处理器。

```java
public void ignorableWhitespace (char buf[], int start, int length) throws SAXException {
    emit("IGNORABLE");
}
```

这段代码只是生成一条消息让你知道看到了可忽略空白。然而，并非所有解析器都是相同的。SAX 规范不要求调用此方法。Java XML 实现会在 DTD 使其成为可能时这样做。

## 配置工厂

SAXParserFactory 需要被设置成使用验证解析器而不是默认的非验证解析器。以下来自 SAXLocalNameCount 示例 main() 方法的代码展示了如何配置工厂使其实现验证解析器。

```java
static public void main(String[] args) throws Exception {

    String filename = null;
    boolean dtdValidate = false;
    boolean xsdValidate = false;
    String schemaSource = null;

    for (int i = 0; i < args.length; i++) {

        if (args[i].equals("-dtd")) {
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
        else if (args[i].equals("-usage")) {
            usage();
        }
        else if (args[i].equals("-help")) {
            usage();
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

    SAXParserFactory spf = SAXParserFactory.newInstance();
    spf.setNamespaceAware(true);
    spf.setValidating(dtdValidate || xsdValidate);
    SAXParser saxParser = spf.newSAXParser();

    // ...
}
```

这里，SAXLocalNameCount 程序被配置为在启动时接受附加参数，这些参数告诉它实现无验证、DTD 验证、XML 模式定义(XSD) 验证，或针对特定模式源文件的 XSD 验证。（这些选项 \-dtd、\-xsd 和 \-xsdss 的描述也被添加到 usage() 方法中，但此处未显示。）然后，工厂被配置为在调用 newSAXParser 时产生适当的验证解析器。如[[JAXP-SAX-parsing|设置解析器]]中所示，你还可以使用 setNamespaceAware(true) 配置工厂以返回命名空间感知的解析器。Oracle 的实现支持任何配置选项组合。（如果特定实现不支持某种组合，则要求它生成工厂配置错误）。

## 使用 XML Schema 验证

虽然对 XML Schema 的全面介绍超出了本教程的范围，但本节向你展示了使用以 XML Schema 语言编写的现有模式验证 XML 文档所需的步骤。要了解有关 XML Schema 的更多信息，你可以查阅在线教程 *XML Schema Part 0: Primer*，网址为 [http://www.w3.org/TR/xmlschema-0/](http://www.w3.org/TR/xmlschema-0/)。

---

**注意 -** 有多种模式定义语言，包括 RELAX NG、Schematron 和 W3C「XML Schema」标准。（甚至 DTD 也算作一种「模式」，尽管它是唯一一种不使用 XML 语法描述模式约束的语言。）然而，「XML Schema」给我们带来了术语挑战。虽然「XML Schema schema」这个短语是精确的，但我们将使用「XML Schema 定义」这个短语以避免冗余的表象。

---

要收到 XML 文档中验证错误的通知，解析器工厂必须被配置为创建验证解析器，如上一节所示。此外，以下条件必须为真：

- 必须在 SAX 解析器上设置适当的属性。
- 必须设置适当的错误处理器。
- 文档必须与模式关联。

## 设置 SAX 解析器属性

从定义设置属性时将使用的常量开始很有帮助。SAXLocalNameCount 示例设置了以下常量。

```java
public class SAXLocalNameCount extends DefaultHandler {

    static final String JAXP_SCHEMA_LANGUAGE =
        "http://java.sun.com/xml/jaxp/properties/schemaLanguage";

    static final String W3C_XML_SCHEMA =
        "http://www.w3.org/2001/XMLSchema";

    static final String JAXP_SCHEMA_SOURCE =
        "http://java.sun.com/xml/jaxp/properties/schemaSource";
}
```

---

**注意 -** 解析器工厂必须被配置为生成既命名空间感知又验证的解析器。这在配置工厂中已展示。有关命名空间的更多信息在[[JAXP-DOM|文档对象模型]]中提供，但目前，请理解模式验证是一个面向命名空间的过程。因为符合 JAXP 的解析器默认不是命名空间感知的，所以必须设置该属性才能使模式验证工作。

---

然后你必须配置解析器以告诉它使用哪种模式语言。在 SAXLocalNameCount 中，可以针对 DTD 或针对 XML Schema 执行验证。以下代码使用上面定义的常量，指定 W3C 的 XML Schema 语言作为在程序启动时指定 \-xsd 选项时使用的语言。

```java
// ...
if (xsdValidate) {
    saxParser.setProperty(JAXP_SCHEMA_LANGUAGE, W3C_XML_SCHEMA);
    // ...
}
```

除了[[JAXP-SAX-parsing|设置错误处理]]中描述的错误处理之外，在为基于模式的验证配置解析器时还可能发生一种错误。如果解析器不符合 JAXP 规范，因此不支持 XML Schema，它可以抛出 SAXNotRecognizedException。为了处理这种情况，setProperty() 语句被包装在 try/catch 块中，如下面的代码所示。

```java
// ...
if (xsdValidate) {
    try {
        saxParser.setProperty(JAXP_SCHEMA_LANGUAGE, W3C_XML_SCHEMA);
    }
    catch (SAXNotRecognizedException x){
        System.err.println("Error: JAXP SAXParser property not recognized: "
                           + JAXP_SCHEMA_LANGUAGE);

        System.err.println( "Check to see if parser conforms to the JAXP spec.");
        System.exit(1);
    }
}
// ...
```

## 将文档关联到模式

要使用 XML Schema 定义验证数据，必须确保 XML 文档与一个定义关联。有两种方法可以做到。

- 在 XML 文档中包含模式声明。
- 在应用程序中指定要使用的模式。

---

**注意 -** 当应用程序指定要使用的模式时，它会覆盖文档中的任何模式声明。

---

要在文档中指定模式定义，你需要创建如下 XML：

```text
<documentRoot
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation='YourSchemaDefinition.xsd'>
```

第一个属性定义 XML 命名空间(xmlns) 前缀 xsi，代表「XML Schema instance」。第二行指定用于文档中没有命名空间前缀的元素的模式，即通常在任何简单、不复杂的 XML 文档中定义的元素。

---

**注意 -** 有关命名空间的更多信息包含在[[JAXP-DOM|文档对象模型]]的使用 XML Schema 验证中。目前，将这些属性视为你用于验证不使用它们的简单 XML 文件的「魔法咒语」。在你了解有关命名空间的更多信息后，你将看到如何使用 XML Schema 验证确实使用它们的复杂文档。这些想法在[[JAXP-DOM|文档对象模型]]的使用多个命名空间验证中讨论。

---

你也可以在应用程序中指定模式文件，SAXLocalNameCount 就是这种情况。

```java
// ...
if (schemaSource != null) {
    saxParser.setProperty(JAXP_SCHEMA_SOURCE, new File(schemaSource));
}

// ...
```

在上面的代码中，变量 schemaSource 关系到一个模式源文件，你可以通过使用 \-xsdss 选项启动 SAXLocalNameCount 应用程序并提供要使用的模式源文件名称来指向它。

## 验证解析器中的错误处理

重要的是要认识到，文件验证失败时抛出异常的唯一原因是[[JAXP-SAX-parsing|设置错误处理]]中所示错误处理代码的结果。该代码在此重现作为提醒：

```java
// ...

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

// ...
```

如果不抛出这些异常，验证错误将被简单忽略。通常，SAX 解析错误是验证错误，尽管如果文件指定了解析器未准备好处理的 XML 版本，也可能生成它。请记住，除非你提供像此处这样的错误处理器，否则你的应用程序不会生成验证异常。

## DTD 警告

如前所述，警告仅在 SAX 解析器处理 DTD 时生成。某些警告仅由验证解析器生成。非验证解析器的主要目标是尽可能快地运行，但它也会生成一些警告。

XML 规范建议警告应作为以下情况的结果生成：

- 为实体、属性或表示法提供附加声明。（此类声明被忽略。只使用第一个。还要注意，在验证时，元素的重复定义总是产生致命错误，如你之前所见。）
- 引用未声明的元素类型。（只有当未声明的类型实际在 XML 文档中使用时，才会发生有效性错误。当在 DTD 中引用未声明的元素时，会产生警告。）
- 为未声明的元素类型声明属性。

Java XML SAX 解析器在其他情况下也会发出警告：

- 验证时没有 <!DOCTYPE...>。
- 不验证时引用未定义的参数实体。（验证时，会产生错误。虽然不要求非验证解析器读取参数实体，但 Java XML 解析器会这样做。因为它不是要求，所以 Java XML 解析器生成警告而不是错误。）
- 某些字符编码声明看起来不正确的情况。

## 带验证运行 SAX 解析器示例

在本节中，将再次使用之前使用的 SAXLocalNameCount 示例程序，只是这次它将针对 XML Schema 或 DTD 进行验证。演示不同类型验证的最佳方法是修改正在解析的 XML 文件代码，以及关联的模式和 DTD，以破坏处理并让应用程序生成异常。

## 试验 DTD 验证错误

如上所述，这些示例重用 SAXLocalNameCount 程序。你将在其中找到示例及其关联文件的位置在[[JAXP-SAX-parsing|不带验证运行 SAX 解析器示例]]中给出。

1. 如果尚未这样做，将 [`SAXLocalNameCount.java`](https://docs.oracle.com/javase/tutorial/jaxp/sax/examples/SAXLocalNameCount.java) 文件保存在名为 `sax` 的目录中。在文本编辑器中打开文件并进行上述更改。
2. 如果尚未这样做，按如下方式编译文件：
	javac sax/SAXLocalNameCount.java
3. 如果尚未这样做，将示例 XML 文件 [`` `rich_iii.xml` ``](https://docs.oracle.com/javase/tutorial/jaxp/sax/examples/rich_iii.xml) 和 [`` `two_gent.xml` ``](https://docs.oracle.com/javase/tutorial/jaxp/sax/examples/two_gent.xml) 保存在 `data` 目录中。
4. 运行 SAXLocalNameCount 程序，激活 DTD 验证。
	为此，你必须在运行程序时指定 \-dtd 选项。
	```text
	java sax/SAXLocalNameCount -dtd data/rich_iii.xml
	```
	你看到的结果看起来类似这样：
	```text
	Exception in thread "main" org.xml.sax.SAXException:
	Error: URI=file:data/rich_iii.xml
	Line=4: Document is invalid: no grammar found.
	```
	此消息表示没有可以验证文档 rich\_iii.xml 的语法，因此它自动无效。换句话说，该消息表示你正在尝试验证文档，但未声明 DTD，因为不存在 DOCTYPE 声明。所以现在你知道 DTD 是有效文档的要求。这是合理的。
5. 将示例 DTD 文件 [`` `play.dtd` ``](https://docs.oracle.com/javase/tutorial/jaxp/sax/examples/play.dtd) 保存在 `data` 目录中。
6. 在文本编辑器中打开文件 data/rich\_iii.xml。在 data/rich\_iii.xml 的开头插入以下 DOCTYPE 声明。（该声明将验证解析器指向名为 play.dtd 的 DTD 文件。如果激活 DTD 验证，正在解析的 XML 文件的结构将根据 play.dtd 中提供的结构进行检查。）
	```text
	<!DOCTYPE PLAY SYSTEM "play.dtd">
	```
	不要忘记保存修改，但保持文件打开，因为稍后还会再次需要它。
7. 返回 data/rich\_iii.xml 并修改第 18 行中角色「KING EDWARD The Fourth」的标记。
	将开始和结束标记从 <PERSONA> 和 </PERSONA> 更改为 <PERSON> 和 </PERSON>。第 18 行现在应如下所示：
	`18:<PERSON>KING EDWARD The Fourth</PERSON>`
	再次，不要忘记保存修改，并保持文件打开。
8. 运行 SAXLocalNameCount 程序，激活 DTD 验证。
	这次，运行程序时你将看到不同的错误：
	```text
	java sax/SAXLocalNameCount -dtd data/rich_iii.xml
	Exception in thread "main" org.xml.sax.SAXException:
	Error: URI=file:data/rich_iii.xml
	Line=26: Element type "PERSON" must be declared.
	```
	这里你可以看到解析器反对了 DTD 数据/play.dtd 中未包含的元素。
9. 在 data/rich\_iii.xml 中更正「KING EDWARD The Fourth」的标记。
	将开始和结束标记恢复为原始版本 <PERSONA> 和 </PERSONA>。
10. 在 data/rich\_iii.xml 中，从第 16 行删除 <TITLE>Dramatis Personae</TITLE>。
	再次，不要忘记保存修改。
11. 运行 SAXLocalNameCount 程序，激活 DTD 验证。
	如前所述，你将看到另一个验证错误：
	```text
	java sax/SAXLocalNameCount -dtd data/rich_iii.xml
	Exception in thread "main" org.xml.sax.SAXException:
	Error: URI=file:data/rich_iii.xml
	Line=77: The content of element type "PERSONAE" must match "(TITLE,(PERSONA|PGROUP)+)".
	```
	通过从第 16 行删除 <TITLE> 元素，<PERSONAE> 元素变得无效，因为它不包含 DTD 期望 <PERSONAE> 元素具有的子元素。注意，错误消息指出错误在 data/rich\_iii.xml 的第 77 行，即使你从第 16 行删除了 <TITLE> 元素。这是因为 <PERSONAE> 元素的结束标记位于第 77 行，而解析器仅在到达它正在解析的元素的末尾时才抛出异常。
12. 在文本编辑器中打开 DTD 文件 data/play.dtd。
	在 DTD 文件中，你可以看到 <PERSONAE> 元素的声明，以及可在符合 play DTD 的 XML 文档中使用的所有其他元素。<PERSONAE> 的声明看起来像这样。
	```text
	<!ELEMENT PERSONAE (TITLE, (PERSONA | PGROUP)+)>
	```
	如你所见，<PERSONAE> 元素需要 <TITLE> 子元素。管道符(|) 表示 <PERSONA> 或 <PGROUP> 子元素可以包含在 <PERSONAE> 元素中，而 (PERSONA | PGROUP) 分组后的加号(+) 表示必须至少包含这些子元素中的一个或多个。
13. 在 <PERSONAE> 的声明中 TITLE 后面添加问号(?)。
	在 DTD 中的子元素声明中添加问号会使该子元素的一个实例的存在变为可选。
	```text
	<!ELEMENT PERSONAE (TITLE?, (PERSONA | PGROUP)+)>
	```
	如果在元素后添加星号(\*)，你可以包含该子元素的零个或多个实例。然而，在这种情况下，文档的一部分中有多个标题是没有意义的。
	不要忘记保存你对 data/play.dtd 所做的修改。
14. 运行 SAXLocalNameCount 程序，激活 DTD 验证。
	```text
	java sax/SAXLocalNameCount -dtd data/rich_iii.xml
	```
	这次，你应该看到 SAXLocalNameCount 的正确输出，没有错误。

## 试验模式验证错误

上一个练习演示了使用 SAXLocalNameCount 针对 DTD 验证 XML 文件。在本练习中，你将使用 SAXLocalNameCount 针对标准 XML Schema 定义和自定义模式源文件验证不同的 XML 文件。同样，这种类型的验证将通过修改 XML 文件和模式以破坏解析过程从而使解析器抛出错误来演示。

如上所述，这些示例重用 SAXLocalNameCount 程序。你将在其中找到示例及其关联文件的位置在[[JAXP-SAX-parsing|不带验证运行 SAX 解析器示例]]中给出。

1. 如果尚未这样做，将 [`SAXLocalNameCount.java`](https://docs.oracle.com/javase/tutorial/jaxp/sax/examples/SAXLocalNameCount.java) 文件保存在名为 `sax` 的目录中。在文本编辑器中打开文件并进行上述更改。
2. 如果尚未这样做，按如下方式编译文件：
	javac sax/SAXLocalNameCount.java
3. 将示例 XML 文件 [`` `personal-schema.xml` ``](https://docs.oracle.com/javase/tutorial/jaxp/sax/examples/personal-schema.xml) 保存在 `data` 目录中，然后在文本编辑器中打开它。
	这是一个简单的 XML 文件，提供一家小公司员工的姓名和联系信息。在此 XML 文件中，你将看到它已与模式定义文件 personal.xsd 关联。
	`<personnel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation='personal.xsd'>`
4. 将示例 XSD 模式文件 [`` `personal.xsd` ``](https://docs.oracle.com/javase/tutorial/jaxp/sax/examples/personal.xsd) 保存在 `data` 目录中，然后在文本编辑器中打开它。
	此模式定义了要使与该模式关联的 XML 文档被视为有效，需要关于每个员工的哪些信息。例如，通过检查模式定义，你可以看到每个 person 元素需要一个 name，并且每个人的 name 必须包含 family name 和 given name。员工还可以选择性地拥有电子邮件地址和 URL。
5. 在 data/personal.xsd 中，将 person 元素所需的最小电子邮件地址数从 0 改为 1。
	email 元素的声明现在如下。
	`<xs:element ref="email" minOccurs='1' maxOccurs='unbounded'/>`
6. 在 data/personal-schema.xml 中，从 person 元素 one.worker 删除 email 元素。
	Worker One 现在看起来像这样：
	```xml
	<person id="one.worker">
	  <name><family>Worker</family> <given>One</given></name>
	  <link manager="Big.Boss"/>
	</person>
	```
7. 针对 personal-schema.xml 运行 SAXLocalNameCount，不进行模式验证。
	```text
	java sax/SAXLocalNameCount data/personal-schema.xml
	```
	SAXLocalNameCount 告诉你每个元素在 personal-schema.xml 中出现的次数。
	```text
	Local Name "email" occurs 5 times
	Local Name "name" occurs 6 times
	Local Name "person" occurs 6 times
	Local Name "family" occurs 6 times
	Local Name "link" occurs 6 times
	Local Name "personnel" occurs 1 times
	Local Name "given" occurs 6 times
	```
	你看到 email 只出现 5 次，而 personal-schema.xml 中有 6 个 person 元素。因此，因为我们将 email 元素的最小出现次数设置为每个 person 元素 1 次，我们知道此文档无效。然而，因为未告诉 SAXLocalNameCount 针对模式验证，所以不报告错误。
8. 再次运行 SAXLocalNameCount，这次指定 personal—schema.xml 文档应针对 personal.xsd 模式定义进行验证。
	如上面[使用 XML Schema 验证](#gcwtl)中所示，SAXLocalNameCount 有一个启用模式验证的选项。使用以下命令运行 SAXLocalNameCount。
	```text
	java sax/SAXLocalNameCount -xsd data/personal-schema.xml
	```
	这次，你将看到以下错误消息。
	```text
	Exception in thread "main" org.xml.sax.SAXException: Error:
	URI=file:data/personal-schema.xml
	Line=14: cvc-complex-type.2.4.a: Invalid content was found starting with
	element 'link'.
	One of '{email}' is expected.
	```
9. 将 email 元素恢复到 person 元素 one.worker。
10. 第三次运行 SAXLocalNameCount，再次指定 personal—schema.xml 文档应针对 personal.xsd 模式定义进行验证。
	```text
	java sax/SAXLocalNameCount -xsd data/personal-schema.xml
	```
	这次你将看到正确的输出，没有错误。
11. 在文本编辑器中再次打开 personal-schema.xml。
12. 从 personnel 元素删除模式定义 personal.xsd 的声明。
	从 personnel 元素删除斜体代码。
	`<personnel *xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation='personal.xsd'/*>`
13. 运行 SAXLocalNameCount，再次指定模式验证。
	```text
	java sax/SAXLocalNameCount -xsd data/personal-schema.xml
	```
	显然，这不会工作，因为未声明用于验证 XML 文件的模式定义。你将看到以下错误。
	```text
	Exception in thread "main" org.xml.sax.SAXException:
	Error: URI=file:data/personal-schema.xml
	Line=2: cvc-elt.1: Cannot find the declaration of element 'personnel'.
	```
14. 再次运行 SAXLocalNameCount，这次在命令行传递模式定义文件。
	```text
	java sax/SAXLocalNameCount -xsdss data/personal.xsd data/personal-schema.xml
	```
	这次你使用 SAXLocalNameCount 选项，它允许你指定未硬编码到应用程序中的模式定义。你应该看到正确的输出。

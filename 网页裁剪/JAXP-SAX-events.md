---
分类:
  - "网页裁剪"
标题: "处理词法事件"
描述: "《Java 教程》JAXP SAX 课程，介绍如何使用 LexicalHandler 接口识别注释、CDATA 部分和已解析实体引用等词法信息，适用于需要输出 XML 文本的应用程序。"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/sax/events.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 处理词法事件

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 处理词法事件

至此，你已经消化了许多 XML 概念，包括 DTD 和外部实体。你也熟悉了 SAX 解析器的用法。本课的剩余部分涵盖高级主题，只有当你编写基于 SAX 的应用程序时才需要理解。如果你的主要目标是编写基于 DOM 的应用程序，你可以直接跳到[[JAXP-DOM|文档对象模型]]。

你之前看到，如果你将文本作为 XML 输出，你需要知道你是否在 CDATA 部分中。如果是，那么尖括号(<)和与号(&)应该原样输出。但如果你不在 CDATA 部分中，它们应该被替换为预定义实体 &lt; 和 &amp;。但你如何知道你是否在处理 CDATA 部分？

再说，如果你以某种方式过滤 XML，你会希望传递注释。通常解析器会忽略注释。你如何获取注释以便回显它们？

本节回答这些问题。它向你展示如何使用 org.xml.sax.ext.LexicalHandler 来识别注释、CDATA 部分和对已解析实体的引用。

注释、CDATA 标记和对已解析实体的引用构成了词法信息(lexical information)——即关于 XML 文本本身的信息，而不是 XML 的信息内容。当然，大多数应用程序只关心 XML 文档的内容。这类应用程序不会使用 LexicalEventListener API。但输出 XML 文本的应用程序会发现它不可或缺。

---

**注意 -** 词法事件处理是可选的解析器特性。解析器实现不要求支持它。（参考实现支持。）本讨论假设你的解析器支持。

---

## LexicalHandler 的工作原理

要在 SAX 解析器看到词法信息时得到通知，你用 LexicalHandler 配置解析器底层的 XmlReader。LexicalHandler 接口定义了以下事件处理方法。

comment(String comment)

将注释传递给应用程序。

startCDATA(), endCDATA()

告知 CDATA 部分何时开始和结束，这告诉你的应用程序下次调用 characters() 时期望什么样的字符。

startEntity(String name), endEntity(String name)

给出已解析实体的名称。

startDTD(String name, String publicId, String systemId), endDTD()

告知何时正在处理 DTD，并标识它。

要激活词法处理器，你的应用程序必须扩展 DefaultHandler 并实现 LexicalHandler 接口。然后，你必须配置解析器委托的 XMLReader 实例，并配置它将词法事件发送到你的词法处理器，如下所示。

```text
// ...

SAXParser saxParser = factory.newSAXParser();
XMLReader xmlReader = saxParser.getXMLReader();
xmlReader.setProperty("http://xml.org/sax/properties/lexical-handler",
                      handler);
// ...
```

这里，你使用 XMLReader 类中定义的 setProperty() 方法配置 XMLReader。属性名称作为 SAX 标准的一部分定义，是 URN，http://xml.org/sax/properties/lexical-handler。

最后，添加类似以下代码来定义将实现接口的适当方法。

```java
// ...

public void warning(SAXParseException err) {
    // ...
}

public void comment(char[] ch, int start, int length) throws SAXException {
    // ...
}

public void startCDATA() throws SAXException {
    // ...
}

public void endCDATA() throws SAXException {
    // ...
}

public void startEntity(String name) throws SAXException {
    // ...
}

public void endEntity(String name) throws SAXException {
    // ...
}

public void startDTD(String name, String publicId, String systemId)
    throws SAXException {
    // ...
}

public void endDTD() throws SAXException {
    // ...
}

private void echoText() {
    // ...
}

// ...
```

这段代码将把你的解析应用程序转换为词法处理器。剩下要做的只是给这些新方法中的每一个一个要执行的动作。

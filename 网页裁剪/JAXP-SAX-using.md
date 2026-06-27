---
分类:
  - "网页裁剪"
标题: "使用 DTDHandler 和 EntityResolver"
描述: "《Java 教程》JAXP SAX 课程，介绍两个剩余的 SAX 事件处理器：DTDHandler（处理未解析实体和表示法声明）与 EntityResolver（将公共 ID 解析为系统 ID）。"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/sax/using.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 使用 DTDHandler 和 EntityResolver

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 使用 DTDHandler 和 EntityResolver

本节介绍两个剩余的 SAX 事件处理器：DTDHandler 和 EntityResolver。当 DTD 遇到未解析实体或表示法声明时，调用 DTDHandler。当必须将 URN（公共 ID）解析为 URL（系统 ID）时，EntityResolver 发挥作用。

## DTDHandler API

[[JAXP-SAX-validation|选择解析器实现]]展示了一种使用 MIME 数据类型引用包含二进制数据（如图像文件）的文件的方法。那是最简单、最可扩展的机制。不过，为了与旧的 SGML 风格数据兼容，也可以定义未解析实体。

NDATA 关键字定义未解析实体：

`<!ENTITY myEntity SYSTEM "..URL.." NDATA gif>`

NDATA 关键字表示此实体中的数据不是可解析的 XML 数据，而是使用某种其他表示法的数据。在此例中，表示法名为 gif。然后 DTD 必须包含该表示法的声明，看起来类似以下内容。

`<!NOTATION gif SYSTEM "..URL..">`

当解析器看到未解析实体或表示法声明时，它不对信息做任何处理，只是使用 DTDHandler 接口将其传递给应用程序。该接口定义了两个方法。

- notationDecl(String name, String publicId, String systemId)
- unparsedEntityDecl(String name, String publicId, String systemId, String notationName

notationDecl 方法被传递表示法的名称以及公共或系统标识符，或两者，取决于 DTD 中声明了哪个。unparsedEntityDecl 方法被传递实体的名称、适当的标识符以及它使用的表示法名称。

---

**注意 -** DTDHandler 接口由 DefaultHandler 类实现。

---

表示法也可用于属性声明。例如，以下声明要求为 GIF 和 PNG 图像文件格式提供表示法。

```text
<!ENTITY image EMPTY>
<!ATTLIST image ...  type  NOTATION  (gif | png) "gif">
```

这里，type 被声明为 gif 或 png。如果两者都未指定，默认为 gif。

无论表示法引用是用于描述未解析实体还是属性，都由应用程序执行适当的处理。解析器对表示法的语义一无所知。它只传递声明。

## EntityResolver API

EntityResolver API 让你将公共 ID(URN) 转换为系统 ID(URL)。你的应用程序可能需要这样做，例如，将类似 href="urn:/someName" 的内容转换为 "http://someURL"。

EntityResolver 接口定义了单个方法：

`resolveEntity(String publicId, String systemId)`

此方法返回一个 InputSource 对象，可用于访问实体的内容。将 URL 转换为 InputSource 足够简单。但作为系统 ID 传递的 URL 将是原始文档的位置，而该文档很可能位于网络上的某处。要访问本地副本（如果有的话），你必须在系统某处维护一个将名称（公共 ID）映射到本地 URL 的目录。

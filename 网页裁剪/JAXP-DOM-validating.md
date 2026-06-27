---
分类:
  - "网页裁剪"
标题: "使用 XML Schema 验证"
描述: "《Java 教程》JAXP DOM 课程，介绍 XML Schema 验证过程，涵盖配置 DocumentBuilderFactory、将文档关联到模式、使用多命名空间验证，以及运行 DOMEcho 示例。"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/dom/validating.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 使用 XML Schema 验证

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 使用 XML Schema 验证

本节讨论 XML Schema 验证过程。虽然对 XML Schema 的全面介绍超出了本教程的范围，但本节向你展示了使用 XML Schema 定义验证 XML 文档所需的步骤。（要了解有关 XML Schema 的更多信息，你可以查阅在线教程 [XML Schema Part 0: Primer](http://www.w3.org/TR/xmlschema-0/)。在本节末尾，你还将学习如何使用 XML Schema 定义验证包含来自多个命名空间元素的文档。）

## 验证过程概述

要收到 XML 文档中验证错误的通知，必须满足以下条件：

- 工厂必须已配置，并设置了适当的错误处理器。
- 文档必须与至少一个模式关联，可能更多。

## 配置 DocumentBuilderFactory

首先定义配置工厂时使用的常量很有帮助。这些常量与使用 XML Schema 进行 SAX 解析时定义的常量相同，它们在 DOMEcho 示例程序的开头声明。

```java
static final String JAXP_SCHEMA_LANGUAGE =
    "http://java.sun.com/xml/jaxp/properties/schemaLanguage";
static final String W3C_XML_SCHEMA =
    "http://www.w3.org/2001/XMLSchema";
```

接下来，你配置 DocumentBuilderFactory 以生成使用 XML Schema 的命名空间感知、验证解析器。这是通过在 [[JAXP-DOM-readingXML|实例化工厂]]中创建的 DocumentBuilderFactory 实例 dbf 上调用 setValidating 方法来完成的。

```java
// ...

dbf.setNamespaceAware(true);
dbf.setValidating(dtdValidate || xsdValidate);

if (xsdValidate) {
    try {
        dbf.setAttribute(JAXP_SCHEMA_LANGUAGE, W3C_XML_SCHEMA);
    }
    catch (IllegalArgumentException x) {
        System.err.println("Error: JAXP DocumentBuilderFactory attribute "
                           + "not recognized: " + JAXP_SCHEMA_LANGUAGE);
        System.err.println("Check to see if parser conforms to JAXP spec.");
        System.exit(1);
    }
}

// ...
```

因为符合 JAXP 的解析器默认不是命名空间感知的，所以必须设置此属性才能使模式验证工作。你还设置工厂属性以指定要使用的解析器语言。（另一方面，对于 SAX 解析，你在工厂生成的解析器上设置属性。）

## 将文档关联到模式

现在程序已准备好使用 XML Schema 定义进行验证，只需确保 XML 文档与（至少）一个模式关联即可。有两种方法：

- 在 XML 文档中使用模式声明
- 在应用程序中指定要使用的模式

---

**注意 -** 当应用程序指定要使用的模式时，它会覆盖文档中的任何模式声明。

---

要在文档中指定模式定义，你需要创建如下 XML：

`<*documentRoot* xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation='*YourSchemaDefinition.xsd*'> [...]`

第一个属性定义 XML 命名空间(xmlns) 前缀 xsi，代表"XML Schema instance"。第二行指定用于文档中没有命名空间前缀的元素的模式——即，你通常在任何简单、不复杂的 XML 文档中定义的元素。（你将在下一节中看到如何处理多个命名空间。）

你也可以在应用程序中指定模式文件，DOMEcho 就是这种情况。

```java
static final String JAXP_SCHEMA_SOURCE =
    "http://java.sun.com/xml/jaxp/properties/schemaSource";

// ...

dbf.setValidating(dtdValidate || xsdValidate);
if (xsdValidate) {
    // ...
}

if (schemaSource != null) {
    dbf.setAttribute(JAXP_SCHEMA_SOURCE, new File(schemaSource));
}
```

这里也有可用的机制让你指定多个模式。我们接下来看看这些。

## 使用多个命名空间验证

命名空间允许你在同一文档中组合服务于不同目的的元素，而不必担心名称重叠。

---

**注意 -** 本节讨论的内容也适用于使用 SAX 解析器时的验证。你在这里看到它，因为此时你已经了解了足够的命名空间知识，使讨论有意义。

---

为了构造一个示例，考虑一个跟踪人事数据的 XML 数据集。该数据集可能包含来自税务申报表的信息以及来自员工招聘表的信息，两个元素在各自的模式中都命名为 form。

如果为税务命名空间定义了一个前缀，为招聘命名空间定义了另一个前缀，那么人事数据可以包含如下片段。

```xml
<employee id="...">
  <name>....</name>
  <tax:form>
     ...w2 税务表数据...
  </tax:form>
  <hiring:form>
     ...就业历史等...
  </hiring:form>
</employee>
```

tax:form 元素的内容显然与 hiring:form 元素的内容不同，必须以不同方式验证。

还要注意，在此示例中有一个默认命名空间，未限定的元素名 employee 和 name 属于该命名空间。为了正确验证文档，必须声明该命名空间的模式，以及 tax 和 hiring 命名空间的模式。

---

**注意 -** 默认命名空间实际上是一个特定的命名空间。它被定义为"没有名称的命名空间"。因此，你不能简单地本周将一个命名空间用作默认值，之后再将另一个命名空间用作默认值。这个"未命名的命名空间"（或"null 命名空间"）就像数字零。它没有任何可说的值（没有名称），但它仍然被精确定义。因此，有名称的命名空间永远不能用作默认命名空间。

---

解析时，数据集中的每个元素都将根据适当的模式验证，只要这些模式已被声明。同样，模式可以作为 XML 数据集的一部分或在程序中声明。（也可以混合声明。但通常，将所有声明放在一起是个好主意。）

## 在 XML 数据集中声明模式

要在数据集中为前面的示例声明要使用的模式，XML 代码看起来类似于以下内容。

```xml
<documentRoot
  xmlns:xsi=
  "http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation=
    "employeeDatabase.xsd"
  xsi:schemaLocation=
  "http://www.irs.gov.example.com/
   fullpath/w2TaxForm.xsd
   http://www.ourcompany.example.com/
   relpath/hiringForm.xsd"
  xmlns:tax=
    "http://www.irs.gov.example.com/"
  xmlns:hiring=
    "http://www.ourcompany.example.com/"
>
```

noNamespaceSchemaLocation 声明是你之前见过的，最后两个条目也是如此，它们定义了命名空间前缀 tax 和 hiring。新的是中间的条目，它定义了文档中引用的每个命名空间要使用的模式的位置。

xsi:schemaLocation 声明由条目对组成，每对中的第一个条目是指定命名空间的完全限定 URI，第二个条目包含模式定义的完整路径或相对路径。通常，建议使用完全限定路径。这样，模式往往只存在一个副本。

注意，定义模式位置时不能使用命名空间前缀。xsi:schemaLocation 声明只理解命名空间名称而不理解前缀。

## 在应用程序中声明模式

要在应用程序中声明等效的模式，代码看起来类似于以下内容。

```java
static final String employeeSchema = "employeeDatabase.xsd";
static final String taxSchema = "w2TaxForm.xsd";
static final String hiringSchema = "hiringForm.xsd";

static final String[] schemas = {
    employeeSchema,
    taxSchema,
    hiringSchema,
};

static final String JAXP_SCHEMA_SOURCE =
    "http://java.sun.com/xml/jaxp/properties/schemaSource";

// ...

DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance()

// ...

factory.setAttribute(JAXP_SCHEMA_SOURCE, schemas);
```

这里，指向模式定义(.xsd 文件) 的字符串数组作为参数传递给 factory.setAttribute 方法。注意与将模式声明为 XML 数据集一部分时的差异。

- 没有（未命名的）默认模式的特殊声明。
- 你不指定命名空间名称。相反，你只给出 .xsd 文件的指针。

要进行命名空间分配，解析器读取 .xsd 文件，并在其中找到它们适用的目标命名空间的名称。因为文件用 URI 指定，解析器可以使用 EntityResolver（如果已定义）来查找模式的本地副本。

如果模式定义未定义目标命名空间，则它适用于默认（未命名或 null）命名空间。因此，在我们的示例中，你会期望在模式中看到这些目标命名空间声明：

- 指向模式 URI 的字符串
- 包含模式内容的 InputStream
- SAX InputSource
- File
- Object 数组，每个都是此处定义的类型之一

Object 数组只能在模式语言能够在运行时组装模式时使用。此外，传递 Object 数组时，有两个模式共享相同命名空间是非法的。

## 使用模式验证运行 DOMEcho 示例

要使用模式验证运行 DOMEcho 示例，请按以下步骤操作。

1. **导航到示例目录。**`% cd *install-dir*/jaxp-1_4_2-*release-date*/samples.`
2. **使用你刚设置的类路径编译示例类。**`% javac dom/*`
3. **在 XML 文件上运行 DOMEcho 程序，指定模式验证。**
	选择 data 目录中的一个 XML 文件，并使用 -xsd 选项运行 DOMEcho 程序。这里，我们选择在文件 personal-schema.xml 上运行程序。
	`% java dom/DOMEcho -xsd data/personal-schema.xml`
	如你在 [[JAXP-DOM-readingXML|配置工厂]]中所见，-xsd 选项告诉 DOMEcho 对 personal-schema.xml 文件中定义的 XML 模式执行验证。在本例中，模式是文件 personal.xsd，它也位于 sample/data 目录中。
4. **在文本编辑器中打开 personal-schema.xml 并删除模式声明。**
	从开始的 <personnel> 标签中删除以下内容。
	`xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation='personal.xsd'`
	不要忘记保存文件。
5. **再次运行 DOMEcho，再次指定 -xsd 选项。**`% java dom/DOMEcho -xsd data/personal-schema.xml`
	这次，你会看到一系列错误。
6. **再运行一次 DOMEcho，这次指定 -xsdss 选项并指定模式定义文件。**
	如你在 [[JAXP-DOM-readingXML|配置工厂]]中所见，-xsdss 选项告诉 DOMEcho 对运行程序时指定的 XML 模式定义执行验证。再次使用文件 personal.xsd。
	`% java dom/DOMEcho -xsdss data/personal.xsd data/personal-schema.xml`
	你会看到与之前相同的输出，这意味着 XML 文件已成功根据模式验证。

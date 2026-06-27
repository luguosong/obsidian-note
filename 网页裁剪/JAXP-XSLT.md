Documentation

Extensible Stylesheet Language Transformations

[Introducing XSL, XSLT, and XPath](https://docs.oracle.com/javase/tutorial/jaxp/xslt/intro.html)

[How XPath Works](https://docs.oracle.com/javase/tutorial/jaxp/xslt/xpath.html)

[Writing Out a DOM as an XML File](https://docs.oracle.com/javase/tutorial/jaxp/xslt/writingDom.html)

[Generating XML from an Arbitrary Data Structure](https://docs.oracle.com/javase/tutorial/jaxp/xslt/generatingXML.html)

[Transforming XML Data with XSLT](https://docs.oracle.com/javase/tutorial/jaxp/xslt/transformingXML.html)

[« Previous](https://docs.oracle.com/javase/tutorial/jaxp/dom/index.html) • [Trail](https://docs.oracle.com/javase/tutorial/jaxp/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jaxp/xslt/intro.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Extensible Stylesheet Language Transformations

The Extensible Stylesheet Language Transformations (XSLT) standard defines mechanisms for addressing XML data (XPath) and for specifying transformations on the data in order to convert it into other forms. JAXP includes an interpreting implementation of XSLT.

In this lesson, you will write out a Document Object Model as an XML file, and you will see how to generate a DOM from an arbitrary data file in order to convert it to XML. Finally, you will convert XML data into a different form, learning about the XPath addressing mechanism along the way.
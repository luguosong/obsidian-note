Documentation

Introduction to JAXP

[Overview of the Packages](https://docs.oracle.com/javase/tutorial/jaxp/intro/package.html)

[Simple API for XML APIs](https://docs.oracle.com/javase/tutorial/jaxp/intro/simple.html)

[Document Object Model APIs](https://docs.oracle.com/javase/tutorial/jaxp/intro/dom.html)

[Extensible Stylesheet Language Transformations APIs](https://docs.oracle.com/javase/tutorial/jaxp/intro/extensible.html)

[Streaming API for XML APIs](https://docs.oracle.com/javase/tutorial/jaxp/intro/streaming.html)

[Finding the JAXP Sample Programs](https://docs.oracle.com/javase/tutorial/jaxp/intro/sample.html)

[Where Do You Go From Here?](https://docs.oracle.com/javase/tutorial/jaxp/intro/next.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Introduction to JAXP

The Java API for XML Processing (JAXP) is for processing XML data using applications written in the Java programming language. JAXP leverages the parser standards Simple API for XML Parsing (SAX) and Document Object Model (DOM) so that you can choose to parse your data as a stream of events or to build an object representation of it. JAXP also supports the Extensible Stylesheet Language Transformations (XSLT) standard, giving you control over the presentation of the data and enabling you to convert the data to other XML documents or to other formats, such as HTML. JAXP also provides namespace support, allowing you to work with DTDs that might otherwise have naming conflicts. Finally, as of version 1.4, JAXP implements the Streaming API for XML (StAX) standard.

Designed to be flexible, JAXP allows you to use any XML-compliant parser from within your application. It does this with what is called a pluggability layer, which lets you plug in an implementation of the SAX or DOM API. The pluggability layer also allows you to plug in an XSL processor, letting you control how your XML data is displayed.
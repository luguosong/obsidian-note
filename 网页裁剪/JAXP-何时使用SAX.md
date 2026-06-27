---
分类:
  - "网页裁剪"
标题: "When to Use SAX (The Java™ Tutorials >        
            Java API for XML Processing (JAXP) > Simple API for XML)"
描述: "This JAXP Java tutorial describes Java API for XML Processing (jaxp), XSLT, SAX, and related XML topics"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/sax/when.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

When to Use SAX

[Parsing an XML File Using SAX](https://docs.oracle.com/javase/tutorial/jaxp/sax/parsing.html)

[Implementing SAX Validation](https://docs.oracle.com/javase/tutorial/jaxp/sax/validation.html)

[Handling Lexical Events](https://docs.oracle.com/javase/tutorial/jaxp/sax/events.html)

[Using the DTDHandler and EntityResolver](https://docs.oracle.com/javase/tutorial/jaxp/sax/using.html)

[Further Information](https://docs.oracle.com/javase/tutorial/jaxp/sax/info.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## When to Use SAX

It is helpful to understand the SAX event model when you want to convert existing data to XML. The key to the conversion process is to modify an existing application to deliver SAX events as it reads the data.

SAX is fast and efficient, but its event model makes it most useful for such state-independent filtering. For example, a SAX parser calls one method in your application when an element tag is encountered and calls a different method when text is found. If the processing you are doing is state-independent (meaning that it does not depend on the elements that have come before), then SAX works fine.

On the other hand, for state-dependent processing, where the program needs to do one thing with the data under element A but something different with the data under element B, then a pull parser such as the Streaming API for XML (StAX) would be a better choice. With a pull parser, you get the next node, whatever it happens to be, at any point in the code that you ask for it. So it is easy to vary the way you process text (for example), because you can process it multiple places in the program (for more detail, see [Further Information](https://docs.oracle.com/javase/tutorial/jaxp/sax/info.html)).

SAX requires much less memory than DOM, because SAX does not construct an internal representation (tree structure) of the XML data, as a DOM does. Instead, SAX simply sends data to the application as it is read; your application can then do whatever it wants to do with the data it sees.

Pull parsers and the SAX API both act like a serial I/O stream. You see the data as it streams in, but you cannot go back to an earlier position or leap ahead to a different position. In general, such parsers work well when you simply want to read data and have the application act on it.

But when you need to modify an XML structure - especially when you need to modify it interactively - an in-memory structure makes more sense. DOM is one such model. However, although DOM provides many powerful capabilities for large-scale documents (like books and articles), it also requires a lot of complex coding. The details of that process are highlighted in [When to Use DOM](https://docs.oracle.com/javase/tutorial/jaxp/dom/when.html) in the next lesson.

For simpler applications, that complexity may well be unnecessary. For faster development and simpler applications, one of the object-oriented XML-programming standards, such as JDOM ( [http://www.jdom.org](http://www.jdom.org/)) and DOM4J ( [http://www.dom4j.org/](http://www.dom4j.org/)), might make more sense.
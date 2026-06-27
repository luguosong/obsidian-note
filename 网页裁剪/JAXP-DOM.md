Documentation

Document Object Model

[When to Use DOM](https://docs.oracle.com/javase/tutorial/jaxp/dom/when.html)

[Reading XML Data into a DOM](https://docs.oracle.com/javase/tutorial/jaxp/dom/readingXML.html)

[Validating with XML Schema](https://docs.oracle.com/javase/tutorial/jaxp/dom/validating.html)

[Further Information](https://docs.oracle.com/javase/tutorial/jaxp/dom/info.html)

[« Previous](https://docs.oracle.com/javase/tutorial/jaxp/sax/index.html) • [Trail](https://docs.oracle.com/javase/tutorial/jaxp/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jaxp/dom/when.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Document Object Model

This lesson presents the Document Object Model (DOM). A DOM is a standard tree structure, where each node contains one of the components from an XML structure. The two most common types of nodes are element nodes and text nodes. Using DOM functions lets you create nodes, remove nodes, change their contents, and traverse the node hierarchy.

The examples in this lesson demonstrate how to parse an existing XML file to construct a DOM, display and inspect the DOM hierarchy, and explore the syntax of namespaces. It also shows how to create a DOM from scratch, and see how to use some of the implementation-specific features in Sun's JAXP implementation to convert an existing data set to XML.
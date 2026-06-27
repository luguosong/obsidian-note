---
分类:
  - "网页裁剪"
标题: "Handling Lexical Events (The Java™ Tutorials >        
            Java API for XML Processing (JAXP) > Simple API for XML)"
描述: "This JAXP Java tutorial describes Java API for XML Processing (jaxp), XSLT, SAX, and related XML topics"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/sax/events.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Handling Lexical Events (The Java™ Tutorials >        
            Java API for XML Processing (JAXP) > Simple API for XML)

Documentation

[[JAXP-何时使用SAX|When to Use SAX]]

[[JAXP-SAX-parsing|Parsing an XML File Using SAX]]

[[JAXP-SAX-validation|Implementing SAX Validation]]

Handling Lexical Events

[[JAXP-SAX-using|Using the DTDHandler and EntityResolver]]

[[JAXP-SAX-info|Further Information]]

[[JAXP-SAX-validation|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jaxp/TOC.html) • [[JAXP-SAX-using|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Handling Lexical Events

At this point, you have digested many XML concepts, including DTDs and external entities. You have also learned your way around the SAX parser. The remainder of this lesson covers advanced topics that you will need to understand only if you are writing SAX-based applications. If your primary goal is to write DOM-based applications, you can skip ahead to [[JAXP-DOM|Document Object Model]].

You saw earlier that if you are writing text out as XML, you need to know whether you are in a CDATA section. If you are, then angle brackets (<) and ampersands (&) should be output unchanged. But if you are not in a CDATA section, they should be replaced by the predefined entities &lt; and &amp;. But how do you know whether you are processing a CDATA section?

Then again, if you are filtering XML in some way, you want to pass comments along. Normally the parser ignores comments. How can you get comments so that you can echo them?

This section answers those questions. It shows you how to use org.xml.sax.ext.LexicalHandler to identify comments, CDATA sections, and references to parsed entities.

Comments, CDATA tags, and references to parsed entities constitute lexical information-that is, information that concerns the text of the XML itself, rather than the XML's information content. Most applications, of course, are concerned only with the content of an XML document. Such applications will not use the LexicalEventListener API. But applications that output XML text will find it invaluable.

---

**Note -** Lexical event handling is an optional parser feature. Parser implementations are not required to support it. (The reference implementation does so.) This discussion assumes that your parser does so.

---

## How the LexicalHandler Works

To be informed when the SAX parser sees lexical information, you configure the XmlReader that underlies the parser with a LexicalHandler. The LexicalHandler interface defines the following event-handling methods.

comment(String comment)

Passes comments to the application.

startCDATA(), endCDATA()

Tells when a CDATA section is starting and ending, which tells your application what kind of characters to expect the next time characters() is called.

startEntity(String name), endEntity(String name)

Gives the name of a parsed entity.

startDTD(String name, String publicId, String systemId), endDTD()

Tells when a DTD is being processed, and identifies it.

To activate the Lexical Handler, your application must extend DefaultHandler and implement the LexicalHandler interface. Then, you must configure your XMLReader instance that the parser delegates to, and configure it to send lexical events to your lexical handler, as shown below.

```text
// ...

SAXParser saxParser = factory.newSAXParser();
XMLReader xmlReader = saxParser.getXMLReader();
xmlReader.setProperty("http://xml.org/sax/properties/lexical-handler",
                      handler); 
// ...
```

Here, you configure the XMLReader using the setProperty() method defined in the XMLReader class. The property name, defined as part of the SAX standard, is the URN, http://xml.org/sax/properties/lexical-handler.

Finally, add something like the following code to define the appropriate methods that will implement the interface.

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

This code will transform your parsing application into a lexical handler. All that remains to be done is to give each of these new methods an action to perform.
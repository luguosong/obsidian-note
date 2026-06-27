---
分类:
  - "网页裁剪"
标题: "Reading XML Data into a DOM (The Java™ Tutorials >        
            Java API for XML Processing (JAXP) > Document Object Model)"
描述: "This JAXP Java tutorial describes Java API for XML Processing (jaxp), XSLT, SAX, and related XML topics"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/dom/readingXML.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JAXP-DOM-when|When to Use DOM]]

Reading XML Data into a DOM

[[JAXP-DOM-validating|Validating with XML Schema]]

[[JAXP-DOM-info|Further Information]]

[[JAXP-DOM-when|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jaxp/TOC.html) • [[JAXP-DOM-validating|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Reading XML Data into a DOM

In this section, you will construct a Document Object Model by reading in an existing XML file.

---

**Note -** In [[JAXP-XSLT|Extensible Stylesheet Language Transformations]], you will see how to write out a DOM as an XML file. (You will also see how to convert an existing data file into XML with relative ease.)

---

## Creating the Program

The Document Object Model provides APIs that let you create, modify, delete, and rearrange nodes. Before you try to create a DOM, it is helpful to understand how a DOM is structured. This series of examples will make DOM internals visible via a sample program called DOMEcho, which you will find in the directory *INSTALL\_DIR* /jaxp- *version* /samples/dom after you have installed the JAXP API.

### Create the Skeleton

First, build a simple program to read an XML document into a DOM and then write it back out again.

Start with the normal basic logic for an application, and check to make sure that an argument has been supplied on the command line:

```
public class DOMEcho {

    static final String outputEncoding = "UTF-8";

    private static void usage() {
        // ...
    }

    public static void main(String[] args) throws Exception {
        String filename = null;
    
        for (int i = 0; i < args.length; i++) {
            if (...) { 
                // ...
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
    }
}
```

This code performs all the basic set up operations. All output for DOMEcho uses UTF-8 encoding. The usage() method that is called if no argument is specified simply tells you what arguments DOMEcho expects, so the code is not shown here. A filename string is also declared, which will be the name of the XML file to be parsed into a DOM by DOMEcho.

### Import the Required Classes

In this section, all the classes are individually named so you that can see where each class comes from, in case you want to reference the API documentation. In the sample file, the import statements are made with the shorter form, such as javax.xml.parsers.\*.

These are the JAXP APIs used by DOMEcho:

```
package dom;
import javax.xml.parsers.DocumentBuilder; 
import javax.xml.parsers.DocumentBuilderFactory;
```

These classes are for the exceptions that can be thrown when the XML document is parsed:

```
import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXException; 
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.*
```

These classes read the sample XML file and manage output:

```
import java.io.File;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
```

Finally, import the W3C definitions for a DOM, DOM exceptions, entities and nodes:

```
import org.w3c.dom.Document;
import org.w3c.dom.DocumentType;
import org.w3c.dom.Entity;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
```

### Handle Errors

Next, add the error-handling logic. The most important point is that a JAXP-conformant document builder is required to report SAX exceptions when it has trouble parsing an XML document. The DOM parser does not have to actually use a SAX parser internally, but because the SAX standard is already there, it makes sense to use it for reporting errors. As a result, the error-handling code for DOM applications is very similar to that for SAX applications:

```
private static class MyErrorHandler implements ErrorHandler {
     
    private PrintWriter out;

    MyErrorHandler(PrintWriter out) {
        this.out = out;
    }

    private String getParseExceptionInfo(SAXParseException spe) {
        String systemId = spe.getSystemId();
        if (systemId == null) {
            systemId = "null";
        }

        String info = "URI=" + systemId + " Line=" + spe.getLineNumber() +
                      ": " + spe.getMessage();
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

As you can see, the DomEcho class's error handler generates its output using PrintWriter instances.

### Instantiate the Factory

Next, add the following code to the main() method, to obtain an instance of a factory that can give us a document builder.

```
public static void main(String[] args) throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

    // ...
}
```

### Get a Parser and Parse the File

Now, add the following code to main() to get an instance of a builder, and use it to parse the specified file.

```
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
DocumentBuilder db = dbf.newDocumentBuilder(); 
Document doc = db.parse(new File(filename));
```

The file being parsed is provided by the filename variable that was declared at the beginning of the main() method, which is passed to DOMEcho as an argument when the program is run.

### Configuring the Factory

By default, the factory returns a non-validating parser that knows nothing about name spaces. To get a validating parser, or one that understands name spaces (or both), you can configure the factory to set either or both of those options using the following code.

```
public static void main(String[] args) throws Exception {

    String filename = null;
    boolean dtdValidate = false;
    boolean xsdValidate = false;
    String schemaSource = null;
        
    for (int i = 0; i < args.length; i++) {
        if (args[i].equals("-dtd"))  { 
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

    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

    dbf.setNamespaceAware(true);
    dbf.setValidating(dtdValidate || xsdValidate);

    // ...

    DocumentBuilder db = dbf.newDocumentBuilder();
    Document doc = db.parse(new File(filename));
}
```

As you can see, command line arguments are set up so that you can inform DOMEcho to perform validation against either a DTD or an XML Schema, and the factory is configured to be name space aware and to perform whichever type of validation the user specifies.

---

**Note -** JAXP-conformant parsers are not required to support all combinations of those options, even though the reference parser does. If you specify an invalid combination of options, the factory generates a ParserConfigurationException when you attempt to obtain a parser instance.

---

More information about how to use name spaces and validation is provided in [[JAXP-DOM-validating|Validating with XML Schema]], in which the code that is missing from the above extract will be described.

### Handling Validation Errors

The default response to a validation error, as dictated by the SAX standard, is to do nothing. The JAXP standard requires throwing SAX exceptions, so you use exactly the same error-handling mechanisms as you use for a SAX application. In particular, you use the DocumentBuilder class's setErrorHandler method to supply it with an object that implements the SAX ErrorHandler interface.

---

**Note -** DocumentBuilder also has a setEntityResolver method you can use.

---

The following code configures the document builder to use the error handler defined in [[JAXP-DOM-readingXML|Handle Errors]].

```
DocumentBuilder db = dbf.newDocumentBuilder();
OutputStreamWriter errorWriter = new OutputStreamWriter(System.err,
                                         outputEncoding);
db.setErrorHandler(new MyErrorHandler (new PrintWriter(errorWriter, true)));
Document doc = db.parse(new File(filename));
```

The code you have seen so far has set up the document builder, and configured it to perform validation upon request. Error handling is also in place. However, DOMEcho does not do anything yet. In the next section, you will see how to display the DOM structure and begin to explore it. For example, you will see what entity references and CDATA sections look like in the DOM. And perhaps most importantly, you will see how text nodes (which contain the actual data) reside under element nodes in a DOM.

## Displaying the DOM Nodes

To create or manipulate a DOM, it helps to have a clear idea of how the nodes in a DOM are structured. This section of the tutorial exposes the internal structure of a DOM, so that you can see what it contains. The DOMEcho example does this by echoing the DOM nodes, and then printing them out onscreen, with the appropriate indentation to make the node hierarchy apparent. The specification of these node types can be found in the [DOM Level 2 Core Specification](http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113), under the specification for Node. [Table 3-1](#gfzpy) below is adapted from that specification.

Table 3-1 Node Types

| Node | nodeName | nodeValue | Attributes |
| --- | --- | --- | --- |
| Attr | Name of attribute | Value of attribute | null |
| CDATASection | #cdata-section | Content of the CDATA section | null |
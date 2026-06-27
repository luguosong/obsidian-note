Documentation

[Getting Started With Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/getStarted.html)

[Defining an Applet Subclass](https://docs.oracle.com/javase/tutorial/deployment/applet/subclass.html)

[Methods for Milestones](https://docs.oracle.com/javase/tutorial/deployment/applet/appletMethods.html)

[Life Cycle of an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/lifeCycle.html)

[Applet's Execution Environment](https://docs.oracle.com/javase/tutorial/deployment/applet/appletExecutionEnv.html)

[Developing an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/developingApplet.html)

[Deploying an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/deployingApplet.html)

[Deploying With the Applet Tag](https://docs.oracle.com/javase/tutorial/deployment/applet/html.html)

[Doing More With Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/doingMoreWithApplets.html)

[Finding and Loading Data Files](https://docs.oracle.com/javase/tutorial/deployment/applet/data.html)

[Defining and Using Applet Parameters](https://docs.oracle.com/javase/tutorial/deployment/applet/param.html)

[Displaying Short Status Strings](https://docs.oracle.com/javase/tutorial/deployment/applet/showStatus.html)

[Displaying Documents in the Browser](https://docs.oracle.com/javase/tutorial/deployment/applet/browser.html)

[Invoking JavaScript Code From an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingJavaScriptFromApplet.html)

[Invoking Applet Methods From JavaScript Code](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingAppletMethodsFromJavaScript.html)

[Handling Initialization Status With Event Handlers](https://docs.oracle.com/javase/tutorial/deployment/applet/appletStatus.html)

Manipulating DOM of Applet's Web Page

[Writing Diagnostics to Standard Output and Error Streams](https://docs.oracle.com/javase/tutorial/deployment/applet/stdout.html)

[Developing Draggable Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/draggableApplet.html)

[Communicating With Other Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/iac.html)

[Working With a Server-Side Application](https://docs.oracle.com/javase/tutorial/deployment/applet/server.html)

[Network Client Applet Example](https://docs.oracle.com/javase/tutorial/deployment/applet/clientExample.html)

[What Applets Can and Cannot Do](https://docs.oracle.com/javase/tutorial/deployment/applet/security.html)

[Solving Common Applet Problems](https://docs.oracle.com/javase/tutorial/deployment/applet/problemsindex.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/deployment/applet/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/appletStatus.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/applet/stdout.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Manipulating DOM of Applet's Web Page

Every web page is composed of a series of nested objects. These objects make up the Document Object Model (DOM). A Java applet can traverse and modify objects of its parent web page using the [`Common DOM API`](https://docs.oracle.com/javase/8/docs/jre/api/plugin/dom/index.html).

Consider an example of a Java applet that dumps the contents of its parent web page.

In order to traverse and manipulate the DOM tree, you must first obtain a reference to the `Document` object for the web page. You can do so by using the `getDocument` method in the `com.sun.java.browser.plugin2.DOM` class. Here is a code snippet that retrieves a reference to a `Document` object in the [`` `DOMDump` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_TraversingDOM/src/DOMDump.java) applet's `start` method. See inline comments in the code.

```
public void start() {
    try {
        // use reflection to get document
        Class c =
          Class.forName("com.sun.java.browser.plugin2.DOM");
        Method m = c.getMethod("getDocument",
          new Class[] { java.applet.Applet.class });
        
        // cast object returned as HTMLDocument;
        // then traverse or modify DOM
        HTMLDocument doc = (HTMLDocument) m.invoke(null,
            new Object[] { this });
        HTMLBodyElement body =
            (HTMLBodyElement) doc.getBody();
        dump(body, INDENT);
    } catch (Exception e) {
        System.out.println("New Java Plug-In not available");
        // In this case, you could fallback to the old
        // bootstrapping mechanism available in the
        // com.sun.java.browser.plugin.dom package
    }
}
```

Now that you have a reference to the `Document` object, you can traverse and modify the DOM tree using the Common DOM API. The `DOMDump` applet traverses the DOM tree and writes its contents to the Java Console log.

```
private void dump(Node root, String prefix) {
    if (root instanceof Element) {
        System.out.println(prefix +
            ((Element) root).getTagName() + 
            " / " + root.getClass().getName());
    } else if (root instanceof CharacterData) {
        String data =
            ((CharacterData) root).getData().trim();
        if (!data.equals("")) {
            System.out.println(prefix +
                "CharacterData: " + data);
        }
    } else {
        System.out.println(prefix +
            root.getClass().getName());
    }
    NamedNodeMap attrs = root.getAttributes();
    if (attrs != null) {
        int len = attrs.getLength();
        for (int i = 0; i < len; i++) {
            Node attr = attrs.item(i);
            System.out.print(prefix + HALF_INDENT +
                "attribute " + i + ": " +
                attr.getNodeName());
            if (attr instanceof Attr) {
                System.out.print(" = " +
                    ((Attr) attr).getValue());
            }
            System.out.println();
        }
    }

    if (root.hasChildNodes()) {
        NodeList children = root.getChildNodes();
        if (children != null) {
            int len = children.getLength();
            for (int i = 0; i < len; i++) {
                dump(children.item(i), prefix +
                    INDENT);
            }
        }
    }
}
```

Open [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_TraversingDOM/AppletPage.html) in a browser to view the `DOMDump` applet running. Check the Java Console log for a dump of the DOM tree of the web page.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 6 update 10](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

[Download the source code](https://docs.oracle.com/javase/tutorial/deployment/applet/examplesIndex.html#ManipulatingDOM) for the *DOM Dump* example to experiment further.
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

Invoking JavaScript Code From an Applet

[Invoking Applet Methods From JavaScript Code](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingAppletMethodsFromJavaScript.html)

[Handling Initialization Status With Event Handlers](https://docs.oracle.com/javase/tutorial/deployment/applet/appletStatus.html)

[Manipulating DOM of Applet's Web Page](https://docs.oracle.com/javase/tutorial/deployment/applet/manipulatingDOMFromApplet.html)

[Writing Diagnostics to Standard Output and Error Streams](https://docs.oracle.com/javase/tutorial/deployment/applet/stdout.html)

[Developing Draggable Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/draggableApplet.html)

[Communicating With Other Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/iac.html)

[Working With a Server-Side Application](https://docs.oracle.com/javase/tutorial/deployment/applet/server.html)

[Network Client Applet Example](https://docs.oracle.com/javase/tutorial/deployment/applet/clientExample.html)

[What Applets Can and Cannot Do](https://docs.oracle.com/javase/tutorial/deployment/applet/security.html)

[Solving Common Applet Problems](https://docs.oracle.com/javase/tutorial/deployment/applet/problemsindex.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/deployment/applet/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/browser.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingAppletMethodsFromJavaScript.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Invoking JavaScript Code From an Applet

Java applets can invoke JavaScript functions present in the same web page as the applet. The [LiveConnect Specification](http://www.oracle.com/technetwork/java/javase/plugin2-142482.html#LIVECONNECT) describes details about how JavaScript code communicates with Java code.

The `netscape.javascript.JSObject` class enables Java applets to retrieve a reference to JavaScript objects and interact with the web page. The Data Summary applet described next invokes JavaScript code to retrieve information from the web page and writes a data summary back to the web page.

Assume you have a web page with a few JavaScript functions. The example [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_InvokingJavaScriptFromApplet/AppletPage.html) has JavaScript functions to retrieve age, address, and phone numbers. There is also a variable called `userName` which has no value at the outset.

```
<head>
<title>Data Summary Applet Page - Java to JavaScript LiveConnect</title>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
<script language="javascript">
    var userName = "";
    
    // returns number
    function getAge() { 
        return 25;
    }
    // returns an object
    function address() { 
        this.street = "1 Example Lane";
        this.city = "Santa Clara";
        this.state = "CA";
    }
    // returns an array
    function getPhoneNums() { 
        return ["408-555-0100", "408-555-0102"];
    } 
    function writeSummary(summary) {
        summaryElem =
            document.getElementById("summary");
        summaryElem.innerHTML = summary;
    }
    </script>

    <!-- ... -->      
</head>
<body>
    <script src =
      "https://www.java.com/js/deployJava.js"></script>
    <script> 
        <!-- ... -->
        deployJava.runApplet(attributes, parameters, '1.6'); 
    </script>          
    <!-- ... -->
    <p id="summary"/>  // this HTML element contains
                             // the summary 
    <!-- ... -->
</body>
```

Next, consider an applet class called `DataSummaryApplet`. The `DataSummaryApplet` class performs the following operations.

- Invokes the `JSObject` 's `setMember` method to set the `userName` variable to "John Doe".
- Retrieves the age, address, and phone numbers and builds a string containing a summary of this data.
- Invokes the `writeSummary` JavaScript function to write the summary back to the web page.

This applet first needs to retrieve a reference to `JSObject` as follows:

```
...
JSObject window = JSObject.getWindow(this);
...
```

Put the preceding statement in a try...catch.. block to handle `netscape.javascript.JSException`.

Now that the applet has a reference to `JSObject`, it can invoke the relevant JavaScript functions by using the `eval` and `call` methods of `JSObject`.

```
package javatojs;

import java.applet.Applet;
import netscape.javascript.*; // add plugin.jar to classpath during compilation

public class DataSummaryApplet extends Applet {
    public void start() {
        try {
            JSObject window = JSObject.getWindow(this);

            String userName = "John Doe";

            // set JavaScript variable
            window.setMember("userName", userName);

            // invoke JavaScript function
            Number age = (Number) window.eval("getAge()");

            // get a JavaScript object and retrieve its contents
            JSObject address = (JSObject) window.eval("new address();");
            String addressStr = (String) address.getMember("street") + ", " +
                    (String) address.getMember("city") + ", " +
                    (String) address.getMember("state");

            // get an array from JavaScript and retrieve its contents
            JSObject phoneNums = (JSObject) window.eval("getPhoneNums()");
            String phoneNumStr = (String) phoneNums.getSlot(0) + ", " +
                    (String) phoneNums.getSlot(1);

            // dynamically change HTML in page; write data summary
            String summary = userName + " : " + age + " : " +
                    addressStr + " : " + phoneNumStr;
            window.call("writeSummary", new Object[] {summary})   ;
        } catch (JSException jse) {
            jse.printStackTrace();
        }
    }
}
```

To compile Java code that has a reference to classes in the `netscape.javascript` package, include `<your JDK path>/jre/lib/plugin.jar` in your classpath. At runtime, the Java Plug-in software automatically makes these classes available to applets.

The Data Summary applet displays the following result on the web page:

```
Result of applet's Java calls to JavaScript on this page
                
John Doe : 25 : 1 Example Lane, Santa Clara, CA : 408-555-0100, 408-555-0102
```

Open [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_InvokingJavaScriptFromApplet/AppletPage.html) in a browser to view the Data Summary applet.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 6 update 10](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

[Download source code](https://docs.oracle.com/javase/tutorial/deployment/applet/examplesIndex.html#InvokingJavaScriptFromApplet) for the *Invoking JavaScript Code From Applet* example to experiment further.
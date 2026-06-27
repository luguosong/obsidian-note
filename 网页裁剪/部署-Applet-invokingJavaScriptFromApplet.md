---
分类:
  - "网页裁剪"
标题: "Invoking JavaScript Code From an Applet (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/invokingJavaScriptFromApplet.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Invoking JavaScript Code From an Applet (The Java™ Tutorials >        
            Deployment > Java Applets)

Documentation

[[部署-Applet-getStarted|Getting Started With Applets]]

[[部署-Applet-subclass|Defining an Applet Subclass]]

[[部署-Applet-appletMethods|Methods for Milestones]]

[[部署-Applet-lifeCycle|Life Cycle of an Applet]]

[[部署-Applet-appletExecutionEnv|Applet's Execution Environment]]

[[部署-Applet-developingApplet|Developing an Applet]]

[[部署-Applet-deployingApplet|Deploying an Applet]]

[[部署-Applet-html|Deploying With the Applet Tag]]

[[部署-Applet-doingMoreWithApplets|Doing More With Applets]]

[[部署-Applet-data|Finding and Loading Data Files]]

[[部署-Applet-param|Defining and Using Applet Parameters]]

[[部署-Applet-showStatus|Displaying Short Status Strings]]

[[部署-Applet-browser|Displaying Documents in the Browser]]

Invoking JavaScript Code From an Applet

[[部署-Applet-invokingAppletMethodsFromJavaScript|Invoking Applet Methods From JavaScript Code]]

[[部署-Applet-appletStatus|Handling Initialization Status With Event Handlers]]

[[部署-Applet-manipulatingDOMFromApplet|Manipulating DOM of Applet's Web Page]]

[[部署-Applet-stdout|Writing Diagnostics to Standard Output and Error Streams]]

[[部署-Applet-draggableApplet|Developing Draggable Applets]]

[[部署-Applet-iac|Communicating With Other Applets]]

[[部署-Applet-server|Working With a Server-Side Application]]

[[部署-Applet-clientExample|Network Client Applet Example]]

[[部署-Applet-安全|What Applets Can and Cannot Do]]

[[部署-Applet-problemsindex|Solving Common Applet Problems]]

[[部署-Applet-questions|Questions and Exercises]]

[[部署-Applet-browser|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-invokingAppletMethodsFromJavaScript|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Invoking JavaScript Code From an Applet

Java applets can invoke JavaScript functions present in the same web page as the applet. The [LiveConnect Specification](http://www.oracle.com/technetwork/java/javase/plugin2-142482.html#LIVECONNECT) describes details about how JavaScript code communicates with Java code.

The `netscape.javascript.JSObject` class enables Java applets to retrieve a reference to JavaScript objects and interact with the web page. The Data Summary applet described next invokes JavaScript code to retrieve information from the web page and writes a data summary back to the web page.

Assume you have a web page with a few JavaScript functions. The example [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_InvokingJavaScriptFromApplet/AppletPage.html) has JavaScript functions to retrieve age, address, and phone numbers. There is also a variable called `userName` which has no value at the outset.

```html
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

Next, consider an applet class called `DataSummaryApplet`. The `DataSummaryApplet` class performs the following operations.

- Invokes the `JSObject` 's `setMember` method to set the `userName` variable to "John Doe".
- Retrieves the age, address, and phone numbers and builds a string containing a summary of this data.
- Invokes the `writeSummary` JavaScript function to write the summary back to the web page.

This applet first needs to retrieve a reference to `JSObject` as follows:

...
JSObject window = JSObject.getWindow(this);
...
```java

Put the preceding statement in a try...catch.. block to handle `netscape.javascript.JSException`.

Now that the applet has a reference to `JSObject`, it can invoke the relevant JavaScript functions by using the `eval` and `call` methods of `JSObject`.

```java
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

```text
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

[[部署-Applet-examplesIndex|Download source code]] for the *Invoking JavaScript Code From Applet* example to experiment further.
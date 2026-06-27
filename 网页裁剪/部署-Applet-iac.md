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

[Manipulating DOM of Applet's Web Page](https://docs.oracle.com/javase/tutorial/deployment/applet/manipulatingDOMFromApplet.html)

[Writing Diagnostics to Standard Output and Error Streams](https://docs.oracle.com/javase/tutorial/deployment/applet/stdout.html)

[Developing Draggable Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/draggableApplet.html)

Communicating With Other Applets

[Working With a Server-Side Application](https://docs.oracle.com/javase/tutorial/deployment/applet/server.html)

[Network Client Applet Example](https://docs.oracle.com/javase/tutorial/deployment/applet/clientExample.html)

[What Applets Can and Cannot Do](https://docs.oracle.com/javase/tutorial/deployment/applet/security.html)

[Solving Common Applet Problems](https://docs.oracle.com/javase/tutorial/deployment/applet/problemsindex.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/deployment/applet/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/draggableApplet.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/applet/server.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Communicating With Other Applets

A Java applet can communicate with other Java applets by using JavaScript functions in the parent web page. JavaScript functions enable communication between applets by receiving messages from one applet and invoking methods of other applets. See the following topics for more information about the interaction between Java code and JavaScript code:

- [Invoking JavaScript Code From an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingJavaScriptFromApplet.html)
- [Invoking Applet Methods From JavaScript Code](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingAppletMethodsFromJavaScript.html)

You should avoid using the following mechanisms to find other applets and share data between applets:

- Avoid using static variables to share data between applets.
- Do not use the `getApplet` and `getApplets` methods of the [`AppletContext`](https://docs.oracle.com/javase/8/docs/api/java/applet/AppletContext.html) class to find other applets. These methods only find applets that are running in the same instance of the Java Runtime Environment software.

Applets must originate from the same directory on the server in order to communicate with each other.

The Sender and Receiver applets are shown next. When a user clicks the button to increment the counter, the Sender applet invokes a JavaScript function to send a request to the Receiver applet. Upon receiving the request, the Receiver applet increments a counter variable and displays the value of the variable.

Sender Applet

Receiver Applet

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 6 update 10](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

To enable communication with another applet, obtain a reference to an instance of the `netscape.javascript.JSObject` class. Use this instance to invoke JavaScript functions. The [`Sender`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_SenderReceiver/src/Sender.java) applet uses an instance of the `netscape.javascript.JSObject` class to invoke a JavaScript function called `sendMsgToIncrementCounter`.

```
try {
    JSObject window = JSObject.getWindow(this);
    window.eval("sendMsgToIncrementCounter()");
} catch (JSException jse) {
    // ...
}
```

---

**Note:** To compile Java code that has a reference to classes in the `netscape.javascript` package, include `<your JDK path>/jre/lib/plugin.jar` in your classpath. At runtime, the Java Plug-in software automatically makes these classes available to applets.

---

Write the JavaScript function that will receive requests from one applet and invoke methods of another applet on the web page. The `sendMsgToIncrementCounter` JavaScript function invokes the Receiver applet's `incrementCounter` method.

```
<script>
    function sendMsgToIncrementCounter() {
        var myReceiver = document.getElementById("receiver");
        myReceiver.incrementCounter();
    } 
<script>
```

Note that the JavaScript code uses the name `receiver` to obtain a reference to the Receiver applet on the web page. This name should be the same as the value of the `id` attribute that is specified when you deploy the Receiver applet.

The [`Receiver`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_SenderReceiver/src/Receiver.java) applet's `incrementCounter` method is shown next.

```
public void incrementCounter() {
    ctr++;
    String text = " Current Value Of Counter: "
        + (new Integer(ctr)).toString();
    ctrLbl.setText(text);
}
```

Deploy the applets on the web page as shown in the following code snippet. You can view the Sender and Receiver applets and associated JavaScript code in [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_SenderReceiver/AppletPage.html).

```
<!-- Sender Applet -->
<script src="https://www.java.com/js/deployJava.js"></script>
<script> 
    var attributes = { code:'Sender.class',
        archive:'examples/dist/applet_SenderReceiver/applet_SenderReceiver.jar',
        width:300, height:50} ;
    var parameters = { permissions:'sandbox' };
    deployJava.runApplet(attributes, parameters, '1.6');
</script>

<!-- Receiver Applet -->
<script> 
    var attributes = { id:'receiver', code:'Receiver.class',
        archive:'examples/dist/applet_SenderReceiver/applet_SenderReceiver.jar',
        width:300, height:50} ;
    var parameters = { permissions:'sandbox' };
    deployJava.runApplet(attributes, parameters, '1.6');
</script>
```

[Download source code](https://docs.oracle.com/javase/tutorial/deployment/applet/examplesIndex.html#SenderReceiver) for the *Sender Receiver Applets* example to experiment further.
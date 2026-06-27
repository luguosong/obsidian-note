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

Developing Draggable Applets

[Communicating With Other Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/iac.html)

[Working With a Server-Side Application](https://docs.oracle.com/javase/tutorial/deployment/applet/server.html)

[Network Client Applet Example](https://docs.oracle.com/javase/tutorial/deployment/applet/clientExample.html)

[What Applets Can and Cannot Do](https://docs.oracle.com/javase/tutorial/deployment/applet/security.html)

[Solving Common Applet Problems](https://docs.oracle.com/javase/tutorial/deployment/applet/problemsindex.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/deployment/applet/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/stdout.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/applet/iac.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Developing Draggable Applets

A Java applet that is deployed by specifying the `draggable` parameter can be dragged outside of the browser and dynamically transformed into a Java Web Start application. The Java applet can be dragged by pressing the Alt key and the left mouse button and dragging the mouse. When the drag operation begins, the applet is removed from its parent container (`Applet` or `JApplet`) and placed in a new undecorated top-level window (`Frame` or `JFrame`). A small floating Close button is displayed next to the dragged applet. When the floating Close button is clicked, the applet is placed back in the browser. Java applets that can be dragged out of the browser shall henceforth be referred to as *draggable applets*.

You can customize the behavior of a draggable applet in the following ways:

- You can change the keystroke and mouse button sequence that is used to drag the applet outside of the browser.
- You can add a desktop shortcut that can be used to launch your application outside of the browser.
- You can define how the applet should be closed after it has been dragged outside of the browser.

The following sections describe how to implement and customize a draggable applet. The [`MenuChooserApplet`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_Draggable/src/MenuChooserApplet.java) class is used to demonstrate the development and deployment of draggable applets. Open [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_Draggable/AppletPage.html) in a browser to view the Menu Chooser applet on a new page.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 6 update 10](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

## Enabling the Capability to Drag an Applet

You can enable the capability to drag an applet by setting the `draggable` parameter to `true` when deploying the applet, as shown in the following code snippet:

```
<script src="https://www.java.com/js/deployJava.js"></script>
<script>
    var attributes = { code:'MenuChooserApplet', width:900, height:300 };
    var parameters = { jnlp_href: 'draggableapplet.jnlp', draggable: 'true' };
    deployJava.runApplet(attributes, parameters, '1.6');
</script>
```

## Changing the Keystroke and Mouse Button Sequence That Is Used to Drag an Applet

You can change the keystroke and mouse button sequence that is used to drag an applet by implementing the `isAppletDragStart` method. In the following code snippet, the applet can be dragged by pressing the left mouse button and dragging the mouse:

```
public boolean isAppletDragStart(MouseEvent e) {
       if(e.getID() == MouseEvent.MOUSE_DRAGGED) {
           return true;
       } else {
           return false;
       }
   }
```

## Enabling the Addition of a Desktop Shortcut When the Applet Is Disconnected From the Browser

If the user closes the browser window or navigates away from the page after dragging an applet outside of the page, the applet is said to be *disconnected* from the browser. You can create a desktop shortcut for the applet when the applet is disconnected from the browser. The desktop shortcut can be used to launch the application outside of the browser. To enable the creation of a desktop shortcut, add the `offline-allowed` and `shortcut` tags to the applet's Java Network Launch Protocol (JNLP) file.

```
<information>
    <!-- ... -->
    <offline-allowed />
    <shortcut online="false">
        <desktop />
    </shortcut>
</information>
```

---

**Note:** Depending on the setting for Shortcut Creation in the user's Java Control Panel, the user might be prompted for confirmation before the shortcut is created.

---

## Defining How the Applet Should Be Closed

You can define how your applet can be closed. For example, your Swing applet could have a `JButton` to close the applet instead of relying on the default floating Close button.

The Java Plug-in software gives the applet an instance of the `ActionListener` class. This instance of the `ActionListener` class, also referred to as the *close listener*, can be used to modify the default close behavior of the applet.

To define how the applet should be closed, implement the `setAppletCloseListener` and `appletRestored` methods in your applet.

In the following code snippet, the [`MenuChooserApplet`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_Draggable/src/MenuChooserApplet.java) class receives the close listener and passes it on to the instance of the [`MenuItemChooser`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_Draggable/src/MenuItemChooser.java) class:

```
MenuItemChooser display = null;
// ...
display = new MenuItemChooser();
// ...
public void setAppletCloseListener(ActionListener cl) {
    display.setCloseListener(cl);
}

public void appletRestored() {
    display.setCloseListener(null);
}
```

The `MenuItemChooser` class is responsible for controlling the applet's user interface. The `MenuItemChooser` class defines a `JButton` labeled "Close." The following code is executed when the user clicks this Close button:

```
private void close() {
    // invoke actionPerformed of closeListener received
    // from the Java Plug-in software.
    if (closeListener != null) {
        closeListener.actionPerformed(null);
    }
}
```

## Requesting and Customizing Applet Decoration

Beginning in the Java SE 7 release, when deploying an applet, you can specify that the window of dragged applet should be decorated with the default or customized window title.

To enable window decoration of a dragged applet, specify the `java_decorated_frame` parameter with a value of `"true"`. To enable a customized window title, specify the `java_applet_title` parameter also. The value of this parameter should be the text of the window title.

```
<script src="https://www.java.com/js/deployJava.js"></script>
<script>
    var attributes =
      { code:'SomeDraggableApplet', width:100, height:100 };
    var parameters =
      { jnlp_href: 'somedraggableapplet.jnlp', 
          java_decorated_frame: 'true',
          java_applet_title: 'A Custom Title'   
      };
    deployJava.runApplet(attributes, parameters, '1.7');
</script>
```

The `java_decorated_frame` and `java_applet_title` parameters can also be specified in the applet's JNLP file as shown in the following code snippet:

```
<applet-desc main-class="SayHello" name="main test" height="150" width="300">
    <param name="java_decorated_frame" value="true" />
    <param name="java_applet_title" value="" />
</applet-desc>
```

[Download source code](https://docs.oracle.com/javase/tutorial/deployment/applet/examplesIndex.html#DraggableApplet) for the *Draggable Applet* example to experiment further.
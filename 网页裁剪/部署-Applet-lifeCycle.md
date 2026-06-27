---
分类:
  - "网页裁剪"
标题: "Life Cycle of an Applet (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/lifeCycle.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Life Cycle of an Applet (The Java™ Tutorials >        
            Deployment > Java Applets)

Documentation

[[部署-Applet-getStarted|Getting Started With Applets]]

[[部署-Applet-subclass|Defining an Applet Subclass]]

[[部署-Applet-appletMethods|Methods for Milestones]]

Life Cycle of an Applet

[[部署-Applet-appletExecutionEnv|Applet's Execution Environment]]

[[部署-Applet-developingApplet|Developing an Applet]]

[[部署-Applet-deployingApplet|Deploying an Applet]]

[[部署-Applet-html|Deploying With the Applet Tag]]

[[部署-Applet-doingMoreWithApplets|Doing More With Applets]]

[[部署-Applet-data|Finding and Loading Data Files]]

[[部署-Applet-param|Defining and Using Applet Parameters]]

[[部署-Applet-showStatus|Displaying Short Status Strings]]

[[部署-Applet-browser|Displaying Documents in the Browser]]

[[部署-Applet-invokingJavaScriptFromApplet|Invoking JavaScript Code From an Applet]]

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

[[部署-Applet-appletMethods|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-appletExecutionEnv|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Life Cycle of an Applet

An applet can react to major events in the following ways:

- It can *initialize* itself.
- It can *start* running.
- It can *stop* running.
- It can perform a *final cleanup*, in preparation for being unloaded.

This section introduces a new applet, `Simple`, that uses all of these methods. Unlike Java applications, applets do *not* need to implement a `main` method.

Here is the `Simple` applet.

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

The following is the source code for the `Simple` applet. This applet displays a descriptive string whenever it encounters a major milestone in its life, such as when the user first visits the page the applet is on.

```java
import java.applet.Applet;
import java.awt.Graphics;

//No need to extend JApplet, since we don't add any components;
//we just paint.
public class Simple extends Applet {

    StringBuffer buffer;

    public void init() {
        buffer = new StringBuffer();
        addItem("initializing... ");
    }

    public void start() {
        addItem("starting... ");
    }

    public void stop() {
        addItem("stopping... ");
    }

    public void destroy() {
        addItem("preparing for unloading...");
    }

    private void addItem(String newWord) {
        System.out.println(newWord);
        buffer.append(newWord);
        repaint();
    }

    public void paint(Graphics g) {
    //Draw a Rectangle around the applet's display area.
        g.drawRect(0, 0, 
           getWidth() - 1,
           getHeight() - 1);

    //Draw the current string inside the rectangle.
        g.drawString(buffer.toString(), 5, 15);
    }
}
```

---

**Note:** In this example, the `Applet` class is extended, not the Swing `JApplet` class, as Swing components do not need to be added to this applet.

---

## Loading the Applet

As a result of the applet being loaded, you should see the text "initializing... starting...". When an applet is loaded, here's what happens:

- An instance of the applet's controlling class (an `Applet` subclass) is created.
- The applet initializes itself.
- The applet starts running.

## Leaving and Returning to the Applet's Page

When the user leaves the page, for example, to go to another page, the browser stops and destroys the applet. The state of the applet is not preserved. When the user returns to the page, the browser initializes and starts a new instance of the applet.

## Reloading the Applet

When you refresh or reload a browser page, the current instance of the applet is stopped and destroyed and a new instance is created.

## Quitting the Browser

When the user quits the browser, the applet has the opportunity to stop itself and perform a final cleanup before the browser exits.

[[部署-Applet-examplesIndex|Download source code]] for the *Simple Applet* example to experiment further.
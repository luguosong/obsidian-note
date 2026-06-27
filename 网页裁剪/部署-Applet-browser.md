---
分类:
  - "网页裁剪"
标题: "Displaying Documents in the Browser (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/browser.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Displaying Documents in the Browser (The Java™ Tutorials >        
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

Displaying Documents in the Browser

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

[[部署-Applet-showStatus|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-invokingJavaScriptFromApplet|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Displaying Documents in the Browser

A Java applet can load a web page in a browser window using the `showDocument` methods in the [`java.applet.AppletContext`](https://docs.oracle.com/javase/8/docs/api/java/applet/AppletContext.html) class.

Here are the two forms of `showDocument`:

```java
public void showDocument(java.net.URL url)
public void showDocument(java.net.URL url, String targetWindow)

The one-argument form of `showDocument` simply instructs the browser to display the document at the specified URL, without specifying the window in which to display the document.

The two-argument form of `showDocument` lets you specify the window or HTML frame in which to display the document. The second argument can have one of the following values:

- `"_blank"` – Display the document in a new, nameless window.
- `"*windowName*"` – Displays the document in a window named *windowName*. This window is created if necessary.
- `"_self"` – Display the document in the window and frame that contain the applet.
- `"_parent"` – Display the document in parent frame of the applet's frame. If the applet frame has no parent frame, this acts the same as `"_self"`.
- `"_top"` – Display the document in the top-level frame. If the applet's frame is the top-level frame, this acts the same as `"_self"`.

---

**Note:** In this discussion, *frame* refers not to a Swing `JFrame`, but to an HTML frame within a browser window.

---

The following applet enables you try every argument of both forms of `showDocument`. The applet opens a window that lets you type in a URL and choose an option for the `targetWindow` argument. When you press Return or click the Show document button, the applet calls `showDocument`.

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

Following is the applet code that calls `showDocument`. Here is the whole program, [`ShowDocument`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_ShowDocument/src/ShowDocument.java).

...//In an Applet subclass:
        urlWindow = new URLWindow(getAppletContext());
        . . .

class URLWindow extends Frame {
    ...
    public URLWindow(AppletContext appletContext) {
        ...
        this.appletContext = appletContext;
        ...
    }
    ...
    public boolean action(Event event, Object o) {
        ...
            String urlString =
                /* user-entered string */;
            URL url = null;
            try {
                url = new URL(urlString);
            } catch (MalformedURLException e) {
                ...//Inform the user and return...
            }

            if (url != null) {
                if (/* user doesn't want to specify
                           the window */) {
                    appletContext.showDocument(url);
                } else {
                    appletContext.showDocument(url,
                        /* user-specified window */);
                }
            }
        ...
```

[[部署-Applet-examplesIndex|Download source code]] for the *Show Document* example to experiment further.
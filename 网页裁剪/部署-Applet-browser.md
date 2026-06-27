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

Displaying Documents in the Browser

[Invoking JavaScript Code From an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingJavaScriptFromApplet.html)

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

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/showStatus.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingJavaScriptFromApplet.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Displaying Documents in the Browser

A Java applet can load a web page in a browser window using the `showDocument` methods in the [`java.applet.AppletContext`](https://docs.oracle.com/javase/8/docs/api/java/applet/AppletContext.html) class.

Here are the two forms of `showDocument`:

```
public void showDocument(java.net.URL url)
public void showDocument(java.net.URL url, String targetWindow)
```

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

```
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

[Download source code](https://docs.oracle.com/javase/tutorial/deployment/applet/examplesIndex.html#ShowDocument) for the *Show Document* example to experiment further.
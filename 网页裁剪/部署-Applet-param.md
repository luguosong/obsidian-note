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

Defining and Using Applet Parameters

[Displaying Short Status Strings](https://docs.oracle.com/javase/tutorial/deployment/applet/showStatus.html)

[Displaying Documents in the Browser](https://docs.oracle.com/javase/tutorial/deployment/applet/browser.html)

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

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/data.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/applet/showStatus.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Defining and Using Applet Parameters

Parameters are to Java applets what command-line arguments are to applications. They enable the user to customize the applet's operation. By defining parameters, you can increase your applet's flexibility, making your applet work in multiple situations without recoding and recompiling it.

## Specifying an Applet's Input Parameters

You can specify an applet's input parameters in the applet's Java Network Launch Protocol (JNLP) file or in the `<parameter>` element of the `<applet>` tag. It is usually better to specify the parameters in the applet's JNLP file so that the parameters can be supplied consistently even if the applet is deployed on multiple web pages. If the applet's parameters will vary by web page, then you should specify the parameters in the `<parameter>` element of the `<applet>` tag.

If you are unfamiliar with JNLP, see the [Java Network Launch Protocol](https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/jnlp.html) topic for more information.

Consider an applet that takes three parameters. The `paramStr` and `paramInt` parameters are specified in the applet's JNLP file, [`` `applettakesparams.jnlp` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_AppletWithParameters/src/applettakesparams.jnlp).

```
<?xml version="1.0" encoding="UTF-8"?>
<jnlp spec="1.0+" codebase="" href="">
    <!-- ... -->
    <applet-desc
         name="Applet Takes Params"
         main-class="AppletTakesParams"
         width="800"
         height="50">
             <param name="paramStr"
                 value="someString"/>
             <param name="paramInt" value="22"/>
     </applet-desc>
     <!-- ... -->
</jnlp>
```

The `paramOutsideJNLPFile` parameter is specified in the `parameters` variable passed to the Deployment Toolkit script's `runApplet` function in [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_AppletWithParameters/AppletPage.html).

```
<html>
  <head>
    <title>Applet Takes Params</title>
    <meta http-equiv="Content-Type" content="text/html;
        charset=windows-1252">
  </head>
  <body>
    <h1>Applet Takes Params</h1>

    <script
      src="https://www.java.com/js/deployJava.js"></script>
    <script>
        var attributes = { code:'AppletTakesParams.class',
            archive:'applet_AppletWithParameters.jar',
            width:800, height:50 };
        var parameters = {jnlp_href: 'applettakesparams.jnlp',
            paramOutsideJNLPFile: 'fooOutsideJNLP' };
        deployJava.runApplet(attributes, parameters, '1.7');
    </script>

  </body>
</html>
```

See [Deploying an Applet](https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/runAppletFunction.html) for more information about the `runApplet` function.

## Retrieving the Applet's Input Parameters

You can retrieve the applet's input parameters by using the [`getParameter`](https://docs.oracle.com/javase/8/docs/api/java/applet/Applet.html#getParameter-java.lang.String-) method of the `Applet` class. The [`` `AppletTakesParams.java` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_AppletWithParameters/src/AppletTakesParams.java) applet retrieves and displays all its input parameters (`paramStr`, `paramInt`, and `paramOutsideJNLPFile`).

```
import javax.swing.JApplet;
import javax.swing.SwingUtilities;
import javax.swing.JLabel;

public class AppletTakesParams extends JApplet {
    public void init() {
        final String  inputStr = getParameter("paramStr");        
        final int inputInt = Integer.parseInt(getParameter("paramInt"));
        final String inputOutsideJNLPFile = getParameter("paramOutsideJNLPFile");

        try {
            SwingUtilities.invokeAndWait(new Runnable() {
                public void run() {
                    createGUI(inputStr, inputInt, inputOutsideJNLPFile);
                }
            });
        } catch (Exception e) {
            System.err.println("createGUI didn't successfully complete");
        }
    }
    private void createGUI(String inputStr, int inputInt, String inputOutsideJNLPFile) {
        String text = "Applet's parameters are -- inputStr: " + inputStr +
                ",   inputInt: " + inputInt +
                ",   paramOutsideJNLPFile: " + inputOutsideJNLPFile;
        JLabel lbl = new JLabel(text);
        add(lbl);
    }
}
```

The `AppletTakesParams` applet is shown next.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 6 update 10](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

[Download source code](https://docs.oracle.com/javase/tutorial/deployment/applet/examplesIndex.html#AppletWithParameters) for the *Applet With Parameters* example to experiment further.
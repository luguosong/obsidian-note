---
分类:
  - "网页裁剪"
标题: "Defining and Using Applet Parameters (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/param.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Defining and Using Applet Parameters (The Java™ Tutorials >        
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

Defining and Using Applet Parameters

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

[[部署-Applet-data|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-showStatus|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Defining and Using Applet Parameters

Parameters are to Java applets what command-line arguments are to applications. They enable the user to customize the applet's operation. By defining parameters, you can increase your applet's flexibility, making your applet work in multiple situations without recoding and recompiling it.

## Specifying an Applet's Input Parameters

You can specify an applet's input parameters in the applet's Java Network Launch Protocol (JNLP) file or in the `<parameter>` element of the `<applet>` tag. It is usually better to specify the parameters in the applet's JNLP file so that the parameters can be supplied consistently even if the applet is deployed on multiple web pages. If the applet's parameters will vary by web page, then you should specify the parameters in the `<parameter>` element of the `<applet>` tag.

If you are unfamiliar with JNLP, see the [[部署-jnlp|Java Network Launch Protocol]] topic for more information.

Consider an applet that takes three parameters. The `paramStr` and `paramInt` parameters are specified in the applet's JNLP file, [`` `applettakesparams.jnlp` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_AppletWithParameters/src/applettakesparams.jnlp).

```xml
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
```javascript

The `paramOutsideJNLPFile` parameter is specified in the `parameters` variable passed to the Deployment Toolkit script's `runApplet` function in [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_AppletWithParameters/AppletPage.html).

```html
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

See [[部署-runAppletFunction|Deploying an Applet]] for more information about the `runApplet` function.

## Retrieving the Applet's Input Parameters

You can retrieve the applet's input parameters by using the [`getParameter`](https://docs.oracle.com/javase/8/docs/api/java/applet/Applet.html#getParameter-java.lang.String-) method of the `Applet` class. The [`` `AppletTakesParams.java` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_AppletWithParameters/src/AppletTakesParams.java) applet retrieves and displays all its input parameters (`paramStr`, `paramInt`, and `paramOutsideJNLPFile`).

```java
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

[[部署-Applet-examplesIndex|Download source code]] for the *Applet With Parameters* example to experiment further.
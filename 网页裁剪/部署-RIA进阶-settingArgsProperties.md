---
分类:
  - "网页裁剪"
标题: "Setting Trusted Arguments and Secure Properties (The Java™ Tutorials >        
            Deployment > Doing More With Java Rich Internet Applications)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/settingArgsProperties.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

Setting Trusted Arguments and Secure Properties

[[部署-RIA进阶-properties|System Properties]]

[[部署-RIA进阶-jnlpAPI|JNLP API]]

[[部署-RIA进阶-usingJNLPAPI|Accessing the Client Using JNLP API]]

[[部署-RIA进阶-cookies|Cookies]]

[[部署-RIA进阶-accessingCookies|Accessing Cookies]]

[[部署-RIA进阶-security|Security in Rich Internet Applications]]

[[部署-RIA进阶-devGuidelines|Guidelines for Securing Rich Internet Applications]]

[[部署-RIA进阶-questions|Questions and Exercises]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Setting Trusted Arguments and Secure Properties

You can set certain Java Virtual Machine arguments and secure properties for your rich Internet application (RIA) in the RIA's Java Network Launch Protocol (JNLP) file. For applets, you can also set arguments in the `java_arguments` parameter of the `<applet>` tag. Although there is a predefined set of secure properties, you can also define new secure properties by prefixing the property name with " `jnlp.`" or " `javaws.`". Properties can be retrieved in your RIA by using the `System.getProperty` method.

Consider the Properties and Arguments Demo applet. The following Java Virtual Machine arguments and properties are set in the applet's JNLP file, [`appletpropsargs.jnlp`](https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/examples/applet_PropertiesAndVMArgs/src/appletpropsargs.jnlp).

- `-Xmx` – A secure argument set equal to "256M"
- `sun.java2d.noddraw` – A predefined secure property set equal to "true"
- `jnlp.myProperty` – A user-defined secure property set equal to "a user-defined property"

```
<?xml version="1.0" encoding="UTF-8"?>
<jnlp spec="1.0+" codebase="" href="">
    <information>
        <title>Properties and Arguments Demo Applet</title>
        <vendor>Dynamic Team</vendor>
    </information>
    <resources>
        <!-- Application Resources -->
        <j2se version="1.6+"
              href="http://java.sun.com/products/autodl/j2se"
              <!-- secure java vm argument -->
              java-vm-args="-Xmx256M"/>
        <jar href="applet_PropertiesAndVMArgs.jar"
            main="true" />
            <!-- secure properties -->
        <property name="sun.java2d.noddraw"
            value="true"/>
        <property name="jnlp.myProperty"
            value="a user-defined property"/>
    </resources>
    <applet-desc 
         name="Properties and Arguments Demo Applet"
         main-class="PropertiesArgsDemoApplet"
         width="800"
         height="50">             
     </applet-desc>
     <update check="background"/>
</jnlp>
```

The [`PropertiesArgsDemoApplet`](https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/examples/applet_PropertiesAndVMArgs/src/PropertiesArgsDemoApplet.java) class uses the `System.getProperty` method to retrieve the `java.version` property and other properties that are set in the JNLP file. The `PropertiesArgsDemoApplet` class also displays the properties.

```
import javax.swing.JApplet;
import javax.swing.SwingUtilities;
import javax.swing.JLabel;

public class PropertiesArgsDemoApplet extends JApplet {
    public void init() {
        final String javaVersion = System.getProperty("java.version");
        final String  swing2dNoDrawProperty = System.getProperty("sun.java2d.noddraw");
        final String  jnlpMyProperty = System.getProperty("jnlp.myProperty");        

        try {
            SwingUtilities.invokeAndWait(new Runnable() {
                public void run() {
                    createGUI(javaVersion, swing2dNoDrawProperty, jnlpMyProperty);
                }
            });
        } catch (Exception e) {
            System.err.println("createGUI didn't successfully complete");
        }
    }
    private void createGUI(String javaVersion, String swing2dNoDrawProperty, String jnlpMyProperty) {
        String text = "Properties: java.version = " + javaVersion + 
                ",  sun.java2d.noddraw = " + swing2dNoDrawProperty +
                ",   jnlp.myProperty = " + jnlpMyProperty;
        JLabel lbl = new JLabel(text);
        add(lbl);
    }
}
```

The Properties and Arguments Demo applet is shown next. You can also see the applet running in [`AppletPage.html`](https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/examples/dist/applet_PropertiesAndVMArgs/AppletPage.html).

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 6 update 10](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

[[部署-RIA进阶-examplesIndex|Download source code]] for the *Properties and Arguments Demo Applet* example to experiment further.

See [[部署-RIA进阶-properties|System Properties]] for a complete set of system properties that can be accessed by RIAs.
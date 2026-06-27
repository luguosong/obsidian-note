---
分类:
  - "网页裁剪"
标题: "Invoking Applet Methods From JavaScript Code (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/invokingAppletMethodsFromJavaScript.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Invoking Applet Methods From JavaScript Code (The Java™ Tutorials >        
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

[[部署-Applet-invokingJavaScriptFromApplet|Invoking JavaScript Code From an Applet]]

Invoking Applet Methods From JavaScript Code

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

[[部署-Applet-invokingJavaScriptFromApplet|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-appletStatus|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Invoking Applet Methods From JavaScript Code

JavaScript code on a web page can interact with Java applets embedded on the page. JavaScript code can perform operations such as the following:

- Invoke methods on Java objects
- Get and set fields in Java objects
- Get and set Java array elements

The [LiveConnect Specification](http://www.oracle.com/technetwork/java/javase/plugin2-142482.html#LIVECONNECT) describes details about how JavaScript code communicates with Java code.

Security warnings are shown when JavaScript code makes calls to a Java applet. To suppress these warnings, add the `Caller-Allowable-Codebase` attribute to the JAR file manifest. Specify the location of the JavaScript code that is allowed to make calls to the applet. See [JAR File Manifest Attributes for Security](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/manifest.html) for information about the `Caller-Allowable-Codebase` attribute.

This topic explores JavaScript code to Java applet communication using the Math applet example. The `MathApplet` class and supporting `Calculator` class provide a set of public methods and variables. The JavaScript code on the web page invokes and evaluates these public members to pass data and retrieve calculated results.

## Math Applet and Related Classes

Here is the source code for the [`` `MathApplet` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_InvokingAppletMethodsFromJavaScript/src/jstojava/MathApplet.java) class. The `getCalculator` method returns a reference to the `Calculator` helper class.

```java
package jstojava;
import java.applet.Applet;

public class MathApplet extends Applet{

    public String userName = null;
         
    public String getGreeting() {
        return "Hello " + userName;
    }
    
    public Calculator getCalculator() {
        return new Calculator();
    } 
    
    public DateHelper getDateHelper() {
        return new DateHelper();
    }
    
    public void printOut(String text) {
        System.out.println(text);
    }
}
```java

The methods in the [`` `Calculator` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_InvokingAppletMethodsFromJavaScript/src/jstojava/Calculator.java) class let the user set two values, add numbers, and retrieve the numbers in a range.

```java
package jstojava;

public class Calculator {
    private int a = 0;
    private int b = 0; // assume b > a
    
    public void setNums(int numA, int numB) {
        a = numA;
        b = numB;
    }
    
    public int add() {
        return a + b;
    }
    
    public int [] getNumInRange() {    
        int x = a;
        int len = (b - a) + 1;
        int [] range = new int [len];
        for (int i = 0; i < len; i++) {
            range[i]= x++;
            System.out.println("i: " + i + " ; range[i]: " + range[i]);
        }
        return range;
    }
}
```

The `getDate` method of the [`` `DateHelper` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_InvokingAppletMethodsFromJavaScript/src/jstojava/DateHelper.java) class returns the current date.

```java
package jstojava;
import java.util.Date;
import java.text.SimpleDateFormat;

public class DateHelper {
    
    public static String label = null;
        
    public String getDate() {
        return label + " " + new SimpleDateFormat().format(new Date());
    }

}
```javascript

## Deploying the Applet

Deploy the applet in a web page, [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_InvokingAppletMethodsFromJavaScript/AppletPage.html) When deploying the applet, make sure that you specify an id for the applet. The applet id is used later to obtain a reference to the applet object.

```xml
<script src=
  "https://www.java.com/js/deployJava.js"></script>
<script>
    <!-- applet id can be used to get a reference to
    the applet object -->
    var attributes = { id:'mathApplet',
        code:'jstojava.MathApplet',  width:1, height:1} ;
    var parameters = { jnlp_href: 'math_applet.jnlp'} ;
    deployJava.runApplet(attributes, parameters, '1.6');
</script>
```

Next, add some JavaScript code to the [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_InvokingAppletMethodsFromJavaScript/AppletPage.html) web page. The JavaScript code can use the applet id as a reference to the applet object and invoke the applet's methods. In the example shown next, the JavaScript code sets the applet's public member variables, invokes public methods, and retrieves a reference to another object referenced by the applet (`Calculator`). The JavaScript code is able to handle primitive, array, and object return types.

```xml
<script language="javascript">
    function enterNums(){
        var numA = prompt('Enter number \'a\'?','0');
        var numB = prompt(
            'Enter number \'b\' (should be greater than number \'a\' ?','1');
        // set applet's public variable
        mathApplet.userName = "John Doe";

        // invoke public applet method
        var greeting = mathApplet.getGreeting();

        // get another class referenced by applet and
        // invoke its methods
        var calculator = mathApplet.getCalculator();
        calculator.setNums(numA, numB);

        // primitive datatype returned by applet
        var sum = calculator.add();

        // array returned by applet
        var numRange = calculator.getNumInRange();

        // check Java console log for this message
        mathApplet.printOut("Testing printing to System.out");

        // get another class, set static field and invoke its methods
        var dateHelper = mathApplet.getDateHelper();
        dateHelper.label = "Today\'s date is: ";
        var dateStr = dateHelper.getDate();
        <!-- ... -->
</script>
```text

The Math applet displays the following results on the web page when the number a = 0 and b = 5:

```text
Results of JavaScript to Java Communication

Hello John Doe

a = 0 ; b = 5

Sum: 5

Numbers in range array: [ 0, 1, 2, 3, 4, 5 ]

Today's date is: 5/28/13 4:12 PM //shows current date
```

Open [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_InvokingAppletMethodsFromJavaScript/AppletPage.html) in a browser to view the Math applet.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 6 update 10](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

Check [[部署-Applet-安全|security restrictions]] placed on applets invoked by JavaScript code.

[[部署-Applet-examplesIndex|Download source code]] for the *Invoking Applet Methods From JavaScript Code* example to experiment further.
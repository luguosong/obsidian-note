---
分类:
  - "网页裁剪"
标题: "Ensuring the Presence of the JRE Software (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/ensuringJRE.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Ensuring the Presence of the JRE Software (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)

Documentation

[[部署-avoidingUnnecessaryUpdateChecks|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/QandE/questions.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Ensuring the Presence of the JRE Software

Rich Internet applications (RIAs) usually need a minimum version of the Java Runtime Environment (JRE) software to be present on the client machine. When deploying a RIA, you need to ensure that client machines have the required version of the JRE software so that your RIA can function well. With the Deployment Toolkit script, you have at least two ways to handle this requirement.

- You can check the version of client JRE software as soon as users access your web site and install the latest version if necessary.
- You can let users navigate the web site, and check and install the latest JRE only when they attempt to use your RIA.

## Checking and Installing the Latest JRE Software When the User Accesses Your Web Site

The following example checks if a user has at least version 1.6.0\_13 of the JRE software installed. If not, the code installs the latest JRE software. See inline comments in the code.

```xml
<script src="https://www.java.com/js/deployJava.js"></script>
<script>
    
    // check if current JRE version is greater than 1.6.0 
    alert("versioncheck " + deployJava.versionCheck('1.6.0_10+'));
    if (deployJava.versionCheck('1.6.0_10+') == false) {                   
        userInput = confirm(
            "You need the latest Java(TM) Runtime Environment. " +
            "Would you like to update now?");        
        if (userInput == true) {  
    
            // Set deployJava.returnPage to make sure user comes back to 
            // your web site after installing the JRE
            deployJava.returnPage = location.href;
            
            // Install latest JRE or redirect user to another page to get JRE
            deployJava.installLatestJRE(); 
        }
    }
</script>
```javascript

## Installing the Correct JRE Software Only When the User Attempts to Use Your RIA

When you specify the minimum version of the JRE software in the `runApplet` or `createWebStartLaunchButton` function, the Deployment Toolkit script makes sure that the required version of the JRE software exists on the client before running your RIA.

Use the `runApplet` function to deploy an applet, as shown in the following example. The last parameter of the `runApplet` function is the minimum version that is required to run your applet (version 1.6).

```xml
<script src="https://www.java.com/js/deployJava.js"></script>
<script>
    var attributes = { code:'components.DynamicTreeApplet',
        width:300, height:300};
    var parameters = {jnlp_href: 'dynamictree_applet.jnlp'};
    deployJava.runApplet(attributes, parameters, '1.6');
</script>
```

To deploy a Java Web Start application, use the `createWebStartLaunchButton` function with the correct minimum version parameter (version 1.6).

```xml
<script src="https://www.java.com/js/deployJava.js"></script>
<script>
    var url = "dynamictree_applet.jnlp";
    deployJava.createWebStartLaunchButton(url, '1.6.0');
</script>
```

The `runApplet` and `createWebStartLaunchButton` functions check the client's version of the JRE software. If the minimum version is not installed, the functions install the latest version of the JRE software.
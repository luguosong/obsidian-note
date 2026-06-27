---
分类:
  - "网页裁剪"
标题: "Checking the Client JRE Software Version (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/jreVersionCheck.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-deployingWithoutCodebase|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-jnlp|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Checking the Client JRE Software Version

There are many reasons to check if a particular version of the Java Runtime Environment (JRE) software is available on a client machine. For example, you might want to launch a different version of your rich Internet application (RIA) or redirect the user to a different page depending on the client's JRE software version.

Use the Deployment Toolkit script's `versionCheck` function to check if a particular version or range of JRE versions is installed on the client.

**Function signature:** `versionCheck: function(versionPattern)`

Parameters:

- `versionPattern` – String specifying the version or range of versions to check for, such as such as "1.4", "1.5.0\*" (1.5.x family), and "1.6.0\_02+" (any version greater than or equal to 1.6.0\_02).

**Usage:** Creating a different user experience depending on the client's JRE software version

In this example, a Launch button is created for the Notepad application only if the version of JRE software on the client is greater than or equal to 1.6. If not, the browser is redirected to `oracle.com`.

```
<script src="https://www.java.com/js/deployJava.js"></script>
<script>
    if (deployJava.versionCheck('1.6+')) {            
        var url = "https://docs.oracle.com/javase/tutorialJWS/deployment/webstart/examples/Notepad.jnlp";
        
        <!-- you can also invoke deployJava.runApplet here -->
        deployJava.createWebStartLaunchButton(url, '1.6.0'); 
    } else {
        document.location.href="http://oracle.com";
    }
</script>
```

---

**Note:** Depending on the client's operating system and version of the Java platform, you might be able to verify version information for JRE software at the major version level (for example, 1.6) or at a finer update level (for example, 1.6.0\_10).

---
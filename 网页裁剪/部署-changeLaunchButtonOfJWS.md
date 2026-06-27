---
分类:
  - "网页裁剪"
标题: "Changing the Launch Button (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/changeLaunchButtonOfJWS.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-createWebStartLaunchButtonFunction|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-deployingWithoutCodebase|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Changing the Launch Button

You can change your Java Web Start application's Launch button image, if you don't like the default ![Launch button](https://docs.oracle.com/javase/tutorial/images/jws-launch-button.png) button or if you have another image that you have standardized on.

Use the `deployJava.launchButtonPNG` variable to point to the location of your Launch button's image.

**Variable:** `deployJava.launchButtonPNG`

**Usage:** Providing an alternate image URL

In this example, the Notepad application's Launch button is now an image of Duke waving.

```
<script src="https://www.java.com/js/deployJava.js"></script>
<script>
    deployJava.launchButtonPNG='https://docs.oracle.com/javase/tutorial/images/DukeWave.gif';
    var url = "https://docs.oracle.com/javase/tutorialJWS/samples/deployment/NotepadJWSProject/Notepad.jnlp";
    deployJava.createWebStartLaunchButton(url, '1.6.0');
</script>
```

The Notepad application's new Launch button (Duke waving) follows. Click on Duke's image to launch the Notepad application.

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---
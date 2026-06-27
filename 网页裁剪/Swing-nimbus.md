---
分类:
  - "网页裁剪"
标题: "Nimbus Look and Feel (The Java™ Tutorials >        
            Creating a GUI With Swing > Modifying the Look and Feel)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/nimbus.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-plaf|How to Set the Look and Feel]]

[[Swing-synth|The Synth Look and Feel]]

[[Swing-synthExample|A Synth Example]]

Nimbus Look and Feel

[[Swing-custom|Changing the Look of Nimbus]]

[[Swing-size|Resizing a Component]]

[[Swing-color|Changing the Color Theme]]

[[Swing-synthExample|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-custom|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Nimbus Look and Feel

Nimbus is a polished cross-platform look and feel introduced in the Java SE 6 Update 10 (6u10) release. The following screen capture, from SwingSet3 shows the Nimbus look and feel.

![SwingSet3 Screen capture Using Nimbus Look and Feel](https://docs.oracle.com/javase/tutorial/figures/uiswing/lookandfeel/nimbus.png)

Nimbus uses Java 2D vector graphics to draw the user interface (UI), rather than static bitmaps, so the UI can be crisply rendered at any resolution.

Nimbus is highly customizable. You can use the Nimbus look and feel as is, or you can *skin* (customize) the look with your own brand.

## Enabling the Nimbus Look and Feel

For backwards compatibility, Metal is still the default Swing look and feel, but you can change to Nimbus in one of three ways:

- Add the following code to the event-dispatching thread before creating the graphical user interface (GUI):
	```
	import javax.swing.UIManager.*;
	try {
	    for (LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
	        if ("Nimbus".equals(info.getName())) {
	            UIManager.setLookAndFeel(info.getClassName());
	            break;
	        }
	    }
	} catch (Exception e) {
	    // If Nimbus is not available, you can set the GUI to another look and feel.
	}
	```
	The first line of code retrieves the list of all installed look and feel implementations for the platform and then iterates through the list to determine if Nimbus is available. If so, Nimbus is set as the look and feel.
	---
	**Version Note:** Do not set the Nimbus look and feel explicitly by invoking the `UIManager.setLookAndFeel` method because not all versions or implementations of Java SE 6 support Nimbus. Additionally, the location of the Nimbus package changed between the JDK 6 Update 10 and JDK 7 releases. Iterating through all installed look and feel implementations is a more robust approach because if Nimbus is not available, the default look and feel is used. For the JDK 6 Update 10 release, the Nimbus package is located at `com.sun.java.swing.plaf.nimbus.NimbusLookAndFeel`.
	---
- Specify Nimbus as the default look and feel for a particular application at the command line, as follows:
	```
	java -Dswing.defaultlaf=javax.swing.plaf.nimbus.NimbusLookAndFeel MyApp
	```
- Permanently set the default look and feel to Nimbus by adding the following line to the `<*JAVA_HOME*>/lib/swing.properties` file:
	```
	swing.defaultlaf=javax.swing.plaf.nimbus.NimbusLookAndFeel
	```
	If the `swing.properties` file does not yet exist, you need to create it.
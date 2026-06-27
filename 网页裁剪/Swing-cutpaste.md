---
分类:
  - "网页裁剪"
标题: "Adding Cut, Copy and Paste (CCP) (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/cutpaste.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Adding Cut, Copy and Paste (CCP) (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)

Documentation

[[Swing-intro|Introduction to DnD]]

[[Swing-defaultsupport|Default DnD Support]]

[[Swing-basicdemo|Demo - BasicDnD]]

[[Swing-transferhandler|TransferHandler Class]]

[[Swing-export|Export Methods]]

[[Swing-import|Import Methods]]

[[Swing-transfersupport|TransferSupport Class]]

[[Swing-dropmodes|Setting the Drop Mode]]

[[Swing-dropmodedemo|Demo - DropDemo]]

[[Swing-dropaction|Choosing the Drop Action]]

[[Swing-dropactiondemo|Demo - ChooseDropAction]]

[[Swing-showdroploc|Showing the Drop Location]]

[[Swing-locsensitivedrop|Location Sensitive Drop]]

[[Swing-locsensitivedemo|Demo - LocationSensitiveDemo]]

[[Swing-emptytable|Empty Table Drop]]

[[Swing-droplocation|Drop Location Rendering]]

[[Swing-toplevel|Top-Level Drop]]

Adding Cut, Copy and Paste (CCP)

[[Swing-textpaste|CCP in a Text Component]]

[[Swing-listpaste|CCP in a non-Text Component]]

[[Swing-dataflavor|Using and Creating a DataFlavor]]

[[Swing-together|Putting it All Together - DnD and CCP]]

[[Swing-拖放问题|Solving Common Data Transfer Problems]]

[[Swing-toplevel|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-textpaste|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Adding Cut, Copy and Paste (CCP)

So far our discussion has centered mostly around drag and drop support. However, it is an easy matter to hook up cut or copy or paste (ccp) to a transfer handler. This requires the following steps:

- Ensure a transfer handler is installed on the component.
- Create a manner by which the `TransferHandler` 's ccp support can be invoked. Typically this involves adding bindings to the input and action maps to have the `TransferHandler` 's ccp actions invoked in response to particular keystrokes.
- Create ccp menu items and/or buttons. (This step is optional but recommended.) This is easy to do with text components but requires a bit more work with other components, since you need logic to determine which component to fire the action on. See [[Swing-listpaste|CCP in a non-Text Component]] for more information.
- Decide where you want to perform the paste. Perhaps above or below the current selection. Install the logic in the `importData` method.

Next we look at a cut and paste example that feature a text component.
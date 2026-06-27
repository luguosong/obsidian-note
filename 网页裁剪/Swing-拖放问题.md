---
分类:
  - "网页裁剪"
标题: "拖放问题与练习"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/problems.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---
# 拖放问题与练习

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

[[Swing-cutpaste|Adding Cut, Copy and Paste (CCP)]]

[[Swing-textpaste|CCP in a Text Component]]

[[Swing-listpaste|CCP in a non-Text Component]]

[[Swing-dataflavor|Using and Creating a DataFlavor]]

[[Swing-together|Putting it All Together - DnD and CCP]]

Solving Common Data Transfer Problems

[[Swing-together|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Solving Common Data Transfer Problems

This section discusses problems that you might encounter when using data transfer.

**Problem:** My drag gesture recognizer is not working properly with table/list/tree/text.

Do not use your own drag gesture recognizers with these components. Use `setDragEnabled(true)` and a `TransferHandler`.

**Problem:** I am unable to drop data onto my empty `JTable`.

You need to call `setFillsViewportHeight(true)` on the table. See [[Swing-emptytable|Empty Table Drop]] for more information.
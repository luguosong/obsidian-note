---
分类:
  - "网页裁剪"
标题: "Swing-emptytable"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/emptytable.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

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

Empty Table Drop

[[Swing-droplocation|Drop Location Rendering]]

[[Swing-toplevel|Top-Level Drop]]

[[Swing-cutpaste|Adding Cut, Copy and Paste (CCP)]]

[[Swing-textpaste|CCP in a Text Component]]

[[Swing-listpaste|CCP in a non-Text Component]]

[[Swing-dataflavor|Using and Creating a DataFlavor]]

[[Swing-together|Putting it All Together - DnD and CCP]]

[[Swing-拖放问题|Solving Common Data Transfer Problems]]

[[Swing-locsensitivedemo|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-droplocation|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Empty Table Drop

Dragging and dropping into an empty table presents a unique challenge. When adhering to the proper steps:

- Creating the empty table.
- Creating and attaching a `TransferHandler`.
- Enabling data transfer by calling `setDragEnabled(true)`.
- Creating a scroll pane and adding the table to the scroll pane.

You run the application and try to drag valid data into the table but it rejects the drop. What gives?

The reason is that the empty table (unlike an empty list or an empty tree) does not occupy any space in the scroll pane. The `JTable` does not automatically stretch to fill the height of a `JScrollPane` 's viewport — it only takes up as much vertical room as needed for the rows that it contains. So, when you drag over the empty table, you are not actually over the table and the drop fails.

You can configure the table to allow drop anywhere in the view port by calling [`JTable.setFillsViewportHeight(boolean)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTable.html#setFillsViewportHeight-boolean-). The default for this property is false to ensure backwards compatibility.

The following example, `FillViewportHeightDemo`, allows you to experiment with dropping onto an empty table. The demo contains an empty table with five columns that has its drop mode set to insert rows and a drag source that provides five comma-delimited values that automatically increment.

![A snapshot of the FillViewportHeightDemo.](https://docs.oracle.com/javase/tutorial/figures/uiswing/dnd/FillViewportHeightDemo.png)

---

**Try this:**
1. Click the Launch button to run `FillViewportHeightDemo` using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/index.html#FillViewportHeightDemo).
2. Drag from the text field labeled "Drag from here" to the table.
3. Drop onto the table. The drop is rejected.
4. Double-click on the drag source. It deposits the current values (0, 0, 0, 0, 0) into the table and increments the values in the text field.
5. Once again, drag from the text field to the table. You can insert above or below the row, but not in the area underneath.
6. From the Options menu, choose "Fill Viewport Height" to enable the "fillsViewportHeight" property.
7. From the Options menu, choose "Reset" to empty the table.
8. Drag from the text component to the table. You can now drop anywhere on the view port and it inserts the data at row 0.

---

You can examine the source for [`` `FillViewportHeightDemo.java` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/FillViewportHeightDemoProject/src/dnd/FillViewportHeightDemo.java), but the primary point to remember is that you should generally invoke `setFillsViewportHeight(true)` on any table that will accept dropped data.
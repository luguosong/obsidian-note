---
分类:
  - "网页裁剪"
标题: "Demo - BasicDnD (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/basicdemo.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Demo - BasicDnD (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)

Documentation

[[Swing-intro|Introduction to DnD]]

[[Swing-defaultsupport|Default DnD Support]]

Demo - BasicDnD

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

[[Swing-拖放问题|Solving Common Data Transfer Problems]]

[[Swing-defaultsupport|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-transferhandler|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Demo - BasicDnD

Now we will look at a simple demo, called `BasicDnD`, that shows you what you get for free. As you see from the screen shot, BasicDnD contains a table, a list, a tree, a color chooser, a text area, and a text field.

All of these components are standard out-of-the-box components *except* for the list. This list has been customized to bring up a dialog showing where the drop would occur, if it accepted drops.

The following areas accept drops:

- Text field
- Text area
- The color chooser accepts drops of type color, but in order to try this, you need to run two copies of the demo (or another demo that contains a color chooser)

By default, none of the objects has default drag and drop enabled. At startup, you can check the "Turn on Drag and Drop" check box to see what drag and drop behavior you get for free.

[![Basic Drag and Drop behavior](https://docs.oracle.com/javase/tutorial/figures/uiswing/dnd/BasicDND.png)](https://docs.oracle.com/javase/tutorial/figures/uiswing/dnd/BasicDND.png)  
*This figure has been reduced to fit on the page.  
Click the image to view it at its natural size.*

---

**Try this:**
1. Click the Launch button to run BasicDnD using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/index.html#BasicDnD).
2. Select an item in the list and, while holding down the mouse button, begin to drag. Nothing happens because the drag has not yet been enabled on the list.
3. Select the "Turn on Drag and Drop" check box.
4. Press the selected item in the list and begin to drag. Drop the text back onto the list. A dialog shows where the text would appear if the list actually accepted drops. (The default behavior for a list would be to show a "does not accept data" cursor.)
5. Drag the selected text over a text area. The insertion point for the text is indicated by a blinking caret. Also, the cursor changes to indicate that the text area will accept the text as a copy.
6. Release the mouse and watch the text appear in the text area.
7. Select some text in one of the text areas.
8. Press the mouse button while the cursor is over the selected text and begin to drag.
9. Note that this time, the cursor for a drag action appears. Successfully dropping this text into another component will cause the text to be removed from the original component.
10. Hold the Control key down and press again on the selected text. Begin dragging and the copy cursor now appears. Move the cursor over the text area and drop. The text appears in the new location but is not removed from the original location. The Control key can be used to change any Move to a Copy.
11. Select a color from the color chooser. The selected color appears in the Preview panel. Press and hold the mouse button over the color in the Preview panel and drag it over the other components. Note that none of these components accepts color.
12. Try dropping text, color, and even files, onto the list. A dialog will report the attempted action. The actual drop can be implemented with an additional six lines of code that have been commented out in the [`BasicDnD.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/BasicDnDProject/src/dnd/BasicDnD.java) source file.

---

Next we will look at the `TransferHandler` class, the workhorse of the drag and drop mechanism.
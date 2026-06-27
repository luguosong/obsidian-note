---
分类:
  - "网页裁剪"
标题: "Default DnD Support (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/defaultsupport.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Default DnD Support (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)

Documentation

[[Swing-intro|Introduction to DnD]]

Default DnD Support

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

[[Swing-拖放问题|Solving Common Data Transfer Problems]]

[[Swing-intro|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-basicdemo|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Default DnD Support

Technically speaking, the framework for drag and drop supports all Swing components — the data transfer mechanism is built into every `JComponent`. If you wanted, you could implement drop support for a `JSlider` so that it could fully participate in data transfer. While `JSlider` does not support drop by default, the components you would want (and expect) to support drag and drop do provide specialized built-in support.

The following components recognize the drag gesture once the `setDragEnabled(true)` method is invoked on the component. For example, once you invoke `myColorChooser.setDragEnabled(true)` you can drag colors from your color chooser:

- `JColorChooser`
- `JEditorPane`
- `JFileChooser`
- `JFormattedTextField`
- `JList`
- `JTable`
- `JTextArea`
- `JTextField`
- `JTextPane`
- `JTree`

The following components support drop out of the box. If you are using one of these components, your work is done.

- `JEditorPane`
- `JFormattedTextField`
- `JPasswordField`
- `JTextArea`
- `JTextField`
- `JTextPane`
- `JColorChooser`

The framework for drop is in place for the following components, but you need to plug in a small amount of code to customize the support for your needs.

For these critical components, Swing performs the drop location calculations and rendering; it allows you to specify a drop mode; and it handles component specific details, such as tree expansions. Your work is fairly minimal.

---

**Note:**

You can also install drop support on top-level containers, such as `JFrame` and `JDialog`. You can learn more about this in [[Swing-toplevel|Top-Level Drop]].

---
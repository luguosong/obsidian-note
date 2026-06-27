---
分类:
  - "网页裁剪"
标题: "CCP in a Text Component (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/textpaste.html"
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

[[Swing-emptytable|Empty Table Drop]]

[[Swing-droplocation|Drop Location Rendering]]

[[Swing-toplevel|Top-Level Drop]]

[[Swing-cutpaste|Adding Cut, Copy and Paste (CCP)]]

CCP in a Text Component

[[Swing-listpaste|CCP in a non-Text Component]]

[[Swing-dataflavor|Using and Creating a DataFlavor]]

[[Swing-together|Putting it All Together - DnD and CCP]]

[[Swing-拖放问题|Solving Common Data Transfer Problems]]

[[Swing-cutpaste|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-listpaste|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## CCP in a Text Component

If you are implementing cut, copy and paste using one of the Swing text components (text field, password field, formatted text field, or text area) your work is very straightforward. These text components utilize the [`DefaultEditorKit`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.html) which provides built-in actions for cut, copy and paste. The default editor kit also handles the work of remembering which component last had the focus. This means that if the user initiates one of these actions using the menu or a keyboard equivalent, the correct component receives the action — no additional code is required.

The following demo, `TextCutPaste`, contains three text fields. As you can see in the screen shot, you can cut, copy, and paste to or from any of these text fields. They also support drag and drop.

![A snapshot of the TextCutPaste demo.](https://docs.oracle.com/javase/tutorial/figures/uiswing/dnd/TextCutPaste.png)

---

**Try this:**
1. Click the Launch button to run `TextCutPaste` using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/index.html#TextCutPaste).
2. Select text in one of the text fields. Use the Edit menu or the keyboard equivalent to cut or copy the text from the source.
3. Position the caret where you want the text to be pasted.
4. Paste the text using the menu or the keyboard equivalent.
5. Perform the same operation using drag and drop.

---

Here is the code that creates the Edit menu by hooking up the built-in cut, copy, and paste actions defined in `DefaultEditorKit` to the menu items. This works with any component that descends from `JComponent`:

```
/**
 * Create an Edit menu to support cut/copy/paste.
 */
public JMenuBar createMenuBar () {
    JMenuItem menuItem = null;
    JMenuBar menuBar = new JMenuBar();
    JMenu mainMenu = new JMenu("Edit");
    mainMenu.setMnemonic(KeyEvent.VK_E);

    menuItem = new JMenuItem(new DefaultEditorKit.CutAction());
    menuItem.setText("Cut");
    menuItem.setMnemonic(KeyEvent.VK_T);
    mainMenu.add(menuItem);

    menuItem = new JMenuItem(new DefaultEditorKit.CopyAction());
    menuItem.setText("Copy");
    menuItem.setMnemonic(KeyEvent.VK_C);
    mainMenu.add(menuItem);

    menuItem = new JMenuItem(new DefaultEditorKit.PasteAction());
    menuItem.setText("Paste");
    menuItem.setMnemonic(KeyEvent.VK_P);
    mainMenu.add(menuItem);

    menuBar.add(mainMenu);
    return menuBar;
}
```

Next we will look at how to accomplish the same functionality using a component that does not have the built-in support of the `DefaultEditorKit`.
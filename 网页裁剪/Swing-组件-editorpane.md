---
分类:
  - "网页裁剪"
标题: "How to Use Editor Panes and Text Panes (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/editorpane.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Editor Panes and Text Panes (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)

Documentation

[[Swing-组件-toplevel|Using Top-Level Containers]]

[[Swing-组件-jcomponent|The JComponent Class]]

[[Swing-组件-text|Using Text Components]]

[[Swing-组件-generaltext|Text Component Features]]

[[Swing-组件-textapi|The Text Component API]]

[[Swing-组件-componentlist|How to Use Various Components]]

[[Swing-组件-applet|How to Make Applets]]

[[Swing-按钮|How to Use Buttons, Check Boxes, and Radio Buttons]]

[[Swing-组件-buttongroup|How to Use the ButtonGroup Component]]

[[Swing-组件-colorchooser|How to Use Color Choosers]]

[[Swing-组件-combobox|How to Use Combo Boxes]]

[[Swing-组件-dialog|How to Make Dialogs]]

How to Use Editor Panes and Text Panes

[[Swing-组件-filechooser|How to Use File Choosers]]

[[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]]

[[Swing-组件-frame|How to Make Frames (Main Windows)]]

[[Swing-组件-internalframe|How to Use Internal Frames]]

[[Swing-组件-label|How to Use Labels]]

[[Swing-组件-layeredpane|How to Use Layered Panes]]

[[Swing-组件-list|How to Use Lists]]

[[Swing-组件-menu|How to Use Menus]]

[[Swing-组件-panel|How to Use Panels]]

[[Swing-组件-passwordfield|How to Use Password Fields]]

[[Swing-组件-progress|How to Use Progress Bars]]

[[Swing-组件-rootpane|How to Use Root Panes]]

[[Swing-组件-scrollpane|How to Use Scroll Panes]]

[[Swing-组件-separator|How to Use Separators]]

[[Swing-滑块|How to Use Sliders]]

[[Swing-组件-spinner|How to Use Spinners]]

[[Swing-组件-splitpane|How to Use Split Panes]]

[[Swing-组件-tabbedpane|How to Use Tabbed Panes]]

[[Swing-组件-table|How to Use Tables]]

[[Swing-组件-textarea|How to Use Text Areas]]

[[Swing-组件-textfield|How to Use Text Fields]]

[[Swing-组件-toolbar|How to Use Tool Bars]]

[[Swing-组件-tooltip|How to Use Tool Tips]]

[[Swing-组件-tree|How to Use Trees]]

[[Swing-组件-html|How to Use HTML in Swing Components]]

[[Swing-组件-model|How to Use Models]]

[[Swing-组件-icon|How to Use Icons]]

[[Swing-组件-border|How to Use Borders]]

[[Swing-组件-problems|Solving Common Component Problems]]

[[Swing-组件-dialog|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-filechooser|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Editor Panes and Text Panes

Two Swing classes support styled text: [`JEditorPane`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JEditorPane.html) and its subclass [`JTextPane`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextPane.html). The `JEditorPane` class is the foundation for Swing's styled text components and provides a mechanism through which you can add support for custom text formats. If you want unstyled text, use a [[Swing-组件-textarea|text area]] instead.

You can see an editor pane and a text pane in use by running TextSamplerDemo. Here is a picture of the `TextSamplerDemo` example.

![An application that provides a sample of each Swing text component](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/TextSamplerDemoMetal.png)

Click the Launch button to run TextSamplerDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextSamplerDemo).

The `TextSamplerDemo` example barely begins to demonstrate the capabilities of editor panes and text panes. However, the top right editor pane illustrates a handy, easy-to-use feature: it displays uneditable help information loaded from a URL. The text pane at the lower right demonstrates that you can easily embed images and even components directly into text panes.

---

**Note:**

If you need a fully-fledged help system, take a look at the [javahelp](https://javaee.github.io/javahelp/) project.

---

The Swing text API is powerful and immense, and we could devote an entire book just to using editor panes and text panes. This section introduces their capabilities, offers hints on which one you might want to use, and points to other sources of information.

## Using an Editor Pane to Display Text From a URL

One task that you can accomplish without knowing anything about the Swing text system is displaying text from a URL. Here is the code from [`TextSamplerDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TextSamplerDemoProject/src/components/TextSamplerDemo.java) that creates an uneditable editor pane that displays text formatted with HTML tags.

```java
JEditorPane editorPane = new JEditorPane();
editorPane.setEditable(false);
java.net.URL helpURL = TextSamplerDemo.class.getResource(
                                "TextSamplerDemoHelp.html");
if (helpURL != null) {
    try {
        editorPane.setPage(helpURL);
    } catch (IOException e) {
        System.err.println("Attempted to read a bad URL: " + helpURL);
    }
} else {
    System.err.println("Couldn't find file: TextSamplerDemoHelp.html");
}

//Put the editor pane in a scroll pane.
JScrollPane editorScrollPane = new JScrollPane(editorPane);
editorScrollPane.setVerticalScrollBarPolicy(
                JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
editorScrollPane.setPreferredSize(new Dimension(250, 145));
editorScrollPane.setMinimumSize(new Dimension(10, 10));
```json

The code uses the default constructor to create the editor pane, then calls `setEditable(false)` so the user cannot edit the text. Next, the code creates the `URL` object, and calls the `setPage` method with it.

The `setPage` method opens the resource pointed to by the URL and figures out the format of the text (which is HTML in the example). If the text format is known, the editor pane initializes itself with the text found at the URL. A standard editor pane can understand plain text, HTML, and RTF. Note that the page might be loaded asynchronously, which keeps the GUI responsive but means that you should not count on the data being completely loaded after the call to `setPage` returns.

## Editor Panes vs. Text Panes

In order to use editor panes and text panes, you need to understand the text system, which is described in [[Swing-组件-generaltext|Text Component Features]]. Several facts about editor panes and text panes are scattered throughout that section. Here we list the facts again and provide a bit more detail. The information here should help you understand the differences between editor panes and text panes, and when to use which.

- An editor pane or a text pane can easily be loaded with text from a URL using the `setPage` method. The `JEditorPane` class also provides constructors that let you initialize an editor pane from a URL. The `JTextPane` class has no such constructors. See [Using an Editor Pane to Display Text From a URL](#editorpane) for an example that uses this feature to load an uneditable editor pane with HTML-formatted text.
	Be aware that the document and editor kit might change when using the `setPage` method. For example, if an editor pane contains plain text (the default), and you load it with HTML, the document will change to an `HTMLDocument` instance and the editor kit will change to an `HTMLEditorKit` instance. If your program uses the `setPage` method, make sure you adjust your code for possible changes to the pane's document and editor kit instances (re-register document listeners on the new document, and so on).
- Editor panes, by default, know how to read, write, and edit plain, HTML, and RTF text. Text panes inherit this capability but impose certain limitations. A text pane insists that its document implement the `StyledDocument` interface. `HTMLDocument` and `RTFDocument` are both `StyledDocuments` so HTML and RTF work as expected within a text pane. If you load a text pane with plain text though, the text pane's document is not a `PlainDocument` as you might expect, but a `DefaultStyledDocument`.
- To support a custom text format, implement an editor kit that can read, write, and edit text of that format. Then call the `registerEditorKitForContentType` method to register your kit with the `JEditorPane` class. By registering an editor kit in this way, all editor panes and text panes in your program will be able to read, write, and edit the new format. However, if the new editor kit is not a `StyledEditorKit`, text panes will not support the new format.
- As mentioned previously, a text pane requires its document to implement the `StyledDocument` interface. The Swing text package provides a default implementation of this interface, `DefaultStyledDocument`, which is the document that text panes use by default. A text pane also requires that its editor kit be an instance of a `StyledEditorKit` (or a subclass). Be aware that the `read` and `write` methods for `StyleEditorKit` work with plain text.
- Through their styled document and styled editor kit, text panes provide support for named styles and logical styles. The `JTextPane` class itself contains many methods for working with styles that simply call methods in its document or editor kit.
- Through the API provided in the `JTextPane` class, you can embed images and components in a text pane. You can embed images in an editor pane, too, but only by including the images in an HTML or RTF file.

## An Example of Using a Text Pane

Here is the code from the `TextSamplerDemo` example that creates and initializes a text pane.

```java
String[] initString =
        { /* ...  fill array with initial text  ... */ };

String[] initStyles =
        { /* ...  fill array with names of styles  ... */ };

JTextPane textPane = new JTextPane();
StyledDocument doc = textPane.getStyledDocument();
addStylesToDocument(doc);

//Load the text pane with styled text.
try {
    for (int i=0; i < initString.length; i++) {
        doc.insertString(doc.getLength(), initString[i],
                         doc.getStyle(initStyles[i]));
    }
} catch (BadLocationException ble) {
    System.err.println("Couldn't insert initial text into text pane.");
}
```

Briefly, this code hard-codes the initial text into an array and creates and hard-codes several *styles* — objects that represent different paragraph and character formats — into another array. Next, the code loops over the arrays, inserts the text into the text pane, and specifies the style to use for the inserted text.

Although this is an interesting example that concisely demonstrates several features of `JTextPane`, "real-world" programs aren't likely to initialize a text pane this way. Instead, a program would use an editor pane to save a document which would then be used to initialize the text pane.

## The Editor Pane and Text Pane API

This section lists some of the API related to text and editor panes. Many of the most useful methods for [JEditorPane](https://docs.oracle.com/javase/8/docs/api/javax/swing/JEditorPane.html) and its subclass [JTextPane](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextPane.html) are inherited from the `JTextComponent` class. You can find the API tables for `JTextComponent` in [[Swing-组件-textapi|The Text Component API]]. Also see [[Swing-组件-jcomponent|The JComponent Class]], which describes the API inherited from `JComponent`.

| Method or Constructor | Description |
| --- | --- |
| [JEditorPane(URL)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JEditorPane.html#JEditorPane-java.net.URL-)   [JEditorPane(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JEditorPane.html#JEditorPane-java.lang.String-) | Creates an editor pane loaded with the text at the specified URL. |
| [setPage(URL)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JEditorPane.html#setPage-java.net.URL-)   [setPage(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JEditorPane.html#setPage-java.lang.String-) | Loads an editor pane (or text pane) with the text at the specified URL. |
| [URL getPage()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JEditorPane.html#getPage--) | Gets the URL for the editor pane's (or text pane's) current page. |

| Method or Constructor | Description |
| --- | --- |
| [JTextPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextPane.html#JTextPane--)   [JTextPane(StyledDocument)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextPane.html#JTextPane-javax.swing.text.StyledDocument-) | Creates a text pane. The optional argument specifies the text pane's model. |
| [StyledDocument getStyledDocument](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextPane.html#getStyledDocument--)   [setStyledDocument(StyledDocument)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextPane.html#setStyledDocument-javax.swing.text.StyledDocument-) | Gets or sets the text pane's model. |

## Examples That Use Text Panes and Editor Panes

To begin using text, you might want to run these programs and examine their code to find something similar to what you want to do.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`TextSamplerDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextSamplerDemo) | [[Swing-组件-text|Using Text Components]] | Uses each Swing text component. |
| [`TextComponentDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextComponentDemo) | [[Swing-组件-generaltext|Text Component Features]] | Provides a customized text pane. Illustrates many text component features, such as undo and redo, document filters, document listeners, caret change listeners, and how to associate editing actions with menus and key strokes. |
| [`TreeDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TreeDemo) | [[Swing-组件-tree|How to Use Trees]] | Uses an editor pane to display help loaded from an HTML file. |

Learn to edit HTML text in JavaFX with the [Using JavaFX UI Controls: HTML Editor](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/editor.htm) tutorial.
---
分类:
  - "网页裁剪"
标题: "Using Text Components (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/text.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Using Text Components (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)

Documentation

[[Swing-组件-toplevel|Using Top-Level Containers]]

[[Swing-组件-jcomponent|The JComponent Class]]

Using Text Components

[[Swing-组件-generaltext|Text Component Features]]

[[Swing-组件-textapi|The Text Component API]]

[[Swing-组件-componentlist|How to Use Various Components]]

[[Swing-组件-applet|How to Make Applets]]

[[Swing-按钮|How to Use Buttons, Check Boxes, and Radio Buttons]]

[[Swing-组件-buttongroup|How to Use the ButtonGroup Component]]

[[Swing-组件-colorchooser|How to Use Color Choosers]]

[[Swing-组件-combobox|How to Use Combo Boxes]]

[[Swing-组件-dialog|How to Make Dialogs]]

[[Swing-组件-editorpane|How to Use Editor Panes and Text Panes]]

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

[[Swing-组件-jcomponent|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-generaltext|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Using Text Components

This section provides background information you might need when using Swing text components. If you intend to use an unstyled text component — a [[Swing-组件-textfield|text field]], [[Swing-组件-passwordfield|password field]], [[Swing-组件-formattedtextfield|formatted text field]], or [[Swing-组件-textarea|text area]] — go to its how-to page and return here only if necessary. If you intend to use a styled text component, see [[Swing-组件-editorpane|How to Use Editor Panes and Text Panes]], and read this section as well. If you do not know which component you need, read on.

Swing text components display text and optionally allow the user to edit the text. Programs need text components for tasks ranging from the straightforward (enter a word and press Enter) to the complex (display and edit styled text with embedded images in an Asian language).

Swing provides six text components, along with supporting classes and interfaces that meet even the most complex text requirements. In spite of their different uses and capabilities, all Swing text components inherit from the same superclass, [`JTextComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html), which provides a highly-configurable and powerful foundation for text manipulation.

The following figure shows the `JTextComponent` hierarchy.

![Swing's hierarchy of text components](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/10jtextcomp.png)

The following picture shows an application called `TextSamplerDemo` that uses each Swing text component.

![An application that provides a sample of each Swing text component](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/TextSamplerDemoMetal.png)

---

**Try this:**
1. Click the Launch button to run TextSamplerDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextSamplerDemo).
2. Type some text in the text field and press Enter. Do the same in the password field. The label beneath the fields is updated when you press Enter.
3. Try entering valid and invalid dates into the formatted text field. Note that when you press Enter the label beneath the fields is updated only if the date is valid.
4. Select and edit text in the text area and the text pane. Use keyboard bindings, Ctrl-X, Ctrl-C, and Ctrl-V, to cut, copy, and paste text, respectively.
5. Try to edit the text in the editor pane, which has been made uneditable with a call to `setEditable`.
6. Look in the text pane to find an example of an embedded component and an embedded icon.

---

The `TextSamplerDemo` example uses the text components in very basic ways. The following table tells you more about what you can do with each kind of text component.

| Group | Description | Swing Classes |
| --- | --- | --- |
| Text Controls | Also known simply as text fields, text controls can display only one line of editable text. Like buttons, they generate action events. Use them to get a small amount of textual information from the user and perform an action after the text entry is complete. | [`JTextField`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html) and its subclasses [`JPasswordField`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPasswordField.html) and [`JFormattedTextField`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFormattedTextField.html) |
| Plain Text Areas | `JTextArea` can display multiple lines of editable text. Although a text area can display text in any font, all of the text is in the same font. Use a text area to allow the user to enter unformatted text of any length or to display unformatted help information. | [`JTextArea`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html) |
| Styled Text Areas | A styled text component can display editable text using more than one font. Some styled text components allow embedded images and even embedded components. Styled text components are powerful and multi-faceted components suitable for high-end needs, and offer more avenues for customization than the other text components.  Because they are so powerful and flexible, styled text components typically require more initial programming to set up and use. One exception is that editor panes can be easily loaded with formatted text from a URL, which makes them useful for displaying uneditable help information. | [`JEditorPane`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JEditorPane.html)   and its subclass   [`JTextPane`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextPane.html) |

This Tutorial provides information about the foundation laid by the `JTextComponent` class and tells you how to accomplish some common text-related tasks.

To learn more about text components in JavaFX, see the [Using Text and Text Effects in JavaFX](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/text.htm) and [Using JavaFX UI Controls: Text Field](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/text-field.htm) tutorials.
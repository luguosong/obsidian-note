---
分类:
  - "网页裁剪"
标题: "How to Use Text Fields (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/textfield.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

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

How to Use Text Fields

[[Swing-组件-toolbar|How to Use Tool Bars]]

[[Swing-组件-tooltip|How to Use Tool Tips]]

[[Swing-组件-tree|How to Use Trees]]

[[Swing-组件-html|How to Use HTML in Swing Components]]

[[Swing-组件-model|How to Use Models]]

[[Swing-组件-icon|How to Use Icons]]

[[Swing-组件-border|How to Use Borders]]

[[Swing-组件-problems|Solving Common Component Problems]]

[[Swing-组件-textarea|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-toolbar|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Text Fields

A text field is a basic text control that enables the user to type a small amount of text. When the user indicates that text entry is complete (usually by pressing Enter), the text field fires an [[Swing-事件监听-actionlistener|action event]]. If you need to obtain more than one line of input from the user, use a [[Swing-组件-textarea|text area]].

The Swing API provides several classes for components that are either varieties of text fields or that include text fields.

| [`JTextField`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html) | What this section covers: basic text fields. |
| --- | --- |
| `JFormattedTextField` | A `JTextField` subclass that allows you to specify the legal set of characters that the user can enter. See [[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]]. |
| `JPasswordField` | A `JTextField` subclass that does not show the characters that the user types. See [[Swing-组件-passwordfield|How to Use Password Fields]]. |
| `JComboBox` | Can be edited, and provides a menu of strings to choose from. See [[Swing-组件-combobox|How to Use Combo Boxes]]. |
| `JSpinner` | Combines a formatted text field with a couple of small buttons that enables the user to choose the previous or next available value. See [[Swing-组件-spinner|How to Use Spinners]]. |

The following example displays a basic text field and a text area. The text field is editable. The text area is not editable. When the user presses Enter in the text field, the program copies the text field's contents to the text area, and then selects all the text in the text field.

![A snapshot of TextDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/TextDemo.png)

Click the Launch button to run TextDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextDemo).

You can find the entire code for this program in [`TextDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TextDemoProject/src/components/TextDemo.java). The following code creates and sets up the text field:

```
textField = new JTextField(20);
```

The integer argument passed to the `JTextField` constructor, `20` in the example, indicates the number of columns in the field. This number is used along with metrics provided by the field's current font to calculate the field's preferred width. It does not limit the number of characters the user can enter. To do that, you can either use a [[Swing-组件-formattedtextfield|formatted text field]] or a document listener, as described in [[Swing-组件-generaltext|Text Component Features]].

---

**Note:**

We encourage you to specify the number of columns for each text field. If you do not specify the number of columns or a preferred size, then the field's preferred size changes whenever the text changes, which can result in unwanted layout updates.

---

The next line of code registers a `TextDemo` object as an action listener for the text field.

```
textField.addActionListener(this);
```

The `actionPerformed` method handles action events from the text field:

```java
private final static String newline = "\n";
...
public void actionPerformed(ActionEvent evt) {
    String text = textField.getText();
    textArea.append(text + newline);
    textField.selectAll();
}
```

Notice the use of `JTextField` 's `getText` method to retrieve the text currently contained by the text field. The text returned by this method does *not* include a newline character for the Enter key that fired the action event.

You have seen how a basic text field can be used. Because the `JTextField` class inherits from the `JTextComponent` class, text fields are very flexible and can be customized almost any way you like. For example, you can add a document listener or a document filter to be notified when the text changes, and in the filter case you can modify the text field accordingly. Information on text components can be found in [[Swing-组件-generaltext|Text Component Features]]. Before customizing a `JTextField`, however, make sure that one of the other [components based on text fields](#varieties) will not do the job for you.

Often text fields are paired with labels that describe the text fields. See [Examples That Use Text Fields](#eg) for pointers on creating these pairs.

## Another Example: TextFieldDemo

The `TextFieldDemo` example introduces a text field and a text area. You can find the entire code for this program in [`TextFieldDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TextFieldDemoProject/src/components/TextFieldDemo.java).

As you type characters in the text field the program searches for the typed text in the text area. If the entry is found it gets highlighted. If the program fails to find the entry then the text field's background becomes pink. A status bar below the text area displays a message whether text is found or not. The Escape key is used to start a new search or to finish the current one. Here is a picture of the `TextFieldDemo` application.

![A snapshot of TextFieldDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/TextFieldDemo.png)

Click the Launch button ro run TextFieldDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextFieldDemo).

To highlight text, this example uses a highlighter and a painter. The code below creates and sets up the highlighter and the painter for the text area.

```
final Highlighter hilit;
final Highlighter.HighlightPainter painter;
...
hilit = new DefaultHighlighter();
painter = new DefaultHighlighter.DefaultHighlightPainter(HILIT_COLOR);
textArea.setHighlighter(hilit);
```

This code adds a document listener to the text field's document.

```
entry.getDocument().addDocumentListener(this);
```

Document listener's `insertUpdate` and `removeUpdate` methods call the `search` method, which not only performs a search in the text area but also handles highlighting. The following code highlights the found text, sets the caret to the end of the found match, sets the default background for the text field, and displays a message in the status bar.

```
hilit.addHighlight(index, end, painter);
textArea.setCaretPosition(end);
entry.setBackground(entryBg);
message("'" + s + "' found. Press ESC to end search");
```

The status bar is a `JLabel` object. The code below shows how the `message` method is implemented.

```
private JLabel status;
...
void message(String msg) {
    status.setText(msg);
}
```

If there is no match in the text area, the following code changes the text field's background to pink and displays a proper information message.

```
entry.setBackground(ERROR_COLOR);
message("'" + s + "' not found. Press ESC to start a new search");
```

The `CancelAction` class is responsible for handling the Escape key as follows.

```java
class CancelAction extends AbstractAction {
    public void actionPerformed(ActionEvent ev) {
            hilit.removeAllHighlights();
            entry.setText("");
            entry.setBackground(entryBg);
        }
}
```

## The Text Field API

The following tables list the commonly used `JTextField` constructors and methods. Other methods you are likely to call are defined in the `JTextComponent` class. Refer to [[Swing-组件-textapi|The Text Component API]].

You might also invoke methods on a text field inherited from the text field's other ancestors, such as `setPreferredSize`, `setForeground`, `setBackground`, `setFont`, and so on. See [[Swing-组件-jcomponent|The JComponent Class]] for tables of commonly used inherited methods.

The API for using text fields falls into these categories:

- [Setting or Obtaining the Field's Contents](#contents)
- [Fine Tuning the Field's Appearance](#looks)
- [Implementing the Field's Functionality](#function)

| Method or Constructor | Purpose |
| --- | --- |
| [JTextField()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#JTextField--)   [JTextField(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#JTextField-java.lang.String-)   [JTextField(String, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#JTextField-java.lang.String-int-)   [JTextField(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#JTextField-int-) | Creates a text field. When present, the `int` argument specifies the desired width in columns. The `String` argument contains the field's initial text. |
| [void setText(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setText-java.lang.String-)   [String getText()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getText--)   *(defined in `JTextComponent`)* | Sets or obtains the text displayed by the text field. |

| Method | Purpose |
| --- | --- |
| [void setEditable(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setEditable-boolean-)   [boolean isEditable()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#isEditable--)   *(defined in `JTextComponent`)* | Sets or indicates whether the user can edit the text in the text field. |
| [void setColumns(int);](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#setColumns-int-)   [int getColumns()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#getColumns--) | Sets or obtains the number of columns displayed by the text field. This is really just a hint for computing the field's preferred width. |
| [void setHorizontalAlignment(int);](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#setHorizontalAlignment-int-)   [int getHorizontalAlignment()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#getHorizontalAlignment--) | Sets or obtains how the text is aligned horizontally within its area. You can use `JTextField.LEADING`, `JTextField.CENTER`, and `JTextField.TRAILING` for arguments. |

| Method | Purpose |
| --- | --- |
| [void addActionListener(ActionListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#addActionListener-java.awt.event.ActionListener-)   [void removeActionListener(ActionListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#removeActionListener-java.awt.event.ActionListener-) | Adds or removes an action listener. |
| [void selectAll()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#selectAll--)   *(defined in `JTextComponent`)* | Selects all characters in the text field. |

## Examples That Use Text Fields

This table shows a few of the examples that use text fields and points to where those examples are described. For examples of code that are similar among all varieties of text fields such as dealing with layout, look at the example lists for related components such as [[Swing-组件-formattedtextfield|formatted text fields]] and [[Swing-组件-spinner|spinners]].

| Example | Where Described | Notes |
| --- | --- | --- |
| [TextDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextDemo) | This section | An application that uses a basic text field with an action listener. |
| [TextFieldDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextFieldDemo) | This section | An application that uses a text field and a text area. A search is made in the text area to find an entry from the text field. |
| [DialogDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#DialogDemo) | [[Swing-组件-dialog|How to Make Dialogs]] | `CustomDialog.java` includes a text field whose value is checked. You can bring up the dialog by clicking the More Dialogs tab, selecting the Input-validating dialog option, and then clicking the Show it! button. |
| [TextSamplerDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextSamplerDemo) | [[Swing-组件-text|Using Text Components]] | Lays out label-text field pairs using a `GridBagLayout` and a convenience method:  ``` addLabelTextRows(JLabel[] labels,                  JTextField[] textFields,                  GridBagLayout gridbag,                  Container container) ``` |
| [TextInputDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextInputDemo) | [[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]] | Lays out label-text field pairs using a `SpringLayout` and a `SpringUtilities` convenience method:  ``` makeCompactGrid(Container parent,                 int rows, int cols,                 int initialX, int initialY,                 int xPad, int yPad) ``` |

If you are programming in JavaFX, see [Text Field](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/text-field.htm).
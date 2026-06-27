---
分类:
  - "网页裁剪"
标题: "How to Use Text Areas (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/textarea.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Text Areas (The Java™ Tutorials >        
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

How to Use Text Areas

[[Swing-组件-textfield|How to Use Text Fields]]

[[Swing-组件-toolbar|How to Use Tool Bars]]

[[Swing-组件-tooltip|How to Use Tool Tips]]

[[Swing-组件-tree|How to Use Trees]]

[[Swing-组件-html|How to Use HTML in Swing Components]]

[[Swing-组件-model|How to Use Models]]

[[Swing-组件-icon|How to Use Icons]]

[[Swing-组件-border|How to Use Borders]]

[[Swing-组件-problems|Solving Common Component Problems]]

[[Swing-组件-table|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-textfield|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Text Areas

The [`JTextArea`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html) class provides a component that displays multiple lines of text and optionally allows the user to edit the text. If you need to obtain only one line of input from the user, you should use a [[Swing-组件-textfield|text field]]. If you want the text area to display its text using multiple fonts or other styles, you should use an [[Swing-组件-editorpane|editor pane or text pane]]. If the displayed text has a limited length and is never edited by the user, use a [[Swing-组件-label|label]].

Many of the Tutorial's examples use uneditable text areas to display program output. Here is a picture of an example called `TextDemo` that enables you to type text using a text field (at the top) and then appends the typed text to a text area (underneath).

![A snapshot of TextDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/TextDemo.png)

Click the Launch button to run TextDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextDemo).

You can find the entire code for this program in [`TextDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TextDemoProject/src/components/TextDemo.java). The following code creates and initializes the text area:

```text
textArea = new JTextArea(5, 20);
JScrollPane scrollPane = new JScrollPane(textArea); 
textArea.setEditable(false);
```

The two arguments to the `JTextArea` constructor are hints as to the number of rows and columns, respectively, that the text area should display. The scroll pane that contains the text area pays attention to these hints when determining how big the scroll pane should be.

Without the creation of the scroll pane, the text area would not automatically scroll. The `JScrollPane` constructor shown in the preceding snippet sets up the text area for viewing in a scroll pane, and specifies that the scroll pane's scroll bars should be visible when needed. See [[Swing-组件-scrollpane|How to Use Scroll Panes]] if you want further information.

Text areas are editable by default. The code `setEditable(false)` makes the text area uneditable. It is still selectable and the user can copy data from it, but the user cannot change the text area's contents directly.

The following code adds text to the text area. Note that the text system uses the '\\n' character internally to represent newlines; for details, see the API documentation for [`DefaultEditorKit`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.html).

```java
private final static String newline = "\n";
...
textArea.append(text + newline);
```

Unless the user has moved the caret (insertion point) by clicking or dragging in the text area, the text area automatically scrolls so that the appended text is visible. You can force the text area to scroll to the bottom by moving the caret to the end of the text area after the call to `append`:

```text
textArea.setCaretPosition(textArea.getDocument().getLength());
```

## Customizing Text Areas

You can customize text areas in several ways. For example, although a given text area can display text in only one font and color, you can set which font and color it uses. This customization option can be performed on any component. You can also determine how the text area wraps lines and the number of characters per tab. Finally, you can use the methods that the `JTextArea` class inherits from the `JTextComponent` class to set properties such as the caret, support for dragging, or color selection.

The following code taken from [`TextSamplerDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TextSamplerDemoProject/src/components/TextSamplerDemo.java) demonstrates initializing an editable text area. The text area uses the specified italic font, and wraps lines between words.

```text
JTextArea textArea = new JTextArea(
    "This is an editable JTextArea. " +
    "A text area is a \"plain\" text component, " +
    "which means that although it can display text " +
    "in any font, all of the text is in the same font."
);
textArea.setFont(new Font("Serif", Font.ITALIC, 16));
textArea.setLineWrap(true);
textArea.setWrapStyleWord(true);
```

By default, a text area does not wrap lines that are too long for the display area. Instead, it uses one line for all the text between newline characters and — if the text area is within a [[Swing-组件-scrollpane|scroll pane]] — allows itself to be scrolled horizontally. This example turns line wrapping on with a call to the `setLineWrap` method and then calls the `setWrapStyleWord` method to indicate that the text area should wrap lines at word boundaries rather than at character boundaries.

To provide scrolling capability, the example puts the text area in a scroll pane.

```text
JScrollPane areaScrollPane = new JScrollPane(textArea);
areaScrollPane.setVerticalScrollBarPolicy(
                JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
areaScrollPane.setPreferredSize(new Dimension(250, 250));
```

You might have noticed that the `JTextArea` constructor used in this example does not specify the number of rows or columns. Instead, the code limits the size of the text area by setting the scroll pane's preferred size.

## Another Example: TextAreaDemo

The `TextAreaDemo` example introduces an editable text area with a special feature — a word completion function. As the user types in words, the program suggests hints to complete the word whenever the program's vocabulary contains a word that starts with what has been typed. Here is a picture of the `TextAreaDemo` application.

![A snapshot of TextAreaDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/TextAreaDemo.png)

Click the Launch button to run TextAreaDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextAreaDemo).

You can find the entire code for this program in [`TextAreaDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TextAreaDemoProject/src/components/TextAreaDemo.java).

This example provides a scrolling capacity for the text area with the default scroll bar policy. By default, the vertical scroll bar only appears when the display area is entirely filled with text and there is no room to append new words. You can provide a scroll pane of this type with the following code:

```text
textArea.setWrapStyleWord(true);
jScrollPane1 = new JScrollPane(textArea);
```

As mentioned above, the text area is editable. You can play with the text area by typing and pasting text, or by deleting some parts of text or the entire content. Also try using standard key bindings for editing text within the text area.

Now explore how the word completion function is implemented. Type in a word like "Swing" or "special". As soon as you have typed "sw" the program shows a possible completion "ing" highlighted in light-blue. Press Enter to accept the completion or continue typing.

The following code adds a document listener to the text area's document:

```text
textArea.getDocument().addDocumentListener(this);
```

When you started typing a word, the `insertUpdate` method checks whether the program's vocabulary contains the typed prefix. Once a completion for the prefix is found, a call to the `invokeLater` method submits a task for changing the document later. It is important to remember that you cannot modify the document from within the document event notification, otherwise you will get an exception. Examine the following code below.

```sql
String prefix = content.substring(w + 1).toLowerCase();
int n = Collections.binarySearch(words, prefix);
if (n < 0 && -n <= words.size()) {
    String match = words.get(-n - 1);
    if (match.startsWith(prefix)) {
        // A completion is found
        String completion = match.substring(pos - w);
        // We cannot modify Document from within notification,
        // so we submit a task that does the change later
        SwingUtilities.invokeLater(
            new CompletionTask(completion, pos + 1));
    }
} else {
    // Nothing found
    mode = Mode.INSERT;
}
```java

The code shown in bold illustrates how the selection is created. The caret is first set to the end of the complete word, then moved back to a position after the last character typed. The `moveCaretPosition` method not only moves the caret to a new position but also selects the text between the two positions. The completion task is implemented with the following code:

```java
private class CompletionTask implements Runnable {
      String completion;
      int position;
      
      CompletionTask(String completion, int position) {
          this.completion = completion;
          this.position = position;
      }
      
      public void run() {
          textArea.insert(completion, position);
          textArea.setCaretPosition(position + completion.length());
          textArea.moveCaretPosition(position);
          mode = Mode.COMPLETION;
      }
  }
```

## The Text Area API

The following tables list the commonly used `JTextArea` constructors and methods. Other methods you are likely to call are defined in `JTextComponent`, and listed in [[Swing-组件-textapi|The Text Component API]].

You might also invoke methods on a text area that it inherits from its other ancestors, such as `setPreferredSize`, `setForeground`, `setBackground`, `setFont`, and so on. See [[Swing-组件-jcomponent|The JComponent Class]] for tables of commonly used inherited methods.

The API for using text areas includes the following categories:

- [Setting or Obtaining Contents](#contents)
- [Fine Tuning Appearance](#looks)
- [Implementing Functionality](#function)

| Method or Constructor | Purpose |
| --- | --- |
| [JTextArea()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#JTextArea--)   [JTextArea(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#JTextArea-java.lang.String-)   [JTextArea(String, int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#JTextArea-java.lang.String-int-int-)   [JTextArea(int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#JTextArea-int-int-) | Creates a text area. When present, the `String` argument contains the initial text. The `int` arguments specify the desired width in columns and height in rows, respectively. |
| [void setText(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setText-java.lang.String-)   [String getText()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getText--)   *(defined in `JTextComponent`)* | Sets or obtains the text displayed by the text area. |

| Method | Purpose |
| --- | --- |
| [void setEditable(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setEditable-boolean-)   [boolean isEditable()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#isEditable--)   *(defined in `JTextComponent`)* | Sets or indicates whether the user can edit the text in the text area. |
| [void setColumns(int);](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#setColumns-int-)   [int getColumns()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#getColumns--) | Sets or obtains the number of columns displayed by the text area. This is really just a hint for computing the area's preferred width. |
| [void setRows(int);](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#setRows-int-)   [int getRows()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#getRows--) | Sets or obtains the number of rows displayed by the text area. This is a hint for computing the area's preferred height. |
| [int setTabSize(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#setTabSize-int-) | Sets the number of characters a tab is equivalent to. |
| [int setLineWrap(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#setLineWrap-boolean-) | Sets whether lines are wrapped if they are too long to fit within the allocated width. By default this property is false and lines are not wrapped. |
| [int setWrapStyleWord(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#setWrapStyleWord-boolean-) | Sets whether lines can be wrapped at white space (word boundaries) or at any character. By default this property is false, and lines can be wrapped (if line wrapping is turned on) at any character. |

| Method | Purpose |
| --- | --- |
| [void selectAll()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#selectAll--)   *(defined in `JTextComponent`)* | Selects all characters in the text area. |
| [void append(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#append-java.lang.String-) | Adds the specified text to the end of the text area. |
| [void insert(String, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#insert-java.lang.String-int-) | Inserts the specified text at the specified position. |
| [void replaceRange(String, int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#replaceRange-java.lang.String-int-int-) | Replaces the text between the indicated positions with the specified string. |
| [int getLineCount()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#getLineCount--)   [int getLineOfOffset(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#getLineOfOffset-int-)   [int getLineStartOffset(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#getLineStartOffset-int-)   [int getLineEndOffset(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextArea.html#getLineEndOffset-int-) | Utilities for finding a line number or the position of the beginning or end of the specified line. |

## Examples That Use Text Areas

This table lists examples that use text areas and points to where those examples are described.

| Example | Where Described | Notes |
| --- | --- | --- |
| [TextDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextDemo) | This section | An application that appends user-entered text to a text area. |
| [TextAreaDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextAreaDemo) | This section | An application that has a text area with a word completion function. |
| [TextSamplerDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextSamplerDemo) | [[Swing-组件-text|Using Text Components]] | Uses one of each Swing text components. |
| [HtmlDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#HtmlDemo) | [[Swing-组件-html|How to Use HTML in Swing Components]] | A text area that enables the user to type HTML code to be displayed in a label. |
| [BasicDnD](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/index.html#BasicDnD) | [[Swing-intro|Introduction to DnD]] | Demonstrates built-in drag-and-drop functionality of several Swing components, including text areas. |
| [FocusConceptsDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#FocusConceptsDemo) | [[Swing-其他特性-focus|How to Use the Focus Subsystem]] | Demonstrates how focus works using a few components that include a text area. |
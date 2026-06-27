---
分类:
  - "网页裁剪"
标题: "How to Use HTML in Swing Components (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/html.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use HTML in Swing Components (The Java™ Tutorials >        
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

[[Swing-组件-textarea|How to Use Text Areas]]

[[Swing-组件-textfield|How to Use Text Fields]]

[[Swing-组件-toolbar|How to Use Tool Bars]]

[[Swing-组件-tooltip|How to Use Tool Tips]]

[[Swing-组件-tree|How to Use Trees]]

How to Use HTML in Swing Components

[[Swing-组件-model|How to Use Models]]

[[Swing-组件-icon|How to Use Icons]]

[[Swing-组件-border|How to Use Borders]]

[[Swing-组件-problems|Solving Common Component Problems]]

[[Swing-组件-tree|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-model|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use HTML in Swing Components

Many Swing components display a text string as part of their GUI. By default, a component's text is displayed in a single font and color, all on one line. You can determine the font and color of a component's text by invoking the component's `setFont` and `setForeground` methods, respectively. For example, the following code creates a label and then sets its font and color:

```text
label = new JLabel("A label");
label.setFont(new Font("Serif", Font.PLAIN, 14));
label.setForeground(new Color(0xffffdd));
```

If you want to mix fonts or colors within the text, or if you want formatting such as multiple lines, you can use HTML. HTML formatting can be used in all Swing buttons, menu items, labels, tool tips, and tabbed panes, as well as in components such as trees and tables that use labels to render text.

To specify that a component's text has HTML formatting, just put the `<html>` tag at the beginning of the text, then use any valid HTML in the remainder. Here is an example of using HTML in a button's text:

```html
button = new JButton("<html><b><u>T</u>wo</b><br>lines</html>");

Here is the resulting button. ![Screenshot of a button that shows HTML in the Metal look and feel.](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/HtmlButtonMetal.png)

## An Example: HtmlDemo

An application called `HtmlDemo` lets you play with HTML formatting by setting the text on a label. You can find the entire code for this program in [`HtmlDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/HtmlDemoProject/src/components/HtmlDemo.java). Here is a picture of the `HtmlDemo` example.

![Screenshot of HtmlDemo in the Metal look and feel.](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/HtmlDemoMetal.png)

---

**Try This:**
1. Click the Launch button to run HtmlDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#HtmlDemo).
2. Edit the HTML formatting in the text area at the left and click the "Change the label" button. The label at the right shows the result.
3. Remove the <html> tag from the text area on the left. The label's text is no longer parsed as HTML.

---

## Example 2: ButtonHtmlDemo

Let us look at another example that uses HTML. `ButtonHtmlDemo` adds font, color, and other text formatting to three buttons. You can find the entire code for this program in [`ButtonHtmlDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ButtonHtmlDemoProject/src/components/ButtonHtmlDemo.java). Here is a picture of the `ButtonHtmlDemo` example.

![Screenshot of ButtonHtmlDemo in the Metal look and feel.](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ButtonHtmlDemoMetal.png)

Click the Launch button to run ButtonHtmlDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ButtonHtmlDemo).

The left and right buttons have multiple lines and text styles and are implemented using HTML. The middle button, on the other hand, uses just one line, font, and color, so it does not require HTML. Here is the code that specifies the text formatting for these three buttons:

```html
b1 = new JButton("<html><center><b><u>D</u>isable</b><br>"
                 + "<font color=#ffffdd>middle button</font>",
                 leftButtonIcon);
Font font = b1.getFont().deriveFont(Font.PLAIN);
b1.setFont(font);
...
b2 = new JButton("middle button", middleButtonIcon);
b2.setFont(font);
b2.setForeground(new Color(0xffffdd));
...
b3 = new JButton("<html><center><b><u>E</u>nable</b><br>"
                 + "<font color=#ffffdd>middle button</font>",
                 rightButtonIcon);
b3.setFont(font);

Note that we have to use a `<u>` tag to cause the mnemonic characters "D" and "E" to be underlined in the buttons that use HTML. Note also that when a button is disabled, its HTML text unfortunately remains black, instead of becoming gray. (Refer to [bug #4783068](http://bugs.java.com/bugdatabase/view_bug.do?bug_id=4783068) to see if this situation changes.)

This section discussed how to use HTML in ordinary, non-text components. For information on components whose primary purpose is formatting text, see [[Swing-组件-text|Using Text Components]].

If you are programming in JavaFX, see [HTML Editor](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/editor.htm).
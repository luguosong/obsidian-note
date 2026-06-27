---
分类:
  - "网页裁剪"
标题: "How to Use Labels (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/label.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Labels (The Java™ Tutorials >        
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

How to Use Labels

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

[[Swing-组件-internalframe|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-layeredpane|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Labels

With the [`JLabel`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html) class, you can display unselectable text and images. If you need to create a component that displays a string, an image, or both, you can do so by using or extending `JLabel`. If the component is interactive and has a certain state, use a [[Swing-按钮|button]] instead of a label.

By specifying HTML code in a label's text, you can give the label various characteristics such as multiple lines, multiple fonts or multiple colors. If the label uses just a single color or font, you can avoid the overhead of HTML processing by using the `setForeground` or `setFont` method instead. See [[Swing-组件-html|Using HTML in Swing Components]] for details.

Note that labels are not opaque by default. If you need to paint the label's background, it is recommended that you turn its opacity property to "true". The following code snippet shows how to do this.

```text
label.setOpaque(true);
```

The following picture introduces an application that displays three labels. The window is divided into three rows of equal height; the label in each row is as wide as possible.

![A snapshot of LabelDemo, which uses labels with text and icons.](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/LabelDemoMetal.png)

---

**Try this:**
1. Click the Launch button to run the Label Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#LabelDemo).
2. Resize the window so you can see how the labels' contents are placed within the labels' drawing area.  
	All the label contents have default vertical alignment — that is, the label contents are centered vertically in the label's drawing area. The top label, which contains both an image and text, has horizontal center alignment. The second label, which contains just text, has left (leading) alignment, which is the default for text-only labels in left-to-right languages. The third label, which contains just an image, has horizontal center alignment, which is the default for image-only labels.

---

Below is the code from [`LabelDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/LabelDemoProject/src/components/LabelDemo.java) that creates the labels in the previous example.

```text
ImageIcon icon = createImageIcon("images/middle.gif");
. . .
label1 = new JLabel("Image and Text",
                    icon,
                    JLabel.CENTER);
//Set the position of the text, relative to the icon:
label1.setVerticalTextPosition(JLabel.BOTTOM);
label1.setHorizontalTextPosition(JLabel.CENTER);

label2 = new JLabel("Text-Only Label");
label3 = new JLabel(icon);
```

The code for the `createImageIcon` method is similar to that used throughout this tutorial. You can find it in [[Swing-组件-icon|How to Use Icons]].

Often, a label describes another component. When this occurs, you can improve your program's accessibility by using the `setLabelFor` method to identify the component that the label describes. For example:

```text
amountLabel.setLabelFor(amountField);
```

The preceding code, taken from the `FormattedTextFieldDemo` example discussed in [[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]], lets assistive technologies know that the label (`amountLabel`) provides information about the formatted text field (`amountField`). For more information about assistive technologies, see [[Swing-其他特性-access|How to Support Assistive Technologies]].

## The Label API

The following tables list the commonly used `JLabel` constructors and methods. Other methods you are likely to call are defined by the `Component` and `JComponent` classes. They include `setFont`, `setForeground`, `setBorder`, `setOpaque`, and `setBackground`. See [[Swing-组件-jcomponent|The JComponent Class]] for details. The API for using labels falls into three categories:

- [Setting or Getting the Label's Contents](#contentsapi)
- [Fine Tuning the Label's Appearance](#looksapi)
- [Supporting Accessibility](#accessapi)

---

**Note:**

In the following API, do not confuse label alignment with X and Y alignment. X and Y alignment are used by layout managers and can affect the way any component — not just a label — is sized or positioned. Label alignment, on the other hand, has no effect on a label's size or position. Label alignment simply determines where, inside the label's painting area, the label's contents are positioned. Typically, the label's painting area is exactly the size needed to paint on the label and thus label alignment is irrelevant. For more information about X and Y alignment, see [[Swing-布局-box|How to Use BoxLayout]].

---

| Method or Constructor | Purpose |
| --- | --- |
| [JLabel(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#JLabel-javax.swing.Icon-)   [JLabel(Icon, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#JLabel-javax.swing.Icon-int-)   [JLabel(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#JLabel-java.lang.String-)   [JLabel(String, Icon, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#JLabel-java.lang.String-javax.swing.Icon-int-)   [JLabel(String, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#JLabel-java.lang.String-int-)   [JLabel()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#JLabel--) | Creates a `JLabel` instance, initializing it to have the specified text/image/alignment. The `int` argument specifies the horizontal alignment of the label's contents within its drawing area. The horizontal alignment must be one of the following constants defined in the [`SwingConstants`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingConstants.html) interface (which `JLabel` implements): `LEFT`, `CENTER`, `RIGHT`, `LEADING`, or `TRAILING`. For ease of localization, we strongly recommend using `LEADING` and `TRAILING`, rather than `LEFT` and `RIGHT`. |
| [void setText(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#setText-java.lang.String-)   [String getText()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#getText--) | Sets or gets the text displayed by the label. You can use HTML tags to format the text, as described in [[Swing-组件-html|Using HTML in Swing Components]]. |
| [void setIcon(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#setIcon-javax.swing.Icon-)   [Icon getIcon()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#getIcon--) | Sets or gets the image displayed by the label. |
| [void setDisplayedMnemonic(char)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#setDisplayedMnemonic-char-)   [char getDisplayedMnemonic()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#getDisplayedMnemonic--) | Sets or gets the letter that should look like a keyboard alternative. This is helpful when a label describes a component (such as a text field) that has a keyboard alternative but cannot display it. If the labelFor property is also set (using `setLabelFor`), then when the user activates the mnemonic, the keyboard focus is transferred to the component specified by the labelFor property. |
| [void setDisplayedMnemonicIndex(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#setDisplayedMnemonicIndex-int-)   [int getDisplayedMnemonicIndex()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#getDisplayedMnemonicIndex--) | Sets or gets a hint as to which character in the text should be decorated to represent the mnemonic. This is useful when you have two instances of the same character and wish to decorate the second instance. For example, `setDisplayedMnemonicIndex(5)` decorates the character that is at position 5 (that is, the 6th character in the text). Not all types of look and feel may support this feature. |
| [void setDisabledIcon(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#setDisabledIcon-javax.swing.Icon-)   [Icon getDisabledIcon()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#getDisabledIcon--) | Sets or gets the image displayed by the label when it is disabled. If you do not specify a disabled image, then the look and feel creates one by manipulating the default image. |

| Method | Purpose |
| --- | --- |
| [void setHorizontalAlignment(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#setHorizontalAlignment-int-)   [void setVerticalAlignment(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#setVerticalAlignment-int-)   [int getHorizontalAlignment()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#getHorizontalAlignment--)   [int getVerticalAlignment()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#getVerticalAlignment--) | Sets or gets the area on the label where its contents should be placed. The [`SwingConstants`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingConstants.html) interface defines five possible values for horizontal alignment: `LEFT`, `CENTER` (the default for image-only labels), `RIGHT`, `LEADING` (the default for text-only labels), `TRAILING`. For vertical alignment: `TOP`, `CENTER` (the default), and `BOTTOM`. |
| [void setHorizontalTextPosition(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#setHorizontalTextPosition-int-)   [void setVerticalTextPosition(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#setVerticalTextPosition-int-)   [int getHorizontalTextPosition()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#getHorizontalTextPosition--)   [int getVerticalTextPosition()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#getVerticalTextPosition--) | Sets or gets the location where the label's text will be placed, relative to the label's image. The [`SwingConstants`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingConstants.html) interface defines five possible values for horizontal position: `LEADING`, `LEFT`, `CENTER`, `RIGHT`, and `TRAILING` (the default). For vertical position: `TOP`, `CENTER` (the default), and `BOTTOM`. |
| [void setIconTextGap(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#setIconTextGap-int-)   [int getIconTextGap()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#getIconTextGap--) | Sets or gets the number of pixels between the label's text and its image. |

| Method | Purpose |
| --- | --- |
| [void setLabelFor(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#setLabelFor-java.awt.Component-)   [Component getLabelFor()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JLabel.html#getLabelFor--) | Sets or gets which component the label describes. |

## Examples That Use Labels

The following table lists some of the many examples that use labels.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`LabelDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#LabelDemo) | This section | Shows how to specify horizontal and vertical alignment as well as how to align a label's text and image. |
| [`HtmlDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#HtmlDemo) | [[Swing-组件-html|Using HTML in Swing Components]] | Lets you experiment with specifying HTML text for a label. |
| [`BoxAlignmentDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#BoxAlignmentDemo) | [[Swing-布局-box|Fixing Alignment Problems]] | Demonstrates possible alignment problems when using a label in a vertical box layout. Shows how to solve the problem. |
| [`DialogDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#DialogDemo) | [[Swing-组件-dialog|How to Use Dialogs]] | Uses a changeable label to display instructions and provide feedback. |
| [`SplitPaneDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SplitPaneDemo) | [[Swing-组件-splitpane|How to Use Split Panes]] and [[Swing-组件-list|How to Use Lists]] | Displays an image using a label inside of a scroll pane. |
| [`SliderDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SliderDemo2) | [[Swing-滑块|How to Use Sliders]] | Uses `JLabel` to provide labels for a slider. |
| [`TableDialogEditDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TableDialogEditDemo) | [[Swing-组件-table|How to Use Tables]] | Implements a label subclass, `ColorRenderer`, to display colors in table cells. |
| [`FormattedTextFieldDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FormattedTextFieldDemo) | [[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]] | Has four rows, each containing a label and the formatted text field it describes. |
| [`TextComponentDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextComponentDemo) | [[Swing-组件-generaltext|Text Component Features]] | `TextComponentDemo` has an inner class (`CaretListenerLabel`) that extends `JLabel` to provide a label that listens for events, updating itself based on the events. |
| [`ColorChooserDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ColorChooserDemo) | [[Swing-组件-colorchooser|How to Use Color Choosers]] | Uses an opaque label to display the currently chosen color against a fixed-color background. |

See the [Using JavaFX UI Controls: Label](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/label.htm) tutorial to learn about JavaFX labeled controls.
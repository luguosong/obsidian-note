---
分类:
  - "网页裁剪"
标题: "How to Use Separators (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/separator.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Separators (The Java™ Tutorials >        
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

How to Use Separators

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

[[Swing-组件-scrollpane|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-滑块|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Separators

The [`JSeparator`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSeparator.html) class provides a horizontal or vertical dividing line or empty space. It's most commonly used in menus and tool bars. In fact, you can use separators without even knowing that a `JSeparator` class exists, since [[Swing-组件-menu|menus]] and [[Swing-组件-toolbar|tool bars]] provide convenience methods that create and add separators customized for their containers. Separators are somewhat similar to [[Swing-组件-border|borders]], except that they are genuine components and, as such, are drawn inside a container, rather than around the edges of a particular component.

Here is a picture of a menu that has three separators, used to divide the menu into four groups of items:

![A menu with 4 parts, as indicated by 3 separators](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/MenuWithSeparators.png)

The code to add the menu items and separators to the menu is extremely simple, boiling down to something like this:

```text
menu.add(menuItem1);
menu.add(menuItem2);
menu.add(menuItem3);
menu.addSeparator();
menu.add(rbMenuItem1);
menu.add(rbMenuItem2);
menu.addSeparator();
menu.add(cbMenuItem1);
menu.add(cbMenuItem2);
menu.addSeparator();
menu.add(submenu);
```

Adding separators to a tool bar is similar. You can find the full code explained in the how-to sections for [[Swing-组件-menu|menus]] and [[Swing-组件-toolbar|tool bars]]. If you want more control over separators in menus and tool bars, you can directly use the `JSeparator` subclasses that implement them: [JPopupMenu.Separator](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.Separator.html) and [JToolBar.Separator](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.Separator.html). In particular, `JToolBar.Separator` has API for specifying the separator's size.

## Using JSeparator

You can use the `JSeparator` class directly to provide a dividing line in any container. The following picture shows a GUI that has a separator to the right of the button labeled Fire.

![A snapshot of ListDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ListDemo.png)

Separators have almost no API and are extremely easy to use as long as you keep one thing in mind: In most implementations, a vertical separator has a preferred height of 0, and a horizontal separator has a preferred width of 0. This means a separator **is not visible** unless you either set its preferred size or put it in under the control of a layout manager such as `BorderLayout` or `BoxLayout` that stretches it to fill its available display area.

The vertical separator does have a bit of width (and the horizontal a bit of height), so you should see some space where the separator is. However, the actual dividing line isn't drawn unless the width and height are both non-zero.

The following code snippet shows how ListDemo puts together the panel that contains the vertical separator. You can find the full source code for ListDemo in [`ListDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ListDemoProject/src/components/ListDemo.java).

```text
JPanel buttonPane = new JPanel();
buttonPane.setLayout(new BoxLayout(buttonPane,
                                   BoxLayout.LINE_AXIS));
buttonPane.add(fireButton);
buttonPane.add(Box.createHorizontalStrut(5));
buttonPane.add(new JSeparator(SwingConstants.VERTICAL));
buttonPane.add(Box.createHorizontalStrut(5));
buttonPane.add(employeeName);
buttonPane.add(hireButton);
buttonPane.setBorder(BorderFactory.createEmptyBorder(5,5,5,5));
```

As the code shows, the buttons, separator, and text field all share a single container — a `JPanel` instance that uses a left-to-right [[Swing-布局-box|box layout]]. Thanks to the layout manager (and to the fact that separators have unlimited maximum sizes), the separator is automatically made as tall as its available display area.

In the preceding code, the horizontal struts are invisible components used to provide space around the separator. A 5-pixel empty border provides a cushion around the panel, and also serves to prevent the separator from extending all the way to the component above it and the window's edge below it.

Here's a picture of another GUI that uses a separator, this time to put a dividing line between a group of controls and a display area.

![A snapshot of TextInputDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/TextInputDemo.png)

You can find the code in the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextInputDemo). Here is the code that sets up the separator's container:

```text
JPanel panel = new JPanel(new BorderLayout());
...
panel.setBorder(BorderFactory.createEmptyBorder(
                        GAP/2, //top
                        0,     //left
                        GAP/2, //bottom
                        0));   //right
panel.add(new JSeparator(JSeparator.VERTICAL),
          BorderLayout.LINE_START);
panel.add(addressDisplay,
          BorderLayout.CENTER);
```

As in the last example, the panel uses an empty border so that the separator doesn't extend all the way to the edges of its container. Placing the separator in the leftmost area of the `BorderLayout` -controlled container makes the separator as tall as the address-display component that's in the center of the container. See [[Swing-布局-border|How to Use BorderLayout]] for details on how border layouts work.

## The Separator API

The API for using separators is minimal, since they have no contents and don't respond to user input.

| Constructor or Method | Purpose |
| --- | --- |
| [void addSeparator()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html#addSeparator--)   [void addSeparator(Dimension)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html#addSeparator-java.awt.Dimension-)   *(in `JToolBar`)* | Append a tool bar separator (which is invisible in most, if not all, look and feels) to the current end of the tool bar. The optional argument specifies the size of the separator. The no-argument version of this method uses a separator with a default size, as determined by the current look and feel. |
| [void addSeparator()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#addSeparator--)   [void insertSeparator(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#insertSeparator-int-)   *(in `JMenu`)* | Put a separator in the menu. The `addSeparator` method puts the separator at the current end of the menu. The `insertSeparator` method inserts the separator into the menu at the specified position. |
| [void addSeparator()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.html#addSeparator--)   *(in `JPopupMenu`)* | Put a separator at the current end of the popup menu. |
| [JSeparator()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSeparator.html#JSeparator--)   [JSeparator(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSeparator.html#JSeparator-int-) | Create a separator. If you don't specify an argument, the separator is horizontal. The argument can be either `SwingConstants.HORIZONTAL` or `SwingConstants.VERTICAL`. |
| [void setOrientation(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSeparator.html#setOrientation-int-)   [int getOrientation()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSeparator.html#getOrientation--)   *(in `JSeparator`)* | Get or set the separator's orientation, which can be either `SwingConstants.HORIZONTAL` or `SwingConstants.VERTICAL`. |
| [JToolBar.Separator()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.Separator.html#JToolBar.Separator--)   [JToolBar.Separator(Dimension)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.Separator.html#JToolBar.Separator-java.awt.Dimension-) | Create a separator for use in a tool bar. The optional argument specifies the separator's size. |
| [setSeparatorSize(Dimension)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.Separator.html#setSeparatorSize-java.awt.Dimension-)   *(in `JToolBar.Separator`)* | Specify the separator's size. More specifically, the specified `Dimension` is used as the separator's minimum, preferred, and maximum sizes. |
| [JPopupMenu.Separator()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.Separator.html#JPopupMenu.Separator--) | Create a separator for use in a menu. |

## Examples that Use Separators

Several of this lesson's examples use separators, usually in menus. Here is a list of some of the more interesting examples.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`ListDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ListDemo) | This section and [[Swing-组件-list|How to Use Lists]] | Uses a vertical separator in a panel controlled by a horizontal box layout. |
| [`TextInputDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextInputDemo) | This section and [[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]] | Uses a vertical separator at the left of a panel controlled by a border layout. |
| [`MenuDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuDemo) | This section and [[Swing-组件-menu|How to Use Menus]] | Uses the `JMenu` method `addSeparator` to put separators in a menu. |
| [`ToolBarDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ToolBarDemo2) | [[Swing-组件-toolbar|How to Use Tool Bars]] | Uses the `JToolBar` method `addSeparator` to put space between two kinds of buttons. |

If you are programming in JavaFX, see [Using JavaFX UI Controls](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/separator.htm).
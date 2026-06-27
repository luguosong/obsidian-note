---
分类:
  - "网页裁剪"
标题: "How to Use Color Choosers (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/colorchooser.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Color Choosers (The Java™ Tutorials >        
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

How to Use Color Choosers

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

[[Swing-组件-buttongroup|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-combobox|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Color Choosers

Use the [`JColorChooser`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html) class to enable users to choose from a palette of colors. A color chooser is a component that you can place anywhere within your program GUI. The `JColorChooser` API also makes it easy to bring up a [[Swing-组件-dialog|dialog]] (modal or not) that contains a color chooser.

Here is a picture of an application that uses a color chooser to set the text color in a banner:

![A snapshot of ColorChooserDemo, which contains a standard color chooser.](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ColorChooserDemoMetal.png)

The source code for the program is in [`ColorChooserDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ColorChooserDemoProject/src/components/ColorChooserDemo.java).

The color chooser consists of everything within the box labeled **Choose Text Color**. This is what a standard color chooser looks like in the Java Look & Feel. It contains two parts, a tabbed pane and a preview panel. The three tabs in the tabbed pane select *chooser panels*. The *preview panel* below the tabbed pane displays the currently selected color.

Here is the code from the example that creates a `JColorChooser` instance and adds it to a container:

```java
public class ColorChooserDemo extends JPanel ... {
    public ColorChooserDemo() {
        super(new BorderLayout());
        banner = new JLabel("Welcome to the Tutorial Zone!",
                            JLabel.CENTER);
        banner.setForeground(Color.yellow);
        . . .
        tcc = new JColorChooser(banner.getForeground());
        . . .
        add(tcc, BorderLayout.PAGE_END);
    }
```java

The `JColorChooser` constructor in the previous code snippet takes a `Color` argument, which specifies the chooser's initially selected color. If you do not specify the initial color, then the color chooser displays `Color.white`. See the [`Color` API documentation](https://docs.oracle.com/javase/8/docs/api/java/awt/Color.html) for a list of color constants you can use.

A color chooser uses an instance of [`ColorSelectionModel`](https://docs.oracle.com/javase/8/docs/api/javax/swing/colorchooser/ColorSelectionModel.html) to contain and manage the current selection. The color selection model fires a change event whenever the user changes the color in the color chooser. The example program registers a change listener with the color selection model so that it can update the banner at the top of the window. The following code registers and implements the change listener:

```java
tcc.getSelectionModel().addChangeListener(this);
. . .
public void stateChanged(ChangeEvent e) {
    Color newColor = tcc.getColor();
    banner.setForeground(newColor);
}
```

See [[Swing-事件监听-changelistener|How to Write a Change Listener]] for general information about change listeners and change events.

A basic color chooser, like the one used in the example program, is sufficient for many programs. However, the color chooser API allows you to customize a color chooser by providing it with a preview panel of your own design, by adding your own chooser panels to it, or by removing existing chooser panels from the color chooser. Additionally, the `JColorChooser` class provides two methods that make it easy to use a color chooser within a dialog.

The rest of this section discusses these topics:

- [Another Example: ColorChooserDemo2](#advancedexample)
- [Showing a Color Chooser in a Dialog](#dialog)
- [Removing or Replacing the Preview Panel](#previewpanel)
- [Creating a Custom Chooser Panel](#chooserpanel)
- [The Color Chooser API](#api)
- [Examples that Use Color Choosers](#eg)

## Another Example: ColorChooserDemo2

Now let's turn our attention to [ColorChooserDemo2](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ColorChooserDemo2), a modified version of the previous demo program that uses more of the `JColorChooser` API.

Here is a picture of ColorChooserDemo2:

![A snapshot of ColorChooserDemo, which contains a custom color chooser.](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ColorChooserDemo2Metal.png)

This program customizes the banner text color chooser in these ways:

- Removes the preview panel
- Removes all of the default chooser panels
- Adds a custom chooser panel

[Removing or Replacing the Preview Panel](#previewpanel) covers the first customization. [Creating a Custom Chooser Panel](#chooserpanel) discusses the last two.

This program also adds a button that brings up a color chooser in a dialog, which you can use to set the banner background color.

## Showing a Color Chooser in a Dialog

The `JColorChooser` class provides two class methods to make it easy to use a color chooser in a dialog. ColorChooserDemo2 uses one of these methods, `showDialog`, to display the background color chooser when the user clicks the **Show Color Chooser...** button. Here is the single line of code from the example that brings up the background color chooser in a dialog:

```text
Color newColor = JColorChooser.showDialog(
                     ColorChooserDemo2.this,
                     "Choose Background Color",
                     banner.getBackground());
```

The first argument is the parent for the dialog, the second is the dialog title, and the third is the initially selected color.

The dialog disappears under three conditions: the user chooses a color and clicks the **OK** button, the user cancels the operation with the **Cancel** button, or the user dismisses the dialog with a frame control. If the user chooses a color, the `showDialog` method returns the new color. If the user cancels the operation or dismisses the window, the method returns `null`. Here is the code from the example that updates the banner background color according to the value returned by `showDialog`:

```text
if (newColor != null) {
    banner.setBackground(newColor);
}
```

The dialog created by `showDialog` is modal. If you want a non-modal dialog, you can use `JColorChooser` 's `createDialog` method to create the dialog. This method also lets you specify action listeners for the **OK** and **Cancel** buttons in the dialog window. Use `JDialog` 's `show` method to display the dialog created by this method. For an example that uses this method, see [[Swing-组件-table|Specifying Other Editors]] in the [[Swing-组件-table|How to Use Tables]] section.

## Removing or Replacing the Preview Panel

By default, the color chooser displays a preview panel. ColorChooserDemo2 removes the text color chooser's preview panel with this line of code:

```text
tcc.setPreviewPanel(new JPanel());
```

This effectively removes the preview panel because a plain `JPanel` has no size and no default view. To set the preview panel back to the default, use `null` as the argument to `setPreviewPanel`.

To provide a custom preview panel, you also use `setPreviewPanel`. The component you pass into the method should inherit from `JComponent`, specify a reasonable size, and provide a customized view of the current color. To get notified when the user changes the color in the color chooser, the preview panel must register as a change listener on the color chooser's color selection model as described [previously](#changelistener).

## Creating a Custom Chooser Panel

The default color chooser provides five chooser panels:

- Swatches — for choosing a color from a collection of swatches.
- [HSV](http://en.wikipedia.org/wiki/HSL_and_HSV) — for choosing a color using the Hue-Saturation-Value color representation. Prior to JDK 7, this was called HSB, for Hue-Saturation-Brightness.
- [HSL](http://en.wikipedia.org/wiki/HSL_and_HSV) — for choosing a color using the Hue-Saturation-Lightness color representation. This is new in JDK 7.
- [RGB](http://en.wikipedia.org/wiki/RGB_color_model) — for choosing a color using the Red-Green-Blue color model.
- [CMYK](http://en.wikipedia.org/wiki/Cmyk) — for choosing a color using the process color or four color model. This is new in JDK 7.

You can extend the default color chooser by adding chooser panels of your own design with `addChooserPanel`, or you can limit it by removing chooser panels with `removeChooserPanel`.

If you want to remove all of the default chooser panels and add one or more of your own, you can do this with a single call to `setChooserPanels`. ColorChooserDemo2 uses this method to replace the default chooser panels with an instance of [`CrayonPanel`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ColorChooserDemo2Project/src/components/CrayonPanel.java), a custom chooser panel. Here is the call to `setChooserPanels` from that example:

```text
//Override the chooser panels with our own.
AbstractColorChooserPanel panels[] = { new CrayonPanel() };
tcc.setChooserPanels(panels);
```

The code is straightforward: it creates an array containing the `CrayonPanel`. Next the code calls `setChooserPanels` to set the contents of the array as the color chooser's chooser panels.

`CrayonPanel` is a subclass of [`AbstractColorChooserPanel`](https://docs.oracle.com/javase/8/docs/api/javax/swing/colorchooser/AbstractColorChooserPanel.html) and overrides the five abstract methods defined in its superclass:

**`void buildChooser()`**

Creates the GUI that comprises the chooser panel. The example creates four toggle buttons — one for each crayon — and adds them to the chooser panel.

**`void updateChooser()`**

This method is called whenever the chooser panel is displayed. The implementation of this method selects the toggle button that represents the currently selected color.

```java
public void updateChooser() {
    Color color = getColorFromModel();
    if (Color.red.equals(color)) {
        redCrayon.setSelected(true);
    } else if (Color.yellow.equals(color)) {
        yellowCrayon.setSelected(true);
    } else if (Color.green.equals(color)) {
        greenCrayon.setSelected(true);
    } else if (Color.blue.equals(color)) {
        blueCrayon.setSelected(true);
    }
}
```text

**`String getDisplayName()`**

Returns the display name of the chooser panel. The name is used on the tab for the chooser panel. Here is the example `getDisplayName` method:

```java
public String getDisplayName() {
    return "Crayons";
}
```

**`Icon getSmallDisplayIcon()`**

Returns a small icon to represent this chooser panel. This is currently unused. Future versions of the color chooser might use this icon or the large one to represent this chooser panel in the display. The example implementation of this method returns `null`.

**`Icon getLargeDisplayIcon()`**

Returns a large icon to represent this chooser panel. This is currently unused. Future versions of the color chooser might use this icon or the small one to represent this chooser panel in the display. The example implementation of this method returns `null`.

## The Color Chooser API

The following tables list the commonly used `JColorChooser` constructors and methods. Other methods you might call are listed in the API tables in [[Swing-组件-jcomponent|The JComponent Class]]. The API for using color choosers falls into these categories:

- [Creating and Displaying the Color Chooser](#creating)
- [Customizing the Color Chooser GUI](#customizing)
- [Setting or Getting the Current Color](#selection)

| Method or Constructor | Purpose |
| --- | --- |
| [JColorChooser()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#JColorChooser--)   [JColorChooser(Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#JColorChooser-java.awt.Color-)   [JColorChooser(ColorSelectionModel)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#JColorChooser-javax.swing.colorchooser.ColorSelectionModel-) | Create a color chooser. The default constructor creates a color chooser with an initial color of `Color.white`. Use the second constructor to specify a different initial color. The `ColorSelectionModel` argument, when present, provides the color chooser with a color selection model. |
| [Color showDialog(Component, String, Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#showDialog-java.awt.Component-java.lang.String-java.awt.Color-) | Create and show a color chooser in a modal dialog. The `Component` argument is the parent of the dialog, the `String` argument specifies the dialog title, and the `Color` argument specifies the chooser's initial color. |
| [JDialog createDialog(Component, String,   boolean, JColorChooser, ActionListener,   ActionListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#createDialog-java.awt.Component-java.lang.String-boolean-javax.swing.JColorChooser-java.awt.event.ActionListener-java.awt.event.ActionListener-) | Create a dialog for the specified color chooser. As with `showDialog`, the `Component` argument is the parent of the dialog and the `String` argument specifies the dialog title. The other arguments are as follows: the `boolean` specifies whether the dialog is modal, the `JColorChooser` is the color chooser to display in the dialog, the first `ActionListener` is for the **OK** button, and the second is for the **Cancel** button. |

| Method | Purpose |
| --- | --- |
| [void setPreviewPanel(JComponent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#setPreviewPanel-javax.swing.JComponent-)   [JComponent getPreviewPanel()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#getPreviewPanel--) | Set or get the component used to preview the color selection. To remove the preview panel, use `new JPanel()` as an argument. To specify the default preview panel, use `null`. |
| [void setChooserPanels(AbstractColorChooserPanel\[\])](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#setChooserPanels-javax.swing.colorchooser.AbstractColorChooserPanel:A-)   [AbstractColorChooserPanel\[\] getChooserPanels()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#getChooserPanels--) | Set or get the chooser panels in the color chooser. |
| [void addChooserPanel(AbstractColorChooserPanel)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#addChooserPanel-javax.swing.colorchooser.AbstractColorChooserPanel-)   [AbstractColorChooserPanel removeChooserPanel(AbstractColorChooserPanel)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#removeChooserPanel-javax.swing.colorchooser.AbstractColorChooserPanel-) | Add a chooser panel to the color chooser or remove a chooser panel from it. |
| [void setDragEnabled(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#setDragEnabled-boolean-)   [boolean getDragEnabled()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#getDragEnabled--) | Set or get the `dragEnabled` property, which must be true to enable drag handling on this component. The default value is false. See [[Swing-拖放|Drag and Drop and Data Transfer]] for more details. |

| Method | Purpose |
| --- | --- |
| [void setColor(Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#setColor-java.awt.Color-)   [void setColor(int, int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#setColor-int-int-int-)   [void setColor(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#setColor-int-)   [Color getColor()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#getColor--) | Set or get the currently selected color. The three integer version of the `setColor` method interprets the three integers together as an RGB color. The single integer version of the `setColor` method divides the integer into four 8-bit bytes and interprets the integer as an RGB color as follows: |
| [void setSelectionModel(ColorSelectionModel)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#setSelectionModel-javax.swing.colorchooser.ColorSelectionModel-)   [ColorSelectionModel getSelectionModel()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JColorChooser.html#getSelectionModel--) | Set or get the selection model for the color chooser. This object contains the current selection and fires change events to registered listeners whenever the selection changes. |

## Examples that Use Color Choosers

This table shows the examples that use `JColorChooser` and where those examples are described.

| Example | Where Described | Notes |
| --- | --- | --- |
| [ColorChooserDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ColorChooserDemo) | This section | Uses a standard color chooser. |
| [ColorChooserDemo2](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ColorChooserDemo2) | This section | Uses one customized color chooser and one standard color chooser in a dialog created with `showDialog`. |
| [TableDialogEditDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TableDialogEditDemo) | [[Swing-组件-table|How to Use Tables]] | Shows how to use a color chooser as a custom cell editor in a table. The color chooser used by this example is created with `createDialog`. |
| [BasicDnD](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/index.html#BasicDnD) | [[Swing-intro|Introduction to DnD]] | Uses a color chooser that is not in a dialog; demonstrates default drag-and-drop capabilities of Swing components, including color choosers. |
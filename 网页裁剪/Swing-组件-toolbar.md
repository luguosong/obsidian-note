---
分类:
  - "网页裁剪"
标题: "How to Use Tool Bars (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/toolbar.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Tool Bars (The Java™ Tutorials >        
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

How to Use Tool Bars

[[Swing-组件-tooltip|How to Use Tool Tips]]

[[Swing-组件-tree|How to Use Trees]]

[[Swing-组件-html|How to Use HTML in Swing Components]]

[[Swing-组件-model|How to Use Models]]

[[Swing-组件-icon|How to Use Icons]]

[[Swing-组件-border|How to Use Borders]]

[[Swing-组件-problems|Solving Common Component Problems]]

[[Swing-组件-textfield|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-tooltip|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Tool Bars

A [`JToolBar`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html) is a container that groups several components — usually [[Swing-按钮|buttons]] with icons — into a row or column. Often, tool bars provide easy access to functionality that is also in [[Swing-组件-menu|menus]]. [[Swing-其他特性-action|How to Use Actions]] describes how to provide the same functionality in menu items and tool bar buttons.

The following images show an application named `ToolBarDemo` that contains a tool bar above a text area. Click the Launch button to run ToolBarDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run it yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ToolBarDemo).

  

![ToolBarDemo, with the tool bar in an initial north position](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ToolBarDemo.png)

By default, the user can drag the tool bar to another edge of its container or out into a window of its own. The next figure shows how the application looks after the user has dragged the tool bar to the right edge of its container.

![ToolBarDemo, after the tool bar is dragged to the east](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ToolBarDemo-2.png)

For the drag behavior to work correctly, the tool bar must be in a container that uses the [[Swing-布局-border|`BorderLayout`]] layout manager. The component that the tool bar affects is generally in the center of the container. The tool bar must be the only other component in the container, and it must not be in the center.

The next figure shows how the application looks after the user has dragged the tool bar outside its window.

![ToolBarDemo, after the tool bar is dragged out into its own window](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ToolBarDemo-3.png)

The following code creates the tool bar and adds it to a container. You can find the entire program in [`ToolBarDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ToolBarDemoProject/src/components/ToolBarDemo.java).

```java
public class ToolBarDemo extends JPanel
                         implements ActionListener {
    ...
    public ToolBarDemo() {
        super(new BorderLayout());
        ...
        JToolBar toolBar = new JToolBar("Still draggable");
        addButtons(toolBar);
        ...
        setPreferredSize(new Dimension(450, 130));
        add(toolBar, BorderLayout.PAGE_START);
        add(scrollPane, BorderLayout.CENTER);
    }
    ...
}
```java

This code positions the tool bar above the scroll pane by placing both components in a panel controlled by a border layout, with the tool bar in the `PAGE_START` position and the scroll pane in the `CENTER` position. Because the scroll pane is in the center and no other components except the tool bar are in the container, by default the tool bar can be dragged to other edges of the container. The tool bar can also be dragged out into its own window, in which case the window has the title "Still draggable", as specified by the `JToolBar` constructor.

## Creating Tool Bar Buttons

The buttons in the tool bar are ordinary `JButton` instances that use images from the Java Look and Feel Graphics Repository. Use images from the [Java Look and Feel Graphics Repository](http://www.oracle.com/technetwork/java/index-138612.html) if your tool bar has the Java look and feel.

Here is the code that creates the buttons and adds them to the tool bar.

```java
protected void addButtons(JToolBar toolBar) {
    JButton button = null;

    //first button
    button = makeNavigationButton("Back24", PREVIOUS,
                                  "Back to previous something-or-other",
                                  "Previous");
    toolBar.add(button);

    //second button
    button = makeNavigationButton("Up24", UP,
                                  "Up to something-or-other",
                                  "Up");
    toolBar.add(button);

    ...//similar code for creating and adding the third button...
}

protected JButton makeNavigationButton(String imageName,
                                       String actionCommand,
                                       String toolTipText,
                                       String altText) {
    //Look for the image.
    String imgLocation = "images/"
                         + imageName
                         + ".gif";
    URL imageURL = ToolBarDemo.class.getResource(imgLocation);

    //Create and initialize the button.
    JButton button = new JButton();
    button.setActionCommand(actionCommand);
    button.setToolTipText(toolTipText);
    button.addActionListener(this);

    if (imageURL != null) {                      //image found
        button.setIcon(new ImageIcon(imageURL, altText));
    } else {                                     //no image found
        button.setText(altText);
        System.err.println("Resource not found: " + imgLocation);
    }

    return button;
}
```

The first call to `makeNavigationButton` creates the image for the first button, using the 24x24 "Back" navigation image in the graphics repository.

Besides finding the image for the button, the `makeNavigationButton` method also creates the button, sets the strings for its action command and tool tip text, and adds the action listener for the button. If the image is missing, the method prints an error message and adds text to the button, so that the button is still usable.

---

**Note:**

If any buttons in your tool bar duplicate the functionality of other components, such as menu items, you should probably create and add the tool bar buttons as described in [[Swing-其他特性-action|How to Use Actions]].

---

## Customizing Tool Bars

By adding a few lines of code to the preceding example, we can demonstrate some more tool bar features:

- Using `setFloatable(false)` to make a tool bar immovable.
- Using `setRollover(true)` to visually indicate tool bar buttons when the user passes over them with the cursor.
- Adding a separator to a tool bar.
- Adding a non-button component to a tool bar.

You can see these features by running ToolBarDemo2. Click the Launch button to run ToolBarDemo2 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run it yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ToolBarDemo2).

You can find the entire code for this program in [`ToolBarDemo2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ToolBarDemo2Project/src/components/ToolBarDemo2.java). Below you can see a picture of a new UI using these customized features.

![ToolBarDemo2 shows a tool bar with a variety of components](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ToolBarDemo2.png)

Because the tool bar can no longer be dragged, it no longer has bumps at its left edge. Here is the code that turns off dragging:

```text
toolBar.setFloatable(false);
```

The tool bar is in rollover mode, so the button under the cursor has a visual indicator. The kind of visual indicator depends on the look and feel. For example, the Metal look and feel uses a gradient effect to indicate the button under the cursor while other types of look and feel use borders for this purpose. Here is the code that sets rollover mode:

```text
toolBar.setRollover(true);
```

Another visible difference in the example above is that the tool bar contains two new components, which are preceded by a blank space called a [[Swing-组件-separator|separator]]. Here is the code that adds the separator:

```text
toolBar.addSeparator();
```

Here is the code that adds the new components:

```text
//fourth button
button = new JButton("Another button");
...
toolBar.add(button);

//fifth component is NOT a button!
JTextField textField = new JTextField("A text field");
...
toolBar.add(textField);
```

You can easily make the tool bar components either top-aligned or bottom-aligned instead of centered by invoking the `setAlignmentY` method. For example, to align the tops of all the components in a tool bar, invoke `setAlignmentY(TOP_ALIGNMENT)` on each component. Similarly, you can use the `setAlignmentX` method to specify the alignment of components when the tool bar is vertical. This layout flexibility is possible because tool bars use `BoxLayout` to position their components. For more information, see [[Swing-布局-box|How to Use BoxLayout]].

## The Tool Bar API

The following table lists the commonly used [`JToolBar`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html) constructors and methods. Other methods you might call are listed in the API tables in [[Swing-组件-jcomponent|The JComponent Class]].

| Method or Constructor | Purpose |
| --- | --- |
| [JToolBar()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html#JToolBar--)   [JToolBar(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html#JToolBar-int-)   [JToolBar(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html#JToolBar-java.lang.String-)   [JToolBar(String, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html#JToolBar-java.lang.String-int-) | Creates a tool bar. The optional int parameter lets you specify the orientation; the default is `HORIZONTAL`. The optional `String` parameter allows you to specify the title of the tool bar's window if it is dragged outside of its container. |
| [Component add(Component)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#add-java.awt.Component-) | Adds a component to the tool bar.  You can associate a button with an `Action` using the `setAction(Action)` method defined by the `AbstractButton`. |
| [void addSeparator()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html#addSeparator--) | Adds a separator to the end of the tool bar. |
| [void setFloatable(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html#setFloatable-boolean-)   [boolean isFloatable()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html#isFloatable--) | The floatable property is true by default, and indicates that the user can drag the tool bar out into a separate window. To turn off tool bar dragging, use `toolBar.setFloatable(false)`. Some types of look and feel might ignore this property. |
| [void setRollover(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html#setRollover-boolean-)   [boolean isRollover()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolBar.html#isRollover--) | The rollover property is false by default. To make tool bar buttons be indicated visually when the user passes over them with the cursor, set this property to true. Some types of look and feel might ignore this property. |

## Examples That Use Tool Bars

This table lists examples that use `JToolBar` and points to where those examples are described.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`ToolBarDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ToolBarDemo) | This page | A basic tool bar with icon-only buttons. |
| [`ToolBarDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ToolBarDemo2) | This page | Demonstrates a non-floatable tool bar in rollover mode that contains a separator and a non-button component. |
| [`ActionDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#ActionDemo) | [[Swing-其他特性-action|How to Use Actions]] | Implements a tool bar using `Action` objects. |
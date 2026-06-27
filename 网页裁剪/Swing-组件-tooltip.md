---
分类:
  - "网页裁剪"
标题: "How to Use Tool Tips (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/tooltip.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Tool Tips (The Java™ Tutorials >        
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

How to Use Tool Tips

[[Swing-组件-tree|How to Use Trees]]

[[Swing-组件-html|How to Use HTML in Swing Components]]

[[Swing-组件-model|How to Use Models]]

[[Swing-组件-icon|How to Use Icons]]

[[Swing-组件-border|How to Use Borders]]

[[Swing-组件-problems|Solving Common Component Problems]]

[[Swing-组件-toolbar|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-tree|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Tool Tips

Creating a tool tip for any `JComponent` object is easy. Use the `setToolTipText` method to set up a tool tip for the component. For example, to add tool tips to three buttons, you add only three lines of code:

```text
b1.setToolTipText("Click this button to disable the middle button.");
b2.setToolTipText("This middle button does not react when you click it.");
b3.setToolTipText("Click this button to enable the middle button.");
```

When the user of the program pauses with the cursor over any of the program's buttons, the tool tip for the button comes up. You can see this by running the `ButtonDemo` example, which is explained in [[Swing-按钮|How to Use Buttons, Check Boxes, and Radio Buttons]]. Here is a picture of the tool tip that appears when the cursor pauses over the left button in the `ButtonDemo` example.

![ButtonDemo showing a tool tip.](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ButtonDemo-TT.png)

For components such as tabbed panes that have multiple parts, it often makes sense to vary the tool tip text to reflect the part of the component under the cursor. For example, a tabbed pane might use this feature to explain what will happen when you click the tab under the cursor. When you implement a tabbed pane, you can specify the tab-specific tool tip text in an argument passed to the `addTab` or `setToolTipTextAt` method.

Even in components that have no API for setting part-specific tool tip text, you can generally do the job yourself. If the component supports renderers, then you can set the tool tip text on a custom renderer. The [[Swing-组件-table|table]] and [[Swing-组件-tree|tree]] sections provide examples of tool tip text determined by a custom renderer. An alternative that works for all `JComponent` s is creating a subclass of the component and overriding its `getToolTipText(MouseEvent)` method.

## The Tool Tip API

Most of the API you need in order to set up tool tips belongs to the `JComponent` class, and thus is inherited by most Swing components. More tool tip API can be found in individual classes such as `JTabbedPane`. In general, those APIs are sufficient for specifying and displaying tool tips; you usually do not need to deal directly with the implementing classes [`JToolTip`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToolTip.html) and [`ToolTipManager`](https://docs.oracle.com/javase/8/docs/api/javax/swing/ToolTipManager.html).

The following table lists the tool tip API in the `JComponent` class. For information on individual components' support for tool tips, see the how-to section for the component in question.

| Method | Purpose |
| --- | --- |
| [setToolTipText(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setToolTipText-java.lang.String-) | If the specified string is not null, then this method registers the component as having a tool tip and, when displayed, gives the tool tip the specified text. If the argument is null, then this method turns off the tool tip for this component. |
| [String getToolTipText()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#getToolTipText--) | Returns the string that was previously specified with `setToolTipText`. |
| [String getToolTipText(MouseEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#getToolTipText-java.awt.event.MouseEvent-) | By default, returns the same value returned by `getToolTipText()`. Multi-part components such as [[Swing-组件-tabbedpane|`JTabbedPane`]], [[Swing-组件-table|`JTable`]], and [[Swing-组件-tree|`JTree`]] override this method to return a string associated with the mouse event location. For example, each tab in a tabbed pane can have different tool tip text. |
| [Point getToolTipLocation(MouseEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#getToolTipLocation-java.awt.event.MouseEvent-) | Returns the location (in the receiving component's coordinate system) where the upper left corner of the component's tool tip appears. The argument is the event that caused the tool tip to be shown. The default return value is null, which tells the Swing system to choose a location. |

## Examples That Use Tool Tips

This table lists some examples that use tool tips and points to where those examples are described.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`ButtonDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ButtonDemo) | This section and [[Swing-按钮|How to Use Buttons, Check Boxes, and Radio Buttons]] | Uses a tool tip to provide instructions for a button. |
| [`IconDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#IconDemo) | [[Swing-组件-icon|How to Use Icons]] | Uses a tool tip in a label to provide name and size information for an image. |
| [`TabbedPaneDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TabbedPaneDemo) | [[Swing-组件-tabbedpane|How to Use Tabbed Panes]] | Uses tab-specific tool tip text specified in an argument to the `addTab` method. |
| [`TableRenderDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TableRenderDemo) | [[Swing-组件-table|Specifying Tool Tips for Cells]] | Adds tool tips to a table using a renderer. |
| [`TableToolTipsDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TableToolTipsDemo) | [[Swing-组件-table|Specifying Tool Tips for Cells]], [[Swing-组件-table|Specifying Tool Tips for Column Headers]] | Adds tool tips to a table using various techniques. |
| [`TreeIconDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TreeIconDemo2) | [[Swing-组件-tree|Customizing a Tree's Display]] | Adds tool tips to a tree using a custom renderer. |
| [`ActionDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#ActionDemo) | [[Swing-其他特性-action|How to Use Actions]] | Adds tool tips to buttons that have been created using `Action` s. |
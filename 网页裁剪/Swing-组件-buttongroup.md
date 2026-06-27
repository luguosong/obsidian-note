---
分类:
  - "网页裁剪"
标题: "How to Use the ButtonGroup Component (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/buttongroup.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use the ButtonGroup Component (The Java™ Tutorials >        
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

How to Use the ButtonGroup Component

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

[[Swing-按钮|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-colorchooser|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use the ButtonGroup Component

The `ButtonGroup` component manages the selected/unselected state for a set of buttons. For the group, the `ButtonGroup` instance guarantees that only one button can be selected at a time.

Initially, all buttons managed by a `ButtonGroup` instance are unselected.

## How to Use ButtonGroup Features

You can use `ButtonGroup` with any set of objects that inherit from `AbstractButton`. Typically a button group contains instances of `JRadioButton, JRadioButtonMenuItem`, or `JToggleButton`. It would not make sense to put an instance of `JButton` or `JMenuItem` in a button group because `JButton` and `JMenuItem` do not implement the select/deselect button state.

In general, you will typically follow these steps to write code that uses a `ButtonGroup` component.

1. Subclass `JFrame`
2. Call `ContextPane` together with a layout manager
3. Declare and configure a set of radio buttons or toggle buttons
4. Instantiate a `ButtonGroup` object
5. Call the `add` method on that buttongroup object in order to add each button to the group.

For details and a code example, see [[Swing-按钮|How to Use Radio Buttons]]. It shows how to use a `ButtonGroup` component to group a set of RadioButtons set into a JPanel.

## The ButtonGroup API

| Constructor or Method | Purpose |
| --- | --- |
| [ButtonGroup()](https://docs.oracle.com/javase/8/docs/api/javax/swing/ButtonGroup.html#ButtonGroup--) | Create a `ButtonGroup` instance. |
| [void add(AbstractButton)](https://docs.oracle.com/javase/8/docs/api/javax/swing/ButtonGroup.html#add-javax.swing.AbstractButton-)   [void remove(AbstractButton)](https://docs.oracle.com/javase/8/docs/api/javax/swing/ButtonGroup.html#remove-javax.swing.AbstractButton-) | Add a button to the group, or remove a button from the group. |
| [public ButtonGroup getGroup()](https://docs.oracle.com/javase/8/docs/api/javax/swing/DefaultButtonModel.html#getGroup--)   *(in `DefaultButtonModel`)* | Get the `ButtonGroup`, if any, that controls a button. For example:   `ButtonGroup group = ((DefaultButtonModel)button.getModel()).getGroup();` |
| [public ButtonGroup clearSelection()](https://docs.oracle.com/javase/8/docs/api/javax/swing/ButtonGroup.html#ButtonGroup--) | Clears the state of selected buttons in the ButtonGroup. None of the buttons in the ButtonGroup are selected. |

## ButtonGroup Examples

The following demonstration application uses the ButtonGroup component to group radio buttons displaying on a Window.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`RadioButtonDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#RadioButtonDemo) | [[Swing-按钮|How to Use Radio Buttons]] | Uses radio buttons to determine which of five images it should display. |
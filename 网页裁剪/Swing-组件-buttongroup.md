Documentation

[Using Top-Level Containers](https://docs.oracle.com/javase/tutorial/uiswing/components/toplevel.html)

[The JComponent Class](https://docs.oracle.com/javase/tutorial/uiswing/components/jcomponent.html)

[Using Text Components](https://docs.oracle.com/javase/tutorial/uiswing/components/text.html)

[Text Component Features](https://docs.oracle.com/javase/tutorial/uiswing/components/generaltext.html)

[The Text Component API](https://docs.oracle.com/javase/tutorial/uiswing/components/textapi.html)

[How to Use Various Components](https://docs.oracle.com/javase/tutorial/uiswing/components/componentlist.html)

[How to Make Applets](https://docs.oracle.com/javase/tutorial/uiswing/components/applet.html)

[How to Use Buttons, Check Boxes, and Radio Buttons](https://docs.oracle.com/javase/tutorial/uiswing/components/button.html)

How to Use the ButtonGroup Component

[How to Use Color Choosers](https://docs.oracle.com/javase/tutorial/uiswing/components/colorchooser.html)

[How to Use Combo Boxes](https://docs.oracle.com/javase/tutorial/uiswing/components/combobox.html)

[How to Make Dialogs](https://docs.oracle.com/javase/tutorial/uiswing/components/dialog.html)

[How to Use Editor Panes and Text Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/editorpane.html)

[How to Use File Choosers](https://docs.oracle.com/javase/tutorial/uiswing/components/filechooser.html)

[How to Use Formatted Text Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/formattedtextfield.html)

[How to Make Frames (Main Windows)](https://docs.oracle.com/javase/tutorial/uiswing/components/frame.html)

[How to Use Internal Frames](https://docs.oracle.com/javase/tutorial/uiswing/components/internalframe.html)

[How to Use Labels](https://docs.oracle.com/javase/tutorial/uiswing/components/label.html)

[How to Use Layered Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/layeredpane.html)

[How to Use Lists](https://docs.oracle.com/javase/tutorial/uiswing/components/list.html)

[How to Use Menus](https://docs.oracle.com/javase/tutorial/uiswing/components/menu.html)

[How to Use Panels](https://docs.oracle.com/javase/tutorial/uiswing/components/panel.html)

[How to Use Password Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/passwordfield.html)

[How to Use Progress Bars](https://docs.oracle.com/javase/tutorial/uiswing/components/progress.html)

[How to Use Root Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/rootpane.html)

[How to Use Scroll Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/scrollpane.html)

[How to Use Separators](https://docs.oracle.com/javase/tutorial/uiswing/components/separator.html)

[How to Use Sliders](https://docs.oracle.com/javase/tutorial/uiswing/components/slider.html)

[How to Use Spinners](https://docs.oracle.com/javase/tutorial/uiswing/components/spinner.html)

[How to Use Split Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/splitpane.html)

[How to Use Tabbed Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/tabbedpane.html)

[How to Use Tables](https://docs.oracle.com/javase/tutorial/uiswing/components/table.html)

[How to Use Text Areas](https://docs.oracle.com/javase/tutorial/uiswing/components/textarea.html)

[How to Use Text Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/textfield.html)

[How to Use Tool Bars](https://docs.oracle.com/javase/tutorial/uiswing/components/toolbar.html)

[How to Use Tool Tips](https://docs.oracle.com/javase/tutorial/uiswing/components/tooltip.html)

[How to Use Trees](https://docs.oracle.com/javase/tutorial/uiswing/components/tree.html)

[How to Use HTML in Swing Components](https://docs.oracle.com/javase/tutorial/uiswing/components/html.html)

[How to Use Models](https://docs.oracle.com/javase/tutorial/uiswing/components/model.html)

[How to Use Icons](https://docs.oracle.com/javase/tutorial/uiswing/components/icon.html)

[How to Use Borders](https://docs.oracle.com/javase/tutorial/uiswing/components/border.html)

[Solving Common Component Problems](https://docs.oracle.com/javase/tutorial/uiswing/components/problems.html)

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/components/button.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/uiswing/components/colorchooser.html)

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

For details and a code example, see [How to Use Radio Buttons](https://docs.oracle.com/javase/tutorial/uiswing/components/button.html#radiobutton). It shows how to use a `ButtonGroup` component to group a set of RadioButtons set into a JPanel.

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
| [`RadioButtonDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#RadioButtonDemo) | [How to Use Radio Buttons](https://docs.oracle.com/javase/tutorial/uiswing/components/button.html#radiobutton) | Uses radio buttons to determine which of five images it should display. |
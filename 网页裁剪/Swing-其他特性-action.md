---
分类:
  - "网页裁剪"
标题: "How to Use Actions (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Other Swing Features)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/misc/action.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Actions (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Other Swing Features)

Documentation

[[Swing-其他特性-desktop|How to Integrate with the Desktop Class]]

[[Swing-其他特性-trans_shaped_windows|How to Create Translucent and Shaped Windows]]

[[Swing-其他特性-jlayer|How to Decorate Components with the JLayer Class]]

How to Use Actions

[[Swing-其他特性-timer|How to Use Swing Timers]]

[[Swing-其他特性-access|How to Support Assistive Technologies]]

[[Swing-其他特性-focus|How to Use the Focus Subsystem]]

[[Swing-其他特性-keybinding|How to Use Key Bindings]]

[[Swing-其他特性-modality|How to Use Modality in Dialogs]]

[[Swing-其他特性-printtable|How to Print Tables]]

[[Swing-其他特性-printtext|How to Print Text]]

[[Swing-其他特性-splashscreen|How to Create a Splash Screen]]

[[Swing-其他特性-systemtray|How to Use the System Tray]]

[[Swing-其他特性-problems|Solving Common Problems Using Other Swing Features]]

[[Swing-其他特性-jlayer|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-其他特性-timer|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Actions

An [`Action`](https://docs.oracle.com/javase/8/docs/api/javax/swing/Action.html) can be used to separate functionality and state from a component. For example, if you have two or more components that perform the same function, consider using an `Action` object to implement the function. An `Action` object is an [[Swing-事件监听-actionlistener|action listener]] that provides not only action-event handling, but also centralized handling of the state of action-event-firing components such as [[Swing-组件-toolbar|tool bar buttons]], [[Swing-组件-menu|menu items]], [[Swing-按钮|common buttons]], and [[Swing-组件-textfield|text fields]]. The state that an action can handle includes text, icon, mnemonic, enabled, and selected status.

You typically attach an action to a component using the `setAction` method. Here's what happens when `setAction` is invoked on a component:

- The component's state is updated to match the state of the `Action`. For example, if the `Action` 's text and icon values were set, the component's text and icon are set to those values.
- The `Action` object is registered as an action listener on the component.
- If the state of the `Action` changes, the component's state is updated to match the `Action`. For example, if you change the enabled status of the action, all components it's attached to change their enabled states to match the action.

Here's an example of creating a tool-bar button and menu item that perform the same function:

```text
Action leftAction = new LeftAction(); //LeftAction code is shown later
...
button = new JButton(leftAction)
...
menuItem = new JMenuItem(leftAction);
```

To create an `Action` object, you generally create a subclass of [`AbstractAction`](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractAction.html) and then instantiate it. In your subclass, you must implement the `actionPerformed` method to react appropriately when the action event occurs. Here's an example of creating and instantiating an `AbstractAction` subclass:

```java
leftAction = new LeftAction("Go left", anIcon,
             "This is the left button.",
             new Integer(KeyEvent.VK_L));
...
class LeftAction extends AbstractAction {
    public LeftAction(String text, ImageIcon icon,
                      String desc, Integer mnemonic) {
        super(text, icon);
        putValue(SHORT_DESCRIPTION, desc);
        putValue(MNEMONIC_KEY, mnemonic);
    }
    public void actionPerformed(ActionEvent e) {
        displayResult("Action for first button/menu item", e);
    }
}

When the action created by the preceding code is attached to a button and a menu item, the button and menu item display the text and icon associated with the action. The `L` character is used for mnemonics on the button and menu item, and their tool-tip text is set to the `SHORT_DESCRIPTION` string followed by a representation of the mnemonic key.

For example, we have provided a simple example, [`ActionDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/ActionDemoProject/src/misc/ActionDemo.java), which defines three actions. Each action is attached to a button and a menu item. Thanks to the mnemonic values set for each button's action, the key sequence `Alt-L` activates the left button, `Alt-M` the middle button, and `Alt-R` the right button. The tool tip for the left button displays *This is the left button. Alt-L.* All of this configuration occurs automatically, without the program making explicit calls to set the mnemonic or tool-tip text. As we'll show later, the program *does* make calls to set the button text, but only to avoid using the values already set by the actions.

![A snapshot of ActionDemo, which uses actions to coordinate menus and buttons.](https://docs.oracle.com/javase/tutorial/figures/uiswing/misc/ActionDemo.png)

---

**Try this:**
1. Click the Launch button to run ActionDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Or, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#ActionDemo).
2. Choose the top item from the left menu (**Menu > Go left**).  
	The text area displays some text identifying both the event source and the action listener that received the event.
3. Click the leftmost button in the tool bar.  
	The text area again displays information about the event. Note that although the source of the events is different, both events were detected by the same action listener: the `Action` object attached to the components.
4. Choose the top item from the **Action State** menu.  
	This disables the "Go left" `Action` object, which in turn disables its associated menu item and button.

---

Here is what the user sees when the "Go left" action is disabled:

| ![A snapshot of ActionDemo when ](https://docs.oracle.com/javase/tutorial/figures/uiswing/misc/ActionDemo-a.png) |  |
| --- | --- |

Here's the code that disables the "Go left" action:

boolean selected = ...//true if the action should be enabled;
                      //false, otherwise
leftAction.setEnabled(selected);

After you create components using an `Action`, you might well need to customize them. For example, you might want to customize the appearance of one of the components by adding or deleting the icon or text. For example, [`ActionDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/ActionDemoProject/src/misc/ActionDemo.java) has no icons in its menus, and no text in its buttons. Here's the code that accomplishes this:

menuItem = new JMenuItem();
menuItem.setAction(leftAction);
menuItem.setIcon(null); //arbitrarily chose not to use icon in menu
...
button = new JButton();
button.setAction(leftAction);
button.setText(""); //an icon-only button
```

We chose to create an icon-only button and a text-only menu item from the same action by setting the icon property to `null` and the text to an empty string. However, if a property of the `Action` changes, the widget may try to reset the icon and text from the `Action` again.

## The Action API

The following tables list the commonly used `Action` constructors and methods. The API for using `Action` objects falls into three categories:

- [Components that Support set/getAction](#actioncomponents)
- [Creating and Using an AbstractAction](#actionapi)
- [Action Properties](#properties)

| Class | Purpose |
| --- | --- |
| [AbstractButton](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setAction-javax.swing.Action-)   [JComboBox](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#setAction-javax.swing.Action-)   [JTextField](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#setAction-javax.swing.Action-) | These components and their subclasses may have an action directly assigned to them via `setAction`. For further information about components that are often associated with actions, see the sections on [[Swing-组件-toolbar|tool bar buttons]], [[Swing-组件-menu|menu items]], [[Swing-按钮|common buttons]], and [[Swing-组件-textfield|text fields]]. For details on which properties each component takes from the `Action`, see the API documentation for the relevant class's [`configurePropertiesFromAction`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenuItem.html#configurePropertiesFromAction-javax.swing.Action-) method. Also refer to the [`buttonActions`](https://docs.oracle.com/javase/8/docs/api/javax/swing/Action.html#buttonActions) table. |

| Constructor or Method | Purpose |
| --- | --- |
| [AbstractAction()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractAction.html#AbstractAction--)   [AbstractAction(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractAction.html#AbstractAction-java.lang.String-)   [AbstractAction(String, Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractAction.html#AbstractAction-java.lang.String-javax.swing.Icon-) | Create an `Action` object. Through arguments, you can specify the text and icon to be used in the components that the action is attached to. |
| [void setEnabled(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractAction.html#setEnabled-boolean-)   [boolean isEnabled()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractAction.html#isEnabled--) | Set or get whether the components the action controls are enabled. Invoking `setEnabled(false)` disables all the components that the action controls. Similarly, invoking `setEnabled(true)` enables the action's components. |
| [void putValue(String, Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractAction.html#putValue-java.lang.String-java.lang.Object-)   [Object getValue(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractAction.html#getValue-java.lang.String-) | Set or get an object associated with a specified key. Used for setting and getting properties associated with an action. |

Action Properties

This table defines the properties that can be set on an action. The second column lists which components automatically use the properties (and what method is specifically called). For example, setting the `ACCELERATOR_KEY` on an action that is then attached to a menu item, means that `JMenuItem.setAccelerator(KeyStroke)` is called automatically.

| Property | Auto-Applied to:   Class   *(Method Called)* | Purpose |
| --- | --- | --- |
| [ACCELERATOR\_KEY](https://docs.oracle.com/javase/8/docs/api/javax/swing/Action.html#ACCELERATOR_KEY) | `JMenuItem`   (*setAccelerator*) | The `KeyStroke` to be used as the accelerator for the action. For a discussion of accelerators versus mnemonics, see [[Swing-组件-menu|Enabling Keyboard Operation.]] |
| [ACTION\_COMMAND\_KEY](https://docs.oracle.com/javase/8/docs/api/javax/swing/Action.html#ACTION_COMMAND_KEY) | `AbstractButton`, `JCheckBox`, `JRadioButton`   (*setActionCommand*) | The command string associated with the `ActionEvent`. |
| [LONG\_DESCRIPTION](https://docs.oracle.com/javase/8/docs/api/javax/swing/Action.html#LONG_DESCRIPTION) | None | The longer description for the action. Can be used for context-sensitive help. |
| [MNEMONIC\_KEY](https://docs.oracle.com/javase/8/docs/api/javax/swing/Action.html#MNEMONIC_KEY) | `AbstractButton`, `JMenuItem`, `JCheckBox`, `JRadioButton`   (*setMnemonic*) | The mnemonic for the action. For a discussion of accelerators versus mnemonics, see [[Swing-组件-menu|Enabling Keyboard Operation.]] |
| [NAME](https://docs.oracle.com/javase/8/docs/api/javax/swing/Action.html#NAME) | `AbstractButton`, `JMenuItem`, `JCheckBox`, `JRadioButton`   (*setText*) | The name of the action. You can set this property when creating the action using the `AbstractAction(String)` or `AbstractAction(String, Icon)` constructors. |
| [SHORT\_DESCRIPTION](https://docs.oracle.com/javase/8/docs/api/javax/swing/Action.html#SHORT_DESCRIPTION) | `AbstractButton`, `JCheckBox`, `JRadioButton`   (*setToolTipText*) | The short description of the action. |
| [SMALL\_ICON](https://docs.oracle.com/javase/8/docs/api/javax/swing/Action.html#SMALL_ICON) | `AbstractButton`, `JMenuItem`   (*setIcon*) | The icon for the action used in the tool bar or on a button. You can set this property when creating the action using the `AbstractAction(name, icon)` constructor. |

## Examples that Use Actions

The following examples use `Action` objects.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`ActionDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#ActionDemo) | This section | Uses actions to bind buttons and menu items to the same function. |
| [`TextComponentDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextComponentDemo) | [[Swing-组件-generaltext|Text Component Features]] | Uses text actions to create menu items for text editing commands, such as cut, copy, and paste, and to bind key strokes to caret movement. Also implements custom `AbstractAction` subclasses to implement undo and redo. The text action discussion begins in [[Swing-组件-generaltext|Concepts: About Editor Kits]]. |
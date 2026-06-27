---
分类:
  - "网页裁剪"
标题: "How to Use Buttons, Check Boxes, and Radio Buttons (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/button.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Buttons, Check Boxes, and Radio Buttons (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)

Documentation

[[Swing-组件-toplevel|Using Top-Level Containers]]

[[Swing-组件-jcomponent|The JComponent Class]]

[[Swing-组件-text|Using Text Components]]

[[Swing-组件-generaltext|Text Component Features]]

[[Swing-组件-textapi|The Text Component API]]

[[Swing-组件-componentlist|How to Use Various Components]]

[[Swing-组件-applet|How to Make Applets]]

How to Use Buttons, Check Boxes, and Radio Buttons

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

[[Swing-组件-html|How to Use HTML in Swing Components]]

[[Swing-组件-model|How to Use Models]]

[[Swing-组件-icon|How to Use Icons]]

[[Swing-组件-border|How to Use Borders]]

[[Swing-组件-problems|Solving Common Component Problems]]

[[Swing-组件-applet|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-buttongroup|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Buttons, Check Boxes, and Radio Buttons

To create a button, you can instantiate one of the many classes that descend from the [`AbstractButton`](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html) class. The following table shows the Swing-defined `AbstractButton` subclasses that you might want to use:

| Class | Summary | Where Described |
| --- | --- | --- |
| [`JButton`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JButton.html) | A common button. | [How to Use the Common Button API](#abstractbutton) and [How to Use JButton Features](#jbutton) |
| [`JCheckBox`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBox.html) | A check box button. | [How to Use Check Boxes](#checkbox) |
| [`JRadioButton`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButton.html) | One of a group of radio buttons. | [How to Use Radio Buttons](#radiobutton) |
| [`JMenuItem`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenuItem.html) | An item in a menu. | [[Swing-组件-menu|How to Use Menus]] |
| [`JCheckBoxMenuItem`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html) | A menu item that has a check box. | [[Swing-组件-menu|How to Use Menus]] and [How to Use Check Boxes](#checkbox) |
| [`JRadioButtonMenuItem`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html) | A menu item that has a radio button. | [[Swing-组件-menu|How to Use Menus]] and [How to Use Radio Buttons](#radiobutton) |
| [`JToggleButton`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToggleButton.html) | Implements toggle functionality inherited by `JCheckBox` and `JRadioButton`. Can be instantiated or subclassed to create two-state buttons. | Used in some [examples](#tbeg) |

---

**Note:** If you want to collect a group of buttons into a row or column, then you should check out [[Swing-组件-toolbar|tool bars]].

---

First, this section explains the basic button API that `AbstractButton` defines — and thus all Swing buttons have in common. Next, it describes the small amount of API that `JButton` adds to `AbstractButton`. After that, this section shows you how to use specialized API to implement check boxes and radio buttons.

## How to Use the Common Button API

Here is a picture of an application that displays three buttons:

![[Swing--ButtonDemoMetal.webp]]

---

**Try this:**
1. Click the Launch button to run the Button Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ButtonDemo).
2. Click the left button.  
	It disables the middle button (and itself, since it is no longer useful) and enables the right button.
3. Click the right button.  
	It enables the middle button and the left button, and disables itself.

---

As the `ButtonDemo` example shows, a Swing button can display both text and an image. In `ButtonDemo`, each button has its text in a different place, relative to its image. The underlined letter in each button's text shows the *mnemonic* — the keyboard alternative — for each button. In most look and feels, the user can click a button by pressing the Alt key and the mnemonic. For example, Alt-M would click the Middle button in ButtonDemo.

When a button is disabled, the look and feel automatically generates the button's disabled appearance. However, you could provide an image to be substituted for the normal image. For example, you could provide gray versions of the images used in the left and right buttons.

How you implement event handling depends on the type of button you use and how you use it. Generally, you implement an [[Swing-事件监听-actionlistener|action listener]], which is notified every time the user clicks the button. For [check boxes](#checkbox) you usually use an [[Swing-事件监听-itemlistener|item listener]], which is notified when the check box is selected or deselected.

Below is the code from [`ButtonDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ButtonDemoProject/src/components/ButtonDemo.java) that creates the buttons in the previous example and reacts to button clicks. The bold code is the code that would remain if the buttons had no images.

```java
//In initialization code:
    ImageIcon leftButtonIcon = createImageIcon("images/right.gif");
    ImageIcon middleButtonIcon = createImageIcon("images/middle.gif");
    ImageIcon rightButtonIcon = createImageIcon("images/left.gif");

    b1 = new JButton("Disable middle button", leftButtonIcon);
    b1.setVerticalTextPosition(AbstractButton.CENTER);
    b1.setHorizontalTextPosition(AbstractButton.LEADING); //aka LEFT, for left-to-right locales
    b1.setMnemonic(KeyEvent.VK_D);
    b1.setActionCommand("disable");

    b2 = new JButton("Middle button", middleButtonIcon);
    b2.setVerticalTextPosition(AbstractButton.BOTTOM);
    b2.setHorizontalTextPosition(AbstractButton.CENTER);
    b2.setMnemonic(KeyEvent.VK_M);

    b3 = new JButton("Enable middle button", rightButtonIcon);
    //Use the default text position of CENTER, TRAILING (RIGHT).
    b3.setMnemonic(KeyEvent.VK_E);
    b3.setActionCommand("enable");
    b3.setEnabled(false);

    //Listen for actions on buttons 1 and 3.
    b1.addActionListener(this);
    b3.addActionListener(this);

    b1.setToolTipText("Click this button to disable "
                      + "the middle button.");
    b2.setToolTipText("This middle button does nothing "
                      + "when you click it.");
    b3.setToolTipText("Click this button to enable the "
                      + "middle button.");
    ...
}

public void actionPerformed(ActionEvent e) {
    if ("disable".equals(e.getActionCommand())) {
        b2.setEnabled(false);
        b1.setEnabled(false);
        b3.setEnabled(true);
    } else {
        b2.setEnabled(true);
        b1.setEnabled(true);
        b3.setEnabled(false);
    }
} 

protected static ImageIcon createImageIcon(String path) {
    java.net.URL imgURL = ButtonDemo.class.getResource(path);
    ...//error handling omitted for clarity...
    return new ImageIcon(imgURL);
}

## How to Use JButton Features

Ordinary buttons — `JButton` objects — have just a bit more functionality than the `AbstractButton` class provides: You can make a `JButton` be the default button.

At most one button in a top-level container can be the default button. The default button typically has a highlighted appearance and acts clicked whenever the top-level container has the keyboard focus and the user presses the Return or Enter key. Here is a picture of a dialog, implemented in the [ListDialog](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ListDialog) example, in which the **Set** button is the default button:

![[Swing--NameChooserMetal.webp]]

You set the default button by invoking the `setDefaultButton` method on a top-level container's root pane. Here is the code that sets up the default button for the `ListDialog` example:

//In the constructor for a JDialog subclass:
getRootPane().setDefaultButton(setButton);
```java

The exact implementation of the default button feature depends on the look and feel. For example, in the Windows look and feel, the default button changes to whichever button has the focus, so that pressing Enter clicks the focused button. When no button has the focus, the button you originally specified as the default button becomes the default button again.

## How to Use Check Boxes

The [`JCheckBox`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBox.html) class provides support for check box buttons. You can also put check boxes in [[Swing-组件-menu|menus]], using the [`JCheckBoxMenuItem`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html) class. Because `JCheckBox` and `JCheckBoxMenuItem` inherit from `AbstractButton`, Swing check boxes have all the usual button characteristics, as discussed earlier in this section. For example, you can specify images to be used in check boxes.

Check boxes are similar to [radio buttons](#radiobutton) but their selection model is different, by convention. Any number of check boxes in a group — none, some, or all — can be selected. A group of radio buttons, on the other hand, can have only one button selected.

Here is a picture of an application that uses four check boxes to customize a cartoon:

![[Swing--CheckBoxDemoMetal.webp]]

---

**Try this:**
1. Click the Launch button to run the CheckBox Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#CheckBoxDemo).
2. Click the **Chin** button or press Alt-c.  
	The **Chin** check box becomes unselected, and the chin disappears from the picture. The other check boxes remain selected. This application has one item listener that listens to all the check boxes. Each time the item listener receives an event, the application loads a new picture that reflects the current state of the check boxes.

---

A check box generates one item event and one action event per click. Usually, you listen only for item events, since they let you determine whether the click selected or deselected the check box. Below is the code from [`CheckBoxDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/CheckBoxDemoProject/src/components/CheckBoxDemo.java) that creates the check boxes in the previous example and reacts to clicks.

```java
//In initialization code:
    chinButton = new JCheckBox("Chin");
    chinButton.setMnemonic(KeyEvent.VK_C); 
    chinButton.setSelected(true);

    glassesButton = new JCheckBox("Glasses");
    glassesButton.setMnemonic(KeyEvent.VK_G); 
    glassesButton.setSelected(true);

    hairButton = new JCheckBox("Hair");
    hairButton.setMnemonic(KeyEvent.VK_H); 
    hairButton.setSelected(true);

    teethButton = new JCheckBox("Teeth");
    teethButton.setMnemonic(KeyEvent.VK_T); 
    teethButton.setSelected(true);

    //Register a listener for the check boxes.
    chinButton.addItemListener(this);
    glassesButton.addItemListener(this);
    hairButton.addItemListener(this);
    teethButton.addItemListener(this);
...
public void itemStateChanged(ItemEvent e) {
    ...
    Object source = e.getItemSelectable();

    if (source == chinButton) {
        //...make a note of it...
    } else if (source == glassesButton) {
        //...make a note of it...
    } else if (source == hairButton) {
        //...make a note of it...
    } else if (source == teethButton) {
        //...make a note of it...
    }

    if (e.getStateChange() == ItemEvent.DESELECTED)
        //...make a note of it...
    ...
    updatePicture();
}
```

## How to Use Radio Buttons

Radio buttons are groups of buttons in which, by convention, only one button at a time can be selected. The Swing release supports radio buttons with the [`JRadioButton`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButton.html) and [`ButtonGroup`](https://docs.oracle.com/javase/8/docs/api/javax/swing/ButtonGroup.html) classes. To put a radio button in a [[Swing-组件-menu|menu]], use the [`JRadioButtonMenuItem`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html) class. Other ways of displaying one-of-many choices are [[Swing-组件-combobox|combo boxes]] and [[Swing-组件-list|lists]]. Radio buttons look similar to [check boxes](#checkbox), but, by convention, check boxes place no limits on how many items can be selected at a time.

Because `JRadioButton` inherits from `AbstractButton`, Swing radio buttons have all the usual button characteristics, as discussed earlier in this section. For example, you can specify the image displayed in a radio button.

Here is a picture of an application that uses five radio buttons to let you choose which kind of pet is displayed:

![[Swing--RadioButtonDemoMetal.webp]]

---

**Try this:**
1. Click the Launch button to run the RadioButton Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#RadioButtonDemo).
2. Click the **Dog** button or press Alt-d.  
	The **Dog** button becomes selected, which makes the **Bird** button become unselected. The picture switches from a bird to a dog. This application has one action listener that listens to all the radio buttons. Each time the action listener receives an event, the application displays the picture for the radio button that was just clicked.

---

Each time the user clicks a radio button (even if it was already selected), the button fires an [[Swing-事件监听-actionlistener|action event]]. One or two [[Swing-事件监听-itemlistener|item events]] also occur — one from the button that was just selected, and another from the button that lost the selection (if any). Usually, you handle radio button clicks using an action listener.

Below is the code from [`RadioButtonDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/RadioButtonDemoProject/src/components/RadioButtonDemo.java) that creates the radio buttons in the previous example and reacts to clicks.

```java
//In initialization code:
    //Create the radio buttons.
    JRadioButton birdButton = new JRadioButton(birdString);
    birdButton.setMnemonic(KeyEvent.VK_B);
    birdButton.setActionCommand(birdString);
    birdButton.setSelected(true);

    JRadioButton catButton = new JRadioButton(catString);
    catButton.setMnemonic(KeyEvent.VK_C);
    catButton.setActionCommand(catString);

    JRadioButton dogButton = new JRadioButton(dogString);
    dogButton.setMnemonic(KeyEvent.VK_D);
    dogButton.setActionCommand(dogString);

    JRadioButton rabbitButton = new JRadioButton(rabbitString);
    rabbitButton.setMnemonic(KeyEvent.VK_R);
    rabbitButton.setActionCommand(rabbitString);

    JRadioButton pigButton = new JRadioButton(pigString);
    pigButton.setMnemonic(KeyEvent.VK_P);
    pigButton.setActionCommand(pigString);

    //Group the radio buttons.
    ButtonGroup group = new ButtonGroup();
    group.add(birdButton);
    group.add(catButton);
    group.add(dogButton);
    group.add(rabbitButton);
    group.add(pigButton);

    //Register a listener for the radio buttons.
    birdButton.addActionListener(this);
    catButton.addActionListener(this);
    dogButton.addActionListener(this);
    rabbitButton.addActionListener(this);
    pigButton.addActionListener(this);
...
public void actionPerformed(ActionEvent e) {
    picture.setIcon(new ImageIcon("images/" 
                                  + e.getActionCommand() 
                                  + ".gif"));
}
```

For each group of radio buttons, you need to create a `ButtonGroup` instance and add each radio button to it. The `ButtonGroup` takes care of deselecting the previously selected button when the user selects another button in the group.

You should generally initialize a group of radio buttons so that one is selected. However, the API doesn't enforce this rule — a group of radio buttons can have no initial selection. Once the user has made a selection, exactly one button is selected from then on.

## The Button API

The following tables list the commonly used button-related API. Other methods you might call, such as `setFont` and `setForeground`, are listed in the API tables in [[Swing-组件-jcomponent|The JComponent Class]].

The API for using buttons falls into these categories:

- [Setting or Getting the Button's Contents](#contents)
- [Fine Tuning the Button's Appearance](#looks)
- [Implementing the Button's Functionality](#acts)
- [Check Box Constructors](#checkboxapi)
- [Radio Button Constructors](#radiobuttonapi)
- [Toggle Button Constructors](#togglebuttonapi)
- [Commonly Used Button Group Constructors/Methods](#buttongroup)

| Method or Constructor | Purpose |
| --- | --- |
| [JButton(Action)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JButton.html#JButton-javax.swing.Action-)   [JButton(String, Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JButton.html#JButton-java.lang.String-javax.swing.Icon-)   [JButton(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JButton.html#JButton-java.lang.String-)   [JButton(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JButton.html#JButton-javax.swing.Icon-)   [JButton()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JButton.html#JButton--) | Create a `JButton` instance, initializing it to have the specified text/image/action. |
| [void setAction(Action)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setAction-javax.swing.Action-)   [Action getAction()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getAction--) | Set or get the button's properties according to values from the `Action` instance. |
| [void setText(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setText-java.lang.String-)   [String getText()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getText--) | Set or get the text displayed by the button. You can use HTML formatting, as described in [[Swing-组件-html|Using HTML in Swing Components]]. |
| [void setIcon(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setIcon-javax.swing.Icon-)   [Icon getIcon()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getIcon--) | Set or get the image displayed by the button when the button isn't selected or pressed. |
| [void setDisabledIcon(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setDisabledIcon-javax.swing.Icon-)   [Icon getDisabledIcon()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getDisabledIcon--) | Set or get the image displayed by the button when it is disabled. If you do not specify a disabled image, then the look and feel creates one by manipulating the default image. |
| [void setPressedIcon(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setPressedIcon-javax.swing.Icon-)   [Icon getPressedIcon()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getPressedIcon--) | Set or get the image displayed by the button when it is being pressed. |
| [void setSelectedIcon(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setSelectedIcon-javax.swing.Icon-)   [Icon getSelectedIcon()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getSelectedIcon--)   [void setDisabledSelectedIcon(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setDisabledSelectedIcon-javax.swing.Icon-)   [Icon getDisabledSelectedIcon()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getDisabledSelectedIcon--) | Set or get the image displayed by the button when it is selected. If you do not specify a disabled selected image, then the look and feel creates one by manipulating the selected image. |
| [setRolloverEnabled(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setRolloverEnabled-boolean-)   [boolean isRolloverEnabled()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#isRolloverEnabled--)   [void setRolloverIcon(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setRolloverIcon-javax.swing.Icon-)   [Icon getRolloverIcon()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getRolloverIcon--)   [void setRolloverSelectedIcon(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setRolloverSelectedIcon-javax.swing.Icon-)   [Icon getRolloverSelectedIcon()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getRolloverSelectedIcon--) | Use `setRolloverIcon(someIcon)` to make the button display the specified icon when the cursor passes over it. The `setRolloverSelectedIcon` method lets you specify the rollover icon when the button is selected — this is useful for two-state buttons such as toggle buttons. Setting the rollover icon automatically calls `setRollover(true)`, enabling rollover. |

| Method or Constructor | Purpose |
| --- | --- |
| [void setHorizontalAlignment(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setHorizontalAlignment-int-)   [void setVerticalAlignment(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setVerticalAlignment-int-)   [int getHorizontalAlignment()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getHorizontalAlignment--)   [int getVerticalAlignment()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getVerticalAlignment--) | Set or get where in the button its contents should be placed. The `AbstractButton` class allows any one of the following values for horizontal alignment: `RIGHT`, `LEFT`, `CENTER` (the default), `LEADING`, and `TRAILING`. For vertical alignment: `TOP`, `CENTER` (the default), and `BOTTOM`. |
| [void setHorizontalTextPosition(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setHorizontalTextPosition-int-)   [void setVerticalTextPosition(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setVerticalTextPosition-int-)   [int getHorizontalTextPosition()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getHorizontalTextPosition--)   [int getVerticalTextPosition()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getVerticalTextPosition--) | Set or get where the button's text should be placed, relative to the button's image. The `AbstractButton` class allows any one of the following values for horizontal position: `LEFT`, `CENTER`, `RIGHT`, `LEADING`, and `TRAILING` (the default). For vertical position: `TOP`, `CENTER` (the default), and `BOTTOM`. |
| [void setMargin(Insets)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setMargin-java.awt.Insets-)   [Insets getMargin()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getMargin--) | Set or get the number of pixels between the button's border and its contents. |
| [void setFocusPainted(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setFocusPainted-boolean-)   [boolean isFocusPainted()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#isFocusPainted--) | Set or get whether the button should look different when it has the focus. |
| [void setBorderPainted(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setBorderPainted-boolean-)   [boolean isBorderPainted()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#isBorderPainted--) | Set or get whether the border of the button should be painted. |
| [void setIconTextGap(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setIconTextGap-int-)   [int getIconTextGap()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getIconTextGap--) | Set or get the amount of space between the text and the icon displayed in this button. |

| Method or Constructor | Purpose |
| --- | --- |
| [void setMnemonic(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setMnemonic-int-)   [char getMnemonic()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getMnemonic--) | Set or get the keyboard alternative to clicking the button. One form of the `setMnemonic` method accepts a character argument; however, the Swing team recommends that you use an `int` argument instead, specifying a `KeyEvent.VK_*X*` constant. |
| [void setDisplayedMnemonicIndex(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setDisplayedMnemonicIndex-int-)   [int getDisplayedMnemonicIndex()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getDisplayedMnemonicIndex--) | Set or get a hint as to which character in the text should be decorated to represent the mnemonic. Note that not all look and feels may support this. |
| [void setActionCommand(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setActionCommand-java.lang.String-)   [String getActionCommand()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getActionCommand--) | Set or get the name of the action performed by the button. |
| [void addActionListener(ActionListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#addActionListener-java.awt.event.ActionListener-)   [ActionListener removeActionListener()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#removeActionListener--) | Add or remove an object that listens for action events fired by the button. |
| [void addItemListener(ItemListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#addItemListener-java.awt.event.ItemListener-)   [ItemListener removeItemListener()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#removeItemListener--) | Add or remove an object that listens for item events fired by the button. |
| [void setSelected(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setSelected-boolean-)   [boolean isSelected()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#isSelected--) | Set or get whether the button is selected. Makes sense only for buttons that have on/off state, such as check boxes. |
| [void doClick()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#doClick--)   [void doClick(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#doClick-int-) | Programmatically perform a "click". The optional argument specifies the amount of time (in milliseconds) that the button should look pressed. |
| [void setMultiClickThreshhold(long)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setMultiClickThreshhold-long-)   [long getMultiClickThreshhold()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#getMultiClickThreshhold--) | Set or get the amount of time (in milliseconds) required between mouse press events for the button to generate corresponding action events. |

| Constructor | Purpose |
| --- | --- |
| [JCheckBox(Action)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBox.html#JCheckBox-javax.swing.Action-)   [JCheckBox(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBox.html#JCheckBox-java.lang.String-)   [JCheckBox(String, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBox.html#JCheckBox-java.lang.String-boolean-)   [JCheckBox(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBox.html#JCheckBox-javax.swing.Icon-)   [JCheckBox(Icon, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBox.html#JCheckBox-javax.swing.Icon-boolean-)   [JCheckBox(String, Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBox.html#JCheckBox-java.lang.String-javax.swing.Icon-)   [JCheckBox(String, Icon, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBox.html#JCheckBox-java.lang.String-javax.swing.Icon-boolean-)   [JCheckBox()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBox.html#JCheckBox--) | Create a `JCheckBox` instance. The string argument specifies the text, if any, that the check box should display. Similarly, the `Icon` argument specifies the image that should be used instead of the look and feel's default check box image. Specifying the boolean argument as `true` initializes the check box to be selected. If the boolean argument is absent or `false`, then the check box is initially unselected. |
| [JCheckBoxMenuItem(Action)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem-javax.swing.Action-)   [JCheckBoxMenuItem(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem-java.lang.String-)   [JCheckBoxMenuItem(String, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem-java.lang.String-boolean-)   [JCheckBoxMenuItem(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem-javax.swing.Icon-)   [JCheckBoxMenuItem(String, Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem-java.lang.String-javax.swing.Icon-)   [JCheckBoxMenuItem(String, Icon, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem-java.lang.String-javax.swing.Icon-boolean-)   [JCheckBoxMenuItem()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem--) | Create a `JCheckBoxMenuItem` instance. The arguments are interpreted in the same way as the arguments to the `JCheckBox` constructors, except that any specified icon is shown in addition to the normal check box icon. |

| Constructor | Purpose |
| --- | --- |
| [JRadioButton(Action)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButton.html#JRadioButton-javax.swing.Action-)   [JRadioButton(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButton.html#JRadioButton-java.lang.String-)   [JRadioButton(String, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButton.html#JRadioButton-java.lang.String-boolean-)   [JRadioButton(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButton.html#JRadioButton-javax.swing.Icon-)   [JRadioButton(Icon, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButton.html#JRadioButton-javax.swing.Icon-boolean-)   [JRadioButton(String, Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButton.html#JRadioButton-java.lang.String-javax.swing.Icon-)   [JRadioButton(String, Icon, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButton.html#JRadioButton-java.lang.String-javax.swing.Icon-boolean-)   [JRadioButton()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButton.html#JRadioButton--) | Create a `JRadioButton` instance. The string argument specifies the text, if any, that the radio button should display. Similarly, the `Icon` argument specifies the image that should be used instead of the look and feel's default radio button image. Specifying the boolean argument as `true` initializes the radio button to be selected, subject to the approval of the `ButtonGroup` object. If the boolean argument is absent or `false`, then the radio button is initially unselected. |
| [JRadioButtonMenuItem(Action)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem-javax.swing.Action-)   [JRadioButtonMenuItem(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem-java.lang.String-)   [JRadioButtonMenuItem(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem-javax.swing.Icon-)   [JRadioButtonMenuItem(String, Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem-java.lang.String-javax.swing.Icon-)   [JRadioButtonMenuItem()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem--) | Create a `JRadioButtonMenuItem` instance. The arguments are interpreted in the same way as the arguments to the `JRadioButton` constructors, except that any specified icon is shown in addition to the normal radio button icon. |

| Constructor | Purpose |
| --- | --- |
| [JToggleButton(Action)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToggleButton.html#JToggleButton-javax.swing.Action-)   [JToggleButton(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToggleButton.html#JToggleButton-java.lang.String-)   [JToggleButton(String, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToggleButton.html#JToggleButton-java.lang.String-boolean-)   [JToggleButton(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToggleButton.html#JToggleButton-javax.swing.Icon-)   [JToggleButton(Icon, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToggleButton.html#JToggleButton-javax.swing.Icon-boolean-)   [JToggleButton(String, Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToggleButton.html#JToggleButton-java.lang.String-javax.swing.Icon-)   [JToggleButton(String, Icon, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToggleButton.html#JToggleButton-java.lang.String-javax.swing.Icon-boolean-)   [JToggleButton()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JToggleButton.html#JToggleButton--) | Create a `JToggleButton` instance, which is similar to a `JButton`, but with two states. Normally, you use a `JRadioButton` or `JCheckBox` instead of directly instantiating `JToggleButton`, but `JToggleButton` can be useful when you do not want the typical radio button or check box appearance. The string argument specifies the text, if any, that the toggle button should display. Similarly, the `Icon` argument specifies the image that should be used. Specifying the boolean argument as `true` initializes the toggle button to be selected. If the boolean argument is absent or `false`, then the toggle button is initially unselected. |

| Constructor or Method | Purpose |
| --- | --- |
| [ButtonGroup()](https://docs.oracle.com/javase/8/docs/api/javax/swing/ButtonGroup.html#ButtonGroup--) | Create a `ButtonGroup` instance. |
| [void add(AbstractButton)](https://docs.oracle.com/javase/8/docs/api/javax/swing/ButtonGroup.html#add-javax.swing.AbstractButton-)   [void remove(AbstractButton)](https://docs.oracle.com/javase/8/docs/api/javax/swing/ButtonGroup.html#remove-javax.swing.AbstractButton-) | Add a button to the group, or remove a button from the group. |
| [public ButtonGroup getGroup()](https://docs.oracle.com/javase/8/docs/api/javax/swing/DefaultButtonModel.html#getGroup--)   *(in `DefaultButtonModel`)* | Get the `ButtonGroup`, if any, that controls a button. For example:   `ButtonGroup group = ((DefaultButtonModel)button.getModel()).getGroup();` |
| [public ButtonGroup clearSelection()](https://docs.oracle.com/javase/8/docs/api/javax/swing/ButtonGroup.html#ButtonGroup--) | Clears the state of selected buttons in the ButtonGroup. None of the buttons in the ButtonGroup are selected. |

## Examples that Use Various Kinds of Buttons

The following examples use buttons. Also see [[Swing-组件-toolbar|Examples that Use Tool Bars]], which lists programs that add `JButton` objects to `JToolBar` s.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`ButtonDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ButtonDemo) | [How to Use the Common Button API](#abstractbutton) | Uses mnemonics and icons. Specifies the button text position, relative to the button icon. Uses action commands. |
| [`ButtonHtmlDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ButtonHtmlDemo) | [[Swing-组件-html|Using HTML in Swing Components]] | A version of ButtonDemo that uses HTML formatting in its buttons. |
| [`ListDialog`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ListDialog) | [How to Use JButton Features](#jbutton) | Implements a dialog with two buttons, one of which is the default button. |
| [`DialogDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#DialogDemo) | [[Swing-组件-dialog|How to Make Dialogs]] | Has "Show it" buttons whose behavior is tied to the state of radio buttons. Uses sizable, though anonymous, inner classes to implement the action listeners. |
| [`ProgressBarDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ProgressBarDemo) | [[Swing-组件-progress|How to Monitor Progress]] | Implements a button's action listener with a named inner class. |
| [`CheckBoxDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#CheckBoxDemo) | [How to Use Check Boxes](#checkbox) | Uses check box buttons to determine which of 16 images it should display. |
| [`ActionDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#ActionDemo) | [[Swing-其他特性-action|How to Use Actions]] | Uses check box menu items to set the state of the program. |
| [`RadioButtonDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#RadioButtonDemo) | [How to Use Radio Buttons](#radiobutton) | Uses radio buttons to determine which of five images it should display. |
| [`DialogDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#DialogDemo) | [[Swing-组件-dialog|How to Make Dialogs]] | Contains several sets of radio buttons, which it uses to determine which dialog to bring up. |
| [`MenuDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuDemo) | [[Swing-组件-menu|How to Use Menus]] | Contains radio button menu items and check box menu items. |
| [`ColorChooserDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ColorChooserDemo2) | [[Swing-组件-colorchooser|How to Use Color Choosers]] | The crayons in `CrayonPanel` are implemented as toggle buttons. |
| [`ScrollDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ScrollDemo) | [[Swing-组件-scrollpane|How to Use Scroll Panes]] | The **cm** button is a toggle button. |

You can learn more about JavaFX button components from the following documents:

- [Using JavaFX UI Controls: Button](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/button.htm)
- [Using JavaFX UI Controls: Radio Button](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/radio-button.htm)
- [Using JavaFX UI Controls: Toggle Button](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/toggle-button.htm)
- [Using JavaFX UI Controls: Check box](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/checkbox.htm)
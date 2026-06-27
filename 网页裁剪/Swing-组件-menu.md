---
分类:
  - "网页裁剪"
标题: "How to Use Menus (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/menu.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

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

How to Use Menus

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

[[Swing-组件-list|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-panel|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Menus

A menu provides a space-saving way to let the user choose one of several options. Other components with which the user can make a one-of-many choice include [[Swing-组件-combobox|combo boxes]], [[Swing-组件-list|lists]], [[Swing-按钮|radio buttons]], [[Swing-组件-spinner|spinners]], and [[Swing-组件-toolbar|tool bars]]. If any of your menu items performs an action that is duplicated by another menu item or by a tool-bar button, then in addition to this section you should read [[Swing-其他特性-action|How to Use Actions]].

Menus are unique in that, by convention, they aren't placed with the other components in the UI. Instead, a menu usually appears either in a *menu bar* or as a *popup menu*. A menu bar contains one or more menus and has a customary, platform-dependent location — usually along the top of a window. A popup menu is a menu that is invisible until the user makes a platform-specific mouse action, such as pressing the right mouse button, over a popup-enabled component. The popup menu then appears under the cursor.

The following figure shows many menu-related components: a menu bar, menus, menu items, radio button menu items, check box menu items, and separators. As you can see, a menu item can have either an image or text, or both. You can also specify other properties, such as font and color.

![MenuLookDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/MenuLookDemo.png)

The rest of this section teaches you about the menu components and tells you how to use various menu features:

## The Menu Component Hierarchy

Here is a picture of the inheritance hierarchy for the menu-related classes:

![The inheritance hierarchy for menu classes](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/object.gif)

As the figure shows, menu items (including menus) are simply [[Swing-按钮|buttons]]. You might be wondering how a menu, if it's only a button, shows its menu items. The answer is that when a menu is activated, it automatically brings up a popup menu that displays the menu items.

## Creating Menus

The following code creates the menus shown near the beginning of this menu section. The bold lines of code create and connect the menu objects; the other code sets up or customizes the menu objects. You can find the entire program in [`MenuLookDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/MenuLookDemoProject/src/components/MenuLookDemo.java). Other required files are listed in the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuLookDemo).

---

**Try this:**
- Click the Launch button to run the MenuLook Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuLookDemo).

---

Because this code has no event handling, the menus do nothing useful except to look as they should. If you run the example, you'll notice that despite the lack of custom event handling, menus and submenus appear when they should, and the check boxes and radio buttons respond appropriately when the user chooses them.

```sql
//Where the GUI is created:
JMenuBar menuBar;
JMenu menu, submenu;
JMenuItem menuItem;
JRadioButtonMenuItem rbMenuItem;
JCheckBoxMenuItem cbMenuItem;

//Create the menu bar.
menuBar = new JMenuBar();

//Build the first menu.
menu = new JMenu("A Menu");
menu.setMnemonic(KeyEvent.VK_A);
menu.getAccessibleContext().setAccessibleDescription(
        "The only menu in this program that has menu items");
menuBar.add(menu);

//a group of JMenuItems
menuItem = new JMenuItem("A text-only menu item",
                         KeyEvent.VK_T);
menuItem.setAccelerator(KeyStroke.getKeyStroke(
        KeyEvent.VK_1, ActionEvent.ALT_MASK));
menuItem.getAccessibleContext().setAccessibleDescription(
        "This doesn't really do anything");
menu.add(menuItem);

menuItem = new JMenuItem("Both text and icon",
                         new ImageIcon("images/middle.gif"));
menuItem.setMnemonic(KeyEvent.VK_B);
menu.add(menuItem);

menuItem = new JMenuItem(new ImageIcon("images/middle.gif"));
menuItem.setMnemonic(KeyEvent.VK_D);
menu.add(menuItem);

//a group of radio button menu items
menu.addSeparator();
ButtonGroup group = new ButtonGroup();
rbMenuItem = new JRadioButtonMenuItem("A radio button menu item");
rbMenuItem.setSelected(true);
rbMenuItem.setMnemonic(KeyEvent.VK_R);
group.add(rbMenuItem);
menu.add(rbMenuItem);

rbMenuItem = new JRadioButtonMenuItem("Another one");
rbMenuItem.setMnemonic(KeyEvent.VK_O);
group.add(rbMenuItem);
menu.add(rbMenuItem);

//a group of check box menu items
menu.addSeparator();
cbMenuItem = new JCheckBoxMenuItem("A check box menu item");
cbMenuItem.setMnemonic(KeyEvent.VK_C);
menu.add(cbMenuItem);

cbMenuItem = new JCheckBoxMenuItem("Another one");
cbMenuItem.setMnemonic(KeyEvent.VK_H);
menu.add(cbMenuItem);

//a submenu
menu.addSeparator();
submenu = new JMenu("A submenu");
submenu.setMnemonic(KeyEvent.VK_S);

menuItem = new JMenuItem("An item in the submenu");
menuItem.setAccelerator(KeyStroke.getKeyStroke(
        KeyEvent.VK_2, ActionEvent.ALT_MASK));
submenu.add(menuItem);

menuItem = new JMenuItem("Another item");
submenu.add(menuItem);
menu.add(submenu);

//Build second menu in the menu bar.
menu = new JMenu("Another Menu");
menu.setMnemonic(KeyEvent.VK_N);
menu.getAccessibleContext().setAccessibleDescription(
        "This menu does nothing");
menuBar.add(menu);

...
frame.setJMenuBar(theJMenuBar);
```

As the code shows, to set the menu bar for a `JFrame`, you use the `setJMenuBar` method. To add a `JMenu` to a `JMenuBar`, you use the `add(JMenu)` method. To add menu items and submenus to a `JMenu`, you use the `add(JMenuItem)` method.

---

**Note:**

Menu items, like other components, can be in at most one container. If you try to add a menu item to a second menu, the menu item will be removed from the first menu before being added to the second. For a way of implementing multiple components that do the same thing, see [[Swing-其他特性-action|How to Use Actions]].

---

Other methods in the preceding code include `setAccelerator` and `setMnemonic`, which are discussed a little later in [Enabling Keyboard Operation](#mnemonic). The `setAccessibleDescription` method is discussed in [[Swing-其他特性-access|How to Support Assistive Technologies]].

## Handling Events from Menu Items

To detect when the user chooses a `JMenuItem`, you can listen for action events (just as you would for a [[Swing-按钮|`JButton`]]). To detect when the user chooses a `JRadioButtonMenuItem`, you can listen for either action events or item events, as described in [[Swing-按钮|How to Use Radio Buttons]]. For `JCheckBoxMenuItem` s, you generally listen for item events, as described in [[Swing-按钮|How to Use Check Boxes]].

---

**Try this:**
- Click the Launch button to run the Menu Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuDemo).

---

![The text area shows the action and item events our listeners detected.](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/MenuDemo.png)

Here is the code that implements the event handling:

```java
public class MenuDemo ... implements ActionListener,
                                     ItemListener {
    ...
    public MenuDemo() {
        //...for each JMenuItem instance:
        menuItem.addActionListener(this);
        ...
        //for each JRadioButtonMenuItem: 
        rbMenuItem.addActionListener(this);
        ...
        //for each JCheckBoxMenuItem: 
        cbMenuItem.addItemListener(this);
        ...
    }

    public void actionPerformed(ActionEvent e) {
        //...Get information from the action event...
        //...Display it in the text area...
    }

    public void itemStateChanged(ItemEvent e) {
        //...Get information from the item event...
        //...Display it in the text area...
    }
```

For examples of handling action and item events, see the [[Swing-按钮|button]], [[Swing-按钮|radio button]], and [[Swing-按钮|check box]] sections, as well as the [list of examples](#eg) at the end of this section.

## Enabling Keyboard Operation

Menus support two kinds of keyboard alternatives: mnemonics and accelerators. *Mnemonics* offer a way to use the keyboard to navigate the menu hierarchy, increasing the accessibility of programs. *Accelerators*, on the other hand, offer keyboard shortcuts to *bypass* navigating the menu hierarchy. Mnemonics are for all users; accelerators are for power users.

A mnemonic is a key that makes an already visible menu item be chosen. For example, in `MenuDemo` the first menu has the mnemonic A, and its second menu item has the mnemonic B. This means that, when you run `MenuDemo` with the Java look and feel, pressing the Alt and A keys makes the first menu appear. While the first menu is visible, pressing the B key (with or without Alt) makes the second menu item be chosen. A menu item generally displays its mnemonic by underlining the first occurrence of the mnemonic character in the menu item's text, as the following snapshot shows.

An accelerator is a key combination that causes a menu item to be chosen, whether or not it's visible. For example, pressing the Alt and 2 keys in `MenuDemo` makes the first item in the first menu's submenu be chosen, without bringing up any menus. Only leaf menu items — menus that don't bring up other menus — can have accelerators. The following snapshot shows how the Java look and feel displays a menu item that has an accelerator.

You can specify a mnemonic either when constructing the menu item or with the `setMnemonic` method. To specify an accelerator, use the `setAccelerator` method. Here are examples of setting mnemonics and accelerators:

```
//Setting the mnemonic when constructing a menu item:
menuItem = new JMenuItem("A text-only menu item",
                         KeyEvent.VK_T);

//Setting the mnemonic after creation time:
menuItem.setMnemonic(KeyEvent.VK_T);

//Setting the accelerator:
menuItem.setAccelerator(KeyStroke.getKeyStroke(
        KeyEvent.VK_T, ActionEvent.ALT_MASK));
```

As you can see, you set a mnemonic by specifying the [`KeyEvent`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/KeyEvent.html) constant corresponding to the key the user should press. To specify an accelerator you must use a [`KeyStroke`](https://docs.oracle.com/javase/8/docs/api/javax/swing/KeyStroke.html) object, which combines a key (specified by a `KeyEvent` constant) and a modifier-key mask (specified by an [`ActionEvent`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ActionEvent.html) constant).

---

**Note:**

Because popup menus, unlike regular menus, aren't always contained by a component, accelerators in popup menu items don't work unless the popup menu is visible.

---

## Bringing Up a Popup Menu

To bring up a popup menu ( [`JPopupMenu`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.html)), you must register a mouse listener on each component that the popup menu should be associated with. The mouse listener must detect user requests that the popup menu be brought up.

The exact gesture that should bring up a popup menu varies by look and feel. In Microsoft Windows, the user by convention brings up a popup menu by releasing the right mouse button while the cursor is over a component that is popup-enabled. In the Java look and feel, the customary trigger is either pressing the right mouse button (for a popup that goes away when the button is released) or clicking it (for a popup that stays up).

---

**Try this:**
- Click the Launch button to run the PopupMenu Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#PopupMenuDemo).

---

```sql
//...where instance variables are declared:
JPopupMenu popup;

    //...where the GUI is constructed:
    //Create the popup menu.
    popup = new JPopupMenu();
    menuItem = new JMenuItem("A popup menu item");
    menuItem.addActionListener(this);
    popup.add(menuItem);
    menuItem = new JMenuItem("Another popup menu item");
    menuItem.addActionListener(this);
    popup.add(menuItem);

    //Add listener to components that can bring up popup menus.
    MouseListener popupListener = new PopupListener();
    output.addMouseListener(popupListener);
    menuBar.addMouseListener(popupListener);
...
class PopupListener extends MouseAdapter {
    public void mousePressed(MouseEvent e) {
        maybeShowPopup(e);
    }

    public void mouseReleased(MouseEvent e) {
        maybeShowPopup(e);
    }

    private void maybeShowPopup(MouseEvent e) {
        if (e.isPopupTrigger()) {
            popup.show(e.getComponent(),
                       e.getX(), e.getY());
        }
    }
}
```

Popup menus have a few interesting implementation details. One is that every menu has an associated popup menu. When the menu is activated, it uses its associated popup menu to show its menu items.

Another detail is that a popup menu itself uses another component to implement the window containing the menu items. Depending on the circumstances under which the popup menu is displayed, the popup menu might implement its "window" using a lightweight component (such as a `JPanel`), a "mediumweight" component (such as a [`Panel`](https://docs.oracle.com/javase/8/docs/api/java/awt/Panel.html)), or a heavyweight window (something that inherits from [`Window`](https://docs.oracle.com/javase/8/docs/api/java/awt/Window.html)).

Lightweight popup windows are more efficient than heavyweight windows but, prior to the Java SE Platform 6 Update 12 release, they didn't work well if you had any heavyweight components inside your GUI. Specifically, when the lightweight popup's display area intersects the heavyweight component's display area, the heavyweight component is drawn on top. This is one of the reasons that, prior to the 6u12 release, we recommended against mixing heavyweight and lightweight components. If you are using an older release and absolutely need to use a heavyweight component in your GUI, then you can invoke `JPopupMenu.setLightWeightPopupEnabled(false)` to disable lightweight popup windows. For information on mixing components in the 6u12 release and later, please see [Mixing Heavyweight and Lightweight Components](http://www.oracle.com/technetwork/articles/java/mixing-components-433992.html).

## Customizing Menu Layout

Because menus are made up of ordinary Swing components, you can easily customize them. For example, you can add any lightweight component to a `JMenu` or `JMenuBar`. And because `JMenuBar` uses [[Swing-布局-box|`BoxLayout`]], you can customize a menu bar's layout just by adding invisible components to it. Here is an example of adding a [[Swing-布局-box|glue]] component to a menu bar, so that the last menu is at the right edge of the menu bar:

```
//...create and add some menus...
menuBar.add(Box.createHorizontalGlue());
//...create the rightmost menu...
menuBar.add(rightMenu);
```

---

**Try this:**
- Click the Launch button to run the MenuGlue Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuGlueDemo).

---

Here's the modified menu layout that MenuGlueDemo displays:

![MenuGlueDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/MenuGlueDemo.png)

Another way of changing the look of menus is to change the layout managers used to control them. For example, you can change a menu bar's layout manager from the default left-to-right `BoxLayout` to something such as `GridLayout`.

---

**Try this:**
- Click the Launch button to run the MenuLayout Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuLayoutDemo).

---

Here's a picture of the menu layout that `MenuLayoutDemo` creates:

![MenuLayoutDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/MenuLayoutDemo.png)

## The Menu API

The following tables list the commonly used menu constructors and methods. The API for using menus falls into these categories:

- [Creating and Setting Up Menu Bars](#menubarapi)
- [Creating and Populating Menus](#menuapi)
- [Creating, Populating, and Controlling Popup Menus](#popupapi)
- [Implementing Menu Items](#itemapi)

| Constructor or Method | Purpose |
| --- | --- |
| [JMenuBar()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenuBar.html#JMenuBar--) | Creates a menu bar. |
| [JMenu add(JMenu)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenuBar.html#add-javax.swing.JMenu-) | Adds the menu to the end of the menu bar. |
| [void setJMenuBar(JMenuBar)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setJMenuBar-javax.swing.JMenuBar-)   [JMenuBar getJMenuBar()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getJMenuBar--)   *(in `JApplet`, `JDialog`, `JFrame`, `JInternalFrame`, `JRootPane`)* | Sets or gets the menu bar of an [[Swing-组件-applet|applet]], [[Swing-组件-dialog|dialog]], [[Swing-组件-frame|frame]], [[Swing-组件-internalframe|internal frame]], or [[Swing-组件-rootpane|root pane]]. |

| Constructor or Method | Purpose |
| --- | --- |
| [JMenu()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#JMenu--)   [JMenu(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#JMenu-java.lang.String-)   [JMenu(Action)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#JMenu-javax.swing.Action-) | Creates a menu. The string specifies the text to display for the menu. The `Action` specifies the text and other properties of the menu (see [[Swing-其他特性-action|How to Use Actions]]). |
| [JMenuItem add(JMenuItem)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#add-javax.swing.JMenuItem-)   [JMenuItem add(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#add-java.lang.String-) | Adds a menu item to the current end of the menu. If the argument is a string, then the menu automatically creates a `JMenuItem` object that displays the specified text. |
| [void addSeparator()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#addSeparator--) | Adds a separator to the current end of the menu. |
| [JMenuItem insert(JMenuItem, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#insert-javax.swing.JMenuItem-int-)   [void insert(String, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#insert-java.lang.String-int-)   [void insertSeparator(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#insertSeparator-int-) | Inserts a menu item or separator into the menu at the specified position. The first menu item is at position 0, the second at position 1, and so on. The `JMenuItem` and `String` arguments are treated the same as in the corresponding `add` methods. |
| [void remove(JMenuItem)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#remove-javax.swing.JMenuItem-)   [void remove(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#remove-int-)   [void removeAll()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenu.html#removeAll--) | Removes the specified item(s) from the menu. If the argument is an integer, then it specifies the position of the menu item to be removed. |

| Constructor or Method | Purpose |
| --- | --- |
| [JPopupMenu()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.html#JPopupMenu--)   [JPopupMenu(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.html#JPopupMenu-java.lang.String-) | Creates a popup menu. The optional string argument specifies the title that a look and feel might display as part of the popup window. |
| [JMenuItem add(JMenuItem)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.html#add-javax.swing.JMenuItem-)   [JMenuItem add(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.html#add-java.lang.String-) | Adds a menu item to the current end of the popup menu. If the argument is a string, then the menu automatically creates a `JMenuItem` object that displays the specified text. |
| [void addSeparator()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.html#addSeparator--) | Adds a separator to the current end of the popup menu. |
| [void insert(Component, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.html#insert-java.awt.Component-int-) | Inserts a menu item into the menu at the specified position. The first menu item is at position 0, the second at position 1, and so on. The `Component` argument specifies the menu item to add. |
| [void remove(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.html#remove-int-)   [void removeAll()](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#removeAll--) | Removes the specified item(s) from the menu. If the argument is an integer, then it specifies the position of the menu item to be removed. |
| [static void setLightWeightPopupEnabled(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.html#setLightWeightPopupEnabled-boolean-) | By default, Swing implements a menu's window using a lightweight component. This can cause problems if you use any heavyweight components in your Swing program, as described in [Bringing Up a Popup Menu](#popup). (This is one of several reasons to avoid using heavyweight components.) As a workaround, invoke `JPopupMenu.setLightWeightPopupEnabled(false)`. |
| [void show(Component, int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPopupMenu.html#show-java.awt.Component-int-int-) | Display the popup menu at the specified *x,y* position (specified in that order by the integer arguments) in the coordinate system of the specified component. |

| Constructor or Method | Purpose |
| --- | --- |
| [JMenuItem()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenuItem.html#JMenuItem--)   [JMenuItem(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenuItem.html#JMenuItem-java.lang.String-)   [JMenuItem(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenuItem.html#JMenuItem-javax.swing.Icon-)   [JMenuItem(String, Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenuItem.html#JMenuItem-java.lang.String-javax.swing.Icon-)   [JMenuItem(String, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenuItem.html#JMenuItem-java.lang.String-int-)   [JMenuItem(Action)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenuItem.html#JMenuItem-javax.swing.Action-) | Creates an ordinary menu item. The icon argument, if present, specifies the icon that the menu item should display. Similarly, the string argument specifies the text that the menu item should display. The integer argument specifies the keyboard mnemonic to use. You can specify any of the relevant VK constants defined in the [KeyEvent](https://docs.oracle.com/javase/8/docs/api/java/awt/event/KeyEvent.html) class. For example, to specify the A key, use `KeyEvent.VK_A`.  The constructor with the `Action` parameter sets the menu item's `Action`, causing the menu item's properties to be initialized from the `Action`. See [[Swing-其他特性-action|How to Use Actions]] for details. |
| [JCheckBoxMenuItem()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem--)   [JCheckBoxMenuItem(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem-java.lang.String-)   [JCheckBoxMenuItem(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem-javax.swing.Icon-)   [JCheckBoxMenuItem(String, Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem-java.lang.String-javax.swing.Icon-)   [JCheckBoxMenuItem(String, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem-java.lang.String-boolean-)   [JCheckBoxMenuItem(String, Icon, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#JCheckBoxMenuItem-java.lang.String-javax.swing.Icon-boolean-) | Creates a menu item that looks and acts like a check box. The string argument, if any, specifies the text that the menu item should display. If you specify `true` for the boolean argument, then the menu item is initially selected (checked). Otherwise, the menu item is initially unselected. |
| [JRadioButtonMenuItem()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem--)   [JRadioButtonMenuItem(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem-java.lang.String-)   [JRadioButtonMenuItem(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem-javax.swing.Icon-)   [JRadioButtonMenuItem(String, Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem-java.lang.String-javax.swing.Icon-)   [JRadioButtonMenuItem(String, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem-java.lang.String-boolean-)   [JRadioButtonMenuItem(Icon, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem-javax.swing.Icon-boolean-)   [JRadioButtonMenuItem(String, Icon, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRadioButtonMenuItem.html#JRadioButtonMenuItem-java.lang.String-javax.swing.Icon-boolean-) | Creates a menu item that looks and acts like a radio button. The string argument, if any, specifies the text that the menu item should display. If you specify `true` for the boolean argument, then the menu item is initially selected. Otherwise, the menu item is initially unselected. |
| [void setState(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#setState-boolean-)   [boolean getState()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JCheckBoxMenuItem.html#getState--)   *(in `JCheckBoxMenuItem`)* | Set or get the selection state of a check box menu item. |
| [void setEnabled(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setEnabled-boolean-) | If the argument is true, enable the menu item. Otherwise, disable the menu item. |
| [void setMnemonic(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setMnemonic-int-) | Set the mnemonic that enables keyboard navigation to the menu or menu item. Use one of the VK constants defined in the `KeyEvent` class. |
| [void setAccelerator(KeyStroke)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JMenuItem.html#setAccelerator-javax.swing.KeyStroke-) | Set the accelerator that activates the menu item. |
| [void setActionCommand(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setActionCommand-java.lang.String-) | Set the name of the action performed by the menu item. |
| [void addActionListener(ActionListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#addActionListener-java.awt.event.ActionListener-)   [void addItemListener(ItemListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#addItemListener-java.awt.event.ItemListener-) | Add an event listener to the menu item. See [Handling Events from Menu Items](#event) for details. |
| [void setAction(Action)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setAction-javax.swing.Action-) | Set the `Action` associated with the menu item. See [[Swing-其他特性-action|How to Use Actions]] for details. |
|  | Many of the preceding methods are inherited from `AbstractButton`. See [[Swing-按钮|The Button API]] for information about other useful methods that `AbstractButton` provides. |

## Examples that Use Menus

Menus are used in a few of our examples.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`MenuLookDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuLookDemo) | This section ([Creating Menus](#create)) | A simple example that creates all kinds of menus except popup menus, but doesn't handle events from the menu items. |
| [`MenuDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuDemo) | This section ([Handling Events from Menu Items](#event)) | Adds event handling to `MenuLookDemo`. |
| [`PopupMenuDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#PopupMenuDemo) | This section ([Bringing Up a Popup Menu](#popup)) | Adds popup menus to `MenuDemo`. |
| [`MenuGlueDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuGlueDemo) | This section ([Customizing Menu Layout](#custom)) | Demonstrates affecting menu layout by adding an invisible components to the menu bar. |
| [`MenuLayoutDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuLayoutDemo) | This section ([Customizing Menu Layout](#custom)) | Implements sideways-opening menus arranged in a vertical menu bar. |
| [`MenuSelectionManagerDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuSelectionManagerDemo) | — | Adds highlight detection to MenuDemo. To see this feature, click a menu and then move the mouse over any menu item or submenu. Once per second, the text area will be updated with information about the currently highlighted menu item, not to be confused with the menu item that the user eventually chooses. This demo uses the default [`MenuSelectionManager`](https://docs.oracle.com/javase/8/docs/api/javax/swing/MenuSelectionManager.html), which tracks the state of the menu hierarchy. |
| [`ActionDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#ActionDemo) | [[Swing-其他特性-action|How to Use Actions]] | Uses `Action` objects to implement menu items that duplicate functionality provided by tool bar buttons. |
| [`Framework`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#Framework) | — | Brings up multiple identical frames, each with a menu in its menu bar. |
| [`InternalFrameDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#InternalFrameDemo) | [[Swing-组件-internalframe|How to Use Internal Frames]] | Uses a menu item to create windows. |

See the [Using JavaFX UI Controls: Menu](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/menu_controls.htm) tutorial to learn how to create menus in JavaFX.
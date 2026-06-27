Documentation

[Using Top-Level Containers](https://docs.oracle.com/javase/tutorial/uiswing/components/toplevel.html)

[The JComponent Class](https://docs.oracle.com/javase/tutorial/uiswing/components/jcomponent.html)

[Using Text Components](https://docs.oracle.com/javase/tutorial/uiswing/components/text.html)

[Text Component Features](https://docs.oracle.com/javase/tutorial/uiswing/components/generaltext.html)

[The Text Component API](https://docs.oracle.com/javase/tutorial/uiswing/components/textapi.html)

[How to Use Various Components](https://docs.oracle.com/javase/tutorial/uiswing/components/componentlist.html)

[How to Make Applets](https://docs.oracle.com/javase/tutorial/uiswing/components/applet.html)

[How to Use Buttons, Check Boxes, and Radio Buttons](https://docs.oracle.com/javase/tutorial/uiswing/components/button.html)

[How to Use the ButtonGroup Component](https://docs.oracle.com/javase/tutorial/uiswing/components/buttongroup.html)

[How to Use Color Choosers](https://docs.oracle.com/javase/tutorial/uiswing/components/colorchooser.html)

How to Use Combo Boxes

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

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/components/colorchooser.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/uiswing/components/dialog.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Combo Boxes

A [`JComboBox`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html), which lets the user choose one of several choices, can have two very different forms. The default form is the uneditable combo box, which features a button and a drop-down list of values. The second form, called the editable combo box, features a text field with a small button abutting it. The user can type a value in the text field or click the button to display a drop-down list. Here's what the two forms of combo boxes look like in the Java look and feel:

|  |  |
| --- | --- |
| ![An uneditable combo box](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/UneditableComboMenu2Metal.png) | ![An editable combo box](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/EditableComboBoxMenuMetal2.png) |
| Uneditable combo box, before (top)   and after the button is clicked | Editable combo box, before and after   the arrow button is clicked |

Combo boxes require little screen space, and their editable (text field) form is useful for letting the user quickly choose a value without limiting the user to the displayed values. Other components that can display one-of-many choices are groups of [radio buttons](https://docs.oracle.com/javase/tutorial/uiswing/components/button.html#radiobutton) and [lists](https://docs.oracle.com/javase/tutorial/uiswing/components/list.html). Groups of radio buttons are generally the easiest for users to understand, but combo boxes can be more appropriate when space is limited or more than a few choices are available. Lists are not terribly attractive, but they're more appropriate than combo boxes when the number of items is large (say, over 20) or when selecting multiple items might be valid.

Because editable and uneditable combo boxes are so different, this section treats them separately. This section covers these topics:

## Using an Uneditable Combo Box

The application shown here uses an uneditable combo box for choosing a pet picture:

![An uneditable combo box](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ComboBoxDemoMetal.png)

---

**Try this:**
1. Click the Launch button to run the ComboBox Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ComboBoxDemo).
2. Choose an animal name from the combo box to view its picture.
3. Compare the operation and GUI of this program to one that uses radio buttons: [run RadioButtonDemo](https://docs.oracle.com/javase/tutorialJWS/samples/uiswing/RadioButtonDemoProject/RadioButtonDemo.jnlp) (it requires release 6). You might want to compare the source code as well: [`ComboBoxDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ComboBoxDemoProject/src/components/ComboBoxDemo.java) vs. [`RadioButtonDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/RadioButtonDemoProject/src/components/RadioButtonDemo.java).

---

The following code, taken from [`ComboBoxDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ComboBoxDemoProject/src/components/ComboBoxDemo.java), creates an uneditable combo box and sets it up:

```
String[] petStrings = { "Bird", "Cat", "Dog", "Rabbit", "Pig" };

//Create the combo box, select item at index 4.
//Indices start at 0, so 4 specifies the pig.
JComboBox petList = new JComboBox(petStrings);
petList.setSelectedIndex(4);
petList.addActionListener(this);
```

This combo box contains an array of strings, but you could just as easily use icons instead. To put anything else into a combo box or to customize how the items in a combo box look, you need to write a custom renderer. An editable combo box would also need a custom editor. Refer to [Providing a Custom Renderer](#renderer) for information and an example.

The preceding code registers an action listener on the combo box. To see the action listener implementation and learn about other types of listeners supported by combo box, refer to [Handling Events on a Combo Box](#listeners).

No matter which constructor you use, a combo box uses a combo box model to contain and manage the items in its menu. When you initialize a combo box with an array or a vector, the combo box creates a default model object for you. As with other Swing components, you can customize a combo box in part by implementing a custom model — an object that implements the [`ComboBoxModel`](https://docs.oracle.com/javase/8/docs/api/javax/swing/ComboBoxModel.html) interface.

---

**Note:**

Be careful when implementing a custom model for a combo box. The `JComboBox` methods that change the items in the combo box's menu, such as `insertItemAt`, work only if the data model implements the [`MutableComboBoxModel`](https://docs.oracle.com/javase/8/docs/api/javax/swing/MutableComboBoxModel.html) interface (a subinterface of `ComboBoxModel`). Refer to the [API](#api) tables to see which methods are affected.

Something else to watch out for — even for uneditable combo boxes — is ensuring that your custom model fires [list data events](https://docs.oracle.com/javase/tutorial/uiswing/events/listdatalistener.html) when the combo box's data or state changes. Even immutable combo box models, whose data never changes, must fire a list data event (a `CONTENTS_CHANGED` event) when the selection changes. One way to get the list data event firing code for free is to make your combo box model a subclass of [`AbstractListModel`](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractListModel.html).

---

## Handling Events on a Combo Box

Here's the code from `ComboBoxDemo.java` that registers and implements an action listener on the combo box:

```
public class ComboBoxDemo ... implements ActionListener {
    . . .
        petList.addActionListener(this) {
    . . .
    public void actionPerformed(ActionEvent e) {
        JComboBox cb = (JComboBox)e.getSource();
        String petName = (String)cb.getSelectedItem();
        updateLabel(petName);
    }
    . . .
}
```

This action listener gets the newly selected item from the combo box, uses it to compute the name of an image file, and updates a label to display the image. The combo box fires an action event when the user selects an item from the combo box's menu. See [How to Write an Action Listener](https://docs.oracle.com/javase/tutorial/uiswing/events/actionlistener.html), for general information about implementing action listeners.

Combo boxes also generate item events, which are fired when any of the items' selection state changes. Only one item at a time can be selected in a combo box, so when the user makes a new selection the previously selected item becomes unselected. Thus two item events are fired each time the user selects a different item from the menu. If the user chooses the same item, no item events are fired. Use `addItemListener` to register an item listener on a combo box. [How to Write an Item Listener](https://docs.oracle.com/javase/tutorial/uiswing/events/itemlistener.html) gives general information about implementing item listeners.

Although `JComboBox` inherits methods to register listeners for low-level events — focus, key, and mouse events, for example — we recommend that you don't listen for low-level events on a combo box. Here's why: A combo box is a *compound component* — it is comprised of two or more other components. The combo box itself fires high-level events such as action events. Its subcomponents fire low-level events such as mouse, key, and focus events. The low-level events and the subcomponent that fires them are look-and-feel-dependent. To avoid writing look-and-feel-dependent code, you should listen only for high-level events on a compound component such as a combo box. For information about events, including a discussion about high- and low-level events, refer to [Writing Event Listeners](https://docs.oracle.com/javase/tutorial/uiswing/events/index.html).

## Using an Editable Combo Box

Here's a picture of a demo application that uses an editable combo box to enter a pattern with which to format dates.

![An editable combo box](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ComboBoxDemo2Metal.png)

---

**Try this:**
1. Click the Launch button to run the ComboBox2 Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ComboBoxDemo2).
2. Enter a new pattern by choosing one from the combo box's menu. The program reformats the current date and time.
3. Enter a new pattern by typing one in and pressing Enter. Again the program reformats the current date and time.

---

The following code, taken from [`ComboBoxDemo2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ComboBoxDemo2Project/src/components/ComboBoxDemo2.java), creates and sets up the combo box:

```
String[] patternExamples = {
         "dd MMMMM yyyy",
         "dd.MM.yy",
         "MM/dd/yy",
         "yyyy.MM.dd G 'at' hh:mm:ss z",
         "EEE, MMM d, ''yy",
         "h:mm a",
         "H:mm:ss:SSS",
         "K:mm a,z",
         "yyyy.MMMMM.dd GGG hh:mm aaa"
};
. . .
JComboBox patternList = new JComboBox(patternExamples);
patternList.setEditable(true);
patternList.addActionListener(this);
```

This code is very similar to the previous example, but warrants a few words of explanation. The bold line of code explicitly turns on editing to allow the user to type values in. This is necessary because, by default, a combo box is not editable. This particular example allows editing on the combo box because its menu does not provide all possible date formatting patterns, just shortcuts to frequently used patterns.

An editable combo box fires an action event when the user chooses an item from the menu and when the user types Enter. Note that the menu remains unchanged when the user enters a value into the combo box. If you want, you can easily write an action listener that adds a new item to the combo box's menu each time the user types in a unique value.

See [Internationalization](https://docs.oracle.com/javase/tutorial/i18n/index.html) to learn more about formatting dates and other types of data.

## Providing a Custom Renderer

A combo box uses a *renderer* to display each item in its menu. If the combo box is uneditable, it also uses the renderer to display the currently selected item. An editable combo box, on the other hand, uses an *editor* to display the selected item. A renderer for a combo box must implement the [`ListCellRenderer`](https://docs.oracle.com/javase/8/docs/api/javax/swing/ListCellRenderer.html) interface. A combo box's editor must implement [`ComboBoxEditor`](https://docs.oracle.com/javase/8/docs/api/javax/swing/ComboBoxEditor.html). This section shows how to provide a custom renderer for an uneditable combo box.

The default renderer knows how to render strings and icons. If you put other objects in a combo box, the default renderer calls the `toString` method to provide a string to display. You can customize the way a combo box renders itself and its items by implementing your own `ListCellRenderer`.

Here's a picture of an application that uses a combo box with a custom renderer:

![A combo box with a custom renderer](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/CustomComboBoxDemoMetal.png)

Click the Launch button to run the CustomComboBox Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#CustomComboBoxDemo).

The full source code for this example is in [`CustomComboBoxDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/CustomComboBoxDemoProject/src/components/CustomComboBoxDemo.java). To get the image files it requires, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#CustomComboBoxDemo).

The following statements from the example create an instance of `ComboBoxRenderer` (a custom class) and set up the instance as the combo box's renderer:

```
JComboBox petList = new JComboBox(intArray);
. . .
ComboBoxRenderer renderer = new ComboBoxRenderer();
renderer.setPreferredSize(new Dimension(200, 130));
petList.setRenderer(renderer);
petList.setMaximumRowCount(3);
```

The last line sets the combo box's maximum row count, which determines the number of items visible when the menu is displayed. If the number of items in the combo box is larger than its maximum row count, the menu has a scroll bar. The icons are pretty big for a menu, so our code limits the number of rows to 3. Here's the implementation of `ComboBoxRenderer`, a renderer that puts an icon and text side-by-side:

```
class ComboBoxRenderer extends JLabel
                       implements ListCellRenderer {
    . . .
    public ComboBoxRenderer() {
        setOpaque(true);
        setHorizontalAlignment(CENTER);
        setVerticalAlignment(CENTER);
    }

    /*
     * This method finds the image and text corresponding
     * to the selected value and returns the label, set up
     * to display the text and image.
     */
    public Component getListCellRendererComponent(
                                       JList list,
                                       Object value,
                                       int index,
                                       boolean isSelected,
                                       boolean cellHasFocus) {
        //Get the selected index. (The index parameter isn't
        //always valid, so just use the value.)
        int selectedIndex = ((Integer)value).intValue();

        if (isSelected) {
            setBackground(list.getSelectionBackground());
            setForeground(list.getSelectionForeground());
        } else {
            setBackground(list.getBackground());
            setForeground(list.getForeground());
        }

        //Set the icon and text.  If icon was null, say so.
        ImageIcon icon = images[selectedIndex];
        String pet = petStrings[selectedIndex];
        setIcon(icon);
        if (icon != null) {
            setText(pet);
            setFont(list.getFont());
        } else {
            setUhOhText(pet + " (no image available)",
                        list.getFont());
        }

        return this;
    }
    . . .
}
```

As a `ListCellRenderer`, `ComboBoxRenderer` implements a method called `getListCellRendererComponent`, which returns a component whose `paintComponent` method is used to display the combo box and each of its items. The easiest way to display an image and an icon is to use a label. So `ComboBoxRenderer` is a subclass of label and returns itself. The implementation of `getListCellRendererComponent` configures the renderer to display the currently selected icon and its description.

These arguments are passed to `getListCellRendererComponent`:

- `JList list` — a list object used behind the scenes to display the items. The example uses this object's colors to set up foreground and background colors.
- `Object value` — the object to render. An `Integer` in this example.
- `int index` — the index of the object to render.
- `boolean isSelected` — indicates whether the object to render is selected. Used by the example to determine which colors to use.
- `boolean cellHasFocus` — indicates whether the object to render has the focus.

Note that combo boxes and [lists](https://docs.oracle.com/javase/tutorial/uiswing/components/list.html) use the same type of renderer — `ListCellRenderer`. You can save yourself some time by sharing renderers between combo boxes and lists, if it makes sense for your program.

## The Combo Box API

The following tables list the commonly used `JComboBox` constructors and methods. Other methods you are most likely to invoke on a `JComboBox` object are those it inherits from its superclasses, such as `setPreferredSize`. See [The JComponent API](https://docs.oracle.com/javase/tutorial/uiswing/components/jcomponent.html#api) for tables of commonly used inherited methods.

The API for using combo boxes falls into two categories:

- [Setting or Getting the Items in the Combo Box's Menu](#list)
- [Customizing the Combo Box's Operation](#configuring)

| Method | Purpose |
| --- | --- |
| [JComboBox()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#JComboBox--)   [JComboBox(ComboBoxModel)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#JComboBox-javax.swing.ComboBoxModel-)   [JComboBox(Object\[\])](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#JComboBox-java.lang.Object:A-)   [JComboBox(Vector)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#JComboBox-java.util.Vector-) | Create a combo box with the specified items in its menu. A combo box created with the default constructor has no items in the menu initially. Each of the other constructors initializes the menu from its argument: a model object, an array of objects, or a `Vector` of objects. |
| [void addItem(Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#addItem-java.lang.Object-)   [void insertItemAt(Object, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#insertItemAt-java.lang.Object-int-) | Add or insert the specified object into the combo box's menu. The insert method places the specified object *at* the specified index, thus inserting it before the object currently at that index. These methods require that the combo box's data model be an instance of `MutableComboBoxModel`. |
| [Object getItemAt(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#getItemAt-int-)   [Object getSelectedItem()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#getSelectedItem--) | Get an item from the combo box's menu. |
| [void removeAllItems()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#removeAllItems--)   [void removeItemAt(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#removeItemAt-int-)   [void removeItem(Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#removeItem-java.lang.Object-) | Remove one or more items from the combo box's menu. These methods require that the combo box's data model be an instance of `MutableComboBoxModel`. |
| [int getItemCount()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#getItemCount--) | Get the number of items in the combo box's menu. |
| [void setModel(ComboBoxModel)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#setModel-javax.swing.ComboBoxModel-)   [ComboBoxModel getModel()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#getModel--) | Set or get the data model that provides the items in the combo box's menu. |
| [void setAction(Action)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#setAction-javax.swing.Action-)   [Action getAction()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#getAction--) | Set or get the `Action` associated with the combo box. For further information, see [How to Use Actions](https://docs.oracle.com/javase/tutorial/uiswing/misc/action.html). |

| Method or Constructor | Purpose |
| --- | --- |
| [void addActionListener(ActionListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#addActionListener-java.awt.event.ActionListener-) | Add an action listener to the combo box. The listener's `actionPerformed` method is called when the user selects an item from the combo box's menu or, in an editable combo box, when the user presses Enter. |
| [void addItemListener(ItemListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#addItemListener-java.awt.event.ItemListener-) | Add an item listener to the combo box. The listener's `itemStateChanged` method is called when the selection state of any of the combo box's items change. |
| [void setEditable(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#setEditable-boolean-)   [boolean isEditable()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#isEditable--) | Set or get whether the user can type in the combo box. |
| [void setRenderer(ListCellRenderer)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#setRenderer-javax.swing.ListCellRenderer-)   [ListCellRenderer getRenderer()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#getRenderer--) | Set or get the object responsible for painting the selected item in the combo box. The renderer is used only when the combo box is uneditable. If the combo box is editable, the editor is used to paint the selected item instead. |
| [void setEditor(ComboBoxEditor)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#setEditor-javax.swing.ComboBoxEditor-)   [ComboBoxEditor getEditor()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html#getEditor--) | Set or get the object responsible for painting and editing the selected item in the combo box. The editor is used only when the combo box is editable. If the combo box is uneditable, the renderer is used to paint the selected item instead. |

## Examples that Use Combo Boxes

This table shows the examples that use `JComboBox` and where those examples are described.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`ComboBoxDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ComboBoxDemo) | This section | Uses an uneditable combo box. |
| [`ComboBoxDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ComboBoxDemo2) | This section | Uses an editable combo box. |
| [`CustomComboBoxDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#CustomComboBoxDemo) | This section | Provides a custom renderer for a combo box. |
| [`TableRenderDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TableRenderDemo) | How to Use Tables ([Using a Combo Box as an Editor](https://docs.oracle.com/javase/tutorial/uiswing/components/table.html#combobox)) | Shows how to use a combo box as a table cell editor. |
---
分类:
  - "网页裁剪"
标题: "CCP in a non-Text Component (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/listpaste.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-intro|Introduction to DnD]]

[[Swing-defaultsupport|Default DnD Support]]

[[Swing-basicdemo|Demo - BasicDnD]]

[[Swing-transferhandler|TransferHandler Class]]

[[Swing-export|Export Methods]]

[[Swing-import|Import Methods]]

[[Swing-transfersupport|TransferSupport Class]]

[[Swing-dropmodes|Setting the Drop Mode]]

[[Swing-dropmodedemo|Demo - DropDemo]]

[[Swing-dropaction|Choosing the Drop Action]]

[[Swing-dropactiondemo|Demo - ChooseDropAction]]

[[Swing-showdroploc|Showing the Drop Location]]

[[Swing-locsensitivedrop|Location Sensitive Drop]]

[[Swing-locsensitivedemo|Demo - LocationSensitiveDemo]]

[[Swing-emptytable|Empty Table Drop]]

[[Swing-droplocation|Drop Location Rendering]]

[[Swing-toplevel|Top-Level Drop]]

[[Swing-cutpaste|Adding Cut, Copy and Paste (CCP)]]

[[Swing-textpaste|CCP in a Text Component]]

CCP in a non-Text Component

[[Swing-dataflavor|Using and Creating a DataFlavor]]

[[Swing-together|Putting it All Together - DnD and CCP]]

[[Swing-拖放问题|Solving Common Data Transfer Problems]]

[[Swing-textpaste|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-dataflavor|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## CCP in a non-Text Component

If you are implementing cut, copy and paste using one of the Swing components that is *not* one of the text components you have to do some additional setup. First, you need to install the cut, copy, and paste actions in the action map. The following method shows how to do this:

```
private void setMappings(JList list) { 
    ActionMap map = list.getActionMap();
    map.put(TransferHandler.getCutAction().getValue(Action.NAME),
            TransferHandler.getCutAction());
    map.put(TransferHandler.getCopyAction().getValue(Action.NAME),
            TransferHandler.getCopyAction());
    map.put(TransferHandler.getPasteAction().getValue(Action.NAME),
            TransferHandler.getPasteAction());
```

When you set up the Edit menu, you can also choose to add menu accelerators, so that the user can type Control-C to initiate a copy, for example. In the following code snippet, the bolded text shows how to set the menu accelerator for the cut action:

```
menuItem = new JMenuItem("Cut");
menuItem.setActionCommand((String)TransferHandler.getCutAction().
         getValue(Action.NAME));
menuItem.addActionListener(actionListener);
menuItem.setAccelerator(
  KeyStroke.getKeyStroke(KeyEvent.VK_X, ActionEvent.CTRL_MASK));
menuItem.setMnemonic(KeyEvent.VK_T);
mainMenu.add(menuItem);
```

If you have set the menu accelerators for the CCP actions, this next step is redundant. If you have not set the menu accelerators, you need to add the CCP bindings to the input map. The following code snippet shows how this is done:

```
// only required if you have not set the menu accelerators
InputMap imap = this.getInputMap();
imap.put(KeyStroke.getKeyStroke("ctrl X"),
    TransferHandler.getCutAction().getValue(Action.NAME));
imap.put(KeyStroke.getKeyStroke("ctrl C"),
    TransferHandler.getCopyAction().getValue(Action.NAME));
imap.put(KeyStroke.getKeyStroke("ctrl V"),
    TransferHandler.getPasteAction().getValue(Action.NAME));
```

Once the bindings have been installed and the Edit menu has been set up, there is another issue to be addressed: When the user initiates a cut, copy or a paste, which component should receive the action? In the case of a text component, the `DefaultEditorKit` remembers which component last had the focus and forwards the action to that component. The following class, `TransferActionListener`, performs the same function for non-text Swing components. This class can be dropped into most any application:

```
public class TransferActionListener implements ActionListener,
                                              PropertyChangeListener {
    private JComponent focusOwner = null;

    public TransferActionListener() {
        KeyboardFocusManager manager = KeyboardFocusManager.
           getCurrentKeyboardFocusManager();
        manager.addPropertyChangeListener("permanentFocusOwner", this);
    }

    public void propertyChange(PropertyChangeEvent e) {
        Object o = e.getNewValue();
        if (o instanceof JComponent) {
            focusOwner = (JComponent)o;
        } else {
            focusOwner = null;
        }
    }

    public void actionPerformed(ActionEvent e) {
        if (focusOwner == null)
            return;
        String action = (String)e.getActionCommand();
        Action a = focusOwner.getActionMap().get(action);
        if (a != null) {
            a.actionPerformed(new ActionEvent(focusOwner,
                                              ActionEvent.ACTION_PERFORMED,
                                              null));
        }
    }
}
```

Finally, you have to decide how to handle the paste. In the case of a drag and drop, you insert the data at the drop location. In the case of a paste, you do not have the benefit of the user pointing to the desired paste location. You need to decide what makes sense for your application — inserting the data before or after the current selection might be the best solution.

The following demo, ListCutPaste, shows how to implement CCP in an instance of `JList`. As you can see in the screen shot there are three lists and you can cut, copy, and paste to or from any of these lists. They also support drag and drop. For this demo, the pasted data is inserted after the current selection. If there is no current selection, the data is appended to the end of the list.

![A snapshot of the ListCutPaste demo.](https://docs.oracle.com/javase/tutorial/figures/uiswing/dnd/ListCutPaste.png)

---

**Try this:**
1. Click the Launch button to run ListCutPaste using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/index.html#ListCutPaste).
2. Select an item in one of the lists. Use the Edit menu or the keyboard equivalent to cut or copy the list item from the source.
3. Select the list item where you want the item to be pasted.
4. Paste the text using the menu or the keyboard equivalent. The item is pasted after the current selection.
5. Perform the same operation using drag and drop.

---
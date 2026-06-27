---
分类:
  - "网页裁剪"
标题: "Demo - DropDemo (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/dropmodedemo.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Demo - DropDemo (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)

Documentation

[[Swing-intro|Introduction to DnD]]

[[Swing-defaultsupport|Default DnD Support]]

[[Swing-basicdemo|Demo - BasicDnD]]

[[Swing-transferhandler|TransferHandler Class]]

[[Swing-export|Export Methods]]

[[Swing-import|Import Methods]]

[[Swing-transfersupport|TransferSupport Class]]

[[Swing-dropmodes|Setting the Drop Mode]]

Demo - DropDemo

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

[[Swing-listpaste|CCP in a non-Text Component]]

[[Swing-dataflavor|Using and Creating a DataFlavor]]

[[Swing-together|Putting it All Together - DnD and CCP]]

[[Swing-拖放问题|Solving Common Data Transfer Problems]]

[[Swing-dropmodes|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-dropaction|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Demo - DropDemo

Now we will look at a demo that uses a custom transfer handler to implement drop for a list component. Although the default transfer handler for list implements export, because we are creating a custom transfer handler to implement import, we have to re-implement export as well.

As you see from the screen shot, `DropDemo` contains an editable text area, a list, and a combo box that allows you to select the drop mode for the list.

![DropDemo screen shot](https://docs.oracle.com/javase/tutorial/figures/uiswing/dnd/DropDemo.png)

---

**Try this:**
1. Click the Launch button to run `DropDemo` using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/index.html#DropDemo).
2. Select some text in the text area and drop onto the list. The selected list entry is replaced and that item becomes the current selection. This is how `USE_SELECTION` works and is provided for backwards compatibility but is otherwise not recommended.
3. Change the List Drop Mode to `ON` and try the same action. Once again, the selected list item is replaced, but the current selection does not move.
4. Change the List Drop Mode to `INSERT` and repeat the same action. The added text is inserted at the drop location. In this mode it is not possible to modify existing list items.
5. Change the List Drop Mode to `ON_OR_INSERT`. Depending on the cursor position, you can either insert the new text or you can replace existing text.

---

Here is the [`` `ListTransferHandler` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/DropDemoProject/src/dnd/ListTransferHandler.java) implementation for [`` `DropDemo.java` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/DropDemoProject/src/dnd/DropDemo.java).

The transfer handler for this list supports copy and move and it reimplements the drag support that list provides by default.

```sql
public class ListTransferHandler extends TransferHandler {
    private int[] indices = null;
    private int addIndex = -1; //Location where items were added
    private int addCount = 0;  //Number of items added.
            
    /**
     * We only support importing strings.
     */
    public boolean canImport(TransferHandler.TransferSupport info) {
        // Check for String flavor
        if (!info.isDataFlavorSupported(DataFlavor.stringFlavor)) {
            return false;
        }
        return true;
   }

    /**
     * Bundle up the selected items in a single list for export.
     * Each line is separated by a newline.
     */
    protected Transferable createTransferable(JComponent c) {
        JList list = (JList)c;
        indices = list.getSelectedIndices();
        Object[] values = list.getSelectedValues();
        
        StringBuffer buff = new StringBuffer();

        for (int i = 0; i < values.length; i++) {
            Object val = values[i];
            buff.append(val == null ? "" : val.toString());
            if (i != values.length - 1) {
                buff.append("\n");
            }
        }
        
        return new StringSelection(buff.toString());
    }
    
    /**
     * We support both copy and move actions.
     */
    public int getSourceActions(JComponent c) {
        return TransferHandler.COPY_OR_MOVE;
    }
    
    /**
     * Perform the actual import.  This demo only supports drag and drop.
     */
    public boolean importData(TransferHandler.TransferSupport info) {
        if (!info.isDrop()) {
            return false;
        }

        JList list = (JList)info.getComponent();
        DefaultListModel listModel = (DefaultListModel)list.getModel();
        JList.DropLocation dl = (JList.DropLocation)info.getDropLocation();
        int index = dl.getIndex();
        boolean insert = dl.isInsert();

        // Get the string that is being dropped.
        Transferable t = info.getTransferable();
        String data;
        try {
            data = (String)t.getTransferData(DataFlavor.stringFlavor);
        } 
        catch (Exception e) { return false; }
                                
        // Wherever there is a newline in the incoming data,
        // break it into a separate item in the list.
        String[] values = data.split("\n");
        
        addIndex = index;
        addCount = values.length;
        
        // Perform the actual import.  
        for (int i = 0; i < values.length; i++) {
            if (insert) {
                listModel.add(index++, values[i]);
            } else {
                // If the items go beyond the end of the current
                // list, add them in.
                if (index < listModel.getSize()) {
                    listModel.set(index++, values[i]);
                } else {
                    listModel.add(index++, values[i]);
                }
            }
        }
        return true;
    }

    /**
     * Remove the items moved from the list.
     */
    protected void exportDone(JComponent c, Transferable data, int action) {
        JList source = (JList)c;
        DefaultListModel listModel  = (DefaultListModel)source.getModel();

        if (action == TransferHandler.MOVE) {
            for (int i = indices.length - 1; i >= 0; i--) {
                listModel.remove(indices[i]);
            }
        }
        
        indices = null;
        addCount = 0;
        addIndex = -1;
    }
}
```

Next we look at how the target can choose the drop action.
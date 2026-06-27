---
分类:
  - "网页裁剪"
标题: "Putting it All Together - DnD and CCP (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/together.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Putting it All Together - DnD and CCP (The Java™ Tutorials >        
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

[[Swing-listpaste|CCP in a non-Text Component]]

[[Swing-dataflavor|Using and Creating a DataFlavor]]

Putting it All Together - DnD and CCP

[[Swing-拖放问题|Solving Common Data Transfer Problems]]

[[Swing-dataflavor|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-拖放问题|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Putting it All Together - DnD and CCP

We have shown how to implement drag and drop support and how to implement cut, copy, paste support. How do you combine both in one component?

You implement both within the `TransferHandler` 's `importData` method, like this:

```bash
if (transferSupport.isDrop()) {
    // put data in transferSupport.getDropLocation()
} else {
    // determine where you want the paste to go (ex: after current selection)
    // put data there
}
```java

The `ListCutPaste` example, discussed on the [[Swing-listpaste|CCP in a non-Text Component]] page, supports both dnd and ccp. Here is its `importData` method (the `if` - `else` drop logic is bolded):

```sql
public boolean importData(TransferHandler.TransferSupport info) {
    String data = null;

    //If we cannot handle the import, bail now.
    if (!canImport(info)) {
        return false;
    }

    JList list = (JList)info.getComponent();
    DefaultListModel model = (DefaultListModel)list.getModel();
    //Fetch the data -- bail if this fails
    try {
        data = (String)info.getTransferable().getTransferData(DataFlavor.stringFlavor);
    } catch (UnsupportedFlavorException ufe) {
        System.out.println("importData: unsupported data flavor");
        return false;
    } catch (IOException ioe) {
        System.out.println("importData: I/O exception");
        return false;
    }

    if (info.isDrop()) { //This is a drop
        JList.DropLocation dl = (JList.DropLocation)info.getDropLocation();
        int index = dl.getIndex();
        if (dl.isInsert()) {
            model.add(index, data);
            return true;
        } else {
            model.set(index, data);
            return true;
        }
    } else { //This is a paste
        int index = list.getSelectedIndex();
        // if there is a valid selection,
        // insert data after the selection
        if (index >= 0) {
            model.add(list.getSelectedIndex()+1, data);
        // else append to the end of the list
        } else {
            model.addElement(data);
        }
        return true;
    }
}
```

This is the only place where you need to install `if` - `else` logic to distinguish between dnd and ccp.
Documentation

Drag and Drop and Data Transfer

[Introduction to DnD](https://docs.oracle.com/javase/tutorial/uiswing/dnd/intro.html)

[Default DnD Support](https://docs.oracle.com/javase/tutorial/uiswing/dnd/defaultsupport.html)

[Demo - BasicDnD](https://docs.oracle.com/javase/tutorial/uiswing/dnd/basicdemo.html)

[TransferHandler Class](https://docs.oracle.com/javase/tutorial/uiswing/dnd/transferhandler.html)

[Export Methods](https://docs.oracle.com/javase/tutorial/uiswing/dnd/export.html)

[Import Methods](https://docs.oracle.com/javase/tutorial/uiswing/dnd/import.html)

[TransferSupport Class](https://docs.oracle.com/javase/tutorial/uiswing/dnd/transfersupport.html)

[Setting the Drop Mode](https://docs.oracle.com/javase/tutorial/uiswing/dnd/dropmodes.html)

[Demo - DropDemo](https://docs.oracle.com/javase/tutorial/uiswing/dnd/dropmodedemo.html)

[Choosing the Drop Action](https://docs.oracle.com/javase/tutorial/uiswing/dnd/dropaction.html)

[Demo - ChooseDropAction](https://docs.oracle.com/javase/tutorial/uiswing/dnd/dropactiondemo.html)

[Showing the Drop Location](https://docs.oracle.com/javase/tutorial/uiswing/dnd/showdroploc.html)

[Location Sensitive Drop](https://docs.oracle.com/javase/tutorial/uiswing/dnd/locsensitivedrop.html)

[Demo - LocationSensitiveDemo](https://docs.oracle.com/javase/tutorial/uiswing/dnd/locsensitivedemo.html)

[Empty Table Drop](https://docs.oracle.com/javase/tutorial/uiswing/dnd/emptytable.html)

[Drop Location Rendering](https://docs.oracle.com/javase/tutorial/uiswing/dnd/droplocation.html)

[Top-Level Drop](https://docs.oracle.com/javase/tutorial/uiswing/dnd/toplevel.html)

[Adding Cut, Copy and Paste (CCP)](https://docs.oracle.com/javase/tutorial/uiswing/dnd/cutpaste.html)

[CCP in a Text Component](https://docs.oracle.com/javase/tutorial/uiswing/dnd/textpaste.html)

[CCP in a non-Text Component](https://docs.oracle.com/javase/tutorial/uiswing/dnd/listpaste.html)

[Using and Creating a DataFlavor](https://docs.oracle.com/javase/tutorial/uiswing/dnd/dataflavor.html)

[Putting it All Together - DnD and CCP](https://docs.oracle.com/javase/tutorial/uiswing/dnd/together.html)

[Solving Common Data Transfer Problems](https://docs.oracle.com/javase/tutorial/uiswing/dnd/problems.html)

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/index.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/uiswing/dnd/intro.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Drag and Drop and Data Transfer

[Examples Index](https://docs.oracle.com/javase/tutorial/uiswing/examples/dnd/index.html)  

Drag and drop, and cut, copy and paste (collectively called *data transfer*) are essential features of most applications. But what kind of support does Swing provide and how do you take advantage of it?

For many components, when performing a drag and drop or a cut and paste operation, Swing handles all of the work for you. For a handful of components, most of the work is done for you and all that is left for you is to plug in the details of the data import and export.

This lesson provides an introduction to the data transfer mechanism used by Swing and discusses, in particular, the `TransferHandler` class, the workhorse of the data transfer system.

If you are interested in using JavaFX to create your GUI, see [Drag-and-Drop Feature in JavaFX Applications](https://docs.oracle.com/javase/8/javafx/events-tutorial/drag_drop_feature.htm).
---
分类:
  - "网页裁剪"
标题: "How to Use File Choosers (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/filechooser.html"
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

How to Use File Choosers

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

[[Swing-组件-editorpane|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-formattedtextfield|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use File Choosers

File choosers provide a GUI for navigating the file system, and then either choosing a file or directory from a list, or entering the name of a file or directory. To display a file chooser, you usually use the `JFileChooser` API to show a modal [[Swing-组件-dialog|dialog]] containing the file chooser. Another way to present a file chooser is to add an instance of [`JFileChooser`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html) to a container.

---

**Note:**

If you intend to distribute your program as a sandbox Java Web Start application, then instead of using the `JFileChooser` API you should use the file services provided by the JNLP API. These services — `FileOpenService` and `FileSaveService` — not only provide support for choosing files in a restricted environment, but also take care of actually opening and saving them. An example of using these services is in [JWSFileChooserDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#JWSFileChooserDemo). Documentation for using the JNLP API can be found in the [[部署-WebStart|Java Web Start]] lesson.

---

Click the Launch button to run JWSFileChooserDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#JWSFileChooserDemo).

When working with the `JWSFileChooserDemo` example, be careful not to lose files that you need. Whenever you click the save button and select an existing file, this demo brings up the File Exists dialog box with a request to replace the file. Accepting the request overwrites the file.

The rest of this section discusses how to use the `JFileChooser` API. A `JFileChooser` object only presents the GUI for choosing files. Your program is responsible for doing something with the chosen file, such as opening or saving it. Refer to [[Java核心类库-基本IO|Basic I/O]] for information on how to read and write files.

The `JFileChooser` API makes it easy to bring up open and save dialogs. The type of look and feel determines what these standard dialogs look like and how they differ. In the Java look and feel, the save dialog looks the same as the open dialog, except for the title on the dialog's window and the text on the button that approves the operation. Here is a picture of a standard open dialog in the Java look and feel:

![A standard open dialog shown in the Java look and feel](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/FileChooserOpenMetal.png)

Here is a picture of an application called `FileChooserDemo` that brings up an open dialog and a save dialog.

![A program that brings up an open or save dialog](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/FileChooserDemo2Metal.png)

---

**Try this:**
1. Compile and run the example, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FileChooserDemo).
2. Click the Open a File button. Navigate around the file chooser, choose a file, and click the dialog's Open button.
3. Use the Save a File button to bring up a save dialog. Try to use all of the controls on the file chooser.
4. In the source file [`FileChooserDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/FileChooserDemoProject/src/components/FileChooserDemo.java), change the file selection mode to directories-only mode. (Search for `DIRECTORIES_ONLY` and uncomment the line that contains it.) Then compile and run the example again. You will only be able to see and select directories, not ordinary files.

---

Bringing up a standard open dialog requires only two lines of code:

```
//Create a file chooser
final JFileChooser fc = new JFileChooser();
...
//In response to a button click:
int returnVal = fc.showOpenDialog(aComponent);
```

The argument to the `showOpenDialog` method specifies the parent component for the dialog. The parent component affects the position of the dialog and the frame that the dialog depends on. For example, the Java look and feel places the dialog directly over the parent component. If the parent component is in a frame, then the dialog is dependent on that frame. This dialog disappears when the frame is minimized and reappears when the frame is maximized.

By default, a file chooser that has not been shown before displays all files in the user's home directory. You can specify the file chooser's initial directory by using one of `JFileChooser` 's other constructors, or you can set the directory with the `setCurrentDirectory` method.

The call to `showOpenDialog` appears in the `actionPerformed` method of the Open a File button's action listener:

```java
public void actionPerformed(ActionEvent e) {
    //Handle open button action.
    if (e.getSource() == openButton) {
        int returnVal = fc.showOpenDialog(FileChooserDemo.this);

        if (returnVal == JFileChooser.APPROVE_OPTION) {
            File file = fc.getSelectedFile();
            //This is where a real application would open the file.
            log.append("Opening: " + file.getName() + "." + newline);
        } else {
            log.append("Open command cancelled by user." + newline);
        }
   } ...
}
```

The `show*Xxx*Dialog` methods return an integer that indicates whether the user selected a file. Depending on how you use a file chooser, it is often sufficient to check whether the return value is `APPROVE_OPTION` and then not to change any other value. To get the chosen file (or directory, if you set up the file chooser to allow directory selections), call the `getSelectedFile` method on the file chooser. This method returns an instance of [`File`](https://docs.oracle.com/javase/8/docs/api/java/io/File.html).

The example obtains the name of the file and uses it in the log message. You can call other methods on the `File` object, such as `getPath`, `isDirectory`, or `exists` to obtain information about the file. You can also call other methods such as `delete` and `rename` to change the file in some way. Of course, you might also want to open or save the file by using one of the reader or writer classes provided by the Java platform. See [[Java核心类库-基本IO|Basic I/O]] for information about using readers and writers to read and write data to the file system.

The example program uses the same instance of the `JFileChooser` class to display a standard save dialog. This time the program calls `showSaveDialog`:

```
int returnVal = fc.showSaveDialog(FileChooserDemo.this);
```

By using the same file chooser instance to display its open and save dialogs, the program reaps the following benefits:

- The chooser remembers the current directory between uses, so the open and save versions automatically share the same current directory.
- You have to customize only one file chooser, and the customizations apply to both the open and save versions.

Finally, the example program has commented-out lines of code that let you change the file selection mode. For example, the following line of code makes the file chooser able to select only directories, and not files:

```
fc.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
```

Another possible selection mode is `FILES_AND_DIRECTORIES`. The default is `FILES_ONLY`. The following picture shows an open dialog with the file selection mode set to `DIRECTORIES_ONLY`. Note that, in the Java look and feel at least, only directories are visible — not files.

![A file chooser in DIRECTORIES_ONLY mode](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/FileChooserDirectoriesMetal.png)

If you want to create a file chooser for a task other than opening or saving, or if you want to customize the file chooser, keep reading. We will discuss the following topics:

- [Another Example: FileChooserDemo2](#advancedexample)
- [Using a File Chooser for a Custom Task](#customtask)
- [Filtering the List of Files](#filters)
- [Customizing the File View](#fileview)
- [Providing an Accessory Component](#accessory)
- [The File Chooser API](#api)
- [Examples that Use File Choosers](#eg)

## Another Example: FileChooserDemo2

Let us look at [`FileChooserDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FileChooserDemo2) example, a modified version of the previous demo program that uses more of the `JFileChooser` API. This example uses a file chooser that has been customized in several ways. Like the original example, the user invokes a file chooser with the push of a button. Here is a picture of the file chooser:

![A file chooser with various customizations](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/FileChooserDemo3Metal.png)

As the figure shows, this file chooser has been customized for a special task (Attach), provides a user-choosable file filter (Just Images), uses a special file view for image files, and has an accessory component that displays a thumbnail sketch of the currently selected image file.

The remainder of this section shows you the code that creates and customizes this file chooser. See the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FileChooserDemo2) for links to all the files required by this example.

## Using a File Chooser for a Custom Task

As you have seen, the `JFileChooser` class provides the `showOpenDialog` method for displaying an open dialog and the `showSaveDialog` method for displaying a save dialog.

The class has another method, `showDialog`, for displaying a file chooser for a custom task in a dialog. In the Java look and feel, the only difference between this dialog and the other file chooser dialogs is the title on the dialog window and the label on the approve button. Here is the code from `FileChooserDemo2` that brings up the file chooser dialog for the Attach task:

```
JFileChooser fc = new JFileChooser();
int returnVal = fc.showDialog(FileChooserDemo2.this, "Attach");
```

The first argument to the `showDialog` method is the parent component for the dialog. The second argument is a `String` object that provides both the title for the dialog window and the label for the approve button.

Once again, the file chooser doesn't do anything with the selected file. The program is responsible for implementing the custom task for which the file chooser was created.

## Filtering the List of Files

By default, a file chooser displays all of the files and directories that it detects, except for hidden files. A program can apply one or more *file filters* to a file chooser so that the chooser shows only some files. The file chooser calls the filter's `accept` method for each file to determine whether it should be displayed. A file filter accepts or rejects a file based on criteria such as file type, size, ownership, and so on. Filters affect the list of files displayed by the file chooser. The user can enter the name of any file even if it is not displayed.

`JFileChooser` supports three different kinds of filtering. The filters are checked in the order listed here. For example, an application-controlled filter sees only those files accepted by the built-in filtering.

**Built-in filtering**

Filtering is set up through specific method calls on a file chooser. Currently the only built-in filter available is for hidden files, such as those whose names begin with period (.) on UNIX systems. By default, hidden files are not shown. Call `setFileHidingEnabled(false)` to show hidden files.

**Application-controlled filtering**

The application determines which files are shown. Create a custom subclass of [`FileFilter`](https://docs.oracle.com/javase/8/docs/api/javax/swing/filechooser/FileFilter.html), instantiate it, and use the instance as an argument to the `setFileFilter` method. The installed filter is displayed on the list of user-choosable filters. The file chooser shows only those files that the filter accepts.

**User-choosable filtering**

The file chooser GUI provides a list of filters that the user can choose from. When the user chooses a filter, the file chooser shows only those files accepted by that filter. `FileChooserDemo2` adds a custom file filter to the list of user-choosable filters:

```
fc.addChoosableFileFilter(new ImageFilter());
```

By default, the list of user-choosable filters includes the Accept All filter, which enables the user to see all non-hidden files. This example uses the following code to disable the Accept All filter:

```
fc.setAcceptAllFileFilterUsed(false);
```

Our custom file filter is implemented in [`ImageFilter.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/FileChooserDemo2Project/src/components/ImageFilter.java) and is a subclass of `FileFilter`. The `ImageFilter` class implements the `getDescription` method to return "Just Images" — a string to put in the list of user-choosable filters. `ImageFilter` also implements the `accept` method so that it accepts all directories and any file that has a `.png`, `.jpg`, `.jpeg`, `.gif`, `.tif`, or `.tiff` filename extension.

```bash
public boolean accept(File f) {
    if (f.isDirectory()) {
        return true;
    }

    String extension = Utils.getExtension(f);
    if (extension != null) {
        if (extension.equals(Utils.tiff) ||
            extension.equals(Utils.tif) ||
            extension.equals(Utils.gif) ||
            extension.equals(Utils.jpeg) ||
            extension.equals(Utils.jpg) ||
            extension.equals(Utils.png)) {
                return true;
        } else {
            return false;
        }
    }

    return false;
}
```

By accepting all directories, this filter allows the user to navigate around the file system. If the bold lines were omitted from this method, the user would be limited to the directory with which the chooser was initialized.

The preceding code sample uses the `getExtension` method and several string constants from [`Utils.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/FileChooserDemo2Project/src/components/Utils.java), shown here:

```java
public class Utils {

    public final static String jpeg = "jpeg";
    public final static String jpg = "jpg";
    public final static String gif = "gif";
    public final static String tiff = "tiff";
    public final static String tif = "tif";
    public final static String png = "png";

    /*
     * Get the extension of a file.
     */  
    public static String getExtension(File f) {
        String ext = null;
        String s = f.getName();
        int i = s.lastIndexOf('.');

        if (i > 0 &&  i < s.length() - 1) {
            ext = s.substring(i+1).toLowerCase();
        }
        return ext;
    }
}
```

## Customizing the File View

In the Java look and feel, the chooser's list shows each file's name and displays a small icon that represents whether the file is a true file or a directory. You can customize this *file view* by creating a custom subclass of [`FileView`](https://docs.oracle.com/javase/8/docs/api/javax/swing/filechooser/FileView.html) and using an instance of the class as an argument to the `setFileView` method. The example uses an instance of a custom class, implemented in [`ImageFileView.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/FileChooserDemo2Project/src/components/ImageFileView.java), as the file chooser's file view.

```
fc.setFileView(new ImageFileView());
```

The `ImageFileView` class shows a different icon for each type of image accepted by the image filter described previously.

The `ImageFileView` class overrides the five abstract methods defined in the `FileView` as follows.

**`String getTypeDescription(File f)`**

Returns a description of the file type. Here is `ImageFileView` 's implementation of this method:

```bash
public String getTypeDescription(File f) {
    String extension = Utils.getExtension(f);
    String type = null;

    if (extension != null) {
        if (extension.equals(Utils.jpeg) ||
            extension.equals(Utils.jpg)) {
            type = "JPEG Image";
        } else if (extension.equals(Utils.gif)){
            type = "GIF Image";
        } else if (extension.equals(Utils.tiff) ||
                   extension.equals(Utils.tif)) {
            type = "TIFF Image";
        } else if (extension.equals(Utils.png)){
            type = "PNG Image";
        }
    }
    return type;
}
```

**`Icon getIcon(File f)`**

Returns an icon representing the file or its type. Here is `ImageFileView` 's implementation of this method:

```bash
public Icon getIcon(File f) {
    String extension = Utils.getExtension(f);
    Icon icon = null;

    if (extension != null) {
        if (extension.equals(Utils.jpeg) ||
            extension.equals(Utils.jpg)) {
            icon = jpgIcon;
        } else if (extension.equals(Utils.gif)) {
            icon = gifIcon;
        } else if (extension.equals(Utils.tiff) ||
                   extension.equals(Utils.tif)) {
            icon = tiffIcon;
        } else if (extension.equals(Utils.png)) {
            icon = pngIcon;
        }
    }
    return icon;
}
```

**`String getName(File f)`**

Returns the name of the file. Most implementations of this method should return `null` to indicate that the look and feel should figure it out. Another common implementation returns `f.getName()`.

**`String getDescription(File f)`**

Returns a description of the file. The intent is to describe individual files more specifically. A common implementation of this method returns `null` to indicate that the look and feel should figure it out.

**`Boolean isTraversable(File f)`**

Returns whether a directory is traversable. Most implementations of this method should return `null` to indicate that the look and feel should figure it out. Some applications might want to prevent users from descending into a certain type of directory because it represents a compound document. The `isTraversable` method should never return `true` for a non-directory.

## Providing an Accessory Component

The customized file chooser in `FileChooserDemo2` has an accessory component. If the currently selected item is a PNG, JPEG, TIFF, or GIF image, the accessory component displays a thumbnail sketch of the image. Otherwise, the accessory component is empty. Aside from a previewer, probably the most common use for the accessory component is a panel with more controls on it such as check boxes that toggle between features.

The example calls the `setAccessory` method to establish an instance of the `ImagePreview` class, implemented in [`ImagePreview.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/FileChooserDemo2Project/src/components/ImagePreview.java), as the chooser's accessory component:

```
fc.setAccessory(new ImagePreview(fc));
```

Any object that inherits from the `JComponent` class can be an accessory component. The component should have a preferred size that looks good in the file chooser.

The file chooser fires a property change event when the user selects an item in the list. A program with an accessory component must register to receive these events to update the accessory component whenever the selection changes. In the example, the `ImagePreview` object itself registers for these events. This keeps all the code related to the accessory component together in one class.

Here is the example's implementation of the `propertyChange` method, which is the method called when a property change event is fired:

```sql
//where member variables are declared
File file = null;
...
public void propertyChange(PropertyChangeEvent e) {
    boolean update = false;
    String prop = e.getPropertyName();

    //If the directory changed, don't show an image.
    if (JFileChooser.DIRECTORY_CHANGED_PROPERTY.equals(prop)) {
        file = null;
        update = true;

    //If a file became selected, find out which one.
    } else if (JFileChooser.SELECTED_FILE_CHANGED_PROPERTY.equals(prop)) {
        file = (File) e.getNewValue();
        update = true;
    }

    //Update the preview accordingly.
    if (update) {
        thumbnail = null;
        if (isShowing()) {
            loadImage();
            repaint();
        }
    }
}
```

If `SELECTED_FILE_CHANGED_PROPERTY` is the property that changed, this method obtains a `File` object from the file chooser. The `loadImage` and `repaint` methods use the `File` object to load the image and repaint the accessory component.

## The File Chooser API

The API for using file choosers falls into these categories:

- [Creating and Showing the File Chooser](#show)
- [Selecting Files and Directories](#selection)
- [Navigating the File Chooser's List](#navigation)
- [Customizing the File Chooser](#customization)

| Method or Constructor | Purpose |
| --- | --- |
| [JFileChooser()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#JFileChooser--)   [JFileChooser(File)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#JFileChooser-java.io.File-)   [JFileChooser(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#JFileChooser-java.lang.String-) | Creates a file chooser instance. The `File` and `String` arguments, when present, provide the initial directory. |
| [int showOpenDialog(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#showOpenDialog-java.awt.Component-)   [int showSaveDialog(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#showSaveDialog-java.awt.Component-)   [int showDialog(Component, String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#showDialog-java.awt.Component-java.lang.String-) | Shows a modal dialog containing the file chooser. These methods return `APPROVE_OPTION` if the user approved the operation and `CANCEL_OPTION` if the user cancelled it. Another possible return value is `ERROR_OPTION`, which means an unanticipated error occurred. |

| Method | Purpose |
| --- | --- |
| [void setSelectedFile(File)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setSelectedFile-java.io.File-)   [File getSelectedFile()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#getSelectedFile--) | Sets or obtains the currently selected file or (if directory selection has been enabled) directory. |
| [void setSelectedFiles(File\[\])](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setSelectedFiles-java.io.File:A-)   [File\[\] getSelectedFiles()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#getSelectedFiles--) | Sets or obtains the currently selected files if the file chooser is set to allow multiple selection. |
| [void setFileSelectionMode(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setFileSelectionMode-int-)   [void getFileSelectionMode()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#getFileSelectionMode--)   [boolean isDirectorySelectionEnabled()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#isDirectorySelectionEnabled--)   [boolean isFileSelectionEnabled()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#isFileSelectionEnabled--) | Sets or obtains the file selection mode. Acceptable values are `FILES_ONLY` (the default), `DIRECTORIES_ONLY`, and `FILES_AND_DIRECTORIES`.   Interprets whether directories or files are selectable according to the current selection mode. |
| [void setMultiSelectionEnabled(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setMultiSelectionEnabled-boolean-)   [boolean isMultiSelectionEnabled()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#isMultiSelectionEnabled--) | Sets or interprets whether multiple files can be selected at once. By default, a user can choose only one file. |
| [void setAcceptAllFileFilterUsed(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setAcceptAllFileFilterUsed-boolean-)   [boolean isAcceptAllFileFilterUsed()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#isAcceptAllFileFilterUsed--) | Sets or obtains whether the `AcceptAll` file filter is used as an allowable choice in the choosable filter list; the default value is `true`. |
| [Dialog createDialog(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#createDialog-java.awt.Component-) | Given a parent component, creates and returns a new dialog that contains this file chooser, is dependent on the parent's frame, and is centered over the parent. |

| Method | Purpose |
| --- | --- |
| [void ensureFileIsVisible(File)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#ensureFileIsVisible-java.io.File-) | Scrolls the file chooser's list such that the indicated file is visible. |
| [void setCurrentDirectory(File)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setCurrentDirectory-java.io.File-)   [File getCurrentDirectory()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#getCurrentDirectory--) | Sets or obtains the directory whose files are displayed in the file chooser's list. |
| [void changeToParentDirectory()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#changeToParentDirectory--) | Changes the list to display the current directory's parent. |
| [void rescanCurrentDirectory()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#rescanCurrentDirectory--) | Checks the file system and updates the chooser's list. |
| [void setDragEnabled(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setDragEnabled-boolean-)   [boolean getDragEnabled()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#getDragEnabled--) | Sets or obtains the property that determines whether automatic drag handling is enabled. See [[Swing-拖放|Drag and Drop and Data Transfer]] for more details. |

| Method | Purpose |
| --- | --- |
| [void setAccessory(javax.swing.JComponent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setAccessory-javax.swing.JComponent-)   [JComponent getAccessory()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#getAccessory--) | Sets or obtains the file chooser's accessory component. |
| [void setFileFilter(FileFilter)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setFileFilter-javax.swing.filechooser.FileFilter-)   [FileFilter getFileFilter()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#getFileFilter--) | Sets or obtains the file chooser's primary file filter. |
| [void setFileView(FileView)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setFileView-javax.swing.filechooser.FileView-)   [FileView getFileView()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#getFileView--) | Sets or obtains the chooser's file view. |
| [FileFilter\[\] getChoosableFileFilters()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#getChoosableFileFilters--)   [void addChoosableFileFilter(FileFilter)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#addChoosableFileFilter-javax.swing.filechooser.FileFilter-)   [boolean removeChoosableFileFilter(FileFilter)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#removeChoosableFileFilter-javax.swing.filechooser.FileFilter-)   [void resetChoosableFileFilters()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#resetChoosableFileFilters--)   [FileFilter getAcceptAllFileFilter()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#getAcceptAllFileFilter--) | Sets, obtains, or modifies the list of user-choosable file filters. |
| [void setFileHidingEnabled(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setFileHidingEnabled-boolean-)   [boolean isFileHidingEnabled()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#isFileHidingEnabled--) | Sets or obtains whether hidden files are displayed. |
| [void setControlButtonsAreShown(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#setControlButtonsAreShown-boolean-)   [boolean getControlButtonsAreShown()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFileChooser.html#getControlButtonsAreShown--) | Sets or obtains the property that indicates whether the Approve and Cancel buttons are shown in the file chooser. This property is true by default. |

## Examples That Use File Choosers

This table shows the examples that use file choosers and points to where those examples are described.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`FileChooserDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FileChooserDemo) | This section | Displays an open dialog and a save dialog. |
| [`FileChooserDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FileChooserDemo2) | This section | Uses a file chooser with custom filtering, a custom file view, and an accessory component. |
| [`JWSFileChooserDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#JWSFileChooserDemo) | This section | Uses the JNLP API to open and save files. |
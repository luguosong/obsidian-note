---
分类:
  - "网页裁剪"
标题: "How to Use Internal Frames (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/internalframe.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Internal Frames (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)

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

How to Use Internal Frames

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

[[Swing-组件-frame|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-label|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Internal Frames

With the [`JInternalFrame`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html) class you can display a [[Swing-组件-frame|`JFrame`]] -like window within another window. Usually, you add internal frames to a desktop pane. The desktop pane, in turn, might be used as the content pane of a `JFrame`. The desktop pane is an instance of [`JDesktopPane`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JDesktopPane.html), which is a subclass of [[Swing-组件-layeredpane|`JLayeredPane`]] that has added API for managing multiple overlapping internal frames.

You should consider carefully whether to base your program's GUI around frames or internal frames. Switching from internal frames to frames or vice versa is not necessarily a simple task. By experimenting with both frames and internal frames, you can get an idea of the tradeoffs involved in choosing one over the other.

Here is a picture of an application that has two internal frames (one of which is iconified) inside a regular frame:

![InternalFrameDemo has multiple internal frames, managed by a desktop pane](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/InternalFrameDemoMetal.png)

---

**Try this:**
1. Click the Launch button to run InternalFrameDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#InternalFrameDemo).
2. Create new internal frames using the Create item in the Document menu.  
	Each internal frame comes up 30 pixels lower and to the right of the place where the previous internal frame first appeared. This functionality is implemented in the `MyInternalFrame` class, which is the custom subclass of `JInternalFrame`.

---

The following code, taken from [`InternalFrameDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/InternalFrameDemoProject/src/components/InternalFrameDemo.java), creates the desktop and internal frames in the previous example.

```java
...//In the constructor of InternalFrameDemo, a JFrame subclass:
    desktop = new JDesktopPane();
    createFrame(); //Create first window
    setContentPane(desktop);
    ...
    //Make dragging a little faster but perhaps uglier.
    desktop.setDragMode(JDesktopPane.OUTLINE_DRAG_MODE);
...
protected void createFrame() {
    MyInternalFrame frame = new MyInternalFrame();
    frame.setVisible(true);
    desktop.add(frame);
    try {
        frame.setSelected(true);
    } catch (java.beans.PropertyVetoException e) {}
}

...//In the constructor of MyInternalFrame, a JInternalFrame subclass:
static int openFrameCount = 0;
static final int xOffset = 30, yOffset = 30;

public MyInternalFrame() {
    super("Document #" + (++openFrameCount),
          true, //resizable
          true, //closable
          true, //maximizable
          true);//iconifiable
    //...Create the GUI and put it in the window...
    //...Then set the window size or call pack...
    ...
    //Set the window's location.
    setLocation(xOffset*openFrameCount, yOffset*openFrameCount);
}
```

## Internal Frames vs. Regular Frames

The code for using internal frames is similar in many ways to the code for using regular Swing frames. Because internal frames have root panes, setting up the GUI for a `JInternalFrame` is very similar to setting up the GUI for a `JFrame`. `JInternalFrame` also provides other API, such as `pack`, that makes it similar to `JFrame`.

---

**Note:**

Just as for a regular frame, you must invoke `setVisible(true)` or `show()` on an internal frame to display it. The internal frame does not appear until you explicitly make it visible.

---

Internal frames are not windows or top-level containers, however, which makes them different from frames. For example, you must add an internal frame to a container (usually a `JDesktopPane`); an internal frame cannot be the root of a containment hierarchy. Also, internal frames do not generate window events. Instead, the user actions that would cause a frame to fire window events cause an internal frame to fire internal frame events.

Because internal frames are implemented with platform-independent code, they add some features that frames cannot give you. One such feature is that internal frames give you more control over their state and capabilities than frames do. You can programmatically iconify or maximize an internal frame. You can also specify what icon goes in the internal frame's title bar. You can even specify whether the internal frame has the window decorations to support resizing, iconifying, closing, and maximizing.

Another feature is that internal frames are designed to work within desktop panes. The `JInternalFrame` API contains methods such as `moveToFront` that work only if the internal frame's container is a layered pane such as a `JDesktopPane`.

## Rules of Using Internal Frames

If you have built any programs using `JFrame` and the other Swing components, then you already know a lot about how to use internal frames. The following list summarizes the rules for using internal frames. For additional information, see [[Swing-组件-frame|How to Make Frames]] and [[Swing-组件-jcomponent|The JComponent Class]].

**You must set the size of the internal frame.**

If you do not set the size of the internal frame, it will have zero size and thus never be visible. You can set the size using one of the following methods: `setSize`, `pack`, or `setBounds`.

**As a rule, you should set the location of the internal frame.**

If you do not set the location of the internal frame, it will come up at 0,0 (the upper left of its container). You can use the `setLocation` or `setBounds` method to specify the upper left point of the internal frame, relative to its container.

**To add components to an internal frame, you add them to the internal frame's content pane.**

This is exactly like the `JFrame` situation. See [[Swing-组件-toplevel|Adding Components to the Content Pane]] for details.

**Dialogs that are internal frames should be implemented using `JOptionPane` or `JInternalFrame`, not `JDialog`.**

To create a simple dialog, you can use the `JOptionPane` `showInternal*Xxx*Dialog` methods, as described in [[Swing-组件-dialog|How to Make Dialogs]].

**You must add an internal frame to a container.**

If you do not add the internal frame to a container (usually a `JDesktopPane`), the internal frame will not appear.

**You need to call `show` or `setVisible` on internal frames.**

Internal frames are invisible by default. You must invoke `setVisible(true)` or `show()` to make them visible.

**Internal frames fire internal frame events, not window events.**

Handling internal frame events is almost identical to handling window events. See [[Swing-事件监听-internalframelistener|How to Write an Internal Frame Listener]] for more information.

---

**Performance tip:**

When a desktop has many internal frames, the user might notice that moving them seems slow. Outline dragging is one way to avoid this problem. With outline dragging, only the outline of the internal frame is painted at the current mouse position while the internal frame's being dragged. The internal frame's innards are not repainted at a new position until dragging stops. The default behavior (called *live* dragging) is to reposition and repaint some or all of internal frame continuously while it is being moved; this can be slow if the desktop has many internal frames.

Use the `JDesktopPane` method `setDragMode` \* to specify outline dragging. For example:

```text
desktop.setDragMode(JDesktopPane.OUTLINE_DRAG_MODE);
```

---

## The Internal Frame API

The following tables list the commonly used `JInternalFrame` constructors and methods, as well as a few methods that `JDesktopPane` provides. Besides the API listed in this section, `JInternalFrame` inherits useful API from its superclasses, `JComponent`, `Component`, and `Container`. See [[Swing-组件-jcomponent|The JComponent Class]] for lists of methods from those classes.

Like `JInternalFrame`, `JDesktopPane` descends from `JComponent`, and thus provides the methods described in [[Swing-组件-jcomponent|The JComponent Class]]. Because `JDesktopPane` extends `JLayeredPane`, it also supports the methods described in [[Swing-组件-layeredpane|The Layered Pane API]].

The API for using internal frames falls into these categories:

- [Creating the internal frame](#construct)
- [Adding components to the internal frame](#add)
- [Specifying the internal frame's visibility, size, and location](#layout)
- [Performing window operations on the internal frame](#window)
- [Controlling window decorations and capabilities](#decorate)
- [Using the JDesktopPane API](#JDesktopPane)

| Constructor or Method | Purpose |
| --- | --- |
| [JInternalFrame()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#JInternalFrame--)   [JInternalFrame(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#JInternalFrame-java.lang.String-)   [JInternalFrame(String, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#JInternalFrame-java.lang.String-boolean-)   [JInternalFrame(String, boolean, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#JInternalFrame-java.lang.String-boolean-boolean-)   [JInternalFrame(String, boolean, boolean, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#JInternalFrame-java.lang.String-boolean-boolean-boolean-)   [JInternalFrame(String, boolean, boolean, boolean, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#JInternalFrame-java.lang.String-boolean-boolean-boolean-boolean-) | Create a `JInternalFrame` instance. The first argument specifies the title (if any) to be displayed by the internal frame. The rest of the arguments specify whether the internal frame should contain decorations allowing the user to resize, close, maximize, and iconify the internal frame (specified in that order). The default value for each boolean argument is `false`, which means that the operation is not allowed. |
| [static int showInternalConfirmDialog(Component, Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JOptionPane.html#showInternalConfirmDialog-java.awt.Component-java.lang.Object-)   [static String showInternalInputDialog(Component, Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JOptionPane.html#showInternalInputDialog-java.awt.Component-java.lang.Object-)   [static Object showInternalMessageDialog(Component, Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JOptionPane.html#showInternalMessageDialog-java.awt.Component-java.lang.Object-)   [static int showInternalOptionDialog(Component, Object, String, int, int, Icon, Object\[\], Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JOptionPane.html#showInternalOptionDialog-java.awt.Component-java.lang.Object-java.lang.String-int-int-javax.swing.Icon-java.lang.Object:A-java.lang.Object-) | Create a `JInternalFrame` that simulates a dialog. See [[Swing-组件-dialog|How to Make Dialogs]] for details. |

| Method | Purpose |
| --- | --- |
| [void setContentPane(Container)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setContentPane-java.awt.Container-)   [Container getContentPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#getContentPane--) | Set or get the internal frame's content pane, which generally contains all of the internal frame's GUI, with the exception of the menu bar and window decorations. |
| [void setJMenuBar(JMenuBar)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setJMenuBar-javax.swing.JMenuBar-)   [JMenuBar getJMenuBar()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#getJMenuBar--) | Set or get the internal frame's menu bar. |
| [void setLayeredPane(JLayeredPane)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setLayeredPane-javax.swing.JLayeredPane-)   [JLayeredPane getLayeredPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#getLayeredPane--) | Set or get the internal frame's layered pane. |

| Method | Purpose |
| --- | --- |
| [void setVisible(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setVisible-boolean-) | Make the internal frame visible (if `true`) or invisible (if `false`). You should invoke `setVisible(true)` on each `JInternalFrame` before adding it to its container. (Inherited from `Component`). |
| [void pack()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#pack--) | Size the internal frame so that its components are at their preferred sizes. |
| [void setLocation(Point)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setLocation-java.awt.Point-)   [void setLocation(int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setLocation-int-int-) | Set the position of the internal frame. (Inherited from `Component`). |
| [void setBounds(Rectangle)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setBounds-java.awt.Rectangle-)   [void setBounds(int, int, int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setBounds-int-int-int-int-) | Explicitly set the size and location of the internal frame. (Inherited from `Component`). |
| [void setSize(Dimension)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setSize-java.awt.Dimension-)   [void setSize(int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setSize-int-int-) | Explicitly set the size of the internal frame. (Inherited from `Component`). |

| Method | Purpose |
| --- | --- |
| [void setDefaultCloseOperation(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setDefaultCloseOperation-int-)   [int getDefaultCloseOperation()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#getDefaultCloseOperation--) | Set or get what the internal frame does when the user attempts to "close" the internal frame. The default value is `DISPOSE_ON_CLOSE`. Other possible values are `DO_NOTHING_ON_CLOSE` and `HIDE_ON_CLOSE` See [[Swing-组件-frame|Responding to Window-Closing Events]] for details. |
| [void addInternalFrameListener(InternalFrameListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#addInternalFrameListener-javax.swing.event.InternalFrameListener-)   [void removeInternalFrameListener(InternalFrameListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#removeInternalFrameListener-javax.swing.event.InternalFrameListener-) | Add or remove an internal frame listener (`JInternalFrame` 's equivalent of a window listener). See [[Swing-事件监听-internalframelistener|How to Write an Internal Frame Listener]] for more information. |
| [void moveToFront()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#moveToFront--)   [void moveToBack()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#moveToBack--) | If the internal frame's parent is a layered pane such as a desktop pane, moves the internal frame to the front or back (respectively) of its layer. |
| [void setClosed(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setClosed-boolean-)   [boolean isClosed()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#isClosed--) | Set or get whether the internal frame is currently closed. The argument to `setClosed` must be `true`. When reopening a closed internal frame, you make it visible and add it to a container (usually the desktop pane you originally added it to). |
| [void setIcon(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setIcon-boolean-)   [boolean isIcon()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#isIcon--) | Iconify or deiconify the internal frame, or determine whether it is currently iconified. |
| [void setMaximum(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setMaximum-boolean-)   [boolean isMaximum()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#isMaximum--) | Maximize or restore the internal frame, or determine whether it is maximized. |
| [void setSelected(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setSelected-boolean-)   [boolean isSelected()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#isSelected--) | Set or get whether the internal frame is the currently "selected" (activated) internal frame. |

| Method | Purpose |
| --- | --- |
| [void setFrameIcon(Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setFrameIcon-javax.swing.Icon-)   [Icon getFrameIcon()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#getFrameIcon--) | Set or get the icon displayed in the title bar of the internal frame (usually in the top-left corner). |
| [void setClosable(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setClosable-boolean-)   [boolean isClosable()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#isClosable--) | Set or get whether the user can close the internal frame. |
| [void setIconifiable(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setIconifiable-boolean-)   [boolean isIconifiable()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#isIconifiable--) | Set or get whether the internal frame can be iconified. |
| [void setMaximizable(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setMaximizable-boolean-)   [boolean isMaximizable()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#isMaximizable--) | Set or get whether the user can maximize this internal frame. |
| [void setResizable(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setResizable-boolean-)   [boolean isResizable()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#isResizable--) | Set or get whether the internal frame can be resized. |
| [void setTitle(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#setTitle-java.lang.String-)   [String getTitle()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JInternalFrame.html#getTitle--) | Set or get the window title. |

| Constructor or Method | Purpose |
| --- | --- |
| [JDesktopPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JDesktopPane.html#JDesktopPane--) | Creates a new instance of `JDesktopPane`. |
| [JInternalFrame\[\] getAllFrames()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JDesktopPane.html#getAllFrames--) | Returns all `JInternalFrame` objects that the desktop contains. |
| [JInternalFrame\[\] getAllFramesInLayer(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JDesktopPane.html#getAllFramesInLayer-int-) | Returns all `JInternalFrame` objects that the desktop contains that are in the specified layer. See [[Swing-组件-layeredpane|How to Use Layered Panes]] for information about layers. |
| [void setDragMode(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JDesktopPane.html#setDragMode-int-)   [int getDragMode()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JDesktopPane.html#getDragMode--) | Set or get the drag mode used for internal frames in this desktop. The integer can be either `JDesktopPane.LIVE_DRAG_MODE` or `JDesktopPane.OUTLINE_DRAG_MODE`. The default for the Java look and feel is live-drag mode. |

## Examples that Use Internal Frames

The following examples use internal frames. Because internal frames are similar to regular frames, you should also look at [[Swing-组件-frame|Examples that Use Frames]].

| Example | Where Described | Notes |
| --- | --- | --- |
| [`MyInternalFrame`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#InternalFrameDemo) | This page. | Implements an internal frame that appears at an offset to the previously created internal frame. |
| [`InternalFrameDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#InternalFrameDemo) | This page. | Lets you create internal frames (instances of `MyInternalFrame`) that go into the application's `JDesktopPane`. |
| [`InternalFrameEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#InternalFrameEventDemo) | [[Swing-事件监听-internalframelistener|How to Write an Internal Frame Listener]] | Demonstrates listening for internal frame events. Also demonstrates positioning internal frames within a desktop pane. |
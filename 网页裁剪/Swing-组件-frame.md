---
分类:
  - "网页裁剪"
标题: "How to Make Frames (Main Windows) (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/frame.html"
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

How to Make Frames (Main Windows)

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

[[Swing-组件-formattedtextfield|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-internalframe|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Make Frames (Main Windows)

A Frame is a top-level window with a title and a border. The size of the frame includes any area designated for the border. The dimensions of the border area may be obtained using the `getInsets` method. Since the border area is included in the overall size of the frame, the border effectively obscures a portion of the frame, constraining the area available for rendering and/or displaying subcomponents to the rectangle which has an upper-left corner location of `(insets.left`, `insets.top)`, and has a size of `width - (insets.left + insets.right)` by `height - (insets.top + insets.bottom)`.

A frame, implemented as an instance of the [`JFrame`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html) class, is a window that has decorations such as a border, a title, and supports button components that close or iconify the window. Applications with a GUI usually include at least one frame. Applets sometimes use frames, as well.

To make a window that is dependent on another window — disappearing when the other window is iconified, for example — use a [[Swing-组件-dialog|`dialog`]] instead of `frame.`. To make a window that appears within another window, use an [[Swing-组件-internalframe|internal frame]].

## Creating and Showing Frames

Here is a picture of the extremely plain window created by the `FrameDemo` demonstration application. You can find the source code in [`FrameDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/FrameDemoProject/src/components/FrameDemo.java). You can [run FrameDemo](https://docs.oracle.com/javase/tutorialJWS/samples/uiswing/FrameDemoProject/FrameDemo.jnlp) ( [download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)).

![A very boring frame](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/FrameDemoMetal.png)

The following `FrameDemo` code shows how to create and set up a frame.

```
//1. Create the frame.
JFrame frame = new JFrame("FrameDemo");

//2. Optional: What happens when the frame closes?
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

//3. Create components and put them in the frame.
//...create emptyLabel...
frame.getContentPane().add(emptyLabel, BorderLayout.CENTER);

//4. Size the frame.
frame.pack();

//5. Show it.
frame.setVisible(true);
```

Here are some details about the code:

1. The first line of code creates a frame using a constructor that lets you set the frame title. The other frequently used `JFrame` constructor is the no-argument constructor.
2. Next the code specifies what happens when your user closes the frame. The `EXIT_ON_CLOSE` operation exits the program when your user closes the frame. This behavior is appropriate for this program because the program has only one frame, and closing the frame makes the program useless.
	See [Responding to Window-Closing Events](#windowevents) for more information.
3. The next bit of code adds a blank label to the frame content pane. If you're not already familiar with content panes and how to add components to them, please read [[Swing-组件-toplevel|Adding Components to the Content Pane]].
	For frames that have menus, you'd typically add the menu bar to the frame here using the `setJMenuBar` method. See [[Swing-组件-menu|How to Use Menus]] for details.
4. The `pack` method sizes the frame so that all its contents are at or above their preferred sizes. An alternative to `pack` is to establish a frame size explicitly by calling `setSize` or `setBounds` (which also sets the frame location). In general, using `pack` is preferable to calling `setSize`, since `pack` leaves the frame layout manager in charge of the frame size, and layout managers are good at adjusting to platform dependencies and other factors that affect component size.
	This example does not set the frame location, but it is easy to do so using either the `setLocationRelativeTo` or `setLocation` method. For example, the following code centers a frame onscreen:
	```
	frame.setLocationRelativeTo(null);
	```
5. Calling `setVisible(true)` makes the frame appear onscreen. Sometimes you might see the `show` method used instead. The two usages are equivalent, but we use `setVisible(true)` for consistency's sake.

## Specifying Window Decorations

By default, window decorations are supplied by the native window system. However, you can request that the look-and-feel provide the decorations for a frame. You can also specify that the frame have no window decorations at all, a feature that can be used on its own, or to provide your own decorations, or with [[全屏独占模式API|full-screen exclusive mode]].

Besides specifying who provides the window decorations, you can also specify which icon is used to represent the window. Exactly how this icon is used depends on the window system or look and feel that provides the window decorations. If the window system supports minimization, then the icon is used to represent the minimized window. Most window systems or look and feels also display the icon in the window decorations. A typical icon size is 16x16 pixels, but some window systems use other sizes.

The following snapshots show three frames that are identical except for their window decorations. As you can tell by the appearance of the button in each frame, all three use the Java look and feel. The first uses decorations provided by the window system, which happen to be Microsoft Windows, but could as easily be any other system running the Java platform.The second and third use window decorations provided by the Java look and feel. The third frame uses Java look and feel window decorations, but has a custom icon.

| ![A frame with decorations provided by the window system](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/FrameDemo2_2.png) | ![A frame with decorations provided by the look and feel](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/FrameDemo2_1.png) | ![A frame with a custom icon](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/FrameDemo2_3.png) |
| --- | --- | --- |
| Window decorations provided by the look and feel | Window decorations provided by the window system | Custom icon; window decorations provided by the look and feel |

Here is an example of creating a frame with a custom icon and with window decorations provided by the look and feel:

```sql
//Ask for window decorations provided by the look and feel.
JFrame.setDefaultLookAndFeelDecorated(true);

//Create the frame.
JFrame frame = new JFrame("A window");

//Set the frame icon to an image loaded from a file.
frame.setIconImage(new ImageIcon(imgURL).getImage());
```

As the preceding code snippet implies, you must invoke the `setDefaultLookAndFeelDecorated` method *before* creating the frame whose decorations you wish to affect. The value you set with `setDefaultLookAndFeelDecorated` is used for all subsequently created `JFrame` s. You can switch back to using window system decorations by invoking `JFrame.setDefaultLookAndFeelDecorated(false)`. Some look and feels might not support window decorations; in this case, the window system decorations are used.

The full source code for the application that creates the frames pictured above is in [`FrameDemo2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/FrameDemo2Project/src/components/FrameDemo2.java). Besides showing how to choose window decorations, FrameDemo2 also shows how to disable all window decorations and gives an example of positioning windows. It includes two methods that create the `Image` objects used as icons — one is loaded from a file, and the other is painted from scratch.

---

**Try this::**
1. Click the Launch button to run the Frame Demo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FrameDemo2).
2. Bring up two windows, both with look-and-feel-provided decorations, but with different icons.  
	The Java look and feel displays the icons in its window decorations. Depending on your window system, the icon may be used elsewhere to represent the window, especially when the window is minimized.
3. Bring up one or more windows with window system decorations.  
	See if your window system treats these icons differently.
4. Bring up one or more windows with no window decorations.  
	Play with the various types of windows to see how the window decorations, window system, and frame icons interact.

---

## Responding to Window-Closing Events

By default, when the user closes a frame onscreen, the frame is hidden. Although invisible, the frame still exists and the program can make it visible again. If you want different behavior, then you need to either register a window listener that handles window-closing events, or you need to specify default close behavior using the `setDefaultCloseOperation` method. You can even do both.

The argument to `setDefaultCloseOperation` must be one of the following values, the first three of which are defined in the [`WindowConstants`](https://docs.oracle.com/javase/8/docs/api/javax/swing/WindowConstants.html) interface (implemented by `JFrame`, `JInternalPane`, and `JDialog`):

`DO_NOTHING_ON_CLOSE`

Do not do anything when the user requests that the window close. Instead, the program should probably use a window listener that performs some other action in its `windowClosing` method.

`HIDE_ON_CLOSE` (the default for `JDialog` and `JFrame`)

Hide the window when the user closes it. This removes the window from the screen but leaves it displayable.

`DISPOSE_ON_CLOSE` (the default for `JInternalFrame`)

Hide and dispose of the window when the user closes it. This removes the window from the screen and frees up any resources used by it.

`EXIT_ON_CLOSE` (defined in the [`JFrame`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html) class)

Exit the application, using `System.exit(0)`. This is recommended for applications only. If used within an applet, a `SecurityException` may be thrown.

---

**Note:**

`DISPOSE_ON_CLOSE` can have results similar to `EXIT_ON_CLOSE` if only one window is onscreen. More precisely, when the last displayable window within the Java virtual machine (VM) is disposed of, the VM may terminate. See [AWT Threading Issues](https://docs.oracle.com/javase/8/docs/api/java/awt/doc-files/AWTThreadIssues.html) for details.

---

The default close operation is executed after any window listeners handle the window-closing event. So, for example, assume that you specify that the default close operation is to dispose of a frame. You also implement a window listener that tests whether the frame is the last one visible and, if so, saves some data and exits the application. Under these conditions, when the user closes a frame, the window listener will be called first. If it does not exit the application, then the default close operation — disposing of the frame — will then be performed.

For more information about handling window-closing events, see [[Swing-事件监听-windowlistener|How to Write Window Listeners]]. Besides handling window-closing events, window listeners can also react to other window state changes, such as iconification and activation.

## The Frame API

The following tables list the commonly used `JFrame` constructors and methods. Other methods you might want to call are defined by the [`java.awt.Frame`](https://docs.oracle.com/javase/8/docs/api/java/awt/Frame.html), [`java.awt.Window`](https://docs.oracle.com/javase/8/docs/api/java/awt/Window.html), and [`java.awt.Component`](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html) classes, from which `JFrame` descends.

Because each `JFrame` object has a root pane, frames have support for interposing input and painting behavior in front of the frame children, placing children on different "layers", and for Swing menu bars. These topics are introduced in [[Swing-组件-toplevel|Using Top-Level Containers]] and explained in detail in [[Swing-组件-rootpane|How to Use Root Panes]].

The API for using frames falls into these categories:

- [Creating and Setting Up a Frame](#creating)
- [Setting the Window Size and Location](#sizeplace)
- [Methods Related to the Root Pane](#rootpane)

| Method or Constructor | Purpose |
| --- | --- |
| [JFrame()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#JFrame--)   [JFrame(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#JFrame-java.lang.String-) | Create a frame that is initially invisible. The `String` argument provides a title for the frame. To make the frame visible, invoke `setVisible(true)` on it. |
| [void setDefaultCloseOperation(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setDefaultCloseOperation-int-)   [int getDefaultCloseOperation()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getDefaultCloseOperation--) | Set or get the operation that occurs when the user pushes the close button on this frame. Possible choices are: - `DO_NOTHING_ON_CLOSE` - `HIDE_ON_CLOSE` - `DISPOSE_ON_CLOSE` - `EXIT_ON_CLOSE` The first three constants are defined in the [`WindowConstants`](https://docs.oracle.com/javase/8/docs/api/javax/swing/WindowConstants.html) interface, which `JFrame` implements. The `EXIT_ON_CLOSE` constant is defined in the [`JFrame`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html) class. |
| [void setIconImage(Image)](https://docs.oracle.com/javase/8/docs/api/java/awt/Frame.html#setIconImage-java.awt.Image-)   [Image getIconImage()](https://docs.oracle.com/javase/8/docs/api/java/awt/Frame.html#getIconImage--)   *(in `Frame`)* | Set or get the icon that represents the frame. Note that the argument is a [java.awt.Image](https://docs.oracle.com/javase/8/docs/api/java/awt/Image.html) object, not a `javax.swing.ImageIcon` (or any other `javax.swing.Icon` implementation). |
| [void setTitle(String)](https://docs.oracle.com/javase/8/docs/api/java/awt/Frame.html#setTitle-java.lang.String-)   [String getTitle()](https://docs.oracle.com/javase/8/docs/api/java/awt/Frame.html#getTitle--)   *(in `Frame`)* | Set or get the frame title. |
| [void setUndecorated(boolean)](https://docs.oracle.com/javase/8/docs/api/java/awt/Frame.html#setUndecorated-boolean-)   [boolean isUndecorated()](https://docs.oracle.com/javase/8/docs/api/java/awt/Frame.html#isUndecorated--)   *(in `Frame`)* | Set or get whether this frame should be decorated. Works only if the frame is not yet displayable (has not been packed or shown). Typically used with [[全屏独占模式API|full-screen exclusive mode]] or to enable custom window decorations. |
| [static void setDefaultLookAndFeelDecorated(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setDefaultLookAndFeelDecorated-boolean-)   [static boolean isDefaultLookAndFeelDecorated()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#isDefaultLookAndFeelDecorated--) | Determine whether subsequently created `JFrame` s should have their Window decorations (such as borders, and widgets for closing the window) provided by the current look-and-feel. Note that this is only a hint, as some look and feels may not support this feature. |

| Method | Purpose |
| --- | --- |
| [void pack()](https://docs.oracle.com/javase/8/docs/api/java/awt/Window.html#pack--)   *(in `Window`)* | Size the window so that all its contents are at or above their preferred sizes. |
| [void setSize(int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setSize-int-int-)   [void setSize(Dimension)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setSize-java.awt.Dimension-)   [Dimension getSize()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getSize--)   *(in `Component`)* | Set or get the total size of the window. The integer arguments to `setSize` specify the width and height, respectively. |
| [void setBounds(int, int, int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setBounds-int-int-int-int-)   [void setBounds(Rectangle)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setBounds-java.awt.Rectangle-)   [Rectangle getBounds()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getBounds--)   *(in `Component`)* | Set or get the size and position of the window. For the integer version of `setBounds`, the window upper left corner is at the *x, y* location specified by the first two arguments, and has the width and height specified by the last two arguments. |
| [void setLocation(int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setLocation-int-int-)   [Point getLocation()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getLocation--)   *(in `Component`)* | Set or get the location of the upper left corner of the window. The parameters are the *x* and *y* values, respectively. |
| [void setLocationRelativeTo(Component)](https://docs.oracle.com/javase/8/docs/api/java/awt/Window.html#setLocationRelativeTo-java.awt.Component-)   *(in `Window`)* | Position the window so that it is centered over the specified component. If the argument is `null`, the window is centered onscreen. To properly center the window, you should invoke this method after the window size has been set. |

| Method | Purpose |
| --- | --- |
| [void setContentPane(Container)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setContentPane-java.awt.Container-)   [Container getContentPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getContentPane--) | Set or get the frame content pane. The content pane contains the visible GUI components within the frame. |
| [JRootPane createRootPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#createRootPane--)   [void setRootPane(JRootPane)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setRootPane-javax.swing.JRootPane-)   [JRootPane getRootPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getRootPane--) | Create, set, or get the frame root pane. The root pane manages the interior of the frame including the content pane, the glass pane, and so on. |
| [void setJMenuBar(JMenuBar)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setJMenuBar-javax.swing.JMenuBar-)   [JMenuBar getJMenuBar()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getJMenuBar--) | Set or get the frame menu bar to manage a set of menus for the frame. |
| [void setGlassPane(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setGlassPane-java.awt.Component-)   [Component getGlassPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getGlassPane--) | Set or get the frame glass pane. You can use the glass pane to intercept mouse events or paint on top of your program GUI. |
| [void setLayeredPane(JLayeredPane)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setLayeredPane-javax.swing.JLayeredPane-)   [JLayeredPane getLayeredPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getLayeredPane--) | Set or get the frame layered pane. You can use the frame layered pane to put components on top of or behind other components. |

## Examples that Use Frames

All of the standalone applications in this trail use `JFrame`. The following table lists a few and tells you where each is discussed.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`FrameDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FrameDemo) | [The Example Explained](#anexample) | Displays a basic frame with one component. |
| [`FrameDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FrameDemo2) | [Specifying Window Decorations](#setDefaultLookAndFeelDecorated) | Lets you create frames with various window decorations. |
| [`Framework`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#Framework) | — | A study in creating and destroying windows, in implementing a menu bar, and in exiting an application. |
| [`LayeredPaneDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#LayeredPaneDemo) | [[Swing-组件-layeredpane|How to Use Layered Panes]] | Illustrates how to use a layered pane (but not the frame layered pane). |
| [`GlassPaneDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#GlassPaneDemo) | [[Swing-组件-rootpane|The Glass Pane]] | Illustrates the use of a frame glass pane. |
| [`MenuDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuDemo) | [[Swing-组件-menu|How to Use Menus]] | Shows how to put a `JMenuBar` in a `JFrame`. |
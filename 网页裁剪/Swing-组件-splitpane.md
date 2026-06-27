---
分类:
  - "网页裁剪"
标题: "How to Use Split Panes (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/splitpane.html"
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

[[Swing-组件-menu|How to Use Menus]]

[[Swing-组件-panel|How to Use Panels]]

[[Swing-组件-passwordfield|How to Use Password Fields]]

[[Swing-组件-progress|How to Use Progress Bars]]

[[Swing-组件-rootpane|How to Use Root Panes]]

[[Swing-组件-scrollpane|How to Use Scroll Panes]]

[[Swing-组件-separator|How to Use Separators]]

[[Swing-滑块|How to Use Sliders]]

[[Swing-组件-spinner|How to Use Spinners]]

How to Use Split Panes

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

[[Swing-组件-spinner|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-tabbedpane|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Split Panes

A [`JSplitPane`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html) displays two components, either side by side or one on top of the other. By dragging the divider that appears between the components, the user can specify how much of the split pane's total area goes to each component. You can divide screen space among three or more components by putting split panes inside of split panes, as described in [Nesting Split Panes](#nesting).

Instead of adding the components of interest directly to a split pane, you often put each component into a [[Swing-组件-scrollpane|scroll pane]]. You then put the scroll panes into the split pane. This allows the user to view any part of a component of interest, without requiring the component to take up a lot of screen space or adapt to displaying itself in varying amounts of screen space.

Here's a picture of an application that uses a split pane to display a list and an image side by side:

![A snapshot of SplitPaneDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/SplitPaneDemo.png)

---

**Try this:**
1. Click the Launch button to run the SplitPaneDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SplitPaneDemo).
2. Drag the dimpled line that divides the list and the image to the left or right. Try to drag the divider all the way to the window's edge.
3. Click the tiny arrows on the divider to hide/expand the left or right component.

---

Below is the code from `SplitPaneDemo` that creates and sets up the split pane.

```
//Create a split pane with the two scroll panes in it.
splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT,
                           listScrollPane, pictureScrollPane);
splitPane.setOneTouchExpandable(true);
splitPane.setDividerLocation(150);

//Provide minimum sizes for the two components in the split pane
Dimension minimumSize = new Dimension(100, 50);
listScrollPane.setMinimumSize(minimumSize);
pictureScrollPane.setMinimumSize(minimumSize);
```

The constructor used by this example takes three arguments. The first indicates the split direction. The other arguments are the two components to put in the split pane. Refer to [Setting the Components in a Split Pane](#adding) for information about `JSplitPane` methods that set the components dynamically.

The split pane in this example is split horizontally — the two components appear side by side — as specified by the `JSplitPane.HORIZONTAL_SPLIT` argument to the constructor. Split pane provides one other option, specified with `JSplitPane.VERTICAL_SPLIT`, that places one component above the other. You can change the split direction after the split pane has been created with the `setOrientation` method.

Two small arrows appear at the top of the divider in the example's split pane. These arrows let the user collapse (and then expand) either of the components with a single click. The current look and feel determines whether these controls appear by default. In the Java look and feel, they are turned off by default. (Note that not all look and feels support this.) The example turned them on using the `setOneTouchExpandable` method.

The range of a split pane's divider is determined in part by the minimum sizes of the components within the split pane. See [Positioning the Divider and Restricting its Range](#divider) for details.

The rest of this section covers these topics:

## Setting the Components in a Split Pane

A program can set a split pane's two components dynamically with these four methods:

- `setLeftComponent`
- `setRightComponent`
- `setTopComponent`
- `setBottomComponent`

You can use any of these methods at any time regardless of the split pane's current split direction. Calls to `setLeftComponent` and `setTopComponent` are equivalent and set the specified component in the top or left position, depending on the split pane's current split orientation. Similarly, calls to `setRightComponent` and `setBottomComponent` are equivalent. These methods replace whatever component is already in that position with the new one.

Like other containers, `JSplitPane` supports the `add` method. Split pane puts the first component added in the left or top position. The danger of using `add` is that you can inadvertently call it too many times, in which case the split pane's layout manager will throw a rather esoteric-looking exception. If you are using the `add` method and a split pane is already populated, you first need to remove the existing components with `remove`.

If you put only one component in a split pane, then the divider will be stuck at the right side or the bottom of the split pane, depending on its split direction.

## Positioning the Divider and Restricting Its Range

To make your split pane work well, you often need to set the minimum sizes of components in the split pane, as well as the preferred size of either the split pane or its contained components. Choosing which sizes you should set is an art that requires understanding how a split pane's preferred size and divider location are determined. Before we get into details, let's take another look at SplitPaneDemo. Or, if you're in a hurry, you can skip to the [list of rules](#rules).

---

**Try this:**
1. Click the Launch button to run the SplitPaneDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SplitPaneDemo).  
	  
	Because the size of the demo's frame is set using the `pack` method, the split pane is at its preferred size, which SplitPaneDemo happens to set explicitly. The divider is automatically placed so that the left component is at its preferred width and all remaining space goes to the right component.
2. Make the window wider.  
	The divider stays where it is, and the extra space goes to the component at the right.
3. Make the window noticeably narrower than when it first came up — perhaps twice as wide as the left component.  
	Again, the left component's size and the divider position stay the same. Only the size of the right component changes.
4. Make the window as narrow as possible.  
	Assuming the window uses the Java look and feel-provided decorations, you cannot size the window smaller than the split pane's minimum size, which is determined by the minimum size of the components contained by the split pane. SplitPaneDemo sets the minimum size of these contained components explicitly.
5. Make the window wider, and then drag the divider as far as it will go to the right.  
	The divider goes only as far as the right component's minimum size allows. If you drag the divider to the left, you'll see that it also respects the left component's minimum size.

---

Now that you've seen the default behavior of split panes, we can tell you what's happening behind the scenes and how you can affect it. In this discussion, when we refer to a component's preferred or minimum size, we often mean the preferred or minimum width of the component if the split pane is horizontal, or its preferred or minimum height if the split pane is vertical.

By default, a split pane's preferred size and divider location are initialized so that the two components in the split pane are at their preferred sizes. If the split pane isn't displayed at this preferred size and the program hasn't set the divider's location explicitly, then the initial position of the divider (and thus the sizes of the two components) depends on a split pane property called the *resize weight*. If the split pane is initially at its preferred size or bigger, then the contained components start out at their preferred sizes, before adjusting for the resize weight. If the split pane is initially too small to display both components at their preferred sizes, then they start out at their *minimum* sizes, before adjusting for the resize weight.

A split pane's resize weight has a value between 0.0 and 1.0 and determines how space is distributed between the two contained components when the split pane's size is set — whether programmatically or by the user resizing the split pane (enlarging its containing window, for example). The resize weight of a split pane is 0.0 by default, indicating that the left or top component's size is fixed, and the right or bottom component adjusts its size to fit the remaining space. Setting the resize weight to 0.5 splits any extra or missing space evenly between the two components. Setting the resize weight to 1.0 makes the right or bottom component's size remain fixed. The resize weight has no effect, however, when the user drags the divider.

The user can drag the divider to any position *as long as* neither contained component goes below its minimum size. If the divider has one-touch buttons, the user can use them to make the divider move completely to one side or the other — no matter what the minimum sizes of the components are.

Now that you know the factors that affect a split pane's size and divider location, here are some rules for making them work well:

- To ensure that the divider can be dragged when the split pane is at its preferred size, make sure the minimum size of one or both contained components is smaller than the contained component's preferred size. You can set the minimum size of a component either by invoking `setMinimumSize` on it or by overriding its `getMinimumSize` method. For example, if you want the user to be able to drag the divider all the way to both sides:
	```
	Dimension minimumSize = new Dimension(0, 0);
	leftComponent.setMinimumSize(minimumSize);
	rightComponent.setMinimumSize(minimumSize);
	```
- To guarantee that both contained components appear, make sure that either the split pane is initially at or above its preferred size, or the minimum sizes of the contained components are greater than zero.
	This should usually happen if the splitpane is given its preferred size, which depends upon the layout manager containing the split pane. Another option is to explicitly set a preferred size on the split pane that is larger than the size of the contained components.
- If you want the bottom or right component to stay the same size and the top or left component to be flexible when the split pane gets bigger, set the resize weight to 1.0. You can do this by invoking `setResizeWeight`:
	```
	splitPane.setResizeWeight(1.0);
	```
- If you want both halves of the split pane to share in the split pane's extra or removed space, set the resize weight to 0.5:
	```
	splitPane.setResizeWeight(0.5);
	```
- Make sure each component contained by a split pane has a reasonable preferred size. If the component is a panel that uses a layout manager, you can generally just use the value it returns. If the component is a scroll pane, you have a few choices. You can invoke the `setPreferredSize` method on the scroll pane, invoke the appropriate method on the component in the scroll pane (such as the `setVisibleRowCount` method for `JList` or `JTree`).
- Make sure each component contained by a split pane can display itself reasonably in varying amounts of space. For example, panels that contain multiple components should use layout managers that use extra space in a reasonable way.
- If you want to set the size of contained components to something other than their preferred sizes, use the `setDividerLocation` method. For example, to make the left component 150 pixels wide:
	```
	splitPane.setDividerLocation(150 + splitPane.getInsets().left);
	```
	Although the split pane does its best to honor the initial divider location (150 in this case), once the user drags the divider it may no longer be possible to drag to the programmatically specified size.
	To make the right component 150 pixels wide:
	```
	splitPane.setDividerLocation(splitPane.getSize().width
	                             - splitPane.getInsets().right
	                             - splitPane.getDividerSize()
	                             - 150);
	```
	If the split pane is already visible, you can set the divider location as a percentage of the split pane. For example, to make 25% of the space go to left/top:
	```
	splitPane.setDividerLocation(0.25);
	```
	Note that this is implemented in terms of the current size and is therefore really only useful if the split pane is visible.
- To lay out the split pane as if it just came up, likely repositioning the divider in the process, invoke `resetToPreferredSizes()` on the split pane.
	---
	**Note:** Just changing the contained components' preferred sizes — even if you invoke `revalidate` afterwards — is not enough to cause the split pane to lay itself out again. You must invoke `resetToPreferredSizes` as well.
	---

The following snapshot shows an example named SplitPaneDividerDemo that demonstrates split pane component sizes and divider placement.

![A snapshot of SplitPaneDividerDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/SplitPaneDividerDemo.png)

Like SplitPaneDemo, SplitPaneDividerDemo features a horizontal split pane with one-touch buttons. SplitPaneDividerDemo has the following additional features:

- The split pane's *resize weight* is explicitly set (to 0.5).
- The split pane is displayed at its default preferred size.
- A Reset button at the bottom of the window invokes `resetToPreferredSizes` on the split pane.
- The components in the split pane are instances of a custom `JComponent` subclass called `SizeDisplayer`. A `SizeDisplayer` displays optional text against the background of a faded (and also optional) image. More importantly, it has rectangles that show its preferred and minimum sizes.
- SplitPaneDividerDemo sets up its `SizeDisplayer` s to have equal preferred sizes (due to the equally large images they show) but unequal minimum sizes.

---

**Try this:**
1. Click the Launch button to run the SplitPaneDividerDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SplitPaneDividerDemo).  
	  
	Because the size of the demo's frame is set using the `pack` method, the split pane is at its preferred size, which by default is just big enough for the `SizeDisplayer` s to be at their preferred sizes. The preferred size of each `SizeDisplayer` is indicated by a red rectangle. The divider is automatically placed so that both components are at their preferred widths.
2. Make the window wider.  
	Because the split pane's resize weight is 0.5, the extra space is divided evenly between the left and right components. The divider moves accordingly.
3. Make the window as narrow as possible.  
	Assuming the window uses the Java look and feel-provided decorations, it will not let you size the window smaller than the split pane's minimum size, which is determined by the minimum size of the `SizeDisplayers` it contains. The minimum size of each `SizeDisplayer` is indicated by a bright blue rectangle.
4. Make the window a bit wider, and then drag the divider as far as it will go to the right.  
	The divider goes only as far as the right component's minimum size allows.
5. After making sure the split pane is smaller than its preferred size, click the Reset button.  
	Note that the two `SizeDisplayer` s are displayed at the different sizes, even though when the application came up they had equal sizes. The reason is that although their preferred sizes are equal, their minimum sizes are not. Because the split pane cannot display them at their preferred sizes or larger, it lays them out using their minimum sizes. The leftover space is divided equally between the components, since the split pane's resize weight is 0.5.
6. Widen the split pane so that it is large enough for both `SizeDisplayer` s to be shown at their preferred sizes, and then click the Reset button.  
	The divider is placed in the middle again, so that both components are the same size.

---

Here is the code that creates the GUI for SplitPaneDividerDemo:

```java
public class SplitPaneDividerDemo extends JPanel ... {

    private JSplitPane splitPane;
   
    public SplitPaneDividerDemo() {
        super(new BorderLayout());

        Font font = new Font("Serif", Font.ITALIC, 24);

        ImageIcon icon = createImageIcon("images/Cat.gif");
        SizeDisplayer sd1 = new SizeDisplayer("left", icon);
        sd1.setMinimumSize(new Dimension(30,30));
        sd1.setFont(font);
        
        icon = createImageIcon("images/Dog.gif");
        SizeDisplayer sd2 = new SizeDisplayer("right", icon);
        sd2.setMinimumSize(new Dimension(60,60));
        sd2.setFont(font);
        
        splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT,
                                   sd1, sd2);
        splitPane.setResizeWeight(0.5);
        splitPane.setOneTouchExpandable(true);
        splitPane.setContinuousLayout(true);

        add(splitPane, BorderLayout.CENTER);
        add(createControlPanel(), BorderLayout.PAGE_END);
    }
    ...
}
```

The code is fairly self explanatory, except perhaps for the call to `setContinuousLayout`. Setting the *continuousLayout* property to true makes the split pane's contents be painted continuously while the user is moving the divider. Continuous layout is not on, by default, because it can have a negative performance impact. However, it makes sense to use it in this demo, when having the split pane's components as up-to-date as possible can improve the user experience.

## Nesting Split Panes

Here's a picture of a program that achieves a three-way split by nesting one split pane inside of another:

![A snapshot of SplitPaneDemo2](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/SplitPaneDemo2.png)

If the top portion of the split pane looks familiar to you, it is because the program puts the split pane created by `SplitPaneDemo` inside a second split pane. A simple `JLabel` is the other component in the second split pane. This is not the most practical use of a nested split pane, but it gets the point across.

- Click the Launch button to run the SplitPaneDemo2 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SplitPaneDemo2).

Here's the interesting part of the code, which you can find in [`SplitPaneDemo2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/SplitPaneDemo2Project/src/components/SplitPaneDemo2.java):

```
//Create an instance of SplitPaneDemo
SplitPaneDemo splitPaneDemo = new SplitPaneDemo();
JSplitPane top = splitPaneDemo.getSplitPane();

...
//Create a regular old label
label = new JLabel("Click on an image name in the list.",
                   JLabel.CENTER);

//Create a split pane and put "top" (a split pane)
//and JLabel instance in it.
JSplitPane splitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                      top, label);
```

Refer to [[Swing-组件-problems|Solving Common Component Problems]] for information about fixing a border problem that can appear when nesting split panes.

## The Split Pane API

The following tables list the commonly used `JSplitPane` constructors and methods. Other methods you are most likely to invoke on a `JSplitPane` object are those such as `setPreferredSize` that its superclasses provide. See [[Swing-组件-jcomponent|The JComponent API]] for tables of commonly used inherited methods.

The API for using lists falls into these categories:

- [Setting up the Split Pane](#settingupapi)
- [Managing the Split Pane's Contents](#contentsapi)
- [Positioning the Divider](#dividerapi)

| Method or Constructor | Purpose |
| --- | --- |
| [JSplitPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#JSplitPane--)   [JSplitPane(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#JSplitPane-int-)   [JSplitPane(int, boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#JSplitPane-int-boolean-)   [JSplitPane(int, Component, Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#JSplitPane-int-java.awt.Component-java.awt.Component-)   [JSplitPane(int, boolean, Component, Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#JSplitPane-int-boolean-java.awt.Component-java.awt.Component-) | Create a split pane. When present, the `int` parameter indicates the split pane's orientation, either `HORIZONTAL_SPLIT` (the default) or `VERTICAL_SPLIT`. The `boolean` parameter, when present, sets whether the components continually repaint as the user drags the split pane. If left unspecified, this option (called *continuous layout*) is turned off. The `Component` parameters set the initial left and right, or top and bottom components, respectively. |
| [void setOrientation(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setOrientation-int-)   [int getOrientation()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#getOrientation--) | Set or get the split pane's orientation. Use either `HORIZONTAL_SPLIT` or `VERTICAL_SPLIT` defined in `JSplitPane`. If left unspecified, the split pane will be horizontally split. |
| [void setDividerSize(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setDividerSize-int-)   [int getDividerSize()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#getDividerSize--) | Set or get the size of the divider in pixels. |
| [void setContinuousLayout(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setContinuousLayout-boolean-)   [boolean isContinuousLayout()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#isContinuousLayout--) | Set or get whether the split pane's components are continually laid out and painted while the user is dragging the divider. By default, continuous layout is turned off. |
| [void setOneTouchExpandable(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setOneTouchExpandable-boolean-)   [boolean isOneTouchExpandable()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#isOneTouchExpandable--) | Set or get whether the split pane displays a control on the divider to expand/collapse the divider. The default depends on the look and feel. In the Java look and feel, it is off by default. |

| Method | Purpose |
| --- | --- |
| [void setTopComponent(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setTopComponent-java.awt.Component-)   [void setBottomComponent(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setBottomComponent-java.awt.Component-)   [void setLeftComponent(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setLeftComponent-java.awt.Component-)   [void setRightComponent(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setRightComponent-java.awt.Component-)   [Component getTopComponent()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#getTopComponent--)   [Component getBottomComponent()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#getBottomComponent--)   [Component getLeftComponent()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#getLeftComponent--)   [Component getRightComponent()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#getRightComponent--) | Set or get the indicated component. Each method works regardless of the split pane's orientation. Top and left are equivalent, and bottom and right are equivalent. |
| [void remove(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#remove-java.awt.Component-)   [void removeAll()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#removeAll--) | Remove the indicated component(s) from the split pane. |
| [void add(Component)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#add-java.awt.Component-) | Add the component to the split pane. You can add only two components to a split pane. The first component added is the top/left component. The second component added is the bottom/right component. Any attempt to add more components results in an exception. |

| Method | Purpose |
| --- | --- |
| [void setDividerLocation(double)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setDividerLocation-double-)   [void setDividerLocation(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setDividerLocation-int-)   [int getDividerLocation()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#getDividerLocation--) | Set or get the current divider location. When setting the divider location, you can specify the new location as a percentage (`double`) or a pixel location (`int`). |
| [void resetToPreferredSizes()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#resetToPreferredSizes--) | Move the divider such that both components are at their preferred sizes. This is how a split pane divides itself at startup, unless specified otherwise. |
| [void setLastDividerLocation(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setLastDividerLocation-int-)   [int getLastDividerLocation()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#getLastDividerLocation--) | Set or get the previous position of the divider. |
| [int getMaximumDividerLocation()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#getMaximumDividerLocation--)   [int getMinimumDividerLocation()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#getMinimumDividerLocation--) | Get the minimum and maximum locations for the divider. These are set implicitly by setting the minimum sizes of the split pane's two components. |
| [void setResizeWeight(float)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#setResizeWeight-float-)   [float getResizeWeight()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSplitPane.html#getResizeWeight--) | Set or get the resize weight for the split pane, a value between 0.0 (the default) and 1.0. See [Positioning the Divider and Restricting Its Range](#divider) for an explanation of and examples of using the resize weight. |

## Examples that Use Split Panes

This table shows some examples that use `JSplitPane` and where those examples are described.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`SplitPaneDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SplitPaneDemo) | This page and [[Swing-组件-list|How to Use Lists]] | Shows a split pane with a horizontal split. |
| [`SplitPaneDividerDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SplitPaneDividerDemo) | This page | Demonstrates how component size information and resize weight are used to position the divider. |
| [`SplitPaneDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SplitPaneDemo2) | This page | Puts a split pane within a split pane to create a three-way split. |
| [`TreeDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TreeDemo) | [[Swing-组件-tree|How to Use Trees]] | Uses a split pane with a vertical split to separate a tree (in a scroll pane) from an editor pane (in a scroll pane). Does not use the one-touch expandable feature. |
| [`TextComponentDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextComponentDemo) | [[Swing-组件-generaltext|Text Component Features]] | Uses a split pane with a vertical split to separate a text pane and a text area, both in scroll panes. |
| [`TextSamplerDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextSamplerDemo) | [[Swing-组件-generaltext|Text Component Features]] | Uses a split pane with a vertical split and resize weight of 0.5 to separate a text pane and an editor pane, both in scroll panes. The split pane is in the right half of a container that has a fairly complicated layout. Layout managers such as `GridLayout` and `BorderLayout` are used, along with the split pane's resize weight, to ensure that the components in scroll panes share all extra space. |
| [`ListSelectionDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#ListSelectionDemo) | [[Swing-事件监听-listselectionlistener|How to Write a List Selection Listener]] | Uses a split pane with a vertical split to separate an upper pane, containing a list and a table (both in scroll panes), from a lower pane that contains a combo box above a scroll pane. The lower pane uses a border layout to keep the combo box small and the scroll pane greedy for space. |
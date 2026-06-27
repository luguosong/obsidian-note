---
分类:
  - "网页裁剪"
标题: "How to Use Root Panes (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/rootpane.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Root Panes (The Java™ Tutorials >        
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

[[Swing-组件-internalframe|How to Use Internal Frames]]

[[Swing-组件-label|How to Use Labels]]

[[Swing-组件-layeredpane|How to Use Layered Panes]]

[[Swing-组件-list|How to Use Lists]]

[[Swing-组件-menu|How to Use Menus]]

[[Swing-组件-panel|How to Use Panels]]

[[Swing-组件-passwordfield|How to Use Password Fields]]

[[Swing-组件-progress|How to Use Progress Bars]]

How to Use Root Panes

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

[[Swing-组件-progress|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-scrollpane|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Root Panes

In general, you don't directly create a [`JRootPane`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRootPane.html) object. Instead, you get a `JRootPane` (whether you want it or not!) when you instantiate [[Swing-组件-internalframe|`JInternalFrame`]] or one of the top-level Swing containers, such as [[Swing-组件-applet|`JApplet`]], [[Swing-组件-dialog|`JDialog`]], and [[Swing-组件-frame|`JFrame`]].

[[Swing-组件-toplevel|Using Top-Level Containers]] tells you the basics of using root panes — getting the content pane, setting its layout manager, and adding Swing components to it. This section tells you more about root panes, including the components that make up a root pane and how you can use them.

![A root pane manages four other panes: a layered pane, a menu bar, a content pane, and a glass pane.](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/1layers.gif)

As the preceding figure shows, a root pane has four parts:

**The glass pane**

Hidden, by default. If you make the glass pane visible, then it's like a sheet of glass over all the other parts of the root pane. It's completely transparent unless you implement the glass pane's `paintComponent` method so that it does something, and it can intercept input events for the root pane. In the [next section](#glasspane), you'll see an example of using a glass pane.

**The layered pane**

Serves to position its contents, which consist of the content pane and the optional menu bar. Can also hold other components in a specified Z order. For information, see [The Layered Pane](#layeredpane).

**The content pane**

The container of the root pane's visible components, excluding the menu bar. For information on using the content pane, see [[Swing-组件-toplevel|Using Top-Level Containers]].

**The optional menu bar**

The home for the root pane's container's menus. If the container has a menu bar, you generally use the container's `setJMenuBar` method to put the menu bar in the appropriate place. For more information on using menus and menu bars, see [[Swing-组件-menu|How to Use Menus]].

## The Glass Pane

The glass pane is useful when you want to be able to catch events or paint over an area that already contains one or more components. For example, you can deactivate mouse events for a multi-component region by having the glass pane intercept the events. Or you can display an image over multiple components using the glass pane.

Here's a picture of an application that demonstrates glass pane features. It contains a check box that lets you set whether the glass pane is "visible" — whether it can get events and paint itself onscreen. When the glass pane is visible, it blocks all input events from reaching the components in the content pane. It also paints a red dot in the place where it last detected a mouse-pressed event.

![A snapshot of GlassPaneDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/GlassPaneDemo.png)

---

**Try this:**
1. Click the Launch button to run GlassPaneDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#GlassPaneDemo).
2. Click Button 1.  
	The button's appearance changes to show that it's been clicked.
3. Click the check box so that the glass pane becomes "visible," and then click Button 1 again.  
	The button does not act clicked because the glass pane intercepts all the mouse events. The glass pane paints a red circle where you release the mouse.
4. Click the check box again so that the glass pane is hidden.  
	When the glass pane detects an event over the check box, it forwards it to the check box. Otherwise, the check box would not respond to clicks.

---

The following code from [`GlassPaneDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/GlassPaneDemoProject/src/components/GlassPaneDemo.java) shows and hides the glass pane. This program happens to create its own glass pane. However, if a glass pane doesn't do any painting, the program might simply attach listeners to the default glass pane, as returned by `getGlassPane`.

```java
myGlassPane = new MyGlassPane(...);
changeButton.addItemListener(myGlassPane);
frame.setGlassPane(myGlassPane);
...
class MyGlassPane extends JComponent
                  implements ItemListener {
    ...
    //React to change button clicks.
    public void itemStateChanged(ItemEvent e) {
        setVisible(e.getStateChange() == ItemEvent.SELECTED);
    }
...
}
```java

The next code snippet implements the mouse-event handling for the glass pane. If a mouse event occurs over the check box, then the glass pane redispatches the event so that the check box receives it.

```java
...//In the implementation of the glass pane's mouse listener:
public void mouseMoved(MouseEvent e) {
    redispatchMouseEvent(e, false);
}

.../* The mouseDragged, mouseClicked, mouseEntered,
    * mouseExited, and mousePressed methods have the same
    * implementation as mouseMoved. */...

public void mouseReleased(MouseEvent e) {
    redispatchMouseEvent(e, true);
}

private void redispatchMouseEvent(MouseEvent e,
                                  boolean repaint) {
    Point glassPanePoint = e.getPoint();
    Container container = contentPane;
    Point containerPoint = SwingUtilities.convertPoint(
                                    glassPane,
                                    glassPanePoint,
                                    contentPane);

    if (containerPoint.y < 0) { //we're not in the content pane
        //Could have special code to handle mouse events over
        //the menu bar or non-system window decorations, such as
        //the ones provided by the Java look and feel.
    } else {
        //The mouse event is probably over the content pane.
        //Find out exactly which component it's over.
        Component component =
            SwingUtilities.getDeepestComponentAt(
                                    container,
                                    containerPoint.x,
                                    containerPoint.y);

        if ((component != null)
            && (component.equals(liveButton))) {
            //Forward events over the check box.
            Point componentPoint = SwingUtilities.convertPoint(
                                        glassPane,
                                        glassPanePoint,
                                        component);
            component.dispatchEvent(new MouseEvent(component,
                                                 e.getID(),
                                                 e.getWhen(),
                                                 e.getModifiers(),
                                                 componentPoint.x,
                                                 componentPoint.y,
                                                 e.getClickCount(),
                                                 e.isPopupTrigger()));
        }
    }

    //Update the glass pane if requested.
    if (repaint) {
        glassPane.setPoint(glassPanePoint);
        glassPane.repaint();
    }
}
```

Here is the code in `MyGlassPane` that implements the painting.

```java
protected void paintComponent(Graphics g) {
    if (point != null) {
        g.setColor(Color.red);
        g.fillOval(point.x - 10, point.y - 10, 20, 20);
    }
}
```

## The Layered Pane

A layered pane is a container with depth such that overlapping components can appear one on top of the other. General information about layered panes is in [[Swing-组件-layeredpane|How to Use Layered Panes]]. This section discusses the particulars of how root panes use layered panes.

Each root pane places its menu bar and content pane in an instance of `JLayeredPane`. The Z ordering that the layered pane provides enables behavior such as displaying popup menus above other components.

You can choose to put components in the root pane's layered pane. If you do, then you should be aware that certain depths are defined to be used for specific functions, and you should use the depths as intended. Otherwise, your components might not play well with the others. Here's a diagram that shows the functional layers and their relationship:

![Layers defined by JLayeredPane](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/layeredPaneLayers.gif)

The table below describes the intended use for each layer and lists the `JLayeredPane` constant that corresponds to each layer:

| Layer Name | Value | Description |
| --- | --- | --- |
| `FRAME_CONTENT_LAYER` | `new Integer(-30000)` | The root pane adds the menu bar and content pane to its layered pane at this depth. |
| `DEFAULT_LAYER` | `new Integer(0)` | If you don't specify a component's depth when adding it to a layered pane, the layered pane puts it at this depth. |
| `PALETTE_LAYER` | `new Integer(100)` | This layer is useful for floating tool bars and palettes. |
| `MODAL_LAYER` | `new Integer(200)` | Modal internal-frame dialogs would belong in this layer. |
| `POPUP_LAYER` | `new Integer(300)` | Popups go in this layer because they need to appear above just about everything. |
| `DRAG_LAYER` | `new Integer(400)` | Intended to be used when a component is being dragged. The component should return to its regular layer when dropped. |

Here is a picture of RootLayeredPaneDemo, which is a version of [LayeredPaneDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#LayeredPaneDemo) that uses the root pane's layered pane, rather than creating a new layered pane.

![LayeredPaneDemo modified to use the root pane's layered pane](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/RootLayeredPaneDemo.png)

---

**Try this:**
1. Click the Launch button to run RootLayeredPaneDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#RootLayeredPaneDemo).
2. Move the cursor around in the window, so that Duke moves on top of other components.  
	Note that when the cursor is on top of non-label components — whether it's in the content pane or in the Java-look-and-feel provided title bar — Duke's movement is temporarily stopped. This is because mouse-motion events go to the component that's deepest in the containment hierarchy and is interested in mouse events. The mouse-motion listener that moves Duke is registered on the layered pane, and most of the components in that pane (with the exception of the labels) happen to have mouse-motion listeners. When the mouse moves over an interested component in the layered pane, the layered pane doesn't get the event and the interested component does.
3. Making sure the Top Position in Layer check box is selected, change Duke's layer to Yellow (-30000).  
	As before, he appears on top of other components, except for the Magenta (0) and Cyan (301) rectangles.
4. Keeping Duke in the Yellow layer, click the check box to send Duke to the back of layer -30000.  
	Duke disappears because the content pane and all the components in it are now above him.
5. Change Duke's layer to Cyan (301), move Duke down a bit so he's standing on the top edge of the Yellow rectangle, and then press Space to bring up the combo box's drop-down list.  
	If the look and feel implements the drop-down list as a lightweight popup, Duke appears on top of the drop-down list.

---

## The Root Pane API

The tables that follow list the API for using root panes, glass panes, and content panes. For more information on using content panes, go to [[Swing-组件-toplevel|Using Top-Level Containers]]. Here are the tables in this section:

- [Using a Root Pane](#rootpaneapi)
- [Setting or Getting the Root Pane's Contents](#contentapi)

The API for using other parts of the root pane is described elsewhere:

- [[Swing-组件-layeredpane|The Layered Pane API]]
- [[Swing-组件-menu|The Menu API]]

| Method | Purpose |
| --- | --- |
| [JRootPane getRootPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getRootPane--)   *(in `JApplet`, `JDialog`, `JFrame`, `JInternalFrame`, and `JWindow`)* | Get the root pane of the applet, dialog, frame, internal frame, or window. |
| [static JRootPane getRootPane(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingUtilities.html#getRootPane-java.awt.Component-)   *(in `SwingUtilities`)* | If the component contains a root pane, return that root pane. Otherwise, return the root pane (if any) that contains the component. |
| [JRootPane getRootPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#getRootPane--)   *(in `JComponent`)* | Invoke the `SwingUtilities` `getRootPane` method for the `JComponent`. |
| [void setDefaultButton(JButton)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRootPane.html#setDefaultButton-javax.swing.JButton-)   [JButton getDefaultButton()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JRootPane.html#getDefaultButton--) | Set or get which button (if any) is the default button in the root pane. A look-and-feel-specific action, such as pressing Enter, causes the button's action to be performed. |

| Method | Purpose |
| --- | --- |
| [void setGlassPane(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setGlassPane-java.awt.Component-)   [Component getGlassPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getGlassPane--) | Set or get the glass pane. |
| [void setLayeredPane(JLayeredPane)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setLayeredPane-javax.swing.JLayeredPane-)   [Container getLayeredPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getLayeredPane--) | Set or get the layered pane. |
| [void setContentPane(Container)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setContentPane-java.awt.Container-)   [Container getContentPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getContentPane--) | Set or get the content pane. |
| [void setJMenuBar(JMenuBar)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#setJMenuBar-javax.swing.JMenuBar-)   [JMenuBar getJMenuBar()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JFrame.html#getJMenuBar--)   *(not defined in `JWindow`)* | Set or get the menu bar. |

## Examples that Use Root Panes

Every Swing program has a root pane, but few reference it directly. The examples in the following list illustrate how to use features of `JRootPane` or the glass pane. Also see these lists:

- [[Swing-组件-layeredpane|Examples that Use Layered Panes]]
- [[Swing-组件-menu|Examples that Use Menus]]
- [[Swing-组件-frame|Examples that Use Frames]] (for examples of using content panes)

| Example | Where Described | Notes |
| --- | --- | --- |
| [`GlassPaneDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#GlassPaneDemo) | This section | Uses a glass pane that paints a bit and redispatches events. |
| [`RootLayeredPaneDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#RootLayeredPaneDemo) | This section | Adapts LayeredPaneDemo to use the root pane's layered pane. |
| [`ListDialog`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ListDialog) | [[Swing-组件-list|How to Use Lists]] | Sets the default button for a `JDialog`. |
| [`FrameDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FrameDemo2) | [[Swing-组件-frame|How to Make Frames]] | Sets the default button for a `JFrame`. |
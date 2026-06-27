---
分类:
  - "网页裁剪"
标题: "The JComponent Class (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/jcomponent.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-组件-toplevel|Using Top-Level Containers]]

The JComponent Class

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

[[Swing-组件-toplevel|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-text|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## The JComponent Class

With the exception of top-level containers, all Swing components whose names begin with "J" descend from the [`JComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html) class. For example, `JPanel`, `JScrollPane`, `JButton`, and `JTable` all inherit from `JComponent`. However, `JFrame` and `JDialog` don't because they implement top-level containers.

The `JComponent` class extends the [`Container`](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html) class, which itself extends [`Component`](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html). The `Component` class includes everything from providing layout hints to supporting painting and events. The `Container` class has support for adding components to the container and laying them out. This section's [API tables](#api) summarize the most often used methods of `Component` and `Container`, as well as of `JComponent`.

## JComponent Features

The `JComponent` class provides the following functionality to its descendants:

**Tool tips**

By specifying a string with the `setToolTipText` method, you can provide help to users of a component. When the cursor pauses over the component, the specified string is displayed in a small window that appears near the component. See [[Swing-组件-tooltip|How to Use Tool Tips]] for more information.

**Painting and borders**

The `setBorder` method allows you to specify the border that a component displays around its edges. To paint the inside of a component, override the `paintComponent` method. See [[Swing-组件-border|How to Use Borders]] and [[Swing-自定义绘制|Performing Custom Painting]] for details.

**Application-wide pluggable look and feel**

Behind the scenes, each `JComponent` object has a corresponding `ComponentUI` object that performs all the drawing, event handling, size determination, and so on for that `JComponent`. Exactly which `ComponentUI` object is used depends on the current look and feel, which you can set using the `UIManager.setLookAndFeel` method. See [[Swing-plaf|How to Set the Look and Feel]] for details.

**Custom properties**

You can associate one or more properties (name/object pairs) with any `JComponent`. For example, a layout manager might use properties to associate a constraints object with each `JComponent` it manages. You put and get properties using the `putClientProperty` and `getClientProperty` methods. For general information about properties, see [[Java核心类库-平台环境-properties|Properties]].

**Support for layout**

Although the `Component` class provides layout hint methods such as `getPreferredSize` and `getAlignmentX`, it doesn't provide any way to set these layout hints, short of creating a subclass and overriding the methods. To give you another way to set layout hints, the `JComponent` class adds setter methods — `setMinimumSize`, `setMaximumSize`, `setAlignmentX`, and `setAlignmentY`. See [[Swing-布局|Laying Out Components Within a Container]] for more information.

**Support for accessibility**

The `JComponent` class provides API and basic functionality to help assistive technologies such as screen readers get information from Swing components, For more information about accessibility, see [[Swing-其他特性-access|How to Support Assistive Technologies]].

**Support for drag and drop**

The `JComponent` class provides API to set a component's transfer handler, which is the basis for Swing's drag and drop support. See [[Swing-intro|Introduction to DnD]] for details.

**Double buffering**

Double buffering smooths on-screen painting. For details, see [[Swing-自定义绘制|Performing Custom Painting]].

**Key bindings**

This feature makes components react when the user presses a key on the keyboard. For example, in many look and feels when a button has the focus, typing the Space key is equivalent to a mouse click on the button. The look and feel automatically sets up the bindings between pressing and releasing the Space key and the resulting effects on the button. For more information about key bindings, see [[Swing-其他特性-keybinding|How to Use Key Bindings]].

## The JComponent API

The `JComponent` class provides many new methods and inherits many methods from `Component` and `Container`. The following tables summarize the methods we use the most.

- [Customizing Component Appearance](#complookapi)
- [Setting and Getting Component State](#stateapi)
- [Handling Events](#eventapi)
- [Painting Components](#custompaintingapi)
- [Dealing with the Containment Hierarchy](#containmentapi)
- [Laying Out Components](#layoutapi)
- [Getting Size and Position Information](#sizeapi)
- [Specifying Absolute Size and Position](#absoluteapi)

| Method | Purpose |
| --- | --- |
| [void setBorder(Border)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setBorder-javax.swing.border.Border-)   [Border getBorder()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#getBorder--) | Set or get the border of the component. See [[Swing-组件-border|How to Use Borders]] for details. |
| [void setForeground(Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setForegroundColor-java.awt.Color-)   [void setBackground(Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setBackground-java.awt.Color-) | Set the foreground or background color for the component. The foreground is generally the color used to draw the text in a component. The background is (not surprisingly) the color of the background areas of the component, assuming that the component is opaque. |
| [Color getForeground()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getForeground--)   [Color getBackground()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getBackground--) | Get the foreground or background color for the component. |
| [void setOpaque(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setOpaque-boolean-)   [boolean isOpaque()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#isOpaque--) | Set or get whether the component is opaque. An opaque component fills its background with its background color. |
| [void setFont(Font)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setFont-java.awt.Font-)   [Font getFont()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getFont--) | Set or get the component's font. If a font has not been set for the component, the font of its parent is returned. |
| [void setCursor(Cursor)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setCursor-java.awt.Cursor-)   [Cursor getCursor()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getCursor--) | Set or get the cursor displayed over the component and all components it contains (except for children that have their own cursor set). Example: `aPanel.setCursor( Cursor.getPredefinedCursor( Cursor.WAIT_CURSOR));` |

| Method | Purpose |
| --- | --- |
| [void setComponentPopupMenu(JPopupMenu)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setComponentPopupMenu-javax.swing.JPopupMenu-) | Sets the `JPopupMenu` for this `JComponent`. The UI is responsible for registering bindings and adding the necessary listeners such that the `JPopupMenu` will be shown at the appropriate time. When the `JPopupMenu` is shown depends upon the look and feel: some may show it on a mouse event, some may enable a key binding.      If `popup` is null, and `getInheritsPopupMenu` returns `true`, then `getComponentPopupMenu` will be delegated to the parent. This provides for a way to make all child components inherit the `popupmenu` of the parent. |
| [void setTransferHandler(TransferHandler)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setTransferHandler-javax.swing.TransferHandler-)   [TransferHandler getTransferHandler()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#getTransferHandler--) | Set or remove the `transferHandler` property. The `TransferHandler` supports exchanging data via cut, copy, or paste to/from a clipboard as well a drag and drop. See [[Swing-intro|Introduction to DnD]] for more details. |
| [void setToolTipText(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setToolTipText-java.lang.String-) | Set the text to display in a tool tip. See [[Swing-组件-tooltip|How to Use Tool Tips]] for more information. |
| [void setName(String)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setName-java.lang.String-)   [String getName()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getName--) | Set or get the name of the component. This can be useful when you need to associate text with a component that does not display text. |
| [boolean isShowing()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#isShowing--) | Determine whether the component is showing on screen. This means that the component must be visible, and it must be in a container that is visible and showing. |
| [void setEnabled(boolean)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setEnabled-boolean-)   [boolean isEnabled()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#isEnabled--) | Set or get whether the component is enabled. An enabled component can respond to user input and generate events. |
| [void setVisible(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setVisible-boolean-)   [boolean isVisible()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#isVisible--) | Set or get whether the component is visible. Components are initially visible, with the exception of top-level components. |

| Method | Purpose |
| --- | --- |
| [void addHierarchyListener(hierarchyListener l)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#addHierarchyListener-java.awt.event.HierarchyListener-)   [void removeHierarchyListener(hierarchyListener l)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#removeHierarchyListener-java.awt.event.HierarchyListener-) | Adds or removes the specified hierarchy listener to receive hierarchy changed events from this component when the hierarchy to which this container belongs changes. If listener l is null, no exception is thrown and no action is performed. |
| [void addMouseListener(MouseListener)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#addMouseListener-java.awt.event.MouseListener-)   [void removeMouseListener(MouseListener)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#removeMouseListener-java.awt.event.MouseListener-) | Add or remove a [[Swing-事件监听-mouselistener|mouse listener]] to or from the component. Mouse listeners are notified when the user uses the mouse to interact with the listened-to component. |
| [void addMouseMotionListener(MouseMotionListener)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#addMouseMotionListener-java.awt.event.MouseMotionListener-)   [void removeMouseMotionListener(MouseMotionListener)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#removeMouseMotionListener-java.awt.event.MouseMotionListener-) | Add or remove a [[Swing-事件监听-mousemotionlistener|mouse motion listener]] to or from the component. Mouse motion listeners are notified when the user moves the mouse within the listened-to component's bounds. |
| [void addKeyListener(KeyListener)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#addKeyListener-java.awt.event.KeyListener-)   [void removeKeyListener(KeyListener)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#removeKeyListener-java.awt.event.KeyListener-) | Add or remove a [[Swing-事件监听-keylistener|key listener]] to or from the component. Key listeners are notified when the user types at the keyboard and the listened-to component has the keyboard focus. |
| [void addComponentListener(ComponentListener)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#addComponentListener-java.awt.event.ComponentListener-)   [void removeComponentListener(ComponentListener)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#removeComponentListener-java.awt.event.ComponentListener-) | Add or remove a [[Swing-事件监听-componentlistener|component listener]] to or from the component. Component listeners are notified when the listened-to component is hidden, shown, moved, or resized. |
| [boolean contains(int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#contains-int-int-)   [boolean contains(Point)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#contains-java.awt.Point-) | Determine whether the specified point is within the component. The argument should be specified in terms of the component's coordinate system. The two `int` arguments specify *x* and *y* coordinates, respectively. |
| [Component getComponentAt(int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponentAt-int-int-)   [Component getComponentAt(Point)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponentAt-java.awt.Point-) | Return the component that contains the specified *x, y* position. The top-most child component is returned in the case where components overlap. This is determined by finding the component closest to the index 0 that claims to contain the given point via `Component.contains()`. |
| [Component setComponentZOrder(component comp, int index)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponentZOrder-java.awt.Component-int-) | Moves the specified component to the specified z-order index in the container.      If the component is a child of some other container, it is removed from that container before being added to this container. The important difference between this method and `java.awt.Container.add(Component, int)` is that this method doesn't call `removeNotify` on the component while removing it from its previous container unless necessary and when allowed by the underlying native windowing system. This way, if the component has the keyboard focus, it maintains the focus when moved to the new position.      **Note:** The z-order determines the order that components are painted. The component with the highest z-order paints first and the component with the lowest z-order paints last. Where components overlap, the component with the lower z-order paints over the component with the higher z-order. |
| [Component getComponentZOrder(component comp)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponentZOrder-comp-) | Returns the z-order index of the component inside the container. The higher a component is in the z-order hierarchy, the lower its index. The component with the lowest z-order index is painted last, above all other child components. |

| Method | Purpose |
| --- | --- |
| [void repaint()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#repaint--)   [void repaint(int, int, int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#repaint-int-int-int-int-) | Request that all or part of the component be repainted. The four `int` arguments specify the bounds (*x*, *y*, width, height, in that order) of the rectangle to be painted. |
| [void repaint(Rectangle)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#repaint-java.awt.Rectangle-) | Request that the specified area within the component be repainted. |
| [void revalidate()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#revalidate--) | Request that the component and its affected containers be laid out again. You should not generally need to invoke this method unless you explicitly change a component's size/alignment hints after it's visible or change a containment hierarchy after it is visible. Always invoke `repaint` after `revalidate`. |
| [void paintComponent(Graphics)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#paintComponent-java.awt.Graphics-) | Paint the component. Override this method to implement painting for custom components. |

| Method | Purpose |
| --- | --- |
| [Component add(Component)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#add-java.awt.Component-)   [Component add(Component, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#add-java.awt.Component-int-)   [void add(Component, Object)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#add-java.awt.Component-java.lang.Object-) | Add the specified component to this container. The one-argument version of this method adds the component to the end of the container. When present, the `int` argument indicates the new component's position within the container. When present, the `Object` argument provides layout constraints to the current layout manager. |
| [void remove(int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#remove-int-)   [void remove(Component)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#remove-java.awt.Component-)   [void removeAll()](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#removeAll--) | Remove one of or all of the components from this container. When present, the `int` argument indicates the position within the container of the component to remove. |
| [JRootPane getRootPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#getRootPane--) | Get the root pane that contains the component. |
| [Container getTopLevelAncestor()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#getTopLevelAncestor--) | Get the topmost container for the component — a `Window`, `Applet`, or null if the component has not been added to any container. |
| [Container getParent()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getParent--) | Get the component's immediate container. |
| [int getComponentCount()](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponentCount--) | Get the number of components in this container. |
| [Component getComponent(int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponent-int-)   [Component\[\] getComponents()](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponents--) | Get the one of or all of the components in this container. The `int` argument indicates the position of the component to get. |
| [Component getComponentZOrder(int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponentZOrder-int-)   [Component\[\] getComponentZOrder()](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponents--) | Returns the z-order index of the component inside the container. The higher a component is in the z-order hierarchy, the lower its index. The component with the lowest z-order index is painted last, above all other child components. |

| Method | Purpose |
| --- | --- |
| [void setPreferredSize(Dimension)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setPreferredSize-java.awt.Dimension-)   [void setMaximumSize(Dimension)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setMaximumSize-java.awt.Dimension-)   [void setMinimumSize(Dimension)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setMinimumSize-java.awt.Dimension-) | Set the component's preferred, maximum, or minimum size, measured in pixels. The preferred size indicates the best size for the component. The component should be no larger than its maximum size and no smaller than its minimum size. Be aware that these are hints only and might be ignored by certain layout managers. |
| [Dimension getPreferredSize()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getPreferredSize--)   [Dimension getMaximumSize()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getMaximumSize--)   [Dimension getMinimumSize()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getMinimumSize--) | Get the preferred, maximum, or minimum size of the component, measured in pixels. Many JComponent classes have setter and getter methods. For those non- `JComponent` subclasses, which do not have the corresponding setter methods, you can set a component's preferred, maximum, or minimum size by creating a subclass and overriding these methods. |
| [void setAlignmentX(float)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setAlignmentX-float-)   [void setAlignmentY(float)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setAlignmentY-float-) | Set the alignment along the *x-* or *y-* axis. These values indicate how the component would like to be aligned relative to other components. The value should be a number between 0 and 1 where 0 represents alignment along the origin, 1 is aligned the furthest away from the origin, and 0.5 is centered, and so on. Be aware that these are hints only and might be ignored by certain layout managers. |
| [float getAlignmentX()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getAlignmentX--)   [float getAlignmentY()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getAlignmentY--) | Get the alignment of the component along the *x-* or *y-* axis. For non- `JComponent` subclasses, which do not have the corresponding setter methods, you can set a component's alignment by creating a subclass and overriding these methods. |
| [void setLayout(LayoutManager)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#setLayout-java.awt.LayoutManager-)   [LayoutManager getLayout()](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getLayout--) | Set or get the component's layout manager. The layout manager is responsible for sizing and positioning the components within a container. |
| [void applyComponentOrientation(ComponentOrientation)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#applyComponentOrientation-java.awt.ComponentOrientation-) [void setComponentOrientation(ComponentOrientation)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#setComponentOrientation-java.awt.ComponentOrientation-) | Set the `ComponentOrientation` property of this container and all the components contained within it. See [[Swing-布局-using|Setting the Container's Orientation]] for more information. |

| Method | Purpose |
| --- | --- |
| [int getWidth()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getWidth--)   [int getHeight()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getHeight--) | Get the current width or height of the component measured in pixels. |
| [Dimension getSize()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getSize--)   [Dimension getSize(Dimension)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getSize-java.awt.Dimension-) | Get the component's current size measured in pixels. When using the one-argument version of this method, the caller is responsible for creating the `Dimension` instance in which the result is returned. |
| [int getX()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getX--)   [int getY()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getY--) | Get the current *x* or y coordinate of the component's origin relative to the parent's upper left corner measured in pixels. |
| [Rectangle getBounds()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getBounds--)   [Rectangle getBounds(Rectangle)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getBounds-java.awt.Rectangle-) | Get the bounds of the component measured in pixels. The bounds specify the component's width, height, and origin relative to its parent. When using the one-argument version of this method, the caller is responsible for creating the `Rectangle` instance in which the result is returned. |
| [Point getLocation()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getLocation--)   [Point getLocation(Point)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getLocation-java.awt.Point-) | Gets the current location of the component relative to the parent's upper left corner measured in pixels. When using the one-argument version of `getLocation` method, the caller is responsible for creating the `Point` instance in which the result is returned. |
| [Point getLocationOnScreen()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getLocationOnScreen--) | Returns the position relative to the upper left corner of the screen. |
| [Insets getInsets()](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getInsets--) | Get the size of the component's border. |

| Method | Purpose |
| --- | --- |
| [void setLocation(int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setLocation-int-int-)   [void setLocation(Point)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setLocation-java.awt.Point-) | Set the location of the component, in pixels, relative to the parent's upper left corner. The two `int` arguments specify *x* and *y*, in that order. Use these methods to position a component when you are not using a layout manager. |
| [void setSize(int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setSize-int-int-)   [void setSize(Dimension)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setSize-java.awt.Dimension-) | Set the size of the component measured in pixels. The two `int` arguments specify width and height, in that order. Use these methods to size a component when you are not using a layout manager. |
| [void setBounds(int, int, int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setBounds-int-int-int-int-)   [void setBounds(Rectangle)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setBounds-java.awt.Rectangle-) | Set the size and location relative to the parent's upper left corner, in pixels, of the component. The four `int` arguments specify *x*, *y*, width, and height, in that order. Use these methods to position and size a component when you are not using a layout manager. |
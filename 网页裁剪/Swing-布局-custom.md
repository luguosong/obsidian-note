---
分类:
  - "网页裁剪"
标题: "Creating a Custom Layout Manager (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/layout/custom.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Creating a Custom Layout Manager (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)

Documentation

[[Swing-布局-spring|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-布局-none|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Creating a Custom Layout Manager

Before you start creating a custom layout manager, make sure that no existing layout manager meets your requirements. In particular, layout managers such as [[Swing-布局-gridbag|`GridBagLayout`]], [[Swing-布局-spring|`SpringLayout`]], and [[Swing-布局-box|`BoxLayout`]] are flexible enough to work in many cases. You can also find layout managers from other sources, such as from the Internet. Finally, you can simplify layout by grouping components into containers such as [[Swing-组件-panel|panels]].

---

**Note:** This lesson covers writing layout code by hand, which can be challenging. If you are not interested in learning all the details of layout management, you might prefer to use the `GroupLayout` layout manager combined with a builder tool to lay out your GUI. One such builder tool is the [[Swing-NetBeans学习|NetBeans IDE]]. Otherwise, if you want to code by hand and do not want to use `GroupLayout`, then `GridBagLayout` is recommended as the next most flexible and powerful layout manager.

---

If you are interested in using JavaFX to create your GUI, see [Working With Layouts in JavaFX](https://docs.oracle.com/javase/8/javafx/layout-tutorial/index.html).

To create a custom layout manager, you must create a class that implements the [`LayoutManager`](https://docs.oracle.com/javase/8/docs/api/java/awt/LayoutManager.html) interface. You can either implement it directly, or implement its subinterface, [`LayoutManager2`](https://docs.oracle.com/javase/8/docs/api/java/awt/LayoutManager2.html).

Every layout manager must implement at least the following five methods, which are required by the `LayoutManager` interface:

**`void addLayoutComponent(String, Component)`**

Called by the `Container` class's `add` methods. Layout managers that do not associate strings with their components generally do nothing in this method.

**`void removeLayoutComponent(Component)`**

Called by the `Container` methods `remove` and `removeAll`. Layout managers override this method to clear an internal state they may have associated with the `Component`.

**`Dimension preferredLayoutSize(Container)`**

Called by the `Container` class's `getPreferredSize` method, which is itself called under a variety of circumstances. This method should calculate and return the ideal size of the container, assuming that the components it contains will be at or above their preferred sizes. This method must take into account the container's internal borders, which are returned by the [`getInsets`](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getInsets--) method.

**`Dimension minimumLayoutSize(Container)`**

Called by the `Container` `getMinimumSize` method, which is itself called under a variety of circumstances. This method should calculate and return the minimum size of the container, assuming that the components it contains will be at or above their minimum sizes. This method must take into account the container's internal borders, which are returned by the `getInsets` method.

**`void layoutContainer(Container)`**

Called to position and size each of the components in the container. A layout manager's `layoutContainer` method does not actually draw components. It simply invokes one or more of each component's `setSize`, `setLocation`, and `setBounds` methods to set the component's size and position.

This method must take into account the container's internal borders, which are returned by the `getInsets` method. If appropriate, it should also take the container's orientation (returned by the [`getComponentOrientation`](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getComponentOrientation--) method) into account. You cannot assume that the `preferredLayoutSize` or `minimumLayoutSize` methods will be called before `layoutContainer` is called.

Besides implementing the preceding five methods, layout managers generally implement at least one public constructor and the `toString` method.

If you wish to support component constraints, maximum sizes, or alignment, then your layout manager should implement the `LayoutManager2` interface. In fact, for these reasons among many others, nearly all modern layout managers will need to implement `LayoutManager2`. That interface adds five methods to those required by `LayoutManager`:

- `addLayoutComponent(Component, Object)`
- `getLayoutAlignmentX(Container)`
- `getLayoutAlignmentY(Container)`
- `invalidateLayout(Container)`
- `maximumLayoutSize(Container)`

Of these methods, the most important are `addLayoutComponent(Component, Object)` and `invalidateLayout(Container)`. The `addLayoutComponent` method is used to add components to the layout, using the specified constraint object. The `invalidateLayout` method is used to invalidate the layout, so that if the layout manager has cached information, this should be discarded. For more information about `LayoutManager2`, see the [`LayoutManager2`](https://docs.oracle.com/javase/8/docs/api/java/awt/LayoutManager2.html) API documentation.

Finally, whenever you create custom layout managers, you should be careful of keeping references to `Component` instances that are no longer children of the `Container`. Namely, layout managers should override `removeLayoutComponent` to clear any cached state related to the `Component`.

## Example of a Custom Layout

The example `CustomLayoutDemo` uses a custom layout manager called `DiagonalLayout`. You can find the layout manager's source code in [`DiagonalLayout.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/CustomLayoutDemoProject/src/layout/DiagonalLayout.java). `DialogLayout` lays out components diagonally, from left to right, with one component per row. Here is a picture of CustomLayoutDemo using `DialogLayout` to lay out five buttons.

![A snapshot of CustomLayoutDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/CustomLayoutDemo.png)

Click the Launch button to run `CustomLayoutDemo` using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#CustomLayoutDemo).
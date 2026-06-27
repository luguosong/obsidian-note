---
分类:
  - "网页裁剪"
标题: "A Visual Guide to Layout Managers (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/layout/visual.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# A Visual Guide to Layout Managers (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)

Documentation

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## A Visual Guide to Layout Managers

Several AWT and Swing classes provide layout managers for general use:

- [`BorderLayout`](#border)
- [`BoxLayout`](#box)
- [`CardLayout`](#card)
- [`FlowLayout`](#flow)
- [`GridBagLayout`](#gridbag)
- [`GridLayout`](#grid)
- [`GroupLayout`](#group)
- [`SpringLayout`](#spring)

This section shows example GUIs that use these layout managers, and tells you where to find the how-to page for each layout manager. You can find links for running the examples in the how-to pages and in the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html).

---

**Note:** This lesson covers writing layout code by hand, which can be challenging. If you are not interested in learning all the details of layout management, you might prefer to use the `GroupLayout` layout manager combined with a builder tool to lay out your GUI. One such builder tool is the [[Swing-NetBeans学习|NetBeans IDE]]. Otherwise, if you want to code by hand and do not want to use `GroupLayout`, then `GridBagLayout` is recommended as the next most flexible and powerful layout manager.

---

If you are interested in using JavaFX to create your GUI, see [Working With Layouts in JavaFX](https://docs.oracle.com/javase/8/javafx/layout-tutorial/index.html).

## BorderLayout

![A picture of a GUI that uses BorderLayout](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/BorderLayoutDemo.png)

Every content pane is initialized to use a `BorderLayout`. (As [[Swing-组件-toplevel|Using Top-Level Containers]] explains, the content pane is the main container in all frames, applets, and dialogs.) A `BorderLayout` places components in up to five areas: top, bottom, left, right, and center. All extra space is placed in the center area. Tool bars that are created using [[Swing-组件-toolbar|JToolBar]] must be created within a `BorderLayout` container, if you want to be able to drag and drop the bars away from their starting positions. For further details, see [[Swing-布局-border|How to Use BorderLayout]].

## BoxLayout

![A picture of a GUI that uses BoxLayout](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/BoxLayoutDemo.png)

The `BoxLayout` class puts components in a single row or column. It respects the components' requested maximum sizes and also lets you align components. For further details, see [[Swing-布局-box|How to Use BoxLayout]].

## CardLayout

![A picture of a GUI that uses CardLayout](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/CardLayoutDemo.png) ![Another picture of the same layout](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/CardLayoutDemo-2.png)

The `CardLayout` class lets you implement an area that contains different components at different times. A `CardLayout` is often controlled by a combo box, with the state of the combo box determining which panel (group of components) the `CardLayout` displays. An alternative to using `CardLayout` is using a [[Swing-组件-tabbedpane|tabbed pane]], which provides similar functionality but with a pre-defined GUI. For further details, see [[Swing-布局-card|How to Use CardLayout]].

## FlowLayout

![A picture of a GUI that uses FlowLayout](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/FlowLayoutDemo.png)

`FlowLayout` is the default layout manager for every `JPanel`. It simply lays out components in a single row, starting a new row if its container is not sufficiently wide. Both panels in CardLayoutDemo, shown [previously](#card), use `FlowLayout`. For further details, see [[Swing-布局-flow|How to Use FlowLayout]].

## GridBagLayout

![A picture of a GUI that uses GridBagLayout](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/GridBagLayoutDemo.png)

`GridBagLayout` is a sophisticated, flexible layout manager. It aligns components by placing them within a grid of cells, allowing components to span more than one cell. The rows in the grid can have different heights, and grid columns can have different widths. For further details, see [[Swing-布局-gridbag|How to Use GridBagLayout]].

## GridLayout

![A picture of a GUI that uses GridLayout](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/GridLayoutDemo.png)

`GridLayout` simply makes a bunch of components equal in size and displays them in the requested number of rows and columns. For further details, see [[Swing-布局-grid|How to Use GridLayout]].

## GroupLayout

![A picture of a GUI that uses GroupLayout](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/find.png)

`GroupLayout` is a layout manager that was developed for use by GUI builder tools, but it can also be used manually. `GroupLayout` works with the horizontal and vertical layouts separately. The layout is defined for each dimension independently. Consequently, however, each component needs to be defined twice in the layout. The Find window shown above is an example of a `GroupLayout`. For further details, see [[Swing-布局-group|How to Use GroupLayout]].

## SpringLayout

![A picture of a GUI that uses SpringLayout](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringBox.png)

![Another GUI that uses SpringLayout](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringForm.png)

`SpringLayout` is a flexible layout manager designed for use by GUI builders. It lets you specify precise relationships between the edges of components under its control. For example, you might define that the left edge of one component is a certain distance (which can be dynamically calculated) from the right edge of a second component. `SpringLayout` lays out the children of its associated container according to a set of constraints, as shall be seen in [[Swing-布局-spring|How to Use SpringLayout]].
---
分类:
  - "网页裁剪"
标题: "How Layout Management Works (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/layout/howLayoutWorks.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-布局-using|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-布局-layoutlist|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How Layout Management Works

---

**Note:** This lesson covers writing layout code by hand, which can be challenging. If you are not interested in learning all the details of layout management, you might prefer to use the `GroupLayout` layout manager combined with a builder tool to lay out your GUI. One such builder tool is the [[Swing-NetBeans学习|NetBeans IDE]]. Otherwise, if you want to code by hand and do not want to use `GroupLayout`, then `GridBagLayout` is recommended as the next most flexible and powerful layout manager.

---

If you are interested in using JavaFX to create your GUI, see [Working With Layouts in JavaFX](https://docs.oracle.com/javase/8/javafx/layout-tutorial/index.html).

Here is an example of a layout management sequence for a container using [`LayoutManager2`](https://docs.oracle.com/javase/8/docs/api/java/awt/LayoutManager2.html).

1. Layout managers basically do two things:
	- Calculate the minimum/preferred/maximum sizes for a container.
		- Lay out the container's children.
	Layout managers do this based on the provided constraints, the container's properties (such as insets) and on the children's minimum/preferred/maximum sizes. If a child is itself a container then its own layout manger is used to get its minimum/preferred/maximum sizes and to lay it out.
2. A container can be *valid* (namely, `isValid()` returns true) or *invalid*. For a container to be valid, all the container's children must be laid out already and must all be valid also. The [`Container.validate`](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#validate--) method can be used to validate an invalid container. This method triggers the layout for the container and all the child containers down the component hierarchy and marks this container as valid.
3. After a component is created it is in the invalid state by default. The [`Window.pack`](https://docs.oracle.com/javase/8/docs/api/java/awt/Window.html) method validates the window and lays out the window's component hierarchy for the first time.

The end result is that to determine the best size for the container, the system determines the sizes of the containers at the bottom of the containment hierarchy. These sizes then percolate up the containment hierarchy, eventually determining the container's total size.

If the size of a component changes, for example following a change of font, the component must be resized and repainted by calling the `revalidate` and `repaint` methods on that component. Both `revalidate` and `repaint` are [[Swing-并发|thread-safe]] — you need not invoke them from the event-dispatching thread.

When you invoke `revalidate` on a component, a request is passed up the containment hierarchy until it encounters a container, such as a scroll pane or top-level container, that should not be affected by the component's resizing. (This is determined by calling the container's `isValidateRoot` method.) The container is then laid out, which has the effect of adjusting the revalidated component's size and the size of all affected components.
---
分类:
  - "网页裁剪"
标题: "How to Use FlowLayout (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/layout/flow.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-布局-card|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-布局-gridbag|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use FlowLayout

---

**Note:** This lesson covers writing layout code by hand, which can be challenging. If you are not interested in learning all the details of layout management, you might prefer to use the `GroupLayout` layout manager combined with a builder tool to lay out your GUI. One such builder tool is the [[Swing-NetBeans学习|NetBeans IDE]]. Otherwise, if you want to code by hand and do not want to use `GroupLayout`, then `GridBagLayout` is recommended as the next most flexible and powerful layout manager.

---

If you are interested in using JavaFX to create your GUI, see [Working With Layouts in JavaFX](https://docs.oracle.com/javase/8/javafx/layout-tutorial/index.html).

The [`FlowLayout`](https://docs.oracle.com/javase/8/docs/api/java/awt/FlowLayout.html) class provides a very simple layout manager that is used, by default, by the `JPanel` objects. The following figure represents a snapshot of an application that uses the flow layout:

![A snapshot of FlowLayoutDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/FlowLayoutDemo1.png)

Click the Launch button to run FlowLayoutDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#FlowLayoutDemo).

The complete code of this demo is in the [`FlowLayoutDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/FlowLayoutDemoProject/src/layout/FlowLayoutDemo.java) file.

The `FlowLayout` class puts components in a row, sized at their preferred size. If the horizontal space in the container is too small to put all the components in one row, the `FlowLayout` class uses multiple rows. If the container is wider than necessary for a row of components, the row is, by default, centered horizontally within the container. To specify that the row is to aligned either to the left or right, use a `FlowLayout` constructor that takes an alignment argument. Another constructor of the `FlowLayout` class specifies how much vertical or horizontal padding is put around the components.

The code snippet below creates a `FlowLayout` object and the components it manages.

```
FlowLayout experimentLayout = new FlowLayout();

...

    compsToExperiment.setLayout(experimentLayout);

    compsToExperiment.add(new JButton("Button 1"));
    compsToExperiment.add(new JButton("Button 2"));
    compsToExperiment.add(new JButton("Button 3"));
    compsToExperiment.add(new JButton("Long-Named Button 4"));
    compsToExperiment.add(new JButton("5"));
```

Select either the Left to Right or Right to Left option and click the Apply orientation button to set up the component's orientation. The following code snippet applies the Left to Right components orientation to the `experimentLayout`.

```
compsToExperiment.setComponentOrientation(
        ComponentOrientation.LEFT_TO_RIGHT);
```

## The FlowLayout API

The following table lists constructors of the `FlowLayout` class.

| Constructor | Purpose |
| --- | --- |
| [`FlowLayout()`](https://docs.oracle.com/javase/8/docs/api/java/awt/FlowLayout.html#FlowLayout--) | Constructs a new `FlowLayout` object with a centered alignment and horizontal and vertical gaps with the default size of 5 pixels. |
| [`FlowLayout(int *align*)`](https://docs.oracle.com/javase/8/docs/api/java/awt/FlowLayout.html#FlowLayout-int-) | Creates a new flow layout manager with the indicated alignment and horizontal and vertical gaps with the default size of 5 pixels. The alignment argument can be `FlowLayout.LEADING`, `FlowLayout.CENTER`, or `FlowLayout.TRAILING`. When the `FlowLayout` object controls a container with a left-to right component orientation (the default), the `LEADING` value specifies the components to be left-aligned and the `TRAILING` value specifies the components to be right-aligned. |
| [`FlowLayout (int *align*, int *hgap*, int *vgap*)`](https://docs.oracle.com/javase/8/docs/api/java/awt/FlowLayout.html#FlowLayout-int-int-int-) | Creates a new flow layout manager with the indicated alignment and the indicated horizontal and vertical gaps. The `hgap` and `vgap` arguments specify the number of pixels to put between components. |

## Examples that Use FlowLayout

The following table lists code examples that use the `FlowLayout` class and provides links to related sections.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`FlowLayoutDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#FlowLayoutDemo) | This page | Sets up a content pane to use `FlowLayout`. If you set the `RIGHT_TO_LEFT` constant to `true` and recompile, you can see how `FlowLayout` handles a container that has a right-to-left component orientation. |
| [`CardLayoutDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#CardLayoutDemo) | [[Swing-布局-card|How to Use CardLayout]] | Centers a component nicely in the top part of a `BorderLayout`, and puts the component in a `JPanel` that uses a `FlowLayout`. |
| [`ButtonDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ButtonDemo) | [[Swing-按钮|How to Use Buttons, Check Boxes, and Radio Buttons]] | Uses the default `FlowLayout` of a `JPanel`. |
| [`TextInputDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextInputDemo) | [[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]] | Uses a panel with a right-aligned `FlowLayout` presenting two buttons. |
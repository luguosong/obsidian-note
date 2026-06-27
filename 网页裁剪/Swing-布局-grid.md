---
分类:
  - "网页裁剪"
标题: "How to Use GridLayout (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/layout/grid.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-布局-gridbag|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-布局-group|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use GridLayout

---

**Note:** This lesson covers writing layout code by hand, which can be challenging. If you are not interested in learning all the details of layout management, you might prefer to use the `GroupLayout` layout manager combined with a builder tool to lay out your GUI. One such builder tool is the [[Swing-NetBeans学习|NetBeans IDE]]. Otherwise, if you want to code by hand and do not want to use `GroupLayout`, then `GridBagLayout` is recommended as the next most flexible and powerful layout manager.

---

If you are interested in using JavaFX to create your GUI, see [Working With Layouts in JavaFX](https://docs.oracle.com/javase/8/javafx/layout-tutorial/index.html).

The following figure represents a snapshot of an application that uses the [`GridLayout`](https://docs.oracle.com/javase/8/docs/api/java/awt/GridLayout.html) class.

![A snapshot of GridLayoutDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/GridLayoutDemo.png)

Click the Launch button to run GridLayoutDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#GridLayoutDemo).

The complete code of this demo is in the [`GridLayoutDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/GridLayoutDemoProject/src/layout/GridLayoutDemo.java) file.

A `GridLayout` object places components in a grid of cells. Each component takes all the available space within its cell, and each cell is exactly the same size. If the `GridLayoutDemo` window is resized, the `GridLayout` object changes the cell size so that the cells are as large as possible, given the space available to the container.

The code snippet below creates the `GridLayout` object and the components it manages.

```
GridLayout experimentLayout = new GridLayout(0,2);

...

        compsToExperiment.setLayout(experimentLayout);

        compsToExperiment.add(new JButton("Button 1"));
        compsToExperiment.add(new JButton("Button 2"));
        compsToExperiment.add(new JButton("Button 3"));
        compsToExperiment.add(new JButton("Long-Named Button 4"));
        compsToExperiment.add(new JButton("5"));
```

The constructor of the `GridLayout` class creates an instance that has two columns and as many rows as necessary.

Use combo boxes to set up how much vertical or horizontal padding is put around the components. Then click the Apply gaps button. The following code snippet shows how your selection is processed by using the `setVgap` and `setHgap` methods of the `GridLayout` class:

```
applyButton.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                //Get the horizontal gap value
                String horGap = (String)horGapComboBox.getSelectedItem();
                //Get the vertical gap value
                String verGap = (String)verGapComboBox.getSelectedItem();
                //Set up the horizontal gap value
                experimentLayout.setHgap(Integer.parseInt(horGap));
                //Set up the vertical gap value
                experimentLayout.setVgap(Integer.parseInt(verGap));
                //Set up the layout of the buttons
                experimentLayout.layoutContainer(compsToExperiment);
            }
        });
```

## The GridLayout API

The following table lists constructors of the `GridLayout` class that specify the number of rows and columns.

| Constructor | Purpose |
| --- | --- |
| [`GridLayout(int *rows*, int *cols*)`](https://docs.oracle.com/javase/8/docs/api/java/awt/GridLayout.html#GridLayout-int-int-) | Creates a grid layout with the specified number of rows and columns. All components in the layout are given equal size. One, but not both, of `rows` and `cols` can be zero, which means that any number of objects can be placed in a row or in a column. |
| [`GridLayout(int *rows*, int *cols*, int *hgap*, int *vgap*)`](https://docs.oracle.com/javase/8/docs/api/java/awt/GridLayout.html#GridLayout-int-int-int-int-) | Creates a grid layout with the specified number of rows and columns. In addition, the horizontal and vertical gaps are set to the specified values. Horizontal gaps are places between each of columns. Vertical gaps are placed between each of the rows. |

The `GridLayout` class has two constructors:

## Examples that Use GridLayout

The following table lists code examples that use the `GridLayout` class and provides links to related sections.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`GridLayoutDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#GridLayoutDemo) | This page | Uses a 2-column grid. |
| [`ComboBoxDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ComboBoxDemo2) | [[Swing-组件-combobox|How to Use Combo Boxes]] | One of many examples that use a 1x1 grid to make a component as large as possible. |
| [`LabelDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#LabelDemo) | [[Swing-组件-label|How to Use Labels]] | Uses a 3-row grid. |
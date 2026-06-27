---
分类:
  - "网页裁剪"
标题: "How to Use SpringLayout (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/layout/spring.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use SpringLayout (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)

Documentation

[[Swing-布局-groupExample|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-布局-custom|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use SpringLayout

---

**Note:** This lesson covers writing layout code by hand, which can be challenging. If you are not interested in learning all the details of layout management, you might prefer to use the `GroupLayout` layout manager combined with a builder tool to lay out your GUI. One such builder tool is the [[Swing-NetBeans学习|NetBeans IDE]]. Otherwise, if you want to code by hand and do not want to use `GroupLayout`, then `GridBagLayout` is recommended as the next most flexible and powerful layout manager.

---

If you are interested in using JavaFX to create your GUI, see [Working With Layouts in JavaFX](https://docs.oracle.com/javase/8/javafx/layout-tutorial/index.html).

The [`SpringLayout`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.html) class was added in JDK version 1.4 to support layout in GUI builders. `SpringLayout` is a very flexible layout manager that can emulate many of the features of other layout managers. `SpringLayout` is, however, very low-level and as such you really should only use it with a GUI builder, rather than attempting to code a spring layout manager by hand.

This section begins with a simple example showing all the things you need to remember to create your first spring layout — and what happens when you forget them! Later it presents utility methods that let you lay out components in a couple of different types of grids.

Here are pictures of some of the layouts we will cover:

![The SpringBox application uses a SpringLayout to produce something similar to what a BoxLayout would produce.](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringBox.png)

![The SpringForm application has 5 rows of label-textfield pairs.](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringForm.png)

![The SpringCompactGrid application presents components in a grid without forcing all components to be the same size..](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringCompactGrid.png)

## How Spring Layouts Work

Spring layouts do their job by defining directional relationships, or *constraints*, between the edges of components. For example, you might define that the left edge of one component is a fixed distance (5 pixels, say) from the right edge of another component.

In a `SpringLayout`, the position of each edge is dependent on the position of just one other edge. If a constraint is subsequently added to create a new binding for an edge, the previous binding is discarded and the edge remains dependent on a single edge.

Unlike many layout managers, `SpringLayout` does not automatically set the location of the components it manages. If you hand-code a GUI that uses `SpringLayout`, remember to initialize component locations by constraining the west/east and north/south locations. Depending on the constraints you use, you may also need to set the size of the container explicitly.

Components define *edge* properties, which are connected by `Spring` instances. Each spring has four properties — its *minimum*, *preferred*, and *maximum* values, and its actual (current) *value*. The springs associated with each component are collected into a `SpringLayout.Constraints` object.

An instance of the `Spring` class holds three properties that characterize its behavior: the minimum, preferred, and maximum values. Each of these properties may be involved in defining its fourth, value, property based on a series of rules.

An instance of the `Spring` class can be visualized as a mechanical spring that provides a corrective force as the spring is compressed or stretched away from its preferred value. This force is modelled as linear function of the distance from the preferred value, but with two different constants -- one for the compressional force and one for the tensional one. Those constants are specified by the minimum and maximum values of the spring such that a spring at its minimum value produces an equal and opposite force to that which is created when it is at its maximum value. The difference between the preferred and minimum values, therefore, represents the ease with which the spring can be compressed. The difference between its maximum and preferred values indicates the ease with which the `Spring` can be extended.

Based on this, a `SpringLayout` can be visualized as a set of objects that are connected by a set of springs on their edges.

## Example: SpringDemo

This section takes you through the typical steps of specifying the constraints for a container that uses `SpringLayout`. The first example, [`SpringDemo1.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/SpringDemo1Project/src/layout/SpringDemo1.java), is an extremely simple application that features a label and a text field in a content pane controlled by a spring layout. Here is the relevant code:

```java
public class SpringDemo1 {
    public static void main(String[] args) {
        ...
        Container contentPane = frame.getContentPane();
        SpringLayout layout = new SpringLayout();
        contentPane.setLayout(layout);
        contentPane.add(new JLabel("Label: "));
        contentPane.add(new JTextField("Text field", 15));
        ...
        frame.pack();
        frame.setVisible(true);
    }
}

Click the Launch button to run SpringDemo1 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringDemo1).

Here is what the GUI looks like when it first comes up:

![SpringDemo1 -- the parent has no initial size!](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringDemo1.png)

Here is what it looks like when it is resized to be bigger:

![SpringDemo1 -- all the components are at (0, 0)!](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringDemo1-resized.png)

Obviously, we have some problems. Not only does the frame come up way too small, but even when it is resized the components are all located at (0,0). This happens because we have set no springs specifying the components' positions and the width of the container. One small consolation is that at least the components are at their preferred sizes — we get that for free from the default springs created by `SpringLayout` for each component.

Our next example, [`SpringDemo2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/SpringDemo2Project/src/layout/SpringDemo2.java), improves the situation a bit by specifying locations for each component.Click the Launch button to run SpringDemo2 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringDemo2).

In this example, we will specify that the components should appear in a single row, with 5 pixels between them. The following code specifies the location of the label:

//Adjust constraints for the label so it's at (5,5).
layout.putConstraint(SpringLayout.WEST, label,
                     5,
                     SpringLayout.WEST, contentPane);
layout.putConstraint(SpringLayout.NORTH, label,
                     5,
                     SpringLayout.NORTH, contentPane);
```text

The first `putConstraint` call specifies that the label's left (west) edge should be 5 pixels from its container's left edge. This translates to an *x* coordinate of 5. The second `putConstraint` call sets up a similar relationship between the top (north) edges of the label and its container, resulting in a *y* coordinate of 5.

Here is the code that sets up the location of the text field:

```sql
//Adjust constraints for the text field so it's at
//(<label's right edge> + 5, 5).
layout.putConstraint(SpringLayout.WEST, textField,
                     5,
                     SpringLayout.EAST, label);
layout.putConstraint(SpringLayout.NORTH, textField,
                     5,
                     SpringLayout.NORTH, contentPane);

The first `putConstraint` call makes the text field's left (west) edge be 5 pixels away from the label's right (east) edge. The second `putConstraint` call is just like the second call in the first snippet, and has the same effect of setting the component's *y* coordinate to 5.

The previous example still has the problem of the container coming up too small. But when we resize the window, the components are in the right place:

![SpringDemo2 -- at least now all the components are in the right position!](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringDemo2-resized.png)

To make the container initially appear at the right size, we need to set the springs that define the right (east) and bottom (south) edges of the container itself. No constraints for the right and bottom container edges are set by default. The size of the container is defined by setting these constraints. [`SpringDemo3.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/SpringDemo3Project/src/layout/SpringDemo3.java) shows how to do this. Click the Launch button to run SpringDemo3 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringDemo3).

Here is the code that sets the container's springs:

layout.putConstraint(SpringLayout.EAST, contentPane,
                     5,
                     SpringLayout.EAST, textField);
layout.putConstraint(SpringLayout.SOUTH, contentPane,
                     5,
                     SpringLayout.SOUTH, textField);

The first `putConstraint` call makes the container's right edge be 5 pixels to the right of the text field's right edge. The second one makes its bottom edge be 5 pixels beyond the bottom edge of the tallest component (which, for simplicity's sake, we've assumed is the text field).

Finally, the window comes up at the right size:

![SpringDemo3 -- the parent now HAS a correct initial size!](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringDemo3.png)

When we make the window larger we can see the spring layout in action, distributing the extra space between the available components.

![SpringDemo3 enlarged](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringDemo3-resized.png)

In this case the spring layout has chosen to give all the extra space to the text field. Although it seems like the spring layout treats labels and text fields differently, spring layout has no special knowledge of any Swing or AWT components. It relies on the values of a component's minimum, preferred, and maximum size properties. The next section discusses how spring layout uses these properties, and why they can cause uneven space distribution.

## Springs and Component Size

A `SpringLayout` object automatically installs `Spring` s for the height and width of each component that the `SpringLayout` controls. These springs are essentially covers for the component's `getMinimumSize`, `getPreferredSize`, and `getMaximumSize` methods. By "covers" we mean that not only are the springs *initialized* with the appropriate values from these methods, but also that the springs *track* those values. For example, the `Spring` object that represents the width of a component is a special kind of spring that simply delegates its implementation to the relevant size methods of the component. That way the spring stays in sync with the size methods as the characteristics of the component change.

When a component's `getMaximumSize` and `getPreferredSize` methods return the same value, `SpringLayout` interprets this as meaning that the component should not be stretched. `JLabel` and `JButton` are examples of components implemented this way. For this reason, the label in the SpringDemo3 example does not stretch.

The `getMaximumSize` method of some components, such as `JTextField`, returns the value `Integer.MAX_VALUE` for the width and height of its maximum size, indicating that the component can grow to any size. For this reason, when the SpringDemo3 window is enlarged, `SpringLayout` distributes all the extra space to the only springs that can grow — those determining the size of the text field.

## More About the SpringLayout API

The SpringDemo examples used the `SpringLayout` method `putConstraint` to set the springs associated with each component. The `putConstraint` method is a convenience method that lets you modify a component's constraints without needing to use the full spring layout API. Here, again, is the code from `SpringDemo3` that sets the location of the label:

layout.putConstraint(SpringLayout.WEST, label,
                     5,
                     SpringLayout.WEST, contentPane);
layout.putConstraint(SpringLayout.NORTH, label,
                     5,
                     SpringLayout.NORTH, contentPane);
```text

Here is equivalent code that uses the `SpringLayout.Constraints` and `Spring` classes directly:

```sql
SpringLayout.Constraints  contentPaneCons = 
        layout.getConstraints(contentPane);
contentPaneCons.setX(Spring.sum(Spring.constant(5),
                          contentPaneCons
                          .getConstraint(SpringLayout.WEST)));
contentPaneCons.setY(Spring.sum(Spring.constant(5),
                          contentPaneCons
                          .getConstraint(SpringLayout.NORTH)));

To see the entire demo converted to use this API, look at [`SpringDemo4.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/SpringDemo4Project/src/layout/SpringDemo4.java). That file also includes a more polished (and much longer) version of the code that sets the container's size. Click the Launch button to run SpringDemo4 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringDemo3).

As the preceding snippets imply, `SpringLayout` and `SpringLayout.Constraints` tend to use different conventions for describing springs. The `SpringLayout` API uses edges to define its constraints. Springs connect edges to establish linear relations between them. Edges are defined by components, using the following constants:

- `SpringLayout.NORTH` specifies the top edge of a component's bounding rectangle.
- `SpringLayout.SOUTH` specifies the bottom edge of a component's bounding rectangle.
- `SpringLayout.EAST` specifies the right edge of a component's bounding rectangle.
- `SpringLayout.WEST` specifies the left edge of a component's bounding rectangle.
- `SpringLayout.BASELINE` specifies the baseline of a component.
- `SpringLayout.HORIZONTAL_CENTER` specifies the horizontal center of a component's bounding rectangle.
- `SpringLayout.VERTICAL_CENTER` specifies the vertical center of a component's bounding rectangle.

Edges differ from `Spring` objects The `SpringLayout.Constraints` class knows about edges, but only has `Spring` objects for the following properties:

- *x*
- *y*
- *width*
- *height*

Each `Constraints` object maintains the following relationships between its springs and the edges they represent:

```properties
west = x
north = y
 east = x + width
south = y + height

If you are confused, do not worry. The next section presents utility methods you can use to accomplish some common layout tasks without knowing anything about the spring layout API.

## Utility Methods for Grids

Because the `SpringLayout` class was created for GUI builders, setting up individual springs for a layout can be cumbersome to code by hand. This section presents a couple of methods you can use to install all the springs needed to lay out a group of components in a grid. These methods emulate some of the features of the `GridLayout`, `GridBagLayout`, and `BoxLayout` classes.

The two methods, called `makeGrid` and `makeCompactGrid`, are defined in [`SpringUtilities.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/SpringGridProject/src/layout/SpringUtilities.java). Both methods work by grouping the components together into rows and columns and using the `Spring.max` method to make a width or height spring that makes a row or column big enough for all the components in it. In the `makeCompactGrid` method the same width or height spring is used for all components in a particular column or row, respectively. In the `makeGrid` method, by contrast, the width and height springs are shared by every component in the container, forcing them all to be the same size. Furthermore, factory methods are provided by [`Spring`](https://docs.oracle.com/javase/8/docs/api/javax/swing/Spring.html) for creating different kinds of springs, including springs that depend on other springs.

Let us see these methods in action. Our first example, implemented in the source file [`SpringGrid.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/SpringGridProject/src/layout/SpringGrid.java), displays a bunch of numbers in text fields. The center text field is much wider than the others. Just as with `GridLayout`, having one large cell forces all the cells to be equally large. Click the Launch button to run SpringGrid using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringGrid).

  

![SpringGrid](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringGrid.png)

Here is the code that creates and lays out the text fields in SpringGrid:

```text
JPanel panel = new JPanel(new SpringLayout());
for (int i = 0; i < 9; i++) {
    JTextField textField = new JTextField(Integer.toString(i));
    ...//when i==4, put long text in the text field...
    panel.add(textField);
}
...
SpringUtilities.makeGrid(panel,
                         3, 3, //rows, cols
                         5, 5, //initialX, initialY
                         5, 5);//xPad, yPad
```

Now let us look at an example, in the source file [`SpringCompactGrid.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/SpringGridProject/src/layout/SpringCompactGrid.java), that uses the `makeCompactGrid` method instead of `makeGrid`. This example displays lots of numbers to show off spring layout's ability to minimize the space required. Click the Launch button to run SpringCompactGrid using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringCompactGrid).

Here is what the SpringCompactGrid GUI looks like:

![SpringCompactGrid](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringCompactGrid.png)

Here is the code that creates and lays out the text fields in SpringCompactGrid:

```text
JPanel panel = new JPanel(new SpringLayout());

int rows = 10;
int cols = 10;
for (int r = 0; r < rows; r++) {
    for (int c = 0; c < cols; c++) {
        int anInt = (int) Math.pow(r, c);
        JTextField textField =
                new JTextField(Integer.toString(anInt));
        panel.add(textField);
    }
}

//Lay out the panel.
SpringUtilities.makeCompactGrid(panel, //parent
                                rows, cols,
                                3, 3,  //initX, initY
                                3, 3); //xPad, yPad
```

One of the handiest uses for the `makeCompactGrid` method is associating labels with components, where the labels are in one column and the components in another. The file [`SpringForm.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/SpringFormProject/src/layout/SpringForm.java) uses `makeCompactGrid` in this way, as the following figure demonstrates.

![SpringForm](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringForm.png)

Click the Launch button to run SpringForm using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringForm).

Here is the code that creates and lays out the label-text field pairs in SpringForm:

```text
String[] labels = {"Name: ", "Fax: ", "Email: ", "Address: "};
int numPairs = labels.length;

//Create and populate the panel.
JPanel p = new JPanel(new SpringLayout());
for (int i = 0; i < numPairs; i++) {
    JLabel l = new JLabel(labels[i], JLabel.TRAILING);
    p.add(l);
    JTextField textField = new JTextField(10);
    l.setLabelFor(textField);
    p.add(textField);
}

//Lay out the panel.
SpringUtilities.makeCompactGrid(p,
                                numPairs, 2, //rows, cols
                                6, 6,        //initX, initY
                                6, 6);       //xPad, yPad
```

Because we are using a real layout manager instead of absolute positioning, the layout manager responds dynamically to changes in components involved. For example, if the names of the labels are localized, the spring layout produces a configuration that gives the first column more or less room, as needed. And as the following figure shows, when the window is resized, the flexibly sized components — the text fields — take all the excess space, while the labels stick to what they need.

![SpringForm enlarged](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringForm-resized.png)

Our last example of the `makeCompactGrid` method, in [`SpringBox.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/SpringBoxProject/src/layout/SpringBox.java), shows some buttons configured to be laid out in a single row. Click the Launch button to run SpringBox using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringBox).

  

![SpringBox](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringBox.png)

Note that the behavior is almost identical to that of `BoxLayout` in the case of a single row. Not only are the components laid out as `BoxLayout` would arrange them but the minimum, preferred, and maximum sizes of the container that uses the `SpringLayout` return the same results that `BoxLayout` would. Here is the call to `makeCompactGrid` that produces this layout:

```text
//Lay out the buttons in one row and as many columns
//as necessary, with 6 pixels of padding all around.
SpringUtilities.makeCompactGrid(contentPane, 1,
                                contentPane.getComponentCount(),
                                6, 6, 6, 6);
```

Let us look at what happens when we resize this window. This is an odd special case that is worth taking note of as you may run into it by accident in your first layouts.

![SpringBox resized](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/SpringBox-resized.png)

Nothing moved! That is because none of the components (buttons) or the spacing between them was defined to be stretchable. In this case the spring layout calculates a maximum size for the parent container that is equal to its preferred size, meaning the parent container itself is not stretchable. It would perhaps be less confusing if the AWT refused to resize a window that was not stretchable, but it does not. The layout manager cannot do anything sensible here as none of the components will take up the required space. Instead of crashing, it just does nothing, leaving all the components as they were.

## The SpringLayout API

The API for using `SpringLayout` is spread across three classes:

- [`SpringLayout`](#SpringLayout)
- [`SpringLayout.Constraints`](#SpringLayout.Constraints)
- [`Spring`](#Spring)

| Constructor or Method | Purpose |
| --- | --- |
| [SpringLayout()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.html#SpringLayout--) | Create a `SpringLayout` instance. |
| [SpringLayout.Constraints getConstraints(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.html#getConstraints-java.awt.Component-) | Get the constraints (set of springs) associated with the specified component. |
| [Spring getConstraint(String, Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.html#getConstraint-java.lang.String-java.awt.Component-) | Get the spring for an edge of a component. The first argument specifies the edge and must be one of the following `SpringLayout` constants: `NORTH`, `SOUTH`, `EAST`, or `WEST`. |
| [void putConstraint(String, Component, int, String, Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.html#putConstraint-java.lang.String-java.awt.Component-int-java.lang.String-java.awt.Component-)   [void putConstraint(String, Component, Spring, String, Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.html#putConstraint-java.lang.String-java.awt.Component-javax.swing.Spring-java.lang.String-java.awt.Component-) | Convenience methods for defining relationships between the edges of two components. The first two arguments specify the first component and its affected edge. The last two arguments specify the second component and its affected edge. The third argument specifies the spring that determines the distance between the two. When the third argument is an integer, a constant spring is created to provide a fixed distance between the component edges. |

| Constructor or Method | Purpose |
| --- | --- |
| [SpringLayout.Constraints()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#SpringLayout.Constraints--)   [SpringLayout.Constraints(Spring, Spring)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#SpringLayout.Constraints-javax.swing.Spring-javax.swing.Spring-)   [SpringLayout.Constraints(Spring, Spring, Spring, Spring)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#SpringLayout.Constraints-javax.swing.Spring-javax.swing.Spring-javax.swing.Spring-javax.swing.Spring-) | Create a `SpringLayout.Constraints` instance. The first two arguments, if present, specify the X and Y springs, respectively. The second two arguments, if present, specify the height and width springs, respectively. Omitting an argument causes the corresponding spring to be `null`, which `SpringLayout` generally replaces with suitable defaults. |
| [Spring getConstraint(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#getConstraint-java.lang.String-)   [Spring getHeight()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#getHeight--)   [Spring getWidth()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#getWidth--)   [Spring getX()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#getX--)   [Spring getY()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#getY--)   [void setConstraint(String, Spring)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#setConstraint-java.lang.String-javax.swing.Spring-)   [void setHeight(Spring)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#setHeight-javax.swing.Spring-)   [void setWidth(Spring)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#setWidth-javax.swing.Spring-)   [void setX(Spring)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#setX-javax.swing.Spring-)   [void setY(Spring)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpringLayout.Constraints.html#setY-javax.swing.Spring-) | Get or set the specified spring. The string argument to the `getConstraint` and `setConstraint` methods specifies an edge name, and must be one of the `SpringLayout` constants `NORTH`, `SOUTH`, `EAST`, or `WEST`. |

| Method | Purpose |
| --- | --- |
| [static Spring constant(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/Spring.html#constant-int-)   [static Spring constant(int, int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/Spring.html#constant-int-int-int-) | Create a spring that does not track a component's sizes. The three-argument version creates a spring with its minimum, preferred, and maximum values set to the specified values, in that order. The one-argument version creates a spring with its minimum, preferred, and maximum values all set to the specified integer.  Despite the name, springs returned by `constant` are mutable. To make a layout work out, `SpringLayout` might be forced to adjust a "constant" spring. For this reason, you should avoid reusing constant springs unless (1) you truly want the springs to always be precisely alike and (2) other springs provide some flexibility in the layout. |
| [static Spring sum(Spring, Spring)](https://docs.oracle.com/javase/8/docs/api/javax/swing/Spring.html#sum-javax.swing.Spring-javax.swing.Spring-)   [static Spring max(Spring, Spring)](https://docs.oracle.com/javase/8/docs/api/javax/swing/Spring.html#max-javax.swing.Spring-javax.swing.Spring-)   [static Spring minus(Spring)](https://docs.oracle.com/javase/8/docs/api/javax/swing/Spring.html#minus-javax.swing.Spring-) | Create a spring that is the result of some mathematical manipulation. The `sum` method adds two springs. The `max` method returns a spring whose value is always greater than or equal to the values of the two arguments. The `minus` method returns a spring running in the opposite direction of the argument. The `minus` method can be used to create an argument for the `sum` method, allowing you to get the difference between two springs. |
| [int getMinimumValue()](https://docs.oracle.com/javase/8/docs/api/javax/swing/Spring.html#getMinimumValue--)   [int getPreferredValue()](https://docs.oracle.com/javase/8/docs/api/javax/swing/Spring.html#getPreferredValue--)   [int getMaximumValue()](https://docs.oracle.com/javase/8/docs/api/javax/swing/Spring.html#getMaximumValue--) | Get the corresponding value from the spring. For a `SpringLayout` -created spring that automatically tracks a component, these methods result in calls to the component's corresponding `get*Xxx*Size` method. |
| [int getValue()](https://docs.oracle.com/javase/8/docs/api/javax/swing/Spring.html#getValue--)   [setValue(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/Spring.html#setValue-int-) | Get or set the spring's current value. |

## Examples that Use SpringLayout

The following table lists some examples that use spring layout.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`SpringDemo3`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringDemo3) | This page | Uses `SpringLayout` to create a row of evenly spaced, natural-size components. |
| [`SpringDemo4`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringDemo4) | This page | Reimplements SpringDemo3 to use `SpringLayout.Constraints` and `Spring` directly. |
| [`SpringGrid`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringGrid) | This page | Uses `SpringLayout` and the `makeGrid` utility method to create a layout where all the components are the same size. |
| [`SpringCompactGrid`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringCompactGrid) | This page | Uses `SpringLayout` and the `makeCompactGrid` utility method to create a layout where all the components in a row have the same height, and all components in a column have the same width. |
| [`SpringForm`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringForm) | This page | Uses `SpringLayout` and `makeCompactGrid` to align label-text field pairs. |
| [`SpringBox`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#SpringBox) | This page | Uses `SpringLayout` and `makeCompactGrid` to demonstrate laying out a single row of components, and what happens when no springs can grow. |
| [`SpinnerDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SpinnerDemo) | [[Swing-组件-spinner|How to Use Spinners]] | Uses `SpringLayout` and `makeCompactGrid` to lay out rows of label-spinner pairs. |
| [`TextInputDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextInputDemo) | [[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]] | Uses `SpringLayout` and `makeCompactGrid` to lay out rows of labeled components. The components are a mix of text fields, formatted text fields, and spinners. |
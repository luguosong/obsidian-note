---
分类:
  - "网页裁剪"
标题: "How to Use Borders (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/border.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Borders (The Java™ Tutorials >        
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

How to Use Borders

[[Swing-组件-problems|Solving Common Component Problems]]

[[Swing-组件-icon|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-problems|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Borders

Every `JComponent` can have one or more borders. Borders are incredibly useful objects that, while not themselves components, know how to draw the edges of Swing components. Borders are useful not only for drawing lines and fancy edges, but also for providing titles and empty space around components.

---

**Note:**

Our examples set borders on `JPanel` s, `JLabel` s, and custom subclasses of `JComponent`. Although technically you can set the border on any object that inherits from `JComponent`, the look and feel implementation of many standard Swing components doesn't work well with user-set borders. In general, when you want to set a border on a standard Swing component other than `JPanel` or `JLabel`, we recommend that you put the component in a `JPanel` and set the border on the `JPanel`.

---

To put a border around a `JComponent`, you use its `setBorder` method. You can use the [`BorderFactory`](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html) class to create most of the borders that Swing provides. If you need a reference to a border — say, because you want to use it in multiple components — you can save it in a variable of type [`Border`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/Border.html). Here is an example of code that creates a bordered container:

```text
JPanel pane = new JPanel();
pane.setBorder(BorderFactory.createLineBorder(Color.black));
```

Here's a picture of the container, which contains a label component. The black line drawn by the border marks the edge of the container.

![A line border](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/BorderDemo-line.png)

The rest of this page discusses the following topics:

## The BorderDemo Example

The following pictures show an application called `BorderDemo` that displays the borders Swing provides. We show the code for creating these borders a little later, in [Using the Borders Provided by Swing](#code).

Click the Launch button to run the BorderDemo example using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#BorderDemo).

  

![BorderDemo: Simple Borders](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/BorderDemo1.png)

The next picture shows some matte borders. When creating a matte border, you specify how many pixels it occupies at the top, left, bottom, and right of a component. You then specify either a color or an icon for the matte border to draw. You need to be careful when choosing the icon and determining your component's size; otherwise, the icon might get chopped off or have mismatch at the component's corners.

![BorderDemo: Matte Borders](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/BorderDemo2.png)

The next picture shows titled borders. Using a titled border, you can convert any border into one that displays a text description. If you don't specify a border, a look-and-feel-specific border is used. For example, the default titled border in the Java look and feel uses a gray line, and the default titled border in the Windows look and feel uses an etched border. By default, the title straddles the upper left of the border, as shown at the top of the following figure.

![BorderDemo: Titled Borders](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/BorderDemo3.png)

The next picture shows compound borders. With compound borders, you can combine any two borders, which can themselves be compound borders.

![BorderDemo: Compound Borders](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/BorderDemo4.png)

## Using the Borders Provided by Swing

The code that follows shows how to create and set the borders you saw in the preceding figures. You can find the program's code in [`BorderDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/BorderDemoProject/src/components/BorderDemo.java).

```text
//Keep references to the next few borders,
//for use in titles and compound borders.
Border blackline, raisedetched, loweredetched,
       raisedbevel, loweredbevel, empty;

blackline = BorderFactory.createLineBorder(Color.black);
raisedetched = BorderFactory.createEtchedBorder(EtchedBorder.RAISED);
loweredetched = BorderFactory.createEtchedBorder(EtchedBorder.LOWERED);
raisedbevel = BorderFactory.createRaisedBevelBorder();
loweredbevel = BorderFactory.createLoweredBevelBorder();
empty = BorderFactory.createEmptyBorder();

//Simple borders
jComp1.setBorder(blackline);
jComp2.setBorder(raisedbevel);
jComp3.setBorder(loweredbevel);
jComp4.setBorder(empty);

//Matte borders
ImageIcon icon = createImageIcon("images/wavy.gif",
                                 "wavy-line border icon"); //20x22

jComp5.setBorder(BorderFactory.createMatteBorder(
                                   -1, -1, -1, -1, icon));
jComp6.setBorder(BorderFactory.createMatteBorder(
                                    1, 5, 1, 1, Color.red));
jComp7.setBorder(BorderFactory.createMatteBorder(
                                    0, 20, 0, 0, icon));

//Titled borders
TitledBorder title;
title = BorderFactory.createTitledBorder("title");
jComp8.setBorder(title);

title = BorderFactory.createTitledBorder(
                       blackline, "title");
title.setTitleJustification(TitledBorder.CENTER);
jComp9.setBorder(title);

title = BorderFactory.createTitledBorder(
                       loweredetched, "title");
title.setTitleJustification(TitledBorder.RIGHT);
jComp10.setBorder(title);

title = BorderFactory.createTitledBorder(
                       loweredbevel, "title");
title.setTitlePosition(TitledBorder.ABOVE_TOP);
jComp11.setBorder(title);

title = BorderFactory.createTitledBorder(
                       empty, "title");
title.setTitlePosition(TitledBorder.BOTTOM);
jComp12.setBorder(title);

//Compound borders
Border compound;
Border redline = BorderFactory.createLineBorder(Color.red);

//This creates a nice frame.
compound = BorderFactory.createCompoundBorder(
                          raisedbevel, loweredbevel);
jComp13.setBorder(compound);

//Add a red outline to the frame.
compound = BorderFactory.createCompoundBorder(
                          redline, compound);
jComp14.setBorder(compound);

//Add a title to the red-outlined frame.
compound = BorderFactory.createTitledBorder(
                          compound, "title",
                          TitledBorder.CENTER,
                          TitledBorder.BELOW_BOTTOM);
jComp15.setBorder(compound);
```

As you probably noticed, the code uses the `BorderFactory` class to create each border. The `BorderFactory` class, which is in the `javax.swing` package, returns objects that implement the [`Border`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/Border.html) interface.

The `Border` interface, as well as its Swing-provided implementations, is in the [`javax.swing.border`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/package-summary.html) package. You often don't need to directly use anything in the border package, except when specifying constants that are specific to a particular border class or when referring to the `Border` type.

## Creating Custom Borders

If `BorderFactory` doesn't offer you enough control over a border's form, then you might need to directly use the API in the border package — or even define your own border. In addition to containing the `Border` interface, the border package contains the classes that implement the borders you've already seen: [`LineBorder`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/LineBorder.html), [`EtchedBorder`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/EtchedBorder.html), [`BevelBorder`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/BevelBorder.html), [`EmptyBorder`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/EmptyBorder.html), [`MatteBorder`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/MatteBorder.html), [`TitledBorder`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/TitledBorder.html), and [`CompoundBorder`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/CompoundBorder.html). The border package also contains a class named [`SoftBevelBorder`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/SoftBevelBorder.html), which produces a result similar to `BevelBorder`, but with softer edges.

If none of the Swing borders is suitable, you can implement your own border. Generally, you do this by creating a subclass of the [`AbstractBorder`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/AbstractBorder.html) class. In your subclass, you must implement at least one constructor and the following two methods:

- `paintBorder`, which contains the drawing code that a `JComponent` executes to draw the border.
- `getBorderInsets`, which specifies the amount of space the border needs to draw itself.

If a custom border has insets (and they typically have insets) you need to override both [`AbstractBorder.getBorderInsets(Component c)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/AbstractBorder.html#getBorderInsets-java.awt.Component-) and [`AbstractBorder.getBorderInsets(Component c, Insets insets)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/AbstractBorder.html#getBorderInsets-java.awt.Component-java.awt.Insets-) to provide the correct insets.

For examples of implementing borders, see the source code for the classes in the `javax.swing.border` package.

## The Border API

The following tables list the commonly used border methods. The API for using borders falls into two categories:

- [Creating a Border with BorderFactory](#createapi)
- [Setting or Getting a Component's Border](#setgetapi)

| Method | Purpose |
| --- | --- |
| [Border createLineBorder(Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createLineBorder-java.awt.Color-)   [Border createLineBorder(Color, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createLineBorder-java.awt.Color-int-) | Create a line border. The first argument is a `java.awt.Color` object that specifies the color of the line. The optional second argument specifies the width in pixels of the line. |
| [Border createEtchedBorder()](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createEtchedBorder--)   [Border createEtchedBorder(Color, Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createEtchedBorder-java.awt.Color-java.awt.Color-)   [Border createEtchedBorder(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createEtchedBorder-int-)   [Border createEtchedBorder(int, Color, Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createEtchedBorder-int-java.awt.Color-java.awt.Color-) | Create an etched border. The optional `Color` arguments specify the highlight and shadow colors to be used. The methods with `int` arguments allow the border methods to be specified as either `EtchedBorder.RAISED` or `EtchedBorder.LOWERED`. The methods without the `int` arguments create a lowered etched border. |
| [Border createLoweredBevelBorder()](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createLoweredBevelBorder--) | Create a border that gives the illusion of the component being lower than the surrounding area. |
| [Border createRaisedBevelBorder()](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createRaisedBevelBorder--) | Create a border that gives the illusion of the component being higher than the surrounding area. |
| [Border createBevelBorder(int, Color, Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createBevelBorder-int-java.awt.Color-java.awt.Color-)   [Border createBevelBorder(int, Color, Color, Color, Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createBevelBorder-int-java.awt.Color-java.awt.Color-java.awt.Color-java.awt.Color-) | Create a raised or lowered beveled border, specifying the colors to use. The integer argument can be either `BevelBorder.RAISED` or `BevelBorder.LOWERED`. With the three-argument constructor, you specify the highlight and shadow colors. With the five-argument constructor, you specify the outer highlight, inner highlight, outer shadow, and inner shadow colors, in that order. |
| [Border createEmptyBorder()](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createEmptyBorder--)   [Border createEmptyBorder(int, int, int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createEmptyBorder-int-int-int-int-) | Create an invisible border. If you specify no arguments, then the border takes no space, which is useful when creating a titled border with no visible boundary. The optional arguments specify the number of pixels that the border occupies at the top, left, bottom, and right (in that order) of whatever component uses it. This method is useful for putting empty space around your components. |
| [MatteBorder createMatteBorder(int, int, int, int, Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createMatteBorder-int-int-int-int-java.awt.Color-)   [MatteBorder createMatteBorder(int, int, int, int, Icon)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createMatteBorder-int-int-int-int-javax.swing.Icon-) | Create a matte border. The integer arguments specify the number of pixels that the border occupies at the top, left, bottom, and right (in that order) of whatever component uses it. The color argument specifies the color which with the border should fill its area. The icon argument specifies the icon which with the border should tile its area. |
| [TitledBorder createTitledBorder(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createTitledBorder-java.lang.String-)   [TitledBorder createTitledBorder(Border)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createTitledBorder-javax.swing.border.Border-)   [TitledBorder createTitledBorder(Border, String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createTitledBorder-javax.swing.border.Border-java.lang.String-)   [TitledBorder createTitledBorder(Border, String, int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createTitledBorder-javax.swing.border.Border-java.lang.String-int-int-)   [TitledBorder createTitledBorder(Border, String, int, int, Font)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createTitledBorder-javax.swing.border.Border-java.lang.String-int-int-java.awt.Font-)   [TitledBorder createTitledBorder(Border, String, int, int, Font, Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createTitledBorder-javax.swing.border.Border-java.lang.String-int-int-java.awt.Font-java.awt.Color-) | Create a titled border. The string argument specifies the title to be displayed. The optional font and color arguments specify the font and color to be used for the title's text. The border argument specifies the border that should be displayed along with the title. If no border is specified, then a look-and-feel-specific default border is used.  By default, the title straddles the top of its companion border and is left-justified. The optional integer arguments specify the title's position and justification, in that order. [`TitledBorder`](https://docs.oracle.com/javase/8/docs/api/javax/swing/border/TitledBorder.html) defines these possible positions: `ABOVE_TOP`, `TOP` (the default), `BELOW_TOP`, `ABOVE_BOTTOM`, `BOTTOM`, and `BELOW_BOTTOM`. You can specify the justification as `LEADING` (the default), `CENTER`, or `TRAILING`. In locales with Western alphabets `LEADING` is equivalent to `LEFT` and `TRAILING` is equivalent to `RIGHT`. |
| [CompoundBorder createCompoundBorder(Border, Border)](https://docs.oracle.com/javase/8/docs/api/javax/swing/BorderFactory.html#createCompoundBorder-javax.swing.border.Border-javax.swing.border.Border-) | Combine two borders into one. The first argument specifies the outer border; the second, the inner border. |

| Method | Purpose |
| --- | --- |
| [void setBorder(Border)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setBorder-javax.swing.border.Border-)   [Border getBorder()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#getBorder--) | Set or get the border of the receiving `JComponent`. |
| [void setBorderPainted(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#setBorderPainted-boolean-)   [boolean isBorderPainted()](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractButton.html#isBorderPainted--)   (in `AbstractButton`, `JMenuBar`, `JPopupMenu`, `JProgressBar`, and `JToolBar`) | Set or get whether the border of the component should be displayed. |

## Examples that Use Borders

Many examples in this lesson use borders. The following table lists a few interesting cases.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`BorderDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#BorderDemo) | This section | Shows an example of each type of border that `BorderFactory` can create. Also uses an empty border to add breathing space between each pane and its contents. |
| [`BoxAlignmentDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#BoxAlignmentDemo) | [[Swing-布局-box|How to Use BoxLayout]] | Uses titled borders. |
| [`BoxLayoutDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#BoxLayoutDemo) | [[Swing-布局-box|How to Use BoxLayout]] | Uses a red line to show where the edge of a container is, so that you can see how the extra space in a box layout is distributed. |
| [`ComboBoxDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ComboBoxDemo2) | [[Swing-组件-combobox|How to Use Combo Boxes]] | Uses a compound border to combine a line border with an empty border. The empty border provides space between the line and the component's innards. |
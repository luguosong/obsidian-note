---
分类:
  - "网页裁剪"
标题: "How to Use Panels (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/panel.html"
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

How to Use Panels

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

[[Swing-组件-menu|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-passwordfield|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Panels

The [`JPanel`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPanel.html) class provides general-purpose containers for lightweight components. By default, panels do not add colors to anything except their own background; however, you can easily add borders to them and otherwise customize their painting. Details can be found in [[Swing-自定义绘制|Performing Custom Painting]].

In many types of look and feel, panels are opaque by default. Opaque panels work well as content panes and can help with painting efficiently, as described in [[Swing-组件-toplevel|Using Top-Level Containers]]. You can change a panel's transparency by invoking the `setOpaque` method. A transparent panel draws no background, so that any components underneath show through.

## An Example

The following picture shows a colored version of the `Converter` application, which is discussed in more detail in [[Swing-组件-model|Using Models]].

![Colorful Converter](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ConverterColored.png)

The `Converter` example uses panels in several ways:

- One `JPanel` instance — colored red in the preceding snapshot — serves as a content pane for the application's frame. This content pane uses a top-to-bottom [[Swing-布局-box|`BoxLayout`]] to lay out its contents, and an empty border to put 5 pixels of space around them. See [[Swing-组件-toplevel|Using Top-Level Containers]] for information about content panes.
- Two instances of a custom `JPanel` subclass named `ConversionPanel` — colored cyan — are used to contain components and coordinate communication between components. These `ConversionPanel` panels also have titled borders, which describe their contents and enclose the contents with a line. Each `ConversionPanel` panel uses a left-to-right `BoxLayout` object to lay out its contents.
- In each `ConversionPanel`, a `JPanel` instance — colored magenta — is used to ensure the proper size and position of the combo box. Each of these `JPanel` instances uses a top-to-bottom `BoxLayout` object (helped by an invisible space-filling component) to lay out the combo box.
- In each `ConversionPanel`, an instance of an unnamed `JPanel` subclass — colored blue — groups two components (a text field and a slider) and restricts their size. Each of these `JPanel` instances uses a top-to-bottom `BoxLayout` object to lay out its contents.

Here is what the `Converter` application normally looks like.

![Normal Converter](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ConverterMetal.png)

As the `Converter` example demonstrates, panels are useful for grouping components, simplifying component layout, and putting borders around groups of components. The rest of this section gives hints on grouping and laying out components. For information about using borders, see [[Swing-组件-border|How to Use Borders]].

## Setting the Layout Manager

Like other containers, a panel uses a layout manager to position and size its components. By default, a panel's layout manager is an instance of [[Swing-布局-flow|`FlowLayout`]], which places the panel's contents in a row. You can easily make a panel use any other layout manager by invoking the `setLayout` method or by specifying a layout manager when creating the panel. The latter approach is preferable for performance reasons, since it avoids the unnecessary creation of a `FlowLayout` object.

Here is an example of how to set the layout manager when creating the panel.

```
JPanel p = new JPanel(new BorderLayout()); //PREFERRED!
```

This approach does not work with `BoxLayout`, since the `BoxLayout` constructor requires a pre-existing container. Here is an example that uses `BoxLayout`.

```
JPanel p = new JPanel();
p.setLayout(new BoxLayout(p, BoxLayout.PAGE_AXIS));
```

## Adding Components

When you add components to a panel, you use the `add` method. Exactly which arguments you specify to the `add` method depend on which layout manager the panel uses. When the layout manager is `FlowLayout`, `BoxLayout`, `GridLayout`, or `SpringLayout`, you will typically use the one-argument `add` method, like this:

```
aFlowPanel.add(aComponent);
aFlowPanel.add(anotherComponent);
```

When the layout manager is `BorderLayout`, you need to provide an argument specifying the added component's position within the panel. For example:

```
aBorderPanel.add(aComponent, BorderLayout.CENTER);
aBorderPanel.add(anotherComponent, BorderLayout.PAGE_END);
```

With `GridBagLayout` you can use either `add` method, but you must somehow specify [[Swing-布局-gridbag|grid bag constraints]] for each component.

For information about choosing and using the standard layout managers, see [[Swing-布局-using|Using Layout Managers]].

## The Panel API

The API in the `JPanel` class itself is minimal. The methods you are most likely to invoke on a `JPanel` object are those it inherits from its superclasses — [`JComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html), [`Container`](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html), and [`Component`](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html). The following tables list the API you are most likely to use, with the exception of methods related to [[Swing-组件-border|borders]] and [[Swing-组件-jcomponent|layout hints]]. For more information about the API that all `JComponent` objects can use, see [[Swing-组件-jcomponent|The JComponent Class]].

- [Creating a `JPanel`](#creating)
- [Managing a Container's Components](#contents)
- [Setting or Getting the Layout Manager](#layoutapi)

| Constructor | Purpose |
| --- | --- |
| [JPanel()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPanel.html#JPanel--)   [JPanel(LayoutManager)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPanel.html#JPanel-java.awt.LayoutManager-) | Creates a panel. The `LayoutManager` parameter provides a layout manager for the new panel. By default, a panel uses a `FlowLayout` to lay out its components. |

| Method | Purpose |
| --- | --- |
| [void add(Component)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#add-java.awt.Component-)   [void add(Component, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#add-java.awt.Component-int-)   [void add(Component, Object)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#add-java.awt.Component-java.lang.Object-)   [void add(Component, Object, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#add-java.awt.Component-java.lang.Object-int-)   [void add(String, Component)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#add-java.lang.String-java.awt.Component-) | Adds the specified component to the panel. When present, the `int` parameter is the index of the component within the container. By default, the first component added is at index 0, the second is at index 1, and so on. The `Object` parameter is layout manager dependent and typically provides information to the layout manager regarding positioning and other layout constraints for the added component. The `String` parameter is similar to the `Object` parameter. |
| [int getComponentCount()](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponentCount--) | Gets the number of components in this panel. |
| [Component getComponent(int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponent-int-)   [Component getComponentAt(int, int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponentAt-int-int-)   [Component getComponentAt(Point)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponentAt-java.awt.Point-)   [Component\[\] getComponents()](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getComponents--) | Gets the specified component or components. You can get a component based on its index or *x, y* position. |
| [void remove(Component)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#remove-java.awt.Component-)   [void remove(int)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#remove-int-)   [void removeAll()](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#removeAll--) | Removes the specified component(s). |

| Method | Purpose |
| --- | --- |
| [void setLayout(LayoutManager)](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#setLayout-java.awt.LayoutManager-)   [LayoutManager getLayout()](https://docs.oracle.com/javase/8/docs/api/java/awt/Container.html#getLayout--) | Sets or gets the layout manager for this panel. The layout manager is responsible for positioning the panel's components within the panel's bounds according to some philosophy. |

## Examples That Use Panels

Many examples contained in this lesson use `JPanel` objects. The following table lists a few.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`Converter`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#Converter) | This section | Uses five panels, four of which use `BoxLayout` and one of which uses `GridLayout`. The panels use borders and, as necessary, size and alignment hints to affect layout. |
| [`ListDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ListDemo) | [[Swing-组件-list|How to Use Lists]] | Uses a panel, with its default `FlowLayout` manager, to center three components in a row. |
| [`ToolBarDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ToolBarDemo) | [[Swing-组件-toolbar|How to Use Tool Bars]] | Uses a panel as a content pane. The panel contains three components, laid out by `BorderLayout`. |
| [`BorderDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#BorderDemo) | [[Swing-组件-border|How to Use Borders]] | Contains many panels that have various kinds of borders. Several panels use `BoxLayout`. |
| [`BoxLayoutDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#BoxLayoutDemo) | [[Swing-布局-box|How to Use BoxLayout]] | Illustrates the use of a panel with Swing's `BoxLayout` manager. |
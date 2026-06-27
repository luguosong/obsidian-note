---
分类:
  - "网页裁剪"
标题: "How to Use Models (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/model.html"
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

How to Use Models

[[Swing-组件-icon|How to Use Icons]]

[[Swing-组件-border|How to Use Borders]]

[[Swing-组件-problems|Solving Common Component Problems]]

[[Swing-组件-html|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-icon|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Models

Most Swing components have models. A button (`JButton`), for example, has a model (a `ButtonModel` object) that stores the button's state — what its keyboard mnemonic is, whether it's enabled, selected, or pressed, and so on. Some components have multiple models. A list (`JList`), for example, uses a `ListModel` to hold the list's contents, and a `ListSelectionModel` to track the list's current selection.

You often don't need to know about the models that a component uses. For example, programs that use buttons usually deal directly with the `JButton` object, and don't deal at all with the `ButtonModel` object.

Why then do models exist? The biggest reason is that they give you flexibility in determining how data is stored and retrieved. For example, if you're designing a spreadsheet application that displays data in a sparsely populated table, you can create your own table model that is optimized for such use.

Models have other benefits, too. They mean that data isn't copied between a program's data structures and those of the Swing components. Also, models automatically propagate changes to all interested listeners, making it easy for the GUI to stay in sync with the data. For example, to add items to a list you can invoke methods on the list model. When the model's data changes, the model fires events to the `JList` and any other registered listeners, and the GUI is updated accordingly.

Although Swing's model architecture is sometimes referred to as a Model-View-Controller (MVC) design, it really isn't. Swing components are generally implemented so that the view and controller are indivisible, implemented by a single UI object provided by the look and feel. The Swing model architecture is more accurately described as a *separable model architecture*. If you're interested in learning more about the Swing model architecture, see [A Swing Architecture Overview](http://www.oracle.com/technetwork/java/architecture-142923.html), an article in *The Swing Connection*.

## An Example: Converter

This section features an example called Converter, which is an application that continuously converts distance measurements between metric and U.S. units. You can [run Converter](https://docs.oracle.com/javase/tutorialJWS/samples/uiswing/ConverterProject/Converter.jnlp) ( [download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Or, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#Converter).

As the following picture shows, Converter features two sliders, each tied to a text field. The sliders and text fields all display the same data — a distance — but using two different units of measure.

![Converter screenshot in the Metal look and feel](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ConverterMetal.png)

The important thing for this program is ensuring that only one model controls the value of the data. There are various ways to achieve this; we did it by deferring to the top slider's model. The bottom slider's model (an instance of a custom class called `FollowerRangeModel`) forwards all data queries to the top slider's model (an instance of a custom class called `ConverterRangeModel`). Each text field is kept in sync with its slider, and vice versa, by event handlers that listen for changes in value. Care is taken to ensure that the top slider's model has the final say about what distance is displayed.

When we started implementing the custom slider models, we first looked at the API section of [[Swing-滑块|How to Use Sliders]]. It informed us that all slider data models must implement the `BoundedRangeModel` interface. The [`BoundedRangeModel` API documentation](https://docs.oracle.com/javase/8/docs/api/javax/swing/BoundedRangeModel.html) tells us that the interface has an implementing class named `DefaultBoundedRangeModel`. The [API documentation for `DefaultBoundedRangeModel`](https://docs.oracle.com/javase/8/docs/api/javax/swing/DefaultBoundedRangeModel.html) shows that it's a general-purpose implementation of `BoundedRangeModel`.

We didn't use `DefaultBoundedRangeModel` directly because it stores data as integers, and Converter uses floating-point data. Thus, we implemented `ConverterRangeModel` as a subclass of `Object`. We then implemented `FollowerRangeModel` as a subclass of `ConverterRangeModel`.

## For Further Information

To find out about the models for individual components, see the [[Swing-组件-componentlist|"How to"]] pages and API documentation for individual components. Here are some of our examples that use models directly:

- All but the simplest of the [[Swing-组件-table|table examples]] implement custom table data models.
- The [[Swing-组件-colorchooser|color chooser demos]] have change listeners on the color chooser's selection model so they can be notified when the user selects a new color. In ColorChooserDemo2, the `CrayonPanel` class directly uses the color selection model to set the current color.
- The [DynamicTreeDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#DynamicTreeDemo) example sets the tree model (to an instance of `DefaultTreeModel`), interacts directly with it, and listens for changes to it.
- [ListDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ListDemo) sets the list data model (to an instance of `DefaultListModel`) and interacts directly with it.
- [SharedModelDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SharedModelDemo) defines a `SharedDataModel` class that extends `DefaultListModel` and implements `TableModel`. A `JList` and `JTable` share an instance of `SharedDataModel`, providing different views of the model's data.
- In the event listener examples, [ListDataEventDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#ListDataEventDemo) creates and uses a `DefaultListModel` directly.
- Our [[Swing-组件-spinner|spinner examples]] create spinner models.
- As you've already seen, the [Converter](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#Converter) example defines two custom slider models.
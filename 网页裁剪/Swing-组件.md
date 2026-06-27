Documentation

Using Swing Components

[Using Top-Level Containers](https://docs.oracle.com/javase/tutorial/uiswing/components/toplevel.html)

[The JComponent Class](https://docs.oracle.com/javase/tutorial/uiswing/components/jcomponent.html)

[Using Text Components](https://docs.oracle.com/javase/tutorial/uiswing/components/text.html)

[Text Component Features](https://docs.oracle.com/javase/tutorial/uiswing/components/generaltext.html)

[The Text Component API](https://docs.oracle.com/javase/tutorial/uiswing/components/textapi.html)

[How to Use Various Components](https://docs.oracle.com/javase/tutorial/uiswing/components/componentlist.html)

[How to Make Applets](https://docs.oracle.com/javase/tutorial/uiswing/components/applet.html)

[How to Use Buttons, Check Boxes, and Radio Buttons](https://docs.oracle.com/javase/tutorial/uiswing/components/button.html)

[How to Use the ButtonGroup Component](https://docs.oracle.com/javase/tutorial/uiswing/components/buttongroup.html)

[How to Use Color Choosers](https://docs.oracle.com/javase/tutorial/uiswing/components/colorchooser.html)

[How to Use Combo Boxes](https://docs.oracle.com/javase/tutorial/uiswing/components/combobox.html)

[How to Make Dialogs](https://docs.oracle.com/javase/tutorial/uiswing/components/dialog.html)

[How to Use Editor Panes and Text Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/editorpane.html)

[How to Use File Choosers](https://docs.oracle.com/javase/tutorial/uiswing/components/filechooser.html)

[How to Use Formatted Text Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/formattedtextfield.html)

[How to Make Frames (Main Windows)](https://docs.oracle.com/javase/tutorial/uiswing/components/frame.html)

[How to Use Internal Frames](https://docs.oracle.com/javase/tutorial/uiswing/components/internalframe.html)

[How to Use Labels](https://docs.oracle.com/javase/tutorial/uiswing/components/label.html)

[How to Use Layered Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/layeredpane.html)

[How to Use Lists](https://docs.oracle.com/javase/tutorial/uiswing/components/list.html)

[How to Use Menus](https://docs.oracle.com/javase/tutorial/uiswing/components/menu.html)

[How to Use Panels](https://docs.oracle.com/javase/tutorial/uiswing/components/panel.html)

[How to Use Password Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/passwordfield.html)

[How to Use Progress Bars](https://docs.oracle.com/javase/tutorial/uiswing/components/progress.html)

[How to Use Root Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/rootpane.html)

[How to Use Scroll Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/scrollpane.html)

[How to Use Separators](https://docs.oracle.com/javase/tutorial/uiswing/components/separator.html)

[How to Use Sliders](https://docs.oracle.com/javase/tutorial/uiswing/components/slider.html)

[How to Use Spinners](https://docs.oracle.com/javase/tutorial/uiswing/components/spinner.html)

[How to Use Split Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/splitpane.html)

[How to Use Tabbed Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/tabbedpane.html)

[How to Use Tables](https://docs.oracle.com/javase/tutorial/uiswing/components/table.html)

[How to Use Text Areas](https://docs.oracle.com/javase/tutorial/uiswing/components/textarea.html)

[How to Use Text Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/textfield.html)

[How to Use Tool Bars](https://docs.oracle.com/javase/tutorial/uiswing/components/toolbar.html)

[How to Use Tool Tips](https://docs.oracle.com/javase/tutorial/uiswing/components/tooltip.html)

[How to Use Trees](https://docs.oracle.com/javase/tutorial/uiswing/components/tree.html)

[How to Use HTML in Swing Components](https://docs.oracle.com/javase/tutorial/uiswing/components/html.html)

[How to Use Models](https://docs.oracle.com/javase/tutorial/uiswing/components/model.html)

[How to Use Icons](https://docs.oracle.com/javase/tutorial/uiswing/components/icon.html)

[How to Use Borders](https://docs.oracle.com/javase/tutorial/uiswing/components/border.html)

[Solving Common Component Problems](https://docs.oracle.com/javase/tutorial/uiswing/components/problems.html)

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/learn/index.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/uiswing/components/toplevel.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Using Swing Components

[Examples Index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html)  

This lesson gives you the background information you need to use the Swing components, and then describes every Swing component. It assumes that you have successfully compiled and run a program that uses Swing components, and that you are familiar with basic Swing concepts. These prerequisites are covered in [Getting Started with Swing](https://docs.oracle.com/javase/tutorial/uiswing/start/index.html) and [Learning Swing with the NetBeans IDE](https://docs.oracle.com/javase/tutorial/uiswing/learn/index.html).

## Using Top-Level Containers

Discusses how to use the features shared by the `JFrame`, `JDialog`, and `JApplet` classes — content panes, menu bars, and root panes. It also discusses the *containment hierarchy*, which refers to the tree of components contained by a top-level container.

## The JComponent Class

Tells you about the features `JComponent` provides to its subclasses — which include almost all Swing components — and gives tips on how to take advantage of these features. This section ends with API tables describing the commonly used API defined by `JComponent` and its superclasses, `Container` and `Component`.

## Using Text Components

Describes the features and API shared by all components that descend from `JTextComponent`. You probably do not need to read this section if you are just using text fields (formatted or not) or text areas.

## How to...

Sections on how to use each Swing component, in alphabetical order. We do not expect you to read these sections in order. Instead, we recommend reading the relevant "How to" sections once you are ready to start using Swing components in your own programs. For example, if your program needs a frame, a label, a button, and a color chooser, you should read [How to Make Frames](https://docs.oracle.com/javase/tutorial/uiswing/components/frame.html), [How to Use Labels](https://docs.oracle.com/javase/tutorial/uiswing/components/label.html), [How to Use Buttons](https://docs.oracle.com/javase/tutorial/uiswing/components/button.html), and [How to Use Color Choosers](https://docs.oracle.com/javase/tutorial/uiswing/components/colorchooser.html).

## Using HTML in Swing Components

Describes how to vary the font, color, or other formatting of text displayed by Swing components by using HTML tags.

## Using Models

Tells you about the Swing model architecture. This variation on Model-View-Controller (MVC) means that you can, if you wish, specify how the data and state of a Swing component are stored and retrieved. The benefits are the ability to share data and state between components, and to greatly improve the performance of components such as tables that display large amounts of data.

## Using Borders

Borders are very handy for drawing lines, titles, and empty space around the edges of components. (You might have noticed that the examples in this trail use a lot of borders.) This section tells you how to add a border to any `JComponent`.

## Using Icons

Many Swing components can display icons. Usually, icons are implemented as instances of the `ImageIcon` class.

## Solving Common Component Problems

This section discusses solutions to common component-related problems.

If you are interested in using JavaFX to create your GUI, see [Using JavaFX Charts](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/charts.htm) and [Using JavaFX UI Controls](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/ui_controls.htm).
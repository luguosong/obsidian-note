---
分类:
  - "网页裁剪"
标题: "Using Top-Level Containers (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/toplevel.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

Using Top-Level Containers

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

[[Swing-组件-border|How to Use Borders]]

[[Swing-组件-problems|Solving Common Component Problems]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Using Top-Level Containers

As we mentioned before, Swing provides three generally useful top-level container classes: [[Swing-组件-frame|`JFrame`]], [[Swing-组件-dialog|`JDialog`]], and [[Swing-组件-applet|`JApplet`]]. When using these classes, you should keep these facts in mind:

- To appear onscreen, every GUI component must be part of a *containment hierarchy*. A containment hierarchy is a tree of components that has a top-level container as its root. We'll show you one in a bit.
- Each GUI component can be contained only once. If a component is already in a container and you try to add it to another container, the component will be removed from the first container and then added to the second.
- Each top-level container has a content pane that, generally speaking, contains (directly or indirectly) the visible components in that top-level container's GUI.
- You can optionally add a menu bar to a top-level container. The menu bar is by convention positioned within the top-level container, but outside the content pane. Some look and feels, such as the Mac OS look and feel, give you the option of placing the menu bar in another place more appropriate for the look and feel, such as at the top of the screen.

---

**Note:** Although [[Swing-组件-internalframe|`JInternalFrame`]] mimics `JFrame`, internal frames aren't actually top-level containers.

---

Here's a picture of a frame created by an application. The frame contains a green menu bar (with no menus) and, in the frame's content pane, a large blank, yellow label.

| ![A simple application with a frame that contains a menu bar and a content pane.](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/TopLevelDemoMetal.png) | ![A diagram of the frame's major parts](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/ConceptualPane.gif) |
| --- | --- |

You can find the entire source for this example in [`TopLevelDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TopLevelDemoProject/src/components/TopLevelDemo.java). Although the example uses a `JFrame` in a standalone application, the same concepts apply to `JApplet` s and `JDialog` s.

Here's the containment hierarchy for this example's GUI:

![Containment hierarchy for the TopLeveDemo example's GUI.](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/3jframe.gif)

As the ellipses imply, we left some details out of this diagram. We reveal the missing details a bit later. Here are the topics this section discusses:

- [Top-Level Containers and Containment Hierarchies](#general)
- [Adding Components to the Content Pane](#contentpane)
- [Adding a Menu Bar](#menubar)
- [The Root Pane (a.k.a. The Missing Details)](#rootpane)

## Top-Level Containers and Containment Hierarchies

Each program that uses Swing components has at least one top-level container. This top-level container is the root of a containment hierarchy — the hierarchy that contains all of the Swing components that appear inside the top-level container.

As a rule, a standalone application with a Swing-based GUI has at least one containment hierarchy with a `JFrame` as its root. For example, if an application has one main window and two dialogs, then the application has three containment hierarchies, and thus three top-level containers. One containment hierarchy has a `JFrame` as its root, and each of the other two has a `JDialog` object as its root.

A Swing-based applet has at least one containment hierarchy, exactly one of which is rooted by a `JApplet` object. For example, an applet that brings up a dialog has two containment hierarchies. The components in the browser window are in a containment hierarchy rooted by a `JApplet` object. The dialog has a containment hierarchy rooted by a `JDialog` object.

## Adding Components to the Content Pane

Here's the code that the preceding example uses to get a frame's content pane and add the yellow label to it:

```
frame.getContentPane().add(yellowLabel, BorderLayout.CENTER);
```

As the code shows, you find the content pane of a top-level container by calling the `getContentPane` method. The default content pane is a simple intermediate container that inherits from `JComponent`, and that uses a `BorderLayout` as its layout manager.

It's easy to customize the content pane — setting the layout manager or adding a border, for example. However, there is one tiny gotcha. The `getContentPane` method returns a `Container` object, not a `JComponent` object. This means that if you want to take advantage of the content pane's `JComponent` features, you need to either typecast the return value or create your own component to be the content pane. Our examples generally take the second approach, since it's a little cleaner. Another approach we sometimes take is to simply add a customized component to the content pane, covering the content pane completely.

Note that the default layout manager for `JPanel` is `FlowLayout`; you'll probably want to change it.

To make a component the content pane, use the top-level container's `setContentPane` method. For example:

```
//Create a panel and add components to it.
JPanel contentPane = new JPanel(new BorderLayout());
contentPane.setBorder(someBorder);
contentPane.add(someComponent, BorderLayout.CENTER);
contentPane.add(anotherComponent, BorderLayout.PAGE_END);

topLevelContainer.setContentPane(contentPane);
```

---

**Note:**

As a convenience, the `add` method and its variants, `remove` and `setLayout` have been overridden to forward to the `contentPane` as necessary. This means you can write

```
frame.add(child);
```

and the child will be added to the `contentPane.`  
  
Note that only these three methods do this. This means that `getLayout()` will not return the layout set with `setLayout()`.

---

## Adding a Menu Bar

In theory, all top-level containers can hold a menu bar. In practice, however, menu bars usually appear only in frames and applets. To add a menu bar to a top-level container, create a `JMenuBar` object, populate it with menus, and then call `setJMenuBar`. The `TopLevelDemo` adds a menu bar to its frame with this code:

```
frame.setJMenuBar(greenMenuBar);
```

For more information about implementing menus and menu bars, see [[Swing-组件-menu|How to Use Menus]].

## The Root Pane

Each top-level container relies on a reclusive intermediate container called the *root pane*. The root pane manages the content pane and the menu bar, along with a couple of other containers. You generally don't need to know about root panes to use Swing components. However, if you ever need to intercept mouse clicks or paint over multiple components, you should get acquainted with root panes.

Here's a list of the components that a root pane provides to a frame (and to every other top-level container):

![A root pane manages four other panes: a layered pane, a menu bar, a content pane, and a glass pane.](https://docs.oracle.com/javase/tutorial/figures/ui/ui-rootPane.gif)

We've already told you about the content pane and the optional menu bar. The two other components that a root pane adds are a layered pane and a glass pane. The layered pane contains the menu bar and content pane, and enables Z-ordering of other components. The glass pane is often used to intercept input events occuring over the top-level container, and can also be used to paint over multiple components.

For more details, see [[Swing-组件-rootpane|How to Use Root Panes]].
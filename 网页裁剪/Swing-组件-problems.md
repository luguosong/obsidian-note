---
分类:
  - "网页裁剪"
标题: "Solving Common Component Problems (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/problems.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Solving Common Component Problems (The Java™ Tutorials >        
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

[[Swing-组件-border|How to Use Borders]]

Solving Common Component Problems

[[Swing-组件-border|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-questions-ch3|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Solving Common Component Problems

This section discusses problems that you might encounter while using components. If you do not find your problem in this section, consult the following sections:

- [[Swing-其他特性-problems|Solving Common Problems Using Other Swing Features]]
- [[Swing-布局-problems|Solving Common Layout Problems]]
- [[Swing-事件监听-problems|Solving Common Event-Handling Problems]]
- [[Swing-problems|Solving Common Painting Problems]]

**Problem:** I am having trouble implementing a model (or some other code that is similar to something already in Java SE Platform, Standard Edition).

- Look at the Java SE source code. It is distributed with the JDK, and it is a great resource for finding code examples of implementing models, firing events, and the like.

**Problem:** Whenever the text in my text field updates, the text field's size changes.

- You should specify the preferred width of the text field by specifying the number of columns it should have room to display. To do this, you can use either an `int` argument to the `JTextField` constructor or the `setColumns` method.

**Problem:** Certain areas of the content pane look weird when they are repainted.

- If you set the content pane, make sure it is opaque. You can do this by invoking `setOpaque(true)` on your content pane. Note that although `JPanel` s are opaque in most look and feels, that is not true in the GTK+ look and feel. See [[Swing-组件-toplevel|Adding Components to the Content Pane]] for details.
- If one or more of your components performs custom painting, make sure you implemented it correctly. See [[Swing-problems|Solving Common Painting Problems]] for help.
- You might have a thread safety problem. See the next entry.

**Problem:** My program is exhibiting weird symptoms that sometimes seem to be related to timing.

- Make sure your code is thread-safe. See [[Swing-并发|Concurrency in Swing]] for details.

**Problem:** My modal dialog gets lost behind other windows.

- If the dialog has a null parent component, try setting it to a valid frame or component when you create it.
- This bug was fixed in the 6.0 release. For more information, see [4255200](http://bugs.java.com/bugdatabase/view_bug.do?bug_id=4255200).

**Problem:** The scroll bar policies do not seem to be working as advertised.

- Some Swing releases contain bugs in the implementations for the `VERTICAL_SCROLLBAR_AS_NEEDED` and the `HORIZONTAL_SCROLLBAR_AS_NEEDED` policies. If feasible for your project, use the most recent release of Swing.
- If the scroll pane's client can change size dynamically, the program should set the client's preferred size and then call `revalidate` on the client.
- Make sure you specified the policy you intended for the orientation you intended.

**Problem:** My scroll pane has no scroll bars.

- If you want a scroll bar to appear all the time, specify either `VERTICAL_SCROLLBAR_ALWAYS` or `HORIZONTAL_SCROLLBAR_ALWAYS` for the scroll bar policy as appropriate.
- If you want the scroll bars to appear as needed, and you want to force the scroll bars to be needed when the scroll pane is created, you have two choices: either set the preferred size of scroll pane or its container, or implement a scroll-savvy class and return a value smaller than the component's standard preferred size from the `getPreferredScrollableViewportSize` method. Refer to [[Swing-组件-scrollpane|Sizing a Scroll Pane]] for information.

**Problem:** The divider in my split pane does not move!

- You need to set the minimum size of at least one of the components in the split pane. Refer to [[Swing-组件-splitpane|Positioning the Divider and Restricting Its Range]] for information.

**Problem:** The `setDividerLocation` method of `JSplitPane` does not work.

- The `setDividerLocation(double)` method has no effect if the split pane has no size (typically true if it is not onscreen yet). You can either use `setDividerLocation(int)` or specify the preferred sizes of the split pane's contained components and the split pane's resize weight instead. Refer to [[Swing-组件-splitpane|Positioning the Divider and Restricting Its Range]] for information.

**Problem:** The borders on nested split panes look too wide.

- If you nest split panes, the borders accumulate — the border of the inner split panes display next to the border of the outer split pane causing borders that look extra wide. The problem is particularly noticeable when nesting many split panes. The workaround is to set the border to null on any split pane that is placed within another split pane. For information, see bug # [4131528](http://bugs.java.com/bugdatabase/view_bug.do?bug_id=4131528) in the Java Bug Database.

**Problem:** The buttons in my tool bar are too big.

- Try reducing the margin for the buttons. For example:
```text
	button.setMargin(new Insets(0,0,0,0));
```

**Problem:** The components in my layered pane are not layered correctly. In fact, the layers seem to be inversed — the lower the depth the higher the component.

- This can happen if you use an `int` instead of an `Integer` when adding components to a layered pane. To see what happens, in the `LayeredPaneDemo` class, change  
	`layeredPane.add(label, new Integer(i));`  
	to  
	`layeredPane.add(label, **i**);`.

**Problem:** The method call `*colorChooser*.setPreviewPanel(null)` does not remove the color chooser's preview panel as expected.

- A `null` argument specifies the default preview panel. To remove the preview panel, specify a standard panel with no size, like this: `*colorChooser*.setPreviewPanel(new JPanel());`
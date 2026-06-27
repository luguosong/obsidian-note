---
分类:
  - "网页裁剪"
标题: "Listeners Supported by Swing Components (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/eventsandcomponents.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Listeners Supported by Swing Components (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)

Documentation

[[Swing-事件监听-intro|Introduction to Event Listeners]]

[[Swing-事件监听-generalrules|General Information about Writing Event Listeners]]

Listeners Supported by Swing Components

[[Swing-事件监听-handling|Implementing Listeners for Commonly Handled Events]]

[[Swing-事件监听-actionlistener|How to Write an Action Listener]]

[[Swing-事件监听-caretlistener|How to Write a Caret Listener]]

[[Swing-事件监听-changelistener|How to Write a Change Listener]]

[[Swing-事件监听-componentlistener|How to Write a Component Listener]]

[[Swing-事件监听-containerlistener|How to Write a Container Listener]]

[[Swing-事件监听-documentlistener|How to Write a Document Listener]]

[[Swing-事件监听-focuslistener|How to Write a Focus Listener]]

[[Swing-事件监听-internalframelistener|How to Write an Internal Frame Listener]]

[[Swing-事件监听-itemlistener|How to Write an Item Listener]]

[[Swing-事件监听-keylistener|How to Write a Key Listener]]

[[Swing-事件监听-listdatalistener|How to Write a List Data Listener]]

[[Swing-事件监听-listselectionlistener|How to Write a List Selection Listener]]

[[Swing-事件监听-mouselistener|How to Write a Mouse Listener]]

[[Swing-事件监听-mousemotionlistener|How to Write a Mouse-Motion Listener]]

[[Swing-事件监听-mousewheellistener|How to Write a Mouse-Wheel Listener]]

[[Swing-事件监听-propertychangelistener|How to Write a Property Change Listener]]

[[Swing-事件监听-tablemodellistener|How to Write a Table Model Listener]]

[[Swing-事件监听-treeexpansionlistener|How to Write a Tree Expansion Listener]]

[[Swing-事件监听-treemodellistener|How to Write a Tree Model Listener]]

[[Swing-事件监听-treeselectionlistener|How to Write a Tree Selection Listener]]

[[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]]

[[Swing-事件监听-undoableeditlistener|How to Write an Undoable Edit Listener]]

[[Swing-事件监听-windowlistener|How to Write Window Listeners]]

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-generalrules|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-handling|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Listeners Supported by Swing Components

You can tell what kinds of events a component can fire by looking at the kinds of event listeners you can register on it. For example, the `JComboBox` class defines these listener registration methods:

- `addActionListener`
- `addItemListener`
- `addPopupMenuListener`

Thus, a combo box supports action, item, and context menu listeners in addition to the listener methods it inherits from `JComponent`.

Listeners supported by Swing components fall into two categories:

- [Listeners that All Swing Components Support](#all)
- [Other Listeners that Swing Components Support](#many)

## Listeners that All Swing Components Support

Because all Swing components descend from the AWT `Component` class, you can register the following listeners on any Swing component:

**[[Swing-事件监听-componentlistener|component listener]]**

Listens for changes in the component's size, position, or visibility.

**[[Swing-事件监听-focuslistener|focus listener]]**

Listens for whether the component gained or lost the keyboard focus.

**[[Swing-事件监听-keylistener|key listener]]**

Listens for key presses; key events are fired only by the component that has the current keyboard focus.

**[[Swing-事件监听-mouselistener|mouse listener]]**

Listens for mouse clicks, mouse presses, mouse releases and mouse movement into or out of the component's drawing area.

**[[Swing-事件监听-mousemotionlistener|mouse-motion listener]]**

Listens for changes in the mouse cursor's position over the component.

**[[Swing-事件监听-mousewheellistener|mouse-wheel listener]]**

Listens for mouse wheel movement over the component.

[**Hierarchy Listener**](https://docs.oracle.com/javase/8/docs/api/java/awt/event/HierarchyListener.html)

Listens for changes to a component's containment hierarchy of changed events.

[**Hierarchy Bounds Listener**](https://docs.oracle.com/javase/8/docs/api/java/awt/event/HierarchyBoundsListener.html)

Listens for changes to a component's containment hierarchy of moved and resized events.

All Swing components descend from the AWT `Container` class, but many of them are not used as containers. So, technically speaking, any Swing component can fire [[Swing-事件监听-containerlistener|container events]], which notify listeners that a component has been added to or removed from the container. Realistically speaking, however, only containers (such as panels and frames) and compound components (such as combo boxes) typically fire container events.

`JComponent` provides support for three more listener types. You can register an [ancestor listener](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/AncestorListener.html) to be notified when a component's containment ancestors are added to or removed from a container, hidden, made visible, or moved. This listener type is an implementation detail which predated hierarchy listeners.

The other two listener types are part of the Swing components' conformance to the JavaBeans specification. Among other things, this means that Swing components support bound and constrained properties and notify listeners of changes to the properties. [[Swing-事件监听-propertychangelistener|Property change listeners]] listen for changes to bound properties and are used by several Swing components, such as [[Swing-组件-formattedtextfield|formatted text fields]], to track changes on a component's bound properties. Also, property change listeners, as well as [vetoable change listeners](https://docs.oracle.com/javase/8/docs/api/java/beans/VetoableChangeListener.html) are used by builder tools to listen for changes on constrained properties. For more information refer to the [[JavaBeans-编写组件-属性|Properties]] lesson in the [[JavaBeans|JavaBeans]] trail.

## Other Listeners that Swing Components Support

The following table lists Swing components and the specialized listeners they support, not including listeners supported by all `Component` s, `Container` s, or `JComponent` s. In many cases, the events are fired directly from the component. In other cases, the events are fired from the component's data or selection model. To find out the details for the particular component and listener you are interested in, go first to the component how-to section, and then if necessary to the listener how-to section.

| Component | [[Swing-事件监听-actionlistener|Action Listener]] | [[Swing-事件监听-caretlistener|Caret Listener]] | [[Swing-事件监听-changelistener|Change Listener]] | [[Swing-事件监听-documentlistener|Document Listener]],   [[Swing-事件监听-undoableeditlistener|Undoable Edit Listener]] | [[Swing-事件监听-itemlistener|Item Listener]] | [[Swing-事件监听-listselectionlistener|List Selection Listener]] | [[Swing-事件监听-windowlistener|Window Listener]] | Other Types of Listeners |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [[Swing-按钮|button]] |  |  |  |  |  |  |  |  |
| [[Swing-按钮|check box]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-colorchooser|color chooser]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-combobox|combo box]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-dialog|dialog]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-editorpane|editor pane]] |  |  |  |  |  |  |  | [hyperlink](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/HyperlinkListener.html) |
| [[Swing-组件-filechooser|file chooser]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-formattedtextfield|formatted text field]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-frame|frame]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-internalframe|internal frame]] |  |  |  |  |  |  |  | [[Swing-事件监听-internalframelistener|internal frame]] |
| [[Swing-组件-list|list]] |  |  |  |  |  |  |  | [[Swing-事件监听-listdatalistener|list data]] |
| [[Swing-组件-menu|menu]] |  |  |  |  |  |  |  | [menu](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/MenuListener.html) |
| [[Swing-组件-menu|menu item]] |  |  |  |  |  |  |  | [menu key](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/MenuKeyListener.html)   [menu drag mouse](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/MenuDragMouseListener.html) |
| [[Swing-组件-dialog|option pane]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-passwordfield|password field]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-menu|popup menu]] |  |  |  |  |  |  |  | [popup menu](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/PopupMenuListener.html) |
| [[Swing-组件-progress|progress bar]] |  |  |  |  |  |  |  |  |
| [[Swing-按钮|radio button]] |  |  |  |  |  |  |  |  |
| [[Swing-滑块|slider]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-spinner|spinner]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-tabbedpane|tabbed pane]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-table|table]] |  |  |  |  |  |  |  | [[Swing-事件监听-tablemodellistener|table model]]   [table column model](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TableColumnModelListener.html)   [cell editor](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/CellEditorListener.html) |
| [[Swing-组件-textarea|text area]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-textfield|text field]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-editorpane|text pane]] |  |  |  |  |  |  |  | [hyperlink](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/HyperlinkListener.html) |
| [[Swing-按钮|toggle button]] |  |  |  |  |  |  |  |  |
| [[Swing-组件-tree|tree]] |  |  |  |  |  |  |  | [[Swing-事件监听-treeexpansionlistener|tree expansion]]   [[Swing-事件监听-treewillexpandlistener|tree will expand]]   [[Swing-事件监听-treemodellistener|tree model]]   [[Swing-事件监听-treeselectionlistener|tree selection]] |
| viewport   (used by [[Swing-组件-scrollpane|scrollpane]]) |  |  |  |  |  |  |  |  |
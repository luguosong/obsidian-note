---
分类:
  - "网页裁剪"
标题: "Listener API Table (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/api.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-事件监听-intro|Introduction to Event Listeners]]

[[Swing-事件监听-generalrules|General Information about Writing Event Listeners]]

[[Swing-事件监听-eventsandcomponents|Listeners Supported by Swing Components]]

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

Listener API Table

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-windowlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-problems|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Listener API Table

In the table that follows, the first column gives the name of the listener interface, with either a link to the tutorial page that discusses the listener or, if the tutorial doesn't discuss the listener, a link to the API docs. The second column names the corresponding adapter class, if any. (For a discussion of using adapters, see [[Swing-事件监听-generalrules|Using Adapters and Inner Classes to Handle Events]].) The third column lists the methods that the listener interface contains and shows the type of the event object passed into the method. Typically, the listener, the adapter, and the event type have the same name prefix, but this is not always the case.

To see which Swing components can fire which kinds of events, see [[Swing-事件监听-eventsandcomponents|Listeners Supported by Swing Components]].

| Listener Interface | Adapter Class | Listener Methods |
| --- | --- | --- |
| [[Swing-事件监听-actionlistener|`ActionListener`]] | *none* | `actionPerformed(ActionEvent)` |
| [`AncestorListener`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/AncestorListener.html) | *none* | `ancestorAdded(AncestorEvent)`   `ancestorMoved(AncestorEvent)`   `ancestorRemoved(AncestorEvent)` |
| [[Swing-事件监听-caretlistener|`CaretListener`]] | *none* | `caretUpdate(CaretEvent)` |
| [`CellEditorListener`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/CellEditorListener.html) | *none* | `editingStopped(ChangeEvent)`   `editingCanceled(ChangeEvent)` |
| [[Swing-事件监听-changelistener|`ChangeListener`]] | *none* | `stateChanged(ChangeEvent)` |
| [[Swing-事件监听-componentlistener|`ComponentListener`]] | `ComponentAdapter` | `componentHidden(ComponentEvent)`   `componentMoved(ComponentEvent)`   `componentResized(ComponentEvent)`   `componentShown(ComponentEvent)` |
| [[Swing-事件监听-containerlistener|`ContainerListener`]] | `ContainerAdapter` | `componentAdded(ContainerEvent)`   `componentRemoved(ContainerEvent)` |
| [[Swing-事件监听-documentlistener|`DocumentListener`]] | *none* | `changedUpdate(DocumentEvent)`   `insertUpdate(DocumentEvent)`   `removeUpdate(DocumentEvent)` |
| [`ExceptionListener`](https://docs.oracle.com/javase/8/docs/api/java/beans/ExceptionListener.html) | *none* | `exceptionThrown(Exception)` |
| [[Swing-事件监听-focuslistener|`FocusListener`]] | `FocusAdapter` | `focusGained(FocusEvent)`   `focusLost(FocusEvent)` |
| [`HierarchyBoundsListener`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/HierarchyBoundsListener.html) | `HierarchyBoundsAdapter` | `ancestorMoved(HierarchyEvent)`   `ancestorResized(HierarchyEvent)` |
| [`HierarchyListener`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/HierarchyListener.html) | *none* | `hierarchyChanged(HierarchyEvent)` |
| [`HyperlinkListener`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/HyperlinkListener.html) | *none* | `hyperlinkUpdate(HyperlinkEvent)` |
| [`InputMethodListener`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/InputMethodListener.html) | *none* | `caretPositionChanged(InputMethodEvent)`   `inputMethodTextChanged(InputMethodEvent)` |
| [[Swing-事件监听-internalframelistener|`InternalFrameListener`]] | `InternalFrameAdapter` | `internalFrameActivated(InternalFrameEvent)`   `internalFrameClosed(InternalFrameEvent)`   `internalFrameClosing(InternalFrameEvent)`   `internalFrameDeactivated(InternalFrameEvent)`   `internalFrameDeiconified(InternalFrameEvent)`   `internalFrameIconified(InternalFrameEvent)`   `internalFrameOpened(InternalFrameEvent)` |
| [[Swing-事件监听-itemlistener|`ItemListener`]] | *none* | `itemStateChanged(ItemEvent)` |
| [[Swing-事件监听-keylistener|`KeyListener`]] | `KeyAdapter` | `keyPressed(KeyEvent)`   `keyReleased(KeyEvent)`   `keyTyped(KeyEvent)` |
| [[Swing-事件监听-listdatalistener|`ListDataListener`]] | *none* | `contentsChanged(ListDataEvent)`   `intervalAdded(ListDataEvent)`   `intervalRemoved(ListDataEvent)` |
| [[Swing-事件监听-listselectionlistener|`ListSelectionListener`]] | *none* | `valueChanged(ListSelectionEvent)` |
| [`MenuDragMouseListener`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/MenuDragMouseListener.html) | *none* | `menuDragMouseDragged(MenuDragMouseEvent)`   `menuDragMouseEntered(MenuDragMouseEvent)`   `menuDragMouseExited(MenuDragMouseEvent)`   `menuDragMouseReleased(MenuDragMouseEvent)` |
| [`MenuKeyListener`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/MenuKeyListener.html) | *none* | `menuKeyPressed(MenuKeyEvent)`   `menuKeyReleased(MenuKeyEvent)`   `menuKeyTyped(MenuKeyEvent)` |
| [`MenuListener`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/MenuListener.html) | *none* | `menuCanceled(MenuEvent)`   `menuDeselected(MenuEvent)`   `menuSelected(MenuEvent)` |
| `MouseInputListener` (extends [[Swing-事件监听-mouselistener|`MouseListener`]] and [[Swing-事件监听-mousemotionlistener|`MouseMotionListener`]] | `MouseInputAdapter`   `MouseAdapter` | `mouseClicked(MouseEvent)`   `mouseEntered(MouseEvent)`   `mouseExited(MouseEvent)`   `mousePressed(MouseEvent)`   `mouseReleased(MouseEvent)`   `mouseDragged(MouseEvent)`   `mouseMoved(MouseEvent)`   `MouseAdapter(MouseEvent)` |
| [[Swing-事件监听-mouselistener|`MouseListener`]] | `MouseAdapter`, `MouseInputAdapter` | `mouseClicked(MouseEvent)`   `mouseEntered(MouseEvent)`   `mouseExited(MouseEvent)`   `mousePressed(MouseEvent)`   `mouseReleased(MouseEvent)` |
| [[Swing-事件监听-mousemotionlistener|`MouseMotionListener`]] | `MouseMotionAdapter`, `MouseInputAdapter` | `mouseDragged(MouseEvent)`   `mouseMoved(MouseEvent)` |
| [[Swing-事件监听-mousewheellistener|`MouseWheelListener`]] | `MouseAdapter` | `mouseWheelMoved(MouseWheelEvent)`   `MouseAdapter<MouseEvent>` |
| [`PopupMenuListener`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/PopupMenuListener.html) | *none* | `popupMenuCanceled(PopupMenuEvent)`   `popupMenuWillBecomeInvisible(PopupMenuEvent)`   `popupMenuWillBecomeVisible(PopupMenuEvent)` |
| [[Swing-事件监听-propertychangelistener|`PropertyChangeListener`]] | *none* | `propertyChange(PropertyChangeEvent)` |
| [`TableColumnModelListener`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TableColumnModelListener.html) | *none* | `columnAdded(TableColumnModelEvent)`   `columnMoved(TableColumnModelEvent)`   `columnRemoved(TableColumnModelEvent)`   `columnMarginChanged(ChangeEvent)`   `columnSelectionChanged(ListSelectionEvent)` |
| [[Swing-事件监听-tablemodellistener|`TableModelListener`]] | *none* | `tableChanged(TableModelEvent)` |
| [[Swing-事件监听-treeexpansionlistener|`TreeExpansionListener`]] | *none* | `treeCollapsed(TreeExpansionEvent)`   `treeExpanded(TreeExpansionEvent)` |
| [[Swing-事件监听-treemodellistener|`TreeModelListener`]] | *none* | `treeNodesChanged(TreeModelEvent)`   `treeNodesInserted(TreeModelEvent)`   `treeNodesRemoved(TreeModelEvent)`   `treeStructureChanged(TreeModelEvent)` |
| [[Swing-事件监听-treeselectionlistener|`TreeSelectionListener`]] | *none* | `valueChanged(TreeSelectionEvent)` |
| [[Swing-事件监听-treewillexpandlistener|`TreeWillExpandListener`]] | *none* | `treeWillCollapse(TreeExpansionEvent)`   `treeWillExpand(TreeExpansionEvent)` |
| [[Swing-事件监听-undoableeditlistener|`UndoableEditListener`]] | *none* | `undoableEditHappened(UndoableEditEvent)` |
| [`VetoableChangeListener`](https://docs.oracle.com/javase/8/docs/api/java/beans/VetoableChangeListener.html) | *none* | `vetoableChange(PropertyChangeEvent)` |
| [[Swing-事件监听-windowlistener|`WindowFocusListener`]] | `WindowAdapter` | `windowGainedFocus(WindowEvent)`   `windowLostFocus(WindowEvent)` |
| [[Swing-事件监听-windowlistener|`WindowListener`]] | `WindowAdapter` | `windowActivated(WindowEvent)`   `windowClosed(WindowEvent)`   `windowClosing(WindowEvent)`   `windowDeactivated(WindowEvent)`   `windowDeiconified(WindowEvent)`   `windowIconified(WindowEvent)`   `windowOpened(WindowEvent)` |
| [[Swing-事件监听-windowlistener|`WindowStateListener`]] | `WindowAdapter` | `windowStateChanged(WindowEvent)` |
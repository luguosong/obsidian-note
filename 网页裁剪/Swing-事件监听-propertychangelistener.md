---
分类:
  - "网页裁剪"
标题: "How to Write a Property Change Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/propertychangelistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write a Property Change Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)

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

How to Write a Property Change Listener

[[Swing-事件监听-tablemodellistener|How to Write a Table Model Listener]]

[[Swing-事件监听-treeexpansionlistener|How to Write a Tree Expansion Listener]]

[[Swing-事件监听-treemodellistener|How to Write a Tree Model Listener]]

[[Swing-事件监听-treeselectionlistener|How to Write a Tree Selection Listener]]

[[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]]

[[Swing-事件监听-undoableeditlistener|How to Write an Undoable Edit Listener]]

[[Swing-事件监听-windowlistener|How to Write Window Listeners]]

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-mousewheellistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-tablemodellistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Property Change Listener

Property-change events occur whenever the value of a *bound property* changes for a *bean* — a component that conforms to the JavaBeans™ specification. You can find out more about beans from the [[JavaBeans|JavaBeans]] trail of the Java Tutorial. All Swing components are also beans.

A JavaBeans property is accessed through its *get* and *set* methods. For example, `JComponent` has the property *font* which is accessible through the `getFont` and `setFont` methods.

Besides the *get* and *set* methods, a bound property fires a property-change event when its value changes. For more information, see the [[JavaBeans-编写组件-属性|Bound Properties]] page in the JavaBeans trail.

Some scenarios that commonly require property-change listeners include:

- You have implemented a formatted text field and need a way to detect when the user has entered a new value. You can register a property-change listener on the formatted text field to listen to changes on the *value* property. See `FormattedTextFieldDemo` in [[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]] for an example of this.
- You have implemented a dialog and need to know when a user has clicked one of the dialog's buttons or changed a selection in the dialog. See `DialogDemo` in [[Swing-组件-dialog|How to Make Dialogs]] for an example of registering a property-change listener on an option pane to listen to changes to the *value* property. You can also check out `FileChooserDemo2` in [[Swing-组件-filechooser|How to Use File Choosers]] for an example of how to register a property-change listener to listen to changes to the *directoryChanged* and *selectedFileChanged* properties.
- You need to be notified when the component that has the focus changes. You can register a property-change listener on the keyboard focus manager to listen to changes to the *focusOwner* property. See `TrackFocusDemo` and `DragPictureDemo` in [[Swing-其他特性-focus|How to Use the Focus Subsystem]] for examples of this.

Although these are some of the more common uses for property-change listeners, you can register a property-change listener on the bound property of any component that conforms to the JavaBeans specification.

You can register a property change listener in two ways. The first uses the method `addPropertyChangeListener(PropertyChangeListener)`. When you register a listener this way, you are notified of every change to every bound property for that object. In the `propertyChange` method, you can get the name of the property that has changed using the `PropertyChangeEvent` `getPropertyName` method, as in the following code snippet:

```java
KeyboardFocusManager focusManager =
   KeyboardFocusManager.getCurrentKeyboardFocusManager();
focusManager.addPropertyChangeListener(new FocusManagerListener());
...
public FocusManagerListener implements PropertyChangeListener {
    public void propertyChange(PropertyChangeEvent e) {
        String propertyName = e.getPropertyName();
        if ("focusOwner".equals(propertyName) {
            ...
        } else if ("focusedWindow".equals(propertyName) {
            ...
        }
    }
    ...
}
```text

The second way to register a property change listener uses the method `addPropertyChangeListener(String, PropertyChangeListener)`. The `String` argument is the name of a property. Using this method means that you only receive notification when a change occurs to that particular property. So, for example, if you registered a property change listener like this:

```
aComponent.addPropertyChangeListener("font",
                                     new FontListener());
```java

`FontListener` only receives notification when the value of the component's *font* property changes. It does *not* receive notification when the value changes for *transferHandler*, *opaque*, *border*, or any other property.

The following example shows how to register a property change listener on the *value* property of a formatted text field using the two-argument version of `addPropertyChangeListener`:

```sql
//...where initialization occurs:
double amount;
JFormattedTextField amountField;
...
amountField.addPropertyChangeListener("value",
                                      new FormattedTextFieldListener());
...
class FormattedTextFieldListener implements PropertyChangeListener {
    public void propertyChanged(PropertyChangeEvent e) {
        Object source = e.getSource();
        if (source == amountField) {
            amount = ((Number)amountField.getValue()).doubleValue();
            ...
        }
        ...//re-compute payment and update field...
    }
}
```

## The Property Change Listener API

Registering a PropertyChangeListener

| Method | Purpose |
| --- | --- |
| [addPropertyChangeListener(PropertyChangeListener)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#addPropertyChangeListener-java.beans.PropertyChangeListener-) | Add a property-change listener to the listener list. |
| [addPropertyChangeListener(String, PropertyChangeListener)](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#addPropertyChangeListener-java.lang.String-java.beans.PropertyChangeListener-) | Add a property-change listener for a specific property. The listener is called only when there is a change to the specified property. |

The PropertyChangeListener Interface

*Because `PropertyChangeListener` has only one method, it has no corresponding adapter class.*

| Method | Purpose |
| --- | --- |
| [propertyChange(PropertyChangeEvent)](https://docs.oracle.com/javase/8/docs/api/java/beans/PropertyChangeListener.html#propertyChange-java.beans.PropertyChangeEvent-) | Called when the listened-to bean changes a bound property. |

The PropertyChangeEvent Class

| Method | Purpose |
| --- | --- |
| [Object getNewValue()](https://docs.oracle.com/javase/8/docs/api/java/beans/PropertyChangeEvent.html#getNewValue--)   [Object getOldValue()](https://docs.oracle.com/javase/8/docs/api/java/beans/PropertyChangeEvent.html#getOldValue--) | Return the new, or old, value of the property, respectively. |
| [String getPropertyName()](https://docs.oracle.com/javase/8/docs/api/java/beans/PropertyChangeEvent.html#getPropertyName--) | Return the name of the property that was changed. |
| [void setPropagationId()](https://docs.oracle.com/javase/8/docs/api/java/beans/PropertyChangeEvent.html#setPropagationId--) | Get or set the propagation ID value. Reserved for future use. |

## Examples that Use Property Change Listeners

The following table lists the examples that use property-change listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`FormattedTextFieldDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FormattedTextFieldDemo) | [[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]] | A property-change listener is registered on several formatted text fields to track changes to the *value* property. |
| [`DialogDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#DialogDemo) | [[Swing-组件-dialog|How to Make Dialogs]] | The [`CustomDialog`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/DialogDemoProject/src/components/CustomDialog.java) class registers a property-change listener on an option pane to listen to the *value* and *inputValue* properties. |
| [`FileChooserDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#FileChooserDemo2) | [[Swing-组件-filechooser|How to Use File Choosers]] | The [`ImagePreview`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/FileChooserDemo2Project/src/components/ImagePreview.java) class registers a property-change listener on the file chooser to listen to the *directoryChanged* and *selectedFileChanged* properties. |
| [`TrackFocusDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#TrackFocusDemo) | [[Swing-其他特性-focus|How to Use the Focus Subsystem]] | A property-change listener is registered on the keyboard focus manager to track changes to the *focusOwner* property. |
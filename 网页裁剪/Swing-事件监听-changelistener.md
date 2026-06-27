---
分类:
  - "网页裁剪"
标题: "How to Write a Change Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/changelistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write a Change Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)

Documentation

[[Swing-事件监听-intro|Introduction to Event Listeners]]

[[Swing-事件监听-generalrules|General Information about Writing Event Listeners]]

[[Swing-事件监听-eventsandcomponents|Listeners Supported by Swing Components]]

[[Swing-事件监听-handling|Implementing Listeners for Commonly Handled Events]]

[[Swing-事件监听-actionlistener|How to Write an Action Listener]]

[[Swing-事件监听-caretlistener|How to Write a Caret Listener]]

How to Write a Change Listener

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

[[Swing-事件监听-caretlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-componentlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Change Listener

A change listener is similar to a [[Swing-事件监听-propertychangelistener|property change listener]]. A change listener is registered on an object — typically a component, but it could be another object, like a model — and the listener is notified when the object has changed. The big difference from a property change listener is that a change listener is not notified of *what* has changed, but simply that the source object *has* changed. Therefore, a change listener is most useful when it is only necessary to know when an object has changed in any way.

Several Swing components (including [[Swing-组件-tabbedpane|JTabbedPane]], JViewPort) rely on change events for basic functionality — sliders, color choosers and spinners. To learn when the value in a [[Swing-滑块|slider]] changes, you need to register a change listener. Similarly, you need to register a change listener on a [[Swing-组件-colorchooser|color chooser]] to be informed when the user chooses a new color. You register a change listener on a [[Swing-组件-spinner|spinner]], to be notified when the spinner's value changes.

Here is an example of change event handling code for a slider:

```java
//...where initialization occurs:
framesPerSecond.addChangeListener(new SliderListener());
...
class SliderListener implements ChangeListener {
    public void stateChanged(ChangeEvent e) {
        JSlider source = (JSlider)e.getSource();
        if (!source.getValueIsAdjusting()) {
            int fps = (int)source.getValue();
            ...
        }    
    }
}
```

You can find the source file for `SliderDemo` in the [example index for Using Swing Components](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SliderDemo).

## The Change Listener API

The ChangeListener Interface

*Because `ChangeListener` has only one method, it has no corresponding adapter class.*

| Method | Purpose |
| --- | --- |
| [stateChanged(ChangeEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/ChangeListener.html#stateChanged-javax.swing.event.ChangeEvent-) | Called when the listened-to component changes state. |

The ChangeEvent Class

| Method | Purpose |
| --- | --- |
| [Object getSource()](https://docs.oracle.com/javase/8/docs/api/java/util/EventObject.html#getSource--)   (*in `java.util.EventObject`*) | Returns the object that fired the event. |

## Examples that Use Change Listeners

The following table lists the examples that use change listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`SliderDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SliderDemo) and   [`SliderDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SliderDemo2) | [[Swing-滑块|How to Use Sliders]] | Registers a change listener on a slider that controls animation speed. The change listener ignores the change events until the user releases the slider. |
| [`ColorChooserDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ColorChooserDemo) and   [`ColorChooserDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ColorChooserDemo2) | [[Swing-组件-colorchooser|How to Use Color Choosers]] | Uses a change listener on the selection model of a color chooser to learn when the user changes the current color. |
| [`SpinnerDemo3`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SpinnerDemo3) | [[Swing-组件-spinner|Detecting Spinner Value Changes]] in [[Swing-组件-spinner|How to Use Spinners]]. | Uses a change listener on a date-field spinner to change the color of the text as the spinner's date changes. |
| [`SpinnerDemo4`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SpinnerDemo4) | [[Swing-组件-spinner|Detecting Spinner Value Changes]] in [[Swing-组件-spinner|How to Use Spinners]]. | Uses a change listener on a spinner to cycle through the gray scale as the spinner's value changes. |
| [`ConverterRangeModel`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ConverterProject/src/components/ConverterRangeModel.java)   and its subclass,   [`FollowerRangeModel`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ConverterProject/src/components/FollowerRangeModel.java) | [[Swing-组件-model|How to Use Models]] | Implement custom models for the sliders used in the [`Converter`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#Converter) demo. Both models explicitly fire change events when necessary. |
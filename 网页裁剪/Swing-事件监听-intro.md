---
分类:
  - "网页裁剪"
标题: "Introduction to Event Listeners (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/intro.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Introduction to Event Listeners (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)

Documentation

Introduction to Event Listeners

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

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Introduction to Event Listeners

If you have read any of the component how-to pages, you probably already know the basics of event listeners.

Let us look at one of the simplest event handling examples possible. It is called Beeper, and it features a button that beeps when you click it.

Click the Launch button to run Beeper using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#Beeper).

  

![A Click Me Beeper Button](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/Beeper.png)

You can find the entire program in [`Beeper.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/BeeperProject/src/events/Beeper.java). Here is the code that implements the event handling for the button:

```java
public class Beeper ... implements ActionListener {
    ...
    //where initialization occurs:
        button.addActionListener(this);
    ...
    public void actionPerformed(ActionEvent e) {
        ...//Make a beep sound...
    }
}
```java

The `Beeper` class implements the [[Swing-事件监听-actionlistener|`ActionListener`]] interface, which contains one method: `actionPerformed`. Since `Beeper` implements `ActionListener`, a `Beeper` object can register as a listener for the action events that buttons fire. Once the `Beeper` has been registered using the `Button` `addActionListener` method, the `Beeper` 's `actionPerformed` method is called every time the button is clicked.

## A More Complex Example

The event model, which you saw at its simplest in the preceding example, is quite powerful and flexible. Any number of event listener objects can listen for all kinds of events from any number of event source objects. For example, a program might create one listener per event source. Or a program might have a single listener for all events from all sources. A program can even have more than one listener for a single kind of event from a single event source.

![Event source with multiple listeners](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/2eventsource.gif)

Multiple listeners can register to be notified of events of a particular type from a particular source. Also, the same listener can listen to notifications from different objects.

Each event is represented by an object that gives information about the event and identifies the event source. Event sources are often components or models, but other kinds of objects can also be event sources.

Whenever you want to detect events from a particular component, first check the how-to section for that component. A list of the component how-to sections is [[Swing-组件-componentlist|here]]. The how-to sections give examples of handling the events that you are most likely to care about. In [[Swing-组件-colorchooser|How to Use Color Choosers]], for instance, you will find an example of writing a change listener to track when the color changes in the color chooser.

The following example demonstrates that event listeners can be registered on multiple objects and that the same event can be sent to multiple listeners. The example contains two event sources (`JButton` instances) and two event listeners. One of the event listeners (an instance of a class called `MultiListener`) listens for events from both buttons. When it receives an event, it adds the event's "action command" (which is set to the text on the button's label) to the top text area. The second event listener (an instance of a class called `Eavesdropper`) listens for events on only one of the buttons. When it receives an event, it adds the action command to the bottom text area.

![MultiListener and Eavesdropper responses to buttons](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/MultiListener.gif)

---

**Try this:**
1. Click the Launch button to run MultiListener using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#MultiListener).
2. Click the *Blah blah blah* button. Only the `MultiListener` object is registered to listen to this button.
3. Click the *You do not say!* button. Both the `MultiListener` object and the `Eavesdropper` object are registered to listen to this button.

---

You can find the entire program in [`MultiListener.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/MultiListenerProject/src/events/MultiListener.java). Here is the code that implements the event handling for the button:

```java
public class MultiListener ... implements ActionListener {
    ...
    //where initialization occurs:
        button1.addActionListener(this);
        button2.addActionListener(this);

        button2.addActionListener(new Eavesdropper(bottomTextArea));
    }

    public void actionPerformed(ActionEvent e) {
        topTextArea.append(e.getActionCommand() + newline);
    }
}

class Eavesdropper implements ActionListener {
    ...
    public void actionPerformed(ActionEvent e) {
        myTextArea.append(e.getActionCommand() + newline);
    }
}
```

In the above code, both `MultiListener` and `Eavesdropper` implement the `ActionListener` interface and register as action listeners using the `JButton` `addActionListener` method. Both classes' implementations of the `actionPerformed` method are similar: they simply add the event's action command to a text area.
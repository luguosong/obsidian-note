---
分类:
  - "网页裁剪"
标题: "How to Write an Action Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/actionlistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-事件监听-intro|Introduction to Event Listeners]]

[[Swing-事件监听-generalrules|General Information about Writing Event Listeners]]

[[Swing-事件监听-eventsandcomponents|Listeners Supported by Swing Components]]

[[Swing-事件监听-handling|Implementing Listeners for Commonly Handled Events]]

How to Write an Action Listener

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

[[Swing-事件监听-handling|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-caretlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write an Action Listener

Action listeners are probably the easiest — and most common — event handlers to implement. You implement an action listener to define what should be done when an user performs certain operation.

An action event occurs, whenever an action is performed by the user. Examples: When the user clicks a [[Swing-按钮|button]], chooses a [[Swing-组件-menu|menu item]], presses Enter in a [[Swing-组件-textfield|text field]]. The result is that an `actionPerformed` message is sent to all action listeners that are registered on the relevant component.

To write an Action Listener, follow the steps given below:

1. Declare an event handler class and specify that the class either implements an ActionListener interface or extends a class that implements an ActionListener interface. For example:
	```java
	public class MyClass implements ActionListener {
	```
2. Register an instance of the event handler class as a listener on one or more components. For example:
	```
	someComponent.addActionListener(instanceOfMyClass);
	```
3. Include code that implements the methods in listener interface. For example:
	```java
	public void actionPerformed(ActionEvent e) { 
	    ...//code that reacts to the action... 
	}
	```

In general, to detect when the user clicks an onscreen button (or does the keyboard equivalent), a program must have an object that implements the ActionListener interface. The program must register this object as an action listener on the button (the event source), using the addActionListener method. When the user clicks the onscreen button, the button fires an action event. This results in the invocation of the action listener's actionPerformed method (the only method in the ActionListener interface). The single argument to the method is an ActionEvent object that gives information about the event and its source.

Let us write a simple program which displays how many number of times a button is clicked by the user. First, here is the code that sets up the TextField, button and numClicks variable:

```java
public class AL extends Frame implements WindowListener,ActionListener {
TextField text = new TextField(20);
Button b;
private int numClicks = 0;
```

In the above example, the event handler class is AL which implements ActionListener.

We would like to handle the button-click event, so we add an action listener to the button b as below:

```
b = new Button("Click me");
b.addActionListener(this);
```

In the above code, Button b is a component upon which an instance of event handler class AL is registered.

Now, we want to display the text as to how many number of times a user clicked button. We can do this by writing the code as below:

```java
public void actionPerformed(ActionEvent e) {
         numClicks++;
         text.setText("Button Clicked " + numClicks + " times");
```

Now, when the user clicks the Button b, the button fires an action event which invokes the action listener's actionPerformed method. Each time the user presses the button, numClicks variable is appended and the message is displayed in the text field.

Here is the complete program(AL.java):

```java
import java.awt.*;
import java.awt.event.*;

public class AL extends Frame implements WindowListener,ActionListener {
        TextField text = new TextField(20);
        Button b;
        private int numClicks = 0;

        public static void main(String[] args) {
                AL myWindow = new AL("My first window");
                myWindow.setSize(350,100);
                myWindow.setVisible(true);
        }

        public AL(String title) {

                super(title);
                setLayout(new FlowLayout());
                addWindowListener(this);
                b = new Button("Click me");
                add(b);
                add(text);
                b.addActionListener(this);
        }

        public void actionPerformed(ActionEvent e) {
                numClicks++;
                text.setText("Button Clicked " + numClicks + " times");
        }

        public void windowClosing(WindowEvent e) {
                dispose();
                System.exit(0);
        }

        public void windowOpened(WindowEvent e) {}
        public void windowActivated(WindowEvent e) {}
        public void windowIconified(WindowEvent e) {}
        public void windowDeiconified(WindowEvent e) {}
        public void windowDeactivated(WindowEvent e) {}
        public void windowClosed(WindowEvent e) {}

}
```

More Examples: `Beeper` program example is available in this trail's introduction to events, [[Swing-事件监听-intro|Introduction to Event Listeners]]. You can find the entire program in [`Beeper.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/BeeperProject/src/events/Beeper.java). The other example described in that section, [`MultiListener.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/MultiListenerProject/src/events/MultiListener.java), has two action sources and two action listeners, with one listener listening to both sources and the other listening to just one.

## The Action Listener API

The ActionListener Interface

*Because `ActionListener` has only one method, it has no corresponding adapter class.*

| Method | Purpose |
| --- | --- |
| [actionPerformed(actionEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ActionListener.html#actionPerformed-java.awt.event.ActionEvent-) | Called just after the user performs an action. |

The ActionEvent Class

| Method | Purpose |
| --- | --- |
| [String getActionCommand()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ActionEvent.html#getActionCommand--) | Returns the string associated with this action. Most objects that can fire action events support a method called `setActionCommand` that lets you set this string. |
| [int getModifiers()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ActionEvent.html#getModifiers--) | Returns an integer representing the modifier keys the user was pressing when the action event occurred. You can use the `ActionEvent` -defined constants `SHIFT_MASK`, `CTRL_MASK`, `META_MASK`, and `ALT_MASK` to determine which keys were pressed. For example, if the user Shift-selects a menu item, then the following expression is nonzero:  ``` actionEvent.getModifiers() & ActionEvent.SHIFT_MASK ``` |
| [Object getSource()](https://docs.oracle.com/javase/8/docs/api/java/util/EventObject.html#getSource--)   (*in `java.util.EventObject`*) | Returns the object that fired the event. |

## Examples that Use Action Listeners

The following table lists some of the many examples that use action listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`Beeper`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#Beeper) | This section and [[Swing-事件监听-intro|Introduction to Event Listeners]] | Contains one button with one action listener that beeps when you click the button. |
| [`MultiListener`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#MultiListener) | [[Swing-事件监听-intro|Introduction to Event Listeners]] | Registers two different action listeners on one button. Also registers the same action listener on two different buttons. |
| [`RadioButtonDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#RadioButtonDemo) | [[Swing-按钮|How to Use Radio Buttons]] | Registers the same action listener on five radio buttons. The listener uses the `getActionCommand` method to determine which radio button fired the event. |
| [`MenuDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuDemo) | [[Swing-组件-menu|How to Use Menus]] | Shows how to listen for action events on menu items. |
| [`TextDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextDemo) | [[Swing-组件-textfield|How to Use Text Fields]] | An applet that registers an action listener on a text field. |
| [`IconDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#IconDemo) | [[Swing-组件-icon|How to Use Icons]] | Loads an image in an action listener. Because loading an image can take a while, this program uses a `SwingWorker` to load the image in a background thread. |
| [`TableDialogEditDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TableDialogEditDemo) | [[Swing-组件-table|How to Use Tables]] | Registers an action listener through a factory method on the OK button of a color chooser dialog. |
| [`SliderDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SliderDemo) | [[Swing-滑块|How to Use Sliders]] | Registers an action listener on a timer that controls an animation loop. |
---
分类:
  - "网页裁剪"
标题: "How to Use Swing Timers (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Other Swing Features)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/misc/timer.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Swing Timers (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Other Swing Features)

Documentation

[[Swing-其他特性-desktop|How to Integrate with the Desktop Class]]

[[Swing-其他特性-trans_shaped_windows|How to Create Translucent and Shaped Windows]]

[[Swing-其他特性-jlayer|How to Decorate Components with the JLayer Class]]

[[Swing-其他特性-action|How to Use Actions]]

How to Use Swing Timers

[[Swing-其他特性-access|How to Support Assistive Technologies]]

[[Swing-其他特性-focus|How to Use the Focus Subsystem]]

[[Swing-其他特性-keybinding|How to Use Key Bindings]]

[[Swing-其他特性-modality|How to Use Modality in Dialogs]]

[[Swing-其他特性-printtable|How to Print Tables]]

[[Swing-其他特性-printtext|How to Print Text]]

[[Swing-其他特性-splashscreen|How to Create a Splash Screen]]

[[Swing-其他特性-systemtray|How to Use the System Tray]]

[[Swing-其他特性-problems|Solving Common Problems Using Other Swing Features]]

[[Swing-其他特性-action|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-其他特性-access|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Swing Timers

A Swing timer (an instance of [`javax.swing.Timer`](https://docs.oracle.com/javase/8/docs/api/javax/swing/Timer.html)) fires one or more action events after a specified delay. Do not confuse Swing timers with the general-purpose timer facility in the `java.util` package. This page describes only Swing timers.

In general, we recommend using Swing timers rather than general-purpose timers for GUI-related tasks because Swing timers all share the same, pre-existing timer thread and the GUI-related task automatically executes on the event-dispatch thread. However, you might use a general-purpose timer if you don't plan on touching the GUI from the timer, or need to perform lengthy processing.

You can use Swing timers in two ways:

- To perform a task once, after a delay.  
	For example, the tool tip manager uses Swing timers to determine when to show a tool tip and when to hide it.
- To perform a task repeatedly.  
	For example, you might perform animation or update a component that displays progress toward a goal.

Swing timers are very easy to use. When you create the timer, you specify an action listener to be notified when the timer "goes off". The `actionPerformed` method in this listener should contain the code for whatever task you need to be performed. When you create the timer, you also specify the number of milliseconds between timer firings. If you want the timer to go off only once, you can invoke `setRepeats(false)` on the timer. To start the timer, call its `start` method. To suspend it, call `stop`.

Note that the Swing timer's task is performed in the event dispatch thread. This means that the task can safely manipulate components, but it also means that the task should execute quickly. If the task might take a while to execute, then consider using a `SwingWorker` instead of or in addition to the timer. See [[Swing-并发|Concurrency in Swing]] for instructions about using the `SwingWorker` class and information on using Swing components in multi-threaded programs.

Let's look at an example of using a timer to periodically update a component. The [`` `TumbleItem` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TumbleItemProject/src/components/TumbleItem.java) applet uses a timer to update its display at regular intervals. (To see this applet running, go to [[Swing-组件-applet|How to Make Applets]]. This applet begins by creating and starting a timer:

```text
timer = new Timer(speed, this);
timer.setInitialDelay(pause);
timer.start();
```

The `speed` and `pause` variables represent applet parameters; as configured on the other page, these are 100 and 1900 respectively, so that the first timer event will occur in approximately 1.9 seconds, and recur every 0.1 seconds. By specifying `this` as the second argument to the `Timer` constructor, `TumbleItem` specifies that it is the action listener for timer events.

After starting the timer, `TumbleItem` begins loading a series of images in a background thread. Meanwhile, the timer events begin to occur, causing the `actionPerformed` method to execute:

```java
public void actionPerformed(ActionEvent e) {
    //If still loading, can't animate.
    if (!worker.isDone()) {
        return;
    }

    loopslot++;

    if (loopslot >= nimgs) {
        loopslot = 0;
        off += offset;

        if (off < 0) {
            off = width - maxWidth;
        } else if (off + maxWidth > width) {
            off = 0;
        }
    }

    animator.repaint();

    if (loopslot == nimgs - 1) {
        timer.restart();
    }
}
```

Until the images are loaded, `worker.isDone` returns `false`, so timer events are effectively ignored. The first part of the event handling code simply sets values that are employed in the animation control's `paintComponent` method: `loopslot` (the index of the next graphic in the animation) and `off` (the horizontal offset of the next graphic).

Eventually, `loopslot` will reach the end of the image array and start over. When this happens, the code at the end of `actionPerformed` restarts the timer. Doing this causes a short delay before the animation sequence begins again.
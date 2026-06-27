---
分类:
  - "网页裁剪"
标题: "Solving Common Problems Using Other Swing Features (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Other Swing Features)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/misc/problems.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-其他特性-desktop|How to Integrate with the Desktop Class]]

[[Swing-其他特性-trans_shaped_windows|How to Create Translucent and Shaped Windows]]

[[Swing-其他特性-jlayer|How to Decorate Components with the JLayer Class]]

[[Swing-其他特性-action|How to Use Actions]]

[[Swing-其他特性-timer|How to Use Swing Timers]]

[[Swing-其他特性-access|How to Support Assistive Technologies]]

[[Swing-其他特性-focus|How to Use the Focus Subsystem]]

[[Swing-其他特性-keybinding|How to Use Key Bindings]]

[[Swing-其他特性-modality|How to Use Modality in Dialogs]]

[[Swing-其他特性-printtable|How to Print Tables]]

[[Swing-其他特性-printtext|How to Print Text]]

[[Swing-其他特性-splashscreen|How to Create a Splash Screen]]

[[Swing-其他特性-systemtray|How to Use the System Tray]]

Solving Common Problems Using Other Swing Features

[[Swing-其他特性-systemtray|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-布局|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Solving Common Problems Using Other Swing Features

**Problem:** My application is not showing the look and feel I have requested via `UIManager.setLookAndFeel`.

You probably either set the look and feel to an invalid look and feel or set it after the UI manager loaded the default look and feel. If you are sure that the look and feel you specified is valid and setting the look and feel is the first thing your program does (at the top of its main method, for example), check whether you have a static field that references a Swing class. This reference can cause the default look and feel to be loaded if none has been specified. For more information, including how to set a look and feel after the GUI has been created, see the [[Swing-plaf|look and feel]] section.

**Problem:** Why is not my component getting the focus?

- Is it a custom component (for example, a direct subclass of `JComponent`) that you created? If so, you may need to give your component an input map and mouse listener. See [[Swing-其他特性-focus|How to Make a Custom Component Focusable]] for more information and a demo.
- Is the component inside of a `JWindow` object? The focus system requires a `JWindow` 's owning frame to be visible for any components in the `JWindow` object to get the focus. By default, if you do not specify an owning frame for a `JWindow` object, an invisible owning frame is created for it. The solution is to either specify a visible and focusable owning frame when creating the `JWindow` object or to use `JDialog` or `JFrame` objects instead.

**Problem:** Why cannot my dialog receive the event generated when the user hits the Escape key?

If your dialog contains a text field, it may be consuming the event.

- If you want to get the Escape event regardless of whether a component consumes it, you should use a [`` `KeyEventDispatcher` ``](https://docs.oracle.com/javase/8/docs/api/java/awt/KeyEventDispatcher.html).
- If you want to get the Escape event only if a component has not consumed it, then register a key binding on any `JComponent` component in the `JDialog` object, using the `WHEN_IN_FOCUSED_WINDOW` input map. For more information, see the [[Swing-其他特性-keybinding|How to Use Key Bindings]] page.

**Problem:** Why I cannot apply Swing components to a tray icon? Current implementation of the `TrayIcon` class supports the `PopupMenu` component, but not its Swing counterpart `JPopupMenu`. This limitation narrows capabilities to employ additional Swing features, for example, menu icons. See the Bug ID [6285881](http://bugs.java.com/bugdatabase/view_bug.do?bug_id=6285881).

- A new `JTrayIcon` class will be created to eliminate this inconvenience. Until then, use AWT components to add a menu item, check box menu item, or submenu.

If you do not find your problem in this section, consult [[Swing-组件-problems|Solving Common Component Problems]].
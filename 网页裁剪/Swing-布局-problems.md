---
分类:
  - "网页裁剪"
标题: "Solving Common Layout Problems (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/layout/problems.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-布局-none|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-questions-ch4|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Solving Common Layout Problems

---

**Note:** This lesson covers writing layout code by hand, which can be challenging. If you are not interested in learning all the details of layout management, you might prefer to use the `GroupLayout` layout manager combined with a builder tool to lay out your GUI. One such builder tool is the [[Swing-NetBeans学习|NetBeans IDE]]. Otherwise, if you want to code by hand and do not want to use `GroupLayout`, then `GridBagLayout` is recommended as the next most flexible and powerful layout manager.

---

If you are interested in using JavaFX to create your GUI, see [Working With Layouts in JavaFX](https://docs.oracle.com/javase/8/javafx/layout-tutorial/index.html).

**Problem:** How do I specify a component's exact size?

- A handful of the more modern layout managers provide ways to override the size set by the component. Check whether the layout manager you are using allows you to specify component sizes.
- Make sure that you really need to set the component's exact size. Each Swing component has a different preferred size, depending on the font it uses and the look and feel. For this reason, it often does not make sense to specify a Swing component's exact size.
- If the component is not controlled by a layout manager, you can set its size by invoking the `setSize` or `setBounds` method on it. Otherwise, you need to provide size hints and then make sure you are using a layout manager that respects the size hints.
- If you extend a Swing component class, you can give size hints by overriding the component's `getMinimumSize`, `getPreferredSize`, and `getMaximumSize` methods. What is nice about this approach is that each `get*Xxxx*Size` method can get the component's default size hints by invoking `super.get*Xxxx*Size()`. Then it can adjust the size, if necessary, before returning it. This is particularly handy for text components, where you might want to fix the width, but have the height determined from the content. However, sometimes problems can be encountered with `GridBagLayout` and text fields, wherein if the size of the container is smaller than the preferred size, the minimum size gets used, which can cause text fields to shrink quite substantially.
- Another way to give size hints is to invoke the component's `setMinimumSize`, `setPreferredSize`, and `setMaximumSize` methods.
- If you specify new size hints for a component that is already visible, you then need to invoke the `revalidate` method on it, to make sure that its containment hierarchy is laid out again. Then invoke the `repaint` method.

---

**Note:** No matter how you specify your component's size, be sure that your component's container uses a layout manager that respects the requested size of the component. The `FlowLayout` and `GridBagLayout` managers use the component's preferred size (the latter depending on the constraints that you set), but `BorderLayout` and `GridLayout` usually do not. The `BoxLayout` manager generally uses a component's preferred size (although components can be larger), and is one of the few layout managers that respects the component's maximum size.

---

**Problem:** My component does not appear after I have added it to the container.

- You need to invoke `revalidate` and `repaint` after adding a component before it will show up in your container.

**Problem:** My custom component is being sized too small.

- Does the component implement the `getPreferredSize` and `getMinimumSize` methods? If so, do they return the right values?
- Are you using a layout manager that can use as much space as is available? See [[Swing-布局-using|Tips on Choosing a Layout Manager]] for some tips on choosing a layout manager and specifying that it use the maximum available space for a particular component.

If you do not see your problem in this list, see [[Swing-组件-problems|Solving Common Component Problems]].
---
分类:
  - "网页裁剪"
标题: "Answers: Using Swing Components (The Java™ Tutorials > Creating a GUI With Swing >
            )"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/answers-ch3.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers: Using Swing Components (The Java™ Tutorials > Creating a GUI With Swing >
            )

Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [TOC](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers: Using Swing Components

Use the information in this lesson and the component [[Swing-组件-componentlist|how-to sections]] to help you complete these questions and exercises.

## Questions

**Question 1:** Find the component that best fits each of the following needs. Write down both the component's common name (such as "frame") and find the component's how-to page online.

**Question 1a**: A component that lets the user pick a color.  
**Answer 1a**: [[Swing-组件-colorchooser|color chooser]]  
  
**Question 1b:** A component that displays an icon, but that doesn't react to user clicks.  
**Answer 1b**: [[Swing-组件-label|label]]  
  
**Question 1c:** A component that looks like a button and that, when pressed, brings up a menu of items for the user to choose from.  
**Answer 1c**: [[Swing-组件-combobox|uneditable combo box]]  
  
**Question 1d:** A container that looks like a frame, but that appears (usually with other, similar containers) within a real frame.  
**Answer 1d**: [[Swing-组件-internalframe|internal frame]]  
  
**Question 1e:** A container that lets the user determine how two components share a limited amount of space.  
**Answer 1e**: [[Swing-组件-splitpane|split pane]]

**Question 2:** Which method do you use to add a menu bar to a top-level container such as a `JFrame`?  
**Answer 2**: `setJMenuBar`

**Question 3:** Which method do you use to specify the default button for a top-level container such as a `JFrame` or `JDialog`?  
**Answer 3**: `JRootPane` 's `setDefaultButton` method. (You get the top-level container's root pane using the `getRootPane` method defined by the `RootPaneContainer` interface, which every top-level container implements.)

**Question 4:** Which method do you use to enable and disable components such as `JButton` s? What class is it defined in?  
**Answer 4**: `setEnabled`, which is defined in the `Component` class

**Question 5a:** Which Swing components use `ListSelectionModel`? \[*Hint:* The "Use" link at the top of the specification for each interface and class takes you to a page showing where in the API that interface or class is referenced.\]  
**Answer 5a**: `JList` and `JTable`

**Question 5b:** Do those components use any other models to handle other aspects of the components' state? If so, list the other models' types.  
**Answer 5b**: `JList` also uses a `ListModel`, which holds the list's data. `JTable` uses a `TableModel` to hold its data and a `TableColumnModel` to manage the table's columns.

**Question 6:** Which type of model holds a text component's content?  
**Answer 6**: `Document`

## Exercises

**Exercise 1.** Implement a program with a GUI that looks like the one shown below. Put the main method in a class named `MyDemo1`.

![MyDemo1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/MyDemo1.png)

**Answer 1**: See [`MyDemo1.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/MyDemo1Project/src/QandE/MyDemo1.java). Here's the code that adds the bold, italicized text:

```text
JLabel label = new JLabel("My Demo");
frame.getContentPane().add(BorderLayout.CENTER, label);
label.setFont(label.getFont().deriveFont(Font.ITALIC | Font.BOLD));
label.setHorizontalAlignment(JLabel.CENTER)
```

**Exercise 2.** Make a copy of `MyDemo1.java` named `MyDemo2.java`. Add a menu bar to `MyDemo2`.  
**Answer 2**: See [`MyDemo2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/MyDemo2Project/src/QandE/MyDemo2.java). The menu bar can be implemented with this code:

```text
JMenu menu = new JMenu("Menu");
JMenuBar mb = new JMenuBar();
mb.add(menu);
frame.setJMenuBar(mb);
```

**Exercise 3.** Copy `MyDemo1.java` to `MyDemo3.java`. Add a button (`JButton`) to `MyDemo3.java`. Make it the default button.  
**Answer 3**: See [`MyDemo3.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/MyDemo3Project/src/QandE/MyDemo3.java). Here's the code that adds the button and makes it the default button:

```text
JButton b = new JButton("A button");
frame.getContentPane().add(BorderLayout.PAGE_END, b);
frame.getRootPane().setDefaultButton(b);
```
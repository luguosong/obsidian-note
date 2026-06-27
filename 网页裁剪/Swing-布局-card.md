---
分类:
  - "网页裁剪"
标题: "How to Use CardLayout (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/layout/card.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use CardLayout (The Java™ Tutorials >        
            Creating a GUI With Swing > Laying Out Components Within a Container)

Documentation

[[Swing-布局-box|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-布局-flow|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use CardLayout

---

**Note:** This lesson covers writing layout code by hand, which can be challenging. If you are not interested in learning all the details of layout management, you might prefer to use the `GroupLayout` layout manager combined with a builder tool to lay out your GUI. One such builder tool is the [[Swing-NetBeans学习|NetBeans IDE]]. Otherwise, if you want to code by hand and do not want to use `GroupLayout`, then `GridBagLayout` is recommended as the next most flexible and powerful layout manager.

---

If you are interested in using JavaFX to create your GUI, see [Working With Layouts in JavaFX](https://docs.oracle.com/javase/8/javafx/layout-tutorial/index.html).

The following figure represents a snapshot of an application that uses the [`CardLayout`](https://docs.oracle.com/javase/8/docs/api/java/awt/CardLayout.html) class to switch between two panels.

![A snapshot of CardLayoutDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/CardLayoutDemo.png) ![Another snapshot of CardLayoutDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/CardLayoutDemo-2.png)

Click the Launch button to run CardLayoutDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download Java SE](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#CardLayoutDemo).

The complete code of this demo is in the [`CardLayoutDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/CardLayoutDemoProject/src/layout/CardLayoutDemo.java) file.

The `CardLayout` class manages two or more components (usually `JPanel` instances) that share the same display space. When using the `CardLayout` class, let the user choose between the components by using a combo box. The `CardLayoutDemo` application is an example to illustrate this feature.

Another way to accomplish the same task is to use a [[Swing-组件-tabbedpane|tabbed pane]]. The following picture shows a tabbed pane version of the preceding example:

![A snapshot of TabDemo](https://docs.oracle.com/javase/tutorial/figures/uiswing/layout/TabDemo.png)

Because a tabbed pane provides its own GUI, using a tabbed pane is simpler than using the `CardLayout` class. For example, implementing the preceding example using a tabbed pane results in a program with fewer lines of code.

Click the Launch button to run TabDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#TabDemo).

The complete code of this demo is in the [`TabDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/TabDemoProject/src/layout/TabDemo.java) file.

Conceptually, each component that a `CardLayout` manages is like a playing card or trading card in a stack, where only the top card is visible at any time. You can choose the card that is showing in any of the following ways:

- By asking for either the first or last card, in the order it was added to the container
- By flipping through the deck backwards or forwards
- By specifying a card with a specific name

The `CardLayoutDemo` class uses the last scheme.

The following code snippet from the [`CardLayoutDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/CardLayoutDemoProject/src/layout/CardLayoutDemo.java) application creates the `CardLayout` object and the components it manages.

```sql
//Where instance variables are declared:
JPanel cards;
final static String BUTTONPANEL = "Card with JButtons";
final static String TEXTPANEL = "Card with JTextField";

//Where the components controlled by the CardLayout are initialized:
//Create the "cards".
JPanel card1 = new JPanel();
...
JPanel card2 = new JPanel();
...

//Create the panel that contains the "cards".
cards = new JPanel(new CardLayout());
cards.add(card1, BUTTONPANEL);
cards.add(card2, TEXTPANEL);
```java

To add a component to a container that a `CardLayout` object manages, specify a string that identifies the component being added. For example, in this demo, the first panel has the string `"Card with JButtons"`, and the second panel has the string `"Card with JTextField"`. In this demo those strings are also used in the combo box.

To choose which component a `CardLayout` object shows, put additional code in your code example:

```sql
//Where the GUI is assembled:
//Put the JComboBox in a JPanel to get a nicer look.
JPanel comboBoxPane = new JPanel(); //use FlowLayout
String comboBoxItems[] = { BUTTONPANEL, TEXTPANEL };
JComboBox cb = new JComboBox(comboBoxItems);
cb.setEditable(false);
cb.addItemListener(this);
comboBoxPane.add(cb);
...
pane.add(comboBoxPane, BorderLayout.PAGE_START);
pane.add(cards, BorderLayout.CENTER);
...

//Method came from the ItemListener class implementation,
//contains functionality to process the combo box item selecting
public void itemStateChanged(ItemEvent evt) {
    CardLayout cl = (CardLayout)(cards.getLayout());
    cl.show(cards, (String)evt.getItem());
}
```

This example shows that to use the `show` method of the `CardLayout` class, you must set the currently visible component. The first argument in the `show` method is the container the `CardLayout` controls — that is, the container of the components the `CardLayout` manages. The second argument is the string that identifies the component to show. This string is the same string that was used when adding the component to the container.

## The CardLayout API

The following table lists the `CardLayout` class methods that are used to choose a component. For each method, the first argument is the container for which the `CardLayout` is the layout manager (the container of the cards the `CardLayout` controls).

| Method | Purpose |
| --- | --- |
| [`first (Container *parent*)`](https://docs.oracle.com/javase/8/docs/api/java/awt/CardLayout.html#first-java.awt.Container-) | Flips to the first card of the container. |
| [`next (Container *parent*)`](https://docs.oracle.com/javase/8/docs/api/java/awt/CardLayout.html#next-java.awt.Container-) | Flips to the next card of the container. If the currently visible card is the last one, this method flips to the first card in the layout. |
| [`previous (Container *parent*)`](https://docs.oracle.com/javase/8/docs/api/java/awt/CardLayout.html#previous-java.awt.Container-) | Flips to the previous card of the container. If the currently visible card is the first one, this method flips to the last card in the layout. |
| [`last (Container *parent*)`](https://docs.oracle.com/javase/8/docs/api/java/awt/CardLayout.html#last-java.awt.Container-) | Flips to the last card of the container. |
| [`show (Container *parent*, String *name*)`](https://docs.oracle.com/javase/8/docs/api/java/awt/CardLayout.html#show-java.awt.Container-java.lang.String-) | Flips to the component that was added to this layout with the specified `name`, using the [`addLayoutComponent`](https://docs.oracle.com/javase/8/docs/api/java/awt/CardLayout.html#addLayoutComponent-java.awt.Component-java.lang.Object-) method. |

## Examples that Use CardLayout

Only one example in this trail uses `CardLayout`, and this is the [`CardLayoutDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/layout/index.html#CardLayoutDemo). Generally, our examples use [[Swing-组件-tabbedpane|tabbed panes]] instead of `CardLayout`, since a tabbed pane provides its own GUI.
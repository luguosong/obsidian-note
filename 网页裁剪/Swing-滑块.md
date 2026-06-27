---
分类:
  - "网页裁剪"
标题: "How to Use Sliders (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/slider.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[Using Top-Level Containers](https://docs.oracle.com/javase/tutorial/uiswing/components/toplevel.html)

[The JComponent Class](https://docs.oracle.com/javase/tutorial/uiswing/components/jcomponent.html)

[Using Text Components](https://docs.oracle.com/javase/tutorial/uiswing/components/text.html)

[Text Component Features](https://docs.oracle.com/javase/tutorial/uiswing/components/generaltext.html)

[The Text Component API](https://docs.oracle.com/javase/tutorial/uiswing/components/textapi.html)

[How to Use Various Components](https://docs.oracle.com/javase/tutorial/uiswing/components/componentlist.html)

[How to Make Applets](https://docs.oracle.com/javase/tutorial/uiswing/components/applet.html)

[[Swing-按钮|How to Use Buttons, Check Boxes, and Radio Buttons]]

[How to Use the ButtonGroup Component](https://docs.oracle.com/javase/tutorial/uiswing/components/buttongroup.html)

[How to Use Color Choosers](https://docs.oracle.com/javase/tutorial/uiswing/components/colorchooser.html)

[How to Use Combo Boxes](https://docs.oracle.com/javase/tutorial/uiswing/components/combobox.html)

[How to Make Dialogs](https://docs.oracle.com/javase/tutorial/uiswing/components/dialog.html)

[How to Use Editor Panes and Text Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/editorpane.html)

[How to Use File Choosers](https://docs.oracle.com/javase/tutorial/uiswing/components/filechooser.html)

[How to Use Formatted Text Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/formattedtextfield.html)

[How to Make Frames (Main Windows)](https://docs.oracle.com/javase/tutorial/uiswing/components/frame.html)

[How to Use Internal Frames](https://docs.oracle.com/javase/tutorial/uiswing/components/internalframe.html)

[How to Use Labels](https://docs.oracle.com/javase/tutorial/uiswing/components/label.html)

[How to Use Layered Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/layeredpane.html)

[How to Use Lists](https://docs.oracle.com/javase/tutorial/uiswing/components/list.html)

[How to Use Menus](https://docs.oracle.com/javase/tutorial/uiswing/components/menu.html)

[How to Use Panels](https://docs.oracle.com/javase/tutorial/uiswing/components/panel.html)

[How to Use Password Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/passwordfield.html)

[How to Use Progress Bars](https://docs.oracle.com/javase/tutorial/uiswing/components/progress.html)

[How to Use Root Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/rootpane.html)

[How to Use Scroll Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/scrollpane.html)

[How to Use Separators](https://docs.oracle.com/javase/tutorial/uiswing/components/separator.html)

How to Use Sliders

[How to Use Spinners](https://docs.oracle.com/javase/tutorial/uiswing/components/spinner.html)

[How to Use Split Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/splitpane.html)

[How to Use Tabbed Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/tabbedpane.html)

[How to Use Tables](https://docs.oracle.com/javase/tutorial/uiswing/components/table.html)

[How to Use Text Areas](https://docs.oracle.com/javase/tutorial/uiswing/components/textarea.html)

[How to Use Text Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/textfield.html)

[How to Use Tool Bars](https://docs.oracle.com/javase/tutorial/uiswing/components/toolbar.html)

[How to Use Tool Tips](https://docs.oracle.com/javase/tutorial/uiswing/components/tooltip.html)

[How to Use Trees](https://docs.oracle.com/javase/tutorial/uiswing/components/tree.html)

[How to Use HTML in Swing Components](https://docs.oracle.com/javase/tutorial/uiswing/components/html.html)

[How to Use Models](https://docs.oracle.com/javase/tutorial/uiswing/components/model.html)

[How to Use Icons](https://docs.oracle.com/javase/tutorial/uiswing/components/icon.html)

[How to Use Borders](https://docs.oracle.com/javase/tutorial/uiswing/components/border.html)

[Solving Common Component Problems](https://docs.oracle.com/javase/tutorial/uiswing/components/problems.html)

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/components/separator.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/uiswing/components/spinner.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Sliders

A [`JSlider`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html) component is intended to let the user easily enter a numeric value bounded by a minimum and maximum value. If space is limited, a [spinner](https://docs.oracle.com/javase/tutorial/uiswing/components/spinner.html) is a possible alternative to a slider.

The following picture shows an application that uses a slider to control animation speed:

![[Swing--SliderDemo.webp]]

---

**Try this:**
1. Click the Launch button to run SliderDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SliderDemo).[![[Swing--jws-launch-button.webp]]](https://docs.oracle.com/javase/tutorialJWS/samples/uiswing/SliderDemoProject/SliderDemo.jnlp)
2. Use the slider to adjust the animation speed.
3. Push the slider to 0 to stop the animation.

---

Below is the code from the [`SliderDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/SliderDemoProject/src/components/SliderDemo.java) file that creates the slider in the previous example.

```
static final int FPS_MIN = 0;
static final int FPS_MAX = 30;
static final int FPS_INIT = 15;    //initial frames per second
. . .
JSlider framesPerSecond = new JSlider(JSlider.HORIZONTAL,
                                      FPS_MIN, FPS_MAX, FPS_INIT);
framesPerSecond.addChangeListener(this);

//Turn on labels at major tick marks.
framesPerSecond.setMajorTickSpacing(10);
framesPerSecond.setMinorTickSpacing(1);
framesPerSecond.setPaintTicks(true);
framesPerSecond.setPaintLabels(true);
```

By default, spacing for major and minor tick marks is zero. To see tick marks, you must explicitly set the spacing for either major or minor tick marks (or both) to a non-zero value and call the `setPaintTicks(true)` method. However, you also need labels for your tick marks. To display standard, numeric labels at major tick mark locations, set the major tick spacing, then call the `setPaintLabels(true)` method. The example program provides labels for its slider in this way. But you are not constrained to using only these labels. [Customizing Labels on a Slider](#labels) shows you how to customize slider labels. In addition, a slider feature allows you to set a font for the `JSlider` component.

```
Font font = new Font("Serif", Font.ITALIC, 15);
framesPerSecond.setFont(font);
```

When you move the slider's knob, the `stateChanged` method of the slider's `ChangeListener` is called. For information about change listeners, refer to [How to Write a Change Listener](https://docs.oracle.com/javase/tutorial/uiswing/events/changelistener.html). Here is the change listener code that reacts to slider value changes:

```java
public void stateChanged(ChangeEvent e) {
    JSlider source = (JSlider)e.getSource();
    if (!source.getValueIsAdjusting()) {
        int fps = (int)source.getValue();
        if (fps == 0) {
            if (!frozen) stopAnimation();
        } else {
            delay = 1000 / fps;
            timer.setDelay(delay);
            timer.setInitialDelay(delay * 10);
            if (frozen) startAnimation();
        }
    }
}
```

Notice that the `stateChanged` method changes the animation speed only if the `getValueIsAdjusting` method returns `false`. Many change events are fired as the user moves the slider knob. This program is interested only in the final result of the user's action.

## Customizing Labels on a Slider

The demo below is a modified version of the SliderDemo that uses a slider with custom labels:

![[Swing--SliderDemo2.webp]]

The source for this program can be found in [`SliderDemo2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/SliderDemo2Project/src/components/SliderDemo2.java). Click the Launch button to run SliderDemo2 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SliderDemo2).

[![[Swing--jws-launch-button.webp]]](https://docs.oracle.com/javase/tutorialJWS/samples/uiswing/SliderDemo2Project/SliderDemo2.jnlp)  

The following code creates the slider and customizes its labels:

```sql
//Create the slider
JSlider framesPerSecond = new JSlider(JSlider.VERTICAL,
                                      FPS_MIN, FPS_MAX, FPS_INIT);
framesPerSecond.addChangeListener(this);
framesPerSecond.setMajorTickSpacing(10);
framesPerSecond.setPaintTicks(true);

//Create the label table
Hashtable labelTable = new Hashtable();
labelTable.put( new Integer( 0 ), new JLabel("Stop") );
labelTable.put( new Integer( FPS_MAX/10 ), new JLabel("Slow") );
labelTable.put( new Integer( FPS_MAX ), new JLabel("Fast") );
framesPerSecond.setLabelTable( labelTable );

framesPerSecond.setPaintLabels(true);
```

Each key-value pair in the hashtable specified with the `setLabelTable` method gives the position and the value of one label. The hashtable key must be of an `Integer` type and must have a value within the slider's range at which to place the label. The hashtable value associated with each key must be a `Component` object. This demo uses `JLabel` instances with text only. An interesting modification would be to use `JLabel` instances with icons or buttons that move the knob to the label's position.

Use the `createStandardLabels` method of the `JSlider` class to create a set of numeric labels positioned at a specific interval. You can also modify the table returned by the `createStandardLabels` method in order to customize it.

## The Slider API

The following tables list the commonly used `JSlider` constructors and methods. See [The JComponent Class](https://docs.oracle.com/javase/tutorial/uiswing/components/jcomponent.html) for tables of commonly used inherited methods.

The API for using sliders is divided into these categories:

- [Creating the Slider](#creating)
- [Fine Tuning the Slider's Appearance](#looks)
- [Watching the Slider Operate](#operation)
- [Working Directly with the Data Model](#modelapi)

| Constructor | Purpose |
| --- | --- |
| [JSlider()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#JSlider--) | Creates a horizontal slider with the range 0 to 100 and an initial value of 50. |
| [JSlider(int min, int max)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#JSlider-int-int-)   [JSlider(int min, int max, int value)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#JSlider-int-int-int-) | Creates a horizontal slider with the specified minimum and maximum values. The third `int` argument, when present, specifies the slider's initial value. |
| [JSlider(int orientation)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#JSlider-int-)   [JSlider(int orientation, int min, int max, int value)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#JSlider-int-int-int-int-) | Creates a slider with the specified orientation, which must be either `JSlider.HORIZONTAL` or `JSlider.VERTICAL`. The last three `int` arguments, when present, specify the slider's minimum, maximum, and initial values, respectively. |
| [JSlider(BoundedRangeModel)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#JSlider-javax.swing.BoundedRangeModel-) | Creates a horizontal slider with the specified model, which manages the slider's minimum, maximum, and current values and their relationships. |

| Method | Purpose |
| --- | --- |
| [void setValue(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setValue-int-)   [int getValue()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getValue--) | Sets or gets the slider's current value. The set method also positions the slider's knob. |
| [void setOrientation(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setOrientation-int-)   [int getOrientation()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getOrientation--) | Sets or gets the orientation of the slider. Possible values are `JSlider.HORIZONTAL` or `JSlider.VERTICAL`. |
| [void setInverted(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setInverted-boolean-)   [boolean getInverted()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getInverted--) | Sets or gets whether the maximum is shown at the left of a horizontal slider or at the bottom of a vertical one, thereby inverting the slider's range. |
| [void setMinimum(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setMinimum-int-)   [int getMinimum()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getMinimum--)   [void setMaximum(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setMaximum-int-)   [int getMaximum()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getMaximum--) | Sets or gets the minimum or maximum values of the slider. Together, these methods set or get the slider's range. |
| [void setMajorTickSpacing(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setMajorTickSpacing-int-)   [int getMajorTickSpacing()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getMajorTickSpacing--)   [void setMinorTickSpacing(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setMinorTickSpacing-int-)   [int getMinorTickSpacing()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getMinorTickSpacing--) | Sets or gets the range between major and minor ticks. You must call `setPaintTicks(true)` for the tick marks to appear. |
| [void setPaintTicks(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setPaintTicks-boolean-)   [boolean getPaintTicks()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getPaintTicks--) | Sets or gets whether tick marks are painted on the slider. |
| [void setPaintLabels(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setPaintLabels-boolean-)   [boolean getPaintLabels()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getPaintLabels--) | Sets or gets whether labels are painted on the slider. You can provide custom labels with `setLabelTable` or get automatic labels by setting the major tick spacing to a non-zero value. |
| [void setLabelTable(Dictionary)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setLabelTable-java.util.Dictionary-)   [Dictionary getLabelTable()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getLabelTable--) | Sets or gets the labels for the slider. You must call `setPaintLabels(true)` for the labels to appear. |
| [Hashtable createStandardLabels(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#createStandardLabels-int-)   [Hashtable createStandardLabels(int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#createStandardLabels-int-int-) | Creates a standard set of numeric labels. The first `int` argument specifies the increment, the second `int` argument specifies the starting point. When left unspecified, the starting point is set to the slider's minimum number. |
| [setFont(java.awt.Font)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setFont-java.awt.Font-) | Sets the font for slider labels. |

| Method | Purpose |
| --- | --- |
| [void addChangeListener(ChangeListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#addChangeListener-javax.swing.event.ChangeListener-) | Registers a change listener with the slider. |
| [boolean getValueIsAdjusting()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getValueIsAdjusting--) | Determines whether the user gesture to move the slider's knob is complete. |

| Class, Interface, or Method | Purpose |
| --- | --- |
| [BoundedRangeModel](https://docs.oracle.com/javase/8/docs/api/javax/swing/BoundedRangeModel.html) | The interface required for the slider's data model. |
| [DefaultBoundedRangeModel](https://docs.oracle.com/javase/8/docs/api/javax/swing/DefaultBoundedRangeModel.html) | An implementation of the `BoundedRangeModel` interface. |
| [void setModel()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#setModel-javax.swing.BoundedRangeModel-)   [getModel()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSlider.html#getModel--)   *(in `JSlider`)* | Sets or gets the data model used by the slider. You can also set the model by using the constructor that takes a single argument of type `BoundedRangeModel`. |

## Examples that Use Sliders

This table shows the examples that use `JSlider` and where those examples are described.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`SliderDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SliderDemo) | This section | Shows a slider with labels at major tick marks. |
| [`SliderDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SliderDemo2) | This section | Shows a vertical slider with custom labels. |
| [`Converter`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#Converter) | [Using Models](https://docs.oracle.com/javase/tutorial/uiswing/components/model.html), [How to Use Panels](https://docs.oracle.com/javase/tutorial/uiswing/components/panel.html) | A measurement conversion application featuring two sliders that share data and have custom `BoundedRangeModel` s. |

If you are programming in JavaFX, see [Slider](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/slider.htm).
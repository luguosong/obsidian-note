---
分类:
  - "网页裁剪"
标题: "How to Use Spinners (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/spinner.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Use Spinners (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)

Documentation

[[Swing-组件-toplevel|Using Top-Level Containers]]

[[Swing-组件-jcomponent|The JComponent Class]]

[[Swing-组件-text|Using Text Components]]

[[Swing-组件-generaltext|Text Component Features]]

[[Swing-组件-textapi|The Text Component API]]

[[Swing-组件-componentlist|How to Use Various Components]]

[[Swing-组件-applet|How to Make Applets]]

[[Swing-按钮|How to Use Buttons, Check Boxes, and Radio Buttons]]

[[Swing-组件-buttongroup|How to Use the ButtonGroup Component]]

[[Swing-组件-colorchooser|How to Use Color Choosers]]

[[Swing-组件-combobox|How to Use Combo Boxes]]

[[Swing-组件-dialog|How to Make Dialogs]]

[[Swing-组件-editorpane|How to Use Editor Panes and Text Panes]]

[[Swing-组件-filechooser|How to Use File Choosers]]

[[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]]

[[Swing-组件-frame|How to Make Frames (Main Windows)]]

[[Swing-组件-internalframe|How to Use Internal Frames]]

[[Swing-组件-label|How to Use Labels]]

[[Swing-组件-layeredpane|How to Use Layered Panes]]

[[Swing-组件-list|How to Use Lists]]

[[Swing-组件-menu|How to Use Menus]]

[[Swing-组件-panel|How to Use Panels]]

[[Swing-组件-passwordfield|How to Use Password Fields]]

[[Swing-组件-progress|How to Use Progress Bars]]

[[Swing-组件-rootpane|How to Use Root Panes]]

[[Swing-组件-scrollpane|How to Use Scroll Panes]]

[[Swing-组件-separator|How to Use Separators]]

[[Swing-滑块|How to Use Sliders]]

How to Use Spinners

[[Swing-组件-splitpane|How to Use Split Panes]]

[[Swing-组件-tabbedpane|How to Use Tabbed Panes]]

[[Swing-组件-table|How to Use Tables]]

[[Swing-组件-textarea|How to Use Text Areas]]

[[Swing-组件-textfield|How to Use Text Fields]]

[[Swing-组件-toolbar|How to Use Tool Bars]]

[[Swing-组件-tooltip|How to Use Tool Tips]]

[[Swing-组件-tree|How to Use Trees]]

[[Swing-组件-html|How to Use HTML in Swing Components]]

[[Swing-组件-model|How to Use Models]]

[[Swing-组件-icon|How to Use Icons]]

[[Swing-组件-border|How to Use Borders]]

[[Swing-组件-problems|Solving Common Component Problems]]

[[Swing-滑块|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-splitpane|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Spinners

Spinners are similar to [[Swing-组件-combobox|combo boxes]] and [[Swing-组件-list|lists]] in that they let the user choose from a range of values. Like editable combo boxes, spinners allow the user to type in a value. Unlike combo boxes, spinners do not have a drop-down list that can cover up other components. Because spinners do not display possible values — only the current value is visible — they are often used instead of combo boxes or lists when the set of possible values is extremely large. However, spinners should only be used when the possible values and their sequence are obvious.

A spinner is a compound component with three subcomponents: two small buttons and an *editor*. The editor can be any `JComponent`, but by default it is implemented as a panel that contains a [[Swing-组件-formattedtextfield|formatted text field]]. The spinner's possible and current values are managed by its *model*.

Here is a picture of an application named `SpinnerDemo` that has three spinners used to specify dates:

![SpinnerDemo shows 3 kinds of spinners](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/SpinnerDemo.png)

The code for the main class can be found in [`SpinnerDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/SpinnerDemoProject/src/components/SpinnerDemo.java). The Month spinner displays the name of the first month in the user's locale. The possible values for this spinner are specified using an array of strings. The Year spinner displays one value of a range of integers, initialized to the current year. The Another Date spinner displays one value in a range of `Date` objects (initially the current date) in a custom format that shows just a month and year.

---

**Try this:**
1. Click the Launch button to run SpinnerDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SpinnerDemo).
2. With the Month spinner, use the arrow buttons or keys to cycle forward and backward through the possible values.  
	Note that the lowest value is the first month of the year (for example, January) and the highest is the last (for example, December). The exact values depend on your locale. Also note that the values do not cycle — you cannot use the up arrow button or key to go from December directly to January — because the standard spinner models do not support cycling.
3. Type in a valid month name for your locale — for example, July.  
	Note that the spinner automatically completes the month name.
4. Moving on to the Year spinner, try typing a year over 100 years ago — for example, 1800 — and then click on another spinner or press the Tab key to move the focus out of the spinner.  
	Because this program restricts the spinner's model to numbers within 100 years of the current year, 1800 is invalid. When the focus moves out of the spinner, the displayed text changes back to the last valid value.
5. Moving to the Another Date spinner, use the arrow buttons or keys to change the date.  
	Note that by default the first part of the date — in this case, the month number — changes. You can change which part of the date changes either by clicking the mouse or using the arrow keys to move to another part of the date.

---

To create a spinner, first create its model and then pass the model into the [JSpinner](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html) constructor. For example:

```text
String[] monthStrings = getMonthStrings(); //get month names
SpinnerListModel monthModel = new SpinnerListModel(monthStrings);
JSpinner spinner = new JSpinner(monthModel);
```

The rest of this section covers the following topics:

## Using Standard Spinner Models and Editors

The Swing API provides three spinner models:

[SpinnerListModel](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerListModel.html)

The `SpinnerListModel` is a model whose values are defined by an array of objects or a `List` object. The Month spinner in the `SpinnerDemo` example uses this model, initialized with an array derived from the value returned by the `getMonths` method of the `java.text.DateFormatSymbols` class. See [`SpinnerDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/SpinnerDemoProject/src/components/SpinnerDemo.java) for details.

[SpinnerNumberModel](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerNumberModel.html)

The `SpinnerNumberModel` supports sequences of numbers which can be expressed as `double` objects, `int` objects, or `Number` objects. You can specify the minimum and maximum allowable values, as well as the *step size* — the amount of each increment or decrement. The Year spinner uses this model, created with the following code:

```text
SpinnerModel model =
        new SpinnerNumberModel(currentYear, //initial value
                               currentYear - 100, //min
                               currentYear + 100, //max
                               1);                //step
```

[SpinnerDateModel](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerDateModel.html)

The `SpinnerDateModel` supports sequences of `Date` objects. You can specify the minimum and maximum dates, as well as the field (such as `Calendar.YEAR`) to increment or decrement. Note, however, that some types of look and feel ignore the specified field, and instead change the field that appears selected. The Another Date spinner uses this model, created with the following code:

```text
Date initDate = calendar.getTime();
calendar.add(Calendar.YEAR, -100);
Date earliestDate = calendar.getTime();
calendar.add(Calendar.YEAR, 200);
Date latestDate = calendar.getTime();
model = new SpinnerDateModel(initDate,
                             earliestDate,
                             latestDate,
                             Calendar.YEAR);
```

When you set the spinner's model, the spinner's editor is automatically set. The Swing API provides an editor class corresponding to each of the three model classes listed above. These classes — [JSpinner.ListEditor](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.ListEditor.html), [JSpinner.NumberEditor](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.NumberEditor.html), and [JSpinner.DateEditor](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.DateEditor.html) — are all subclasses of the [JSpinner.DefaultEditor](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.DefaultEditor.html) class that feature editable formatted text fields. If you use a model that does not have an editor associated with it, the editor is by default a `JSpinner.DefaultEditor` instance with a non-editable formatted text field.

## Specifying Spinner Formatting

To change the formatting used in a standard spinner editor, you can create and set the editor yourself.

The `JSpinner.NumberEditor` and `JSpinner.DateEditor` classes have constructors that allow you to create an editor that formats its data in a particular way. For example, the following code sets up the Another Date spinner so that instead of using the default date format, which is long and includes the time, it shows just a month and year in a compact way.

```text
spinner.setEditor(new JSpinner.DateEditor(spinner, "MM/yyyy"));
```

---

**Note:**

You can play with date formats by running `ComboBoxDemo2` example. Click the Launch button to run ComboBoxDemo2 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ComboBoxDemo2).

For information about format strings, see the [[国际化-格式化|Formatting]] lesson of the Internationalization trail.

---

To change the formatting when using a default editor, you can obtain the editor's formatted text field and invoke methods on it. You can call those methods using the `getTextField` method defined in the `JSpinner.DefaultEditor` class. Note that the Swing-provided editors are not formatted text fields. Instead, they are the `JPanel` instances that contain a formatted text field. Here is an example of getting and invoking methods on the editor's formatted text field:

```java
//Tweak the spinner's formatted text field.
ftf = getTextField(spinner);
if (ftf != null ) {
    ftf.setColumns(8); //specify more width than we need
    ftf.setHorizontalAlignment(JTextField.RIGHT);
}
...

public JFormattedTextField getTextField(JSpinner spinner) {
    JComponent editor = spinner.getEditor();
    if (editor instanceof JSpinner.DefaultEditor) {
        return ((JSpinner.DefaultEditor)editor).getTextField();
    } else {
        System.err.println("Unexpected editor type: "
                           + spinner.getEditor().getClass()
                           + " isn't a descendant of DefaultEditor");
        return null;
    }
}
```java

## Creating Custom Spinner Models and Editors

If the existing spinner models or editors do not meet your needs, you can create your own.

The easiest route to creating a custom spinner model is to create a subclass of an existing `AbstractSpinnerModel` subclass that already does most of what you need. An alternative is to implement your own class by extending [`AbstractSpinnerModel`](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractSpinnerModel.html) class, which implements the event notifications required for all spinner models.

The following subclass of `SpinnerListModel` implements a spinner model that cycles through an array of objects. It also lets you specify a second spinner model that will be updated whenever the cycle begins again. For example, if the array of objects is a list of months, the linked model could be for a spinner that displays the year. When the month flips over from December to January the year is incremented. Similarly, when the month flips back from January to December the year is decremented.

```java
public class CyclingSpinnerListModel extends SpinnerListModel {
    Object firstValue, lastValue;
    SpinnerModel linkedModel = null;

    public CyclingSpinnerListModel(Object[] values) {
        super(values);
        firstValue = values[0];
        lastValue = values[values.length - 1];
    }

    public void setLinkedModel(SpinnerModel linkedModel) {
        this.linkedModel = linkedModel;
    }

    public Object getNextValue() {
        Object value = super.getNextValue();
        if (value == null) {
            value = firstValue;
            if (linkedModel != null) {
                linkedModel.setValue(linkedModel.getNextValue());
            }
        }
        return value;
    }

    public Object getPreviousValue() {
        Object value = super.getPreviousValue();
        if (value == null) {
            value = lastValue;
            if (linkedModel != null) {
                linkedModel.setValue(linkedModel.getPreviousValue());
            }
        }
        return value;
    }
}
```

The `CyclingSpinnerListModel` model is used for the Month spinner in the `SpinnerDemo2` example, an example that is almost identical to the `SpinnerDemo`. Click the Launch button to run SpinnerDemo2 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SpinnerDemo2).

As we mentioned before, if you implement a spinner model that does not descend from `SpinnerListModel`, `SpinnerNumberModel`, or `SpinnerDateModel`, then the spinner's default editor is a non-editable instance of `JSpinner.DefaultEditor`. As you have already seen, you can set a spinner's editor by invoking the `setEditor` method on the spinner after the spinner's model property has been set. An alternative to using `setEditor` is to create a subclass of the `JSpinner` class and override its `createEditor` method so that it returns a particular kind of editor whenever the spinner model is of a certain type.

In theory at least, you can use any `JComponent` instance as an editor. Possibilities include using a subclass of a standard component such as `JLabel`, or a component you have implemented from scratch, or a subclass of `JSpinner.DefaultEditor`. The only requirements are that the editor must be updated to reflect changes in the spinner's value, and it must have a reasonable preferred size. The editor should generally also set its tool tip text to whatever tool tip text has been specified for the spinner. An example of implementing an editor is provided in the next section.

## Detecting Spinner Value Changes

You can detect that a spinner's value has changed by registering a change listener on either the spinner or its model. Here is an example of implementing such a change listener. This example is from `SpinnerDemo3`, which is based on `SpinnerDemo` and uses a change listener to change the color of some text to match the value of the Another Date spinner. Click the Launch button to run SpinnerDemo3 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SpinnerDemo3).

```java
public class SpinnerDemo3 extends JPanel
                          implements ChangeListener {
    protected Calendar calendar;
    protected JSpinner dateSpinner;
    ...
    public SpinnerDemo3() {
        ...
        SpinnerDateModel dateModel = ...;
        ...
        setSeasonalColor(dateModel.getDate()); //initialize color

        //Listen for changes on the date spinner.
        dateSpinner.addChangeListener(this);
        ...
    }

    public void stateChanged(ChangeEvent e) {
        SpinnerModel dateModel = dateSpinner.getModel();
        if (dateModel instanceof SpinnerDateModel) {
            setSeasonalColor(((SpinnerDateModel)dateModel).getDate());
        }
    }

    protected void setSeasonalColor(Date date) {
        calendar.setTime(date);
        int month = calendar.get(Calendar.MONTH);
        JFormattedTextField ftf = getTextField(dateSpinner);
        if (ftf == null) return;

        //Set the color to match northern hemisphere seasonal conventions.
        switch (month) {
            case 2:  //March
            case 3:  //April
            case 4:  //May
                     ftf.setForeground(SPRING_COLOR);
                     break;
            ...
            default: //December, January, February
                     ftf.setForeground(WINTER_COLOR);
        }
    }
    ...
}
```java

The following example implements an editor which has a change listener so that it can reflect the spinner's current value. This particular editor displays a solid color of gray, ranging anywhere from white to black. Click the Launch button to run SpinnerDemo4 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SpinnerDemo4).

```sql
...//Where the components are created:
JSpinner spinner = new JSpinner(new GrayModel(170));
spinner.setEditor(new GrayEditor(spinner));

class GrayModel extends SpinnerNumberModel {
    ...
}

class GrayEditor extends JLabel
                 implements ChangeListener {
    public GrayEditor(JSpinner spinner) {
        setOpaque(true);
        ...
        //Get info from the model.
        GrayModel myModel = (GrayModel)(spinner.getModel());
        setBackground(myModel.getColor());
        spinner.addChangeListener(this);
        ...
        updateToolTipText(spinner);
    }

    protected void updateToolTipText(JSpinner spinner) {
        String toolTipText = spinner.getToolTipText();
        if (toolTipText != null) {
            //JSpinner has tool tip text.  Use it.
            if (!toolTipText.equals(getToolTipText())) {
                setToolTipText(toolTipText);
            }
        } else {
            //Define our own tool tip text.
            GrayModel myModel = (GrayModel)(spinner.getModel());
            int rgb = myModel.getIntValue();
            setToolTipText("(" + rgb + "," + rgb + "," + rgb + ")");
        }
    }

    public void stateChanged(ChangeEvent e) {
            JSpinner mySpinner = (JSpinner)(e.getSource());
            GrayModel myModel = (GrayModel)(mySpinner.getModel());
            setBackground(myModel.getColor());
            updateToolTipText(mySpinner);
    }
}
```

## The Spinner API

The following tables list some of the commonly used API for using spinners. If you need to deal directly with the editor's formatted text field, you should also see [[Swing-组件-formattedtextfield|The FormattedTextField API]]. Other methods you might use are listed in the API tables in [[Swing-组件-jcomponent|The JComponent Class]].

- [Classes Related to Spinners](#newclassesapi)
- [Useful JSpinner Constructors and Methods](#jspinnerapi)
- [Useful Editor Constructors and Methods](#editorapi)
- [SpinnerListModel Methods](#listapi)
- [SpinnerDateModel Methods](#dateapi)
- [SpinnerNumberModel Methods](#numberapi)

| Class or Interface | Purpose |
| --- | --- |
| [JSpinner](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html) | A single-line input field that allows the user to select a number or object value from an ordered sequence. |
| [SpinnerModel](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerModel.html) | The interface implemented by all spinner models. |
| [AbstractSpinnerModel](https://docs.oracle.com/javase/8/docs/api/javax/swing/AbstractSpinnerModel.html) | The usual superclass for spinner model implementations. |
| [SpinnerListModel](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerListModel.html) | A subclass of `AbstractSpinnerModel` whose values are defined by an array or a `List`. |
| [SpinnerDateModel](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerDateModel.html) | A subclass of `AbstractSpinnerModel` that supports sequences of `Date` instances. |
| [SpinnerNumberModel](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerNumberModel.html) | A subclass of `AbstractSpinnerModel` that supports sequences of numbers. |
| [JSpinner.DefaultEditor](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.DefaultEditor.html) | Implements an uneditable component that displays the spinner's value. Subclasses of this class are generally more specialized (and editable). |
| [JSpinner.ListEditor](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.ListEditor.html) | A subclass of `JSpinner.DefaultEditor` whose values are defined by an array or a `List`. |
| [JSpinner.DateEditor](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.DateEditor.html) | A subclass of `JSpinner.DefaultEditor` that supports sequences of `Date` instances. |
| [JSpinner.NumberEditor](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.NumberEditor.html) | A subclass of `JSpinner.DefaultEditor` that supports sequences of numbers. |

| Constructor or Method | Purpose |
| --- | --- |
| [JSpinner()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html#JSpinner--)   [JSpinner(SpinnerModel)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html#JSpinner-javax.swing.SpinnerModel-) | Creates a new `JSpinner`. The no-argument constructor creates a spinner with an integer `SpinnerNumberModel` with an initial value of 0 and no minimum or maximum limits. The optional parameter on the second constructor allows you to specify your own `SpinnerModel`. |
| [void setValue(java.lang.Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html#setValue-java.lang.Object-)   [Object getValue()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html#getValue--) | Sets or gets the currently displayed element of the sequence. |
| [Object getNextValue()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html#getNextValue--)   [Object getPreviousValue()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html#getPreviousValue--) | Gets the object in the sequence that comes before or after the object returned by the `getValue` method. |
| [SpinnerModel getModel()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html#getModel--)   [void setModel(SpinnerModel)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html#setModel-javax.swing.SpinnerModel-) | Gets or sets the spinner's model. |
| [JComponent getEditor()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html#getEditor--)   [void setEditor(JComponent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html#setEditor-javax.swing.JComponent-) | Gets or sets the spinner's editor, which is often an object of type `JSpinner.DefaultEditor`. |
| [protected JComponent createEditor(SpinnerModel)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.html#createEditor-javax.swing.SpinnerModel-) | Called by the `JSpinner` constructors to create the spinner's editor. Override this method to associate an editor with a particular type of model. |

| Constructor or Method | Purpose |
| --- | --- |
| [JSpinner.NumberEditor(JSpinner, String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.NumberEditor.html#JSpinner.NumberEditor-javax.swing.JSpinner-java.lang.String-) | Creates a `JSpinner.NumberEditor` instance that displays and allows editing of the number value of the specified spinner. The string argument specifies the format to use to display the number. See the API documentation for [DecimalFormat](https://docs.oracle.com/javase/8/docs/api/java/text/DecimalFormat.html) for information about decimal format strings. |
| [JSpinner.DateEditor(JSpinner, String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.DateEditor.html#JSpinner.DateEditor-javax.swing.JSpinner-java.lang.String-) | Creates a `JSpinner.DateEditor` instance that displays and allows editing of the `Date` value of the specified spinner. The string argument specifies the format to use to display the date. See the API documentation for [SimpleDateFormat](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html) for information about date format strings. |
| [JFormattedTextField getTextField()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JSpinner.DefaultEditor.html#getTextField--)   *(defined in `JSpinner.DefaultEditor`)* | Gets the formatted text field that provides the main GUI for this editor. |

| Method | Purpose |
| --- | --- |
| [void setList(List)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerListModel.html#setList-java.util.List-)   [List getList()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerListModel.html#getList--) | Sets or gets the `List` that defines the sequence for this model. |

| Method | Purpose |
| --- | --- |
|  |
| [void setValue(Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerDateModel.html#setValue-java.lang.Object-)   [Date getDate()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerDateModel.html#getDate--)   [Object getValue()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerDateModel.html#getValue--) | Sets or gets the current `Date` for this sequence. |
| [void setStart(Comparable)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerDateModel.html#setStart-java.lang.Comparable-)   [Comparable getStart()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerDateModel.html#getStart--) | Sets or gets the first `Date` in this sequence. Use `null` to specify that the spinner has no lower limit. |
| [void setEnd(Comparable)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerDateModel.html#setEnd-java.lang.Comparable-)   [Comparable getEnd()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerDateModel.html#getEnd--) | Sets or gets the last `Date` in this sequence. Use `null` to specify that the spinner has no upper limit. |
| [void setCalendarField(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerDateModel.html#setCalendarField-int-)   [int getCalendarField()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerDateModel.html#getCalendarField--) | Sets or gets the size of the date value increment used by the `getNextValue` and `getPreviousValue` methods. This property is *not* used when the user explicitly increases or decreases the value; instead, the selected part of the formatted text field is incremented or decremented. The specified parameter must be one of the following constants, defined in `Calendar`: `ERA`, `YEAR`, `MONTH`, `WEEK_OF_YEAR`, `WEEK_OF_MONTH`, `DAY_OF_MONTH`, `DAY_OF_YEAR`, `DAY_OF_WEEK`, `DAY_OF_WEEK_IN_MONTH`, `AM_PM`, `HOUR_OF_DAY`, `MINUTE`, `SECOND`, `MILLISECOND`. |

| Method | Purpose |
| --- | --- |
|  |
| [void setValue(Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerNumberModel.html#setValue-java.lang.Object-)   [Number getNumber()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerNumberModel.html#getNumber--) | Sets or gets the current value for this sequence. |
| [void setMaximum(Comparable)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerNumberModel.html#setMaximum-java.lang.Comparable-)   [Comparable getMaximum()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerNumberModel.html#getMaximum--) | Sets or gets the upper bound for numbers in this sequence. If the maximum is `null`, there is no upper bound. |
| [void setMinimum(Comparable)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerNumberModel.html#setMinimum-java.lang.Comparable-)   [Comparable getMinimum()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerNumberModel.html#getMinimum--) | Sets or gets the lower bound for numbers in this sequence. If the minimum is `null`, there is no lower bound. |
| [void setStepSize(Number)](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerNumberModel.html#setStepSize-java.lang.Number-)   [Number getStepSize()](https://docs.oracle.com/javase/8/docs/api/javax/swing/SpinnerNumberModel.html#getStepSize--) | Sets or gets the increment used by `getNextValue` and `getPreviousValue` methods. |

## Examples That Use Spinners

This table lists examples that use spinners and points to where those examples are described.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`SpinnerDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SpinnerDemo) | This section | Uses all three standard spinner model classes. Contains the code to use a custom spinner model, but the code is turned off by default. |
| [`SpinnerDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SpinnerDemo2) | This section | A `SpinnerDemo` subclass that uses the custom spinner model for its Months spinner. |
| [`SpinnerDemo3`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SpinnerDemo3) | This section | Based on SpinnerDemo, this application shows how to listen for changes in a spinner's value. |
| [`SpinnerDemo4`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SpinnerDemo4) | This section | Implements a custom model and a custom editor for a spinner that displays shades of gray. |
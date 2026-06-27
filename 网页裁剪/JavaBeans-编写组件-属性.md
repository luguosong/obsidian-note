---
分类:
  - "网页裁剪"
标题: "Properties (The Java™ Tutorials >        
            JavaBeans(TM) > Writing JavaBeans Components)"
描述: "This JavaBean Java tutorial describes using the JavaBeans API to develop JavaBean components"
来源: "https://docs.oracle.com/javase/tutorial/javabeans/writing/properties.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Properties (The Java™ Tutorials >        
            JavaBeans(TM) > Writing JavaBeans Components)

Documentation

Properties

[[JavaBeans-编写组件-方法|Methods]]

[[JavaBeans-编写组件-事件|Events]]

[[JavaBeans-编写组件-使用BeanInfo|Using a BeanInfo]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Properties

To define a property in a bean class, supply public getter and setter methods. For example, the following methods define an `int` property called `mouthWidth`:

```java
public class FaceBean {
    private int mMouthWidth = 90;

    public int getMouthWidth() {
        return mMouthWidth;
    }
    
    public void setMouthWidth(int mw) {
        mMouthWidth = mw;
    }
}
```text

A builder tool like NetBeans recognizes the method names and shows the `mouthWidth` property in its list of properties. It also recognizes the type, `int`, and provides an appropriate editor so the property can be manipulated at design time.

This example shows a property than can be read and written. Other combinations are also possible. A read-only property, for example, has a getter method but no setter. A write-only property has a setter method only.

A special case for `boolean` properties allows the accessor method to be defined using `is` instead of `get`. For example, the accessor for a `boolean` property `running` could be as follows:

```
public boolean isRunning() {
    // ...
}
```java

Various specializations of basic properties are available and described in the following sections.

## Indexed Properties

An *indexed* property is an array instead of a single value. In this case, the bean class provides a method for getting and setting the entire array. Here is an example for an `int[]` property called `testGrades`:

```java
public int[] getTestGrades() {
    return mTestGrades;
}

public void setTestGrades(int[] tg) {
    mTestGrades = tg;
}
```

For indexed properties, the bean class also provides methods for getting and setting a specific element of the array.

```java
public int getTestGrades(int index) {
    return mTestGrades[index];
}

public void setTestGrades(int index, int grade) {
    mTestGrades[index] = grade;
}
```java

## Bound Properties

A *bound* property notifies listeners when its value changes. This has two implications:

1. The bean class includes `addPropertyChangeListener()` and `removePropertyChangeListener()` methods for managing the bean's listeners.
2. When a bound property is changed, the bean sends a `PropertyChangeEvent` to its registered listeners.

`PropertyChangeEvent` and `PropertyChangeListener` live in the `java.beans` package.

The `java.beans` package also includes a class, `PropertyChangeSupport`, that takes care of most of the work of bound properties. This handy class keeps track of property listeners and includes a convenience method that fires property change events to all registered listeners.

The following example shows how you could make the `mouthWidth` property a bound property using `PropertyChangeSupport`. The necessary additions for the bound property are shown in bold.

```java
import java.beans.*;

public class FaceBean {
    private int mMouthWidth = 90;
    private PropertyChangeSupport mPcs =
        new PropertyChangeSupport(this);

    public int getMouthWidth() {
        return mMouthWidth;
    }
    
    public void setMouthWidth(int mw) {
        int oldMouthWidth = mMouthWidth;
        mMouthWidth = mw;
        mPcs.firePropertyChange("mouthWidth",
                                   oldMouthWidth, mw);
    }

    public void
    addPropertyChangeListener(PropertyChangeListener listener) {
        mPcs.addPropertyChangeListener(listener);
    }
    
    public void
    removePropertyChangeListener(PropertyChangeListener listener) {
        mPcs.removePropertyChangeListener(listener);
    }
}
```

Bound properties can be tied directly to other bean properties using a builder tool like NetBeans. You could, for example, take the `value` property of a slider component and bind it to the `mouthWidth` property shown in the example. NetBeans allows you to do this without writing any code.

## Constrained Properties

A *constrained* property is a special kind of bound property. For a constrained property, the bean keeps track of a set of *veto* listeners. When a constrained property is about to change, the listeners are consulted about the change. Any one of the listeners has a chance to veto the change, in which case the property remains unchanged.

The veto listeners are separate from the property change listeners. Fortunately, the `java.beans` package includes a `VetoableChangeSupport` class that greatly simplifies constrained properties.

Changes to the `mouthWidth` example are shown in bold:

```java
import java.beans.*;

public class FaceBean {
    private int mMouthWidth = 90;
    private PropertyChangeSupport mPcs =
        new PropertyChangeSupport(this);
    private VetoableChangeSupport mVcs =
        new VetoableChangeSupport(this);

    public int getMouthWidth() {
        return mMouthWidth;
    }
    
    public void
    setMouthWidth(int mw) throws PropertyVetoException {
        int oldMouthWidth = mMouthWidth;
        mVcs.fireVetoableChange("mouthWidth",
                                    oldMouthWidth, mw);
        mMouthWidth = mw;
        mPcs.firePropertyChange("mouthWidth",
                                 oldMouthWidth, mw);
    }

    public void
    addPropertyChangeListener(PropertyChangeListener listener) {
        mPcs.addPropertyChangeListener(listener);
    }
    
    public void
    removePropertyChangeListener(PropertyChangeListener listener) {
        mPcs.removePropertyChangeListener(listener);
    }

    public void
    addVetoableChangeListener(VetoableChangeListener listener) {
        mVcs.addVetoableChangeListener(listener);
    }
    
    public void
    removeVetoableChangeListener(VetoableChangeListener listener) {
        mVcs.removeVetoableChangeListener(listener);
    }
}
```

## Development Support in NetBeans

The coding patterns for creating bean properties are straightforward, but sometimes it's hard to tell if you are getting everything correct. NetBeans has support for property patterns so you can immediately see results as you are writing code.

To take advantage of this feature, look at the **Navigator** pane, which is typically in the lower left corner of the NetBeans window. Normally, this pane is in **Members View** mode, which shows all the methods and fields defined in the current class.

Click on the combo box to switch to **Bean Patterns** view. You will see a list of the properties that NetBeans can infer from your method definitions. NetBeans updates this list as you type, making it a handy way to check your work.

In the following example, NetBeans has found the read-write `mouthWidth` property and the read-write indexed `testGrades` property. In addition, NetBeans has recognized that `FaceBean` allows registration of both `PropertyChangeListener` s and `VetoableChangeListener` s.

![[JavaBeans---nb-bean-patterns.webp]]
---
分类:
  - "网页裁剪"
标题: "Events (The Java™ Tutorials >        
            JavaBeans(TM) > Writing JavaBeans Components)"
描述: "This JavaBean Java tutorial describes using the JavaBeans API to develop JavaBean components"
来源: "https://docs.oracle.com/javase/tutorial/javabeans/writing/events.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Events (The Java™ Tutorials >        
            JavaBeans(TM) > Writing JavaBeans Components)

Documentation

[[JavaBeans-编写组件-属性|Properties]]

[[JavaBeans-编写组件-方法|Methods]]

Events

[[JavaBeans-编写组件-使用BeanInfo|Using a BeanInfo]]

[[JavaBeans-编写组件-方法|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/javabeans/TOC.html) • [[JavaBeans-编写组件-使用BeanInfo|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Events

A bean class can fire off any type of event, including custom events. As with properties, events are identified by a specific pattern of method names.

```java
public void add<Event>Listener(<Event>Listener a)
public void remove<Event>Listener(<Event>Listener a)
```java

The listener type must be a descendant of `java.util.EventListener`.

For example, a Swing `JButton` is a bean that fires `action` events when the user clicks on it. `JButton` includes the following methods (actually inherited from `AbstractButton`), which are the bean pattern for an event:

```java
public void addActionListener(ActionListener l);
public void removeActionListener(ActionListener l);
```

Bean events are recognized by builder tools and can be used in wiring components together. For example, you can wire a button's `action` event to make something happen, like invoking another bean's method.
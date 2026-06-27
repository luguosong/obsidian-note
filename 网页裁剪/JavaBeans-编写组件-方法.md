---
分类:
  - "网页裁剪"
标题: "Methods (The Java™ Tutorials >        
            JavaBeans(TM) > Writing JavaBeans Components)"
描述: "This JavaBean Java tutorial describes using the JavaBeans API to develop JavaBean components"
来源: "https://docs.oracle.com/javase/tutorial/javabeans/writing/methods.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JavaBeans-编写组件-属性|Properties]]

Methods

[[JavaBeans-编写组件-事件|Events]]

[[JavaBeans-编写组件-使用BeanInfo|Using a BeanInfo]]

[[JavaBeans-编写组件-属性|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/javabeans/TOC.html) • [[JavaBeans-编写组件-事件|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Methods

A bean's *methods* are the things it can do. Any public method that is not part of a property definition is a bean method. When you use a bean in the context of a builder tool like NetBeans, you can use a bean's methods as part of your application. For example, you could wire a button press to call one of your bean's methods.
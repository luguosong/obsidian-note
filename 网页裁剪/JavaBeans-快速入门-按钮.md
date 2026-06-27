---
分类:
  - "网页裁剪"
标题: "A Button is a Bean (The Java™ Tutorials >        
            JavaBeans(TM) > Quick Start)"
描述: "This JavaBean Java tutorial describes using the JavaBeans API to develop JavaBean components"
来源: "https://docs.oracle.com/javase/tutorial/javabeans/quick/button.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# A Button is a Bean (The Java™ Tutorials >        
            JavaBeans(TM) > Quick Start)

Documentation

[[JavaBeans-快速入门-创建项目|Creating a Project]]

A Button is a Bean

[[JavaBeans-快速入门-连接应用|Wiring the Application]]

[[JavaBeans-快速入门-使用第三方Bean|Using a Third-Party Bean]]

[[JavaBeans-快速入门-创建项目|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/javabeans/TOC.html) • [[JavaBeans-快速入门-连接应用|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## A Button is a Bean

Take a closer look at the **Palette**. All of the components listed are beans. The components are grouped by function. Scroll to find the **Swing Controls** group, then click on **Button** and drag it over into the visual designer. The button is a bean!

![[JavaBeans---SnapFrame-button.webp]]

Under the palette on the right side of NetBeans is an inspector pane that you can use to examine and manipulate the button. Try closing the output window at the bottom to give the inspector pane more space.

![[JavaBeans---SnapFrame-button-properties.webp]]

## Properties

The properties of a bean are the things you can change that affect its appearance or internal state. For the button in this example, the properties include the foreground color, the font, and the text that appears on the button. The properties are shown in two groups. **Properties** lists the most frequently used properties, while **Other Properties** shows less commonly used properties.

Go ahead and edit the button's properties. For some properties, you can type values directly into the table. For others, click on the **...** button to edit the value. For example, click on **...** to the right of the **foreground** property. A color chooser dialog pops up and you can choose a new color for the foreground text on the button. Try some other properties to see what happens. Notice you are not writing any code.

## Events

Beans can also fire events. Click on the **Events** button in the bean properties pane. You'll see a list of every event that the button is capable of firing.

![[JavaBeans---SnapFrame-button-events.png]]

You can use NetBeans to hook up beans using their events and properties. To see how this works, drag a **Label** out of the palette into the visual designer for `SnapFrame`.

![[JavaBeans---SnapFrame-button-label.webp]]

Edit the label's properties until it looks just perfect.
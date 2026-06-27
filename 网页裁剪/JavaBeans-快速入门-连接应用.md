---
分类:
  - "网页裁剪"
标题: "Wiring the Application (The Java™ Tutorials >        
            JavaBeans(TM) > Quick Start)"
描述: "This JavaBean Java tutorial describes using the JavaBeans API to develop JavaBean components"
来源: "https://docs.oracle.com/javase/tutorial/javabeans/quick/wiring.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JavaBeans-快速入门-创建项目|Creating a Project]]

[[JavaBeans-快速入门-按钮|A Button is a Bean]]

Wiring the Application

[[JavaBeans-快速入门-使用第三方Bean|Using a Third-Party Bean]]

[[JavaBeans-快速入门-按钮|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/javabeans/TOC.html) • [[JavaBeans-快速入门-使用第三方Bean|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Wiring the Application

To wire the button and the label together, click on the **Connection Mode** button in the visual designer toolbar.

![[JavaBeans---connection-mode.webp]]

Click on the button in the `SnapFrame` form. NetBeans outlines the button in red to show that it is the component that will be generating an event.

![[JavaBeans---SnapFrame-button-red.webp]]

Click on the label. NetBeans' **Connection Wizard** pops up. First you will choose the event you wish to respond to. For the button, this is the **action** event. Click on the **+** next to **action** and select **actionPerformed**. Click **Next >**.

![[JavaBeans---SnapFrame-connection-1.webp]]

Now you get to choose what happens when the button fires its **action** event. The **Connection Wizard** lists all the properties in the label bean. Select **text** in the list and click **Next**.

![[JavaBeans---SnapFrame-connection-2.webp]]

In the final screen of the **Connection Wizard**, fill in the value you wish to set for the **text** property. Click on **Value**, then type **You pressed the button!** or something just as eloquent. Click **Finish**.

![[JavaBeans---SnapFrame-connection-3.webp]]

NetBeans wires the components together and shows you its handiwork in the source code editor.

![[JavaBeans---SnapFrame-wired-code.png]]

Click on the **Design** button in the source code toolbar to return to the UI designer. Click **Run Main Project** or press **F6** to build and run your project.

![[JavaBeans---run-main-project.webp]]

NetBeans builds and runs the project. It asks you to identify the main class, which is `SnapFrame`. When the application window pops up, click on the button. You'll see your immortal prose in the label.

![[JavaBeans---SnapFrame.webp]]

Notice that you did not write any code. This is the real power of JavaBeans — with a good builder tool like NetBeans, you can quickly wire together components to create a running application.
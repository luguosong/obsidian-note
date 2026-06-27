---
分类:
  - "网页裁剪"
标题: "Creating a Project (The Java™ Tutorials >        
            JavaBeans(TM) > Quick Start)"
描述: "This JavaBean Java tutorial describes using the JavaBeans API to develop JavaBean components"
来源: "https://docs.oracle.com/javase/tutorial/javabeans/quick/project.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Creating a Project (The Java™ Tutorials >        
            JavaBeans(TM) > Quick Start)

Documentation

Creating a Project

[[JavaBeans-快速入门-按钮|A Button is a Bean]]

[[JavaBeans-快速入门-连接应用|Wiring the Application]]

[[JavaBeans-快速入门-使用第三方Bean|Using a Third-Party Bean]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Creating a Project

The easiest way to learn about JavaBeans is to start using them. To begin, [download and install the latest version of NetBeans](http://netbeans.org/). This tutorial describes how to use NetBeans version 7.0.

NetBeans is a *bean builder tool*, which means it recognizes JavaBeans components (beans) and enables you to snap components together into an application with ease.

## A Button is a Bean

Start NetBeans. Choose **File > New Project...** from the menu.

[![[JavaBeans---new-project-1.webp]]](https://docs.oracle.com/javase/tutorial/figures/javabeans/new-project-1.png)  
Click for full image

Select **Java** from the **Categories** list and select **Java Application** from the **Projects** list. Click **Next >**.

[![[JavaBeans---new-project-2.webp]]](https://docs.oracle.com/javase/tutorial/figures/javabeans/new-project-2.png)  
Click for full image

Enter **SnapApp** as the application name. Uncheck **Create Main Class** and click **Finish**. NetBeans creates the new project and you can see it in NetBeans' **Projects** pane:

![[JavaBeans---projects-SnapApp.webp]]

Control-click on the **SnapApp** project and choose **New > JFrame Form...** from the popup menu.

[![[JavaBeans---snapapp-new-jframe.webp]]](https://docs.oracle.com/javase/tutorial/figures/javabeans/snapapp-new-jframe.png)  
Click for full image

Fill in **SnapFrame** for the class name and **snapapp** as the package. Click **Finish**. NetBeans creates the new class and shows its visual designer:

[![[JavaBeans---SnapFrame-Design.webp]]](https://docs.oracle.com/javase/tutorial/figures/javabeans/SnapFrame-Design.png)  
Click for full image

In the **Projects** pane on the left, you can see the newly created `SnapFrame` class. In the center of the screen is the NetBeans visual designer. On the right side is the **Palette**, which contains all the components you can add to the frame in the visual designer.
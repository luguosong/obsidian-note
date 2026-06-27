---
分类:
  - "网页裁剪"
标题: "Using a Third-Party Bean (The Java™ Tutorials >        
            JavaBeans(TM) > Quick Start)"
描述: "This JavaBean Java tutorial describes using the JavaBeans API to develop JavaBean components"
来源: "https://docs.oracle.com/javase/tutorial/javabeans/quick/addbean.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Using a Third-Party Bean (The Java™ Tutorials >        
            JavaBeans(TM) > Quick Start)

Documentation

[[JavaBeans-快速入门-创建项目|Creating a Project]]

[[JavaBeans-快速入门-按钮|A Button is a Bean]]

[[JavaBeans-快速入门-连接应用|Wiring the Application]]

Using a Third-Party Bean

[[JavaBeans-快速入门-连接应用|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/javabeans/TOC.html) • [[JavaBeans-编写组件|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Using a Third-Party Bean

Almost any code can be packaged as a bean. The beans you have seen so far are all visual beans, but beans can provide functionality without having a visible component.

The power of JavaBeans is that you can use software components without having to write them or understand their implementation.

This page describes how you can add a JavaBean to your application and take advantage of its functionality.

## Adding a Bean to the NetBeans Palette

Download [`` an example JavaBean component, `BumperSticker` ``](https://docs.oracle.com/javase/tutorial/javabeans/quick/BumperSticker.jar). Beans are distributed as JAR files. Save the file somewhere on your computer. `BumperSticker` is graphic component and exposes one method, `go()`, that kicks off an animation.

To add `BumperSticker` to the NetBeans palette, choose **Tools > Palette > Swing/AWT Components** from the NetBeans menu.

![[JavaBeans--Bean-nb-palette-manager.webp]]

Click on the **Add from JAR...** button. NetBeans asks you to locate the JAR file that contains the beans you wish to add to the palette. Locate the file you just downloaded and click **Next**.

![[JavaBeans--Bean-nb-palette-install-1.webp]]

NetBeans shows a list of the classes in the JAR file. Choose the ones you wish you add to the palette. In this case, select **BumperSticker** and click **Next**.

![[JavaBeans--Bean-nb-palette-install-2.webp]]

Finally, NetBeans needs to know which section of the palette will receive the new beans. Choose **Beans** and click **Finish**.

![[JavaBeans--Bean-nb-palette-install-3.webp]]

Click **Close** to make the **Palette Manager** window go away. Now take a look in the palette. `BumperSticker` is there in the **Beans** section.

## Using Your New JavaBean

Go ahead and drag `BumperSticker` out of the palette and into your form.

![[JavaBeans--Bean-BumperSticker.webp]]

You can work with the `BumperSticker` instance just as you would work with any other bean. To see this in action, drag another button out into the form. This button will kick off the `BumperSticker` 's animation.

![[JavaBeans--Bean-BumperSticker-button.webp]]

Wire the button to the `BumperSticker` bean, just as you already wired the first button to the text field.

1. Begin by clicking on the **Connection Mode** button.
2. Click on the second button. NetBeans gives it a red outline.
3. Click on the `BumperSticker` component. The **Connection Wizard** pops up.
4. Click on the **+** next to **action** and select **actionPerformed**. Click **Next >**.
5. Select **Method Call**, then select **go()** from the list. Click **Finish**.

If you're unsure of any of the steps, review [[JavaBeans-快速入门-连接应用|Wiring the Application]]. The process here is very similar.

Run the application again. When you click on the second button, the `BumperSticker` component animates the color of the heart.

Again, notice how you have produced a functioning application without writing any code.

![[JavaBeans--Bean-SnapApp-2.webp]]
---
分类:
  - "网页裁剪"
标题: "Introduction to DnD (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/intro.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Introduction to DnD (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)

Documentation

Introduction to DnD

[[Swing-defaultsupport|Default DnD Support]]

[[Swing-basicdemo|Demo - BasicDnD]]

[[Swing-transferhandler|TransferHandler Class]]

[[Swing-export|Export Methods]]

[[Swing-import|Import Methods]]

[[Swing-transfersupport|TransferSupport Class]]

[[Swing-dropmodes|Setting the Drop Mode]]

[[Swing-dropmodedemo|Demo - DropDemo]]

[[Swing-dropaction|Choosing the Drop Action]]

[[Swing-dropactiondemo|Demo - ChooseDropAction]]

[[Swing-showdroploc|Showing the Drop Location]]

[[Swing-locsensitivedrop|Location Sensitive Drop]]

[[Swing-locsensitivedemo|Demo - LocationSensitiveDemo]]

[[Swing-emptytable|Empty Table Drop]]

[[Swing-droplocation|Drop Location Rendering]]

[[Swing-toplevel|Top-Level Drop]]

[[Swing-cutpaste|Adding Cut, Copy and Paste (CCP)]]

[[Swing-textpaste|CCP in a Text Component]]

[[Swing-listpaste|CCP in a non-Text Component]]

[[Swing-dataflavor|Using and Creating a DataFlavor]]

[[Swing-together|Putting it All Together - DnD and CCP]]

[[Swing-拖放问题|Solving Common Data Transfer Problems]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Introduction to DnD

If you are writing an application you will want to support the ability to transfer information between components in your application. But you will also want your application to play well with others — this includes supporting the ability to transfer information between your application and other Java applications, and between your application and native applications. The ability to transfer data takes two forms:

- Drag and drop (DnD) support. The following diagram illustrates dragging from a `JList` and dropping onto a `JTextField` component (the arrows show the path of the data):
	![Drag and Drop Illustration](https://docs.oracle.com/javase/tutorial/figures/uiswing/dnd/dndprocess.jpg)
- Clipboard transfer through cut or copy and paste. The following diagrams show cutting (or copying) from a `JList` and pasting onto a `JTextField` component:
	![Cut/Copy/Paste Illustration](https://docs.oracle.com/javase/tutorial/figures/uiswing/dnd/clipboardtransfer.jpg)

## Drag and Drop — Behind the Scenes

Let us say there is a user named Rollo, who is running a Java application. He wants to drag some text from a list and deposit it into a text field. (Note that the process is the same when dragging from a native application to a Java application.) In a nutshell, the drag and drop process works like this:

- Rollo has selected a row of text in the *source* component: the list. While holding the mouse button Rollo begins to drag the text — this initiates the *drag gesture*.
- When the drag begins, the list packages up the data for *export* and declares what *source actions* it supports, such as `COPY`, `MOVE`, or `LINK`.
- As Rollo drags the data, Swing continuously calculates the location and handles the rendering.
- If Rollo simultaneously holds the Shift and/or Control key during the drag, this *user action* is also part of the drag gesture. Typically, an ordinary drag requests the `MOVE` action. Holding the Control key while dragging requests the `COPY` action, and holding both Shift and Control requests the `LINK` action.
- Once Rollo drags the text over the bounds of a text field component, the *target* is continually polled to see if it will accept or reject the potential drop. As he drags, the target provides feedback by showing the *drop location*, perhaps an insertion cursor or a highlighted selection. In this case, the text field (the current target) allows both replacement of selected text and insertion of new text.
- When Rollo releases the mouse button, the text component inspects the declared source actions and any user action and then it chooses what it wants out of the available options. In this case, the text field chooses to insert the new text at the point of the drop.
- Finally, the text field *imports* the data.

While this might seem like a daunting process, Swing handles most of the work for you. The framework is designed so that you plug in the details specific to your component, and the rest "just works".

More on this in the next section.

---

**Note:**

We *do not recommend* that you create your own drag and drop support using the AWT classes. This implementation would require significant complex support internal to each component. Prior to release 1.4 when the dnd system was reworked, developers did occasionally create their own dnd support, but it does not work with sophisticated components, like tree and table, that have subtle selection and drop issues.

---
---
分类:
  - "网页裁剪"
标题: "Printing Support in Swing Components (The Java™ Tutorials >        
            2D Graphics > Printing)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/printing/swing.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Printing Support in Swing Components (The Java™ Tutorials >        
            2D Graphics > Printing)

Documentation

[[二维图形-基本打印程序|A Basic Printing Program]]

[[二维图形-打印设置对话框|Using Print Setup Dialogs]]

[[二维图形-多页文档|Printing a Multiple Page Document]]

[[二维图形-打印服务|Working with Print Services and Attributes]]

[[二维图形-打印GUI内容|Printing the Contents of a User Interface]]

Printing Support in Swing Components

[[二维图形-打印GUI内容|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [[二维图形-高级主题|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Printing Support in Swing Components

The [`PrintUIWindow.java`](https://docs.oracle.com/javase/tutorial/2d/printing/examples/PrintUIWindow.java) example represented in the previous section demonstrates that the printout is exactly the same you saw on the screen. This appearance seems reasonable. However, if a window is scrollable, then the contents that are currently scrolled out of view are not included in the printout. This creates a dump effect on the printer. This becomes a particular problem when printing large components such as a Swing table or text components. Components may contain many lines of text which cannot all be entirely visible on the screen. In this case, print the contents displayed by the component in a manner consistent with the screen display.

To solve this problem, the Swing table and all text components are printing aware. The following methods directly provide the use of the Java 2D printing:

- [`javax.swing.JTable.print();`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTable.html#print--)
- [`javax.swing.text.JTextComponent.print();`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#print--)

These methods provide a full implementation of printing for their contents. An application doesn't need directly create a `PrinterJob` object and implement the `Printable` interface. The call of these methods displays a print dialog and prints the component's data in accordance with the user's selections. There are also additional methods which provide more options.
---
分类:
  - "网页裁剪"
标题: "Printing the Contents of a User Interface (The Java™ Tutorials >        
            2D Graphics > Printing)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/printing/gui.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[二维图形-基本打印程序|A Basic Printing Program]]

[[二维图形-打印设置对话框|Using Print Setup Dialogs]]

[[二维图形-多页文档|Printing a Multiple Page Document]]

[[二维图形-打印服务|Working with Print Services and Attributes]]

Printing the Contents of a User Interface

[[二维图形-Swing打印支持|Printing Support in Swing Components]]

[[二维图形-打印服务|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [[二维图形-Swing打印支持|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Printing the Contents of a User Interface

Another common printing task is to print the contents of a window or a frame, either in whole, or in part. The window may contain the following components: toolbars, buttons sliders, text labels, scrollable text areas, images, and other graphical content. All of these components are printed using the following methods of the Java 2D printing API:

```
java.awt.Component.print(Graphics g);
java.awt.Component.printAll(Graphics g);
```

The following figure represents a simple user interface.

![[-GUI-printui.png]]

The code to create this UI is located in the sample program [`PrintUIWindow.java`](https://docs.oracle.com/javase/tutorial/2d/printing/examples/PrintUIWindow.java).

To print this window, modify the code in the earlier examples which printed text or images. The resulting code should appear as follows:

```
public int print(Graphics g, PageFormat pf, int page)
    throws PrinterException {
    if (page > 0) {
        return NO_SUCH_PAGE;
    }

    Graphics2D g2d = (Graphics2D)g;
    g2d.translate(pf.getImageableX(), pf.getImageableY());

    // Print the entire visible contents of a
    // java.awt.Frame.
    frame.printAll(g);

    return PAGE_EXISTS;
}
```

---

**Note:** The call to the `printAll` method is the only difference between this example and examples to print text or image. The `print(Graphics g)` method mirrors the `java.awt.Component.paint(Graphics g)` method used for on-screen rendering. Use the `print()` method rather than the `paint()` method as the `Components` class may have overridden the `print()` method to handle the printing case differently.

---

The `printAll(Graphics g)` method prints the component and all its subcomponents. This method is usually used to print object such as a complete window, rather than a single component.
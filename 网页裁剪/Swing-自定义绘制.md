Documentation

Performing Custom Painting

[Creating the Demo Application (Step 1)](https://docs.oracle.com/javase/tutorial/uiswing/painting/step1.html)

[Creating the Demo Application (Step 2)](https://docs.oracle.com/javase/tutorial/uiswing/painting/step2.html)

[Creating the Demo Application (Step 3)](https://docs.oracle.com/javase/tutorial/uiswing/painting/step3.html)

[Refining the Design](https://docs.oracle.com/javase/tutorial/uiswing/painting/refining.html)

[A Closer Look at the Paint Mechanism](https://docs.oracle.com/javase/tutorial/uiswing/painting/closer.html)

[Summary](https://docs.oracle.com/javase/tutorial/uiswing/painting/summary.html)

[Solving Common Painting Problems](https://docs.oracle.com/javase/tutorial/uiswing/painting/problems.html)

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/events/index.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/uiswing/painting/step1.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Performing Custom Painting

This lesson describes custom painting in Swing. Many programs will get by just fine without writing their own painting code; they will simply use the standard GUI components that are already available in the Swing API. But if you need specific control over how your graphics are drawn, then this lesson is for you. We will explore custom painting by creating a simple GUI application that draws a shape in response to the user's mouse activity. By intentionally keeping its design simple, we can focus on the underlying painting concepts, which in turn will relate to other GUI applications that you develop in the future.

This lesson explains each concept in steps as you construct the demo application. It presents the code as soon as possible with a minimum amount of background reading. Custom painting in Swing is similar to custom painting in AWT, but since we do not recommend writing your applications entirely with the AWT, its painting mechanism is not specifically discussed here. You may find it useful to read this lesson followed by the in-depth discussion in the article, [Painting in AWT and Swing](http://www.oracle.com/technetwork/java/painting-140037.html).
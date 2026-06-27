Documentation

[Coordinates](https://docs.oracle.com/javase/tutorial/2d/overview/coordinate.html)

[Java 2D Rendering](https://docs.oracle.com/javase/tutorial/2d/overview/rendering.html)

[Geometric Primitives](https://docs.oracle.com/javase/tutorial/2d/overview/primitives.html)

[Text](https://docs.oracle.com/javase/tutorial/2d/overview/text.html)

[Images](https://docs.oracle.com/javase/tutorial/2d/overview/images.html)

Printing

[« Previous](https://docs.oracle.com/javase/tutorial/2d/overview/images.html) • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/2d/basic2d/index.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Printing

All of the Swing and Java 2D graphics, including composited graphics and images, can be rendered to a printer by using the Java 2D Printing API. This API also provides document composition features that enable you to perform such operations as changing the order in which pages are printed.

Rendering to a printer is like rendering to a screen. The printing system controls when pages are rendered, just like the drawing system controls when a component is painted on the screen.

The Java 2D Printing API is based on a *callback* model in which the printing system, not the application, controls when pages are printed. The application provides the printing system with information about the document to be printed, and the printing system determines when each page needs to be imaged.

The following two features are important to support printing:

- **Job control** – Initiating and managing the print job including displaying the standard print and setup dialog boxes
- **Pagination** – Rendering each page when the printing system requests it

When pages need to be imaged, the printing system calls the application’s `print` method with an appropriate `Graphics` context. To use Java 2D API features when you print, you cast the `Graphics` object to a `Graphics2D` class, just like you do when you are rendering to the screen.
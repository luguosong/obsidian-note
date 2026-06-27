Documentation

Overview of the Java 2D API Concepts

[Coordinates](https://docs.oracle.com/javase/tutorial/2d/overview/coordinate.html)

[Java 2D Rendering](https://docs.oracle.com/javase/tutorial/2d/overview/rendering.html)

[Geometric Primitives](https://docs.oracle.com/javase/tutorial/2d/overview/primitives.html)

[Text](https://docs.oracle.com/javase/tutorial/2d/overview/text.html)

[Images](https://docs.oracle.com/javase/tutorial/2d/overview/images.html)

[Printing](https://docs.oracle.com/javase/tutorial/2d/overview/printing.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Overview of the Java 2D API Concepts

The Java 2D API provides two-dimensional graphics, text, and imaging capabilities for Java programs through extensions to the Abstract Windowing Toolkit (AWT). This comprehensive rendering package supports line art, text, and images in a flexible, full-featured framework for developing richer user interfaces, sophisticated drawing programs, and image editors. Java 2D objects exist on a plane called user coordinate space, or just [*user space*](https://docs.oracle.com/javase/tutorial/2d/overview/coordinate.html). When objects are rendered on a screen or a printer, user space coordinates are transformed to [*device space coordinates*](https://docs.oracle.com/javase/tutorial/2d/overview/coordinate.html). The following links are useful to start learning about the Java 2D API:

- [`Graphics`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics.html) class
- [`Graphics2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics2D.html) class

The Java 2D API provides following capabilities:

- A uniform rendering model for display devices and printers
- A wide range of geometric primitives, such as curves, rectangles, and ellipses, as well as a mechanism for rendering virtually any geometric shape
- Mechanisms for performing hit detection on shapes, text, and images
- A compositing model that provides control over how overlapping objects are rendered
- Enhanced color support that facilitates color management
- Support for printing complex documents
- Control of the quality of the rendering through the use of rendering hints

These topics are discussed in the following sections:

- [Java 2D Rendering](https://docs.oracle.com/javase/tutorial/2d/overview/rendering.html)
- [Geometric Primitives](https://docs.oracle.com/javase/tutorial/2d/overview/primitives.html)
- [Text](https://docs.oracle.com/javase/tutorial/2d/overview/text.html)
- [Images](https://docs.oracle.com/javase/tutorial/2d/overview/images.html)
- [Printing](https://docs.oracle.com/javase/tutorial/2d/overview/printing.html)
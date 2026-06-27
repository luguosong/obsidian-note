---
分类:
  - "网页裁剪"
标题: "How to Create a Splash Screen (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Other Swing Features)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/misc/splashscreen.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-其他特性-desktop|How to Integrate with the Desktop Class]]

[[Swing-其他特性-trans_shaped_windows|How to Create Translucent and Shaped Windows]]

[[Swing-其他特性-jlayer|How to Decorate Components with the JLayer Class]]

[[Swing-其他特性-action|How to Use Actions]]

[[Swing-其他特性-timer|How to Use Swing Timers]]

[[Swing-其他特性-access|How to Support Assistive Technologies]]

[[Swing-其他特性-focus|How to Use the Focus Subsystem]]

[[Swing-其他特性-keybinding|How to Use Key Bindings]]

[[Swing-其他特性-modality|How to Use Modality in Dialogs]]

[[Swing-其他特性-printtable|How to Print Tables]]

[[Swing-其他特性-printtext|How to Print Text]]

How to Create a Splash Screen

[[Swing-其他特性-systemtray|How to Use the System Tray]]

[[Swing-其他特性-problems|Solving Common Problems Using Other Swing Features]]

[[Swing-其他特性-printtext|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-其他特性-systemtray|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Create a Splash Screen

Almost all modern applications have a splash screen. Typically splash screens are used for the following purposes:

- Advertising a product
- Indicating to the user that the application is launching during long startup times
- Providing information that is only needed once per visit

Java Foundation Classes, both Swing and Abstract Windowing Toolkit (AWT), enable a developer to create splash screens in Java technology applications. However, because the main purpose of a splash screen is to provide the user with feedback about the application's startup, the delay between the application's startup and the moment when the splash screen pops up should be minimal. Before the splash screen can pop up, the application has to load and initialize the Java™ Virtual Machine (JVM), AWT, Swing, and sometimes application-dependent libraries as well. The resulting delay of several seconds has made the use of a Java™ technology-based splash screen less than desirable.

Fortunately, Java™ SE 6 provides a solution that allows the application to display the splash screen much earlier, even before the virtual machine starts. A Java application launcher is able to decode an image and display it in a simple non-decorated window.

The splash screen can display any `gif`, `png`, or `jpeg` image, with transparency, translucency, and animation. The figure below represents an example of the Java application splash screen developed as an animated `gif` file.

![Splash Screen for Java Application](https://docs.oracle.com/javase/tutorial/figures/uiswing/misc/splash.gif)

The [`SplashScreen`](https://docs.oracle.com/javase/8/docs/api/java/awt/SplashScreen.html) class is used to close the splash screen, change the splash-screen image, obtain the image position or size, and paint in the splash screen. An application cannot create an instance of this class. Only a single instance created within this class can exist, and this instance can be obtained using the `getSplashScreen()` static method. If the application has not created the splash screen at startup through the command-line or manifest-file option, the `getSplashScreen` method returns null.

Typically, a developer wants to keep the splash-screen image on the screen and display something over the image. The splash-screen window has an overlay surface with an alpha channel, and this surface can be accessed with a traditional `Graphics2D` interface.

The following code snippet shows how to obtain a `SplashScreen` object, then how to create a graphics context with the `createGraphics()` method:

```
...
        final SplashScreen splash = SplashScreen.getSplashScreen();
        if (splash == null) {
            System.out.println("SplashScreen.getSplashScreen() returned null");
            return;
        }
        Graphics2D g = splash.createGraphics();
        if (g == null) {
            System.out.println("g is null");
            return;
        }
...
```

Find the demo's complete code in the [`SplashDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/SplashDemoProject/src/misc/SplashDemo.java) file.

---

**Note:**

The SplashDemo application uses fixed coordinates to display overlay information. These coordinates are image-dependent and calculated individually for each splash screen.

---

The native splash screen can be displayed in the following ways:

- Command-line argument
- Java™ Archive (JAR) file with the specified manifest option

## How to Use the Command-Line Argument to Display a Splash Screen

To display a splash screen from the command line use the `-splash:` command-line argument. This argument is a Java application launcher option that displays a splash screen:

```
java -splash:<file name> <class name>
```

---

**Try this:**
1. Save the [`` `SplashDemo.java` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/SplashDemoProject/src/misc/SplashDemo.java) file in a directory named `misc`.
2. Compile the file as follows:
	```
	javac misc/SplashDemo.java
	```
3. Save the [`` `splash.gif` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/SplashDemoProject/src/misc/images/splash.gif) image in the `images` directory.
4. Run the application from the command line with the following arguments:
	```
	java -splash:images/splash.gif misc.SplashDemo
	```
5. Wait until the splash screen has been completely displayed.
6. The application window appears. To close the window choose File|Exit from the pop-up menu or click the X.
7. Change the splash screen name to a non-existent image, for example, `nnn.gif`. Run the application as follows:
	```
	java -splash:images/nnn.gif misc.SplashDemo
	```
8. You will see the following output string:
	```
	SplashScreen.getSplashScreen() returned null
	```

---

## How to Use a JAR File to Display Splash Screen

If your application is packaged in a JAR file, you can use the `SplashScreen-Image` option in a manifest file to show a splash screen. Place the image in the JAR file and specify the path in the option as follows:

```
Manifest-Version: 1.0
Main-Class: <class name>
SplashScreen-Image: <image name>
```

---

**Try this:**
1. Save the [`` `SplashDemo.java` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/SplashDemoProject/src/misc/SplashDemo.java) file in a directory named `misc`.
2. Compile the file as follows:
	```
	javac misc/SplashDemo.java
	```
3. Save the [`` `splash.gif` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/SplashDemoProject/src/misc/images/splash.gif) image in the `images` directory.
4. Prepare the `splashmanifest.mf` file as follows:
	```
	Manifest-Version: 1.0
	Main-Class: misc.SplashDemo
	SplashScreen-Image: images/splash.gif
	```
5. Create a JAR file using the following command:
	```
	jar cmf splashmanifest.mf splashDemo.jar misc/SplashDemo*.class images/splash.gif
	```
	For more information about JAR files, see [[部署-basicsindex|Using JAR Files]] in the [[将程序打包为JAR文件|Packaging Programs in JAR Files]] page.
6. Run the application:
	```
	java -jar splashDemo.jar
	```
7. Wait until the splash screen has been completely displayed.
8. The application window appears. To close the window choose File|Exit from the pop-up menu or click the X.

---

## The Splash Screen API

The `SplashScreen` class cannot be used to create the splash screen. Only a single instance created within this class can exist.

| Method | Purpose |
| --- | --- |
| [getSplashScreen()](https://docs.oracle.com/javase/8/docs/api/java/awt/SplashScreen.html#getSplashScreen--) | Returns the `SplashScreen` object used for Java startup splash screen control. |
| [createGraphics()](https://docs.oracle.com/javase/8/docs/api/java/awt/SplashScreen.html#createGraphics--) | Creates a graphics context (as a `Graphics2D` object) for the splash screen overlay image, which allows you to draw over the splash screen. |
| [getBounds()](https://docs.oracle.com/javase/8/docs/api/java/awt/SplashScreen.html#getBounds--) | Returns the bounds of the splash screen window as a `Rectangle`. |
| [close()](https://docs.oracle.com/javase/8/docs/api/java/awt/SplashScreen.html#close--) | Closes the splash screen and releases all associated resources. |

## Example That Uses the SplashScreen API

The following table lists the example that uses splash screen.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`SplashDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#SplashDemo) | This section | Shows a splash screen before opening the application window. |
---
分类:
  - "网页裁剪"
标题: "How to Make Applets (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/applet.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Make Applets (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)

Documentation

[[Swing-组件-toplevel|Using Top-Level Containers]]

[[Swing-组件-jcomponent|The JComponent Class]]

[[Swing-组件-text|Using Text Components]]

[[Swing-组件-generaltext|Text Component Features]]

[[Swing-组件-textapi|The Text Component API]]

[[Swing-组件-componentlist|How to Use Various Components]]

How to Make Applets

[[Swing-按钮|How to Use Buttons, Check Boxes, and Radio Buttons]]

[[Swing-组件-buttongroup|How to Use the ButtonGroup Component]]

[[Swing-组件-colorchooser|How to Use Color Choosers]]

[[Swing-组件-combobox|How to Use Combo Boxes]]

[[Swing-组件-dialog|How to Make Dialogs]]

[[Swing-组件-editorpane|How to Use Editor Panes and Text Panes]]

[[Swing-组件-filechooser|How to Use File Choosers]]

[[Swing-组件-formattedtextfield|How to Use Formatted Text Fields]]

[[Swing-组件-frame|How to Make Frames (Main Windows)]]

[[Swing-组件-internalframe|How to Use Internal Frames]]

[[Swing-组件-label|How to Use Labels]]

[[Swing-组件-layeredpane|How to Use Layered Panes]]

[[Swing-组件-list|How to Use Lists]]

[[Swing-组件-menu|How to Use Menus]]

[[Swing-组件-panel|How to Use Panels]]

[[Swing-组件-passwordfield|How to Use Password Fields]]

[[Swing-组件-progress|How to Use Progress Bars]]

[[Swing-组件-rootpane|How to Use Root Panes]]

[[Swing-组件-scrollpane|How to Use Scroll Panes]]

[[Swing-组件-separator|How to Use Separators]]

[[Swing-滑块|How to Use Sliders]]

[[Swing-组件-spinner|How to Use Spinners]]

[[Swing-组件-splitpane|How to Use Split Panes]]

[[Swing-组件-tabbedpane|How to Use Tabbed Panes]]

[[Swing-组件-table|How to Use Tables]]

[[Swing-组件-textarea|How to Use Text Areas]]

[[Swing-组件-textfield|How to Use Text Fields]]

[[Swing-组件-toolbar|How to Use Tool Bars]]

[[Swing-组件-tooltip|How to Use Tool Tips]]

[[Swing-组件-tree|How to Use Trees]]

[[Swing-组件-html|How to Use HTML in Swing Components]]

[[Swing-组件-model|How to Use Models]]

[[Swing-组件-icon|How to Use Icons]]

[[Swing-组件-border|How to Use Borders]]

[[Swing-组件-problems|Solving Common Component Problems]]

[[Swing-组件-componentlist|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-按钮|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Make Applets

This section covers `JApplet` — a class that enables applets to use Swing components. `JApplet` is a subclass of [`java.applet.Applet`](https://docs.oracle.com/javase/8/docs/api/java/applet/Applet.html), which is covered in the [[部署-Applet|Java Applets]] trail. If you've never written a regular applet before, we urge you to read that trail before proceeding with this section. The information provided in that trail applies to Swing applets, with a few exceptions that this section explains.

Any applet that contains Swing components must be implemented with a subclass of [`JApplet`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html). Here's a Swing version of one of the applets that helped make Java famous — an animation applet that (in its most well known configuration) shows our mascot Duke doing cartwheels:

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

You can find the main source code for this applet in [`TumbleItem.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TumbleItemProject/src/components/TumbleItem.java).

This section discusses the following topics:

## Features Provided by JApplet

Because `JApplet` is a top-level Swing container, each Swing applet has a root pane. The most noticeable effects of the root pane's presence are support for adding a [[Swing-组件-menu|menu bar]] and the need to use a content pane.

As described in [[Swing-组件-toplevel|Using Top-Level Containers]], each top-level container such as a `JApplet` has a single content pane. The content pane makes Swing applets different from regular applets in the following ways:

- You add components to a Swing applet's content pane, not directly to the applet. [[Swing-组件-toplevel|Adding Components to the Content Pane]] shows you how.
- You set the layout manager on a Swing applet's content pane, not directly on the applet.
- The default layout manager for a Swing applet's content pane is `BorderLayout`. This differs from the default layout manager for `Applet`, which is `FlowLayout`.
- You should not put painting code directly in a `JApplet` object. See [[Swing-自定义绘制|Performing Custom Painting]] for examples of how to perform custom painting in applets.

## Threads in Applets

Swing components should be created, queried, and manipulated on the event-dispatching thread, but browsers don't invoke applet "milestone" methods from that thread. For this reason, the milestone methods — `init`, `start`, `stop`, and `destroy` — should use the `SwingUtilities` method `invokeAndWait` (or, if appropriate, `invokeLater`) so that code that refers to the Swing components is executed on the event-dispatching thread. More information about these methods and the event-dispatching thread is in [[Swing-并发|Concurrency in Swing]].

Here is an example of an `init` method:

```java
public void init() {
    //Execute a job on the event-dispatching thread:
    //creating this applet's GUI.
    try {
        javax.swing.SwingUtilities.invokeAndWait(new Runnable() {
            public void run() {
                createGUI();
            }
        });
    } catch (Exception e) {
        System.err.println("createGUI didn't successfully complete");
    }
}

private void createGUI() {
    JLabel label = new JLabel(
                       "You are successfully running a Swing applet!");
    label.setHorizontalAlignment(JLabel.CENTER);
    label.setBorder(BorderFactory.createMatteBorder(1,1,1,1,Color.black));
    getContentPane().add(label, BorderLayout.CENTER);
}
```java

The `invokeLater` method is not appropriate for this implementation because it allows `init` to return before initialization is complete, which can cause applet problems that are difficult to debug.

The `init` method in `TumbleItem` is more complex, as the following code shows. Like the first example, this `init` method implementation uses `SwingUtilities.invokeAndWait` to execute the GUI creation code on the event-dispatching thread. This `init` method sets up a [[Swing-其他特性-timer|Swing timer]] to fire action events the update the animation. Also, `init` uses [`javax.swing.SwingWorker`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html) to create a background task that loads the animation image files, letting the applet present a GUI right away, without waiting for all resources to be loaded.

```java
private void createGUI() {
    ...
    animator = new Animator();
    animator.setOpaque(true);
    animator.setBackground(Color.white);
    setContentPane(animator);
    ...
}

public void init() {
    loadAppletParameters();

    //Execute a job on the event-dispatching thread:
    //creating this applet's GUI.
    try {
        javax.swing.SwingUtilities.invokeAndWait(new Runnable() {
            public void run() {
                createGUI();
            }
        });
    } catch (Exception e) { 
        System.err.println("createGUI didn't successfully complete");
    }

    //Set up the timer that will perform the animation.
    timer = new javax.swing.Timer(speed, this);
    timer.setInitialDelay(pause);
    timer.setCoalesce(false);
    timer.start(); //Start the animation.

    //Background task for loading images.
    SwingWorker worker = (new SwingWorker<ImageIcon[], Object>() {
            public ImageIcon[] doInBackground() {
                final ImageIcon[] innerImgs = new ImageIcon[nimgs];
            ...//Load all the images...
            return imgs;
        }
        public void done() {
            //Remove the "Loading images" label.
            animator.removeAll();
            loopslot = -1;
            try {
                imgs = get();
            } ...//Handle possible exceptions
        }

    }).execute();
}
```

You can find the applet's source code in [`TumbleItem.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TumbleItemProject/src/components/TumbleItem.java). To find all the files required for the applet, see the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TumbleItem).

## Using Images in a Swing Applet

The `Applet` class provides the `getImage` method for loading images into an applet. The `getImage` method creates and returns an `Image` object that represents the loaded image. Because Swing components use `Icon` s rather than `Image` s to refer to pictures, Swing applets tend not to use `getImage`. Instead Swing applets create instances of `ImageIcon` — an icon loaded from an image file. `ImageIcon` comes with a code-saving benefit: it handles image tracking automatically. Refer to [[Swing-组件-icon|How to Use Icons]] for more information.

The animation of Duke doing cartwheels requires 17 different pictures. The applet uses one `ImageIcon` per picture and loads them in its `init` method. Because images can take a long time to load, the icons are loaded in a separate thread implemented by a `SwingWorker` object. Here's the code:

```java
public void init() {
    ...
    imgs = new ImageIcon[nimgs];
    (new SwingWorker<ImageIcon[], Object>() {
        public ImageIcon[] doInBackground() {
            //Images are numbered 1 to nimgs,
            //but fill array from 0 to nimgs-1.
            for (int i = 0; i < nimgs; i++) {
                imgs[i] = loadImage(i+1);
            }
            return imgs;
        }
        ...
    }).execute();

}
...
protected ImageIcon loadImage(int imageNum) {
    String path = dir + "/T" + imageNum + ".gif";
    int MAX_IMAGE_SIZE = 2400;  //Change this to the size of
                                 //your biggest image, in bytes.
    int count = 0;
    BufferedInputStream imgStream = new BufferedInputStream(
       this.getClass().getResourceAsStream(path));
    if (imgStream != null) {
        byte buf[] = new byte[MAX_IMAGE_SIZE];
        try {
            count = imgStream.read(buf);
            imgStream.close();
        } catch (java.io.IOException ioe) {
            System.err.println("Couldn't read stream from file: " + path);
            return null;
        }
        if (count <= 0) {
            System.err.println("Empty file: " + path);
            return null;
        }
        return new ImageIcon(Toolkit.getDefaultToolkit().createImage(buf));
    } else {
        System.err.println("Couldn't find file: " + path);
        return null;
    }
}
```javascript

The `loadImage` method loads the image for the specified frame of animation. It uses the `getResourceAsStream` method rather than the usual `getResource` method to get the images. The resulting code isn't pretty, but `getResourceAsStream` is more efficient than `getResource` for loading images from JAR files into applets that are executed using Java Plug-in™ software. For further details, see [[Swing-组件-icon|Loading Images Into Applets]].

## Embedding an Applet in an HTML Page

You can deploy a simple applet by using the `applet` tag. Or, you can use the Deployment Toolkit. Here is the code for the cartwheeling Duke applet:

```xml
<script src="https://www.java.com/js/deployJava.js" type="text/javascript">
</script><script type="text/javascript">
//<![CDATA[
    var attributes = { archive: 'https://docs.oracle.com/javase/tutorialJWS/samples/uiswing/TumbleItemProject/TumbleItem.jar',
                       codebase: 'https://docs.oracle.com/javase/tutorialJWS/samples/uiswing/TumbleItemProject',
                       code:'components.TumbleItem', width:'600', height:'95' };
    var parameters = { permissions:'sandbox', nimgs:'17', offset:'-57',
                       img: 'images/tumble', maxwidth:'120' };
    deployJava.runApplet(attributes, parameters, '1.7');
//]]>
</script><noscript>A browser with Javascript enabled is required for this page to operate properly.</noscript>
```

For more information, see [[部署-Applet-deployingApplet|Deploying an Applet]] in the [[部署-Applet|Java Applets]] lesson.

## The JApplet API

The next table lists the interesting methods that `JApplet` adds to the applet API. They give you access to features provided by the root pane. Other methods you might use are defined by the [`Component`](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html) and [`Applet`](https://docs.oracle.com/javase/8/docs/api/java/applet/Applet.html) classes. See [[Swing-组件-jcomponent|Component Methods]] for a list of commonly used `Component` methods, and [[部署-Applet|Java Applets]] for help in using `Applet` methods.

| Method | Purpose |
| --- | --- |
| [void setContentPane(Container)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html#setContentPane-java.awt.Container-)   [Container getContentPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html#getContentPane--) | Set or get the applet's content pane. The content pane contains the applet's visible GUI components and should be opaque. |
| [void setRootPane(JRootPane)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html#setRootPane-javax.swing.JRootPane-)   [JRootPane getRootPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html#getRootPane--) | Create, set, or get the applet's root pane. The root pane manages the interior of the applet including the content pane, the glass pane, and so on. |
| [void setJMenuBar(JMenuBar)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html#setJMenuBar-javax.swing.JMenuBar-)   [JMenuBar getJMenuBar()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html#getJMenuBar--) | Set or get the applet's menu bar to manage a set of menus for the applet. |
| [void setGlassPane(Component)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html#setGlassPane-java.awt.Component-)   [Component getGlassPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html#getGlassPane--) | Set or get the applet's glass pane. You can use the glass pane to intercept mouse events. |
| [void setLayeredPane(JLayeredPane)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html#setLayeredPane-javax.swing.JLayeredPane-)   [JLayeredPane getLayeredPane()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html#getLayeredPane--) | Set or get the applet's layered pane. You can use the applet's layered pane to put components on top of or behind other components. |

## Applet Example

This table shows examples of Swing applets and where those examples are described.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`TumbleItem`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TumbleItem) | This page | An animation applet |
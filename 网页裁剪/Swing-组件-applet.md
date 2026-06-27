Documentation

[Using Top-Level Containers](https://docs.oracle.com/javase/tutorial/uiswing/components/toplevel.html)

[The JComponent Class](https://docs.oracle.com/javase/tutorial/uiswing/components/jcomponent.html)

[Using Text Components](https://docs.oracle.com/javase/tutorial/uiswing/components/text.html)

[Text Component Features](https://docs.oracle.com/javase/tutorial/uiswing/components/generaltext.html)

[The Text Component API](https://docs.oracle.com/javase/tutorial/uiswing/components/textapi.html)

[How to Use Various Components](https://docs.oracle.com/javase/tutorial/uiswing/components/componentlist.html)

How to Make Applets

[How to Use Buttons, Check Boxes, and Radio Buttons](https://docs.oracle.com/javase/tutorial/uiswing/components/button.html)

[How to Use the ButtonGroup Component](https://docs.oracle.com/javase/tutorial/uiswing/components/buttongroup.html)

[How to Use Color Choosers](https://docs.oracle.com/javase/tutorial/uiswing/components/colorchooser.html)

[How to Use Combo Boxes](https://docs.oracle.com/javase/tutorial/uiswing/components/combobox.html)

[How to Make Dialogs](https://docs.oracle.com/javase/tutorial/uiswing/components/dialog.html)

[How to Use Editor Panes and Text Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/editorpane.html)

[How to Use File Choosers](https://docs.oracle.com/javase/tutorial/uiswing/components/filechooser.html)

[How to Use Formatted Text Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/formattedtextfield.html)

[How to Make Frames (Main Windows)](https://docs.oracle.com/javase/tutorial/uiswing/components/frame.html)

[How to Use Internal Frames](https://docs.oracle.com/javase/tutorial/uiswing/components/internalframe.html)

[How to Use Labels](https://docs.oracle.com/javase/tutorial/uiswing/components/label.html)

[How to Use Layered Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/layeredpane.html)

[How to Use Lists](https://docs.oracle.com/javase/tutorial/uiswing/components/list.html)

[How to Use Menus](https://docs.oracle.com/javase/tutorial/uiswing/components/menu.html)

[How to Use Panels](https://docs.oracle.com/javase/tutorial/uiswing/components/panel.html)

[How to Use Password Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/passwordfield.html)

[How to Use Progress Bars](https://docs.oracle.com/javase/tutorial/uiswing/components/progress.html)

[How to Use Root Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/rootpane.html)

[How to Use Scroll Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/scrollpane.html)

[How to Use Separators](https://docs.oracle.com/javase/tutorial/uiswing/components/separator.html)

[How to Use Sliders](https://docs.oracle.com/javase/tutorial/uiswing/components/slider.html)

[How to Use Spinners](https://docs.oracle.com/javase/tutorial/uiswing/components/spinner.html)

[How to Use Split Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/splitpane.html)

[How to Use Tabbed Panes](https://docs.oracle.com/javase/tutorial/uiswing/components/tabbedpane.html)

[How to Use Tables](https://docs.oracle.com/javase/tutorial/uiswing/components/table.html)

[How to Use Text Areas](https://docs.oracle.com/javase/tutorial/uiswing/components/textarea.html)

[How to Use Text Fields](https://docs.oracle.com/javase/tutorial/uiswing/components/textfield.html)

[How to Use Tool Bars](https://docs.oracle.com/javase/tutorial/uiswing/components/toolbar.html)

[How to Use Tool Tips](https://docs.oracle.com/javase/tutorial/uiswing/components/tooltip.html)

[How to Use Trees](https://docs.oracle.com/javase/tutorial/uiswing/components/tree.html)

[How to Use HTML in Swing Components](https://docs.oracle.com/javase/tutorial/uiswing/components/html.html)

[How to Use Models](https://docs.oracle.com/javase/tutorial/uiswing/components/model.html)

[How to Use Icons](https://docs.oracle.com/javase/tutorial/uiswing/components/icon.html)

[How to Use Borders](https://docs.oracle.com/javase/tutorial/uiswing/components/border.html)

[Solving Common Component Problems](https://docs.oracle.com/javase/tutorial/uiswing/components/problems.html)

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/components/componentlist.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/uiswing/components/button.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Make Applets

This section covers `JApplet` — a class that enables applets to use Swing components. `JApplet` is a subclass of [`java.applet.Applet`](https://docs.oracle.com/javase/8/docs/api/java/applet/Applet.html), which is covered in the [Java Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/index.html) trail. If you've never written a regular applet before, we urge you to read that trail before proceeding with this section. The information provided in that trail applies to Swing applets, with a few exceptions that this section explains.

Any applet that contains Swing components must be implemented with a subclass of [`JApplet`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JApplet.html). Here's a Swing version of one of the applets that helped make Java famous — an animation applet that (in its most well known configuration) shows our mascot Duke doing cartwheels:

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

You can find the main source code for this applet in [`TumbleItem.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TumbleItemProject/src/components/TumbleItem.java).

This section discusses the following topics:

## Features Provided by JApplet

Because `JApplet` is a top-level Swing container, each Swing applet has a root pane. The most noticeable effects of the root pane's presence are support for adding a [menu bar](https://docs.oracle.com/javase/tutorial/uiswing/components/menu.html) and the need to use a content pane.

As described in [Using Top-Level Containers](https://docs.oracle.com/javase/tutorial/uiswing/components/toplevel.html), each top-level container such as a `JApplet` has a single content pane. The content pane makes Swing applets different from regular applets in the following ways:

- You add components to a Swing applet's content pane, not directly to the applet. [Adding Components to the Content Pane](https://docs.oracle.com/javase/tutorial/uiswing/components/toplevel.html#contentpane) shows you how.
- You set the layout manager on a Swing applet's content pane, not directly on the applet.
- The default layout manager for a Swing applet's content pane is `BorderLayout`. This differs from the default layout manager for `Applet`, which is `FlowLayout`.
- You should not put painting code directly in a `JApplet` object. See [Performing Custom Painting](https://docs.oracle.com/javase/tutorial/uiswing/painting/index.html) for examples of how to perform custom painting in applets.

## Threads in Applets

Swing components should be created, queried, and manipulated on the event-dispatching thread, but browsers don't invoke applet "milestone" methods from that thread. For this reason, the milestone methods — `init`, `start`, `stop`, and `destroy` — should use the `SwingUtilities` method `invokeAndWait` (or, if appropriate, `invokeLater`) so that code that refers to the Swing components is executed on the event-dispatching thread. More information about these methods and the event-dispatching thread is in [Concurrency in Swing](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/index.html).

Here is an example of an `init` method:

```
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
```

The `invokeLater` method is not appropriate for this implementation because it allows `init` to return before initialization is complete, which can cause applet problems that are difficult to debug.

The `init` method in `TumbleItem` is more complex, as the following code shows. Like the first example, this `init` method implementation uses `SwingUtilities.invokeAndWait` to execute the GUI creation code on the event-dispatching thread. This `init` method sets up a [Swing timer](https://docs.oracle.com/javase/tutorial/uiswing/misc/timer.html) to fire action events the update the animation. Also, `init` uses [`javax.swing.SwingWorker`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html) to create a background task that loads the animation image files, letting the applet present a GUI right away, without waiting for all resources to be loaded.

```
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

The `Applet` class provides the `getImage` method for loading images into an applet. The `getImage` method creates and returns an `Image` object that represents the loaded image. Because Swing components use `Icon` s rather than `Image` s to refer to pictures, Swing applets tend not to use `getImage`. Instead Swing applets create instances of `ImageIcon` — an icon loaded from an image file. `ImageIcon` comes with a code-saving benefit: it handles image tracking automatically. Refer to [How to Use Icons](https://docs.oracle.com/javase/tutorial/uiswing/components/icon.html) for more information.

The animation of Duke doing cartwheels requires 17 different pictures. The applet uses one `ImageIcon` per picture and loads them in its `init` method. Because images can take a long time to load, the icons are loaded in a separate thread implemented by a `SwingWorker` object. Here's the code:

```
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
```

The `loadImage` method loads the image for the specified frame of animation. It uses the `getResourceAsStream` method rather than the usual `getResource` method to get the images. The resulting code isn't pretty, but `getResourceAsStream` is more efficient than `getResource` for loading images from JAR files into applets that are executed using Java Plug-in™ software. For further details, see [Loading Images Into Applets](https://docs.oracle.com/javase/tutorial/uiswing/components/icon.html#applet).

## Embedding an Applet in an HTML Page

You can deploy a simple applet by using the `applet` tag. Or, you can use the Deployment Toolkit. Here is the code for the cartwheeling Duke applet:

```
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

For more information, see [Deploying an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/deployingApplet.html) in the [Java Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/index.html) lesson.

## The JApplet API

The next table lists the interesting methods that `JApplet` adds to the applet API. They give you access to features provided by the root pane. Other methods you might use are defined by the [`Component`](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html) and [`Applet`](https://docs.oracle.com/javase/8/docs/api/java/applet/Applet.html) classes. See [Component Methods](https://docs.oracle.com/javase/tutorial/uiswing/components/jcomponent.html#complookapi) for a list of commonly used `Component` methods, and [Java Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/index.html) for help in using `Applet` methods.

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
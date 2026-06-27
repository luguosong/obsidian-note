---
分类:
  - "网页裁剪"
标题: "Developing a Java Web Start Application (The Java™ Tutorials >        
            Deployment > Java Web Start)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/webstart/developing.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Developing a Java Web Start Application (The Java™ Tutorials >        
            Deployment > Java Web Start)

Documentation

Developing a Java Web Start Application

[[部署-WebStart-retrievingResources|Retrieving Resources]]

[[部署-WebStart-deploying|Deploying a Java Web Start Application]]

[[部署-WebStart-settingUpWebServerMimeType|Setting Up a Web Server]]

[[部署-WebStart-running|Running a Java Web Start Application]]

[[部署-WebStart-security|Java Web Start and Security]]

[[部署-WebStart-problems|Common Java Web Start Problems]]

[[部署-WebStart-questions|Questions and Exercises]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Developing a Java Web Start Application

Software designed by using [[部署|component-based architecture]] can easily be developed and deployed as a Java Web Start application. Consider the example of a Java Web Start application with a Swing-based graphical user interface (GUI). With component-based design, the GUI can be built with smaller building blocks or components. The following general steps are used to create an application's GUI:

- Create a `MyTopJPanel` class that is a subclass of `JPanel`. Lay out your application's GUI components in the constructor of the `MyTopJPanel` class.
- Create a class called `MyApplication` that is a subclass of the `JFrame` class.
- In the `main` method of the `MyApplication` class, instantiate the `MyTopJPanel` class and set it as the content pane of the `JFrame`.

The following sections explore these steps in greater detail by using the Dynamic Tree Demo application. If you are not familiar with Swing, see [[使用Swing创建图形用户界面|Creating a GUI with Swing]] to learn more about using Swing GUI components.

Click the following Launch button to launch the Dynamic Tree Demo application.

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

## Creating the Top JPanel Class

Create a class that is a subclass of `JPanel`. This top `JPanel` acts as a container for all your other UI components. In the following example, the `DynamicTreePanel` class is the topmost `JPanel`. The constructor of the `DynamicTreePanel` class invokes other methods to create and lay out the UI controls properly.

```java
public class DynamicTreePanel extends JPanel implements ActionListener {
    private int newNodeSuffix = 1;
    private static String ADD_COMMAND = "add";
    private static String REMOVE_COMMAND = "remove";
    private static String CLEAR_COMMAND = "clear";
    
    private DynamicTree treePanel;

    public DynamicTreePanel() {
        super(new BorderLayout());
        
        //Create the components.
        treePanel = new DynamicTree();
        populateTree(treePanel);

        JButton addButton = new JButton("Add");
        addButton.setActionCommand(ADD_COMMAND);
        addButton.addActionListener(this);
        
        JButton removeButton = new JButton("Remove");
        ....
        
        JButton clearButton = new JButton("Clear");
        ...
        
        //Lay everything out.
        treePanel.setPreferredSize(
            new Dimension(300, 150));
        add(treePanel, BorderLayout.CENTER);

        JPanel panel = new JPanel(new GridLayout(0,3));
        panel.add(addButton);
        panel.add(removeButton); 
        panel.add(clearButton);
        add(panel, BorderLayout.SOUTH);
    }
    // ...
}
```java

## Creating the Application

For an application that has a Swing-based GUI, create a class that is a subclass of `javax.swing.JFrame`.

Instantiate your top `JPanel` class and set it as the content pane of the `JFrame` in the application's `main` method. The `main` method of the `DynamicTreeApplication` class invokes the `createGUI` method in the AWT Event Dispatcher thread.

```java
package webstartComponentArch;

import javax.swing.JFrame;

public class DynamicTreeApplication extends JFrame {
    public static void main(String [] args) {
        DynamicTreeApplication app = new DynamicTreeApplication();
        app.createGUI();
    }

    private void createGUI() {
        //Create and set up the content pane.
        DynamicTreePanel newContentPane = new DynamicTreePanel();
        newContentPane.setOpaque(true); 
        setContentPane(newContentPane);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        pack();
        setVisible(true);
    }    
}
```

## Benefits of Separating Core Functionality From the Final Deployment Mechanism

Another way to create an application is to just remove the layer of abstraction (separate top `JPanel`) and lay out all the controls in the application's `main` method itself. The downside to creating the GUI directly in the application's `main` method is that it will be more difficult to deploy your functionality as an applet, if you choose to do so later.

In the Dynamic Tree Demo example, the core functionality is separated into the `DynamicTreePanel` class. It is now trivial to drop the `DynamicTreePanel` class into a `JApplet` and deploy it as an applet.

Hence, to preserve portability and keep deployment options open, follow component-based design as described in this topic.

[[部署-WebStart-examplesIndex|Download source code]] for the *Dynamic Tree Demo* example to experiment further.
---
分类:
  - "网页裁剪"
标题: "How to Write Window Listeners (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/windowlistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write Window Listeners (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)

Documentation

[[Swing-事件监听-intro|Introduction to Event Listeners]]

[[Swing-事件监听-generalrules|General Information about Writing Event Listeners]]

[[Swing-事件监听-eventsandcomponents|Listeners Supported by Swing Components]]

[[Swing-事件监听-handling|Implementing Listeners for Commonly Handled Events]]

[[Swing-事件监听-actionlistener|How to Write an Action Listener]]

[[Swing-事件监听-caretlistener|How to Write a Caret Listener]]

[[Swing-事件监听-changelistener|How to Write a Change Listener]]

[[Swing-事件监听-componentlistener|How to Write a Component Listener]]

[[Swing-事件监听-containerlistener|How to Write a Container Listener]]

[[Swing-事件监听-documentlistener|How to Write a Document Listener]]

[[Swing-事件监听-focuslistener|How to Write a Focus Listener]]

[[Swing-事件监听-internalframelistener|How to Write an Internal Frame Listener]]

[[Swing-事件监听-itemlistener|How to Write an Item Listener]]

[[Swing-事件监听-keylistener|How to Write a Key Listener]]

[[Swing-事件监听-listdatalistener|How to Write a List Data Listener]]

[[Swing-事件监听-listselectionlistener|How to Write a List Selection Listener]]

[[Swing-事件监听-mouselistener|How to Write a Mouse Listener]]

[[Swing-事件监听-mousemotionlistener|How to Write a Mouse-Motion Listener]]

[[Swing-事件监听-mousewheellistener|How to Write a Mouse-Wheel Listener]]

[[Swing-事件监听-propertychangelistener|How to Write a Property Change Listener]]

[[Swing-事件监听-tablemodellistener|How to Write a Table Model Listener]]

[[Swing-事件监听-treeexpansionlistener|How to Write a Tree Expansion Listener]]

[[Swing-事件监听-treemodellistener|How to Write a Tree Model Listener]]

[[Swing-事件监听-treeselectionlistener|How to Write a Tree Selection Listener]]

[[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]]

[[Swing-事件监听-undoableeditlistener|How to Write an Undoable Edit Listener]]

How to Write Window Listeners

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-undoableeditlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-api|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write Window Listeners

This section explains how to implement three kinds of window-related event handlers: `WindowListener`, `WindowFocusListener`, and `WindowStateListener`. All three listeners handle `WindowEvent` objects. The methods in all three event handlers are implemented by the abstract `WindowAdapter` class.

When the appropriate listener has been registered on a window (such as a [[Swing-组件-frame|frame]] or [[Swing-组件-dialog|dialog]]), window events are fired just after the window activity or state has occurred. A window is considered as a "focus owner", if this window receives keyboard input.

The following window activities or states can precede a window event:

- Opening a window — Showing a window for the first time.
- Closing a window — Removing the window from the screen.
- Iconifying a window — Reducing the window to an icon on the desktop.
- Deiconifying a window — Restoring the window to its original size.
- Focused window — The window which contains the "focus owner".
- Activated window (frame or dialog) — This window is either the focused window, or owns the focused window.
- Deactivated window — This window has lost the focus. For more information about focus, see the [AWT Focus Subsystem](https://docs.oracle.com/javase/6/docs/api/java/awt/doc-files/FocusSpec.html) specification.
- Maximizing the window — Increasing a window's size to the maximum allowable size, either in the vertical direction, the horizontal direction, or both directions.
	The `WindowListener` interface defines methods that handle most window events, such as the events for opening and closing the window, activation and deactivation of the window, and iconification and deiconification of the window.
	The other two window listener interfaces are `WindowFocusListener` and `WindowStateListener`. `WindowFocusListener` contains methods to detect when the window becomes the focus owner or it loses the focus owner status. `WindowStateListener` has a single method to detect a change to the state of the window, such as when the window is iconified, deiconified, maximized, or restored to normal.
	While you can use the `WindowListener` methods to detect some window states, such as iconification, there are two reasons why a `WindowStateListener` might be preferable: it has only one method for you to implement, and it provides support for maximization.
	---
	**Note:** Not all window managers/native platforms support all window states. The `java.awt.Toolkit` method [`isFrameStateSupported(int)`](https://docs.oracle.com/javase/8/docs/api/java/awt/Toolkit.html#isFrameStateSupported-int-) can be used to determine whether a particular window state is supported by a particular window manager. The WindowEventDemo example, described later in this section, shows how this method can be used.
	---
	Window listeners are commonly used to implement custom window-closing behavior. For example, a window listener is used to save data before closing the window, or to exit the program when the last window closes.
	A user does not necessarily need to implement a window listener to specify what a window should do when the user closes it. By default, when the user closes a window the window becomes invisible. To specify different behavior, use the `setDefaultCloseOperation` method of the `JFrame` or `JDialog` classes. To implement a window-closing handler, use the `setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE)` method to enable the window listener to provide all window-closing duties. See [[Swing-组件-frame|Responding to Window-Closing Events]] for details on how to use `setDefaultCloseOperation`.
	When the last displayable window within the Java virtual machine (VM) is disposed of, the VM may terminate. Note, however, that there can be a delay before the program exits automatically, and that under some circumstances the program might keep running. It is quicker and safer to explicitly exit the program using `System.exit(int)`. See [AWT Threading Issues](https://docs.oracle.com/javase/8/docs/api/java/awt/doc-files/AWTThreadIssues.html#Autoshutdown) for more information.
	Window listeners are also commonly used to stop threads and release resources when a window is iconified, and to start up again when the window is deiconified. This avoids unnecessarily using the processor or other resources. For example, when a window that contains animation is iconified, it should stop its animation thread and free any large buffers. When the window is deiconified, it can start the thread again and recreate the buffers.
	The following example demonstrates window events. A non-editable text area reports all window events that are fired by its window. This demo implements all methods in the `WindowListener`, `WindowFocusListener`, and `WindowStateListener` interfaces. You can find the demo's code in [`WindowEventDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/WindowEventDemoProject/src/events/WindowEventDemo.java).
	![WindowEventDemo.html](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/WindowEventDemo.png)
	---
	**Try this:**
	1. Click the Launch button to run WindowEventDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#WindowEventDemo).[![Launches the WindowEventDemo application](https://docs.oracle.com/javase/tutorial/images/jws-launch-button.png)](https://docs.oracle.com/javase/tutorialJWS/samples/uiswing/WindowEventDemoProject/WindowEventDemo.jnlp)
	2. When the window appears, several messages are already displayed. One line reports whether your window manager supports MAXIMIZED\_BOTH. If the window manager does not support other window states, this condition is also reported. Next, several lines are displayed, reporting that the window's window listener has received window-opened, activated, and gained-focus events. All the messages displayed in the window are also sent to standard output.
	3. Click another window. The "window lost focus" and "window deactivated" messages will be displayed. If this window is not a frame or a dialog, it will receive the activated or deactivated events.
	4. Click the WindowEventDemo window. You'll see "window activated" and "window gained focus" messages.
	5. Iconify the window, using the window controls. Two iconification messages are displayed, one from the window listener and the other from the window state listener. Unless you are looking at standard output, the messages will not display until the window is deiconified. Window-deactivation and window-lost-focus events are also reported.
	6. De-iconify the window. Two deiconification messages are displayed, one from the window listener and the other from the window state listener. The `windowStateChanged` method in `WindowStateListener` class gives the same information that you get using the `windowIconified` and `windowDeiconified` methods in `WindowListener` class. Window-activation and window-gained-focus events are also reported.
	7. Maximize the window, if your look and feel provides a way to do so. Note that some look and feels running on some window managers, such as the Java look and feel on dtwm, provide a way to maximize the window, but no events are reported. This is because dtwm mimics maximization by resizing the window, but it is not a true maximization event. Some look and feels provide a way to maximize the window in the vertical or horizontal direction *only*. Experiment with your window controls to see what options are available.
	8. Close the window, using the window controls. A window closing message is displayed. Once the window has closed, a window closed message is sent to standard output.
	---
	Here is the demo's window event handling code:
	```java
	public class WindowEventDemo extends JFrame implements WindowListener,
	                                            WindowFocusListener,
	                                            WindowStateListener {
	    ...
	    static WindowEventDemo frame = new WindowEventDemo("WindowEventDemo");
	    JTextArea display;
	    ...
	    private void addComponentsToPane() {
	        display = new JTextArea();
	        display.setEditable(false);
	        JScrollPane scrollPane = new JScrollPane(display);
	        scrollPane.setPreferredSize(new Dimension(500, 450));
	        getContentPane().add(scrollPane, BorderLayout.CENTER);
	        
	        addWindowListener(this);
	        addWindowFocusListener(this);
	        addWindowStateListener(this);
	        
	        checkWM();
	    }
	    
	    public WindowEventDemo(String name) {
	        super(name);
	    }
	    //Some window managers don't support all window states.
	  
	    public void checkWM() {
	        Toolkit tk = frame.getToolkit();
	        if (!(tk.isFrameStateSupported(Frame.ICONIFIED))) {
	            displayMessage(
	                    "Your window manager doesn't support ICONIFIED.");
	        }  else displayMessage(
	                "Your window manager supports ICONIFIED.");
	        if (!(tk.isFrameStateSupported(Frame.MAXIMIZED_VERT))) {
	            displayMessage(
	                    "Your window manager doesn't support MAXIMIZED_VERT.");
	        }  else displayMessage(
	                "Your window manager supports MAXIMIZED_VERT.");
	        if (!(tk.isFrameStateSupported(Frame.MAXIMIZED_HORIZ))) {
	            displayMessage(
	                    "Your window manager doesn't support MAXIMIZED_HORIZ.");
	        } else displayMessage(
	                "Your window manager supports MAXIMIZED_HORIZ.");
	        if (!(tk.isFrameStateSupported(Frame.MAXIMIZED_BOTH))) {
	            displayMessage(
	                    "Your window manager doesn't support MAXIMIZED_BOTH.");
	        } else {
	            displayMessage(
	                    "Your window manager supports MAXIMIZED_BOTH.");
	        }
	    }
	    public void windowClosing(WindowEvent e) {
	        displayMessage("WindowListener method called: windowClosing.");
	        //A pause so user can see the message before
	        //the window actually closes.
	        ActionListener task = new ActionListener() {
	            boolean alreadyDisposed = false;
	            public void actionPerformed(ActionEvent e) {
	                if (frame.isDisplayable()) {
	                    alreadyDisposed = true;
	                    frame.dispose();
	                }
	            }
	        };
	        Timer timer = new Timer(500, task); //fire every half second
	        timer.setInitialDelay(2000);        //first delay 2 seconds
	        timer.setRepeats(false);
	        timer.start();
	    }
	    public void windowClosed(WindowEvent e) {
	        //This will only be seen on standard output.
	        displayMessage("WindowListener method called: windowClosed.");
	    }
	    public void windowOpened(WindowEvent e) {
	        displayMessage("WindowListener method called: windowOpened.");
	    }
	    public void windowIconified(WindowEvent e) {
	        displayMessage("WindowListener method called: windowIconified.");
	    }
	    public void windowDeiconified(WindowEvent e) {
	        displayMessage("WindowListener method called: windowDeiconified.");
	    }
	    public void windowActivated(WindowEvent e) {
	        displayMessage("WindowListener method called: windowActivated.");
	    }
	    public void windowDeactivated(WindowEvent e) {
	        displayMessage("WindowListener method called: windowDeactivated.");
	    }
	    public void windowGainedFocus(WindowEvent e) {
	        displayMessage("WindowFocusListener method called: windowGainedFocus.");
	    }
	    public void windowLostFocus(WindowEvent e) {
	        displayMessage("WindowFocusListener method called: windowLostFocus.");
	    }
	    public void windowStateChanged(WindowEvent e) {
	        displayStateMessage(
	          "WindowStateListener method called: windowStateChanged.", e);
	    }
	    void displayMessage(String msg) {
	        display.append(msg + newline);
	        System.out.println(msg);
	    }
	    void displayStateMessage(String prefix, WindowEvent e) {
	        int state = e.getNewState();
	        int oldState = e.getOldState();
	        String msg = prefix
	                   + newline + space
	                   + "New state: "
	                   + convertStateToString(state)
	                   + newline + space
	                   + "Old state: "
	                   + convertStateToString(oldState);
	        displayMessage(msg);
	    }
	    String convertStateToString(int state) {
	        if (state == Frame.NORMAL) {
	            return "NORMAL";
	        }
	        String strState = " ";
	        if ((state & Frame.ICONIFIED) != 0) {
	            strState += "ICONIFIED";
	        }
	        //MAXIMIZED_BOTH is a concatenation of two bits, so
	        //we need to test for an exact match.
	        if ((state & Frame.MAXIMIZED_BOTH) == Frame.MAXIMIZED_BOTH) {
	            strState += "MAXIMIZED_BOTH";
	        } else {
	            if ((state & Frame.MAXIMIZED_VERT) != 0) {
	                strState += "MAXIMIZED_VERT";
	            }
	            if ((state & Frame.MAXIMIZED_HORIZ) != 0) {
	                strState += "MAXIMIZED_HORIZ";
	            }
	            if (" ".equals(strState)){
	                strState = "UNKNOWN";
	            }
	        }
	        return strState.trim();
	    }
	}
	```
	## The Window Listener API
	The window listener API consists of three window listener interfaces and the `WindowEvent` class. Their methods are listed in the following tables:
	- [The WindowListener Interface](#windowlistener)
		- [The WindowFocusListener Interface](#windowfocuslistener)
		- [The WindowStateListener Interface](#windowstatelistener)
		- [The WindowEvent Class](#windowevent)
	The methods from all three interfaces are available through the [`WindowAdapter`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowAdapter.html) class.
	The WindowListener Interface
	| Method | Purpose |
	| --- | --- |
	| [windowOpened(WindowEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowListener.html#windowOpened-java.awt.event.WindowEvent-) | Called just after the listened-to window has been shown for the first time. |
	| [windowClosing(WindowEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowListener.html#windowClosing-java.awt.event.WindowEvent-) | Called in response to a user request for the listened-to window to be closed. To actually close the window, the listener should invoke the window's `dispose` or `setVisible(false)` method. |
	| [windowClosed(WindowEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowListener.html#windowClosed-java.awt.event.WindowEvent-) | Called just after the listened-to window has closed. |
	| [windowIconified(WindowEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowListener.html#windowIconified-java.awt.event.WindowEvent-)   [windowDeiconified(WindowEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowListener.html#windowDeiconified-java.awt.event.WindowEvent-) | Called just after the listened-to window is iconified or deiconified, respectively. |
	| [windowActivated(WindowEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowListener.html#windowActivated-java.awt.event.WindowEvent-)   [windowDeactivated(WindowEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowListener.html#windowDeactivated-java.awt.event.WindowEvent-) | Called just after the listened-to window is activated or deactivated, respectively. These methods are not sent to windows that are not frames or dialogs. For this reason, the `windowGainedFocus` and `windowLostFocus` methods to determine when a window gains or loses the focus are preferred. |
	The WindowFocusListener Interface
	| Method | Purpose |
	| --- | --- |
	| [windowGainedFocus(WindowEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowFocusListener.html#windowGainedFocus-java.awt.event.WindowEvent-)   [windowLostFocus(WindowEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowFocusListener.html#windowLostFocus-java.awt.event.WindowEvent-) | Called just after the listened-to window gains or loses the focus, respectively. |
	The WindowStateListener Interface
	| Method | Purpose |
	| --- | --- |
	| [windowStateChanged(WindowEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowStateListener.html#windowStateChanged-java.awt.event.WindowEvent-) | Called just after the listened-to window's state is changed by being iconified, deiconified, maximized, or returned to normal. The state is available through the `WindowEvent` as a bitwise mask. The possible values, defined in `java.awt.Frame`, are: - NORMAL. Indicates that no state bits are set. - ICONIFIED. - MAXIMIZED\_HORIZ. - MAXIMIZED\_VERT. - MAXIMIZED\_BOTH. Concatenates `MAXIMIZED_HORIZ` and `MAXIMIZED_VERT`. A window manager may support `MAXIMIZED_BOTH`, while not supporting `MAXIMIZED_HORIZ` or `MAXIMIZED_VERT`. The [`java.awt.Toolkit`](https://docs.oracle.com/javase/8/docs/api/java/awt/Toolkit.html) method [`isFrameStateSupported(int)`](https://docs.oracle.com/javase/8/docs/api/java/awt/Toolkit.html#isFrameStateSupported-int-) can be used to determine what states are supported by the window manager. |
	The WindowEvent Class
	| Method | Purpose |
	| --- | --- |
	| [Window getWindow()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowEvent.html#getWindow--) | Returns the window that fired the event. You can use this instead of the `getSource` method. |
	| [Window getOppositeWindow()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowEvent.html#getOppositeWindow--) | Returns the other window involved in this focus or activation change. For a `WINDOW_ACTIVATED` or `WINDOW_GAINED_FOCUS` event, this returns the window that lost activation or the focus. For a `WINDOW_DEACTIVATED` or `WINDOW_LOST_FOCUS` event, this returns the window that gained activation or the focus. For any other type of `WindowEvent` with a Java application in a different VM or context, or with no other window, `null` is returned. |
	| [int getOldState()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowEvent.html#getOldState--)   [int getNewState()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/WindowEvent.html#getNewState--) | For `WINDOW_STATE_CHANGED` events, these methods return the previous or new state of the window as a bitwise mask. |
	## Examples that Use Window Listeners
	The following table lists the examples that use window listeners.
	| Example | Where Described | Notes |
	| --- | --- | --- |
	| [`WindowEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#WindowEventDemo) | This section | Reports all window events that occur on one window to demonstrate the circumstances under which window events are fired. |
	| [`SliderDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SliderDemo) | [[Swing-滑块|How to Use Sliders]] | Listens for window iconify and deiconify events, so that it can stop the animation when the window isn't visible. |
	| [`InternalFrameEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#InternalFrameEventDemo) | [[Swing-事件监听-internalframelistener|How to Write an Internal Frame Listener]] | Reports all internal frame events that occur on one internal frame to demonstrate the circumstances under which internal frame events are fired. Internal frame events are similar to window events. |
	| [`DialogDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#DialogDemo) | [[Swing-组件-generaltext|Text Component Features]] | [`CustomDialog.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/DialogDemoProject/src/components/CustomDialog.java) uses `setDefaultCloseOperation` instead of a window listener to determine what action to take when the user closes the window. |
	| [`Framework`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#Framework) | — | A demo that allows multiple windows to be created and destroyed. |
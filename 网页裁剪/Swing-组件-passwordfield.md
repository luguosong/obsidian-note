---
分类:
  - "网页裁剪"
标题: "How to Use Password Fields (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/passwordfield.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-组件-toplevel|Using Top-Level Containers]]

[[Swing-组件-jcomponent|The JComponent Class]]

[[Swing-组件-text|Using Text Components]]

[[Swing-组件-generaltext|Text Component Features]]

[[Swing-组件-textapi|The Text Component API]]

[[Swing-组件-componentlist|How to Use Various Components]]

[[Swing-组件-applet|How to Make Applets]]

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

How to Use Password Fields

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

[[Swing-组件-panel|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-progress|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Use Password Fields

The [`JPasswordField`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPasswordField.html) class, a subclass of `JTextField`, provides specialized text fields for password entry. For security reasons, a password field does not show the characters that the user types. Instead, the field displays a character different from the one typed, such as an asterisk '\*'. As another security precaution, a password field stores its value as an array of characters, rather than as a string. Like an ordinary [[Swing-组件-textfield|text field]], a password field fires an [[Swing-事件监听-actionlistener|action event]] when the user indicates that text entry is complete, for example by pressing the Enter button.

Here is a picture of a demo that opens a small window and prompts the user to type in a password.

![A snapshot of PasswordDemo, which uses a password field](https://docs.oracle.com/javase/tutorial/figures/uiswing/components/PasswordDemo.png)

Click the Launch button to run PasswordDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#PasswordDemo).

The password is "bugaboo". The password "bugaboo" is an example only. Use secure authentication methods in production systems. You can find the entire code for this program in [`` `PasswordDemo.java` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/PasswordDemoProject/src/components/PasswordDemo.java). Here is the code that creates and sets up the password field:

```
passwordField = new JPasswordField(10);
passwordField.setActionCommand(OK);
passwordField.addActionListener(this);
```

The argument passed into the `JPasswordField` constructor indicates the preferred size of the field, which is at least 10 columns wide in this case. By default a password field displays a dot for each character typed. If you want to change the echo character, call the `setEchoChar` method. The code then adds an action listener to the password field, which checks the value typed in by the user. Here is the implementation of the action listener's `actionPerformed` method:

```java
public void actionPerformed(ActionEvent e) {
    String cmd = e.getActionCommand();

    if (OK.equals(cmd)) { //Process the password.
        char[] input = passwordField.getPassword();
        if (isPasswordCorrect(input)) {
            JOptionPane.showMessageDialog(controllingFrame,
                "Success! You typed the right password.");
        } else {
            JOptionPane.showMessageDialog(controllingFrame,
                "Invalid password. Try again.",
                "Error Message",
                JOptionPane.ERROR_MESSAGE);
        }

        //Zero out the possible password, for security.
        Arrays.fill(input, '0');

        passwordField.selectAll();
        resetFocus();
    } else ...//handle the Help button...
}
```

---

**Security note:** To further enhance security, once you are finished with the character array returned by the `getPassword` method, you should set each of its elements to zero. The preceding code snippet shows how to do this.

---

A program that uses a password field typically validates the password before completing any actions that require the password. This program calls a private method, `isPasswordCorrect`, that compares the value returned by the `getPassword` method to a value stored in a character array. Here is its code:

```
private static boolean isPasswordCorrect(char[] input) {
    boolean isCorrect = true;
    char[] correctPassword = { 'b', 'u', 'g', 'a', 'b', 'o', 'o' };

    if (input.length != correctPassword.length) {
        isCorrect = false;
    } else {
        isCorrect = Arrays.equals (input, correctPassword);
    }

    //Zero out the password.
    Arrays.fill(correctPassword,'0');

    return isCorrect;
}
```

## The Password Field API

The following tables list the commonly used `JPasswordField` constructors and methods. For information on the API that password fields inherit, see [[Swing-组件-textfield|How to Use Text Fields]].

| Constructor or Method | Purpose |
| --- | --- |
| [JPasswordField()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPasswordField.html#JPasswordField--)   [JPasswordField(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPasswordField.html#JPasswordField-java.lang.String-)   [JPasswordField(String, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPasswordField.html#JPasswordField-java.lang.String-int-)   [JPasswordField(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPasswordField.html#JPasswordField-int-)   [JPasswordField(Document, String, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPasswordField.html#JPasswordField-javax.swing.text.Document-java.lang.String-int-) | Creates a password field. When present, the `int` argument specifies the desired width in columns. The `String` argument contains the field's initial text. The `Document` argument provides a custom model for the field. |
| [char\[\] getPassword()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPasswordField.html#getPassword--) | Returns the password as an array of characters. |
| [void setEchoChar(char)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPasswordField.html#setEchoChar-char-)   [char getEchoChar()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JPasswordField.html#getEchoChar--) | Sets or gets the echo character which is displayed instead of the actual characters typed by the user. |
| [void addActionListener(ActionListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#addActionListener-java.awt.event.ActionListener-)   [void removeActionListener(ActionListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#removeActionListener-java.awt.event.ActionListener-)   *(defined in `JTextField`)* | Adds or removes an action listener. |
| [void selectAll()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#selectAll--)   *(defined in `JTextComponent`)* | Selects all characters in the password field. |

## Examples That Use Password Fields

[PasswordDemo](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#PasswordDemo) is the Tutorial's only example that uses a `JPasswordField` object. However, the Tutorial has many examples that use `JTextField` objects, whose API is inherited by `JPasswordField`. See [[Swing-组件-textfield|Examples That Use Text Fields]] for further information.

If you are programming in JavaFX, see [Password Fields](https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/password-field.htm).
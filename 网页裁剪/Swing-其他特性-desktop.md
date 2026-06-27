---
分类:
  - "网页裁剪"
标题: "How to Integrate with the Desktop Class (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Other Swing Features)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/misc/desktop.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

How to Integrate with the Desktop Class

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

[[Swing-其他特性-splashscreen|How to Create a Splash Screen]]

[[Swing-其他特性-systemtray|How to Use the System Tray]]

[[Swing-其他特性-problems|Solving Common Problems Using Other Swing Features]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Integrate with the Desktop Class

Java™ Standard Edition version 6 narrows the gap between performance and integration of native applications and Java applications. Along with the new [[Swing-其他特性-systemtray|system tray]] functionality, [[Swing-其他特性-splashscreen|splash screen]] support, and enhanced [[Swing-其他特性-printtable|printing for JTables]], Java SE version 6 provides the Desktop API (`java.awt.Desktop`) API, which allows Java applications to interact with default applications associated with specific file types on the host platform.

New functionality is provided by the [`Desktop`](https://docs.oracle.com/javase/8/docs/api/java/awt/Desktop.html) class. The API arises from the JDesktop Integration Components (JDIC) project. The goal of the JDIC project is to make "Java technology-based applications first-class citizens" of the desktop, enabling seamless integration. JDIC provides Java applications with access to functionalities and facilities provided by the native desktop. Regarding the new Desktop API, this means that a Java application can perform the following operations:

- Launch the host system's default browser with a specific Uniform Resource Identifier (URI)
- Launch the host system's default email client
- Launch applications to open, edit, or print files associated with those applications

---

**Note:**

The Desktop API uses the host operating system's file associations to launch applications associated with specific file types. For example, if OpenDocument text (.odt) file extensions are associated with the OpenOffice Writer application, a Java application could launch OpenOffice Writer to open, edit, or even print files with that association. Depending on the host system, different applications may be associated with different actions. For example, if a particular file cannot be printed, check first whether its extension has a printing association on the given operating system.

---

Use the [`isDesktopSupported()`](https://docs.oracle.com/javase/8/docs/api/java/awt/Desktop.html#isDesktopSupported--) method to determine whether the Desktop API is available. On the Solaris Operating System and the Linux platform, this API is dependent on Gnome libraries. If those libraries are unavailable, this method will return false. After determining that the Desktop API is supported, that is, the `isDesktopSupported()` returns true, the application can retrieve a `Desktop` instance using the static method [`getDesktop()`](https://docs.oracle.com/javase/8/docs/api/java/awt/Desktop.html#getDesktop--).

If an application runs in an environment without a keyboard, mouse, or monitor (a "headless" environment), the `getDesktop()` method throws a `java.awt.HeadlessException`.

Once retrieved, the `Desktop` instance allows an application to browse, mail, open, edit, or even print a file or URI, but only if the retrieved `Desktop` instance supports these activities. Each of these activities is called an action, and each is represented as a `Desktop.Action` enumeration instance:

- `BROWSE` — Represents a browse action performed by the host's default browser.
- `MAIL` — Represents a mail action performed by the host's default email client.
- `OPEN` — Represents an open action performed by an application associated with opening a specific file type.
- `EDIT` — Represents an edit action performed by an application associated with editing a specific file type
- `PRINT` — Represents a print action performed by an application associated with printing a specific file type.

Different applications may be registered for these different actions even on the same file type. For example, the Firefox browser may be launched for the OPEN action, Emacs for the EDIT action, and yet a different application for the PRINT action. Your host desktop's associations are used to determine which application should be invoked. The ability to manipulate desktop file associations is not possible with the current version of the Desktop API in JDK 6, and those associations can be created or changed only with platform-dependent tools at this time.

The following example shows the capabilities mentioned above.

---

**Try this:**
1. Compile and run the example, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#DesktopDemo).
2. The DesktopDemo dialog box will appear.
	![DesktopDemo application.](https://docs.oracle.com/javase/tutorial/figures/uiswing/misc/desktopdemo.png)
3. Enter an URI value into the URI text field, for example – `https://docs.oracle.com/javase/tutorial`.
4. Press the Launch Browser button.
5. Ensure that the default browser window opens and the Tutorial main page is loaded.
6. Change URI to an arbitrary value, press the Launch Browser button, and ensure that the web page you requested is loaded successfully.
7. Switch back to the DesktopDemo dialog box and enter a mail recipient name in the E-mail text field. You can also use the `mailto` scheme supporting CC, BCC, SUBJECT, and BODY fields, for example – `duke@example.com?SUBJECT=Hello Duke!`.
8. Press the Launch Mail button.
9. The compositing dialog box of the default email client will appear. Be sure that the To and Subject fields are as follows.
10. You can continue to compose a message or try to enter different combinations of the mail schema in the E-mail field.
11. Switch back to the DesktopDemo dialog box and press the ellipsis button to choose any text file.
12. Select either Open, Edit, or Print to set the type of operation, then press the Launch Application button.
13. Be sure that operation completes correctly. Try other file formats, for example `.odt`, `.html`, `.pdf`. Note: If you try to edit `.pdf` file, the DesktopDemo returns the following message: `Cannot perform the given operation to the <file name> file`

The following code snippets provide more details on the DeskDemo application implementation. The DesktopDemo constructor disables the few components right after instantiating the UI and checks whether the Desktop API is available.

```
public DesktopDemo() {
       // init all GUI components
       initComponents();
       // disable buttons that launch browser, email client,
       // disable buttons that open, edit, print files
       disableActions();
       // before any Desktop APIs are used, first check whether the API is
       // supported by this particular VM on this particular host
       if (Desktop.isDesktopSupported()) {
           desktop = Desktop.getDesktop();
           // now enable buttons for actions that are supported.
           enableSupportedActions();
       }
       ...

   /**
    * Disable all graphical components until we know
    * whether their functionality is supported.
    */
   private void disableActions() {
       txtBrowserURI.setEnabled(false);
       btnLaunchBrowser.setEnabled(false);
       
       txtMailTo.setEnabled(false);
       btnLaunchEmail.setEnabled(false);
       
       rbEdit.setEnabled(false);
       rbOpen.setEnabled(false);
       rbPrint.setEnabled(false);

       txtFile.setEnabled(false);
       btnLaunchApplication.setEnabled(false);        
   }
   

  ...
```

Once a Desktop object is acquired, you can query the object to find out which specific actions are supported. If the Desktop object does not support specific actions, or if the Desktop API itself is unsupported, DesktopDemo simply keeps the affected graphical components disabled.

```
/**
     * Enable actions that are supported on this host.
     * The actions are the following: open browser, 
     * open email client, and open, edit, and print
     * files using their associated application.
     */
    private void enableSupportedActions() {
        if (desktop.isSupported(Desktop.Action.BROWSE)) {
            txtBrowserURI.setEnabled(true);
            btnLaunchBrowser.setEnabled(true);
        }
        
        if (desktop.isSupported(Desktop.Action.MAIL)) {
            txtMailTo.setEnabled(true);
            btnLaunchEmail.setEnabled(true);
        }

        if (desktop.isSupported(Desktop.Action.OPEN)) {
            rbOpen.setEnabled(true);
        }
        if (desktop.isSupported(Desktop.Action.EDIT)) {
            rbEdit.setEnabled(true);
        }
        if (desktop.isSupported(Desktop.Action.PRINT)) {
            rbPrint.setEnabled(true);
        }
        
        if (rbEdit.isEnabled() || rbOpen.isEnabled() || rbPrint.isEnabled()) {
            txtFile.setEnabled(true);
            btnLaunchApplication.setEnabled(true);
        }
    }
```

The `browse(uri)` method can throw a variety of exceptions, including a NullPointerException if the URI is null, and an UnsupportedOperationException if the BROWSE action is unsupported. This method can throw an IOException if the default browser or application cannot be found or launched, and a SecurityException if a security manager denies the invocation.

```
private void onLaunchBrowser(ActionEvent evt) {
        URI uri = null;
        try {
            uri = new URI(txtBrowserURI.getText());
            desktop.browse(uri);
        } catch(IOException ioe) {
            System.out.println("The system cannot find the " + uri + 
                " file specified");
            //ioe.printStackTrace();
        } catch(URISyntaxException use) {
            System.out.println("Illegal character in path");
            //use.printStackTrace();
        }
    }
```

Applications can launch the host's default email client, if that action is supported, by calling the `mail(uriMailTo)` method of this Desktop instance.

```
private void onLaunchMail(ActionEvent evt) {
        String mailTo = txtMailTo.getText();
        URI uriMailTo = null;
        try {
            if (mailTo.length() > 0) {
                uriMailTo = new URI("mailto", mailTo, null);
                desktop.mail(uriMailTo);
            } else {
                desktop.mail();
            }
        } catch(IOException ioe) {
            ioe.printStackTrace();
        } catch(URISyntaxException use) {
            use.printStackTrace();
        }
    }
```

Java applications can open, edit, and print files from their associated application using the `open()`, `edit()`, and `print()` methods of the `Desktop` class, respectively.

```
private void onLaunchDefaultApplication(ActionEvent evt) {
        String fileName = txtFile.getText();
        File file = new File(fileName);
        
        try {
            switch(action) {
                case OPEN:
                    desktop.open(file);
                    break;
                case EDIT:
                    desktop.edit(file);
                    break;
                case PRINT:
                    desktop.print(file);
                    break;
            }
        } catch (IOException ioe) {
            //ioe.printStackTrace();
            System.out.println("Cannot perform the given operation 
                to the " + file + " file");
        }
    }
```

The complete code for this demo is available in the [`DesktopDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/DesktopDemoProject/src/misc/DesktopDemo.java) file.

## The Desktop API

The `Desktop` class allows Java applications to launch the native desktop applications that handle URIs or files.

| Method | Purpose |
| --- | --- |
| [isDesktopSupported()](https://docs.oracle.com/javase/8/docs/api/java/awt/Desktop.html#isDesktopSupported--) | Tests whether this class is supported on the current platform. If it is supported, use `getDesktop()` to retrieve an instance. |
| [getDesktop()](https://docs.oracle.com/javase/8/docs/api/java/awt/Desktop.html#getDesktop--) | Returns the `Desktop` instance of the current browser context. On some platforms the Desktop API may not be supported. Use the `isDesktopSupported()` method to determine if the current desktop is supported. |
| [isSupported(Desktop.Action)](https://docs.oracle.com/javase/8/docs/api/java/awt/Desktop.html#isSupported-java.awt.Desktop.Action-) | Tests whether an action is supported on the current platform. Use the following constants of the `Desktop.Action` enum: `BROWSE`, `EDIT`, `MAIL`, `OPEN`, `PRINT`. |
| [browse(URI)](https://docs.oracle.com/javase/8/docs/api/java/awt/Desktop.html#browse-java.net.URI-) | Launches the default browser to display a URI. If the default browser is not able to handle the specified URI, the application registered for handling URIs of the specified type is invoked. The application is determined from the protocol and path of the URI, as defined by the `URI` class. |
| [mail(URI)](https://docs.oracle.com/javase/8/docs/api/java/awt/Desktop.html#mail-java.net.URI-) | Launches the mail composing window of the user default mail client, filling the message fields specified by a `mailto: URI`. |
| [open(File)](https://docs.oracle.com/javase/8/docs/api/java/awt/Desktop.html#open-java.io.File-) | Launches the associated application to open a file. |
| [edit(File)](https://docs.oracle.com/javase/8/docs/api/java/awt/Desktop.html#edit-java.io.File-) | Launches the associated editor application and opens a file for editing. |
| [print(File)](https://docs.oracle.com/javase/8/docs/api/java/awt/Desktop.html#print-java.io.File-) | Prints a file with the native desktop printing facility, using the associated application's print command. |

## Examples That Use Desktop API

The following table lists the example that uses the Desktop class integration.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`DesktopDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#DesktopDemo) | This section | Launches the host system's default browser with the specified URI and default email client; launches an application to open, edit, or print a file. |
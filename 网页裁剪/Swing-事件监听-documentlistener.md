---
分类:
  - "网页裁剪"
标题: "How to Write a Document Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/documentlistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

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

How to Write a Document Listener

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

[[Swing-事件监听-windowlistener|How to Write Window Listeners]]

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-containerlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-focuslistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Document Listener

A Swing text component uses a [`Document`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html) to represent its content. Document events occur when the content of a document changes in any way. You attach a document listener to a text component's document, rather than to the text component itself. See [[Swing-组件-generaltext|Implementing a Document Filter]] for more information.

The following example demonstrates document events on two plain text components.

![This screenshot demonstrates the output of DocumentEventDemo example.](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/DocumentEventDemo.png)

---

**Try this:**
1. Click the Launch button to run DocumentEventDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#Beeper).
2. Type in the text field at the upper left of the window or the text area beneath the text field.  
	One document event is fired for each character typed.
3. Delete text with the backspace key.  
	One document event is fired for each backspace key typed.
4. Select text and then delete it by typing backspace or by using a keyboard command such as `CTRL-X` (cut).  
	One document event is fired for the entire deletion.
5. Copy text from one text component into the other using keyboard commands such as `CTRL-C` (copy) and `CTRL-V` (paste).  
	One document event is fired for the entire paste operation regardless of the length of the text pasted. If text is selected in the target text component before the paste command is issued, an additional document event is fired because the selected text is deleted first.

---

You can find the demo's code in [`DocumentEventDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/DocumentEventDemoProject/src/events/DocumentEventDemo.java). Here is the demo's document event handling code:

```
public class DocumentEventDemo ... {
    ...//where initialization occurs:
    textField = new JTextField(20);
    textField.addActionListener(new MyTextActionListener());
    textField.getDocument().addDocumentListener(new MyDocumentListener());
    textField.getDocument().putProperty("name", "Text Field");

    textArea = new JTextArea();
    textArea.getDocument().addDocumentListener(new MyDocumentListener());
    textArea.getDocument().putProperty("name", "Text Area");
    ...

class MyDocumentListener implements DocumentListener {
    String newline = "\n";
 
    public void insertUpdate(DocumentEvent e) {
        updateLog(e, "inserted into");
    }
    public void removeUpdate(DocumentEvent e) {
        updateLog(e, "removed from");
    }
    public void changedUpdate(DocumentEvent e) {
        //Plain text components do not fire these events
    }

    public void updateLog(DocumentEvent e, String action) {
        Document doc = (Document)e.getDocument();
        int changeLength = e.getLength();
        displayArea.append(
            changeLength + " character" +
            ((changeLength == 1) ? " " : "s ") +
            action + doc.getProperty("name") + "." + newline +
            "  Text length = " + doc.getLength() + newline);
    }
}
```

Document listeners should not modify the contents of the document; The change is already complete by the time the listener is notified of the change. Instead, write a custom document that overrides the `insertString` or `remove` methods, or both. See [[Swing-组件-generaltext|Listening for Changes on a Document]] for details.

## The Document Listener API

The DocumentListener Interface

*`DocumentListener` has no adapter class.*

| Method | Purpose |
| --- | --- |
| [changedUpdate(DocumentEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/DocumentListener.html#changedUpdate-javax.swing.event.DocumentEvent-) | Called when the style of some of the text in the listened-to document changes. This sort of event is fired only from a `StyledDocument` — a `PlainDocument` does not fire these events. |
| [insertUpdate(DocumentEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/DocumentListener.html#insertUpdate-javax.swing.event.DocumentEvent-) | Called when text is inserted into the listened-to document. |
| [removeUpdate(DocumentEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/DocumentListener.html#removeUpdate-javax.swing.event.DocumentEvent-) | Called when text is removed from the listened-to document. |

The DocumentEvent Interface

Each document event method is passed an object that implements the `DocumentEvent` interface. Typically, this is an instance of [`DefaultDocumentEvent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/AbstractDocument.DefaultDocumentEvent.html), defined in `AbstractDocument`.

| Method | Purpose |
| --- | --- |
| [Document getDocument()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/DocumentEvent.html#getDocument--) | Returns the document that fired the event. Note that the `DocumentEvent` interface does not inherit from `EventObject`. Therefore, it does not inherit the `getSource` method. |
| [int getLength()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/DocumentEvent.html#getLength--) | Returns the length of the change. |
| [int getOffset()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/DocumentEvent.html#getOffset--) | Returns the location within the document of the first character changed. |
| [ElementChange getChange(Element)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/DocumentEvent.html#getChange-javax.swing.text.Element-) | Returns details about what elements in the document have changed and how. [`ElementChange`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/DocumentEvent.ElementChange.html) is an interface defined within the `DocumentEvent` interface. |
| [EventType getType()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/DocumentEvent.html#getType--) | Returns the type of change that occurred. [`EventType`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/DocumentEvent.EventType.html) is a class defined within the `DocumentEvent` interface that enumerates the possible changes that can occur on a document: insert text, remove text, and change text style. |

## Examples that Use Document Listeners

The following table lists the examples that use document listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`DocumentEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#DocumentEventDemo) | This section | Reports all document events that occur on the documents for both a text field and a text area. One listener listens to both text components and uses a client property on the document to determine which component fired the event. |
| [`TextComponentDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextComponentDemo) | [[Swing-组件-generaltext|Listening for Changes on a Document]] | Updates a change log every time text in the listened-to document changes. The document in this example supports styled text, so `changedUpdate` gets called in this example. Requires this additional source file: [`DocumentSizeFilter`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#DocumentSizeFilter) |
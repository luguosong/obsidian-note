---
分类:
  - "网页裁剪"
标题: "The Text Component API (The Java™ Tutorials >        
            Creating a GUI With Swing > Using Swing Components)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/components/textapi.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-组件-toplevel|Using Top-Level Containers]]

[[Swing-组件-jcomponent|The JComponent Class]]

[[Swing-组件-text|Using Text Components]]

[[Swing-组件-generaltext|Text Component Features]]

The Text Component API

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

[[Swing-组件-generaltext|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-组件-componentlist|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## The Text Component API

This section lists commonly used parts of the API that are shared by text components. Much of this API is defined by the [`JTextComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html) class. [[Swing-组件-generaltext|Text Component Features]] discusses how to use some of this API.

[[Swing-组件-jcomponent|The JComponent Class]] describes the API that text components inherit from `JComponent`. For information about the API related to specific text components, see the how-to page for that component: [[Swing-组件-textfield|text field]], [[Swing-组件-passwordfield|password field]], [[Swing-组件-formattedtextfield|formatted text field]], [[Swing-组件-textarea|text area]], or [[Swing-组件-editorpane|editor pane and text pane]].

For complete details about the text API, see the API documentation for [`JTextComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html) and for the various classes and interfaces in the [text package](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/package-summary.html).

The API listed in this section includes the following categories:

| Method | Description |
| --- | --- |
| [void setEditable(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setEditable-boolean-)   [boolean isEditable()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#isEditable--) | Sets or indicates whether the user can edit the text in the text component. |
| [void setDragEnabled(boolean)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setDragEnabled-boolean-)   [boolean getDragEnabled()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getDragEnabled--) | Sets or gets the `dragEnabled` property, which must be true to enable drag handling on this component. The default value is false. See [[Swing-拖放|Drag and Drop and Data Transfer]] for more details. |
| [void setDisabledTextColor(Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setDisabledTextColor-java.awt.Color-)   [Color getDisabledTextColor()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getDisabledTextColor--) | Sets or gets the color used to display text when the text component is disabled. |
| [void setMargin(Insets)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setMargin-java.awt.Insets-)   [Insets getMargin()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getMargin--) | Sets or gets the margin between the text and the text component's border. |

| Method | Description |
| --- | --- |
| [String getSelectedText()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getSelectedText--) | Gets the currently selected text. |
| [void selectAll()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#selectAll--)   [void select(int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#select-int-int-) | Selects all text or selects text within a start and end range. |
| [void setSelectionStart(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setSelectionStart-int-)   [void setSelectionEnd(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setSelectionEnd-int-)   [int getSelectionStart()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getSelectionStart--)   [int getSelectionEnd()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getSelectionEnd--) | Sets or gets the extent of the current selection by index. |
| [void setSelectedTextColor(Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setSelectedTextColor-java.awt.Color-)   [Color getSelectedTextColor()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getSelectedTextColor--) | Sets or gets the color of selected text. |
| [void setSelectionColor(Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setSelectionColor-java.awt.Color-)   [Color getSelectionColor()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getSelectionColor--) | Sets or gets the background color of selected text. |

| Method | Description |
| --- | --- |
| [int viewToModel(Point)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#viewToModel-java.awt.Point-) | Converts the specified point in the view coordinate system to a position within the text. |
| [Rectangle modelToView(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#modelToView-int-) | Converts the specified position within the text to a rectangle in the view coordinate system. |

| Class or Method | Description |
| --- | --- |
| [void cut()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#cut--)   [void copy()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#copy--)   [void paste()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#paste--)   [void replaceSelection(String)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#replaceSelection-java.lang.String-)   *(in `JTextComponent`)* | Cuts, copies, and pastes text using the system clipboard, or replaces the selected text with the string specified by an argument, respectively. |
| [EditorKit](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/EditorKit.html) | Provides a text component's view factory, document, caret, and actions, as well as reading and writing documents of a particular format. |
| [DefaultEditorKit](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.html) | A concrete subclass of `EditorKit` that provides the basic text editing capabilities. |
| [StyledEditorKit](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/StyledEditorKit.html) | A subclass of `Default EditorKit` that provides additional editing capabilities for styled text. |
| [String *xxxx* Action](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.html#field_summary)   *(in `DefaultEditorKit`)* | The names of all the actions supported by the default editor kit. See [[Swing-组件-generaltext|Associating Text Actions with Menus and Buttons]]. |
| [BeepAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.BeepAction.html)   [CopyAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.CopyAction.html)   [CutAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.CutAction.html)   [DefaultKeyTypedAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.DefaultKeyTypedAction.html)   [InsertBreakAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.InsertBreakAction.html)   [InsertContentAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.InsertContentAction.html)   [InsertTabAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.InsertTabAction.html)   [PasteAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultEditorKit.PasteAction.html)   *(in `DefaultEditorKit`)* | Inner classes that implement various text editing commands. |
| [AlignmentAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/StyledEditorKit.AlignmentAction.html)   [BoldAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/StyledEditorKit.BoldAction.html)   [FontFamilyAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/StyledEditorKit.FontFamilyAction.html)   [FontSizeAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/StyledEditorKit.FontSizeAction.html)   [ForegroundAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/StyledEditorKit.ForegroundAction.html)   [ItalicAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/StyledEditorKit.ItalicAction.html)   [StyledTextAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/StyledEditorKit.StyledTextAction.html)   [UnderlineAction](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/StyledEditorKit.UnderlineAction.html)   *(in `StyledEditorKit`)* | Inner classes that implement various editing commands for styled text. |
| [Action\[\] getActions()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getActions--)   *(in `JTextComponent`)* | Gets the actions supported by this component. This method gets the array of actions from the editor kit if one is used by the component. |
| [InputMap getInputMap()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#getInputMap--)   *(in `JComponent`)* | Gets the input map that binds key strokes to actions. See [[Swing-组件-generaltext|Associating Text Actions with Key Strokes]]. |
| [void put(KeyStroke, Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/InputMap.html#put-javax.swing.KeyStroke-java.lang.Object-)   *(in `InputMap`)* | Binds the specified key to the specified action. You generally specify the action by its name, which for standard editing actions is represented by a string constant such as `DefaultEditorKit.backwardAction`. |

| Interface or Class | Description |
| --- | --- |
| [Document](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html) | An interface that defines the API that must be implemented by all documents. |
| [AbstractDocument](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/AbstractDocument.html) | An abstract superclass implementation of the `Document` interface. This is the superclass for all documents provided by the Swing text package. |
| [PlainDocument](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/PlainDocument.html) | A class that implements the `Document` interface. This is the default document for the plain text components (text field, password field, and text area). Additionally, this class is used by the editor panes and text panes when loading plain text or text of an unknown format. |
| [StyledDocument](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/StyledDocument.html) | A `Document` subinterface. Defines the API that must be implemented by documents that support styled text. `JTextPane` requires that its document be of this type. |
| [DefaultStyledDocument](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultStyledDocument.html) | A class that implements the `StyledDocument` interface. The default document for `JTextPane`. |

| Class or Method | Description |
| --- | --- |
| [DocumentFilter](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DocumentFilter.html) | The superclass of all document filters. You can use a document filter to change what gets inserted or removed from a document, without having to implement a document yourself. See [[Swing-组件-generaltext|Implementing a Document Filter]]. |
| [void setDocumentFilter(DocumentFilter)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/AbstractDocument.html#setDocumentFilter-javax.swing.text.DocumentFilter-)   *(in `AbstractDocument`)* | Sets the document filter. |
| [void setDocument(Document)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setDocument-javax.swing.text.Document-)   [Document getDocument()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getDocument--)   *(in `JTextComponent`)* | Sets or gets the document for a text component. |
| [Document createDefaultModel()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextField.html#createDefaultModel--)   *(in `JTextField`)* | Creates a default PlainDocument model. Override this method to create a custom document instead of the default `PlainDocument`. |
| [void addDocumentListener(DocumentListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html#addDocumentListener-javax.swing.event.DocumentListener-)   [void removeDocumentListener(DocumentListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html#removeDocumentListener-javax.swing.event.DocumentListener-)   *(in `Document`)* | Adds or removes a document listener. See [[Swing-组件-generaltext|Listening for Changes on a Document]]. |
| [void addUndoableEditListener(UndoableEditListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html#addUndoableEditListener-javax.swing.event.UndoableEditListener-)   [void removeUndoableEditListener(UndoableEditlistener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html#removeUndoableEditListener-javax.swing.event.UndoableEditListener-)   *(in `Document`)* | Adds or removes an undoable edit listener. Undoable edit listeners are used in [[Swing-组件-generaltext|Implementing Undo and Redo]]. |
| [int getLength()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html#getLength--)   [Position getStartPosition()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html#getStartPosition--)   [Position getEndPosition()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html#getEndPosition--)   [String getText(int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html#getText-int-int-)   *(in `Document`)* | `Document` methods that return various descriptive information about the document. |
| [Object getProperty(Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html#getProperty-java.lang.Object-)   [void putProperty(Object, Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html#putProperty-java.lang.Object-java.lang.Object-)   *(in `Document`)*   [void setDocumentProperties(Dictionary)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/AbstractDocument.html#setDocumentProperties-java.util.Dictionary-)   [Dictionary getDocumentProperties()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/AbstractDocument.html#getDocumentProperties--)   *(in `AbstractDocument`)* | A `Document` maintains a set of properties that you can manipulate with these methods. |

| Interface, Class, or Method | Description |
| --- | --- |
| [Caret](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Caret.html) | An interface that defines the API for objects that represent an insertion point within documents. |
| [DefaultCaret](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultCaret.html) | The default caret used by all text components. |
| [void setCaret(Caret)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setCaret-javax.swing.text.Caret-)   [Caret getCaret()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getCaret--) | Sets or gets the caret object used by a text component. |
| [void setCaretColor(Color)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setCaretColor-java.awt.Color-)   [Color getCaretColor()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getCaretColor--) | Sets or gets the color of the caret. |
| [void setCaretPosition(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setCaretPosition-int-)   [void moveCaretPosition(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#moveCaretPosition-int-)   [int getCaretPosition()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getCaretPosition--) | Sets or gets the current position of the caret within the document. |
| [void addCaretListener(CaretListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#addCaretListener-javax.swing.event.CaretListener-)   [void removeCaretListener(CaretListener)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#removeCaretListener-javax.swing.event.CaretListener-) | Adds or removes a caret listener from a text component. |
| [NavigationFilter](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/NavigationFilter.html) | The superclass for all navigation filters. A navigation filter lets you modify caret changes that are about to occur for a text component. |
| [void setNavigationFilter(NavigationFilter)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setNavigationFilter-javax.swing.text.NavigationFilter-) | Attaches a navigation filter to a text component. |
| [Highlighter](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Highlighter.html) | An interface that defines the API for objects used to highlight the current selection. |
| [DefaultHighlighter](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/DefaultHighlighter.html) | The default highlighter used by all text components. |
| [void setHighlighter(Highlighter)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setHighlighter-javax.swing.text.Highlighter-)   [Highlighter getHighlighter()](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#getHighlighter--) | Sets or gets the highlighter used by a text component. |

| Method | Description |
| --- | --- |
| [void read(Reader, Object)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#read-java.io.Reader-java.lang.Object-)   [void write(Writer)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#write-java.io.Writer-)   *(in `JTextComponent`)* | Reads or writes text. |
| [void read(Reader, Document, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/EditorKit.html#read-java.io.Reader-javax.swing.text.Document-int-)   [void read(InputStream, Document, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/EditorKit.html#read-java.io.InputStream-javax.swing.text.Document-int-)   *(in `EditorKit`)* | Reads text from a stream into a document. |
| [void write(Writer, Document, int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/EditorKit.html#write-java.io.Writer-javax.swing.text.Document-int-int-)   [void write(OutputStream, Document, int, int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/EditorKit.html#write-java.io.OutputStream-javax.swing.text.Document-int-int-)   *(in `EditorKit`)* | Writes text from a document to a stream. |
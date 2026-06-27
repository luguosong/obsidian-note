---
分类:
  - "网页裁剪"
标题: "Nimbus Defaults (The Java™ Tutorials > Creating a GUI With Swing >
            Modifying the Look and Feel)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Nimbus Defaults (The Java™ Tutorials > Creating a GUI With Swing >
            Modifying the Look and Feel)

Documentation

[[Swing-color|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Nimbus Defaults

All of the Nimbus properties are stored as keys in the `UIManager` 's defaults table. You can retrieve and modify any of these values to customize the look and feel of your application. Jasper Potts has written the code to generate this page, [NimbusBrowser.java](http://jasperpotts.com/blogfiles/nimbusdefaults/NimbusBrowser.java).

---

**Note:** These default values are subject to change without notice.

---

## Primary Colors

| Key | Value | Preview |
| --- | --- | --- |
| `control` | `#d6d9df (214,217,223)` |  |
| `info` | `#f2f2bd (242,242,189)` |  |
| `nimbusAlertYellow` | `#ffdc23 (255,220,35)` |  |
| `nimbusBase` | `#33628c (51,98,140)` |  |
| `nimbusDisabledText` | `#8e8f91 (142,143,145)` |  |
| `nimbusFocus` | `#73a4d1 (115,164,209)` |  |
| `nimbusGreen` | `#b0b332 (176,179,50)` |  |
| `nimbusInfoBlue` | `#2f5cb4 (47,92,180)` |  |
| `nimbusLightBackground` | `#ffffff (255,255,255)` |  |
| `nimbusOrange` | `#bf6204 (191,98,4)` |  |
| `nimbusRed` | `#a92e22 (169,46,34)` |  |
| `nimbusSelectedText` | `#ffffff (255,255,255)` |  |
| `nimbusSelectionBackground` | `#39698a (57,105,138)` |  |
| `text` | `#000000 (0,0,0)` |  |

## Secondary Colors

| Key | Value | Preview |
| --- | --- | --- |
| `activeCaption` | `#babec6 (186,190,198)` |  |
| `background` | `#d6d9df (214,217,223)` |  |
| `controlDkShadow` | `#a4abb8 (164,171,184)` |  |
| `controlHighlight` | `#e9ecf2 (233,236,242)` |  |
| `controlLHighlight` | `#f7f8fa (247,248,250)` |  |
| `controlShadow` | `#ccd3e0 (204,211,224)` |  |
| `controlText` | `#000000 (0,0,0)` |  |
| `desktop` | `#3d6079 (61,96,121)` |  |
| `inactiveCaption` | `#bdc1c8 (189,193,200)` |  |
| `infoText` | `#000000 (0,0,0)` |  |
| `menu` | `#edeff2 (237,239,242)` |  |
| `menuText` | `#000000 (0,0,0)` |  |
| `nimbusBlueGrey` | `#a9b0be (169,176,190)` |  |
| `nimbusBorder` | `#9297a1 (146,151,161)` |  |
| `nimbusSelection` | `#39698a (57,105,138)` |  |
| `scrollbar` | `#cdd0d5 (205,208,213)` |  |
| `textBackground` | `#39698a (57,105,138)` |  |
| `textForeground` | `#000000 (0,0,0)` |  |
| `textHighlight` | `#39698a (57,105,138)` |  |
| `textHighlightText` | `#ffffff (255,255,255)` |  |
| `textInactiveText` | `#8e8f91 (142,143,145)` |  |

## Components

### DesktopIcon

| Key | Value | Preview |
| --- | --- | --- |
| `DesktopIcon.background` | `#d6d9df (214,217,223)` |  |
| `DesktopIcon.contentMargins` | Insets (4,6,5,4) | ![Insets (4,6,5,4)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_0.png) |
| `DesktopIcon.disabled` | `#d6d9df (214,217,223)` |  |
| `DesktopIcon.disabledText` | `#000000 (0,0,0)` |  |
| `DesktopIcon.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_1.png) |
| `DesktopIcon.foreground` | `#000000 (0,0,0)` |  |
| `DesktopIcon[Enabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_2.png) |

### FileChooser

| Key | Value | Preview |
| --- | --- | --- |
| `FileChooser.ancestorInputMap` |  |  |
| `FileChooser.background` | `#d6d9df (214,217,223)` |  |
| `FileChooser.contentMargins` | Insets (10,10,10,10) | ![Insets (10,10,10,10)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_3.png) |
| `FileChooser.detailsViewIcon` | Icon 16 x 16 | ![Icon 16 x 16](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_4.png) |
| `FileChooser.directoryIcon` | Icon 16 x 16 |  |
| `FileChooser.disabled` | `#d6d9df (214,217,223)` |  |
| `FileChooser.disabledText` | `#000000 (0,0,0)` |  |
| `FileChooser.fileIcon` | Icon 16 x 16 |  |
| `FileChooser.floppyDriveIcon` | Icon 16 x 16 |  |
| `FileChooser.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_8.png) |
| `FileChooser.foreground` | `#000000 (0,0,0)` |  |
| `FileChooser.hardDriveIcon` | Icon 16 x 16 | ![Icon 16 x 16](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_9.png) |
| `FileChooser.homeFolderIcon` | Icon 16 x 16 |  |
| `FileChooser.listViewIcon` | Icon 16 x 16 |  |
| `FileChooser.newFolderIcon` | Icon 16 x 16 |  |
| `FileChooser.opaque` | true |  |
| `FileChooser.upFolderIcon` | Icon 16 x 16 |  |
| `FileChooser.usesSingleFilePane` | true |  |
| `FileChooser[Enabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_14.png) |
| `FileChooser[Enabled].detailsViewIconPainter` | Painter |  |
| `FileChooser[Enabled].directoryIconPainter` | Painter |  |
| `FileChooser[Enabled].fileIconPainter` | Painter |  |
| `FileChooser[Enabled].floppyDriveIconPainter` | Painter |  |
| `FileChooser[Enabled].hardDriveIconPainter` | Painter |  |
| `FileChooser[Enabled].homeFolderIconPainter` | Painter |  |
| `FileChooser[Enabled].listViewIconPainter` | Painter |  |
| `FileChooser[Enabled].newFolderIconPainter` | Painter |  |
| `FileChooser[Enabled].upFolderIconPainter` | Painter |  |

### RootPane

| Key | Value | Preview |
| --- | --- | --- |
| `RootPane.background` | `#d6d9df (214,217,223)` |  |
| `RootPane.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_24.png) |
| `RootPane.defaultButtonWindowKeyBindings` | \[Ljava.lang.Object;@2092dcdb |  |
| `RootPane.disabled` | `#d6d9df (214,217,223)` |  |
| `RootPane.disabledText` | `#000000 (0,0,0)` |  |
| `RootPane.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_25.png) |
| `RootPane.foreground` | `#000000 (0,0,0)` |  |
| `RootPane.opaque` | true |  |

### TextPane

| Key | Value | Preview |
| --- | --- | --- |
| `TextPane.background` | `#d6d9df (214,217,223)` |  |
| `TextPane.contentMargins` | Insets (4,6,4,6) | ![Insets (4,6,4,6)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_26.png) |
| `TextPane.disabled` | `#d6d9df (214,217,223)` |  |
| `TextPane.disabledText` | `#8e8f91 (142,143,145)` |  |
| `TextPane.focusInputMap` |  |  |
| `TextPane.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_27.png) |
| `TextPane.foreground` | `#000000 (0,0,0)` |  |
| `TextPane.opaque` | true |  |
| `TextPane[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_28.png) |
| `TextPane[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `TextPane[Enabled].backgroundPainter` | Painter |  |
| `TextPane[Selected].backgroundPainter` | Painter |  |
| `TextPane[Selected].textForeground` | `#ffffff (255,255,255)` |  |

### FormattedTextField

| Key | Value | Preview |
| --- | --- | --- |
| `FormattedTextField.background` | `#d6d9df (214,217,223)` |  |
| `FormattedTextField.contentMargins` | Insets (6,6,6,6) | ![Insets (6,6,6,6)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_31.png) |
| `FormattedTextField.disabled` | `#d6d9df (214,217,223)` |  |
| `FormattedTextField.disabledText` | `#8e8f91 (142,143,145)` |  |
| `FormattedTextField.focusInputMap` |  |  |
| `FormattedTextField.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_32.png) |
| `FormattedTextField.foreground` | `#000000 (0,0,0)` |  |
| `FormattedTextField[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_33.png) |
| `FormattedTextField[Disabled].borderPainter` | Painter |  |
| `FormattedTextField[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `FormattedTextField[Enabled].backgroundPainter` | Painter |  |
| `FormattedTextField[Enabled].borderPainter` | Painter |  |
| `FormattedTextField[Focused].borderPainter` | Painter |  |
| `FormattedTextField[Selected].backgroundPainter` | Painter |  |
| `FormattedTextField[Selected].textForeground` | `#ffffff (255,255,255)` |  |

### Spinner

| Key | Value | Preview |
| --- | --- | --- |
| `Spinner.ancestorInputMap` |  |  |
| `Spinner.background` | `#d6d9df (214,217,223)` |  |
| `Spinner.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_39.png) |
| `Spinner.disabled` | `#d6d9df (214,217,223)` |  |
| `Spinner.disabledText` | `#000000 (0,0,0)` |  |
| `Spinner.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_40.png) |
| `Spinner.foreground` | `#000000 (0,0,0)` |  |
| `Spinner:"Spinner.editor".contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_41.png) |
| `Spinner:"Spinner.nextButton".contentMargins` | Insets (0,0,0,0) |  |
| `Spinner:"Spinner.nextButton".size` | 20 |  |
| `Spinner:"Spinner.nextButton"[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_43.png) |
| `Spinner:"Spinner.nextButton"[Disabled].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[Enabled].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[Enabled].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[Focused+MouseOver].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[Focused+MouseOver].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[Focused+Pressed].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[Focused+Pressed].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[Focused].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[Focused].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[MouseOver].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[MouseOver].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[Pressed].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.nextButton"[Pressed].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton".contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_57.png) |
| `Spinner:"Spinner.codeviousButton".size` | 20 |  |
| `Spinner:"Spinner.codeviousButton"[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_58.png) |
| `Spinner:"Spinner.codeviousButton"[Disabled].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[Enabled].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[Enabled].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[Focused+MouseOver].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[Focused+MouseOver].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[Focused+Pressed].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[Focused+Pressed].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[Focused].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[Focused].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[MouseOver].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[MouseOver].foregroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[Pressed].backgroundPainter` | Painter |  |
| `Spinner:"Spinner.codeviousButton"[Pressed].foregroundPainter` | Painter |  |
| `Spinner:Panel:"Spinner.formattedTextField".contentMargins` | Insets (6,6,5,6) | ![Insets (6,6,5,6)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_72.png) |
| `Spinner:Panel:"Spinner.formattedTextField"[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_73.png) |
| `Spinner:Panel:"Spinner.formattedTextField"[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `Spinner:Panel:"Spinner.formattedTextField"[Enabled].backgroundPainter` | Painter |  |
| `Spinner:Panel:"Spinner.formattedTextField"[Focused+Selected].backgroundPainter` | Painter |  |
| `Spinner:Panel:"Spinner.formattedTextField"[Focused+Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `Spinner:Panel:"Spinner.formattedTextField"[Focused].backgroundPainter` | Painter |  |
| `Spinner:Panel:"Spinner.formattedTextField"[Selected].backgroundPainter` | Painter |  |
| `Spinner:Panel:"Spinner.formattedTextField"[Selected].textForeground` | `#ffffff (255,255,255)` |  |

### PopupMenuSeparator

| Key | Value | Preview |
| --- | --- | --- |
| `PopupMenuSeparator.background` | `#d6d9df (214,217,223)` |  |
| `PopupMenuSeparator.contentMargins` | Insets (1,0,2,0) | ![Insets (1,0,2,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_78.png) |
| `PopupMenuSeparator.disabled` | `#d6d9df (214,217,223)` |  |
| `PopupMenuSeparator.disabledText` | `#000000 (0,0,0)` |  |
| `PopupMenuSeparator.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_79.png) |
| `PopupMenuSeparator.foreground` | `#000000 (0,0,0)` |  |
| `PopupMenuSeparator[Enabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_80.png) |

### Table

| Key | Value | Preview |
| --- | --- | --- |
| `Table.alternateRowColor` | `#f2f2f2 (242,242,242)` |  |
| `Table.ancestorInputMap` |  |  |
| `Table.ancestorInputMap.RightToLeft` |  |  |
| `Table.ascendingSortIcon` | Icon 7 x 7 | ![Icon 7 x 7](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_81.png) |
| `Table.background` | `#ffffff (255,255,255)` |  |
| `Table.cellNoFocusBorder` | Border Insets(2,5,2,5) | ![Border Insets(2,5,2,5)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_82.png) |
| `Table.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_83.png) |
| `Table.descendingSortIcon` | Icon 7 x 7 | ![Icon 7 x 7](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_84.png) |
| `Table.disabled` | `#d6d9df (214,217,223)` |  |
| `Table.disabledText` | `#000000 (0,0,0)` |  |
| `Table.dropLineColor` | `#73a4d1 (115,164,209)` |  |
| `Table.dropLineShortColor` | `#bf6204 (191,98,4)` |  |
| `Table.focusCellHighlightBorder` | Border Insets(2,5,2,5) | ![Border Insets(2,5,2,5)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_85.png) |
| `Table.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_86.png) |
| `Table.foreground` | `#000000 (0,0,0)` |  |
| `Table.intercellSpacing` | Dimension (0,0) |  |
| `Table.opaque` | true |  |
| `Table.rendererUseTableColors` | true |  |
| `Table.rendererUseUIBorder` | true |  |
| `Table.scrollPaneCornerComponent` | UIDefaults.ActiveValue |  |
| `Table.showGrid` | false |  |
| `Table.textForeground` | `#232324 (35,35,36)` |  |
| `Table:"Table.cellRenderer".background` | `#ffffff (255,255,255)` |  |
| `Table:"Table.cellRenderer".contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_87.png) |
| `Table:"Table.cellRenderer".opaque` | true |  |
| `Table[Disabled+Selected].textBackground` | `#39698a (57,105,138)` |  |
| `Table[Enabled+Selected].textBackground` | `#39698a (57,105,138)` |  |
| `Table[Enabled+Selected].textForeground` | `#ffffff (255,255,255)` |  |

### TextArea

| Key | Value | Preview |
| --- | --- | --- |
| `TextArea.NotInScrollPane` | NotInScrollPane |  |
| `TextArea.States` | Enabled,MouseOver,Pressed,Selected,Disabled,Focused,NotInScrollPane |  |
| `TextArea.background` | `#d6d9df (214,217,223)` |  |
| `TextArea.contentMargins` | Insets (6,6,6,6) | ![Insets (6,6,6,6)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_88.png) |
| `TextArea.disabled` | `#d6d9df (214,217,223)` |  |
| `TextArea.disabledText` | `#8e8f91 (142,143,145)` |  |
| `TextArea.focusInputMap` |  |  |
| `TextArea.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_89.png) |
| `TextArea.foreground` | `#000000 (0,0,0)` |  |
| `TextArea[Disabled+NotInScrollPane].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_90.png) |
| `TextArea[Disabled+NotInScrollPane].borderPainter` | Painter |  |
| `TextArea[Disabled+NotInScrollPane].textForeground` | `#8e8f91 (142,143,145)` |  |
| `TextArea[Disabled].backgroundPainter` | Painter |  |
| `TextArea[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `TextArea[Enabled+NotInScrollPane].backgroundPainter` | Painter |  |
| `TextArea[Enabled+NotInScrollPane].borderPainter` | Painter |  |
| `TextArea[Enabled].backgroundPainter` | Painter |  |
| `TextArea[Focused+NotInScrollPane].borderPainter` | Painter |  |
| `TextArea[Selected].backgroundPainter` | Painter |  |
| `TextArea[Selected].textForeground` | `#ffffff (255,255,255)` |  |

### Slider

| Key | Value | Preview |
| --- | --- | --- |
| `Slider.ArrowShape` | ArrowShape |  |
| `Slider.States` | Enabled,MouseOver,Pressed,Disabled,Focused,Selected,ArrowShape |  |
| `Slider.background` | `#d6d9df (214,217,223)` |  |
| `Slider.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_98.png) |
| `Slider.disabled` | `#d6d9df (214,217,223)` |  |
| `Slider.disabledText` | `#000000 (0,0,0)` |  |
| `Slider.focusInputMap` |  |  |
| `Slider.focusInputMap.RightToLeft` |  |  |
| `Slider.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_99.png) |
| `Slider.foreground` | `#000000 (0,0,0)` |  |
| `Slider.paintValue` | false |  |
| `Slider.thumbHeight` | 17 |  |
| `Slider.thumbWidth` | 17 |  |
| `Slider.tickColor` | `#232830 (35,40,48)` |  |
| `Slider.trackBorder` | 0 |  |
| `Slider:SliderThumb.ArrowShape` | ArrowShape |  |
| `Slider:SliderThumb.States` | Enabled,MouseOver,Pressed,Disabled,Focused,Selected,ArrowShape |  |
| `Slider:SliderThumb.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_100.png) |
| `Slider:SliderThumb[ArrowShape+Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_101.png) |
| `Slider:SliderThumb[ArrowShape+Enabled].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[ArrowShape+Focused+MouseOver].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[ArrowShape+Focused+Pressed].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[ArrowShape+Focused].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[ArrowShape+MouseOver].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[ArrowShape+Pressed].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[Disabled].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[Enabled].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[Focused+MouseOver].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[Focused+Pressed].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[Focused].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[MouseOver].backgroundPainter` | Painter |  |
| `Slider:SliderThumb[Pressed].backgroundPainter` | Painter |  |
| `Slider:SliderTrack.ArrowShape` | ArrowShape |  |
| `Slider:SliderTrack.States` | Enabled,MouseOver,Pressed,Disabled,Focused,Selected,ArrowShape |  |
| `Slider:SliderTrack.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_115.png) |
| `Slider:SliderTrack[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_116.png) |
| `Slider:SliderTrack[Enabled].backgroundPainter` | Painter |  |

### InternalFrameTitlePane

| Key | Value | Preview |
| --- | --- | --- |
| `InternalFrameTitlePane.background` | `#d6d9df (214,217,223)` |  |
| `InternalFrameTitlePane.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_118.png) |
| `InternalFrameTitlePane.disabled` | `#d6d9df (214,217,223)` |  |
| `InternalFrameTitlePane.disabledText` | `#000000 (0,0,0)` |  |
| `InternalFrameTitlePane.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_119.png) |
| `InternalFrameTitlePane.foreground` | `#000000 (0,0,0)` |  |
| `InternalFrameTitlePane.maxFrameIconSize` | Dimension (18,18) | ![Dimension (18,18)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_120.png) |

### ColorChooser

| Key | Value | Preview |
| --- | --- | --- |
| `ColorChooser.background` | `#d6d9df (214,217,223)` |  |
| `ColorChooser.contentMargins` | Insets (5,0,0,0) | ![Insets (5,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_121.png) |
| `ColorChooser.disabled` | `#d6d9df (214,217,223)` |  |
| `ColorChooser.disabledText` | `#000000 (0,0,0)` |  |
| `ColorChooser.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_122.png) |
| `ColorChooser.foreground` | `#000000 (0,0,0)` |  |
| `ColorChooser.swatchesDefaultRecentColor` | `#ffffff (255,255,255)` |  |
| `ColorChooser.swatchesRecentSwatchSize` | Dimension (10,10) | ![Dimension (10,10)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_123.png) |
| `ColorChooser.swatchesSwatchSize` | Dimension (10,10) |  |
| `ColorChooser:"ColorChooser.codeviewPanelHolder".contentMargins` | Insets (0,5,10,5) | ![Insets (0,5,10,5)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_125.png) |
| `ColorChooser:"ColorChooser.codeviewPanelHolder":"OptionPane.label".contentMargins` | Insets (0,10,10,10) | ![Insets (0,10,10,10)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_126.png) |

### DesktopPane

| Key | Value | Preview |
| --- | --- | --- |
| `DesktopPane.background` | `#d6d9df (214,217,223)` |  |
| `DesktopPane.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_127.png) |
| `DesktopPane.disabled` | `#d6d9df (214,217,223)` |  |
| `DesktopPane.disabledText` | `#000000 (0,0,0)` |  |
| `DesktopPane.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_128.png) |
| `DesktopPane.foreground` | `#000000 (0,0,0)` |  |
| `DesktopPane.opaque` | true |  |
| `DesktopPane[Enabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_129.png) |

### Menu

| Key | Value | Preview |
| --- | --- | --- |
| `Menu.arrowIcon` | Icon 9 x 10 | ![Icon 9 x 10](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_130.png) |
| `Menu.background` | `#d6d9df (214,217,223)` |  |
| `Menu.contentMargins` | Insets (1,12,2,5) | ![Insets (1,12,2,5)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_131.png) |
| `Menu.disabled` | `#d6d9df (214,217,223)` |  |
| `Menu.disabledText` | `#8e8f91 (142,143,145)` |  |
| `Menu.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_132.png) |
| `Menu.foreground` | `#232324 (35,35,36)` |  |
| `Menu:MenuItemAccelerator.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_133.png) |
| `Menu:MenuItemAccelerator[MouseOver].textForeground` | `#ffffff (255,255,255)` |  |
| `Menu[Disabled].arrowIconPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_134.png) |
| `Menu[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `Menu[Enabled+Selected].arrowIconPainter` | Painter |  |
| `Menu[Enabled+Selected].backgroundPainter` | Painter |  |
| `Menu[Enabled+Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `Menu[Enabled].arrowIconPainter` | Painter |  |
| `Menu[Enabled].textForeground` | `#232324 (35,35,36)` |  |

### PasswordField

| Key | Value | Preview |
| --- | --- | --- |
| `PasswordField.background` | `#d6d9df (214,217,223)` |  |
| `PasswordField.contentMargins` | Insets (6,6,6,6) | ![Insets (6,6,6,6)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_138.png) |
| `PasswordField.disabled` | `#d6d9df (214,217,223)` |  |
| `PasswordField.disabledText` | `#8e8f91 (142,143,145)` |  |
| `PasswordField.focusInputMap` |  |  |
| `PasswordField.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_139.png) |
| `PasswordField.foreground` | `#000000 (0,0,0)` |  |
| `PasswordField[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_140.png) |
| `PasswordField[Disabled].borderPainter` | Painter |  |
| `PasswordField[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `PasswordField[Enabled].backgroundPainter` | Painter |  |
| `PasswordField[Enabled].borderPainter` | Painter |  |
| `PasswordField[Focused].borderPainter` | Painter |  |
| `PasswordField[Selected].backgroundPainter` | Painter |  |
| `PasswordField[Selected].textForeground` | `#ffffff (255,255,255)` |  |

### InternalFrame

| Key | Value | Preview |
| --- | --- | --- |
| `InternalFrame.States` | Enabled,WindowFocused |  |
| `InternalFrame.WindowFocused` | WindowFocused |  |
| `InternalFrame.background` | `#d6d9df (214,217,223)` |  |
| `InternalFrame.contentMargins` | Insets (1,6,6,6) | ![Insets (1,6,6,6)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_146.png) |
| `InternalFrame.disabled` | `#d6d9df (214,217,223)` |  |
| `InternalFrame.disabledText` | `#000000 (0,0,0)` |  |
| `InternalFrame.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_147.png) |
| `InternalFrame.foreground` | `#000000 (0,0,0)` |  |
| `InternalFrame.titleFont` | Font SansSerif 12 Bold | ![Font SansSerif 12 Bold](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_148.png) |
| `InternalFrame.windowBindings` | \[Ljava.lang.Object;@35cf7491 |  |
| `InternalFrame:InternalFrameTitlePane.States` | Enabled,WindowFocused |  |
| `InternalFrame:InternalFrameTitlePane.WindowFocused` | WindowFocused |  |
| `InternalFrame:InternalFrameTitlePane.contentMargins` | Insets (3,0,3,0) | ![Insets (3,0,3,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_149.png) |
| `InternalFrame:InternalFrameTitlePane.titleAlignment` | CENTER |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.closeButton".States` | Enabled,MouseOver,Pressed,Disabled,Focused,Selected,WindowNotFocused |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.closeButton".WindowNotFocused` | WindowNotFocused |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.closeButton".contentMargins` | Insets (9,9,9,9) | ![Insets (9,9,9,9)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_150.png) |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.closeButton"[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_151.png) |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.closeButton"[Enabled+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.closeButton"[Enabled].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.closeButton"[MouseOver+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.closeButton"[MouseOver].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.closeButton"[Pressed+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.closeButton"[Pressed].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.iconifyButton".States` | Enabled,MouseOver,Pressed,Disabled,Focused,Selected,WindowNotFocused |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.iconifyButton".WindowNotFocused` | WindowNotFocused |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.iconifyButton".contentMargins` | Insets (9,9,9,9) | ![Insets (9,9,9,9)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_158.png) |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.iconifyButton"[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_159.png) |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.iconifyButton"[Enabled+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.iconifyButton"[Enabled].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.iconifyButton"[MouseOver+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.iconifyButton"[MouseOver].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.iconifyButton"[Pressed+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.iconifyButton"[Pressed].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton".States` | Enabled,MouseOver,Pressed,Disabled,Focused,Selected,WindowNotFocused,WindowMaximized |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton".WindowMaximized` | WindowMaximized |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton".WindowNotFocused` | WindowNotFocused |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton".contentMargins` | Insets (9,9,9,9) | ![Insets (9,9,9,9)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_166.png) |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[Disabled+WindowMaximized].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_167.png) |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[Disabled].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[Enabled+WindowMaximized+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[Enabled+WindowMaximized].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[Enabled+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[Enabled].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[MouseOver+WindowMaximized+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[MouseOver+WindowMaximized].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[MouseOver+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[MouseOver].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[Pressed+WindowMaximized+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[Pressed+WindowMaximized].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[Pressed+WindowNotFocused].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.maximizeButton"[Pressed].backgroundPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton".States` | Enabled,MouseOver,Pressed,Disabled,Focused,Selected,WindowNotFocused |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton".WindowNotFocused` | WindowNotFocused |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton".contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_181.png) |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton".icon` | Icon 19 x 18 | ![Icon 19 x 18](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_182.png) |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton".test` | am InternalFrameTitlePane.menuButton |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton"[Disabled].iconPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_183.png) |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton"[Enabled+WindowNotFocused].iconPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton"[Enabled].iconPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton"[MouseOver+WindowNotFocused].iconPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton"[MouseOver].iconPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton"[Pressed+WindowNotFocused].iconPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane:"InternalFrameTitlePane.menuButton"[Pressed].iconPainter` | Painter |  |
| `InternalFrame:InternalFrameTitlePane[Enabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `InternalFrame[Enabled+WindowFocused].backgroundPainter` | Painter |  |
| `InternalFrame[Enabled].backgroundPainter` | Painter |  |

### Button

| Key | Value | Preview |
| --- | --- | --- |
| `Button.background` | `#d6d9df (214,217,223)` |  |
| `Button.contentMargins` | Insets (6,14,6,14) | ![Insets (6,14,6,14)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_192.png) |
| `Button.defaultButtonFollowsFocus` | false |  |
| `Button.disabled` | `#d6d9df (214,217,223)` |  |
| `Button.disabledText` | `#8e8f91 (142,143,145)` |  |
| `Button.focusInputMap` |  |  |
| `Button.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_193.png) |
| `Button.foreground` | `#000000 (0,0,0)` |  |
| `Button[Default+Focused+MouseOver].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_194.png) |
| `Button[Default+Focused+Pressed].backgroundPainter` | Painter |  |
| `Button[Default+Focused].backgroundPainter` | Painter |  |
| `Button[Default+MouseOver].backgroundPainter` | Painter |  |
| `Button[Default+Pressed].backgroundPainter` | Painter |  |
| `Button[Default+Pressed].textForeground` | `#ffffff (255,255,255)` |  |
| `Button[Default].backgroundPainter` | Painter |  |
| `Button[Disabled].backgroundPainter` | Painter |  |
| `Button[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `Button[Enabled].backgroundPainter` | Painter |  |
| `Button[Focused+MouseOver].backgroundPainter` | Painter |  |
| `Button[Focused+Pressed].backgroundPainter` | Painter |  |
| `Button[Focused].backgroundPainter` | Painter |  |
| `Button[MouseOver].backgroundPainter` | Painter |  |
| `Button[Pressed].backgroundPainter` | Painter |  |

### Panel

| Key | Value | Preview |
| --- | --- | --- |
| `Panel.background` | `#d6d9df (214,217,223)` |  |
| `Panel.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_207.png) |
| `Panel.disabled` | `#d6d9df (214,217,223)` |  |
| `Panel.disabledText` | `#000000 (0,0,0)` |  |
| `Panel.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_208.png) |
| `Panel.foreground` | `#000000 (0,0,0)` |  |
| `Panel.opaque` | true |  |

### MenuBar

| Key | Value | Preview |
| --- | --- | --- |
| `MenuBar.background` | `#d6d9df (214,217,223)` |  |
| `MenuBar.contentMargins` | Insets (2,6,2,6) | ![Insets (2,6,2,6)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_209.png) |
| `MenuBar.disabled` | `#d6d9df (214,217,223)` |  |
| `MenuBar.disabledText` | `#000000 (0,0,0)` |  |
| `MenuBar.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_210.png) |
| `MenuBar.foreground` | `#000000 (0,0,0)` |  |
| `MenuBar.windowBindings` | \[Ljava.lang.Object;@5421e554 |  |
| `MenuBar:Menu.contentMargins` | Insets (1,4,2,4) | ![Insets (1,4,2,4)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_211.png) |
| `MenuBar:Menu:MenuItemAccelerator.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_212.png) |
| `MenuBar:Menu[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `MenuBar:Menu[Enabled].textForeground` | `#232324 (35,35,36)` |  |
| `MenuBar:Menu[Selected].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_213.png) |
| `MenuBar:Menu[Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `MenuBar[Enabled].backgroundPainter` | Painter |  |
| `MenuBar[Enabled].borderPainter` | Painter |  |

### ComboBox

| Key | Value | Preview |
| --- | --- | --- |
| `ComboBox.Editable` | Editable |  |
| `ComboBox.States` | Enabled,MouseOver,Pressed,Selected,Disabled,Focused,Editable |  |
| `ComboBox.ancestorInputMap` |  |  |
| `ComboBox.background` | `#d6d9df (214,217,223)` |  |
| `ComboBox.buttonWhenNotEditable` | true |  |
| `ComboBox.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_216.png) |
| `ComboBox.disabled` | `#d6d9df (214,217,223)` |  |
| `ComboBox.disabledText` | `#000000 (0,0,0)` |  |
| `ComboBox.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_217.png) |
| `ComboBox.forceOpaque` | true |  |
| `ComboBox.foreground` | `#000000 (0,0,0)` |  |
| `ComboBox.padding` | Insets (3,3,3,3) | ![Insets (3,3,3,3)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_218.png) |
| `ComboBox.popupInsets` | Insets (-2,2,0,2) | ![Insets (-2,2,0,2)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_219.png) |
| `ComboBox.codessedWhenPopupVisible` | true |  |
| `ComboBox.rendererUseListColors` | false |  |
| `ComboBox.squareButton` | false |  |
| `ComboBox:"ComboBox.arrowButton".Editable` | Editable |  |
| `ComboBox:"ComboBox.arrowButton".States` | Enabled,MouseOver,Pressed,Disabled,Editable |  |
| `ComboBox:"ComboBox.arrowButton".contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_220.png) |
| `ComboBox:"ComboBox.arrowButton".size` | 19 |  |
| `ComboBox:"ComboBox.arrowButton"[Disabled+Editable].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_221.png) |
| `ComboBox:"ComboBox.arrowButton"[Disabled].foregroundPainter` | Painter |  |
| `ComboBox:"ComboBox.arrowButton"[Editable+Enabled].backgroundPainter` | Painter |  |
| `ComboBox:"ComboBox.arrowButton"[Editable+MouseOver].backgroundPainter` | Painter |  |
| `ComboBox:"ComboBox.arrowButton"[Editable+Pressed].backgroundPainter` | Painter |  |
| `ComboBox:"ComboBox.arrowButton"[Editable+Selected].backgroundPainter` | Painter |  |
| `ComboBox:"ComboBox.arrowButton"[Enabled].foregroundPainter` | Painter |  |
| `ComboBox:"ComboBox.arrowButton"[MouseOver].foregroundPainter` | Painter |  |
| `ComboBox:"ComboBox.arrowButton"[Pressed].foregroundPainter` | Painter |  |
| `ComboBox:"ComboBox.arrowButton"[Selected].foregroundPainter` | Painter |  |
| `ComboBox:"ComboBox.listRenderer".background` | `#ffffff (255,255,255)` |  |
| `ComboBox:"ComboBox.listRenderer".contentMargins` | Insets (2,4,2,4) | ![Insets (2,4,2,4)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_231.png) |
| `ComboBox:"ComboBox.listRenderer".opaque` | true |  |
| `ComboBox:"ComboBox.listRenderer"[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `ComboBox:"ComboBox.listRenderer"[Selected].background` | `#39698a (57,105,138)` |  |
| `ComboBox:"ComboBox.listRenderer"[Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `ComboBox:"ComboBox.renderer".contentMargins` | Insets (2,4,2,4) |  |
| `ComboBox:"ComboBox.renderer"[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `ComboBox:"ComboBox.renderer"[Selected].background` | `#39698a (57,105,138)` |  |
| `ComboBox:"ComboBox.renderer"[Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `ComboBox:"ComboBox.textField".contentMargins` | Insets (0,6,0,3) | ![Insets (0,6,0,3)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_233.png) |
| `ComboBox:"ComboBox.textField"[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_234.png) |
| `ComboBox:"ComboBox.textField"[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `ComboBox:"ComboBox.textField"[Enabled].backgroundPainter` | Painter |  |
| `ComboBox:"ComboBox.textField"[Selected].backgroundPainter` | Painter |  |
| `ComboBox:"ComboBox.textField"[Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `ComboBox[Disabled+Editable].backgroundPainter` | Painter |  |
| `ComboBox[Disabled+Pressed].backgroundPainter` | Painter |  |
| `ComboBox[Disabled].backgroundPainter` | Painter |  |
| `ComboBox[Editable+Enabled].backgroundPainter` | Painter |  |
| `ComboBox[Editable+Focused].backgroundPainter` | Painter |  |
| `ComboBox[Editable+MouseOver].backgroundPainter` | Painter |  |
| `ComboBox[Editable+Pressed].backgroundPainter` | Painter |  |
| `ComboBox[Enabled+Selected].backgroundPainter` | Painter |  |
| `ComboBox[Enabled].backgroundPainter` | Painter |  |
| `ComboBox[Focused+MouseOver].backgroundPainter` | Painter |  |
| `ComboBox[Focused+Pressed].backgroundPainter` | Painter |  |
| `ComboBox[Focused].backgroundPainter` | Painter |  |
| `ComboBox[MouseOver].backgroundPainter` | Painter |  |
| `ComboBox[Pressed].backgroundPainter` | Painter |  |

### ToolBarSeparator

| Key | Value | Preview |
| --- | --- | --- |
| `ToolBarSeparator.contentMargins` | Insets (2,0,3,0) | ![Insets (2,0,3,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_251.png) |
| `ToolBarSeparator.textForeground` | `#9297a1 (146,151,161)` |  |
| `ToolBarSeparator[Enabled].backgroundPainter` | Painter |  |

### Tree

| Key | Value | Preview |
| --- | --- | --- |
| `Tree.ancestorInputMap` |  |  |
| `Tree.background` | `#ffffff (255,255,255)` |  |
| `Tree.closedIcon` | Icon 16 x 16 | ![Icon 16 x 16](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_252.png) |
| `Tree.collapsedIcon` | Icon 18 x 7 | ![Icon 18 x 7](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_253.png) |
| `Tree.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_254.png) |
| `Tree.disabled` | `#d6d9df (214,217,223)` |  |
| `Tree.disabledText` | `#000000 (0,0,0)` |  |
| `Tree.drawHorizontalLines` | false |  |
| `Tree.drawVerticalLines` | false |  |
| `Tree.dropLineColor` | `#73a4d1 (115,164,209)` |  |
| `Tree.expandedIcon` | Icon 18 x 7 | ![Icon 18 x 7](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_255.png) |
| `Tree.focusInputMap` |  |  |
| `Tree.focusInputMap.RightToLeft` |  |  |
| `Tree.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_256.png) |
| `Tree.foreground` | `#000000 (0,0,0)` |  |
| `Tree.leafIcon` | Icon 16 x 16 | ![Icon 16 x 16](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_257.png) |
| `Tree.leftChildIndent` | 12 |  |
| `Tree.opaque` | true |  |
| `Tree.openIcon` | Icon 16 x 16 |  |
| `Tree.rendererFillBackground` | false |  |
| `Tree.rendererMargins` | Insets (2,0,1,5) | ![Insets (2,0,1,5)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_259.png) |
| `Tree.rendererUseTreeColors` | true |  |
| `Tree.repaintWholeRow` | true |  |
| `Tree.rightChildIndent` | 4 |  |
| `Tree.rowHeight` | 0 |  |
| `Tree.selectionBackground` | `#39698a (57,105,138)` |  |
| `Tree.selectionForeground` | `#ffffff (255,255,255)` |  |
| `Tree.showRootHandles` | false |  |
| `Tree.textBackground` | `#ffffff (255,255,255)` |  |
| `Tree.textForeground` | `#000000 (0,0,0)` |  |
| `Tree:"Tree.cellRenderer".contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_260.png) |
| `Tree:"Tree.cellRenderer"[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `Tree:TreeCell.contentMargins` | Insets (0,0,0,0) |  |
| `Tree:TreeCell[Enabled+Focused].background` | `#ffffff (255,255,255)` |  |
| `Tree:TreeCell[Enabled+Focused].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_262.png) |
| `Tree:TreeCell[Enabled+Selected].backgroundPainter` | Painter |  |
| `Tree:TreeCell[Enabled+Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `Tree:TreeCell[Enabled].background` | `#ffffff (255,255,255)` |  |
| `Tree:TreeCell[Focused+Selected].backgroundPainter` | Painter |  |
| `Tree:TreeCell[Focused+Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `Tree[Enabled+Selected].collapsedIconPainter` | Painter |  |
| `Tree[Enabled+Selected].expandedIconPainter` | Painter |  |
| `Tree[Enabled].closedIconPainter` | Painter |  |
| `Tree[Enabled].collapsedIconPainter` | Painter |  |
| `Tree[Enabled].expandedIconPainter` | Painter |  |
| `Tree[Enabled].leafIconPainter` | Painter |  |
| `Tree[Enabled].openIconPainter` | Painter |  |

### EditorPane

| Key | Value | Preview |
| --- | --- | --- |
| `EditorPane.background` | `#d6d9df (214,217,223)` |  |
| `EditorPane.contentMargins` | Insets (4,6,4,6) | ![Insets (4,6,4,6)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_272.png) |
| `EditorPane.disabled` | `#d6d9df (214,217,223)` |  |
| `EditorPane.disabledText` | `#8e8f91 (142,143,145)` |  |
| `EditorPane.focusInputMap` |  |  |
| `EditorPane.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_273.png) |
| `EditorPane.foreground` | `#000000 (0,0,0)` |  |
| `EditorPane.opaque` | true |  |
| `EditorPane[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_274.png) |
| `EditorPane[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `EditorPane[Enabled].backgroundPainter` | Painter |  |
| `EditorPane[Selected].backgroundPainter` | Painter |  |
| `EditorPane[Selected].textForeground` | `#ffffff (255,255,255)` |  |

### CheckBox

| Key | Value | Preview |
| --- | --- | --- |
| `CheckBox.background` | `#d6d9df (214,217,223)` |  |
| `CheckBox.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_277.png) |
| `CheckBox.disabled` | `#d6d9df (214,217,223)` |  |
| `CheckBox.disabledText` | `#8e8f91 (142,143,145)` |  |
| `CheckBox.focusInputMap` |  |  |
| `CheckBox.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_278.png) |
| `CheckBox.foreground` | `#000000 (0,0,0)` |  |
| `CheckBox.icon` | Icon 18 x 18 | ![Icon 18 x 18](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_279.png) |
| `CheckBox[Disabled+Selected].iconPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_280.png) |
| `CheckBox[Disabled].iconPainter` | Painter |  |
| `CheckBox[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `CheckBox[Enabled].iconPainter` | Painter |  |
| `CheckBox[Focused+MouseOver+Selected].iconPainter` | Painter |  |
| `CheckBox[Focused+MouseOver].iconPainter` | Painter |  |
| `CheckBox[Focused+Pressed+Selected].iconPainter` | Painter |  |
| `CheckBox[Focused+Pressed].iconPainter` | Painter |  |
| `CheckBox[Focused+Selected].iconPainter` | Painter |  |
| `CheckBox[Focused].iconPainter` | Painter |  |
| `CheckBox[MouseOver+Selected].iconPainter` | Painter |  |
| `CheckBox[MouseOver].iconPainter` | Painter |  |
| `CheckBox[Pressed+Selected].iconPainter` | Painter |  |
| `CheckBox[Pressed].iconPainter` | Painter |  |
| `CheckBox[Selected].iconPainter` | Painter |  |

### ToggleButton

| Key | Value | Preview |
| --- | --- | --- |
| `ToggleButton.background` | `#d6d9df (214,217,223)` |  |
| `ToggleButton.contentMargins` | Insets (6,14,6,14) | ![Insets (6,14,6,14)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_294.png) |
| `ToggleButton.disabled` | `#d6d9df (214,217,223)` |  |
| `ToggleButton.disabledText` | `#8e8f91 (142,143,145)` |  |
| `ToggleButton.focusInputMap` |  |  |
| `ToggleButton.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_295.png) |
| `ToggleButton.foreground` | `#000000 (0,0,0)` |  |
| `ToggleButton[Disabled+Selected].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_296.png) |
| `ToggleButton[Disabled+Selected].textForeground` | `#8e8f91 (142,143,145)` |  |
| `ToggleButton[Disabled].backgroundPainter` | Painter |  |
| `ToggleButton[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `ToggleButton[Enabled].backgroundPainter` | Painter |  |
| `ToggleButton[Focused+MouseOver+Selected].backgroundPainter` | Painter |  |
| `ToggleButton[Focused+MouseOver].backgroundPainter` | Painter |  |
| `ToggleButton[Focused+Pressed+Selected].backgroundPainter` | Painter |  |
| `ToggleButton[Focused+Pressed].backgroundPainter` | Painter |  |
| `ToggleButton[Focused+Selected].backgroundPainter` | Painter |  |
| `ToggleButton[Focused].backgroundPainter` | Painter |  |
| `ToggleButton[MouseOver+Selected].backgroundPainter` | Painter |  |
| `ToggleButton[MouseOver].backgroundPainter` | Painter |  |
| `ToggleButton[Pressed+Selected].backgroundPainter` | Painter |  |
| `ToggleButton[Pressed].backgroundPainter` | Painter |  |
| `ToggleButton[Selected].backgroundPainter` | Painter |  |

### "Tree.cellEditor"

| Key | Value | Preview |
| --- | --- | --- |
| `"Tree.cellEditor".background` | `#ffffff (255,255,255)` |  |
| `"Tree.cellEditor".contentMargins` | Insets (2,5,2,5) | ![Insets (2,5,2,5)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_310.png) |
| `"Tree.cellEditor".opaque` | true |  |
| `"Tree.cellEditor"[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `"Tree.cellEditor"[Enabled+Focused].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_311.png) |
| `"Tree.cellEditor"[Enabled].backgroundPainter` | Painter |  |
| `"Tree.cellEditor"[Selected].textForeground` | `#ffffff (255,255,255)` |  |

### TabbedPane

| Key | Value | Preview |
| --- | --- | --- |
| `TabbedPane.ancestorInputMap` |  |  |
| `TabbedPane.background` | `#d6d9df (214,217,223)` |  |
| `TabbedPane.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_313.png) |
| `TabbedPane.darkShadow` | `#000000 (0,0,0)` |  |
| `TabbedPane.disabled` | `#d6d9df (214,217,223)` |  |
| `TabbedPane.disabledText` | `#000000 (0,0,0)` |  |
| `TabbedPane.extendTabsToBase` | true |  |
| `TabbedPane.focusInputMap` |  |  |
| `TabbedPane.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_314.png) |
| `TabbedPane.foreground` | `#000000 (0,0,0)` |  |
| `TabbedPane.highlight` | `#ffffff (255,255,255)` |  |
| `TabbedPane.isTabRollover` | true |  |
| `TabbedPane.nudgeSelectedLabel` | false |  |
| `TabbedPane.shadow` | `#8e8f91 (142,143,145)` |  |
| `TabbedPane.tabAreaStatesMatchSelectedTab` | true |  |
| `TabbedPane.tabOverlap` | \-1 |  |
| `TabbedPane.tabRunOverlay` | 2 |  |
| `TabbedPane.useBasicArrows` | true |  |
| `TabbedPane:TabbedPaneContent.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_315.png) |
| `TabbedPane:TabbedPaneTab.contentMargins` | Insets (2,8,3,8) | ![Insets (2,8,3,8)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_316.png) |
| `TabbedPane:TabbedPaneTabArea.contentMargins` | Insets (3,10,4,10) | ![Insets (3,10,4,10)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_317.png) |
| `TabbedPane:TabbedPaneTabArea[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_318.png) |
| `TabbedPane:TabbedPaneTabArea[Enabled+MouseOver].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTabArea[Enabled+Pressed].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTabArea[Enabled].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTab[Disabled+Selected].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTab[Disabled].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTab[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `TabbedPane:TabbedPaneTab[Enabled+MouseOver].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTab[Enabled+Pressed].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTab[Enabled].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTab[Focused+MouseOver+Selected].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTab[Focused+Pressed+Selected].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTab[Focused+Pressed+Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `TabbedPane:TabbedPaneTab[Focused+Selected].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTab[MouseOver+Selected].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTab[Pressed+Selected].backgroundPainter` | Painter |  |
| `TabbedPane:TabbedPaneTab[Pressed+Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `TabbedPane:TabbedPaneTab[Selected].backgroundPainter` | Painter |  |

### TableHeader

| Key | Value | Preview |
| --- | --- | --- |
| `TableHeader.ancestorInputMap` |  |  |
| `TableHeader.background` | `#d6d9df (214,217,223)` |  |
| `TableHeader.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_333.png) |
| `TableHeader.disabled` | `#d6d9df (214,217,223)` |  |
| `TableHeader.disabledText` | `#000000 (0,0,0)` |  |
| `TableHeader.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_334.png) |
| `TableHeader.foreground` | `#000000 (0,0,0)` |  |
| `TableHeader.opaque` | true |  |
| `TableHeader.rightAlignSortArrow` | true |  |
| `TableHeader:"TableHeader.renderer".Sorted` | Sorted |  |
| `TableHeader:"TableHeader.renderer".States` | Enabled,MouseOver,Pressed,Disabled,Focused,Selected,Sorted |  |
| `TableHeader:"TableHeader.renderer".contentMargins` | Insets (2,5,4,5) | ![Insets (2,5,4,5)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_335.png) |
| `TableHeader:"TableHeader.renderer".opaque` | true |  |
| `TableHeader:"TableHeader.renderer"[Disabled+Sorted].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_336.png) |
| `TableHeader:"TableHeader.renderer"[Disabled].backgroundPainter` | Painter |  |
| `TableHeader:"TableHeader.renderer"[Enabled+Focused+Sorted].backgroundPainter` | Painter |  |
| `TableHeader:"TableHeader.renderer"[Enabled+Focused].backgroundPainter` | Painter |  |
| `TableHeader:"TableHeader.renderer"[Enabled+Sorted].backgroundPainter` | Painter |  |
| `TableHeader:"TableHeader.renderer"[Enabled].backgroundPainter` | Painter |  |
| `TableHeader:"TableHeader.renderer"[MouseOver].backgroundPainter` | Painter |  |
| `TableHeader:"TableHeader.renderer"[Pressed].backgroundPainter` | Painter |  |
| `TableHeader[Enabled].ascendingSortIconPainter` | Painter |  |
| `TableHeader[Enabled].descendingSortIconPainter` | Painter |  |

### List

| Key | Value | Preview |
| --- | --- | --- |
| `List.background` | `#ffffff (255,255,255)` |  |
| `List.cellNoFocusBorder` | Border Insets(2,5,2,5) | ![Border Insets(2,5,2,5)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_346.png) |
| `List.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_347.png) |
| `List.disabled` | `#d6d9df (214,217,223)` |  |
| `List.disabledText` | `#8e8f91 (142,143,145)` |  |
| `List.dropLineColor` | `#73a4d1 (115,164,209)` |  |
| `List.focusCellHighlightBorder` | Border Insets(2,5,2,5) | ![Border Insets(2,5,2,5)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_348.png) |
| `List.focusInputMap` |  |  |
| `List.focusInputMap.RightToLeft` |  |  |
| `List.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_349.png) |
| `List.foreground` | `#000000 (0,0,0)` |  |
| `List.opaque` | true |  |
| `List.rendererUseListColors` | true |  |
| `List.rendererUseUIBorder` | true |  |
| `List:"List.cellRenderer".contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_350.png) |
| `List:"List.cellRenderer".opaque` | true |  |
| `List:"List.cellRenderer"[Disabled].background` | `#39698a (57,105,138)` |  |
| `List:"List.cellRenderer"[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `List[Disabled+Selected].textBackground` | `#39698a (57,105,138)` |  |
| `List[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `List[Selected].textBackground` | `#39698a (57,105,138)` |  |
| `List[Selected].textForeground` | `#ffffff (255,255,255)` |  |

### PopupMenu

| Key | Value | Preview |
| --- | --- | --- |
| `PopupMenu.background` | `#d6d9df (214,217,223)` |  |
| `PopupMenu.consumeEventOnClose` | true |  |
| `PopupMenu.contentMargins` | Insets (6,1,6,1) | ![Insets (6,1,6,1)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_351.png) |
| `PopupMenu.disabled` | `#d6d9df (214,217,223)` |  |
| `PopupMenu.disabledText` | `#000000 (0,0,0)` |  |
| `PopupMenu.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_352.png) |
| `PopupMenu.foreground` | `#000000 (0,0,0)` |  |
| `PopupMenu.opaque` | true |  |
| `PopupMenu.selectedWindowInputMapBindings` | \[Ljava.lang.Object;@215f7107 |  |
| `PopupMenu.selectedWindowInputMapBindings.RightToLeft` | \[Ljava.lang.Object;@1fa12495 |  |
| `PopupMenu[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_353.png) |
| `PopupMenu[Enabled].backgroundPainter` | Painter |  |

### ToolTip

| Key | Value | Preview |
| --- | --- | --- |
| `ToolTip.background` | `#d6d9df (214,217,223)` |  |
| `ToolTip.contentMargins` | Insets (4,4,4,4) | ![Insets (4,4,4,4)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_355.png) |
| `ToolTip.disabled` | `#d6d9df (214,217,223)` |  |
| `ToolTip.disabledText` | `#000000 (0,0,0)` |  |
| `ToolTip.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_356.png) |
| `ToolTip.foreground` | `#000000 (0,0,0)` |  |
| `ToolTip[Enabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_357.png) |

### Separator

| Key | Value | Preview |
| --- | --- | --- |
| `Separator.background` | `#d6d9df (214,217,223)` |  |
| `Separator.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_358.png) |
| `Separator.disabled` | `#d6d9df (214,217,223)` |  |
| `Separator.disabledText` | `#000000 (0,0,0)` |  |
| `Separator.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_359.png) |
| `Separator.foreground` | `#000000 (0,0,0)` |  |
| `Separator[Enabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_360.png) |

### RadioButtonMenuItem

| Key | Value | Preview |
| --- | --- | --- |
| `RadioButtonMenuItem.background` | `#d6d9df (214,217,223)` |  |
| `RadioButtonMenuItem.checkIcon` | Icon 9 x 10 | ![Icon 9 x 10](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_361.png) |
| `RadioButtonMenuItem.contentMargins` | Insets (1,12,2,13) | ![Insets (1,12,2,13)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_362.png) |
| `RadioButtonMenuItem.disabled` | `#d6d9df (214,217,223)` |  |
| `RadioButtonMenuItem.disabledText` | `#8e8f91 (142,143,145)` |  |
| `RadioButtonMenuItem.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_363.png) |
| `RadioButtonMenuItem.foreground` | `#232324 (35,35,36)` |  |
| `RadioButtonMenuItem.textIconGap` | 5 |  |
| `RadioButtonMenuItem:MenuItemAccelerator.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_364.png) |
| `RadioButtonMenuItem:MenuItemAccelerator[MouseOver].textForeground` | `#ffffff (255,255,255)` |  |
| `RadioButtonMenuItem[Disabled+Selected].checkIconPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_365.png) |
| `RadioButtonMenuItem[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `RadioButtonMenuItem[Enabled+Selected].checkIconPainter` | Painter |  |
| `RadioButtonMenuItem[Enabled].textForeground` | `#232324 (35,35,36)` |  |
| `RadioButtonMenuItem[MouseOver+Selected].backgroundPainter` | Painter |  |
| `RadioButtonMenuItem[MouseOver+Selected].checkIconPainter` | Painter |  |
| `RadioButtonMenuItem[MouseOver+Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `RadioButtonMenuItem[MouseOver].backgroundPainter` | Painter |  |
| `RadioButtonMenuItem[MouseOver].textForeground` | `#ffffff (255,255,255)` |  |

### RadioButton

| Key | Value | Preview |
| --- | --- | --- |
| `RadioButton.background` | `#d6d9df (214,217,223)` |  |
| `RadioButton.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_370.png) |
| `RadioButton.disabled` | `#d6d9df (214,217,223)` |  |
| `RadioButton.disabledText` | `#8e8f91 (142,143,145)` |  |
| `RadioButton.focusInputMap` |  |  |
| `RadioButton.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_371.png) |
| `RadioButton.foreground` | `#000000 (0,0,0)` |  |
| `RadioButton.icon` | Icon 18 x 18 | ![Icon 18 x 18](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_372.png) |
| `RadioButton[Disabled+Selected].iconPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_373.png) |
| `RadioButton[Disabled].iconPainter` | Painter |  |
| `RadioButton[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `RadioButton[Enabled].iconPainter` | Painter |  |
| `RadioButton[Focused+MouseOver+Selected].iconPainter` | Painter |  |
| `RadioButton[Focused+MouseOver].iconPainter` | Painter |  |
| `RadioButton[Focused+Pressed+Selected].iconPainter` | Painter |  |
| `RadioButton[Focused+Pressed].iconPainter` | Painter |  |
| `RadioButton[Focused+Selected].iconPainter` | Painter |  |
| `RadioButton[Focused].iconPainter` | Painter |  |
| `RadioButton[MouseOver+Selected].iconPainter` | Painter |  |
| `RadioButton[MouseOver].iconPainter` | Painter |  |
| `RadioButton[Pressed+Selected].iconPainter` | Painter |  |
| `RadioButton[Pressed].iconPainter` | Painter |  |
| `RadioButton[Selected].iconPainter` | Painter |  |

### ToolBar

| Key | Value | Preview |
| --- | --- | --- |
| `ToolBar.East` | East |  |
| `ToolBar.North` | North |  |
| `ToolBar.South` | South |  |
| `ToolBar.States` | North,East,West,South |  |
| `ToolBar.West` | West |  |
| `ToolBar.ancestorInputMap` |  |  |
| `ToolBar.background` | `#d6d9df (214,217,223)` |  |
| `ToolBar.contentMargins` | Insets (2,2,2,2) | ![Insets (2,2,2,2)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_387.png) |
| `ToolBar.disabled` | `#d6d9df (214,217,223)` |  |
| `ToolBar.disabledText` | `#000000 (0,0,0)` |  |
| `ToolBar.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_388.png) |
| `ToolBar.foreground` | `#000000 (0,0,0)` |  |
| `ToolBar.handleIcon` | Icon 11 x 38 | ![Icon 11 x 38](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_389.png) |
| `ToolBar.opaque` | true |  |
| `ToolBar:Button.contentMargins` | Insets (4,4,4,4) | ![Insets (4,4,4,4)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_390.png) |
| `ToolBar:Button[Focused+MouseOver].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_391.png) |
| `ToolBar:Button[Focused+Pressed].backgroundPainter` | Painter |  |
| `ToolBar:Button[Focused].backgroundPainter` | Painter |  |
| `ToolBar:Button[MouseOver].backgroundPainter` | Painter |  |
| `ToolBar:Button[Pressed].backgroundPainter` | Painter |  |
| `ToolBar:ToggleButton.contentMargins` | Insets (4,4,4,4) | ![Insets (4,4,4,4)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_396.png) |
| `ToolBar:ToggleButton[Disabled+Selected].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_397.png) |
| `ToolBar:ToggleButton[Disabled+Selected].textForeground` | `#8e8f91 (142,143,145)` |  |
| `ToolBar:ToggleButton[Focused+MouseOver+Selected].backgroundPainter` | Painter |  |
| `ToolBar:ToggleButton[Focused+MouseOver].backgroundPainter` | Painter |  |
| `ToolBar:ToggleButton[Focused+Pressed+Selected].backgroundPainter` | Painter |  |
| `ToolBar:ToggleButton[Focused+Pressed].backgroundPainter` | Painter |  |
| `ToolBar:ToggleButton[Focused+Selected].backgroundPainter` | Painter |  |
| `ToolBar:ToggleButton[Focused].backgroundPainter` | Painter |  |
| `ToolBar:ToggleButton[MouseOver+Selected].backgroundPainter` | Painter |  |
| `ToolBar:ToggleButton[MouseOver].backgroundPainter` | Painter |  |
| `ToolBar:ToggleButton[Pressed+Selected].backgroundPainter` | Painter |  |
| `ToolBar:ToggleButton[Pressed].backgroundPainter` | Painter |  |
| `ToolBar:ToggleButton[Selected].backgroundPainter` | Painter |  |
| `ToolBar[East].borderPainter` | Painter |  |
| `ToolBar[Enabled].handleIconPainter` | Painter |  |
| `ToolBar[North].borderPainter` | Painter |  |
| `ToolBar[South].borderPainter` | Painter |  |
| `ToolBar[West].borderPainter` | Painter |  |

### "ComboBox.scrollPane"

| Key | Value | Preview |
| --- | --- | --- |
| `"ComboBox.scrollPane".contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_414.png) |

### ScrollPane

| Key | Value | Preview |
| --- | --- | --- |
| `ScrollPane.ancestorInputMap` |  |  |
| `ScrollPane.ancestorInputMap.RightToLeft` |  |  |
| `ScrollPane.background` | `#d6d9df (214,217,223)` |  |
| `ScrollPane.contentMargins` | Insets (3,3,3,3) | ![Insets (3,3,3,3)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_415.png) |
| `ScrollPane.disabled` | `#d6d9df (214,217,223)` |  |
| `ScrollPane.disabledText` | `#000000 (0,0,0)` |  |
| `ScrollPane.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_416.png) |
| `ScrollPane.foreground` | `#000000 (0,0,0)` |  |
| `ScrollPane.useChildTextComponentFocus` | true |  |
| `ScrollPane[Enabled+Focused].borderPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_417.png) |
| `ScrollPane[Enabled].borderPainter` | Painter |  |

### CheckBoxMenuItem

| Key | Value | Preview |
| --- | --- | --- |
| `CheckBoxMenuItem.background` | `#d6d9df (214,217,223)` |  |
| `CheckBoxMenuItem.checkIcon` | Icon 9 x 10 | ![Icon 9 x 10](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_419.png) |
| `CheckBoxMenuItem.contentMargins` | Insets (1,12,2,13) | ![Insets (1,12,2,13)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_420.png) |
| `CheckBoxMenuItem.disabled` | `#d6d9df (214,217,223)` |  |
| `CheckBoxMenuItem.disabledText` | `#8e8f91 (142,143,145)` |  |
| `CheckBoxMenuItem.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_421.png) |
| `CheckBoxMenuItem.foreground` | `#232324 (35,35,36)` |  |
| `CheckBoxMenuItem.textIconGap` | 5 |  |
| `CheckBoxMenuItem:MenuItemAccelerator.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_422.png) |
| `CheckBoxMenuItem:MenuItemAccelerator[MouseOver].textForeground` | `#ffffff (255,255,255)` |  |
| `CheckBoxMenuItem[Disabled+Selected].checkIconPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_423.png) |
| `CheckBoxMenuItem[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `CheckBoxMenuItem[Enabled+Selected].checkIconPainter` | Painter |  |
| `CheckBoxMenuItem[Enabled].textForeground` | `#232324 (35,35,36)` |  |
| `CheckBoxMenuItem[MouseOver+Selected].backgroundPainter` | Painter |  |
| `CheckBoxMenuItem[MouseOver+Selected].checkIconPainter` | Painter |  |
| `CheckBoxMenuItem[MouseOver+Selected].textForeground` | `#ffffff (255,255,255)` |  |
| `CheckBoxMenuItem[MouseOver].backgroundPainter` | Painter |  |
| `CheckBoxMenuItem[MouseOver].textForeground` | `#ffffff (255,255,255)` |  |

### Viewport

| Key | Value | Preview |
| --- | --- | --- |
| `Viewport.background` | `#d6d9df (214,217,223)` |  |
| `Viewport.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_428.png) |
| `Viewport.disabled` | `#d6d9df (214,217,223)` |  |
| `Viewport.disabledText` | `#000000 (0,0,0)` |  |
| `Viewport.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_429.png) |
| `Viewport.foreground` | `#000000 (0,0,0)` |  |
| `Viewport.opaque` | true |  |

### TextField

| Key | Value | Preview |
| --- | --- | --- |
| `TextField.background` | `#ffffff (255,255,255)` |  |
| `TextField.contentMargins` | Insets (6,6,6,6) | ![Insets (6,6,6,6)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_430.png) |
| `TextField.disabled` | `#d6d9df (214,217,223)` |  |
| `TextField.disabledText` | `#8e8f91 (142,143,145)` |  |
| `TextField.focusInputMap` |  |  |
| `TextField.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_431.png) |
| `TextField.foreground` | `#000000 (0,0,0)` |  |
| `TextField[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_432.png) |
| `TextField[Disabled].borderPainter` | Painter |  |
| `TextField[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `TextField[Enabled].backgroundPainter` | Painter |  |
| `TextField[Enabled].borderPainter` | Painter |  |
| `TextField[Focused].borderPainter` | Painter |  |
| `TextField[Selected].backgroundPainter` | Painter |  |
| `TextField[Selected].textForeground` | `#ffffff (255,255,255)` |  |

### SplitPane

| Key | Value | Preview |
| --- | --- | --- |
| `SplitPane.States` | Enabled,MouseOver,Pressed,Disabled,Focused,Selected,Vertical |  |
| `SplitPane.Vertical` | Vertical |  |
| `SplitPane.ancestorInputMap` |  |  |
| `SplitPane.background` | `#d6d9df (214,217,223)` |  |
| `SplitPane.centerOneTouchButtons` | true |  |
| `SplitPane.contentMargins` | Insets (1,1,1,1) | ![Insets (1,1,1,1)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_438.png) |
| `SplitPane.continuousLayout` | true |  |
| `SplitPane.disabled` | `#d6d9df (214,217,223)` |  |
| `SplitPane.disabledText` | `#000000 (0,0,0)` |  |
| `SplitPane.dividerSize` | 10 |  |
| `SplitPane.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_439.png) |
| `SplitPane.foreground` | `#000000 (0,0,0)` |  |
| `SplitPane.oneTouchButtonOffset` | 30 |  |
| `SplitPane.oneTouchExpandable` | false |  |
| `SplitPane.size` | 10 |  |
| `SplitPane:SplitPaneDivider.States` | Enabled,MouseOver,Pressed,Disabled,Focused,Selected,Vertical |  |
| `SplitPane:SplitPaneDivider.Vertical` | Vertical |  |
| `SplitPane:SplitPaneDivider.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_440.png) |
| `SplitPane:SplitPaneDivider[Enabled+Vertical].foregroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_441.png) |
| `SplitPane:SplitPaneDivider[Enabled].backgroundPainter` | Painter |  |
| `SplitPane:SplitPaneDivider[Enabled].foregroundPainter` | Painter |  |
| `SplitPane:SplitPaneDivider[Focused].backgroundPainter` | Painter |  |

### MenuItem

| Key | Value | Preview |
| --- | --- | --- |
| `MenuItem.background` | `#d6d9df (214,217,223)` |  |
| `MenuItem.contentMargins` | Insets (1,12,2,13) | ![Insets (1,12,2,13)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_445.png) |
| `MenuItem.disabled` | `#d6d9df (214,217,223)` |  |
| `MenuItem.disabledText` | `#8e8f91 (142,143,145)` |  |
| `MenuItem.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_446.png) |
| `MenuItem.foreground` | `#232324 (35,35,36)` |  |
| `MenuItem.textIconGap` | 5 |  |
| `MenuItem:MenuItemAccelerator.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_447.png) |
| `MenuItem:MenuItemAccelerator[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `MenuItem:MenuItemAccelerator[MouseOver].textForeground` | `#ffffff (255,255,255)` |  |
| `MenuItem[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `MenuItem[Enabled].textForeground` | `#232324 (35,35,36)` |  |
| `MenuItem[MouseOver].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_448.png) |
| `MenuItem[MouseOver].textForeground` | `#ffffff (255,255,255)` |  |

### OptionPane

| Key | Value | Preview |
| --- | --- | --- |
| `OptionPane.background` | `#d6d9df (214,217,223)` |  |
| `OptionPane.buttonOrientation` | 4 |  |
| `OptionPane.contentMargins` | Insets (15,15,15,15) | ![Insets (15,15,15,15)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_449.png) |
| `OptionPane.disabled` | `#d6d9df (214,217,223)` |  |
| `OptionPane.disabledText` | `#000000 (0,0,0)` |  |
| `OptionPane.errorIcon` | Icon 48 x 48 | ![Icon 48 x 48](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_450.png) |
| `OptionPane.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_451.png) |
| `OptionPane.foreground` | `#000000 (0,0,0)` |  |
| `OptionPane.informationIcon` | Icon 48 x 48 | ![Icon 48 x 48](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_452.png) |
| `OptionPane.isYesLast` | true |  |
| `OptionPane.messageAnchor` | 17 |  |
| `OptionPane.opaque` | true |  |
| `OptionPane.questionIcon` | Icon 48 x 48 |  |
| `OptionPane.sameSizeButtons` | false |  |
| `OptionPane.separatorPadding` | 0 |  |
| `OptionPane.warningIcon` | Icon 48 x 48 |  |
| `OptionPane.windowBindings` | \[Ljava.lang.Object;@3ff2cea2 |  |
| `OptionPane:"OptionPane.messageArea".contentMargins` | Insets (0,0,10,0) | ![Insets (0,0,10,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_455.png) |
| `OptionPane:"OptionPane.messageArea":"OptionPane.label".contentMargins` | Insets (0,10,10,10) | ![Insets (0,10,10,10)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_456.png) |
| `OptionPane:"OptionPane.messageArea":"OptionPane.label"[Enabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_457.png) |
| `OptionPane:"OptionPane.separator".contentMargins` | Insets (1,0,0,0) | ![Insets (1,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_458.png) |
| `OptionPane[Enabled].errorIconPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_459.png) |
| `OptionPane[Enabled].informationIconPainter` | Painter |  |
| `OptionPane[Enabled].questionIconPainter` | Painter |  |
| `OptionPane[Enabled].warningIconPainter` | Painter |  |

### ArrowButton

| Key | Value | Preview |
| --- | --- | --- |
| `ArrowButton.background` | `#d6d9df (214,217,223)` |  |
| `ArrowButton.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_463.png) |
| `ArrowButton.disabled` | `#d6d9df (214,217,223)` |  |
| `ArrowButton.disabledText` | `#000000 (0,0,0)` |  |
| `ArrowButton.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_464.png) |
| `ArrowButton.foreground` | `#000000 (0,0,0)` |  |
| `ArrowButton.size` | 16 |  |
| `ArrowButton[Disabled].foregroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_465.png) |
| `ArrowButton[Enabled].foregroundPainter` | Painter |  |

### Label

| Key | Value | Preview |
| --- | --- | --- |
| `Label.background` | `#d6d9df (214,217,223)` |  |
| `Label.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_467.png) |
| `Label.disabled` | `#d6d9df (214,217,223)` |  |
| `Label.disabledText` | `#8e8f91 (142,143,145)` |  |
| `Label.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_468.png) |
| `Label.foreground` | `#000000 (0,0,0)` |  |
| `Label[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |

### ProgressBar

| Key | Value | Preview |
| --- | --- | --- |
| `ProgressBar.Finished` | Finished |  |
| `ProgressBar.Indeterminate` | Indeterminate |  |
| `ProgressBar.States` | Enabled,Disabled,Indeterminate,Finished |  |
| `ProgressBar.background` | `#d6d9df (214,217,223)` |  |
| `ProgressBar.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_469.png) |
| `ProgressBar.cycleTime` | 250 |  |
| `ProgressBar.disabled` | `#d6d9df (214,217,223)` |  |
| `ProgressBar.disabledText` | `#8e8f91 (142,143,145)` |  |
| `ProgressBar.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_470.png) |
| `ProgressBar.foreground` | `#000000 (0,0,0)` |  |
| `ProgressBar.horizontalSize` | Dimension (150,19) | ![Dimension (150,19)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_471.png) |
| `ProgressBar.paintOutsideClip` | true |  |
| `ProgressBar.rotateText` | true |  |
| `ProgressBar.tileWhenIndeterminate` | true |  |
| `ProgressBar.tileWidth` | 27 |  |
| `ProgressBar.vertictalSize` | Dimension (19,150) | ![Dimension (19,150)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_472.png) |
| `ProgressBar[Disabled+Finished].foregroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_473.png) |
| `ProgressBar[Disabled+Indeterminate].foregroundPainter` | Painter |  |
| `ProgressBar[Disabled+Indeterminate].progressPadding` | 3 |  |
| `ProgressBar[Disabled].backgroundPainter` | Painter |  |
| `ProgressBar[Disabled].foregroundPainter` | Painter |  |
| `ProgressBar[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `ProgressBar[Enabled+Finished].foregroundPainter` | Painter |  |
| `ProgressBar[Enabled+Indeterminate].foregroundPainter` | Painter |  |
| `ProgressBar[Enabled+Indeterminate].progressPadding` | 3 |  |
| `ProgressBar[Enabled].backgroundPainter` | Painter |  |
| `ProgressBar[Enabled].foregroundPainter` | Painter |  |

### ScrollBar

| Key | Value | Preview |
| --- | --- | --- |
| `ScrollBar.ancestorInputMap` |  |  |
| `ScrollBar.ancestorInputMap.RightToLeft` |  |  |
| `ScrollBar.background` | `#d6d9df (214,217,223)` |  |
| `ScrollBar.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_481.png) |
| `ScrollBar.decrementButtonGap` | \-8 |  |
| `ScrollBar.disabled` | `#d6d9df (214,217,223)` |  |
| `ScrollBar.disabledText` | `#000000 (0,0,0)` |  |
| `ScrollBar.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_482.png) |
| `ScrollBar.foreground` | `#000000 (0,0,0)` |  |
| `ScrollBar.incrementButtonGap` | \-8 |  |
| `ScrollBar.maximumThumbSize` | Dimension (1000,1000) | ![Dimension (1000,1000)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_483.png) |
| `ScrollBar.minimumThumbSize` | Dimension (29,29) | ![Dimension (29,29)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_484.png) |
| `ScrollBar.opaque` | true |  |
| `ScrollBar.thumbHeight` | 15 |  |
| `ScrollBar:"ScrollBar.button".contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_485.png) |
| `ScrollBar:"ScrollBar.button".size` | 25 |  |
| `ScrollBar:"ScrollBar.button"[Disabled].foregroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_486.png) |
| `ScrollBar:"ScrollBar.button"[Enabled].foregroundPainter` | Painter |  |
| `ScrollBar:"ScrollBar.button"[MouseOver].foregroundPainter` | Painter |  |
| `ScrollBar:"ScrollBar.button"[Pressed].foregroundPainter` | Painter |  |
| `ScrollBar:ScrollBarThumb.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_490.png) |
| `ScrollBar:ScrollBarThumb[Enabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_491.png) |
| `ScrollBar:ScrollBarThumb[MouseOver].backgroundPainter` | Painter |  |
| `ScrollBar:ScrollBarThumb[Pressed].backgroundPainter` | Painter |  |
| `ScrollBar:ScrollBarTrack.contentMargins` | Insets (0,0,0,0) | ![Insets (0,0,0,0)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_494.png) |
| `ScrollBar:ScrollBarTrack[Disabled].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_495.png) |
| `ScrollBar:ScrollBarTrack[Enabled].backgroundPainter` | Painter |  |

### "Table.editor"

| Key | Value | Preview |
| --- | --- | --- |
| `"Table.editor".background` | `#ffffff (255,255,255)` |  |
| `"Table.editor".contentMargins` | Insets (3,5,3,5) | ![Insets (3,5,3,5)](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_497.png) |
| `"Table.editor".opaque` | true |  |
| `"Table.editor"[Disabled].textForeground` | `#8e8f91 (142,143,145)` |  |
| `"Table.editor"[Enabled+Focused].backgroundPainter` | Painter | ![Painter](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_498.png) |
| `"Table.editor"[Enabled].backgroundPainter` | Painter |  |
| `"Table.editor"[Selected].textForeground` | `#ffffff (255,255,255)` |  |

## Others

| Key | Value | Preview |
| --- | --- | --- |
| `FileView.computerIcon` | Icon 16 x 16 | ![Icon 16 x 16](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_500.png) |
| `FileView.directoryIcon` | Icon 16 x 16 |  |
| `FileView.fileIcon` | Icon 16 x 16 |  |
| `FileView.floppyDriveIcon` | Icon 16 x 16 |  |
| `FileView.fullRowSelection` | true |  |
| `FileView.hardDriveIcon` | Icon 16 x 16 |  |
| `ScrollBarThumb.background` | `#d6d9df (214,217,223)` |  |
| `ScrollBarThumb.disabled` | `#d6d9df (214,217,223)` |  |
| `ScrollBarThumb.disabledText` | `#000000 (0,0,0)` |  |
| `ScrollBarThumb.font` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_505.png) |
| `ScrollBarThumb.foreground` | `#000000 (0,0,0)` |  |
| `ScrollBarTrack.background` | `#d6d9df (214,217,223)` |  |
| `ScrollBarTrack.disabled` | `#d6d9df (214,217,223)` |  |
| `ScrollBarTrack.disabledText` | `#000000 (0,0,0)` |  |
| `ScrollBarTrack.font` | Font SansSerif 12 |  |
| `ScrollBarTrack.foreground` | `#000000 (0,0,0)` |  |
| `SliderThumb.background` | `#d6d9df (214,217,223)` |  |
| `SliderThumb.disabled` | `#d6d9df (214,217,223)` |  |
| `SliderThumb.disabledText` | `#000000 (0,0,0)` |  |
| `SliderThumb.font` | Font SansSerif 12 |  |
| `SliderThumb.foreground` | `#000000 (0,0,0)` |  |
| `SliderTrack.background` | `#d6d9df (214,217,223)` |  |
| `SliderTrack.disabled` | `#d6d9df (214,217,223)` |  |
| `SliderTrack.disabledText` | `#000000 (0,0,0)` |  |
| `SliderTrack.font` | Font SansSerif 12 |  |
| `SliderTrack.foreground` | `#000000 (0,0,0)` |  |
| `TitledBorder.border` | Border Insets(10,10,10,10) |  |
| `TitledBorder.font` | Font SansSerif 12 Bold | ![Font SansSerif 12 Bold](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_509.png) |
| `TitledBorder.position` | ABOVE\_TOP |  |
| `TitledBorder.titleColor` | `#3b3b3b (59,59,59)` |  |
| `TitledBorder.titlePosition` | 1 |  |
| `defaultFont` | Font SansSerif 12 | ![Font SansSerif 12 ](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/_nimbusDefaults_files/img_510.png) |

## UI Classes

| Key | Value | Preview |
| --- | --- | --- |
| `ArrowButtonUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ButtonUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `CheckBoxMenuItemUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `CheckBoxUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ColorChooserUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ComboBoxUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `DesktopIconUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `DesktopPaneUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `EditorPaneUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `FileChooserUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `FormattedTextFieldUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `InternalFrameTitlePaneUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `InternalFrameUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `LabelUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ListUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `MenuBarUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `MenuItemUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `MenuUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `OptionPaneUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `PanelUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `PasswordFieldUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `PopupMenuSeparatorUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `PopupMenuUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ProgressBarUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `RadioButtonMenuItemUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `RadioButtonUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `RootPaneUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ScrollBarUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ScrollPaneUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `SeparatorUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `SliderUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `SpinnerUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `SplitPaneUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `TabbedPaneUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `TableHeaderUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `TableUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `TextAreaUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `TextFieldUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `TextPaneUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ToggleButtonUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ToolBarSeparatorUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ToolBarUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ToolTipUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `TreeUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
| `ViewportUI` | javax.swing.plaf.synth.SynthLookAndFeel |  |
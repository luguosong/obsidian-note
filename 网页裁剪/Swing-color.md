---
分类:
  - "网页裁剪"
标题: "Changing the Color Theme (The Java™ Tutorials >        
            Creating a GUI With Swing > Modifying the Look and Feel)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/color.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-plaf|How to Set the Look and Feel]]

[[Swing-synth|The Synth Look and Feel]]

[[Swing-synthExample|A Synth Example]]

[[Swing-nimbus|Nimbus Look and Feel]]

[[Swing-custom|Changing the Look of Nimbus]]

[[Swing-size|Resizing a Component]]

Changing the Color Theme

[[Swing-size|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-拖放|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Changing the Color Theme

The Nimbus look and feel has a set of default colors, but you are not required to use them. You can change the colors to match your corporate brand or other color scheme.

All of the colors used by Nimbus are stored as a set of `UIManager` properties. You can change any or all of these properties before you set the look and feel. For example:

```
UIManager.put("nimbusBase", new Color(...));
UIManager.put("nimbusBlueGrey", new Color(...));
UIManager.put("control", new Color(...));

for (LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
    if ("Nimbus".equals(info.getName())) {
        UIManager.setLookAndFeel(info.getClassName());
        break;
    }
}
```

These three base colors, `nimbusBase`, `nimbusBlueGrey`, and `control`, will address most of your needs. See a full list of color keys and their default values on the [[Swing-_nimbusDefaults|Nimbus Defaults]] page.
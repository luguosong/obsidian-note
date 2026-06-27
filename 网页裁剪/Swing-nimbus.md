---
分类:
  - "网页裁剪"
标题: "Nimbus 外观"
描述: "《Java 教程》Swing 外观课程，介绍 Java SE 6 Update 10 引入的 Nimbus 外观——使用 Java 2D 矢量图形绘制 UI、高度可定制，以及三种启用 Nimbus 的方式。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/nimbus.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# Nimbus 外观

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## Nimbus 外观

Nimbus 是在 Java SE 6 Update 10 (6u10) 发行版中引入的精心打造的跨平台外观。以下来自 SwingSet3 的屏幕截图展示了 Nimbus 外观。

![使用 Nimbus 外观的 SwingSet3 屏幕截图](https://docs.oracle.com/javase/tutorial/figures/uiswing/lookandfeel/nimbus.png)

Nimbus 使用 Java 2D 矢量图形来绘制用户界面(UI)，而不是静态位图，因此 UI 可以以任何分辨率清晰地渲染。

Nimbus 高度可定制。你可以直接使用 Nimbus 外观，也可以用自己的品牌*皮肤化*（自定义）外观。

## 启用 Nimbus 外观

为了向后兼容，Metal 仍然是默认的 Swing 外观，但你可以通过以下三种方式之一切换到 Nimbus：

- 在创建图形用户界面(GUI) 之前，将以下代码添加到事件分发线程：
	```java
	import javax.swing.UIManager.*;
	try {
	    for (LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
	        if ("Nimbus".equals(info.getName())) {
	            UIManager.setLookAndFeel(info.getClassName());
	            break;
	        }
	    }
	} catch (Exception e) {
	    // 如果 Nimbus 不可用，你可以将 GUI 设置为其他外观。
	}
	```
	第一行代码检索平台所有已安装的外观实现列表，然后遍历列表以确定 Nimbus 是否可用。如果可用，则将 Nimbus 设置为外观。
	---
	**版本说明：** 不要通过调用 `UIManager.setLookAndFeel` 方法显式设置 Nimbus 外观，因为并非所有版本或实现的 Java SE 6 都支持 Nimbus。此外，Nimbus 包的位置在 JDK 6 Update 10 和 JDK 7 发行版之间发生了变化。遍历所有已安装的外观实现是一种更健壮的方法，因为如果 Nimbus 不可用，则使用默认外观。对于 JDK 6 Update 10 发行版，Nimbus 包位于 `com.sun.java.swing.plaf.nimbus.NimbusLookAndFeel`。
	---
- 在命令行中为特定应用程序指定 Nimbus 作为默认外观，如下所示：

	```bash
	java -Dswing.defaultlaf=javax.swing.plaf.nimbus.NimbusLookAndFeel MyApp
	```

- 通过在 `<*JAVA_HOME*>/lib/swing.properties` 文件中添加以下行，永久地将默认外观设置为 Nimbus：

	```bash
	swing.defaultlaf=javax.swing.plaf.nimbus.NimbusLookAndFeel
	```

	如果 `swing.properties` 文件尚不存在，你需要创建它。

---
分类:
  - "网页裁剪"
标题: "Synth 外观"
描述: "《Java 教程》Swing 外观课程，全面介绍 Synth 外观框架——通过 XML 文件创建自定义外观，涵盖 Synth 架构、区域(region)、SynthStyle、XML 文件格式、bind 元素、state 元素、颜色字体、图片绘制、属性和自定义画家的使用。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/synth.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# Synth 外观

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## Synth 外观

创建自定义外观或修改现有外观可能是一项艰巨的任务。[`javax.swing.plaf.synth`](https://docs.oracle.com/javase/8/docs/api/javax/swing/plaf/synth/package-summary.html) 包可用于以更少的工作量创建自定义外观。你可以通过编程方式或通过外部 XML 文件创建 Synth 外观。以下讨论致力于使用外部 XML 文件创建 Synth 外观。以编程方式创建 Synth 外观在 API 文档中讨论。

使用 Synth 外观时，你提供"外观"。Synth 本身提供"感觉"。因此，你可以将 Synth L&F 视为一种"皮肤(skin)"。

## Synth 架构

回想上一主题，每个 L&F 负责为 Swing 定义的许多 `ComponentUI` 子类中的每一个提供具体实现。Synth L&F 为你处理此问题。要使用 Synth，你不需要创建任何 `ComponentUI`——你只需指定每个组件的绘制方式以及影响布局和大小的各种属性。

Synth 在比组件更细粒度的级别上操作——此细粒度级别称为"区域(region)"。每个组件有一个或多个区域。许多组件只有一个区域，如 `JButton`。其他组件有多个区域，如 `JScrollBar`。Synth 提供的每个 `ComponentUI` 将 `SynthStyle` 与 `ComponentUI` 定义的每个区域关联。例如，Synth 为 `JScrollBar` 定义三个区域：轨道、滑块和滚动条本身。Synth 的 `ScrollBarUI`（为 `JScrollBar` 定义的 `ComponentUI` 子类）实现将 `SynthStyle` 与这些区域中的每一个关联。

![Synth 架构图](https://docs.oracle.com/javase/tutorial/figures/uiswing/lookandfeel/synthArch.gif)

`SynthStyle` 提供 Synth `ComponentUI` 实现使用的样式信息。例如，`SynthStyle` 定义前景色和背景色、字体信息等。此外，每个 `SynthStyle` 都有一个用于绘制区域的 `SynthPainter`。例如，`SynthPainter` 定义了 `paintScrollBarThumbBackground` 和 `paintScrollBarThumbBorder` 两个方法，用于绘制滚动条滑块区域。

Synth 中的每个 `ComponentUI` 使用 `SynthStyleFactory` 获取 `SynthStyle`。有两种定义 `SynthStyleFactory` 的方式：通过 Synth XML 文件或以编程方式。以下代码展示如何加载指定 Synth 外观的 XML 文件——这在底层创建了一个用 XML 文件中的 `SynthStyle` 填充的 `SynthStyleFactory` 实现：

```java
SynthLookAndFeel laf = new SynthLookAndFeel();
laf.load(MyClass.class.getResourceAsStream("laf.xml"), MyClass.class);
UIManager.setLookAndFeel(laf);
```

编程方式涉及创建返回 `SynthStyle` 的 `SynthStyleFactory` 实现。以下代码创建一个自定义 `SynthStyleFactory`，为按钮和树返回不同的 `SynthStyle`：

```java
class MyStyleFactory extends SynthStyleFactory {
    public SynthStyle getStyle(JComponent c, Region id) {
        if (id == Region.BUTTON) {
            return buttonStyle;
        }
        else if (id == Region.TREE) {
            return treeStyle;
        }
        return defaultStyle;
    }
}
SynthLookAndFeel laf = new SynthLookAndFeel();
UIManager.setLookAndFeel(laf);
SynthLookAndFeel.setStyleFactory(new MyStyleFactory());
```

## XML 文件

Synth XML 文件的 DTD 说明可以在 [`javax.swing.plaf.synth/doc-files/synthFileFormat.html`](https://docs.oracle.com/javase/8/docs/api/javax/swing/plaf/synth/doc-files/synthFileFormat.html) 找到。

加载 Synth 外观时，只有那些有定义（如下面讨论的绑定到区域的"样式"）的 GUI 组件（或区域）才会被渲染。任何组件都没有默认行为——如果没有 Synth XML 文件中的样式定义，GUI 就是一张空白画布。

要指定组件（或区域）的渲染，你的 XML 文件必须包含一个 `<style>` 元素，然后使用 `<bind>` 元素将其*绑定*到区域。例如，让我们定义一个包含字体、前景色和背景色的样式，然后将该样式绑定到所有组件。在开发 Synth XML 文件时包含这样的元素是个好主意——这样，你尚未定义的任何组件至少会有颜色和字体：

```xml
<synth>
  <style id="basicStyle">
    <font name="Verdana" size="16"/>
    <state>
      <color value="WHITE" type="BACKGROUND"/>
      <color value="BLACK" type="FOREGROUND"/>
    </state>
  </style>
  <bind style="basicStyle" type="region" key=".*"/>
</synth>
```

让我们分析此样式定义：

1. `<style>` 元素是 Synth XML 文件的基本构建块。它包含描述区域渲染所需的所有信息。一个 `<style>` 元素可以描述多个区域，如此处所做。但通常，最好为每个组件或区域创建一个 `<style>` 元素。注意 `<style>` 元素被赋予了一个标识符——字符串 "basicStyle"。此标识符稍后将在 `<bind>` 元素中使用。
2. `<style>` 元素的 `<font>` 元素将字体设置为 Verdana，大小 16。
3. `<style>` 元素的 `<state>` 元素将在下面讨论。区域的 `<state>` 元素可以有七种可能值中的一个或组合。当未指定值时，定义适用于所有状态，这就是这里的意图。因此，背景色和前景色"适用于所有状态"在此元素中定义。
4. 最后，刚刚定义的标识符为 "basicStyle" 的 `<style>` 元素被*绑定*到所有区域。`<bind>` 元素将 "basicStyle" 绑定到 "region" 类型。绑定适用于哪些区域类型由 "key" 属性给出，在本例中为 ".*"，即"全部"的正则表达式。

在创建一些可运行的示例之前，让我们看看 Synth XML 文件的各个部分。我们从 `<bind>` 元素开始，展示给定的 `<style>` 如何应用于组件或区域。

## `<bind>` 元素

每当定义 `<style>` 元素时，它必须绑定到一个或多个组件或区域才能生效。`<bind>` 元素用于此目的。它需要三个属性：

1. `style` 是先前定义的样式的唯一标识符。
2. `type` 是 "name" 或 "region"。如果 `type` 是 name，则通过 `component.getName()` 方法获取名称。如果 `type` 是 region，则使用 `javax.swing.plaf.synth` 包中 `Region` 类中定义的适当常量。
3. `key` 是用于确定样式绑定到哪些组件或区域的正则表达式。

Region 是标识组件或组件部分的一种方式。区域基于 [`Region`](https://docs.oracle.com/javase/8/docs/api/javax/swing/plaf/synth/Region.html) 类中的常量，通过去除下划线来修改。

例如，要标识 SPLIT\_PANE 区域，你可以使用 SPLITPANE、splitpane 或 SplitPane（不区分大小写）。

当你将样式绑定到区域时，该样式将应用于具有该区域的*所有*组件。你可以将样式绑定到多个区域，也可以将多个样式绑定到一个区域。例如，

```xml
<style id="styleOne">
   <!-- styleOne 定义放在这里 -->
</style>

<style id="styleTwo">
   <!-- styleTwo 定义放在这里 -->
</style>

<bind style="styleOne" type="region" key="Button"/>
<bind style="styleOne" type="region" key="RadioButton"/>
<bind style="styleOne" type="region" key="ArrowButton"/>

<bind style="styleTwo" type="region" key="ArrowButton"/>
```

你可以绑定到单独的命名组件，无论它们是否*也*作为区域绑定。例如，假设你希望 GUI 中的"确定"和"取消"按钮与其他所有按钮不同处理。首先，你将使用 `component.setName()` 方法为确定和取消按钮命名。然后，你将定义三个样式：一个用于一般按钮（region = "Button"），一个用于确定按钮（name = "OK"），一个用于取消按钮（name = "Cancel"）。最后，你将像这样绑定这些样式：

```xml
<bind style="styleButton" type="region" key="Button">
<bind style="styleOK" type="name" key="OK">
<bind style="styleCancel" type="name" key="Cancel">
```

结果是"确定"按钮绑定到 "styleButton" *和* "styleOK"，而"取消"按钮绑定到 "styleButton" *和* "styleCancel"。

当一个组件或区域绑定到多个样式时，样式将合并。

---

**注意：**

正如样式可以绑定到多个区域或名称一样，多个样式也可以绑定到一个区域或名称。这些多个样式为该区域或名称合并。文件中后面定义的样式优先。

---

## `<state>` 元素

`<state>` 元素允许你为区域定义取决于其"状态"的外观。例如，你通常希望被按下的按钮（`PRESSED`）看起来与其 `ENABLED` 状态下的按钮不同。`<state>` 有七种在 Synth XML DTD 中定义的可能值。它们是：

1. ENABLED
2. MOUSE\_OVER
3. PRESSED
4. DISABLED
5. FOCUSED
6. SELECTED
7. DEFAULT

你还可以有以 'and' 分隔的复合状态——例如 ENABLED and FOCUSED。如果不指定值，则定义的外观适用于所有状态。

例如，以下是指定每个状态的画家的样式。所有按钮以某种方式绘制，除非状态为 "PRESSED"，在这种情况下它们以不同方式绘制：

```xml
<style id="buttonStyle">
  <property key="Button.textShiftOffset" type="integer" value="1"/>
  <insets top="10" left="10" right="10" bottom="10"/>

  <state>
    <imagePainter method="buttonBackground" path="images/button.png"
                         sourceInsets="10 10 10 10"/>
  </state>
  <state value="PRESSED">
    <color value="#9BC3B1" type="BACKGROUND"/>
    <imagePainter method="buttonBackground" path="images/button2.png"
                        sourceInsets="10 10 10 10"/>
  </state>
</style>
<bind style="buttonStyle" type="region" key="Button"/>
```

暂时忽略 `<property>` 和 `<insets>` 元素，你可以看到按下的按钮与未按下的按钮绘制方式不同。

使用的 `<state>` 值是最接近匹配区域状态的已定义状态。匹配由匹配区域状态值的数量确定。如果没有状态值匹配，则使用没有值的那个状态。如果有匹配，选择具有最多单独匹配的状态。例如，以下代码定义了三个状态：

```xml
<state id="zero">
  <color value="RED" type="BACKGROUND"/>
</state>
<state value="SELECTED and PRESSED" id="one">
  <color value="RED" type="BACKGROUND"/>
</state>
<state value="SELECTED" id="two">
  <color value="BLUE" type="BACKGROUND"/>
</state>
```

如果区域状态至少包含 SELECTED 和 PRESSED，则选择状态一。如果状态包含 SELECTED 但不包含 PRESSED，则使用状态二。如果状态既不包含 SELECTED 也不包含 PRESSED，则使用状态零。

当当前状态与两个状态定义匹配相同数量的值时，使用样式中首先定义的那个。例如，`MOUSE_OVER` 状态对于 `PRESSED` 按钮总是为 true（除非鼠标悬停在按钮上，否则无法按下它）。因此，如果 `MOUSE_OVER` 状态先声明，它将始终优先于 `PRESSED` 被选择，为 `PRESSED` 定义的任何绘制都不会执行。

```xml
<state value="PRESSED">
   <imagePainter method="buttonBackground" path="images/button_press.png"
                          sourceInsets="9 10 9 10" />
   <color type="TEXT_FOREGROUND" value="#FFFFFF"/>
</state>

<state value="MOUSE_OVER">
   <imagePainter method="buttonBackground" path="images/button_on.png"
                          sourceInsets="10 10 10 10" />
   <color type="TEXT_FOREGROUND" value="#FFFFFF"/>
</state>
```

上面的代码将正常工作。但是，如果你在文件中反转 `MOUSE_OVER` 和 `PRESSED` 状态的顺序，`PRESSED` 状态将永远不会被使用。这是因为任何 `PRESSED` 状态*也*是 `MOUSE_OVER` 状态。由于 `MOUSE_OVER` 状态先定义，所以它是将被使用的。

## 颜色和字体

`<color>` 元素需要两个属性：

1. `value` 可以是任何 `java.awt.Color` 常量，如 RED、WHITE、BLACK、BLUE 等。它也可以是 RGB 值的十六进制表示，如 #FF00FF 或 #326A3B。
2. `type` 描述颜色应用的位置——可以是 BACKGROUND、FOREGROUND、FOCUS、TEXT\_BACKGROUND 或 TEXT\_FOREGROUND。

例如：

```xml
<style id="basicStyle">
  <state>
    <color value="WHITE" type="BACKGROUND"/>
    <color value="BLACK" type="FOREGROUND"/>
  </state>
</style>
```

`<font>` 元素有三个属性：

1. `name` —— 字体名称。例如 Arial 或 Verdana。
2. `size` —— 字体大小（以像素为单位）。
3. `style`（可选）—— BOLD、ITALIC 或 BOLD ITALIC。如果省略，则获得正常字体。

例如：

```xml
<style id="basicStyle">
  <font name="Verdana" size="16"/>
</style>
```

`<color>` 元素和 `<font>` 元素都有另一种用法。每个都可以有 `id` 属性或 `idref` 属性。使用 `id` 属性，你可以定义一个颜色，稍后使用 `idref` 属性重用它。例如，

```xml
<color id="backColor" value="WHITE" type="BACKGROUND"/>
<font id="textFont" name="Verdana" size="16"/>
...
...
...
<color idref="backColor"/>
<font idref="textFont"/>
```

## 内边距

`insets` 在组件绘制时增加其大小。例如，没有内边距时，标题为 `Cancel` 的按钮刚好大到足以在所选字体中包含标题。使用如下 `<insets>` 元素

`<insets top="15" left="20" right="20" bottom="15"/>`,

按钮将在标题上方和下方各增大 15 像素，在标题左右各增大 20 像素。

## 使用图片绘制

Synth 的文件格式允许通过图片自定义绘制。Synth 的图片画家将图片分为九个不同的区域：上、右上、右、右下、下、左下、左、左上和中心。这些区域中的每一个都被绘制到目标中。上、左、下和右边缘被平铺或拉伸，而角落部分（`sourceInsets`）保持固定。

---

**注意：**

`<insets>` 元素和 `sourceInsets` 属性之间没有关系。`<insets>` 元素定义区域占据的空间，而 `sourceInsets` 属性定义如何绘制图片。`<insets>` 和 `sourceInsets` 通常相似，但不必相同。

---

你可以使用 `paintCenter` 属性指定是否应绘制中心区域。下图显示了九个区域：

![九个图片区域](https://docs.oracle.com/javase/tutorial/figures/uiswing/lookandfeel/regions.gif)

让我们创建一个按钮作为示例。为此我们可以使用以下图片（显示比实际尺寸更大）：

![按钮图片](https://docs.oracle.com/javase/tutorial/figures/uiswing/lookandfeel/bigButton.png)

左上角的红框是 10 像素正方形（包括框边框）——它显示了绘制时不应拉伸的角落区域。为此，顶部和左侧的 `sourceInsets` 应设置为 10。我们将使用以下样式和绑定：

```xml
<style id="buttonStyle">
   <insets top="15" left="20" right="20" bottom="15"/>
   <state>
      <imagePainter method="buttonBackground" path="images/button.png"
        sourceInsets="10 10 10 10"/>
   </state>
</style>
<bind style="buttonStyle" type="region" key="button"/>
```

`<state>` 元素内的行指定按钮背景应使用图片 `images/button.png` 绘制。该路径相对于传递给 SynthLookAndFeel 的 load 方法的 Class。`sourceInsets` 属性指定不拉伸的图片区域。在本例中，上、左、下和右内边距各为 10。这将导致画家不拉伸图片每个角落的 10 x 10 像素区域。

`<bind>` 将 `buttonStyle` 绑定到所有按钮。

`<imagePainter>` 元素提供渲染区域部分所需的所有信息。它只需要几个属性：

- method —— 指定要使用 `javax.swing.plaf.synth.SynthPainter` 类中的哪个方法进行绘制。`SynthPainter` 类包含约 100 个以 `paint` 开头的方法。确定需要哪个后，去掉 `paint` 前缀，将剩余首字母改为小写，并将结果用作 `method` 属性。例如，`SynthPainter` 方法 `paintButtonBackground` 变为属性 `buttonBackground`。
- path —— 要使用的图片的路径，相对于传递给 SynthLookAndFeel 的 load 方法的 Class。
- sourceInsets —— 以像素为单位的内边距，表示不应拉伸的角落区域的宽度和高度。它们按上、左、下、右的顺序映射。
- paintCenter（可选）：此属性让你保留图片的中心或去除它（例如在文本字段中，以便绘制文本）。

以下清单显示根据按钮的 `<state>` 加载不同图片的 XML 代码

```xml
<style id="buttonStyle">
  <property key="Button.textShiftOffset" type="integer" value="1"/>
  <insets top="15" left="20" right="20" bottom="15"/>
  <state>
    <imagePainter method="buttonBackground" path="images/button.png"
                  sourceInsets="10 10 10 10"/>
  </state>
  <state value="PRESSED">
    <imagePainter method="buttonBackground" path="images/button2.png"
                  sourceInsets="10 10 10 10"/>
  </state>
</style>
<bind style="buttonStyle" type="region" key="button"/>
```

button2.png 显示 button.png 的按下版本，向右偏移一像素。行

```xml
<property key="Button.textShiftOffset" type="integer" value="1"/>
```

相应地偏移按钮文本，如下一节所述。

## `<property>` 元素

`<property>` 元素用于向 `<style>` 元素添加键值对。许多组件使用键值对配置其视觉外观。

`<property>` 元素有三个属性：

- `key` —— 属性的名称。
- `type` —— 属性的数据类型。
- `value` —— 属性的值。

有一个属性表(`componentProperties.html`) 列出每个组件支持的属性：[`javax/swing/plaf/synth/doc-files/componentProperties.html`](https://docs.oracle.com/javase/8/docs/api/javax/swing/plaf/synth/doc-files/componentProperties.html)。

由于 button2.png 图片在按下时将可视按钮偏移一像素，我们还应偏移按钮文本。有一个按钮属性可以做到这一点：

```xml
<property key="Button.textShiftOffset" type="integer" value="1"/>
```

## 示例

以下是一个示例，使用上面定义的按钮样式。按钮样式加上绑定到所有区域的字体和颜色定义的"背景样式"（类似于上面标题为"XML 文件"一节中显示的 "basicStyle"）组合在 [`buttonSkin.xml`](https://docs.oracle.com/javase/tutorial/uiswing/examples/lookandfeel/SynthApplicationProject/src/lookandfeel/buttonSkin.xml) 中。以下是 `buttonSkin.xml` 的清单：

```xml
<!-- 包含按钮图片的 Synth 皮肤 -->
<synth>
  <!-- 所有区域将使用的样式 -->
  <style id="backingStyle">
    <!-- 使使用此皮肤的所有区域不透明 -->
    <opaque value="TRUE"/>
    <font name="Dialog" size="12"/>
    <state>
      <!-- 提供默认颜色 -->
      <color value="#9BC3B1" type="BACKGROUND"/>
      <color value="RED" type="FOREGROUND"/>
    </state>
  </style>
  <bind style="backingStyle" type="region" key=".*"/>
  <style id="buttonStyle">
    <!-- 按下时将文本偏移一像素 -->
    <property key="Button.textShiftOffset" type="integer" value="1"/>
    <insets top="15" left="20" right="20" bottom="15"/>
    <state>
      <imagePainter method="buttonBackground" path="images/button.png"
                    sourceInsets="10 10 10 10"/>
    </state>
    <state value="PRESSED">
      <imagePainter method="buttonBackground" path="images/button2.png"
                    sourceInsets="10 10 10 10"/>
    </state>
  </style>
  <!-- 将 buttonStyle 绑定到所有 JButton -->
  <bind style="buttonStyle" type="region" key="button"/>
</synth>
```

我们可以加载此 XML 文件来为名为 `SynthApplication.java` 的简单应用程序使用 Synth 外观。此应用程序的 GUI 包含一个按钮和一个标签。每次单击按钮时，标签递增。

---

**注意：**

即使 `buttonSkin.xml` 不包含标签的样式，标签仍然被绘制。这是因为有一个包含字体和颜色的一般 "backingStyle"。

---

以下是 [`SynthApplication.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/lookandfeel/SynthApplicationProject/src/lookandfeel/SynthApplication.java) 文件的清单。

---

**试试看：**

单击"启动"按钮使用 [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) 运行 SynthApplication 示例（[下载 JDK 7 或更高版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)）。或者，要自己编译和运行示例，请参阅[示例索引](https://docs.oracle.com/javase/tutorial/uiswing/examples/lookandfeel/index.html#SynthApplication)。

---

## 使用图标绘制

单选按钮和复选框通常通过固定大小的图标渲染其状态。对于这些，你可以创建一个图标并将其绑定到适当的属性（参阅属性表 [`javax/swing/plaf/synth/doc-files/componentProperties.html`](https://docs.oracle.com/javase/8/docs/api/javax/swing/plaf/synth/doc-files/componentProperties.html)）。例如，要绘制选中或未选中的单选按钮，使用以下代码：

```xml
<style id="radioButton">
   <imageIcon id="radio_off" path="images/radio_button_off.png"/>
   <imageIcon id="radio_on" path="images/radio_button_on.png"/>
   <property key="RadioButton.icon" value="radio_off"/>
   <state value="SELECTED">
      <property key="RadioButton.icon" value="radio_on"/>
   </state>
</style>
<bind style="radioButton" type="region" key="RadioButton"/>
```

## 自定义画家

Synth 的文件格式允许通过 [`JavaBeans 组件的长期持久化`](http://www.oracle.com/technetwork/java/persistence3-139471.html) 嵌入任意对象。此能力在提供超出 Synth 提供的基于图片的画家的自定义画家方面特别有用。例如，以下 XML 代码指定应在文本字段的背景中渲染渐变：

```xml
<synth>
  <object id="gradient" class="GradientPainter"/>
  <style id="textfield">
    <painter method="textFieldBackground" idref="gradient"/>
  </style>
  <bind style="textfield" type="region" key="textfield"/>
</synth>
```

其中 GradientPainter 类如下所示：

```java
public class GradientPainter extends SynthPainter {
   public void paintTextFieldBackground(SynthContext context,
                                        Graphics g, int x, int y,
                                        int w, int h) {
      // 为简单起见，这里总是重新创建 GradientPaint。在
      // 实际应用中你应该缓存它以避免垃圾。
      Graphics2D g2 = (Graphics2D)g;
      g2.setPaint(new GradientPaint((float)x, (float)y, Color.WHITE,
                 (float)(x + w), (float)(y + h), Color.RED));
      g2.fillRect(x, y, w, h);
      g2.setPaint(null);
   }
}
```

## 结论

在本课中，我们介绍了使用 `javax.swing.plaf.synth` 包创建自定义外观。本课的重点是使用外部 XML 文件定义外观。下一课展示一个示例应用程序，它使用 Synth 框架和 XML 文件创建搜索对话框。

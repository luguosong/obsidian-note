# callout 内的 `--8<--` 不渲染，要移到 callout 外侧上部

> 本文件是 `doc-beautify` 工序 3 的展开参考。**只要遇到 callout（`>` 引用块）内部包含 `--8<--` Snippets 引用**就读它并按此处理。

`--8<--` 代码块**放在 callout（`>` 引用块）内部不会渲染**——Obsidian 实时预览把 callout 渲染成 `cm-callout` 容器，会吞掉 Snippets 的 block widget，callout 内只剩 `--8<-- "..."` 源码字面。这是 Obsidian + Snippets 插件的已知限制，插件层面已确认无法在 callout 内渲染（不是语法错误，改 fence / 缩进都救不回来）。

美化时遇到 callout 内的 `--8<--`，**把整个代码块移到 callout 外侧（上部）**，让代码正常渲染；callout 里只留说明文字。这是「内容位置移动」——不删内容、不改语义，属**安全重组**，可直接做、收尾报告里说明移了哪些代码块。

改造前（`--8<--` 在 callout 内 → 不渲染，显示源码字面）：

````markdown
> [!warning] 浮点数精度
> 浮点数不能精确表示十进制小数：
>
> ```java
> --8<-- "code/java/basics/javase-demo/src/main/java/.../FloatPrecisionDemo.java"
> ```
>
> 因此涉及金额应使用 BigDecimal。
````

改造后（`--8<--` 移到 callout 外侧上部 → 正常渲染）：

````markdown
```java
--8<-- "code/java/basics/javase-demo/src/main/java/.../FloatPrecisionDemo.java"
```

> [!warning] 浮点数精度
> 浮点数不能精确表示十进制小数：
>
> 因此涉及金额应使用 BigDecimal。
````

要点：移动的是**整个 `--8<--` 代码块**（含两端 fence 行），放到 callout **正上方**（紧邻，中间别插别的）；callout 内对应位置删掉代码块、只保留前后说明文字。只有 `--8<--`（Snippets 引用）需要这么处理——普通内联代码块（直接写代码、不引用文件）在 callout 内能正常渲染，不用移。

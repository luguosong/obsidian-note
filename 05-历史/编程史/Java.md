---
描述: 从机顶盒语言 Oak 到企业级平台霸主——Java 语言与平台的三十余年演进
排序:
分组:
分类: "[[编程史]]"
创建时间: 2026年08月07日
---
# Java

Java 以「一次编写，到处运行」（Write Once, Run Anywhere）重塑了软件分发的想象：字节码 + JVM 屏蔽底层差异，让一门语言先后吃下浏览器 Applet、企业服务端与 Android 移动开发三大市场。编年事件见 [[编程史]]。

## Green Project：为家电而生的语言（1991–1992）

Sun Microsystems 的 James Gosling、Mike Sheridan 与 Patrick Naughton 启动「绿色计划」，目标是为机顶盒等消费电子开发语言。Gosling 起初尝试扩展 C++，因嵌入式场景对安全性与可移植性的要求转而全新设计，以办公室窗外的橡树命名为 **Oak**；1992 年产出运行 Oak 的手持多媒体遥控设备 Star7（\*7）。

## 更名 Java，一夜爆红（1995–1998）

Oak 商标已被注册，几经更名后定名 **Java**（源自爪哇咖啡）：

- **1995 年 5 月 23 日** Sun 在 SunWorld 大会正式发布，现场演示 HotJava 浏览器，Netscape 同日宣布 Navigator 将内置支持——Applet 让它在早期 Web 时代迅速走红；
- **1996 年 1 月** JDK 1.0 发布，「字节码 + JVM」的跨平台机制成形；
- **1998 年** Java 2 平台发布并三分天下：J2SE（桌面）、J2EE（企业）、J2ME（移动）。

## 语法现代化与开源（2004–2007）

- **J2SE 5.0**（2004）：泛型、枚举、注解、自动装箱、增强 for——Java 语言史上第一次大幅语法演进；
- **开源**（2006–2007）：Sun 宣布以 GPL 开源 Java，核心代码开源完毕后 OpenJDK 社区成型（2011 年 Java 7 起成为官方参考实现）。

## 易主与十年诉讼（2010–2021）

2010 年 Oracle 以约 74 亿美元收购 Sun，Java 易主、「Java 之父」Gosling 离职；Oracle 诉 Google（Android 复用 Java API）开打，2021 年美国最高法院以 6 比 2 终审认定公平使用，十年官司落幕。更早的 1997 年，Sun 也曾因 Visual J++ 破坏兼容性起诉微软——Android 运行于 [[05-历史/编程史/Linux|Linux]] 内核之上，两案都关乎同一问题的边界：谁能对 Java 兼容性做主。

## 半年节奏与现代 Java（2014 至今）

2017 年 Java 9 落地 Jigsaw 模块化、G1 成为默认垃圾收集器、Applet 走向废弃，并转向「每 6 个月一版、每 2 年一个 LTS」的新节奏：

| 版本 | 发布 | 关键词 |
| --- | --- | --- |
| Java 8（LTS） | 2014 | Lambda 与 Stream 引入函数式编程，长期占据企业主流 |
| Java 11（LTS） | 2018 | 新节奏下首个 LTS；Oracle JDK 停止商用免费更新，生态转向 Adoptium 等 OpenJDK 发行版 |
| Java 17（LTS） | 2021 | 密封类转正；Spring Boot 3 等主流框架以此为最低基线 |
| Java 21（LTS） | 2023 | 虚拟线程转正，高并发服务端新范式；记录类模式匹配同步落地 |
| Java 25（LTS） | 2025 | 紧凑源文件与实例 main 转正、Scoped Values 落地 |

当前最新非 LTS 版本为 Java 26（2026 年 3 月），下一个 LTS 是 2027 年 9 月的 Java 29。

## 为什么是「字节码 + JVM」？

编译产物瞄准一套稳定的字节码规范，由各平台的 JVM 解释执行并即时编译——平台差异被虚拟机吸收；垃圾回收免去手动内存管理。这一机制也让 Groovy、Scala、Kotlin 等语言寄生于同一 JVM 生态，构成今日最庞大的运行时家族之一。

## 相关笔记

- [[C语言]]
- [[05-历史/编程史/Linux|Linux]]（Android 复用 Java API 诉讼的另一端）
- [[编程史]]

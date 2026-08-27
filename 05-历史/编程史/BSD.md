---
描述: Berkeley Software Distribution——学术 Unix 的自由火种，三大开源分支与 TCP/IP 的发源地
排序:
分组:
分类: "[[编程史]]"
创建时间: 2026年08月27日
---
# BSD

BSD（Berkeley Software Distribution）最初只是附于 AT&T Unix 之上的一层工具包，最终长成与商业 Unix 分庭抗礼的开源谱系，并把 TCP/IP 塞进了后来所有操作系统。编年事件见 [[编程史]]。

## 伯克利如何接过火炬（1975–1983）

1975 年 Unix 源码进入高校后，伯克利加州大学深度参与开发：研究生 Bill Joy 于 1978 年 3 月发布 1BSD（最初的工具包），2BSD 带来他写的 vi 编辑器与 csh。受 DARPA 资助的 CSRG 持续演进，1982 年 Joy 离校共创 Sun Microsystems 后社区薪火不灭。

## 网络编程的祖师爷（1983）

4.2BSD 引入 ==Berkeley sockets 接口与完整的 TCP/IP 协议栈==——现代操作系统网络编程范式的原型，也助推 TCP/IP 普及为事实标准。今天几乎所有系统的 socket API 都是它的后代。

## 最危险的十年：USL 诉 BSDi（1992–1994）

AT&T 旗下 USL 起诉 BSDi 与加州大学，法院初步禁令使 386BSD 一系发布停摆约两年，大量用户转投初生的 [[05-历史/编程史/Linux|Linux]]——普遍视为 Linux 崛起的关键窗口期。1994 年 2 月和解：剔除极少量 AT&T 代码后的 4.4BSD-Lite 获准自由发布。

## 三分天下与血统外溢

诉讼前后，BSD 家族完成分化并定型至今：

- **NetBSD**（1993）：主打跨平台可移植；
- **FreeBSD**（1993）：专注 i386 性能；
- **OpenBSD**（1995）：Theo de Raadt 从 NetBSD 分叉，立「安全与代码审计」为本。

血统还外溢进封闭世界：苹果收购的 NeXT 其 NeXTSTEP 以 Mach + BSD 构成 XNU 内核的血统来源——macOS/iOS 因此流着 BSD 的血（见 [[Unix]]）。

## 相关笔记

- [[Unix]]
- [[05-历史/编程史/Linux|Linux]]
- [[编程史]]

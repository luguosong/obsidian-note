package com.luguosong.basicsyntax;

/**
 * 字面量（Literal）：源代码中值的直接表示，编译期即可确定类型和值。
 * 涵盖整数型、浮点型、布尔型、字符型、字符串型（含文本块）。
 * 对应笔记：[[基本语法]] → 字面量
 */
public class LiteralDemo {

    public static void main(String[] args) {
        // 整数型字面量
        int dec = 100;           // 十进制
        int oct = 0144;          // 八进制（以 0 开头）
        int hex = 0x64;          // 十六进制（以 0x 开头）
        int bin = 0b1100100;     // 二进制（以 0b 开头，JDK 7+）
        int big = 1_000_000;     // 下划线分隔，便于阅读（JDK 7+）
        long l = 100L;           // long 型需加 L 后缀

        // 浮点型字面量
        double d = 3.14;         // 默认为 double
        double d2 = 3.14D;       // D 后缀（可省略）
        float f = 3.14F;         // float 型必须加 F 后缀
        double sci = 1.5e3;      // 科学计数法，等价于 1500.0

        // 布尔型字面量
        boolean flag = true;
        boolean done = false;

        // 字符型字面量（使用单引号）
        char letter = 'A';       // 普通字符
        char newline = '\n';     // 转义字符
        char unicode = '\u0041'; // Unicode 表示，等价于 'A'

        // 字符串型字面量（使用双引号）
        String name = "张三";
        String path = "C:\\Users";            // 转义反斜杠
        // 文本块（JDK 15+）：三引号包裹，保留换行与缩进
        String json = """
                {"name": "张三"}
                """;

        System.out.println("dec=" + dec + ", hex=" + hex + ", bin=" + bin);
        System.out.println("letter=" + letter + ", unicode=" + unicode);
        System.out.println("name=" + name + ", path=" + path);
        System.out.println("json=" + json);
    }
}

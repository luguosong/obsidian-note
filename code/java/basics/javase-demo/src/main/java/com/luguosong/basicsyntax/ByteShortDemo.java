package com.luguosong.basicsyntax;

/**
 * 整数型 byte/short：编译期常量在范围内才自动收窄；参与运算会提升为 int。
 * 对应笔记：[[基本语法]] → 数据类型 → 基本数据类型 → 整数型
 */
public class ByteShortDemo {

    public static void main(String[] args) {
        // 赋值：编译期常量落在目标范围内，才自动收窄
        byte b1 = 100;                   // ✅ 常量 100 在 [-128, 127]
        short s1 = 1000;                 // ✅ 常量 1000 在 [-32768, 32767]
        // byte b2 = 128;                // ❌ 常量但超范围，"可能损失精度"

        int i = 100;
        // byte b3 = i;                  // ❌ 右侧是变量（非常量表达式），拒绝自动收窄
        final int K = 100;
        byte b4 = K;                     // ✅ final 是编译期常量且在范围内

        // 运算：byte/short 会提升为 int，结果也是 int
        byte x = 10, y = 20;
        // byte r = x + y;               // ❌ 编译错：x + y 已是 int，赋不回 byte
        int r1 = x + y;                  // ✅ 用 int 接收
        byte r2 = (byte) (x + y);        // 或强转（可能丢失精度）

        // 编译期能算出结果的常量表达式，等价于直接赋值
        byte b = 10 / 3;                 // 10/3 在编译期算出 3，落在 byte 范围内，合法

        System.out.println("b1=" + b1 + ", s1=" + s1 + ", b4=" + b4 + ", r1=" + r1 + ", r2=" + r2 + ", b=" + b);
    }
}

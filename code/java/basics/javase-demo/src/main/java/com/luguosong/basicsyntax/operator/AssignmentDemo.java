package com.luguosong.basicsyntax.operator;

/**
 * 赋值运算符：基本赋值 = 与扩展赋值 += -= *= 等。
 * 关键特性：扩展赋值隐含强制类型转换，不改变左侧变量的类型（即使精度损失）。
 * 对应笔记：Java基础语法 → 运算符 → 赋值运算符
 */
public class AssignmentDemo {

    public static void main(String[] args) {
        // 基本赋值：右边先求值，再赋给左边
        int x = 3 + 4;
        System.out.println(x);   // 7

        // 扩展赋值：i += 3 等价于 i = i + 3
        int i = 10;
        i += 3;
        System.out.println(i);   // 13

        // 关键：扩展赋值隐含强制转换，不改变左侧类型
        byte b = 10;
        b += 5;                  // 等价 b = (byte)(b + 5)，合法
        System.out.println(b);   // 15
        // b = b + 5;            // ← 解注释会编译报错：b + 5 是 int，不能直接赋给 byte

        // 即使精度损失，类型也不变
        short s = 10;
        s *= 1.5;                // 等价 s = (short)(s * 1.5) = (short)15.0
        System.out.println(s);   // 15（小数部分被截断，仍是 short）
    }
}

package com.luguosong.basicsyntax;

/**
 * 浮点型 float/double：默认类型为 double，声明 float 必须加 F 后缀。
 * 对应笔记：[[基本语法]] → 数据类型 → 基本数据类型 → 浮点型
 */
public class FloatTypeDemo {

    public static void main(String[] args) {
        double d = 3.14;       // 默认 double
        // float f = 3.14;     // ❌编译错：3.14 默认是 double（大容量），不能赋给 float（小容量）
        float f = 3.14F;       // 必须加 F
        double sci = 1.5e3;    // 科学计数法，等价于 1500.0

        System.out.println("d=" + d + ", f=" + f + ", sci=" + sci);
    }
}

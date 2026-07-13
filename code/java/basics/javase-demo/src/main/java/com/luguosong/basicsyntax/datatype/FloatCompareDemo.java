package com.luguosong.basicsyntax.datatype;

/**
 * 浮点数的 == 比较陷阱：浮点运算结果是近似值，不能用 == 做相等比较。
 * 对应笔记：[[基本语法]] → 数据类型 → 浮点型
 */
public class FloatCompareDemo {

    public static void main(String[] args) {
        double a = 6.9;
        double b = 3.0;
        double c = a / b;
        // System.out.println("c = " + c);
        System.out.println(c == 2.3); // false
        if (c == 2.3) {
            System.out.println("相等");
        }
    }
}

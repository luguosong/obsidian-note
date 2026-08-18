package com.luguosong.basicsyntax.method;

/**
 * 方法重载：同一个类中，方法名相同、参数列表不同的多个方法。
 * 参数列表不同：类型不同、个数不同、顺序不同，任一即可；与返回值类型无关。
 * 对应笔记：Java基础语法 → 方法 → 方法重载
 */
public class OverloadDemo {

    public static void main(String[] args) {
        // 编译阶段就根据实参列表确定了调用哪个版本
        sum(1, 2);        // 匹配 sum(int, int)       → 1+2=3
        sum(1.5, 2.5);    // 匹配 sum(double, double) → 1.5+2.5=4.0
        sum(1, 2, 3);     // 匹配 sum(int, int, int)  → 1+2+3=6
        sum(1, 2.5);      // 匹配 sum(int, double)    → 1+2.5=3.5
    }

    /**
     * 参数类型不同：int 与 double
     */
    public static void sum(int a, int b) {
        System.out.println(a + "+" + b + "=" + (a + b));
    }

    public static void sum(double a, double b) {
        System.out.println(a + "+" + b + "=" + (a + b));
    }

    /**
     * 参数个数不同：三个参数
     */
    public static void sum(int a, int b, int c) {
        System.out.println(a + "+" + b + "+" + c + "=" + (a + b + c));
    }

    /**
     * 参数顺序不同：(int, double) 与 (double, int) 互为重载
     */
    public static void sum(int a, double b) {
        System.out.println(a + "+" + b + "=" + (a + b));
    }
}

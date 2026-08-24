package com.luguosong.basicsyntax.operator;

/**
 * 关系运算符：> < >= <= == !=，用于比较两个值，结果一定是 boolean。
 * 对应笔记：Java基础语法 → 运算符 → 关系运算符
 */
public class RelationalDemo {

    public static void main(String[] args) {
        int a = 7, b = 3;

        // 六个关系运算符，结果都是 boolean
        System.out.println(a > b);    // true  —— 大于
        System.out.println(a < b);    // false —— 小于
        System.out.println(a >= b);   // true  —— 大于等于
        System.out.println(a <= b);   // false —— 小于等于
        System.out.println(a == b);   // false —— 等于（两个等号，别写成一个）
        System.out.println(a != b);   // true  —— 不等于

        // 比较结果可直接赋给 boolean 变量
        boolean result = a >= b;
        System.out.println(result);   // true

        // 易错点：
        // 1) == 是比较、= 是赋值，二者别写错（boolean 条件里尤其危险）
        // 2) >= <= 不能写成 => =<，顺序固定
    }
}

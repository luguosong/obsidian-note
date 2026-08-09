package com.luguosong.basicsyntax.operator;

/**
 * 条件运算符（三元运算符）：条件 ? 表达式1 : 表达式2。
 * 条件为 true 取表达式1，false 取表达式2；常用来简化简单的 if-else。
 * 对应笔记：Java基础语法 → 运算符 → 条件运算符
 */
public class TernaryDemo {

    public static void main(String[] args) {
        int a = 5, b = 7;

        // 取较大值：a > b 为 false，取表达式2（b）
        int max = (a > b) ? a : b;
        System.out.println("最大值为：" + max);  // 7

        // 等价的 if-else 写法（三元更简洁）
        int max2;
        if (a > b) {
            max2 = a;
        } else {
            max2 = b;
        }
        System.out.println(max2);  // 7

        // 三元可嵌套，但别套太深（会难读）
        int x = 0;
        String sign = (x > 0) ? "正" : (x < 0) ? "负" : "零";
        System.out.println(sign);  // 零
    }
}

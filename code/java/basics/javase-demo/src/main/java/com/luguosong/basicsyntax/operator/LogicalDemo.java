package com.luguosong.basicsyntax.operator;

/**
 * 逻辑运算符：& | ! ^ && ||，操作数与结果都是 boolean。
 * && 和 || 具有短路特性：左边已能决定结果时，右边不再执行。
 * 对应笔记：Java基础语法 → 运算符 → 逻辑运算符
 */
public class LogicalDemo {

    public static void main(String[] args) {
        boolean a = true, b = false;

        // 基本逻辑运算，结果都是 boolean
        System.out.println(a & b);    // false —— 逻辑与：两边都 true 才 true
        System.out.println(a | b);    // true  —— 逻辑或：有一边 true 就 true
        System.out.println(!a);       // false —— 逻辑非：取反
        System.out.println(a ^ b);    // true  —— 逻辑异或：两边不同才 true

        // 短路与 &&、短路或 ||：结果与 & | 相同，但会“短路”
        System.out.println(a && b);   // false
        System.out.println(a || b);   // true

        // 短路演示：左边已能决定结果时，右边表达式不执行
        int i = 0;
        boolean r1 = (1 > 2) && (i++ > 0);  // 左边 false，短路，i++ 不执行
        System.out.println(i);        // 0

        boolean r2 = (1 < 2) || (i++ > 0);  // 左边 true，短路，i++ 不执行
        System.out.println(i);        // 0

        boolean r3 = (1 > 2) & (i++ > 0);   // 非短路 &，右边一定执行
        System.out.println(i);        // 1
    }
}

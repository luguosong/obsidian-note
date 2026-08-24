package com.luguosong.basicsyntax.operator;

/**
 * 按位运算符：按位与 &。两数二进制逐位与，对应位都为 1 才为 1，否则为 0。
 * 常见应用：n & 1 判断奇偶。
 * 对应笔记：Java基础语法 → 运算符 → 按位运算符 → 按位与
 */
public class BitwiseAndDemo {

    public static void main(String[] args) {
        // 逐位与：对应位都为 1 才为 1
        int a = 32;  // 00100000
        int b = 25;  // 00011001
        System.out.println(a & b);   // 0 —— 没有同为 1 的位

        System.out.println(0b1100 & 0b1010); // 8 —— 0b1000

        // 应用：n & 1 判断奇偶（奇数最低位为 1）
        System.out.println(7 & 1);   // 1 —— 奇数
        System.out.println(8 & 1);   // 0 —— 偶数
    }
}

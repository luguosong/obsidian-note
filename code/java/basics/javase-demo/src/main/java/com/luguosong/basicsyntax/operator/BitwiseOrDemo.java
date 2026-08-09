package com.luguosong.basicsyntax.operator;

/**
 * 按位运算符：按位或 |。两数二进制逐位或，对应位有一个为 1 就为 1，都为 0 才为 0。
 * 常见应用：用 | 把某些二进制位「置 1」（如权限、标志位）。
 * 对应笔记：Java基础语法 → 运算符 → 按位运算符 → 按位或
 */
public class BitwiseOrDemo {

    public static void main(String[] args) {
        // 逐位或：有一个为 1 就为 1
        int a = 32;  // 00100000
        int b = 25;  // 00011001
        System.out.println(a | b);   // 57 —— 00111001

        // 应用：用 | 把指定二进制位置 1
        int flag = 0;
        flag = flag | (1 << 3);      // 把第 4 位（从右数、0 起算的第 3 位）置 1
        System.out.println(flag);    // 8 —— 00001000
    }
}

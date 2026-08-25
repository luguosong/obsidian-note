package com.luguosong.basicsyntax.operator;

/**
 * 按位运算符：按位取反 ~。单目运算符，逐位取反（含符号位），0↔1。
 * 由于补码表示，~n == -(n + 1)。
 * 对应笔记：Java基础语法 → 运算符 → 按位运算符 → 按位取反
 */
public class BitwiseNotDemo {

    public static void main(String[] args) {
        // 逐位取反（含符号位）：~n == -(n + 1)
        System.out.println(~100);  // -101
        System.out.println(~0);    // -1
        System.out.println(~-1);   // 0

        // 二进制视角：100 = ...01100100，取反 = ...10011011（-101 的补码）
        System.out.println(Integer.toBinaryString(100));  // 1100100
        System.out.println(Integer.toBinaryString(~100)); // 32 位补码，末 8 位 10011011

        // 应用：位清除——把指定位清 0，掩码用 ~(1 << n)
        int value = 0b01101101;
        int result = value & ~(1 << 3);  // 清除第 4 低位（bit3）
        System.out.println(Integer.toBinaryString(value));   // 1101101
        System.out.println(Integer.toBinaryString(result));  // 1100101（bit3 变 0）
    }
}

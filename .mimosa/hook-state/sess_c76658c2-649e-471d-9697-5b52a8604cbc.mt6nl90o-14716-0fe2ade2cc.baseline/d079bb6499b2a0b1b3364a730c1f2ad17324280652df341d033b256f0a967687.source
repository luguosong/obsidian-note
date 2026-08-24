package com.luguosong.basicsyntax.operator;

/**
 * 按位运算符：左移 <<。各位整体左移，低位补 0；左移 n 位相当于乘以 2 的 n 次方。
 * 高位移出会溢出截断，且当有效位移入符号位时会改变符号。
 * 对应笔记：Java基础语法 → 运算符 → 按位运算符 → 左移
 */
public class LeftShiftDemo {

    public static void main(String[] args) {
        // 左移 n 位 ≈ 乘以 2 的 n 次方
        System.out.println(11 << 2);   // 44   —— 0b1011 → 0b101100，即 11 × 2²
        System.out.println(1 << 10);   // 1024 —— 1 × 2¹⁰
        System.out.println(3 << 4);    // 48   —— 3 × 16

        // 用二进制字符串直观查看移位
        System.out.println(Integer.toBinaryString(11));      // 1011
        System.out.println(Integer.toBinaryString(11 << 2)); // 101100

        // 高位移出 → 溢出截断，且可能改变符号：
        // 1 左移 31 位，有效位移到最高位（符号位），正数变负数
        System.out.println(1 << 31);   // -2147483648（Integer.MIN_VALUE）
    }
}

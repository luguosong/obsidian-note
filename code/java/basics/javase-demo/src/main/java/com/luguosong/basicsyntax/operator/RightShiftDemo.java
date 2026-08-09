package com.luguosong.basicsyntax.operator;

/**
 * 按位运算符：右移 >>（有符号右移）。各位右移，高位补符号位，符号不变。
 * 右移 n 位约等于除以 2 的 n 次方；对负数是向负无穷取整。
 * 对应笔记：Java基础语法 → 运算符 → 按位运算符 → 右移
 */
public class RightShiftDemo {

    public static void main(String[] args) {
        // 右移 n 位 ≈ 除以 2 的 n 次方
        System.out.println(44 >> 2);   // 11 —— 0b101100 → 0b1011，即 44 ÷ 4
        System.out.println(1024 >> 3); // 128

        // 高位补符号位：正数补 0、负数补 1，符号不变
        System.out.println(-8 >> 1);   // -4
        System.out.println(-1 >> 1);   // -1（负数全 1，右移补 1 仍全 1）
        System.out.println(Integer.toBinaryString(-8));      // 32 位：高位全 1，末尾 …1000
        System.out.println(Integer.toBinaryString(-8 >> 1)); // 右移 1 位后末尾 …1100

        // 负数右移向负无穷取整，与除法（向零取整）可能不同
        System.out.println(-7 >> 1);   // -4（向下取整）
        System.out.println(-7 / 2);    // -3（向零取整）
    }
}

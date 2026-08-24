package com.luguosong.basicsyntax.operator;

/**
 * 按位运算符：无符号右移 >>>（逻辑右移）。各位右移，高位一律补 0，不考虑符号。
 * 对正数 ≈ 除以 2^n；对负数因高位补 0 会变成很大的正数（不等于除法）。
 * 对应笔记：Java基础语法 → 运算符 → 按位运算符 → 无符号右移
 */
public class UnsignedRightShiftDemo {

    public static void main(String[] args) {
        // 正数：>>> 与 >> 效果相同，≈ 除以 2^n
        System.out.println(44 >>> 2);   // 11
        System.out.println(1024 >>> 3); // 128

        // 负数：符号位被当普通位、高位补 0 → 变成很大的正数（不是除法！）
        System.out.println(-1 >>> 1);   // 2147483647（Integer.MAX_VALUE）
        System.out.println(-8 >>> 1);   // 2147483644
        System.out.println(-1 >> 1);    // -1（对比：有符号右移补 1，仍是 -1）

        // 二进制对比：-8 无符号右移，最高位补 0
        System.out.println(Integer.toBinaryString(-8));        // 32 位：高位全 1，末尾 1000
        System.out.println(Integer.toBinaryString(-8 >>> 1));  // 最高位变 0，其余右移
    }
}

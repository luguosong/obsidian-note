package com.luguosong.basicsyntax;

/**
 * 整数型 long：表示超大整数，超 int 范围必须加 L 后缀。
 * 对应笔记：[[基本语法]] → 数据类型 → 基本数据类型 → 整数型
 */
public class IntegerLongDemo {

    public static void main(String[] args) {
        long small = 100;                // 100 在 int 范围内，自动拓宽（widening）为 long，可不加 L
        long big = 2147483648L;          // 2147483648 超 int 范围，必须加 L，否则按 int 解析报错
        long max = 9223372036854775807L; // long 最大值

        System.out.println("small=" + small + ", big=" + big + ", max=" + max);
    }
}

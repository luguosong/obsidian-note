package com.luguosong.basicsyntax.datatype;

/**
 * 整数型 int：整数默认类型，超出约 ±21 亿即编译报错；两个 int 运算结果仍为 int。
 * 对应笔记：[[基本语法]] → 数据类型 → 基本数据类型 → 整数型
 */
public class IntegerIntDemo {

    public static void main(String[] args) {
        // int 是整数默认类型，直接赋值
        int a = 2147483647;              // int 最大值（约 ±21 亿）
        // int b = 2147483648;           // ❌ 编译错"整数太大"：超出 int 范围

        // 两个 int 运算，结果仍是 int（即便溢出也不会自动变 long）
        int x = 2000000000, y = 2000000000;
        System.out.println(x + y);       // -294967296：溢出成负数

        // 多种类型混合运算时，先各自提升到容量最大的类型再运算
        System.out.println(x + 1L);      // 2000000001，结果是 long

        System.out.println("a=" + a);
    }
}

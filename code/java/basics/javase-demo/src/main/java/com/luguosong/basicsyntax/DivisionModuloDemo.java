package com.luguosong.basicsyntax;

/**
 * 算术运算符：除法 / 与取模 %。整数相除截断取整；取模结果符号与被除数一致。
 * 对应笔记：[[基本语法]] → 运算符 → 算术运算符
 */
public class DivisionModuloDemo {

    public static void main(String[] args) {
        // 整数相除：结果仍是整数，小数部分直接丢弃（截断，非四舍五入）
        System.out.println(7 / 2);       // 3，不是 3.5
        System.out.println(10 / 3);      // 3

        // 只要有一个操作数是浮点数，结果就是浮点数
        System.out.println(7 / 2.0);     // 3.5

        // 取模 %：结果是余数，符号与被除数（左操作数）一致
        System.out.println(10 % 3);      // 1
        System.out.println(-10 % 3);     // -1（被除数为负 → 结果为负）
        System.out.println(10 % -3);     // 1（除数的符号不影响结果）

        // 取模的常见用途：判断整除、取末位数字
        System.out.println(8 % 2);       // 0（能被 2 整除 → 偶数）
        System.out.println(123 % 10);    // 3（取个位）
        System.out.println(123 / 10);    // 12（去掉个位）
    }
}

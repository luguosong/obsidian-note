package com.luguosong.basicsyntax;

/**
 * 算术运算符：自增 ++ 与自减 --。单独成句时前缀后缀等价；参与表达式时区别显现。
 * 对应笔记：[[基本语法]] → 运算符 → 算术运算符
 */
public class IncrementDemo {

    public static void main(String[] args) {
        // 单独使用：++a 和 a++ 效果相同
        int i = 5;
        i++;                          // i 变为 6
        ++i;                          // i 变为 7
        System.out.println(i);        // 7

        // 参与表达式（以赋值为例）——区别在此显现：
        //   ++a：先自增，再用新值
        //   a++：先用旧值，再自增
        int a1 = 5;
        int b1 = a1++;                // a1++：先用旧值 5 赋给 b1，a1 再自增
        System.out.println(b1);       // 5

        int a2 = 5;
        int b2 = ++a2;                // ++a2：a2 先自增为 6，再用新值赋给 b2
        System.out.println(b2);       // 6
    }
}

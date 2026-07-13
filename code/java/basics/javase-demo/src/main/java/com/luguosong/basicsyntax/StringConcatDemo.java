package com.luguosong.basicsyntax;

/**
 * 算术运算符 + 的字符串拼接：只要有一边是字符串就变成拼接，按从左到右执行。
 * 对应笔记：[[基本语法]] → 运算符 → 算术运算符
 */
public class StringConcatDemo {

    public static void main(String[] args) {
        System.out.println(1 + 2);           // 3（数字求和）
        System.out.println("1" + 2);         // 12（字符串拼接）
        System.out.println(1 + 2 + "3");     // 33（先 1+2=3，再拼 "3"）
        System.out.println("1" + 2 + 3);     // 123（先 "1"+2="12"，再拼 3）
    }
}

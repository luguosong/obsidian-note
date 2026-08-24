package com.luguosong.basicsyntax.datatype;

/**
 * 字符型 char：无符号 16 位整数，存储一个 Unicode 字符。
 * 三种字面量写法（字符、码点、Unicode 转义）本质相同；转义字符用反斜杠开头。
 * 对应笔记：[[基本语法]] → 数据类型 → 基本数据类型 → 字符型
 */
public class CharTypeDemo {

    public static void main(String[] args) {
        // char 的三种字面量写法：本质都是同一个码点
        char c1 = 'A';          // 直接写字符
        char c2 = 65;           // 写十进制码点：65 即 'A'
        char c3 = '\u0041';     // Unicode 转义：0041 即 'A'
        System.out.println(c1 == c2 && c2 == c3);  // true，三者本质相同

        // char 可存任意 Unicode 字符（中文、日文等皆可），本质是无符号整数
        char zh = '中';
        System.out.println((int) zh);   // 20013，印证 char 存的是码点数值

        // char 参与运算会提升为 int，赋回 char 需强转
        char next = (char) (c1 + 1);    // 'A' + 1 提升为 int，强转回 char 得 'B'
        System.out.println(next);       // B

        // 转义字符：用单引号，反斜杠开头表示特殊字符
        char tab = '\t';        // 制表符
        char quote = '\'';      // 单引号（char 字面量中需转义）
        char slash = '\\';      // 反斜杠本身

        System.out.println("next=" + next + ", zh=" + zh);
    }
}

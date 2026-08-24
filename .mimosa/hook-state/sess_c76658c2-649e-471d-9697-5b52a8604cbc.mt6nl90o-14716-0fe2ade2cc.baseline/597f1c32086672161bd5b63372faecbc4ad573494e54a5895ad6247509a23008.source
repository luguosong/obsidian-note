package com.luguosong.basicsyntax.operator;

/**
 * 算术运算符经典面试题：i = i++ 的自增陷阱。
 * 后缀 i++ 表达式的值是自增“前”的旧值，而赋值发生在自增之后，旧值会覆盖掉自增结果。
 * 对应笔记：Java基础语法 → 运算符 → 算术运算符 → 自增 ++ 与自减 --
 */
public class IncrementPitfallDemo {

    public static void main(String[] args) {
        // i = i++：后缀自增
        // 1) i++ 先取旧值 10 作为表达式的值，同时 i 自增为 11
        // 2) = 再把表达式的值 10 赋回 i，覆盖掉刚才的自增
        int i = 10;
        i = i++;
        System.out.println(i);        // 10

        // j = ++j：前缀自增（对比）
        // 1) ++j 先把 j 自增为 11，表达式的值就是新值 11
        // 2) = 把 11 赋回 j
        int j = 10;
        j = ++j;
        System.out.println(j);        // 11
    }
}

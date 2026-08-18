package com.luguosong.basicsyntax.method;

/**
 * 不使用方法的反例：两次求和逻辑完全相同，却各写了一遍。
 * 问题：相同功能的代码反复复制，冗余且难以维护——这正是方法要解决的痛点。
 * 对应笔记：Java基础语法 → 方法 → 如果不使用方法存在的问题
 */
public class NoMethodDemo {

    public static void main(String[] args) {
        // 需求1：计算 100 和 200 的和
        int a = 100;
        int b = 200;
        int c = a + b;
        System.out.println(a + "+" + b + "=" + c);  // 100+200=300

        // 需求2：计算 666 和 888 的和——和上面几乎一模一样，只是换了数值
        int i = 666;
        int j = 888;
        int m = i + j;
        System.out.println(i + "+" + j + "=" + m);  // 666+888=1554
    }
}

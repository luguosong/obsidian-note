package com.luguosong.basicsyntax.method;

/**
 * 方法的作用：把「求和并打印」这段重复逻辑封装成 sum 方法，一次定义、多次调用。
 * 对比 NoMethodDemo：同样的功能不再复制粘贴，改逻辑只需改 sum 一处。
 * 对应笔记：Java基础语法 → 方法 → 方法的作用
 */
public class SumMethodDemo {

    public static void main(String[] args) {
        // 需要几次求和就调用几次，把具体数值作为实参传进去
        sum(100, 200);  // 100+200=300
        sum(666, 888);  // 666+888=1554
        sum(123, 456);  // 123+456=579
    }

    /**
     * 独立封装的求和功能：接收两个整数，打印它们的和。
     */
    public static void sum(int a, int b) {
        int c = a + b;
        System.out.println(a + "+" + b + "=" + c);
    }
}

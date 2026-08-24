package com.luguosong.basicsyntax.controlflow;

/**
 * while 语句：先判断条件，再决定是否执行循环体，循环体执行 0 ~ n 次。
 * 原理：条件为 true 执行循环体并重新判断，为 false 立即结束（可能一次都不执行）。
 * 对应笔记：Java基础语法 → 控制语句 → while语句
 */
public class WhileDemo {

    public static void main(String[] args) {
        // ① 循环次数由条件动态控制：累加 1~5
        int i = 1;
        int sum = 0;
        while (i <= 5) {
            sum += i;
            i++;
        }
        System.out.println("1~5 的和 = " + sum);

        // ② 条件一开始就为 false，循环体一次都不执行（0 次）
        //    注意：不能写 while(false){}，编译器会报「unreachable statement」，改用变量
        boolean run = false;
        while (run) {
            System.out.println("永远不会打印");
        }
        System.out.println("上面的 while 执行了 0 次");
    }
}

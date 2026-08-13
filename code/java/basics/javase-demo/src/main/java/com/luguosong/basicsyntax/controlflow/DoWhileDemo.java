package com.luguosong.basicsyntax.controlflow;

/**
 * do-while 语句：先执行一次循环体，再判断条件，循环体执行 1 ~ n 次（至少一次）。
 * 与 while 的关键区别：条件一开始就为 false 时，while 执行 0 次，do-while 仍执行 1 次。
 * 对应笔记：Java基础语法 → 控制语句 → do-while语句
 */
public class DoWhileDemo {

    public static void main(String[] args) {
        // ① 常规用法：累加 1~5（与 while 等价）
        int i = 1;
        int sum = 0;
        do {
            sum += i;
            i++;
        } while (i <= 5);
        System.out.println("1~5 的和 = " + sum);

        // ② 条件一开始就为 false：do-while 仍先执行一次循环体（1 次）
        boolean run = false;
        int count = 0;
        do {
            count++;
        } while (run);
        System.out.println("条件为 false 时 do-while 仍执行了 " + count + " 次");
    }
}

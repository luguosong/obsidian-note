package com.luguosong.basicsyntax.controlflow;

/**
 * break 与 return 的区别：break 只终止循环，return 终止整个方法。
 * 对应笔记：Java基础语法 → 控制语句 → 跳转语句
 */
public class BreakVsReturnDemo {

    public static void main(String[] args) {
        loopWithBreak();
        loopWithReturn();
    }

    // break：只终止循环，循环后面的代码仍会执行
    private static void loopWithBreak() {
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                break; // 循环到此终止
            }
            System.out.println("break: i = " + i);
        }
        System.out.println("break: 循环后的代码仍会执行"); // 正常打印
    }

    // return：终止整个方法，循环后面的代码不再执行
    private static void loopWithReturn() {
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                return; // 整个方法到此结束
            }
            System.out.println("return: i = " + i);
        }
        System.out.println("return: 循环后的代码不再执行（这行永远不会打印）");
    }
}

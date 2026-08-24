package com.luguosong.basicsyntax.controlflow;

/**
 * if 语句的四种写法：单分支、双分支、多分支、多分支带 else 兜底。
 * 原理：对布尔表达式从上往下判断，命中第一个 true 的分支后整个 if 结束。
 * 对应笔记：Java基础语法 → 控制语句 → if语句
 */
public class IfDemo {

    public static void main(String[] args) {
        int score = 72;

        // ① 单分支 if：条件为 true 才执行，false 就整块跳过
        if (score >= 60) {
            System.out.println("① 及格");
        }

        // ② 双分支 if-else：二选一，必执行其中一个
        if (score >= 60) {
            System.out.println("② 及格");
        } else {
            System.out.println("② 不及格");
        }

        // ③ 多分支 if-else if：从上往下判断，命中一个即结束；可能一个都不命中
        if (score >= 90) {
            System.out.println("③ 优秀");
        } else if (score >= 80) {
            System.out.println("③ 良好");
        } else if (score >= 60) {
            System.out.println("③ 及格");
        }

        // ④ 多分支带 else 兜底：前面都不命中时执行最后的 else，一定会命中某个分支
        if (score >= 90) {
            System.out.println("④ A");
        } else if (score >= 80) {
            System.out.println("④ B");
        } else if (score >= 60) {
            System.out.println("④ C");
        } else {
            System.out.println("④ D");
        }
    }
}

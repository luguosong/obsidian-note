package com.luguosong.basicsyntax.controlflow;

/**
 * for 语句：用「初始化、条件、更新」三段式控制循环。
 * 原理：初始化只执行 1 次，之后「判断条件 → 执行循环体 → 更新」循环往复，直到条件为 false。
 * 对应笔记：Java基础语法 → 控制语句 → for语句
 */
public class ForDemo {

    public static void main(String[] args) {
        // ① 最常见的 for 循环：从 0 计数到 9
        for (int i = 0; i < 10; i++) {
            System.out.println("i = " + i);
        }

        // ② 三个表达式都可省略，for (;;) 是死循环（等价 while(true)）；此处注释掉避免真的跑死循环
        // for (;;) {
        //     System.out.println("死循环");
        // }

        // ③ 循环变量作用域：for(int i...) 的 i 只在循环内有效；
        //    把 j 声明在循环外，循环结束后仍可访问
        int j;
        for (j = 0; j < 3; j++) {
            System.out.println("j = " + j);
        }
        System.out.println("循环结束后 j = " + j);
    }
}

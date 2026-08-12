package com.luguosong.basicsyntax.controlflow;

/**
 * switch 箭头新语法（JDK 12 起）：case 值 -> ...，不会穿透、无需 break。
 * 对应笔记：Java基础语法 → 控制语句 → switch语句 → JDK 12 新语法
 */
public class SwitchArrowDemo {

    public static void main(String[] args) {
        int day = 3;

        // ① case 值 -> 单语句：不会穿透、无需 break
        switch (day) {
            case 1 -> System.out.println("① 星期一");
            case 3 -> System.out.println("① 星期三");
            default -> System.out.println("① 其它");
        }

        // ② 多标签：一个 case 匹配多个值，用逗号分隔
        switch (day) {
            case 1, 2, 3, 4, 5 -> System.out.println("② 工作日");
            case 6, 7 -> System.out.println("② 周末");
        }

        // ③ 代码块：分支要执行多条语句时用 {}
        switch (day) {
            case 3 -> {
                System.out.println("③ 命中 3");
                System.out.println("③ 可以写多条语句");
            }
            default -> System.out.println("③ 其它");
        }
    }
}

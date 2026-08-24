package com.luguosong.basicsyntax.controlflow;

/**
 * break 语句：终止循环（或 switch）的执行。
 * 默认终止离它最近的一层循环；带标签时可终止指定的循环。
 * 对应笔记：Java基础语法 → 控制语句 → 跳转语句
 */
public class BreakDemo {

    public static void main(String[] args) {
        // ① 循环中的 break：终止离它最近的循环，后面的迭代不再执行
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                break; // i 为 3 时整个循环终止，4、5 不会输出
            }
            System.out.println("① i = " + i);
        }

        // ② 嵌套循环中的 break：只终止最近的一层（内层），外层继续
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (j == 2) {
                    break; // 只跳出内层循环，外层 i 照常走完
                }
                System.out.println("② i = " + i + ", j = " + j); // 每轮只输出 j = 1
            }
        }

        // ③ 带标签的 break：终止标签指定的那层循环，可一次跳出多层
        // 标签写在要终止的循环前面
        outer:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) {
                    break outer; // 直接终止 outer 标记的外层循环，内层一并结束
                }
                System.out.println("③ i = " + i + ", j = " + j);
            }
        }
    }
}

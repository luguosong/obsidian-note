package com.luguosong.basicsyntax.controlflow;

/**
 * continue 语句：终止本次循环，直接进入下一次循环。
 * 默认作用于离它最近的循环；带标签时作用于指定的循环。
 * 对应笔记：Java基础语法 → 控制语句 → 跳转语句
 */
public class ContinueDemo {

    public static void main(String[] args) {
        // ① continue：终止本次循环，直接进入下一次
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                continue; // i 为 3 的这一轮被跳过，接着执行 i 为 4 的循环
            }
            System.out.println("① i = " + i); // 输出 1、2、4、5
        }

        // ② 嵌套循环中的 continue：只作用于最近的一层（内层）
        for (int i = 1; i <= 2; i++) {
            for (int j = 1; j <= 3; j++) {
                if (j == 2) {
                    continue; // 只跳过内层的这一轮，内层继续 j 为 3
                }
                System.out.println("② i = " + i + ", j = " + j); // j 为 2 的都被跳过
            }
        }

        // ③ 带标签的 continue：终止本次循环，直接进入标签指定循环的下一次
        // 标签写在目标循环前面
        outer:
        for (int i = 1; i <= 2; i++) {
            for (int j = 1; j <= 3; j++) {
                if (j == 2) {
                    continue outer; // 跳过外层本轮（内层 j 为 3 不再执行），直接进入外层下一轮
                }
                System.out.println("③ i = " + i + ", j = " + j);
            }
        }
    }
}

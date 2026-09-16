package com.luguosong.array;

/**
 * for-each（增强 for 循环）：基本用法，以及「给循环变量赋值不会修改数组元素」的易错点。
 * 对应笔记：数组 → 一维数组 → 如何遍历数组？→ for-each（增强 for 循环）
 */
public class ForEachDemo {

    public static void main(String[] args) {
        int[] arr = {55, 67, 22};

        // 冒号左边声明变量接收元素，右边是要遍历的数组；每次循环把当前元素赋值给变量 x
        for (int x : arr) {
            System.out.println("x = " + x);  // 依次输出 55、67、22
        }

        // 易错点：循环变量 x 只是元素值的副本，循环内给它赋值不会改变数组元素
        for (int x : arr) {
            x = x * 2;  // 只修改了副本 x（普通 for 的 arr[i] = arr[i] * 2 才会写入数组）
        }
        for (int x : arr) {
            System.out.print(x + " ");  // 55 67 22 —— 元素并没有翻倍
        }
        System.out.println();
    }
}

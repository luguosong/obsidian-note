package com.luguosong.array;

/**
 * 二维数组的遍历：嵌套普通 for（外层拿行下标，内层边界用 arr[i].length）
 * 与嵌套 for-each（外层变量是 int[]，取一整行）。
 * 对应笔记：数组 → 二维数组 → 如何遍历二维数组？
 */
public class TwoDimArrayIterateDemo {

    public static void main(String[] args) {
        int[][] arr = {{55, 67, 22}, {99, 41}, {88}};

        // 第一种：嵌套普通 for —— 外层 arr[i] 是第 i 行（一维数组），
        // 内层遍历该行；锯齿数组各行长度不同，内层边界必须用 arr[i].length
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                System.out.print(arr[i][j] + " ");  // 依次输出第 i 行的元素
            }
            System.out.println();  // 每打完一行换行
        }

        // 第二种：嵌套 for-each —— 外层变量 row 是一整行（int[]），内层才是元素值
        for (int[] row : arr) {
            for (int x : row) {
                System.out.print(x + " ");  // 依次输出全部 6 个元素
            }
        }
        System.out.println();
    }
}

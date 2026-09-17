package com.luguosong.array;

/**
 * 二维数组的静态初始化：完整格式与简化格式，行数与每行长度都由元素个数自动决定（各行可以不同）。
 * 对应笔记：数组 → 二维数组 → 如何静态初始化二维数组？
 */
public class TwoDimArrayStaticInitDemo {

    public static void main(String[] args) {
        // 第一种：完整格式 —— new int[][]{{...}, {...}, ...}
        int[][] arr1 = new int[][]{{55, 67, 22}, {99, 41}, {88}};

        // 第二种：简化格式 —— 声明的同时直接给出（省略 new int[][]，最常用）
        int[][] arr2 = {{55, 67, 22}, {99, 41}, {88}};

        // 两种写法效果完全相同：行数由外层元素个数决定
        System.out.println("arr1.length = " + arr1.length);  // arr1.length = 3
        System.out.println("arr2.length = " + arr2.length);  // arr2.length = 3

        // 每行长度由该行元素个数决定，各行可以不同（锯齿数组）
        System.out.println("arr2[0].length = " + arr2[0].length);  // 3
        System.out.println("arr2[1].length = " + arr2[1].length);  // 2
        System.out.println("arr2[2].length = " + arr2[2].length);  // 1

        // 直接打印某一行，输出的是 Object 的 toString() 默认形式（[I@十六进制哈希），不是元素内容
        // —— 印证 arr2[0] 就是一个一维数组对象
        System.out.println(arr2[0]);
    }
}

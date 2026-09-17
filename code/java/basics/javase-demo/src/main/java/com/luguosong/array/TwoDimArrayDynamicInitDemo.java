package com.luguosong.array;

/**
 * 二维数组的动态初始化：等长（new int[3][4]，元素取默认值）与不等长（new int[3][] 后逐行创建，锯齿数组）。
 * 对应笔记：数组 → 二维数组 → 如何动态初始化二维数组？
 */
public class TwoDimArrayDynamicInitDemo {

    public static void main(String[] args) {
        // 等长：new int[行数][列数] —— 行、列同时确定，每个元素取默认值 0
        int[][] arr = new int[3][4];
        System.out.println("arr.length = " + arr.length);        // 3（行数）
        System.out.println("arr[0].length = " + arr[0].length);  // 4（每行长度相同）
        System.out.println("arr[1][2] = " + arr[1][2]);          // 0（int 的默认值）

        // 不等长（锯齿数组）：new int[行数][] —— 只确定行数，每行暂时是 null
        int[][] nums = new int[3][];
        // System.out.println(nums[0][0]);  // 运行报错：NullPointerException —— nums[0] 还是 null

        // 逐行创建一维数组，各行长度可以不同；每行用静态、动态初始化都行
        nums[0] = new int[]{1, 3, 3, 4};
        nums[1] = new int[]{2, 3, 4};
        nums[2] = new int[5];

        System.out.println("nums[0].length = " + nums[0].length);  // 4
        System.out.println("nums[1].length = " + nums[1].length);  // 3
        System.out.println("nums[2].length = " + nums[2].length);  // 5
    }
}

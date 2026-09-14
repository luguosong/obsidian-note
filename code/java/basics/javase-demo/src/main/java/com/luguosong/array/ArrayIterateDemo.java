package com.luguosong.array;

/**
 * 一维数组的两种遍历方式：普通 for 循环（能拿到下标）与 for-each（简洁但拿不到下标）。
 * 对应笔记：数组 → 一维数组 → 如何遍历数组？
 */
public class ArrayIterateDemo {

    public static void main(String[] args) {
        int[] arr = {55, 67, 22, 99, 41};

        // 第一种：普通 for 循环遍历 —— 通过下标 arr[i] 访问，循环中能拿到当前元素的下标
        for (int i = 0; i < arr.length; i++) {
            System.out.println("arr[" + i + "] = " + arr[i]);  // arr[0] = 55（依次输出全部 5 个元素）
        }

        // 第二种：for-each 遍历 —— 每次循环把当前元素赋给变量 x，代码简洁；
        // 缺点是拿不到下标（需要按下标位置处理元素时只能用普通 for）
        for (int x : arr) {
            System.out.println("x = " + x);  // x = 55（依次输出全部 5 个元素）
        }
    }
}

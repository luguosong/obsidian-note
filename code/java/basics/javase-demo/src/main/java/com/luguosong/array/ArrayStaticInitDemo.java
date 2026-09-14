package com.luguosong.array;

/**
 * 一维数组的静态初始化：完整格式 new int[]{...} 与简化格式 {...}，长度由元素个数自动决定。
 * 对应笔记：数组 → 一维数组 → 如何静态初始化一维数组？
 */
public class ArrayStaticInitDemo {

    public static void main(String[] args) {
        // 第一种：完整格式 —— new 数据类型[]{元素1, 元素2, ...}
        int[] arr1 = new int[]{55, 67, 22};

        // 第二种：简化格式 —— 声明的同时直接给出元素列表（省略 new int[]，最常用）
        int[] arr2 = {55, 67, 22};

        // 两种写法效果完全相同：长度都由元素个数自动决定
        System.out.println("arr1.length = " + arr1.length);  // arr1.length = 3
        System.out.println("arr2.length = " + arr2.length);  // arr2.length = 3

        // C 风格声明 int arr[] 也合法（来自 C 语言的写法），Java 惯用 int[] arr
        int arr3[] = {55, 67, 22};

        // 简化格式只能在声明的同时使用：声明和赋值拆开时，只能用完整格式
        int[] arr4;
        // arr4 = {55, 67, 22};  // 编译报错：非法的表达式开始
        arr4 = new int[]{55, 67, 22};

        // 完整格式不能同时指定长度：长度只能由元素个数决定
        // int[] arr5 = new int[3]{55, 67, 22};  // 编译报错：同时使用维表达式和初始化创建数组是非法的
    }
}

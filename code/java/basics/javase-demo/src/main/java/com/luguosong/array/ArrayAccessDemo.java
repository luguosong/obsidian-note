package com.luguosong.array;

/**
 * 一维数组的下标访问：数组名[下标]，下标范围 0 ~ length-1，越界运行时抛 ArrayIndexOutOfBoundsException。
 * 对应笔记：数组 → 一维数组 → 如何访问数组中的元素？
 */
public class ArrayAccessDemo {

    public static void main(String[] args) {
        int[] arr = {55, 67, 22};

        // 通过下标访问：下标从 0 开始，以 1 递增
        System.out.println("arr[0] = " + arr[0]);  // arr[0] = 55
        System.out.println("arr[1] = " + arr[1]);  // arr[1] = 67

        // 末尾元素下标 length - 1
        System.out.println("arr[arr.length - 1] = " + arr[arr.length - 1]);  // arr[arr.length - 1] = 22

        // 通过下标修改元素
        arr[1] = 88;
        System.out.println("修改后 arr[1] = " + arr[1]);  // 修改后 arr[1] = 88

        // 下标越界：有效下标范围 0 ~ arr.length - 1，下标 3 超出范围，
        // 编译不报错，运行到这里才抛出异常，程序立即终止
        System.out.println(arr[3]);
        // 运行报错：Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
    }
}

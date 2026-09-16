package com.luguosong.array;

/**
 * 一维数组扩容：数组长度不可变，扩容 = 新建更大的数组 + 拷贝原数据
 * （手写循环与 System.arraycopy 两种写法；扩容后变量改指新数组）。
 * 对应笔记：数组 → 一维数组 → 一维数组如何扩容？
 */
public class ArrayExpandDemo {

    public static void main(String[] args) {
        int[] arr = {55, 67, 22};  // 长度 3，已装满，装不下新数据

        // 写法一：手写循环——创建长度更大的新数组，逐个拷贝元素
        int[] bigger1 = new int[6];  // 长度 3 → 6
        for (int i = 0; i < arr.length; i++) {
            bigger1[i] = arr[i];     // 只拷前 3 个，剩余位置是默认值 0
        }

        // 写法二：System.arraycopy——JDK 提供的数组拷贝方法（native，效率高于手写循环）
        int[] bigger2 = new int[6];
        // 从 arr 的下标 0 起，拷 arr.length 个元素，到 bigger2 的下标 0 起
        System.arraycopy(arr, 0, bigger2, 0, arr.length);

        // 两种写法结果相同：原数据都在前 3 位，多出的位置是默认值 0
        for (int i = 0; i < bigger1.length; i++) {
            System.out.print(bigger1[i] + " ");  // 55 67 22 0 0 0
        }
        System.out.println();
        for (int i = 0; i < bigger2.length; i++) {
            System.out.print(bigger2[i] + " ");  // 55 67 22 0 0 0
        }
        System.out.println();

        // 扩容收尾：让原变量指向新数组，后续操作都基于新数组
        // （旧数组无人引用，等待垃圾回收）
        arr = bigger1;
        arr[3] = 88;  // 现在装得下了
        for (int x : arr) {
            System.out.print(x + " ");  // 55 67 22 88 0 0
        }
        System.out.println();
    }
}

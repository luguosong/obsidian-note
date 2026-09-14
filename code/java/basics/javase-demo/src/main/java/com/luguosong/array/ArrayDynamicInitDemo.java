package com.luguosong.array;

/**
 * 一维数组的动态初始化：new 数据类型[长度]，长度在创建时确定，每个元素采用系统分配的默认值。
 * 对应笔记：数组 → 一维数组 → 如何动态初始化一维数组？
 */
public class ArrayDynamicInitDemo {

    public static void main(String[] args) {
        // 动态初始化：new 数据类型[长度] —— 只确定长度，不写出元素
        int[] arr = new int[4];

        // 每个元素采用默认值：int 数组默认 0
        for (int i = 0; i < arr.length; i++) {
            System.out.println("arr[" + i + "] = " + arr[i]);  // arr[0] = 0（4 个元素全部为 0）
        }

        // 引用类型数组同样支持动态初始化，默认值为 null
        Object[] objs = new Object[5];
        for (int i = 0; i < objs.length; i++) {
            System.out.println("objs[" + i + "] = " + objs[i]);  // objs[0] = null（5 个元素全部为 null）
        }
    }
}

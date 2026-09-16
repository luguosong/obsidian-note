package com.luguosong.array;

/**
 * 可变参数：语法与调用方式（0 个、1 个、多个实参，或直接传数组），以及「可以当做数组来看待」的本质。
 * 对应笔记：数组 → 一维数组 → 什么是可变参数？
 */
public class VarargsDemo {

    // 可变参数：调用时实参个数任意；方法体内 nums 就是一个数组
    static int sum(int... nums) {
        int total = 0;
        for (int n : nums) {  // 当数组遍历（for-each）
            total += n;
        }
        return total;
    }

    // 普通参数在前、可变参数必须在参数列表末尾：姓名固定，成绩个数任意
    static void printScores(String name, int... scores) {
        System.out.print(name + " 的成绩：");
        for (int s : scores) {
            System.out.print(s + " ");
        }
        System.out.println("（共 " + scores.length + " 门）");
    }

    public static void main(String[] args) {
        // 实参个数任意：编译器把散着的实参自动打包成数组传给 nums
        System.out.println(sum());            // 0 —— nums 是长度为 0 的数组
        System.out.println(sum(10));          // 10
        System.out.println(sum(10, 20, 30));  // 60

        // 也可以直接传数组：可变参数本质就是数组参数
        int[] arr = {1, 2, 3, 4};
        System.out.println(sum(arr));         // 10

        // 混合参数：普通参数在前，可变参数在最后
        printScores("张三", 90, 85, 77);       // 张三 的成绩：90 85 77 （共 3 门）
        printScores("李四");                   // 李四 的成绩：（共 0 门）
    }
}

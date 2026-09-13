package com.luguosong.array;

/**
 * 数组概述：数组是存储多个相同数据类型元素的容器，属于引用数据类型，隐式继承 Object。
 * 对应笔记：数组 → 概述 → 什么是数组
 */
public class ArrayOverviewDemo {

    public static void main(String[] args) {
        // 静态初始化一个存储 int 的数组（基本类型数组）
        int[] nums = {100, 200, 300};
        // 静态初始化一个存储 String 的数组（引用类型数组）
        String[] names = {"jack", "lucy", "lisi"};

        // 数组把同一类型的多个值收进一个容器，通过下标逐个访问
        for (int i = 0; i < nums.length; i++) {
            System.out.println("nums[" + i + "] = " + nums[i]);  // nums[0] = 100（依次输出 100、200、300）
        }
        for (int i = 0; i < names.length; i++) {
            System.out.println("names[" + i + "] = " + names[i]);  // names[0] = jack（依次输出 jack、lucy、lisi）
        }

        // 数组是引用数据类型，隐式继承 Object：可以调用 Object 中的方法；
        // 直接打印数组变量，输出的是 Object.toString() 的默认形式，而不是元素内容
        System.out.println(nums);   // 形如 [I@1b6d3586（[I 表示 int 数组，@ 后是十六进制哈希码，每次运行可能不同）
        System.out.println(names);  // 形如 [Ljava.lang.String;@2f92e0f4
    }
}

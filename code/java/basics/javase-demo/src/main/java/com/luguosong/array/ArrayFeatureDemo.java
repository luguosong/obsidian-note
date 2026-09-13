package com.luguosong.array;

/**
 * 数组存储元素的特点：length 属性获取长度、下标从 0 递增、末尾元素下标 length-1，长度不可变。
 * 对应笔记：数组 → 概述 → 数组存储元素的特点
 */
public class ArrayFeatureDemo {

    public static void main(String[] args) {
        int[] nums = {100, 523, 666, 888, 745, 999};

        // 所有数组对象都有 length 属性，用来获取元素个数
        System.out.println("数组长度 nums.length = " + nums.length);  // 数组长度 nums.length = 6

        // 每个元素有索引：首元素索引 0，以 1 递增；末尾元素下标 length - 1
        System.out.println("首元素 nums[0] = " + nums[0]);  // 首元素 nums[0] = 100
        System.out.println("末尾元素 nums[nums.length - 1] = " + nums[nums.length - 1]);  // 末尾元素 nums[nums.length - 1] = 999

        // 数组长度一旦确定不可变：length 是只读属性，重新赋值直接编译报错
        // nums.length = 10;  // 编译报错：无法为 final 变量 length 分配值
    }
}

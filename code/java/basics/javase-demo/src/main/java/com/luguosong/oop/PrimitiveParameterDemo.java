package com.luguosong.oop;

/**
 * 基本类型传参：复制数据值本身，方法内修改的是副本，调用者中的变量不受影响。
 * 对应笔记：面向对象 → 定义类 → 方法调用参数传递问题
 */
public class PrimitiveParameterDemo {

    public static void main(String[] args) {
        int i = 10;
        add(i);
        System.out.println("main--->" + i);  // main--->10
    }

    public static void add(int i) {
        i++;  // 改的是副本
        System.out.println("add--->" + i);  // add--->11
    }
}

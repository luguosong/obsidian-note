package com.luguosong.oop;

/**
 * 对象的创建：类名 对象名 = new 类名();
 * 每执行一次 new 就会在堆内存中创建一个新对象，一个类可以实例化多个对象。
 * 对应笔记：面向对象 → 定义类 → 对象的创建
 */
public class CreateObjectDemo {

    public static void main(String[] args) {
        // 一个类可以实例化多个对象
        Teacher t1 = new Teacher();
        Teacher t2 = new Teacher();

        // 直接打印对象名：输出 类名@对象地址的十六进制哈希码（每次运行不同）
        // 两个地址不同，说明每次 new 创建的都是新对象
        System.out.println(t1);  // com.luguosong.oop.Teacher@1b6d3586
        System.out.println(t2);  // com.luguosong.oop.Teacher@4554617c
    }
}

/**
 * 老师类：属性描述状态
 */
class Teacher {

    String name;
    int age;
}

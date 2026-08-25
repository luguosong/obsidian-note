package com.luguosong.oop;

/**
 * 定义类：[修饰符列表] class 类名 { 类体 = 属性 + 方法 }
 * 一个类可以实例化多个对象；实例变量一个对象一份；
 * 成员变量没有手动赋值时系统赋默认值：整数 0、浮点 0.0、boolean false、char '\u0000'、引用类型 null。
 * 对应笔记：面向对象 → 定义类 → 实例变量与默认值
 */
public class DefineClassDemo {

    public static void main(String[] args) {
        // 一个类可以实例化多个对象
        Student s1 = new Student();
        Student s2 = new Student();

        // 实例变量一个对象一份：s1、s2 各有独立的 name、age
        s1.name = "张三";
        s1.age = 20;
        s1.study();  // 张三正在学习

        // s2 没有手动赋值：成员变量由系统赋默认值
        System.out.println(s2.name + ", " + s2.age);  // null, 0
    }
}

/**
 * 学生类：属性描述状态，方法描述行为
 */
class Student {

    // 实例变量：属于成员变量
    String name;
    int age;

    void study() {
        System.out.println(name + "正在学习");
    }
}

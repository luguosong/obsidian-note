package com.luguosong.oop;

/**
 * 实例变量一个对象一份：每个对象中都有独立的 name、age，给 s1 赋值不影响 s2。
 * 成员变量没有手动赋值时系统赋默认值：整数 0、浮点 0.0、boolean false、char '\u0000'、引用类型 null。
 * 对应笔记：面向对象 → 定义类 → 实例变量与默认值
 */
public class InstanceVariableDemo {

    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student();

        // 给 s1 的实例变量赋值，s2 不受影响：实例变量一个对象一份
        s1.name = "张三";
        s1.age = 20;
        System.out.println(s1.name + ", " + s1.age);  // 张三, 20

        // s2 没有手动赋值：成员变量由系统赋默认值
        System.out.println(s2.name + ", " + s2.age);  // null, 0
    }
}

/**
 * 学生类：属性描述状态
 */
class Student {

    String name;
    int age;
}

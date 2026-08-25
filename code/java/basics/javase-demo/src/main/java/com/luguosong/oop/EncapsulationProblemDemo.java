package com.luguosong.oop;

/**
 * 不使用封装的问题：属性对外暴露，外部程序可以随意访问和修改，数据不安全。
 * 对应笔记：面向对象 → 面向对象-封装性 → 不使用封装的问题
 */
public class EncapsulationProblemDemo {

    public static void main(String[] args) {
        Person p = new Person();

        // 属性未私有化：外部可以直接读取（读到默认值 0）
        System.out.println("年龄：" + p.age);  // 年龄：0

        // 也可以随意修改成合法值
        p.age = 50;
        System.out.println("年龄：" + p.age);  // 年龄：50

        // 还能修改成非法值：现实中年龄不可能是负数，程序却毫无拦截
        p.age = -100;
        System.out.println("年龄：" + p.age);  // 年龄：-100
    }
}

/**
 * 人类：未使用封装机制，age 属性非常不安全
 */
class Person {

    int age;  // 年龄（未私有化，外部可随意访问）
}

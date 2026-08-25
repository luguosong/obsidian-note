package com.luguosong.oop;

/**
 * 引用类型传参：复制地址值，形参和实参指向同一个对象，通过形参修改对象内容会影响调用者。
 * 对应笔记：面向对象 → 定义类 → 方法调用参数传递问题
 */
public class ReferenceParameterDemo {

    public static void main(String[] args) {
        User u = new User();
        u.age = 10;
        increase(u);
        System.out.println("main--->" + u.age);  // main--->11
    }

    public static void increase(User u) {
        u.age++;  // 通过形参修改两个引用共同指向的对象
        System.out.println("increase--->" + u.age);  // increase--->11
    }
}

/**
 * 用户类：用于演示引用类型参数传递
 */
class User {

    int age;
}

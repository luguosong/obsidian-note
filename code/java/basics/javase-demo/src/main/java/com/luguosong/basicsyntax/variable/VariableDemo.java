package com.luguosong.basicsyntax.variable;

/**
 * 变量分类：静态变量（类变量）、实例变量、局部变量。
 * 对应笔记：[[基本语法]] → 变量 → 变量分类
 */
public class VariableDemo {

    // 静态变量（类变量）：属于类，所有实例共享同一份
    static String country = "中国";

    // 实例变量：属于对象，每个对象各有一份
    String name;
    int age;

    public void show() {
        // 局部变量：方法内，方法执行完即销毁
        String msg = "hello";
        System.out.println(country + name + age + msg);
    }

    public static void main(String[] args) {
        // 实例变量：通过对象访问
        VariableDemo v = new VariableDemo();
        v.name = "张三";

        // 静态变量：通过类名访问（推荐），也可通过对象访问
        System.out.println(VariableDemo.country);

        v.show();
    }
}

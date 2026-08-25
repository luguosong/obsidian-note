package com.luguosong.oop;

/**
 * 无参数构造方法：未显式定义构造方法时系统提供缺省构造器；
 * 显式定义任何构造方法后缺省构造器消失，因此建议手动写出无参构造。
 * 对应笔记：面向对象 → 构造方法 → 无参数构造方法
 */
public class DefaultConstructorDemo {

    public static void main(String[] args) {
        // Employee 显式定义了无参构造方法，new Employee() 正常创建并初始化对象
        Employee e = new Employee();
        System.out.println(e.name);  // 张三（无参构造中初始化的值）
    }
}

/**
 * 员工类
 */
class Employee {

    String name;  // 姓名

    // 显式定义无参构造方法。
    // 若类中不写任何构造方法，系统会默认提供缺省构造器；
    // 但只要显式定义了任何构造方法（例如 Employee(String name)），
    // 缺省构造器就不存在了，此时 new Employee() 会编译报错——
    // 所以建议把无参构造方法手动写出来
    Employee() {
        name = "张三";
    }
}

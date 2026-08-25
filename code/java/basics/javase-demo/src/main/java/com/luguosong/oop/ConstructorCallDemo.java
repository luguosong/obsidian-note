package com.luguosong.oop;

/**
 * 构造方法的定义与调用：构造方法名与类名相同、没有返回值类型，只能通过 new 调用。
 * 对应笔记：面向对象 → 构造方法 → 构造方法的定义与调用
 */
public class ConstructorCallDemo {

    public static void main(String[] args) {
        // 调用构造方法：new 构造方法名(实参);
        // 实参 "联想"、5299.0 由构造方法的形式参数 brand、price 接收
        Computer computer = new Computer("联想", 5299.0);
        System.out.println(computer.brand);  // 联想
        System.out.println(computer.price);  // 5299.0
    }
}

/**
 * 电脑类
 */
class Computer {

    String brand;  // 品牌
    double price;  // 价格

    // 带参构造方法：定义时声明形式参数列表
    Computer(String brand, double price) {
        // 形参与实例变量重名，this. 不能省略
        this.brand = brand;
        this.price = price;
    }
}

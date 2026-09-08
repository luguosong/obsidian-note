package com.luguosong.oop;

/**
 * 一个类实现多个接口演示：Java 类与类之间只能单继承，但一个类可以同时实现多个接口（逗号隔开），
 * 弥补了单继承的局限；非抽象类必须把所有接口的抽象方法全部实现。
 * 对应笔记：面向对象 → 接口 → 类实现接口（implements）
 */
public class MultiImplementDemo {

    public static void main(String[] args) {
        Duck duck = new Duck();
        duck.fly();
        duck.swim();
        // 输出：
        // 鸭子扑腾着飞起来了
        // 鸭子在水里游泳
    }
}

/**
 * 行为规范：会飞
 */
interface Flyable {

    void fly();
}

/**
 * 行为规范：会游泳
 */
interface Swimmable {

    void swim();
}

/**
 * 鸭子会飞也会游泳：同时实现两个接口，fly()、swim() 一个都不能少
 */
class Duck implements Flyable, Swimmable {

    @Override
    public void fly() {
        System.out.println("鸭子扑腾着飞起来了");
    }

    @Override
    public void swim() {
        System.out.println("鸭子在水里游泳");
    }
}

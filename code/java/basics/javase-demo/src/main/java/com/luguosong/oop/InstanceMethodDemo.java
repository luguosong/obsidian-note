package com.luguosong.oop;

/**
 * 实例方法：描述对象的行为动作，通过 对象名.方法名(实参) 调用。
 * 实例方法中可以直接访问实例变量：通过哪个对象调用，访问的就是哪个对象的实例变量。
 * 对应笔记：面向对象 → 定义类 → 实例方法
 */
public class InstanceMethodDemo {

    public static void main(String[] args) {
        Dog d1 = new Dog();
        Dog d2 = new Dog();

        d1.name = "旺财";
        d2.name = "小黑";

        // 通过对象调用实例方法：对象名.方法名(实参)
        d1.eat("骨头");  // 旺财正在吃骨头
        d2.eat("狗粮");  // 小黑正在吃狗粮

        // 无参实例方法
        d1.sleep();  // 旺财睡觉中...
        d2.sleep();  // 小黑睡觉中...
    }
}

/**
 * 狗类：属性描述状态，方法描述行为
 */
class Dog {

    String name;  // 昵称

    // 有参实例方法：形参 food 接收调用者传进来的食物
    void eat(String food) {
        System.out.println(name + "正在吃" + food);
    }

    // 无参实例方法
    void sleep() {
        System.out.println(name + "睡觉中...");
    }
}

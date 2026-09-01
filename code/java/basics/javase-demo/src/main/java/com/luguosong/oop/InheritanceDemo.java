package com.luguosong.oop;

/**
 * 继承基础语法：Bird extends Animal，子类直接拥有父类中可继承的成员，并扩展出自己特有的属性和方法。
 * 对应笔记：面向对象 → 继承性 → 基础语法
 */
public class InheritanceDemo {

    public static void main(String[] args) {
        // 父类对象：只能使用 Animal 自己定义的成员，不能调用子类扩展的 fly()
        Animal animal = new Animal();
        animal.name = "阿黄";
        animal.eat();
        animal.sleep();

        System.out.println("------------------");

        // 子类对象：既拥有继承来的成员，也拥有自己扩展的成员
        Bird bird = new Bird();
        bird.name = "小黑";        // name 是从 Animal 继承来的实例变量
        bird.wingLength = 30;      // wingLength 是 Bird 自己扩展的实例变量
        bird.eat();                // eat() 是继承来的方法
        bird.sleep();              // sleep() 是继承来的方法
        bird.fly();                // fly() 是 Bird 扩展出来的方法
    }
}

/**
 * 父类（超类/基类）：动物
 */
class Animal {

    String name;  // 姓名

    public void eat() {
        System.out.println(name + "在吃东西");
    }

    public void sleep() {
        System.out.println(name + "在睡觉");
    }
}

/**
 * 子类（派生类）：鸟——在 Animal 的基础上扩展出翅膀属性和飞行行为
 */
class Bird extends Animal {

    double wingLength;  // 翅膀长度（厘米），子类特有的属性

    public void fly() {
        System.out.println(name + "展开 " + wingLength + " 厘米的翅膀飞起来了");
    }
}

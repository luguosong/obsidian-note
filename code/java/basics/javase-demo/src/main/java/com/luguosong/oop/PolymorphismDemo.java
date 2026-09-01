package com.luguosong.oop;

/**
 * 多态：父类型引用指向子类对象——编译阶段按引用类型静态绑定，运行阶段按真实对象动态绑定。
 * 对应笔记：面向对象 → 多态 → 什么是多态
 */
public class PolymorphismDemo {

    public static void main(String[] args) {
        // 父类型引用指向子类对象：编译看左边（Creature），运行看右边（堆中的真实对象）
        Creature c1 = new Cat();
        c1.move();  // 猫在走猫步 —— 运行时自动执行 Cat 重写后的 move()

        Creature c2 = new Fish();
        c2.move();  // 鱼在游动 —— 完全相同的调用代码，真实对象不同，行为就不同
    }
}

/**
 * 生物（父类）
 */
class Creature {

    public void move() {
        System.out.println("生物在移动");
    }
}

/**
 * 猫（子类）：重写 move() 表达自己的移动方式
 */
class Cat extends Creature {

    @Override
    public void move() {
        System.out.println("猫在走猫步");
    }
}

/**
 * 鱼（子类）：重写 move() 表达自己的移动方式
 */
class Fish extends Creature {

    @Override
    public void move() {
        System.out.println("鱼在游动");
    }
}

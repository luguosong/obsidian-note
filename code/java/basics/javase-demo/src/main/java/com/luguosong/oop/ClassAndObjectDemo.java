package com.luguosong.oop;

/**
 * 类与对象：类是提取共同特征形成的模板（抽象概念），对象是实际存在的个体（实例）。
 * 通过一个 Star 类实例化多个对象，每个对象都有 name 属性，但值互不相同——实例变量一个对象一份。
 * 对应笔记：面向对象 → 类与对象 → 类和对象的关系
 */
public class ClassAndObjectDemo {

    public static void main(String[] args) {
        // 通过类这个模板可以实例化 n 个对象
        Star star1 = new Star();
        Star star2 = new Star();

        // 两个对象都有 name 属性，但值不同：这就是实例变量
        star1.name = "刘德华";
        star2.name = "梁朝伟";

        star1.show();  // 我是明星：刘德华
        star2.show();  // 我是明星：梁朝伟
    }
}

/**
 * 明星类：把刘德华、梁朝伟等明星的共同特征提取出来形成的模板
 * 属性描述状态，方法描述行为，类 = 属性 + 方法
 */
class Star {

    // 状态 → 属性，属性通常用变量来表示
    String name;

    // 行为 → 方法
    void show() {
        System.out.println("我是明星：" + name);
    }
}

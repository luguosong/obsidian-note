package com.luguosong.oop;

/**
 * 方法覆盖（方法重写）：从父类继承来的方法无法满足子类业务需求时，子类重新实现该方法；
 * 覆盖之后，子类对象调用该方法时一定执行重写之后的版本。
 * 对应笔记：面向对象 → 继承性 → 方法覆盖
 */
public class OverrideDemo {

    public static void main(String[] args) {
        Shape shape = new Shape();
        shape.draw();  // 绘制图形

        System.out.println("------------------");

        Circle circle = new Circle();
        // Circle 继承来的 draw() 只会打印"绘制图形"，满足不了圆形的绘制需求，已被重写
        circle.draw();  // 绘制圆形：子类对象调用的一定是重写之后的方法
    }
}

/**
 * 图形类（父类）
 */
class Shape {

    public void draw() {
        System.out.println("绘制图形");
    }
}

/**
 * 圆形类（子类）：重写 draw() 以满足自己的绘制需求
 */
class Circle extends Shape {

    // @Override 保证下面的方法确实是重写父类的方法：方法名拼错或形参列表不同时，编译阶段直接报错
    @Override
    public void draw() {
        System.out.println("绘制圆形");
    }
}

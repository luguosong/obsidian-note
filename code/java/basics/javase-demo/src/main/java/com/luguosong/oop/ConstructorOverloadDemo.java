package com.luguosong.oop;

/**
 * 构造方法重载：一个类可以定义多个构造方法，方法名相同、参数列表不同，自动构成重载。
 * 对应笔记：面向对象 → 构造方法 → 构造方法重载
 */
public class ConstructorOverloadDemo {

    public static void main(String[] args) {
        // new 后传入的实参列表决定执行哪个构造方法
        Rectangle r1 = new Rectangle();          // 匹配无参构造
        Rectangle r2 = new Rectangle(3.0, 4.0);  // 匹配两参构造

        System.out.println(r1.width + " x " + r1.height + "，面积 = " + r1.area());  // 1.0 x 1.0，面积 = 1.0
        System.out.println(r2.width + " x " + r2.height + "，面积 = " + r2.area());  // 3.0 x 4.0，面积 = 12.0
    }
}

/**
 * 长方形类
 */
class Rectangle {

    double width;   // 宽
    double height;  // 高

    // 无参构造：使用默认宽高
    Rectangle() {
        width = 1.0;
        height = 1.0;
    }

    // 两参构造：按传入的宽高初始化——与无参构造方法名相同、参数列表不同，构成重载
    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    double area() {
        return width * height;
    }
}

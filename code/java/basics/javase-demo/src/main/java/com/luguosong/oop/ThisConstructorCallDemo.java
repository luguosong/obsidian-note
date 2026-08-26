package com.luguosong.oop;

/**
 * this(实参) 调用本类其它构造方法：无参构造通过 this(0, 0) 复用两参构造的初始化逻辑。
 * 对应笔记：面向对象 → 构造方法 → this(实参)调用本类其它构造方法
 */
public class ThisConstructorCallDemo {

    public static void main(String[] args) {
        Point p1 = new Point();  // 无参构造第一行 this(0, 0)：先进入两参构造完成初始化
        System.out.println("p1: x = " + p1.x + ", y = " + p1.y);  // p1: x = 0, y = 0

        Point p2 = new Point(3, 4);  // 直接匹配两参构造
        System.out.println("p2: x = " + p2.x + ", y = " + p2.y);  // p2: x = 3, y = 4
    }
}

/**
 * 平面点类
 */
class Point {

    int x;  // 横坐标
    int y;  // 纵坐标

    // 无参构造：第一行 this(0, 0) 复用两参构造的初始化代码（不写在第一行会编译报错）
    Point() {
        this(0, 0);
        System.out.println("无参构造方法体执行");
    }

    // 两参构造：真正干活的地方，被无参构造复用
    Point(int x, int y) {
        this.x = x;
        this.y = y;
        System.out.println("两参构造方法体执行：x = " + x + ", y = " + y);
    }
}

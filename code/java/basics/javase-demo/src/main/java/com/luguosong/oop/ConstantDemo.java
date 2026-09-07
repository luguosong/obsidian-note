package com.luguosong.oop;

/**
 * 常量：static 与 final 联合修饰——static 全类只有一份（类名直接访问），final 值不可修改。
 * 对应笔记：面向对象 → final关键字 → 常量
 */
public class ConstantDemo {

    public static void main(String[] args) {
        // 常量通过"类名."访问，全类共享同一份
        System.out.println("圆周率：" + Geometry.PI);      // 圆周率：3.141592653589793
        System.out.println("默认单位：" + Geometry.UNIT);  // 默认单位：厘米

        // 用常量参与计算
        double r = 2.5;
        double area = Geometry.PI * r * r;
        System.out.println("半径 " + r + " 的圆面积：" + area + " " + Geometry.UNIT);

        // Geometry.PI = 3.14;  // 编译报错：无法为最终变量 PI 分配值——常量不允许重新赋值
    }
}

/**
 * 几何工具类：集中存放数学常量
 */
class Geometry {

    // 常量标准写法：public static final 三件套——公开、全类一份、不可修改
    public static final double PI = 3.141592653589793;

    public static final String UNIT = "厘米";
}

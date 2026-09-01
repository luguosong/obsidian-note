package com.luguosong.oop;

/**
 * 向上转型与向下转型：子到父是自动类型转换；父到子必须加强制类型转换符。
 * 对应笔记：面向对象 → 多态 → 向上转型和向下转型
 */
public class CastingDemo {

    public static void main(String[] args) {
        // 向上转型（子 --> 父）：子类型对象赋值给父类型引用，等同自动类型转换，不需要强转符
        Vehicle v = new Truck();
        v.run();  // 卡车在公路上行驶 —— 编译绑定 Vehicle 的 run()，运行执行真实对象 Truck 的 run()

        // 向下转型（父 --> 子）：父类型引用转回子类型引用，必须加强制类型转换符
        Truck t = (Truck) v;
        // 转回子类型后才能调用子类特有的方法（父类型引用 v 无法直接调用 load()）
        t.load();  // 卡车装载货物
    }
}

/**
 * 交通工具（父类）
 */
class Vehicle {

    public void run() {
        System.out.println("交通工具在行驶");
    }
}

/**
 * 卡车（子类）
 */
class Truck extends Vehicle {

    @Override
    public void run() {
        System.out.println("卡车在公路上行驶");
    }

    // 子类特有的方法：向上转型后的 Vehicle 引用无法直接调用
    public void load() {
        System.out.println("卡车装载货物");
    }
}

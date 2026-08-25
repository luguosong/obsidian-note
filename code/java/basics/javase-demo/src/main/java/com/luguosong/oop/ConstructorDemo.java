package com.luguosong.oop;

/**
 * 构造方法的作用：new 时先在堆内存中创建对象，再执行构造方法体完成对象的初始化。
 * 对应笔记：面向对象 → 构造方法 → 构造方法的作用
 */
public class ConstructorDemo {

    public static void main(String[] args) {
        // new 时：先在堆内存开辟空间创建对象，再执行构造方法体初始化
        Phone phone = new Phone();

        // 构造方法体执行完毕后属性已就绪，无需再手动赋值
        System.out.println(phone.brand);  // 华为
        System.out.println(phone.price);  // 4999.0
    }
}

/**
 * 手机类
 */
class Phone {

    String brand;  // 品牌
    double price;  // 价格

    // 构造方法：方法名与类名相同，没有返回值类型
    Phone() {
        System.out.println("Phone 的构造方法体开始执行，初始化对象");
        brand = "华为";
        price = 4999.0;
        System.out.println("Phone 的构造方法体执行完毕，对象初始化结束");
    }
}

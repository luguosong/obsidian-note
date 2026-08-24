package com.luguosong.oop;

/**
 * 面向对象方式开汽车：先分析需要哪些对象参与——汽车对象、司机对象，
 * 每个对象都有自己的行为，main 中让对象之间协作完成开车——关注点在"需要哪些对象的参与"上。
 * 对应笔记：面向对象 → 面向对象和面向过程 → 面向对象
 */
public class ObjectDriveDemo {

    public static void main(String[] args) {
        Car car = new Car();
        Driver driver = new Driver();

        // 司机对象驾驶汽车对象：对象之间协作起来完成功能
        driver.drive(car);
    }
}

/**
 * 汽车对象：有自己的行为
 */
class Car {

    void start() {
        System.out.println("汽车启动");  // 汽车启动
    }

    void run() {
        System.out.println("汽车行驶，车走了");  // 汽车行驶，车走了
    }
}

/**
 * 司机对象：有一个驾驶的行为
 */
class Driver {

    void drive(Car car) {
        car.start();
        car.run();
    }
}

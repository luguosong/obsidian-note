package com.luguosong.oop;

/**
 * instanceof 运算符：判断引用指向的真实对象类型；向下转型前先判断，避免 ClassCastException。
 * 对应笔记：面向对象 → 多态 → 向上转型和向下转型 → instanceof运算符
 */
public class InstanceOfDemo {

    public static void main(String[] args) {
        Device d = new Printer();

        // (Copier) d 编译能通过：d 是 Device 类型，Device 与 Copier 之间存在继承关系，语法没问题
        // Copier c = (Copier) d;  // 但运行时堆中真实对象是 Printer，无法转成 Copier，抛 ClassCastException

        // instanceof 的结果一定是 true/false：true 表示引用指向的对象是该类型
        System.out.println(d instanceof Device);   // true
        System.out.println(d instanceof Printer);  // true：d 指向的真实对象是 Printer 类型
        System.out.println(d instanceof Copier);   // false：d 指向的真实对象不是 Copier

        // 标准姿势：向下转型之前先用 instanceof 判断，避免 ClassCastException
        if (d instanceof Printer) {
            Printer p = (Printer) d;
            p.print();  // 打印机执行打印任务
        }
    }
}

/**
 * 办公设备（父类）
 */
class Device {
}

/**
 * 打印机（子类）
 */
class Printer extends Device {

    // 子类特有的方法
    public void print() {
        System.out.println("打印机执行打印任务");
    }
}

/**
 * 复印机（子类）
 */
class Copier extends Device {
}

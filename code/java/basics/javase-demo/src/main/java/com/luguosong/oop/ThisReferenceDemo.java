package com.luguosong.oop;

/**
 * this 指向当前对象：通过哪个对象调用实例方法，方法中的 this 就是哪个对象。
 * 对应笔记：面向对象 → this关键字 → this指向当前对象
 */
public class ThisReferenceDemo {

    public static void main(String[] args) {
        Pupil p1 = new Pupil();
        Pupil p2 = new Pupil();

        p1.name = "张三";
        p2.name = "李四";

        // p1 调用 study()，方法内的 this 就是 p1 指向的对象
        p1.study();  // 张三正在努力地学习!

        // 换 p2 调用同一个 study()，方法内的 this 就变成 p2 指向的对象
        p2.study();  // 李四正在努力地学习!
    }
}

/**
 * 学生类
 */
class Pupil {

    String name;  // 姓名（实例变量）

    // 学习的行为（实例方法）
    void study() {
        // this.name：当前对象的姓名——谁调用 study()，this 就是谁
        System.out.println(this.name + "正在努力地学习!");
    }
}

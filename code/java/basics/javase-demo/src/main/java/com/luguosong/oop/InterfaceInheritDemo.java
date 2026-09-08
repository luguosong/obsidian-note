package com.luguosong.oop;

/**
 * 接口与接口之间多继承演示：类与类只能单继承，接口之间可以用 extends 多继承；
 * 子接口合并所有父接口的规范，非抽象类实现子接口时，必须把继承来的抽象方法一并实现。
 * 对应笔记：面向对象 → 接口 → 接口与接口之间可以多继承
 */
public class InterfaceInheritDemo {

    public static void main(String[] args) {
        Performer performer = new Performer();
        performer.sing();
        performer.dance();
        // 输出：
        // 演员开始唱歌
        // 演员开始跳舞
    }
}

/**
 * 父接口：会唱歌
 */
interface Singable {

    void sing();
}

/**
 * 父接口：会跳舞
 */
interface Danceable {

    void dance();
}

/**
 * 子接口多继承：Performable 合并了 Singable、Danceable 的全部规范
 */
interface Performable extends Singable, Danceable {
}

/**
 * 实现 Performable：sing() 和 dance() 都是从父接口继承来的抽象方法，都必须实现
 */
class Performer implements Performable {

    @Override
    public void sing() {
        System.out.println("演员开始唱歌");
    }

    @Override
    public void dance() {
        System.out.println("演员开始跳舞");
    }
}

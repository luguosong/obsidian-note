package com.luguosong.oop;

/**
 * 构造代码块与初始化顺序：new 时先开辟空间给属性赋默认值，
 * 再执行构造代码块，最后执行构造方法体。
 * 对应笔记：面向对象 → 构造方法 → 构造代码块与初始化顺序
 */
public class ConstructorBlockDemo {

    public static void main(String[] args) {
        System.out.println("---- 第一次 new ----");
        new Machine("M-001");
        System.out.println("---- 第二次 new ----");
        new Machine("M-002");
    }
}

/**
 * 机器类
 */
class Machine {

    String sn;  // 序列号

    // 构造代码块：每次 new 都执行，且先于构造方法体
    {
        // 此时属性仍处于默认值状态（开辟空间阶段的默认初始化已完成）
        System.out.println("构造代码块执行，sn 还是默认值：" + sn);
    }

    // 构造方法体：在构造代码块之后执行
    Machine(String sn) {
        System.out.println("构造方法体执行，给 sn 赋值 " + sn);
        this.sn = sn;
    }
}

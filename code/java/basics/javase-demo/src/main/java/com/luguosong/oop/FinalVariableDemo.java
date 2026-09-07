package com.luguosong.oop;

/**
 * final 修饰变量：一旦赋值，不能重新赋值；
 * final 实例变量必须在构造方法执行完之前赋上值（声明处/构造代码块/构造方法三选一）。
 * 对应笔记：面向对象 → final关键字 → final修饰变量
 */
public class FinalVariableDemo {

    public static void main(String[] args) {
        // 场景一：final 局部变量——声明时赋值，之后不能重新赋值
        final int max = 100;
        System.out.println("max：" + max);  // max：100
        // max = 200;  // 编译报错：无法为最终变量 max 分配值

        // 先声明、后赋值也可以，但同样只能赋一次
        final int min;
        min = 0;
        // min = 1;  // 编译报错：可能已为变量 min 分配了值

        // 场景二：final 实例变量——每台终端的序列号出厂即固定，每个对象各一份
        Terminal t1 = new Terminal("SN-0001");
        Terminal t2 = new Terminal("SN-0002");
        System.out.println("t1 序列号：" + t1.serialNo);  // t1 序列号：SN-0001
        System.out.println("t2 序列号：" + t2.serialNo);  // t2 序列号：SN-0002

        // t1.serialNo = "SN-9999";  // 编译报错：无法为最终变量 serialNo 分配值
    }
}

/**
 * 终端类：final 实例变量在构造方法中赋值——每个对象的序列号确定后永不再变
 */
class Terminal {

    final String serialNo;  // 出厂序列号：必须在构造方法执行完之前赋上值

    Terminal(String serialNo) {
        this.serialNo = serialNo;
    }
}

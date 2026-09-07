package com.luguosong.oop;

/**
 * super(实参)：写在子类构造方法的第一行，调用父类构造完成父类型特征的初始化——
 * 先父后子；不写 this(实参) 也不写 super(实参) 时，编译器自动补隐式 super()。
 * 对应笔记：面向对象 → super关键字 → super(实参)调用父类构造方法
 */
public class SuperConstructorDemo {

    public static void main(String[] args) {
        // 输出顺序印证执行顺序：先执行父类构造，再执行子类构造
        SavingsAccount acc = new SavingsAccount("张三", 0.035);
        // 输出：
        // Account(String) 父类构造执行：初始化 owner
        // SavingsAccount(String, double) 子类构造执行：初始化 rate

        // owner 由 super(owner) 交给父类构造初始化，rate 由子类构造自己初始化
        System.out.println("户主：" + acc.owner + "，利率：" + acc.rate);
        // 输出：户主：张三，利率：0.035
    }
}

/**
 * 父类：实例变量 owner + 有参构造
 */
class Account {

    String owner;

    public Account(String owner) {
        // 第一行隐式 super()：调用 Object 的无参构造
        this.owner = owner;
        System.out.println("Account(String) 父类构造执行：初始化 owner");
    }
}

/**
 * 子类：新增实例变量 rate，构造方法第一行显式调用 super(实参)
 */
class SavingsAccount extends Account {

    double rate;

    public SavingsAccount(String owner, double rate) {
        super(owner);  // 必须在第一行：把 owner 交给父类构造去初始化
        this.rate = rate;
        System.out.println("SavingsAccount(String, double) 子类构造执行：初始化 rate");
    }
}

package com.luguosong.oop;

/**
 * 接口的定义语法与成员省略规则演示：常量的 public static final、抽象方法的 public abstract 都可以省略，
 * 编译器自动补全，完整写法与省略写法完全等价。
 * 接口没有构造方法、无法实例化；非抽象类实现接口必须实现全部抽象方法。
 * 对应笔记：面向对象 → 接口 → 接口中的常量与抽象方法
 */
public class InterfaceSyntaxDemo {

    public static void main(String[] args) {
        // 常量通过 接口名. 访问：num1 完整写法、num2 省略写法，访问方式完全相同
        System.out.println("num1 = " + MyInterface.num1);
        System.out.println("num2 = " + MyInterface.num2);
        // MyInterface.num2 = 20;  // 编译报错：接口中只有常量（final），不能重新赋值

        // MyInterface mi = new MyInterface();  // 编译报错：接口无法实例化
        MyInterface mi = new MyInterfaceImpl();  // 接口类型引用指向实现类对象
        mi.m1();
        mi.m2();
        // 输出：
        // num1 = 1
        // num2 = 2
        // 实现 m1() 方法
        // 实现 m2() 方法
    }
}

/**
 * 接口：num1/m1 用完整写法，num2/m2 用省略写法——两种写法编译后完全一样
 */
interface MyInterface {

    // public MyInterface() {}  // 编译报错：接口没有构造方法

    public static final int num1 = 1;  // 常量：完整写法

    int num2 = 2;  // 常量：省略 public static final，等价于上一行

    public abstract void m1();  // 抽象方法：完整写法

    void m2();  // 抽象方法：省略 public abstract，等价于上一行
}

/**
 * 非抽象类实现接口：必须实现接口中全部抽象方法，少实现一个就编译报错
 */
class MyInterfaceImpl implements MyInterface {

    @Override
    public void m1() {
        System.out.println("实现 m1() 方法");
    }

    @Override
    public void m2() {
        System.out.println("实现 m2() 方法");
    }
}

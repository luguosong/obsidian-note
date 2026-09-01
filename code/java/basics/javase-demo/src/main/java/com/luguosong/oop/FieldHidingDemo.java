package com.luguosong.oop;

/**
 * 实例变量不会被覆盖：子类同名实例变量是"隐藏"而非"重写"——
 * 方法调用运行阶段看右边（堆中真实对象），变量访问永远看左边（引用的类型）。
 * 对应笔记：面向对象 → 继承性 → 方法覆盖 → 实例变量不会被覆盖
 */
public class FieldHidingDemo {

    public static void main(String[] args) {
        // 父类型引用指向子类对象（多态场景）
        Parent p = new Child();

        // 变量访问：编译阶段就按"引用的类型 Parent"解析，运行阶段也不改变
        System.out.println(p.name);  // 父类的 name —— 堆中明明是 Child 对象，读到的却是父类的变量

        // 方法调用：运行阶段按"堆中真实对象 Child"执行，重写后的方法生效
        p.show();  // show() 中读到：子类的 name

        // 想访问子类那份变量：把引用转成子类型，按 Child 类型解析
        System.out.println(((Child) p).name);  // 子类的 name
    }
}

/**
 * 父类：声明实例变量 name
 */
class Parent {

    String name = "父类的 name";

    public void show() {
        System.out.println("show() 中读到：" + name);
    }
}

/**
 * 子类：重新声明同名实例变量（变量隐藏，不是覆盖），并重写 show()
 */
class Child extends Parent {

    String name = "子类的 name";  // 隐藏了从父类继承来的 name，两份变量同时存在

    @Override
    public void show() {
        // 子类方法体中裸写 name，解析到子类自己的那份变量
        System.out.println("show() 中读到：" + name);
    }
}

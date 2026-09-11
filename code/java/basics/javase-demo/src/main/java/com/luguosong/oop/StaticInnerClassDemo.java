package com.luguosong.oop;

/**
 * 静态内部类：当作外部类的静态变量看——类级别成员，不需要外部类对象即可实例化；
 * 类内无法直接访问外部类的实例成员。
 * 对应笔记：面向对象 → 内部类 → 静态内部类
 */
public class StaticInnerClassDemo {

    public static void main(String[] args) {
        // 在外部类的外部实例化：new 外部类名.内部类名()，全程不需要外部类对象
        OuterClass.InnerClass inner = new OuterClass.InnerClass();
        inner.m3();

        // 内部类自己的静态方法，同样通过"类名."调用
        OuterClass.InnerClass.m4();

        // 在外部类的内部使用内部类时，可以省略外部类名前缀
        OuterClass.test();
    }
}

/**
 * 外部类
 */
class OuterClass {

    // 静态变量：类级别
    private static int i = 100;

    // 实例变量：对象级别
    private int j = 200;

    // 静态方法
    public static void m1() {
        System.out.println("外部类的m1静态方法执行了");
    }

    // 实例方法
    public void m2() {
        System.out.println("外部类的m2实例方法执行了");
    }

    // 静态内部类：和静态变量一个级别，四种访问权限修饰符都可以修饰它（顶层类只能 public/缺省）
    public static class InnerClass {

        public void m3() {
            System.out.println(i);       // 100：静态内部类可以直接访问外部类的静态变量
            //System.out.println(j);     // 编译报错：静态内部类无法直接访问外部类的实例变量
            m1();                        // 可以直接调用外部类的静态方法
            //m2();                      // 编译报错：无法直接调用外部类的实例方法
        }

        public static void m4() {
            System.out.println(i);       // 静态上下文同样只能访问外部类的静态成员
            m1();
        }
    }

    // 在外部类内部使用：省略 OuterClass. 前缀，直接用内部类简名
    public static void test() {
        InnerClass inner = new InnerClass();
        inner.m3();
        InnerClass.m4();
    }
}

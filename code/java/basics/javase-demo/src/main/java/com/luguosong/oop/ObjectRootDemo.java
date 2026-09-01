package com.luguosong.oop;

/**
 * Object 类是所有类的根类：类体什么都不写（不显式继承任何类）就默认继承 Object，
 * 因此空类也能调用 toString()/hashCode()/equals() 等方法。
 * 对应笔记：面向对象 → 继承性 → Object类
 */
public class ObjectRootDemo {

    public static void main(String[] args) {
        // Gadget 类体是空的，一个成员都没有定义
        Gadget gadget = new Gadget();

        // 以下方法都没有在 Gadget 中定义，全部继承自 java.lang.Object
        System.out.println(gadget.toString());      // 例如：com.luguosong.oop.Gadget@460141958（哈希值的十六进制，每次运行不同）
        System.out.println(gadget.hashCode());      // 例如：460141958（每次运行不同）
        System.out.println(gadget.equals(gadget));  // true：默认比较对象的内存地址，自己和自己当然相等
    }
}

/**
 * 一个什么成员都没有的空类
 */
class Gadget {
}

package com.luguosong.oop;

/**
 * 静态变量：类级别的属性全类只有一份，随类加载初始化，不需要对象即可通过"类名."访问。
 * 对应笔记：面向对象 → static关键字 → 静态变量
 */
public class StaticVariableDemo {

    public static void main(String[] args) {
        // 类加载后静态变量已初始化，不创建对象就能通过"类名."访问
        System.out.println("类名直接访问：" + Chinese.country);  // 类名直接访问：中国

        Chinese zhang = new Chinese();
        zhang.name = "张三";
        Chinese li = new Chinese();
        li.name = "李四";

        // 实例变量一个对象一份（姓名各不相同），静态变量全类共享一份（国籍都一样）
        System.out.println(zhang.name + " 的国籍：" + Chinese.country);  // 张三 的国籍：中国
        System.out.println(li.name + " 的国籍：" + Chinese.country);     // 李四 的国籍：中国

        // 通过类名修改静态变量——内存中只有这一份，所有对象读到的值同时变化
        Chinese.country = "中华人民共和国";
        System.out.println(zhang.name + " 的国籍：" + Chinese.country);  // 张三 的国籍：中华人民共和国
        System.out.println(li.name + " 的国籍：" + Chinese.country);     // 李四 的国籍：中华人民共和国
    }
}

/**
 * 中国人类
 */
class Chinese {

    // 静态变量：所有中国人的国籍相同，定义为类级别属性，内存中只存一份
    static String country = "中国";  // 国籍

    String name;  // 姓名（实例变量：每个人的姓名各不相同，一个对象一份）
}

package com.luguosong.basicsyntax;

/**
 * 标识符总览：标识符可命名的元素——变量、方法、类、接口、枚举、注解、包、常量。
 * 对应笔记：[[基本语法]] → 标识符
 */
public class IdentifierOverview {

    // 常量名（约定全大写，单词间用下划线分隔）
    static final int MAX_SIZE = 100;
    static final double PI = 3.14;

    // 成员变量（变量名示例）
    String name = "张三";

    // 方法名
    public void printInfo() {
        System.out.println(name);
    }

    // 类名、接口名、枚举名、注解名（均为标识符命名）
    class Student { }
    interface Runnable { }
    enum Color { RED, GREEN, BLUE }
    @interface MyAnnotation { }

    public static void main(String[] args) {
        // 变量名
        int age = 18;
        String name = "张三";

        // 包名（package 声明必须在源文件首行，此处仅作示例）
        // package com.luguosong.demo;

        IdentifierOverview demo = new IdentifierOverview();
        demo.printInfo();
        System.out.println("age=" + age + ", MAX_SIZE=" + MAX_SIZE);
    }
}

package com.luguosong.basicsyntax;

/**
 * 变量的作用域：成员变量、方法参数、局部变量、块作用域。
 * 对应笔记：[[基本语法]] → 变量 → 作用域
 */
public class ScopeDemo {

    // 成员变量：整个类的方法都能访问
    private String name = "张三";

    public void demo(int param) {   // 方法参数：整个方法体可见
        int age = 18;               // 局部变量：从此处到方法 } 结束
        System.out.println(name + age + param);   // 对：都在作用域内

        {
            int blockVar = 100;     // 局部变量：仅在此 {} 内
        }
        // System.out.println(blockVar);  // 错：已超出 blockVar 的作用域
    }

    public void other() {
        // System.out.println(age);        // 错：age 属于 demo 方法，这里不可见
    }

    public static void main(String[] args) {
        ScopeDemo scope = new ScopeDemo();
        scope.demo(99);
    }
}

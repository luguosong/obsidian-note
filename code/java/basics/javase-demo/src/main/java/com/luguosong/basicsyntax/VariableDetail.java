package com.luguosong.basicsyntax;

/**
 * 变量使用细节：先声明后访问、一行声明多个变量、重名规则、类型匹配。
 * 对应笔记：[[基本语法]] → 变量
 */
public class VariableDetail {

    public static void main(String[] args) {
        // 必须先声明、再赋值，才能访问（方法体自上而下逐行执行）
        // System.out.println(age);  // 错：此时 age 还没声明
        int age;
        age = 18;
        System.out.println(age);      // 对：声明并赋值后再访问

        // 一行可以声明多个变量
        int a, b, c;
        int x = 1, y = 2, z = 3;

        // 同作用域内变量名不能重名，但可以重新赋值
        int count = 0;
        count = 5;                    // 对：重新赋值
        // int count = 10;            // 错：重名

        // 变量值的数据类型必须和变量类型一致
        // String name = 100;         // 错：类型不匹配

        System.out.println("count=" + count + ", x=" + x);
    }
}

package com.luguosong.basicsyntax.variable;

/**
 * 变量的声明、赋值与访问。
 * 对应笔记：[[基本语法]] → 变量
 */
public class VariableDeclare {

    public static void main(String[] args) {
        // 声明变量
        int age;

        // 赋值变量
        age = 18;

        // 访问变量：读取
        System.out.println(age);

        // 访问变量：修改
        age = 20;

        // 声明时同时赋值（最常用）
        int score = 100;

        System.out.println("age=" + age + ", score=" + score);
    }
}

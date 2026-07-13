package com.luguosong.basicsyntax.datatype;

/**
 * 布尔型 boolean：只有 true/false，不能与整数或其它类型互转。
 * 对应笔记：[[基本语法]] → 数据类型 → 基本数据类型 → 布尔型
 */
public class BooleanTypeDemo {

    public static void main(String[] args) {
        boolean flag = true;
        boolean done = false;

        // 布尔不能与其它类型互转
        // int i = flag;       // 编译错
        // boolean b = 1;      // 编译错（不像 C/C++，Java 不允许用 0/1 当布尔）

        System.out.println("flag=" + flag + ", done=" + done);
    }
}

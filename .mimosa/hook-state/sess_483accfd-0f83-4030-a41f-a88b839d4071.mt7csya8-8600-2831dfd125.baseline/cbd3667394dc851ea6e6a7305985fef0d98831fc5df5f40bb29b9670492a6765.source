package com.luguosong.basicsyntax.operator;

/**
 * 其它运算符：instanceof 类型判断。判断对象是否某类型实例，返回 boolean。
 * JDK 16+ 支持模式匹配：判断的同时把对象绑定到新变量，省去强制转换。
 * 对应笔记：Java基础语法 → 运算符 → 其它运算符
 */
public class InstanceofDemo {

    public static void main(String[] args) {
        Object obj = "hello";

        // 基本用法：判断类型，返回 boolean
        System.out.println(obj instanceof String);   // true
        System.out.println(obj instanceof Integer);  // false

        // 模式匹配（JDK 16+）：判断成立就把 obj 绑定为 String s，直接用，省去强转
        if (obj instanceof String s) {
            System.out.println(s.length());          // 5
        }
    }
}

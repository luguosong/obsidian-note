package com.luguosong.oop;

/**
 * 金库类：位于 com.luguosong.oop 包，作为跨包访问演示（ProtectedAccessDemo）的父类。
 * 四种权限各修饰一个成员。
 * 对应笔记：面向对象 → 访问控制权限 → protected 是只给子类用的吗？
 */
public class Vault {

    private String accessCode = "666888";  // private：只有本类能访问

    String currency = "CNY";  // 缺省：同一个包中可以访问

    protected double cash = 100_000;  // protected：同一个包 + 其它包的子类

    public String owner = "总行";  // public：任何位置
}

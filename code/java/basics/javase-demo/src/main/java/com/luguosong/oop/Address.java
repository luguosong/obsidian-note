package com.luguosong.oop;

/**
 * 克隆演示用的地址类（ShallowCloneDemo、DeepCloneDemo 共用）。
 * 实现 Cloneable 并重写 clone()：深克隆时 Customer 要调用 address.clone()，
 * 重写的同时把访问权限从 protected 提升为 public（protected 只允许同包或子类访问）。
 * 对应笔记：面向对象 → Object类 → clone方法
 */
public class Address implements Cloneable {

    String city;

    Address(String city) {
        this.city = city;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

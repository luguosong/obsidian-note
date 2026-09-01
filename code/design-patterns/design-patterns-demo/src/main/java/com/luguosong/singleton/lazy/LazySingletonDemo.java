package com.luguosong.singleton.lazy;

/**
 * 懒汉式单例演示：第一次获取时才创建对象，多次获取拿到的是同一个实例。
 * 对应笔记：创建型-单例 → 懒汉式
 */
public class LazySingletonDemo {

    public static void main(String[] args) {
        Singleton s1 = Singleton.get();
        Singleton s2 = Singleton.get();

        // 期望输出：true —— 第一次调用 get() 时创建，之后返回同一个对象
        System.out.println(s1 == s2);
    }
}

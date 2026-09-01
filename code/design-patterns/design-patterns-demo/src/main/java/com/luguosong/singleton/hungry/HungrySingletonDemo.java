package com.luguosong.singleton.hungry;

/**
 * 饿汉式单例演示：多次获取拿到的是同一个实例。
 * 对应笔记：创建型-单例 → 饿汉式
 */
public class HungrySingletonDemo {

    public static void main(String[] args) {
        Singleton s1 = Singleton.get();
        Singleton s2 = Singleton.get();

        // 期望输出：true —— 两次获取的是同一个对象
        System.out.println(s1 == s2);
    }
}

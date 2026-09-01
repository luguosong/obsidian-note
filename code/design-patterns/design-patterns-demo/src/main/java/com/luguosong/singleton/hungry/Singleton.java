package com.luguosong.singleton.hungry;

/**
 * 饿汉式单例：类加载时就创建好唯一实例，不管后面用不用。
 * 对应笔记：创建型-单例 → 饿汉式
 */
public class Singleton {

    // 静态变量在类加载时初始化，只初始化一次 —— 唯一实例在这里诞生
    private static Singleton s = new Singleton();

    private Singleton() {
    }

    // 对外提供一个公开的静态方法，用这个方法获取单个实例
    public static Singleton get() {
        return s;
    }
}

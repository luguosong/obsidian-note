package com.luguosong.singleton.lazy;

/**
 * 懒汉式单例：用到这个对象的时候再创建对象，不在类加载的时候创建。
 * 对应笔记：创建型-单例 → 懒汉式
 */
public class Singleton {

    // 先只声明不创建，初始值为 null
    private static Singleton s;

    private Singleton() {
    }

    // 对外提供一个静态方法，通过这个方法可以获取到 Singleton 对象
    public static Singleton get() {
        // 第一次调用时 s 还是 null，这时才创建对象；之后 s 不再为 null，直接返回已有实例
        if (s == null) {
            s = new Singleton();
        }
        return s;
    }
}

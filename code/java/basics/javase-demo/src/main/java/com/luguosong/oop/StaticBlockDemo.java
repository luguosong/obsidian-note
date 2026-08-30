package com.luguosong.oop;

/**
 * 静态代码块：类加载时刻执行的代码，只执行一次；多个静态代码块自上而下依次执行。
 * 对应笔记：面向对象 → static关键字 → 静态代码块
 */
public class StaticBlockDemo {

    public static void main(String[] args) {
        System.out.println("main 开始");
        // 第一次使用 LogTool 类：此刻触发类加载，静态代码块自上而下各执行一次
        new LogTool();
        // 第二次 new：类已经加载过了，静态代码块不会再执行
        new LogTool();
        System.out.println("main 结束");
    }
}

/**
 * 日志工具类
 */
class LogTool {

    static String version;  // 版本号（静态变量）

    // 静态代码块①：类加载时执行——可以访问在它之前声明的静态变量
    static {
        version = "1.0";
        System.out.println("静态代码块①执行：类加载时刻，初始化 version = " + version);
    }

    // 静态代码块②：与①按声明顺序自上而下依次执行
    static {
        System.out.println("静态代码块②执行：记录类加载日志（模拟需求：类加载时记录日志）");
    }

    LogTool() {
        System.out.println("构造方法执行：每次 new 都执行");
    }
}

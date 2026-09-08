package com.luguosong.oop;

/**
 * JDK8 默认方法与静态方法演示：默认方法解决「接口演变问题」——接口发布后新增的默认方法，
 * 老实现类一行不改直接继承使用（ConsoleLogger），也可以选择覆盖（FileLogger）；
 * 静态方法只能通过本接口名访问，无法通过实现类的类名或对象访问。
 * 对应笔记：面向对象 → 接口 → JDK8 新特性：默认方法与静态方法
 */
public class DefaultMethodDemo {

    public static void main(String[] args) {
        ConsoleLogger console = new ConsoleLogger();
        console.log("启动完成");
        // logUrgent() 是接口后来新增的默认方法，ConsoleLogger 一行没改，直接继承使用
        console.logUrgent("磁盘空间不足");

        FileLogger file = new FileLogger();
        file.log("启动完成");
        file.logUrgent("磁盘空间不足");  // 默认方法也可以被覆盖

        Logger.showVersion();  // 静态方法：只能用本接口名访问
        // ConsoleLogger.showVersion();  // 编译报错：不能用实现类的类名访问接口静态方法
        // console.showVersion();        // 编译报错：也不能通过实现类对象访问
        // 输出：
        // 控制台日志：启动完成
        // 控制台日志：[紧急] 磁盘空间不足
        // 文件日志：启动完成
        // 文件日志：[文件紧急] 磁盘空间不足
        // Logger 接口 v2.0
    }
}

/**
 * 日志接口：log() 是发布时就有的抽象方法，logUrgent() 是后来新增的默认方法
 */
interface Logger {

    /**
     * 抽象方法：日志输出到哪里，由实现类决定
     */
    void log(String message);

    /**
     * JDK8 默认方法：有方法体，给出通用实现（复用抽象方法加前缀），
     * 实现类不改任何代码就能直接使用——新增方法不再破坏已有实现类
     */
    default void logUrgent(String message) {
        log("[紧急] " + message);
    }

    /**
     * JDK8 静态方法：只能通过 接口名. 访问
     */
    static void showVersion() {
        System.out.println("Logger 接口 v2.0");
    }
}

/**
 * 老实现类：只实现了抽象方法 log()，接口后来新增的默认方法一行都没写，照样能用
 */
class ConsoleLogger implements Logger {

    @Override
    public void log(String message) {
        System.out.println("控制台日志：" + message);
    }
}

/**
 * 新实现类：默认方法不合适时可以覆盖
 */
class FileLogger implements Logger {

    @Override
    public void log(String message) {
        System.out.println("文件日志：" + message);
    }

    @Override
    public void logUrgent(String message) {
        log("[文件紧急] " + message);
    }
}

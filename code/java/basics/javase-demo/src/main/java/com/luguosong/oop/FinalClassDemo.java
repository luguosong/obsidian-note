package com.luguosong.oop;

/**
 * final 修饰类：无法被继承——不能有任何子类，但可以正常实例化和使用。
 * 对应笔记：面向对象 → final关键字 → final修饰类
 */
public class FinalClassDemo {

    public static void main(String[] args) {
        // final 类可以正常创建对象、正常使用，只是不允许被继承
        FinalTool tool = new FinalTool();
        tool.work();  // FinalTool: 工具运行中
    }
}

/**
 * final 类：设计上不希望被扩展，例如 JDK 中的 String、System 都是 final 类
 */
final class FinalTool {

    public void work() {
        System.out.println("FinalTool: 工具运行中");
    }
}

// class SubTool extends FinalTool {}  // 编译报错：无法从最终类 FinalTool 进行继承

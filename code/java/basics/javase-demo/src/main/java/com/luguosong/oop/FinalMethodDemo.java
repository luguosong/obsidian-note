package com.luguosong.oop;

/**
 * final 修饰方法：无法被覆盖（重写）——子类只能继承使用，不能重新实现。
 * 但 final 方法不耽误继承调用，也不耽误重载。
 * 对应笔记：面向对象 → final关键字 → final修饰方法
 */
public class FinalMethodDemo {

    public static void main(String[] args) {
        Report r = new SalesReport();

        // final 方法：正常继承、正常调用，运行的是父类焊死的实现
        r.header();  // ===== 公司统一报表页眉 =====

        // 普通方法：子类重写后，运行的是子类的实现
        r.body();  // SalesReport: 本月销售额 120 万
    }
}

/**
 * 父类：页眉格式对所有报表统一，用 final 焊死；正文内容由子类自定义
 */
class Report {

    // final 方法：不允许子类重新实现，保证所有报表页眉格式统一
    final void header() {
        System.out.println("===== 公司统一报表页眉 =====");
    }

    // 普通方法：正文内容各报表不同，留给子类重写
    void body() {
        System.out.println("Report: 空白报表");
    }
}

/**
 * 子类：可以重写 body()，但不能重写 header()
 */
class SalesReport extends Report {

    @Override
    void body() {
        System.out.println("SalesReport: 本月销售额 120 万");
    }

    // @Override
    // void header() {  // 编译报错：header() 在 Report 中是 final 的，无法被覆盖
    //     System.out.println("自定义页眉");
    // }
}

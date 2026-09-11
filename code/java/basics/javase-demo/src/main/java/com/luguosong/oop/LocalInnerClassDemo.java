package com.luguosong.oop;

/**
 * 局部内部类：当作局部变量看——定义在方法体中，作用域仅限当前方法；
 * 它访问的局部变量必须是"事实最终变量"（effectively final）。
 * 对应笔记：面向对象 → 内部类 → 局部内部类
 */
public class LocalInnerClassDemo {

    public static void main(String[] args) {
        // 被局部内部类访问的局部变量：JDK7 及以前必须显式写 final；JDK8 起只要事实上没有被重新赋值即可
        int min = 0;
        int max = 100;
        //max = 200;  // 取消注释后 max 被重新赋值，下面的 Range 再访问它就直接编译报错

        // 局部内部类：定义在方法体中，出了 main 方法就无法使用
        class Range {
            boolean contains(int value) {
                // 访问的其实是 min/max 捕获时复制的副本，final 保证副本永远与原值一致
                return value >= min && value <= max;
            }
        }

        // 只能在本方法内实例化和使用
        Range range = new Range();
        System.out.println("50在范围内：" + range.contains(50));    // 50在范围内：true
        System.out.println("150在范围内：" + range.contains(150));  // 150在范围内：false
    }
}

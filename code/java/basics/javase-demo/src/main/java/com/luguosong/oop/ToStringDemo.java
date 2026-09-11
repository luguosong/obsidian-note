package com.luguosong.oop;

/**
 * toString() 方法：直接打印引用时自动调用；默认返回「完整类名@哈希的十六进制」读不出业务信息，
 * 重写后返回有业务含义的字符串。
 * 对应笔记：面向对象 → Object类 → toString方法
 */
public class ToStringDemo {

    public static void main(String[] args) {
        Movie movie = new Movie("流浪地球2", 2023);

        // 直接打印引用：自动调用 toString()，无需显式书写
        System.out.println(movie);             // 电影：流浪地球2（2023年）
        // 显式调用 toString()，与直接打印完全等价
        System.out.println(movie.toString());  // 电影：流浪地球2（2023年）
        // 若不重写 toString，默认输出形如 com.luguosong.oop.Movie@1b6d3586
        // ——「完整类名@hashCode的十六进制」（每次运行不同），读不出任何业务信息
    }
}

class Movie {
    String title;
    int year;

    Movie(String title, int year) {
        this.title = title;
        this.year = year;
    }

    // 默认实现返回「类名@哈希」没有业务价值，重写为可读的内容
    @Override
    public String toString() {
        return "电影：" + title + "（" + year + "年）";
    }
}

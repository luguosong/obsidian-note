package com.luguosong.oop;

/**
 * equals() 方法：Object 默认实现 return (this == obj) 比较内存地址，与 == 完全等价；
 * 重写后按内容（年月日）比较，业务上「内容相同的两个对象」才判相等。
 * 对应笔记：面向对象 → Object类 → equals方法
 */
public class EqualsDemo {

    public static void main(String[] args) {
        MyDate d1 = new MyDate(2008, 8, 8);
        MyDate d2 = new MyDate(2008, 8, 8);

        // == 比较内存地址：两个对象地址不同
        System.out.println(d1 == d2);       // false
        // 重写 equals 前，Object 默认实现就是 return (this == obj)，结果同样是 false
        // 重写 equals 后按内容比较：年月日都相同
        System.out.println(d1.equals(d2));  // true

        // 同一个对象，快速返回 true
        System.out.println(d1.equals(d1));  // true
        // 任意一个字段不同即不相等
        System.out.println(d1.equals(new MyDate(2008, 8, 9)));  // false
        // 参数为 null 直接不相等
        System.out.println(d1.equals(null));                    // false
        // 类型不同没有可比性（String 不是 MyDate）
        System.out.println(d1.equals("2008年8月8日"));           // false
    }
}

class MyDate {
    int year;
    int month;
    int day;

    MyDate(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    @Override
    public boolean equals(Object obj) {
        // d1.equals(d2)：this 就是 d1，obj 就是 d2
        if (obj == null) return false;         // 参数为 null，一定不相等
        if (this == obj) return true;          // 同一个对象，快速返回 true
        if (obj instanceof MyDate) {           // 类型不同没有可比性
            MyDate other = (MyDate) obj;       // 向下转型取出年月日
            return this.year == other.year
                    && this.month == other.month
                    && this.day == other.day;  // 逐字段比较内容
        }
        return false;
    }
}

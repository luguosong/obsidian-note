package com.luguosong.oop;

/**
 * this 的省略规则：无重名时编译器自动补 this.；形参与实例变量重名时必须显式写 this.。
 * 对应笔记：面向对象 → this关键字 → this的省略规则
 */
public class ThisOmissionDemo {

    public static void main(String[] args) {
        Book book = new Book();

        // 形参不重名：方法内省略 this. 也能访问到当前对象的实例变量
        book.setBookName("Java编程思想");
        System.out.println(book.name);  // Java编程思想

        // 形参重名：必须显式写 this.name 才能给成员变量赋值
        book.setName("Java核心技术");
        System.out.println(book.name);  // Java核心技术
    }
}

/**
 * 图书类
 */
class Book {

    String name;  // 书名

    // 形参 bookName 与实例变量不重名：裸写 name 自动等价于 this.name
    void setBookName(String bookName) {
        name = bookName;  // 编译器自动补成 this.name = bookName
    }

    // 形参 name 与实例变量重名：裸写的 name 是形参，必须 this.name 访问成员变量
    void setName(String name) {
        this.name = name;
    }
}

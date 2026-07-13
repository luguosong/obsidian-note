package com.luguosong.basicsyntax.identifier;

/**
 * 标识符命名规则：合法字符、Unicode 支持、禁止数字开头/关键字、区分大小写。
 * 对应笔记：[[基本语法]] → 标识符 → 命名规则和规范 → 命名规则
 */
public class NamingRule {

    public static void main(String[] args) {
        // 合法标识符只能包含：字母、数字、下划线、美元符
        int age = 1;
        int _count = 2;
        int $price = 3;

        // Java 支持 Unicode，"字母"可以是中文等任意文字
        int 年龄 = 18;
        String 姓名 = "张三";

        // 不能以数字开头（编译报错）
        // int 1name = 1;

        // 不能是关键字，如 public、class、void（编译报错）
        // int class = 1;

        // 区分大小写：Foo 与 foo 是两个不同的标识符
        int Foo = 1;
        int foo = 2;

        System.out.println("age=" + age + ", 年龄=" + 年龄 + ", Foo=" + Foo + ", foo=" + foo);
    }
}

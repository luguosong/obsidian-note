package com.luguosong.basicsyntax.pkg;

// import 位置：package 之下、class 定义之上；可以编写多个
import com.luguosong.basicsyntax.pkg.other.OtherPkgService;

// 静态导入：导入类的静态成员，调用时不用再写类名
import static java.lang.System.out;

/**
 * import 引入其他包的类：引入后用简单类名调用，不必再写完整类名。
 * java.lang 包（System、String 等）编译器自动引入，无需手动 import。
 * 对应笔记：Java基础语法 → 包（package）和import → import
 */
public class ImportDemo {

    public static void main(String[] args) {
        // 不同包的类，import 之后直接用类名调用
        OtherPkgService.delUser();

        // java.lang 自动引入：System 没写 import 也能直接用
        System.out.println("java.lang 自动引入：System.out.println");

        // 静态导入之后，连类名都可以省略
        out.println("静态导入：out.println");
    }
}

package com.luguosong.basicsyntax.pkg;

/**
 * 包对调用方式的影响：
 * - 同一个包的类：直接「类名.方法名」调用，不需要 import
 * - 不同包的类：不用 import 时，必须写完整类名（包名 + 类名）
 * 对应笔记：Java基础语法 → 包（package）和import → 包（package）
 */
public class PackageCallDemo {

    public static void main(String[] args) {
        // 同一个包：直接用类名调用
        SamePkgService.doSome();

        // 不同包：不 import 时必须写完整类名
        com.luguosong.basicsyntax.pkg.other.OtherPkgService.delUser();
    }
}

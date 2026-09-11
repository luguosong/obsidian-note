package com.luguosong.oop.subpackage;

import com.luguosong.oop.Vault;

/**
 * 访问控制权限（跨包场景）：SubVault 位于另一个包中 extends Vault——
 * protected 成员在子类中可以访问，缺省成员跨包不可见（子类也不行）。
 * 对应笔记：面向对象 → 访问控制权限 → protected 是只给子类用的吗？
 */
public class ProtectedAccessDemo {

    public static void main(String[] args) {
        SubVault sub = new SubVault();
        sub.showCash();  // 储备金：100000.0 / 户主：总行

        // System.out.println(sub.cash);  // 编译报错：main 所在的 ProtectedAccessDemo 与 Vault 既不同包也无继承关系——
        //                                 // protected 检查的是"谁在访问"（这段代码所在的类），而不是拿到了什么对象
    }
}

/**
 * 不同包的子类：继承 Vault
 */
class SubVault extends Vault {

    public void showCash() {
        // 不同包的子类中访问 protected 成员：合法——protected 专门为子类开放的通道
        System.out.println("储备金：" + cash);
        System.out.println("户主：" + owner);  // public：任何位置都可以访问

        // System.out.println(currency);  // 编译报错：缺省权限只在同一个包内有效——跨包连子类都不行

        // Vault v = new Vault();
        // System.out.println(v.cash);    // 编译报错：跨包子类中还必须通过子类类型的引用访问 protected 成员，
        //                                 // 父类引用可能指向别人家的对象，不在本子类的许可范围内
    }
}

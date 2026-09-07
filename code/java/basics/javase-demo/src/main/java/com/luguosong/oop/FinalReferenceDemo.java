package com.luguosong.oop;

/**
 * final 修饰引用：引用不能再指向其它对象，但指向的对象内部的数据可以修改。
 * 对应笔记：面向对象 → final关键字 → final修饰引用
 */
public class FinalReferenceDemo {

    public static void main(String[] args) {
        // final 修饰引用：wallet 永远只能指向 new 出来的这一个钱包对象
        final Wallet wallet = new Wallet(100.0);
        System.out.println("余额：" + wallet.balance);  // 余额：100.0

        // 对象内部的数据可以随意修改——final 管的是"指向"，不是"内容"
        wallet.balance = 250.0;
        System.out.println("充值后余额：" + wallet.balance);  // 充值后余额：250.0

        // wallet = new Wallet(500.0);  // 编译报错：无法为最终变量 wallet 分配值——不能重新指向新对象
    }
}

/**
 * 钱包类：钱包换不了（final 引用），但钱包里的钱可以变（对象内容）
 */
class Wallet {

    double balance;  // 余额：对象内部数据，不受 final 引用限制

    Wallet(double balance) {
        this.balance = balance;
    }
}

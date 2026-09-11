package com.luguosong.oop;

/**
 * 访问控制权限（同一个包的场景）：public / 缺省 / protected 成员在同包中都能直接访问，
 * private 成员只有本类能访问，外部通过本类的公开方法间接使用。
 * 对应笔记：面向对象 → 访问控制权限 → 四种访问权限修饰符
 */
public class AccessModifierDemo {

    public static void main(String[] args) {
        Bank bank = new Bank();

        // public：任何位置都可以访问
        System.out.println("银行：" + bank.bankName);  // 银行：中国银行

        // 缺省：同一个包中可以访问
        System.out.println("网点：" + bank.branch);  // 网点：高新区支行

        // protected：同一个包也在范围内（protected = 缺省范围 + 其它包的子类）
        bank.reserve += 500_000;
        System.out.println("储备金：" + bank.reserve);  // 储备金：1500000.0

        // System.out.println(bank.vaultPassword);  // 编译报错：private 修饰，只能在本类（Bank）中访问

        // private 成员的间接访问通道：调用 Bank 自己的公开方法，方法体运行在本类内部
        bank.openVault();  // 金库开启，密码校验通过：888888
    }
}

/**
 * 银行类：四种权限各修饰一个成员
 */
class Bank {

    private String vaultPassword = "888888";  // 金库密码：private，只有本类能访问

    String branch = "高新区支行";  // 网点：缺省，同一个包中可以访问

    protected double reserve = 1_000_000;  // 储备金：protected，同一个包 + 其它包的子类

    public String bankName = "中国银行";  // 银行名：public，任何位置

    // 本类内部访问 private 成员：合法——间接开放给外部的出口
    public void openVault() {
        System.out.println("金库开启，密码校验通过：" + vaultPassword);
    }
}

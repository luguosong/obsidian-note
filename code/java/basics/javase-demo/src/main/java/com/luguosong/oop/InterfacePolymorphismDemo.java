package com.luguosong.oop;

/**
 * 接口与多态演示：接口类型变量引用实现类对象，编译看左边（只能调接口声明的方法）、
 * 运行看右边（执行实现类的版本）。Cashier 面向 Payment 接口编程，
 * 新增支付渠道时收银台代码一行不改——对扩展开放（OCP）。
 * 对应笔记：面向对象 → 接口 → 接口与多态
 */
public class InterfacePolymorphismDemo {

    public static void main(String[] args) {
        Cashier cashier = new Cashier();
        cashier.checkout(new AlipayPayment(), 99.9);
        cashier.checkout(new WechatPayment(), 0.01);
        // 新增银联渠道后，Cashier 一行没改，传新实现类即可正常结账
        cashier.checkout(new UnionPayPayment(), 200);
        // 输出：
        // 开始结账
        // 支付宝支付：99.9 元
        // 开始结账
        // 微信支付：0.01 元
        // 开始结账
        // 银联支付：200.0 元
    }
}

/**
 * 支付规范：只规定「能支付」，怎么支付由实现类决定
 */
interface Payment {

    void pay(double amount);
}

class AlipayPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println("支付宝支付：" + amount + " 元");
    }
}

class WechatPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println("微信支付：" + amount + " 元");
    }
}

/**
 * 后来新增的实现类：只需要实现接口，调用方（Cashier）完全不用动
 */
class UnionPayPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println("银联支付：" + amount + " 元");
    }
}

/**
 * 收银台面向接口编程：只认识 Payment 接口，不关心具体渠道
 */
class Cashier {

    public void checkout(Payment payment, double amount) {
        System.out.println("开始结账");
        payment.pay(amount);  // 编译看左边绑定 Payment 的 pay()，运行看右边执行具体实现类
    }
}

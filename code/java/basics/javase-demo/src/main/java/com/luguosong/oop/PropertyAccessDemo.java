package com.luguosong.oop;

/**
 * 对象属性的访问与修改：对象名.属性名
 * 修改属性：对象名.属性名 = 值；读取属性：直接使用 对象名.属性名。
 * 对应笔记：面向对象 → 定义类 → 对象属性的访问与修改
 */
public class PropertyAccessDemo {

    public static void main(String[] args) {
        Product p = new Product();

        // 修改属性
        p.name = "华为手机";
        p.price = 4999.0;

        // 读取属性
        System.out.println(p.name + "：" + p.price + " 元");  // 华为手机：4999.0 元
    }
}

/**
 * 商品类：属性描述状态
 */
class Product {

    String name;   // 商品名
    double price;  // 价格
}

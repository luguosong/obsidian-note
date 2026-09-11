package com.luguosong.oop;

/**
 * 深克隆：在 super.clone() 浅副本的基础上，把引用类型字段（Address）也克隆一份换上，
 * 副本与原件彻底独立，修改副本不再影响原件。
 * 对应笔记：面向对象 → Object类 → clone方法 → 深克隆
 */
public class DeepCloneDemo {

    public static void main(String[] args) throws CloneNotSupportedException {
        Customer c1 = new Customer("李四", new Address("北京"));

        Customer c2 = (Customer) c1.clone();

        // 对象本身是新的
        System.out.println(c1 == c2);                 // false
        // 引用字段也是新的一份——与浅克隆的关键区别
        System.out.println(c1.address == c2.address); // false
        // 修改副本引用字段所指向的对象，原对象不受影响
        c2.address.city = "上海";
        System.out.println(c1.address.city);          // 北京：原件完好
        System.out.println(c2.address.city);          // 上海：只有副本被改
    }
}

class Customer implements Cloneable {
    String name;
    Address address;

    Customer(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    // 深克隆：先 super.clone() 拿到浅副本，再把引用字段替换为它自己的克隆
    @Override
    public Object clone() throws CloneNotSupportedException {
        Customer copy = (Customer) super.clone();
        copy.address = (Address) this.address.clone();
        return copy;
    }
}

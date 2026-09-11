package com.luguosong.oop;

/**
 * 浅克隆：super.clone() 只克隆一层——对象本身是新的，
 * 但引用类型字段（Address）与原件共享同一个对象，改副本的地址会把原件一起改掉。
 * 对应笔记：面向对象 → Object类 → clone方法 → 浅克隆
 */
public class ShallowCloneDemo {

    public static void main(String[] args) throws CloneNotSupportedException {
        Worker w1 = new Worker("张三", new Address("北京"));

        Worker w2 = (Worker) w1.clone();

        // 对象本身是新的
        System.out.println(w1 == w2);                 // false
        System.out.println(w2.name + " " + w2.address.city);  // 张三 北京：字段值已复制过来
        // 但引用字段还是同一份——只克隆了一层
        System.out.println(w1.address == w2.address); // true
        // 修改副本引用字段所指向的对象，原对象跟着变
        w2.address.city = "上海";
        System.out.println(w1.address.city);          // 上海：原件的地址被改了！
    }
}

class Worker implements Cloneable {
    String name;
    Address address;

    Worker(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    // 浅克隆：super.clone() 的默认行为就是只克隆一层
    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

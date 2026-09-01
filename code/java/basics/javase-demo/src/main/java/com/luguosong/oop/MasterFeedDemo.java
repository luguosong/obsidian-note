package com.luguosong.oop;

/**
 * 多态的作用：降低程序的耦合度，提高程序的扩展力。
 * 反面 Master：为每种宠物写一个专用重载，新增宠物就要修改 Master 类——违反开闭原则 OCP；
 * 正面 PolymorphicMaster：只面向抽象 Pet 编程，新增宠物子类无需修改任何原有代码。
 * 对应笔记：面向对象 → 多态 → 多态的作用
 */
public class MasterFeedDemo {

    public static void main(String[] args) {
        // 反面例子：Master 为每种宠物写一个专用重载
        Master zhangsan = new Master();
        zhangsan.feed(new Rabbit());
        zhangsan.feed(new Pig());
        // 将来要喂蛇，必须修改 Master 类、新增 feed(Snake) 方法 —— 扩展建立在修改原有代码之上

        System.out.println("------------------");

        // 正面例子：PolymorphicMaster 只依赖抽象 Pet
        PolymorphicMaster lisi = new PolymorphicMaster();
        lisi.feed(new Rabbit());
        lisi.feed(new Pig());
        // 将来新增任何 Pet 子类（如 Snake），PolymorphicMaster 一行代码都不用改
    }
}

/**
 * 反面例子：每新增一种宠物，就要修改 Master 类增加一个重载方法
 */
class Master {

    public void feed(Rabbit r) {
        r.eat();
    }

    public void feed(Pig p) {
        p.eat();
    }
}

/**
 * 正面例子：面向抽象（父类型）编程，只依赖 Pet 这个抽象
 */
class PolymorphicMaster {

    public void feed(Pet p) {
        // 编译阶段绑定 Pet 的 eat()，运行阶段动态绑定真实对象的 eat()
        p.eat();
    }
}

/**
 * 宠物（父类）
 */
class Pet {

    public void eat() {
        System.out.println("宠物在吃东西");
    }
}

/**
 * 兔子（子类）
 */
class Rabbit extends Pet {

    @Override
    public void eat() {
        System.out.println("兔子吃胡萝卜");
    }
}

/**
 * 猪（子类）
 */
class Pig extends Pet {

    @Override
    public void eat() {
        System.out.println("猪吃饲料");
    }
}

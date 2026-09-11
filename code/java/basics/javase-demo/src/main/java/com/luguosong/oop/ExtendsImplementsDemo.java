package com.luguosong.oop;

/**
 * 接口与抽象类如何选择：抽象类承载公共代码（是什么），接口承载可选能力（能做什么），
 * 二者用「extends 抽象类 + implements 多个接口」组合使用。
 * WildAnimal 抽象类：name/age 和 display() 是所有动物的公共代码，eat() 无法确定实现、延迟给子类；
 * CanFly/Speakable 接口：不是所有动物都会飞、会说话，只有需要的类才实现对应接口。
 * 对应笔记：面向对象 → 接口 → 接口与抽象类如何选择
 */
public class ExtendsImplementsDemo {

    public static void main(String[] args) {
        WildAnimal[] animals = {
                new Swallow("小燕子", 2),
                new Elephant("大象", 8),
                new Parrot("鹦鹉", 3)
        };
        for (WildAnimal animal : animals) {
            animal.display();  // 公共代码：直接复用抽象类里的实现
            animal.eat();      // 抽象方法：运行看右边，执行各子类的版本
            // 向下转型为接口类型：先 instanceof 判断，能飞的才飞、会说的才说
            if (animal instanceof CanFly) {
                ((CanFly) animal).fly();
            }
            if (animal instanceof Speakable) {
                ((Speakable) animal).speak();
            }
            System.out.println();
        }
        // 输出：
        // 我是小燕子，今年2岁
        // 燕子吃小虫
        // 燕子展翅高飞
        //
        // 我是大象，今年8岁
        // 大象吃香蕉
        //
        // 我是鹦鹉，今年3岁
        // 鹦鹉吃谷物
        // 鹦鹉扑棱棱地飞
        // 鹦鹉说：你好你好！
    }
}

/**
 * 抽象类：提取所有动物的公共代码（属性 + display()）；
 * eat() 每种动物吃法不同，无法在父类确定实现，声明为抽象方法延迟给子类
 */
abstract class WildAnimal {

    private final String name;
    private final int age;

    protected WildAnimal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    /**
     * 公共代码：所有子类直接继承复用，不用重写
     */
    public void display() {
        System.out.println("我是" + name + "，今年" + age + "岁");
    }

    /**
     * 不同的动物吃的方式不同，父类无法确定实现
     */
    public abstract void eat();
}

/**
 * 会飞的能力：接口负责功能扩展——不是所有动物都需要，需要的类才实现
 */
interface CanFly {

    void fly();
}

/**
 * 会说话的能力：整个例子里只有 Parrot 实现
 */
interface Speakable {

    void speak();
}

/**
 * 燕子：继承 WildAnimal 的同时实现 CanFly（会飞，但不会说话）
 */
class Swallow extends WildAnimal implements CanFly {

    public Swallow(String name, int age) {
        super(name, age);
    }

    @Override
    public void eat() {
        System.out.println("燕子吃小虫");
    }

    @Override
    public void fly() {
        System.out.println("燕子展翅高飞");
    }
}

/**
 * 大象：只继承 WildAnimal，不实现任何接口——不会飞也不会说话
 */
class Elephant extends WildAnimal {

    public Elephant(String name, int age) {
        super(name, age);
    }

    @Override
    public void eat() {
        System.out.println("大象吃香蕉");
    }
}

/**
 * 鹦鹉：继承 WildAnimal 的同时实现两个接口——既会飞又会说话
 */
class Parrot extends WildAnimal implements CanFly, Speakable {

    public Parrot(String name, int age) {
        super(name, age);
    }

    @Override
    public void eat() {
        System.out.println("鹦鹉吃谷物");
    }

    @Override
    public void fly() {
        System.out.println("鹦鹉扑棱棱地飞");
    }

    @Override
    public void speak() {
        System.out.println("鹦鹉说：你好你好！");
    }
}

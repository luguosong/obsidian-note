package com.luguosong.oop;

/**
 * 什么情况下必须用 super：裸写成员名编译器自动补 this.，解析到子类版本；
 * 父子出现同名成员、又需要父类那份时，super. 不能省略。
 * 对应笔记：面向对象 → super关键字 → 什么情况下必须用super
 */
public class SuperMemberDemo {

    public static void main(String[] args) {
        Guitar g = new Guitar();

        // 场景一：play() 已被子类重写——super.play() 在重写中调到父类的原版本
        g.play();
        // 输出：
        // Guitar: 调音
        // Instrument: 演奏音乐
        // Guitar: 拨动琴弦

        // 场景二：name 是子类隐藏父类的同名变量——super.name 读到父类那份
        g.info();
        // 输出：
        // 裸写 name：吉他（子类的）
        // this.name：吉他（子类的）
        // super.name：乐器（父类的）

        // this 是引用，可以直接输出；super 不是引用，System.out.println(super) 编译报错
        System.out.println(g);  // 输出类似：com.luguosong.oop.Guitar@b4c966a
    }
}

/**
 * 父类：实例变量 name + 实例方法 play()
 */
class Instrument {

    String name = "乐器";

    public void play() {
        System.out.println("Instrument: 演奏音乐");
    }
}

/**
 * 子类：同名实例变量（隐藏父类那份，两份并存）+ 重写 play()
 */
class Guitar extends Instrument {

    String name = "吉他";  // 变量隐藏：父子两份 name 同时存在

    @Override
    public void play() {
        System.out.println("Guitar: 调音");
        // 父子都有 play()，想在子类中执行父类的版本，必须写 super.
        super.play();
        System.out.println("Guitar: 拨动琴弦");
    }

    public void info() {
        System.out.println("裸写 name：" + name);        // 子类自己的 name
        System.out.println("this.name：" + this.name);    // 子类自己的 name
        System.out.println("super.name：" + super.name);  // 被隐藏的父类 name
    }
}

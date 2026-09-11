package com.luguosong.oop;

/**
 * 实例内部类：当作外部类的实例变量看——对象级别成员，必须先有外部类对象才能实例化；
 * 可以直接访问外部类的所有成员（实例成员 + 静态成员）。
 * 对应笔记：面向对象 → 内部类 → 实例内部类
 */
public class InstanceInnerClassDemo {

    public static void main(String[] args) {
        // 实例化：先 new 外部类对象，再用 外部类对象.new 内部类()
        // 心脏不能脱离具体的身体存在：先有身体，才有这颗心脏
        HumanBody.Heart heart = new HumanBody("李四").new Heart();
        heart.beat();

        // 用已创建的外部类对象来 new：heart2 寄生在 zhang 这个具体的身体上
        HumanBody zhang = new HumanBody("张三");
        HumanBody.Heart heart2 = zhang.new Heart();
        heart2.beat();
    }
}

/**
 * 人类（外部类）
 */
class HumanBody {

    // 实例变量
    private String name;

    // 静态变量
    private static int population = 80_000_000;

    public HumanBody(String name) {
        this.name = name;
    }

    // 实例内部类：不加 static，和实例变量一个级别
    class Heart {

        public void beat() {
            // 实例内部类持有外部类对象的引用，外部类所有成员都能直接访问（包括私有成员）
            System.out.println(name + "的心脏在跳动，搏出血液供给全身");  // ✅ 私有实例变量
            System.out.println("当前人口：" + population);                // ✅ 静态变量
        }
    }
}

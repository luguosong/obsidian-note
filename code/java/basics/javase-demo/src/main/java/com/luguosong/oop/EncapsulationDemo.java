package com.luguosong.oop;

/**
 * 封装的实现：第一步属性私有化（private），第二步对外提供 getter/setter 并在 setter 中拦截非法值。
 * 对应笔记：面向对象 → 封装性 → 封装的实现
 */
public class EncapsulationDemo {

    public static void main(String[] args) {
        Citizen c = new Citizen();

        // 读：通过公开的 getter 读取（默认值 0）
        System.out.println("年龄：" + c.getAge());  // 年龄：0

        // 改：非法值被 setter 中的拦截代码拒绝，属性保持原值
        c.setAge(-100);  // 对不起，您的年龄值不合法！
        System.out.println("年龄：" + c.getAge());  // 年龄：0

        // 改：合法值正常赋值
        c.setAge(50);
        System.out.println("年龄：" + c.getAge());  // 年龄：50
    }
}

/**
 * 公民类：使用封装机制保护 age 属性
 */
class Citizen {

    // 第一步：属性私有化——private 修饰，只有本类能访问
    private int age;  // 年龄

    // 第二步：getter 负责读——只读取不修改，天然安全
    public int getAge() {
        return age;  // 形参无重名，省略 this. 等价于 this.age
    }

    // 第二步：setter 负责改——赋值前拦截非法值
    public void setAge(int age) {
        if (age < 0 || age > 100) {
            System.out.println("对不起，您的年龄值不合法！");
            return;
        }
        // 形参 age 与实例变量重名：this. 不能省略（就近原则，裸 age 是形参）
        this.age = age;
    }
}

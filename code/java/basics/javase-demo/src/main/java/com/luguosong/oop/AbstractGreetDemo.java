package com.luguosong.oop;

/**
 * 抽象类与抽象方法：Human 的 greet() 在父类中无法确定实现（不同国家的人问候方式不同），
 * 定义为抽象方法强行交给子类实现；能确定的 name、introduce() 作为公共代码直接写在抽象父类中。
 * 抽象类无法实例化，但构造方法是给子孙用的——由子类构造方法 super(实参) 调用。
 * 对应笔记：面向对象 → 抽象类和抽象方法
 */
public class AbstractGreetDemo {

    public static void main(String[] args) {
        // Human h = new Human("张三");  // 编译报错：抽象类无法实例化

        // 面向抽象编程：父类型引用指向子类对象（多态），运行阶段执行各子类重写的 greet()
        Human[] people = {new French("皮埃尔"), new Japanese("田中")};
        for (Human p : people) {
            p.introduce();  // 公共代码：实现在抽象父类中，所有子类直接复用
            p.greet();      // 抽象方法：编译看左边绑定 Human 的 greet()，运行看右边执行子类的实现
        }
        // 输出：
        // 大家好，我是皮埃尔。
        // Bonjour!
        // 大家好，我是田中。
        // こんにちは!
    }
}

/**
 * 抽象父类：能确定的写成普通代码（成员变量、构造方法、introduce），
 * 无法确定实现的 greet() 声明为抽象方法——没有方法体，直接以分号结束
 */
abstract class Human {

    String name;

    public Human(String name) {
        // 抽象类自己的构造方法：不是给自己 new 用的（抽象类无法实例化），是给子类 super(实参) 用的
        this.name = name;
    }

    /**
     * 问候方式因国家而异，在父类中无法确定实现：声明为抽象方法，强行交给子类实现
     */
    public abstract void greet();

    /**
     * 公共代码：所有子类共同的部分直接实现在抽象父类中
     */
    public void introduce() {
        System.out.println("大家好，我是" + name + "。");
    }
}

/**
 * 非抽象子类：必须实现父类的抽象方法，否则编译报错
 */
class French extends Human {

    public French(String name) {
        super(name);  // 调用抽象父类的构造方法，完成父类部分成员的初始化
    }

    @Override
    public void greet() {
        System.out.println("Bonjour!");
    }
}

/**
 * 非抽象子类：必须实现父类的抽象方法，否则编译报错
 */
class Japanese extends Human {

    public Japanese(String name) {
        super(name);
    }

    @Override
    public void greet() {
        System.out.println("こんにちは!");
    }
}

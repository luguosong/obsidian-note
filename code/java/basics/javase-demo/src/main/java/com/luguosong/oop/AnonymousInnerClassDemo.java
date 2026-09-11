package com.luguosong.oop;

/**
 * 匿名内部类：特殊的局部内部类——没有名字，定义与实例化合二为一，只能使用一次。
 * 经典场景：事件处理中的监听器，一个实现只用一次，不值得单独定义类。
 * 对应笔记：面向对象 → 内部类 → 匿名内部类
 */
public class AnonymousInnerClassDemo {

    public static void main(String[] args) {
        Button button = new Button();

        // new ClickListener() 不是在实例化接口，而是"创建一个实现了 ClickListener 的匿名类的对象"
        // 类的定义（实现 onClick）与对象的创建一步完成，用完即弃
        button.setOnClickListener(new ClickListener() {
            @Override
            public void onClick() {
                System.out.println("按钮被点击了，执行一次性处理逻辑");
            }
        });

        // 模拟用户点击，触发监听器
        button.click();
    }
}

/**
 * 点击监听器接口
 */
interface ClickListener {
    void onClick();
}

/**
 * 按钮类：只面向 ClickListener 接口编程，不关心具体是谁实现了它
 */
class Button {

    private ClickListener listener;

    public void setOnClickListener(ClickListener listener) {
        this.listener = listener;
    }

    public void click() {
        if (listener != null) {
            listener.onClick();
        }
    }
}

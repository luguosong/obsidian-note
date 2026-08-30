package com.luguosong.oop;

/**
 * 静态方法：通过"类名."调用，不需要对象；方法中没有 this，无法直接访问实例成员。
 * 对应笔记：面向对象 → static关键字 → 静态方法
 */
public class StaticMethodDemo {

    public static void main(String[] args) {
        // 静态方法通过"类名."调用，不需要创建对象
        Player.showGameInfo();  // 当前游戏：王者荣耀

        // 实例方法必须先创建对象，再通过对象调用
        Player p = new Player();
        p.nickname = "小鲁班";
        p.showProfile();  // 玩家：小鲁班，游戏：王者荣耀

        // 语法上允许用"引用."调用静态方法，但运行时与对象无关，不建议这样写
        p.showGameInfo();  // 当前游戏：王者荣耀（和 p 这个对象没有任何关系）

        // 即使引用是 null，调用静态方法也不会出现空指针异常——运行时根本用不到对象
        Player nullRef = null;
        nullRef.showGameInfo();  // 当前游戏：王者荣耀（没有报空指针异常）
    }
}

/**
 * 游戏玩家类
 */
class Player {

    static String gameName = "王者荣耀";  // 游戏名（静态变量：所有玩家玩的是同一款游戏）

    String nickname;  // 昵称（实例变量：每个玩家各不相同）

    // 静态方法：类级别行为，没有 this
    static void showGameInfo() {
        // 静态方法中可以直接访问静态变量
        System.out.println("当前游戏：" + gameName);
        // System.out.println(nickname);  // 编译报错：静态方法中没有 this，无法直接访问实例变量
        // showProfile();                 // 编译报错：无法直接调用实例方法
    }

    // 实例方法：必须通过对象调用
    void showProfile() {
        // 实例方法中既可以访问实例变量，也可以直接访问静态变量
        System.out.println("玩家：" + nickname + "，游戏：" + gameName);
    }
}

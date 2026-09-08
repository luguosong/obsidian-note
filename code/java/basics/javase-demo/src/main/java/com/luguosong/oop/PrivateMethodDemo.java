package com.luguosong.oop;

/**
 * JDK9 接口私有方法演示：私有实例方法为多个默认方法提供公共代码，
 * 私有静态方法为多个静态方法提供公共代码——只在接口内部可见，不暴露给实现类。
 * 对应笔记：面向对象 → 接口 → JDK9 新特性：私有方法
 */
public class PrivateMethodDemo {

    public static void main(String[] args) {
        ProductLabel label = new ProductLabel();
        System.out.println(label.formatPrice(29.9));
        System.out.println(label.formatWeight(4.5));
        System.out.println(Formatter.title("商品标签"));
        System.out.println(Formatter.divider());
        // label.decorate("xx");  // 编译报错：私有方法只在接口内部可见，实现类无法调用
        // 输出：
        // 【29.9 元】
        // 【4.5 kg】
        // ==== 商品标签 ====
        // ========
    }
}

/**
 * 格式化接口：默认方法、静态方法中的公共代码下沉到私有方法
 */
interface Formatter {

    /**
     * 默认方法：两种格式化的公共装饰逻辑，下沉到私有实例方法
     */
    default String formatPrice(double price) {
        return decorate(price + " 元");
    }

    default String formatWeight(double weight) {
        return decorate(weight + " kg");
    }

    /**
     * JDK9 私有实例方法：为上面的默认方法服务
     */
    private String decorate(String text) {
        return "【" + text + "】";
    }

    /**
     * 静态方法：公共的分隔线逻辑，下沉到私有静态方法
     */
    static String title(String text) {
        return line(" " + text + " ");
    }

    static String divider() {
        return line("");
    }

    /**
     * JDK9 私有静态方法：为上面的静态方法服务
     */
    private static String line(String text) {
        return "====" + text + "====";
    }
}

/**
 * 实现类：本接口没有抽象方法，无需实现任何方法即可使用
 */
class ProductLabel implements Formatter {
}

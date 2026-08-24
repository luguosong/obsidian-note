package com.luguosong.basicsyntax.controlflow;

/**
 * switch 传统语法：break 跳出、case 穿透、case 合并、default 兜底。
 * JDK 12 起的箭头新语法见 SwitchArrowDemo。
 * 对应笔记：Java基础语法 → 控制语句 → switch语句
 */
public class SwitchDemo {

    public static void main(String[] args) {
        int day = 3;

        // ① 传统 switch：匹配到某个 case 后从那里开始执行，break 跳出整个 switch
        switch (day) {
            case 1:
                System.out.println("① 星期一");
                break;
            case 3:
                System.out.println("① 星期三");
                break;
            default: // 所有 case 都不匹配时执行
                System.out.println("① 其它");
        }

        // ② case 穿透：分支不写 break，会「击穿」继续执行后面的 case，直到遇到 break 或 switch 结束
        switch (day) {
            case 3:
                System.out.println("② 命中 3"); // 没有 break，继续向下穿透
            case 4:
                System.out.println("② 穿透到 4"); // day 为 3 也会打印这行
                break;
            default:
                System.out.println("② 其它");
        }

        // ③ case 合并：多个值共用一段逻辑，就把 case 堆叠在一起（本质是「有意的穿透」）
        switch (day) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                System.out.println("③ 工作日");
                break;
            case 6:
            case 7:
                System.out.println("③ 周末");
                break;
        }
    }
}

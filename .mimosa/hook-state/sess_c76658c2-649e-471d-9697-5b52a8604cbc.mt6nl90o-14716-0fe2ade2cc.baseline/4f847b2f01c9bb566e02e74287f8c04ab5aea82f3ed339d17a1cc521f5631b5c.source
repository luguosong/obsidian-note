package com.luguosong.basicsyntax.datatype;

/**
 * 整数的补码存储：Integer.toBinaryString 直接输出补码串。
 * 对应笔记：[[基本语法]] → 数据类型 → 原码反码补码 → 代码验证
 */
public class ComplementDemo {

    public static void toBin(int num) {
        // 输出 num 的补码（int 为 32 位，正数省略前导 0）
        System.out.println(num + " 的补码：" + Integer.toBinaryString(num));
    }

    public static void main(String[] args) {
        // 正数：补码 = 原码，省略前导 0
        toBin(6);     //  6 的补码：110
        toBin(1);     //  1 的补码：1

        // 负数：输出 32 位补码，高位全是 1
        toBin(-6);    // -6 的补码：11111111111111111111111111111010
        toBin(-1);    // -1 的补码：11111111111111111111111111111111（全 1 即 -1）

        // byte 看低 8 位：-6 的 8 位补码应为 11111010
        byte b = -6;
        // & 0xFF 截取低 8 位（避免 byte 提升为 int 时符号扩展），再补齐前导 0
        String s = Integer.toBinaryString(b & 0xFF);
        System.out.println("-6 的 8 位补码：" + String.format("%8s", s).replace(' ', '0'));
        // 输出：-6 的 8 位补码：11111010
    }
}

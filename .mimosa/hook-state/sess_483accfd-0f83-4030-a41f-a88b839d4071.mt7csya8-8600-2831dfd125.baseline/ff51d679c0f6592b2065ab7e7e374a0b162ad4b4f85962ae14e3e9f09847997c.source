package com.luguosong.basicsyntax.operator;

/**
 * 按位运算符：按位异或 ^。两数二进制逐位异或，对应位不同为 1、相同为 0。
 * 关键特性：自反性 a ^ b ^ b == a，可用于简单加解密。
 * 对应笔记：Java基础语法 → 运算符 → 按位运算符 → 按位异或
 */
public class BitwiseXorDemo {

    public static void main(String[] args) {
        // 逐位异或：不同为 1，相同为 0
        int a = 100; // 01100100
        int b = 200; // 11001000
        System.out.println(a ^ b);       // 172 —— 10101100

        // 自反性：对同一个数异或两次，还原原值（a ^ b ^ b == a）
        System.out.println(a ^ b ^ b);   // 100

        // 应用：用异或做简单加解密（密钥 key）
        int data = 1234;
        int key = 5678;
        int encrypted = data ^ key;      // 加密
        int decrypted = encrypted ^ key; // 再异或同一密钥 → 解密
        System.out.println(encrypted);   // 密文
        System.out.println(decrypted);   // 1234（还原）
    }
}

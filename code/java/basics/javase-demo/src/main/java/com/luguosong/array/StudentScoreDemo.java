package com.luguosong.array;

/**
 * 练一练：获取 10 个学生成绩保存到数组中，遍历数组求总分与平均分。
 * 对应笔记：数组 → 一维数组 → 如何遍历数组？ → 练一练：学生成绩统计
 */
public class StudentScoreDemo {

    public static void main(String[] args) {
        // 10 个学生成绩保存在数组中（此处直接给定成绩，聚焦遍历与统计本身）
        int[] scores = {85, 92, 78, 95, 66, 88, 73, 90, 81, 59};

        // 遍历数组获得学生成绩，同时累加求总分
        int sum = 0;
        for (int score : scores) {
            System.out.println("学生成绩 = " + score);  // 学生成绩 = 85（依次输出全部 10 个成绩）
            sum += score;
        }

        // 总分与平均分
        System.out.println("总分 = " + sum);  // 总分 = 807
        System.out.println("平均分 = " + sum / (double) scores.length);  // 平均分 = 80.7
    }
}

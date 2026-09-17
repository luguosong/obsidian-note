package com.luguosong.array;

/**
 * 二维数组元素的访问与修改：arr[i][j] 分两步理解（arr[i] 取出行，[j] 取行内元素），
 * 以及修改单个元素与整行替换。
 * 对应笔记：数组 → 二维数组 → 如何访问和修改二维数组的元素？
 */
public class TwoDimArrayAccessDemo {

    public static void main(String[] args) {
        int[][] arr = {{55, 67, 22}, {99, 41}};

        // arr[0][0] 的两步分解：arr[0] 取出第 0 行（一维数组），再 [0] 取该行元素
        int[] firstRow = arr[0];
        int first = firstRow[0];
        System.out.println("第一个一维数组的第一个元素：" + first);  // 55

        // 合并两步，直接写 arr[行下标][列下标]
        System.out.println("arr[0][0] = " + arr[0][0]);  // 55

        // 边界元素：两层下标各用各的 length
        int lastRow = arr.length - 1;                     // 最后一行下标
        int last = arr[lastRow][arr[lastRow].length - 1]; // 该行的最后一个元素
        System.out.println("最后一个一维数组的最后一个元素：" + last);  // 41

        // 修改单个元素：直接给 arr[行下标][列下标] 赋值
        arr[0][1] = 88;
        System.out.println("修改后 arr[0][1] = " + arr[0][1]);  // 88

        // 整行替换：arr[1] 是一维数组的引用，让它重新指向一个新数组即可
        arr[1] = new int[]{7, 7, 7};
        System.out.println("整行替换后 arr[1].length = " + arr[1].length);  // 3
    }
}

package com.luguosong.basicsyntax.pkg;

/**
 * 与 PackageCallDemo 同一个包的工具类：直接用类名调用，无需 import。
 */
public class SamePkgService {

    public static void doSome() {
        System.out.println("同一个包：SamePkgService.doSome() 被调用");
    }
}

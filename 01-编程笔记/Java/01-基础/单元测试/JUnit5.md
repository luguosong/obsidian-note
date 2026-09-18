---
描述: JUnit5 单元测试入门：测试类与测试方法的写法、期望值与实际值、常见注解、Scanner 失效的解决办法
排序:
分组:
分类: "[[单元测试]]"
创建时间: 2026年09月18日
---
# JUnit5

## 什么是单元测试，为什么要进行单元测试？

一个项目是巨大的，只有保证你写的每一块都是正确的，最后整个项目才能正常运行。

> [!note] 定义
> 项目中可以单独验证正确性的「每一块」就是一个 `单元`，对单元进行的测试就是 `单元测试`。

做单元测试需要引入 **JUnit 框架**——它不在 JDK 中，需要额外引入它的 class 文件（jar 包）：

- `junit-jupiter-api-5.8.0.jar`
- `junit-platform-commons-1.9.2.jar`
- `junit-platform-engine-1.9.2.jar`

## 单元测试类（测试用例）怎么写？

单元测试类名建议写成 **XxxTest**。

## 单元测试方法怎么写？

```java
public class CalculatorTest {

    // 单元测试方法：用 @Test 注解标注；返回值类型必须是 void；形参个数为 0；方法名建议 testXxx
    @Test
    public void testAdd() {
        // 编写测试逻辑
    }
}
```

## 什么是期望值，什么是实际值？

- **期望值**：程序执行之前，你觉得正确的输出结果应该是多少
- **实际值**：程序实际运行之后得到的结果

## 常见注解

| 注解 | 作用 | 方法要求 |
| --- | --- | --- |
| `@BeforeAll` | 在测试开始之前执行必要的代码 | 必须是静态方法 |
| `@AfterAll` | 在测试结束之后执行必要的代码 | 必须是静态方法 |
| `@BeforeEach` | 在每个测试方法执行前执行必要的代码 | — |
| `@AfterEach` | 在每个测试方法执行后执行必要的代码 | — |

## 单元测试中使用 Scanner 失效怎么办？

1. 选中导航栏的 `Help`，再选中 `Edit Custom VM Options...`
2. 在 `IDEA64.exe.vmoptions` 文件中添加 `-Deditable.java.test.console=true`
3. 重启 IDEA 即可解决

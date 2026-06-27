---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Operators (The Java™ Tutorials > Learning the Java Language >
            Language Basics)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/QandE/answers_operators.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: Operators (The Java™ Tutorials > Learning the Java Language >
            Language Basics)

Documentation

[[语言基础-questions_operators|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/java/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Operators

## Answers to Questions

1. Consider the following code snippet:
```text
	arrayOfInts[j] > arrayOfInts[j+1]
```
	**Question:** What operators does the code contain?  
	**Answer:** `>`, `+`
2. Consider the following code snippet:
```text
	int i = 10;
	int n = i++%5;
```
	1. **Question:** What are the values of `i` and `n` after the code is executed?  
		**Answer:** `i` is 11, and `n` is 0.
		2. **Question:** What are the final values of `i` and `n` if instead of using the postfix increment operator (`i++`), you use the prefix version (`++i)`)?  
		**Answer:** `i` is 11, and `n` is 1.
3. **Question:** To invert the value of a `boolean`, which operator would you use?  
	**Answer:** The logical complement operator "!".
4. **Question**: Which operator is used to compare two values, `=` or `==`?  
	**Answer:** The `==` operator is used for comparison, and `=` is used for assignment.
5. **Question:** Explain the following code sample: `result = someCondition ? value1 : value2;`  
	**Answer:** This code should be read as: "If `someCondition` is `true`, assign the value of `value1` to `result`. Otherwise, assign the value of `value2` to `result`."

## Exercises

1. Change the following program to use compound assignments:
	```java
	class ArithmeticDemo {
	    public static void main (String[] args){
	          
	        int result = 1 + 2; // result is now 3
	        System.out.println(result);
	        result = result - 1; // result is now 2
	        System.out.println(result);
	        result = result * 2; // result is now 4
	        System.out.println(result);
	        result = result / 2; // result is now 2
	        System.out.println(result);
	        result = result + 8; // result is now 10
	        result = result % 7; // result is now 3
	        System.out.println(result);
	    }
	}
```java
	Here is one solution:
	```java
	class ArithmeticDemo {
	    public static void main (String[] args){
	        int result = 3;
	        System.out.println(result);
	        result -= 1; // result is now 2
	        System.out.println(result);
	        result *= 2; // result is now 4
	        System.out.println(result);
	        result /= 2; // result is now 2
	        System.out.println(result);
	        result += 8; // result is now 10
	        result %= 7; // result is now 3
	        System.out.println(result);
	    }
	}
```
2. In the following program, explain why the value "6" is printed twice in a row:
	```java
	class PrePostDemo {
	    public static void main(String[] args){
	        int i = 3;
	        i++;
	        System.out.println(i);    // "4"
	        ++i;                     
	        System.out.println(i);    // "5"
	        System.out.println(++i);  // "6"
	        System.out.println(i++);  // "6"
	        System.out.println(i);    // "7"
	    }
	}
	```
	The code `System.out.println(++i);` evaluates to 6, because the prefix version of `++` evaluates to the incremented value. The next line, `System.out.println(i++);` evaluates to the current value (6), then increments by one. So "7" doesn't get printed until the next line.
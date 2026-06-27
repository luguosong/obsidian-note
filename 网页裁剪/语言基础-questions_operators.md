---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Operators (The Java™ Tutorials >        
            Learning the Java Language > Language Basics)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/QandE/questions_operators.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[语言基础-opsummary|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[语言基础-expressions|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Operators

## Questions

1. Consider the following code snippet.
	```
	arrayOfInts[j] > arrayOfInts[j+1]
	```
	Which operators does the code contain?
2. Consider the following code snippet.
	```
	int i = 10;
	int n = i++%5;
	```
	1. What are the values of `i` and `n` after the code is executed?
		2. What are the final values of `i` and `n` if instead of using the postfix increment operator (`i++`), you use the prefix version (`++i)`)?
3. To invert the value of a `boolean`, which operator would you use?
4. Which operator is used to compare two values, `=` or `==`?
5. Explain the following code sample: `result = someCondition ? value1 : value2;`

## Exercises

1. Change the following program to use compound assignments:
	```
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
	```
2. In the following program, explain why the value "6" is printed twice in a row:
	```
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

[[语言基础-answers_operators|Check your answers]]
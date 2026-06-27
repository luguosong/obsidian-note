---
分类:
  - "网页裁剪"
标题: "Passing Information to a Method or a Constructor (The Java™ Tutorials >        
            Learning the Java Language > Classes and Objects)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Passing Information to a Method or a Constructor (The Java™ Tutorials >        
            Learning the Java Language > Classes and Objects)

Documentation

[[类与对象-classes|Classes]]

[[类与对象-classdecl|Declaring Classes]]

[[类与对象-variables|Declaring Member Variables]]

[[类与对象-方法|Defining Methods]]

[[类与对象-constructors|Providing Constructors for Your Classes]]

Passing Information to a Method or a Constructor

[[类与对象-objects|Objects]]

[[类与对象-objectcreation|Creating Objects]]

[[类与对象-usingobject|Using Objects]]

[[类与对象-more|More on Classes]]

[[类与对象-returnvalue|Returning a Value from a Method]]

[[类与对象-thiskey|Using the this Keyword]]

[[类与对象-accesscontrol|Controlling Access to Members of a Class]]

[[类与对象-类成员|Understanding Class Members]]

[[类与对象-initial|Initializing Fields]]

[[类与对象-summaryclasses|Summary of Creating and Using Classes and Objects]]

[[类与对象-创建类练习|Questions and Exercises]]

[[类与对象-objects-questions|Questions and Exercises]]

[[类与对象-嵌套类|Nested Classes]]

[[类与对象-innerclasses|Inner Class Example]]

[[类与对象-局部类|Local Classes]]

[[类与对象-匿名类|Anonymous Classes]]

[[类与对象-Lambda表达式|Lambda Expressions]]

[[类与对象-方法引用|Method References]]

[[类与对象-whentouse|When to Use Nested Classes, Local Classes, Anonymous Classes, and Lambda Expressions]]

[[类与对象-nested-questions|Questions and Exercises]]

[[类与对象-enum|Enum Types]]

[[类与对象-enum-questions|Questions and Exercises]]

[[类与对象-constructors|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[类与对象-objects|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Passing Information to a Method or a Constructor

The declaration for a method or a constructor declares the number and the type of the arguments for that method or constructor. For example, the following is a method that computes the monthly payments for a home loan, based on the amount of the loan, the interest rate, the length of the loan (the number of periods), and the future value of the loan:

```java
public double computePayment(
                  double loanAmt,
                  double rate,
                  double futureValue,
                  int numPeriods) {
    double interest = rate / 100.0;
    double partial1 = Math.pow((1 + interest), 
                    - numPeriods);
    double denominator = (1 - partial1) / interest;
    double answer = (-loanAmt / denominator)
                    - ((futureValue * partial1) / denominator);
    return answer;
}
```

This method has four parameters: the loan amount, the interest rate, the future value and the number of periods. The first three are double-precision floating point numbers, and the fourth is an integer. The parameters are used in the method body and at runtime will take on the values of the arguments that are passed in.

---

**Note:** *Parameters* refers to the list of variables in a method declaration. *Arguments* are the actual values that are passed in when the method is invoked. When you invoke a method, the arguments used must match the declaration's parameters in type and order.

---

## Parameter Types

You can use any data type for a parameter of a method or a constructor. This includes primitive data types, such as doubles, floats, and integers, as you saw in the `computePayment` method, and reference data types, such as objects and arrays.

Here's an example of a method that accepts an array as an argument. In this example, the method creates a new `Polygon` object and initializes it from an array of `Point` objects (assume that `Point` is a class that represents an x, y coordinate):

```java
public Polygon polygonFrom(Point[] corners) {
    // method body goes here
}
```

---

**Note:** If you want to pass a method into a method, then use a [[类与对象-Lambda表达式|lambda expression]] or a [[类与对象-方法引用|method reference]].

---

## Arbitrary Number of Arguments

You can use a construct called *varargs* to pass an arbitrary number of values to a method. You use varargs when you don't know how many of a particular type of argument will be passed to the method. It's a shortcut to creating an array manually (the previous method could have used varargs rather than an array).

To use varargs, you follow the type of the last parameter by an ellipsis (three dots,...), then a space, and the parameter name. The method can then be called with any number of that parameter, including none.

```java
public Polygon polygonFrom(Point... corners) {
    int numberOfSides = corners.length;
    double squareOfSide1, lengthOfSide1;
    squareOfSide1 = (corners[1].x - corners[0].x)
                     * (corners[1].x - corners[0].x) 
                     + (corners[1].y - corners[0].y)
                     * (corners[1].y - corners[0].y);
    lengthOfSide1 = Math.sqrt(squareOfSide1);

    // more method body code follows that creates and returns a 
    // polygon connecting the Points
}
```

You can see that, inside the method, `corners` is treated like an array. The method can be called either with an array or with a sequence of arguments. The code in the method body will treat the parameter as an array in either case.

You will most commonly see varargs with the printing methods; for example, this `printf` method:

```java
public PrintStream printf(String format, Object... args)
```

allows you to print an arbitrary number of objects. It can be called like this:

```java
System.out.printf("%s: %d, %s%n", name, idnum, address);
```text

or like this

```java
System.out.printf("%s: %d, %s, %s, %s%n", name, idnum, address, phone, email);
```

or with yet a different number of arguments.

## Parameter Names

When you declare a parameter to a method or a constructor, you provide a name for that parameter. This name is used within the method body to refer to the passed-in argument.

The name of a parameter must be unique in its scope. It cannot be the same as the name of another parameter for the same method or constructor, and it cannot be the name of a local variable within the method or constructor.

A parameter can have the same name as one of the class's fields. If this is the case, the parameter is said to *shadow* the field. Shadowing fields can make your code difficult to read and is conventionally used only within constructors and methods that set a particular field. For example, consider the following `Circle` class and its `setOrigin` method:

```java
public class Circle {
    private int x, y, radius;
    public void setOrigin(int x, int y) {
        ...
    }
}
```java

The `Circle` class has three fields: `x`, `y`, and `radius`. The `setOrigin` method has two parameters, each of which has the same name as one of the fields. Each method parameter shadows the field that shares its name. So using the simple names `x` or `y` within the body of the method refers to the parameter, *not* to the field. To access the field, you must use a qualified name. This will be discussed later in this lesson in the section titled "Using the `this` Keyword."

## Passing Primitive Data Type Arguments

Primitive arguments, such as an `int` or a `double`, are passed into methods *by value*. This means that any changes to the values of the parameters exist only within the scope of the method. When the method returns, the parameters are gone and any changes to them are lost. Here is an example:

```java
public class PassPrimitiveByValue {

    public static void main(String[] args) {
           
        int x = 3;
           
        // invoke passMethod() with 
        // x as argument
        passMethod(x);
           
        // print x to see if its 
        // value has changed
        System.out.println("After invoking passMethod, x = " + x);
           
    }
        
    // change parameter in passMethod()
    public static void passMethod(int p) {
        p = 10;
    }
}
```

When you run this program, the output is:

```text
After invoking passMethod, x = 3
```

## Passing Reference Data Type Arguments

Reference data type parameters, such as objects, are also passed into methods *by value*. This means that when the method returns, the passed-in reference still references the same object as before. *However*, the values of the object's fields *can* be changed in the method, if they have the proper access level.

For example, consider a method in an arbitrary class that moves `Circle` objects:

```java
public void moveCircle(Circle circle, int deltaX, int deltaY) {
    // code to move origin of circle to x+deltaX, y+deltaY
    circle.setX(circle.getX() + deltaX);
    circle.setY(circle.getY() + deltaY);
        
    // code to assign a new reference to circle
    circle = new Circle(0, 0);
}
```text

Let the method be invoked with these arguments:

```text
moveCircle(myCircle, 23, 56)
```

Inside the method, `circle` initially refers to `myCircle`. The method changes the x and y coordinates of the object that `circle` references (that is, `myCircle`) by 23 and 56, respectively. These changes will persist when the method returns. Then `circle` is assigned a reference to a new `Circle` object with `x = y = 0`. This reassignment has no permanence, however, because the reference was passed in by value and cannot change. Within the method, the object pointed to by `circle` has changed, but, when the method returns, `myCircle` still references the same `Circle` object as before the method was called.
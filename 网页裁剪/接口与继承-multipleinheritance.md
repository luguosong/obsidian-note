---
分类:
  - "网页裁剪"
标题: "Multiple Inheritance of State, Implementation, and Type (The Java™ Tutorials >        
            Learning the Java Language > Interfaces and Inheritance)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/IandI/multipleinheritance.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[接口与继承-创建接口|Interfaces]]

[[接口与继承-interfaceDef|Defining an Interface]]

[[接口与继承-usinginterface|Implementing an Interface]]

[[接口与继承-interfaceAsType|Using an Interface as a Type]]

[[接口与继承-nogrow|Evolving Interfaces]]

[[接口与继承-默认方法|Default Methods]]

[[接口与继承-summary-interface|Summary of Interfaces]]

[[接口与继承-interfaces-questions|Questions and Exercises]]

[[接口与继承-subclasses|Inheritance]]

Multiple Inheritance of State, Implementation, and Type

[[接口与继承-override|Overriding and Hiding Methods]]

[[接口与继承-polymorphism|Polymorphism]]

[[接口与继承-hidevariables|Hiding Fields]]

[[接口与继承-super|Using the Keyword super]]

[[接口与继承-objectclass|Object as a Superclass]]

[[接口与继承-final|Writing Final Classes and Methods]]

[[接口与继承-抽象方法|Abstract Methods and Classes]]

[[接口与继承-summaryinherit|Summary of Inheritance]]

[[接口与继承-inherit-questions|Questions and Exercises]]

[[接口与继承-subclasses|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[接口与继承-override|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Multiple Inheritance of State, Implementation, and Type

One significant difference between classes and interfaces is that classes can have fields whereas interfaces cannot. In addition, you can instantiate a class to create an object, which you cannot do with interfaces. As explained in the section [[面向对象概念-object|What Is an Object?]], an object stores its state in fields, which are defined in classes. One reason why the Java programming language does not permit you to extend more than one class is to avoid the issues of *multiple inheritance of state*, which is the ability to inherit fields from multiple classes. For example, suppose that you are able to define a new class that extends multiple classes. When you create an object by instantiating that class, that object will inherit fields from all of the class's superclasses. What if methods or constructors from different superclasses instantiate the same field? Which method or constructor will take precedence? Because interfaces do not contain fields, you do not have to worry about problems that result from multiple inheritance of state.

*Multiple inheritance of implementation* is the ability to inherit method definitions from multiple classes. Problems arise with this type of multiple inheritance, such as name conflicts and ambiguity. When compilers of programming languages that support this type of multiple inheritance encounter superclasses that contain methods with the same name, they sometimes cannot determine which member or method to access or invoke. In addition, a programmer can unwittingly introduce a name conflict by adding a new method to a superclass. [[接口与继承-默认方法|Default methods]] introduce one form of multiple inheritance of implementation. A class can implement more than one interface, which can contain default methods that have the same name. The Java compiler provides some rules to determine which default method a particular class uses.

The Java programming language supports *multiple inheritance of type*, which is the ability of a class to implement more than one interface. An object can have multiple types: the type of its own class and the types of all the interfaces that the class implements. This means that if a variable is declared to be the type of an interface, then its value can reference any object that is instantiated from any class that implements the interface. This is discussed in the section [[接口与继承-interfaceAsType|Using an Interface as a Type]].

As with multiple inheritance of implementation, a class can inherit different implementations of a method defined (as default or static) in the interfaces that it extends. In this case, the compiler or the user must decide which one to use.
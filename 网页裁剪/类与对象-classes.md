Documentation

Classes

[Declaring Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/classdecl.html)

[Declaring Member Variables](https://docs.oracle.com/javase/tutorial/java/javaOO/variables.html)

[Defining Methods](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html)

[Providing Constructors for Your Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html)

[Passing Information to a Method or a Constructor](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html)

[Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/objects.html)

[Creating Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/objectcreation.html)

[Using Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/usingobject.html)

[More on Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/more.html)

[Returning a Value from a Method](https://docs.oracle.com/javase/tutorial/java/javaOO/returnvalue.html)

[Using the this Keyword](https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html)

[Controlling Access to Members of a Class](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)

[Understanding Class Members](https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html)

[Initializing Fields](https://docs.oracle.com/javase/tutorial/java/javaOO/initial.html)

[Summary of Creating and Using Classes and Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/summaryclasses.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/creating-questions.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/objects-questions.html)

[Nested Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html)

[Inner Class Example](https://docs.oracle.com/javase/tutorial/java/javaOO/innerclasses.html)

[Local Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/localclasses.html)

[Anonymous Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html)

[Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)

[Method References](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html)

[When to Use Nested Classes, Local Classes, Anonymous Classes, and Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/whentouse.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/nested-questions.html)

[Enum Types](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/enum-questions.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Classes

The introduction to object-oriented concepts in the lesson titled [Object-oriented Programming Concepts](https://docs.oracle.com/javase/tutorial/java/concepts/index.html) used a bicycle class as an example, with racing bikes, mountain bikes, and tandem bikes as subclasses. Here is sample code for a possible implementation of a `Bicycle` class, to give you an overview of a class declaration. Subsequent sections of this lesson will back up and explain class declarations step by step. For the moment, don't concern yourself with the details.

```
public class Bicycle {
        
    // the Bicycle class has
    // three fields
    public int cadence;
    public int gear;
    public int speed;
        
    // the Bicycle class has
    // one constructor
    public Bicycle(int startCadence, int startSpeed, int startGear) {
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;
    }
        
    // the Bicycle class has
    // four methods
    public void setCadence(int newValue) {
        cadence = newValue;
    }
        
    public void setGear(int newValue) {
        gear = newValue;
    }
        
    public void applyBrake(int decrement) {
        speed -= decrement;
    }
        
    public void speedUp(int increment) {
        speed += increment;
    }
        
}
```

A class declaration for a `MountainBike` class that is a subclass of `Bicycle` might look like this:

```
public class MountainBike extends Bicycle {
        
    // the MountainBike subclass has
    // one field
    public int seatHeight;

    // the MountainBike subclass has
    // one constructor
    public MountainBike(int startHeight, int startCadence,
                        int startSpeed, int startGear) {
        super(startCadence, startSpeed, startGear);
        seatHeight = startHeight;
    }   
        
    // the MountainBike subclass has
    // one method
    public void setHeight(int newValue) {
        seatHeight = newValue;
    }   

}
```

`MountainBike` inherits all the fields and methods of `Bicycle` and adds the field `seatHeight` and a method to set it (mountain bikes have seats that can be moved up and down as the terrain demands).
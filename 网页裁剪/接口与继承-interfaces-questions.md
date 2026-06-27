Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/java/IandI/summary-interface.html) • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Interfaces

## Questions

1. What methods would a class that implements the `java.lang.CharSequence` interface have to implement?
2. What is wrong with the following interface?
	```
	public interface SomethingIsWrong {
	    void aMethod(int aValue){
	        System.out.println("Hi Mom");
	    }
	}
	```
3. Fix the interface in question 2.
4. Is the following interface valid?
	```
	public interface Marker {
	}
	```

## Exercises

1. Write a class that implements the `CharSequence` interface found in the `java.lang` package. Your implementation should return the string backwards. Select one of the sentences from this book to use as the data. Write a small `main` method to test your class; make sure to call all four methods.
2. Suppose you have written a time server that periodically notifies its clients of the current date and time. Write an interface the server could use to enforce a particular protocol on its clients.

[Check your answers.](https://docs.oracle.com/javase/tutorial/java/IandI/QandE/interfaces-answers.html)
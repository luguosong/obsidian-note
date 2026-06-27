---
分类:
  - "网页裁剪"
标题: "MXBeans (The Java™ Tutorials >        
            Java Management Extensions (JMX) > Introducing MBeans)"
描述: "This JMX Java tutorial describes the Java Management Extensions (JMX) technology - mbeans, notifications, and remote management"
来源: "https://docs.oracle.com/javase/tutorial/jmx/mbeans/mxbeans.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JMX-MBeans-标准MBeans|Standard MBeans]]

MXBeans

[[JMX-MBeans-标准MBeans|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jmx/TOC.html) • [[JMX-通知|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## MXBeans

This section explains a special type of MBean, called *MXBeans*.

An *MXBean* is a type of MBean that references only a predefined set of data types. In this way, you can be sure that your MBean will be usable by any client, including remote clients, without any requirement that the client have access to model-specific classes representing the types of your MBeans. MXBeans provide a convenient way to bundle related values together, without requiring clients to be specially configured to handle the bundles.

In the same way as for standard MBeans, an MXBean is defined by writing a Java interface called `SomethingMXBean` and a Java class that implements that interface. However, unlike standard MBeans, MXBeans do not require the Java class to be called `Something`. Every method in the interface defines either an attribute or an operation in the MXBean. The annotation `@MXBean` can be also used to annotate the Java interface, instead of requiring the interface's name to be followed by the MXBean suffix.

MXBeans existed in the Java 2 Platform, Standard Edition (J2SE) 5.0 software, in the package [`java.lang.management`](https://docs.oracle.com/javase/8/docs/api/java/lang/management/package-summary.html). However, users can now define their own MXBeans, in addition to the standard set that is defined in `java.lang.management`.

The main idea behind MXBeans is that types such as [`java.lang.management.MemoryUsage`](https://docs.oracle.com/javase/8/docs/api/java/lang/management/MemoryUsage.html) that are referenced in the MXBean interface, [`java.lang.management.MemoryMXBean`](https://docs.oracle.com/javase/8/docs/api/java/lang/management/MemoryMXBean.html) in this case, are mapped into a standard set of types, the so-called *Open Types* that are defined in the package [`javax.management.openmbean`](https://docs.oracle.com/javase/8/docs/api/javax/management/openmbean/package-summary.html). The exact mapping rules appear in the MXBean specification. However, the general principle is for simple types such as int or String to remain unchanged, while complex types such as `MemoryUsage` get mapped to the standard type [`CompositeDataSupport`](https://docs.oracle.com/javase/8/docs/api/javax/management/openmbean/CompositeDataSupport.html).

The MXBean example consists of the following files, which are found in [`jmx_examples.zip`](https://docs.oracle.com/javase/tutorial/jmx/examples/jmx_examples.zip):

- `QueueSamplerMXBean` interface
- `QueueSampler` class that implements the MXBean interface
- `QueueSample` Java type returned by the `getQueueSample()` method in the MXBean interface
- `Main`, the program that sets up and runs the example

The MXBean example uses these classes to perform the following actions:

- Defines a simple MXBean that manages a resource of type `Queue<String>`
- Declares a getter, `getQueueSample`, in the MXBean that takes a snapshot of the queue when invoked and returns a Java class `QueueSample` that bundles the following values together:
	- The time the snapshot was taken
		- The queue size
		- The head of the queue at that given time
- Registers the MXBean in an MBean server

## MXBean Interface

The following code shows the example [`QueueSamplerMXBean`](https://docs.oracle.com/javase/tutorial/jmx/examples/QueueSamplerMXBean.java) MXBean interface:

```java
package com.example; 
 
public interface QueueSamplerMXBean { 
    public QueueSample getQueueSample(); 
    public void clearQueue(); 
}
```

Note that you declare an MXBean interface in exactly the same way as you declare a standard MBean interface. The `QueueSamplerMXBean` interface declares a getter, `getQueueSample` and an operation, `clearQueue`.

## Defining MXBean Operations

The MXBean operations are declared in the [`QueueSampler`](https://docs.oracle.com/javase/tutorial/jmx/examples/QueueSampler.java) example class, as follows:

```java
package com.example; 
 
import java.util.Date; 
import java.util.Queue; 
 
public class QueueSampler 
                implements QueueSamplerMXBean { 
     
    private Queue<String> queue; 
         
    public QueueSampler (Queue<String> queue) { 
        this.queue = queue; 
    } 
         
    public QueueSample getQueueSample() { 
        synchronized (queue) { 
            return new QueueSample(new Date(), 
                           queue.size(), queue.peek()); 
        } 
    } 
         
    public void clearQueue() { 
        synchronized (queue) { 
            queue.clear(); 
        } 
    } 
}
```

`QueueSampler` defines the `getQueueSample()` getter and `clearQueue()` operation that were declared by the MXBean interface. The `getQueueSample()` operation returns an instance of the `QueueSample` Java type which was created with the values returned by the [`java.util.Queue`](https://docs.oracle.com/javase/8/docs/api/java/util/Queue.html) methods `peek()` and `size()`, and an instance of [`java.util.Date`](https://docs.oracle.com/javase/8/docs/api/java/util/Date.html).

## Defining the Java Type Returned by the MXBean Interface

The `QueueSample` instance returned by `QueueSampler` is defined in the [`QueueSample`](https://docs.oracle.com/javase/tutorial/jmx/examples/QueueSample.java) class, as follows:

```java
package com.example; 
 
import java.beans.ConstructorProperties; 
import java.util.Date; 
 
public class QueueSample { 
     
    private final Date date; 
    private final int size; 
    private final String head; 
         
    @ConstructorProperties({"date", "size", "head"}) 
    public QueueSample(Date date, int size, 
                        String head) { 
        this.date = date; 
        this.size = size; 
        this.head = head; 
    } 
         
    public Date getDate() { 
        return date; 
    } 
         
    public int getSize() { 
        return size; 
    } 
         
    public String getHead() { 
        return head; 
    } 
}
```

In the `QueueSample` class, the MXBean framework calls all the getters in `QueueSample` to convert the given instance into a [`CompositeData`](https://docs.oracle.com/javase/8/docs/api/javax/management/openmbean/CompositeData.html) instance and uses the `@ConstructorProperties` annotation to reconstruct a `QueueSample` instance from a `CompositeData` instance.

## Creating and Registering the MXBean in the MBean Server

So far, the following have been defined: an MXBean interface and the class that implements it, as well as the Java type that is returned. Next, the MXBean must be created and registered in an MBean server. These actions are performed by the same [`Main`](https://docs.oracle.com/javase/tutorial/jmx/examples/Main.java) example JMX agent that was used in the standard MBean example, but the relevant code was not shown in the [[JMX-MBeans-标准MBeans|Standard MBean]] lesson.

```java
package com.example; 
 
import java.lang.management.ManagementFactory; 
import java.util.Queue; 
import java.util.concurrent.ArrayBlockingQueue; 
import javax.management.MBeanServer; 
import javax.management.ObjectName; 
 
public class Main { 
 
    public static void main(String[] args) throws Exception { 
        MBeanServer mbs = 
            ManagementFactory.getPlatformMBeanServer(); 
                
        ...  
        ObjectName mxbeanName = new ObjectName("com.example:type=QueueSampler");
        
        Queue<String> queue = new ArrayBlockingQueue<String>(10);
        queue.add("Request-1");
        queue.add("Request-2");
        queue.add("Request-3");
        QueueSampler mxbean = new QueueSampler(queue);
        
        mbs.registerMBean(mxbean, mxbeanName);
                 
        System.out.println("Waiting..."); 
        Thread.sleep(Long.MAX_VALUE); 
    } 
}
```

The `Main` class performs the following actions:

- Gets the platform MBean server.
- Creates an object name for the MXBean `QueueSampler.`
- Creates a `Queue` instance for the `QueueSampler` MXBean to process.
- Feeds the `Queue` instance to a newly created `QueueSampler` MXBean.
- Registers the MXBean in the MBean server in exactly the same way as a standard MBean.

## Running the MXBean Example

The MXBean example uses classes from the [`jmx_examples.zip`](https://docs.oracle.com/javase/tutorial/jmx/examples/jmx_examples.zip) bundle that you used in the [[JMX-MBeans-标准MBeans|Standard MBeans]] section. This example requires version 6 of the Java SE platform. To run the MXBeans example follow these steps:

1. If you have not done so already, save [`jmx_examples.zip`](https://docs.oracle.com/javase/tutorial/jmx/examples/jmx_examples.zip) into your `work_dir` directory.
2. Unzip the bundle of sample classes by using the following command in a terminal window.
	```
	unzip jmx_examples.zip
	```
3. Compile the example Java classes from within the `work_dir` directory.
	```
	javac com/example/*.java
	```
4. Start the `Main` application. A confirmation that `Main` is waiting for something to happen is generated.
	```
	java com.example.Main
	```
5. Start JConsole in a different terminal window on the same machine. The New Connection dialog box is displayed, presenting a list of running JMX agents that you can connect to.
	```
	jconsole
	```
6. In the New Connection dialog box, select `com.example.Main` from the list and click Connect.
	A summary of your platform's current activity is displayed.
7. Click the MBeans tab.
	This panel shows all the MBeans that are currently registered in the MBean server.
8. In the left frame, expand the `com.example` node in the MBean tree.
	You see the example MBean `QueueSampler` that was created and registered by `Main`. If you click `QueueSampler`, you see its associated Attributes and Operations nodes in the MBean tree.
9. Expand the Attributes node.
	You see the `QueueSample` attribute appear in the right pane, with its value of `javax.management.openmbean.CompositeDataSupport`.
10. Double-click the `CompositeDataSupport` value.
	You see the `QueueSample` values `date`, `head`, and `size` because the MXBean framework has converted the `QueueSample` instance into `CompositeData`. If you had defined `QueueSampler` as a standard MBean rather than as an MXBean, JConsole would not have found the `QueueSample` class because it would not be in its class path. If `QueueSampler` had been a standard MBean, you would have received a `ClassNotFoundException` message when retrieving the `QueueSample` attribute value. The fact that JConsole finds `QueueSampler` demonstrates the usefulness of using MXBeans when connecting to JMX agents through generic JMX clients such as JConsole.
11. Expand the Operations node.
	A button to invoke the `clearQueue` operation is displayed.
12. Click the `clearQueue` button.
	A confirmation that the method was invoked successfully is displayed.
13. Expand the Attributes node again, and double click on the `CompositeDataSupport` value.
	The `head` and `size` values have been reset.
14. To close JConsole, select Connection -> Exit.
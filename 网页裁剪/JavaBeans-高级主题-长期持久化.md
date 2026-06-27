---
分类:
  - "网页裁剪"
标题: "Long Term Persistence (The Java™ Tutorials >        
            JavaBeans(TM) > Advanced JavaBeans Topics)"
描述: "This JavaBean Java tutorial describes using the JavaBeans API to develop JavaBean components"
来源: "https://docs.oracle.com/javase/tutorial/javabeans/advanced/longpersistence.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Long Term Persistence (The Java™ Tutorials >        
            JavaBeans(TM) > Advanced JavaBeans Topics)

Documentation

[[JavaBeans-高级主题-Bean持久化|Bean Persistence]]

Long Term Persistence

[[JavaBeans-高级主题-Bean定制|Bean Customization]]

[[JavaBeans-高级主题-Bean持久化|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/javabeans/TOC.html) • [[JavaBeans-高级主题-Bean定制|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Long Term Persistence

*Long-term persistence* is a model that enables beans to be saved in XML format.

Information on the XML format and on how to implement long-term persistence for non-beans can be found in [XML Schema](http://www.oracle.com/technetwork/java/persistence3-139471.html) and [Using XMLEncoder](http://www.oracle.com/technetwork/java/persistence4-140124.html).

## Encoder and Decoder

The [`XMLEncoder`](https://docs.oracle.com/javase/8/docs/api/java/beans/XMLEncoder.html) class is assigned to write output files for textual representation of `Serializable` objects. The following code fragment is an example of writing a Java bean and its properties in XML format:

```text
XMLEncoder encoder = new XMLEncoder(
           new BufferedOutputStream(
           new FileOutputStream("Beanarchive.xml")));

encoder.writeObject(object);
encoder.close();
```

The [`XMLDecoder`](https://docs.oracle.com/javase/8/docs/api/java/beans/XMLDecoder.html) class reads an XML document that was created with XMLEncoder:

```text
XMLDecoder decoder = new XMLDecoder(
    new BufferedInputStream(
    new FileInputStream("Beanarchive.xml")));

Object object = decoder.readObject();
decoder.close();
```

## What's in XML?

An XML bean archive has its own specific syntax, which includes the following tags to represent each bean element:

- an XML preamble to describe a version of XML and type of encoding
- a `**<java>**` tag to embody all object elements of the bean
- an `**<object>**` tag to represent a set of method calls needed to reconstruct an object from its serialized form
	```xml
	<object class="javax.swing.JButton" method="new">
	    <string>Ok</string>
	</object>
```text
	or statements
	```xml
	<object class="javax.swing.JButton">
	    <void method="setText">
	        <string>Cancel</string>
	            </void>
	    </object>
```
- tags to define appropriate primitive types:
	- `**<boolean>**`
		- `**<byte>**`
		- `**<char>**`
		- `**<short>**`
		- `**<int>**`
		- `**<long>**`
		- `**<float>**`
		- `**<double>**`
	```xml
	<int>5555</int>
- a **< `class` >** tag to represent an instance of Class.
	```xml
	<class>java.swing.JFrame</class>
- an **< `array` >** tag to define an array
	```xml
	<array class="java.lang.String" length="5">
	</array>
```xml

The following code represents an XML archive that will be generated for the `SimpleBean` component:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<java>
  <object class="javax.swing.JFrame">
    <void method="add">
      <object class="java.awt.BorderLayout" field="CENTER"/>
      <object class="SimpleBean"/>
    </void>
    <void property="defaultCloseOperation">
      <object class="javax.swing.WindowConstants" field="DISPOSE_ON_CLOSE"/>
    </void>
    <void method="pack"/>
    <void property="visible">
      <boolean>true</boolean>
    </void>
  </object>
</java>
```
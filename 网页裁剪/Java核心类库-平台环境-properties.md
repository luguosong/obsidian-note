---
分类:
  - "网页裁剪"
标题: "Properties (The Java™ Tutorials >        
            Essential Java Classes > The Platform Environment)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/environment/properties.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Java核心类库-平台环境-配置实用工具|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-平台环境-cmdLineArgs|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Properties

*Properties* are configuration values managed as *key/value pairs*. In each pair, the key and value are both [`String`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html) values. The key identifies, and is used to retrieve, the value, much as a variable name is used to retrieve the variable's value. For example, an application capable of downloading files might use a property named "download.lastDirectory" to keep track of the directory used for the last download.

To manage properties, create instances of [`java.util.Properties`](https://docs.oracle.com/javase/8/docs/api/java/util/Properties.html). This class provides methods for the following:

- loading key/value pairs into a `Properties` object from a stream,
- retrieving a value from its key,
- listing the keys and their values,
- enumerating over the keys, and
- saving the properties to a stream.

For an introduction to streams, refer to the section [[Java核心类库-基本IO-streams|I/O Streams]] in the [[Java核心类库-基本IO|Basic I/O]] lesson.

`Properties` extends [`java.util.Hashtable`](https://docs.oracle.com/javase/8/docs/api/java/util/Hashtable.html). Some of the methods inherited from `Hashtable` support the following actions:

- testing to see if a particular key or value is in the `Properties` object,
- getting the current number of key/value pairs,
- removing a key and its value,
- adding a key/value pair to the `Properties` list,
- enumerating over the values or the keys,
- retrieving a value by its key, and
- finding out if the `Properties` object is empty.

---

**Security Considerations:** Access to properties is subject to approval by the current security manager. The example code segments in this section are assumed to be in standalone applications, which, by default, have no security manager. The same code in an applet may not work depending on the browser in which it is running. See [[部署-Applet-安全|What Applets Can and Cannot Do]] in the [[部署-Applet|Java Applets]] lesson for information about security restrictions on applets.

---

The `System` class maintains a `Properties` object that defines the configuration of the current working environment. For more about these properties, see [[Java核心类库-平台环境-sysprop|System Properties]]. The remainder of this section explains how to use properties to manage application configuration.

## Properties in the Application Life Cycle

The following figure illustrates how a typical application might manage its configuration data with a `Properties` object over the course of its execution.

![Possible lifecycle of a Properties object](https://docs.oracle.com/javase/tutorial/figures/essential/environment-1loads.gif)

- `Starting Up`  
	The actions given in the first three boxes occur when the application is starting up. First, the application loads the default properties from a well-known location into a `Properties` object. Normally, the default properties are stored in a file on disk along with the `.class` and other resource files for the application.  
	Next, the application creates another `Properties` object and loads the properties that were saved from the last time the application was run. Many applications store properties on a per-user basis, so the properties loaded in this step are usually in a specific file in a particular directory maintained by this application in the user's home directory. Finally, the application uses the default and remembered properties to initialize itself.  
	The key here is consistency. The application must always load and save properties to the same location so that it can find them the next time it's executed.
- `Running`  
	During the execution of the application, the user may change some settings, perhaps in a Preferences window, and the `Properties` object is updated to reflect these changes. If the users changes are to be remembered in future sessions, they must be saved.
- `Exiting`  
	Upon exiting, the application saves the properties to its well-known location, to be loaded again when the application is next started up.

## Setting Up the Properties Object

The following Java code performs the first two steps described in the previous section: loading the default properties and loading the remembered properties:

```
. . .
// create and load default properties
Properties defaultProps = new Properties();
FileInputStream in = new FileInputStream("defaultProperties");
defaultProps.load(in);
in.close();

// create application properties with default
Properties applicationProps = new Properties(defaultProps);

// now load properties 
// from last invocation
in = new FileInputStream("appProperties");
applicationProps.load(in);
in.close();
. . .
```

First, the application sets up a default `Properties` object. This object contains the set of properties to use if values are not explicitly set elsewhere. Then the load method reads the default values from a file on disk named `defaultProperties`.

Next, the application uses a different constructor to create a second `Properties` object, `applicationProps`, whose default values are contained in `defaultProps`. The defaults come into play when a property is being retrieved. If the property can't be found in `applicationProps`, then its default list is searched.

Finally, the code loads a set of properties into `applicationProps` from a file named `appProperties`. The properties in this file are those that were saved from the application the last time it was invoked, as explained in the next section.

## Saving Properties

The following example writes out the application properties from the previous example using `Properties.store`. The default properties don't need to be saved each time because they never change.

```
FileOutputStream out = new FileOutputStream("appProperties");
applicationProps.store(out, "---No Comment---");
out.close();
```

The `store` method needs a stream to write to, as well as a string that it uses as a comment at the top of the output.

## Getting Property Information

Once the application has set up its `Properties` object, the application can query the object for information about various keys and values that it contains. An application gets information from a `Properties` object after start up so that it can initialize itself based on choices made by the user. The `Properties` class has several methods for getting property information:

- `contains(Object value)` and `containsKey(Object key)`  
	Returns `true` if the value or the key is in the `Properties` object. `Properties` inherits these methods from `Hashtable`. Thus they accept `Object` arguments, but only `String` values should be used.
- `getProperty(String key)` and `getProperty(String key, String default)`  
	Returns the value for the specified property. The second version provides for a default value. If the key is not found, the default is returned.
- `list(PrintStream s)` and `list(PrintWriter w)`  
	Writes all of the properties to the specified stream or writer. This is useful for debugging.
- `elements()`, `keys()`, and `propertyNames()`  
	Returns an `Enumeration` containing the keys or values (as indicated by the method name) contained in the `Properties` object. The `keys` method only returns the keys for the object itself; the `propertyNames` method returns the keys for default properties as well.
- `stringPropertyNames()`  
	Like `propertyNames`, but returns a `Set<String>`, and only returns names of properties where both key and value are strings. Note that the `Set` object is not backed by the `Properties` object, so changes in one do not affect the other.
- `size()`  
	Returns the current number of key/value pairs.

## Setting Properties

A user's interaction with an application during its execution may impact property settings. These changes should be reflected in the `Properties` object so that they are saved when the application exits (and calls the `store` method). The following methods change the properties in a `Properties` object:

- `setProperty(String key, String value)`  
	Puts the key/value pair in the `Properties` object.
- `remove(Object key)`  
	Removes the key/value pair associated with key.

---

**Note:** Some of the methods described above are defined in `Hashtable`, and thus accept key and value argument types other than `String`. Always use `String` s for keys and values, even if the method allows other types. Also do not invoke `Hashtable.set` or `Hastable.setAll` on `Properties` objects; always use `Properties.setProperty`.

---
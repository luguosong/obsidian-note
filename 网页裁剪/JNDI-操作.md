Documentation

Naming and Directory Operations

[Naming Exceptions](https://docs.oracle.com/javase/tutorial/jndi/ops/exception.html)

[Lookup an Object](https://docs.oracle.com/javase/tutorial/jndi/ops/lookup.html)

[List the Context](https://docs.oracle.com/javase/tutorial/jndi/ops/list.html)

[Add, Replace or Remove a Binding](https://docs.oracle.com/javase/tutorial/jndi/ops/bind.html)

[Rename](https://docs.oracle.com/javase/tutorial/jndi/ops/rename.html)

[Create and Destroy Subcontexts](https://docs.oracle.com/javase/tutorial/jndi/ops/create.html)

[Attribute Names](https://docs.oracle.com/javase/tutorial/jndi/ops/attrnames.html)

[Read Attributes](https://docs.oracle.com/javase/tutorial/jndi/ops/getattrs.html)

[Modify Attributes](https://docs.oracle.com/javase/tutorial/jndi/ops/modattrs.html)

[Add, Replace Bindings with Attributes](https://docs.oracle.com/javase/tutorial/jndi/ops/bindattr.html)

[Search](https://docs.oracle.com/javase/tutorial/jndi/ops/search.html)

[Basic Search](https://docs.oracle.com/javase/tutorial/jndi/ops/basicsearch.html)

[Filters](https://docs.oracle.com/javase/tutorial/jndi/ops/filter.html)

[Scope](https://docs.oracle.com/javase/tutorial/jndi/ops/scope.html)

[Result Count](https://docs.oracle.com/javase/tutorial/jndi/ops/countlimit.html)

[Time Limit](https://docs.oracle.com/javase/tutorial/jndi/ops/timelimit.html)

[Trouble Shooting Tips](https://docs.oracle.com/javase/tutorial/jndi/ops/faq.html)

[« Previous](https://docs.oracle.com/javase/tutorial/jndi/software/index.html) • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jndi/ops/exception.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Naming and Directory Operations

You can use the JNDI to perform naming operations, including read operations and operations for updating the namespace. The following operations are described in this lesson:

- [Looking up an object](https://docs.oracle.com/javase/tutorial/jndi/ops/lookup.html)
- [Listing the contents of a context](https://docs.oracle.com/javase/tutorial/jndi/ops/list.html)
- [Adding, overwriting, and removing a binding](https://docs.oracle.com/javase/tutorial/jndi/ops/bind.html)
- [Renaming an object](https://docs.oracle.com/javase/tutorial/jndi/ops/rename.html)
- [Creating and destroying subcontexts](https://docs.oracle.com/javase/tutorial/jndi/ops/create.html)

## Configuration

Before performing any operation on a naming or directory service, you need to acquire an *initial context* --the starting point into the namespace. This is because all methods on naming and directory services are performed relative to some context. To get an initial context, you must follow these steps.

1. Select the service provider of the corresponding service you want to access.
2. Specify any configuration that the initial context needs.
3. Call the [InitialContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/InitialContext.html#constructor_detail) constructor.

## Step1: Select the Service Provider for the Initial Context

You can specify the service provider to use for the initial context by creating a set of *environment properties* (a Hashtable) and adding the name of the service provider class to it. Environment properties are described in detail in the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/beyond/env/index.html).

If you are using the LDAP service provider included in the JDK, then your code would look like the following.

```
Hashtable<String, Object> env = new Hashtable<String, Object>();
env.put(Context.INITIAL_CONTEXT_FACTORY, 
        "com.sun.jndi.ldap.LdapCtxFactory");
```

To specify the file system service provider in the JDK, you would write code that looks like the following.

```
Hashtable<String, Object> env = new Hashtable>String, Object>();
env.put(Context.INITIAL_CONTEXT_FACTORY, 
        "com.sun.jndi.fscontext.RefFSContextFactory");
```

You can also use *system properties* to specify the service provider to use. Check out the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/beyond/index.html) for details.

## Step2: Supply the Information Needed by the Initial Context

Clients of different directories might need various information for contacting the directory. For example, you might need to specify on which machine the server is running and what information is needed to identify the user to the directory. Such information is passed to the service provider via environment properties. The JNDI specifies some generic environment properties that service providers can use. Your service provider documentation will give details on the information required for these properties.

The LDAP provider requires that the program specify the location of the LDAP server, as well as user identity information. To provide this information, you would write code that looks as follows.

```
env.put(Context.PROVIDER_URL, "ldap://ldap.wiz.com:389");
env.put(Context.SECURITY_PRINCIPAL, "joeuser");
env.put(Context.SECURITY_CREDENTIALS, "joepassword");
```

This tutorial uses the LDAP service provider in the JDK. The examples assume that a server has been set up on the local machine at port 389 with the root-distinguished name of "o=JNDITutorial" and that no authentication is required for updating the directory. They include the following code for setting up the environment.

```
env.put(Context.PROVIDER_URL, "ldap://localhost:389/o=JNDITutorial");
```

If you are using a directory that is set up differently, then you will need to set up these environment properties accordingly. You will need to replace "localhost" with the name of that machine. You can run these examples against any [public directory servers](https://docs.oracle.com/javase/tutorial/jndi/software/index.html) or your own server running on a different machine. You will need to replace "localhost" with the name of that machine and replace o=JNDITutorial with the naming context that is available.

## Step3: Creating the Initial Context

You are now ready to create the initial context. To do that, you pass to the [InitialContext constructor](https://docs.oracle.com/javase/8/docs/api/javax/naming/InitialContext.html#constructor_detail) the environment properties that you created previously:

```
Context ctx = new InitialContext(env);
```

Now that you have a reference to a [Context](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html) object, you can begin to access the naming service.

To perform directory operations, you need to use an [InitialDirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/InitialDirContext.html). To do that, use one of its [constructors](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/InitialDirContext.html#constructor_detail):

```
DirContext ctx = new InitialDirContext(env);
```

This statement returns a reference to a [DirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html) object for performing directory operations.
Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/jndi/ops/filter.html) • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jndi/ops/countlimit.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Scope

The default [SearchControls](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html) specifies that the search is to be performed in the named context ( [SearchControls.ONELEVEL\_SCOPE](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html#ONELEVEL_SCOPE)). This default is used in the examples in the [Search Filters section](https://docs.oracle.com/javase/tutorial/jndi/ops/filter.html).

In addition to this default, you can specify that the search be performed in the *entire subtree* or only in the named object.

## Search the Subtree

A search of the entire subtree searches the named object and all of its descendants. To make the search behave in this way, pass [SearchControls.SUBTREE\_SCOPE](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html#SUBTREE_SCOPE) to [SearchControls.setSearchScope()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html#setSearchScope-int-) as follows.

```
// Specify the ids of the attributes to return
String[] attrIDs = {"sn", "telephonenumber", "golfhandicap", "mail"};
SearchControls ctls = new SearchControls();
ctls.setReturningAttributes(attrIDs);
ctls.setSearchScope(SearchControls.SUBTREE_SCOPE);

// Specify the search filter to match
// Ask for objects that have the attribute "sn" == "Geisel"
// and the "mail" attribute
String filter = "(&(sn=Geisel)(mail=*))";

// Search the subtree for objects by using the filter
NamingEnumeration answer = ctx.search("", filter, ctls);
```

[`This example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/SearchSubtree.java) searches the context ctx 's subtree for entries that satisfy the specified filter. It finds the entry "cn= Ted Geisel, ou=People" in this subtree that satisfies the filter.

```
# java SearchSubtree
>>>cn=Ted Geisel, ou=People
attribute: sn
value: Geisel
attribute: mail
value: Ted.Geisel@JNDITutorial.example.com
attribute: telephonenumber
value: +1 408 555 5252
```

## Search the Named Object

You can also search the named object. This is useful, for example, to test whether the named object satisfies a search filter. To search the named object, pass [SearchControls.OBJECT\_SCOPE](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html#OBJECT_SCOPE) to setSearchScope().

```
// Specify the ids of the attributes to return
String[] attrIDs = {"sn", "telephonenumber", "golfhandicap", "mail"};
SearchControls ctls = new SearchControls();
ctls.setReturningAttributes(attrIDs);
ctls.setSearchScope(SearchControls.OBJECT_SCOPE);

// Specify the search filter to match
// Ask for objects that have the attribute "sn" == "Geisel"
// and the "mail" attribute
String filter = "(&(sn=Geisel)(mail=*))";

// Search the subtree for objects by using the filter
NamingEnumeration answer = 
    ctx.search("cn=Ted Geisel, ou=People", filter, ctls);
```

[`This example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/SearchObject.java) tests whether the object "cn=Ted Geisel, ou=People" satisfies the given filter.

```
# java SearchObject
>>>
attribute: sn
value: Geisel
attribute: mail
value: Ted.Geisel@JNDITutorial.example.com
attribute: telephonenumber
value: +1 408 555 5252
```

The example found one answer and printed it. Notice that the name of the result is the empty string. This is because the name of the object is always named relative to the context of the search (in this case, "cn=Ted Geisel, ou=People").
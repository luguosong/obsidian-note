---
分类:
  - "网页裁剪"
标题: "Manipulating LdapName (Distinguished Name) (The Java™ Tutorials >        
            Java Naming and Directory Interface > New features in JDK 5.0 and JDK 6)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/newstuff/ldapname.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-检索DN|Retrieving Distinguished Name]]

[[JNDI-标准LDAP控件|Standard LDAP Controls]]

[[JNDI-新特性-paged-results|Paged Results Control]]

[[JNDI-新特性-sort|Sort Control]]

[[JNDI-新特性-mdsaIT|Manage Referral Control]]

Manipulating LdapName (Distinguished Name)

[[JNDI-新特性-rdn|Manipulating Relative Distinguished Name (RDN)]]

[[JNDI-读取超时|Setting Timeout for Ldap Operations]]

**Trail:** Java Naming and Directory Interface  
**Lesson:** New features in JDK 5.0 and JDK 6

[[JNDI-新特性-mdsaIT|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-新特性-rdn|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Manipulating LdapName (Distinguished Name)

The Distinguished Name (DN) is used by LDAP in its string representation. The string format used to represent a DN is specified in [RFC 2253](http://www.ietf.org/rfc/rfc2253.txt). The DN is made up of components called the Relative Distinguished Names (RDN). Below is an example of a DN:

"CN=John Smith, O=Isode Limited, C=GB"

It consist of the following RDNs:

- CN=John Smith
- O=Isode Limited
- C=GB

The classes below represent the DN and RDN respectively.

- [javax.naming.ldap.LdapName](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html)
- [javax.naming.ldap.Rdn](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html)

The LdapName class implements the [javax.naming.Name](https://docs.oracle.com/javase/8/docs/api/javax/naming/Name.html) interface similar to the [javax.naming.CompoundName](https://docs.oracle.com/javase/8/docs/api/javax/naming/Name.html) and [javax.naming.CompositeName](https://docs.oracle.com/javase/8/docs/api/javax/naming/CompositeName.html) classes.

LdapName and Rdn classes allow easy manipulation of DNs and RDNs. Using these APIs it's easy to construct an RDN by pairing up names and values. A DN can be constructed with a list of RDNs. Similarly the individual components of DN and RDN can be retrieved from their string representation.

## LdapName

An LdapName can be created with its string representation as defined in [RFC 2253](http://www.ietf.org/rfc/rfc2253.txt) or with a list of Rdns. When the former way is used, the specified string is parsed as per the rules defined in RFC2253. An [InvalidNameException](https://docs.oracle.com/javase/8/docs/api/javax/naming/InvalidNameException.html) is thrown if the string is not a valid DN. Here's an example that uses the constructor to parse an LDAP name and print its components.

```java
String name = "cn=Mango,ou=Fruits,o=Food";
try {
    LdapName dn = new LdapName(name);
    System.out.println(dn + " has " + dn.size() + " RDNs: ");
    for (int i = 0; i < dn.size(); i++) {
        System.out.println(dn.get(i));
    }
} catch (InvalidNameException e) {
    System.out.println("Cannot parse name: " + name);
}
```

Running this example with an input of "cn=Mango,ou=Fruits,o=Food" produces the following results:

```properties
cn=Mango,ou=Fruits,o=Food has 3 RDNs: 
o=Food
ou=Fruits
cn=Mango
```

The LdapName class contains methods to access its components as RDNs and strings, to modify an LdapName, to compare two LdapNames for equality, and to get a string representation of the name.

### Accessing the name components of an LDAP name:

Here are the methods that you can use to access the name components as RDNs and strings:

[getRdn(int posn)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#getRdn-int-)  
[get(int posn)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#get-int-)  
[getRdns()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#getRdns--)  
[getAll()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#getAll--)  
[getPrefix(int posn)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#getPrefix-intposn-)  
[getSuffix(int posn)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#getSuffix-intposn-)  
[clone()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#clone--)

To retrieve the component at a particular position within an LdapName, you use getRdn() or get(). The previous constructor example shows an example of its use. [getRdns()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#getRdns--) returns a list of all the RDNs and [getAll()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#getAll--) returns all of the components of an LdapName as an enumeration.

The right most RDN is at index 0, and the left most RDN is at index n-1. For example, the distinguished name: "cn=Mango, ou=Fruits, o=Food" is numbered in the following sequence ranging from 0 to 2: {o=Food, ou=Fruits, cn=Mango}

You can also get a LdapNames's suffix or prefix as a LdapName instance. Here's an [`example`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/LdapNameSuffixPrefix.java) that gets the suffix and prefix of an LDAP name.

```
LdapName dn = new LdapName("cn=Mango, ou=Fruits, o=Food");
Name suffix = dn.getSuffix(1);  // 1 <= index < cn.size()
Name prefix = dn.getPrefix(1);  // 0 <= index < 1
```

When you run this program, it generates the following output:

```properties
cn=Mango ou=Fruits
o=Food
```

To make a copy of an LdapName, you use clone().

### Modifying an LDAP name

Following are the methods that you can use to modify an LDAP name:

[add(Rdn rdn)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#add-Rdn-)  
[add(String comp)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#add-String-)  
[add(int posn, String comp)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#add-int-String-)  
[addAll(List suffixRdns)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#addAll-List-)  
[addAll(Name suffix)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#addAll-Namesuffix-)  
[addAll(int posn, List suffixRdns)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#addAll-int-List-)  
[addAll(int posn, Name suffix)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#addAll-int-Name-)  
[remove(int posn)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#remove-int-)

After creating an LdapName instance, you can add and remove components from it. Here's an [`example`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/ModifyLdapName.java) that appends an LdapName to an existing LdapName, adds components to the front and the end, and removes the second component.

```java
LdapName dn = new LdapName("ou=Fruits,o=Food");
     LdapName dn2 = new LdapName("ou=Summer");
     System.out.println(dn.addAll(dn2)); // ou=Summer,ou=Fruits,o=Food
     System.out.println(dn.add(0, "o=Resources")); 
// ou=Summer,ou=Fruits,o=Food,o=Resources
     System.out.println(dn.add("cn=WaterMelon")); 
// cn=WaterMelon,ou=Summer,ou=Fruits,o=Food,o=Resources
     System.out.println(dn.remove(1));  // o=Food
     System.out.println(dn);  
// cn=WaterMelon,ou=Summer,ou=Fruits,o=Resources
```

### Comparing an LDAP name

Following are the methods that you can use to compare two LDAP names:

[compareTo(Object name)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#compareTo-Object-)  
[equals(Object name)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#equals-Object-)  
[endsWith(List)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#endsWith-List-)  
[endWith(Name name)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#endsWith-Name-)  
[startsWith(List rdns)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#startsWith-iList-)  
[startsWith(Name name)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#startsWith-Name-)  
[isEmpty()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#isEmpty--)

You can use compareTo() to sort a list of LdapName instances. The equals() method lets you determine whether two LdapNames are syntactically equal. Two LdapNames are equal if they both have the same (case-exact matched) components in the same order.

With startsWith() and endsWith(), you can learn whether an LdapName starts or ends with another LdapName; that is, whether an LdapName is a suffix or prefix of another LdapName.

The convenience method isEmpty() enables you to determine whether an LdapName has zero components. You can also use the expression size() == 0 to perform the same check.

Here is an example, [`CompareLdapNames`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/CompareLdapNames.java), that uses some of these comparison methods.

```java
LdapName one = new LdapName("cn=Vincent Ryan, ou=People, o=JNDITutorial");
LdapName two = new LdapName("cn=Vincent Ryan");
LdapName three = new LdapName("o=JNDITutorial");
LdapName four = new LdapName("");

System.out.println(one.equals(two));        // false
System.out.println(one.startsWith(three));  // true
System.out.println(one.endsWith(two));      // true
System.out.println(one.startsWith(four));   // true
System.out.println(one.endsWith(four));     // true
System.out.println(one.endsWith(three));    // false
System.out.println(one.isEmpty());          // false
System.out.println(four.isEmpty());         // true
System.out.println(four.size() == 0);       // true
```

### Getting the String Representation

The method below gets you the string representation of an LDAP name formatted according to the syntax specified in RFC 2253:

[toString()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#toString--)

When you use the LdapName constructor, you supply the string representation of an LDAP name and get back an LdapName instance. To do the reverse, that is, to get the string representation of an LdapName instance, you use toString(). The result of toString() can be fed back to the constructor to produce a LdapName instance that is equal to the original LdapName instance. Here's an example, [`LdapNametoString`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/LdapNametoString.java):

```java
LdapName dn = new LdapName(name);
String str = dn.toString();
System.out.println(str);
LdapName dn2 = new LdapName(str);
System.out.println(dn.equals(dn2));  // true
```

### LdapName as an Argument to Context Methods

The Context method require either a composite or a compound name passed as argument to its methods. Hence an LdapName can be directly passed to a context method as shown in [`LookupLdapName`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/LookupLdapName.java):

```
// Create the initial context
Context ctx = new InitialContext(env);

// An LDAP name
LdapName dn = new LdapName("ou=People,o=JNDITutorial");

// Perform the lookup using the dn
Object obj = ctx.lookup(dn);
```

Similarly, when the Context methods return results from list(), listBindings(), or search() operations, the DN can be retrieved by calling [getNameInNamespace()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html#getNameInNamepspace--). The LdapName can be constructed directly from the DN as shown in the example, [`RetrievingLdapName`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/RetrievingLdapName.java):

```java
while (answer.hasMore()) {
    SearchResult sr = (SearchResult) answer.next();
    String name = sr.getNameInNamespace();
    System.out.println(name);
    LdapName dn = new LdapName(name);

    // do something with the dn
```
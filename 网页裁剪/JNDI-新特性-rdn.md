---
分类:
  - "网页裁剪"
标题: "Manipulating Relative Distinguished Name (RDN) (The Java™ Tutorials >        
            Java Naming and Directory Interface > New features in JDK 5.0 and JDK 6)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/newstuff/rdn.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Manipulating Relative Distinguished Name (RDN) (The Java™ Tutorials >        
            Java Naming and Directory Interface > New features in JDK 5.0 and JDK 6)

Documentation

[[JNDI-检索DN|Retrieving Distinguished Name]]

[[JNDI-标准LDAP控件|Standard LDAP Controls]]

[[JNDI-新特性-paged-results|Paged Results Control]]

[[JNDI-新特性-sort|Sort Control]]

[[JNDI-新特性-mdsaIT|Manage Referral Control]]

[[JNDI-LDAP名称操作|Manipulating LdapName (Distinguished Name)]]

Manipulating Relative Distinguished Name (RDN)

[[JNDI-读取超时|Setting Timeout for Ldap Operations]]

**Trail:** Java Naming and Directory Interface  
**Lesson:** New features in JDK 5.0 and JDK 6

[[JNDI-LDAP名称操作|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-读取超时|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Manipulating Relative Distinguished Name (RDN)

The class [javax.naming.ldap.Rdn](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html) represents a Relative Distinguished name (RDN) as specified in [RFC 2253](http://www.ietf.org/rfc/rfc2253.txt). An RDN represents a component of a DN as explained in the [[JNDI-LDAP名称操作|Manipulating LdapName]] lesson. An RDN is made up of type and value pair(s). Examples of RDNs are:

- OU=Sun
- OU=Sales+CN=J.Smith.  
	The above example shows a representation of a multi-valued RDN.

The [Rdn](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html) class provides methods to access name/value pair(s) of an RDN, obtain its string representation, retrieve an [Attributes](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/Attributes.html) view, compare and determine equality of RDNs and methods to escape and unescape the value part of the RDN.

The Rdn class is immutable.

## Constructing an Rdn

An Rdn can be constructed with the specified name and value pair, if it's a single name/value paired RDN. For a multi-valued RDN, you should create an attribute set consisting of all the name/value pairs and use a constructor that takes Attributes as an argument. You can also create an Rdn from its string representation specified in [RFC 2253](http://www.ietf.org/rfc/rfc2253.txt). Finally, you can clone an Rdn using its copy constructor. Here is an [`example`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/RdnConstructors.java) that creates RDNs using different types of constructors.

```java
Rdn rdn1 = new Rdn("ou= Juicy\\, Fruit");
System.out.println("rdn1:" + rdn1.toString());

Rdn rdn2 = new Rdn(rdn1);
System.out.println("rdn2:" + rdn2.toString());

Attributes attrs = new BasicAttributes();
attrs.put("ou", "Juicy, Fruit");
attrs.put("cn", "Mango");
Rdn rdn3 = new Rdn(attrs);
System.out.println("rdn3:" + rdn3.toString());

Rdn rdn4 = new Rdn("ou", "Juicy, Fruit");
System.out.println("rdn4:" + rdn4.toString());

## Accessing type/value pairs of an RDN

The type/values of and RDN can be obtained using the methods below:

[getType()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html#getType--)  
[getValue()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html#getValue--)  
[toAttributes()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html#toAttributes--)

For a an RDN made up of single type/value pair, the [getType()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html#getType--) method returns the type and the [getValue()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html#getValue--) method returns the value of the RDN. The method [toAttributes()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html#toAttributes--) returns the attribute view of the type/value pairs. The [`example`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/RdnGetters.java) below prints the type/value pairs of RDNs.

```java
Attributes attrs = new BasicAttributes();
attrs.put("o", "Yellow");
attrs.put("cn", "Mango");

// create a binary value for the RDN
byte[] mangoJuice = new byte[6];
for (int i = 0; i < mangoJuice.length; i++) {
    mangoJuice[i] = (byte) i;
}
attrs.put("ou", mangoJuice);
Rdn rdn = new Rdn(attrs);

System.out.println();
System.out.println("size:" + rdn.size());
System.out.println("getType(): " + rdn.getType());
System.out.println("getValue(): " + rdn.getValue());

// test toAttributes
System.out.println();
System.out.println("toAttributes(): " + rdn.toAttributes());

## Getting the String Representation

In order to get the string representation of an RDN formatted according to the syntax specified in [RFC 2253](http://www.ietf.org/rfc/rfc2253.txt), you can use:

[toString()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html#toString--)

When you use the Rdn constructor that takes a String argument, you supply the string representation of an RDN, and get back an Rdn instance. To do the reverse, that is, to get the string representation of a Rdn instance, you use toString(). The result of toString() can be fed back to the Rdn constructor to produce an Rdn instance that is equal to the original Rdn instance.

Here's an [`example`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/RdntoString.java):

```java
Rdn rdn = new Rdn("cn=Juicy\\,Fruit");
String str = rdn.toString();
System.out.println(str);
Rdn rdn2 = new Rdn(str);
System.out.println(rdn.equals(rdn2));    // true

## Comparing RDNs

The methods below enable comparison of RDNs:

[equals(Object Rdn)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html#equals-Object-)  
[compareTo(Object Rdn)](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html#compareTo-Object-)

You can use compareTo() to sort a list of Rdn instances. equals() lets you determine whether two Rdns are syntactically equal. Two Rdns are equal if they both have the same (case-exact matched) type/value pairs. The order of components in a multi-valued RDNs is not significant.

Here's an [`example`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/CompareRdns.java):

```java
Rdn one = new Rdn("ou=Sales+cn=Bob");
Rdn two = new Rdn("cn=Bob+ou=Sales");
Rdn three = new Rdn("ou=Sales+cn=Bob+c=US");
Rdn four = new Rdn("cn=lowercase");
Rdn five = new Rdn("cn=LowerCASE");
System.out.println(one.equals(two));    // true
System.out.println(two.equals(three));  // false
System.out.println(one.equals(three));  // false
System.out.println(four.equals(five));  // true

## Escaping and Unescaping of Special Characters

One of the best use of Rdn class is when one has to deal with DNs consisting of special characters. It automatically takes care of escaping and unescaping the special characters. The characters such has '\\' (backslash), ','(comma), + (plus) etc have a specific semantic according to [RFC 2253](http://www.ietf.org/rfc/rfc2253.txt). You can find the list of all the special characters in RFC2253. When these characters are used as literals in a DN, they must be escaped with a '\\' (blackslash).

For example, consider an RDN: `cn=Juicy, Fruit` The character, (comma) appearing between Juicy and Fruit is a special character that needs to be escaped by a '\\' (blackslash). The resulting syntactically formatted RDN looks as below: `cn=Juicy\, Fruit` However, the '\\' (backslash) character itself is a special character according to the Java Language String syntax, and it needs to escaped with a '\\' (backslash) again. The Java Language String format and [RFC 2253](http://www.ietf.org/rfc/rfc2253.txt) both use '\\' (backslash) to escape the special characters. And therefore the Java formatted RDN String looks as below: `cn=Juicy\\, Fruit` Note that, the above mentioned formatting rules apply only to the value component of an Rdn. The Rdn class provides two static methods to handle automatic escaping and unescaping of the RDN values:

[escapeValue()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html#escapeValue--)  
[unescapeValue()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html#unescapeValue--)

The [`example`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/EscapingDNs.java) below shows how to get the string representation of a DN without having to deal with the syntax for handling special characters defined in [RFC 2253](http://www.ietf.org/rfc/rfc2253.txt).

```java
// DN with ',' (comma)
String unformatted = "Juicy, Fruit";
String formatted = Rdn.escapeValue(unformatted);
LdapName dn = new LdapName("cn=" + formatted);
System.out.println("dn:" + dn);

unformatted = "true+false";
formatted = Rdn.escapeValue(unformatted); 
dn = new LdapName("cn=" + formatted);
System.out.println("dn:" + dn);

// DN with a binary value as one of its attribute values
byte[] bytes = new byte[] {1, 2, 3, 4};
formatted = Rdn.escapeValue(bytes);
System.out.println("Orig val: " + bytes + "Escaped val: " + formatted);

Similarly the using the static unescapeValue() method one can obtain the original string from the formatted value. [`Here`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/UnescapingValues.java) is an example for retrieving the original value.

```java
// DN with ',' (comma)
String unformatted = "Juicy, Fruit";
String formatted = Rdn.escapeValue(unformatted);
System.out.println("Formatted:" + formatted);
Object original = Rdn.unescapeValue(formatted);
System.out.println("Original:" +  original);  

// DN with a '+' (plus)
unformatted = "true+false";
formatted = Rdn.escapeValue(unformatted); 
System.out.println("Formatted:" + formatted);
original = Rdn.unescapeValue(formatted);
System.out.println("Original:" +  original);  

// DN with a binary value as one of its attribute values
byte[] bytes = new byte[] {1, 2, 3, 4};
formatted = Rdn.escapeValue(bytes);
System.out.println("Formatted:" + formatted);
original = Rdn.unescapeValue(formatted);
System.out.println("Original:" +  original);
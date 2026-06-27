---
分类:
  - "网页裁剪"
标题: "Accessing Cookies (The Java™ Tutorials >        
            Deployment > Doing More With Java Rich Internet Applications)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/accessingCookies.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-RIA进阶-cookies|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-RIA进阶-security|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Accessing Cookies

You can set and retrieve cookies in your rich Internet application (RIA). Cookies can enhance the capabilities of your RIA. For example, consider the scenario where you have applets on various web pages. An applet on a web page cannot directly access or share information with an applet on another web page. In this scenario, cookies provide an important connection between applets and help one applet pass information to another applet on a different web page. Java Web Start applications can also use cookies to store information on the client.

The Cookie Applet example has a [`CookieAccessor`](https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/examples/applet_AccessingCookies/src/CookieAccessor.java) class that retrieves and sets cookies.

## Retrieving Cookies

The following code snippet shows the `getCookieUsingCookieHandler` method of the `CookieAccessor` class:

```
public void getCookieUsingCookieHandler() { 
    try {       
        // Instantiate CookieManager;
        // make sure to set CookiePolicy
        CookieManager manager = new CookieManager();
        manager.setCookiePolicy(CookiePolicy.ACCEPT_ALL);
        CookieHandler.setDefault(manager);

        // get content from URLConnection;
        // cookies are set by web site
        URL url = new URL("http://host.example.com");
        URLConnection connection = url.openConnection();
        connection.getContent();

        // get cookies from underlying
        // CookieStore
        CookieStore cookieJar =  manager.getCookieStore();
        List <HttpCookie> cookies =
            cookieJar.getCookies();
        for (HttpCookie cookie: cookies) {
          System.out.println("CookieHandler retrieved cookie: " + cookie);
        }
    } catch(Exception e) {
        System.out.println("Unable to get cookie using CookieHandler");
        e.printStackTrace();
    }
}
```

The [`CookieManager`](https://docs.oracle.com/javase/8/docs/api/java/net/CookieManager.html) class is the main entry point for cookie management. Create an instance of the `CookieManager` class and set its [`CookiePolicy`](https://docs.oracle.com/javase/8/docs/api/java/net/CookiePolicy.html). Set this instance of the `CookieManager` as the default [`CookieHandler`](https://docs.oracle.com/javase/8/docs/api/java/net/CookieHandler.html).

Open a [`URLConnection`](https://docs.oracle.com/javase/8/docs/api/java/net/URLConnection.html) to the website of your choice.

Next, retrieve cookies from the underlying [`CookieStore`](https://docs.oracle.com/javase/8/docs/api/java/net/CookieStore.html) by using the `getCookies` method.

## Setting Cookies

The following code snippet shows the `setCookieUsingCookieHandler` method of the `CookieAccessor` class:

```
public void setCookieUsingCookieHandler() {
    try {
        // instantiate CookieManager
        CookieManager manager = new CookieManager();
        CookieHandler.setDefault(manager);
        CookieStore cookieJar =  manager.getCookieStore();

        // create cookie
        HttpCookie cookie = new HttpCookie("UserName", "John Doe");

        // add cookie to CookieStore for a
        // particular URL
        URL url = new URL("http://host.example.com");
        cookieJar.add(url.toURI(), cookie);
        System.out.println("Added cookie using cookie handler");
    } catch(Exception e) {
        System.out.println("Unable to set cookie using CookieHandler");
        e.printStackTrace();
    }
}
```

As shown in [Retrieving Cookies](#retrieving), the [`CookieManager`](https://docs.oracle.com/javase/8/docs/api/java/net/CookieManager.html) class is the main entry point for cookie management. Create an instance of the `CookieManager` class and set the instance as the default [`CookieHandler`](https://docs.oracle.com/javase/8/docs/api/java/net/CookieHandler.html).

Create the desired [`HttpCookie`](https://docs.oracle.com/javase/8/docs/api/java/net/HttpCookie.html) with the necessary information. In our example, we have created a new `HttpCookie` that sets the `UserName` as `John Doe`.

Next, add the cookie to the underlying cookie store.

## Running the Cookie Applet Example

To access cookies, you must sign your RIA JAR file and request permission to run outside of the security sandbox. See the documentation for the [`jarsigner`](https://docs.oracle.com/javase/8/docs/technotes/tools/index.html#security) tool to learn how to sign JAR files. See [[部署-RIA进阶-security|Security in Rich Internet Applications]] for information on requesting permissions.

[[部署-RIA进阶-examplesIndex|Download source code]] for the *Cookie Applet* example to experiment further.
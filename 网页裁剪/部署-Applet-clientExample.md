---
分类:
  - "网页裁剪"
标题: "Network Client Applet Example (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/clientExample.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Network Client Applet Example (The Java™ Tutorials >        
            Deployment > Java Applets)

Documentation

[[部署-Applet-getStarted|Getting Started With Applets]]

[[部署-Applet-subclass|Defining an Applet Subclass]]

[[部署-Applet-appletMethods|Methods for Milestones]]

[[部署-Applet-lifeCycle|Life Cycle of an Applet]]

[[部署-Applet-appletExecutionEnv|Applet's Execution Environment]]

[[部署-Applet-developingApplet|Developing an Applet]]

[[部署-Applet-deployingApplet|Deploying an Applet]]

[[部署-Applet-html|Deploying With the Applet Tag]]

[[部署-Applet-doingMoreWithApplets|Doing More With Applets]]

[[部署-Applet-data|Finding and Loading Data Files]]

[[部署-Applet-param|Defining and Using Applet Parameters]]

[[部署-Applet-showStatus|Displaying Short Status Strings]]

[[部署-Applet-browser|Displaying Documents in the Browser]]

[[部署-Applet-invokingJavaScriptFromApplet|Invoking JavaScript Code From an Applet]]

[[部署-Applet-invokingAppletMethodsFromJavaScript|Invoking Applet Methods From JavaScript Code]]

[[部署-Applet-appletStatus|Handling Initialization Status With Event Handlers]]

[[部署-Applet-manipulatingDOMFromApplet|Manipulating DOM of Applet's Web Page]]

[[部署-Applet-stdout|Writing Diagnostics to Standard Output and Error Streams]]

[[部署-Applet-draggableApplet|Developing Draggable Applets]]

[[部署-Applet-iac|Communicating With Other Applets]]

[[部署-Applet-server|Working With a Server-Side Application]]

Network Client Applet Example

[[部署-Applet-安全|What Applets Can and Cannot Do]]

[[部署-Applet-problemsindex|Solving Common Applet Problems]]

[[部署-Applet-questions|Questions and Exercises]]

[[部署-Applet-server|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-安全|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Network Client Applet Example

The [`QuoteClientApplet`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/QuoteClientApplet.java) class allows you to fetch quotations from a server-side application that runs on the same host as this applet. This class also displays the quotation received from the server.

The [`QuoteServer.java`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/QuoteServer.java) and [`QuoteServerThread.java`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/QuoteServerThread.java) classes make up the server-side application that returns quotations. Here's a text file ( [`one-liners.txt`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/one-liners.txt)) that contains a number of quotations.

Perform the following steps to test `QuoteClientApplet`.

1. Download and save the following files to your local machine.
	- [`QuoteClientApplet`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/QuoteClientApplet.java)
		- [`QuoteServer.java`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/QuoteServer.java)
		- [`QuoteServerThread.java`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/QuoteServerThread.java)
		- [`one-liners.txt`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/one-liners.txt)
		- [`quoteApplet.html`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/quoteApplet.html)
2. Include the following HTML code in a web page to deploy `QuoteClientApplet`.
	```xml
	<script src=
	  "https://www.java.com/js/deployJava.js"></script>
	<script> 
	    var attributes =
	      { code:'QuoteClientApplet.class',  width:500, height:100} ; 
	    var parameters =
	      { codebase_lookup:'true', permissions:'sandbox' };
	    deployJava.runApplet(attributes, parameters, '1.6'); 
	</script>
	Alternatively, you can use the [`quoteApplet.html`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/quoteApplet.html) page that already contains this HTML code.
3. Compile the `QuoteClientApplet.java` class. Copy the generated class files to the same directory where you saved your web page.
4. Compile the classes for the server-side application, `QuoteServer.java` and `QuoteServerThread.java`.
5. Copy the file `one-liners.txt` to the directory that has the class files for the server-side application (generated in the previous step).
6. Start the server-side application.
	java QuoteServer
```text
	You should see a message with the port number, as shown in the following example. Note the port number.
```
	QuoteServer listening on port:3862
7. Open the web page containing your applet in a browser by entering the URL of the web page. The host name in the URL should be the same as the name of the host on which the server-side application is running.
	For example, if the server-side application is running on a machine named `JohnDoeMachine`, you should enter a similar URL. The exact port number and path will vary depending on your web server setup.
	http://JohnDoeMachine:8080/quoteApplet/quoteApplet.html
	```
	The `QuoteClientApplet` will be displayed on the web page.
8. Enter the port number of your server-side application in the applet's text field and click OK. A quotation is displayed.

Here is a screen capture of the applet in action.

![QuoteServer Sample Output](https://docs.oracle.com/javase/tutorial/figures/deployment/applet/19quote.png)

**`QuoteServer` Sample Output**
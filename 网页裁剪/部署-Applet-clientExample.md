Documentation

[Getting Started With Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/getStarted.html)

[Defining an Applet Subclass](https://docs.oracle.com/javase/tutorial/deployment/applet/subclass.html)

[Methods for Milestones](https://docs.oracle.com/javase/tutorial/deployment/applet/appletMethods.html)

[Life Cycle of an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/lifeCycle.html)

[Applet's Execution Environment](https://docs.oracle.com/javase/tutorial/deployment/applet/appletExecutionEnv.html)

[Developing an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/developingApplet.html)

[Deploying an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/deployingApplet.html)

[Deploying With the Applet Tag](https://docs.oracle.com/javase/tutorial/deployment/applet/html.html)

[Doing More With Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/doingMoreWithApplets.html)

[Finding and Loading Data Files](https://docs.oracle.com/javase/tutorial/deployment/applet/data.html)

[Defining and Using Applet Parameters](https://docs.oracle.com/javase/tutorial/deployment/applet/param.html)

[Displaying Short Status Strings](https://docs.oracle.com/javase/tutorial/deployment/applet/showStatus.html)

[Displaying Documents in the Browser](https://docs.oracle.com/javase/tutorial/deployment/applet/browser.html)

[Invoking JavaScript Code From an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingJavaScriptFromApplet.html)

[Invoking Applet Methods From JavaScript Code](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingAppletMethodsFromJavaScript.html)

[Handling Initialization Status With Event Handlers](https://docs.oracle.com/javase/tutorial/deployment/applet/appletStatus.html)

[Manipulating DOM of Applet's Web Page](https://docs.oracle.com/javase/tutorial/deployment/applet/manipulatingDOMFromApplet.html)

[Writing Diagnostics to Standard Output and Error Streams](https://docs.oracle.com/javase/tutorial/deployment/applet/stdout.html)

[Developing Draggable Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/draggableApplet.html)

[Communicating With Other Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/iac.html)

[Working With a Server-Side Application](https://docs.oracle.com/javase/tutorial/deployment/applet/server.html)

Network Client Applet Example

[What Applets Can and Cannot Do](https://docs.oracle.com/javase/tutorial/deployment/applet/security.html)

[Solving Common Applet Problems](https://docs.oracle.com/javase/tutorial/deployment/applet/problemsindex.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/deployment/applet/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/server.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/applet/security.html)

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
	```
	<script src=
	  "https://www.java.com/js/deployJava.js"></script>
	<script> 
	    var attributes =
	      { code:'QuoteClientApplet.class',  width:500, height:100} ; 
	    var parameters =
	      { codebase_lookup:'true', permissions:'sandbox' };
	    deployJava.runApplet(attributes, parameters, '1.6'); 
	</script>
	```
	Alternatively, you can use the [`quoteApplet.html`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/quoteApplet.html) page that already contains this HTML code.
3. Compile the `QuoteClientApplet.java` class. Copy the generated class files to the same directory where you saved your web page.
4. Compile the classes for the server-side application, `QuoteServer.java` and `QuoteServerThread.java`.
5. Copy the file `one-liners.txt` to the directory that has the class files for the server-side application (generated in the previous step).
6. Start the server-side application.
	```
	java QuoteServer
	```
	You should see a message with the port number, as shown in the following example. Note the port number.
	```
	QuoteServer listening on port:3862
	```
7. Open the web page containing your applet in a browser by entering the URL of the web page. The host name in the URL should be the same as the name of the host on which the server-side application is running.
	For example, if the server-side application is running on a machine named `JohnDoeMachine`, you should enter a similar URL. The exact port number and path will vary depending on your web server setup.
	```
	http://JohnDoeMachine:8080/quoteApplet/quoteApplet.html
	```
	The `QuoteClientApplet` will be displayed on the web page.
8. Enter the port number of your server-side application in the applet's text field and click OK. A quotation is displayed.

Here is a screen capture of the applet in action.

![QuoteServer Sample Output](https://docs.oracle.com/javase/tutorial/figures/deployment/applet/19quote.png)

**`QuoteServer` Sample Output**
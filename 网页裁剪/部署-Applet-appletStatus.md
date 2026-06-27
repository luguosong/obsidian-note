---
分类:
  - "网页裁剪"
标题: "Handling Initialization Status With Event Handlers  (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/appletStatus.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Handling Initialization Status With Event Handlers  (The Java™ Tutorials >        
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

Handling Initialization Status With Event Handlers

[[部署-Applet-manipulatingDOMFromApplet|Manipulating DOM of Applet's Web Page]]

[[部署-Applet-stdout|Writing Diagnostics to Standard Output and Error Streams]]

[[部署-Applet-draggableApplet|Developing Draggable Applets]]

[[部署-Applet-iac|Communicating With Other Applets]]

[[部署-Applet-server|Working With a Server-Side Application]]

[[部署-Applet-clientExample|Network Client Applet Example]]

[[部署-Applet-安全|What Applets Can and Cannot Do]]

[[部署-Applet-problemsindex|Solving Common Applet Problems]]

[[部署-Applet-questions|Questions and Exercises]]

[[部署-Applet-invokingAppletMethodsFromJavaScript|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-manipulatingDOMFromApplet|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Handling Initialization Status With Event Handlers

An applet cannot handle requests from JavaScript code in the web page until the applet has been initialized. A call to an applet method or access to an applet variable from JavaScript code will be blocked until the applet's `init()` method is complete or the applet first invokes JavaScript code from the web page in which it is deployed. As the JavaScript implementation is single-threaded in many browsers, the web page may appear to be frozen during applet startup.

Beginning in the JDK 7 release, you can check the `status` variable of the applet while it is loading to determine if the applet is ready to handle requests from JavaScript code. You can also register event handlers that will automatically be invoked during various stages of applet initialization. To leverage this functionality, the applet should be deployed with the `java_status_events` parameter set to `"true"`.

In the Status and Event Handler example, JavaScript code registers an `onLoad` handler with the applet. The `onLoad` handler is automatically invoked by the Java Plug-in software when the applet has been initialized. The `onLoad` handler invokes other methods of the applet to draw the graph on the web page. The `init` method of the [`` `DrawingApplet` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_StatusAndCallback/src/DrawingApplet.java) class sleeps for two seconds to simulate a long applet initialization period.

The following steps describe how to register event handlers and check an applet's status. See [Applet Status and Event Handlers](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/applet_dev_guide.html#JSDPG719) for a complete list of applet status values and applet events for which event handlers can be registered.

1. Create a JavaScript function to register event handlers. The following code snippet shows the `registerAppletStateHandler` function that registers an `onLoad` event handler if the applet has not already loaded.
	```xml
	<script>
	<!-- ... -->
	    var READY = 2;
	    function registerAppletStateHandler() {
	        // register onLoad handler if applet has
	        // not loaded yet
	        if (drawApplet.status < READY)  {                 
	            drawApplet.onLoad = onLoadHandler;
	        } else if (drawApplet.status >= READY) {
	            // applet has already loaded or there
	            // was an error
	            document.getElementById("mydiv").innerHTML = 
	              "Applet event handler not registered because applet status is: "
	               + drawApplet.status;    
	        }
	    }
	    
	    function onLoadHandler() {
	        // event handler for ready state
	        document.getElementById("mydiv").innerHTML =
	            "Applet has loaded";
	        draw();
	    }
	<!-- ... -->
	</script>
2. Invoke the previously created `registerAppletStateHandler` function in the `body` tag's onload method. This ensures that the HTML tag for the applet has been created in the Document Object Model (DOM) tree of the web page before the applet's event handlers are registered.
	```html
	<body onload="registerAppletStateHandler()">
3. Deploy the applet with the `java_status_events` parameter set to `"true"`.
	```xml
	<script src=
	  "https://www.java.com/js/deployJava.js"></script>
	<script>
	    // set java_status_events parameter to true 
	    var attributes = { id:'drawApplet',
	        code:'DrawingApplet.class',
	        archive: 'applet_StatusAndCallback.jar',
	        width:600, height:400} ;
	    var parameters = {java_status_events: 'true', permissions:'sandbox' } ;
	    deployJava.runApplet(attributes, parameters, '1.7');
	</script>
	```

Open [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_StatusAndCallback/AppletPage.html) in a browser to view the behavior of applet event handlers. In the [`` `AppletPageUpdatedDuringLoading.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_StatusAndCallback/AppletPageUpdatedDuringLoading.html) page, the `status` variable of the applet is checked to determine if the applet has been loaded. Based on the status, the web page is continuously updated while the applet is being loaded.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

[[部署-Applet-examplesIndex|Download source code]] for the *Status and Event Handler* example to experiment further.
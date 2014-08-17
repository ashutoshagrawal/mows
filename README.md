mows
====

MQTT Over Websockets Client Library

based on 

http://git.eclipse.org/c/paho/org.eclipse.paho.mqtt.javascript.git/plain/src/mqttws31.js 

Send and receive messages using Node.js clients

<p>

This programming interface lets a Node client application use the MQTT V3.1 protocol to
connect to an MQTT-supporting messaging server.

The function supported includes:
<ol>
<li>Connecting to and disconnecting from a server. The server is identified by its host name and port number.
<li>Specifying options that relate to the communications link with the server,
for example the frequency of keep-alive heartbeats, and whether SSL/TLS is required.
<li>Subscribing to and receiving messages from MQTT Topics.
<li>Publishing messages to MQTT Topics.
</ol>
<p>
<h2>The API consists of two main objects:</h2>
The <b>Messaging.Client</b> object. This contains methods that provide the functionality of the API,
including provision of callbacks that notify the application when a message arrives from or is delivered to the messaging server,
or when the status of its connection to the messaging server changes.
<p>
The <b>Messaging.Message</b> object. This encapsulates the payload of the message along with various attributes
associated with its delivery, in particular the destination to which it has been (or is about to be) sent.
<p>
The programming interface validates parameters passed to it, and will throw an Error containing an error message
intended for developer use, if it detects an error with any parameter.
<p>

<b>
Installation:
</b></br>
npm install mqtt_over_websockets

</br></br>
<b>Includes:
</b></br>
var Messaging = require("mqtt_over_websockets");
</br></br>


<b>
Sample Working Complete Source Code
</b>

<pre><code>


var Messaging = require("mqtt_over_websockets");

var wsClient = null;

function defaultClientId(){
	return "WS" + (Math.random() + 1).toString(36).substring(10);
	//return "WScoj8xgvi";
}

// the client is notified when it is connected to the server.
var onConnect = function(frame) {
	console.log("WS:Connected:Successfully");
	wsClient.subscribe('/Ashutosh');
	var message = new Messaging.Message("JAI GANESH JI MAHARAJ KI JAI");
	message.destinationName = "/Ashutosh";
  	wsClient.send(message);
};


function onFailure(failure) {
	console.log("WS:Failure:" + failure.errorMessage);
}

function onMessageArrived(message) {
	console.log("WS:Message Arrived: Topic:" + message.destinationName + ":Msg:" + message.payloadString);
}

function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("WS:Connection Lost:"  + wsClient.clientId + ": " + responseObject.errorCode + "\n");
	}
}

var PLATFORM_IP 			= 'SERVER-IP';
var PLATFORM_PORT 			= SERVER-PORT;
var CLIENT_ID 				= defaultClientId();
var USER 				= 'USER-ID';
var PASSWD 				= 'PASSWORD';


function doConnection(ip,port,clientId,username,passwd){
	console.log("Default Client-Id:" + clientId);
	wsClient = new Messaging.Client(ip, port , clientId);
	wsClient.onConnect = onConnect;
	wsClient.onMessageArrived = onMessageArrived;
	wsClient.onConnectionLost = onConnectionLost;
	wsClient.connect({userName: username, password:passwd, onSuccess:onConnect, onFailure:onFailure});
}

doConnection(PLATFORM_IP,PLATFORM_PORT,CLIENT_ID,USER,PASSWD);


</code></pre>

mows
====

MQTT Over Websockets Client Library

based on 

http://git.eclipse.org/c/paho/org.eclipse.paho.mqtt.javascript.git/plain/src/mqttws31.js 

Send and receive messages using web browsers.

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

Example:

<code><pre>

client = new Messaging.Client(location.hostname, Number(location.port), "clientId");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/World");
  message = new Messaging.Message("Hello");
  message.destinationName = "/World";
  client.send(message);
};
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
    console.log("onConnectionLost:"+responseObject.errorMessage);
};
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  client.disconnect();
};
</pre></code>

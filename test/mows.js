/*!
 * Copyright(c) 2014 Ashutosh Agrawal <ashutoshkagrawal@gmail.com>
 * EPL Licensed
 */


var Messaging = require("../index");

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

var PLATFORM_IP 			= 'MYIP';
var PLATFORM_PORT 			= 61614;
var CLIENT_ID 				= defaultClientId();
var USER 				= 'MY-USER';
var PASSWD 				= 'MY-PASSWORD';


function doConnection(ip,port,clientId,username,passwd){
	console.log("Default Client-Id:" + clientId);
	wsClient = new Messaging.Client(ip, port , clientId);
	wsClient.onConnect = onConnect;
	wsClient.onMessageArrived = onMessageArrived;
	wsClient.onConnectionLost = onConnectionLost;
	wsClient.connect({userName: username, password:passwd, onSuccess:onConnect, onFailure:onFailure});
}

doConnection(PLATFORM_IP,PLATFORM_PORT,CLIENT_ID,USER,PASSWD);



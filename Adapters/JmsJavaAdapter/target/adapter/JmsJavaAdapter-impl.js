/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */


function getAllMessages(token) {
	if(token ==  MFP.Server.getPropertyValue("tokens.jmsAdapter")){
		var rawMessagesAsString = com.ibm.tipcojms.JmsConsumer.getAllMessages(
				 MFP.Server.getPropertyValue("jmsQueue.url"),
				MFP.Server.getPropertyValue("jmsQueue.name"),
				MFP.Server.getPropertyValue("jmsQueue.username"),
				MFP.Server.getPropertyValue("jmsQueue.password"), 1000);
		//Remove Namespace from property names
		var rawMessagesWoNS = rawMessagesAsString.replace(/(")\w+:(\w+":)/g,"$1$2");
		var rawMessageArray = rawMessagesWoNS.split('|%|');
		var processedMessages = new Array();
		for (var i=0; i<rawMessageArray.length;i++){
			if(rawMessageArray[i]){
				try{
					var messageObj = eval('(' + rawMessageArray[i] + ')');
					processedMessages.push(messageObj);
				}
				catch(e){
				}
			}
		}
		return {result:processedMessages};
	}
	else{
		return {isSuccessful: false};
	}
}

function sendBroadcastNotification(applicationId, notificationText,payload) {
	var notificationOptions = getNotificationOptions(notificationText,null,payload);
	MFP.Logger.warn("|broadCastNotification |sendBroadcastNotification |notificationOptions: " + JSON.stringify(notificationOptions));
	var response = WL.Server.sendMessage(applicationId, notificationOptions);
	MFP.Logger.warn("|broadCastNotification |sendBroadcastNotification |response: " + JSON.stringify(response));
	return {
		result : "Notification sent to all users."
	};
}

function sendTagNotification(applicationId,notificationText, notificationTags,payload) {
	var notificationOptions = getNotificationOptions(notificationText, notificationTags,payload);
	WL.Server.sendMessage(applicationId, notificationOptions);
	return {
		result : "Notification sent to users subscribed to the tag(s): '" + notificationTags + "'." 
	};
}

/*function sendStandardNotification(applicationId,title,body, notificationTag) {
	try{
	var messageBody="";
	if(body){
		var test={"category":"hospitals",
			"details":[{"msg":"accident near NMC","lat":"25.27932696","lng":"55.385158"},
			           {"msg":"accident near Zelikhia","lat":"25.20783080","lng":"55.373171"}]}
		var parseBody=JSON.parse(body);
		if(parseBody&&parseBody.details&&parseBody.details.length>0){
			for(var i=0;i<parseBody.details.length;i++){
				messageBody=messageBody+parseBody.details[i].msg+"\n";
			}
		}
		
		
	}
	var payload=body;
	return{
		applicationId:applicationId,
		notificationTag:notificationTag,
		payload:payload,
		messageBody:messageBody
	}
	var notificationOptions = getNotificationOptions(messageBody, notificationTag,payload);
	
	WL.Server.sendMessage(applicationId, notificationOptions);
	return {
		result : "Notification sent to users subscribed to the tag(s): '" + notificationTag + "'." 
	};
	}
	catch(e){
		return {
			error:e
		}
	}
}*/



function generateNotificationOptions(notificationText, notificationTags,payload){
	var badgeDigit = 1;
	var notificationOptions = WL.Server.createDefaultNotification(notificationText, badgeDigit, payload);
	
	if(notificationTags != undefined && notificationTags != null){
		var tags = notificationTags.split(",");
		notificationOptions.target.tagNames = tags;
	}
	notificationOptions.apns.sound = "default";
	
	return notificationOptions;
}
function getNotificationOptions(notificationText, notificationTags,payload){

	var notificationOptions = {};

	notificationOptions.message = {};
	notificationOptions.target = {};
	notificationOptions.settings={};

	if(notificationTags != undefined && notificationTags != null){
		var tags = notificationTags.split(",");
		notificationOptions.target.tagNames = tags;
	}

	notificationOptions.message.alert = notificationText;




//	notificationOptions.target = {};
//	notificationOptions.target.tagNames = ['Tag1','Tag2'];

//	// set notification properties for GCM
	notificationOptions.settings = {};
	notificationOptions.settings.gcm = {};
	notificationOptions.settings.gcm.category = "status";
	notificationOptions.settings.gcm.payload = payload;//{"custom":"data"};

//	// set notification properties for APNS
//	notificationOptions.settings.apns = {};
//	notificationOptions.settings.apns.badge = 1;
//	notificationOptions.settings.apns.sound = mySound;
	notificationOptions.settings.apns = {};
	notificationOptions.settings.apns.badge = 0;
	notificationOptions.settings.apns.sound = "default";


//	notificationOptions.settings.apns.actionKey ="Ok Man";
	notificationOptions.settings.apns.payload = payload;//{"custom":"data"};

//	iosActionKey for V 8.0



//	// set raw notification properties for MPNS
//	notificationOptions.settings.mpns = {};
//	notificationOptions.settings.mpns.raw = {};
//	notificationOptions.settings.mpns.raw.payload = {"custom":"data"};

//	// set toast notification properties for MPNS
//	notificationOptions.settings.mpns.toast = {};
//	notificationOptions.settings.mpns.toast.text1 = "Toast title";
//	notificationOptions.settings.mpns.toast.text2 = "Toast content";

//	// set tile notification properties for MPNS
//	notificationOptions.settings.mpns.tile = {};
//	notificationOptions.settings.mpns.tile.title = notificationText ;
//	notificationOptions.settings.mpns.tile.count = 1;

//	// set raw notification properties for WNS
//	notificationOptions.settings.wns = {};
//	notificationOptions.settings.wns.raw = {};
//	notificationOptions.settings.wns.raw.payload = {"custom":"data"};

//	// set toast notification properties for WNS
//	notificationOptions.settings.wns.toast = {};
//	notificationOptions.settings.wns.toast.launch = {"custom":"data"};
//	notificationOptions.settings.wns.toast.visual = {};
//	notificationOptions.settings.wns.toast.visual.binding = {};
//	notificationOptions.settings.wns.toast.visual.binding.template="ToastText04";
//	notificationOptions.settings.wns.toast.visual.binding.text=[{"content":"Text1"},{"content":"Text2"},{"content":"Text3"}];

//	// set tile notification properties for WNS
//	notificationOptions.settings.wns.tile = {};
//	notificationOptions.settings.wns.tile.visual = {};
//	notificationOptions.settings.wns.tile.visual.binding=[{"template":"TileSquareText04", "text": [{"content":"Text1"}]}, {"template":"TileWideText04","text": [{"content":"Text1"}]}];

//	// set badge notification properties for WNS
//	notificationOptions.settings.wns.badge = {};
//	notificationOptions.settings.wns.badge.value = 10; 

	return notificationOptions;
}


function test (){
	var notificationText = "helllllllo";
	var badgeDigit = 1;
	var notification = WL.Server.createDefaultNotification(notificationText, badgeDigit, {custom:"data"});
	return notification;
}
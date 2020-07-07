var REQ_PORTAL_USER_NAME = MFP.Server.getPropertyValue("tokens.portal.vendorUsername");
var REQ_PORTAL_PASSWORD = MFP.Server.getPropertyValue("tokens.portal.vendorPassword");

function sendBroadcastNotification(applicationId, notificationText,payload) {
	var request = MFP.Server.getClientRequest();	
	var isAuthorizedResponse = this._isAuthorized(request);

	if(isAuthorizedResponse.authRequired == false) {
		    var status=0;// inital value 
			var dateNow = new Date();
			var NotifcationDate=dateNow;
			var title_en="title_en";
			var body_en=notificationText;
			var app_Id=applicationId;
			var icon_name="icon-accident";
			var action_url="";
			var title_ar="title_ar";
			var body_ar=notificationText;
			var type="RoadInfo";
			var payload=payload;
			var tagName="general-notification";
			
			
			//["Parking ","Parking 60 free all day from 25 June to 27 June 2018 ","مواقف  سيارات","مواقف السيارات مجانية طوال اليوم من 25 يونيو إلى 27 يونيو 2018
			//","NationalDay","RTA_Common_Shell","icon-service-parking","null ","29-OCT-18 09.22.34.837000000 AM",{"s":"122"},"general-notification"]
			var invocationData = {
					adapter : 'NotificationsAdapter',
					procedure : 'SendNotificationByTag',
					parameters : [title_en , body_en,title_ar,body_ar,type , app_Id ,
							icon_name , action_url, NotifcationDate, payload ,tagName]
			};
			//adapterLogger("sendBroadcastNotification", "info", "InvocationData",toString(invocationData));
			//MFP.Logger.info("|userProfile |setUserInfoForProfile |invocationData: " + JSON.stringify(invocationData) );

			var shellDatabaseResponse = MFP.Server.invokeProcedure(invocationData);
			
			if (shellDatabaseResponse && shellDatabaseResponse.isSuccessful) {
				
				return {
					success : true,
					isSuccessful : true
				};
			}
		
		/*var notificationOptions = getNotificationOptions(notificationText,null,payload);
		MFP.Logger.warn("|broadCastNotification |sendBroadcastNotification |notificationOptions: " + JSON.stringify(notificationOptions));
		var response = WL.Server.sendMessage(applicationId, notificationOptions);
		MFP.Logger.warn("|broadCastNotification |sendBroadcastNotification |response: " + JSON.stringify(response));
		return {
			result : "Notification sent to all users."
		};*/
	}
	return isAuthorizedResponse;
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


	notificationOptions.settings.apns.payload = payload;//{"custom":"data"};

	return notificationOptions;
}


function _isAuthorized(request) {
	var requestHeader = request.getHeader("Authorization");
	try {
		if (requestHeader) {
			var requestHeaderDecoded = requestHeader.split(' ')[1];
			if (requestHeaderDecoded) {
				var requestHeaderEncoded = new java.lang.String(org.apache.commons.codec.binary.Base64().decodeBase64(requestHeaderDecoded));
				var credentials = requestHeaderEncoded.split(":");
				var username = credentials[0];
				var password = credentials[1];
				
				if (username == REQ_PORTAL_USER_NAME && password == REQ_PORTAL_PASSWORD) {
					return {
						authRequired : false
					};
				}
			}
		}
	} catch (e){
		
	}
	return {
		isSuccessful : false,
		authRequired : true,
		errorCode : "401",
		errorMessage : "Not Authorized"
	};
}
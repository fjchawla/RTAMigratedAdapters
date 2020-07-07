
var DB_TABLES = {
		'GENERALNOTIFICATIONS' : {
			sqlInsert : 'INSERT INTO GENERAL_NOTIFICATIONS(STATUS, TITLE_EN, BODY_EN, APP_ID, ICON_NAME, ACTION_URL,Create_Date, TITLE_AR, BODY_AR,TYPE,NOTIFICATION_DATE,PAYLOAD) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
			sqlALL : 'select TITLE_EN "Title_En", CREATE_DATE "Create_Date",ICON_NAME "Icon_Name", STATUS "Status", SEND_DATE "Send_Date",ACTION_URL "Action_URL",BODY_EN "Body_En", TITLE_AR "Title_Ar", APP_ID "App_Id",ID "Id",BODY_AR "Body_Ar",TYPE "Type",NOTIFICATION_DATE "NotificationDate" FROM GENERAL_NOTIFICATIONS',
			sqlLastMonth : 'select TITLE_EN "Title_En", CREATE_DATE "Create_Date",ICON_NAME "Icon_Name", STATUS "Status", SEND_DATE "Send_Date",ACTION_URL "Action_URL",BODY_EN "Body_En", TITLE_AR "Title_Ar", APP_ID "App_Id",ID "Id",BODY_AR "Body_Ar",TYPE "Type" ,NOTIFICATION_DATE "NotificationDate", PAYLOAD "Payload" from GENERAL_NOTIFICATIONS WHERE Create_Date >=? AND Status=1 AND App_Id=? ORDER BY Create_Date DESC',
			sqlUpdate : "UPDATE GENERAL_NOTIFICATIONS SET STATUS=?, SEND_DATE=? WHERE STATUS=? AND Create_Date=?",
		},
		'PREFERRED_LOCATIONS':{
			sqlInsert : 'INSERT INTO PREFERRED_LOCATIONS(USERID, NORTHEAST , SOUTHWEST , ISDELETED , CREATIONDATE) VALUES (?,?,?,?,?)',
			sqlByUserId: 'select USERID "userId", NORTHEAST "northEast" , SOUTHWEST  "southWest", ISDELETED "isDeleted", CREATIONDATE "creationDate" FROM PREFERRED_LOCATIONS  WHERE USERID >=?',
			sqlUpdate: 'UPDATE PREFERRED_LOCATIONS SET USERID=?, NORTHEAST=? , SOUTHWEST=? , ISDELETED=? , CREATIONDATE=?   WHERE USERID =?',
			sqlALL : 'select * FROM PREFERRED_LOCATIONS',
			deleteUser : 'DELETE FROM PREFERRED_LOCATIONS WHERE USERID =? '
		},
		'UserNOTIFICATIONS' : {
			sqlInsert : 'INSERT INTO USER_NOTIFICATIONS(STATUS, TITLE_EN, BODY_EN, APP_ID, ICON_NAME, ACTION_URL,Create_Date, TITLE_AR, BODY_AR,TYPE,NOTIFICATION_DATE,USERID,SERVICEID,PAYLOAD) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
			sqlALL : 'select TITLE_EN "Title_En", CREATE_DATE "Create_Date",ICON_NAME "Icon_Name", STATUS "Status", SEND_DATE "Send_Date",ACTION_URL "Action_URL",BODY_EN "Body_En", TITLE_AR "Title_Ar", APP_ID "App_Id",ID "Id",BODY_AR "Body_Ar",TYPE "Type",NOTIFICATION_DATE "NotificationDate",USERID "UserId",SERVICEID "ServiceID" FROM USER_NOTIFICATIONS',
			sqlLastMonth : 'select TITLE_EN "Title_En", CREATE_DATE "Create_Date",ICON_NAME "Icon_Name", STATUS "Status", SEND_DATE "Send_Date",ACTION_URL "Action_URL",BODY_EN "Body_En", TITLE_AR "Title_Ar", APP_ID "App_Id",ID "Id",BODY_AR "Body_Ar",TYPE "Type" ,NOTIFICATION_DATE "NotificationDate", USERID "UserId",SERVICEID "ServiceID", PAYLOAD "Payload" from USER_NOTIFICATIONS WHERE Create_Date >=? AND Status=1 AND App_Id=? AND USERID=? ORDER BY Create_Date DESC',
			sqlUpdate : "UPDATE USER_NOTIFICATIONS SET STATUS=?, SEND_DATE=? WHERE STATUS=? AND Create_Date=?",
		}
}
var REQ_PORTAL_USER_NAME = MFP.Server.getPropertyValue("tokens.portal.vendorUsername");
var REQ_PORTAL_PASSWORD = MFP.Server.getPropertyValue("tokens.portal.vendorPassword");


function insertUserPreferredLocation(userId,northEast,southWest){
	try{
		var  isDeleted=0// not deleted
		var creationDate=new Date();
		var saveduserId=MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['PREFERRED_LOCATIONS'].sqlByUserId,
			parameters : [userId]
		});

		if(saveduserId&&saveduserId.isSuccessful==true && saveduserId.resultSet&&saveduserId.resultSet.length>0){
			WL.Logger.info(" AdapterName  NoticationAdapter ::procedure insertUserPreferredLocation ::Insert User Location Parms:: "+JSON.stringify([userId,northEast,southWest]));
			var insertResult=MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['PREFERRED_LOCATIONS'].sqlUpdate,
				parameters : [userId,northEast,southWest,isDeleted,creationDate,userId]
			});
			WL.Logger.info(" AdapterName  NoticationAdapter ::procedure insertUserPreferredLocation ::insertResult:: "+JSON.stringify(insertResult));
			return {
				"result":true
			}
		}
		else{
			// insert new record Update
			WL.Logger.info(" AdapterName  NoticationAdapter ::procedure insertUserPreferredLocation ::Insert User Location Parms:: "+JSON.stringify([userId,northEast,southWest]));
			var insertResult=MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['PREFERRED_LOCATIONS'].sqlInsert,
				parameters : [userId,northEast,southWest,isDeleted,creationDate]
			});
			WL.Logger.info(" AdapterName  NoticationAdapter ::procedure insertUserPreferredLocation ::insertResult:: "+JSON.stringify(insertResult));
			return {
				"result":true
			}		
		}

	}
	catch(e){
		WL.Logger.error(" AdapterName  NoticationAdapter ::procedure insertUserPreferredLocation :: Error "+e)
		return  {
			"error":e,
			"result":false
		};
	}
}

function deletePreferredLocation(userId){
	try{
		var deleteUser=	MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['PREFERRED_LOCATIONS'].deleteUser,
			parameters : [userId]
		});
		return {
			"deleted":true
		}	
	}
	catch(e)
	{
		WL.Logger.error(" AdapterName  NoticationAdapter ::procedure deletePreferredLocation :: Error "+e)
		return  {
			"error":e,
			"result":false
		};
	}
}

function getAllPreferredLocations(){
	try{
		var selectResult=	MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['PREFERRED_LOCATIONS'].sqlALL,
			parameters : []
		});

		return {
			"LocationList":selectResult
		}
	}
	catch(e){
		WL.Logger.error(" AdapterName  NoticationAdapter ::procedure getAllPreferredLocations :: Error "+e)
		return  {
			"LocationList":[]
		};
	}
}


function SelectByUserId(userId){
	try{
		WL.Logger.info(" AdapterName  NoticationAdapter ::procedure SelectByUserId ::Parms:: "+JSON.stringify(userId));
		var selectResult=	MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['PREFERRED_LOCATIONS'].sqlByUserId,
			parameters : [userId]
		});
		WL.Logger.info(" AdapterName  NoticationAdapter ::procedure SelectByUserId ::Parms:: "+JSON.stringify(selectResult));
		return {
			"result":selectResult
		}
	}
	catch(e){
		WL.Logger.error(" AdapterName  NoticationAdapter ::procedure SelectByUserId :: Error "+e)
		return  {
			"result":false
		};
	}
}

function InsertNotification(status , title_en , body_en , app_Id , icon_name , action_url,title_ar,body_ar,type,NotifcationDate,payload)
{
	try{
		var request = WL.Server.getClientRequest();
		var isAuthorizedResponse = this._isAuthorized(request);
		if(isAuthorizedResponse.authRequired == false) {
			var dateNow = new Date();
			var insertedDate=dateNow;
			WL.Logger.warn("|NotificationsAdapter |InsertNotification Parms "+"Status: "+status +"/"+ "Title_en: "+ title_en +"/"+ "Body_en: "+body_en +"/"+ 
					"App_Id"+app_Id +"/"+"Icon_name: "+icon_name +"/"+ "Action_url:"+ action_url  +"/"+ "Title_ar: " + title_ar +"/"+
					"Body_ar: "+body_ar +"/"+"Type: "+type +"/"+"NotifcationDate: "+NotifcationDate);

			var result= MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['GENERALNOTIFICATIONS'].sqlInsert,
				parameters : [status,title_en,body_en,app_Id,icon_name,action_url,dateNow,title_ar,body_ar,type,NotifcationDate]
			});

			if (result &&result.updateStatementResult&&result.updateStatementResult.updateCount>0) {
				// call broad cast adapter 
				notificationText= title_en + "\r\n "+body_en;
				result={"result":"Notification isn't sent successful"};
				var invocationData = {
						adapter : 'broadCastPush',
						procedure : 'sendBroadcastNotification',
						parameters : [app_Id, notificationText,payload]
				};
				pushAdpterResult= WL.Server.invokeProcedure(invocationData);
				WL.Logger.info("NoticationAdapter :: InsertNotification ::Send Broadcast Notification  result "+ JSON.stringify(pushAdpterResult));
				if(pushAdpterResult)
				{

					WL.Logger.info(" AdapterName  NoticationAdapter ::procedure InsertNotification ::Update Notification Table With Success Sent   "+JSON.stringify(pushAdpterResult)+" Update Message sent to success ");
					MFP.Server.invokeSQLStatement({
						preparedStatement : DB_TABLES['GENERALNOTIFICATIONS'].sqlUpdate,
						parameters : [1,dateNow,0,insertedDate]
					});

					result={"result":"Notification is sent successful "};
				}
				else{
					WL.Logger.info("NoticationAdapter :: InsertNotification :: Update Notification Table With  Fail to sent ");
					// Update DB with Status sent 2 is fail  
					MFP.Server.invokeSQLStatement({
						preparedStatement : DB_TABLES['GENERALNOTIFICATIONS'].sqlUpdate,
						parameters : [2,dateNow,0,insertedDate]
					});
					result={"result":"Notification isnot sent successful"}
				}
				return result;
			}

			return {
				isSuccessful : false,
				resultSet : []
			};
		}
		return isAuthorizedResponse;
	}
	catch(e){
		WL.Logger.error(" AdapterName  NoticationAdapter ::procedure InsertNotification :: Error "+e)
		return {
			isSuccessful : false,
			resultSet : []
		};
	}
}


function SendNotificationByTag(title_en , body_en,title_ar,body_ar,type , app_Id , icon_name , action_url, NotifcationDate, payload ,tagName)
{
	try{
		var request = WL.Server.getClientRequest();	
		var isAuthorizedResponse = this._isAuthorized(request);
		if(isAuthorizedResponse.authRequired == false) {
			var status=0;// inital value 
			var dateNow = new Date();
			var insertedDate=dateNow;
			WL.Logger.warn("|NotificationsAdapter |SendNotificationByTag Parms "+"Status: "+status +"/"+ "Title_en: "+ title_en +"/"+ "Body_en: "+body_en +"/"+ 
					"App_Id"+app_Id +"/"+"Icon_name: "+icon_name +"/"+ "Action_url:"+ action_url  +"/"+ "Title_ar: " + title_ar +"/"+
					"Body_ar: "+body_ar +"/"+"Type: "+type +"/"+"NotifcationDate: "+NotifcationDate + "/" +"payload"+payload);

			var result= MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['GENERALNOTIFICATIONS'].sqlInsert,
				parameters : [status,title_en,body_en,app_Id,icon_name,action_url,dateNow,title_ar,body_ar,type,NotifcationDate,payload]
			});

			if (result &&result.updateStatementResult&&result.updateStatementResult.updateCount>0) {
				// call broad cast adapter 
				notificationText= title_en + "\r\n "+body_en;
				result={"result":"Notification isn't sent successful"};
				// perparing Payload for dashBoard
				//TITLE_EN "Title_En", CREATE_DATE "Create_Date",ICON_NAME "Icon_Name", STATUS "Status", SEND_DATE "Send_Date",ACTION_URL "Action_URL",BODY_EN "Body_En", TITLE_AR "Title_Ar", APP_ID "App_Id",ID "Id",BODY_AR "Body_Ar",TYPE "Type" ,NOTIFICATION_DATE "NotificationDate", PAYLOAD "Payload" from GENERAL_NOTIFICATIONS
				var payloadObject={Status:status,Title_En:title_en,Body_En:body_en,App_Id:app_Id,Icon_Name:icon_name,Action_URL:action_url,Title_Ar:title_ar,Body_Ar:body_ar,Type:type,NotificationDate:NotifcationDate}
				var invocationData = {
						adapter : 'broadCastPush',
						procedure : 'sendTagNotification',
						parameters : [app_Id, notificationText,tagName,payloadObject]
				};
				pushAdpterResult= WL.Server.invokeProcedure(invocationData);
				WL.Logger.info("NoticationAdapter :: SendNotificationByTag ::Send Tag Notification  result "+ JSON.stringify(pushAdpterResult));
				if(pushAdpterResult)
				{

					WL.Logger.info(" AdapterName  NoticationAdapter ::procedure SendNotificationByTag ::Update Notification Table With Success Sent   "+JSON.stringify(pushAdpterResult)+" Update Message sent to success ");
					MFP.Server.invokeSQLStatement({
						preparedStatement : DB_TABLES['GENERALNOTIFICATIONS'].sqlUpdate,
						parameters : [1,dateNow,0,insertedDate]
					});

					result={"result":"Notification is sent successful "};
				}
				else{
					WL.Logger.info("NoticationAdapter :: SendNotificationByTag :: Update Notification Table With  Fail to sent ");
					// Update DB with Status sent 2 is fail  
					MFP.Server.invokeSQLStatement({
						preparedStatement : DB_TABLES['GENERALNOTIFICATIONS'].sqlUpdate,
						parameters : [2,dateNow,0,insertedDate]
					});
					result={"result":"Notification isnot sent successful"}

				}

				return result;
			}
			return {
				isSuccessful : false,
				resultSet : []
			};
		}
		return isAuthorizedResponse;
	}
	catch(e){
		WL.Logger.error(" AdapterName  NoticationAdapter ::procedure SendNotificationByTag :: Error "+e)
		return {
			isSuccessful : false,
			resultSet : []
		};
	}
}




function SendUserNotification(title_en , body_en,title_ar,body_ar,type , app_Id , icon_name , action_url, NotifcationDate, payload ,userId,serviceId)
{
	try{
		var request = WL.Server.getClientRequest();	
		var isAuthorizedResponse = this._isAuthorized(request);
		if(isAuthorizedResponse.authRequired == false) {
			var status=0;// inital value 
			var dateNow = new Date();
			var insertedDate=dateNow;
			WL.Logger.warn("|NotificationsAdapter |SendUserNotification Parms "+"Status: "+status +"/"+ "Title_en: "+ title_en +"/"+ "Body_en: "+body_en +"/"+ 
					"App_Id"+app_Id +"/"+"Icon_name: "+icon_name +"/"+ "Action_url:"+ action_url  +"/"+ "Title_ar: " + title_ar +"/"+
					"Body_ar: "+body_ar +"/"+"Type: "+type +"/"+"NotifcationDate: "+NotifcationDate + "/" +"payload"+payload);

			// change to new table for user 
			var result= MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['UserNOTIFICATIONS'].sqlInsert,
				parameters : [status,title_en,body_en,app_Id,icon_name,action_url,dateNow,title_ar,body_ar,type,NotifcationDate,userId,serviceId,payload]
			});

			if (result &&result.updateStatementResult&&result.updateStatementResult.updateCount>0) {
				// call broad cast adapter 
				notificationText= title_en + "\r\n "+body_en;
				result={"result":"Notification isn't sent successful"};
				var payloadObject={Status:status,Title_En:title_en,Body_En:body_en,App_Id:app_Id,Icon_Name:icon_name,Action_URL:action_url,Title_Ar:title_ar,Body_Ar:body_ar,Type:type,NotificationDate:NotifcationDate}
				//(userId, serviceId, notificationText){
				var invocationData = {
						adapter : 'PushAdapter',
						procedure : 'submitNotification',
						parameters : [userId, serviceId,body_en,payloadObject]
				};
				pushAdpterResult= WL.Server.invokeProcedure(invocationData);
				WL.Logger.info("NoticationAdapter :: SendUserNotification ::Send Tag Notification  result "+ JSON.stringify(pushAdpterResult));
				if(pushAdpterResult)
				{

					WL.Logger.info(" AdapterName  NoticationAdapter ::procedure SendUserNotification ::Update Notification Table With Success Sent   "+JSON.stringify(pushAdpterResult)+" Update Message sent to success ");
					MFP.Server.invokeSQLStatement({
						preparedStatement : DB_TABLES['UserNOTIFICATIONS'].sqlUpdate,
						parameters : [1,dateNow,0,insertedDate]
					});

					result={"result":"Notification is sent successful "};
				}
				else{
					WL.Logger.info("NoticationAdapter :: SendUserNotification :: Update Notification Table With  Fail to sent ");
					// Update DB with Status sent 2 is fail  
					MFP.Server.invokeSQLStatement({
						preparedStatement : DB_TABLES['UserNOTIFICATIONS'].sqlUpdate,
						parameters : [2,dateNow,0,insertedDate]
					});
					result={"result":"Notification isnot sent successful"}

				}

				return result;
			}
			return {
				isSuccessful : false,
				resultSet : []
			};
		}
		return isAuthorizedResponse;
	}
	catch(e){
		WL.Logger.error(" AdapterName  NoticationAdapter ::procedure SendUserNotification :: Error "+e)
		return {
			isSuccessful : false,
			resultSet : []
		};
	}

}


/*function SendStandardNotification(title_en , body_en,title_ar,body_ar,type , app_Id , icon_name , action_url, NotifcationDate, payload ,tagName){

	var request = WL.Server.getClientRequest();	
	var isAuthorizedResponse = this._isAuthorized(request);
	if(isAuthorizedResponse.authRequired == false) {
		var status=0;// inital value 
		var dateNow = new Date();
		var insertedDate=dateNow;
		WL.Logger.warn("|NotificationsAdapter |SendStandardNotification Parms "+"Status: "+status +"/"+ "Title_en: "+ title_en +"/"+ "Body: "+body+"/"+ 
				"App_Id"+app_Id +"/"+"Icon_name: "+icon_name +"/"+ "Action_url:"+ action_url  +"/"+ "Title_ar: " + title_ar +"/"
				+"/"+"Type: "+type +"/"+"NotifcationDate: "+NotifcationDate+"/"+"tagName"+tagName);

		return {
			body:body
		}
		var body_ar=null;
		var result= MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['GENERALNOTIFICATIONS'].sqlInsert,
			parameters : [status,title_en,body,app_Id,icon_name,action_url,dateNow,title_ar,body_ar,type,NotifcationDate]
		});

		if (result &&result.updateStatementResult&&result.updateStatementResult.updateCount>0) {
			// call broad cast adapter 
			//notificationText= title_en + "\r\n "+body;
			result={"result":"Notification isn't sent successful"};
			var invocationData = {
					adapter : 'broadCastPush',
					procedure : 'sendStandardNotification',
					parameters : [app_Id,title_en,body,tagName]
			};
			pushAdpterResult= WL.Server.invokeProcedure(invocationData);
			WL.Logger.info("NoticationAdapter :: InsertNotification ::Send Tag Notification  result "+ JSON.stringify(pushAdpterResult));
			if(pushAdpterResult)
			{

				WL.Logger.info(" AdapterName  NoticationAdapter ::procedure InsertNotification ::Update Notification Table With Success Sent   "+JSON.stringify(pushAdpterResult)+" Update Message sent to success ");
				MFP.Server.invokeSQLStatement({
					preparedStatement : DB_TABLES['GENERALNOTIFICATIONS'].sqlUpdate,
					parameters : [1,dateNow,0,insertedDate]
				});

				result={"result":"Notification is sent successful "};
			}
			else{
				WL.Logger.info("NoticationAdapter :: InsertNotification :: Update Notification Table With  Fail to sent ");
				// Update DB with Status sent 2 is fail  
				MFP.Server.invokeSQLStatement({
					preparedStatement : DB_TABLES['GENERALNOTIFICATIONS'].sqlUpdate,
					parameters : [2,dateNow,0,insertedDate]
				});
				result={"result":"Notification isnot sent successful"}

			}

			return result;
		}
		return {
			isSuccessful : false,
			resultSet : []
		};
	}
	return isAuthorizedResponse;



}*/

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
	} catch (e) {
	}

	return {
		isSuccessful : false,
		authRequired : true,
		errorCode : "401",
		errorMessage : "Not Authorized"
	};
}


function GetAllNotifications()
{
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['GENERALNOTIFICATIONS'].sqlALL,
		parameters : []
	});
}


function getLast30DaysNotifications(currentApp,userId) {
	try{
		if(currentApp){
			WL.Logger.error(" AdapterName  NoticationAdapter ::procedure getLast30DaysNotifications :: params UserId/"+userId)
			var currentDate=new Date();
			var startDate = new Date(currentDate.getTime() - 30*(1000 * 60 * 60 * 24));

			var userNotificationsList=[];
			if(userId){
				userNotificationsList=MFP.Server.invokeSQLStatement({
					preparedStatement : DB_TABLES['UserNOTIFICATIONS'].sqlLastMonth,
					parameters : [ startDate,currentApp,userId]
				});
			}
			var generalNotificationsList= MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['GENERALNOTIFICATIONS'].sqlLastMonth,
				parameters : [ startDate,currentApp]
			});
			return {
				UserNotificationsList:userNotificationsList,
				GeneralNotificationsList:generalNotificationsList
			}
		}
		return {
			isSuccessful : false,
			message:"UnValid parms",
			resultSet : []
		};
	}
	catch(e){
		WL.Logger.error(" AdapterName  NoticationAdapter ::procedure getLast30DaysNotifications :: Error "+e)
		return {
			isSuccessful : false,
			resultSet : []
		};
	}

}


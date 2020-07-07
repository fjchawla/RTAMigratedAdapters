/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
function adapterLogger(procudureName , type , suffix, msg ){
	var _msg = msg || "";
	try{
		var prefix= "|authenticationMaster |" + procudureName +" |"+ suffix + " : " ;
		switch(type){
		case "error":
			MFP.Logger.error(prefix + _msg);
			break;
		case "warn":
			MFP.Logger.warn(prefix+_msg);
			break;
		case "info":
			MFP.Logger.info(prefix+ _msg);
			break;
		}
	}catch(e){
		MFP.Logger.error("|authenticationMaster |adapterLogger |Exception" + JSON.stringify(e));
	}
}
function handleError(msg,code){
	var msg= msg || "Internal Server Error";
	var code =code||500;

//	adapterLogger("handleError","error", "Internal Error",JSON.stringify([msg,code]));

	return {
		"isSuccessful": false,
		"error": {
			"code": code,
			"message": msg,
			"adapter": "authenticationMaster",
			authRequired: true,
		}
	};
}
function onAuthRequired(headers, errorMessage) {

//	adapterLogger("onAuthRequired","info", "onAuthRequired headers",JSON.stringify([headers,errorMessage]));
	var _handleError= handleError("Unauthorized",401);
	_handleError.errorMessage = errorMessage ? errorMessage : null;
	_handleError.name = "authenticationMaster";
	_handleError.authRequired = true;
	return _handleError;
}

function onLogout(headers, errorMessage) {
	WL.Server.setActiveUser("masterAuthRealm", null);
	WL.Server.setActiveUser("AdapterAuthRealm", null);
	WL.Server.setActiveUser("AMAdapterAuthRealm", null);
	WL.Server.setActiveUser("UAEPassAdapterAuthRealm", null);
	return {
		name : "authenticationMaster"
	};
}
function heartbeat(){
	return {success:"true"}
}

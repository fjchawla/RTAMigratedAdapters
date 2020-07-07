/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var REQ_PORTAL_USER_NAME = MFP.Server.getPropertyValue("tokens.portal.vendorUsername");
var REQ_PORTAL_PASSWORD = MFP.Server.getPropertyValue("tokens.portal.vendorPassword");
var REQ_RECENT_ACTIVITIES_TOKEN = MFP.Server.getPropertyValue("tokens.recentActivities");

/**
 * Update user information
 * 
 * @param: String, String, String, String, String, String, String, String,
 *         String, String, String, Boolean
 * @returns: JSON object
 */
function setUserInfo(user_id, title, first_name, last_name,
		id_number, nationality, mobile, mail, preferred_language, preferred_communication,
		portal_id, password_changed_flag,isEmailVerified,isMobileVerified,isEmiratesIdVerified) {
	
	
	var request = MFP.Server.getClientRequest();
	var isAuthorizedResponse = this._isAuthorized(request);
	if(isAuthorizedResponse.authRequired == false) {
		if(password_changed_flag == true || password_changed_flag == "true" || password_changed_flag == "1" || password_changed_flag == 1) {
			password_changed_flag = 1;
		}
		else {
			password_changed_flag = 0;
		}
		
		var invocationData = {
			adapter : 'userProfile',
			procedure : 'setUserInfoForPortal',
			parameters : [ REQ_PORTAL_USER_NAME, REQ_PORTAL_PASSWORD, user_id, title, first_name, last_name, id_number, nationality, mobile, mail, preferred_language, preferred_communication, portal_id, password_changed_flag ,isEmailVerified,isMobileVerified,isEmiratesIdVerified]
		};

		return MFP.Server.invokeProcedure(invocationData, {
			onSuccess : function(response) {
				return response;
			},
			onFailure : function(response) {
				return {
					isSuccessful : false,
					errorCode: "INTERNAL_SERVER_ERROR",
					errorMessage: "Internal server error"
				};
			}
		});
	}
	
	return isAuthorizedResponse;
}



/**
 * Link user other Account (Parking Account or Nol Account, etc)
 *  You can use this operation as a linkage between user account in the back-end and the mobile user account 
 *  Please specify a label for this linkage
 *  The user will be given the option to delete or keep this linked accounts
 *  
 * @param: String, String, String, String
 * @returns: JSON object
 */
function setUserOtherAccount(user_id, label, service, parameters) {

	var request = MFP.Server.getClientRequest();
	var isAuthorizedResponse = this._isAuthorized(request);
	if(isAuthorizedResponse.authRequired == false) {
		var invocationData = {
			adapter : 'userProfile',
			procedure : 'setUserOtherAccountPortal',
			parameters : [ REQ_PORTAL_USER_NAME, REQ_PORTAL_PASSWORD, user_id, label, service, parameters ]
		};
	
		return MFP.Server.invokeProcedure(invocationData, {
			onSuccess : function(response) {
				return response;
			},
			onFailure : function(response) {
				return {
					isSuccessful : false,
					errorCode: "INTERNAL_SERVER_ERROR",
					errorMessage: "Internal server error"
				};
			}
		});
	}
	
	return isAuthorizedResponse;
}

/**
 * Unlink user other Account (Parking Account or Nol Account, etc)
 *  You can use this operation to delete linkage between user account in the back-end and the mobile user account 
 *  Please specify a label for this linkage deletion
 *  The user will be given the option to delete or keep this linked accounts
 *  
 * @param: String, String, String, String
 * @returns: JSON object
 */
function deleteUserOtherAccount(user_id, service) {

	var request = MFP.Server.getClientRequest();
	var isAuthorizedResponse = this._isAuthorized(request);
	if(isAuthorizedResponse.authRequired == false) {
		var invocationData = {
			adapter : 'userProfile',
			procedure : 'deleteUserOtherAccountPortal',
			parameters : [ REQ_PORTAL_USER_NAME, REQ_PORTAL_PASSWORD, user_id, service ]
		};
	
		return MFP.Server.invokeProcedure(invocationData, {
			onSuccess : function(response) {
				return response;
			},
			onFailure : function(response) {
				return {
					isSuccessful : false,
					errorCode: "INTERNAL_SERVER_ERROR",
					errorMessage: "Internal server error"
				};
			}
		});
	}
	
	return isAuthorizedResponse;
}


/**
 * This method will directly connect to DSG to obtain the transaction status that happened through ePay
 * 
 * @returns
 */
function ePayTransactionStatus(spTrn){
	var request = MFP.Server.getClientRequest();
	var isAuthorizedResponse = this._isAuthorized(request);
	if(isAuthorizedResponse.authRequired == false) {
		var spCode = MFP.Server.getPropertyValue("epay.DSGOptions.SPCODE");
		var servCode = "MApp";
		
		var invocationData = {
			adapter : 'ePayAdapter',
			procedure : 'getTransactionStatusWithoutRecording',
			parameters : [ spCode,servCode,spTrn ]
		};
	
		var result = MFP.Server.invokeProcedure(invocationData);
		if(result && result.result) {
			_updateEPayStatus(result.result, spTrn);
		}
		
		return result;
	}
	
	return isAuthorizedResponse;
}

/**
 * This method will directly connect to DSG to obtain the transaction status that happened through ePay
 * 
 * @returns
 */
function ePayTransactionStatusInternal(userId, spTrn, token){
	if(token == REQ_RECENT_ACTIVITIES_TOKEN) {
		var spCode = MFP.Server.getPropertyValue("epay.DSGOptions.SPCODE");
		var servCode = "MApp";
		
		var invocationData = {
			adapter : 'ePayAdapter',
			procedure : 'getTransactionStatusInternal',
			parameters : [ userId,spCode,servCode,spTrn,REQ_RECENT_ACTIVITIES_TOKEN ]
		};
	
		var result = MFP.Server.invokeProcedure(invocationData);
		if(result && result.result) {
			return _updateEPayStatusInternal(result.result, userId, spTrn);
		}
	}
	
	return {
		isSuccessful : false,
		authRequired : true,
		errorCode : "401",
		errorMessage : "Not Authorized"
	};
}

function _updateEPayStatus(responseData, spTrn) {
	
	var logged_user_id = "Guest";
	try {
		var authUserIdentity = MFP.Server.getAuthenticatedUser("masterAuthRealm");
		if (authUserIdentity) {
			var authUserId = authUserIdentity.userId;
			if (authUserId) {
				logged_user_id = authUserId;
			}
		}
	} catch (e) {
	}
	
	try {
		var SPTRN = spTrn;
		var AMOUNT = _extractXMLValue("", responseData); // If it is passed as an empty value then it will reuse the old value that was recorded in initialization
		var PYMTCHANNELCODE = _extractXMLValue("", responseData); // If it is passed as an empty value then it will reuse the old value that was recorded in initialization
		var SERVCODE = _extractXMLValue("SERVCODE", responseData);
		var SPCODE = _extractXMLValue("SPCODE", responseData);
		var VERSIONCODE = _extractXMLValue("", responseData); // If it is passed as an empty value then it will reuse the old value that was recorded in initialization
		var MSGCODE = _extractXMLValue("MESSAGECODE", responseData);
		var DEGTRN = _extractXMLValue("DEGTRN", responseData);
		
		var invocationData = {
			adapter : 'userProfile',
			procedure : 'updateUserRecentActivity',
			parameters : [ logged_user_id, SPTRN, "EPay", AMOUNT, PYMTCHANNELCODE, SERVCODE, SPCODE, VERSIONCODE, MSGCODE, DEGTRN, REQ_RECENT_ACTIVITIES_TOKEN ]
		};
		
		return MFP.Server.invokeProcedure(invocationData);
	} catch (e) {
	}
}

function _updateEPayStatusInternal(responseData, userId, spTrn) {
	
	try {
		var SPTRN = spTrn;
		var AMOUNT = _extractXMLValue("", responseData); // If it is passed as an empty value then it will reuse the old value that was recorded in initialization
		var PYMTCHANNELCODE = _extractXMLValue("", responseData); // If it is passed as an empty value then it will reuse the old value that was recorded in initialization
		var SERVCODE = _extractXMLValue("SERVCODE", responseData);
		var SPCODE = _extractXMLValue("SPCODE", responseData);
		var VERSIONCODE = _extractXMLValue("", responseData); // If it is passed as an empty value then it will reuse the old value that was recorded in initialization
		var MSGCODE = _extractXMLValue("MESSAGECODE", responseData);
		var DEGTRN = _extractXMLValue("DEGTRN", responseData);
		
		var invocationData = {
			adapter : 'userProfile',
			procedure : 'updateUserRecentActivity',
			parameters : [ userId, SPTRN, "EPay", AMOUNT, PYMTCHANNELCODE, SERVCODE, SPCODE, VERSIONCODE, MSGCODE, DEGTRN, REQ_RECENT_ACTIVITIES_TOKEN ]
		};
		
		return MFP.Server.invokeProcedure(invocationData);
	} catch (e) {
	}
}

/**
 * This method will directly connect to ESB which will connect to DSG to obtain the transaction status that happened through mPay
 * 
 * @returns
 */
function mPayTransactionStatus(SP_TRN, TRX_ID) {

	var request = MFP.Server.getClientRequest();
	var isAuthorizedResponse = this._isAuthorized(request);
	if(isAuthorizedResponse.authRequired == false) {
		var DSGParameter = {};
		//DSGParameter.CHANNEL = "MobileApp";
		DSGParameter.KEY_VERSION = "1";
		DSGParameter.SP_CODE = "RTA3";
		DSGParameter.SRV_CODE = "RTAWallet";
		DSGParameter.SP_TRN = SP_TRN;
		DSGParameter.TRX_ID = TRX_ID;
		
		var invocationData = {
			adapter : 'mPayAdapter',
			procedure : 'inquireTransactionStatus',
			parameters : [ DSGParameter ]
		};
		var result = MFP.Server.invokeProcedure(invocationData);
		
		if(result && result.isSuccessful && result.output && result.output.Envelope && result.output.Envelope.Body && result.output.Envelope.Body.inquireTransactionStatusResponse && result.output.Envelope.Body.inquireTransactionStatusResponse.properties && result.output.Envelope.Body.inquireTransactionStatusResponse.properties.property && result.output.Envelope.Body.inquireTransactionStatusResponse.properties.property.length > 0) {
			_updateMPayStatus(result.output.Envelope.Body.inquireTransactionStatusResponse.properties.property, SP_TRN);
		}
		
		return result;
	}
	
	return isAuthorizedResponse;
}

/**
 * This method will directly connect to ESB which will connect to DSG to obtain the transaction status that happened through mPay
 * 
 * @returns
 */
function mPayTransactionStatusInternal(USER_ID, SP_TRN, TRX_ID, token) {
	if(token == REQ_RECENT_ACTIVITIES_TOKEN) {
		var DSGParameter = {};
		//DSGParameter.CHANNEL = "MobileApp";
		DSGParameter.KEY_VERSION = "1";
		DSGParameter.SP_CODE = "RTA3";
		DSGParameter.SRV_CODE = "RTAWallet";
		DSGParameter.SP_TRN = SP_TRN;
		DSGParameter.TRX_ID = TRX_ID;
		
		var invocationData = {
			adapter : 'mPayAdapter',
			procedure : 'inquireTransactionStatus',
			parameters : [ DSGParameter ]
		};
		var result = MFP.Server.invokeProcedure(invocationData);
		
		if(result && result.isSuccessful && result.output && result.output.Envelope && result.output.Envelope.Body && result.output.Envelope.Body.inquireTransactionStatusResponse && result.output.Envelope.Body.inquireTransactionStatusResponse.properties && result.output.Envelope.Body.inquireTransactionStatusResponse.properties.property && result.output.Envelope.Body.inquireTransactionStatusResponse.properties.property.length > 0) {
			return _updateMPayStatusInternal(result.output.Envelope.Body.inquireTransactionStatusResponse.properties.property, USER_ID, SP_TRN);
		}
		
		return result;
	}
	
	return {
		isSuccessful : false,
		authRequired : true,
		errorCode : "401",
		errorMessage : "Not Authorized"
	};
}

function _updateMPayStatus(responseData, SP_TRN) {
	var logged_user_id = "Guest";
	try {
		var authUserIdentity = MFP.Server.getAuthenticatedUser("masterAuthRealm");
		if (authUserIdentity) {
			var authUserId = authUserIdentity.userId;
			if (authUserId) {
				logged_user_id = authUserId;
			}
		}
	} catch (e) {
	}
	
	try {
		var SPTRN = SP_TRN;
		var AMOUNT = "";
		var PYMTCHANNELCODE = ""; // If it is passed as an empty value then it will reuse the old value that was recorded in initialization
		var SERVCODE = "";
		var SPCODE = "";
		var VERSIONCODE = "";
		var MSGCODE = "";
		var DEGTRN = "";
		
		var len = responseData.length;
		for(var x=0;x<len;x++) {
			var item = responseData[x];
			
			if(item.name == "DEG$KEY_VERSION") {
				VERSIONCODE = item.value;
			}
			else if(item.name == "DEG$SP_CODE") {
				SPCODE = item.value;	
			}
			else if(item.name == "DEG$PAYMENT_REF_NUMBER") {
				DEGTRN = item.value;
			}
			else if(item.name == "DEG$SRV_CODE") {
				SERVCODE = item.value;
			}
			else if(item.name == "DEG$AMOUNT") {
				AMOUNT = item.value;
			}
			else if(item.name == "DEG$STATUS_CODE") {
				if(item.value == "00") {
					MSGCODE = "0";
				}
				else {
					MSGCODE = item.value;
				}
			}
		}
		
		var invocationData = {
			adapter : 'userProfile',
			procedure : 'updateUserRecentActivity',
			parameters : [ logged_user_id, SPTRN, "MPay", AMOUNT, PYMTCHANNELCODE, SERVCODE, SPCODE, VERSIONCODE, MSGCODE, DEGTRN, REQ_RECENT_ACTIVITIES_TOKEN ]
		};
		
		return MFP.Server.invokeProcedure(invocationData);
	} catch (e) {
	}
}

function _updateMPayStatusInternal(responseData, USER_ID, SP_TRN) {
	
	try {
		var SPTRN = SP_TRN;
		var AMOUNT = "";
		var PYMTCHANNELCODE = ""; // If it is passed as an empty value then it will reuse the old value that was recorded in initialization
		var SERVCODE = "";
		var SPCODE = "";
		var VERSIONCODE = "";
		var MSGCODE = "";
		var DEGTRN = "";
		
		var len = responseData.length;
		for(var x=0;x<len;x++) {
			var item = responseData[x];
			
			if(item.name == "DEG$KEY_VERSION") {
				VERSIONCODE = item.value;
			}
			else if(item.name == "DEG$SP_CODE") {
				SPCODE = item.value;	
			}
			else if(item.name == "DEG$PAYMENT_REF_NUMBER") {
				DEGTRN = item.value;
			}
			else if(item.name == "DEG$SRV_CODE") {
				SERVCODE = item.value;
			}
			else if(item.name == "DEG$AMOUNT") {
				AMOUNT = item.value;
			}
			else if(item.name == "DEG$STATUS_CODE") {
				if(item.value == "00") {
					MSGCODE = "0";
				}
				else {
					MSGCODE = item.value;
				}
			}
		}
		
		var invocationData = {
			adapter : 'userProfile',
			procedure : 'updateUserRecentActivity',
			parameters : [ USER_ID, SPTRN, "MPay", AMOUNT, PYMTCHANNELCODE, SERVCODE, SPCODE, VERSIONCODE, MSGCODE, DEGTRN, REQ_RECENT_ACTIVITIES_TOKEN ]
		};
		
		return MFP.Server.invokeProcedure(invocationData);
	} catch (e) {
	}
}

/**
 * Check if portal is authorized
 * 
 * @param: String
 * @returns: JSON Object
 */
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

function _extractXMLValue(tag, data) {
	var res = "";
	
	if(data && data.indexOf(tag) != -1) {
		var dataParts1 = data.split("<" + tag + ">");
		if(dataParts1 && dataParts1.length >= 2) {
			var dataParts2 = dataParts1[1].split("<\/" + tag + ">");
			if(dataParts2 && dataParts2.length >= 1) {
				return dataParts2[0];
			}
		}
	}
	
	return res;
}


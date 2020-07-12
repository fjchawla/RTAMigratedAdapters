/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *
 *  	// Optional
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "plain", "xml", "html"
 *  	returnedContentEncoding : 'encoding',
 *  	parameters: {name1: value1, ... },
 *  	headers: {name1: value1, ... },
 *  	cookies: {name1: value1, ... },
 *  	body: {
 *  		contentType: 'text/xml; charset=utf-8' or similar value,
 *  		content: stringValue
 *  	},
 *  	transformation: {
 *  		type: 'default', or 'xslFile',
 *  		xslFile: fileName
 *  	}
 *  }
 */

var REQ_PORTAL_USER_NAME = MFP.Server.getPropertyValue("tokens.portal.vendorUsername");
var REQ_PORTAL_PASSWORD = MFP.Server.getPropertyValue("tokens.portal.vendorPassword");

function getAdapterData(adapterName, procedureName, adapterParams) {

	//If the user already logged in, log him out.
	onLogout();
	
	var identity = {
			userId : "chatbot@rta.ae"
	};
	WL.Server.setActiveUser("masterAuthRealm", identity);
	WL.Server.setActiveUser("AdapterAuthRealm", identity);
	WL.Server.setActiveUser("AMAdapterAuthRealm", identity);
	/*WL.Server.setActiveUser("wl_anonymousUserRealm", identity);
	WL.Server.setActiveUser("wl_directUpdateRealm", identity);
	WL.Server.setActiveUser("wl_antiXSRFRealm", identity);
	WL.Server.setActiveUser("wl_deviceNoProvisioningRealm", identity);
	WL.Server.setActiveUser("wl_authenticityRealm", identity);
	WL.Server.setActiveUser("wl_deviceAutoProvisioningRealm", identity);
	WL.Server.setActiveUser("wl_remoteDisableReam", identity);*/
	
	var request = WL.Server.getClientRequest();
	var isAuthorizedResponse = this._isAuthorized(request);
	if(isAuthorizedResponse.authRequired == false) {
		
		var invocationData = {
			adapter : adapterName,
			procedure : procedureName,
			parameters : adapterParams
		};

		return WL.Server.invokeProcedure(invocationData, {
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


function onLogout(headers, errorMessage) {
	WL.Server.setActiveUser("masterAuthRealm", null);
	WL.Server.setActiveUser("AMAdapterAuthRealm", null);
	WL.Server.setActiveUser("AdapterAuthRealm", null);

	return {
		name : 'authenticationIAM'
	};
}
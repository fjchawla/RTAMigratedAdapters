//Development params
//var WSSE_USERNAME_EXTERNAL = "mobile_User";
//var WSSE_PASSWORD_EXTERNAL = "Test@1234";
//Production params
//var WSSE_USERNAME_EXTERNAL = "mobile_user";
//var WSSE_PASSWORD_EXTERNAL = "eyprtm";

//Adapter Constants

var adapterName = "mStoreAdapter";
var WSDL_Path = "/mstoreservice";
var adapterRealm = "UAEPassAdapterAuthRealm";
var WSSE_USERNAME_EXTERNAL = MFP.Server.getPropertyValue("tokens.mstore.username.external");
var WSSE_PASSWORD_EXTERNAL = MFP.Server.getPropertyValue("tokens.mstore.password.external");


//Helpers Functions

//TODO function convertJStoString(input) , should return string value
function toString(param) {
	try {
		var isBoolean = function (arg) { return typeof arg === 'boolean'; }
		var isNumber = function (arg) { return typeof arg === 'number'; }
		var isString = function (arg) { return typeof arg === 'string'; }
		var isFunction = function (arg) { return typeof arg === 'function'; }
		var isObject = function (arg) { return typeof arg === 'object'; }
		var isUndefined = function (arg) { return typeof arg === 'undefined'; }

		if (isUndefined(param)) {
			return "undefined";
		} else if (isObject(param)) {
			return JSON.stringify(param);
		} else if (isString(param)) {
			return param;
		} else {
			//in case of numbers and boolean functions
			return param.toString();
		}
	} catch (e) {
		return param;
	}
}
function convertObiectToArray(Object) {
	if (Object != null && Object != undefined && !(Object instanceof Array)) {
		return [Object];
	}
	return Object;
}
function handleError(msg, code) {

	var msg = toString(msg) || "Internal Server Error";
	var code = code || 500;


	return {
		"isSuccessful": false,
		"error": {
			"code": code,
			"message": msg,
			"adapter": adapterName
		}
	};
}

function adapterLogger(procudureName, errorLevel, suffix, msg) {
	var _msg = toString(msg) || "";
	try {
		var prefix = "|" + adapterName + " |" + procudureName + " |" + suffix + " : ";
		switch (errorLevel) {
			case "error":
				MFP.Logger.error(prefix + _msg);
				break;
			case "warn":
				MFP.Logger.warn(prefix + _msg);
				break;
			case "info":
				MFP.Logger.info(prefix + _msg);
				break;
			case "exception":
				MFP.Logger.error(prefix + _msg);
				break;
		}
	} catch (e) {
		MFP.Logger.error("|" + adapterName + " |adapterLogger |Exception" + JSON.stringify(e));
	}
}
//This function to remove the CDATA effect from the response of TIBCO
function _getCDATASHAPED(s) {
	for (var k in s) {
		if (typeof s[k] != 'string' && !s[k].CDATA)
			s[k] = _getCDATASHAPED(s[k]);
		if (s[k].CDATA)
			s[k] = s[k].CDATA;
	}
	return s;
}
function invokeWebService(body) {
	var input = {
		method: 'post',
		returnedContentType: 'xml',
		path: WSDL_Path,
		headers: {
			SOAPAction: 'mStoreService'
		},
		body: {
			content: body.toString(),
			contentType: 'text/xml; charset=utf-8'
		}
	};

	var data = MFP.Server.invokeHttp(input)
	return _getCDATASHAPED(data);

}
function cloneObject(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function logCards(_Cards) {
	try {

		var loggedCards =_Cards;
		var logText = "\n";
		for (var i = 0; i < loggedCards.length; i++) {
			var item= "{";
			var CardObject = loggedCards[i];
			for (var property in CardObject) {
				if (property != "Images"){
						item += "'" +property + "':'" +  CardObject[property] + "'," ;
				}
			}
			 item += "'Images':'NOT_LOGGED' }";
			logText += toString(item)+'\n';
		}
		adapterLogger("logCards", "info", "Cards", toString(logText));
		return _Cards;
	} catch (error) {
		adapterLogger("logCards", "error", "Exception", toString(error));
		return _Cards;
	}
}
/**
 * Get products details
 * 
 * @param: String, String[]	
 * @returns: JSON object
 */


function getmStoreData(userId, cardId) {
	var isAuthorizedResponse = this._isAuthorized(userId);


	// if (isAuthorizedResponse.authRequired == false) {
		var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/mStoreService_AMX_SRC/XMLSchema/Schema.xsd">' + getSoapHeader() + '<soapenv:Body><sch:mStoreService_Request><sch:userId>' + userId + '</sch:userId></sch:mStoreService_Request></soapenv:Body></soapenv:Envelope>';
		MFP.Logger.info("|mStoreAdapter |getmStoreData request " + request);
		var response = invokeWebService(request);
		if (userId == 'jalal.abdelqader@yahoo.com'){
			MFP.Logger.info("|mStoreAdapter |getmStoreData response "+JSON.stringify(response));
		}
		var resultSet = [];
		if (response && response.isSuccessful && response.statusCode == 200) {
			if (response.Envelope
				&& response.Envelope.Body
				&& response.Envelope.Body.mStoreService_Response
				&& response.Envelope.Body.mStoreService_Response.mStore
				&& (response.Envelope.Body.mStoreService_Response.mStore.length > 0
					|| response.Envelope.Body.mStoreService_Response.mStore.length == undefined)) {

				var cardsList = response.Envelope.Body.mStoreService_Response.mStore;
				
				
				//Handle case of only one item in mStore
				if (!cardsList.length) {
					var mycard = new Array();
					mycard.push(cardsList);
					cardsList = mycard;
				}

				var cardsListLength = cardsList.length;
				MFP.Logger.info("|mStoreAdapter |getmStoreData cardsListLength is : " + cardsListLength);
				for (var c = 0; c < cardsListLength; c++) {
					var card = cardsList[c];

					//Fix needed after WL iFix :)
					for (var key in card) {
						if (card[key].CDATA != undefined) {
							card[key] = card[key].CDATA;
						}
					}
					// Parsing card images
					var cardImagesList = [];
					if (card.Images && card.Images.Image) {
						var cardImages = card.Images.Image;
						if (cardImages) {
							var imagesLength = cardImages.length;
							if (imagesLength > 0) {
								for (var i = 0; i < imagesLength; i++) {
									var imageStr = cardImages[i].image;

									//Fix needed after WL iFix :)
									if (imageStr.CDATA != undefined) {
										imageStr = imageStr.CDATA;
									}

									if (!imageStr) {
										imageStr = "";
									}

									if (imageStr && imageStr.indexOf("data:image/") < 0) {
										imageStr = ("data:image/jpeg;base64,").concat(imageStr);
									}

									cardImagesList[cardImagesList.length] = imageStr;
								}
							} else {
								cardImagesList[0] = cardImages.image;
							}
						}
					}
					card.Images = cardImagesList;
					resultSet[c] = card;
				}
				delete response.Envelope;
			}
		}
		response.resultSet = resultSet;
		// var new_resultSet=resultSet;
		logCards(resultSet);
		
		return response;
	// }

	// return isAuthorizedResponse;
}

function deleteAlert(id) {

	return {
		isDeleted: true
	};
}

function getSoapHeader() {
	return '<soapenv:Header>'
		+ '<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" '
		+ 'xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
		+ '<wsse:UsernameToken wsu:Id="UsernameToken-102"><wsse:Username>'
		+ MFP.Server.getPropertyValue("tokens.tipcoService.username") + '</wsse:Username>'
		+ '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'
		+ MFP.Server.getPropertyValue("tokens.tipcoService.password") + '</wsse:Password>'
		+ '</wsse:UsernameToken></wsse:Security>'
		+ '<sch:ExternalUser><sch:externalUsername>'
		+ WSSE_USERNAME_EXTERNAL
		+ '</sch:externalUsername><sch:externalUserPassword>'
		+ WSSE_PASSWORD_EXTERNAL
		+ '</sch:externalUserPassword></sch:ExternalUser></soapenv:Header>';
}
/**
 * Check if the user id who requested the operation is the same one who was
 * authenticated
 * 
 * @param: String
 * @returns: Boolean
 */
function _isAuthorized(user_id) {
	//var authUserIdentity = WL.Server.getActiveUser("masterAuthRealm");
	var authUserIdentity =  MFP.Server.getAuthenticatedUser("masterAuthRealm")
	if (authUserIdentity) {
		var authUserId = authUserIdentity.id;

		if (authUserId && authUserId == user_id) {
			return {
				authRequired: false
			};
		}
	}

	return {
		isSuccessful: false,
		authRequired: true,
		errorCode: "401",
		errorMessage: "Not Authorized"
	};
}

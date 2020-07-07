//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////Adapter Constants///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

var adapterName = "NILoyaltyManageRegistrationAdapter";
var WSDL_Path = "/manageLoyaltyRegistrationService";
var WSSE_USERNAME_EXTERNAL = MFP.Server.getPropertyValue("tokens.mstore.username.external")
var WSSE_PASSWORD_EXTERNAL = MFP.Server.getPropertyValue("tokens.mstore.password.external");
var wsseSecurityHeader = '<soapenv:Header>' + '<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" ' + 'xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' + '<wsse:UsernameToken wsu:Id="UsernameToken-102"><wsse:Username>' + MFP.Server.getPropertyValue("tokens.tipcoService.username") + '</wsse:Username>' + '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">' + MFP.Server.getPropertyValue("tokens.tipcoService.password") + '</wsse:Password>' + '</wsse:UsernameToken></wsse:Security></soapenv:Header>';
var message_en = "Something went wrong! Please try again later!";
var message_ar = "هناك خطأ ما. يُرجى إعادة المحاولة مرة أخرى!";
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////Helpers Functions///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

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

//Standard Error Handling
//1xx (Informational): The request was received, continuing process
//2xx (Successful): The request was successfully received,  understood, and accepted
//3xx (Redirection): Further action needs to be taken in order to complete the request
//4xx (Client Error): The request contains bad syntax or cannot be fulfilled
function handleError(msg_en, msg_ar, code, procudureName, backendError) {
	msg_en = toString(msg_en) || message_en;
	msg_ar = toString(msg_ar) || message_ar;
	code = code || errorCode;
	adapterLogger("handleError", "error", "Error", JSON.stringify([msg_en, msg_ar, code, procudureName]));
	var errorResponse;
	if (backendError) {
		errorResponse = {
			"isSuccessful": false,
			"error": {
				"status": "1",
				"code": code,
				// "adapter": adapterName,
				"message_en": msg_en,
				"message_ar": msg_ar
			}
		};
	} else {
		errorResponse = {
			"isSuccessful": false,
			"error": {
				"status": "1",
				"code": code,
				// "adapter": adapterName,
				"message_en": msg_en,
				"message_ar": msg_ar,
				"backendError": backendError
			}
		};
	}
	adapterLogger("handleError", "error", "Error", JSON.stringify(errorResponse));
	return errorResponse;
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
function invokeWebService(body, headers) {
	var input = {
		method: 'post',
		returnedContentType: 'xml',
		returnedContentEncoding: 'utf-8',
		path: WSDL_Path,
		headers: headers,
		body: {
			content: body.toString(),
			contentType: 'text/xml; charset=utf-8'
		}
	};
	return MFP.Server.invokeHttp(input);
}

function isUndefinedOrNullOrBlank(v) {
	if (typeof v == 'undefined' || v == undefined || v == "undefined" || v == null || v == "")
		result = true;
	else
		result = false;
	return result;
}
function isUndefinedOrNull(v) {
	if (typeof v == 'undefined' || v == undefined || v == null || v == "undefined")
		result = true;
	else
		result = false;
	return result;
}
function _isAuthorized(user_id) {
	var authUserIdentity = MFP.Server.getAuthenticatedUser("masterAuthRealm");
	MFP.Logger.info("|_isAuthorized" + JSON.stringify(authUserIdentity));
	if (authUserIdentity) {
		var authUserId = authUserIdentity.userId;
		MFP.Logger.info("|authUserId  " + authUserId);
		MFP.Logger.info("|authUserIdentity.userId   " + user_id);
		if (authUserId && authUserId == user_id) {
			MFP.Logger.info("|authRequired  false ");
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

function _extractXMLValue(tag, data) {
	var res = "";
	if (data && data.indexOf(tag) != -1) {
		var dataParts1 = data.split("<" + tag + ">");
		if (dataParts1 && dataParts1.length >= 2) {
			var dataParts2 = dataParts1[1].split("<\/" + tag + ">");
			if (dataParts2 && dataParts2.length >= 1) {
				return dataParts2[0];
			}
		}
	}
	return res;
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////Adapter Procedures//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function handleSystemMessages(responseCode) {
	var msg_ar = message_ar, msg_en = message_en;
	switch (responseCode) {
		// case '0':
		// 	//No need for handling the success code
		// 	break;
		case 'RTA-CSHELL-ERROR-1':
		case 'RTA-CSHELL-ERROR-2':
		case 'RTA-CSHELL-ERROR-3':
		case 'RTA-CSHELL-ERROR-4':
			//Input data invalid
			msg_en = message_en;
			msg_ar = message_ar;
			break;
		case '701':
		case 701:
			msg_en = "Something went wrong! Please try again later!";
			msg_ar = "هناك خطأ ما. يُرجى إعادة المحاولة مرة أخرى!";
			break;
		case '702':
		case 702:
			msg_en = "Your nol Card is not validated, please enter another nol Card";
			msg_ar = "بطاقة نول المدخلة غير صالحة، يُرجى إدخال رقم بطاقة نول أخرى";
			break;
		case '703':
		case 703:
			msg_en = "Your nol Card is blocked, please enter another nol Card";
			msg_ar = "بطاقة نول المدخلة محجوبة، يُرجى إدخال رقم بطاقة نول أخرى";
			break;
		case '704':
		case 704:
			msg_en = "Your nol Card is expired, please enter another nol card";
			msg_ar = "بطاقة نول المدخلة منتهية الصلاحية، يُرجى إدخال رقم بطاقة نول أخرى";
			break;
		case '705':
		case 705:
			msg_en = "Your nol Card is blacklisted, please enter another nol Card";
			msg_ar = "بطاقة نول المدخلة محجوبة، يُرجى إدخال رقم بطاقة نول أخرى";
			break;
		case '706':
		case 706:
			msg_en = "Your nol Card is not enabled, please enter another nol Card";
			msg_ar = "بطاقة نول المدخلة غير مفعَلة، يُرجى إدخال رقم بطاقة نول أخرى";
			break;
		case '707':
		case 707:
			msg_en = "Your nol Card ePurse is blocked, please enter another nol Card";
			msg_ar = "محفظة بطاقة نول المدخلة محجوبة، يُرجى إدخال رقم بطاقة نول أخرى";
			break;
		case '708':
		case 708:
			msg_en = "Unmatched Loyalty ID";
			msg_ar = "رقم العضوية غير متطابق";
			break;
		case '709':
		case 709:
			msg_en = "Unmatched RTA Account ID";
			msg_ar = "حساب هيئة الطرق والمواصلات غير متطابق";
			break;
		case 'RTA-ESB-ManageLoyaltyRegistrationService-ERROR-10001':
		case 'RTA-ESB-ManageLoyaltyRegistrationService-ERROR-10002':
		case 'RTA-ESB-ManageLoyaltyRegistrationService-ERROR-10003':
		case 'RTA-ESB-ManageLoyaltyRegistrationService-ERROR-10004':
		case 'RTA-ESB-ManageLoyaltyRegistrationService-ERROR-10010':
			msg_en = message_en;
			msg_ar = message_ar;
			break;
		default:
			msg_en = message_en;
			msg_ar = message_ar;
			break;

	}
	return {
		message_ar: msg_ar,
		message_en: msg_en,
		responseCode: responseCode
	};
}

function manageLoyaltyRegistrationVerify(cardTagId) {
	var adapterResponse, fault, status = '1', code = 'RTA-CSHELL-ERROR-5';

	try {
		if (!cardTagId) {
			var errorMapping = handleSystemMessages('RTA-CSHELL-ERROR-1');
			return handleError(errorMapping.message_en, errorMapping.message_ar, errorMapping.responseCode, "manageLoyaltyRegistrationVerify");
		}

		var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/schemas/ManageLoyaltyRegistrationService/Schema.xsd"> ' + wsseSecurityHeader + '<soapenv:Body> <sch:manageLoyaltyRegistrationVerifyRequest> <sch:cardTagId>' + cardTagId + '</sch:cardTagId> </sch:manageLoyaltyRegistrationVerifyRequest> </soapenv:Body> </soapenv:Envelope>';

		adapterLogger("manageLoyaltyRegistrationVerify", "info", "Request", request);

		var response = invokeWebService(request);

		adapterLogger("manageLoyaltyRegistrationVerify", "info", "Response", toString(response));

		// return response;
		if (response && response.isSuccessful && response.statusCode == 200) {
			if (response.Envelope
				&& response.Envelope.Body
				&& response.Envelope.Body.manageLoyaltyRegistrationVerifyRequestResponse) {
				var manageLoyaltyRegistrationVerifyRequestResponse = response.Envelope.Body.manageLoyaltyRegistrationVerifyRequestResponse;
				adapterLogger("manageLoyaltyRegistrationVerify", "info", "manageLoyaltyRegistrationVerifyRequestResponse", JSON.stringify(manageLoyaltyRegistrationVerifyRequestResponse));
				if (manageLoyaltyRegistrationVerifyRequestResponse.responseCode == "0" || manageLoyaltyRegistrationVerifyRequestResponse.responseCode == 0) {
					var rtaReferenceNumber, cardIterationNumber, cardStatus, cardType, cardExpiryDate, balanceProtectionStatus;
					status = '0';
					rtaReferenceNumber = manageLoyaltyRegistrationVerifyRequestResponse.rtaReferenceNumber;
					cardIterationNumber = manageLoyaltyRegistrationVerifyRequestResponse.cardIterationNumber;
					cardStatus = manageLoyaltyRegistrationVerifyRequestResponse.cardStatus;
					cardType = manageLoyaltyRegistrationVerifyRequestResponse.cardType;
					cardExpiryDate = manageLoyaltyRegistrationVerifyRequestResponse.cardExpiryDate;
					balanceProtectionStatus = manageLoyaltyRegistrationVerifyRequestResponse.balanceProtectionStatus;
				} else {
					code = manageLoyaltyRegistrationVerifyRequestResponse.responseCode;
					fault = {
						faultstring: manageLoyaltyRegistrationVerifyRequestResponse.responseDescription,
						faultcode: manageLoyaltyRegistrationVerifyRequestResponse.responseCode
					};
				}
			} else {
				code = 'RTA-CSHELL-ERROR-3';
			}
		} else {
			if (response.errors && response.errors.length > 0) {
				if (response.Envelope
					&& response.Envelope.Body
					&& response.Envelope.Fault) {
					//Tibco Issues RTA-CSHELL-ERROR-4
					code = response.Envelope.Fault.faultcode || 'RTA-CSHELL-ERROR-4';
					fault = response.Envelope.Fault;
				} else if (response.errors[0].indexOf('xml') > -1) {
					//Tibco Issues RTA-CSHELL-ERROR-4
					// code = 'RTA-CSHELL-ERROR-4';
					fault = {
						faultstring: _extractXMLValue("faultstring", response.errors[0]),
						faultcode: _extractXMLValue("faultcode", response.errors[0])
					};
					code = _extractXMLValue("faultcode", response.errors[0]);
				} else {
					//handle MFP error like ssl issue
					code = 'RTA-CSHELL-ERROR-3';
					fault = {
						faultstring: response.errors[0],
						faultcode: response.errors[0]
					};
				}
			}
		}
		if (status == '0') {
			adapterResponse = {
				status: status,
				rtaReferenceNumber: rtaReferenceNumber,
				cardIterationNumber: cardIterationNumber,
				cardStatus: cardStatus,
				cardType: cardType,
				cardExpiryDate: cardExpiryDate,
				balanceProtectionStatus: balanceProtectionStatus
			};
		} else {
			var errorMapping = handleSystemMessages(code);
			return handleError(errorMapping.message_en, errorMapping.message_ar, errorMapping.responseCode, "manageLoyaltyRegistrationVerify", fault);
		}
		adapterLogger("manageLoyaltyRegistrationVerify", "info", "adapterResponse", toString(adapterResponse));
		return adapterResponse;
	} catch (e) {
		try {
			adapterLogger("manageLoyaltyRegistrationVerify", "error", "Exception", toString(e));
		} catch (e) { }
		return handleError(message_en, message_ar, 'RTA-CSHELL-ERROR-2', "manageLoyaltyRegistrationVerify");
	}
}
function manageLoyaltyRegistrationLink(cardTagId, loyaltyId, rtaId /*, salutation, firstName, middleName, lastName, email, nationalityId, mobileNumber, prefix, areaCode, phoneNumber*/) {
	try {

		if (!cardTagId || !loyaltyId || !rtaId) {
			var errorMapping = handleSystemMessages('RTA-CSHELL-ERROR-1');
			return handleError(errorMapping.message_en, errorMapping.message_ar, errorMapping.responseCode, "manageLoyaltyRegistrationLink");
		}
		var adapterResponse, fault, status='1', code = 'RTA-CSHELL-ERROR-5';

		var request = ' <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/schemas/ManageLoyaltyRegistrationService/Schema.xsd">  ' + wsseSecurityHeader + ' <soapenv:Body> <sch:manageLoyaltyRegistrationLinkRequest> <sch:cardTagId>' + cardTagId + '</sch:cardTagId> <sch:loyaltyId>' + loyaltyId + '</sch:loyaltyId> <sch:rtaId>' + rtaId + '</sch:rtaId></sch:manageLoyaltyRegistrationLinkRequest> </soapenv:Body> </soapenv:Envelope> ';


		adapterLogger("manageLoyaltyRegistrationLink", "info", "Request", request);

		var response = invokeWebService(request);

		adapterLogger("manageLoyaltyRegistrationLink", "info", "Response", toString(response));

		// return response;
		if (response && response.isSuccessful && response.statusCode == 200) {
			if (response.Envelope
				&& response.Envelope.Body
				&& response.Envelope.Body.manageLoyaltyRegistrationLinkRequestResponse) {
				var manageLoyaltyRegistrationLinkRequestResponse = response.Envelope.Body.manageLoyaltyRegistrationLinkRequestResponse;
				adapterLogger("manageLoyaltyRegistrationVerify", "info", "manageLoyaltyRegistrationLinkRequestResponse", JSON.stringify(manageLoyaltyRegistrationLinkRequestResponse));
				if (manageLoyaltyRegistrationLinkRequestResponse.responseCode == "0" || manageLoyaltyRegistrationLinkRequestResponse.responseCode == 0) {
					status = '0';
				} else {
					status = '1';
					code = manageLoyaltyRegistrationLinkRequestResponse.responseCode;
					fault = {
						faultstring: manageLoyaltyRegistrationLinkRequestResponse.responseDesc,
						faultcode: manageLoyaltyRegistrationLinkRequestResponse.responseCode
					};
				}
			} else {
				// status = '1';
				// code = manageLoyaltyRegistrationLinkRequestResponse.responseCode;
				// code="500";
				code = 'RTA-CSHELL-ERROR-3';
				// fault = {
				// 	faultstring: "Internal Server Error",
				// 	faultcode: "500"
				// };
			}
		} else {
			if (response.errors && response.errors.length > 0) {
				if (response.Envelope
					&& response.Envelope.Body
					&& response.Envelope.Fault) {
					//Tibco Issues RTA-CSHELL-ERROR-4
					fault = esponse.Envelope.Fault;
					// code = 'RTA-CSHELL-ERROR-4';
					code = response.Envelope.Fault.faultcode || 'RTA-CSHELL-ERROR-4';
				} else if (response.errors[0].indexOf('xml') > -1) {
					//Tibco Issues RTA-CSHELL-ERROR-4
					fault = {
						faultstring: _extractXMLValue("faultstring", response.errors[0]),
						faultcode: _extractXMLValue("faultcode", response.errors[0])
					};
					code = _extractXMLValue("faultcode", response.errors[0]);

				} else {
					//handle MFP error like ssl issue
					fault = {
						faultstring: response.errors[0],
						faultcode: response.errors[0]
					};
					code = 'RTA-CSHELL-ERROR-3';
				}
			}
		}
		if (status == '0') {
			adapterResponse = {
				status: status
			};
		} else {
			var errorMapping = handleSystemMessages(code);
			return handleError(errorMapping.message_en, errorMapping.message_ar, errorMapping.responseCode, "manageLoyaltyRegistrationVerify", fault);
			// adapterResponse = {
			// 	status: status,
			// 	code: code,
			// 	message_en: fault.faultstring || '',
			// 	message_ar: fault.faultstring || ''
			// };
		}
		adapterLogger("manageLoyaltyRegistrationVerify", "info", "adapterResponse", toString(adapterResponse));
		return adapterResponse;

	} catch (e) {
		try {
			adapterLogger("manageLoyaltyRegistrationVerify", "error", "Exception", toString(e));
		} catch (e) { }
		return handleError(message_en, message_ar, 'RTA-CSHELL-ERROR-2', "getLookupData");

		// adapterResponse = {
		// 	status: "1",
		// 	code: 'RTA-CSHELL-ERROR-2',
		// 	message_en: toString(e),
		// 	message_ar: toString(e)
		// };
		// return adapterResponse;
	}
}
function manageLoyaltyRegistrationDelink(cardTagId, loyaltyId, rtaId) {
	try {

		if (!cardTagId || !loyaltyId || !rtaId) {
			var errorMapping = handleSystemMessages('RTA-CSHELL-ERROR-1');
			return handleError(errorMapping.message_en, errorMapping.message_ar, errorMapping.responseCode, "manageLoyaltyRegistrationDelink");
		}

		var adapterResponse, fault, status, code = 'RTA-CSHELL-ERROR-5', message_en, message_ar;

		var request = ' <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/schemas/ManageLoyaltyRegistrationService/Schema.xsd">  ' + wsseSecurityHeader + '<soapenv:Body> <sch:manageLoyaltyRegistrationDelinkRequest> <sch:cardTagId> ' + cardTagId + '</sch:cardTagId> <sch:loyaltyId> ' + loyaltyId + '</sch:loyaltyId><sch:rtaId> ' + rtaId + '</sch:rtaId> </sch:manageLoyaltyRegistrationDelinkRequest> </soapenv:Body> </soapenv:Envelope> ';

		adapterLogger("manageLoyaltyRegistrationDelink", "info", "Request", request);

		var response = invokeWebService(request);

		adapterLogger("manageLoyaltyRegistrationDelink", "info", "Response", toString(response));

		// return response;
		if (response && response.isSuccessful && response.statusCode == 200) {
			if (response.Envelope
				&& response.Envelope.Body
				&& response.Envelope.Body.manageLoyaltyRegistrationDelinkRequestResponse) {
				var manageLoyaltyRegistrationDelinkRequestResponse = response.Envelope.Body.manageLoyaltyRegistrationDelinkRequestResponse;
				adapterLogger("manageLoyaltyRegistrationDelink", "info", "manageLoyaltyRegistrationDelinkRequestResponse ", JSON.stringify(manageLoyaltyRegistrationDelinkRequestResponse));
				if (manageLoyaltyRegistrationDelinkRequestResponse.responseCode == "0" || manageLoyaltyRegistrationDelinkRequestResponse.responseCode == 0) {
					status = '0';
				} else {
					status = '1';
					code = manageLoyaltyRegistrationDelinkRequestResponse.responseCode;
					fault = {
						faultstring: manageLoyaltyRegistrationDelinkRequestResponse.responseDesc,
						faultcode: manageLoyaltyRegistrationDelinkRequestResponse.responseCode
					};
				}
			} else {
				// status = '1';
				// code="500";
				code = 'RTA-CSHELL-ERROR-3';
				// fault = {
				// 	faultstring: "Internal Server Error",
				// 	faultcode: "500"
				// };
				// code = manageLoyaltyRegistrationLinkRequestResponse.responseCode;
			}
		} else {
			if (response.errors && response.errors.length > 0) {
				if (response.Envelope
					&& response.Envelope.Body
					&& response.Envelope.Fault) {
					//Tibco Issues RTA-CSHELL-ERROR-4
					fault = esponse.Envelope.Fault;
					// code = 'RTA-CSHELL-ERROR-4';
					code = response.Envelope.Fault.faultcode || 'RTA-CSHELL-ERROR-4';
				} else if (response.errors[0].indexOf('xml') > -1) {
					//Tibco Issues RTA-CSHELL-ERROR-4
					fault = {
						faultstring: _extractXMLValue("faultstring", response.errors[0]),
						faultcode: _extractXMLValue("faultcode", response.errors[0])
					};
					// code = 'RTA-CSHELL-ERROR-4';
					code = _extractXMLValue("faultcode", response.errors[0]);
				} else {
					//handle MFP error like ssl issue
					fault = {
						faultstring: response.errors[0],
						faultcode: response.errors[0]
					};
					code = 'RTA-CSHELL-ERROR-3';
				}
			}
		}
		if (status == '0') {
			adapterResponse = {
				status: status
			};
		} else {

			var errorMapping = handleSystemMessages(code);
			return handleError(errorMapping.message_en, errorMapping.message_ar, errorMapping.responseCode, "manageLoyaltyRegistrationVerify", fault);
			// adapterResponse = {
			// 	status: status,
			// 	code: code,
			// 	message_en: fault.faultstring || '',
			// 	message_ar: fault.faultstring || ''
			// };
		}
		adapterLogger("manageLoyaltyRegistrationDelink", "info", "adapterResponse", toString(adapterResponse));
		return adapterResponse;
	} catch (e) {
		try {
			adapterLogger("manageLoyaltyRegistrationDelink", "error", "Exception", toString(e));
		} catch (e) { }
		return handleError(message_en, message_ar, 'RTA-CSHELL-ERROR-2', "getLookupData");

		// adapterResponse = {
		// 	status: "1",
		// 	code: 'RTA-CSHELL-ERROR-2',
		// 	message_en: toString(e),
		// 	message_ar: toString(e)
		// };
		// return adapterResponse;
	}
}
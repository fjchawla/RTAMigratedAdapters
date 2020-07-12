/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
//Adapter Constants
var adapterName = "IAMServicesAdapter";
var WSSE_USERNAME = MFP.Server.getPropertyValue("tokens.tipcoService.username");
var WSSE_PASSWORD = MFP.Server.getPropertyValue("tokens.tipcoService.password");


//Helpers Functions
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
	} catch(e){
		return param;
	}
}

function getSoapHeader() {
	return '<soapenv:Header><wsse:Security soapenv:mustUnderstand="0" xmlns:wsse=" http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd " xmlns=" http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/"><wsse:UsernameToken><wsse:Username>' + WSSE_USERNAME + '</wsse:Username><wsse:Password>' + WSSE_PASSWORD + '</wsse:Password></wsse:UsernameToken></wsse:Security></soapenv:Header>';
}

function invokeWebService(body, headers) {
	var input = {
			method : 'post',
			returnedContentType : 'xml',
			path : '/userAuthenticationService',
			body : {
				content : body.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
	};

	return WL.Server.invokeHttp(input);
}

function serverErrorHandler() {
	var reponse = {};
	reponse.failure = {
			errorCode : "99"
	};

	return reponse;
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

//Adapter Procdures (Exposed and not Exposed)
function changePassword(appId,loginId,currentPassword,newPassword,confirmNewPassword,captchaObject) {
	try{
		adapterLogger("changePassword", "info", "Adapter Input",toString([appId,loginId,currentPassword,newPassword,confirmNewPassword,captchaObject]));
		var serviceName="ChangePassword";
		if(appId && loginId && currentPassword && newPassword && confirmNewPassword){
			if(captchaObject)
			{
				var captcha=JSON.parse(captchaObject);
				//MFP.Logger.warn("|IAMServicesAdapter |changePassword |ValidateCaptcha |captcha: " + captchaObject );
				adapterLogger("changePassword", "info", "Request ValidateCaptcha",toString([captcha.key,captcha.userAnswerId,captcha.type,serviceName]))
				var invocationData = {
					adapter : 'captchaAdapter',
					procedure : 'ValidateCaptcha',
					parameters : [captcha.key,captcha.userAnswerId,captcha.type,serviceName]
				};
				var result = MFP.Server.invokeProcedure(invocationData);
				adapterLogger("changePassword", "info", "Response ValidateCaptcha",toString(result))
				//MFP.Logger.warn("|IAMServicesAdapter |changePassword |ValidateCaptcha |result: " +  JSON.stringify(result) );

				if (result &&result.isValid=="Valid"){
					var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:user="http://www.rta.ae/schemas/UserAuthenticationService/UserAuthenticationServiceSchema.xsd">'
						+ getSoapHeader() 
						+'<soapenv:Body>'
						+'<user:changePasswordRequest>'
						+' <user:appID>'+appId+'</user:appID>'
						+' <user:loginId>'+loginId+'</user:loginId>'
						+'  <user:currentPassword>'+currentPassword+'</user:currentPassword>'
						+'  <user:newPassword>'+newPassword+'</user:newPassword>'
						+'   <user:confirmNewPassword>'+confirmNewPassword+'</user:confirmNewPassword>'
						+'</user:changePasswordRequest>'
						+'  </soapenv:Body>'
						+'</soapenv:Envelope>';
					adapterLogger("changePassword", "info", "Soap Request",toString(request));
					//MFP.Logger.warn("|IAMServicesAdapter |changePassword |request: " + request );
					var response= invokeWebService(request);
					adapterLogger("changePassword", "info", "Soap Response",toString(response));
					//MFP.Logger.warn("|IAMServicesAdapter |changePassword |response: " + JSON.stringify(response));
					if (response && response.isSuccessful && response.statusCode == 200) {
						var changePasswordResponse =response.Envelope.Body.changePasswordResponse;
						return changePasswordResponse;
					}
					else {
						//TODO we need to use handleError func
						return serverErrorHandler();
					}
				}
				else 
				{
					//TODO we need to use handleError func
					return serverErrorHandler();
				}
			}
			else
			{
				var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:user="http://www.rta.ae/schemas/UserAuthenticationService/UserAuthenticationServiceSchema.xsd">'
					+ getSoapHeader() 
					+'<soapenv:Body>'
					+'<user:changePasswordRequest>'
					+' <user:appID>'+appId+'</user:appID>'
					+' <user:loginId>'+loginId+'</user:loginId>'
					+'  <user:currentPassword>'+currentPassword+'</user:currentPassword>'
					+'  <user:newPassword>'+newPassword+'</user:newPassword>'
					+'   <user:confirmNewPassword>'+confirmNewPassword+'</user:confirmNewPassword>'
					+'</user:changePasswordRequest>'
					+'  </soapenv:Body>'
					+'</soapenv:Envelope>';

				adapterLogger("changePassword", "info", "Soap Request",toString(request))
				//MFP.Logger.warn("|IAMServicesAdapter |changePassword |request: " + request );
				var response= invokeWebService(request);
				adapterLogger("changePassword", "info", "Soap Response",toString(response))
				//MFP.Logger.warn("|IAMServicesAdapter |changePassword |response: " + JSON.stringify(response));
				if (response && response.isSuccessful && response.statusCode == 200) {
					var changePasswordResponse =response.Envelope.Body.changePasswordResponse;
					return changePasswordResponse;
				}
				else {
					//TODO we need to use handleError func
					return serverErrorHandler();
				}
			}
		}
		else
		{
			return handleError("Invalid Parameters", 406);
		}
	}
	catch (error) {
		adapterLogger("changePassword", "error", "Exception", toString(error));
		return handleError();
	}
}


function ForgetPassword(appID,loginId,newPassword,confirmNewPassword,captchaObject) {
	try{
		var serviceName="ForgotPassword";
		adapterLogger("ForgetPassword", "info", "Adapter Input",toString([appID,loginId,newPassword,confirmNewPassword,captchaObject]))
		if(appID && loginId && newPassword && confirmNewPassword){
			if(captchaObject){
				var captcha=JSON.parse(captchaObject);
				//MFP.Logger.warn("|IAMServicesAdapter |ForgetPassword |ValidateCaptcha |captcha: " + captchaObject  +"serviceName" + serviceName);
				var invocationData = {
						adapter : 'captchaAdapter',
						procedure : 'ValidateCaptcha',
						parameters : [captcha.key,captcha.userAnswerId,captcha.type,serviceName]
				};
				adapterLogger("ForgetPassword", "info", "Request ValidateCaptcha",toString([captcha.key,captcha.userAnswerId,captcha.type,serviceName]))
				var result = MFP.Server.invokeProcedure(invocationData);
				adapterLogger("ForgetPassword", "info", "Response ValidateCaptcha",toString([captcha.key,captcha.userAnswerId,captcha.type,serviceName]))
				//MFP.Logger.warn("|IAMServicesAdapter |ForgetPassword |ValidateCaptcha |result: " +  JSON.stringify(result) );

				if (result &&result.isValid=="Valid"){
					var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:user="http://www.rta.ae/schemas/UserAuthenticationService/UserAuthenticationServiceSchema.xsd">'
						+ getSoapHeader() 
						+'<soapenv:Body>'
						+'<user:resetPasswordRequest>'
						+'<user:appID>'+appID+'</user:appID>'
						+'<user:loginId>'+loginId+'</user:loginId>'
						+'<user:newPassword>'+newPassword+'</user:newPassword>'
						+'<user:confirmNewPassword>'+confirmNewPassword+'</user:confirmNewPassword>'
						+'</user:resetPasswordRequest>'
						+'</soapenv:Body>'
						+'</soapenv:Envelope>';
					adapterLogger("ForgetPassword", "info", "Soap Request",toString(request));
					//MFP.Logger.warn("|IAMServicesAdapter |ForgetPassword |request: " + request );
					var response = invokeWebService(request);
					adapterLogger("ForgetPassword", "info", "Soap Response",toString(response))
					//MFP.Logger.warn("|IAMServicesAdapter |ForgetPassword |response: " + JSON.stringify(response));
					if (response && response.isSuccessful && response.statusCode == 200) {
						return response;
					}else {
						return serverErrorHandler();
					}
				}else {
					return serverErrorHandler();
					//return {"result":JSON.stringify(result)};
				}
			}else {
				var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:user="http://www.rta.ae/schemas/UserAuthenticationService/UserAuthenticationServiceSchema.xsd">'
					+ getSoapHeader() 
					+'<soapenv:Body>'
					+'<user:resetPasswordRequest>'
					+'<user:appID>'+appID+'</user:appID>'
					+'<user:loginId>'+loginId+'</user:loginId>'
					+'<user:newPassword>'+newPassword+'</user:newPassword>'
					+'<user:confirmNewPassword>'+confirmNewPassword+'</user:confirmNewPassword>'
					+'</user:resetPasswordRequest>'
					+'</soapenv:Body>'
					+'</soapenv:Envelope>';
				adapterLogger("ForgetPassword", "info", "Soap Request",toString(request));
				//MFP.Logger.warn("|IAMServicesAdapter |ForgetPassword |request: " + request );
				var response = invokeWebService(request);
				adapterLogger("ForgetPassword", "info", "Soap Response",toString(response))
				//MFP.Logger.warn("|IAMServicesAdapter |ForgetPassword |response: " + JSON.stringify(response));
				if (response && response.isSuccessful && response.statusCode == 200) {
					return response;
				}else {
					return serverErrorHandler();
				}
			}
		}
		else {
			return handleError("Invalid Parameters", 406);
		}
	}
	catch (error) {
		adapterLogger("ForgetPassword", "error", "Exception",   (error));
		return handleError();
	}
}



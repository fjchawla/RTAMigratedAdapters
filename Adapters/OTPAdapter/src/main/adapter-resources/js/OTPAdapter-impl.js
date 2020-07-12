
//Adapter Constants
var adapterName = "OTPAdapter";
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

function adapterLogger(procudureName , type , suffix, msg ){
	var _msg = msg || "";
	try{
		var prefix= "|adapterName |" + procudureName +" |"+ suffix + " : " ;
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
		MFP.Logger.error("|adapterName |adapterLogger |Exception" + JSON.stringify(e));
	}
}

function invokeWebService(body) {
	var input = {
			method : 'post',
			returnedContentType : 'xml',
			path : '/OTPService',
			body : {
				content : body,
				contentType : 'text/xml; charset=utf-8'
			}
	};
	var data=MFP.Server.invokeHttp(input)
	return _getCDATASHAPED(data);

}
//This function to remove the CDATA effect from the response of TIBCO
function _getCDATASHAPED(s) {
	for (var k in s){
		if(typeof s[k] != 'string' && !s[k].CDATA)
			s[k] = _getCDATASHAPED(s[k]);
		if(s[k].CDATA)
			s[k] = s[k].CDATA;
	}
	return s;
}
function serverErrorHandler() {
	var reponse = {};
	reponse.failure = {
			errorCode : "99"
	};

	return reponse;
}

function customErrorHandler(error){
	var reponse = {};
	reponse.failure = {
			errorCode : error
	};
	return reponse;
}

var logToServerForDebug = true;

function Log(text) {
	logToServerForDebug ? MFP.Logger.warn(text) : MFP.Logger.debug(text);
}

function handleError(msg,code){
	var msg= msg || "Internal Server Error";
	var code =code||500;

	adapterLogger("handleError","error", "Internal Error",JSON.stringify([msg,code]));
	var response = {
			"isSuccessful": false,
			"error": {
				"code": code,
				"message": msg,
				"adapter": "portalAdapter"
			}
	};
	adapterLogger("handleError","error", "Internal Error",JSON.stringify(response));
	return response;
}

//Adapter Procdures (Exposed and not Exposed)

function sendOTP(appId,userID,prefLang,method, phone,email){
	try{
		var request = createSoapRequestToSendOTP(appId,userID,prefLang,method, phone,email);
		//MFP.Logger.warn("|OTPAdapter |sendOTP |request: " + request);
		adapterLogger("sendOTP","info", "request",toString(request));
		var response=invokeWebService(request);
		//MFP.Logger.warn("|OTPAdapter |sendOTP |response: " + JSON.stringify(response));
		adapterLogger("sendOTP","info", "response",toString(response));
		return {
			response:response.Envelope.Body.sendOTPResponse
		}
	}
	catch(e){
		adapterLogger("sendOTP","error", "Exception",toString(e));
		return handleError();
	}
}

function sendOTPByID(appId,userID,prefLang,method,otpType){
	try{
		var userData =  MFP.Server.invokeProcedure({
			adapter : 'portalAdapter',
			procedure : 'getUserInfoForOTP',
			parameters : [userID,appId]
		});
		//MFP.Logger.warn("|OTPAdapter |sendOTPByID |userData: " + JSON.stringify(userData));
		adapterLogger("sendOTPByID","info", "invokeProcedure",toString(userData));
		if(userData.error == undefined){
			switch(otpType){
			case "EMAIL":{
				if(userData.isEmailVerified == "true" || userData.isEmailVerified == true){
					return sendOTP(appId,userID,prefLang,method, null,userData.email);

				}else{
					return customErrorHandler("ERR-VERIFICATION-MAIL");
				}
				break;
			}
			case "SMS":{
				if(userData.isMobileVerified == "true" || userData.isMobileVerified == true){
					if(userData.mobileNo[0] == "0" && userData.mobileNo[1] == "0"){
						userData.mobileNo = userData.mobileNo.substring(2,userData.mobileNo.length);
					}else if(userData.mobileNo[0] == "+"){
						userData.mobileNo = userData.mobileNo.substring(1,userData.mobileNo.length);
					}
					return sendOTP(appId,userID,prefLang,method, userData.mobileNo,null);

				}else{
					return customErrorHandler("ERR-VERIFICATION-SMS");
				}
				break;
			}
			}
		}else{
			return customErrorHandler(userData.error);
		}

		return serverErrorHandler();
	}
	catch(e){
		adapterLogger("sendOTPByID","error", "Exception",toString(e));
		return handleError();
	}
}

function createSoapRequestToSendOTP(appId,userID,prefLang,method, phone,email){
	try{
		var request = '<soapenv:Envelope xmlns:otp="http://www.rta.ae/EIP/OTPService/SharedResources/XMLSchema/OTPServiceSchema.xsd" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">'
			+'<soapenv:Header>'
			+'<wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
			+'<wsse:UsernameToken wsu:Id="UsernameToken-4">'
			+'<wsse:Username>'+WSSE_USERNAME+'</wsse:Username>'
			+'<wsse:Password>'+WSSE_PASSWORD+'</wsse:Password>'
			+'</wsse:UsernameToken>'
			+'</wsse:Security>'
			+'</soapenv:Header>'
			+'<soapenv:Body>'
			+'<otp:sendOTPRequest>'
			+'<otp:appId>'+appId+'</otp:appId>'
			+'<otp:userId>'+userID+'</otp:userId>'
			+'<otp:prefLang>'+prefLang+'</otp:prefLang>'
			if(email != undefined && email != null){
				request += '<otp:emailID>'+ email +'</otp:emailID>'
			}
		if(phone != undefined && phone != null){
			request += '<otp:mobileNbr>'+ phone +'</otp:mobileNbr>'
		}
		request += '<otp:methodName>'+method+'</otp:methodName>'
		+'</otp:sendOTPRequest>'
		+'</soapenv:Body>'
		+'</soapenv:Envelope>';

		return request;
	}
	catch(e){
		adapterLogger("createSoapRequestToSendOTP","error", "Exception",toString(e));
		return handleError();
	}
}

function verifyOTP(OTP,appId,userID,transRef){
	try{
		var request = '<soapenv:Envelope xmlns:otp="http://www.rta.ae/EIP/OTPService/SharedResources/XMLSchema/OTPServiceSchema.xsd" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">'
			+'<soapenv:Header>'
			+'<wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
			+'<wsse:UsernameToken wsu:Id="UsernameToken-6">'
			+'<wsse:Username>'+WSSE_USERNAME+'</wsse:Username>'
			+'<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+WSSE_PASSWORD+'</wsse:Password>'
			+'<wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">0PZ05rHOhekuirFTW2rECw==</wsse:Nonce>'
			+'<wsu:Created>2016-11-21T07:35:10.790Z</wsu:Created>'
			+'</wsse:UsernameToken>'
			+'</wsse:Security>'
			+'</soapenv:Header>'
			+'<soapenv:Body>'
			+'<otp:verifyOTPRequest>'
			+'<otp:appId>'+appId+'</otp:appId>'
			+'<otp:userId>'+userID+'</otp:userId>'
			+'<otp:OTP>'+OTP+'</otp:OTP>'
			+'<otp:transRef>'+transRef+'</otp:transRef>'
			+'</otp:verifyOTPRequest>'
			+'</soapenv:Body>'
			+'</soapenv:Envelope>';
	//	MFP.Logger.warn("|OTPAdapter |verifyOTP |request: " + request);
		adapterLogger("verifyOTP","info", "request",toString(request));
		var response = invokeWebService(request);
		//MFP.Logger.warn("|OTPAdapter |verifyOTP |response: " + JSON.stringify(response));
		adapterLogger("verifyOTP","info", "response",toString(response));
		return {
			response:response.Envelope.Body.verifyOTPResponse
		}
	}
	catch(e){
		adapterLogger("verifyOTP","error", "Exception",toString(e));
		return handleError();
	}
}





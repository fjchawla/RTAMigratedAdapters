
//Adapter Constants
var adapterName = "amRegisterationAdapter";
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
		MFP.Logger.error("|adapterName |adapterLogger |Exception" + toString(e));
	}
}

function handleError(msg,code){
	var msg= msg || "Internal Server Error";
	var code =code||500;

	adapterLogger("handleError","error", "Internal Error",toString([msg,code]));
	var response = {
			"isSuccessful": false,
			"error": {
				"code": code,
				"message": msg,
				"adapter": adapterName
			}
	};
	adapterLogger("handleError","error", "Internal Error",toString(response));
	return response;
}

function getSoapHeader() {
	var header = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/PortalProfileService/Schema.xsd">'
		+'<soapenv:Header>'
		+'<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse=" http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd " xmlns=" http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">'
		+'<wsse:UsernameToken>'
		+'<wsse:Username>'
		+ WSSE_USERNAME
		+'</wsse:Username>'
		+'<wsse:Password>'
		+ WSSE_PASSWORD
		+'</wsse:Password>'
		+'</wsse:UsernameToken>'
		+'</wsse:Security>'
		+'</soapenv:Header>';
	return header;
}

function invokeWebService(body) {
	var input = {
			method : 'post',
			returnedContentType : 'xml',
			path : '/portalprofileservice_v2',
			body : {
				content : body.toString(),
				contentType : 'text/xml; charset=utf-8'
			},
			connectionTimeoutInMilliseconds: 30000,
			socketTimeoutInMilliseconds: 30000
	};

	return MFP.Server.invokeHttp(input);
}

//Adapter Procdures (Exposed and not Exposed)
function createIndividualUser(userName, email,mobileNo,password,title,firstName,lastName,
		nationality,prefLanguage,appId,isEmailVerified,isMobileVerified,captchaObject) {
	try{
		var thirdParty = "No";
		var prefComm = "Email";
		var middleName = lastName;

		if(captchaObject)
		{
			var serviceName="Register";
			var captcha=JSON.parse(captchaObject);
			//MFP.Logger.warn("|aMRegisterationAdapter |createIndividualUser |ValidateCaptcha |captcha: " + captchaObject );
			adapterLogger("createIndividualUser","info", "ValidateCaptcha object",toString(captchaObject));
			
			var invocationData = {
					adapter : 'captchaAdapter',
					procedure : 'ValidateCaptcha',
					parameters : [captcha.key,captcha.userAnswerId,captcha.type,serviceName]
			};
			var result = MFP.Server.invokeProcedure(invocationData);
			//MFP.Logger.warn("|aMRegisterationAdapter |createIndividualUser |ValidateCaptcha |result: " +  JSON.stringify(result) );
			adapterLogger("createIndividualUser","info", "ValidateCaptcha response",toString(result));
			
			if (result &&result.isValid=="Valid"){
				var request = getSoapHeader()
				+'<soapenv:Body><sch:createIndividualUser>'
				+'<sch:email>'
				+email
				+'</sch:email>'
				+'<sch:thirdParty>'
				+thirdParty
				+'</sch:thirdParty>'
				+'<sch:prefLanguage>'
				+prefLanguage
				+'</sch:prefLanguage>'
				+'<sch:prefComm>'
				+prefComm
				+'</sch:prefComm>'
				+'<sch:title>'
				+title
				+'</sch:title>'
				+'<sch:fisrtName>'
				+firstName
				+'</sch:fisrtName>'
				+'<sch:middleName>'
				+middleName
				+'</sch:middleName>'
				+'<sch:lastName>'
				+lastName
				+'</sch:lastName>'
				+'<sch:nationality>'
				+nationality
				+'</sch:nationality>'
				+'<sch:mobileNo>'
				+mobileNo
				+'</sch:mobileNo>'
//				+'<sch:emiratesId>'
//				+emiratesId
//				+'</sch:emiratesId>'
				+'<sch:userId>'
				+userName
				+'</sch:userId>'
				+'<sch:password>'
				+password
				+'</sch:password>'
				+'<sch:isEmailVerified>'
				+isEmailVerified
				+'</sch:isEmailVerified>'
				+'<sch:isMobileVerified>'
				+isMobileVerified
				+'</sch:isMobileVerified>'
//				+'<sch:isEmiratesIdVerified>'
//				+isEmiratesIdVerified
//				+'</sch:isEmiratesIdVerified>'
				+'<sch:applicationId>'
				+appId
				+'</sch:applicationId>'
				+'</sch:createIndividualUser></soapenv:Body></soapenv:Envelope>';

				//MFP.Logger.warn("|amregisterationAdapter |createIndividualUser |request: " + request);
				adapterLogger("createIndividualUser","info", "request",toString(request));

				var response = invokeWebService(request);

				//MFP.Logger.warn("|amregisterationAdapter |createIndividualUser |response: " + JSON.stringify(response));
				
				adapterLogger("createIndividualUser","info", "response",toString(response));

				if (response && response.isSuccessful && response.statusCode == 200) {
					if (response.Envelope && response.Envelope.Body
							&& response.Envelope.Body.createIndividualUserReturn) {
						var createIndividualUserReturn = response.Envelope.Body.createIndividualUserReturn;

						if (createIndividualUserReturn.errorResponse) {
							return {
								failure : createIndividualUserReturn.errorResponse
							};
						} else if (createIndividualUserReturn.success) {
							return {
								success : true
							};
						}
					}
				}

				return response;

			}
			else {
				failure : "Invalid captcha";
			};
		}
		else // this for application that didnot use captcha and
		{
			var request = getSoapHeader()
			+'<soapenv:Body><sch:createIndividualUser>'
			+'<sch:email>'
			+email
			+'</sch:email>'
			+'<sch:thirdParty>'
			+thirdParty
			+'</sch:thirdParty>'
			+'<sch:prefLanguage>'
			+prefLanguage
			+'</sch:prefLanguage>'
			+'<sch:prefComm>'
			+prefComm
			+'</sch:prefComm>'
			+'<sch:title>'
			+title
			+'</sch:title>'
			+'<sch:fisrtName>'
			+firstName
			+'</sch:fisrtName>'
			+'<sch:middleName>'
			+middleName
			+'</sch:middleName>'
			+'<sch:lastName>'
			+lastName
			+'</sch:lastName>'
			+'<sch:nationality>'
			+nationality
			+'</sch:nationality>'
			+'<sch:mobileNo>'
			+mobileNo
			+'</sch:mobileNo>'
//			+'<sch:emiratesId>'
//			+emiratesId
//			+'</sch:emiratesId>'
			+'<sch:userId>'
			+userName
			+'</sch:userId>'
			+'<sch:password>'
			+password
			+'</sch:password>'
			+'<sch:isEmailVerified>'
			+isEmailVerified
			+'</sch:isEmailVerified>'
			+'<sch:isMobileVerified>'
			+isMobileVerified
			+'</sch:isMobileVerified>'
//			+'<sch:isEmiratesIdVerified>'
//			+isEmiratesIdVerified
//			+'</sch:isEmiratesIdVerified>'
			+'<sch:applicationId>'
			+appId
			+'</sch:applicationId>'
			+'</sch:createIndividualUser></soapenv:Body></soapenv:Envelope>';

			//MFP.Logger.warn("|amregisterationAdapter |createIndividualUser |request: " + request);
			adapterLogger("createIndividualUser","info", "request",toString(request));

			var response = invokeWebService(request);

			//MFP.Logger.warn("|amregisterationAdapter |createIndividualUser |response: " + JSON.stringify(response));
			adapterLogger("createIndividualUser","info", "response",toString(response));

			if (response && response.isSuccessful && response.statusCode == 200) {
				if (response.Envelope && response.Envelope.Body
						&& response.Envelope.Body.createIndividualUserReturn) {
					var createIndividualUserReturn = response.Envelope.Body.createIndividualUserReturn;

					if (createIndividualUserReturn.errorResponse) {
						return {
							failure : createIndividualUserReturn.errorResponse
						};
					} else if (createIndividualUserReturn.success) {
						return {
							success : true
						};
					}
				}
			}

			return response;
		}
	}
	catch(e){
		adapterLogger("createIndividualUser","error", "Exception",toString(e));
		return handleError();
	}
}


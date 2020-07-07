var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM'; //Prod Password

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;

function getNocDetailsInfo(applicationRefNo, trafficFileNo, tradeLicenseNo){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && 
		MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? 
		MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	try {
		tradeLicenseNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.
		getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.
		getAuthenticatedUser('masterAuthRealm').corporatesAttributes.businessLicenseNo: tradeLicenseNo;
	} catch (e) {
		// TODO: handle exception
	}
	var path = "/nocservice";
	var soapActionHeader = '"GetNOCDetails"';
	var getNOCRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CMLNOCService/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
       <wsse:UsernameToken>\
			<wsse:Username>'+tibcoUsername+'</wsse:Username>\
			<wsse:Password>'+tibocPwd+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
    <sch:ExternalUser>\
	    <sch:clientUsername>'+EXTERNAL_USERNAME+'</sch:clientUsername>\
	    <sch:clientPassword>'+EXTERNAL_PASSWORD+'</sch:clientPassword>\
    </sch:ExternalUser>\
 </soapenv:Header>\
 <soapenv:Body>\
    <sch:getNocDetailsInfo>\
       <!--Optional:-->\
       <sch:applicationRefNo>'+applicationRefNo+'</sch:applicationRefNo>\
       <!--Optional:-->\
       <sch:trafficFileNo>'+trafficFileNo+'</sch:trafficFileNo>\
       <!--Optional:-->\
       <sch:tradeLicenseNo>'+tradeLicenseNo+'</sch:tradeLicenseNo>\
    </sch:getNocDetailsInfo>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getNOCRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getNocDetailsReturn) == "undefined") {
		MFP.Logger.warn("Error get NOC details");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again"
		};
	}
	
	if(response.Envelope.Body.getNocDetailsReturn.status !== "0"){
		return {
			isSuccessful : true,
			errorResponse : response.Envelope.Body.getNocDetailsReturn.errorResponse,
			Status : "Failed"
		};
	}
//		return {
//			isSuccessful : true,
//			nocDetail : response.Envelope.Body.getNocDetailsReturn.getNocDetailsResponseInfo,
//			Status : "Success"
//		};
	return {
		isSuccessful : true,
		nocDetail : [{"applicationDate": "20-11-2013",
		      "applicationRefNo": "31890",
		      "applicationTypeCode": "4",
		      "applicationTypeDescAr": "تجديد التصريح",
		      "applicationTypeDescEn": "renew permit",
		      "letterRefNo": "38863",
		      "trafficFileNo": "50023951"},
		      {"applicationDate": "02-01-2014",
			      "applicationRefNo": "31890",
			      "applicationTypeCode": "5",
			      "applicationTypeDescAr": "2 تجديد التصريح",
			      "applicationTypeDescEn": "renew permit 2",
			      "letterRefNo": "38863",
			      "trafficFileNo": "50023951"},
		      {"applicationDate": "16-09-2014",
			      "applicationRefNo": "31890",
			      "applicationTypeCode": "6",
			      "applicationTypeDescAr": "تجديد التصريح 3",
			      "applicationTypeDescEn": "renew permit 3",
			      "letterRefNo": "38863",
			      "trafficFileNo": "50023951"}],
		      Status : "Success"
	};
		
}

function getNocInformations(trafficFileNo){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && 
		MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? 
		MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var path = "getnocinformationservice";
	var soapActionHeader = '"GetNOCInformation"';
	var getNOCRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/GetNOCInformationService/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
    <sch:ExternalUser>\
	       <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>\
	       <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>\
    </sch:ExternalUser>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
  <wsse:UsernameToken>\
          <wsse:Username>Mobstguser</wsse:Username>\
          <wsse:Password>1^p(4q!7jr*8</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <sch:getNocInformationRequest>\
       <!--Optional:-->\
       <sch:trafficFileNo>'+trafficFileNo+'</sch:trafficFileNo>\
    </sch:getNocInformationRequest>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getNOCRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getNocInformationResponse) == "undefined") {
		MFP.Logger.warn("Error get NOC details");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again"
		};
	}
	
	if(response.Envelope.Body.getNocInformationResponse.response.responseCode !== "0"){
		return {
			isSuccessful : true,
			errorResponse : response.Envelope.Body.getNocInformationResponse.response,
			Status : "Failed"
		};
	}
		return {
			isSuccessful : true,
			nocInformation : response.Envelope.Body.getNocInformationResponse.nocInformation,
			Status : "Success"
		};
		
}
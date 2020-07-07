var SECURITY_USERNAME = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var SECURITY_PASSWORD = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;
var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';

var path = "/corporateService";

// PROD and UAT & SIT path
//var path = "/corporateService";

function getActiveBookletByTrafficNo(trafficNo) {
	try {
		trafficNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficNo;
	} catch (e) {
		// TODO: handle exception
	}

	var soapActionHeader = '"getActiveBookletByTrafficNoOperation"';
	var getActiveBookletByTrafficNoRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/XMLSchema/Schema.xsd" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
	+'<soapenv:Header>'
	+'<wsse:Security>'
	+'<wsse:UsernameToken>'
	+'<wsse:Username>'+SECURITY_USERNAME+'</wsse:Username>'
	+'<wsse:Password>'+SECURITY_PASSWORD+'</wsse:Password>'
	+'</wsse:UsernameToken>'
	+'</wsse:Security>'
	+'<sch:ExternalUser>'
	+' <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>'
	+' <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>'
	+'</sch:ExternalUser>'
	+' </soapenv:Header>'
	+'<soapenv:Body>'
	+' <sch:getActiveBookletByTrafficNo>'
	+' <sch:trafficNo>'+ trafficNo + '</sch:trafficNo>'
	+' </sch:getActiveBookletByTrafficNo>'
	+'</soapenv:Body>'
	+'</soapenv:Envelope>';
	
	var input = {
		method : 'POST',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getActiveBookletByTrafficNoRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		},
		transformation: {
			type: 'xslFile',
			xslFile: "getActiveBookletByTrafficNo.xsl"
		}
	};
	var response = MFP.Server.invokeHttp(input);
	if(response.isSuccessful)
		return {result: response};
	else
		return {
		isSuccessful : false,
		errorCode : "301",
		message : "An error has been occured in the server. Kindly try again",
		reference:response
	} ;
}

function getPlates(trafficNo) {
	try {
		trafficNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo	: trafficNo;
	} catch (e) {
		// TODO: handle exception
	}

	var soapActionHeader = '"getActiveBookletByTrafficNoOperation"';
	var getActiveBookletByTrafficNoRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/XMLSchema/Schema.xsd" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
	+'<soapenv:Header>'
	+'<wsse:Security>'
	+'<wsse:UsernameToken>'
	+'<wsse:Username>'+SECURITY_USERNAME+'</wsse:Username>'
	+'<wsse:Password>'+SECURITY_PASSWORD+'</wsse:Password>'
	+'</wsse:UsernameToken>'
	+'</wsse:Security>'
	+'<sch:ExternalUser>'
	+' <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>'
	+' <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>'
	+'</sch:ExternalUser>'
	+' </soapenv:Header>'
	+'<soapenv:Body>'
	+' <sch:getActiveBookletByTrafficNo>'
	+' <sch:trafficNo>'+ trafficNo + '</sch:trafficNo>'
	+' </sch:getActiveBookletByTrafficNo>'
	+'</soapenv:Body>'
	+'</soapenv:Envelope>';
	
	var input = {
		method : 'POST',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getActiveBookletByTrafficNoRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		},
   	   
	};
	var response = MFP.Server.invokeHttp(input);
	if(response.isSuccessful)
		return {result: response};
	else
		return {
		isSuccessful : false,
		errorCode : "301",
		message : "An error has been occured in the server. Kindly try again",
		reference:response,
		request: getActiveBookletByTrafficNoRequest.toString()
	} ;
}
function getInsuranceCompanies() {

	var soapActionHeader = '"getInsuranceCompaniesOperation"';
	var getInsuranceCompaniesRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/XMLSchema/Schema.xsd" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
		+'<soapenv:Header>'
		+'<wsse:Security>'
		+'<wsse:UsernameToken>'
		+'<wsse:Username>'+SECURITY_USERNAME+'</wsse:Username>'
		+'<wsse:Password>'+SECURITY_PASSWORD+'</wsse:Password>'
		+'</wsse:UsernameToken>'
		+'</wsse:Security>'
	  +' <sch:ExternalUser>'
	  +' <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>'
	  +' <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>'
	  +' </sch:ExternalUser>'
	  +' </soapenv:Header>'
	  +' <soapenv:Body>'
	  +' <sch:getInsuranceCompanies/>'
	  +' </soapenv:Body>'
	  +' </soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getInsuranceCompaniesRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		},
		transformation: {
			type: 'xslFile',
			xslFile: "getInsuranceCompanies.xsl"
		} 
	};
	var response = MFP.Server.invokeHttp(input);
	if(response.isSuccessful)
		return {result: response};
	else
		return {
		isSuccessful : false,
		errorCode : "301",
		message : "An error has been occured in the server. Kindly try again"
	} ;
}

function getReservedPlateByTrafficNo(trafficNo) {
	try {
		trafficNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo	: trafficNo;
	} catch (e) {
		// TODO: handle exception
	}

	var soapActionHeader = '"getReservedPlateByTrafficNoOperation"';
	var getReservedPlateByTrafficNoRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/XMLSchema/Schema.xsd" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
		+'<soapenv:Header>'
		+'<wsse:Security>'
		+'<wsse:UsernameToken>'
		+'<wsse:Username>'+SECURITY_USERNAME+'</wsse:Username>'
		+'<wsse:Password>'+SECURITY_PASSWORD+'</wsse:Password>'
		+'</wsse:UsernameToken>'
		+'</wsse:Security>'
	  +' <sch:ExternalUser>'
	  +' <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>'
	  +' <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>'
	  +' </sch:ExternalUser>'
	  +' </soapenv:Header>'
	  +' <soapenv:Body>'
	  +' <sch:getReservedPlateByTrafficNo>'
	  +' <sch:trafficNo>'+ trafficNo +'</sch:trafficNo>'
	  +' </sch:getReservedPlateByTrafficNo>'
	  +' </soapenv:Body>'
	  +' </soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getReservedPlateByTrafficNoRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		},
		transformation: {
			type: 'xslFile',
			xslFile: "getReservedPlateByTrafficNo.xsl"
		}
	};
	var response = MFP.Server.invokeHttp(input);
	if(response.isSuccessful)
		return {result: response};
	else
		return {
		isSuccessful : false,
		errorCode : "301",
		message : "An error has been occured in the server. Kindly try again"
	} ;
}

function getReservedPlatesAndCompanies(trafficNo) {
	try {
		trafficNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficNo;
	} catch (e) {
		// TODO: handle exception
	}
	var result = {
			plates : {},
			organizations : {}
	} ;

	var soapActionHeader = '"getReservedPlateByTrafficNoOperation"';
	var getReservedPlateByTrafficNoRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/XMLSchema/Schema.xsd" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
		+'<soapenv:Header>'
		+'<wsse:Security>'
		+'<wsse:UsernameToken>'
		+'<wsse:Username>'+SECURITY_USERNAME+'</wsse:Username>'
		+'<wsse:Password>'+SECURITY_PASSWORD+'</wsse:Password>'
		+'</wsse:UsernameToken>'
		+'</wsse:Security>'
	  +' <sch:ExternalUser>'
	  +' <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>'
	  +' <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>'
	  +' </sch:ExternalUser>'
	  +' </soapenv:Header>'
	  +' <soapenv:Body>'
	  +' <sch:getReservedPlateByTrafficNo>'
	  +' <sch:trafficNo>'+ trafficNo +'</sch:trafficNo>'
	  +' </sch:getReservedPlateByTrafficNo>'
	  +' </soapenv:Body>'
	  +' </soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getReservedPlateByTrafficNoRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		},
		transformation: {
			type: 'xslFile',
			xslFile: "getReservedPlateByTrafficNo.xsl"
		}
	};
	var response = MFP.Server.invokeHttp(input);
	
	if(response.isSuccessful){
		result.plates = response.plates;
		result.organizations = getInsuranceCompanies();
		return result;
	}
	else
		return {
		isSuccessful : false,
		errorCode : "301",
		message : "An error has been occured in the server. Kindly try again",
		reference: response
	} ;
}

function getCommercialPlates(trafficNo) {
	try {
		trafficNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficNo;
	} catch (e) {
		// TODO: handle exception
	}

	var soapActionHeader = '"getActiveBookletByTrafficNoOperation"';
	var getActiveBookletByTrafficNoRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/XMLSchema/Schema.xsd" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
	+'<soapenv:Header>'
	+'<wsse:Security>'
	+'<wsse:UsernameToken>'
	+'<wsse:Username>'+SECURITY_USERNAME+'</wsse:Username>'
	+'<wsse:Password>'+SECURITY_PASSWORD+'</wsse:Password>'
	+'</wsse:UsernameToken>'
	+'</wsse:Security>'
	+'<sch:ExternalUser>'
	+' <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>'
	+' <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>'
	+'</sch:ExternalUser>'
	+' </soapenv:Header>'
	+'<soapenv:Body>'
	+' <sch:getActiveBookletByTrafficNo>'
	+' <sch:trafficNo>'+ trafficNo + '</sch:trafficNo>'
	+' </sch:getActiveBookletByTrafficNo>'
	+'</soapenv:Body>'
	+'</soapenv:Envelope>';
	
	var input = {
		method : 'POST',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getActiveBookletByTrafficNoRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		},
	};
	var response = MFP.Server.invokeHttp(input);
	
	if(response.Envelope.Body == undefined || response.Envelope.Body.getActiveBookletByTrafficNoReturn == undefined ||response.Envelope.Body.getActiveBookletByTrafficNoReturn.plates == undefined || response.Envelope.Body.getActiveBookletByTrafficNoReturn.plates.plate == undefined){
		
//		plateCategoryDescEn
					
		return {
			isSuccessful : false,
			errorCode : 380,
			message : "An error has been occured in the server. Kindly try again",
			reference : response,
				
		};
	}

	var plates = response.Envelope.Body.getActiveBookletByTrafficNoReturn.plates.plate ;
	if(plates == undefined){
		return {
			isSuccessful : true,
			result : {
							plates :  []
			}
		};
	}
	if(!Array.isArray(plates)) plates = [plates];
	var newPlatesArray = [];
	
	for(var i=0 ; i< plates.length; i++){
		var plate = plates[i];
		MFP.Logger.info("plate.plateCategoryCode = "+plate.plateCategoryCode);
		MFP.Logger.info("plate.plateCategoryCode != 5  "+(plate.plateCategoryCode != "5"));
		if (plate.plateCategoryCode != "5") continue ; //If different than commercial plate 
		var plateObj = {
				plateExpiryData : plate.bookletExpiryDate,
				plateId : plate.plateId,
				insurance_expiry_date : plate.insuranceExpiryDate,
				plateNo : plate.plateNo,
		};
		
		newPlatesArray.push(plateObj) ;
	}
		return {
		isSuccessful : true,
		result : {
						plates :  newPlatesArray
					}
	};

}



function getExtraLoadPlates(trafficNo) {
	try {
		trafficNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm')!= null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficNo;
	} catch (e) {
		// TODO: handle exception
	}
	var soapActionHeader = '"getActiveBookletByTrafficNoOperation"';
	var getActiveBookletByTrafficNoRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/XMLSchema/Schema.xsd" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
	+'<soapenv:Header>'
	+'<wsse:Security>'
	+'<wsse:UsernameToken>'
	+'<wsse:Username>'+SECURITY_USERNAME+'</wsse:Username>'
	+'<wsse:Password>'+SECURITY_PASSWORD+'</wsse:Password>'
	+'</wsse:UsernameToken>'
	+'</wsse:Security>'
	+'<sch:ExternalUser>'
	+' <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>'
	+' <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>'
	+'</sch:ExternalUser>'
	+' </soapenv:Header>'
	+'<soapenv:Body>'
	+' <sch:getActiveBookletByTrafficNo>'
	+' <sch:trafficNo>'+ trafficNo + '</sch:trafficNo>'
	+' </sch:getActiveBookletByTrafficNo>'
	+'</soapenv:Body>'
	+'</soapenv:Envelope>';
	
	var input = {
		method : 'POST',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getActiveBookletByTrafficNoRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		},
	};
	var response = MFP.Server.invokeHttp(input);
	
	if(response.Envelope.Body == undefined || response.Envelope.Body.getActiveBookletByTrafficNoReturn == undefined ||response.Envelope.Body.getActiveBookletByTrafficNoReturn.plates == undefined || response.Envelope.Body.getActiveBookletByTrafficNoReturn.plates.plate == undefined){
		
//		plateCategoryDescEn
					
		return {
			isSuccessful : false,
			errorCode : 380,
			message : "An error has been occured in the server. Kindly try again",
			reference : response,
				
		};
	}

	var plates = response.Envelope.Body.getActiveBookletByTrafficNoReturn.plates.plate ;
	if(plates == undefined){
		return {
			isSuccessful : true,
			result : {
							plates :  []
						}
		};
	}
	
	if(!Array.isArray(plates)) plates = [plates];
	var newPlatesArray = [];
	
	for(var i=0 ; i< plates.length; i++){
		var plate = plates[i];
		var plateObj = {
				plateId : plate.plateId,
				plateNo : plate.plateNo,
				platePssCode : plate.platePssCode,
				plateCategoryPssCode : plate.plateCategoryPssCode,
		};
		
		newPlatesArray.push(plateObj) ;
	}
		return {
		isSuccessful : true,
		result : {
						plates :  newPlatesArray
					}
	};

}
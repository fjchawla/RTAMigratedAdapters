var WSSE_USERNAME = MFP.Server.getPropertyValue("tokens.tipcoService.username");
var WSSE_PASSWORD = MFP.Server.getPropertyValue("tokens.tipcoService.password");

var USER_NAME = "Omnix_User";
//var PASSWORD = "test12345";
var PASSWORD = '555M55MM';

function getPTADriverPermitDetails(trafficNO, drivingLicenseNo, drivingLicenseIssueDate, birthYear) {
	var soapActionHeader = '"GetPTADriverPermitDetails"';
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/GetPTADriverPermitDetailsServiceSchema/XMLSchema">\
	     <soapenv:Header>\
	      <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	         <wsse:UsernameToken>\
	            <wsse:Username>'+WSSE_USERNAME+'</wsse:Username>\
	            <wsse:Password>'+WSSE_PASSWORD+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
	       <xs:ExternalUser>\
	         <xs:externalUsername>'+USER_NAME+'</xs:externalUsername>\
	         <xs:externalUserPassword>'+PASSWORD+'</xs:externalUserPassword>\
	      </xs:ExternalUser>\
	   </soapenv:Header>\
		<soapenv:Body>\
		<xs:getPTADriverPermitDetailsRequest>\
		<xs:trafficNo>'
		+trafficNO
		+'</xs:trafficNo>\
		<xs:drivingLicenseNo>'
		+drivingLicenseNo
		+'</xs:drivingLicenseNo>\
		<xs:drivingLicenseIssueDate>'
		+drivingLicenseIssueDate
		+'</xs:drivingLicenseIssueDate>\
		<xs:birthYear>'
		+birthYear
		+'</xs:birthYear>\
		</xs:getPTADriverPermitDetailsRequest>\
		</soapenv:Body>\
		</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'getPTADriverPermitDetails';
	var input = {
			method : 'POST',
			returnedContentType : 'xml',
			headers : {'SOAPAction' : soapActionHeader},
			path : path,
			body : {
				content : transactionString.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
	};


	var response = invokeTimestampedProcedure(input, 'getPTADriverPermitDetails');
	MFP.Logger.info(response);
	
	if(response.Envelope.Body.getPTADriverPermitDetailsResponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 333,
			message : "An error has occured in Getting PTA Driver Permit Details. Kindly try again",
			reference : response
		};
	}
	if(response.Envelope.Body.getPTADriverPermitDetailsResponse.response.responseCode !="0" ){
		return {
			isSuccessful : false,
			errorCode : 334,
			message : "Provided information are not correct",
			responseCode : response.Envelope.Body.getPTADriverPermitDetailsResponse.response.responseCode,
			responseMessageAr : response.Envelope.Body.getPTADriverPermitDetailsResponse.response.responseMessageAr,
			responseMessageEn : response.Envelope.Body.getPTADriverPermitDetailsResponse.response.responseMessageEn,
			reference : response
		};
	}	
	
		if(response.Envelope.Body.getPTADriverPermitDetailsResponse.permitDetails == undefined){
			return {
				isSuccessful : false,
				errorCode : 333,
				message : "An error has occured in Getting PTA Driver Permit Details. Kindly try again.",
				reference : response
			};
		}
	
	return response.Envelope.Body.getPTADriverPermitDetailsResponse.permitDetails;
	
	
}

function invokeTimestampedProcedure(input,methodName){
	MFP.Logger.info('Start invoking web service '+input.path+' method name : '+methodName);
	var startTime = new Date().getTime() ;
	var response = MFP.Server.invokeHttp(input);
	var endTime = new Date().getTime();
	MFP.Logger.info('END invoking web service '+input.path+' method name : '+methodName+' Took (ms) '+ (endTime - startTime));
	
	return response ;
}

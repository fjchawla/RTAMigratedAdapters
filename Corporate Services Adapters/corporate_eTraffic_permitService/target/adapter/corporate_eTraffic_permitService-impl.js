var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;


function getPermitDetails(trafficFileNumber){
	try {
		trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNumber;
	} catch (e) {
		// TODO: handle exception
	}
	var path = "/permitDetailsService";
	//var path = "/permitDetailsService";
	var soapActionHeader = '"getPermitDetails"';
	var getPermitDetailRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/schemas/PermitDetailsService/Schema.xsd">\
		 <soapenv:Header>\
    <sch:ExternalUser>\
       <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>\
       <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>\
    </sch:ExternalUser>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
  <wsse:UsernameToken>\
	<wsse:Username>'+tibcoUsername+'</wsse:Username>\
	<wsse:Password>'+tibocPwd+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <sch:getPermitDetailsRequest>\
       <sch:permitDetails>\
          <sch:trafficFileNumber>'+trafficFileNumber+'</sch:trafficFileNumber>\
       </sch:permitDetails>\
    </sch:getPermitDetailsRequest>\
    <sch:ExternalUser>\
    <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>\
    <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>\
 </sch:ExternalUser>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getPermitDetailRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getPermitDetailsReturn) == "undefined" || response.Envelope.Body.getPermitDetailsReturn.getPermitDetailsReturnType == undefined) {
		MFP.Logger.warn("Error get permit details");
		return {
			isSuccessful : false,
			errorCode : 999,
			message : "An error has been occured in the server. Kindly try again",
			reference: response
		};
	}
				var permitDetails = response.Envelope.Body.getPermitDetailsReturn.getPermitDetailsReturnType;
				if(!Array.isArray(permitDetails)){
					permitDetails = [permitDetails];
				}
				return {
					isSuccessful : true,
					permitDetails : permitDetails
				};
}

function isBranch(trafficFileNo) {
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var getPermitDetailsResponse = getPermitDetails(trafficFileNo);
	if (getPermitDetailsResponse == undefined || !getPermitDetailsResponse.isSuccessful
			|| getPermitDetailsResponse.permitDetails[0] == undefined
			|| getPermitDetailsResponse.permitDetails[0].organizationTypeId == undefined) {
		return {
			isSuccessful : false,
			errorCode : 306,
			// 301 means error creating transaction
			message : "NO Permit according to this trafficFileNo. Kindly Try with another trafficFileNo",
			reference : getPermitDetailsResponse
		};
	}
	var organizationTypeId = getPermitDetailsResponse.permitDetails[0].organizationTypeId;
	if (organizationTypeId == "1") {
		return {
			isSuccessful : true,
			isBranch : "0", // head quarter
			trafficFileNo : trafficFileNo
		};
	} else {
		return {
			isSuccessful : true,
			isBranch : "1", // branch
			trafficFileNo : trafficFileNo
		};
	}
}
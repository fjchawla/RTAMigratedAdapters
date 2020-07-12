var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;

function getOrganizationMembers(trafficFileNo){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	//local
//	var path = "/getorganizationmemberservice";
	// SIT & UAT & PROD
	var path = "/getOrganizationMembersService";
	var soapActionHeader = '"getOrganizationMembersList"';
	var getOrganizationMembersRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/GetOrganizationMemberService/Schema.xsd">\
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
    <sch:getOrganizationMembers>\
       <sch:trafficFileNo>'+trafficFileNo+'</sch:trafficFileNo>\
    </sch:getOrganizationMembers>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getOrganizationMembersRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getOrganizationMembersListReturn) == "undefined") {
		MFP.Logger.warn("Error get organization members");
		return {
			isSuccessful : false,
			errorCode : 306,
			message : "An error has been occured in the server. Kindly try again",
			reference : response
		};
	}
		
	if(typeof response.Envelope.Body.getOrganizationMembersListReturn.organizationMembersListResponse.members == "undefined"){
		return {
			members : [],
			responseDescription : response.Envelope.Body.getOrganizationMembersListReturn.organizationMembersListResponse.responseDescription,
			responseCode : response.Envelope.Body.getOrganizationMembersListReturn.organizationMembersListResponse.responseCode
		};
	}
			var members = response.Envelope.Body.getOrganizationMembersListReturn.organizationMembersListResponse.members.organizationMembersType;
			if(!Array.isArray(members)){
				organizationMembers = [members];
			}
			return {
				isSuccessful : true,
				members : members,
				responseDescription : response.Envelope.Body.getOrganizationMembersListReturn.organizationMembersListResponse.responseDescription,
				responseCode : response.Envelope.Body.getOrganizationMembersListReturn.organizationMembersListResponse.responseCode
			};
}
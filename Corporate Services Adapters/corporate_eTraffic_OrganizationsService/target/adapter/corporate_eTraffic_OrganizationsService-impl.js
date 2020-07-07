var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;

var path = "/organizationsService";
//var path = "/organizationservice";

function getActivitiesGroupList(){
	var soapActionHeader = '"getActivitiesList"';
	var getActivitiesRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/CML_OrganizationService/Schema.xsd">\
	    <soapenv:Header>\
    <sch:ExternalUser>\
      <sch:clientUsername>'+EXTERNAL_USERNAME+'</sch:clientUsername>\
          <sch:clientPassword>'+EXTERNAL_PASSWORD+'</sch:clientPassword>\
    </sch:ExternalUser>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
  <wsse:UsernameToken>\
		  <wsse:Username>'+tibcoUsername+'</wsse:Username>\
		  <wsse:Password>'+tibocPwd+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <sch:getActivitiesList>\
       <sch:getActivitiesListRequest/>\
    </sch:getActivitiesList>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getActivitiesRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getActivitiesListReturn) == "undefined") {
		MFP.Logger.warn("Error get activities group list");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference: response
		};
	}
		if(typeof response.Envelope.Body.getActivitiesListReturn.getActivitiesListResponse.activityGroups == "undefined"){
			return response.Envelope.Body.getActivitiesListReturn.getActivitiesListResponse;
		}
				var activities = response.Envelope.Body.getActivitiesListReturn.getActivitiesListResponse.activityGroups.activityGroupType;
				if(!Array.isArray(activities)){
					activities = [activities];
				}
				return {
					isSuccessful : true,
					activitieGroupTypes : activities,
					responseDescription : response.Envelope.Body.getActivitiesListReturn.getActivitiesListResponse.responseDescription,
					responseCode : response.Envelope.Body.getActivitiesListReturn.getActivitiesListResponse.responseCode
				};
		
}

function getActivitiesGroupListByTrafficNo(trafficFileNo){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUserr('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var soapActionHeader = '"getActivitiesList"';
	var getActivitiesRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/CML_OrganizationService/Schema.xsd">\
	    <soapenv:Header>\
    <sch:ExternalUser>\
      <sch:clientUsername>'+EXTERNAL_USERNAME+'</sch:clientUsername>\
          <sch:clientPassword>'+EXTERNAL_PASSWORD+'</sch:clientPassword>\
    </sch:ExternalUser>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
  <wsse:UsernameToken>\
		  <wsse:Username>'+tibcoUsername+'</wsse:Username>\
		  <wsse:Password>'+tibocPwd+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <sch:getActivitiesList>\
       <sch:getActivitiesListRequest/>\
    </sch:getActivitiesList>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getActivitiesRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getActivitiesListReturn) == "undefined") {
		MFP.Logger.warn("Error get activities group list");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference: response
		};
	}
		if(typeof response.Envelope.Body.getActivitiesListReturn.getActivitiesListResponse.activityGroups == "undefined"){
			return response.Envelope.Body.getActivitiesListReturn.getActivitiesListResponse;
		}
				var activities = response.Envelope.Body.getActivitiesListReturn.getActivitiesListResponse.activityGroups.activityGroupType;
				if(!Array.isArray(activities)){
					activities = [activities];
				}
				MFP.Logger.warn(activities);
				var activityGroupResponse = getActivityGroup(trafficFileNo);
				
				//TODO return direct
				
				if(typeof activityGroupResponse == "undefined" || typeof activityGroupResponse.activityGroupType == "undefined"){
					return {
						isSuccessful : false,
						errorCode : 305,
						message : "There is no activity with this trafficFileNo."
					};
				}
				
//				var groupId = activityGroupResponse.activityGroupType.code;
				var groupId = "";
				var activityGroupResponseArray = activityGroupResponse.activityGroupType;
				if(!Array.isArray(activityGroupResponseArray)){
					activityGroupResponseArray = [activityGroupResponseArray];
				}
				for(i in activityGroupResponseArray){
					if(activityGroupResponseArray[i].code == "0"){
						return{
							activitieGroupTypes : activityGroupResponseArray,
							responseDescription : activityGroupResponse.responseDescription,
							responseCode : activityGroupResponse.responseCode
						};
					}
					if(activityGroupResponseArray[i].nameAr != "" && activityGroupResponseArray[i].code != "0"){
						groupId = activityGroupResponseArray[i].code;
						break;
					}
				}
				for(i in activities){
					if(activities[i].code == groupId){
						return {
							isSuccessful : true,
							activitieGroupTypes : activities[i],
							responseDescription : response.Envelope.Body.getActivitiesListReturn.getActivitiesListResponse.responseDescription,
							responseCode : response.Envelope.Body.getActivitiesListReturn.getActivitiesListResponse.responseCode
						};
					}
				}
				
}

function getActivityGroup(trafficFileNo){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm')  != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm') .corporatesAttributes.trafficNo: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var soapActionHeader = '"getActivityGroup"';
	var getActivityRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/CML_OrganizationService/Schema.xsd">\
	    <soapenv:Header>\
    <sch:ExternalUser>\
	      <sch:clientUsername>'+EXTERNAL_USERNAME+'</sch:clientUsername>\
          <sch:clientPassword>'+EXTERNAL_PASSWORD+'</sch:clientPassword>\
    </sch:ExternalUser>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
  <wsse:UsernameToken>\
	<wsse:Username>'+tibcoUsername+'</wsse:Username>\
	<wsse:Password>'+tibocPwd+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <sch:getActivityGroup>\
       <sch:getActivityGroupRequest>\
          <sch:trafficFileNo>'+trafficFileNo+'</sch:trafficFileNo>\
       </sch:getActivityGroupRequest>\
    </sch:getActivityGroup>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getActivityRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getActivityGroupReturn) == "undefined") {
		MFP.Logger.warn("Error get activity group");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference: response
		};
	}
		if(typeof response.Envelope.Body.getActivityGroupReturn.getActivityGroupResponse.activityGroups == "undefined"){
			return response.Envelope.Body.getActivityGroupReturn.getActivityGroupResponse;
		}
				return {
					isSuccessful : true,
					activityGroupType : response.Envelope.Body.getActivityGroupReturn.getActivityGroupResponse.activityGroups.activityGroupType,
					responseDescription : response.Envelope.Body.getActivityGroupReturn.getActivityGroupResponse.responseDescription,
					responseCode : response.Envelope.Body.getActivityGroupReturn.getActivityGroupResponse.responseCode
				};
		
}

function getLegalClasses(){
	var soapActionHeader = '"getLegalClasses"';
	var getLegalClassesRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/CML_OrganizationService/Schema.xsd">\
	    <soapenv:Header>\
    <sch:ExternalUser>\
	      <sch:clientUsername>'+EXTERNAL_USERNAME+'</sch:clientUsername>\
          <sch:clientPassword>'+EXTERNAL_PASSWORD+'</sch:clientPassword>\
    </sch:ExternalUser>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
  <wsse:UsernameToken>\
	<wsse:Username>'+tibcoUsername+'</wsse:Username>\
	<wsse:Password>'+tibocPwd+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <sch:getLegalClasses>\
       <sch:getLegalClassesRequest/>\
    </sch:getLegalClasses>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getLegalClassesRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getLegalClassesReturn) == "undefined") {
		MFP.Logger.warn("Error get legal classes");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference: response
		};
	}
		if(typeof response.Envelope.Body.getLegalClassesReturn.getLegalClassesResponse.legalClasses == "undefined"){
			return response.Envelope.Body.getLegalClassesReturn.getLegalClassesResponse;
		}
				var legalClasses = response.Envelope.Body.getLegalClassesReturn.getLegalClassesResponse.legalClasses.legalClassType;
				if(!Array.isArray(legalClasses)){
					legalClasses = [legalClasses];
				}
				return {
					isSuccessful : true,
					legalClassesTypes : legalClasses,
					responseDescription : response.Envelope.Body.getLegalClassesReturn.getLegalClassesResponse.responseDescription,
					responseCode : response.Envelope.Body.getLegalClassesReturn.getLegalClassesResponse.responseCode
				};
}

function getOrganizationInfo(trafficFileNo){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var soapActionHeader = '"getOrganizationInfo"';
	var getOrgInfoRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/CML_OrganizationService/Schema.xsd">\
		   <soapenv:Header>\
    <sch:ExternalUser>\
      <sch:clientUsername>Omnix_User</sch:clientUsername>\
          <sch:clientPassword>mfurmdz</sch:clientPassword>\
    </sch:ExternalUser>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
  <wsse:UsernameToken>\
		<wsse:Username>'+tibcoUsername+'</wsse:Username>\
		<wsse:Password>'+tibocPwd+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <sch:getOrganizationInfo>\
       <sch:getOrganizationInfoRequest>\
          <sch:trafficFileNo>'+trafficFileNo+'</sch:trafficFileNo>\
       </sch:getOrganizationInfoRequest>\
    </sch:getOrganizationInfo>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getOrgInfoRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getOrganizationInfoReturn) == "undefined") {
		MFP.Logger.warn("Error get organization Info");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference: response
		};
	}
		if(typeof response.Envelope.Body.getOrganizationInfoReturn.getOrganizationInfoResponse.organizationInfoType == "undefined"){
			return response.Envelope.Body.getOrganizationInfoReturn.getOrganizationInfoResponse;
		}
				return {
					isSuccessful : true,
					organizationInfoType : response.Envelope.Body.getOrganizationInfoReturn.getOrganizationInfoResponse.organizationInfoType,
					responseDescription : response.Envelope.Body.getOrganizationInfoReturn.getOrganizationInfoResponse.responseDescription,
					responseCode : response.Envelope.Body.getOrganizationInfoReturn.getOrganizationInfoResponse.responseCode
				};
}
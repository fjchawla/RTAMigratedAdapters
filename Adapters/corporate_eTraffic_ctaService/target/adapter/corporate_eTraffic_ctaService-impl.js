var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';
var CENTER_CODE = 1493;
var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;
function addActivity(transactionId, orgCatIdOld, actionStatus, cmaTrsId, cmlTrsId, cnaTrsId, orgCatId, emirateCode, orgId){
	var path = "/ctaservice";
	var soapActionHeader = '"addActivity"';
	var addActivityRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CTAService/XMLSchema/Schema.xsd">\
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
    <sch:addActivity>\
       <sch:getAddActivityRequest>\
          <!--Optional:-->\
          <sch:transactionId>'+transactionId+'</sch:transactionId>\
          <sch:cmaTrsId>'+cmaTrsId+'</sch:cmaTrsId>\
          <!--Optional:-->\
          <sch:orgCatId>'+orgCatId+'</sch:orgCatId>\
          <!--Optional:-->\
          <sch:emirateCode>'+emirateCode+'</sch:emirateCode>\
          <sch:createdBy>'+EXTERNAL_USERNAME+'</sch:createdBy>\
          <sch:updatedBy>'+EXTERNAL_USERNAME+'</sch:updatedBy>\
       </sch:getAddActivityRequest>\
    </sch:addActivity>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : addActivityRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getAddActivityReturn) == "undefined") {
		MFP.Logger.warn("Error add activity");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference : response
		};
	}
		
	return {
		isSuccessful : true,
		result : response.Envelope.Body.getAddActivityReturn.getAddActivityResult
	};
}

function addActivities(activitiesData){
	/**
	 * test data
	 * [{"transactionId" : "39831683",
	 *  "orgCatIdOld" : "",
	 *   "actionStatus" : "",
	 *    "cmaTrsId" : "",
	 *    "cmlTrsId" : "",
	 *    "cnaTrsId" : "",
	 *    "orgCatId" : "",
	 *    "emirateCode" : "",
	 *    "orgId" : ""},
	 * {"transactionId" : "39831683",
	 *  "orgCatIdOld" : "",
	 *   "actionStatus" : "",
	 *    "cmaTrsId" : "",
	 *    "cmlTrsId" : "",
	 *    "cnaTrsId" : "",
	 *    "orgCatId" : "",
	 *    "emirateCode" : "",
	 *    "orgId" : ""}
	 * ]
	 */
	if( Object.prototype.toString.call(activitiesData) === '[object Array]' ) {
		return {
			isSuccessful : false,
			errorCode : 304,
			message : "Input Data is not an array Data. Kindly try again."
		};
	}
	for(i in activitiesData){
		var addActivityResponse = addActivity(activitiesData[i].transactionId, activitiesData[i].orgCatIdOld, activitiesData[i].actionStatus, activitiesData[i].cmaTrsId,
				activitiesData[i].cmlTrsId, activitiesData[i].cnaTrsId, activitiesData[i].orgCatId,
				activitiesData[i].emirateCode, activitiesData[i].orgId);
		MFP.Logger.info(addActivityResponse);
		if(!addActivityResponse.isSuccessful || addActivityResponse.result.statusEn !== "Success"){
			return {
				isSuccessful : false,
				errorCode : 301,
				message : "An error has been occured in the server. Kindly try again",
				reference : response
			};
		}
	}
}

function deleteActivity(transactionId, cmaTrsId, cmlTrsId, cnaTrsId, activityDeletedId){
	var path = "/ctaservice";
	var soapActionHeader = '"deleteActivity"';
	var addActivityRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CTAService/XMLSchema/Schema.xsd">\
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
    <sch:deleteActivity>\
       <sch:getDeleteActivityRequest>\
          <sch:transactionId>'+transactionId+'</sch:transactionId>\
          <sch:cmaTrsId>'+cmaTrsId+'</sch:cmaTrsId>\
          <sch:cmlTrsId>'+cmlTrsId+'</sch:cmlTrsId>\
          <sch:cnaTrsId>'+cnaTrsId+'</sch:cnaTrsId>\
          <sch:activityDeletedId>'+activityDeletedId+'</sch:activityDeletedId>\
       </sch:getDeleteActivityRequest>\
    </sch:deleteActivity>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : addActivityRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getDeleteActivityReturn) == "undefined") {
		MFP.Logger.warn("Error add activity");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference : response
		};
	}
		
	return {
		isSuccessful : true,
		result : response.Envelope.Body.getDeleteActivityReturn.getDeleteActivityResult
	};
}

function deleteActivities(activitiesData){
	/**
	 * test data
	 * [{"transactionId" : "39831683",
	 *  "cmaTrsId" : "",
	 *   "cmlTrsId" : "",
	 *    "cnaTrsId" : "",
	 *    "activityDeletedId" : ""},
	 * {"transactionId" : "39831683",
	 *  "cmaTrsId" : "",
	 *   "cmlTrsId" : "",
	 *    "cnaTrsId" : "",
	 *    "activityDeletedId" : ""}
	 * ]
	 */
	if( Object.prototype.toString.call(activitiesData) === '[object Array]' ) {
		return {
			isSuccessful : false,
			errorCode : 304,
			message : "Input Data is not an array Data. Kindly try again."
		};
	}
	for(i in activitiesData){
		var deleteActivityResponse = deleteActivity(activitiesData[i].transactionId, activitiesData[i].cmaTrsId,
				activitiesData[i].cmlTrsId, activitiesData[i].cnaTrsId, activitiesData[i].activityDeletedId);
		MFP.Logger.info(deleteActivityResponse);
		if(!deleteActivityResponse.isSuccessful || deleteActivityResponse.result.statusEn != "Success"){
			return {
				isSuccessful : false,
				errorCode : 301,
				message : "An error has been occured in the server. Kindly try again",
				reference : response
			};
		}
	}
}

function deletePartner(transactionId, partnerId, cmaTrsId, cmlTrsId, cnaTrsId, emirateCode){
	var path = "/ctaservice";
	var soapActionHeader = '"deletePartner"';
	var addActivityRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CTAService/XMLSchema/Schema.xsd">\
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
    <sch:deletePartner>\
       <sch:getDeletePartnerRequest>\
          <sch:emirateCode>'+emirateCode+'</sch:emirateCode>\
          <sch:partnerId>'+partnerId+'</sch:partnerId>\
          <sch:transactionId>'+transactionId+'</sch:transactionId>\
          <sch:cmaTrsId>'+cmaTrsId+'</sch:cmaTrsId>\
          <sch:cmlTrsId>'+cmlTrsId+'</sch:cmlTrsId>\
          <sch:cnaTrsId>'+cnaTrsId+'</sch:cnaTrsId>\
       </sch:getDeletePartnerRequest>\
    </sch:deletePartner>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : addActivityRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getDeletePartnerReturn) == "undefined") {
		MFP.Logger.warn("Error delete partner");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference : response
		};
	}
		
	return {
		isSuccessful : true,
		result : response.Envelope.Body.getDeletePartnerReturn.getDeletePartnerResult
	};
}

function deletePartners(partnersData){
	/**
	 * test data
	 * [{"transactionId" : "39831683",
	 *  "cmaTrsId" : "",
	 *   "cmlTrsId" : "",
	 *    "cnaTrsId" : "",
	 *    "partnerId" : "45589",
	 *    "emirateCode" : ""},
	 * {"transactionId" : "39831683",
	 *  "cmaTrsId" : "",
	 *   "cmlTrsId" : "",
	 *    "cnaTrsId" : "",
	 *    "partnerId" : "45589",
	 *    "emirateCode" : ""}
	 * ]
	 */
	if( Object.prototype.toString.call(partnersData) === '[object Array]' ) {
		return {
			isSuccessful : false,
			errorCode : 304,
			message : "Input Data is not an array Data. Kindly try again."
		};
	}
	for(i in partnersData){
		var deletePartnerResponse = deletePartner(partnersData[i].transactionId, partnersData[i].partnerId,
				partnersData[i].cmaTrsId, partnersData[i].cmlTrsId, partnersData[i].cnaTrsId, partnersData[i].emirateCode);
		MFP.Logger.info(deletePartnerResponse);
		if(!deletePartnerResponse.isSuccessful || deletePartnerResponse.result.statusEn != "Success"){
			return {
				isSuccessful : false,
				errorCode : 301,
				message : "An error has been occured in the server. Kindly try again",
				reference : response
			};
		}
	}
}

function removeMember(trafficFileNo, removedPersonId, transactionId){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var organizationId = "";
	if(trafficFileNo !== ""){
		var getOrgInfoResponse = _getOrgInfo(trafficFileNo);
		if(!getOrgInfoResponse.isSuccessful){
			return {
				isSuccessful : false,
				errorCode : 306,
			// 301 means error creating transaction
				message : "There is no data according to this traffic file number."
			};
		}
		organizationId = getOrgInfoResponse.organizationId;
	}
	var path = "/ctaservice";
	var soapActionHeader = '"removeMember"';
	var removeMemberRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CTAService/XMLSchema/Schema.xsd">\
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
    <sch:removeMember>\
       <sch:getRemoveMemberRequest>\
          <sch:organizationId>'+organizationId+'</sch:organizationId>\
          <sch:removedPersonId>'+removedPersonId+'</sch:removedPersonId>\
          <sch:emirateCode>DXB</sch:emirateCode>\
          <sch:cmaTrsId>'+transactionId+'</sch:cmaTrsId>\
          <sch:createdBy>'+EXTERNAL_USERNAME+'</sch:createdBy>\
          <sch:updatedBy>'+EXTERNAL_USERNAME+'</sch:updatedBy>\
       </sch:getRemoveMemberRequest>\
    </sch:removeMember>\
 </soapenv:Body>\
</soapenv:Envelope>';
	MFP.Logger.warn(removeMemberRequest);
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : removeMemberRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getRemoveMemberReturn) == "undefined") {
		MFP.Logger.warn("Error delete partner");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference : response
		};
	}
		
	return {
		isSuccessful : true,
		result : response.Envelope.Body.getRemoveMemberReturn.getRemoveMemberResult
	};
}

function removeMembers(membersData){
		/**
		 * test data
		 * [{"organizationId" : "39831683",
		 *  "tradeLicNo" : "",
		 *   "orgTrfNo" : "",
		 *    "removedPersonId" : "",
		 *    "emirateCode" : "DXB",
		 *    "cmaTrsId" : "",
		 *    "cmlTrsId" : ""},
		 * {"organizationId" : "39831683",
		 *  "tradeLicNo" : "",
		 *   "orgTrfNo" : "",
		 *    "removedPersonId" : "",
		 *    "emirateCode" : "DXB",
		 *    "cmaTrsId" : "",
		 *    "cmlTrsId" : ""}
		 * ]
		 */
		if( Object.prototype.toString.call(membersData) === '[object Array]' ) {
			return {
				isSuccessful : false,
				errorCode : 304,
				message : "Input Data is not an array Data. Kindly try again."
			};
		}
		for(i in membersData){
			var deleteMemberResponse = removeMember(membersData[i].organizationId, membersData[i].tradeLicNo, membersData[i].orgTrfNo,
						membersData[i].removedPersonId, membersData[i].emirateCode,
							membersData[i].cmaTrsId, membersData[i].cmlTrsId);
			MFP.Logger.info(deleteMemberResponse);
			if(!deleteMemberResponse.isSuccessful || deleteMemberResponse.result.statusEn != "Success"){
				return {
					isSuccessful : false,
					errorCode : 301,
					message : "An error has been occured in the server. Kindly try again",
					reference : response
				};
			}
		}
}

function addPartner(transactionId, nameAr, nameEn, passportNo, mobileNo, birthDate, countryId, partnerLegelType,
		residencyNo, legalPersonTypeId, trafficFileNo, professionId, emiratesId, representType, attachmentsData, serviceId){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	if(professionId == null || professionId == "null" || professionId == null){
		professionId = "";
	}
	if(birthDate[2] == "-"){
		birthDateYear = birthDate.substring(6,10);
		birthDateMonth = birthDate.substring(3,5);
		bithDateDay = birthDate.substring(0,2);
		birthDate = birthDateYear + "-" + birthDateMonth + "-" + bithDateDay + "T00:00:00.000Z";
	}
	var organisationId = "";
	if(trafficFileNo !== ""){
		var getOrgInfoResponse = _getOrgInfo(trafficFileNo);
		if(!getOrgInfoResponse.isSuccessful){
			return {
				isSuccessful : false,
				errorCode : 306,
			// 301 means error creating transaction
				message : "There is no data according to this traffic file number."
			};
		}
		organisationId = getOrgInfoResponse.organizationId;
	}
	var mapping = {
			"1070" : "804",
			"-1" : "803",
			"263" : "807",
			"1002" : "802",
			"257" : "801",
			"260" : "806",
			"248" : "810",
			"554" : "810",
			"552" : "806",
			"553" : "807",
			"555" : "802",
			"550" : "801",
			"551" : "804"
	};
	var eTrafficServiceCode = mapping[serviceId];
	var transactionIdField = "";
	var occupationIdField = "";
	var isManager = "false";
	var residencyNoField = "<sch:residencyNo></sch:residencyNo>";
	if(residencyNo != ""){
		residencyNoField = "<sch:residencyNo>"+residencyNo+"</sch:residencyNo>";
	}
	if(eTrafficServiceCode == "801"){
		transactionIdField = "<sch:transactionId>"+transactionId+"</sch:transactionId>";
	}else{
		transactionIdField = "<sch:cmaTrsId>"+transactionId+"</sch:cmaTrsId>";
	}
	if(legalPersonTypeId == null || legalPersonTypeId == undefined || legalPersonTypeId == ""){
		legalPersonTypeId = "6";
	}
	if(partnerLegelType == null || partnerLegelType == undefined || partnerLegelType == ""){
		partnerLegelType = "6";
	}
	if(partnerLegelType == "21" || legalPersonTypeId == "6") isManager = "true";
	if(professionId != null || professionId != "null" || professionId != ""){
		occupationIdField = '<sch:occupationId>'+professionId+'</sch:occupationId>';
	}
	if(countryId != null || countryId != "null" || countryId != ""){
		countryIdField = '<sch:countryId>'+countryId+'</sch:countryId>';
	}else{
		countryIdField = '<sch:countryId></sch:countryId>';
	}
	var path = "/ctaservice";
	var soapActionHeader = '"addPartner"';
	var xmlAttachments = _setAttachments(attachmentsData);
	var addPartnerRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CTAService/XMLSchema/Schema.xsd">\
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
    <sch:addPartner>\
       <sch:getAddPartnerRequest>\
          <sch:emirateCode>DXB</sch:emirateCode>\
          '+transactionIdField+'\
          <sch:personName>'+nameAr+'</sch:personName>\
          <sch:englishPersonName>'+nameEn+'</sch:englishPersonName>\
          <sch:passportNo>'+passportNo+'</sch:passportNo>\
          <sch:personCIDId>'+emiratesId+'</sch:personCIDId>\
          <sch:mobileNo>'+mobileNo+'</sch:mobileNo>\
          <sch:personBirthDate>'+birthDate+'</sch:personBirthDate>\
          '+countryIdField+'\
          '+occupationIdField+'\
          <sch:representType>0</sch:representType>\
          <sch:isManager>'+isManager+'</sch:isManager>\
          '+residencyNoField+'\
          <sch:createdBy>'+EXTERNAL_USERNAME+'</sch:createdBy>\
          <sch:updatedBy>'+EXTERNAL_USERNAME+'</sch:updatedBy>\
          '+xmlAttachments+'\
          <sch:dedPartnerCodeForPerson>0</sch:dedPartnerCodeForPerson>\
          <sch:partnerLegalType>'+partnerLegelType+'</sch:partnerLegalType>\
       </sch:getAddPartnerRequest>\
    </sch:addPartner>\
 </soapenv:Body>\
</soapenv:Envelope>';
	MFP.Logger.warn(addPartnerRequest);
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : addPartnerRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	if (typeof (response.Envelope.Body.getAddPartnerReturn) == "undefined") {
		MFP.Logger.warn("Error add partner");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference : response
		};
	}
		
	return {
		isSuccessful : true,
		result : response.Envelope.Body.getAddPartnerReturn.getAddPartnerResult
	};
}

function _setAttachments(attachmentsData){
	var xmlAttachments = '';
		for(i in attachmentsData){
			xmlAttachments += '<sch:attachment>\
            <sch:attachmentType>2</sch:attachmentType>\
            <sch:fileExtension>'+attachmentsData[i].extension+'</sch:fileExtension>\
            <sch:attachmentFile>'+attachmentsData[i].file+'</sch:attachmentFile>\
         </sch:attachment>';
		}
		return xmlAttachments;
}

function addPartners(partnersData){
	if( Object.prototype.toString.call(partnersData) === '[object Array]' ) {
		return {
			isSuccessful : false,
			errorCode : 304,
			message : "Input Data is not an array Data. Kindly try again."
		};
	}
	for(i in partnersData){
		var addPartnerResponse = addPartner(partnersData[i].transactionId, partnersData[i].nameAr, partnersData[i].nameEn,
				partnersData[i].passportNo, partnersData[i].mobileNo, partnersData[i].birthDate,
					partnersData[i].countryId, partnersData[i].isManager,
						partnersData[i].residencyNo, partnersData[i].legalPersonTypeId, partnersData[i].attachmentsData);
		MFP.Logger.info(addPartnerResponse);
		if(!addPartnerResponse.isSuccessful || addPartnerResponse.result.statusEn != "Success"){
			return {
				isSuccessful : false,
				errorCode : 301,
				message : "An error has been occured in the server. Kindly try again"
			};
		}
	}
}

function updateContactNumber(trafficFileNo, newMobileNo, memberId){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var path = "/ctaservice";
	var soapActionHeader = '"updateOrgMemberData"';
	var updateContactNumberRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CTAService/XMLSchema/Schema.xsd">\
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
    <sch:updateOrgMemberData>\
       <sch:getUpdateOrgMemberDataFields>\
          <sch:trafficFileNo>'+trafficFileNo+'</sch:trafficFileNo>\
          <sch:memberId>'+memberId+'</sch:memberId>\
          <sch:newMobileNumber>'+newMobileNo+'</sch:newMobileNumber>\
       </sch:getUpdateOrgMemberDataFields>\
    </sch:updateOrgMemberData>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : updateContactNumberRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.updateOrgMemberDataResult) == "undefined") {
		MFP.Logger.warn("Error update contact member");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference : response
		};
	}
		
	return {
		isSuccessful : true,
		result : response.Envelope.Body.updateOrgMemberDataResult.getUpdateOrgMemberDataResult
	};
}

function _insertTrsApplicationPerson(countryId, occupationId, personNameAr, personNameEn, personBirthDate,
		passportNo, representType, isManager, actionStatus, status, statusDate, orgMemberId, trafficFileId,
		mobileNo, personCIDId, transactionId){
	var cmlTrsId = transactionId;
	var cnaTrsId = transactionId;
	var cmaTrsId = transactionId;
	var path = "ctaservice";
	var soapActionHeader = '"insertTrsApplicationPerson"';
	var insertTrsAppRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CTAService/XMLSchema/Schema.xsd">\
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
    <sch:insertTrsApplicationPerson>\
       <sch:getInsertTrsApplicationPerson>\
          <sch:trsApplicationPerson>\
             <sch:countryId>'+countryId+'</sch:countryId>\
             <sch:occupationId>'+occupationId+'</sch:occupationId>\
             <sch:personName>'+personNameAr+'</sch:personName>\
             <sch:englishPersonName>'+personNameEn+'</sch:englishPersonName>\
             <sch:personBirthDate>'+personBirthDate+'</sch:personBirthDate>\
             <sch:passportNo>'+passportNo+'</sch:passportNo>\
             <sch:issuePlace></sch:issuePlace>\
             <sch:gender></sch:gender>\
             <sch:representType>'+representType+'</sch:representType>\
             <sch:isManager>'+isManager+'</sch:isManager>\
             <sch:actionStatus>'+actionStatus+'</sch:actionStatus>\
             <sch:status>'+status+'</sch:status>\
             <sch:statusDate>'+statusDate+'</sch:statusDate>\
             <sch:orgMemberId></sch:orgMemberId>\
             <sch:cnaTrsId>'+cnaTrsId+'</sch:cnaTrsId>\
             <sch:cmaTrsId>'+cmaTrsId+'</sch:cmaTrsId>\
             <sch:trafficFileId>'+trafficFileId+'</sch:trafficFileId>\
             <sch:mobileNo>'+mobileNo+'</sch:mobileNo>\
             <sch:personCIDId>'+personCIDId+'</sch:personCIDId>\
             <sch:capitalShare></sch:capitalShare>\
             <sch:cmlTrsId>'+cmlTrsId+'</sch:cmlTrsId>\
             <sch:createdBy>'+EXTERNAL_USERNAME+'</sch:createdBy>\
          </sch:trsApplicationPerson>\
       </sch:getInsertTrsApplicationPerson>\
    </sch:insertTrsApplicationPerson>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : insertTrsAppRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getInsertTrsApplicationPersonReturn) == "undefined") {
		MFP.Logger.warn("Error update contact member");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again"
		};
	}
	
	return {
		isSuccessful : true,
		result : response.Envelope.Body.getInsertTrsApplicationPersonReturn.getInsertTrsApplicationPersonResult
	};
}

function insertTrsApplicationPersons(data){
	if( Object.prototype.toString.call(data) === '[object Array]' ) {
		return {
			isSuccessful : false,
			errorCode : 304,
			message : "Input Data is not an array Data. Kindly try again."
		};
	}
	var insertTrsResponse;
	for(i in data){
		insertTrsResponse = _insertTrsApplicationPerson(data[i].countryId, data[i].occupationId, data[i].personNameAr,
				data[i].personNameEn, data[i].personBirthDate,
				data[i].passportNo, data[i].representType, data[i].isManager, data[i].actionStatus,
				data[i].status, data[i].statusDate, data[i].orgMemberId, data[i].trafficFileId,
				data[i].mobileNo, data[i].personCIDId, data[i].transactionId);
		if(!insertTrsResponse.isSuccessful){
			return insertTrsResponse;
			break;
		}
	}
}

function _getOrgInfo(trafficFileNo){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var invocationData = {
			parameters : [trafficFileNo]
		};
	invocationData.adapter = "corporate_eTraffic_OrganizationsService";
	invocationData.procedure = "getOrganizationInfo";
	var response = MFP.Server.invokeProcedure(invocationData);
	MFP.Logger.warn(response);
	if(typeof response.organizationInfoType != "undefined"){
		return {
			isSuccessful : true,
			organizationId : response.organizationInfoType.orgId
		};
	}else{
		return{isSuccessful : false};
	}
}

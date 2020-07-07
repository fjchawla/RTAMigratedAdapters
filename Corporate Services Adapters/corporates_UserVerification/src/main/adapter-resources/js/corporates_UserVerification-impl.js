var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;

function isCorporateUser(userId) {
	//var path = "/portalprofileservice_v2";
	var path = "/portalprofileservice";
	var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/PortalProfileService/Schema.xsd">'
		+' <soapenv:Header>\
		 <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
	            <wsse:Username>'+tibcoUsername+'</wsse:Username>\
	            <wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
		   </soapenv:Header>'
		+'<soapenv:Body>'
		+'<sch:isCorporateUser>'
		+'<sch:userId>'+userId+'</sch:userId>'
		+'</sch:isCorporateUser>'
		+'</soapenv:Body>'
		+'</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		path : path,
		body : {
			content : request.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	return response;
}

function getUserProfile(userId) {
	//var path = "/portalprofileservice_v2";
	var path = "/portalprofileservice";
	try{
		userId = MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null ? MFP.Server.getAuthenticatedUser('masterAuthRealm').userId : null;
	}catch(e){
		userId = null;
	}
	var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/PortalProfileService/Schema.xsd">'
		+'<soapenv:Header>\
		 <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
	            <wsse:Username>'+tibcoUsername+'</wsse:Username>\
	            <wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
		   </soapenv:Header>'
		+'<soapenv:Body>'
		+'<sch:getUserProfile>'
		+'<sch:userId>'+userId+'</sch:userId>'
		+'<sch:applicationId>CORPAPP</sch:applicationId>'
		+'</sch:getUserProfile>'
		+'</soapenv:Body>'
		+'</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		path : path,
		body : {
			content : request.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	if(response.Envelope.Body != undefined && response.Envelope.Body.getUserProfileReturn != undefined && response.Envelope.Body.getUserProfileReturn.userProfile != undefined){
//		response.Envelope.Body.getUserProfileReturn.userProfile.trafficNo = "50039761";
//		response.Envelope.Body.getUserProfileReturn.userProfile.email = "houcem.berrayana@proxym-it.com";
//		response.Envelope.Body.getUserProfileReturn.userProfile.userId = "houcem.berrayana@proxym-it.com";
		var error = '0';
		try {
		var isDueForRenewalCount = "0";
		var getInstructorPermitDetailsResponse = {};
		try {
			getInstructorPermitDetailsResponse = _getInstructorPermitDetails(response.Envelope.Body.getUserProfileReturn.userProfile.trafficNo);
			isDueForRenewalCount = getInstructorPermitDetailsResponse.permitsDueRenewal;
		} catch (ex) {
			MFP.Logger.warn("An error has been occured while invoking corporate_eTraffic_Instructorpermitdetailsservice adapter " + ex);
		}
		var userProfile = response.Envelope.Body.getUserProfileReturn.userProfile;
		var title = userProfile.title != undefined && userProfile.title.titleEn != undefined ? userProfile.title.titleEn : "";
		//var middleName = userProfile.middleName != undefined ? userProfile.middleName : "";
		var firstName = userProfile.firstName != undefined ? userProfile.firstName : "";
		var lastName = userProfile.lastName != undefined ? userProfile.lastName : "";
		
		var userIdentity = {
				userId : userId,
				displayName : title + " " + firstName + " " + lastName,
				corporatesAttributes : userProfile,
				isUserAuthenticated: 1,
				permitsDueRenewal : isDueForRenewalCount
		};
		
	
		
		WL.Server.setActiveUser('masterAuthRealm', null);
		
		WL.Server.setActiveUser('masterAuthRealm', userIdentity);
		
		} catch (e) {
			 error = e;
			MFP.Logger.warn("Cannot get user data for server session " + e);
		}
		
	}
	
	return response;
			
}


function createAccounts(){
	var array = [50028662,50034470,50047941,50024818,50009947];
	
	
	for(var i = 0; i<array.length;i++){
		var tcf = array[i];
	var invocationData = {
			adapter : 'corporates_eTraffic_verifyCustomer',
			procedure : 'getCorporateData',
			parameters : [ array[i] ]
		};
	
		var corporateInformation = MFP.Server.invokeProcedure(invocationData) ; 
		MFP.Logger.info(corporateInformation);
		var tradeLicenseNumber = corporateInformation.Customer.Organization.tradeLicenceNumber ;
		var nameAR = corporateInformation.Customer.Organization.nameAR ;
		var nameEN = corporateInformation.Customer.Organization.nameEN;
		var phone = corporateInformation.Customer.Organization.telephone ;
		var mobile = corporateInformation.Customer.Organization.telephone ;
		var fax = corporateInformation.Customer.Organization.fax ;
		var email = 'rta.corporate+'+i+'@gmail.com';
		var address = corporateInformation.Customer.Organization.address; 
		MFP.Logger.info('tcf '+tcf+' ~ license '+tradeLicenseNumber);
		createCorporate(nameAR, nameEN, tradeLicenseNumber,tcf,phone, mobile, fax, email, address, i);
	}
}


function createCorporate(nameAR, nameEN, number, tcfNumber, phone, mobile, fax, email, address, i){
	//var path = "/portalprofileservice_v2";
	var path = "/portalprofileservice";
	var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/PortalProfileService/Schema.xsd">\
		   <soapenv:Header/>\
	   <soapenv:Body>\
	      <sch:createCorporateUser>\
	         <sch:companyNameEn>'+nameEN+'</sch:companyNameEn>\
	         <sch:companyNameAr>'+nameAR+'</sch:companyNameAr>\
	         <sch:businessLicenseNo>'+number+'</sch:businessLicenseNo>\
	         <sch:issueDate>13/11/2012</sch:issueDate>\
	         <sch:expiryDate>13/11/2015</sch:expiryDate>\
	         <sch:issuedFrom>1</sch:issuedFrom>\
	         <sch:email>'+email+'</sch:email>\
	         <sch:officePhoneNo>'+phone+'</sch:officePhoneNo>\
	         <sch:faxNo>?</sch:faxNo>\
	         <!--Optional:-->\
	         <sch:poBox>?</sch:poBox>\
	         <!--Optional:-->\
	         <sch:emirate>DXB</sch:emirate>\
	         <sch:title>M</sch:title>\
	         <sch:frstName>CRP_'+number+'</sch:frstName>\
	         <!--Optional:-->\
	         <sch:middleName>CRP</sch:middleName>\
	         <sch:lastName>'+number+'</sch:lastName>\
	         <sch:nationality>UAE</sch:nationality>\
	         <sch:adminEmail>'+email+'</sch:adminEmail>\
	         <sch:mobileNo>'+mobile+'</sch:mobileNo>\
	         <!--Optional:-->\
	         <sch:addressEn>'+address+'</sch:addressEn>\
	         <!--Optional:-->\
	         <sch:addressAr>'+address+'</sch:addressAr>\
	         <sch:commLang>ar</sch:commLang>\
	         <sch:commMed>1</sch:commMed>\
	         <sch:thirdParty>0</sch:thirdParty>\
	         <sch:referenceNo>1222'+i+'</sch:referenceNo>\
	         <sch:emiratesId>1</sch:emiratesId>\
	      </sch:createCorporateUser>\
	   </soapenv:Body>\
	</soapenv:Envelope>';
	
	var input = {
			method : 'post',
			returnedContentType : 'xml',
			path : path,
			body : {
				content : rq.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
		};
	//MFP.Logger.info(rq);
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.info(response);
	linkTcf(tcfNumber, email);
}


function linkTcf(tcfNumber, emailId){
	//var path = "/portalprofileservice_v2";
	var path = "/portalprofileservice";
	var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/PortalProfileService/Schema.xsd">\
		<soapenv:Header>\
		 <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
	            <wsse:Username>'+tibcoUsername+'</wsse:Username>\
	            <wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
		 </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:linkTrafficFile>\
	         <sch:userId>'+emailId+'</sch:userId>\
	         <sch:trafficNo>'+tcfNumber+'</sch:trafficNo>\
	      </sch:linkTrafficFile>\
	   </soapenv:Body>\
	</soapenv:Envelope>';
	
	var input = {
			method : 'post',
			returnedContentType : 'xml',
			path : path,
			body : {
				content : rq.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
		};
	//MFP.Logger.info(rq);
	var response = MFP.Server.invokeHttp(input);
//	forgotPassword(emailId);
	MFP.Logger.info(response);
}

function forgotPassword(emailId){
	//var path = "/portalprofileservice_v2";
	var path = "/portalprofileservice";
	var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/PortalProfileService/Schema.xsd">\
		<soapenv:Header>\
		 <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
	            <wsse:Username>'+tibcoUsername+'</wsse:Username>\
	            <wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
		 </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:forgetPassword>\
	         <sch:userId>user20'+emailId+'@isoft.ae</sch:userId>\
	      </sch:forgetPassword>\
	   </soapenv:Body>\
	</soapenv:Envelope>';
	
	var input = {
			method : 'post',
			returnedContentType : 'xml',
			path : path,
			body : {
				content : rq.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
		};
	//MFP.Logger.info(rq);
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.info(response);
}

function resetPassword(emailId, oldPassword, newPassword){
	//var path = "/portalprofileservice_v2";
	var path = "/portalprofileservice";
	var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/PortalProfileService/Schema.xsd">\
		<soapenv:Header>\
		 <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
	            <wsse:Username>'+tibcoUsername+'</wsse:Username>\
	            <wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
		 </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:resetPassword>\
	         <sch:userId>'+emailId+'</sch:userId>\
	         <sch:oldPassword>'+oldPassword+'</sch:oldPassword>\
	         <sch:newPassword>'+newPassword+'</sch:newPassword>\
	      </sch:resetPassword>\
	   </soapenv:Body>\
	</soapenv:Envelope>';
	
	var input = {
			method : 'post',
			returnedContentType : 'xml',
			path : path,
			body : {
				content : rq.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
		};
	//MFP.Logger.info(rq);
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.info(response);
	return response;
}

function linKTcfAndResetPwd(tcfNumber, emailId, oldPassword, newPassword){
	linkTcf(tcfNumber, emailId);
	return resetPassword(emailId, oldPassword, newPassword);
	
}

function _getInstructorPermitDetails(trafficNo){
	try {
		trafficNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficNo;
	} catch (e) {
		// TODO: handle exception
	}
	var invocationData = {
			parameters : [trafficNo]
		};
	invocationData.adapter = "corporate_eTraffic_Instructorpermitdetailsservice";
	invocationData.procedure = "getInstructorPermitDetails";
	var response = MFP.Server.invokeProcedure(invocationData);
	MFP.Logger.warn(response);
	if(typeof response.inDueForRenewalCount != "undefined"){
		return {
			isSuccessful : true,
			permitsDueRenewal : response.inDueForRenewalCount
		};
	}else{
		return{isSuccessful : false};
	}
}


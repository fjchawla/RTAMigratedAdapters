var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;


function getApplicationsLostDamaged(trafficFileNo){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm')  != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var path = "getApplicationsService";

	var soapActionHeader = '"getNocDetails"';
	var getApplicationsRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/GetApplicationsService/Schema.xsd">\
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
    <sch:getNocDetailsInfo>\
       <!--Optional:-->\
       <!--Optional:-->\
       <sch:trafficFileNo>'+trafficFileNo+'</sch:trafficFileNo>\
       <!--Optional:-->\
    </sch:getNocDetailsInfo>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getApplicationsRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	MFP.Logger.warn("begin get applications");
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getNocDetailsReturn) == "undefined") {
		MFP.Logger.warn("Error get applications");
		return {
			isSuccessful : false,
			errorCode : 301,
		// 301 means error get legal type Info
			message : "An error has been occured in the server. Kindly try again"
		};
	}
	if(typeof response.Envelope.Body.getNocDetailsReturn.getNocDetailsResponseInfo == "undefined"){
		return {
			nocInfo : response.Envelope.Body.getNocDetailsReturn,
			applications : []
		};
	}
				var applications = response.Envelope.Body.getNocDetailsReturn.getNocDetailsResponseInfo;
				if(!Array.isArray(applications)){
					applications = [applications];
				}
				
				var applicationsLetter = [];
				if(applications.length > 0){
					for(i in applications){
						if(applications[i].applicationStatusCode == "5"){
							MFP.Logger.warn("applications[i]" + i);
							applicationsLetter.push(applications[i]);
						}
					}
				}
				
				return {
					isSuccessful : true,
					applications : applicationsLetter
				};
}

function getApplications(trafficFileNo, appRefNo, tradeLicenceNo, startDate, endDate, applicationTypeId){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm')  != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	try {
		tradeLicenceNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm')  != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm') .corporatesAttributes.businessLicenseNo
				: tradeLicenceNo;
	} catch (e) {
		// TODO: handle exception
	}
	var path = "/getApplicationsService";
	var soapActionHeader = '"getNocDetails"';
	var getApplicationsRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/GetApplicationsService/Schema.xsd">\
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
    <sch:getNocDetailsInfo>\
       <!--Optional:-->\
       <sch:trafficFileNo>'+trafficFileNo+'</sch:trafficFileNo>\
       <!--Optional:-->\
       <sch:applicationRefNo>'+appRefNo+'</sch:applicationRefNo>\
    </sch:getNocDetailsInfo>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getApplicationsRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	MFP.Logger.warn("begin get applications");
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	
	if (typeof (response.Envelope.Body.getNocDetailsReturn) == "undefined") {
		MFP.Logger.warn("Error get applications");
		return {
			isSuccessful : false,
			errorCode : 301,	// 301 means error get legal type Info
			message : "An error has been occured in the server. Kindly try again",
			reference : response
		};
	}
	if(typeof response.Envelope.Body.getNocDetailsReturn.getNocDetailsResponseInfo == "undefined"){
		return response.Envelope.Body.getNocDetailsReturn;
	}
	
	var applications = response.Envelope.Body.getNocDetailsReturn.getNocDetailsResponseInfo;
	applications = Array.isArray(applications) ? applications : [applications];
				
	var applicationsFiltred = [];
	if(applications.length > 0){
		for(i in applications){
			
			applicationDate = "" ;
			if(applications[i].applicationDate){
				applicationDateTmp = applications[i].applicationDate.split(/[-]/);
				applicationDate = applicationDateTmp[2] +"-"+ applicationDateTmp[1] +"-"+ applicationDateTmp[0] ; // Format Date to  yyyy-mm-dd
			}
			
			var isAppRefNo = appRefNo != "" ? applications[i].applicationRefNo == appRefNo : true ;
			var iseqToTypeId = applicationTypeId != "" ? applications[i].applicationTypeCode == applicationTypeId : true ; // Test 1
			var isBigThanStartDate = startDate != "" && applicationDate != "" ? _date2isGreater(startDate, applicationDate) : true ;
			var isLessThanEndDate = endDate != "" && applicationDate != "" ? _date2isGreater(applicationDate, endDate) : true ;
			
			/*
			MFP.Logger.warn(applications[i]);
			MFP.Logger.warn("iseqToTypeId: "+ applications[i].applicationTypeCode +' == '+ applicationTypeId +' => '+ iseqToTypeId);
			MFP.Logger.warn("isBigThanStartDate: "+ startDate +' < '+ applicationDate +' => '+ isBigThanStartDate);
			MFP.Logger.warn("isLessThanEndDate: "+ applicationDate +' < '+ endDate +' => '+ isLessThanEndDate);
			*/
			
			if(isAppRefNo && isBigThanStartDate && isLessThanEndDate && iseqToTypeId){
				delete applications[i]["PermitNo"];
				delete applications[i]["legalCode"];
				delete applications[i]["letterRefNo"];
				delete applications[i]["obligationSignDate"];
				delete applications[i]["renewalPeriod"];
				delete applications[i]["tradeLicenseExpiryDate"];
				delete applications[i]["tradeLicenseNo"];
				applicationsFiltred.push(applications[i]);
				if(applications[i].applicationRefNo == appRefNo) break;
			}
		}
	}
	
	return {
		isSuccessful : true,
		applications : applicationsFiltred
	};
}

function _isEqual(v1, v2){
	return v1 == v2 ? 0 : ( v1 > v2 ? 1 : 2 ) ;
}

function _date2isGreater(dateStr1, dateStr2){
	var date1 = dateStr1.split(/[-]/);
	var date2 = dateStr2.split(/[-]/);
	
	yearDiff = _isEqual(date1[0], date2[0]);
	monthDiff = _isEqual(date1[1], date2[1]);
	dayDiff = _isEqual(date1[2], date2[2]);
	
	return (yearDiff == 2) || (yearDiff == 0 && monthDiff == 2) || (yearDiff == 0 && monthDiff == 0 && dayDiff == 2);
}


var WSSE_PASSWORD = MFP.Server.getPropertyValue("tokens.tipcoService.username");
var WSSE_PASSWORD = MFP.Server.getPropertyValue("tokens.tipcoService.password");
var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';

//var path = '/CaseManagementService';
var path = '/BPM/CaseManagementService'; //PROD URL

function findCases (procedureName, name, value)
{
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cas="http://www.rta.ae/schemas/CaseManagement" xmlns:sch="http://www.rta.ae/schemas/CaseManagement">\
		<soapenv:Header>\
	 <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
	       <wsse:Username>'+WSSE_USERNAME+'</wsse:Username>\
	       <wsse:Password>'+WSSE_PASSWORD+'</wsse:Password>\
	    </wsse:UsernameToken>\
	 </wsse:Security>\
	 <sch:ExternalUser>\
		  <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>\
	       <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>\
	 </sch:ExternalUser>\
	</soapenv:Header>\
	<soapenv:Body>\
	 <cas:findCasesRequest>\
	    <cas:procedureName>'+procedureName+'</cas:procedureName>\
	       <cas:param>\
	       <cas:name>'+name+'</cas:name>\
	       <cas:value>'+value+'</cas:value>\
	    </cas:param>\
	 </cas:findCasesRequest>\
	</soapenv:Body>\
	</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var input = {
			method : 'POST',
			returnedContentType : 'xml',
			path : path,
			body : {
				content : transactionString.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
	};

	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if(response.Envelope.Body == undefined || response.Envelope.Body.findCasesReponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 380,
			message : "An error occurred in case management service while finding cases. Kindly try again",
			reference : response,
				
		};
	}
	return {
		isSuccessful : true,
		result : response.Envelope.Body.findCasesReponse
	};
}
	

/////////////////////////////////////////////////////////////

function getCaseDetails (caseNumber)
{
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cas="http://www.rta.ae/schemas/CaseManagement" xmlns:sch="http://www.rta.ae/schemas/CaseManagement">\
	     <soapenv:Header>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
       <wsse:UsernameToken>\
	       <wsse:Username>'+WSSE_USERNAME+'</wsse:Username>\
	       <wsse:Password>'+WSSE_PASSWORD+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
    <sch:ExternalUser>\
		  <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>\
	       <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>\
    </sch:ExternalUser>\
 </soapenv:Header>\
 <soapenv:Body>\
    <cas:getCaseDetailsRequest>\
       <!--You have a CHOICE of the next 2 items at this level-->\
       <cas:caseNumber>'+caseNumber+'</cas:caseNumber>\
    </cas:getCaseDetailsRequest>\
 </soapenv:Body>\
</soapenv:Envelope>';
		
	MFP.Logger.info(transactionString);
	var input = {
			method : 'POST',
			returnedContentType : 'xml',
			path : path,
			body : {
				content : transactionString.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
	};
	
	var response = MFP.Server.invokeHttp(input);

	
	if(response.Envelope.Body == undefined || response.Envelope.Body.getCaseDetailsResponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 381,
			message : "An error occurred in case management service while getting case details. Kindly try again",
			reference : response,
				
		};
	}
	return {
		isSuccessful : true,
		result : response.Envelope.Body.getCaseDetailsResponse
	};
	}

/////////////////////////////////////////////////////////////

function startCase (procedureName, caseDescription, params){
//var params = [{"name" : "name1","value" : "value1"}];
var param = "";
for(i in params){
	param +=   '<cas:param>\
		<cas:name>'+params[i].name+'</cas:name>\
    <cas:value>'+params[i].value+'</cas:value>\
    </cas:param>';
}
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cas="http://www.rta.ae/schemas/CaseManagement" xmlns:sch="http://www.rta.ae/schemas/CaseManagement">\
	    <soapenv:Header>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
       <wsse:UsernameToken>\
	       <wsse:Username>'+WSSE_USERNAME+'</wsse:Username>\
	       <wsse:Password>'+WSSE_PASSWORD+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
    <sch:ExternalUser>\
    <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>\
    <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>\
    </sch:ExternalUser>\
 </soapenv:Header>\
 <soapenv:Body>\
    <cas:startCaseRequest>\
       <cas:procedureName>'+procedureName+'</cas:procedureName>\
       <!--Optional:-->\
       <cas:caseDescription>'+caseDescription+'</cas:caseDescription>\
       <!--Optional:-->\
       <cas:parameters>\
       '+param+'\
       </cas:parameters>\
    </cas:startCaseRequest>\
 </soapenv:Body>\
</soapenv:Envelope>	';
	
	MFP.Logger.warn(transactionString);
	var input = {
			method : 'post',
			returnedContentType : 'xml',
			path : path,
			body : {
				content : transactionString.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
	};
	
	var response = MFP.Server.invokeHttp(input);

	if(response.Envelope.Body == undefined || response.Envelope.Body.startCaseResponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 382,
			message : "An error occurred in case management service while starting cases. Kindly try again",
			reference : response,
				
		};
	}
	
	return response.Envelope.Body.startCaseResponse;
}

function findCasesFiltred(procedureName, name, value, startDate, endDate, caseNumber){
	var emailId = "";
	var findCasesResponse = {};
	try {
		if(MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null){
			emailId = MFP.Server.getAuthenticatedUser('masterAuthRealm').userId ;
			findCasesResponse = findCases (procedureName, "CUSID", emailId);
		}else{
			findCasesResponse = findCases (procedureName, "", "");
		}
	} catch (e) {
		MFP.Logger.warn("Cannot get data from masterAuthRealm" + e);
		findCasesResponse = findCases (procedureName, "", "");
	}
	if(findCasesResponse.isSuccessful == false){
		return findCasesResponse;
	}
	var applications = findCasesResponse.result.CaseDetails['case'];
	applications = Array.isArray(applications) ? applications : [applications];
	var applicationsFiltred = [];
	try {
		if (applications.length > 0) {
			for (i in applications) {
				applicationDate = applications[i].submittedDate.CDATA
						.substring(0, applications[i].submittedDate.CDATA
								.indexOf('T'));
				var isAppRefNo = caseNumber != "" ? applications[i].caseNumber.CDATA == caseNumber
						: true;
				var isBigThanStartDate = startDate != ""
						&& applicationDate.CDATA != "" ? _date2isGreater(
						startDate, applicationDate) : true;
				var isLessThanEndDate = endDate != ""
						&& applicationDate.CDATA != "" ? _date2isGreater(
						applicationDate, endDate) : true;

				if (isAppRefNo && isBigThanStartDate && isLessThanEndDate) {
					applicationsFiltred.push(applications[i]);
					if (applications[i].caseNumber.CDATA == caseNumber)
						break;
				}
			}
		}
	} catch (ee) {
		MFP.Logger.warn(ee);
	}
	return {
		isSuccessful : true,
		cases : applicationsFiltred
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

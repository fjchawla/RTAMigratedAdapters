var WSSE_USERNAME = MFP.Server.getPropertyValue("tokens.tipcoService.username");
var WSSE_PASSWORD = MFP.Server.getPropertyValue("tokens.tipcoService.password");


function inquireAllFineWarnings(TradeLicenseNo, LocationID, DateFrom, DateTo, Status, FineType, PageNo ) {
	try {
		TradeLicenseNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.businessLicenseNo
				: TradeLicenseNo;
	} catch (e) {
		// TODO: handle exception
	}
	if (LocationID == "")
	{
//		return {
//			isSuccessful : false,
//			errorCode : 330,
//			// 301 means error get legal type Info
//			message : "An error has been occured in inquire all fines/warnings, an empty Location ID. Kindly try again",
//			reference : response
//		};
		LocationID = '00000000-0000-0000-0000-000000000000';
		
	}
	if (DateFrom == "")
	{
		var now = new Date();
		var from = new Date (now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000) ;
		DateFrom = formatDate(from);
	}
	if (DateTo == "")
	{
		var now = new Date();
		DateTo = formatDate(now); 
	}
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/InspectionFinesInquiryService/XMLSchema">\
		<soapenv:Header>\
		<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
		<wsse:UsernameToken>\
		<wsse:Username>'
		+ WSSE_USERNAME
		+ '</wsse:Username>\
		<wsse:Password>'
		+ WSSE_PASSWORD
		+ '</wsse:Password>\
		</wsse:UsernameToken>\
		</wsse:Security>\
		</soapenv:Header>\
		<soapenv:Body>\
		<xs:EnquiryAllFineWarnigs>\
		<xs:TradeLicenseNo>'
		+ TradeLicenseNo
		+ '</xs:TradeLicenseNo>\
		<xs:LocationID>'
		+ LocationID
		+ '</xs:LocationID>\
		<xs:DateFrom>'
		+ DateFrom
		+ '</xs:DateFrom>\
		<xs:DateTo>'
		+ DateTo
		+ '</xs:DateTo>\
		<xs:Status>'
		+ Status
		+ '</xs:Status>\
		<xs:FineType>'
		+ FineType
		+ '</xs:FineType>\
		<xs:PageNo>'
		+ PageNo
		+ '</xs:PageNo>\
		</xs:EnquiryAllFineWarnigs>\
		</soapenv:Body>\
		</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'inspectionfinesservice';
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
//	return response ;
	MFP.Logger.info(response);
	if(response.Envelope.Body == undefined || response.Envelope.Body.EnquiryAllFineWarnigsResponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 315,
			// 301 means error get legal type Info
			message : "An error has been occured in inquire all fines/warnings. Kindly try again.",
			reference : response
		};
	}
	var status = response.Envelope.Body.EnquiryAllFineWarnigsResponse.EnquiryAllFineWarnigsResult;
	if(status != "true"){
		return {
			isSuccessful : true,
			status : status,
			result : {}
		};
	}
	
	 
	var xmlResponse = response.Envelope.Body.EnquiryAllFineWarnigsResponse.xmlOutput;
	var createTransObj = convertToJson(xmlResponse);
	//var pagesCount = createTransObj.
	
	return {
		isSuccessful : true,
		status : status,
		result : createTransObj
	};



	
	//var response = MFP.Server.invokeHttp(input);
	//MFP.Logger.info(response);
	return response;
}


/////////////////////////////////////////////////////



function inquireAllFineWarningsWithViolations(TradeLicenseNo, LocationID,
		DateFrom, DateTo, PaymentStatus, FineType, PageNo) {
	TradeLicenseNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.businessLicenseNo
			: TradeLicenseNo;
	
	PageNo = parseInt(PageNo);
	if (LocationID == "")
	{
//		return {
//			isSuccessful : false,
//			errorCode : 330,
//			// 301 means error get legal type Info
//			message : "An error has been occured in inquire all fines/warnings, an empty Location ID. Kindly try again",
//			reference : response
//		};
		LocationID = '00000000-0000-0000-0000-000000000000';
		
	}
	if (DateFrom == "")
	{
		var now = new Date();
		var from = new Date (now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000) ;
		DateFrom = formatDate(from);
	}
	
	
	
	
	if (DateTo == "")
	{
		var now = new Date();
		DateTo = formatDate(now); 
	}
	
	
	if (PaymentStatus == "")
	{
		
		PaymentStatus = "All";
	}
	
	
	if (FineType == "")
	{
		
		FineType = "All";
	}
	
	
	
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/InspectionFinesInquiryService/XMLSchema">\
		<soapenv:Header>\
		<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
		<wsse:UsernameToken>\
		<wsse:Username>'
		+ WSSE_USERNAME
		+ '</wsse:Username>\
		<wsse:Password>'
		+ WSSE_PASSWORD
		+ '</wsse:Password>\
		</wsse:UsernameToken>\
		</wsse:Security>\
		</soapenv:Header>\
		<soapenv:Body>\
		<xs:EnquiryAllFinesWarningsWithViolations>\
		<xs:TradeLicenseNo>'
		+ TradeLicenseNo
		+ '</xs:TradeLicenseNo>\
		<xs:LocationID>'
		+ LocationID
		+ '</xs:LocationID>\
		<xs:DateFrom>'
		+ DateFrom
		+ '</xs:DateFrom>\
		<xs:DateTo>'
		+ DateTo
		+ '</xs:DateTo>\
		<xs:PaymentStatus>'
		+ PaymentStatus
		+ '</xs:PaymentStatus>\
		<xs:FineType>'
		+ FineType
		+ '</xs:FineType>\
		<xs:PageNo>'
		+ PageNo
		+ '</xs:PageNo>\
		</xs:EnquiryAllFinesWarningsWithViolations>\
		</soapenv:Body>\
		</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'inspectionfinesservice';
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
//	return response ;
	MFP.Logger.info(response);
	if(response.Envelope.Body == undefined || response.Envelope.Body.EnquiryAllFinesWarningsWithViolationsResponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 316,
			// 301 means error get legal type Info
			message : "An error has been occured in inquire all fines/warnings with violations. Kindly try again",
			reference : response
		};
	}
	var status = response.Envelope.Body.EnquiryAllFinesWarningsWithViolationsResponse.EnquiryAllFinesWarningsWithViolationsResult;
	if(status != "true"){
		return {
			isSuccessful : true,
			status : status,
			result : {}
		};
	}
	
	
	var xmlResponse = response.Envelope.Body.EnquiryAllFinesWarningsWithViolationsResponse.xmlOutput;
	var createTransObj = convertToJson(xmlResponse);
	var tickets = createTransObj.TRAFinesWarnings.Ticket ;
	var pagesCount = parseInt(response.Envelope.Body.EnquiryAllFinesWarningsWithViolationsResponse.NoOfPages);
	
	
	if(pagesCount > 1 && pagesCount > PageNo){
		var res = inquireAllFineWarningsWithViolations(TradeLicenseNo, LocationID,	DateFrom, DateTo, PaymentStatus, FineType, PageNo +1);
		var nextPageTickets = res.result.TRAFinesWarnings.Ticket ;
		tickets.push.apply(tickets, nextPageTickets);
	}
	createTransObj.TRAFinesWarnings.Ticket  = tickets ;
	
	
	//If pages Count > 1 then do while.
	return {
		isSuccessful : true,
		status : status,
		result : createTransObj,
		TotalResultsAmount : response.Envelope.Body.EnquiryAllFinesWarningsWithViolationsResponse.TotalResultsAmount,
		CountOfResults : response.Envelope.Body.EnquiryAllFinesWarningsWithViolationsResponse.CountOfResults,
		NoOfPages : response.Envelope.Body.EnquiryAllFinesWarningsWithViolationsResponse.NoOfPages
	};

	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.info(response);
	return response;
}


function generateXmlRequestString(pageNo){
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/InspectionFinesInquiryService/XMLSchema">\
	<soapenv:Header>\
	<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	<wsse:UsernameToken>\
	<wsse:Username>'
	+ WSSE_USERNAME
	+ '</wsse:Username>\
	<wsse:Password>'
	+ WSSE_PASSWORD
	+ '</wsse:Password>\
	</wsse:UsernameToken>\
	</wsse:Security>\
	</soapenv:Header>\
	<soapenv:Body>\
	<xs:EnquiryAllFinesWarningsWithViolations>\
	<xs:TradeLicenseNo>'
	+ TradeLicenseNo
	+ '</xs:TradeLicenseNo>\
	<xs:LocationID>'
	+ LocationID
	+ '</xs:LocationID>\
	<xs:DateFrom>'
	+ DateFrom
	+ '</xs:DateFrom>\
	<xs:DateTo>'
	+ DateTo
	+ '</xs:DateTo>\
	<xs:PaymentStatus>'
	+ PaymentStatus
	+ '</xs:PaymentStatus>\
	<xs:FineType>'
	+ FineType
	+ '</xs:FineType>\
	<xs:PageNo>'
	+ PageNo
	+ '</xs:PageNo>\
	</xs:EnquiryAllFinesWarningsWithViolations>\
	</soapenv:Body>\
	</soapenv:Envelope>';
}

////////////////////////////////////////////////////


function inquireBlackPointsAndStatistics(TradeLicenseNo) {
	TradeLicenseNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.businessLicenseNo
			: TradeLicenseNo;
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/InspectionFinesInquiryService/XMLSchema">\
		<soapenv:Header>\
		<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
		<wsse:UsernameToken>\
		<wsse:Username>'
		+ WSSE_USERNAME
		+ '</wsse:Username>\
		<wsse:Password>'
		+ WSSE_PASSWORD
		+ '</wsse:Password>\
		</wsse:UsernameToken>\
		</wsse:Security>\
		</soapenv:Header>\
		<soapenv:Body>\
		<xs:EnquiryBlackPointsAndStatistics>\
		<xs:TradeLicenseNo>'
		+ TradeLicenseNo
		+ '</xs:TradeLicenseNo>\
		</xs:EnquiryBlackPointsAndStatistics>\
		</soapenv:Body>\
		</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'inspectionfinesservice';
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

	
	if(response.Envelope.Body == undefined || response.Envelope.Body.EnquiryBlackPointsAndStatisticsResponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 321,
			message : "An error has been occured . Kindly try again",
			reference : response,
				
		};
	}

	return response.Envelope.Body.EnquiryBlackPointsAndStatisticsResponse;
	
	
	MFP.Logger.info(response);

	return response;
}





//////////////////////////////////////////////////////////////

function inquireLocations() {
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/InspectionFinesInquiryService/XMLSchema">\
		<soapenv:Header>\
		<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
		<wsse:UsernameToken>\
		<wsse:Username>'
		+ WSSE_USERNAME
		+ '</wsse:Username>\
		<wsse:Password>'
		+ WSSE_PASSWORD
		+ '</wsse:Password>\
		</wsse:UsernameToken>\
		</wsse:Security>\
		</soapenv:Header>\
		<soapenv:Body>\
		<xs:EnquiryLocations/>\
		</soapenv:Body>\
		</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'inspectionfinesservice';
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
//	return response ;
	MFP.Logger.info(response);
	if(response.Envelope.Body == undefined || response.Envelope.Body.EnquiryLocationsResponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 317,
			// 301 means error get legal type Info
			message : "An error has been occured in inquire locations. Kindly try again",
			reference : response
		};
	}
	var status = response.Envelope.Body.EnquiryLocationsResponse.EnquiryLocationsResult;
	if(status != "true"){
		return {
			isSuccessful : true,
			status : status,
			result : {}
		};
	}
	var xmlResponse = response.Envelope.Body.EnquiryLocationsResponse.xmlOutput;
	var createTransObj = convertToJson(xmlResponse);
	
	//Convert locations and remove codes from the names
	try{
		MFP.Logger.info('Cleaning up locations');
		var locations = createTransObj.DocumentElement.Location ;
		if(!Array.isArray(locations)){
			locations = [locations] ;
			createTransObj.DocumentElement.Location = locations ;
		}
		MFP.Logger.info(locations);
		for(var i = 0 ; i<locations.length ; i++){
			var locationName = createTransObj.DocumentElement.Location[i].CommunityName ;
			if(locationName.indexOf('-') > -1){
				locationName = locationName.substring(locationName.indexOf('-') + 2, locationName.length) ;
				createTransObj.DocumentElement.Location[i].CommunityName = locationName ;
			}else{
				MFP.Logger.info('Location does not contain "-" : ' + locationName);
			}
		}
		
	}catch(e){
		MFP.Logger.info('Error converting locations .. giving original descr');
		MFP.Logger.info(e);
	}
	return {
		isSuccessful : true,
		status : status,
		result : createTransObj
	};

	MFP.Logger.info(response);
	return response;
}

//////////////////////////////////////////////////////////////

function inquireSpecificFineOrWarnings(sTafteeshFineID) {
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/InspectionFinesInquiryService/XMLSchema"  xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/CorporateService/XMLSchema/Schema.xsd">\
		<soapenv:Header>\
		<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
		<wsse:UsernameToken>\
		<wsse:Username>'
		+ WSSE_USERNAME
		+ '</wsse:Username>\
		<wsse:Password>'
		+ WSSE_PASSWORD
		+ '</wsse:Password>\
		</wsse:UsernameToken>\
		</wsse:Security>\
		</soapenv:Header>\
		<soapenv:Body>\
		<xs:EnquirySpecificFineOrWarning>\
		<!--Optional:-->\
		<xs:sTafteeshFineID>'
		+ sTafteeshFineID
		+ '</xs:sTafteeshFineID>\
		</xs:EnquirySpecificFineOrWarning>\
		</soapenv:Body>\
		</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'inspectionfinesservice';
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
	// return response ;
	MFP.Logger.info(response);
	if (response.Envelope.Body == undefined
			|| response.Envelope.Body.EnquirySpecificFineOrWarningResponse == undefined) {
		return {
			isSuccessful : false,
			errorCode : 318,
			// 301 means error get legal type Info
			message : "An error has been occured in inquire Specific fines/warnings. Kindly try again",
			reference : response
		};
	}
	var status = response.Envelope.Body.EnquirySpecificFineOrWarningResponse.EnquirySpecificFineOrWarningResult;
	if (status != "true") {
		return {
			isSuccessful : true,
			status : status,
			result : {}
		};
	}
	var xmlResponse = response.Envelope.Body.EnquirySpecificFineOrWarningResponse.xmlOutput;
	var createTransObj = convertToJson(xmlResponse);
	return {
		isSuccessful : true,
		status : status,
		result : createTransObj
	};
}

/////////////////////////////////////////////////////////////


function inquireViolationsList(ViolationGroup) {
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/InspectionFinesInquiryService/XMLSchema">\
		<soapenv:Header>\
		<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
		<wsse:UsernameToken>\
		<wsse:Username>'
		+ WSSE_USERNAME
		+ '</wsse:Username>\
		<wsse:Password>'
		+ WSSE_PASSWORD
		+ '</wsse:Password>\
		</wsse:UsernameToken>\
		</wsse:Security>\
		</soapenv:Header>\
		<soapenv:Body>\
		<xs:EnquiryViolationslist>\
		<xs:ViolationGroup>'
		+ ViolationGroup
		+ '</xs:ViolationGroup>\
		</xs:EnquiryViolationslist>\
		</soapenv:Body>\
		</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'inspectionfinesservice';
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
//	return response ;
	MFP.Logger.info(response);
	if(response.Envelope.Body == undefined || response.Envelope.Body.EnquiryViolationslistResponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 319,
			// 301 means error get legal type Info
			message : "An error has been occured in inquire violations list. Kindly try again",
			reference : response
		};
	}
	var status = response.Envelope.Body.EnquiryViolationslistResponse.EnquiryViolationslistResult;
	if(status != "true"){
		return {
			isSuccessful : true,
			status : status,
			result : {}
		};
	}
	var xmlResponse = response.Envelope.Body.EnquiryViolationslistResponse.xmlOutput;
	var createTransObj = convertToJson(xmlResponse);
	
	var violations = createTransObj.DocumentElement.Violation;
	if(!Array.isArray(violations)){
		violations = [violations];
	}
	
	return {
		isSuccessful : true,
		status : status,
		violations : violations
	};
}


/////////////////////////////////////////////////////////


function getVersions() {
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/InspectionFinesInquiryService/XMLSchema">\
		<soapenv:Header>\
		<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
		<wsse:UsernameToken>\
		<wsse:Username>'
		+ WSSE_USERNAME
		+ '</wsse:Username>\
		<wsse:Password>'
		+ WSSE_PASSWORD
		+ '</wsse:Password>\
		</wsse:UsernameToken>\
		</wsse:Security>\
		</soapenv:Header>\
		<soapenv:Body>\
		<xs:GetVersion/>\
		</soapenv:Body>\
		</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'inspectionfinesservice';
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
//	return response ;
	MFP.Logger.info(response);
	if(response.Envelope.Body == undefined || response.Envelope.Body.GetVersionResponse == undefined || response.Envelope.Body.GetVersionResponse.GetVersionResult == undefined){
		return {
			isSuccessful : false,
			errorCode : 320,
			// 301 means error get legal type Info
			message : "An error has been occured in get versions. Kindly try again",
			reference : response
		};
	}
	
	MFP.Logger.info(response);
	return response.Envelope.Body.GetVersionResponse;
}

function convertToJson(input) {
	MFP.Logger.info('Converting XML to JSON');
	return JSON.parse(com.proxymit.utils.XmlToJsonConverter
			.convertToJson(input));
}


function formatDate(d){
	var day = d.getDate() ; 
	var month = d.getMonth() +1 ;
	if(day < 10) day = '0'+day ;
	if(month < 10) month = '0'+month ;
	return d.getFullYear() +'-'+month +'-'+day +'T00:00:00+04:00' ;
}
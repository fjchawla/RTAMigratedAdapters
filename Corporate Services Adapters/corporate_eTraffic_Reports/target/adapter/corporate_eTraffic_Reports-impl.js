var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;

//var TMP_PATH 	= "D:/workspace/RTA/RTACorporateMobile/server/conf/corporates/";
//var TMP_PATH 	= "/home/proxym-it/RTA_Workspace/2014_omnix_rta/server/conf/corporates/";
var TMP_PATH 	= "D:/smartgov/cms/corpsrvc/servers_res/";

function getReports(transactionId, trafficFileNo){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var soapActionHeader = '"getReportsOperation"';
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/GetReports/XMLSchema/Schema.xsd" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\
		   <soapenv:Header>\
	   <wsse:Security>\
	         <wsse:UsernameToken>\
				<wsse:Username>'+tibcoUsername+'</wsse:Username>\
				<wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
	      <sch:ExternalUser>\
	         <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>\
	         <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>\
	      </sch:ExternalUser>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:getReports>\
	         <sch:transactoinId>'+transactionId+'</sch:transactoinId>\
	      </sch:getReports>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
//	var path = 'getReportService';
	var path = '/getReportService';
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
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	// return response;
	// Analyzing response for errors
	if (typeof (response.Envelope.Body.getReportsReturn) == 'undefined') {
		MFP.Logger.warn("Error getting reports");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again"
		// 301 means error creating transaction
		};
	}
	response = response.Envelope.Body.getReportsReturn;
	if(typeof response.attachment.attachedFile !== "undefined" && response.attachment.attachedFile !== "" && response.attachment.attachedFile){
		return _convertPDFToImage(response.attachment.attachedFile);
	}else{
		//return generateECertificateForRenewPermit(trafficFileNo);
		return {
			isSuccessful : false,
			data : null ,
			extension : "png"
		};
	}
//	return {
//		isSuccessful : true,
//		data : response.attachment.attachedFile,
//		extension : "pdf"
//	};
}




/****
 * This function is used to load the MNOC after paying the transaction.
 * Get Reports now returns reports for the folwing cases : 
 * - MLetter
 * - MNOC if delivery type is mnoc only.
 * 
 * It applyes for the following services : cancel,renew, issue, modify permit, issue approved letter and reprint 
 * @param transactionId
 * @param trafficFileNumber
 * @param deliveryType
 * @param serviceCode
 */
function getMNoc(transactionId, trafficFileNumber, deliveryType, serviceCode, appTypeDesc){
	try {
		trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNumber;
	} catch (e) {
		// TODO: handle exception
	}
	//	if(serviceCode == "-1" || serviceCode == "263"){
//		return generateCtaCertificate(trafficFileNumber, appTypeDesc);
//	}else if(serviceCode == '1070'){
//		return generateECertificateForRenewPermit(trafficFileNumber) ;
//	}else{
//		return getReports(transactionId) ;
//	}
	//We will always return the report
	return getReports(transactionId,trafficFileNumber) ;
}


function _convertPDFToImage(inputData) {
	var base64ImageString =  com.proxymit.pdf.utils.PDFToImage.convertPDFToImage(inputData);
	MFP.Logger.warn(base64ImageString);
	return {
		isSuccessful : true,
		data : base64ImageString ,
		extension : "png"
	};
}

//Will check the GetApplicationsService and seeks for the matching entry. It will extract the letterRefNo from that row.
function getLetterReferenceNumber(trafficFileNumber, letterExpiryDate){
	try {
		trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNumber;
		//TODO : to be implemented
	} catch (e) {
		// TODO: handle exception
	}
	return '12409235';
}



function generateECertificateForRenewPermit(trafficFileNo){
	var nocExpiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 90* 1000) ; // Default expiry Date is 90 days from date of issing
//	var letterRefNo = getLetterReferenceNumber(trafficFileNo, nocExpiryDate) ;
	var now = new Date() ;
	var letterTime = now.getHours()+' : '+ now.getMinutes(); 
	var html = com.proxymit.wl.utils.ResourceLoader.loadResource('conf/corporates/eCertificate.html');
//	var html = com.proxymit.wl.utils.ResourceLoader.loadResource('servers_res/eCertificate.html');
	html = html.replace('##date##', now);
	html = html.replace('##refNo##', letterRefNo);
	html = html.replace('##time##', letterTime);
	html = html.replace('##trafficNo##', trafficFileNo);
	html = html.replace('##expiryDate##', nocExpiryDate);
	html = html.replace('##date##', now);
	html = html.replace('##refNo##', letterRefNo);
	html = html.replace('##time##', letterTime);
	html = html.replace('##trafficNo##', trafficFileNo);
	html = html.replace('##expiryDate##', nocExpiryDate);
//	var base64ImageString =  com.proxymit.pdf.utils.HTMLToImage.convertHTMLToImage(html);
	var base64ImageString =  com.proxymit.pdf.utils.HtmlToPDF.convertWithImg(html, TMP_PATH);
//	var base64ImageString =  com.proxymit.pdf.utils.HtmlToPDF.convertWithImg(html, "D:/smartgov/cms/corpsrvc/servers_res/");
	base64ImageString =  com.proxymit.pdf.utils.PDFToImage.convertPDFToImage(base64ImageString);
	MFP.Logger.warn(base64ImageString);
	return {
		isSuccessful : true,
		data : base64ImageString ,
		extension : "png"
	};
}

function generateCtaCertificate(trafficFileNo, appTypeDesc){
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var html = com.proxymit.wl.utils.ResourceLoader.loadResource('conf/corporates/LicensingAgency.html');
	var permitType = "";
	var permitTypeEn = "";
	var nocExpiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 90* 1000) ; // Default expiry Date is 90 days from date of issing
//	var letterRefNo = getLetterReferenceNumber(trafficFileNo, nocExpiryDate) ;
	if(appTypeDesc == "5"){
		permitType = "ﺔﻴﻧﻭﺮﺘﻜﻟﺍ ﺓﺩﺎﻬﺷ  -"+"ﺢﻳﺮﺼﺘﻟﺍ ﺪﻳﺪﺠﺗ"+"ﻰﻠﻋ ﺔﻘﻓﺍﻮﻣ";
		permitTypeEn = "renew permit";
	}else if(appTypeDesc == "4") {
		permitType = "ﺔﻴﻧﻭﺮﺘﻜﻟﺍ ﺓﺩﺎﻬﺷ  -"+"ﺢﻳﺮﺼﺘﻟﺍ ﺮﻴﻐﺗ"+"ﻰﻠﻋ ﺔﻘﻓﺍﻮﻣ";
		permitTypeEn = "modify permit";
	}else if(appTypeDesc == "3"){
		permitType = "ﺔﻴﻧﻭﺮﺘﻜﻟﺍ ﺓﺩﺎﻬﺷ  -"+"ﺢﻳﺮﺼﺘﻟﺍ ءﺎﻐﻟﺇ"+"ﻰﻠﻋ ﺔﻘﻓﺍﻮﻣ";
		permitTypeEn = "cancel permit";
	}else{
		permitType = "ﺔﻴﻧﻭﺮﺘﻜﻟﺍ ﺓﺩﺎﻬﺷ  -"+"XXXXX"+"ﻰﻠﻋ ﺔﻘﻓﺍﻮﻣ";
		permitTypeEn = "XXXXX";
	}
	var now = new Date() ;
	var letterTime = now.getHours()+' : '+ now.getMinutes();
	html = html.replace('##beginDate##', now);
	html = html.replace('##time##', letterTime);
	html = html.replace('##trafficNo##', trafficFileNo);
	html = html.replace('##expiryDate##', nocExpiryDate);
	html = html.replace('##time##', letterTime);
	html = html.replace('##trafficNo##', trafficFileNo);
	html = html.replace('##expiryDate##', nocExpiryDate);
	html = html.replace('##permitTypeEn##', permitTypeEn);
	html = html.replace('##permitTypeEn##', permitTypeEn);
	html = html.replace('##permitType##', permitType);
var base64ImageString =  com.proxymit.pdf.utils.HtmlToPDF.convertWithImg(html, TMP_PATH);
	base64ImageString =  com.proxymit.pdf.utils.PDFToImage.convertPDFToImage(base64ImageString);
	MFP.Logger.warn(base64ImageString);
	return {
		isSuccessful : true,
		data : base64ImageString,
		extension : "png"
	};
}



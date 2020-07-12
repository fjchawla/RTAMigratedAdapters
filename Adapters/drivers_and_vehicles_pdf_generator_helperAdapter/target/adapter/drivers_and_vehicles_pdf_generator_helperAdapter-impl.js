1/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  MFP.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *  	
 *  	// Optional 
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "javascript", "plain", "xml", "html"  
 *  	returnedContentEncoding : 'encoding', 
 *  	parameters: {name1: value1, ... }, 
 *  	headers: {name1: value1, ... }, 
 *  	cookies: {name1: value1, ... }, 
 *  	body: { 
 *  		contentType: 'text/xml; charset=utf-8' or similar value, 
 *  		content: stringValue 
 *  	}, 
 *  	transformation: { 
 *  		type: 'default', or 'xslFile', 
 *  		xslFile: fileName 
 *  	} 
 *  } 
 */

/**
 * This method is used to generate a jasper report, then returns base64String
 * images representing each page from the generated report
 * 
 */
var IsDebugging;
function Log(text){
	 try {
		 IsDebugging=MFP.Server.getPropertyValue("drivers_and_vehicles_is_debugging");
	 }catch(e){
		 IsDebugging="false";
	 }
	 // MFP.Logger.warn(""+IsDebugging);
	 if(IsDebugging=="true")
		 MFP.Logger.warn(text);
	 else 
		 MFP.Logger.debug(text);
}
function generatePDFReport(reportName, reportParams) {
	var pdf = new com.ibm.drivers_and_vehicles.ReportGenerator();
	var reportPath = MFP.Server.getPropertyValue("drivers_and_vehicles_reports_path");
	var pdfFileEncoded = pdf.generatePDFReport(reportPath +"/"+reportName + ".jasper", decodeURI(reportParams));

	return {result : pdfFileEncoded};
}

/**
 * This method is used to generate multi PDF file reports
 */
function generateMultiPDFReports(reportParamsAsArray) {
	var reportResults = [];
	//Log("params >> " + reportParamsAsArray);
	//Log("params >> " + JSON.stringify(reportParamsAsArray));
	
	
	if (reportParamsAsArray) {
		var reportParamsAsJSON = JSON.parse(reportParamsAsArray); 
		//Log("reportParamsAsJSON >> " + reportParamsAsJSON);
		for (var eachReport in reportParamsAsJSON) {
			
			if (reportParamsAsJSON.hasOwnProperty(eachReport)) {
				var reportName = eachReport;
				var reportValues = reportParamsAsJSON[eachReport];//this is array holding each report data that has the same report name
				//Log("reportName >> " + reportName);
								
				for (var i = 0; i < reportValues.length; i++) {
					//Log("eachValue >> " + reportValues[i]);
					var reportResult = generatePDFReport(reportName, reportValues[i]);
					var obj = JSON.parse(reportResult["result"]);
					var pdfPages = obj.pdfDocumentPages;
					
					if (true == obj.isSuccessful) {
						reportResults.push.apply(reportResults, pdfPages);

					} else {
						var failureObj = {
							isSuccessful : false
						};
						return {
							result : failureObj
						};
					}
				}
			}
		}
		var successObj = {isSuccessful : true, pdfDocumentPages : reportResults};
		return {result : successObj};
	}
}

function convertPdfToImages(pdfByteArray){
	var pdfImageConvert = new com.ibm.drivers_and_vehicles.PdfImageConverter();
	var pdfDocumentPages = pdfImageConvert.convertPDFByteArrayIntoImage(pdfByteArray);
	//MFP.Logger.warn(image.toString());
	return {isSuccessful : true,pdfDocumentPages:pdfDocumentPages};
	
}

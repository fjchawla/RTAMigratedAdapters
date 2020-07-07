var EXTERNAL_USERNAME = 'Omnix_user';
var EXTERNAL_PASSWORD = 'test12345';
var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;
var path = "/epqvendordetail";

function viewPreQualificationDetails(emailId){
	try {
		emailId = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').userId : emailId;
	} catch (e) {
		// TODO: handle exception
	}
	var soapActionHeader = '"ViewPreQualificationDetails"';
	var viewPreQualificationDetailsRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/VendorDetailsService/XMLSchema">\
		  <soapenv:Header>\
	   <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
			<wsse:Username>'+tibcoUsername+'</wsse:Username>\
	        <wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <xs:ViewPreQualificationDetails>\
	         <!--Optional:-->\
	         <xs:emailId>'+emailId+'</xs:emailId>\
	      </xs:ViewPreQualificationDetails>\
	   </soapenv:Body>\
	</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : viewPreQualificationDetailsRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.ViewPreQualificationDetailsResponse) == "undefined") {
		MFP.Logger.warn("Error view PreQualification Details");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference : response
		};
	}
	var preQualificationDetailsResult = response.Envelope.Body.ViewPreQualificationDetailsResponse.ViewPreQualificationDetailsResult.Result.PreQualificationResult;
	if(preQualificationDetailsResult != undefined && !Array.isArray(preQualificationDetailsResult)){
		response.Envelope.Body.ViewPreQualificationDetailsResponse.ViewPreQualificationDetailsResult.Result.PreQualificationResult = [preQualificationDetailsResult];
	}
	return {
		isSuccessful : true,
		preQualificationDetails : response.Envelope.Body.ViewPreQualificationDetailsResponse.ViewPreQualificationDetailsResult
	};
		
}

function viewPreQualificationDetailsFiltred(emailId) {
	try {
		emailId = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').userId : emailId;
	} catch (e) {
		// TODO: handle exception
	}
	var invocationData = {
		parameters : [ emailId ],
	};
	invocationData.adapter = "corporate_Cognizant_Vendor";
	invocationData.procedure = "viewPreQualificationDetails";
	var response = MFP.Server.invokeProcedure(invocationData);
	var result = [];
	if(response.preQualificationDetails.Result.PreQualificationResult.length > 0){
		for (i in response.preQualificationDetails.Result.PreQualificationResult) {
			if (response.preQualificationDetails.Result.PreQualificationResult[i]._x003C_StatusCode_x003E_k__BackingField._x003C_Name_x003E_k__BackingField == "Prequalified"
					|| response.preQualificationDetails.Result.PreQualificationResult[i]._x003C_StatusCode_x003E_k__BackingField._x003C_Name_x003E_k__BackingField == "Conditionally Prequalified"){
				result.push(response.preQualificationDetails.Result.PreQualificationResult[i]);
			}
		}
	}
	return {
		preQualificationDetails : result
	};
}

function viewVendorInfo(emailId){
	try {
		emailId = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined &&MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').userId : emailId;
	} catch (e) {
		// TODO: handle exception
	}
	var soapActionHeader = '"ViewVendorInfo"';
	var viewVendorInfoRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/VendorDetailsService/XMLSchema">\
		  <soapenv:Header>\
		   <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
		    <wsse:UsernameToken>\
				<wsse:Username>'+tibcoUsername+'</wsse:Username>\
		        <wsse:Password>'+tibocPwd+'</wsse:Password>\
		         </wsse:UsernameToken>\
		      </wsse:Security>\
		   </soapenv:Header>\
	   <soapenv:Body>\
	      <xs:ViewVendorInfo>\
	         <!--Optional:-->\
	         <xs:emailId>'+emailId+'</xs:emailId>\
	      </xs:ViewVendorInfo>\
	   </soapenv:Body>\
	</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : viewVendorInfoRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	
	if (typeof (response.Envelope.Body.ViewVendorInfoResponse) == "undefined") {
		MFP.Logger.warn("Error view vendor info");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference : response
		};
	}
		
	return {
		isSuccessful : true,
		vendorInfo : response.Envelope.Body.ViewVendorInfoResponse.ViewVendorInfoResult
	};
			
}

function generatePrequalificationCertif(companyName, type, address, phone, fax, date, applicationsInfo) {
	var html = com.proxymit.wl.utils.ResourceLoader.loadResource('conf/corporates/preTemplate.html');
//	var html = com.proxymit.wl.utils.ResourceLoader.loadResource('servers_res/preTemplate.html');
	
	var htmlApp = "";
	for(i in applicationsInfo){
		htmlApp += '<tr>\
			<td>'+applicationsInfo[i].agency+'</td>\
			<td>'+applicationsInfo[i].department+'</td>\
			<td>'+applicationsInfo[i].workspace+'</td>\
			<td>'+applicationsInfo[i].valueLimitAED+'</td>\
			<td>'+applicationsInfo[i].status+'</td>\
			<td>'+applicationsInfo[i].expiryDate+'</td>\
			<td>'+applicationsInfo[i].otherCondition+'</td>\
		</tr>';
	}
	html = html.replace('##applications##', htmlApp);
	html = html.replace('##companyName##', companyName);
	html = html.replace('##type##', type);
	html = html.replace('##address##', address);
	html = html.replace('##phone##', phone);
	html = html.replace('##fax##', fax);
	html = html.replace('##companyName##', companyName);
	html = html.replace('##date##', date);
	MFP.Logger.warn(html);
//	var base64ImageString =  com.proxymit.pdf.utils.HtmlToPDF.convertWithImg(html, "/home/proxym-it/RTA_Workspace/2014_omnix_rta/server/conf/corporates/");
	var base64ImageString =  com.proxymit.pdf.utils.HtmlToPDF.convertWithImg(html, "D:/smartgov/cms/corpsrvc/servers_res/");
	base64ImageString =  com.proxymit.pdf.utils.PDFToImage.convertPDFToImage(base64ImageString);
	MFP.Logger.warn(base64ImageString);
	return {
		data : base64ImageString ,
		extension : "pdf"
	};
}
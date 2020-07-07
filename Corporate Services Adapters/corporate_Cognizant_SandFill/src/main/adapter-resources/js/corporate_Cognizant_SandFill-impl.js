var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;

function addNewSandFill(branch, ownerName, contactNumber, secondContactNumber, faxNumber, email, plotNumber, street, serviceType,
		description, frontOfficeRemarks, backOfficeRemarks, referenceNo, status, attachmentsData){
	var path = "/sandfillservice";
	var soapActionHeader = '"AddNewSandFillRequest"';
	var xmlAttachments = _setAttachments(attachmentsData);
	var addNewSandFillRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/A/SandFillService/Schema.xsd">\
		   <soapenv:Header>\
	   <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
	            <wsse:Username>'+tibcoUsername+'</wsse:Username>\
	            <wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:AddNewSandFillRequest>\
	         <!--Optional:-->\
	         <sch:Branch>'+branch+'</sch:Branch>\
	         <!--Optional:-->\
	         <sch:OwnerName>'+ownerName+'</sch:OwnerName>\
	         <!--Optional:-->\
	         <sch:ContactNumber>'+contactNumber+'</sch:ContactNumber>\
	         <!--Optional:-->\
	         <sch:SecondContactNumber>'+secondContactNumber+'</sch:SecondContactNumber>\
	         <!--Optional:-->\
	         <sch:FaxNumber>'+faxNumber+'</sch:FaxNumber>\
	         <!--Optional:-->\
	         <sch:Email>'+email+'</sch:Email>\
	         <!--Optional:-->\
	         <sch:PlotNumber>'+plotNumber+'</sch:PlotNumber>\
	         <!--Optional:-->\
	         <sch:Street>'+street+'</sch:Street>\
	         <!--Optional:-->\
	         <sch:ServiceType>'+serviceType+'</sch:ServiceType>\
	         <!--Optional:-->\
	         <sch:description>'+description+'</sch:description>\
	         <!--Optional:-->\
	         <sch:FrontofficeRemarks>'+frontOfficeRemarks+'</sch:FrontofficeRemarks>\
	         <!--Optional:-->\
	         <sch:BackofficeRemarks>'+backOfficeRemarks+'</sch:BackofficeRemarks>\
	         <!--Optional:-->\
	         <sch:ReferenceNo>'+referenceNo+'</sch:ReferenceNo>\
	         <!--Optional:-->\
	         <sch:Status>'+status+'</sch:Status>\
	         <!--Optional:-->\
	         <sch:Attachments>\
	         '+xmlAttachments+'\
	         </sch:Attachments>\
	      </sch:AddNewSandFillRequest>\
	   </soapenv:Body>\
	</soapenv:Envelope>';
	
	MFP.Logger.info(addNewSandFillRequest.toString());
	
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : addNewSandFillRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.AddNewSandFillRequestResponse) == "undefined") {
		MFP.Logger.warn("Error submit new sand fill");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference : response 
		};
	}
		
	return {
		isSuccessful : true,
		result : response.Envelope.Body.AddNewSandFillRequestResponse.AddNewSandFillRequestResult
	};
}

function _setAttachments(attachmentsData){
	var xmlAttachments = '';
	if (attachmentsData.length < 1) return xmlAttachments ;
	
		for(i in attachmentsData){
			xmlAttachments += '<sch:DocumentInfo>\
            <sch:DocumentName>'+attachmentsData[i].fileName+'</sch:DocumentName>\
            <sch:DocumentContent>'+attachmentsData[i].fileContent+'</sch:DocumentContent>\
         </sch:DocumentInfo>';
		}
		MFP.Logger.info(xmlAttachments);
		return xmlAttachments;
}
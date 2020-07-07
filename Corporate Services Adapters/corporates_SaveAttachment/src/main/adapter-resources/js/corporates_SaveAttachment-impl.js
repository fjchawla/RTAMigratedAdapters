/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;


function saveAttachments(attachmentData, attachmentExt, attachmentType, transactionId){
	var path = "saveattachmentsservice";
	var soapActionHeader = '"SaveAttachments"';
	var saveAttachmentsDetailsRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/SaveAttachmentsService_BW_SRC/XMLSchema">\
		 <soapenv:Header>\
	 <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
	           <wsse:Username>'+tibcoUsername+'</wsse:Username>\
		<wsse:Password>'+tibocPwd+'</wsse:Password>\
	            <wsse:Password>1^p(4q!7jr*8</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
<xs:ExternalUser>\
  <xs:externalUsername>'+EXTERNAL_USERNAME+'</xs:externalUsername>\
  <xs:externalUserPassword>'+EXTERNAL_PASSWORD+'</xs:externalUserPassword>\
</xs:ExternalUser>\
</soapenv:Header>\
		<soapenv:Body>\
	      <xs:saveAttachment>\
	         <xs:transactoinId>'+transactionId+'</xs:transactoinId>\
	         <xs:attachments>\
	            <xs:attachment>\
	               <xs:attachedFile>'+attachmentData+'</xs:attachedFile>\
	               <xs:attachmentExtension>'+attachmentExt+'</xs:attachmentExtension>\
	               <xs:attachmentType>'+attachmentType+'</xs:attachmentType>\
	            </xs:attachment>\
	         </xs:attachments>\
	      </xs:saveAttachment>\
	   </soapenv:Body>\
	</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : saveAttachmentsDetailsRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	// return response;
	// Analyzing response for errors
	var header = response.Envelope.Header;
	if (typeof (header) == 'object'
			|| typeof (response.Envelope.Body.saveAttachmentReturn) == 'undefined') {
		MFP.Logger.warn("Error getting save attachment response");
		MFP.Logger.warn("header");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again"
		// 301 means error creating transaction
		};
	}
	// Reading xml Response
	var xmlResponse = response.Envelope.Body.saveAttachmentReturn;
	
	return {
		isSuccessful : true,
		message : xmlResponse.responseMessage,
		code : xmlResponse.code
	};
	
}

function saveManyAttachments(attachmentsData, transactionId, traineeId){
	/**
	 * sample json fields
	 * 		[{
			   		'file' : '102763071627051',
			   		'extension' : 'jpg'
			   },{
			   		'file' : '10276307162778',
			   		'extension' : 'pdf'
			   }],
			   "39825023",
			   "8454"
	 */
	var xmlAttachments = _setAttachments(attachmentsData);
	MFP.Logger.info(xmlAttachments);
	var path = "saveattachmentsservice";
	var soapActionHeader = '"SaveAttachments"';
	var saveAttachmentsDetailsRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/SaveAttachmentsService_BW_SRC/XMLSchema">\
		 <soapenv:Header>\
	 <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
	           <wsse:Username>'+tibcoUsername+'</wsse:Username>\
		<wsse:Password>'+tibocPwd+'</wsse:Password>\
	            <wsse:Password>1^p(4q!7jr*8</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
<xs:ExternalUser>\
  <xs:externalUsername>'+EXTERNAL_USERNAME+'</xs:externalUsername>\
  <xs:externalUserPassword>'+EXTERNAL_PASSWORD+'</xs:externalUserPassword>\
</xs:ExternalUser>\
</soapenv:Header>\
		<soapenv:Body>\
	      <xs:saveAttachment>\
	         <xs:transactoinId>'+transactionId+'</xs:transactoinId>\
	         <xs:traineeId>'+traineeId+'</xs:traineeId>\
	         <xs:memberId></xs:memberId>\
	         <xs:attachments>\
	         '+xmlAttachments+'\
	         </xs:attachments>\
	      </xs:saveAttachment>\
	   </soapenv:Body>\
	</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : saveAttachmentsDetailsRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	// return response;
	// Analyzing response for errors
	var header = response.Envelope.Header;
	if (typeof (header) == 'object'
			|| typeof (response.Envelope.Body.saveAttachmentReturn) == 'undefined') {
		MFP.Logger.warn("Error getting save attachment response");
		MFP.Logger.warn("header");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again"
		// 301 means error creating transaction
		};
	}
	// Reading xml Response
	var xmlResponse = response.Envelope.Body.saveAttachmentReturn;
	
	return {
		isSuccessful : true,
		message : xmlResponse.responseMessage,
		code : xmlResponse.code
	};
	
}

function _setAttachments(attachmentsData){
	var xmlAttachments = '';
	MFP.Logger.info(attachmentsData);
		for(i in attachmentsData){
			if(attachmentsData[i].attachmentType == undefined || attachmentsData[i].attachmentType == ""){
				attachmentsData[i].attachmentType = "10";
			}
			xmlAttachments += '<xs:attachment>\
	               <xs:attachedFile>'+attachmentsData[i].file+'</xs:attachedFile>\
            <xs:attachmentExtension>'+attachmentsData[i].extension+'</xs:attachmentExtension>\
            <xs:attachmentType>'+attachmentsData[i].attachmentType+'</xs:attachmentType>\
         </xs:attachment>';
		}
		MFP.Logger.info(xmlAttachments);
		return xmlAttachments;
}

function saveAttachmentsData(attachmentsData, transactionId){
	var xmlAttachments = _setAttachments(attachmentsData);
	var path = "saveattachmentsservice";
	var soapActionHeader = '"SaveAttachments"';
	var saveAttachmentsDetailsRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/SaveAttachmentsService_BW_SRC/XMLSchema">\
		 <soapenv:Header>\
	 <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
        <wsse:Username>'+tibcoUsername+'</wsse:Username>\
		<wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
<xs:ExternalUser>\
  <xs:externalUsername>'+EXTERNAL_USERNAME+'</xs:externalUsername>\
  <xs:externalUserPassword>'+EXTERNAL_PASSWORD+'</xs:externalUserPassword>\
</xs:ExternalUser>\
</soapenv:Header>\
		<soapenv:Body>\
	      <xs:saveAttachment>\
	         <xs:transactoinId>'+transactionId+'</xs:transactoinId>\
	         <xs:attachments>\
	            '+xmlAttachments+'\
	         </xs:attachments>\
	      </xs:saveAttachment>\
	   </soapenv:Body>\
	</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : saveAttachmentsDetailsRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	// return response;
	// Analyzing response for errors
	var header = response.Envelope.Header;
	if (typeof (header) == 'object'
			|| typeof (response.Envelope.Body.saveAttachmentReturn) == 'undefined') {
		MFP.Logger.warn("Error getting save attachment response");
		MFP.Logger.warn("header");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again"
		// 301 means error creating transaction
		};
	}
	// Reading xml Response
	var xmlResponse = response.Envelope.Body.saveAttachmentReturn;
	
	return {
		isSuccessful : true,
		message : xmlResponse.responseMessage,
		code : xmlResponse.code
	};
}
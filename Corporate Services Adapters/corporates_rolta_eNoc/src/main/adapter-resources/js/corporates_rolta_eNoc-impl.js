var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username");
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password");
//var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
//var EXTERNAL_PASSWORD = '555M55MM';
var header = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/eNocMobileService/XMLSchema" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	<soapenv:Header>\
<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
<wsse:UsernameToken>\
   <wsse:Username>' + tibcoUsername + '</wsse:Username>\
   <wsse:Password>' + tibocPwd + '</wsse:Password>\
</wsse:UsernameToken>\
</wsse:Security>\
</soapenv:Header>';

var path = "enocmobileservice";

var publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0XZXxflmdLRirmZsdDloADI4msrszWoCn01OsG2Nin3RFcSrhBtytEAFwDAg7CR+76+ZAIlYEiThnS/ItakpXNb8mabqoiGfxQzl5PbpcjDSb/p9Gx5+SCaWsJxbkPikOxSM+9H+tU3trcWFe0EtWC0we6/JKf/vNXlzkhWSk+QIDAQAB";
var privateKey = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALRdlfF+WZ0tGKuZmx0OWgAMjiayuzNagKfTU6wbY2KfdEVxKuEG3K0QAXAMCDsJH7vr5kAiVgSJOGdL8i1qSlc1vyZpuqiIZ/FDOXk9ulyMNJv+n0bHn5IJpawnFuQ+KQ7FIz70f61Te2txYV7QS1YLTB7r8kp/+81eXOSFZKT5AgMBAAECgYBxEh5XB4usckH+CczpGT8ourY+4ltjJUB0dZIF2iGjCS19/yUPbxrWz6rnEFP0lpKzX364BA6Cx3d5om3PNMwm8bRQkdGMXCDXub/C8TMcLElXN25C+SWUAe1hQlXxMqPIry5rwcgcTFYaZuV3S3WWF3PcytwvEmiu6wcOrXB81QJBAPjLFgbe67M3Ob2pn49+JsqGR7DsVvB/lu6ThGa7aOLHGT4mehbK8IGDZ8ePMA7aLcIrzeiKNsm5SGHqxalTJXsCQQC5lxPLLthrWxN2Yu1FZG9VqeVcvNKrqQ4rXmcVu6j20ib1Oa1hVISp7Q4+WyakswDDJEPvqryLAxk16HesScMbAkAlDRmarFgtuGvA8yHwHLlqL9U9Y/UOm/G+VfnB0ucr3rrDprdH7bEjmI48Cfb+Pz/RSvS/TNYb9Jvy+SO2s8tBAkEAmnzyUx5JtQP5bYDn9e2m5+4nKU1dKNvvGZbZxLOT8PH60AMVGoIadMEKLEoAHvWK2uYjTywXCrinkcJTbC1ypQJBAKSx+oTM4l2vpaWRkqo6cWwY0we6owe2wcCwAjU4cKxGatKRflAUJlJ/T4oJNdAtt2YwMMjg4pjtx0fxks2Ba9c=";

function deleteSelectedNotifications(userName, listofIds) {

    var idField = "";
    if (listofIds.length > 0) {
        for (i in listofIds) {
            idField += '<xs:int>' + listofIds[i] + '</xs:int>';
        }
    }
    var rq = '' + header + '\
		<soapenv:Body>\
        <xs:DeleteSelectedNotifications>\
         <!--Optional:-->\
         <xs:userName>' + userName + '</xs:userName>\
         <!--Optional:-->\
         <xs:NotificationIDs>\
            <!--Zero or more repetitions:-->\
            ' + idField + '\
         </xs:NotificationIDs>\
        </xs:DeleteSelectedNotifications>\
        </soapenv:Body>\
        </soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.DeleteSelectedNotificationsResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 350,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.DeleteSelectedNotificationsResponse.DeleteSelectedNotificationsResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.DeleteSelectedNotificationsResponse.DeleteSelectedNotificationsResult
        };
    } else {
        return response.Envelope.Body.DeleteSelectedNotificationsResponse;
    }
}

function downloadAttachment(userName, nocReference, documentId) {

    var rq = '' + header + '\
		<soapenv:Body>\
	    <xs:DownloadAttachments>\
	       <!--Optional:-->\
	       <xs:Username>' + userName + '</xs:Username>\
	       <!--Optional:-->\
	       <xs:NOCReference>' + nocReference + '</xs:NOCReference>\
	       <xs:documentID>' + documentId + '</xs:documentID>\
	    </xs:DownloadAttachments>\
	 </soapenv:Body>\
	</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.DownloadAttachmentsResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 365,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.DownloadAttachmentsResponse.DownloadAttachmentsResult != undefined) {
        if (response.Envelope.Body.DownloadAttachmentsResponse.DownloadAttachmentsResult.Data != undefined && response.Envelope.Body.DownloadAttachmentsResponse.DownloadAttachmentsResult.Data != "") {
            if (_getExtension(response.Envelope.Body.DownloadAttachmentsResponse.DownloadAttachmentsResult.Name) == "pdf") {
                base64ImageString = com.proxymit.pdf.utils.PDFToImage.convertPDFToImage(response.Envelope.Body.DownloadAttachmentsResponse.DownloadAttachmentsResult.Data);
                if (base64ImageString == "false") {
                    return {
                        isSuccessful: false,
                        errorCode: 500,
                        message: "An error has been occured. The file is possibly corrupt.",
                        reference: response
                    };
                }
                response.Envelope.Body.DownloadAttachmentsResponse.DownloadAttachmentsResult.Data = base64ImageString;
            }
        }
        return {
            isSuccessful: true,
            result: response.Envelope.Body.DownloadAttachmentsResponse.DownloadAttachmentsResult
        };
    } else {
        return response.Envelope.Body.DownloadAttachmentsResponse;
    }
}

function filterAndSearchNoc(userName, isNotReplied, isDueforRevalidation, nocNumber, projectCode, nocTypeId, appliedDateFrom,
    appliedDateTo, clientName, projectTypeId, nocStatusId, departmentId, departmentWiseStatus, tradeLicenceNo, approvalDateFrom,
    approvalDateTo, parcelId, streentNo, communityName, isTemporarilyApproved, isRevalidated) {

    var rq = '' + header + '\
	   <soapenv:Body>\
	      <xs:FilterAndSearchNOC>\
	         <!--Optional:-->\
	         <xs:Username>' + userName + '</xs:Username>\
	         <!--Optional:-->\
	         <xs:criteria>';

    if (isNotReplied != "" && isNotReplied != null) {
        rq += '<xs:IsNotReplied>' + isNotReplied + '</xs:IsNotReplied>';
    }
    if (isDueforRevalidation != "" && isDueforRevalidation != null) {
        rq += '<xs:IsDueforRevalidation>' + isDueforRevalidation + '</xs:IsDueforRevalidation>';
    }
    if (nocNumber != "" && nocNumber != null) {
        rq += '<xs:NOCNumber>' + nocNumber + '</xs:NOCNumber>';
    }
    if (projectCode != "" && projectCode != null) {
        rq += '<xs:ProjectCode>' + projectCode + '</xs:ProjectCode>';
    }
    if (nocTypeId != "" && nocTypeId != null) {
        rq += '<xs:NOCTypeID>' + nocTypeId + '</xs:NOCTypeID>';
    }
    if (appliedDateFrom != "" && appliedDateFrom != null) {
        rq += '<xs:AppliedDateFrom>' + appliedDateFrom + '</xs:AppliedDateFrom>';
    }
    if (appliedDateTo != "" && appliedDateTo != null) {
        rq += '<xs:AppliedDateTo>' + appliedDateTo + '</xs:AppliedDateTo>';
    }
    if (clientName != "" && clientName != null) {
        rq += '<xs:ClientName>' + clientName + '</xs:ClientName>';
    }
    if (projectTypeId != "" && projectTypeId != null) {
        rq += '<xs:ProjectTypeID>' + projectTypeId + '</xs:ProjectTypeID>';
    }
    if (nocStatusId != "" && nocStatusId != null) {
        rq += '<xs:NOCStatusID>' + nocStatusId + '</xs:NOCStatusID>';
    }
    if (departmentId != "" && departmentId != null) {
        rq += '<xs:DepartmentID>' + departmentId + '</xs:DepartmentID>';
    }
    if (departmentWiseStatus != "" && departmentWiseStatus != null) {
        rq += '<xs:DepartmentWiseStatus>' + departmentWiseStatus + '</xs:DepartmentWiseStatus>';
    }
    if (tradeLicenceNo != "" && tradeLicenceNo != null) {
        rq += '<xs:TradeLicenceNo>' + tradeLicenceNo + '</xs:TradeLicenceNo>';
    }
    if (approvalDateFrom != "" && approvalDateFrom != null) {
        rq += '<xs:ApprovalDateFrom>' + approvalDateFrom + '</xs:ApprovalDateFrom>';
    }
    if (approvalDateTo != "" && approvalDateTo != null) {
        rq += '<xs:ApprovalDateTo>' + approvalDateTo + '</xs:ApprovalDateTo>';
    }
    if (parcelId != "" && parcelId != null) {
        rq += '<xs:ParcelID>' + parcelId + '</xs:ParcelID>';
    }
    if (streentNo != "" && streentNo != null) {
        rq += '<xs:StreetNo>' + streentNo + '</xs:StreetNo>';
    }
    if (communityName != "" && communityName != null) {
        rq += '<xs:CommunityName>' + communityName + '</xs:CommunityName>';
    }
    if (isTemporarilyApproved != "" && isTemporarilyApproved != null) {
        rq += '<xs:IsTemporarilyApproved>' + isTemporarilyApproved + '</xs:IsTemporarilyApproved>';
    }
    if (isRevalidated != "" && isRevalidated != null) {
        rq += '<xs:IsRevalidated>' + isRevalidated + '</xs:IsRevalidated>';
    }

    rq += '</xs:criteria>\
	      </xs:FilterAndSearchNOC>\
		   </soapenv:Body>\
		</soapenv:Envelope>';

    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.FilterAndSearchNOCResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 351,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.FilterAndSearchNOCResponse.FilterAndSearchNOCResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.FilterAndSearchNOCResponse.FilterAndSearchNOCResult
        };
    } else {
        return response.Envelope.Body.FilterAndSearchNOCResponse;
    }
}

function getAllDepartments() {
    var rq = '' + header + '\
		   <soapenv:Body>\
	    <xs:GetAllDepartments/>\
	 </soapenv:Body>\
	</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetAllDepartmentsResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 352,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetAllDepartmentsResponse.GetAllDepartmentsResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetAllDepartmentsResponse.GetAllDepartmentsResult
        };
    } else {
        return response.Envelope.Body.GetAllDepartmentsResponse;
    }
}

function getAllDrillingTypes() {
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetAllDrillingTypes/>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetAllDrillingTypesResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 353,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetAllDrillingTypesResponse.GetAllDrillingTypesResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetAllDrillingTypesResponse.GetAllDrillingTypesResult
        };
    } else {
        return response.Envelope.Body.GetAllDrillingTypesResponse;
    }
}

function getAllPaymentByTypes() {
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetAllPaymentByTypes/>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetAllPaymentByTypesResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 354,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetAllPaymentByTypesResponse.GetAllPaymentByTypesResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetAllPaymentByTypesResponse.GetAllPaymentByTypesResult
        };
    } else {
        return response.Envelope.Body.GetAllPaymentByTypesResponse;
    }
}

function getAllProjectTypes() {
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetAllProjectTypes/>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetAllProjectTypesResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 355,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetAllProjectTypesResponse.GetAllProjectTypesResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetAllProjectTypesResponse.GetAllProjectTypesResult
        };
    } else {
        return response.Envelope.Body.GetAllProjectTypesResponse;
    }
}

function getAllReinstatementByTypes() {
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetAllReinstatementByTypes/>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetAllReinstatementByTypesResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 356,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetAllReinstatementByTypesResponse.GetAllReinstatementByTypesResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetAllReinstatementByTypesResponse.GetAllReinstatementByTypesResult
        };
    } else {
        return response.Envelope.Body.GetAllReinstatementByTypesResponse;
    }
}

function getAllTrenchTypes() {
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetAllTrenchTypes/>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetAllTrenchTypesResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 357,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetAllTrenchTypesResponse.GetAllTrenchTypesResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetAllTrenchTypesResponse.GetAllTrenchTypesResult
        };
    } else {
        return response.Envelope.Body.GetAllTrenchTypesResponse;
    }
}

function getNOCsList(userName, nocStatus, notReplied) {

	
    var now = new Date();
    var from = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    
    var DateFrom = formatDate(from);
    
    var DateTo = formatDate(now);
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetNOCsList>\
       <!--Optional:-->\
       <xs:username>' + userName + '</xs:username>\
       <xs:appliedFromDate>' + DateFrom + '</xs:appliedFromDate>\
       <xs:appliedToDate>' + DateTo + '</xs:appliedToDate>\
    </xs:GetNOCsList>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
  // test 
    /*return{
    	response: response,
    	request:rq.toString()
    }*/
    //
    MFP.Logger.warn(rq);

    if (typeof(response.Envelope.Body.GetNOCsListResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 358,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetNOCsListResponse.GetNOCsListResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetNOCsListResponse.GetNOCsListResult
        };
    } else if(response.Envelope.Body.GetNOCsListResponse && typeof(response.Envelope.Body.GetNOCsListResponse) == "object"){
    	return {
            isSuccessful: true,
            result: response.Envelope.Body.GetNOCsListResponse
        };     
    }else {
    	return {
            isSuccessful: true,
            result:[]
        }; 
    }
}

function getNOCTypes() {
    var rq = '' + header + '\
	<soapenv:Body>\
    <xs:GetNOCTypes/>\
	</soapenv:Body>\
	</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetNOCTypesResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 359,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetNOCTypesResponse.GetNOCTypesResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetNOCTypesResponse.GetNOCTypesResult
        };
    } else {
        return response.Envelope.Body.GetNOCTypesResponse;
    }
}

function getNotificationList(userName) {

    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetNotificationsList>\
       <!--Optional:-->\
       <xs:username>' + userName + '</xs:username>\
    </xs:GetNotificationsList>\
	</soapenv:Body>\
	</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (response.isSuccessful && response.Envelope && response.Envelope.Body && response.Envelope.Body.Fault && response.Envelope.Body.Fault.faultstring == "No Records Found") {
        return {
            isSuccessful: true,
            result: {
                NotificationData: []
            }
        };
    }

    if (typeof(response.Envelope.Body.GetNotificationsListResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 359,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetNotificationsListResponse.GetNotificationsListResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetNotificationsListResponse.GetNotificationsListResult
        };
    } else {
        return response.Envelope.Body.GetNotificationsListResponse;
    }
}

function GetQuestionnaireByType(nocTypeId) {
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetQuestionnaireByType>\
       <xs:NOCTypeID>' + nocTypeId + '</xs:NOCTypeID>\
    </xs:GetQuestionnaireByType>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetQuestionnaireByTypeResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 360,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetQuestionnaireByTypeResponse.GetQuestionnaireByTypeResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetQuestionnaireByTypeResponse.GetQuestionnaireByTypeResult
        };
    } else {
        return response.Envelope.Body.GetQuestionnaireByTypeResponse;
    }
}

function getReceipt(userName, nocReference) {

    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetReceipt>\
       <!--Optional:-->\
       <xs:Username>' + userName + '</xs:Username>\
       <!--Optional:-->\
       <xs:NOCReference>' + nocReference + '</xs:NOCReference>\
    </xs:GetReceipt>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetReceiptResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 361,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetReceiptResponse.GetReceiptResult != undefined) {
        if (response.Envelope.Body.GetReceiptResponse.GetReceiptResult.Data != undefined && response.Envelope.Body.GetReceiptResponse.GetReceiptResult.Data != "") {
            if (_getExtension(response.Envelope.Body.GetReceiptResponse.GetReceiptResult.Name) == "pdf") {
                base64ImageString = com.proxymit.pdf.utils.PDFToImage.convertPDFToImage(response.Envelope.Body.GetReceiptResponse.GetReceiptResult.Data);
                if (base64ImageString == "false") {
                    return {
                        isSuccessful: false,
                        errorCode: 500,
                        message: "An error has been occured. The file is probably corrupt.",
                        reference: response
                    };
                }
                response.Envelope.Body.GetReceiptResponse.GetReceiptResult.Data = base64ImageString;
            }
        }
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetReceiptResponse.GetReceiptResult
        };
    } else {
        return response.Envelope.Body.GetReceiptResponse;
    }
}

function login(userName) {
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:Login>\
       <!--Optional:-->\
       <xs:username>'+ userName +'</xs:username>\
       <!--Optional:-->\
       <xs:password></xs:password>\
    </xs:Login>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    
    try {
        MFP.Logger.warn(response);
        if (typeof(response.Envelope.Body.LoginResponse) == "undefined" || !response.Envelope.Body.LoginResponse.LoginResult) {
            return {
                isSuccessful: false,
                errorCode: 501,
                message: "An error has been occured in the server. Kindly try again",
                reference: response
            };
        }
       
        if(response.Envelope.Body.LoginResponse.LoginResult.IsAuthenticated == 'false'){
        	return {
                isSuccessful: false,
                errorCode: 502,
                message: "User is not authorized",
                reference: response
            };
        }
        if(response.Envelope.Body.LoginResponse.LoginResult.IsAuthenticated == 'true'){
        	return getNOCsList(userName,'','true');
        		
        }
       
       /* MFP.Logger.warn(response);
        if (response.Envelope.Body.LoginResponse.LoginResult != undefined) {
            return {
                isSuccessful: true,
                isAuthenticated: response.Envelope.Body.LoginResponse.LoginResult.IsAuthenticated,
                isTradeLicenseActive: response.Envelope.Body.LoginResponse.LoginResult.IsTradeLicenseActive,
                userType: response.Envelope.Body.LoginResponse.LoginResult.UserType
            };
        } else {
            return response.Envelope.Body.LoginResponse;
        	
        }*/
    } catch (e) {
        return {
            isSuccessful: false,
            reference: response
        };
    }
}

function enocLogin(userName) {
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:Login>\
       <!--Optional:-->\
       <xs:username>'+ userName +'</xs:username>\
       <!--Optional:-->\
       <xs:password></xs:password>\
    </xs:Login>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    
    try {
        MFP.Logger.warn(response);
        if (typeof(response.Envelope.Body.LoginResponse) == "undefined" || !response.Envelope.Body.LoginResponse.LoginResult) {
            return {
                isSuccessful: false,
                errorCode: 501,
                message: "An error has been occured in the server. Kindly try again",
                reference: response
            };
        }
        return response;
        
    }catch(e){
    	return {
            isSuccessful: false,
            reference: response
        }; 	
    }
}

function _validateUserName(encryptedUserName) {
    return com.proxymit.utils.EncryptionUtil.decrypt(encryptedUserName, privateKey);
}


function setCommentNoc(userName, nocReference, commentId, comment, listOfAttachments) {

    var attachmentsFields = "";
    if (listOfAttachments.length > 0) {
        for (i in listOfAttachments) {
            attachmentsFields += '<xs:DocumentDetails>\
	               <xs:ID>' + listOfAttachments[i].id + '</xs:ID>\
	               <xs:Name>' + listOfAttachments[i].name + '</xs:Name>\
	               <xs:Size>' + listOfAttachments[i].size + '</xs:Size>\
	               <xs:UploadedBy>123</xs:UploadedBy>\
	               <xs:DocumentType>1</xs:DocumentType>\
	               <xs:Data>' + listOfAttachments[i].data + '</xs:Data>\
	            </xs:DocumentDetails>';
        }
    }
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:SetCommentNOC>\
       <!--Optional:-->\
       <xs:userName>' + userName + '</xs:userName>\
       <xs:NOCReference>' + nocReference + '</xs:NOCReference>\
       <xs:commentID>' + commentId + '</xs:commentID>\
       <xs:comment>' + comment + '</xs:comment>\
       <xs:commentAttachments>\
          ' + attachmentsFields + '\
       </xs:commentAttachments>\
    </xs:SetCommentNOC>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.SetCommentNOCResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 363,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }
    return response.Envelope.Body.SetCommentNOCResponse;
}

function setNOCRevalidate(userName, nocReference, startDate, endDate) {

    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:SetNOCRevalidate>\
       <!--Optional:-->\
       <xs:username>' + userName + '</xs:username>\
       <xs:NOCReference>' + nocReference + '</xs:NOCReference>\
       <xs:StartDate>' + startDate + '</xs:StartDate>\
       <xs:EndDate>' + endDate + '</xs:EndDate>\
    </xs:SetNOCRevalidate>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.SetNOCRevalidateResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 364,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }
    return response.Envelope.Body.SetNOCRevalidateResponse;
}

function viewNOC(userName, nocReference) {

    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:ViewNOC>\
       <xs:Username>' + userName + '</xs:Username>\
       <xs:NOCReference>' + nocReference + '</xs:NOCReference>\
    </xs:ViewNOC>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
  
    MFP.Logger.warn(response);
   
    if (typeof(response.Envelope.Body.ViewNOCResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 365,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.ViewNOCResponse.ViewNOCResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.ViewNOCResponse.ViewNOCResult
        };
    } else {
        return response.Envelope.Body.ViewNOCResponse;
    }
}
function viewGuestNOC(nocReference) {
	var userName = "ViewNOCStatus_PROD_MOBAPP";
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:ViewNOC>\
       <xs:Username>' + userName + '</xs:Username>\
       <xs:NOCReference>' + nocReference + '</xs:NOCReference>\
    </xs:ViewNOC>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
  
   // MFP.Logger.warn(response);
  
    if (typeof(response.Envelope.Body.ViewNOCResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 365,
            message: "Please verify the ENOC reference and try again",
            reference: response
        };
    }

    if (response.Envelope.Body.ViewNOCResponse.ViewNOCResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.ViewNOCResponse.ViewNOCResult
        };
    } else {
        return response.Envelope.Body.ViewNOCResponse;
    }
}

function createNoc(userName, nocTypeId, projectCode, projectType, projectTypeId,
    projectName, projectDesc, projectStartDate, projectEndDate,
    projectClientName, contactName, contactEmail, contactMobile,
    contactLandLine, contactFax, contactTradeLicence, ownerName,
    ownerEmail, ownerMobile, ownerLandLine, ownerFax, workAreaId, parcelNo,
    officeLocation, officePhoneNo, suppDocType, surfaceConstructed,
    drilligTypeId, drilligTypeName, drilligLength, drilligDate,
    numberOfDrilling, drilligDepth, trenchId, trenchName, questions,
    finalDesigns, rejectedNocs, relatedNocs, coordinates, roads, communities,
    documents, surfaceDetails, nocReference) {


    var xmlDrillingDetails = '';
    if (drilligTypeId != '' && drilligTypeName != '' && drilligLength != '' && drilligDate != '' && numberOfDrilling != '' && drilligDepth != '') {
        xmlDrillingDetails += '<xs:DrillingDetails>\
        <!--Optional:-->\
        <xs:DrillingTypeID>' + drilligTypeId + '</xs:DrillingTypeID>\
        <!--Optional:-->\
        <xs:DrillingTypeName>' + drilligTypeName + '</xs:DrillingTypeName>\
        <!--Optional:-->\
        <xs:Length>' + drilligLength + '</xs:Length>\
        <!--Optional:-->\
        <xs:DrillingDate>' + drilligDate + '</xs:DrillingDate>\
        <!--Optional:-->\
        <xs:NumberOfDrillingThrust>' + numberOfDrilling + '</xs:NumberOfDrillingThrust>\
        <!--Optional:-->\
        <xs:Depth>' + drilligDepth + '</xs:Depth>\
     </xs:DrillingDetails>';
    }
    nocQuestions = _addQuestionnaire(questions);
    if (nocQuestions == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "nocQuestions error" + questions,
        };
    finalDesignNocs = _addFinalDesignNoc(finalDesigns);
    if (finalDesignNocs == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "finalDesignNocs error" + finalDesigns,
        };
    rejectedNocs = _addRjectedNoc(rejectedNocs);
    if (rejectedNocs == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "rejectedNocs error" + rejectedNocs,
        };
    relatedNocs = _addRelatedNoc(relatedNocs);
    if (relatedNocs == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "relatedNocs error" + relatedNocs,
        };
    coordinates = _addCordinates(coordinates);
    if (coordinates == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "coordinates error" + coordinates,
        };
    roads = Array.isArray(roads) && (roads.length > 0) ? _addRoads(roads) : '<xs:Roads/>';
    if (roads != '' && roads == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "roads error",
        };
    communities = Array.isArray(communities) && (communities.length > 0) ? _addCommunities(communities) : '<xs:Communities>\
		<xs:Community/>\
	</xs:Communities>';
    if (communities != '' && communities == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "communities error" + communities,
        };

    if (documents.length) {
        documents = _addDocuments(documents);
        if (documents == false)
            return {
                isSuccessful: false,
                errorCode: 366,
                message: "documents error" + documents,
            };
    } else {
        documents = "";
    }
    surfaceDetails = Array.isArray(surfaceDetails) && (surfaceDetails.length > 0) ? _addSurfaceDetails(surfaceDetails) : '';
    if (surfaceDetails != '' && surfaceDetails == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "surfaceDetails error" + surfaceDetails,
        };

    xmlNocReference = '';
    if (nocReference && nocReference != null && nocReference != '') {
        xmlNocReference += '<xs:NOCReferenceNo>' + nocReference + '</xs:NOCReferenceNo>';
    }

    var rq = '' + header + '\
	<soapenv:Body>\
    <xs:CreateNOC>\
       <xs:Username>' + userName + '</xs:Username>\
       <xs:newNOCData>\
          <xs:NOCTypeID>' + nocTypeId + '</xs:NOCTypeID>\
          <!--Optional:-->\
          <xs:Questionnaire>\
             <!--Zero or more repetitions:-->\
             ' + nocQuestions + '\
          </xs:Questionnaire>\
          <!--Optional:-->\
          <xs:ProjectDetails>\
             <!--Optional:-->\
             <xs:ProjectCode>' + projectCode + '</xs:ProjectCode>\
             <!--Optional:-->\
             <xs:ProjectType>' + projectType + '</xs:ProjectType>\
             <xs:ProjectTypeID>' + projectTypeId + '</xs:ProjectTypeID>\
             <!--Optional:-->\
             <xs:ProjectName>' + _escapeHtml(projectName) + '</xs:ProjectName>\
             <!--Optional:-->\
             <xs:Description>' + _escapeHtml(projectDesc) + '</xs:Description>\
             <xs:StartDate>' + projectStartDate + '</xs:StartDate>\
             <xs:EndDate>' + projectEndDate + '</xs:EndDate>\
             <!--Optional:-->\
             <xs:ClientName>' + _escapeHtml(projectClientName) + '</xs:ClientName>\
             <!--Optional:-->\
             <xs:FinalDesignNOCs>\
                <!--Zero or more repetitions:-->\
                ' + finalDesignNocs + '\
             </xs:FinalDesignNOCs>\
             <!--Optional:-->\
             <xs:RejectedNOC>\
                <!--Zero or more repetitions:-->\
                ' + rejectedNocs + '\
             </xs:RejectedNOC>\
             <!--Optional:-->\
             <xs:RelatedNOCs>\
                <!--Zero or more repetitions:-->\
                ' + relatedNocs + '\
             </xs:RelatedNOCs>\
          </xs:ProjectDetails>\
          <!--Optional:-->\
          <xs:ContactDetails>\
             <!--Optional:-->\
             <xs:Name>' + _escapeHtml(contactName) + '</xs:Name>\
             <!--Optional:-->\
             <xs:Email>' + _escapeHtml(contactEmail) + '</xs:Email>\
             <!--Optional:-->\
             <xs:Mobile>' + contactMobile + '</xs:Mobile>\
             <!--Optional:-->\
             <xs:Landline>' + contactLandLine + '</xs:Landline>\
             <!--Optional:-->\
             <xs:Fax>' + contactFax + '</xs:Fax>\
             <!--Optional:-->\
             <xs:TradeLicense>' + contactTradeLicence + '</xs:TradeLicense>\
             <!--Optional:-->\
             <xs:OwnerDetails>\
                <!--Optional:-->\
                <xs:Name>' + _escapeHtml(ownerName) + '</xs:Name>\
                <!--Optional:-->\
                <xs:Email>' + _escapeHtml(ownerEmail) + '</xs:Email>\
                <!--Optional:-->\
                <xs:Mobile>' + ownerMobile + '</xs:Mobile>\
                <!--Optional:-->\
                <xs:Landline>' + ownerLandLine + '</xs:Landline>\
                <!--Optional:-->\
                <xs:Fax>' + ownerFax + '</xs:Fax>\
             </xs:OwnerDetails>\
          </xs:ContactDetails>\
          <!--Optional:-->\
          <xs:WorkLocation>\
             <!--Optional:-->\
             <xs:Coordinates>\
                <!--Zero or more repetitions:-->\
                ' + coordinates + '\
             </xs:Coordinates>\
             <!--Optional:-->\
             ' + roads + '\
             <!--Optional:-->\
             ' + communities + '\
             <!--Optional:-->\
             <xs:WorkAreaID>' + workAreaId + '</xs:WorkAreaID>\
             <!--Optional:-->\
             <xs:ParcelNumber>' + parcelNo + '</xs:ParcelNumber>\
             <!--Optional:-->\
             <xs:SiteOfficeLocation>' + officeLocation + '</xs:SiteOfficeLocation>\
             <!--Optional:-->\
             <xs:SiteOfficePhoneNumber>' + officePhoneNo + '</xs:SiteOfficePhoneNumber>\
          </xs:WorkLocation>\
          <xs:SupportingDocumentsType>' + suppDocType + '</xs:SupportingDocumentsType>\
          <!--Optional:-->\
             <!--Zero or more repetitions:-->\
             ' + documents + '\
          <!--Optional:-->\
          <xs:TechnicalInfo>\
             <!--Optional:-->\
             <xs:SurfaceDetails>\
                <!--Zero or more repetitions:-->\
                ' + surfaceDetails + '\
             </xs:SurfaceDetails>\
             <!--Optional:-->\
             <xs:SurfaceToBeConstructed>' + surfaceConstructed + '</xs:SurfaceToBeConstructed>\
             <!--Optional:-->\
			' + xmlDrillingDetails + '\
             <!--Optional:-->\
             <xs:TrenchType>\
                <xs:ID>' + trenchId + '</xs:ID>\
                <!--Optional:-->\
                <xs:Name>' + _escapeHtml(trenchName) + '</xs:Name>\
             </xs:TrenchType>\
          </xs:TechnicalInfo>\
			' + xmlNocReference + '\
       </xs:newNOCData>\
    </xs:CreateNOC>\
 </soapenv:Body>\
</soapenv:Envelope>';
    //	rq = _unescapeXml(rq);
    rq = rq.replace(new RegExp("& ", 'g'), "&amp; ");
    rq = rq.replace(new RegExp(" < ", 'g'), " &lt; ");
    rq = rq.replace(new RegExp(" > ", 'g'), " &gt; ");
    MFP.Logger.warn(rq);

    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    if (typeof(response.Envelope.Body.CreateNOCResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 359,
            message: "An error has been occured in the server. Kindly try again",
            reference: response,
            request:rq.toString()
        };
    }
    return {
        isSuccessful: true,
        result: response.Envelope.Body.CreateNOCResponse,
        
    };
}

function _addQuestionnaire(inputData) {
    var questionnaire = '';
    try {
        for (i in inputData) {
            questionnaire += '<xs:NOCQuestion>\
			    <xs:QuestionID>' + inputData[i].questionId + '</xs:QuestionID>\
			    <xs:Response>' + _escapeHtml(inputData[i].response) + '</xs:Response>\
			    </xs:NOCQuestion>';
        }
    } catch (e) {
        return false;
    }
    return questionnaire;
}

function _addFinalDesignNoc(inputData) {
    var finalDesignNoc = '';
    try {
        for (i in inputData) {
            finalDesignNoc += '<xs:string>' + inputData[i] + '</xs:string>';
        }
    } catch (e) {
        return false;
    }
    return finalDesignNoc;
}

function _addRjectedNoc(inputData) {
    var rejectedNoc = '';
    try {
        for (i in inputData) {
            rejectedNoc += '<xs:string>' + _escapeHtml(inputData[i]) + '</xs:string>';
        }
    } catch (e) {
        return false;
    }
    return rejectedNoc;
}

function _addRelatedNoc(inputData) {
    var relatedNoc = '';
    try {
        for (i in inputData) {
            relatedNoc += '<xs:string>' + _escapeHtml(inputData[i]) + '</xs:string>';
        }
    } catch (e) {
        return false;
    }
    return relatedNoc;
}

function _addCordinates(inputData) {
    var coordinates = '';
    try {
        for (i in inputData) {
            coordinates += '<xs:Coordinate>\
			    <xs:X>' + inputData[i].x + '</xs:X>\
			    <xs:Y>' + inputData[i].y + '</xs:Y>\
			 </xs:Coordinate>';
        }
    } catch (e) {
        return false;
    }
    return coordinates;
}

function _addRoads(inputData) {
    var roads = '';
    try {
        for (i in inputData) {
            roads += '<xs:Roads>\
				<xs:Road>\
				    <xs:ID>' + inputData[i].id + '</xs:ID>\
				    <!--Optional:-->\
				    <xs:Number>' + inputData[i].number + '</xs:Number>\
				    <!--Optional:-->\
				    <xs:Name>' + _escapeHtml(inputData[i].name) + '</xs:Name>\
			    </xs:Road>\
				    </xs:Roads>';
        }
    } catch (e) {
        return false;
    }
    return roads;
}

function _addCommunities(inputData) {
    var communities = '';
    try {
        for (i in inputData) {
            communities += '<xs:Communities>\
				<xs:Community>\
			    <xs:ID>' + inputData[i].id + '</xs:ID>\
			    <!--Optional:-->\
			    <xs:Name>' + _escapeHtml(inputData[i].name) + '</xs:Name>\
			    </xs:Community>\
			    </xs:Communities>';
        }
    } catch (e) {
        return false;
    }
    return communities;
}

function _addDocuments(inputData) {
    var documents = '<xs:Documents>';
    try {
        for (i in inputData) {
            documents += '<xs:DocumentDetails>\
			     <xs:ID>' + inputData[i].id + '</xs:ID>\
			     <!--Optional:-->\
			     <xs:Name>' + _escapeHtml(inputData[i].name) + '</xs:Name>\
			     <xs:Size>' + inputData[i].size + '</xs:Size>\
			     <xs:UploadedBy>123</xs:UploadedBy>\
			     <xs:DocumentType>' + inputData[i].documentType + '</xs:DocumentType>\
			     <!--Optional:-->\
			     <xs:Data>' + inputData[i].data + '</xs:Data>\
			  </xs:DocumentDetails>';
        }
        documents += '</xs:Documents>';
    } catch (e) {
        return false;
    }
    return documents;
}

function _addSurfaceDetails(inputData) {
    var surfaceDetails = '';
    try {
        for (i in inputData) {
            surfaceDetails += '<xs:SurfaceDetailsType>\
			    <xs:SurfaceTypeID>' + inputData[i].surfaceTypeId + '</xs:SurfaceTypeID>\
			    <!--Optional:-->\
			    <xs:SurfaceType>' + inputData[i].surfaceType + '</xs:SurfaceType>\
			    <xs:Length>' + inputData[i].length + '</xs:Length>\
			    <xs:Width>' + inputData[i].width + '</xs:Width>\
			    <xs:Depth>' + inputData[i].depth + '</xs:Depth>\
			    <xs:Area>' + inputData[i].area + '</xs:Area>\
			    <xs:ReinstatementByID>' + inputData[i].reinsId + '</xs:ReinstatementByID>\
			    <!--Optional:-->\
			    <xs:ReinstatementByName>' + _escapeHtml(inputData[i].reinsName) + '</xs:ReinstatementByName>\
			    <xs:PaymentByID>' + inputData[i].paymentId + '</xs:PaymentByID>\
			    <!--Optional:-->\
			    <xs:PaymentByName>' + _escapeHtml(inputData[i].paymentName) + '</xs:PaymentByName>\
			    <!--Optional:-->\
			    <xs:OtherRemarks>' + _escapeHtml(inputData[i].otherRemarks) + '</xs:OtherRemarks>\
			    <!--Optional:-->\
			    <xs:OtherDetails>' + _escapeHtml(inputData[i].otherDetails) + '</xs:OtherDetails>\
			 </xs:SurfaceDetailsType>';
        }
    } catch (e) {
        return false;
    }
    return surfaceDetails;
}

function getAllRoads() {
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetAllRoads/>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetAllRoadsResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 367,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetAllRoadsResponse.GetAllRoadsResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetAllRoadsResponse.GetAllRoadsResult
        };
    } else {
        return response.Envelope.Body.GetAllRoadsResponse;
    }
}

function getAllUserClients() {
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetAllUserClients/>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetAllUserClientsResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 368,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetAllUserClientsResponse.GetAllUserClientsResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetAllUserClientsResponse.GetAllUserClientsResult
        };
    } else {
        return response.Envelope.Body.GetAllUserClientsResponse;
    }
}

function getAllCommunities() {
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetAllCommunities/>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetAllCommunitiesResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 369,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetAllCommunitiesResponse.GetAllCommunitiesResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetAllCommunitiesResponse.GetAllCommunitiesResult
        };
    } else {
        return response.Envelope.Body.GetAllCommunitiesResponse;
    }
}

function saveTemporaryNOC(userName, nocTypeId, projectCode, projectType, projectTypeId,
    projectName, projectDesc, projectStartDate, projectEndDate,
    projectClientName, contactName, contactEmail, contactMobile,
    contactLandLine, contactFax, contactTradeLicence, ownerName,
    ownerEmail, ownerMobile, ownerLandLine, ownerFax, workAreaId, parcelNo,
    officeLocation, officePhoneNo, suppDocType, surfaceConstructed,
    drilligTypeId, drilligTypeName, drilligLength, drilligDate,
    numberOfDrilling, drilligDepth, trenchId, trenchName, questions,
    finalDesigns, rejectedNocs, relatedNocs, coordinates, roads, communities,
    documents, surfaceDetails, nocReference) {

    
    var xmlDrillingDetails = '';
    if (drilligTypeId != '' && drilligTypeName != '' && drilligLength != '' && drilligDate != '' && numberOfDrilling != '' && drilligDepth != '') {
        xmlDrillingDetails += '<xs:DrillingDetails>\
        <!--Optional:-->\
        <xs:DrillingTypeID>' + drilligTypeId + '</xs:DrillingTypeID>\
        <!--Optional:-->\
        <xs:DrillingTypeName>' + drilligTypeName + '</xs:DrillingTypeName>\
        <!--Optional:-->\
        <xs:Length>' + drilligLength + '</xs:Length>\
        <!--Optional:-->\
        <xs:DrillingDate>' + drilligDate + '</xs:DrillingDate>\
        <!--Optional:-->\
        <xs:NumberOfDrillingThrust>' + numberOfDrilling + '</xs:NumberOfDrillingThrust>\
        <!--Optional:-->\
        <xs:Depth>' + drilligDepth + '</xs:Depth>\
     </xs:DrillingDetails>';
    }
    nocQuestions = _addQuestionnaire(questions);
    if (nocQuestions == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "nocQuestions error" + questions,
        };
    finalDesignNocs = _addFinalDesignNoc(finalDesigns);
    if (finalDesignNocs == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "finalDesignNocs error" + finalDesigns,
        };
    rejectedNocs = _addRjectedNoc(rejectedNocs);
    if (rejectedNocs == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "rejectedNocs error" + rejectedNocs,
        };
    relatedNocs = _addRelatedNoc(relatedNocs);
    if (relatedNocs == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "relatedNocs error" + relatedNocs,
        };
    coordinates = _addCordinates(coordinates);
    if (coordinates == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "coordinates error" + coordinates,
        };
    roads = Array.isArray(roads) && (roads.length > 0) ? _addRoads(roads) : '<xs:Roads/>';
    if (roads != '' && roads == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "roads error",
        };
    communities = Array.isArray(communities) && (communities.length > 0) ? _addCommunities(communities) : '<xs:Communities>\
		<xs:Community/>\
	</xs:Communities>';
    if (communities != '' && communities == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "communities error" + communities,
        };
    if (documents.length) {
        documents = _addDocuments(documents);
        if (documents == false)
            return {
                isSuccessful: false,
                errorCode: 366,
                message: "documents error" + documents,
            };
    } else {
        documents = "";
    }
    surfaceDetails = Array.isArray(surfaceDetails) && (surfaceDetails.length > 0) ? _addSurfaceDetails(surfaceDetails) : '';
    if (surfaceDetails != '' && surfaceDetails == false)
        return {
            isSuccessful: false,
            errorCode: 366,
            message: "surfaceDetails error" + surfaceDetails,
        };

    xmlNocReference = '';
    if (nocReference && nocReference != null && nocReference != '') {
        xmlNocReference += '<xs:NOCReferenceNo>' + nocReference + '</xs:NOCReferenceNo>';
    }

    var rq = '' + header + '\
	<soapenv:Body>\
    <xs:SaveTemporaryNOC>\
       <xs:Username>' + userName + '</xs:Username>\
       <xs:newNOCData>\
          <xs:NOCTypeID>' + nocTypeId + '</xs:NOCTypeID>\
          <!--Optional:-->\
          <xs:Questionnaire>\
             <!--Zero or more repetitions:-->\
             ' + nocQuestions + '\
          </xs:Questionnaire>\
          <!--Optional:-->\
          <xs:ProjectDetails>\
             <!--Optional:-->\
             <xs:ProjectCode>' + projectCode + '</xs:ProjectCode>\
             <!--Optional:-->\
             <xs:ProjectType>' + projectType + '</xs:ProjectType>\
             <xs:ProjectTypeID>' + projectTypeId + '</xs:ProjectTypeID>\
             <!--Optional:-->\
             <xs:ProjectName>' + _escapeHtml(projectName) + '</xs:ProjectName>\
             <!--Optional:-->\
             <xs:Description>' + _escapeHtml(projectDesc) + '</xs:Description>\
             <xs:StartDate>' + projectStartDate + '</xs:StartDate>\
             <xs:EndDate>' + projectEndDate + '</xs:EndDate>\
             <!--Optional:-->\
             <xs:ClientName>' + _escapeHtml(projectClientName) + '</xs:ClientName>\
             <!--Optional:-->\
             <xs:FinalDesignNOCs>\
                <!--Zero or more repetitions:-->\
                ' + finalDesignNocs + '\
             </xs:FinalDesignNOCs>\
             <!--Optional:-->\
             <xs:RejectedNOC>\
                <!--Zero or more repetitions:-->\
                ' + rejectedNocs + '\
             </xs:RejectedNOC>\
             <!--Optional:-->\
             <xs:RelatedNOCs>\
                <!--Zero or more repetitions:-->\
                ' + relatedNocs + '\
             </xs:RelatedNOCs>\
          </xs:ProjectDetails>\
          <!--Optional:-->\
          <xs:ContactDetails>\
             <!--Optional:-->\
             <xs:Name>' + _escapeHtml(contactName) + '</xs:Name>\
             <!--Optional:-->\
             <xs:Email>' + _escapeHtml(contactEmail) + '</xs:Email>\
             <!--Optional:-->\
             <xs:Mobile>' + contactMobile + '</xs:Mobile>\
             <!--Optional:-->\
             <xs:Landline>' + contactLandLine + '</xs:Landline>\
             <!--Optional:-->\
             <xs:Fax>' + contactFax + '</xs:Fax>\
             <!--Optional:-->\
             <xs:TradeLicense>' + contactTradeLicence + '</xs:TradeLicense>\
             <!--Optional:-->\
             <xs:OwnerDetails>\
                <!--Optional:-->\
                <xs:Name>' + _escapeHtml(ownerName) + '</xs:Name>\
                <!--Optional:-->\
                <xs:Email>' + _escapeHtml(ownerEmail) + '</xs:Email>\
                <!--Optional:-->\
                <xs:Mobile>' + ownerMobile + '</xs:Mobile>\
                <!--Optional:-->\
                <xs:Landline>' + ownerLandLine + '</xs:Landline>\
                <!--Optional:-->\
                <xs:Fax>' + ownerFax + '</xs:Fax>\
             </xs:OwnerDetails>\
          </xs:ContactDetails>\
          <!--Optional:-->\
          <xs:WorkLocation>\
             <!--Optional:-->\
             <xs:Coordinates>\
                <!--Zero or more repetitions:-->\
                ' + coordinates + '\
             </xs:Coordinates>\
             <!--Optional:-->\
             ' + roads + '\
             <!--Optional:-->\
             ' + communities + '\
             <!--Optional:-->\
             <xs:WorkAreaID>' + workAreaId + '</xs:WorkAreaID>\
             <!--Optional:-->\
             <xs:ParcelNumber>' + parcelNo + '</xs:ParcelNumber>\
             <!--Optional:-->\
             <xs:SiteOfficeLocation>' + officeLocation + '</xs:SiteOfficeLocation>\
             <!--Optional:-->\
             <xs:SiteOfficePhoneNumber>' + officePhoneNo + '</xs:SiteOfficePhoneNumber>\
          </xs:WorkLocation>\
          <xs:SupportingDocumentsType>' + suppDocType + '</xs:SupportingDocumentsType>\
          <!--Optional:-->\
             <!--Zero or more repetitions:-->\
             ' + documents + '\
          <!--Optional:-->\
          <xs:TechnicalInfo>\
             <!--Optional:-->\
             <xs:SurfaceDetails>\
                <!--Zero or more repetitions:-->\
                ' + surfaceDetails + '\
             </xs:SurfaceDetails>\
             <!--Optional:-->\
             <xs:SurfaceToBeConstructed>' + surfaceConstructed + '</xs:SurfaceToBeConstructed>\
             <!--Optional:-->\
			' + xmlDrillingDetails + '\
             <!--Optional:-->\
             <xs:TrenchType>\
                <xs:ID>' + trenchId + '</xs:ID>\
                <!--Optional:-->\
                <xs:Name>' + _escapeHtml(trenchName) + '</xs:Name>\
             </xs:TrenchType>\
          </xs:TechnicalInfo>\
			' + xmlNocReference + '\
       </xs:newNOCData>\
    </xs:SaveTemporaryNOC>\
 </soapenv:Body>\
</soapenv:Envelope>';
    //	rq = _unescapeXml(rq);
    rq = rq.replace(new RegExp("& ", 'g'), "&amp; ");
    MFP.Logger.warn(rq);

    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    if (typeof(response.Envelope.Body.SaveTemporaryNOCResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 359,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }
    return {
        isSuccessful: true,
        result: response.Envelope.Body.SaveTemporaryNOCResponse
    };
}

function getWorkLocationCoords(userName, nocReference) {

    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:GetWorkLocationCoords>\
       <!--Optional:-->\
       <xs:userName>' + userName + '</xs:userName>\
       <!--Optional:-->\
       <xs:NOCReference>' + nocReference + '</xs:NOCReference>\
    </xs:GetWorkLocationCoords>\
	</soapenv:Body>\
	</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    MFP.Logger.warn(response);
    if (typeof(response.Envelope.Body.GetWorkLocationCoordsResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 365,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    if (response.Envelope.Body.GetWorkLocationCoordsResponse.GetWorkLocationCoordsResult != undefined) {
        return {
            isSuccessful: true,
            result: response.Envelope.Body.GetWorkLocationCoordsResponse.GetWorkLocationCoordsResult
        };
    } else {
        return response.Envelope.Body.GetWorkLocationCoordsResponse;
    }
}

function deleteAttachments(userName, nocReference, arrayofDocumentIds) {


    try {
        xmldocumentIds = '';
        for (i in arrayofDocumentIds) {
            xmldocumentIds += '<xs:int>' + arrayofDocumentIds[i] + '</xs:int>';
        }
    } catch (e) {
        return {
            isSuccessful: false,
            errorCode: 371,
            message: "documents error " + e,
        };
    }
    var rq = '' + header + '\
	   <soapenv:Body>\
    <xs:DeleteAttachments>\
       <!--Optional:-->\
       <xs:userName>' + userName + '</xs:userName>\
       <!--Optional:-->\
       <xs:NOCReference>' + nocReference + '</xs:NOCReference>\
       <!--Optional:-->\
       <xs:documentIDs>\
			' + xmldocumentIds + '\
       </xs:documentIDs>\
    </xs:DeleteAttachments>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    if (typeof(response.Envelope.Body.DeleteAttachmentsResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 371,
            message: "An error has occured in the server. Kindly try again",
            reference: response
        };
    }

    return response.Envelope.Body.DeleteAttachmentsResponse;
}

function _getExtension(filename) {
    try {
        var extension = filename.substring(filename.lastIndexOf(".") + 1);
        return extension;
    } catch (e) {
        return filename;
    }
    return filename;
}

function _unescapeXml(xmlText) {
    return xmlText.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(
        /&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
}

function _escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatDate(d) {
    var day = d.getDate();
    var month = d.getMonth() + 1;
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return day + '/' + month + '/' + d.getFullYear();
}

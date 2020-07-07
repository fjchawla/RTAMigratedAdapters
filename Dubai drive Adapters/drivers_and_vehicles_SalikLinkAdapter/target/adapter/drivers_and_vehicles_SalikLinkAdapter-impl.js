/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *  Created By Ahmed Raouf 25-July-2018
 */
var _userName = "%#credentials!#!username_tibco#%";
var _password = "%#credentials!#!password_tibco#%";
var adapterName = "drivers_and_vehicles_SalikLinkAdapter";
var IsDebugging;
var soapEnvStart = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/schemas/LinkDelinkSalikAccount/Schema.xsd">';
var soapEnvEnd = '</soapenv:Envelope>';
var soapHeader = '<soapenv:Header>' +
    '<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse=" http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd " xmlns=" http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<wsse:UsernameToken>' +
    '<wsse:Username>' + _userName + '</wsse:Username>' +
    '<wsse:Password>' + _password + '</wsse:Password>' +
    '</wsse:UsernameToken>' +
    '</wsse:Security>' +
    '</soapenv:Header>';
var validationError = {
    "errorCode": "-1",
    "errorMessage": "missing or invalid params! please check mandatory [Params]."
};

function notValid(string) {
    return (!string || string == undefined || string == "" || string.length == 0);
}

function uniqueNumber() {
    var date = Date.now();

    if (date <= uniqueNumber.previous) {
        date = ++uniqueNumber.previous;
    } else {
        uniqueNumber.previous = date;
    }

    return date;
}

uniqueNumber.previous = 0;

function referenceNumber() {
    return uniqueNumber() + '' + Math.floor(Math.random()*(999-100+1)+100);
}

function formateDate(timestamp) {

    var date = (notValid(timestamp)) ? new Date() : new Date(timestamp);
    return ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
}

function Log(text) {

    MFP.Logger.warn(text);


    try {
        IsDebugging = MFP.Server.getPropertyValue("drivers_and_vehicles_is_debugging");
    } catch (e) {
        IsDebugging = "false";
    }
    if (IsDebugging == "true")
        MFP.Logger.warn(text);
    else
        MFP.Logger.debug(text);
}

function invokeWebServiceString(request, servicePath, SOAPAction, isEncryptResponse, encryptionPassword) {

    var refNum = referenceNumber();
    var _webServiceResult;
    var webServiceResult;
    var responseString;

    //log request 
    _logRequestResponse(refNum, adapterName, SOAPAction, request, null, true);

    //do request
    var input = {
        method: 'post',
        headers: {
            "SOAPAction": SOAPAction
        },
        returnedContentType: 'xml',
        path: servicePath,
        body: {
            content: JSON.parse(request),
            contentType: 'text/xml; charset=utf-8'
        }
    };

    _webServiceResult = MFP.Server.invokeHttp(input);

    //delete credientails
    var invocationData = {
        adapter: 'drivers_and_vehciles_utilitiesAdapter',
        procedure: 'deleteCredientails',
        parameters: [_webServiceResult]
    };

    webServiceResult = MFP.Server.invokeProcedure(invocationData);
    responseString = JSON.stringify(webServiceResult);

    //encrypt response
    if (isEncryptResponse != undefined && isEncryptResponse == true) {

        var invocationData = {
            adapter: 'drivers_and_vehciles_utilitiesAdapter',
            procedure: 'encryptData',
            parameters: [responseString, encryptionPassword]
        };
        webServiceResult = MFP.Server.invokeProcedure(invocationData);
    }

    //log response
    _logRequestResponse(refNum, adapterName, SOAPAction, null, responseString, true);

    return webServiceResult;
}

function buildBody(parameters, isStatic) {
    var request = "";
    if (isStatic == true) {
        request = MFP.Server.invokeProcedure({
            adapter: 'drivers_and_vehciles_utilitiesAdapter',
            procedure: 'buildBodyFromStaticRequest',
            parameters: parameters,

        });
    } else {
        request = MFP.Server.invokeProcedure({
            adapter: 'drivers_and_vehciles_utilitiesAdapter',
            procedure: 'buildBody',
            parameters: parameters
        });
    }
    return request.body;
}

function linkSalikByPlate(requestParams, isEncryptResponse, encryptionPassword) {
    /* var requestParams = {
     	"RtaUserId":"",
     	"RtaCompleteMobileNumber":"",
     	"RtaMobileVerificationTime":"",
     	"PlateCountryCode":"",
     	"PlateSourceId":"",
     	"PlateCategoryId":"",
     	"PlateNumber":"",
     	"PlateColorId":"",
     	"SalikDefaultMobileCountryCode":"",
     	"SalikDefaultMobileNumber":""
     }*/

    if (notValid(requestParams.RtaUserId) || notValid(requestParams.RtaCompleteMobileNumber) || notValid(requestParams.RtaMobileVerificationTime) || notValid(requestParams.PlateCountryCode) || notValid(requestParams.PlateSourceId) || notValid(requestParams.PlateCategoryId) || notValid(requestParams.PlateNumber) || notValid(requestParams.SalikDefaultMobileCountryCode) || notValid(requestParams.SalikDefaultMobileNumber)) {
        return validationError;
    } else {
        var request = soapEnvStart + soapHeader +
            '<soapenv:Body>' +
            '<sch:LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest>' +
            '<sch:RtaUserId>' + requestParams.RtaUserId + '</sch:RtaUserId>' +
            '<sch:RtaCompleteMobileNumber>' + requestParams.RtaCompleteMobileNumber + '</sch:RtaCompleteMobileNumber>' +
            '<sch:RtaMobileVerificationTime>' + requestParams.RtaMobileVerificationTime + '</sch:RtaMobileVerificationTime>' +
            '<!--Optional:-->' +
            '<sch:PlateDetails>' +
            '<sch:PlateCountryCode>' + requestParams.PlateCountryCode + '</sch:PlateCountryCode>' +
            '<sch:PlateSourceId>' + requestParams.PlateSourceId + '</sch:PlateSourceId>' +
            '<sch:PlateCategoryId>' + requestParams.PlateCategoryId + '</sch:PlateCategoryId>' +
            '<sch:PlateNumber>' + requestParams.PlateNumber + '</sch:PlateNumber>' +
            '<!--Optional:-->' +
            '<sch:PlateColorId>' + requestParams.PlateColorId + '</sch:PlateColorId>' +
            '</sch:PlateDetails>' +
            '<sch:SalikDefaultMobileCountryCode>' + requestParams.SalikDefaultMobileCountryCode + '</sch:SalikDefaultMobileCountryCode>' +
            '<sch:SalikDefaultMobileNumber>' + requestParams.SalikDefaultMobileNumber + '</sch:SalikDefaultMobileNumber>' +
            '<sch:AppId>SALIK</sch:AppId>' +
            '</sch:LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest>' +
            '</soapenv:Body>' +
            soapEnvEnd;

        var servicePath = '/linkDelinkSalikAccount';
        var SOAPAction = 'LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest';
        var requestObj = buildBody([request], true);

        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    }

}

function linkSalikByPlateOTP(requestParams, isEncryptResponse, encryptionPassword) {
    /*var requestParams = {
    		"RtaUserId":"",
    		"RtaCompleteMobileNumber":"",
    		"RtaMobileVerificationTime":"",
    		"PlateCountryCode":"",
    		"PlateSourceId":"",
    		"PlateCategoryId":"",
    		"PlateNumber":"",
    		"PlateColorId":"",
    		"SalikDefaultMobileCountryCode":"",
    		"SalikDefaultMobileNumber":"",
    		"OtpGuid":"",
    		"OtpCode":""
    };*/
    if (notValid(requestParams.RtaUserId) || notValid(requestParams.RtaCompleteMobileNumber) || notValid(requestParams.RtaMobileVerificationTime) || notValid(requestParams.PlateCountryCode) || notValid(requestParams.PlateSourceId) || notValid(requestParams.PlateCategoryId) || notValid(requestParams.PlateNumber) || notValid(requestParams.SalikDefaultMobileCountryCode) || notValid(requestParams.SalikDefaultMobileNumber) || notValid(requestParams.OtpGuid) || notValid(requestParams.OtpCode)) {
        return validationError;
    } else {
        var request = soapEnvStart + soapHeader +
            '<soapenv:Body>' +
            '<sch:LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest>' +
            '<sch:RtaUserId>' + requestParams.RtaUserId + '</sch:RtaUserId>' +
            '<sch:RtaCompleteMobileNumber>' + requestParams.RtaCompleteMobileNumber + '</sch:RtaCompleteMobileNumber>' +
            '<sch:RtaMobileVerificationTime>' + requestParams.RtaMobileVerificationTime + '</sch:RtaMobileVerificationTime>' +
            '<!--Optional:-->' +
            '<sch:PlateDetails>' +
            '<sch:PlateCountryCode>' + requestParams.PlateCountryCode + '</sch:PlateCountryCode>' +
            '<sch:PlateSourceId>' + requestParams.PlateSourceId + '</sch:PlateSourceId>' +
            '<sch:PlateCategoryId>' + requestParams.PlateCategoryId + '</sch:PlateCategoryId>' +
            '<sch:PlateNumber>' + requestParams.PlateNumber + '</sch:PlateNumber>' +
            '<!--Optional:-->' +
            '<sch:PlateColorId>' + requestParams.PlateColorId + '</sch:PlateColorId>' +
            '</sch:PlateDetails>' +
            '<sch:SalikDefaultMobileCountryCode>' + requestParams.SalikDefaultMobileCountryCode + '</sch:SalikDefaultMobileCountryCode>' +
            '<sch:SalikDefaultMobileNumber>' + requestParams.SalikDefaultMobileNumber + '</sch:SalikDefaultMobileNumber>' +
            '<!--Optional:-->' +
            '<sch:OtpGuid>' + requestParams.OtpGuid + '</sch:OtpGuid>' +
            '<!--Optional:-->' +
            '<sch:OtpCode>' + requestParams.OtpCode + '</sch:OtpCode>' +
            '<sch:AppId>SALIK</sch:AppId>' +
            '</sch:LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest>' +
            '</soapenv:Body>' +
            soapEnvEnd;

        var servicePath = '/linkDelinkSalikAccount';
        var SOAPAction = 'LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest';
        var requestObj = buildBody([request], true);

        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    }

}

function linkSalikByAccount(requestParams, isEncryptResponse, encryptionPassword) {
    /* var requestParams = {
        	"RtaUserId":"",
        	"RtaCompleteMobileNumber":"",
        	"RtaMobileVerificationTime":"",
        	"AccountID":"",
        	"SalikDefaultMobileCountryCode":"",
        	"SalikDefaultMobileNumber":""
        };*/
    if (notValid(requestParams.RtaUserId) || notValid(requestParams.RtaCompleteMobileNumber) || notValid(requestParams.RtaMobileVerificationTime) || notValid(requestParams.AccountID) || notValid(requestParams.SalikDefaultMobileCountryCode) || notValid(requestParams.SalikDefaultMobileNumber)) {
        return validationError;
    } else {
        var request = soapEnvStart + soapHeader +
            '<soapenv:Body>' +
            '<sch:LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest>' +
            '<sch:RtaUserId>' + requestParams.RtaUserId + '</sch:RtaUserId>' +
            '<sch:RtaCompleteMobileNumber>' + requestParams.RtaCompleteMobileNumber + '</sch:RtaCompleteMobileNumber>' +
            '<sch:RtaMobileVerificationTime>' + requestParams.RtaMobileVerificationTime + '</sch:RtaMobileVerificationTime>' +
            '<!--Optional:-->' +
            '<sch:AccountID>' + requestParams.AccountID + '</sch:AccountID>' +
            '<sch:SalikDefaultMobileCountryCode>' + requestParams.SalikDefaultMobileCountryCode + '</sch:SalikDefaultMobileCountryCode>' +
            '<sch:SalikDefaultMobileNumber>' + requestParams.SalikDefaultMobileNumber + '</sch:SalikDefaultMobileNumber>' +
            '<sch:AppId>SALIK</sch:AppId>' +
            '</sch:LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest>' +
            '</soapenv:Body>' +
            soapEnvEnd;

        var servicePath = '/linkDelinkSalikAccount';
        var SOAPAction = 'LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest';
        var requestObj = buildBody([request], true);

        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    }


}

function linkSalikByAccountOTP(requestParams, isEncryptResponse, encryptionPassword) {
    /*var requestParams = {
       	"RtaUserId":"",
       	"RtaCompleteMobileNumber":"",
       	"RtaMobileVerificationTime":"",
       	"AccountID":"",
       	"SalikDefaultMobileCountryCode":"",
       	"SalikDefaultMobileNumber":"",
       	"OtpGuid":"",
       	"OtpCode":"",
       };*/
    if (notValid(requestParams.RtaUserId) || notValid(requestParams.RtaCompleteMobileNumber) || notValid(requestParams.RtaMobileVerificationTime) || notValid(requestParams.SalikDefaultMobileCountryCode) || notValid(requestParams.SalikDefaultMobileNumber) || notValid(requestParams.AccountID) || notValid(requestParams.OtpGuid) || notValid(requestParams.OtpCode)) {
        return validationError;
    } else {
        var request = soapEnvStart + soapHeader +
            '<soapenv:Body>' +
            '<sch:LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest>' +
            '<sch:RtaUserId>' + requestParams.RtaUserId + '</sch:RtaUserId>' +
            '<sch:RtaCompleteMobileNumber>' + requestParams.RtaCompleteMobileNumber + '</sch:RtaCompleteMobileNumber>' +
            '<sch:RtaMobileVerificationTime>' + requestParams.RtaMobileVerificationTime + '</sch:RtaMobileVerificationTime>' +
            '<!--Optional:-->' +
            '<sch:AccountID>' + requestParams.AccountID + '</sch:AccountID>' +
            '<sch:SalikDefaultMobileCountryCode>' + requestParams.SalikDefaultMobileCountryCode + '</sch:SalikDefaultMobileCountryCode>' +
            '<sch:SalikDefaultMobileNumber>' + requestParams.SalikDefaultMobileNumber + '</sch:SalikDefaultMobileNumber>' +
            '<!--Optional:-->' +
            '<sch:OtpGuid>' + requestParams.OtpGuid + '</sch:OtpGuid>' +
            '<!--Optional:-->' +
            '<sch:OtpCode>' + requestParams.OtpCode + '</sch:OtpCode>' +
            '<sch:AppId>SALIK</sch:AppId>' +
            '</sch:LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest>' +
            '</soapenv:Body>' +
            soapEnvEnd;

        var servicePath = '/linkDelinkSalikAccount';
        var SOAPAction = 'LinkSalikAccountByUsingPlateNumberAndMobileNumberRequest';
        var requestObj = buildBody([request], true);

        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);

    }

}

function deLinkSalikAccount(requestParams, isEncryptResponse, encryptionPassword) {
    /* var requestParams = {
        	"RtaUserId":"",
        	"linking_attribute":""
        };*/
    if (notValid(requestParams.RtaUserId) || notValid(requestParams.linking_attribute)) {
        return validationError;
    } else {
        var request = soapEnvStart +
            '<soapenv:Header>' +
            '<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse=" http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd " xmlns=" http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<wsse:UsernameToken>' +
            '<wsse:Username>' + _userName + '</wsse:Username>' +
            '<wsse:Password>' + _password + '</wsse:Password>' +
            '</wsse:UsernameToken>' +
            '</wsse:Security>' +
            '<sch:Header>' +
            '<sch:grant_type>IamGrant</sch:grant_type>' +
            '<sch:rta_id>' + requestParams.RtaUserId + '</sch:rta_id>' +
            '<sch:linking_attribute>' + requestParams.linking_attribute + '</sch:linking_attribute>' +
            '<sch:scope>openid+api</sch:scope>' +
            '</sch:Header>' +
            '</soapenv:Header>' +
            '<soapenv:Body>' +
            '<sch:DelinkSalikAccountRequest>' +
            '<sch:RtaUserId>' + requestParams.RtaUserId + '</sch:RtaUserId>' +
            '<sch:AppId>SALIK</sch:AppId>' +
            '</sch:DelinkSalikAccountRequest>' +
            '</soapenv:Body>' +
            soapEnvEnd;

        var servicePath = '/linkDelinkSalikAccount';
        var SOAPAction = 'DelinkSalikAccountRequest';
        var requestObj = buildBody([request], true);

        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    }

}

function _logRequestResponse(refNum, adapter, SOAPAction, request, response, isDBLog) {

    var invocationLog = {};

    if (request != null && response == null) {
        MFP.Logger.warn('\r\n\r\n' +
            '|--------START----------------|\r\n' +
            '|--------REQUEST--------------|\r\n' +
            '|--------START----------------|\r\n' +
            '|--------REF: ' + refNum + '--------|\r\n' +
            '|--------TIME: ' + formateDate(refNum) + '-------|\r\n' +
            '|--------Adapter: ' + adapter + '|\r\n' +
            '|--------Action: ' + SOAPAction + '---|\r\n' +
            '|--------Request: ' + JSON.stringify(request) + '---|\r\n' +
            '|--------END------------------|\r\n' +
            '|--------REQUEST--------------|\r\n' +
            '|--------END------------------|\r\n');
        invocationLog = {
            adapter: 'drivers_and_vehciles_CustomDB',
            procedure: 'dbLogReq',
            parameters: [refNum.toString(), adapter, SOAPAction, request]
        };
    } else if (request == null && response != null) {

        MFP.Logger.warn('\r\n\r\n' +
        	'|--------START----------------|\r\n' +
            '|--------RESPONSE-------------|\r\n' +
            '|--------START----------------|\r\n' +
            '|--------REF: ' + refNum + '--------|\r\n' +
            '|--------TIME: ' + formateDate(refNum) + '-------|\r\n' +
            '|--------Adapter: ' + adapter + '-----------|\r\n' +
            '|--------Action: ' + SOAPAction + '---|\r\n' +
            '|--------Response: ' + JSON.stringify(response) + '---|\r\n' +
            '|--------END------------------|\r\n' +
            '|--------RESPONSE-------------|\r\n' +
            '|--------END------------------|\r\n');
        invocationLog = {
            adapter: 'drivers_and_vehciles_CustomDB',
            procedure: 'dbLogRes',
            parameters: [refNum.toString(), response]
        };
    }

    if (isDBLog)
        MFP.Server.invokeProcedure(invocationLog);

}
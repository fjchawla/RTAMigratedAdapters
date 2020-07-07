/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *  Created By Ahmed Raouf 25-July-2018
 */
var _userName = "%#credentials!#!username_tibco#%";
var _password = "%#credentials!#!password_tibco#%";
var IsDebugging;
var adapterName = "drivers_and_vehicles_SalikOTPAdapter";
var soapEnvStart = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/schemas/SalikOTPService/Schema.xsd">';
var soapEnvEnd = '</soapenv:Envelope>';
var soapHeader = '<soapenv:Header>' +
    '<sch:Header>' +
    '<!--Optional:-->' +
    '<sch:client_ID>dubaidrive.hybrid</sch:client_ID>' +
    '<!--Optional:-->' +
    '</sch:Header>' +
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
    return uniqueNumber() + '' + Math.floor(Math.random() * (999 - 100 + 1) + 100);
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

function generateSalikOTP(requestParams, isEncryptResponse, encryptionPassword) {
    /*var requestParams = {
        "TransactionTypeId": "",
        "OTPGuid": "",
        "CountryCode": "",
        "ContactNumber": "",

    };*/
    if (notValid(requestParams.TransactionTypeId) || notValid(requestParams.OTPGuid) || notValid(requestParams.CountryCode) || notValid(requestParams.ContactNumber)) {
        return validationError;
    } else {
        var request = soapEnvStart + soapHeader +
            '<soapenv:Body>' +
            '<sch:OTPRequest>' +
            '<sch:TransactionTypeId>' + requestParams.TransactionTypeId + '</sch:TransactionTypeId>' +
            '<sch:OTPGuid>' + requestParams.OTPGuid + '</sch:OTPGuid>' +
            '<sch:CountryCode>' + requestParams.CountryCode + '</sch:CountryCode>' +
            '<sch:ContactNumber>' + requestParams.ContactNumber + '</sch:ContactNumber>' +
            '<sch:AppId>SALIK</sch:AppId>' +
            '</sch:OTPRequest>' +
            '</soapenv:Body>' +
            soapEnvEnd;

        var servicePath = '/salikOTPService';
        var SOAPAction = 'OTPRequest';
        var requestObj = buildBody([request], true);

        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    }

}

function verifySalikOTP(requestParams, isEncryptResponse, encryptionPassword) {
    /*var requestParams = {
        "TransactionTypeId": "",
        "OTPGuid": "",
        "OtpCode": ""

    };*/
    if (notValid(requestParams.TransactionTypeId) || notValid(requestParams.OTPGuid) || notValid(requestParams.OtpCode)) {
        return validationError;
    } else {
        var request = soapEnvStart + soapHeader +
            '<soapenv:Body>' +
            '<sch:VerifyMobileVerificationCodeRequest>' +
            '<sch:TransactionTypeId>' + requestParams.TransactionTypeId + '</sch:TransactionTypeId>' +
            '<sch:OTPGuid>' + requestParams.OTPGuid + '</sch:OTPGuid>' +
            '<sch:OTPCode>' + requestParams.OtpCode + '</sch:OTPCode>' +
            '<sch:AppID>SALIK</sch:AppID>' +
            '</sch:VerifyMobileVerificationCodeRequest>' +
            '</soapenv:Body>' +
            soapEnvEnd;

        var servicePath = '/salikOTPService';
        var SOAPAction = 'VerifyMobileVerificationCodeRequest';
        var requestObj = buildBody([request], true);

        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    }

}

function retrieveAccountAndPin(requestParams, isEncryptResponse, encryptionPassword) {
    /*var requestParams = {
        "Lang": "",
        "CountryCode": "",
        "ContactNumber": "",
        "PlateCountryCode":"",
        "PlateSourceId":"",
        "PlateCategoryId":"",
        "PlateNumber":"",
        "PlateColorId":"",
    };*/
    if (notValid(requestParams.CountryCode) || notValid(requestParams.ContactNumber) || notValid(requestParams.PlateCountryCode) || notValid(requestParams.PlateSourceId) || notValid(requestParams.PlateCategoryId) || notValid(requestParams.PlateNumber)) {
        return validationError;
    } else {
        var lang = (notValid(requestParams.lang)) ? 'en' : requestParams.lang;
        var PlateColorId = (notValid(requestParams.PlateColorId)) ? '' : '<sch:PlateColorId>' + requestParams.PlateColorId + '</sch:PlateColorId>';
        var request = soapEnvStart + soapHeader +
            '<soapenv:Body>' +
            '<sch:RetrieveAccountAndPinRequest>' +
            '<!--Optional:-->' +
            '<sch:Language>' +
            '<!--Optional:-->' +
            '<sch:Lang>' + lang + '</sch:Lang>' +
            '</sch:Language>' +
            '<sch:CountryCode>' + requestParams.CountryCode + '</sch:CountryCode>' +
            '<sch:ContactNumber>' + requestParams.ContactNumber + '</sch:ContactNumber>' +
            '<sch:PlateCountryCode>' + requestParams.PlateCountryCode + '</sch:PlateCountryCode>' +
            '<sch:PlateSourceId>' + requestParams.PlateSourceId + '</sch:PlateSourceId>' +
            '<sch:PlateCategoryId>' + requestParams.PlateCategoryId + '</sch:PlateCategoryId>' +
            '<sch:PlateNumber>' + requestParams.PlateNumber + '</sch:PlateNumber>' +
            PlateColorId +
            '<sch:AppID>DNVAPP</sch:AppID>' +
            '</sch:RetrieveAccountAndPinRequest>' +
            '</soapenv:Body>' +
            soapEnvEnd;

        var servicePath = '/salikOTPService';
        var SOAPAction = 'RetrieveAccountAndPinRequest';
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
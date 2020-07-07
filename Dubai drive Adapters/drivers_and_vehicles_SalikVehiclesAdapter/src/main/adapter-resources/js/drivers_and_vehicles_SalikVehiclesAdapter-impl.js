/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *  Created By Ahmed Raouf 01-September-2018
 */
var IsDebugging;
var _userName = "%#credentials!#!username_tibco#%";
var _password = "%#credentials!#!password_tibco#%";
var adapterName = "drivers_and_vehicles_SalikVehiclesAdapter";
var soapEnvStart = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/schemas/SalikVehicleService/Schema.xsd">';
var soapEnvEnd = '</soapenv:Envelope>';
var soapHeaderStart = '<soapenv:Header>';
var soapHeaderEnd = '</soapenv:Header>';

var tibcoHeader = '<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse=" http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd " xmlns=" http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<wsse:UsernameToken>' +
    '<wsse:Username>' + _userName + '</wsse:Username>' +
    '<wsse:Password>' + _password + '</wsse:Password>' +
    '</wsse:UsernameToken>' +
    '</wsse:Security>';

var validationError = {
    "errorCode": "-1",
    "errorMessage": "missing or invalid params! please check mandatory [Params]."
};

function getGrantHeader(_token) {
    return '<sch:Header>' +
        '<sch:client_ID>dubaidrive.hybrid</sch:client_ID>' +
        '<!--<sch:client_ID>dubaidrive.android</sch:client_ID>:-->' +
        '<sch:SecureToken>' +
        '<sch:token_type>Bearer</sch:token_type>' +
        '<sch:access_token>' + _token + '</sch:access_token>' +
        '</sch:SecureToken>' +
        '</sch:Header>';
}

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


function Log(text) {

    //MFP.Logger.warn(text);


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

    //check fault response
    /*if(!webServiceResult["isSuccessful"] && webServiceResult["errors"]){
    	return _fault(webServiceResult)
    }*/

    return webServiceResult;
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


function getAllVehicles(requestParams, isEncryptResponse, encryptionPassword) {

    /* var requestParams = {
 	"token":"",
 	"SearchType":"",
 	"PageId":"",
 	"PageSize",""
 }*/

    if (notValid(requestParams.token) || notValid(requestParams.SearchType) || notValid(requestParams.PageId) || notValid(requestParams.PageSize)) {
        return validationError;
    } else {
        var lang = (notValid(requestParams.lang)) ? 'en' : requestParams.lang;
        var request = soapEnvStart + soapHeaderStart + getGrantHeader(requestParams.token) + tibcoHeader + soapHeaderEnd +

            '<soapenv:Body>' +
            '<sch:ViewVehicle>' +
            '<sch:Language>' +
            '<sch:Lang>' + lang + '</sch:Lang>' +
            '</sch:Language>' +
            '<sch:SearchType>' + requestParams.SearchType + '</sch:SearchType>' +
            '<sch:PageId>' + requestParams.PageId + '</sch:PageId>' +
            '<sch:PageSize>' + requestParams.PageSize + '</sch:PageSize>' +
            '<sch:AppId>SALIK</sch:AppId>' +
            '</sch:ViewVehicle>' +
            '</soapenv:Body>' + soapEnvEnd;

        var servicePath = '/salikVehicleService';
        var SOAPAction = 'ViewVehicle';
        var requestObj = buildBody([request], true);
        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    }
}

function getTFNList(requestParams, isEncryptResponse, encryptionPassword) {

    /* var requestParams = {
 	"token":"",
 	"lang":""
 }*/

    if (notValid(requestParams.token)) {
        return validationError;
    } else {
        var lang = (notValid(requestParams.lang)) ? 'en' : requestParams.lang;
        var request = soapEnvStart + soapHeaderStart + getGrantHeader(requestParams.token) + tibcoHeader + soapHeaderEnd +

            '<soapenv:Body>' +
            '<sch:GetTFNListRequest>' +
            '<!--Optional:-->' +
            '<sch:Language>' +
            '<!--Optional:-->' +
            '<sch:Lang>en</sch:Lang>' +
            '</sch:Language>' +
            '<sch:AppId>DNVAPP</sch:AppId>' +
            '</sch:GetTFNListRequest>' +
            '</soapenv:Body>' + soapEnvEnd;

        var servicePath = '/salikVehicleService';
        var SOAPAction = 'GetTFNListRequest';
        var requestObj = buildBody([request], true);
        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    }
}

function validatePlateInformation(requestParams, isEncryptResponse, encryptionPassword) {

    /* var requestParams = {
 	"token":"",
 	"lang":"",
 	"PlateCountryCode":"",
 	"PlateSourceId":"",
 	"PlateCategoryId":"",
 	"PlateNumber":"",
 	"PlateColorId":"",
 	"TrafficFileNo":""
 	
 }*/

    if (notValid(requestParams.token) || notValid(requestParams.PlateCountryCode) || notValid(requestParams.PlateSourceId) || notValid(requestParams.PlateCategoryId) || notValid(requestParams.PlateNumber) || notValid(requestParams.TrafficFileNo)) {
        return validationError;
    } else {
        var lang = (notValid(requestParams.lang)) ? 'en' : requestParams.lang;
        var PlateColorId = (notValid(requestParams.PlateColorId)) ? '' : '<sch:PlateColorId>' + requestParams.PlateColorId + '</sch:PlateColorId>';
        var request = soapEnvStart + soapHeaderStart + getGrantHeader(requestParams.token) + tibcoHeader + soapHeaderEnd +

            '<soapenv:Body>' +
            '<sch:ValidatePlateInformation>' +
            '<!--Optional:-->' +
            '<sch:Language>' +
            '<!--Optional:-->' +
            '<sch:Lang>' + lang + '</sch:Lang>' +
            '</sch:Language>' +
            '<sch:PlateDetails>' +
            '<sch:PlateCountryCode>' + requestParams.PlateCountryCode + '</sch:PlateCountryCode>' +
            '<sch:PlateSourceId>' + requestParams.PlateSourceId + '</sch:PlateSourceId>' +
            '<sch:PlateCategoryId>' + requestParams.PlateCategoryId + '</sch:PlateCategoryId>' +
            '<sch:PlateNumber>' + requestParams.PlateNumber + '</sch:PlateNumber>' +
            '<!--Optional:-->' + PlateColorId +
            '</sch:PlateDetails>' +
            '<sch:TrafficFileNo>' + requestParams.TrafficFileNo + '</sch:TrafficFileNo>' +
            '<sch:IsCompanyAllowed>true</sch:IsCompanyAllowed>'+
            '<sch:AppId>DNVAPP</sch:AppId>' +
            '</sch:ValidatePlateInformation>' +
            '</soapenv:Body>' + soapEnvEnd;

        var servicePath = '/salikVehicleService';
        var SOAPAction = 'ValidatePlateInformation';
        var requestObj = buildBody([request], true);
        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    }
}

function AddVehicle(requestParams, isEncryptResponse, encryptionPassword) {

    /* var requestParams = {
 	"token":"",
 	"lang":"",//optional
 	"PlateCountryCode":"",
 	"PlateSourceId":"",
 	"PlateCategoryId":"",
 	"PlateNumber":"",
 	"PlateColorId":"",//optional
 	"TrafficFileNo":"",
 	"VehicleMakeId":"",
 	"VehicleModelId":"",
 	"VehicleCategoryId":"",
 	"VehicleColorId":"",
 	"VehicleYear":"",
 	"ChassisNo":"",
 	"ExpiryDate":"",//optional
 	"TagNumber":"",
 	"TagPurchaseDate":"",//optional
 	"IsCompanyAllowed":"",//optional
 	"TagActivationKeyCode":""//optional
 		
 }*/

    if (notValid(requestParams.token) ||
        notValid(requestParams.PlateCountryCode) ||
        notValid(requestParams.PlateSourceId) ||
        notValid(requestParams.PlateCategoryId) ||
        notValid(requestParams.PlateNumber) ||
        notValid(requestParams.TrafficFileNo) ||
        notValid(requestParams.VehicleMakeId) ||
        notValid(requestParams.VehicleModelId) ||
        notValid(requestParams.VehicleCategoryId) ||
        notValid(requestParams.VehicleColorId) ||
        notValid(requestParams.VehicleYear) ||
        notValid(requestParams.ChassisNo) ||
        notValid(requestParams.TagNumber)) {
        return validationError;
    } else {
        var lang = (notValid(requestParams.lang)) ? 'en' : requestParams.lang;
        var PlateColorId = (notValid(requestParams.PlateColorId)) ? '' : '<sch:PlateColorId>' + requestParams.PlateColorId + '</sch:PlateColorId>';
        var vehicelExpiry = (notValid(requestParams.ExpiryDate)) ? '' : '<sch:ExpiryDate>' + requestParams.ExpiryDate + '</sch:ExpiryDate>';
        var tagActivationKeyCode = (notValid(requestParams.TagActivationKeyCode)) ? '' : '<sch:TagActivationKeyCode>' + requestParams.TagActivationKeyCode + '</sch:TagActivationKeyCode>';
        var TagPurchaseDate = (notValid(requestParams.TagPurchaseDate)) ? '' : '<sch:TagPurchaseDate>' + requestParams.TagPurchaseDate + '</sch:TagPurchaseDate>';
        var request = soapEnvStart + soapHeaderStart + getGrantHeader(requestParams.token) + tibcoHeader + soapHeaderEnd +

            '<soapenv:Body>' +
            '<sch:AddVehicle>' +
            '<!--Optional:-->' +
            '<sch:Language>' +
            '<sch:Lang>' + lang + '</sch:Lang>' +
            '</sch:Language>' +
            '<sch:PlateDetails>' +
            '<sch:PlateCountryCode>' + requestParams.PlateCountryCode + '</sch:PlateCountryCode>' +
            '<sch:PlateSourceId>' + requestParams.PlateSourceId + '</sch:PlateSourceId>' +
            '<sch:PlateCategoryId>' + requestParams.PlateCategoryId + '</sch:PlateCategoryId>' +
            '<sch:PlateNumber>' + requestParams.PlateNumber + '</sch:PlateNumber>' +
            '<!--Optional:-->' + PlateColorId +
            '</sch:PlateDetails>' +
            '<sch:TrafficFileNo>' + requestParams.TrafficFileNo + '</sch:TrafficFileNo>' +
            '<sch:VehicleDetails>' +
            '<sch:VehicleMakeId>' + requestParams.VehicleMakeId + '</sch:VehicleMakeId>' +
            '<sch:VehicleModelId>' + requestParams.VehicleModelId + '</sch:VehicleModelId>' +
            '<sch:VehicleCategoryId>' + requestParams.VehicleCategoryId + '</sch:VehicleCategoryId>' +
            '<sch:VehicleColorId>' + requestParams.VehicleColorId + '</sch:VehicleColorId>' +
            '<sch:VehicleYear>' + requestParams.VehicleYear + '</sch:VehicleYear>' +
            '<sch:ChassisNo>' + requestParams.ChassisNo + '</sch:ChassisNo>' +
            '<!--Optional:-->' + vehicelExpiry +
            '</sch:VehicleDetails>' +
            '<sch:TagNumber>' + requestParams.TagNumber + '</sch:TagNumber>' +
            TagPurchaseDate+
            '<sch:IsCompanyAllowed>true</sch:IsCompanyAllowed>' +
            '<!--Optional:-->' + tagActivationKeyCode +
            '<sch:AppId>DNVAPP</sch:AppId>' +
            '</sch:AddVehicle>' +
            '</soapenv:Body>' + soapEnvEnd;

        var servicePath = '/salikVehicleService';
        var SOAPAction = 'AddVehicle';
        var requestObj = buildBody([request], true);
        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    }
}

function RemoveVehicle(requestParams, isEncryptResponse, encryptionPassword) {

    /* var requestParams = {
 	"token":"",
 	"lang":"",//optional
 	"otpGuid":"",
 	"otpCode":"",
 	"vehicleId":"",
 	"vehicleSignature":""
 	
 }*/

    if (notValid(requestParams.token) || notValid(requestParams.otpGuid) || notValid(requestParams.otpCode) || notValid(requestParams.vehicleId) || notValid(requestParams.vehicleSignature)) {
        return validationError;
    } else {
        var lang = (notValid(requestParams.lang)) ? 'en' : requestParams.lang;
        var request = soapEnvStart + soapHeaderStart + getGrantHeader(requestParams.token) + tibcoHeader + soapHeaderEnd +

            '<soapenv:Body>' +
            '<sch:RemoveVehicle>' +
            '<!--Optional:-->' +
            '<sch:Language>' +
            '<sch:Lang>' + lang + '</sch:Lang>' +
            '</sch:Language>' +
            '<sch:otpGuid>' + requestParams.otpGuid + '</sch:otpGuid>' +
            '<sch:otpCode>' + requestParams.otpCode + '</sch:otpCode>' +
            '<sch:vehicleId>' + requestParams.vehicleId + '</sch:vehicleId>' +
            '<sch:vehicleSignature>' + requestParams.vehicleSignature + '</sch:vehicleSignature>' +
            '<sch:AppId>DNVAPP</sch:AppId>' +
            '</sch:RemoveVehicle>' +
            '</soapenv:Body>' + soapEnvEnd;

        var servicePath = '/salikVehicleService';
        var SOAPAction = 'RemoveVehicle';
        var requestObj = buildBody([request], true);
        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    }
}

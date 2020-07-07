/*
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


var soapEnvNS = 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ';
var userName = "%#credentials!#!username#%";
var password = "%#credentials!#!password#%";
var externalUsername = "%#credentials!#!externalUsername#%";
var externalPassword = "%#credentials!#!externalPassword#%";
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
function DRLInterimService(params, isEncryptResponse, encryptionPassword){
	var envHeader = {
			"ae:username" : userName,
			"ae:password" : password
	};
	var _soapEnvNS=soapEnvNS+ 'xmlns:ae="http://ae.gov.trf.vhl.ws.DRLInterimService"';

    var servicePath= '/ws/services/DRLInterimService'; 
    var parameters = [envHeader,params, '', _soapEnvNS];
    var request = buildBody(parameters, false);
   
    //Log("DRLInterimService request >> " + request);
    return invokeWebService(request,servicePath, null, isEncryptResponse, encryptionPassword);
}

function generalFinesInquiryService(params, isEncryptResponse, encryptionPassword) {
	var envHeader = {
			"urn:username" : userName,
			"urn:password" : password
	};
	var _soapEnvNS=soapEnvNS+ 'xmlns:urn="urn:GeneralFinesInquiryService"';

	var servicePath= '/ws/services/GeneralFinesInquiryService';
	var parameters = [envHeader, params, '', _soapEnvNS];
    var request = buildBody(parameters, false);
	
    //Log("GeneralFinesInquiryService request >> " + request);
	return invokeWebService(request,servicePath, null, isEncryptResponse, encryptionPassword);
}

function driverExperienceCertificateDataService(params, isEncryptResponse, encryptionPassword) {
	var envHeader = {
			"username" : userName,
			"password" : password
	};
	var _soapEnvNS =soapEnvNS +'xmlns:ae="http://ae.gov.trf.drl.ws.DriverExperienceCertificateDataService"' ;
	var servicePath= '/ws/services/DriverExperienceCertificateDataService';
	var parameters = [envHeader, params, 'xmlns:ae="http://ws.trs.rta.ae"', _soapEnvNS];
	var request = buildBody(parameters, false);
	
	//Log("DriverExperienceCertificateDataService request >> " + request);
	return invokeWebService(request,servicePath, null, isEncryptResponse, encryptionPassword);
}

function bookletInterimService(params, isEncryptResponse, encryptionPassword) {
	var envHeader = { 
				"ae:username" : userName,
				"ae:password" : password
			};

	var servicePath= '/ws/services/BookletInterimService';
	var _soapEnvNS=soapEnvNS+ 'xmlns:ae="http://ae.gov.trf.vhl.ws.BookletInterimService"';
	var parameters = [envHeader, params,'', _soapEnvNS];
	
	var request = buildBody(parameters, false);
	
	//Log("BookletInterimService request >> " + request);
	return invokeWebService(request, servicePath, null, isEncryptResponse, encryptionPassword);
	
}

/**
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */
function getReceiptDetailsService(params, isEncryptResponse, encryptionPassword) {
	var envHeader = {
			"ae:username" : userName,
			"ae:password" : password
	};
	var _soapEnvNS =soapEnvNS+  'xmlns:ae="http://ae.rta.common.ws.GetReceiptDetailsService"';
	var servicePath = '/ws/services/GetReceiptDetailsService';
	var parameters = [envHeader, params, 'xmlns:ae="http://ws.trs.rta.ae"', _soapEnvNS];
	var request = buildBody(parameters, false);
	
	//Log("GetReceiptDetailsService request >> " + request);
	return invokeWebService(request, servicePath, null, isEncryptResponse, encryptionPassword);
}

function ownershipCertificatesService(params, isEncryptResponse, encryptionPassword){
	var envHeader = {
			"username" : userName,
			"password" : password
	};
	var _soapEnvNS=soapEnvNS+ 'xmlns:ae="http://ae.gov.trf.vhl.ws.OwnershipCertificatesService"';

	var servicePath = '/ws/services/OwnershipCertificatesService'; 
	var parameters = [envHeader, params, '', _soapEnvNS];
	var request = buildBody(parameters, false);

	//Log("OwnershipCertificatesService request >> " + request);
	return invokeWebService(request, servicePath, null, isEncryptResponse, encryptionPassword);
}

function clearanceCertificateService(params, isEncryptResponse, encryptionPassword){
	var envHeader = {
			"ae:username" : userName,
			"ae:password" : password
	};
	var _soapEnvNS=soapEnvNS+ 'xmlns:ae="http://ae.gov.trf.vhl.ws.ClearanceCertificateService"';

	var servicePath = '/ws/services/ClearanceCertificateService';
	var parameters = [envHeader, params, '', _soapEnvNS];
	var request = buildBody(parameters, false);

	//Log("ClearanceCertificateService request >> " + request);
	return invokeWebService(request,servicePath, null, isEncryptResponse, encryptionPassword);
}
function getOwnershipCertificate(envHeader, params, headers, isEncryptResponse, encryptionPassword){
	var soapEnvNS = 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ';
	var _soapEnvNS=soapEnvNS+ 'xmlns:ae="http://ae.gov.trf.vhl.ws.OwnershipCertificatesService"';

    var parameters = [envHeader, params, '', _soapEnvNS];
    var request = buildBody(parameters, false);
    //MFP.Logger.warn("getOwnerVehicleInfo request::" + request);
  
    var servicePath = '/ws/services/OwnershipCertificatesService';
    return invokeWebService(request, servicePath, headers, isEncryptResponse, encryptionPassword);
}

function getClearanceCertificateByTransactionId(envHeader, params, headers, isEncryptResponse, encryptionPassword){
	var soapEnvNS = 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ae="http://ae.gov.trf.vhl.ws.ClearanceCertificateService"';
    var parameters = [envHeader, params, '', soapEnvNS];
    var request = buildBody(parameters, false);
    //MFP.Logger.warn("getClearanceCertificateByTransactionId request::" + request);
  
    var servicePath = '/ws/services/ClearanceCertificateService';
    return invokeWebService(request, servicePath, headers, isEncryptResponse, encryptionPassword);
}

function getExportCertificateByTransactionId(envHeader, params, headers, isEncryptResponse, encryptionPassword){
	var soapEnvNS = 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ae="http://ae.gov.trf.vhl.ws.ExportCertificateService"';
    var parameters = [envHeader, params, ' ', soapEnvNS];
    var request = buildBody(parameters, false);
    //MFP.Logger.warn("getExportCertificateByTransactionId request::" + request);
  
    var servicePath = '/ws/services/ExportCertificateService';
    return invokeWebService(request, servicePath, headers, isEncryptResponse, encryptionPassword);
}

function getLostDamagedExportCertificateByTransactionId(envHeader, params, headers, isEncryptResponse, encryptionPassword){
	var soapEnvNS = 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ae="http://ae.gov.trf.vhl.ws.ExportCertificateService"';
    var parameters = [envHeader, params,' ', soapEnvNS];
    var request = buildBody(parameters, false);
    //MFP.Logger.warn("getLostDamagedExportCertificateByTransactionId request::" + request);
  
    var servicePath = '/ws/services/ExportCertificateService';
    return invokeWebService(request, servicePath, headers, isEncryptResponse, encryptionPassword);
}

function getReinsuranceCertificateByTransactionIdOperation(envHeader, params, headers, isEncryptResponse, encryptionPassword){
	var soapEnvNS = 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ReInsuranceCertificateService"';
    var parameters = [envHeader, params,'', soapEnvNS];
    var request = buildBody(parameters, false);
    //MFP.Logger.warn("getReinsuranceCertificateByTransactionIdOperation request::" + request);
  
    var servicePath = '/ws/services/ReInsuranceCertificateService';
    return invokeWebService(request, servicePath, headers, isEncryptResponse, encryptionPassword);
}

function getPossessionCertificateByTransactionIdOperation(envHeader, params, headers, isEncryptResponse, encryptionPassword){
	var soapEnvNS = 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:VehiclePossessionCertificateService"';
    var parameters = [envHeader, params,'', soapEnvNS];
    var request = buildBody(parameters, false);
    //MFP.Logger.warn("getPossessionCertificateByTransactionIdOperation request::" + request);
  
    var servicePath = '/ws/services/VehiclePossessionCertificateService';
    return invokeWebService(request, servicePath, headers, isEncryptResponse, encryptionPassword);
}
function convertObjectToArray(object){
	var result = object;
	if(object.length == undefined)
		result = [object];
	return result;
}
function getFinesByTrafficNo(trafficFileNo){
	var finesData = {
						totalFine:0 ,
						totalTicketsNo:0,
						totalBlackPoints:0
					};
	var requestInfo = {
						"cli:searchingType": "1",
						"cli:trafficFileNo": trafficFileNo, 
						"cli:retrieveAllTickets": true
					  };
	
	var params = {
			"cli:getFines" : {
				"cli:getFineRequestInfo" : requestInfo
			}
	};
	var invocationData = {
			adapter : 'drivers_and_vehicles_FinesServiceAdapter',
			procedure : 'fineManagementService',
			parameters : [params]
	};
	var result = MFP.Server.invokeProcedure(invocationData);

	try {
			var fineDetails = result.Envelope.Body.getFineResponse.getFineDetails;
			if(fineDetails.errorResponse == undefined){
				finesData = {
								totalFine:fineDetails.totalFine ,
								totalTicketsNo:fineDetails.totalTicketsNo,
								totalBlackPoints:fineDetails.totalBlackPoints
							};
			}
	}
	catch(e){}
	return finesData;
}

function getDriverLicenseByTrafficFileNo(trafficFileNo){
	var licenseData = {};
	var params = {
					"ae:getByTrafficFileNumber" : {
						"ae:trafficFileNumber" : trafficFileNo
					}
			};

	var invocationData = {
			adapter : 'drivers_and_vehicles_driverLicenseAdapter',
			procedure : 'mobilityDrivingLicenseInfoService',
			parameters : [params]
	};
	var result = MFP.Server.invokeProcedure(invocationData);
	try
	{
		licenseData = result.Envelope.Body.getDrivingLicenseInformationReturn.licenseInfo;
	}
	catch(e) {}
	return licenseData;
}

function getVehiclesByTrafficFileNo(trafficFileNo){
	var vehiclesData = [];
	var params = {"urn:getUsersVehicles":{
		"urn:trafficFileNumber":trafficFileNo
	}
	};
	// Preparing adapter call
	var invocationData = {
			adapter : 'drivers_and_vehicles_vehicleAdapter',
			procedure : 'usersVehiclesService',
			parameters : [params]
	};

	var result = MFP.Server.invokeProcedure(invocationData);
	try
	{
		vehiclesData = result.Envelope.Body.getUsersVehiclesReturn.usersVehicles;
	}
	catch(e) {}
	return vehiclesData;
}
function getWearableUserNotifications(trafficFileNo, smartPhoneAppId, isEncryptResponse, encryptionPassword){
	var finesData 			= getFinesByTrafficNo(trafficFileNo);
	var vehiclesData 		= getVehiclesByTrafficFileNo(trafficFileNo);
	var	licenseData 		= getDriverLicenseByTrafficFileNo(trafficFileNo);	
	var	activeTicketsData 	= getActiveVPBySmartPhoneAppId(smartPhoneAppId);
	
	var result = {license:licenseData, vehicles:vehiclesData, fines:finesData, activeTickets:activeTicketsData}
	if(isEncryptResponse != undefined && isEncryptResponse == true)
	{
		var responseString = JSON.stringify(result);
		var invocationData = {
			adapter : 'drivers_and_vehciles_utilitiesAdapter',
			procedure : 'encryptData',
			parameters : [responseString,encryptionPassword]
		};
		result = MFP.Server.invokeProcedure(invocationData);
	}	
	return result;
}

function getActiveVPBySmartPhoneAppId(smartPhoneAppId){
	var activeTicketsData = "";
	var invocationData = {
			adapter : 'parking_getActiveTickets',
			procedure : 'getActiveVPBySmartPhoneAppId',
			parameters : [smartPhoneAppId]
	};
	var result = MFP.Server.invokeProcedure(invocationData);
	try
	{
		activeTicketsData = result.Envelope.Body.getActiveVPBySmartPhoneAppIdResponse;
	}
	catch(e) {}
	return activeTicketsData;
}


function invokeWebService(body, servicePath,headers, isEncryptResponse, encryptionPassword) {
	var startTime = new Date().getTime();
	if (!headers)
		headers = {
			"SOAPAction" : ""
		};
	else
		headers["SOAPAction"] = "";
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		path: servicePath,
		body : {
			content : body.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};

	// Adding custom HTTP headers if they were provided as parameter to the
	// procedure call
	headers && (input['headers'] = headers);

	var webServiceResult = MFP.Server.invokeHttp(input);
	if(isEncryptResponse != undefined && isEncryptResponse == true)
	{
		var responseString = JSON.stringify(webServiceResult);
		var invocationData = {
			adapter : 'drivers_and_vehciles_utilitiesAdapter',
			procedure : 'encryptData',
			parameters : [responseString,encryptionPassword]
		};
		webServiceResult = MFP.Server.invokeProcedure(invocationData);
	}	
	var endTime = new Date().getTime();
	//Log("time for "+ servicePath + " is " + (endTime - startTime) + " ms");
	return webServiceResult;
}

function buildBody(parameters, isStatic) {
	var request = "";
	
	if (isStatic == true) {
			request = MFP.Server.invokeProcedure({
			adapter : 'drivers_and_vehciles_utilitiesAdapter',
			procedure : 'buildBodyFromStaticRequest',
			parameters : parameters,
			
		});
	} else {
			request = MFP.Server.invokeProcedure({
			adapter : 'drivers_and_vehciles_utilitiesAdapter',
			procedure : 'buildBody',
			parameters : parameters
		});
	}
	
	return request.body;
}


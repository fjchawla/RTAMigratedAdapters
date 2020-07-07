/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *  Created By Ahmed Raouf 06-November-2018
 */
var _userName = "%#credentials!#!username_tibco#%";
var _password = "%#credentials!#!password_tibco#%";
var _userNameVIP = "MobVIPStgUser";
var _passwordVIP = "HJF563^%$as";
var adapterName = "drivers_and_vehicles_VIPProfile";
var IsDebugging;
var soapEnvStart_General = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lac="http://www.rta.ae/EIP/LACustomerProfileGeneralInquiryService/LACustomerProfileGeneralInquiryService_Schema">';
var soapEnvStart_Vehicle = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lav="http://www.rta.ae/EIP/LAVehicleInquiryService/LAVehicleInquiryService_Schema">';
var soapEnvStart_Circular = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lac="http://www.rta.ae/EIP/LACircularNotesInquiryService/LACircularNotesInquiryService_Schema">';
var soapEnvStart_Fines = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lag="http://www.rta.ae/EIP/LAGeneralFinesInquiryService/LAGeneralFinesInquiryService_Schema">';
var soapEnvStart_Auction = '<soapenv:Envelope xmlns:lal="http://www.rta.ae/EIP/LALookupInquiryService/LALookupInquiryService_Schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';

var soapEnvEnd = '</soapenv:Envelope>';
var soapHeaderStart = '<soapenv:Header>';
var soapHeaderEnd = '</soapenv:Header>';
var tibcoHeader = '<wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' +
    '<wsse:UsernameToken wsu:Id="UsernameToken-6">' +
    '<wsse:Username>' + _userName + '</wsse:Username>' +
    '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">' + _password + '</wsse:Password>' +
    '<wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">umYlRq3cLtHzSru78CrDFA==</wsse:Nonce>' +
    '<wsu:Created>' + new Date(Date.now()).toISOString() + '</wsu:Created>' +
    '</wsse:UsernameToken>' +
    '</wsse:Security>';

var tibcoHeader_Auction = '<wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' +
	'<wsse:UsernameToken wsu:Id="UsernameToken-11">' +
	'<wsse:Username>' + _userName + '</wsse:Username>' +
	'<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">' + _password + '</wsse:Password>' +
	'<wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">XXPG29X6cA8zwcELdfo5GQ==</wsse:Nonce>' +
	'<wsu:Created>' + new Date(Date.now()).toISOString() + '</wsu:Created>' +
	'</wsse:UsernameToken>' +
	'</wsse:Security>';


var validationError = {
    "errorCode": "-1",
    "errorMessage": "missing or invalid params! please check mandatory [Params]."
};
var authError = {
    "errorCode": "-3",
    "errorMessage": "Unauthorized operation please check with system administartor.."
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

//verify VIP user 
function isVIP(username) {

    response = MFP.Server.invokeProcedure({
        adapter: 'userProfile',
        procedure: 'isUserVip',
        parameters: [username, "DNVAPP"]
    });

    if (!notValid(response) && !notValid(response.isVIP))
        return response.isVIP;
    else
        return false;
}


function getUserVIPProfile(requestParams, isEncryptResponse, encryptionPassword) {
    /* var requestParams = {
     	"plateNumber":"",
     	"plateCode":"",
     	"plateCategory":""
     }*/

    if (notValid(requestParams.plateNumber) || notValid(requestParams.plateCode) || notValid(requestParams.plateCategory)) {
        return validationError;
    } else {
    	
    	if (isVIP(requestParams.userID)){
    		var request = soapEnvStart_General + soapHeaderStart + tibcoHeader + soapHeaderEnd +

            '<soapenv:Body>' +
            '<lac:generalInquiryInfo>' +
            '<lac:generalInquiry>' +
            '<lac:appId>DNVAPP</lac:appId>' +
            '<lac:plateNumber>' + requestParams.plateNumber + '</lac:plateNumber>' +
            '<lac:plateCode>' + requestParams.plateCode + '</lac:plateCode>' +
            '<lac:plateCategory>' + requestParams.plateCategory + '</lac:plateCategory>' +
            '</lac:generalInquiry>' +
            '</lac:generalInquiryInfo>' +
            '</soapenv:Body>' +

            soapEnvEnd;
    		var servicePath = '/LACustomerProfileGeneralInquiryService';
        	var SOAPAction = 'generalInquiryInfo';
        	var requestObj = buildBody([request], true);

        	return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    	}else{
    		return authError;
    	}
        
       /* var result = invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);

        try {
            if (result.Envelope.Body.generalInquiryInfoReturn.generalInquiryInfoReturnData.responseType.responseCode == 1)
                return result.Envelope.Body.generalInquiryInfoReturn.generalInquiryInfoReturnData.responseType;
            else {
                var dom = result.Envelope.Body.generalInquiryInfoReturn.generalInquiryInfoReturnData.PersonInfo;

                return {
                    "personNameEn": dom.personNameEn,
                    "personNameAr": dom.personNameAr,
                    "mobileNumber": dom.mobileNumber,
                    "personNationalityCode": dom.personNationalityCode
                };
            }
        } catch (e) {
            return e.message;
        }*/

    }

}

function getUserVIPVehiclePlate(requestParams, isEncryptResponse, encryptionPassword) {
    /* var requestParams = {
     	"plateNumber":"",
     	"plateCode":"",
     	"plateCategory":""
     }*/

    if (notValid(requestParams.plateNumber) || notValid(requestParams.plateCode) || notValid(requestParams.plateCategory)) {
        return validationError;
    } else {
    	if (isVIP(requestParams.userID)){
    		
    		var request = soapEnvStart_Vehicle + soapHeaderStart + tibcoHeader + soapHeaderEnd +

            '<soapenv:Body>' +
            '<lav:getVehicleInfo>' +
            '<lav:appId>DNVAPP</lav:appId>' +
            '<lav:vehicleRequestChoice>' +
            '<lav:plateDetails>' +
            '<lav:plateCategory>' + requestParams.plateCategory + '</lav:plateCategory>' +
            '<lav:plateCode>' + requestParams.plateCode + '</lav:plateCode>' +
            '<lav:plateNo>' + requestParams.plateNumber + '</lav:plateNo>' +
            '<lav:vehicleRegistrationStatus>Registered</lav:vehicleRegistrationStatus>' +
            '</lav:plateDetails>' +
            '</lav:vehicleRequestChoice>' +
            '</lav:getVehicleInfo>' +
            '</soapenv:Body>' +

            soapEnvEnd;
	        var servicePath = '/LAVehicleInquiryService';
	        var SOAPAction = 'getVehicleInfo';
	        var requestObj = buildBody([request], true);

        	return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    		
    	}else{
    		return authError;
    	}
    	
       /* var result = invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);

        try {
            if (result.Envelope.Body.getVehicleInfoReturn.responseType.responseCode == 1)
                return result.Envelope.Body.getVehicleInfoReturn.responseType;
            else {
                var dom = result.Envelope.Body.getVehicleInfoReturn.VehicleReturn;

                return {
                    "trafficFileNumber": dom.CustomerInfo.trafficFileNumber,
                    "manufactureTypeEn": dom.VehicleInfo.manufactureTypeEn,
                    "manufactureTypeAr": dom.VehicleInfo.manufactureTypeAr,
                    "modelNameEn": dom.VehicleInfo.modelNameEn,
                    "modelNameAr": dom.VehicleInfo.modelNameAr,
                    "modelYear": dom.VehicleInfo.modelYear,
                    "plateNumber": dom.VehicleInfo.Plate.plateNumber,
                    "plateCfiCode": dom.VehicleInfo.Plate.code.cfiCode,
                    "plateCodeDescriptionEn": dom.VehicleInfo.Plate.code.plateCodeDescriptionEn,
                    "plateCodeDescriptionAr": dom.VehicleInfo.Plate.code.plateCodeDescriptionAr,
                    "categorycfiCode": dom.VehicleInfo.Plate.category.cfiCode,
                    "categoryDescriptionEn": dom.VehicleInfo.Plate.category.categoryDescriptionEn,
                    "categoryDescriptionAr": dom.VehicleInfo.Plate.category.categoryDescriptionAr,
                    "plateStatus": dom.VehicleInfo.Plate.plateStatus,
                    "plateStatusDesc": dom.VehicleInfo.Plate.plateStatusDesc
                };
            }
        } catch (e) {
            return e.message;
        }*/
    }

}

function getUserVIPPlateCircularNotes(requestParams, isEncryptResponse, encryptionPassword) {
    /* var requestParams = {
     	"plateNumber":"",
     	"plateCode":"",
     	"plateCategory":""
     }*/

    if (notValid(requestParams.plateNumber) || notValid(requestParams.plateCode) || notValid(requestParams.plateCategory)) {
        return validationError;
    } else {
    	if (isVIP(requestParams.userID)){
    		
    		var request = soapEnvStart_Circular + soapHeaderStart + tibcoHeader + soapHeaderEnd +

            '<soapenv:Body>' +
            '<lac:inquireCircularNotesRequest>' +
            '<lac:appId>DNVAPP</lac:appId>' +
            '<lac:getCircularChoice>' +
            '<lac:plateDetails>' +
            '<lac:plateNo>' + requestParams.plateNumber + '</lac:plateNo>' +
            '<lac:circularCategory>4</lac:circularCategory>' +
            '<lac:plateCategory>' +
            '<lac:categoryCFICode>' + requestParams.plateCategory + '</lac:categoryCFICode>' +
            '</lac:plateCategory>' +
            '<lac:plateCode>' +
            '<lac:plateCFICode>' + requestParams.plateCode + '</lac:plateCFICode>' +
            '</lac:plateCode>' +
            '<lac:plateSource>' +
            '<lac:Emirate>DXB</lac:Emirate>' +
            '</lac:plateSource>' +
            '</lac:plateDetails>' +
            '</lac:getCircularChoice>' +
            '</lac:inquireCircularNotesRequest>' +
            '</soapenv:Body>' +
            soapEnvEnd;
	        
    		var servicePath = '/LACircularNotesInquiryService';
	        var SOAPAction = 'inquireCircularNotesRequest';
	        var requestObj = buildBody([request], true);
	
	        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    	}else{
    		return authError;
    	}
    	
      /*  var result = invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);

        try {
            if (result.Envelope.Body.inquireCircularNotesReturn.responseType.responseCode == 1)
                return result.Envelope.Body.inquireCircularNotesReturn.responseType;
            else {

                var dom = result.Envelope.Body.inquireCircularNotesReturn.inquireCircularNotes;
                var circulerData = [];
                dom.forEach(function(key) {
                    circulerData.push({
                        "noteDate": key.noteDate,
                        "reasonEnglish": key.reasonEnglish,
                        "reasonArabic": key.reasonArabic
                    });
                });
                return {
                    "circulerData": circulerData,
                };
            }
        } catch (e) {
            return e.message;
        }*/

    } //end valid request

}

function getUserVIPPlateFines(requestParams, isEncryptResponse, encryptionPassword) {
    /* var requestParams = {
     	"plateNumber":"",
     	"plateCode":"",
     	"plateCategory":""
     }*/

    if (notValid(requestParams.plateNumber) || notValid(requestParams.plateCode) || notValid(requestParams.plateCategory)) {
        return validationError;
    } else {
    	
    	if (isVIP(requestParams.userID)){
    		
    		var request = soapEnvStart_Fines + soapHeaderStart + tibcoHeader + soapHeaderEnd +

            '<soapenv:Body>' +
            '<lag:getFines>' +
            '<lag:ticketStatus>1</lag:ticketStatus>' +
            '<lag:getFinesByPltNo>' +
            '<lag:appId>DNVAPP</lag:appId>' +
            '<lag:PlateNo>' + requestParams.plateNumber + '</lag:PlateNo>' +
            '<lag:PlateCode>' + requestParams.plateCode + '</lag:PlateCode>' +
            '<lag:PlateCategory>' + requestParams.plateCategory + '</lag:PlateCategory>' +
            '<lag:PlateSource>DXB</lag:PlateSource>' +
            '</lag:getFinesByPltNo>' +
            '</lag:getFines>' +
            '</soapenv:Body>' +

            soapEnvEnd;
	        var servicePath = '/LAGeneralFinesInquiryService';
	        var SOAPAction = 'getFinesByPltNo';
	        var requestObj = buildBody([request], true);
	
	        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
    	}else{
    		return authError;
    	}
        
        /*var result = invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);

        try {

            if (result.Envelope.Body.getFinesReturn.responseType.responseCode == 1)
                return result.Envelope.Body.getFinesReturn.responseType;
            else {
                var dom = result.Envelope.Body.getFinesReturn.beneficiaries.Beneficiary;
                var finesData = [];

                dom.forEach(function(beneficiary) { //beneficiaries

                    if (beneficiary.tickets.Ticket.length > 0) {
                        beneficiary.tickets.Ticket.forEach(function(ticket) { //tickets
                            var tktObj = {
                                "TicketNo": ticket.TicketNo,
                                "TicketFine": ticket.TicketFine,
                                "ticketType": ticket.ticketType,
                                "descriptionEn": ticket.regulations.regulation.descriptionEn,
                                "descriptionAr": ticket.regulations.regulation.descriptionAr,
                                "LocationDescription": ticket.LocationDescription,
                                "LocationDescriptionA": ticket.LocationDescriptionA,
                                "TicketDate": ticket.TicketDate,
                                "TicketTime": ticket.TicketTime,
                                "PlateNo": ticket.PlateNo,
                                "PlateCode": ticket.PlateCode,
                                "PlateCFICode": ticket.PlateCFICode,
                                "PlateCodeDescriptionEn": ticket.PlateCodeDescriptionEn,
                                "PlateCodeDescriptionAr": ticket.PlateCodeDescriptionAr,
                                "PlateCategoryCFICode": ticket.PlateCategoryCFICode,
                                "PlateCategoryDescEn": ticket.PlateCategoryDescEn,
                                "PlateCategoryDescAr": ticket.PlateCategoryDescAr
                            }

                            finesData.push(tktObj);
                        }); //end inner
                    } else {
                        var innerDom = beneficiary.tickets.Ticket;
                        var tktObj = {
                            "TicketNo": innerDom.TicketNo,
                            "TicketFine": innerDom.TicketFine,
                            "ticketType": innerDom.ticketType,
                            "descriptionEn": innerDom.regulations.regulation.descriptionEn,
                            "descriptionAr": innerDom.regulations.regulation.descriptionAr,
                            "LocationDescription": innerDom.LocationDescription,
                            "LocationDescriptionA": innerDom.LocationDescriptionA,
                            "TicketDate": innerDom.TicketDate,
                            "TicketTime": innerDom.TicketTime,
                            "PlateNo": innerDom.PlateNo,
                            "PlateCode": innerDom.PlateCode,
                            "PlateCFICode": innerDom.PlateCFICode,
                            "PlateCodeDescriptionEn": innerDom.PlateCodeDescriptionEn,
                            "PlateCodeDescriptionAr": innerDom.PlateCodeDescriptionAr,
                            "PlateCategoryCFICode": innerDom.PlateCategoryCFICode,
                            "PlateCategoryDescEn": innerDom.PlateCategoryDescEn,
                            "PlateCategoryDescAr": innerDom.PlateCategoryDescAr
                        }

                        finesData.push(tktObj);
                    }

                }); //end outer
                return {
                    "finesData": finesData
                };
            }
        } catch (e) {
            return e.message;
        }*/
    }

}


function getAuctionPlates(requestParams, isEncryptResponse, encryptionPassword) {
	
	 if (notValid(requestParams.cfiPlateCategory) || notValid(requestParams.plateNo)) {
	        return validationError;
	    } else {
	    	if (isVIP(requestParams.userID)){
	    		var request = soapEnvStart_Auction + soapHeaderStart + tibcoHeader_Auction + soapHeaderEnd +
		        '<soapenv:Body>'+
		        	'<lal:getAuctionPlatesRequest>'+
		        	'<lal:getAuctionPlatesRequestInfo>'+
		        	'<lal:appId>DNVAPP</lal:appId>'+
		        	'<lal:cfiPlateCategory>' + requestParams.cfiPlateCategory + '</lal:cfiPlateCategory>'+
		        	'<lal:plateNo>' + requestParams.plateNo  + '</lal:plateNo>'+
			        '</lal:getAuctionPlatesRequestInfo>'+
			        '</lal:getAuctionPlatesRequest>'+
			        '</soapenv:Body>'+
			        soapEnvEnd;
		    	
		    	//var request = '<soapenv:Envelope xmlns:lal="http://www.rta.ae/EIP/LALookupInquiryService/LALookupInquiryService_Schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header><wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"><wsse:UsernameToken wsu:Id="UsernameToken-11"><wsse:Username>%#credentials!#!username_tibco#%</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">%#credentials!#!password_tibco#%</wsse:Password><wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">XXPG29X6cA8zwcELdfo5GQ==</wsse:Nonce><wsu:Created>2018-09-17T06:31:35.109Z</wsu:Created></wsse:UsernameToken></wsse:Security></soapenv:Header><soapenv:Body><lal:getAuctionPlatesRequest><lal:getAuctionPlatesRequestInfo><lal:appId>DNVAPP</lal:appId><lal:cfiPlateCategory>Private</lal:cfiPlateCategory><lal:plateNo>82242</lal:plateNo></lal:getAuctionPlatesRequestInfo></lal:getAuctionPlatesRequest></soapenv:Body></soapenv:Envelope>'

		        
		        var servicePath = '/LALookupInquiryService';
		        var SOAPAction = 'getAuctionPlatesRequest';
		        var requestObj = buildBody([request], true);

		        return invokeWebServiceString(requestObj, servicePath, SOAPAction, isEncryptResponse, encryptionPassword);
	    	}else{
	    		return authError;
	    	}
	        
	       

	    } //end valid request
}

function getUserVIPDetails(requestParams, isEncryptResponse, encryptionPassword) {

    if (notValid(requestParams.username)) {
        return validationError;
    } else {

        if (isVIP(requestParams.username))
            return {
                getUserVIPProfile: getUserVIPProfile(requestParams, isEncryptResponse, encryptionPassword),
                getUserVIPVehiclePlate: getUserVIPVehiclePlate(requestParams, isEncryptResponse, encryptionPassword),
                getUserVIPPlateCircularNotes: getUserVIPPlateCircularNotes(requestParams, isEncryptResponse, encryptionPassword),
                getUserVIPPlateFines: getUserVIPPlateFines(requestParams, isEncryptResponse, encryptionPassword),
            }
        else
            return authError;
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
/*
 * Modified by Ahmed Raouf
 * 1-May-2019
 */
var Parking_USERNAME = "wifiEtisalatAdmin";
var Parking_PASSWORD = "34rth4@ur";
//var Parking_PASSWORD = "wifi@Adm1n#eTi$a1aT%$m"; //Poduction Password 
var msisdn = "971554550751";
var msisdn_new = "971554550759";
function getPlateSource() {
	try{
		var startDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateSource  | Start Date Time  : " + startDate);

		var cityRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/><soapenv:Body><ws:getPlateSourceWS><userId>'+Parking_USERNAME+'</userId><pwd>'+Parking_PASSWORD+'</pwd></ws:getPlateSourceWS></soapenv:Body></soapenv:Envelope>';

		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : cityRequest.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};

		var invocationReturn =  MFP.Server.invokeHttp(input);
		var endDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateSource  | End Date Time  : " + endDate);
		return invocationReturn ; 
	}catch(exp){
		var webServiceResult= {
				Envelope:{

					"Body":{}
		,"error":exp.toString()
		,"Header":""}
		,"totalTime":54
		,"isSuccessful":true
		,"responseHeaders":{"Date":+new Date()+",'Content-Type':'text\/xml; charset=utf-8'"}
		,"statusReason":"OK"
			,"warnings":[]
		,"errors":[]
		,"info":[]
		,"responseTime":53
		,"statusCode":200
		}
		return webServiceResult; 

	}
}

function getPlateType(sourceId){
	try{
		var startDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateType  | Start Date Time  : " + startDate);

		var typeRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/><soapenv:Body><ws:getPlateTypeWS><plateSourceID>'+sourceId+'</plateSourceID><userId>'+Parking_USERNAME+'</userId><pwd>'+Parking_PASSWORD+'</pwd></ws:getPlateTypeWS></soapenv:Body></soapenv:Envelope>';

		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : typeRequest.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};

		var invocationReturn =  MFP.Server.invokeHttp(input);
		var endDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateType  | End Date Time  : " + endDate);
		return invocationReturn ; 
	}catch(exp){
		var webServiceResult= {
				Envelope:{

					"Body":{}
		,"error":exp.toString()
		,"Header":""}
		,"totalTime":54
		,"isSuccessful":true
		,"responseHeaders":{"Date":+new Date()+",'Content-Type':'text\/xml; charset=utf-8'"}
		,"statusReason":"OK"
			,"warnings":[]
		,"errors":[]
		,"info":[]
		,"responseTime":53
		,"statusCode":200
		}
		return webServiceResult; 

	}
}

function getPlateCode(sourceId,plateId){
	try{
		var startDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateCode  | Start Date Time  : " + startDate);

		var codeRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/><soapenv:Body><ws:getPlateColorWS><plateSourceId>'+sourceId+'</plateSourceId><plateTypeId>'+plateId+'</plateTypeId><userId>'+Parking_USERNAME+'</userId><pwd>'+Parking_PASSWORD+'</pwd></ws:getPlateColorWS></soapenv:Body></soapenv:Envelope>';

		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : codeRequest.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};
		var invocationReturn =  MFP.Server.invokeHttp(input);
		var endDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateCode  | End Date Time  : " + endDate);
		return invocationReturn ; 
	}catch(exp){
		var webServiceResult= {
				Envelope:{

					"Body":{}
		,"error":exp.toString()
		,"Header":""}
		,"totalTime":54
		,"isSuccessful":true
		,"responseHeaders":{"Date":+new Date()+",'Content-Type':'text\/xml; charset=utf-8'"}
		,"statusReason":"OK"
			,"warnings":[]
		,"errors":[]
		,"info":[]
		,"responseTime":53
		,"statusCode":200
		}
		return webServiceResult; 

	}

}
function notValid(string) {
    return (!string || string == undefined || string == "" || string.length == 0 || string == "undefined");
}
function purchaseVirtualPermit(VehiclePlateColor,VehiclePlateSource,VehiclePlateNo,PlateTypeId,ZoneDrp,ParkingDuration,smartPhoneAppId,user_msisdn,language,rtaId,loyaltyId,reqSrcId){
	try{
		
		
		if (notValid(loyaltyId)){
			 loyaltyId = "0";
		}
		if (loyaltyId == "12345"){
			 loyaltyId = "0";
		}
		if (notValid(reqSrcId)){
			 reqSrcId = "0";
		}
			
		var invocationData = {
				adapter : 'parking_PurchaseVirtualPermit',
				procedure : 'purchaseVirtualPermit',
				parameters : [VehiclePlateColor,VehiclePlateSource,VehiclePlateNo,PlateTypeId,ZoneDrp,ParkingDuration,smartPhoneAppId,user_msisdn,language,rtaId,loyaltyId,reqSrcId]
		};
		return MFP.Server.invokeProcedure(invocationData);
	
	}catch(exp){
		var webServiceResult= {
				Envelope:{

					"Body":{}
		,"error":exp.toString()
		,"Header":""}
		,"totalTime":54
		,"isSuccessful":true
		,"responseHeaders":{"Date":+new Date()+",'Content-Type':'text\/xml; charset=utf-8'"}
		,"statusReason":"OK"
			,"warnings":[]
		,"errors":[]
		,"info":[]
		,"responseTime":53
		,"statusCode":200
		}
		return webServiceResult; 

	}
}

function deleteVehicle(plateColor ,plateColorId,plateNo,plateSource,plateSourceId,plateType,plateTypeId,nickName,user_msisdn){
	try{
		var startDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | deleteVehicle  | Start Date Time  : " + startDate);

		var deleteVehicle = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/">'
			+'<soapenv:Header/>'
			+'<soapenv:Body>'
			+'<ws:deleteVehicleWS>'
			+'<username>'+user_msisdn+'</username>'
			+'<password>1234</password>'
			+'<registeredVehicle>'
			+'   <!--Optional:-->'
			+'   <paymentMethod>?</paymentMethod>'
			+'   <!--Optional:-->'
			+'   <plateColor>'+plateColor+'</plateColor>'
			+'   <plateColorId>'+plateColorId+'</plateColorId>'
			+'   <!--Optional:-->'
			+'   <plateNo>'+plateNo+'</plateNo>'
			+'   <!--Optional:-->'
			+'   <plateSource>'+plateSource+'</plateSource>'
			+'   <plateSourceId>'+plateSourceId+'</plateSourceId>'
			+'   <!--Optional:-->'
			+'   <plateType>'+plateType+'</plateType>'
			+'   <plateTypeId>'+plateTypeId+'</plateTypeId>'
			+'   <!--Optional:-->'
			+'   <prefLang>0</prefLang>'
			+'   <!--Optional:-->'
			+'   <registeredBy>?</registeredBy>'
			+'   <!--Optional:-->'
			+'   <registeredVehiclePK>'
			+'      <!--Optional:-->'
			+'      <msisdn>'+user_msisdn+'</msisdn>'
			+'      <!--Optional:-->'
			+'      <nickName>'+nickName+'</nickName>'
			+'   </registeredVehiclePK>'
			+'   <!--Optional:-->'
			+'   <registrationDate>?</registrationDate>'
			+'   <!--Optional:-->'
			+'   <vehicleColor>?</vehicleColor>'
			+'   <!--Optional:-->'
			+'   <vehicleMake>?</vehicleMake>'
			+'   <!--Optional:-->'
			+'   <vehicleType>?</vehicleType>'
			+'   <!--Optional:-->'
			+'  </registeredVehicle>'
			+'<userId>'+Parking_USERNAME+'</userId>'
			+'<pwd>'+Parking_PASSWORD+'</pwd>'
			+'</ws:deleteVehicleWS>'
			+'</soapenv:Body>'
			+'</soapenv:Envelope>';

		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : deleteVehicle.toString(),
					returnedContentType : 'HTML',
				}
		};

		var invocationReturn =  MFP.Server.invokeHttp(input);
		var endDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | deleteVehicle  | End Date Time  : " + endDate);
		return invocationReturn ;
	}catch(exp){
		var webServiceResult= {
				Envelope:{

					"Body":{}
		,"error":exp.toString()
		,"Header":""}
		,"totalTime":54
		,"isSuccessful":true
		,"responseHeaders":{"Date":+new Date()+",'Content-Type':'text\/xml; charset=utf-8'"}
		,"statusReason":"OK"
			,"warnings":[]
		,"errors":[]
		,"info":[]
		,"responseTime":53
		,"statusCode":200
		}
		return webServiceResult; 

	}
}

function addVehicleApp(plateNumber,plateSource,plateType,plateCode,plateSourceId,plateTypeId,plateCodeId,nickname,user_msisdn,SmartPhoneAppId){
	try{
		var startDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | addVehicleApp  | Start Date Time  : " + startDate);

		/*prefLang is to be revised*/
		var addVehicle = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/><soapenv:Body><ws:addVehicleAppWS><smartPhoneAppId>'+SmartPhoneAppId+'</smartPhoneAppId><registeredVehicle>'
		+'<!--Optional:-->'
		+'<paymentMethod>?</paymentMethod>'
		+'<!--Optional:-->'
		+'<plateColor>'+plateCode+'</plateColor>'
		+'<plateColorId>'+plateCodeId+'</plateColorId>'
		+'<!--Optional:-->'
		+'<plateNo>'+plateNumber+'</plateNo>'
		+'<!--Optional:-->'
		+'<plateSource>'+plateSource+'</plateSource>'
		+'<plateSourceId>'+plateSourceId+'</plateSourceId>'
		+'<!--Optional:-->'
		+'<plateType>'+plateType+'</plateType>'
		+'<plateTypeId>'+plateTypeId+'</plateTypeId>'
		+'<!--Optional:-->'
		+'<prefLang>0</prefLang>'
		+'<!--Optional:-->'
		+'<registeredBy>?</registeredBy>'
		+'<!--Optional:-->'
		+'<registeredVehiclePK>'
		+'<!--Optional:-->'
		+'<msisdn>'+user_msisdn+'</msisdn>'
		+'<!--Optional:-->'
		+' <nickName>'+nickname+'</nickName>'
		+'</registeredVehiclePK>'
		+'<!--Optional:-->'
		+'<registrationDate>?</registrationDate>'
		+'<!--Optional:-->'
		+'<vehicleColor>?</vehicleColor>'
		+'<!--Optional:-->'
		+'<vehicleMake>?</vehicleMake>'
		+'<!--Optional:-->'
		+'<vehicleType>?</vehicleType>'
		+'<!--Optional:-->'
		+' </registeredVehicle>'
		+'<userId>'+Parking_USERNAME+'</userId>'
		+'<pwd>'+Parking_PASSWORD+'</pwd>'
		+'</ws:addVehicleAppWS>'
		+'</soapenv:Body>'
		+'</soapenv:Envelope>';

		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : addVehicle.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};
		var invocationReturn =  MFP.Server.invokeHttp(input);
		var endDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | addVehicleApp  | End Date Time  : " + endDate);
		return invocationReturn ;return MFP.Server.invokeHttp(input);
	}catch(exp){
		var webServiceResult= {
				Envelope:{

					"Body":{}
		,"error":exp.toString()
		,"Header":""}
		,"totalTime":54
		,"isSuccessful":true
		,"responseHeaders":{"Date":+new Date()+",'Content-Type':'text\/xml; charset=utf-8'"}
		,"statusReason":"OK"
			,"warnings":[]
		,"errors":[]
		,"info":[]
		,"responseTime":53
		,"statusCode":200
		}
		return webServiceResult; 

	}
}
function getParkingZone(){
	try{
		var startDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | getParkingZone  | Start Date Time  : " + startDate);

		//MFP.Logger.debug("Creating SOAP Request ");
		var getZone = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/><soapenv:Body><ws:getParkingZoneWS><status>A</status><userId>'+Parking_USERNAME+'</userId><pwd>'+Parking_PASSWORD+'</pwd></ws:getParkingZoneWS></soapenv:Body></soapenv:Envelope>';

		//MFP.Logger.warn(getZone);

		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : getZone.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};

		var invocationReturn =  MFP.Server.invokeHttp(input);
		var endDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | getParkingZone  | End Date Time  : " + endDate);
		return invocationReturn ;return MFP.Server.invokeHttp(input);
	}catch(exp){
		var webServiceResult= {
				Envelope:{

					"Body":{}
		,"error":exp.toString()
		,"Header":""}
		,"totalTime":54
		,"isSuccessful":true
		,"responseHeaders":{"Date":+new Date()+",'Content-Type':'text\/xml; charset=utf-8'"}
		,"statusReason":"OK"
			,"warnings":[]
		,"errors":[]
		,"info":[]
		,"responseTime":53
		,"statusCode":200
		}
		return webServiceResult; 

	}
}
function getVehicle(mobile){
	try{
		var startDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | getVehicle  | Start Date Time  : " + startDate);

		//MFP.Logger.debug("Creating SOAP Request ");
		var getVehicle = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/><soapenv:Body><ws:getVehicleWS><username>'+mobile+'</username><password>1234</password><userId>'+Parking_USERNAME+'</userId><pwd>'+Parking_PASSWORD+'</pwd></ws:getVehicleWS></soapenv:Body></soapenv:Envelope>';

		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : getVehicle.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};

		var invocationReturn =  MFP.Server.invokeHttp(input);
		if(invocationReturn.Envelope.Body.getVehicleWSResponse["return"].webUser.password){
			invocationReturn.Envelope.Body.getVehicleWSResponse["return"].webUser.password="";
		}
		var endDate = new Date() ; 
		//MFP.Logger.warn("|parking_VehicleParkingAdapter | getVehicle  | End Date Time  : " + endDate);
		
		return invocationReturn ;return MFP.Server.invokeHttp(input);
	}catch(exp){
		var webServiceResult= {
				Envelope:{

					"Body":{}
		,"error":exp.toString()
		,"Header":""}
		,"totalTime":54
		,"isSuccessful":true
		,"responseHeaders":{"Date":+new Date()+",'Content-Type':'text\/xml; charset=utf-8'"}
		,"statusReason":"OK"
			,"warnings":[]
		,"errors":[]
		,"info":[]
		,"responseTime":53
		,"statusCode":200
		}
		return webServiceResult; 

	}
}

function getPlateTypeWSV2() {
    try {
        var startDate = new Date();
        var req = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ws:getPlateTypeWSV2>' +
            '<userId>' + Parking_USERNAME + '</userId>' +
            '<pwd>' + Parking_PASSWORD + '</pwd>' +
            '</ws:getPlateTypeWSV2>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateTypeWSV2  | Start Date Time  : " + startDate + "  | Request: " + JSON.stringify(req));

        var input = {
            method: 'post',
            returnedContentType: 'HTML',
            path: '/mParkingSmartPhoneWS/smartPhoneWS',
            body: {
                content: req.toString(),
                contentType: 'text/xml; charset=utf-8'
            }
        };

        var invocationReturn = MFP.Server.invokeHttp(input);
        if (invocationReturn.Envelope.Body.getPlateTypeWSV2Response["return"].webUser && invocationReturn.Envelope.Body.getPlateTypeWSV2Response["return"].webUser.password) {
            invocationReturn.Envelope.Body.getPlateTypeWSV2Response["return"].webUser.password = "";
        }
        var endDate = new Date();
        MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateTypeWSV2  | End Date Time  : " + endDate + "  | Response: " + JSON.stringify(invocationReturn));

        return invocationReturn;
    } catch (exp) {
        var webServiceResult = {
            Envelope: {

                "Body": {},
                "error": exp.toString(),
                "Header": ""
            },
            "totalTime": 54,
            "isSuccessful": true,
            "responseHeaders": {
                "Date": +new Date() + ",'Content-Type':'text\/xml; charset=utf-8'"
            },
            "statusReason": "OK",
            "warnings": [],
            "errors": [],
            "info": [],
            "responseTime": 53,
            "statusCode": 200
        }
        return webServiceResult;

    }
}

function getPlateSourceByPlateTypeIdWSV2(plateTypeId) {
    try {
        var startDate = new Date();
        var req = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ws:getPlateSourceByPlateTypeIdWSV2>' +
            '<plateTypeId>' + plateTypeId + '</plateTypeId>' +
            '<userId>' + Parking_USERNAME + '</userId>' +
            '<pwd>' + Parking_PASSWORD + '</pwd>' +
            '</ws:getPlateSourceByPlateTypeIdWSV2>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateSourceByPlateTypeIdWSV2  | Start Date Time  : " + startDate + "  | Request: " + JSON.stringify(req));
        var input = {
            method: 'post',
            returnedContentType: 'HTML',
            path: '/mParkingSmartPhoneWS/smartPhoneWS',
            body: {
                content: req.toString(),
                contentType: 'text/xml; charset=utf-8'
            }
        };

        var invocationReturn = MFP.Server.invokeHttp(input);
        if (invocationReturn.Envelope.Body.getPlateSourceByPlateTypeIdWSV2Response["return"].webUser && invocationReturn.Envelope.Body.getPlateSourceByPlateTypeIdWSV2Response["return"].webUser.password) {
            invocationReturn.Envelope.Body.getPlateSourceByPlateTypeIdWSV2Response["return"].webUser.password = "";
        }
        var endDate = new Date();
        MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateSourceByPlateTypeIdWSV2  | End Date Time  : " + endDate + "  | Response: " + JSON.stringify(invocationReturn));

        return invocationReturn;
    } catch (exp) {
        var webServiceResult = {
            Envelope: {

                "Body": {},
                "error": exp.toString(),
                "Header": ""
            },
            "totalTime": 54,
            "isSuccessful": true,
            "responseHeaders": {
                "Date": +new Date() + ",'Content-Type':'text\/xml; charset=utf-8'"
            },
            "statusReason": "OK",
            "warnings": [],
            "errors": [],
            "info": [],
            "responseTime": 53,
            "statusCode": 200
        }
        return webServiceResult;

    }
}

function getPlateColorWSV2(plateSourceId, plateTypeId) {
    try {
        var startDate = new Date();
        var req = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ws:getPlateColorWSV2>' +
            '<plateSourceId>' + plateSourceId + '</plateSourceId>' +
            '<plateTypeId>' + plateTypeId + '</plateTypeId>' +
            '<userId>' + Parking_USERNAME + '</userId>' +
            '<pwd>' + Parking_PASSWORD + '</pwd>' +
            '</ws:getPlateColorWSV2>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateColorWSV2  | Start Date Time  : " + startDate + "  | Request: " + JSON.stringify(req));
        var input = {
            method: 'post',
            returnedContentType: 'HTML',
            path: '/mParkingSmartPhoneWS/smartPhoneWS',
            body: {
                content: req.toString(),
                contentType: 'text/xml; charset=utf-8'
            }
        };

        var invocationReturn = MFP.Server.invokeHttp(input);
        if (invocationReturn.Envelope.Body.getPlateColorWSV2Response["return"].webUser && invocationReturn.Envelope.Body.getPlateColorWSV2Response["return"].webUser.password) {
            invocationReturn.Envelope.Body.getPlateColorWSV2Response["return"].webUser.password = "";
        }
        var endDate = new Date();
        MFP.Logger.warn("|parking_VehicleParkingAdapter | getPlateColorWSV2  | End Date Time  : " + endDate + "  | Response: " + JSON.stringify(invocationReturn));

        return invocationReturn;
    } catch (exp) {
        var webServiceResult = {
            Envelope: {

                "Body": {},
                "error": exp.toString(),
                "Header": ""
            },
            "totalTime": 54,
            "isSuccessful": true,
            "responseHeaders": {
                "Date": +new Date() + ",'Content-Type':'text\/xml; charset=utf-8'"
            },
            "statusReason": "OK",
            "warnings": [],
            "errors": [],
            "info": [],
            "responseTime": 53,
            "statusCode": 200
        }
        return webServiceResult;

    }
}
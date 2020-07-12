var Parking_USERNAME = "wifiEtisalatAdmin";
var Parking_PASSWORD = "34rth4@ur";
//var Parking_PASSWORD = "wifi@Adm1n#eTi$a1aT%$m";    // Production
/*var SmartPhoneAppId = "17240470";
var msisdn = "971554550751";
var msisdn_new = "971554550759";*/

function getTopupHistory(smartPhoneId){
	try{
		var getTopupHistory = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/><soapenv:Body><ws:getTopupHistoryApp><smartPhoneAppId>'+smartPhoneId+'</smartPhoneAppId><paymentMethod>?</paymentMethod><userId>'+Parking_USERNAME+'</userId><pwd>'+Parking_PASSWORD+'</pwd></ws:getTopupHistoryApp></soapenv:Body></soapenv:Envelope>';
		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : getTopupHistory.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};

		return MFP.Server.invokeHttp(input);
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

function getVehicle(msisdn){
	try{
		//MFP.Logger.debug("Creating SOAP Request ");
		var getVehicle = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/><soapenv:Body><ws:getVehicleWS><username>'+msisdn+'</username><password>1234</password><userId>'+Parking_USERNAME+'</userId><pwd>'+Parking_PASSWORD+'</pwd></ws:getVehicleWS></soapenv:Body></soapenv:Envelope>';

		//MFP.Logger.warn(getVehicle);

		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : getVehicle.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};

		return MFP.Server.invokeHttp(input);
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
function getTicketHistory(smartPhoneAppId){
	try{
		var getTicketHistory = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/><soapenv:Body><ws:getTicketHistoryApp><smartPhoneAppId>'+smartPhoneAppId+'</smartPhoneAppId><plateSourceId>?</plateSourceId><plateTypeId>?</plateTypeId><plateColorId>?</plateColorId><userId>'+Parking_USERNAME+'</userId><pwd>'+Parking_PASSWORD+'</pwd></ws:getTicketHistoryApp></soapenv:Body></soapenv:Envelope>';

		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : getTicketHistory.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};

		return MFP.Server.invokeHttp(input);
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
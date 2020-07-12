var Parking_USERNAME = "wifiEtisalatAdmin";
var Parking_PASSWORD = "34rth4@ur";
//var Parking_PASSWORD = "wifi@Adm1n#eTi$a1aT%$m";  // Production 

function initiateEPayTxn(amount,linkageId,msisdn){
	try{
		var initiateEPayTxn = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/">'
			+'<soapenv:Header/>'
			+'<soapenv:Body>'
			+'<ws:initiateEpayTxn>'
			+'<userId>'+Parking_USERNAME+'</userId>'
			+'<pwd>'+Parking_PASSWORD+'</pwd>'
			+'<msisdn>'+msisdn+'</msisdn>'
			+'<smartPhoneAppId>'+linkageId+'</smartPhoneAppId>'
			+'<amount>'+amount+'</amount>'
			+'</ws:initiateEpayTxn>'
			+'</soapenv:Body>'
			+'</soapenv:Envelope>';
		MFP.Logger.warn("initiateEPayTxn request |" + initiateEPayTxn);
		
		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : initiateEPayTxn.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};
		var result =MFP.Server.invokeHttp(input);
		MFP.Logger.warn("initiateEPayTxn response |" + JSON.stringify(result));
		return result ;
	
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
		MFP.Logger.warn("initiateEPayTxn response error |" + JSON.stringify(webServiceResult));
		return webServiceResult; 
		
	}
}


function completeEpayTxn(transactionId,status,linkageId,msisdn){
	try{
		var completeEPayTxn = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/">'
			+'<soapenv:Header/>'
			+'<soapenv:Body>'
			+'<ws:completeEpayTxn>'
			+'<userId>'+Parking_USERNAME+'</userId>'
			+'<pwd>'+Parking_PASSWORD+'</pwd>'
			+'<msisdn>'+msisdn+'</msisdn>'
			+'<smartPhoneAppId>'+linkageId+'</smartPhoneAppId>'
			+'<epayTxnId>'+transactionId+'</epayTxnId>'
			+'<status>'+status+'</status>'
			+'</ws:completeEpayTxn>'
			+'</soapenv:Body>'
			+'</soapenv:Envelope>';
		MFP.Logger.warn("completeEpayTxn request |" + completeEPayTxn);
		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : completeEPayTxn.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};
		var result= MFP.Server.invokeHttp(input);
		MFP.Logger.warn("completeEPayTxn response |" + JSON.stringify(result));
		return result;
		
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
		MFP.Logger.warn("completeEPayTxn response error | " + JSON.stringify(webServiceResult));
		return webServiceResult; 
		
	}
}

function initiateMPayTxn(amount,linkageId,msisdn){
	try{
		var initiateMPayTxn = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/">'
			+'<soapenv:Header/>'
			+'<soapenv:Body>'
			+'<ws:initiateMpayTxn>'
			+'<userId>'+Parking_USERNAME+'</userId>'
			+'<pwd>'+Parking_PASSWORD+'</pwd>'
			+'<msisdn>'+msisdn+'</msisdn>'
			+'<smartPhoneAppId>'+linkageId+'</smartPhoneAppId>'
			+'<amount>'+amount+'</amount>'
			+'</ws:initiateMpayTxn>'
			+'</soapenv:Body>'
			+'</soapenv:Envelope>';
		
		MFP.Logger.warn("initiateMPayTxn request |" + initiateMPayTxn);

		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : initiateMPayTxn.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};
		var result =MFP.Server.invokeHttp(input);
		MFP.Logger.warn("initiateMPayTxn response | " + JSON.stringify(result));
		return result;
		
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
		MFP.Logger.warn("initiateMPayTxn response error | " + JSON.stringify(webServiceResult));
		return webServiceResult; 
		
	}
}






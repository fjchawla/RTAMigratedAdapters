var Parking_USERNAME = "wifiEtisalatAdmin";
var Parking_PASSWORD = "34rth4@ur";
//var Parking_PASSWORD = "wifi@Adm1n#eTi$a1aT%$m";  // Production 


function topUpBySmartPhoneApp(amount,linkageId){
	try{
	var topUpAmount = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/><soapenv:Body><ws:topUpBySmartPhoneApp><userId>'+Parking_USERNAME+'</userId><pwd>'+Parking_PASSWORD+'</pwd><smartPhoneAppId>'+linkageId+'</smartPhoneAppId><topUpAmount>'+amount+'</topUpAmount></ws:topUpBySmartPhoneApp></soapenv:Body></soapenv:Envelope>';

	var input = {
		method : 'post',
		returnedContentType : 'HTML',
		path : '/mParkingSmartPhoneWS/smartPhoneWS',
		body : {
			content : topUpAmount.toString(),
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
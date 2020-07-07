var Parking_USERNAME = "wifiEtisalatAdmin";
var Parking_PASSWORD = "34rth4@ur";
//var Parking_PASSWORD = "wifi@Adm1n#eTi$a1aT%$m"; // Production
//var SmartPhoneAppId = "17240470";

function getActiveVPBySmartPhoneAppId(smartPhoneAppId){
	try{
	MFP.Logger.warn(smartPhoneAppId);
	var getActiveTickets = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.mobileapp.infocomm.com/"><soapenv:Header/><soapenv:Body><ws:getActiveVPBySmartPhoneAppId><userId>'+Parking_USERNAME+'</userId><pwd>'+Parking_PASSWORD+'</pwd><smartPhoneAppId>'+smartPhoneAppId+'</smartPhoneAppId></ws:getActiveVPBySmartPhoneAppId></soapenv:Body></soapenv:Envelope>';
	MFP.Logger.warn("getActiveVPBySmartPhoneAppId Request : " + getActiveTickets.toString() );
	var input = {
			method : 'post',
			returnedContentType : 'HTML',
			path : '/mParkingMobileWS/ActiveTicketService', 
			body : {
				content : getActiveTickets.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
		};
		var webServiceResult = MFP.Server.invokeHttp(input);
		var responseString = JSON.stringify(webServiceResult);
		
		MFP.Logger.warn("getActiveVPBySmartPhoneAppId Response : " + responseString);
		return webServiceResult;
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
		
		MFP.Logger.warn("getActiveVPBySmartPhoneAppId Response : " + webServiceResult);
		return webServiceResult; 

	}
}
var Parking_USERNAME = "wifiEtisalatAdmin";
var Parking_PASSWORD = "34rth4@ur";
//var Parking_PASSWORD = "wifi@Adm1n#eTi$a1aT%$m";    // Production
var TEMP_MOBILE="971555033275";
function linkRtaUser(msisdn,linkageId,emailId){
	try{
		var rtaUser = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/">'
			+'<soapenv:Header/>'
			+'<soapenv:Body>'
			+'<ws:linkRtaWebUserWS>'
			+'<webUser>'
			+'  <!--Optional:-->'
			+'   <dob>?</dob>'
			+' <!--Optional:-->'
			+' <educationLevel>?</educationLevel>'
			+' <!--Optional:-->'
			+' <email>'+emailId+'</email>'
			+' <!--Optional:-->'
			+' <firstName>?</firstName>'
			+' <!--Optional:-->'
			+' <lastName>?</lastName>'
			+' <!--Optional:-->'
			+' <lastUpdated>?</lastUpdated>'
			+' <!--Optional:-->'
			+' <msisdn>'+msisdn+'</msisdn>'
			+' <!--Optional:-->'
			+' <nationality>?</nationality>'
			+' <!--Optional:-->'
			+'<occupation>?</occupation>'
			+' <!--Optional:-->'
			+' <password>?</password>'
			+' <!--Optional:-->'
			+' <pwdChangeRequired>?</pwdChangeRequired>'
			+'   <!--Optional:-->'
			+'  <registeredBy>?</registeredBy>'
			+'   <!--Optional:-->'
			+'   <registrationDate>?</registrationDate>'
			+'   <!--Optional:-->'
			+'   <securityCode>?</securityCode>'
			+'   <!--Optional:-->'
			+'   <sendMktAlerts>?</sendMktAlerts>'
			+'   <!--Optional:-->'
			+'   <smartPhoneAppId>'+linkageId+'</smartPhoneAppId>'
			+'   <!--Optional:-->'
			+'   <status>?</status>'
			+'</webUser>'
			+'<userId>'+Parking_USERNAME+'</userId>'
			+'<pwd>'+Parking_PASSWORD+'</pwd>'
			+'</ws:linkRtaWebUserWS>'
			+'</soapenv:Body>'
			+'</soapenv:Envelope>';

		var input = {
				method : 'post',
				returnedContentType : 'HTML',
				path : '/mParkingSmartPhoneWS/smartPhoneWS',
				body : {
					content : rtaUser.toString(),
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
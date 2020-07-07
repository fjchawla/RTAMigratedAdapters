var Parking_USERNAME = "wifiEtisalatAdmin";
//var Parking_PASSWORD = "wifi@Adm1n#eTi$a1aT%$m";   // Production
var Parking_PASSWORD = "34rth4@ur";
var msisdn = "971554550751";
var msisdn_new = "971554550759";

function deleteVehicle(plateColor ,plateColorId,plateNo,plateSource,plateSourceId,plateType,plateTypeId,nickName,user_msisdn){
	try{
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
var Parking_USERNAME = "wifiEtisalatAdmin";
var Parking_PASSWORD = "34rth4@ur";
//var Parking_PASSWORD = "wifi@Adm1n#eTi$a1aT%$m"; //Poduction Password 
var msisdn = "971554550751";
var msisdn_new = "971554550759";

function notValid(string) {
    return (!string || string == undefined || string == "" || string.length == 0 || string == "undefined");
}
function purchaseVirtualPermit(VehiclePlateColor,VehiclePlateSource,VehiclePlateNo,PlateTypeId,ZoneDrp,ParkingDuration,smartPhoneAppId,user_msisdn,language,rtaId,loyaltyId,reqSrcId){
	try{
		
		
		//1.	RTA Dubai App = 1
		//2.	Dubai Drive = 2
		//3.	Chatbot App = 3
		//4. 	Default = 0 

		var startDate = new Date() ; 
		

		if (notValid(loyaltyId)){
			 loyaltyId = "0";
		}
		if (loyaltyId == "12345"){
			 loyaltyId = "0";
		}
		if (notValid(reqSrcId)){
			 reqSrcId = "0";
		}
		
		
		
		var purchasePermitRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.mobileapp.infocomm.com"><soapenv:Body><ws:purchaseVirtualPermit><ws:userId>'+Parking_USERNAME+'</ws:userId><ws:pwd>'+Parking_PASSWORD+'</ws:pwd><ws:smartPhoneAppId>'+smartPhoneAppId+'</ws:smartPhoneAppId><ws:msisdn>'+user_msisdn+'</ws:msisdn><ws:lang>'+language+'</ws:lang><ws:plateNo>'+VehiclePlateNo+'</ws:plateNo><ws:plateSourceId>'+VehiclePlateSource+'</ws:plateSourceId><ws:plateTypeId>'+PlateTypeId+'</ws:plateTypeId><ws:plateColorId>'+VehiclePlateColor+'</ws:plateColorId><ws:zoneNo>'+ZoneDrp+'</ws:zoneNo><ws:duration>'+ParkingDuration+'</ws:duration>'+
		'<ws:rtaPortalId>'+rtaId+'</ws:rtaPortalId>'+
		'<ws:loyaltyId>'+loyaltyId+'</ws:loyaltyId>'+
		'<ws:reqSrcId>'+reqSrcId+'</ws:reqSrcId>'+
		'</ws:purchaseVirtualPermit></soapenv:Body></soapenv:Envelope>';

		MFP.Logger.warn("|parking_PurchaseVirtualPermit | purchaseVirtualPermit  | Request  : " + purchasePermitRequest);

		var input = {

				method : 'post',
				returnedContentType : 'HTML',
				headers: {
					SOAPAction: ''
				},
				path : '/mParkingMobileAxisWS/services/PurchaseTicketService',
				body : {
					content : purchasePermitRequest.toString(),
					contentType : 'text/xml; charset=utf-8'
				}
		};
		var invocationReturn =  MFP.Server.invokeHttp(input);
		var endDate = new Date() ; 
		MFP.Logger.warn("|parking_PurchaseVirtualPermit | purchaseVirtualPermit  | Response  : " + JSON.stringify(invocationReturn));
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


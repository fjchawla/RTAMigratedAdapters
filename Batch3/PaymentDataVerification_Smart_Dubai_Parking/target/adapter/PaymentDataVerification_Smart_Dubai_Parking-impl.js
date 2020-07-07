
//Vendors should implement the stub function below to verify 
//amount in backend and  return 'dataVerified' with the verification status
//paymentType: EPAT, MPAY
function verifyData(token,sptrn,amount, edata, paymentType,ServiceID) {
	MFP.Logger.warn("|PaymentDataVerification_Smart_Dubai_Parking |verifyData  | ServiceID" + ServiceID);
	if(token == MFP.Server.getPropertyValue("tokens.recentActivities")){
		MFP.Logger.warn("|PaymentDataVerification_Smart_Dubai_Parking |verifyData  | ServiceID" + ServiceID);
		//var pos = sptrn.indexOf("PRKE");
		if(ServiceID == "5000"){  // For Smart Seasonal 
			return {
				dataVerified: true
			};
		}else{
			MFP.Logger.warn("|PaymentDataVerification_Smart_Dubai_Parking |verifyData  | Amount : " + amount + ", sptrn: "+sptrn);
			var result = checkSptrnAndAmount(sptrn,amount);
			if(result.statusCode == 200){
				MFP.Logger.warn("|PaymentDataVerification_Smart_Dubai_Parking |verifyData  | statusCode : " + result.statusCode);
				if(typeof(result.Envelope.Body.verifyTransactionResponse["return"].statusCode) != "undefined"){
					if(result.Envelope.Body.verifyTransactionResponse["return"].statusCode=="2002"){
						return {
								dataVerified: true
							};
						}else{
							MFP.Logger.warn("|PaymentDataVerification_Smart_Dubai_Parking |verifyData  | dataVerified : Invalid amount or transaction number " + result.Envelope.Body.verifyTransactionResponse["return"]);
							return {
								error: result.Envelope.Body.verifyTransactionResponse["return"],
								dataVerified: false
							};
						}
				}else{
					MFP.Logger.warn("|PaymentDataVerification_Smart_Dubai_Parking |verifyData  | dataVerified : Invalid amount or transaction number 2 " + result.Envelope.Body.verifyTransactionResponse["return"]);
					return {
						error: 'Invalid amount or transaction number',
						dataVerified: false
					};
				}
			}
			else{
				MFP.Logger.warn("|PaymentDataVerification_Smart_Dubai_Parking |verifyData  | dataVerified : Invalid amount or transaction number 3" + result.Envelope.Body.verifyTransactionResponse["return"]);
				return {
					error: 'Invalid amount or transaction number',
					dataVerified: false
				};
			}	
		}
	}
	else{
		return {
			error: 'Invalid token',
			dataVerified: false
		};
	}
}


var Parking_USERNAME = "wifiEtisalatAdmin";
var Parking_PASSWORD = "wifi@Adm1n#eTi$a1aT%$m";
//var SmartPhoneAppId = "17240470";

function checkSptrnAndAmount(sptrn,amount){
	
	var getUserBalance ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/">'
		 +'<soapenv:Header/>'
		 +'<soapenv:Body>'
	     +'<ws:verifyTransaction>'
	     +'<userId>'+Parking_USERNAME+'</userId>'
	     +'<pwd>'+Parking_PASSWORD+'</pwd>'
	     +'<txnId>'+sptrn+'</txnId>'
	     +'<amount>'+amount+'</amount>'
	     +'</ws:verifyTransaction>'    
	     +'</soapenv:Body>'
	     +'</soapenv:Envelope>';
	    
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		path : '/mParkingSmartPhoneWS/smartPhoneWS',
		body : {
			content : getUserBalance.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};

	return MFP.Server.invokeHttp(input);
}

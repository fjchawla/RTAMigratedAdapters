/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var Parking_USERNAME = "wifiEtisalatAdmin";
//var Parking_PASSWORD = "wifi@Adm1n#eTi$a1aT%$m";   // Production 
var Parking_PASSWORD = "34rth4@ur";

function getParkingAvailabliltyByZone(dataObject){
 try{
	 //{"zoneNo":"335A"}
 var getParkingAvailabliltyRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/>'
	 	  +'<soapenv:Body><ws:getParkingAvailabliltyByZone>'
          +'<zoneNo>'+dataObject.zoneNo+'</zoneNo>'
          +'<userId>'+Parking_USERNAME+'</userId>'
          +'<pwd>'+Parking_PASSWORD+'</pwd>'
          +'</ws:getParkingAvailabliltyByZone>'
          +'</soapenv:Body>'
          +'</soapenv:Envelope>';
 MFP.Logger.warn("getParkingAvailabliltyByZone request | " + getParkingAvailabliltyRequest)
 var input = {  
   method : 'post',
   headers :{
		"SOAPAction" : ""
	},
   returnedContentType : 'HTML',
   path : '/mParkingSmartPhoneWS/smartPhoneWS',
   body : {
    content : getParkingAvailabliltyRequest.toString(),
    contentType : 'text/xml; charset=utf-8'
   }
  };

  
  var result_getParkingAvailablilty =  MFP.Server.invokeHttp(input);
 
  MFP.Logger.warn("getParkingAvailabliltyByZone result | " +  JSON.stringify(result_getParkingAvailablilty))
  return result_getParkingAvailablilty
 
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
		 MFP.Logger.warn("getParkingAvailabliltyByZone result | " +  JSON.stringify(webServiceResult))
		return webServiceResult; 

	}
}

function purchaseSelfValetVP(dataObject){
	 try{
		 
		var invocationData = {
				adapter : 'parking_PurchasesmartVipReservationAdapter',
				procedure : 'purchaseSelfValetVP',
				parameters : [dataObject]
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
				MFP.Logger.warn("result_purchaseSelfValetVPRequest result | " + JSON.stringify(webServiceResult))
				return webServiceResult; 

			}
}

function checkIn ( dataObject){
	 try{
		 
		 //{"virtualPermitId":"","checkedInBy":""}
	 var checkInRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/>'
		 	 
		      +'<soapenv:Body><ws:checkIn>'
		      
		      +'<virtualPermitId>'+dataObject.virtualPermitId+'</virtualPermitId>'
		      +'<slotNo>0</slotNo>'
		      +' <checkedInBy>'+dataObject.checkedInBy+'</checkedInBy>'
		      +' <checkedInOn>'+getCurrentDate()+'</checkedInOn>'
	          +'<userId>'+Parking_USERNAME+'</userId>'
	          +'<pwd>'+Parking_PASSWORD+'</pwd>'
	          +'</ws:checkIn>'
	          
	          +'</soapenv:Body>'
	          +'</soapenv:Envelope>';
	 
		MFP.Logger.warn("checkInRequest request | " + checkInRequest)
	 var input = {  
	   method : 'post',
	   headers :{
			"SOAPAction" : ""
		},
	   returnedContentType : 'HTML',
	   path : '/mParkingSmartPhoneWS/smartPhoneWS',
	   body : {
	    content : checkInRequest.toString(),
	    contentType : 'text/xml; charset=utf-8'
	   }
	  };
		var response_checkIn = MFP.Server.invokeHttp(input);
		MFP.Logger.warn("checkInRequest response | " +  JSON.stringify(response_checkIn))
	  return response_checkIn
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
			MFP.Logger.warn("checkInRequest response | " + JSON.stringify(webServiceResult))
			return webServiceResult; 

		}
	}

function checkOut (dataObject){
	//{"virtualPermitId":"","checkedOutBy":""}
	 try{
	 var checkOutRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.smartphone.infocomm.com/"><soapenv:Header/>'
		 	 
		      +'<soapenv:Body><ws:checkOut>'
		      
		      +'<virtualPermitId>'+dataObject.virtualPermitId+'</virtualPermitId>'
		      +' <checkedOutBy>'+dataObject.checkedOutBy+'</checkedOutBy>'
		      +' <checkedOutOn>'+getCurrentDate()+'</checkedOutOn>'
	          +'<userId>'+Parking_USERNAME+'</userId>'
	          +'<pwd>'+Parking_PASSWORD+'</pwd>'
	          +'</ws:checkOut>'
	          
	          +'</soapenv:Body>'
	          +'</soapenv:Envelope>';
	 MFP.Logger.warn("checkOut request | " + checkOutRequest)
	 var input = {  
	   method : 'post',
	   headers :{
			"SOAPAction" : ""
		},
	   returnedContentType : 'HTML',
	   path : '/mParkingSmartPhoneWS/smartPhoneWS',
	   body : {
	    content : checkOutRequest.toString(),
	    contentType : 'text/xml; charset=utf-8'
	   }
	  };
	 var checkOutResponse = MFP.Server.invokeHttp(input);
	 MFP.Logger.warn(" checkOut response | " + JSON.stringify(checkOutResponse))
	  return checkOutResponse
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
			MFP.Logger.warn(" checkOut response | " + JSON.stringify(webServiceResult))
			return webServiceResult; 

		}
	}

function getCurrentDate(){
	
	var date = new Date();
	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hour = date.getHours();

	var year = date.getFullYear();
	var month = date.getMonth() + 1; 
	var day = date.getDate();   
	
	var fullDate = year +"-"+month+"-"+day+" "+hour+":"+minutes +":"+seconds
	
	return fullDate;
}
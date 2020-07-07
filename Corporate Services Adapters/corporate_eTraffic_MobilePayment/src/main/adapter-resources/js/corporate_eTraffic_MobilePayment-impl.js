var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;
/**
 * this transaction adds a new transaction on payment log table through setTransactionData web method.
 * The transaction is logged as pending (status = 0)
 * @param transactionId
 * @param data
 */
function setTransactionData(data){
	MFP.Logger.info(data);
	transactionId = data.transactionId;
	status = data.status;
	cData = JSON.stringify(data.cData);
	
	MFP.Logger.info("transaction ID = "+transactionId);
	var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/schemas/MobilityPaymentLogService/Schema.xsd">\
   <soapenv:Header>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
    <wsse:UsernameToken>\
			<wsse:Username>'+tibcoUsername+'</wsse:Username>\
			<wsse:Password>'+tibocPwd+'</wsse:Password>\
         </wsse:UsernameToken>\
      </wsse:Security>\
   <sch:header>\
            <sch:clientUsername>'+EXTERNAL_USERNAME+'</sch:clientUsername>\
            <sch:clientPassword>'+EXTERNAL_PASSWORD+'</sch:clientPassword>\
         </sch:header>\
         </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:setTransactionData>\
	         <sch:transactionId>'+transactionId+'</sch:transactionId>\
	         <sch:paymentStatus>'+status+'</sch:paymentStatus>\
	         <sch:cData>'+cData+'</sch:cData>\
	      </sch:setTransactionData>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

	MFP.Logger.info(request);
	var path = 'mobilitypaymentlogservice';
	var input = {
		method : 'POST',
		returnedContentType : 'xml',
		path : path,
		body : {
			content : request.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.info(response);
	
	var success = false ;
	try{
		
		var success = response.Envelope.Body.setTransactionDataReturn.responseDescription == 'Success' ;
	}catch(e){MFP.Logger.info(e);}
	
	return {
		isSuccessful : success,
		reference : response
	};
	
	//cData is returned as a String but inside there is a JSON js. We parse this JSON and return it in the response it self. 
	return response ;
}
//39825023
function getPendingTransaction(data){
	transactionId = data.transactionId;
	var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/schemas/MobilityPaymentLogService/Schema.xsd">\
		   <soapenv:Header>\
	    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
	            <wsse:Username>'+tibcoUsername+'</wsse:Username>\
			<wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
	   <sch:header>\
	            <sch:clientUsername>Omnix_user</sch:clientUsername>\
	            <sch:clientPassword>mfurmdz</sch:clientPassword>\
	         </sch:header>\
	         </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:getByTransactionId>\
	         <sch:transactionId>'+transactionId+'</sch:transactionId>\
	      </sch:getByTransactionId>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

	var path = 'mobilitypaymentlogservice';
	var input = {
		method : 'POST',
		returnedContentType : 'xml',
		path : path,
		body : {
			content : request.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	
//	MFP.Logger.info(response);
//	return response ;
	
	
	if(response.Envelope.Body != undefined && response.Envelope.Body.getByTransactionIdReturn != undefined && response.Envelope.Body.getByTransactionIdReturn.responseCode == '1'){
		var cData = response.Envelope.Body.getByTransactionIdReturn.serviceTransaction.cData ;
		var jsonDetails = JSON.parse(cData);
		return {
			isSuccessful : true,
			status : response.Envelope.Body.getByTransactionIdReturn.serviceTransaction.paymentStatus,
			transactionId :transactionId,
			cData : jsonDetails
		};
	}else{
		return {
			isSuccessful : false
		};
	}
	
//	return {
//		isSuccessful : true,
//		status : "0", //success
//		transactionId : transactionId ,
//		cData : {
//			paymentMethod : 'ePay',
//			amout : 120,
//			serviceId : '1218',
//			transactionId : '37381384' ,
//			userId : 'aaaaabb@yahoo.com',
//			trafficFileNumber : '5011102421'
//		}
//	};
}




function getPendingTransactions(eTrafficServiceId){
	var xmlRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/schemas/MobilityPaymentLogService/Schema.xsd">\
		   <soapenv:Header>\
	    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
	            <wsse:Username>'+tibcoUsername+'</wsse:Username>\
			<wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
	   <sch:header>\
	            <sch:clientUsername>Omnix_user</sch:clientUsername>\
	            <sch:clientPassword>mfurmdz</sch:clientPassword>\
	         </sch:header>\
	         </soapenv:Header>\
		   <soapenv:Body>\
		      <sch:getServicePendingTransactions>\
		         <sch:trafficFileNumber></sch:trafficFileNumber>\
		         <sch:serviceCode>'+eTrafficServiceId+'</sch:serviceCode>\
		      </sch:getServicePendingTransactions>\
		   </soapenv:Body>\
		</soapenv:Envelope>';
	
	var path = 'mobilitypaymentlogservice';
	var input = {
		method : 'POST',
		returnedContentType : 'xml',
		path : path,
		body : {
			content : xmlRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
}


function test(){
	return {
		result : com.proxymit.wl.utils.ResourceLoader.loadResource('conf/corporates/test.html')
	};
}
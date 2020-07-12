
var soapEnvNS = 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ';
var userName = "%#credentials!#!username#%";
var password = "%#credentials!#!password#%";
var externalUsername = "%#credentials!#!externalUsername#%";
var externalPassword = "%#credentials!#!externalPassword#%";
var IsDebugging;


//WL.Server.createEventSource({
//	name : 'DnV_PaymentReconciliationEventSource',
//	poll : {
//		interval : 300, // Job run each 5 minutes
//		onPoll : 'reconciliatePendingTransactions'
//	}
//});


function getPostponedPaymentDetails() {

	var fromMailAddress = "shawky.cs@gmail.com";
	var subject ="Test Payment Report";
	var attachments = null;
	var message = "Test Message";
	
	var x= sendNewMail(fromMailAddress,subject, message,attachments,sendNewMailSuccess,sendNewMailFailure);
	
	return{
	message:x
}
	
	var request = 	"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:PaymentReconciliationService'>"+
						   "<soapenv:Header>"+
						   "   <urn:externalUserPassword>"+externalPassword+"</urn:externalUserPassword>"+
						   "   <urn:externalUsername>"+externalUsername+"</urn:externalUsername>"+
						   "   <urn:password>"+password+"</urn:password>"+
						   "   <urn:username>"+userName+"</urn:username>"+
						   "</soapenv:Header>"+
						   "<soapenv:Body>"+
						   "   <urn:getPostponedPaymentDetailsRequest>"+
						   "      <urn:inputDate>2011-11-02</urn:inputDate>"+
						   "      <urn:centerId>3333</urn:centerId>"+
						   "      <urn:sptrn>10000004</urn:sptrn>"+
						   "      <urn:status>3</urn:status>"+
						   "   </urn:getPostponedPaymentDetailsRequest>"+
						   "</soapenv:Body>"+
					"</soapenv:Envelope>";
	
	
	
	var servicePath = '/ws/services/PaymentReconciliationService';
	var parameters = [request];
	
	var request = buildBody(parameters, true);
	
//	return{
//		message:request
//	}
	
	var result = invokeWebServiceString(request,servicePath);
	
//	try{
//		MFP.Logger.warn("|drivers_and_vehicles_trafficAdapter |lockEntity  | Request : " + JSON.stringify(request) + ", Response: "+JSON.stringify(result));
//	}catch(e){
//		MFP.Logger.warn("|drivers_and_vehicles_trafficAdapter |lockEntity  | Exception :"+e);
//	}
	
	return result;

}

function invokeWebServiceString(request, servicePath, isEncryptResponse, encryptionPassword) {
	var input = {
			method : 'post',
			headers :{
				"SOAPAction" : ""
			},
			returnedContentType : 'HTML',
			path :servicePath,
			body : {
				content : JSON.parse(request),
				contentType : 'text/xml; charset=utf-8'
			}
	};

	var webServiceResult = MFP.Server.invokeHttp(input);
	if(isEncryptResponse != undefined && isEncryptResponse == true)
	{
		var responseString = JSON.stringify(webServiceResult);
		var invocationData = {
				adapter : 'drivers_and_vehciles_utilitiesAdapter',
				procedure : 'encryptData',
				parameters : [responseString,encryptionPassword]
		};
		webServiceResult = MFP.Server.invokeProcedure(invocationData);
	}	
	return webServiceResult;
}






function buildBody(parameters, isStatic) {
	var request = "";

	if (isStatic == true) {
		request = MFP.Server.invokeProcedure({
			adapter : 'drivers_and_vehciles_utilitiesAdapter',
			procedure : 'buildBodyFromStaticRequest',
			parameters : parameters,

		});
	} else {
		request = MFP.Server.invokeProcedure({
			adapter : 'drivers_and_vehciles_utilitiesAdapter',
			procedure : 'buildBody',
			parameters : parameters
		});
	}

	return request.body;
}







function sendNewMail(fromMailAddress,subject, message,attachments,sendNewMailSuccess,sendNewMailFailure){
//
// var invocationData = {
//   adapter : 'drivers_and_vehciles_utilitiesAdapter',
//   procedure : 'sendMail',
//   parameters : [fromMailAddress,subject, message,attachments]
// };
// invokeWebservice(invocationData, this, 18000000, sendNewMailSuccess, sendNewMailFailure, true);
	
	
	
	var port = MFP.Server.getPropertyValue("drivers_and_vehicles_mail_port");
	var host = MFP.Server.getPropertyValue("drivers_and_vehicles_mail_host");
	var toMailAddress =  MFP.Server.getPropertyValue("drivers_and_vehicles_mail_toMailAddress");
	var user =  null;
	try {user = MFP.Server.getPropertyValue("drivers_and_vehicles_mail_user");} catch(ex){}
	var pass = null;
	try {pass = MFP.Server.getPropertyValue("drivers_and_vehicles_mail_pass");} catch(ex){}
	var sendEmail = new com.ibm.drivers_and_vehicles.MailSender();
	var sendNewEmail= sendEmail.sendNewEmail(host,port,toMailAddress,user,pass,fromMailAddress,subject, message,JSON.stringify(attachments));
	return {isSent : sendNewEmail};
	
	
}


function sendNewMailSuccess() {

}

function sendNewMailFailure(error) {

}





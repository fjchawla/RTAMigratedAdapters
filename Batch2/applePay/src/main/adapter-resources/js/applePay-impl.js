var wsseSecurityHeader = '<soapenv:Header>' + '<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" ' + 'xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' + '<wsse:UsernameToken wsu:Id="UsernameToken-102"><wsse:Username>' + MFP.Server.getPropertyValue("tokens.tipcoService.username") + '</wsse:Username>' + '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">' + MFP.Server.getPropertyValue("tokens.tipcoService.password") + '</wsse:Password>' + '</wsse:UsernameToken></wsse:Security></soapenv:Header>';

// Constants
var spCode ="RTA3";
var servCode ="mGov";
var PYMTCHANNELCODE ="104";
var type ="sale";
var version ="2.1";
var paymentMode ="EPAY";
var paymentType ="APPLE_PAY";

function executeTransactionWithDSG(DSGOptions){
	var cardToken =DSGOptions.CARDTOKEN;
	var cardType =DSGOptions.CARDTYPE;
	DSGOptions.TIMESTAMP = getTimeStamp();
	var Request = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:app='http://www.rta.ae/EIP/ApplePayIntegrationService/ApplePaySchema'>"+
		wsseSecurityHeader +
	   "<soapenv:Body>"+
	      "<app:executeTransactionRequest>"+
	         "<app:transaction>"+
	            "<app:spCode>"+spCode+"</app:spCode>"+
	            "<app:servCode>"+servCode+"</app:servCode>"+
	            "<app:spTrn>"+DSGOptions.SPTRN+"</app:spTrn>"+
	            "<app:amount>"+DSGOptions.AMOUNT+"</app:amount>"+
	            "<app:timestamp>"+DSGOptions.TIMESTAMP+"</app:timestamp>"+
	            "<app:channel>"+PYMTCHANNELCODE+"</app:channel>"+
	            "<app:description>"+DSGOptions.SERVICENAMEEN+"</app:description>"+
	            "<app:type>"+type+"</app:type>"+
	            "<app:version>"+version+"</app:version>"+
	            "<app:email>"+DSGOptions.USERMAIL+"</app:email>"+
	            "<app:mobileNo>"+DSGOptions.MOBILENO+"</app:mobileNo>"+
	         "</app:transaction>"+
	         "<app:paymentData>"+
	            "<app:paymentMode>"+paymentMode+"</app:paymentMode>"+
	            "<app:paymentType>"+paymentType+"</app:paymentType>"+
	            "<app:applePayData>"+
	               "<app:cardToken>"+cardToken+"</app:cardToken>"+
	               "<app:cardType>"+cardType+"</app:cardType>"+
	            "</app:applePayData>"+
	         "</app:paymentData>"+
	      "</app:executeTransactionRequest>"+
	   "</soapenv:Body>"+
	"</soapenv:Envelope>"
		MFP.Logger.warn("|applePayAdapter |executeTransaction |Request" + JSON.stringify(Request));
	return invokeWebService(Request);
}
function getTimeStamp(){
	var d = new Date();
	//TIMESTAMP = d.toString("DD/MM/YYYY HH24:MI:SS");
	TIMESTAMP = (  "0" + (d.getDate())).slice(-2) + "-"
	+ ("0" + (d.getMonth() + 1)).slice(-2) + "-"
	+ d.getFullYear() + " "
	+ ("0" + (d.getHours())).slice(-2) + ":"
	+ ("0" + (d.getMinutes())).slice(-2) + ":"
	+ ("0" + (d.getSeconds())).slice(-2);
	return TIMESTAMP;
}
function invokeWebService(body, headers) {
	var input = {
		method: 'post',
		returnedContentType: 'xml',
		returnedContentEncoding: 'utf-8',
		path: '/ApplePayIntegrationService',
		headers: headers,
		body: {
			content: body.toString(),
			contentType: 'text/xml; charset=utf-8'
		}
	};
	return MFP.Server.invokeHttp(input);
}

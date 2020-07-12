
var datetime = new Date();

function submitPersonaliseApplication(language,userId,params) {

var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/CustomHeader/XMLSchema/" xmlns:xs1="http://www.rta.ae/ActiveMatrix/ESB/CardPersonaliseApplicationService/XMLSchema">'
		+getHeader(language,userId)
		+'<soapenv:Body>'
			+'<xs1:nolCardPersonaliseSubmissionRequest>'
				+jsonToXml(params,'', null)
		    +'</xs1:nolCardPersonaliseSubmissionRequest>'
		+'</soapenv:Body>'
	+'</soapenv:Envelope>';

	var result = invokeWebService(request,"submitPersonaliseApplicationRequest");
	
	return result;
}

function validatePersonaliseApplication(language,userId,params) {

	var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/CustomHeader/XMLSchema/" xmlns:xs1="http://www.rta.ae/ActiveMatrix/ESB/CardPersonaliseApplicationService/XMLSchema">'
		+getHeader(language,userId)
		+'<soapenv:Body>'
			+'<xs1:nolCardPersonaliseValidationRequest>'
				+jsonToXml(params,'', null)
		    +'</xs1:nolCardPersonaliseValidationRequest>'
		+'</soapenv:Body>'
	+'</soapenv:Envelope>';

	var result = invokeWebService(request,"validatePersonaliseApplication");
	
	 return result;
	 
	 
//	return request={
//	request:request,
//	result:result
//	} ;
}

function reviewPersonaliseApplication(language,userId,params) {

	var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/CustomHeader/XMLSchema/" xmlns:xs1="http://www.rta.ae/ActiveMatrix/ESB/CardPersonaliseApplicationService/XMLSchema">'
		+getHeader(language,userId)
		+'<soapenv:Body>'
			+'<xs1:nolCardPersonaliseReviewRequest>'
				+jsonToXml(params,'', null)
		    +'</xs1:nolCardPersonaliseReviewRequest>'
		+'</soapenv:Body>'
	+'</soapenv:Envelope>';
	
	var result = invokeWebService(request,"reviewPersonaliseApplication");
	
	return result;
}

function responsePersonaliseApplication(language,userId,params,paymentChannel) {

	var request = '<soapenv:Envelope  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/CustomHeader/XMLSchema/" xmlns:xs1="http://www.rta.ae/ActiveMatrix/ESB/CardPersonaliseApplicationService/XMLSchema">'
		+getHeader(language,userId)
		+'<soapenv:Body>'
			+'<xs1:paymentResponse>'
				+jsonToXml(params,'', null)
				+'<paymentChannel>'+paymentChannel+'</paymentChannel>'
		    +'</xs1:paymentResponse>'
		+'</soapenv:Body>'
	+'</soapenv:Envelope>';
	
	var result;
	
	if(paymentChannel == 'MPAY'){
		var startup = 1;
		var multiply = 2;
		var timeout = 10;
		
		result = poolingResponse(request,startup,multiply,timeout);
		
	}else{
		result = invokeWebService(request,"responsePersonaliseApplicationRequest");
	}
	
	return result;
}

function poolingResponse(request,current,multiply,timeout){
	result = invokeWebService(request,"responsePersonaliseApplicationRequest");
	
	if(result.nolCardPersonaliseConfirmation){
		if(result.nolCardPersonaliseConfirmation.paymentStatus=="PENDING"){
			current=current*multiply;
			if(timeout>current){
				MFP.Logger.info("start sleep");
				com.rta.java.util.SleepUtil.sleep(current*1000);
				MFP.Logger.info("end sleep");
				result = poolingResponse(request,current,multiply,timeout);
			}
		}
	}
	return result;
}

function getHeader(language,userId){
	
	var header = 
		'<soapenv:Header>'
			+getWSSE()
			+'<xs:CustomHeader>'
				+'<xs:Language>'+language+'</xs:Language>'
				+'<xs:UserId>'+userId+'</xs:UserId>'     
			+'</xs:CustomHeader>'
		+'</soapenv:Header>';
	
	return header;
}

function getWSSE(){
	var wsse = 
		'<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
			+'<wsse:UsernameToken wsu:Id="UsernameToken-69">'
				+'<wsse:Username>'+MFP.Server.getPropertyValue("wsse.tibco.username")+'</wsse:Username>'
				+'<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+MFP.Server.getPropertyValue("wsse.tibco.password")+'</wsse:Password>'
				+'<wsu:Created>'+new Date().toISOString()+'</wsu:Created>'
			+'</wsse:UsernameToken>'
		+'</wsse:Security>';
	
	return wsse;
}

function getAttributes(jsonObj) {
	var attrStr = '';
	for(var attr in jsonObj) {
		var val = jsonObj[attr];
		if (attr.charAt(0) == '@') {
			attrStr += ' ' + attr.substring(1);
			attrStr += '="' + val + '"';
		}
	}
	return attrStr;
}

function jsonToXml(jsonObj, xmlStr, namespaces) {
	var toAppend = '';
	for(var attr in jsonObj) {
		var val = jsonObj[attr];
		if (attr.charAt(0) != '@') {
			toAppend += "<" + attr;
			if (typeof val  === 'object') {
				toAppend += getAttributes(val);
				if (namespaces != null)
					toAppend += ' ' + namespaces;
				toAppend += ">\n";
				toAppend = jsonToXml(val, toAppend);
			}
			else {
				toAppend += ">" + val;
			}
			toAppend += "</" + attr + ">\n";
		}
	}
	return xmlStr += toAppend;
}

function invokeWebService(request,soapAction){
	var invokeReferenceId = "ME"+new Date().getTime()+Math.floor((Math.random() * 100) + 1);
	try {
		MFP.Logger.info("["+soapAction +"][Request]["+invokeReferenceId+"] \r\n"+ request.toString());
		
	    var input = {
	        method : 'post',
	        returnedContentType : 'xml',
	        path : "mobilenolcardpersonaliseservice_v2",
	        headers:{SOAPAction:soapAction},
	        body: {
	            content : request.toString(),
	            contentType : 'text/xml; charset=utf-8'
	        }
	    };
    
	    var response = MFP.Server.invokeHttp(input);
	    
	    MFP.Logger.info("["+soapAction + "][Response]["+invokeReferenceId+"] \r\n"+JSON.stringify(response, null, '\t'));
	    
		response.Envelope.Body.invokeReferenceId = invokeReferenceId;
		
	    return response.Envelope.Body;
    
	}catch(err) {
		MFP.Logger.error("["+soapAction+"][Error]["+invokeReferenceId+"]: "+err);
		return {error:err,isSuccessful:false,invokeReferenceId:invokeReferenceId};
	}
}
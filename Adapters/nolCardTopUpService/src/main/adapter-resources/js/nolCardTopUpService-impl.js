
var datetime = new Date();

function getTopUpAmountOptions(language,params) {

var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/CardTopupService/XMLSchema">'
		+getHeader(language)
		+'<soapenv:Body>'
			+'<xs:cardKey>'
				+jsonToXml(params,'', null)
		    +'</xs:cardKey>'
		+'</soapenv:Body>'
	+'</soapenv:Envelope>';
	
	var result = invokeWebService(request,"getTopUpAmountOptions");
//	return {
//		request:request,
//		response:result
//	}
 	return result;
}

function validateOnlineTopup(language,params) {

	var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/CardTopupService/XMLSchema">'
		+getHeader(language)
		+'<soapenv:Body>'
			+'<xs:nolCardTopupValidationRequest>'
				+jsonToXml(params,'', null)
		    +'</xs:nolCardTopupValidationRequest>'
		+'</soapenv:Body>'
	+'</soapenv:Envelope>';
	
	var result = invokeWebService(request,"validateOnlineTopup");
//	return {
//		request:request,
//		response:result
//	}

	if(result.businessValidationResult.violations){
		for (x in result.businessValidationResult.violations) {
			if(result.businessValidationResult.violations[x].violationCode){
			    if( result.businessValidationResult.violations[x].violationCode == "CARD_HAS_WHITELIST" ){
					result.isPendingAmt = true;
			    }
			}else{
			    if( result.businessValidationResult.violations[x] == "CARD_HAS_WHITELIST" ){
					result.isPendingAmt = true;
			    }
			}
		}
	}
	
	 return result;
}

function submitTopupRequest(language,params) {

	var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/CardTopupService/XMLSchema">'
		+getHeader(language)
		+'<soapenv:Body>'
			+'<xs:nolCardTopupSubmissionRequest>'
				+jsonToXml(params,'', null)
		    +'</xs:nolCardTopupSubmissionRequest>'
		+'</soapenv:Body>'
	+'</soapenv:Envelope>';
	
	var result = invokeWebService(request,"submitTopupRequest");
//	return {
//		request:request,
//		response:result
//	}
 	return result;
}

function responseTopupRequest(language,params,paymentChannel) {

	var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/CardTopupService/XMLSchema">'
			+getHeader(language)
			+'<soapenv:Body>'
				+'<xs:paymentResponse>'
					+jsonToXml(params,'', null)
					+'<paymentChannel>'+paymentChannel+'</paymentChannel>'
			    +'</xs:paymentResponse>'
			+'</soapenv:Body>'
		+'</soapenv:Envelope>';
	
		var result;
	
		if(paymentChannel == 'MPAY'){
			var startup = MFP.Server.getPropertyValue("rta.pt.topupRequest.response.startup");
			var multiply = MFP.Server.getPropertyValue("rta.pt.topupRequest.response.multiply");
			var timeout = MFP.Server.getPropertyValue("rta.pt.topupRequest.response.timeout");
			
			result = poolingResponse(request,startup,multiply,timeout);
			
		}else{
			result = invokeWebService(request,"responseTopupRequest");
		}
		
		
//		return {
//			request:request,
//			response:result
//		}
 	return result;	
	}

function poolingResponse(request,current,multiply,timeout){
	result = invokeWebService(request,"responseTopupRequest");
	
	if(result.topupConfirmation){
		if(result.topupConfirmation.paymentStatus=="PENDING"){
			current=current*multiply;
			if(timeout>current){
				com.rta.java.util.SleepUtil.sleep(current*1000);
				result = poolingResponse(request,current,multiply,timeout);
			}
		}
	}
//	return {
//		request:request,
//		response:result
//	}
//	return result;
}

function getHeader(language){
	var header = 
		'<soapenv:Header>'
			+ getWSSE()
			+'<m:AcceptLanguages xmlns:m="'+MFP.Server.getPropertyValue("rta.soap.language.header.xmlns")+'">'
				+'<m:Language>'+language+'</m:Language>'
			+'</m:AcceptLanguages>'
		+'</soapenv:Header>';
	
	return header;
}

function getWSSE(){
	var wsse = 
		'<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
			+'<wsse:UsernameToken wsu:Id="UsernameToken-69">'
				+'<wsse:Username>'+MFP.Server.getPropertyValue("wsse.tibco.username")+'</wsse:Username>'
				+'<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+MFP.Server.getPropertyValue("wsse.tibco.password")+'</wsse:Password>'
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
	        path : MFP.Server.getPropertyValue("rta.pt.nolCardTopUpService.endPoint"),
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

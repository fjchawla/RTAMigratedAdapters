var IsDebugging;
function Log(text){
	try {
		IsDebugging=MFP.Server.getPropertyValue("public_transport_is_debugging");
	}catch(e){
		IsDebugging="false";
	}
	IsDebugging="true";
	// MFP.Logger.warn(""+IsDebugging);
	if(IsDebugging=="true")
		MFP.Logger.warn(text);
	else 
		MFP.Logger.debug(text);
}
function lookupService(params,language){
	try {
	var request = '<soapenv:Envelope  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/LookupService/XMLSchema">'
		+getHeader(language)
		+'<soapenv:Body>'
				+jsonToXml(params,'', null)
		+'</soapenv:Body>'
	+'</soapenv:Envelope>';
	Log(request);
	var servicePath='lookupService';
	var result = invokeWebService(request,"lookupService",servicePath);
//	return request={
//			request:request,
//			result:result
//			} ;
	 return result;
	}catch(e){
		Log(e);	
	}
}
function optionsSetService(params,language){
	try {
	var request = '<soapenv:Envelope  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/OptionSetService/XMLSchema">'
		+getHeader(language)
		+'<soapenv:Body>'
				+jsonToXml(params,'', null)
		+'</soapenv:Body>'
	+'</soapenv:Envelope>';

	var servicePath='optionsSetService';
	var result = invokeWebService(request,"optionSetService",servicePath);
//	return request={
//			request:request,
//			result:result
//			} ;
	return result;
	}catch(e){
		Log(e);	
	}
}
function getHeader(language){
	var header = 
		'<soapenv:Header>'
			+getWSSE()
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
function invokeWebService(request,soapAction,servicePath){
	var invokeReferenceId = "ME"+new Date().getTime()+Math.floor((Math.random() * 100) + 1);
	try {
		MFP.Logger.info("["+soapAction +"][Request]["+invokeReferenceId+"] \r\n"+ request.toString());
		
	    var input = {
	        method : 'post',
	        returnedContentType : 'xml',
	        path : servicePath,
	        headers:{SOAPAction:soapAction},
	        body: {
	            content : request.toString(),
	            contentType : 'text/xml; charset=UTF-8'
	        }
	    };
	    var response = WL.Server.invokeHttp(input);
	    return response;
		MFP.Logger.info("["+soapAction + "][Response]["+invokeReferenceId+"] \r\n"+JSON.stringify(response, null, '\t'));
	    
		if(response.Envelope){
			response.Envelope.Body.invokeReferenceId = invokeReferenceId;
			
		    return response.Envelope.Body;
	    }else{
	    	response.invokeReferenceId = invokeReferenceId;
	    	
		    return response;
	    }
    
	}catch(err) {
		MFP.Logger.error("["+soapAction+"][Error]["+invokeReferenceId+"]: "+err);
		return {error:err,isSuccessful:false,invokeReferenceId:invokeReferenceId};
	}
}
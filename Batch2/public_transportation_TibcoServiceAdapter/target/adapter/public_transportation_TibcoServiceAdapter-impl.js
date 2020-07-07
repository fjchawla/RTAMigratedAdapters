// '/lostAndFoundBusService' "/lostAndFoundTaxiService" "/foundItemService"
function invokeWebServiceByStringRequest(requestString, webservicePath, serviceName) {
	var userName = MFP.Server.getPropertyValue("wsse.tibco.username");
	var password = MFP.Server.getPropertyValue("wsse.tibco.password");
	var request = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xs='http://www.rta.ae/ActiveMatrix/ESB/"+serviceName+"/XMLSchema'>"+
					"<soapenv:Header>"+
						"<wsse:Security soapenv:mustUnderstand='0' xmlns:wsse='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd' xmlns:wsu='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd'>"+
							"<wsse:UsernameToken wsu:Id='UsernameToken-69'>"+
								"<wsse:Username>"+ userName +"</wsse:Username>"+
								"<wsse:Password Type='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'>"+ password +"</wsse:Password>"+
							"</wsse:UsernameToken>"+
						"</wsse:Security>"+
						"<m:AcceptLanguages xmlns:m='http://www.rta.ae/ActiveMatrix/ESB/AcceptLanguage/XMLSchema/'>"+
							"<m:Language>en</m:Language>"+
						"</m:AcceptLanguages>"+
					"</soapenv:Header>"+
					"<soapenv:Body>"+
						requestString +
					"</soapenv:Body>"+
				  "</soapenv:Envelope>";
	var input = {
		method : 'post',
		headers :{
				"SOAPAction" : ""
			},
		returnedContentType : 'xml',
		path : webservicePath,
		body : {
			content : request,
			contentType : 'text/xml; charset=utf-8'
		}
	};
	return MFP.Server.invokeHttp(input);
}

//'/water taxi service
function invokeWaterTaxiServiceByStringRequest(requestString) {
	var userName = MFP.Server.getPropertyValue("wsse.tibco.username");
	var password = MFP.Server.getPropertyValue("wsse.tibco.password");
	var request = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:WaterTaxiService'>"+
					"<soapenv:Header>"+
						"<wsse:Security soapenv:mustUnderstand='0' xmlns:wsse='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd' xmlns:wsu='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd'>"+
							"<wsse:UsernameToken wsu:Id='UsernameToken-69'>"+
								"<wsse:Username>"+ userName +"</wsse:Username>"+
								"<wsse:Password Type='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'>"+ password +"</wsse:Password>"+
							"</wsse:UsernameToken>"+
						"</wsse:Security>"+
						"<m:AcceptLanguages xmlns:m='http://www.rta.ae/ActiveMatrix/ESB/AcceptLanguage/XMLSchema/'>"+
							"<m:Language>en</m:Language>"+
						"</m:AcceptLanguages>"+
					"</soapenv:Header>"+                         
					"<soapenv:Body>"+
						requestString +
					"</soapenv:Body>"+
				  "</soapenv:Envelope>";
	var input = {
		method : 'post',
		headers :{
				"SOAPAction" : ""
			},
		returnedContentType : 'xml',
		path : "/WaterTaxi/services/WaterTaxiService",
		body : {
			content : request,
			contentType : 'text/xml; charset=utf-8'
		}
	};
	return WL.Server.invokeHttp(input);
}


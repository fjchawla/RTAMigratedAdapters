var username_traffic = "%#credentials!#!username_traffic#%";
var password_traffic = "%#credentials!#!password_traffic#%";
var username_tibco = "%#credentials!#!username_tibco#%";
var password_tibco = "%#credentials!#!password_tibco#%";

function TransactionTibcoService_operation(envHeader, params, httpHeaders, isEncryptResponse, encryptionPassword) {
	var soapEnvNS = 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' + 'xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd" '
	+'xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" ' + 
	'xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" ';
	
	var parameters = [envHeader, params, '', soapEnvNS];
    var request = buildBody(parameters, false);

	//MFP.Logger.debug("request to be sent:\n"+request);
	return invokeWebService(request, httpHeaders, isEncryptResponse, encryptionPassword);
}

function TransactionTibcoService_operationStringRequest(request, SOAPAction, isEncryptResponse, encryptionPassword) {
//	var soapEnvNS = 'http://schemas.xmlsoap.org/soap/envelope/';
//	var request = buildBody(envHeader, params, 'xmlns:ws="http://ws.trs.rta.ae"', soapEnvNS);
	var parameters = [request];
    var request = buildBody(parameters, true);
	if(request.indexOf("<setAvailableDelivery") >= 0 && request.indexOf("<trsMode>6</trsMode>") >= 0) // setAvailableDelivery for kiosk
		request = request.replace("<trsCenterID>1493</trsCenterID>","<trsCenterID>1495</trsCenterID>");
	if(request.indexOf("<createTransaction><setviceCode>124</setviceCode>") > 0)
		request = request.replace("<parameters>","<parameters><parameter><name>permitPeriod</name><value>3</value></parameter>");
	//MFP.Logger.debug("request to be sent:\n"+request);
	var result = invokeWebServiceString(request, SOAPAction);
	
	return recertifySeasonalParkingServices(request,result, isEncryptResponse, encryptionPassword);
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

function invokeWebService(body, headers, isEncryptResponse, encryptionPassword) {
	if (!headers)
		headers = {
			"SOAPAction" : ""
		};
	else
		headers["SOAPAction"] = "";
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		path:'/eProxy/service/TransactionService',
		body : {
			content : body.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};

	// Adding custom HTTP headers if they were provided as parameter to the
	// procedure call
	headers && (input['headers'] = headers);

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
	var invocationData = {
			adapter : 'drivers_and_vehciles_utilitiesAdapter',
			procedure : 'deleteCredientails',
			parameters : [webServiceResult]
	};
	return MFP.Server.invokeProcedure(invocationData);
	}


function invokeWebServiceString(request, SOAPAction, isEncryptResponse, encryptionPassword) {
	var SOAPActionHeader = (SOAPAction == undefined || SOAPAction == null) ? "" : SOAPAction;
	var input = {
		method : 'post',
		 headers : {
	        	SOAPAction:SOAPActionHeader
	        },
		returnedContentType : 'xml',
		path : '/eProxy/service/TransactionService',
		body : {
			content : JSON.parse(request),
			contentType : 'text/xml; charset=utf-8'
		}
	};

	// Adding custom HTTP headers if they were provided as parameter to the
	// procedure call
	//headers && (input['headers'] = headers);

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
	var invocationData = {
			adapter : 'drivers_and_vehciles_utilitiesAdapter',
			procedure : 'deleteCredientails',
			parameters : [webServiceResult]
	};
	return MFP.Server.invokeProcedure(invocationData);
	}

function getParameterValueFromCData(cData,parameterName)
{
	var paramterValue=null;
	try
	{
		var searchString = "<"+parameterName+">";
		var str = cData;
		var startPos = str.indexOf(searchString);
		if(startPos >= 0)
		{
			str = str.substring(startPos + searchString.length);
			var endPos = str.indexOf("</"+parameterName+">");
			if(endPos >= 0)
				paramterValue = str.substring(0,endPos);
		}				
	}
	catch(ex){}
	return paramterValue;
}

function recertifySeasonalParkingServices(request,result, isEncryptResponse, encryptionPassword)
{
	var responseReturned;
	if(request.indexOf("<sch:createTransactionRequest>") >= 0) // createTransaction Operation
	{
		var serviceCode = getParameterValueFromCData(request,"setviceCode");
		if(serviceCode == "601" || serviceCode == "602" || serviceCode == "101" || serviceCode == "4")
		{
			if (result.Envelope.Body.createTransactionResponse !=undefined && 
				result.Envelope.Body.createTransactionResponse.CDATA != undefined
			   )																		// createTransaction was performed successfully
			{
				var cData = result.Envelope.Body.createTransactionResponse.CDATA;
				var transactionId = getParameterValueFromCData(cData,"transactionId");
				var response;
				if(transactionId != undefined && transactionId != null && transactionId != "")
				{
					var trafficFileNo = getParameterValueFromCData(request,"trafficFileNo");
					var centerCode = getParameterValueFromCData(request,"centerCode");
					var innerXML = "<![CDATA["
						+ "<createTransaction>"
						+ "<setviceCode>" + serviceCode + "</setviceCode>"
						+ "<trafficFileNo>"
						+ trafficFileNo
						+ "</trafficFileNo>"
						+ "<username>"
						+ username_traffic
						+ "</username>"
						+ "<centerCode>"
						+ centerCode
						+ "</centerCode>"
						+ "<parameters>"
						+ "<parameter>"
						+ "<name>transactionId</name>"
						+ "<value>"
						+ transactionId
						+ "</value>"
						+ "</parameter>"
						+ "</parameters>"
						+ "</createTransaction>" + "]]>";
					var requestString = "<soapenv:Envelope xmlns:sch='http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd' xmlns:wsse='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd' xmlns:wsu ='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd'"+ 
						" xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'>"+
						"<soapenv:Header>"+
						"<wsse:Security>"+
						"<wsse:UsernameToken>"+
						"<wsse:Username>"+username_tibco+"</wsse:Username>"+
						"<wsse:Password>"+password_tibco+"</wsse:Password>"+
						"</wsse:UsernameToken>"+
						"</wsse:Security>"+
						"</soapenv:Header>"+
						"<soapenv:Body>"+
						"<sch:reCertifyTransactionRequest>"+
						"<sch:header>"+
						"<sch:clientUsername>"+username_traffic+"</sch:clientUsername>"+
						"<sch:clientPassword>"+password_traffic+"</sch:clientPassword>"+
						"</sch:header>"+
						"<sch:request>"+
						innerXML+
						"</sch:request>"+
						"</sch:reCertifyTransactionRequest>"+
						"</soapenv:Body>"+
						"</soapenv:Envelope>"; 
					var parameters = [requestString];
					var recertifyRequest = buildBody(parameters, true);
					response = invokeWebServiceString(recertifyRequest);
					// Check that recertifyTransaction was performed successfully.
					if (response.Envelope.Body.reCertifyTransactionResponse !=undefined && 
						response.Envelope.Body.reCertifyTransactionResponse.CDATA != undefined
					   )
					{
						var cData = response.Envelope.Body.reCertifyTransactionResponse.CDATA;
						var transactionId = getParameterValueFromCData(cData,"transactionId");
						if(transactionId != undefined && transactionId != null && transactionId != "")
							responseReturned = result;
						else
							responseReturned = response;
					}
					else
						responseReturned = response;
				}
				else
					responseReturned = result;
			}
			else
				responseReturned = result;
		}
		else
			responseReturned = result;
	}
	else
		responseReturned = result;
	if(isEncryptResponse != undefined && isEncryptResponse == true)
	{
		var responseString = JSON.stringify(responseReturned);
		var invocationData = {
			adapter : 'drivers_and_vehciles_utilitiesAdapter',
			procedure : 'encryptData',
			parameters : [responseString,encryptionPassword]
		};
		responseReturned = MFP.Server.invokeProcedure(invocationData);
	}	
	var invocationData = {
			adapter : 'drivers_and_vehciles_utilitiesAdapter',
			procedure : 'deleteCredientails',
			parameters : [responseReturned]
	};
	return MFP.Server.invokeProcedure(invocationData);
	}
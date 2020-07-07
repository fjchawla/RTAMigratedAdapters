
var IDOS_CACHE_NAME = "IDOS_CACHE";
var IDOS_CACHE_INTERVAL_IN_SEC = 1800; //30 minutes
var IDOS_CACHE_REQ_TOKEN = MFP.Server.getPropertyValue("tokens.jmsAdapter");

WL.Server.createEventSource({
	name : 'iDoSUpdate',
	poll : {
		interval : IDOS_CACHE_INTERVAL_IN_SEC,
		onPoll : 'UpdateServicesDB'
	} 
});

function UpdateServicesDB(){ 
		var iDosRequestResult=getAllServicesFromBackend();
 
		if (iDosRequestResult && iDosRequestResult.isSuccessful
				&& iDosRequestResult.Envelope
				&& iDosRequestResult.Envelope.Body
				&& iDosRequestResult.Envelope.Body.iDosService_Response
				&& iDosRequestResult.Envelope.Body.iDosService_Response.services
				&& iDosRequestResult.Envelope.Body.iDosService_Response.services.service
				&& iDosRequestResult.Envelope.Body.iDosService_Response.services.service.length
				&& iDosRequestResult.Envelope.Body.iDosService_Response.services.service.length > 0){
			//Cache result
			var cacheContent = JSON.stringify(iDosRequestResult);
		//	MFP.Logger.warn("|iDosServiceAdapter |UpdateServicesDB |cacheContent"+ JSON.stringify(cacheContent));

			var invocationData = {
					adapter : 'userProfile',
					procedure : 'setCache',
					parameters : [ IDOS_CACHE_NAME, cacheContent, IDOS_CACHE_REQ_TOKEN ]
			};
			var addTransactionToDB = MFP.Server.invokeProcedure(invocationData,{
				onSuccess : function (e){
					MFP.Logger.warn("|iDosServiceAdapter |UpdateServicesDB |Cached Successfully"+ JSON.stringify(e));
				},
				onFailure :  function (e){
					MFP.Logger.warn("|iDosServiceAdapter |UpdateServicesDB |Cached Failure : " + JSON.stringify(e));
				},
			});
 			MFP.Logger.warn("|iDosServiceAdapter |UpdateServicesDB |addTransactionToDB: " + JSON.stringify(addTransactionToDB));

		}
		else{
			MFP.Logger.warn('|iDosServiceAdapter |UpdateServicesDB |failed or got invalid data');
		}
	 
}

function getAllServicesFromBackend(){

	var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" '
		+'xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/iDosService_BW_SRC/SharedResources/XMLSchema/Schema.xsd" '
		+'xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" '
		+'xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
		+'<soapenv:Header><wsse:Security><wsse:UsernameToken><wsse:Username>' + MFP.Server.getPropertyValue("tokens.tipcoService.username") + '</wsse:Username>'
		+'<wsse:Password>' + MFP.Server.getPropertyValue("tokens.tipcoService.password") + '</wsse:Password></wsse:UsernameToken></wsse:Security></soapenv:Header>'
		+'<soapenv:Body><sch:iDosService_Request/></soapenv:Body></soapenv:Envelope>';
	MFP.Logger.warn('|iDosServiceAdapter |getAllServicesFromBackend |Request ' + request);
	var response = invokeWebService(request);


	return response;
}

function invokeWebService(body){
	var input = {
			method : 'post',
			returnedContentType : 'xml',
			returnedContentEncoding: 'utf-8',
			path : '/idosservice',
			body: {
				content : body.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
	};

	return MFP.Server.invokeHttp(input);
}

function getAllServices(){
	var iDosData = null;
	var invocationData = {
			adapter : 'userProfile',
			procedure : 'getCache',
			parameters : [ IDOS_CACHE_NAME, IDOS_CACHE_REQ_TOKEN ]
	};

	var returnedData = MFP.Server.invokeProcedure(invocationData);
//	MFP.Logger.warn('|iDosServiceAdapter |getAllServices |returnedData ' + returnedData);

	if(returnedData && returnedData.isSuccessful
			&& returnedData.resultSet 
			&& returnedData.resultSet.length>0){
		iDosData = returnedData.resultSet[0].content;
	}
	if(iDosData){
		var data =  JSON.parse(iDosData);
		data.DataSource = "DB";
		return _getCDATASHAPED(data);
	}
	else{
		var iDosRequestResult = getAllServicesFromBackend();
		iDosRequestResult.DataSource = "Backend";
		return _getCDATASHAPED(iDosRequestResult);
	}
}
function _getCDATASHAPED(s) {
	for (var k in s){
		if(typeof s[k] != 'string' && !s[k].CDATA)
			s[k] = _getCDATASHAPED(s[k]);
		if(s[k].CDATA)
			s[k] = s[k].CDATA;
	}
	return s;
}

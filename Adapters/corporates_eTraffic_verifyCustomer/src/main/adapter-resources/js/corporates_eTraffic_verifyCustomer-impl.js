var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;

function getCorporateData(trafficFileNumber){
	
	try {
		trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNumber;
	} catch (e) {}
	var xmlRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/CustomerService_BW_SRC/SharedResources/XMLSchema/Schema.xsd">\
		 <soapenv:Header>\
		 <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
		    <wsse:UsernameToken>\
		           <wsse:Username>'+tibcoUsername+'</wsse:Username>\
		           <wsse:Password>'+tibocPwd+'</wsse:Password>\
		         </wsse:UsernameToken>\
		      </wsse:Security>\
			   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:CustomerRequest>\
	<![CDATA[<ValidationRequest xmlns="http://www.xmlBeans.mapping.ws.inq.trf.gov.ae" isPerson="false"><OrganizationTrafficInfo>"\
	        <trafficNumber>'+trafficFileNumber+'</trafficNumber>\
	        </OrganizationTrafficInfo></ValidationRequest>]]>\
	</sch:CustomerRequest>\
	   </soapenv:Body>\
	</soapenv:Envelope>';
	var path = '/customerService';
	var input = {
		method : 'POST',
		returnedContentType : 'xml',
		// headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : xmlRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = invokeTimestampedProcedure(input, 'getCorporateData');
	//return response ;
	//MFP.Logger.info(response);
	if(!response.isSuccessful || response.Envelope.Body == undefined ||response.Envelope.Body.Fault != undefined){
		return {
			//isSuccessful : false
			   "Customer": {
				      "Organization": {
				         "address": "Dubai",
				         "email": "dummy.email@test.ae",
				         "fax": {
				            "xsi_ns-sep_nil": "true"
				         },
				         "mobile": "971500000000",
				         "nameAR": "شركة وهمية مؤقتة",
				         "nameEN": "Temporary Organization ",
				         "telephone": "045435643",
				         "tradeLicenceExpirayDate": "2020-10-15-04:00",
				         "tradeLicenceNumber": "111111"
				      },
				      "isPerson": "false"
				   },
				   "isSuccessful": true
		};
	}
	//MGRT71
	if(response.Envelope.Body.CustomerResponse != undefined && response.Envelope.Body.CustomerResponse.CDATA == undefined){
	   response.Envelope.Body.CustomerResponse = {CDATA : response.Envelope.Body.CustomerResponse};
	}
	
	if(response.Envelope.Body.CustomerResponse.CDATA == undefined){
//		return {
//			isSuccessful : false
//		};
		return {
			   "Customer": {
				      "Organization": {
				         "address": "Dubai",
				         "email": "dummy.email@test.ae",
				         "fax": {
				            "xsi_ns-sep_nil": "true"
				         },
				         "mobile": "971500000000",
				         "nameAR": "شركة وهمية مؤقتة",
				         "nameEN": "Temporary Organization ",
				         "telephone": "045435643",
				         "tradeLicenceExpirayDate": "2020-10-15-04:00",
				         "tradeLicenceNumber": "111111"
				      },
				      "isPerson": "false"
				   },
				   "isSuccessful": true
				};
	}
	var cData = response.Envelope.Body.CustomerResponse.CDATA;
	var rsp = JSON.parse(com.proxymit.utils.XmlToJsonConverter
			.convertToJson(cData));
	
	return rsp ;
}

function invokeTimestampedProcedure(input,methodName){
	MFP.Logger.info('Start invoking web service '+input.path+' method name : '+methodName);
	var startTime = new Date().getTime() ;
	var response = MFP.Server.invokeHttp(input);
	var endTime = new Date().getTime();
	MFP.Logger.info('END invoking web service '+input.path+' method name : '+methodName+' Took (ms) '+ (endTime - startTime));
	
	return response ;
}

function getmPayCorporateData (transactionId, SP_TRN, trafficNo, amount){
	
	var response = getCorporateData(trafficNo);
			var iD = {
					adapter : 'ePay_DataVerification_RTA_Corporate_Services',
					procedure : 'encryptPaymentData',
					parameters : [ transactionId, 'etraffic', amount, SP_TRN ]
				};
				var cypher =  MFP.Server.invokeProcedure(iD);
				response.cypher = cypher ;
		return response;

}
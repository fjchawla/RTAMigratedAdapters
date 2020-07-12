var WSSE_USERNAME = MFP.Server.getPropertyValue("tokens.tipcoService.username");
var WSSE_PASSWORD = MFP.Server.getPropertyValue("tokens.tipcoService.password");

var USER_NAME = "Omnix_User";
//var PASSWORD = "test12345";
var PASSWORD = '555M55MM';

function getTermsAndConditionsByService(serviceCode, permitCategoryId){
	serviceCodes = {
			"1070" : "804",
			"-1" : "803",
			"263" : "807",
			"1002" : "802",
			"257" : "801",
			"260" : "806",
			"248" : "810",
			"554" : "810",
			"552" : "806",
			"553" : "807",
			"555" : "802",
			"550" : "801",
			"551" : "804",
			"1180" : "125",
			"1188" : "126",
			"214" : "125",
			"244" :"222",
			"243" : "221"
		};
	serviceCode = serviceCodes[serviceCode];
	if(serviceCode == undefined || serviceCode == "" || serviceCode == null){
		serviceCode = "222";
	}
	if(serviceCode == "125") return _getPermitTermsAndConditions(serviceCode, permitCategoryId);
	var path = "termsandcondition";
	var getTermsAndConditions = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/TermsAndConditionsServiceSchema/XMLSchema">\
		   <soapenv:Header>\
	    <xs:ExternalUser>\
	       <xs:externalUsername>'+USER_NAME+'</xs:externalUsername>\
	       <xs:externalUserPassword>'+PASSWORD+'</xs:externalUserPassword>\
	    </xs:ExternalUser>\
	       <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	       <wsse:UsernameToken>\
	          <wsse:Username>'+WSSE_USERNAME+'</wsse:Username>\
	          <wsse:Password>'+WSSE_PASSWORD+'</wsse:Password>\
	       </wsse:UsernameToken>\
	    </wsse:Security>\
	 </soapenv:Header>\
 <soapenv:Body>\
    <xs:termsAndConditionsReq>\
       <xs:serviceCode>'+serviceCode+'</xs:serviceCode>\
       <xs:informationTypes>\
          <!--Zero or more repetitions:-->\
       </xs:informationTypes>\
    </xs:termsAndConditionsReq>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		path : path,
		body : {
			content : getTermsAndConditions.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	MFP.Logger.warn(getTermsAndConditions.toString());
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.info(response);
	if(response.isSuccessful){
		if(response.Envelope.Body != undefined && response.Envelope.Body.getServiceTermsAndConditionsReturn != undefined){
				var terms = response.Envelope.Body.getServiceTermsAndConditionsReturn.serviceTermsAndConditions.termsAndConditionsList.termOrConditionItem ;
				if(!Array.isArray(terms)){
					terms = [terms];
				}
				return {
					isSuccessful : true,
					terms : terms,
				};
		}
	}else{
		return {
			isSuccessful : false,
			terms : []
		};
}
}

function _getPermitTermsAndConditions(serviceCode, permitCategoryId){
		var invocationData = {
				parameters : [serviceCode, permitCategoryId]
			};
		invocationData.adapter = "corporates_eTraffic_permitTermsAndConditions";
		invocationData.procedure = "getPermitTermsAndConditions";
		var response = MFP.Server.invokeProcedure(invocationData);
		return response;
}
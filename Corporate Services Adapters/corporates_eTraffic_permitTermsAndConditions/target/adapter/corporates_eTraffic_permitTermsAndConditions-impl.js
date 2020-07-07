var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username");
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password");

function getPermitTermsAndConditions(serviceCode, permitCategoryId) {
	var path = "/getServiceTermsAndConditionsService";
	var soapActionHeader = '"getTermsAndConditionsList"';
	var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/GetPermitTermsAndConditionsService/XMLSchema">\
		   <soapenv:Header>\
    <xs:ExternalUser>\
       <xs:externalUsername>'
			+ EXTERNAL_USERNAME
			+ '</xs:externalUsername>\
       <xs:externalUserPassword>'
			+ EXTERNAL_PASSWORD
			+ '</xs:externalUserPassword>\
    </xs:ExternalUser>\
     <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
       <wsse:UsernameToken>\
          <wsse:Username>'
			+ tibcoUsername
			+ '</wsse:Username>\
          <wsse:Password>'
			+ tibocPwd
			+ '</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <xs:termsAndConditionsReq>\
       <xs:serviceCode>'+serviceCode+'</xs:serviceCode>\
       <xs:permitCategory>'+permitCategoryId+'</xs:permitCategory>\
       <!--Optional:-->\
       <xs:informationTypes>\
          <!--Zero or more repetitions:-->\
          <xs:informationType>4</xs:informationType>\
       </xs:informationTypes>\
    </xs:termsAndConditionsReq>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {
			'SOAPAction' : soapActionHeader
		},
		path : path,
		body : {
			content : rq.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.info(response);
	if (response.isSuccessful) {
		if (response.Envelope.Body != undefined
				&& response.Envelope.Body.getServiceTermsAndConditionsReturn != undefined) {
			var terms = response.Envelope.Body.getServiceTermsAndConditionsReturn.serviceTermsAndConditions.termsAndConditionsList.termOrConditionItem;
			if (!Array.isArray(terms)) {
				terms = [ terms ];
			}
			return {
				isSuccessful : true,
				terms : terms,
			};
		}
	} else {
		return {
			isSuccessful : false,
			terms : []
		};
	}
}

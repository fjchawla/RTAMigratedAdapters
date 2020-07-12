var EXTERNAL_USERNAME = 'Omnix_user';
//SIT & UAT
//var EXTERNAL_PASSWORD = 'test12345';
// PROD
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;

function getAuthoritiesList(){
	var path = "/authoritiesService";
	//var path = "/authoritiesservice";
	var soapActionHeader = '"getAuthoritiesList"';
	var getAuthoritiesRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/AuthoritiesService/Schema.xsd">\
		   <soapenv:Header>\
    <sch:ExternalUser>\
      <sch:clientUsername>'+EXTERNAL_USERNAME+'</sch:clientUsername>\
          <sch:clientPassword>'+EXTERNAL_PASSWORD+'</sch:clientPassword>\
    </sch:ExternalUser>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
  <wsse:UsernameToken>\
	  <wsse:Username>'+tibcoUsername+'</wsse:Username>\
	  <wsse:Password>'+tibocPwd+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <sch:getAuthoritiesList>\
       <sch:getAuthoritiesListRequest/>\
    </sch:getAuthoritiesList>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getAuthoritiesRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getAuthoritiesListReturn) == "undefined") {
		MFP.Logger.warn("Error get authorities");
		return {
			isSuccessful : false,
			errorCode : 301,
		// 301 means error get legal type Info
			message : "An error has been occured in the server. Kindly try again",
			reference: response
		};
	}
		if(typeof response.Envelope.Body.getAuthoritiesListReturn.getAuthoritiesListResponse.authorities == "undefined"){
			return response.Envelope.Body.getAuthoritiesListReturn.getAuthoritiesListResponse;
		}
				var authorities = response.Envelope.Body.getAuthoritiesListReturn.getAuthoritiesListResponse.authorities.authorityType;
				if(!Array.isArray(authorities)){
					authorities = [authorities];
				}
				return {
					isSuccessful : true,
					authorities : authorities,
					responseDescription : response.Envelope.Body.getAuthoritiesListReturn.getAuthoritiesListResponse.responseDescription,
					responseCode : response.Envelope.Body.getAuthoritiesListReturn.getAuthoritiesListResponse.responseCode
				};
		
}
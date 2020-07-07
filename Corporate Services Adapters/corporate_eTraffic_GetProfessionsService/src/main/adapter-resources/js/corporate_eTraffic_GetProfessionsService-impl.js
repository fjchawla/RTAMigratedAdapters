var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;
function getProfessions(occupationId){
	// end point local
	//var path = "/getprofessionsservice";
	// SIT & UAT & Prod
	var path = "/getProfessionsService";
	var soapActionHeader = '"getProfessionsListDetails"';
	var getProfessionsRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/GetProfessionsService/Schema.xsd">\
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
    <sch:ProfessionRequestInfo>\
       <!--Optional:-->\
       <sch:professionRequest>\
          <!--Optional:-->\
          <sch:professionId>'+occupationId+'</sch:professionId>\
       </sch:professionRequest>\
    </sch:ProfessionRequestInfo>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : getProfessionsRequest.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getProfessionsListReturn) == "undefined") {
		MFP.Logger.warn("Error get professions");
		return {
			isSuccessful : false,
			errorCode : 301,
		// 301 means error get legal type Info
			message : "An error has been occured in the server. Kindly try again"
		};
	}
		if(typeof response.Envelope.Body.getProfessionsListReturn.getProfessionsListResponse.professions == "undefined"){
			return response.Envelope.Body.getProfessionsListReturn.getProfessionsListResponse;
		}
				var professions = response.Envelope.Body.getProfessionsListReturn.getProfessionsListResponse.professions.professionsDetailsType;
				if(!Array.isArray(professions)){
					professions = [professions];
				}
				return {
					isSuccessful : true,
					professions : professions,
					responseDescription : response.Envelope.Body.getProfessionsListReturn.getProfessionsListResponse.responseDescription,
					responseCode : response.Envelope.Body.getProfessionsListReturn.getProfessionsListResponse.responseCode
				};
		
}
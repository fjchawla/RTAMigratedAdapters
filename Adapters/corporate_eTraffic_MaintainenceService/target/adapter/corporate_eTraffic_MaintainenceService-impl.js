var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
//Prod
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;
function getNationalities(NationalityName, nationalityID){
	if(!nationalityID){
		nationalityID = "";
	}
	var path = "/maintenanceService";
	var soapActionHeader = '"getNationalities"';
	var getProfessionsRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/MaintenanceService/Schema.xsd">\
		   <soapenv:Header>\
	   <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	    <wsse:UsernameToken>\
			<wsse:Username>'+tibcoUsername+'</wsse:Username>\
			  <wsse:Password>'+tibocPwd+'</wsse:Password>\
	         </wsse:UsernameToken>\
	      </wsse:Security>\
	      <sch:ExternalUser>\
	         <sch:clientUsername>'+EXTERNAL_USERNAME+'</sch:clientUsername>\
	            <sch:clientPassword>'+EXTERNAL_PASSWORD+'</sch:clientPassword>\
	      </sch:ExternalUser>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:getNationalities>\
	         <sch:nationalityID>'+nationalityID+'</sch:nationalityID>\
	      </sch:getNationalities>\
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
	if (typeof (response.Envelope.Body.getNationalitiesReturn) == "undefined") {
		MFP.Logger.warn("Error get nationalities");
		return {
			isSuccessful : false,
			errorCode : 301,
			message : "An error has been occured in the server. Kindly try again",
			reference: response
		};
	}
	if(typeof response.Envelope.Body.getNationalitiesReturn.NationalitiesType == "undefined"){
		return response.Envelope.Body.getNationalitiesReturn;
	}
	var nationalities = response.Envelope.Body.getNationalitiesReturn.NationalitiesType;
	if(!Array.isArray(nationalities)){
		nationalities = [nationalities];
	}
	var sr = new RegExp('(.*)(' + NationalityName.toLowerCase() + ')(.*)', 'g');
	var return_nationalities = [];
	for(i in nationalities) {
		var natE = typeof nationalities[i].descriptionE !== "undefined" ? nationalities[i].descriptionE : "";
		var natA = typeof nationalities[i].descriptionA !== "undefined" ? nationalities[i].descriptionA : "";
		
		//NationalityName
		if (natA.toLowerCase().match(sr) || natE.toLowerCase().match(sr)) {
			return_nationalities.push(nationalities[i]);
		}
	}
	return {
		isSuccessful : true,
		nationalities : return_nationalities
	};
}
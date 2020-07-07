var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'test12345';
//Prod
var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;

function getlegalTypeInfo(legalTypeId){
//	return {"isSuccessful":true,"legalTypes":[{"legalTypeDescAR":"نائب رئيس مجلس الإدارة","legalTypeDescEN":"Vice Chairman of the Board","legalTypeId":"31"},{"legalTypeDescAR":"عضو مجلس الإدارة و رئيس","legalTypeDescEN":"Member of the Board and President","legalTypeId":"27"},{"legalTypeDescAR":"عضو مجلس الإدارة و مدير تنفيذي","legalTypeDescEN":"Member of the Board of Directors and Executive Director","legalTypeId":"28"},{"legalTypeDescAR":"عضو مجلس الإدارة","legalTypeDescEN":"Board Member","legalTypeId":"29"},{"legalTypeDescAR":"مدير تنفيذي","legalTypeDescEN":"Executive Director","legalTypeId":"30"},{"legalTypeDescAR":"ممرض مسؤل","legalTypeDescEN":"Nurse in charge","legalTypeId":"14"},{"legalTypeDescAR":"مالك مؤسسة","legalTypeDescEN":"Est. Owner","legalTypeId":"1"},{"legalTypeDescAR":"شريك","legalTypeDescEN":"Partner","legalTypeId":"2"},{"legalTypeDescAR":"شريك مفوض","legalTypeDescEN":"Authorised Partner","legalTypeId":"3"},{"legalTypeDescAR":"مفوض","legalTypeDescEN":"Authorised","legalTypeId":"4"},{"legalTypeDescAR":"ممثل","legalTypeDescEN":"Representative","legalTypeId":"5"},{"legalTypeDescAR":"وكيل خدمات","legalTypeDescEN":"Agent","legalTypeId":"6"},{"legalTypeDescAR":"مدير","legalTypeDescEN":"Manager","legalTypeId":"21"},{"legalTypeDescAR":"فنى مسئول","legalTypeDescEN":"Technical Responsible","legalTypeId":"7"},{"legalTypeDescAR":"صيدلى مسئول","legalTypeDescEN":"Pharmacist","legalTypeId":"8"},{"legalTypeDescAR":"طبيب مسئول","legalTypeDescEN":"Doctor","legalTypeId":"24"},{"legalTypeDescAR":"وكيل شركة","legalTypeDescEN":"Company Agent","legalTypeId":"9"},{"legalTypeDescAR":"رئيس مجلس الإدارة","legalTypeDescEN":"Chairman \/ CEO","legalTypeId":"25"},{"legalTypeDescAR":"ممثل الورثة","legalTypeDescEN":"Heirs Rep.","legalTypeId":"10"},{"legalTypeDescAR":"العضوالمنتدب","legalTypeDescEN":"Delegated Member","legalTypeId":"26"},{"legalTypeDescAR":"مالك الشركة","legalTypeDescEN":"Co. Owner","legalTypeId":"23"},{"legalTypeDescAR":"رئيس مجلس الإدارة \/ المديرين","legalTypeDescEN":"The Board of Directors, Chairman","legalTypeId":"11"},{"legalTypeDescAR":"عضو مجلس الإدارة \/ المديرين","legalTypeDescEN":"The Board of Directors, Member","legalTypeId":"12"},{"legalTypeDescAR":"عضو مجلس الإدارة و\/ رئيس \/ مدير تنفيذي","legalTypeDescEN":"The Board of Directors, Member and CEO\/Executive Director","legalTypeId":"13"}],"responseCode":"0","responseDescription":"Success"};
	//var path = "/getpartnerlegaltypeservice";
	var path = "/getPartnerLegalTypesService";

	var soapActionHeader = '"getPartnerLegalTypesList"';
	var legalTypeRequestInfo = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae//schemas/GetPartnerLegalTypesService/Schema.xsd">\
		  <soapenv:Header>\
    <sch:ExternalUser>\
       <sch:externalUsername>'+EXTERNAL_USERNAME+'</sch:externalUsername>\
       <sch:externalUserPassword>'+EXTERNAL_PASSWORD+'</sch:externalUserPassword>\
    </sch:ExternalUser>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
  <wsse:UsernameToken>\
		  <wsse:Username>'+tibcoUsername+'</wsse:Username>\
			<wsse:Password>'+tibocPwd+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <sch:LegalTypeRequestInfo>\
       <!--Optional:-->\
       <sch:legalTypeRequest>\
          <!--Optional:-->\
          <sch:legalTypeId></sch:legalTypeId>\
       </sch:legalTypeRequest>\
    </sch:LegalTypeRequestInfo>\
 </soapenv:Body>\
</soapenv:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		headers : {'SOAPAction' : soapActionHeader},
		path : path,
		body : {
			content : legalTypeRequestInfo.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.warn(response);
	if (typeof (response.Envelope.Body.getPartnerLegalTypesReturn) == "undefined") {
		MFP.Logger.warn("Error get legal type Info");
		return {
			isSuccessful : false,
			errorCode : 301,
		// 301 means error get legal type Info
			message : "An error has been occured in the server. Kindly try again",
			reference: response,
			request: legalTypeRequestInfo.toString()
		};
	}
		if(typeof response.Envelope.Body.getPartnerLegalTypesReturn.getPartnerLegalTypesListResponse.partnerLegalTypes == "undefined"){
			return response.Envelope.Body.getPartnerLegalTypesReturn.getPartnerLegalTypesListResponse;
		}
				var legalTypes = response.Envelope.Body.getPartnerLegalTypesReturn.getPartnerLegalTypesListResponse.partnerLegalTypes.partnerLegalType ;
				if(!Array.isArray(legalTypes)){
					legalTypes = [legalTypes];
				}
				return {
					isSuccessful : true,
					legalTypes : legalTypes,
					responseDescription : response.Envelope.Body.getPartnerLegalTypesReturn.getPartnerLegalTypesListResponse.responseDescription,
					responseCode : response.Envelope.Body.getPartnerLegalTypesReturn.getPartnerLegalTypesListResponse.responseCode
				};
		
}
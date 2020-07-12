var wsseSecurityHeader = '<soapenv:Header>' + '<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" ' + 'xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' + '<wsse:UsernameToken wsu:Id="UsernameToken-102"><wsse:Username>' +  MFP.Server.getPropertyValue("tokens.tipcoService.username") + '</wsse:Username>' + '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">' +  MFP.Server.getPropertyValue("tokens.tipcoService.password") + '</wsse:Password>' + '</wsse:UsernameToken></wsse:Security></soapenv:Header>';
function getJasperReport(bookletId) {
	var Request = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:sch='http://www.rta.ae/schemas/LAJasperReportService/Schema.xsd'>"+
	wsseSecurityHeader+
	"<soapenv:Body>"+
	"<sch:getJasperReport>"+
	"<sch:reportInfo>"+
	"<sch:reportName>/vhl/VHL_TRF-66367_001</sch:reportName>"+
	"<sch:reportParameters>"+
	"<sch:reportParameter>"+
	"<sch:paramName>BKT_ID</sch:paramName>"+
	"<sch:paramValue>"+bookletId+"</sch:paramValue>"+
	"</sch:reportParameter>"+
	"<sch:reportParameter>"+
	"<sch:paramName>HAS_MAIN_QUERY</sch:paramName>"+
	"<sch:paramValue>true</sch:paramValue>"+
	"</sch:reportParameter>"+
	"</sch:reportParameters>"+
	"</sch:reportInfo>"+
	"</sch:getJasperReport>"+
	"</soapenv:Body>"+
	"</soapenv:Envelope>";

	MFP.Logger.warn("|JasperReportAdapter |getJasperReport |Request" + JSON.stringify(Request));
	var response=invokeWebService(Request);
	if (response && response.isSuccessful && response.statusCode == 200) {
		var getJasperReportResponse =response.Envelope.Body.getJasperReportResponse;
		return {report : getJasperReportResponse.reponseInfo.reportDataAsBase64 };
	}
	return response;
}
function invokeWebService(body, headers) {
	var input = {
			method: 'post',
			returnedContentType: 'xml',
			returnedContentEncoding: 'utf-8',
			path: '/LAJasperReportService',
			headers: headers,
			body: {
				content: body.toString(),
				contentType: 'text/xml; charset=utf-8'
			}
	};
	return MFP.Server.invokeHttp(input);
}



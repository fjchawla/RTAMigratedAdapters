var WSSE_USERNAME = MFP.Server.getPropertyValue("tokens.tipcoService.username");
var WSSE_PASSWORD = MFP.Server.getPropertyValue("tokens.tipcoService.password");



function getSalesOrders(tradeLicenseNumber){
	try {
		tradeLicenseNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.businessLicenseNo
				: tradeLicenseNumber;
	} catch (e) {}
	//	return {"isSuccessful":true,"result":{"ExtendErrorMessage":{"nil":"true"},"RequestSource":"CustomerService","RequestStatus":"Success","SalesOrder":{"SalesTable":[{"ApplicantNameAr":{"nil":"true"},"ApplicantNameEn":{"nil":"true"},"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"CustAccount":"CSC","DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PaymentReceiptNum":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"RMSInvDate":"2012-04-17T00:00:00","RMSPayChannel":{"nil":"true"},"RMSPayChannelSpecified":"false","RMSStatusDate":{"nil":"true"},"RMSStatusDateSpecified":"false","RMSTransStatus":{"nil":"true"},"RMSTransStatusSpecified":"false","SalesId":"00000024","SalesLines":{"SalesLine":[{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"705","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}},{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"749","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}}]},"SalesStatus":"Backorder","SalesType":{"nil":"true"},"SeasonalCardNum":{"nil":"true"},"SourceSys":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TotalInvoice":"110.00","TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}},{"ApplicantNameAr":{"nil":"true"},"ApplicantNameEn":{"nil":"true"},"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"CustAccount":"CSC","DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PaymentReceiptNum":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"RMSInvDate":"2012-04-17T00:00:00","RMSPayChannel":{"nil":"true"},"RMSPayChannelSpecified":"false","RMSStatusDate":{"nil":"true"},"RMSStatusDateSpecified":"false","RMSTransStatus":{"nil":"true"},"RMSTransStatusSpecified":"false","SalesId":"00000025","SalesLines":{"SalesLine":[{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"705","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}},{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"749","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}}]},"SalesStatus":"Backorder","SalesType":{"nil":"true"},"SeasonalCardNum":{"nil":"true"},"SourceSys":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TotalInvoice":"110.00","TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}},{"ApplicantNameAr":{"nil":"true"},"ApplicantNameEn":{"nil":"true"},"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"CustAccount":"CSC","DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PaymentReceiptNum":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"RMSInvDate":"2012-04-17T00:00:00","RMSPayChannel":{"nil":"true"},"RMSPayChannelSpecified":"false","RMSStatusDate":{"nil":"true"},"RMSStatusDateSpecified":"false","RMSTransStatus":{"nil":"true"},"RMSTransStatusSpecified":"false","SalesId":"00000026","SalesLines":{"SalesLine":[{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"705","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}},{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"749","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}}]},"SalesStatus":"Backorder","SalesType":{"nil":"true"},"SeasonalCardNum":{"nil":"true"},"SourceSys":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TotalInvoice":"110.00","TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}},{"ApplicantNameAr":{"nil":"true"},"ApplicantNameEn":{"nil":"true"},"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"CustAccount":"CSC","DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PaymentReceiptNum":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"RMSInvDate":"2012-04-17T00:00:00","RMSPayChannel":{"nil":"true"},"RMSPayChannelSpecified":"false","RMSStatusDate":{"nil":"true"},"RMSStatusDateSpecified":"false","RMSTransStatus":{"nil":"true"},"RMSTransStatusSpecified":"false","SalesId":"00000027","SalesLines":{"SalesLine":[{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"705","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}},{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"749","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}}]},"SalesStatus":"Backorder","SalesType":{"nil":"true"},"SeasonalCardNum":{"nil":"true"},"SourceSys":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TotalInvoice":"210.00","TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}},{"ApplicantNameAr":{"nil":"true"},"ApplicantNameEn":{"nil":"true"},"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"CustAccount":"CSC","DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PaymentReceiptNum":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"RMSInvDate":"2012-04-17T00:00:00","RMSPayChannel":{"nil":"true"},"RMSPayChannelSpecified":"false","RMSStatusDate":{"nil":"true"},"RMSStatusDateSpecified":"false","RMSTransStatus":{"nil":"true"},"RMSTransStatusSpecified":"false","SalesId":"00000028","SalesLines":{"SalesLine":[{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"705","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}},{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"749","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}}]},"SalesStatus":"Backorder","SalesType":{"nil":"true"},"SeasonalCardNum":{"nil":"true"},"SourceSys":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TotalInvoice":"160.00","TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}},{"ApplicantNameAr":{"nil":"true"},"ApplicantNameEn":{"nil":"true"},"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"CustAccount":"CSC","DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PaymentReceiptNum":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"RMSInvDate":"2012-04-17T00:00:00","RMSPayChannel":{"nil":"true"},"RMSPayChannelSpecified":"false","RMSStatusDate":{"nil":"true"},"RMSStatusDateSpecified":"false","RMSTransStatus":{"nil":"true"},"RMSTransStatusSpecified":"false","SalesId":"00000029","SalesLines":{"SalesLine":[{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"705","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}},{"ApplicationNo":{"nil":"true"},"CarPlateCode":{"nil":"true"},"CarPlateColor":{"nil":"true"},"CarPlateNumber":{"nil":"true"},"CarPlateSource":{"nil":"true"},"CarPlateType":{"nil":"true"},"DriverLicNumber":{"nil":"true"},"EmiratesId":{"nil":"true"},"FineNum":{"nil":"true"},"ItemId":"749","LineAmount":{"nil":"true"},"LineDisc":{"nil":"true"},"Name":{"nil":"true"},"PVNameAr":{"nil":"true"},"PVNameEn":{"nil":"true"},"PermitId":{"nil":"true"},"PurposeAr":{"nil":"true"},"PurposeEn":{"nil":"true"},"SalesPrice":{"nil":"true"},"SalesQty":"1.00","SourceSys":{"nil":"true"},"SourceSysRefNo":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}}]},"SalesStatus":"Backorder","SalesType":{"nil":"true"},"SeasonalCardNum":{"nil":"true"},"SourceSys":{"nil":"true"},"SourceSystemName":{"nil":"true"},"TotalInvoice":"110.00","TradeLicNumber":{"nil":"true"},"TrafficFileNo":{"nil":"true"}}],"SenderId":{"nil":"true"}}},"totalAmount":"7245847.00"};
	var response = getSalesOrderDetails(tradeLicenseNumber);
	if(!response.isSuccessful){
		return response;
	}
	var toReturn = {
		isSuccessful : true,
		result: {}
	};
	toReturn.result.SalesOrder = response.result.SalesOrder.SalesTable;
	toReturn.result.RequestSource = response.result.RequestSource;
	toReturn.result.RequestStatus = response.result.RequestSource;
	toReturn.totalAmount = response.totalAmount;
	return toReturn;
}


function getSalesOrderDetails(tradeLicenseNumber){
	try {
		tradeLicenseNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm')!= null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.businessLicenseNo
				: tradeLicenseNumber;
	} catch (e) {
		// TODO: handle exception
	}
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/SalesOrderDetails_0/XMLSchema">\
	     <soapenv:Header>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
  <wsse:UsernameToken>\
          <wsse:Username>'+WSSE_USERNAME+'</wsse:Username>\
          <wsse:Password>'+WSSE_PASSWORD+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <xs:GetAllSalesOrder>\
       <xs:tradeId_OR_salesId>'+tradeLicenseNumber+'</xs:tradeId_OR_salesId>\
    </xs:GetAllSalesOrder>\
 </soapenv:Body>\
</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'salesorderdetails';
	var input = {
		method : 'POST',
		returnedContentType : 'xml',
		path : path,
		body : {
			content : transactionString.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.info(response);
	if(response.Envelope != undefined && response.Envelope.Body != undefined && response.Envelope.Body.GetAllSalesOrderResponse != undefined && response.Envelope.Body.GetAllSalesOrderResponse.GetAllSalesOrderResult != undefined){
		var totalAmount =  getSalesOrderTotalAmount(tradeLicenseNumber).totalAmount;
		return {
			isSuccessful : true,
			result : response.Envelope.Body.GetAllSalesOrderResponse.GetAllSalesOrderResult,
			totalAmount : totalAmount
		};
	}else{
		return {
			isSuccessful : false,
			errorCode : 380,
			message : "An error has been occured in the server. Kindly try again",
			reference : response
		};
	}
}


function getSalesOrderTotalAmount(tradeLicenseNumber){
	try {
		tradeLicenseNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.businessLicenseNo
				: tradeLicenseNumber;
	} catch (e) {
		// TODO: handle exception
	}
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/SalesOrdersTotalAmountService/XMLSchema">\
	     <soapenv:Header>\
    <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
  <wsse:UsernameToken>\
		 <wsse:Username>'+WSSE_USERNAME+'</wsse:Username>\
         <wsse:Password>'+WSSE_PASSWORD+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <xs:GetSalesOrderTotalAmount>\
       <xs:traffiNum_OR_saleId>'+tradeLicenseNumber+'</xs:traffiNum_OR_saleId>\
    </xs:GetSalesOrderTotalAmount>\
 </soapenv:Body>\
</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'salesorderstotalamountservice';
	var input = {
		method : 'POST',
		returnedContentType : 'xml',
		path : path,
		body : {
			content : transactionString.toString(),
			contentType : 'text/xml; charset=utf-8'
		}
	};
	var response = MFP.Server.invokeHttp(input);
	if(response.Envelope != undefined && response.Envelope.Body != undefined && response.Envelope.Body.GetSalesOrderTotalAmountResponse != undefined && response.Envelope.Body.GetSalesOrderTotalAmountResponse.GetSalesOrderTotalAmountResult != undefined){
		return {
			isSuccessful : true,
			totalAmount : response.Envelope.Body.GetSalesOrderTotalAmountResponse.GetSalesOrderTotalAmountResult.TotalAmount
		};
	}else{
		return {
			isSuccessful : true,
			totalAmount : "0"
		};
	}
}

function generatePreformaInvoice(tradeLicenseNumber, arrayOfItemId) {
	try {
		tradeLicenseNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.businessLicenseNo
				: tradeLicenseNumber;
	} catch (e) {
		// TODO: handle exception
	}
	htmlSalesTable = "";
	var salesOrdersResponse = getSalesOrders(tradeLicenseNumber);
	if (!salesOrdersResponse.isSuccessful) {
		return {
			isSuccessful : false,
			reference : salesOrdersResponse
		};
	}
	
	
	var salesTable = salesOrdersResponse.result.SalesOrder.SalesTable;
	var totalAmount = salesOrdersResponse.totalAmount;
	var manyTotalAmount = 0;
	var totalAmountTable = 0;

	var html = '<html>\
		<body style="font-family: arial;">\
		  <div style=" display: block;overflow: hidden;background: white;">\
			   <div style="border: 1px solid #ccc;">\
			   <table width="100%">\
				<tr>\
				 <td align="left" width="25%"><img src="images/logoDubai.jpg" height="80"/></td>\
				 <td align="right" width="50%"><img src="images/logo.jpg"  height="125"/></td>\
				</tr>\
			   </table>\
			  </div>\
		 </div>';

	if (arrayOfItemId.length > 1) {
		var salesId = "No Sales Id Found";
		html += com.proxymit.wl.utils.ResourceLoader
				.loadResource('conf/corporates/manyPerforma_invoice.html');
		for (i in salesTable) {
			for (j in arrayOfItemId) {
				if (salesTable[i].SalesId == arrayOfItemId[j]) {
					try {
						salesId = salesTable[i].SalesId;
						MFP.Logger.warn(salesId);
					} catch (e) {
						MFP.Logger.warn(e);
					}
					
					try {
						var totalInv = "0";
						if(salesTable[i].TotalInvoice != undefined && salesTable[i].TotalInvoice.nil != "true"){
							totalInv = salesTable[i].TotalInvoice;
							manyTotalAmount += parseFloat(totalInv);
						}
						htmlSalesTable += "<tr><td>" + salesId
								+ "</td><td></td><td></td><td>" + "</td><td>"
								+ totalInv + "</td></tr>";
					} catch (e) {
						MFP.Logger.warn(e);
					}
				}
			}
		}
		html = html.replace('##salesTable##', htmlSalesTable);
		html = html.replace('##totalAmountTable##', manyTotalAmount);
	} else {
		html += com.proxymit.wl.utils.ResourceLoader
				.loadResource('conf/corporates/performa_invoice.html');
		for (i in salesTable) {
			if (salesTable[i].SalesId == arrayOfItemId[0]) {
				
				//totalAmount = TotalInvoice
				MFP.Logger.info(salesTable[i].SalesId);
			if (typeof salesTable[i].ApplicantNameEn.nil != "undefined") {
				appName = "no description found";
			} else {
				appName = salesTable[i].ApplicantNameEn;
			}
			 if (typeof salesTable[i].TotalInvoice.nil != "undefined") {
					totalinv = "0";
			} else {
					totalinv = salesTable[i].TotalInvoice;
			}
			 totalAmountTable = parseFloat(totalinv);
			 totalAmount = totalAmountTable ;
			 MFP.Logger.info('SalesTable i = ['+i+']');
			 MFP.Logger.info(salesTable[i]);
			salesTable[i].SalesLines.SalesLine = Array.isArray(salesTable[i].SalesLines.SalesLine) ? salesTable[i].SalesLines.SalesLine
					: [ salesTable[i].SalesLines.SalesLine ];
			MFP.Logger.info(salesTable[i].SalesLines.SalesLine);
			htmlSalesTable += '<table width="100%" border="0" style="margin:20px 5px 40px;">\
							<tr colspan="5" style="border-width:2px; border-style:solid; border-color:#000;">\
						<th style="border-bottom:1px solid #000;">Item number</th>\
						<th style="border-bottom:1px solid #000; border-left:0;" align="center">Description</th>\
						<th style="border-bottom:1px solid #000;">Quantity</th>\
						<th style="border-bottom:1px solid #000;">Amount</th>\
					</tr>';
			for (var k = 0; k < salesTable[i].SalesLines.SalesLine.length; k ++) {
				try {
					if (typeof salesTable[i].SalesLines.SalesLine[k] == "undefined"
							|| typeof salesTable[i].SalesLines.SalesLine[k].Name == "undefined"
							|| typeof salesTable[i].SalesLines.SalesLine[k].Name.nil != "undefined") {
						appName = "-";
					} else {
						appName = _reverseTextIfArabic(salesTable[i].SalesLines.SalesLine[k].Name);
					}
					MFP.Logger.info('SalesTable ['+k+']');
					MFP.Logger.info(salesTable[i].SalesLines.SalesLine[k]);
					if (typeof salesTable[i].SalesLines.SalesLine[k] == "undefined"
							|| typeof salesTable[i].SalesLines.SalesLine[k].SalesQty == "undefined"
							|| typeof salesTable[i].SalesLines.SalesLine[k].SalesQty.nil != "undefined") {
						qty = "0";
					} else {
						qty = salesTable[i].SalesLines.SalesLine[k].SalesQty;
					}
					itemId = salesTable[i].SalesLines.SalesLine[k].ItemId;
					var lineAmount = 0 ;
					if (typeof salesTable[i].SalesLines.SalesLine[k] == "undefined"
						|| typeof salesTable[i].SalesLines.SalesLine[k].LineAmount == "undefined"
						|| typeof salesTable[i].SalesLines.SalesLine[k].LineAmount.nil != "undefined") {
						var salesPrice = 0 ;
						if (typeof salesTable[i].SalesLines.SalesLine[k] == "undefined"
							|| typeof salesTable[i].SalesLines.SalesLine[k].SalesPrice == "undefined"
							|| typeof salesTable[i].SalesLines.SalesLine[k].SalesPrice.nil != "undefined") {
							salesPrice = 0;
							lineAmount = 0;
						} else {
							salesPrice = salesTable[i].SalesLines.SalesLine[k].SalesPrice;
							lineAmount = parseFloat(salesPrice) * parseFloat(qty);
						}
						
						
						//lineAmount = "0";
					} else {
						lineAmount = salesTable[i].SalesLines.SalesLine[k].LineAmount;
					}
						htmlSalesTable += '<tr><td colspan="5"><hr /></td></tr>';
					htmlSalesTable += "<tr><td>"
							+ itemId
							+ "</td><td style='text-align:center'>"
							+ appName
							+ "</td><td>"
							+ qty
							+ "</td><td>"
							+ lineAmount	
							+ "</td></tr>";

				} catch (e) {
					MFP.Logger.warn(e);
				}
			}
			htmlSalesTable += '</table>';
			html = html.replace('##salesTable##', htmlSalesTable);
			try {
				html = html.replace('##salesOrder##', arrayOfItemId[0])
						.replace(
								'##date##',
								salesTable[i].RMSInvDate.substring(0,
										salesTable[i].RMSInvDate.indexOf("T")))
						.replace(
								'##date##',
								salesTable[i].RMSInvDate.substring(0,
										salesTable[i].RMSInvDate.indexOf("T")))
						.replace('##CustAccount##', salesTable[i].CustAccount);
			} catch (e) {
				MFP.Logger.warn(e);
			}
			html = html.replace('##totalAmountTable##', totalAmount);
		}
		}
	}
	html += "</body>\
		</html>";
			var base64ImageString =  com.proxymit.pdf.utils.HtmlToPDF.convertWithImg(html, "/home/proxym-it/RTA_Workspace/2014_omnix_rta/server/conf/corporates/"); //LOCAL
		//  var base64ImageString =  com.proxymit.pdf.utils.HtmlToPDF.convertWithImg(html, "D:/smartgov/cms/corpsrvc/servers_res/"); //SIT & UAT
		base64ImageString =  com.proxymit.pdf.utils.PDFToImage.convertPDFToImage(base64ImageString);
		return {
			data : base64ImageString ,
			extension : "jpg"
		};
}

function _getcorporateData(trafficFileNo) {
	try {
		trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo
				: trafficFileNo;
	} catch (e) {
		// TODO: handle exception
	}
	var data = trafficFileNo;
	var invocationData = {
		adapter : 'corporates_eTraffic_verifyCustomer',
		procedure : 'getCorporateData',
		parameters : [ data ]
	};
	return MFP.Server.invokeProcedure(invocationData);
}

function _reverseTextIfArabic(input) {
	return com.proxymit.pdf.utils.HtmlToPDF.reverseIfArabic(input);
}
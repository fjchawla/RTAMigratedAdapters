var path = 'TrackInvoiceService';
var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username");
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password");

function getContract(email) {
    //Invokes viewVendorInfo from vendor prequalification and retrieve the data
    //viewVendorInfo

    var invocationData = {
        adapter: 'corporate_Cognizant_Vendor',
        procedure: 'viewVendorInfo',
        parameters: [email]
    };
    var vendorInfo = MFP.Server.invokeProcedure(invocationData);

    MFP.Logger.warn("vendorInfo :: " + vendorInfo);

    var epqNumber = null;

    //return vendorInfo;

    if (vendorInfo.isSuccessful && vendorInfo.vendorInfo && vendorInfo.vendorInfo.Result && vendorInfo.vendorInfo.Result.VendorInformationResult) {
        if (Array.isArray(vendorInfo.vendorInfo.Result.VendorInformationResult)) {
            epqNumber = vendorInfo.vendorInfo.Result.VendorInformationResult[0]._x003C_AccountNumber_x003E_k__BackingField;
        } else {
            epqNumber = vendorInfo.vendorInfo.Result.VendorInformationResult._x003C_AccountNumber_x003E_k__BackingField;
        }
    } else {
        return {
            isSuccessful: false,
            reference: vendorInfo,
            desc: 'Failed to fetch the vendor info',
            errorCode: 199,
            epqNumber: null,
            response: vendorInfo
        };
    }

    var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/TrackInvoiceService/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header><wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
		    <wsse:UsernameToken>\
				<wsse:Username>' + tibcoUsername + '</wsse:Username>\
				  <wsse:Password>' + tibocPwd + '</wsse:Password>\
		         </wsse:UsernameToken>\
		      </wsse:Security>\
		   </soapenv:Header>\
		   <soapenv:Body>\
		      <sch:GetContractRequest>\
		         <sch:epqNumber>' + epqNumber + '</sch:epqNumber>\
		      </sch:GetContractRequest>\
		   </soapenv:Body>\
		</soapenv:Envelope>';

    var input = {
        method: 'post',
        returnedContentType: 'xml',
        headers: { 'SOAPAction': 'GetContract' },
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };


    var resp = MFP.Server.invokeHttp(input);

    if (resp.isSuccessful && resp.Envelope && resp.Envelope.Body && resp.Envelope.Body.GetContractResponse) {
        resp.epqNumber = epqNumber;
        
        //MGRT71
        var contracts = resp.Envelope.Body.GetContractResponse.Contracts;
        
        if(contracts != undefined){
			for (var i=0 ; i<contracts.length ; i++){
				var contract = contracts[i];
				
				if(contract.agency != undefined && contract.agency.CDATA == undefined) {
					contract.agency = {CDATA : contract.agency};
				}
				
				if(contract.department != undefined && contract.department.CDATA == undefined) {
					contract.department = {CDATA : contract.department};
				}
				
				if(contract.epqNum != undefined && contract.epqNum.CDATA == undefined) {
					contract.epqNum = {CDATA : contract.epqNum};
				}
				
				if(contract.contractNo != undefined && contract.contractNo.CDATA == undefined) {
					contract.contractNo = {CDATA : contract.contractNo};
				}
			}
			
			resp.Envelope.Body.GetContractResponse.Contracts = contracts;
        }
    
        return resp;
    }else if(resp.Envelope.Body.GetContractResponse != undefined ){
    	resp.Envelope.Body.GetContractResponse = {};
    	resp.Envelope.Body.GetContractResponse.Contracts = [];
    	return resp;
    } else {
        return {
            isSuccessful: false,
            reference: resp,
            desc: 'Failed to fetch the vendor contracts',
            epqNumber: null
        };
    }
    return resp;
}

function getInvoices(epqNumber, contractNo, invoiceStatusId, paymentCostRangeFrom, paymentCostRangeTo, invoiceDateFrom, invoiceDateTo, paymentNo) {

    var invoiceStatusIdXML = (invoiceStatusId == null || invoiceStatusId == "") ? '' : '<sch:invoiceStatusId>' + invoiceStatusId + '</sch:invoiceStatusId>';

    var contractNoXML = (contractNo == null || contractNo == "") ? '' : '<sch:contractNo>' + contractNo + '</sch:contractNo>';


    var paymentCostRangeFromXml = (paymentCostRangeFrom == null || paymentCostRangeFrom == "") ? '' : '<sch:paymentCostRange_From>' + paymentCostRangeFrom + '</sch:paymentCostRange_From>';
    var paymentCostRangeToXml = (paymentCostRangeTo == null || paymentCostRangeTo == "") ? '' : '<sch:paymentCostRange_To>' + paymentCostRangeTo + '</sch:paymentCostRange_To>';

    var invoiceDateFromXml = (invoiceDateFrom == null || invoiceDateFrom == "") ? '' : '<sch:invoiceDateRange_From>' + invoiceDateFrom + '</sch:invoiceDateRange_From>';
    var invoiceDateToXml = (invoiceDateTo == null || invoiceDateTo == "") ? '' : '<sch:invoiceDateRange_To>' + invoiceDateTo + '</sch:invoiceDateRange_To>';

    var paymentNoXML = (paymentNo == null || paymentNo == "") ? '' : '<sch:paymentNo>' + paymentNo + '</sch:paymentNo>';

    var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/schemas/TrackInvoiceService/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header><wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
		    <wsse:UsernameToken>\
				<wsse:Username>' + tibcoUsername + '</wsse:Username>\
				  <wsse:Password>' + tibocPwd + '</wsse:Password>\
		         </wsse:UsernameToken>\
		      </wsse:Security>\
		   </soapenv:Header>\
		   <soapenv:Body>\
		      <sch:GetInvoiceRequest>\
		         <sch:epqNumber>' + epqNumber + '</sch:epqNumber>\
		         ' + contractNoXML + '\
		         ' + invoiceStatusIdXML + '\
		         ' + paymentCostRangeFromXml + '\
		         ' + paymentCostRangeToXml + '\
		         ' + invoiceDateFromXml + '\
		         ' + invoiceDateToXml + '\
		         ' + paymentNoXML + '\
		         <sch:pageSize>100</sch:pageSize>\
		         <sch:pageNo>1</sch:pageNo>\
		      </sch:GetInvoiceRequest>\
		   </soapenv:Body>\
		</soapenv:Envelope>';

    var input = {
        method: 'post',
        returnedContentType: 'xml',
        headers: { 'SOAPAction': 'GetInvoice' },
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };

    var response = MFP.Server.invokeHttp(input);

    if (typeof (response.Envelope.Body.GetInvoiceResponse) == "undefined") {
    	return {
    		isSuccessful : false,
    		errorCode : 301,
    		message : "An error has been occured in the server. Kindly try again",
    		reference : response
    	};
    }
    
    if (response.isSuccessful && response.Envelope && response.Envelope.Body && response.Envelope.Body.GetInvoiceResponse) {
        //MGRT71
        var invoices = response.Envelope.Body.GetInvoiceResponse.Invoices;
        
        
        if(invoices != undefined){
        	if(!Array.isArray(invoices)){
            	invoices = [invoices];
    		}
			for (var i=0 ; i<invoices.length ; i++){
				var invoice = invoices[i];
				
				if(invoice.paymentNo != undefined) {
					invoice.paymentNo = {CDATA : invoice.paymentNo};	
				}
				if(invoice.contractDescription != undefined) {
					invoice.contractDescription = {CDATA : invoice.contractDescription};
				}
				if(invoice.paymentCertificateType != undefined) {
					invoice.paymentCertificateType = {CDATA : invoice.paymentCertificateType};
				}
				
				if(invoice.epqNumber != undefined) {
					invoice.epqNumber = {CDATA : invoice.epqNumber};
				}
				
				if(invoice.ePQStatus_En != undefined) {
					invoice.ePQStatus_En = {CDATA : invoice.ePQStatus_En};
				}
				if(invoice.agencyName != undefined) {
					invoice.agencyName = {CDATA : invoice.agencyName};
				}
				if(invoice.paymentCertificateNo != undefined) {
					invoice.paymentCertificateNo = {CDATA : invoice.paymentCertificateNo};
				}
				if(invoice.contractNo != undefined) {
					invoice.contractNo = {CDATA : invoice.contractNo};
				}
				if(invoice.PaymentCurrency != undefined) {
					invoice.PaymentCurrency = {CDATA : invoice.PaymentCurrency};
				}
				if(invoice.ePQStatus_Ar != undefined) {
					invoice.ePQStatus_Ar = {CDATA : invoice.ePQStatus_Ar};
				}
				if(invoice.maximoStatus != undefined) {
					invoice.maximoStatus = {CDATA : invoice.maximoStatus};
				}
				if(invoice.invoiceProgress != undefined) {
					invoice.invoiceProgress = {CDATA : invoice.invoiceProgress};
				}
				if(invoice.invoiceDate != undefined) {
					invoice.invoiceDate = {CDATA : invoice.invoiceDate};
				}
				if(invoice.departmentName != undefined) {
					invoice.departmentName = {CDATA : invoice.departmentName};
				}
				
				if(invoice.paymentCertificateCost != undefined) {
					invoice.paymentCertificateCost = {CDATA : invoice.paymentCertificateCost};
				}
				if(invoice.invoiceStatus != undefined) {
					invoice.invoiceStatus = {CDATA : invoice.invoiceStatus};
				}
			}
	
        }
    
        return response;
    }
    return response;

}

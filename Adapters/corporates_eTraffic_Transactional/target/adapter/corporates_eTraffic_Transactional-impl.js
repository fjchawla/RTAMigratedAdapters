var EXTERNAL_USERNAME = 'Omnix_user';
//var EXTERNAL_PASSWORD = 'mfurmdz';
var EXTERNAL_PASSWORD = 'test12345';
//var EXTERNAL_PASSWORD = '555M55MM';

var tibcoUsername = MFP.Server.getPropertyValue("tokens.tipcoService.username")  ;
var tibocPwd = MFP.Server.getPropertyValue("tokens.tipcoService.password")  ;

var CENTER_CODE = 1493;
var OTHER_ACCOUNT_LABEL = "Corporates";

var shellInterfaceUser = {
    username: 'RTA_COMMON_SHELL_PORTAL_ACCOUNT',
    password: 'dDv7$Q>19TyW*0Im]x^F'
};


//Local path
//var path = 'eProxy/service/transactionservice';
//SIT & UAT path
//var path = 'eProxy/service/TransactionService';
//var path= 'eProxy/service/transactionservice_CorpApp';
//PROD
var path = 'eProxy/service/TransactionService';

function createRenewTradeLicenseTransaction(trafficFileNumber, serviceId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var xmlRequest = '<![CDATA[\
			<createTransaction>\
			  <setviceCode>804</setviceCode>\
			  <trafficFileNo>' + trafficFileNumber + '</trafficFileNo>\
			  <username>' + EXTERNAL_USERNAME + '</username>\
			  <centerCode>' + CENTER_CODE + '</centerCode>\
			  <parameters>\
			    <parameter>\
			      <name>hasCivilDefence</name>\
			      <value>1</value>\
			    </parameter>\
			    <parameter>\
			      <name>isMobility</name>\
			      <value>2</value>\
			    </parameter>\
			    <parameter>\
			      <name>renewYearsCount</name>\
			      <value>1</value>\
			    </parameter>\
			    <parameter>\
			      <name>hasAuthorLetter</name>\
			      <value>1</value>\
			    </parameter>\
			  </parameters>\
			</createTransaction>\
			]]>';

    return _createTransaction(xmlRequest, trafficFileNumber, true, serviceId);
}

function createIssueTradePlateNumberTransaction(trafficFileNumber, plateNo,
    plateCFICode, insuranceOrgId, insuranceRefNo, insuranceExpiryDate,
    serviceId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var xmlRequest = '<![CDATA[\
        <createTransaction>\
		<setviceCode>221</setviceCode>\
        <trafficFileNo>' + trafficFileNumber + '</trafficFileNo>\
        <username>' + EXTERNAL_USERNAME + '</username>\
        <centerCode>1493</centerCode>\
        <attachmentsRefNo></attachmentsRefNo>\
        <isReception>1</isReception>\
        <parameters>\
          <parameter>\
            <name>pltId</name>\
            <value></value>\
          </parameter>\
          <parameter>\
            <name>cfiPlateCode</name>\
            <value>' + plateCFICode + '</value>\
          </parameter>\
          <parameter>\
            <name>pltNo</name>\
            <value>' + plateNo + '</value>\
          </parameter>\
          <parameter>\
            <name>insuranceOrgId</name>\
            <value>' + insuranceOrgId + '</value>\
          </parameter>\
          <parameter>\
            <name>insuranceRef</name>\
            <value>' + insuranceRefNo + '</value>\
          </parameter>\
          <parameter>\
            <name>insuranceExpiryDate</name>\
            <value>' + insuranceExpiryDate + '</value>\
          </parameter>\
          <parameter>\
            <name>insuranceType</name>\
            <value>1</value>\
          </parameter>\
          <parameter>\
            <name>insurCntCodes</name>\
            <value></value>\
          </parameter>\
        </parameters>\
        </createTransaction> ]]>';
    return _createTransaction(xmlRequest, trafficFileNumber, false, serviceId);
}

function createRenewTradePlateNumberTransaction(trafficFileNumber, plateNo,
    plateCFICode, insuranceOrgId, insuranceRefNo, insuranceExpiryDate,
    serviceId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var xmlRequest = '<![CDATA[\
        <createTransaction>\
		<setviceCode>222</setviceCode>\
        <trafficFileNo>' + trafficFileNumber + '</trafficFileNo>\
        <username>' + EXTERNAL_USERNAME + '</username>\
        <centerCode>1493</centerCode>\
        <attachmentsRefNo></attachmentsRefNo>\
        <isReception>1</isReception>\
        <parameters>\
          <parameter>\
            <name>pltId</name>\
            <value></value>\
          </parameter>\
          <parameter>\
            <name>cfiPlateCode</name>\
            <value>' + plateCFICode + '</value>\
          </parameter>\
          <parameter>\
            <name>pltNo</name>\
            <value>' + plateNo + '</value>\
          </parameter>\
          <parameter>\
            <name>insuranceOrgId</name>\
            <value>' + insuranceOrgId + '</value>\
          </parameter>\
          <parameter>\
            <name>insuranceRef</name>\
            <value>' + insuranceRefNo + '</value>\
          </parameter>\
          <parameter>\
            <name>insuranceExpiryDate</name>\
            <value>' + insuranceExpiryDate + '</value>\
          </parameter>\
          <parameter>\
            <name>insuranceType</name>\
            <value>1</value>\
          </parameter>\
          <parameter>\
            <name>insurCntCodes</name>\
            <value></value>\
          </parameter>\
        </parameters>\
        </createTransaction> ]]>';
    return _createTransaction(xmlRequest, trafficFileNumber, false, serviceId);
}

function applyForTrainingOnVehicleRental(requestDetail, traineesDetail,
    serviceId) {
    try {
        requestDetail.trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNo;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var xmlTraineesInfo = _setTraineesInfo(traineesDetail);
    var getPermitDetailsResponse = _getPermitDetails(requestDetail.trafficFileNumber);
    if (!getPermitDetailsResponse.isSuccessful) {
        return {
            isSuccessful: false,
            errorCode: 306,
            // 301 means error creating transaction
            message: "There is no data according to this traffic file number."
        };
    } else {
        if (getPermitDetailsResponse.permitRefNo == "") {
            return {
                isSuccessful: false,
                errorCode: 310,
                // 301 means error creating transaction
                message: "There is no permit reference number according to this traffic file number."
            };
        }
        if (getPermitDetailsResponse.subscriptionNo == "") {
            return {
                isSuccessful: false,
                errorCode: 311,
                // 301 means error creating transaction
                message: "There is no subscription number according to this traffic file number."
            };
        }
    }
    var xmlRequest = '<![CDATA[\
		<createTransaction>\
	  <setviceCode>810</setviceCode>\
	  <trafficFileNo>' + getPermitDetailsResponse.trafficFileNo + '</trafficFileNo>\
	  <username>' + EXTERNAL_USERNAME + '</username>\
	  <centerCode>' + CENTER_CODE + '</centerCode>\
	  <isReception>1</isReception>\
	  <traineesInfo>\
	  ' + xmlTraineesInfo + '\
	   </traineesInfo>\
	  <parameters>\
	     <parameter>\
	      <name>permitNo</name>\
	      <value>' + getPermitDetailsResponse.permitRefNo + '</value>\
	    </parameter>\
	    <parameter>\
	      <name>subscriptionNo</name>\
	      <value>' + getPermitDetailsResponse.subscriptionNo + '</value>\
	    </parameter>\
	  </parameters>\
	</createTransaction> ]]>';
    MFP.Logger.info(xmlRequest);
    return _createTransaction(xmlRequest, requestDetail.trafficFileNumber,
        false, serviceId);
}

function _setTraineesInfo(traineesDetail) {
    var xmlTraineesInfo = '';
    for (i in traineesDetail) {
        xmlTraineesInfo += '<traineeInfo>\
				<nameAr>' + traineesDetail[i].name + '</nameAr>\
				<nameEn>' + traineesDetail[i].name + '</nameEn>\
				<nationalityID>' + traineesDetail[i].nationalityId + '</nationalityID>\
		        <occupationID>' + traineesDetail[i].professionId + '</occupationID>\
		        <contactNo>' + traineesDetail[i].contactNo + '</contactNo>\
		        <emiratesID>' + traineesDetail[i].emiratesId + '</emiratesID>\
			</traineeInfo>';
    }
    return xmlTraineesInfo;
}

function addRemoveMemberTransactionNOC(trafficFileNo, serviceId) {
    try {
        trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNo;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var getPermitDetailsResponse = _getPermitDetails(trafficFileNo);
    if (!getPermitDetailsResponse.isSuccessful) {
        return {
            isSuccessful: false,
            errorCode: 306,
            // 301 means error creating transaction
            message: "Get Permit detail error. There is no data according to this traffic file number."
        };
    }
    MFP.Logger.info("GET ORG INFO");
    var getOrgInfoResponse = _getOrgInfo(trafficFileNo);
    if (!getOrgInfoResponse.isSuccessful) {
        return {
            isSuccessful: false,
            errorCode: 306,
            // 301 means error creating transaction
            message: "Get organisation info error. There is no data according to this traffic file number."
        };
    }

    MFP.Logger.info("GET ORG INFO");
    var xmlRequest = '<![CDATA[\
        <createTransaction>\
 <setviceCode>802</setviceCode>\
 <trafficFileNo>' + trafficFileNo + '</trafficFileNo>\
 <username>' + EXTERNAL_USERNAME + '</username>\
 <centerCode>' + CENTER_CODE + '</centerCode>\
 <attachmentsRefNo></attachmentsRefNo>\
 <isReception>1</isReception>\
 <parameters>\
   <parameter>\
     <name>transactionId</name>\
     <value></value>\
   </parameter>\
   <parameter>\
     <name>permitId</name>\
     <value>' + getPermitDetailsResponse.permitId + '</value>\
   </parameter>\
   <parameter>\
     <name>authorityId</name>\
     <value>4</value>\
   </parameter>\
   <parameter>\
     <name>organizationId</name>\
     <value>' + getOrgInfoResponse.organizationId + '</value>\
   </parameter>\
   <parameter>\
     <name>userEmirateCode</name>\
     <value>DXB</value>\
   </parameter>\
   <parameter>\
     <name>trafficFileNo</name>\
     <value>' + trafficFileNo + '</value>\
   </parameter>\
 </parameters>\
</createTransaction>\
        ]]>';

    MFP.Logger.warn("CREATE TRANSACTION");
    MFP.Logger.warn(xmlRequest);
    return _createTransaction(xmlRequest, trafficFileNo, false, serviceId);
}

function cancelTradeLicenceTransaction(trafficFileNo, permitNo, serviceId) {
    var xmlRequest = '<![CDATA[\
        <createTransaction>\
	  <setviceCode>806</setviceCode>\
	  <trafficFileNo>' + trafficFileNo + '</trafficFileNo>\
	  <username>Omnix_user</username>\
	  <centerCode>' + CENTER_CODE + '</centerCode>\
	  <isReception>1</isReception>\
	  <parameters>\
	     <parameter>\
	      <name>permitNo</name>\
	      <value>' + permitNo + '</value>\
	    </parameter>\
	    <parameter>\
	      <name>hasAuthorLet</name>\
	      <value>2</value>\
	    </parameter>\
	    <parameter>\
	      <name>hasCivilDefLet</name>\
	      <value>2</value>\
	    </parameter>\
	    <parameter>\
	      <name>printedNotes</name>\
	      <value>CML Cancel Permit notes goes here</value>\
	    </parameter>\
	  </parameters>\
	</createTransaction>\
	 ]]>';
    MFP.Logger.warn(xmlRequest);
    return _createTransaction(xmlRequest, trafficFileNo, true, serviceId);
}

function reprintTransaction(trafficFileNo, reasonType, documentReferenceNo,
    serviceId, isPublicNotary) {

    var xmlRequest = '<![CDATA[\
	        <createTransaction>\
	    <setviceCode>807</setviceCode>\
	<trafficFileNo>' + trafficFileNo + '</trafficFileNo>\
	<username>' + EXTERNAL_USERNAME + '</username>\
	<centerCode>' + CENTER_CODE + '</centerCode>\
	<attachmentsRefNo></attachmentsRefNo>\
	<isReception>1</isReception>\
	<parameters>\
	<parameter>\
	  <name>documentType</name>\
	  <value>2</value>\
	</parameter>\
	<parameter>\
	  <name>reasonType</name>\
	  <value>' + reasonType + '</value>\
	</parameter>\
	<parameter>\
	  <name>documentReferenceNo</name>\
	  <value>' + documentReferenceNo + '</value>\
	</parameter>\
	</parameters>\
	</createTransaction> ]]>';
    return _createTransaction(xmlRequest, trafficFileNo, true, serviceId);
}

function newCompanyTransaction(trafficFileNo, applicatName, mobile,
    orgRepClass, legalClassCode, isBranch, userEmirateCode, email,
    orgTypeCode, nocRequestedById, serviceId) {
    var orgId = "";
    var parentOrgId = "";
    if (trafficFileNo == "19999999") {
        orgId = "";
        isBranch = "1";
    } else {
        var getOrgInfoResponse = _getOrgInfo(trafficFileNo);
        if (!getOrgInfoResponse.isSuccessful) {
            return {
                isSuccessful: false,
                errorCode: 306,
                // 301 means error creating transaction
                message: "Get organisation info error. There is no data according to this traffic file number."
            };
        }
        parentOrgId = getOrgInfoResponse.organizationId;

        trafficFileNo = "19999999"; // change it even it's the case of a new
        // branch
        orgRepClass = "";
        legalClassCode = "";

        isBranch = "2";
    }
    var xmlRequest = '<![CDATA[\
		<createTransaction>\
		  <setviceCode>801</setviceCode>\
		  <trafficFileNo>' + trafficFileNo + '</trafficFileNo>\
		  <username>' + EXTERNAL_USERNAME + '</username>\
		  <centerCode>' + CENTER_CODE + '</centerCode>\
		  <attachmentsRefNo></attachmentsRefNo>\
		  <isReception>1</isReception>\
		  <parameters>\
		    <parameter>\
		      <name>applicantName</name>\
		      <value>' + applicatName + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>mobile</name>\
		      <value>' + mobile + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>orgRepClass</name>\
		      <value>' + orgRepClass + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>legalClassCode</name>\
		      <value>' + legalClassCode + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>organizationId</name>\
		      <value>' + orgId + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>parentOrgId</name>\
		      <value>' + parentOrgId + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>isBranch</name>\
		      <value>' + isBranch + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>userEmirateCode</name>\
		      <value>' + userEmirateCode + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>email</name>\
		      <value>' + email + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>orgTypeCode</name>\
		      <value>' + orgTypeCode + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>nocRequestedById</name>\
		      <value>' + nocRequestedById + '</value>\
		    </parameter>\
		  </parameters>\
		</createTransaction>]]>';
    MFP.Logger.warn(xmlRequest);
    
    //MGRT71
    //return _createTransaction(xmlRequest, trafficFileNo, false, serviceId);
    return _createTransaction(xmlRequest, trafficFileNo, false, serviceId);
}

function issueNocForApprovalLetter(trafficFileNo, authorityId, applicationId,
    serviceId) {
    var xmlRequest = '<![CDATA[\
	                         <createTransaction>\
	                         <setviceCode>803</setviceCode>\
	                         <trafficFileNo>' + trafficFileNo + '</trafficFileNo>\
	                         <username>' + EXTERNAL_USERNAME + '</username>\
	                         <centerCode>' + CENTER_CODE + '</centerCode>\
	                         <attachmentsRefNo></attachmentsRefNo>\
	                         <isReception>1</isReception>\
	                         <parameters>\
	                           <parameter>\
	                             <name>hasCivilDefence</name>\
	                             <value>1</value>\
	                           </parameter>\
	                           <parameter>\
	                             <name>applicationRefNo</name>\
	                             <value>' + applicationId + '</value>\
	                           </parameter>\
	                           <parameter>\
	                             <name>hasAuthorityLetter</name>\
	                             <value>1</value>\
	                           </parameter>\
	                           <parameter>\
	                             <name>userEmirateCode</name>\
	                             <value>DXB</value>\
	                           </parameter>\
	                         </parameters>\
	                       </createTransaction>]]>';
    MFP.Logger.warn(xmlRequest);
    return _createTransaction(xmlRequest, trafficFileNo, true, serviceId);
}

function renewSpecialPemit(trafficFileNo, permitCatId, permitId, sponsorTcfNumber, serviceId) {
    var xmlRequest = '<![CDATA[\
		<createTransaction>\
	  <setviceCode>125</setviceCode>\
	  <trafficFileNo>' + trafficFileNo + '</trafficFileNo>\
	 <username>' + EXTERNAL_USERNAME + '</username>\
	  <centerCode>' + CENTER_CODE + '</centerCode>\
	  <attachmentsRefNo></attachmentsRefNo>\
	  <isReception>1</isReception>\
	  <parameters>\
	       <parameter>\
	      <name>permitCatId</name>\
	      <value>' + permitCatId + '</value>\
	    </parameter>\
		<parameter>\
	      <name>specialPermitId</name>\
	      <value>' + permitId + '</value>\
	    </parameter>\
		<parameter>\
	      <name>sponsorTrfTrafficNo</name>\
	      <value>' + sponsorTcfNumber + '</value>\
	    </parameter>\
	  </parameters>\
	</createTransaction>\
	]]>';
    return _createTransaction(xmlRequest, trafficFileNo, false, serviceId);
}

function issueSpecialPemit(trafficFileNo, permitCatId, permitId, sponsorTcfNumber, reprintReason, serviceId) {
    //reprintReason : 1 : lost | 2 : damaged
    var xmlRequest = '<![CDATA[\
		<createTransaction>\
	  <setviceCode>126</setviceCode>\
	  <trafficFileNo>' + trafficFileNo + '</trafficFileNo>\
	 <username>' + EXTERNAL_USERNAME + '</username>\
	  <centerCode>' + CENTER_CODE + '</centerCode>\
	  <attachmentsRefNo></attachmentsRefNo>\
	  <isReception>1</isReception>\
	  <parameters>\
	       <parameter>\
	      <name>permitCatId</name>\
	      <value>' + permitCatId + '</value>\
	    </parameter>\
		<parameter>\
	      <name>specialPermitId</name>\
	      <value>' + permitId + '</value>\
	    </parameter>\
		<parameter>\
	      <name>sponsorTrfTrafficNo</name>\
	      <value>' + sponsorTcfNumber + '</value>\
	    </parameter>\
	    <parameter>\
	     <name>reprintReason</name>\
	    	<value>' + reprintReason + '</value>\
	    </parameter>\
	  </parameters>\
	</createTransaction>\
	]]>';
    return _createTransaction(xmlRequest, trafficFileNo, false, serviceId);
}

function issuePermit(trafficFileNo, permitCatId, permitId, sponsorTcfNumber, sponsorTrfId, permitPeriod, serviceId) {
    var xmlRequest = '<![CDATA[\
		<createTransaction>\
		  <setviceCode>125</setviceCode>\
		  <trafficFileNo>' + trafficFileNo + '</trafficFileNo>\
		  <username>' + EXTERNAL_USERNAME + '</username>\
		  <centerCode>' + CENTER_CODE + '</centerCode>\
		  <attachmentsRefNo></attachmentsRefNo>\
		  <isReception>1</isReception>\
		  <parameters>\
		    <parameter>\
		      <name>trafficFileNo</name>\
		      <value>' + trafficFileNo + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>specialPermitId</name>\
		      <value>' + permitId + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>permitCatCode</name>\
		      <value>' + permitCatId + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>sponsorTrfTrafficNo</name>\
		      <value>' + sponsorTcfNumber + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>sponsorTrfId</name>\
		      <value>' + sponsorTrfId + '</value>\
		    </parameter>\
		    <parameter>\
		      <name>permitPeriod</name>\
		      <value>' + permitPeriod + '</value>\
		    </parameter>\
		  </parameters>\
		</createTransaction>\
		]]>';
    return _createTransaction(xmlRequest, trafficFileNo, false, serviceId);
}

function issueDrivingPracticePermit(trafficFileNo, permitCatId, sponsorTcfNumber, serviceId) {
    var xmlRequest = '<![CDATA[\
		<createTransaction>\
		  <setviceCode>124</setviceCode>\
		  <trafficFileNo>' + sponsorTcfNumber + '</trafficFileNo>\
		 <username>Omnix_user</username>\
		  <centerCode>' + CENTER_CODE + '</centerCode>\
		  <attachmentsRefNo></attachmentsRefNo>\
		  <isReception>1</isReception>\
		  <parameters>\
		      <parameter>\
		      <name>permitCatId</name>\
		      <value>' + permitCatId + '</value>\
		    </parameter>\
		   <parameter>\
		      <name>sponsorTrfTrafficNo</name>\
		      <value>' + trafficFileNo + '</value>\
		    </parameter>\
		  </parameters>\
		</createTransaction>\
		]]>';
    return _createTransaction(xmlRequest, trafficFileNo, false, serviceId);
}

function convertToJson(input) {
    MFP.Logger.info('Converting XML to JSON');
    return JSON.parse(com.proxymit.utils.XmlToJsonConverter
        .convertToJson(input));
}

/**
 * This method creates a transaction by accepting a json file and converting it
 * into an XML file and issueing the transaction from the backend.
 * 
 * If proceed == true it will check if there are some other approvals. If yes it
 * will return them back to the user. Else, it will Certify the transaciton and
 * executes the GetAvailable Delivery.
 * 
 * @param jsonObj
 * @param proceed :
 *            if set to false it will create a transaction and don't proceed
 *            with checking other approvals and getting the available delivery.
 * 
 */

function _createTransaction(xmlRequest, trafficFileNumber, proceed, serviceId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd">\n\
		   <soapenv:Header>\n\
	   	<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\n\
	         <wsse:UsernameToken>\n\
				<wsse:Username>' + tibcoUsername + '</wsse:Username>\
				<wsse:Password>' + tibocPwd + '</wsse:Password>\
	         </wsse:UsernameToken>\n\
	      </wsse:Security>\n\
	   </soapenv:Header>\n\
	   <soapenv:Body>\n\
	      <sch:createTransactionRequest>\n\
	         <sch:header>\n\
	            <sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\n\
	            <sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\n\
	         </sch:header>\n\
	         <sch:request>\n\
	            ' + xmlRequest + '\n\
	         </sch:request>\n\
	         </sch:createTransactionRequest>\n\
	      </soapenv:Body>\n\
	   </soapenv:Envelope>';

    var input = {
        method: 'POST',
        returnedContentType: 'xml',
        // headers : {'SOAPAction' : soapActionHeader},
        path: path,
        body: {
            content: transactionString.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = invokeTimestampedProcedure(input, 'createTransaction');
    
    //MGRT71
    if(response.Envelope.Body.createTransactionResponse != undefined && response.Envelope.Body.createTransactionResponse.CDATA == undefined){
    	response.Envelope.Body.createTransactionResponse = {CDATA : response.Envelope.Body.createTransactionResponse};
    }
    
    //response
    MFP.Logger.warn(transactionString);
    
    if (!response.isSuccessful) {
        // Returning specific error code
        return {
            isSuccessful: false,
            errorCode: 302,
            errorMessage: "Error creating transaction",
            reference: response,
            //request: transactionString
        };
    }
   

    // return response;
    // Analyzing response for errors
    var header = response.Envelope.Header;
    if (typeof(header) == 'object' || typeof(response.Envelope.Body.createTransactionResponse) == 'undefined') {
        // return response ;
        return {
            isSuccessful: false,
            errorCode: 301,
            // 301 means error creating transaction
            message: "An error has been occured in the server. Kindly try again",
            reference: response,
        };
    }
    // Reading xml Response
    var xmlResponse = response.Envelope.Body.createTransactionResponse.CDATA;
    /*return {
    	resp: xmlResponse,
    	request: transactionString.toString()
    }*/
    var createTransObj = convertToJson(xmlResponse);
    var status = createTransObj.transactionResponse['transaction-info'].status;

    var toReturn = {
        status: status,
        result: {}
    };
    // If status = failed, ensure that violations is an Array
    if (status == 'Failed') {
        // Get violations obj
        var violations = createTransObj.transactionResponse['transaction-info'].violations;
        if (!Array.isArray(violations)) {
            violations = [violations];
            createTransObj.transactionResponse['transaction-info'].violations = violations;
        }

        if (typeof violations !== "undefined") {
            var violation = violations[0].violation;
            if (Array.isArray(violation)) {
                for (i in violation) {
                    if (typeof violation[i]["description-en"] != "undefined") {

                        var viol = violation[i]["description-en"];
                        violation[i]["description-en"] = viol.replace(
                            /^.*\-::-/g, '- ');
                    }
                }
            } else {
                if (typeof violation["description-en"] != "undefined") {

                    var viol = violation["description-en"];
                    violation["description-en"] = viol.replace(/^.*\-::-/g,
                        '- ');
                }
            }
        }

        toReturn.result = {
            violations: violations
        };

    } else {
        var transactionId = createTransObj.transactionResponse['transaction-info'].transactionId;

        // Get available delivery
        // var deliveryDetails = getAvailableDelivery(transactionId);
        // toReturn.transactionId = transactionId;
        // toReturn.result = {
        // delivery : deliveryDetails,
        // transactionDetails :
        // createTransObj.transactionResponse['transaction-info']
        // };
        MFP.Logger.info('Successfully createdconvertToJson transaction id ' + transactionId);
        if (proceed) {
            return certifyAndCheckApprovals(transactionId, trafficFileNumber,
                serviceId);
        } else {
            // Get available delivery
            var deliveryDetails = getAvailableDelivery(transactionId);
            
           if (deliveryDetails == null) {
                return {
                    "isSuccessful": true,
                    "result": {
                        "violations": [{
                            "violation": {
                                "description-ar": "حدث خطأ عند الحصول على تسليم المتاحة. يرجى المحاولة لاحقا",
                                "description-en": "An error has been occurred when getting available delivery. Kindly try later."
                            }
                        }]
                    },
                    "status": "Failed"
                };
            }
            toReturn.result = {
                delivery: deliveryDetails,
                transactionDetails: createTransObj.transactionResponse['transaction-info']
            };
        }
    }

    return toReturn;

}

function getAvailableDelivery(transactionId) {
    var requestString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
	   	<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\n\
	         <wsse:UsernameToken>\
	           <wsse:Username>' + tibcoUsername + '</wsse:Username>\
		<wsse:Password>' + tibocPwd + '</wsse:Password>\
		</wsse:UsernameToken>\n\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:getAvailableDeliveryRequest>\n\
	         <sch:header>\
	            <sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\
	            <sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\
	         </sch:header>\
	         <sch:centerCode>' + CENTER_CODE + '</sch:centerCode>\
	         <sch:transactionId>' + transactionId + '</sch:transactionId>\
	      </sch:getAvailableDeliveryRequest>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

    var input = {
        method: 'POST',
        returnedContentType: 'xml',
        // headers : {'SOAPAction' : soapActionHeader},
        path: path,
        body: {
            content: requestString.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = invokeTimestampedProcedure(input, 'getAvailableDelivery');
    // return response;
    // Analyzing response for errors
    var header = response.Envelope.Header;
    if (typeof(header) == 'object' || typeof(response.Envelope.Body.getAvailableDeliveryResponse) == 'undefined') {
        return {
            isSuccessful: false,
            errorCode: 301,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
                // 301 means error creating transaction
        };
    }
    if(response.Envelope.Body.getAvailableDeliveryResponse != undefined && response.Envelope.Body.getAvailableDeliveryResponse.CDATA == undefined){
        response.Envelope.Body.getAvailableDeliveryResponse = {CDATA : response.Envelope.Body.getAvailableDeliveryResponse};
    }
    // Reading xml Response
    var xmlResponse = response.Envelope.Body.getAvailableDeliveryResponse.CDATA;
    // MFP.Logger.info("Lqst index ==
    // "+xmlResponse.indexOf('</availableDeliveryDetails>'));
    
    xmlResponse = _unescapeXml(xmlResponse);
    
    xmlResponse = xmlResponse.replace("& ", "&amp; ");

    xmlResponse = xmlResponse.replace("<?xml version='1.0' encoding='utf-8'?>",
        "");
    xmlResponse = xmlResponse.replace(
        "<?xml version='1.0' encoding='utf-8' ?>", "");
    xmlResponse = xmlResponse.replace(
        '<?xml version="1.0" encoding="UTF-8" ?>', "");
    xmlResponse = xmlResponse.replace('<?xml version="1.0" encoding="UTF-8"?>',
        "");
    // Remove all xml after closing root tag
    xmlResponse = xmlResponse.substring(0, xmlResponse
        .indexOf('</availableDeliveryDetails>') + 27);

    xmlResponse = xmlResponse.replace('<shereEmail>\
			</status>\
			</shereEmail>', '');
    xmlResponse = xmlResponse.replace('<shereEmail>\n			</status>\n			</shereEmail>', '');
    xmlResponse = xmlResponse.replace('<shereEmail>\n</status>\n</shereEmail>', '');
    MFP.Logger.info('xmlResponse');
    MFP.Logger.info(xmlResponse);
    MFP.Logger.warn(xmlResponse);
    // xmlResponse + '</availableDeliveryDetails>');
    MFP.Logger.warn("begin converting XML to JSON");
    var deliveryOptions = convertToJson(xmlResponse);
    MFP.Logger.warn(deliveryOptions);
    try {
        collectionCentersList = deliveryOptions.availableDeliveryDetails.deliverModes.collection.centersList.center;
        collectionCentersList = Array.isArray(collectionCentersList) ? collectionCentersList : [collectionCentersList];
        deliveryOptions.availableDeliveryDetails.deliverModes.collection.centersList.center = collectionCentersList;
        for (i in deliveryOptions.availableDeliveryDetails.deliverModes.collection.centersList.center) {
            if (deliveryOptions.availableDeliveryDetails.deliverModes.collection.centersList.center[i].calender) {
                collectionCalenders = deliveryOptions.availableDeliveryDetails.deliverModes.collection.centersList.center[i].calender;
                collectionCalenders = Array.isArray(collectionCalenders) ? collectionCalenders : [collectionCalenders];
                deliveryOptions.availableDeliveryDetails.deliverModes.collection.centersList.center[i].calender = collectionCalenders;
            }
        }
    } catch (e) {
        MFP.Logger.warn(e);
    }
    try {
        if (deliveryOptions.availableDeliveryDetails.deliverModes.courier.courierCalenderList != "" && deliveryOptions.availableDeliveryDetails.deliverModes.courier.courierCalenderList.calender) {
            courierCalenders = deliveryOptions.availableDeliveryDetails.deliverModes.courier.courierCalenderList.calender;
            courierCalenders = Array.isArray(courierCalenders) ? courierCalenders : [courierCalenders];
            deliveryOptions.availableDeliveryDetails.deliverModes.courier.courierCalenderList.calender = courierCalenders;
        }
    } catch (e) {
        MFP.Logger.warn(e);
    }
    return deliveryOptions;
}

function setDeliveryByType(deliveryType, parameters, serviceId) {
    if (deliveryType == 'collection') {
        return setDeliveryCollection(parameters[0], parameters[1],
            parameters[2], parameters[3], parameters[4], parameters[5],
            serviceId);
    }
    if (deliveryType == 'courier') {
        return setDeliveryCourier(parameters[0], parameters[1], parameters[2],
            parameters[3], parameters[4], parameters[5], parameters[6],
            parameters[7], parameters[8], parameters[9], parameters[10],
            serviceId);
    }
    if (deliveryType == 'mnoc') {
        return setDeliveryMnoc(parameters[0], parameters[1], parameters[2],
            parameters[3], serviceId);
    }
    return {
        isSuccessful: false,
        errorCode: 301,
        message: "Incorrect delivery type"
    };
}

function setDeliveryCollection(transactionId, email, mobileNo, deliveryDate,
    processingCenterID, trafficFileNumber, serviceId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    // Delivery date format : 10-09-2014
    var innerXml = '<![CDATA[<setAvailableDelivery>\
		<transactionId>' + transactionId + '</transactionId>\
		<shareEmail></shareEmail>\
		<centerCode>' + CENTER_CODE + '</centerCode>\
		<customerContactInfo>\
		 <prefEmail>' + email + '</prefEmail>\
		<prefMobile>' + mobileNo + '</prefMobile>\
		<prefPhone>045435643</prefPhone>\
		<prefPOBox></prefPOBox>\
		</customerContactInfo>\
		<deliveryDetails>\
		 <trsMode>2</trsMode>\
		<trsDeliveryDate>' + deliveryDate + '</trsDeliveryDate>\
		<trsCenterID>' + processingCenterID + '</trsCenterID>\
		<trsShareEmail></trsShareEmail>\
		<customerShipmentDetails>\
		 <prefContactName>No Name</prefContactName>\
		<prefAddressLine1>NO Address</prefAddressLine1>\
		<prefAddressLine2></prefAddressLine2>\
		<prefArea></prefArea>\
		<emiCode></emiCode>\
		</customerShipmentDetails>\
		<mailDeliveryData>\
		 <mailType></mailType>\
		<mailMobile></mailMobile>\
		<isShipped></isShipped>\
		<mailName></mailName>\
		<mailEmail></mailEmail>\
		<mailPOBox></mailPOBox>\
		<emirateCode></emirateCode>\
		<bookletId></bookletId>\
		</mailDeliveryData>\
		</deliveryDetails>\
		</setAvailableDelivery>]]>';

    return _setAvailableDelivery(innerXml, trafficFileNumber, transactionId,
        serviceId);
}

function setDeliveryCourier(transactionId, email, mobileNo, deliveryDate,
    processingCenterID, address, area, contactName, emirate,
    trafficFileNumber, phoneNo, serviceId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var innerXml = '<![CDATA[<setAvailableDelivery>\
		<transactionId>' + transactionId + '</transactionId>\
	<shareEmail>' + email + '</shareEmail>\
	<centerCode>' + CENTER_CODE + '</centerCode>\
	<customerContactInfo>\
	 <prefEmail>' + email + '</prefEmail>\
	<prefMobile>' + mobileNo + '</prefMobile>\
	<prefPhone>045435643</prefPhone>\
	<prefPOBox>1493</prefPOBox>\
		</customerContactInfo>\
		<deliveryDetails>\
		 <trsMode>1</trsMode>\
		<trsDeliveryDate>' + deliveryDate + '</trsDeliveryDate>\
		<trsCenterID>' + processingCenterID + '</trsCenterID>\
		<trsShareEmail>' + email + '</trsShareEmail>\
		<customerShipmentDetails>\
		 <prefContactName>' + contactName + '</prefContactName>\
		<prefAddressLine1>' + address + '</prefAddressLine1>\
		<prefAddressLine2></prefAddressLine2>\
		<prefArea>' + area + '</prefArea>\
		<emiCode>' + emirate + '</emiCode>\
		</customerShipmentDetails>\
		<mailDeliveryData>\
		 <mailType></mailType>\
		<mailMobile></mailMobile>\
		<isShipped></isShipped>\
		<mailName></mailName>\
		<mailEmail></mailEmail>\
		<mailPOBox></mailPOBox>\
		<emirateCode></emirateCode>\
		<bookletId></bookletId>\
		</mailDeliveryData>\
		</deliveryDetails>\
		</setAvailableDelivery>]]>';
    return _setAvailableDelivery(innerXml, trafficFileNumber, transactionId,
        serviceId);
}

function setDeliveryMnoc(transactionId, email, mobileNo, trafficFileNumber,
    serviceId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var innerXml = '<![CDATA[<setAvailableDelivery>\
		<transactionId>' + transactionId + '</transactionId>\
		<shareEmail>' + email + '</shareEmail>\
		<centerCode>' + CENTER_CODE + '</centerCode>\
		<customerContactInfo>\
		 <prefEmail>' + email + '</prefEmail>\
		<prefMobile>' + mobileNo + '</prefMobile>\
		<prefPhone></prefPhone>\
		<prefPOBox></prefPOBox>\
		</customerContactInfo>\
		<deliveryDetails>\
		 <trsMode>3</trsMode>\
		<trsDeliveryDate></trsDeliveryDate>\
		<trsCenterID></trsCenterID>\
		<trsShareEmail></trsShareEmail>\
		<customerShipmentDetails>\
		 <prefContactName></prefContactName>\
		<prefAddressLine1></prefAddressLine1>\
		<prefAddressLine2></prefAddressLine2>\
		<prefArea></prefArea>\
		<emiCode></emiCode>\
		</customerShipmentDetails>\
		<mailDeliveryData>\
		 <mailType></mailType>\
		<mailMobile></mailMobile>\
		<isShipped></isShipped>\
		<mailName></mailName>\
		<mailEmail></mailEmail>\
		<mailPOBox></mailPOBox>\
		<emirateCode></emirateCode>\
		<bookletId></bookletId>\
		</mailDeliveryData>\
		</deliveryDetails>\
		</setAvailableDelivery>]]>';
    return _setAvailableDelivery(innerXml, trafficFileNumber, transactionId,
        serviceId);
}

function _setAvailableDelivery(innerXml, trafficFileNumber, transactionId,
    serviceId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var requestString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
	   	<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\n\
	         <wsse:UsernameToken>\
	           <wsse:Username>' + tibcoUsername + '</wsse:Username>\
		<wsse:Password>' + tibocPwd + '</wsse:Password>\
		</wsse:UsernameToken>\n\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:setAvailableDeliveryRequest>\
	         <sch:header>\
	            <sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\
	            <sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\
	         </sch:header>\
	         <sch:request>' + innerXml + '</sch:request>\
	      </sch:setAvailableDeliveryRequest>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

    var input = {
        method: 'POST',
        returnedContentType: 'xml',
        // headers : {'SOAPAction' : soapActionHeader},
        path: path,
        body: {
            content: requestString.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = invokeTimestampedProcedure(input, 'setAvailableDelivery');

    if (typeof response.Envelope.Body == "undefined" || typeof response.Envelope.Body.setAvailableDeliveryResponse == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 301,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }
    if(response.Envelope.Body.setAvailableDeliveryResponse != undefined && response.Envelope.Body.setAvailableDeliveryResponse.CDATA == undefined){
        response.Envelope.Body.setAvailableDeliveryResponse = {CDATA : response.Envelope.Body.setAvailableDeliveryResponse};
    }
    // Reading xml Response
    var xmlResponse = null;
    if (xmlResponse = response.Envelope.Body.setAvailableDeliveryResponse.CDATA != undefined)
        xmlResponse = response.Envelope.Body.setAvailableDeliveryResponse.CDATA;
    else
        xmlResponse = _unescapeXml(response.Envelope.Body.setAvailableDeliveryResponse);

    xmlResponse = xmlResponse.replace("<?xml version='1.0' encoding='utf-8'?>",
        "");
    xmlResponse = xmlResponse.replace(
        "<?xml version='1.0' encoding='utf-8' ?>", "");
    xmlResponse = xmlResponse.replace(
        '<?xml version="1.0" encoding="UTF-8" ?>', "");
    xmlResponse = xmlResponse.replace('<?xml version="1.0" encoding="UTF-8"?>',
        "");
    xmlResponse = '<result>' + xmlResponse + '</result>';

    var setDeliveryResponse = convertToJson(xmlResponse);
    var toReturn = {
        status: setDeliveryResponse.result.status,
        result: {}
    };
    if (setDeliveryResponse.result.status == 'Failed') {
        toReturn.result = {
            deliveryDetails: setDeliveryResponse
        };
        return toReturn;
    }
    var reCertifyResult = reCertifyTransaction(trafficFileNumber,
        transactionId, serviceId);
    toReturn.result = {
        reCertifyResult: reCertifyResult,
        deliveryDetails: setDeliveryResponse
    };
    return toReturn;
}

function getTransactionStatus(transactionId) {

    var requestString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
	   	<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\n\
	         <wsse:UsernameToken>\
	           <wsse:Username>' + tibcoUsername + '</wsse:Username>\
		<wsse:Password>' + tibocPwd + '</wsse:Password>\
	         </wsse:UsernameToken>\n\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:getTransactionStatusRequest>\
	         <sch:header>\
	            <sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\
	            <sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\
	         </sch:header>\
	         <sch:transactionId>' + transactionId + '</sch:transactionId>\
	         <sch:userName>' + EXTERNAL_USERNAME + '</sch:userName>\
	      </sch:getTransactionStatusRequest>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

    var input = {
        method: 'POST',
        returnedContentType: 'xml',
        // headers : {'SOAPAction' : soapActionHeader},
        path: path,
        body: {
            content: requestString.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = invokeTimestampedProcedure(input, 'getTransactionStatus');
    //to remove
    return{
    	request:requestString.toString(),
    	response: response
    }
    // return response;
    // Analyzing response for errors
    var header = response.Envelope.Header;
    if (typeof(header) == 'object' || typeof(response.Envelope.Body.getTransactionStatusResponse) == 'undefined') {
        return {
            isSuccessful: false,
            errorCode: 301,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
                // 301 means error creating transaction
        };
    }
    if(response.Envelope.Body.getTransactionStatusResponse != undefined && response.Envelope.Body.getTransactionStatusResponse.CDATA == undefined){
        response.Envelope.Body.getTransactionStatusResponse = {CDATA : response.Envelope.Body.getTransactionStatusResponse};
    }
    // Reading xml Response
    var xmlResponse = response.Envelope.Body.getTransactionStatusResponse.CDATA;

    // Remove all xml after closing root tag
    xmlResponse = xmlResponse.substring(0, xmlResponse
        .indexOf('</transactionResponse>') + 22);
    var deliveryOptions = convertToJson(xmlResponse);

    deliveryOptions.isSuccessful = true;

    return deliveryOptions;
    // return response;
}

function certifyAndCheckApprovals(transactionId, trafficFileNumber, serviceCode) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
        // return { "isSuccessful": true};
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var eTrafficServiceCode = _getServiceCode(serviceCode);

    var certifyTransactionResponse = {};
    if (eTrafficServiceCode == "802" || eTrafficServiceCode == "801") {
        certifyTransactionResponse = certifyTransaction(trafficFileNumber,
            transactionId, serviceCode);
    } else {
        certifyTransactionResponse = getTransactionStatus(transactionId);
    }

    // This method certifies a transaction and calculates the approvals. If no
    // approvals, it will return getAvailableDelivery
    MFP.Logger.info('Certify And Check Approvals for transaction id = ' + transactionId);

    MFP.Logger.info('certifyTransactionResponse');
    MFP.Logger.info(certifyTransactionResponse);

    if (!certifyTransactionResponse.isSuccessful && certifyTransactionResponse.result != undefined && Array.isArray(certifyTransactionResponse.result.violations) && certifyTransactionResponse.result.violations.length > 0) {
        return {
            isSuccessful: true,
            result: certifyTransactionResponse.result
        };
    }
    if (!certifyTransactionResponse.isSuccessful)
        return certifyTransactionResponse;
    // Checks the approvals
    var hasOtherApprovalsResponse = hasOtherApprovals(transactionId);
    MFP.Logger.info('hasOtherApprovalsResponse');
    MFP.Logger.info(hasOtherApprovalsResponse);
    if (!hasOtherApprovalsResponse.isSuccessful)
        return hasOtherApprovalsResponse;

    if (hasOtherApprovalsResponse.needsApproval) {

        return {
            result: {
                transactionId: transactionId,
                delivery: getAvailableDelivery(transactionId),
                approvals: true,
                approvalsList: hasOtherApprovalsResponse.approvalsList,
                transactionDetails: certifyTransactionResponse.transactionResponse['transaction-info']
            }
        };
    } else {
        // Invoke Get Available Delivery
        var deliveryDetails = getAvailableDelivery(transactionId);

        if (deliveryDetails == null) {
            return {
                "isSuccessful": true,
                "result": {
                    "violations": [{
                        "violation": {
                            "description-ar": "حدث خطأ عند الحصول على تسليم المتاحة. يرجى المحاولة لاحقا",
                            "description-en": "An error has been occurred when getting available delivery. Kindly try later."
                        }
                    }]
                },
                "status": "Failed"
            };
        }

        MFP.Logger.info('deliveryDetails');
        MFP.Logger.info(deliveryDetails);
        return {
            result: {
                transactionId: transactionId,
                delivery: deliveryDetails,

                approvals: false,
                transactionDetails: certifyTransactionResponse.transactionResponse['transaction-info']
            }
        };
    }

    toReturn.transactionId = transactionId;
    toReturn.result = {
        delivery: deliveryDetails,
        transactionDetails: createTransObj.transactionResponse['transaction-info']
    };
}

function certifyTransaction(trafficFileNumber, transactionId, serviceId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var serviceCode = _getServiceCode(serviceId);

    var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
	   	<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\n\
	         <wsse:UsernameToken>\
	           <wsse:Username>' + tibcoUsername + '</wsse:Username>\
		<wsse:Password>' + tibocPwd + '</wsse:Password>\
		</wsse:UsernameToken>\n\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:certifyTransactionRequest>\
	         <sch:header>\
	            <sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\
	            <sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\
	         </sch:header>\
	         <sch:certifyTransactionRequest><![CDATA[\
				<certifyTransaction>\
			    <setviceCode>' + serviceCode + '</setviceCode>\
			   <trafficFileNo>' + trafficFileNumber + '</trafficFileNo>\
			   <username>' + EXTERNAL_USERNAME + '</username>\
			   <centerCode>' + CENTER_CODE + '</centerCode>\
			   <attachmentsRefNo></attachmentsRefNo>\
			    <parameters>\
			            <parameter>\
			                   <name>transactionId</name>\
			                  <value>' + transactionId + '</value>\
			            </parameter>\
			    </parameters>\
			</certifyTransaction>\
			]]></sch:certifyTransactionRequest>\
	      </sch:certifyTransactionRequest>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

    var input = {
        method: 'POST',
        returnedContentType: 'xml',
        // headers : {'SOAPAction' : soapActionHeader},
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    MFP.Logger.warn("certfify request");
    MFP.Logger.warn(rq);
    var response = invokeTimestampedProcedure(input, 'certifyTransaction');
    
    
    var certifyObj = null;
    var success = response.isSuccessful;
    var violations = null;
    if (response.Envelope != undefined && response.Envelope.Body != undefined && response.Envelope.Body.certifyTransactionResponse != undefined && response.Envelope.Body.certifyTransactionResponse.certifyTransactionResponse != undefined) {
        var certifyXml = response.Envelope.Body.certifyTransactionResponse.certifyTransactionResponse;
        certifyObj = convertToJson(certifyXml);

        try {
            var status = certifyObj.transactionResponse['transaction-info'].status;
            MFP.Logger.info('Status == ' + status);
            success = (status == 'Certified');
            if (certifyObj.transactionResponse['transaction-info'].violations != undefined) {
                var v = certifyObj.transactionResponse['transaction-info'].violations;
                if (!Array.isArray(v)) {
                    violations = [v];
                } else {
                    violations = v;
                }
            }
        } catch (e) {}

    } else {
        success = false;
    }

    // toReturn.result = {
    // violations : violations
    // };
    if (!success) {
        return {
            isSuccessful: false,
            errorCode: 304,
            reference: response,
            result: {
                violations: violations
            }
        };
    } else {
        certifyObj.isSuccessful = true;
        return certifyObj;
    }
}

function reCertifyRenewTradeLicenseTransaction(trafficFileNumber, centerCode,
    transactionId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var xmlRequest = '<![CDATA[\
		<createTransaction>\
		<setviceCode>804</setviceCode>\
		<trafficFileNo>' + trafficFileNumber + '</trafficFileNo>\
		<username>' + EXTERNAL_USERNAME + '</username>\
		<centerCode>' + centerCode + '</centerCode>\
			<parameters>\
				<parameter>\
						<name>transactionId</name>\
						<value>' + transactionId + '</value>\
				</parameter>\
			</parameters>\
		</createTransaction>\
						]]>';

    return _reCertifyTransaction(xmlRequest, transactionId);
}

function _getServiceCode(serviceId) {
    serviceCodes = {
        "1070": "804",
        "-1": "803",
        "263": "807",
        "1002": "802",
        "257": "801",
        "260": "806",
        "248": "810",
        "554": "810",
        "552": "806",
        "553": "807",
        "555": "802",
        "550": "801",
        "551": "804",
        "1180": "125",
        "1188": "126",
        "214": "125",
        "244": "222",
        "243": "221"
    };

    return serviceCodes[serviceId];
}

function reCertifyTransaction(trafficFileNumber, transactionId, serviceId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var serviceCode = _getServiceCode(serviceId);

    if (serviceCode == undefined || serviceCode == "" || serviceCode == null) {
        serviceCode = "222";
    }

    var xmlRequest = '<![CDATA[\
		<createTransaction>\
		<setviceCode>' + serviceCode + '</setviceCode>\
		<trafficFileNo>' + trafficFileNumber + '</trafficFileNo>\
		<username>' + EXTERNAL_USERNAME + '</username>\
		<centerCode>' + CENTER_CODE + '</centerCode>\
			<parameters>\
				<parameter>\
						<name>transactionId</name>\
						<value>' + transactionId + '</value>\
				</parameter>\
			</parameters>\
		</createTransaction>\
						]]>';

    return _reCertifyTransaction(xmlRequest, transactionId);
}

function reCertifyIssueTradePlateNumberTransaction(trafficFileNumber,
    centerCode, transactionId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var xmlRequest = '<![CDATA[\
		<createTransaction>\
		<setviceCode>221</setviceCode>\
		<trafficFileNo>' + trafficFileNumber + '</trafficFileNo>\
		<username>' + EXTERNAL_USERNAME + '</username>\
		<centerCode>' + centerCode + '</centerCode>\
			<parameters>\
				<parameter>\
						<name>transactionId</name>\
						<value>' + transactionId + '</value>\
				</parameter>\
			</parameters>\
		</createTransaction>\
						]]>';

    return _reCertifyTransaction(xmlRequest, transactionId);
}

function reCertifyRenewTradePlateNumberTransaction(trafficFileNumber,
    centerCode, transactionId) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var xmlRequest = '<![CDATA[\
		<createTransaction>\
		<setviceCode>222</setviceCode>\
		<trafficFileNo>' + trafficFileNumber + '</trafficFileNo>\
		<username>' + EXTERNAL_USERNAME + '</username>\
		<centerCode>' + centerCode + '</centerCode>\
			<parameters>\
				<parameter>\
						<name>transactionId</name>\
						<value>' + transactionId + '</value>\
				</parameter>\
			</parameters>\
		</createTransaction>\
						]]>';

    return _reCertifyTransaction(xmlRequest, transactionId);
}

function _reCertifyTransaction(xmlRequest, transactionId) {

    var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd"\
		  xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\
	   <soapenv:Header>\
	      <wsse:Security>\
	         <wsse:UsernameToken>\
	           <wsse:Username>' + tibcoUsername + '</wsse:Username>\
		<wsse:Password>' + tibocPwd + '</wsse:Password>\
		</wsse:UsernameToken>\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:reCertifyTransactionRequest>\
	         <sch:header>\
	            <sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\
	            <sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\
	         </sch:header>\
	         <sch:request>' + xmlRequest + '</sch:request>\
	      </sch:reCertifyTransactionRequest>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

    var input = {
        method: 'POST',
        returnedContentType: 'xml',
        // headers : {'SOAPAction' : soapActionHeader},
        path: path,
        body: {
            content: transactionString.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = invokeTimestampedProcedure(input, 'recertifyTransaction');
    MFP.Logger.info(response);
    // return response;
    // Analyzing response for errors
    var header = response.Envelope.Header;
    if (typeof(header) == 'object' || typeof(response.Envelope.Body.reCertifyTransactionResponse) == 'undefined') {
        return {
            isSuccessful: false,
            errorCode: 301,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
                // 301 means error creating transaction
        };
    }
    if(response.Envelope.Body.reCertifyTransactionResponse != undefined && response.Envelope.Body.reCertifyTransactionResponse.CDATA == undefined){
        response.Envelope.Body.reCertifyTransactionResponse = {CDATA : response.Envelope.Body.reCertifyTransactionResponse};
    }
    // Reading xml Response
    var xmlResponse = response.Envelope.Body.reCertifyTransactionResponse.CDATA;
    var createTransObj = convertToJson(xmlResponse);
    var status = createTransObj.transactionResponse['transaction-info'].status;

    var toReturn = {
        status: status,
        result: {}
    };
    // If status = failed, ensure that violations is an Array
    if (status == 'Failed') {
        // Get violations obj
        var violations = createTransObj.transactionResponse['transaction-info'].violations;
        if (!Array.isArray(violations)) {
            violations = [violations];
            createTransObj.transactionResponse['transaction-info'].violations = violations;
        }

        toReturn.result = {
            violations: violations
        };

    } else {
        // var transactionId =
        // createTransObj.transactionResponse['transaction-info'].transactionId;

        // ReCertify transaction
        // var deliveryDetails = getAvailableDelivery(transactionId);
        // toReturn.transactionId = transactionId;

        // Check total amount if it's 0 or not

        /*
         * var needOtherApproval = false ; var transactionTotalAmount =
         * parseFloat(createTransObj.transactionResponse['transaction-info'].transactionTotalAmount +
         * ''); if(transactionTotalAmount == 0){ var approvalsResponse =
         * hasOtherApprovals(transactionId); if(approvalsResponse.isSuccessful ==
         * false) return approvalsResponse ; //Exception will be thrown client
         * side
         * 
         * var needOtherApproval = approvalsResponse.needsApproval ; }
         */

        toReturn.result = {
            // delivery : deliveryDetails,
            transactionDetails: createTransObj.transactionResponse['transaction-info'],
            // approvals : needOtherApproval,
            // approvalsList : approvalsResponse.approvalsList
        };
    }
    return toReturn;
}

function hasOtherApprovals(transactionId) {

    var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
	   	<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\n\
	         <wsse:UsernameToken>\
	           <wsse:Username>' + tibcoUsername + '</wsse:Username>\
		<wsse:Password>' + tibocPwd + '</wsse:Password>\
		</wsse:UsernameToken>\n\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:getTransactionAuthorityNOCRequest>\
	         <sch:header>\
	            <sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\
	            <sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\
	         </sch:header>\
	         <sch:transactionId>' + transactionId + '</sch:transactionId>\
	         <sch:userName>' + EXTERNAL_USERNAME + '</sch:userName>\
	         <sch:centerCode>' + CENTER_CODE + '</sch:centerCode>\
	      </sch:getTransactionAuthorityNOCRequest>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

    MFP.Logger.info(rq);
    var input = {
        method: 'POST',
        returnedContentType: 'xml',
        // headers : {'SOAPAction' : soapActionHeader},
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = invokeTimestampedProcedure(input, 'getTransactionAuthorityNOC');
    // MFP.Logger.info(response.Envelope.Body.getTransactionAuthorityNOCResponse);
    if (!response.isSuccessful)
        return false;

    var toParse = null;
    try {
        toParse = response.Envelope.Body.getTransactionAuthorityNOCResponse.getTransactionAuthorityNOCReturn;
    } catch (e) {
        return {
            isSuccessful: false,
            errorMessage: 'failed to parse other approvals response',
            errorCode: 305,
            reference: response,
            request:rq.toString()
        };
    }

    // analyse response

    if (toParse != null) {
        toParse = toParse.replace("<?xml version='1.0' encoding='utf-8'?>", "");
        toParse = toParse
            .replace("<?xml version='1.0' encoding='utf-8' ?>", "");
        toParse = toParse
            .replace('<?xml version="1.0" encoding="UTF-8" ?>', "");
        toParse = toParse.replace('<?xml version="1.0" encoding="UTF-8"?>', "");
        toParse = '<approvals>' + toParse + '</approvals>';
        MFP.Logger.info(toParse);

        var approvalsObj = convertToJson(toParse);

        if (approvalsObj && approvalsObj.approvals != undefined && approvalsObj.approvals.authorities != undefined) {
            // needsApproval = true ;

            if (approvalsObj.approvals.authorities == "") {
                approvalsObj.approvals.authorities = undefined;
                needsApproval = false;
            } else {
                if (!Array.isArray(approvalsObj.approvals.authorities)) {
                    approvalsObj.approvals.authorities = [approvalsObj.approvals.authorities];
                }
                needsApproval = approvalsObj.approvals.authorities.length > 0;
            }
        } else {
            needsApproval = false;
        }

        return {
            isSuccessful: true,
            needsApproval: needsApproval,
            approvalsList: approvalsObj
        };

    } else {
        return {
            isSuccessful: false,
            errorMessage: 'failed to parse other approvals response',
            reference: response,
            errorCode: 305,
            request:rq.toString()
        };
    };
    // var approvalsObj = convertToJson(toParse);

    // return approvalsObj ;
}

function processTransactionOtherApprovals(transactionId, trafficFileNumber,
    serviceCode, deliveryMethod) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
        // if(deliveryMethod == null || deliveryMethod != 'mnoc'){
        // //Change the delivery method to MNOC
        // try{
        // setDeliveryMnoc(transactionId, 'dummyemail@test.ae', '971501234567',
        // trafficFileNumber) ;
        // }catch(e){MFP.Logger.error(e);}
        // }
        // GetReports now return reports in case of M-Letter regardless of the
        // delivery type. So no need for this workaround.
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    return processTransaction(transactionId, trafficFileNumber, serviceCode,
        deliveryMethod);
}

function setTransactionAuthoritiesNOS(transactionId, arrayOfAuthoritiesObject) {
    var xmlAuthorities = "";
    for (i in arrayOfAuthoritiesObject) {
        xmlAuthorities += "<authority>\
	      <id>" + arrayOfAuthoritiesObject[i].id + "</id>\
	      <isRequested>" + arrayOfAuthoritiesObject[i].isRequested + "</isRequested>\
	 </authority>";
    }
    var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
    <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/" soapenv:mustUnderstand="0">\
       <wsse:UsernameToken>\
         <wsse:Username>' + tibcoUsername + '</wsse:Username>\
		<wsse:Password>' + tibocPwd + '</wsse:Password>\
		</wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <sch:setTransactionAuthorityNOCRequest>\
       <sch:header>\
          <sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\
          <sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\
       </sch:header>\
       <sch:setTransactionAuthorityRequest><![CDATA[<transactionAuthorityNocs>\
	      <transactionId>' + transactionId + '</transactionId>\
	      <username>' + EXTERNAL_USERNAME + '</username>\
	      <centerCode>' + CENTER_CODE + '</centerCode>\
	      <authorities>\
		' + xmlAuthorities + '\
	      </authorities>\
	      </transactionAuthorityNocs> ]]></sch:setTransactionAuthorityRequest>\
    </sch:setTransactionAuthorityNOCRequest>\
 </soapenv:Body>\
</soapenv:Envelope>';
    var input = {
        method: 'POST',
        returnedContentType: 'xml',
        // headers : {'SOAPAction' : soapActionHeader},
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    MFP.Logger.warn("######request########");
    MFP.Logger.warn(rq);
    var response = invokeTimestampedProcedure(input, 'setTransactionAuthorityNOS');
    MFP.Logger.warn("###########response###########");
    MFP.Logger.warn(response);
    if (typeof response.Envelope.Body.setTransactionAuthorityNOCResponse.setTransactionAuthorityNOCReturn != "undefined") {
        var xmlResponse = response.Envelope.Body.setTransactionAuthorityNOCResponse.setTransactionAuthorityNOCReturn;
        xmlResponse = xmlResponse.replace(
            "<?xml version='1.0' encoding='utf-8'?>", "");
        xmlResponse = xmlResponse.replace(
            "<?xml version='1.0' encoding='utf-8' ?>", "");
        xmlResponse = xmlResponse.replace(
            '<?xml version="1.0" encoding="UTF-8" ?>', "");
        xmlResponse = xmlResponse.replace(
            '<?xml version="1.0" encoding="UTF-8"?>', "");
        xmlResponse = '<response>' + xmlResponse + '</response>';
        MFP.Logger.warn(xmlResponse);
        var createTransObj = convertToJson(xmlResponse);
        MFP.Logger.warn("#############xmlResponse#########");
        MFP.Logger.warn(createTransObj);

        var status = (createTransObj.response.setTransactionAuthorityNocsResponse != undefined) ? createTransObj.response.setTransactionAuthorityNocsResponse.responseCode : createTransObj.response.responseCode;
        if (status != "0") {
            return {
                isSuccessful: false,
                errorMessage: 'An error has been occured when trying to set approvals data',
                errorCode: 301,
                reference: createTransObj,
            };
        }
        return {
            isSuccessful: true,
            code: status
        };
        return {
            isSuccessful: true,
            code: "0",
            message: "Sucess",
            reference: response.Envelope.Body.setTransactionAuthorityNOCResponse.setTransactionAuthorityNOCReturn
        };
    }
    return {
        isSuccessful: false,
        errorMessage: 'An error has been occured when trying to set approvals data',
        errorCode: 301,
        reference: response,
    };
}

function processTransaction(transactionId, trafficFileNumber, serviceCode,
    deliveryMethod) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
        // This is a mapping between RTA service code (iDos) and eTraffic service
        // code
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var eTrafficServiceCode = _getServiceCode(serviceCode);

    if (eTrafficServiceCode == undefined) {
        // TODO return error response
        return {
            isSuccessful: false,
            errorMessage: 'Service code ' + serviceCode + ' cannot be used with this operation'
        };
    }

    var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
	   	<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\n\
	         <wsse:UsernameToken>\
	           <wsse:Username>' + tibcoUsername + '</wsse:Username>\
		<wsse:Password>' + tibocPwd + '</wsse:Password>\
		</wsse:UsernameToken>\n\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:processTransactionRequest>\
	         <sch:header>\
	            <sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\
	            <sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\
	         </sch:header>\
	         <sch:processTransactionRequest><![CDATA[\
			                     <processTransaction>\
			<setviceCode>' + eTrafficServiceCode + '</setviceCode>\
			<trafficFileNo>' + trafficFileNumber + '</trafficFileNo>\
			<username>Omnix_User</username>\
			<centerCode>' + CENTER_CODE + '</centerCode>\
				<parameters>\
					<parameter>\
							<name>transactionId</name>\
							<value>' + transactionId + '</value>\
					</parameter>\
				</parameters>\
			                     </processTransaction>\
							]]></sch:processTransactionRequest>\
	      </sch:processTransactionRequest>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

    var input = {
        method: 'POST',
        returnedContentType: 'xml',
        // headers : {'SOAPAction' : soapActionHeader},
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    MFP.Logger.warn(rq);
    var response = invokeTimestampedProcedure(input, 'processTransaction');
    MFP.Logger.warn(response);
    // return response;
    // Analyzing response for errors
    var header = response.Envelope.Header;
    if (typeof(header) == 'object' || typeof(response.Envelope.Body.processTransactionResponse) == 'undefined') {
        return {
            isSuccessful: false,
            errorCode: 301,
            reference: response
                // 301 means error creating transaction
        };
    }
    // Reading xml Response
    var xmlResponse = response.Envelope.Body.processTransactionResponse.processTransactionResponse;
    var processTransObj = convertToJson(xmlResponse);
    var status = processTransObj.transactionResponse['transaction-info'].status;

    var toReturn = {
        status: status,
        result: {}
    };
    // If status = failed, ensure that violations is an Array
    if (status == 'Failed') {
        // Get violations obj
        var violations = processTransObj.transactionResponse['transaction-info'].violations;
        if (!Array.isArray(violations)) {
            violations = [violations];
            processTransObj.transactionResponse['transaction-info'].violations = violations;
        }

        toReturn.result = {
            violations: violations
        };

    } else {
        toReturn.result = {
            transactionDetails: processTransObj.transactionResponse['transaction-info']
        };
    }
    return toReturn;
}

function processTransactionIssueNoc(transactionId, trafficFileNo,
    applicationId, serviceId) {
    var rq = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
	   	<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\n\
	         <wsse:UsernameToken>\
	           <wsse:Username>' + tibcoUsername + '</wsse:Username>\
		<wsse:Password>' + tibocPwd + '</wsse:Password>\
		</wsse:UsernameToken>\n\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:processTransactionRequest>\
	         <sch:header>\
	            <sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\
	            <sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\
	         </sch:header>\
	         <sch:processTransactionRequest><![CDATA[\
	         <processTransaction>\
	         <setviceCode>803</setviceCode>\
	             <trafficFileNo>' + trafficFileNo + '</trafficFileNo>\
	             <username>' + EXTERNAL_USERNAME + '</username>\
	             <centerCode>' + CENTER_CODE + '</centerCode>\
	             <attachmentsRefNo></attachmentsRefNo>\
	             <isReception>1</isReception>\
	             <parameters>\
	             <parameter>\
	             <name>hasCivilDefence</name>\
	             <value>1</value>\
	             </parameter>\
	             <parameter>\
	             <name>applicationRefNo</name>\
	             <value>' + applicationId + '</value>\
	             </parameter>\
	              <parameter>\
	              <name>transactionId</name>\
	              <value>' + transactionId + '</value>\
	            </parameter>\
	             <parameter>\
	             <name>hasAuthorityLetter</name>\
	             <value>1</value>\
	             </parameter>\
	             <parameter>\
	             <name>userEmirateCode</name>\
	             <value>DXB</value>\
	             </parameter>\
	             </parameters>\
	       </processTransaction>\
							]]></sch:processTransactionRequest>\
	      </sch:processTransactionRequest>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

    var input = {
        method: 'POST',
        returnedContentType: 'xml',
        // headers : {'SOAPAction' : soapActionHeader},
        path: path,
        body: {
            content: rq.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    MFP.Logger.warn(rq);
    var response = invokeTimestampedProcedure(input, 'processTransaction');
    MFP.Logger.warn(response);
    // return response;
    // Analyzing response for errors
    var header = response.Envelope.Header;
    if (typeof(header) == 'object' || typeof(response.Envelope.Body.processTransactionResponse) == 'undefined') {
        return {
            isSuccessful: false,
            errorCode: 301,
            reference: response
                // 301 means error creating transaction
        };
    }
    // Reading xml Response
    var xmlResponse = response.Envelope.Body.processTransactionResponse.processTransactionResponse;
    var processTransObj = convertToJson(xmlResponse);
    var status = processTransObj.transactionResponse['transaction-info'].status;

    var toReturn = {
        status: status,
        result: {}
    };
    // If status = failed, ensure that violations is an Array
    if (status == 'Failed') {
        // Get violations obj
        var violations = processTransObj.transactionResponse['transaction-info'].violations;
        if (!Array.isArray(violations)) {
            violations = [violations];
            processTransObj.transactionResponse['transaction-info'].violations = violations;
        }

        toReturn.result = {
            violations: violations
        };

    } else {
        toReturn.result = {
            transactionDetails: processTransObj.transactionResponse['transaction-info']
        };
    }
    return toReturn;
}

/**
 * This function is used to check the DSG and update the payment status.
 * Algorithm : Check the transaction status
 * 
 */
function checkTransactionStatus(transactionId, serviceId, isEpay,
    trafficFileNumber, userId, sptrn) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }

    // var response = {
    // status : "1", // one of 0 (pending), 1 (success), 2 (failure), 3
    // (transaction id not found on DSG)
    // };
    // This is the response to returned to the client side
    var response = {
        status: "0", // one of 0 (pending), 1 (success), 2 (failure), 3
        // (transaction id not found on DSG)
    };
    // 1st step get transaction status from the payment log table. if it's still
    // pending (status = 0) then no need to carry on
    // if != 0 return the response with the status from the web service.
    var transactionData = {
        transactionId: transactionId,
    };
    var pendingTransactionInvocationData = {
        parameters: [transactionData],
        adapter: "corporate_eTraffic_MobilePayment",
        procedure: "getPendingTransaction"
    };
    var pendingTransactionResponse = WL.Server
        .invokeProcedure(pendingTransactionInvocationData);
    // return pendingTransactionResponse ;
    MFP.Logger.warn("pendingTransactionResponse");
    MFP.Logger.warn(pendingTransactionResponse);
    if (pendingTransactionResponse.isSuccessful) {
        // Pending transaction : This means that this transaction can be paid from
        // DSG side. We need to check first
        // getting payment method
        var paymentMethod = pendingTransactionResponse.cData.paymentMethod;
        //If SPTRN does not exit on the temporary table it means that the old code is still running on old devices.
        var transactionSPTRN = pendingTransactionResponse.cData.sptrn != undefined ? pendingTransactionResponse.cData.sptrn : _getSPTRNFromTransactionID(transactionId, serviceId);

        //var transactionSPTRN = _getSPTRNFromTransactionID(transactionId, serviceId);
        //var ePayDEGTRN = '00000000000000'; //Dummy DEGTRN
        var dsgResponse = null;
        var transactionPaid = false;
        paymentMethod = 'ePay';

    } else {
        paymentMethod = 'mPay';
    }
    if (paymentMethod == 'ePay') {
        var ePayResponse = _getEpayStatus(transactionSPTRN);
        //ePayDEGTRN = _getEpayDEGTRN(transactionSPTRN).DEGTRN;
        dsgResponse = ePayResponse;
        var ePayStatus = (ePayResponse != null) ? ePayResponse.status : '2'; // if
        // it
        // does
        // not
        // exist
        // :
        // consider
        // it
        // as
        // failed
        // Analyse response of ePay
        if (ePayStatus == '0') { // if payment is successful
            // Confirm payment and do the rest
            transactionPaid = true;
        } else if (ePayStatus == '2') {
            // Consider it as Refused
            _setTransactionRefusedOnPaymentLog(transactionId);
            response.status = "2"; // Failed
        }
    } else {
        // Check mPay
        var mPayResponse = _getMpayStatus(sptrn);
        dsgResponse = mPayResponse;
        var mPayStatus = (mPayResponse != null) ? mPayResponse.status : '04';

        if (mPayStatus == '00') { // if payment is successful
            // Confirm payment and do the rest
            transactionPaid = true;
        } else if (mPayStatus != '01') {
            // Consider it as Refused
            _setTransactionRefusedOnPaymentLog(transactionId);
            response.status = "2"; // Failed
        }
    }

    // return dsgResponse ;
    // if success .. do the following
    /*
     * 1- Get transaction status in order to get the total amount 
     * 2- compare total amount with amount returned from DSG (in dsgResponse) 
     * 3- if amount not equal log it and reject it from the pay 
     * 4- if amount equals call TransactionService.payAsPosponedEpay5 
     * 5- Set status from Delivery table to 1
     * 6- Return success
     */
    if (transactionPaid) {
        var getTransactionStatusResponse = getTransactionStatus(transactionId);
        MFP.Logger.info(getTransactionStatus);

        //Transaction Total Amount is read from the backend through getTransactionStatus method. This way we can compare the amount of the transaction with the amount sent to DSG
        var totalAmount = getTransactionStatusResponse.transactionResponse['transaction-info'].transactionTotalAmount;
        // var transactionSPTRN = _getSPTRNFromTransactionID(transactionId,
        // serviceId);
        var totalAmountDSG = (paymentMethod == 'ePay') ? null : dsgResponse.amount;
        if (totalAmount !== totalAmountDSG && (paymentMethod != 'ePay')) {
            _setTransactionRefusedOnPaymentLog(transactionId);
            response.status = "4"; // Hacked
            deleteUserOtherAccount(userId, serviceId);
        } else {
            //			var DEGTRN = _getEpayDEGTRN(transactionSPTRN);
            var paymentResponse = setTransactionAsPaid(transactionId, paymentMethod, sptrn);
            if (paymentResponse.status == 'Failed') {
                response.status = "0"; //Pending
                response.reference = paymentResponse;
            } else {
                deleteUserOtherAccount(userId, serviceId);
                response.status = "1"; // Success
            }
        }
    }

    return response;
}

function _setTransactionRefusedOnPaymentLog(transactionId) {
    var transactionData = {
        transactionId: transactionId,
        status: '3'
    };
    var pendingTransactionInvocationData = {
        parameters: [transactionData]
    };
    pendingTransactionInvocationData.adapter = "corporate_eTraffic_MobilePayment";
    pendingTransactionInvocationData.procedure = "getPendingTransaction";
    var pendingTransactionResponse = WL.Server
        .invokeProcedure(pendingTransactionInvocationData);
    return pendingTransactionResponse.isSuccessful;
}

function _getSPTRNFromTransactionID(transactionId, serviceId) {
    return "CRP" + serviceId + "_" + transactionId;
}

function _getMpayStatus(SPTRN) {
    var username = shellInterfaceUser.username;
    var password = shellInterfaceUser.password;
    var responseString = com.proxymit.utils.PaymentAdaptersChecker
        .checkMPayStatus(SPTRN, username, password);

    if (responseString != null) {
        var jsonResponse = JSON.parse(responseString);
        //		 MFP.Logger.warn(jsonResponse);
        if (jsonResponse.isSuccessful) {
            var properties = jsonResponse.output.Envelope.Body.inquireTransactionStatusResponse.properties.property;
            var amount = null;
            var status = null;
            var statusDescription = null;
            for (var i = 0; i < properties.length; i++) {

                if (properties[i].name == "DEG$AMOUNT") {
                    amount = properties[i].value;
                }
                if (properties[i].name == "DEG$STATUS_CODE") { // status == 00
                    // means
                    // success, 01
                    // pending, else
                    // : failure
                    status = properties[i].value;
                }

                if (properties[i].name == "DEG$STATUS_DESCRIPTION") {
                    statusDescription = properties[i].value;
                }
            }

            return {
                amount: amount,
                status: status,
                statusDescription: statusDescription
            };
        } else {
            return null;
        }
    } else {
        return null;
    }
}

function _getEpayStatus(SPTRN) {
    var username = shellInterfaceUser.username;
    var password = shellInterfaceUser.password;
    var responseString = com.proxymit.utils.PaymentAdaptersChecker
        .checkEPayStatus(SPTRN, username, password);

    var toReturn = {
        status: '0'
    };
    if (responseString != null) {
        var jsonResponse = JSON.parse(responseString);

        var dsgResponse = jsonResponse.result;
        var rsp = JSON.parse(com.proxymit.utils.XmlToJsonConverter
            .convertToJson(dsgResponse));
        MFP.Logger.info("DSG Status :");
        MFP.Logger.info(rsp);
        var messageCode = rsp.Envelope.Body.getTransactionStatusResponse.result.TRANSACTION.MESSAGECODE;
        if (messageCode == '0') { // Success
            toReturn.status = '0';
        } else if (messageCode == '80013' || messageCode == '80014') {
            // Still pending
            toReturn.status = '1';
        } else {
            // Failure
            toReturn.status = '2';
        }
        return toReturn;
    } else {
        return null;
    }
}

function _getEpayDEGTRN(SPTRN) {
    var username = shellInterfaceUser.username;
    var password = shellInterfaceUser.password;
    var responseString = com.proxymit.utils.PaymentAdaptersChecker
        .checkEPayStatus(SPTRN, username, password);


    if (responseString != null) {
        var jsonResponse = JSON.parse(responseString);

        var dsgResponse = jsonResponse.result;
        var rsp = JSON.parse(com.proxymit.utils.XmlToJsonConverter
            .convertToJson(dsgResponse));

        var DEGTRN = rsp.Envelope.Body.getTransactionStatusResponse.result.TRANSACTION.DEGTRN;
        return { DEGTRN: DEGTRN };
    } else {
        return { DEGTRN: '00000000000000' };
    }
}

function setTransactionAsPaid(transactionId, paymentMethod, transactionSPTRN) {
    var isEpay = (paymentMethod.toLowerCase() == "epay") ? "true" : "false";
    var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
	   	<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\n\
	         <wsse:UsernameToken>\
	           <wsse:Username>' + tibcoUsername + '</wsse:Username>\
			  <wsse:Password>' + tibocPwd + '</wsse:Password>\
	         </wsse:UsernameToken>\n\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
		      <sch:payAsPostponedEPay5Request>\
			<sch:header>\
			<sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\
			<sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\
			</sch:header>\
	         <sch:transactionId>' + transactionId + '</sch:transactionId>\
	         <sch:username>' + EXTERNAL_USERNAME + '</sch:username>\
	         <sch:degTrnRef>' + transactionSPTRN + '</sch:degTrnRef>\
	         <sch:dsgSpCode>RTA3</sch:dsgSpCode>\
	         <sch:dsgServiceCode>mGov</sch:dsgServiceCode>\
	         <sch:isServiceDeliveryReqd>' + isEpay + '</sch:isServiceDeliveryReqd>\
	      </sch:payAsPostponedEPay5Request>\
   </soapenv:Body>\
</soapenv:Envelope>';

    var input = {
        method: 'POST',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: transactionString.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    MFP.Logger.warn(transactionString);
    var response = MFP.Server.invokeHttp(input);
    // return response;
    // Analyzing response for errors
    var header = response.Envelope.Header;
    if (typeof(header) == 'object' || typeof(response.Envelope.Body.payAsPostponedEPay5Response) == 'undefined') {
        return {
            isSuccessful: false,
            errorCode: 301,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
                // 301 means error updating transaction status
        };
    }
    // Reading xml Response
    var xmlResponse = response.Envelope.Body.payAsPostponedEPay5Response.payAsPostponedEPay5Return;
    var createTransObj = convertToJson(xmlResponse);
    var status = createTransObj.paymentResponse['transaction-info'].status;

    var toReturn = {
        status: status,
        result: {}
    };
    // If status = failed, ensure that violations is an Array
    if (status == 'Failed') {
        // Get violations obj
        var violations = createTransObj.paymentResponse['transaction-info'].violations;
        if (!Array.isArray(violations)) {
            violations = [violations];
            createTransObj.paymentResponse['transaction-info'].violations = violations;
        }

        toReturn.result = {
            violations: violations
        };

    } else {
        // update payment transaction
        toReturn.result = {
            paymentDetails: createTransObj.paymentResponse['transaction-info']
        };
    }
    return toReturn;
}

/**
 * Cancels a transaction and removes it from the OTHER_ACCOUNT
 * 
 * @param transactionId
 * @param serviceId
 */
function cancelTransaction(transactionId) {
    var cancelTransactionRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.tibco.com/schemas/TransactionService_BW_SRC_V2/SharedResources/XMLSchema/Schema.xsd">\
		   <soapenv:Header>\
	   	<wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\n\
	         <wsse:UsernameToken>\
	           <wsse:Username>' + tibcoUsername + '</wsse:Username>\
		<wsse:Password>' + tibocPwd + '</wsse:Password>\
		</wsse:UsernameToken>\n\
	      </wsse:Security>\
	   </soapenv:Header>\
	   <soapenv:Body>\
	      <sch:cancelTransactionRequest>\
	         <sch:header>\
	            <sch:clientUsername>' + EXTERNAL_USERNAME + '</sch:clientUsername>\
	            <sch:clientPassword>' + EXTERNAL_PASSWORD + '</sch:clientPassword>\
	         </sch:header>\
	         <sch:transactionId>' + transactionId + '</sch:transactionId>\
	         <sch:userName>' + EXTERNAL_USERNAME + '</sch:userName>\
	         <sch:CancellationReason>cancel transaction</sch:CancellationReason>\
	      </sch:cancelTransactionRequest>\
	   </soapenv:Body>\
	</soapenv:Envelope>';

    var input = {
        method: 'post',
        returnedContentType: 'xml',
        path: path,
        body: {
            content: cancelTransactionRequest.toString(),
            contentType: 'text/xml; charset=utf-8'
        }
    };
    var response = MFP.Server.invokeHttp(input);
    if (typeof(response.Envelope.Body.cancelTransactionResponse) == "undefined") {
        return {
            isSuccessful: false,
            errorCode: 301,
            message: "An error has been occured in the server. Kindly try again",
            reference: response
        };
    }

    var xmlResponse = response.Envelope.Body.cancelTransactionResponse.CDATA;
    var createTransObj = convertToJson(xmlResponse);
    var status = createTransObj.cancelTransactionResponse['transaction-info'].status;

    var toReturn = {
        status: status,
        result: {}
    };
    // If status = failed, ensure that violations is an Array
    if (status == 'Failed') {
        // Get violations obj
        var violations = createTransObj.cancelTransactionResponse['transaction-info'].violations;
        if (!Array.isArray(violations)) {
            violations = [violations];
            createTransObj.cancelTransactionResponse['transaction-info'].violations = violations;
        }

        if (typeof violations !== "undefined") {
            var violation = violations[0].violation;
            if (Array.isArray(violation)) {
                for (i in violation) {
                    if (typeof violation[i]["description-en"] != "undefined") {

                        var viol = violation[i]["description-en"];
                        violation[i]["description-en"] = viol.replace(
                            /^.*\-::-/g, '- ');
                    }
                }
            } else {
                if (typeof violation["description-en"] != "undefined") {

                    var viol = violation["description-en"];
                    violation["description-en"] = viol.replace(/^.*\-::-/g,
                        '- ');
                }
            }
        }

        toReturn.result = {
            violations: violations
        };

    } else {
        toReturn.result = {
            transactionDetails: createTransObj.cancelTransactionResponse['transaction-info']
        };
    }
    return toReturn;

}

function setUserOtherAccount(userId, serviceId, parameters) {

    // first delete the other one
    deleteUserOtherAccount(userId, serviceId);

    var invocationData = {
        adapter: 'userProfile',
        procedure: 'setUserOtherAccountPortal',
        parameters: [shellInterfaceUser.username,
            shellInterfaceUser.password, userId, OTHER_ACCOUNT_LABEL,
            serviceId, parameters
        ]
    };

    return MFP.Server.invokeProcedure(invocationData, {
        onSuccess: function(response) {
            return response;
        },
        onFailure: function(response) {
            return {
                isSuccessful: false,
                errorCode: "INTERNAL_SERVER_ERROR",
                errorMessage: "Internal server error"
            };
        }
    });
}

function getUserOtherAccount(userId, serviceId) {

    var invocationData = {
        adapter: 'userProfile',
        procedure: 'getUserOtherAccountsPortal',
        parameters: [shellInterfaceUser.username,
            shellInterfaceUser.password, userId, OTHER_ACCOUNT_LABEL
        ]
    };

    var response = MFP.Server.invokeProcedure(invocationData);
    if (response.isSuccessful == false)
        return response;
    var foundProfile = null;
    var otherProfiles = response.resultSet;
    for (var i = 0; i < otherProfiles.length; i++) {
        if (serviceId == otherProfiles[i].service) {
            foundProfile = otherProfiles[i];
            break;
        }
    }

    return {
        isSuccessful: true,
        profile: foundProfile
    };
}

// ["RTA_COMMON_SHELL_PORTAL_ACCOUNT",
// "dDv7$Q>19TyW*0Im]x^F",'aaaaabb@yahoo.com']
function deleteUserOtherAccount(userId, serviceId) {
    var invocationData = {
        adapter: 'userProfile',
        procedure: 'deleteUserOtherAccountPortal',
        parameters: [shellInterfaceUser.username,
            shellInterfaceUser.password, userId, OTHER_ACCOUNT_LABEL,
            serviceId
        ]
    };

    return MFP.Server.invokeProcedure(invocationData, {
        onSuccess: function(response) {
            return response;
        },
        onFailure: function(response) {
            return {
                isSuccessful: false,
                errorCode: "INTERNAL_SERVER_ERROR",
                errorMessage: "Internal server error"
            };
        }
    });
}

/**
 * { paymentMethod : 'ePay', serviceId : '1218', transactionId : '37381384' ,
 * userId : 'aaaaabb@yahoo.com', trafficFileNumber : '5011102421' }
 */
function setPendingTransaction(transactionId, trafficFileNumber, serviceId,
    paymentMethod /* ePay or mPay */ , sptrn, amount) {
    try {
        trafficFileNumber = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNumber;
        var userId = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').userId : "";
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
        userId = "";
    }
    // var userId = "aaaaabb@yahoo.com";
    var d = {
        transactionId: transactionId,
        status: 0,
        cData: {
            paymentMethod: paymentMethod,
            serviceId: serviceId,
            trafficFileNumber: trafficFileNumber,
            userId: userId,
            sptrn: sptrn
        }
    };

    MFP.Logger.info("Data = ");
    MFP.Logger.info(d);
    var invocationData = {
        adapter: 'corporate_eTraffic_MobilePayment',
        procedure: 'setTransactionData',
        parameters: [d]
    };
    // return MFP.Server.invokeProcedure(invocationData) ;
    //MFP.Logger.info(MFP.Server.invokeProcedure(invocationData).isSuccessful);
    var resp = MFP.Server.invokeProcedure(invocationData);
    if (resp.isSuccessful) {
        var getcorporateResponse = _getcorporateData(trafficFileNumber);
        if (amount) {
            var iD = {
                adapter: 'ePay_DataVerification_RTA_Corporate_Services',
                procedure: 'encryptPaymentData',
                parameters: [transactionId, 'etraffic', amount, sptrn]
            };
            var cypher = MFP.Server.invokeProcedure(iD);
            getcorporateResponse.cypher = cypher;
        }
        return getcorporateResponse;
    } else {
        return {
            isSuccessful: false,
            reference: resp
        };
    }
}

function _getcorporateData(trafficFileNo) {
    try {
        trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNo;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var data = trafficFileNo;
    var invocationData = {
        adapter: 'corporates_eTraffic_verifyCustomer',
        procedure: 'getCorporateData',
        parameters: [data]
    };
    return MFP.Server.invokeProcedure(invocationData);
}

function _unescapeXml(xmlText) {
	try{
		return xmlText.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(
		        /&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
	}catch(e){
		return xmlText;
	}
    
}

function _getPermitDetails(trafficFileNo) {
    try {
        trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNo;
        // tcfNo : 50030799
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var invocationData = {
        parameters: [trafficFileNo]
    };
    invocationData.adapter = "corporate_eTraffic_permitService";
    invocationData.procedure = "getPermitDetails";
    var response = MFP.Server.invokeProcedure(invocationData);
    MFP.Logger.warn(response);
    if (typeof response.permitDetails != "undefined") {
        return {
            isSuccessful: true,
            trafficFileNo: response.permitDetails[0].trafficNumber != undefined ? response.permitDetails[0].trafficNumber : "",
            permitRefNo: response.permitDetails[0].permitRefNo != undefined ? response.permitDetails[0].permitRefNo : "",
            subscriptionNo: response.permitDetails[0].subscriptionRefNo != undefined ? response.permitDetails[0].subscriptionRefNo : "",
            permitId: response.permitDetails[0].permitId != undefined ? response.permitDetails[0].permitId : ""
        };

    } else {
        return {
            isSuccessful: false
        };
    }
}

function _getOrgInfo(trafficFileNo) {
    try {
        trafficFileNo = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && WL.Server
                .getActiveUser('masterAuthRealm') != null) ? WL.Server
            .getActiveUser('masterAuthRealm').corporatesAttributes.trafficNo : trafficFileNo;
    } catch (e) {
        MFP.Logger.warn("Cannot read data from Realm");
    }
    var invocationData = {
        parameters: [trafficFileNo]
    };
    invocationData.adapter = "corporate_eTraffic_OrganizationsService";
    invocationData.procedure = "getOrganizationInfo";
    var response = MFP.Server.invokeProcedure(invocationData);
    MFP.Logger.warn(response);
    if (typeof response.organizationInfoType != "undefined") {
        return {
            isSuccessful: true,
            organizationId: response.organizationInfoType.orgId
        };
    } else {
        return {
            isSuccessful: false
        };
    }
}




function invokeTimestampedProcedure(input, methodName) {
    MFP.Logger.info('Start invoking web service ' + input.path + ' method name : ' + methodName);
    var startTime = new Date().getTime();
    var response = MFP.Server.invokeHttp(input);
    var endTime = new Date().getTime();
    MFP.Logger.info('END invoking web service ' + input.path + ' method name : ' + methodName + ' Took (ms) ' + (endTime - startTime));

    return response;
}

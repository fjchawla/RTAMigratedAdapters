function sleep(milliSeconds)
{
   var startDate = new Date();
   var isTimeOut = false;
   
   while(isTimeOut == false)
   {
		var now = new Date();
		isTimeOut = (now.getTime() - startDate.getTime()) > milliSeconds;
   }
}

function processEPay(transactionID, spTrnDSG,isCheckOnly){
	var result;
	var paymentStatus = "Pending";
	var startDate = new Date();
	var isTimeOut = false;

	while(paymentStatus == "Pending" && isTimeOut == false)
	{
		result = checkEPayStatus(transactionID, spTrnDSG, isCheckOnly);
		paymentStatus = result.paymentStatus;
		var now = new Date();
		isTimeOut = (now.getTime() - startDate.getTime()) > 60000;
		if(isTimeOut == false)
			sleep(5000);
	}
	return result;
}	
function checkEPayStatus(transactionId,spTrnDSG,isCheckOnly){
	var executionStatus = "Success";
	var confirmDSGTransactionReturn;
	try
	{
		var messageCode, statusmessage, returnedProperties;
		var transactionConfirmationStatus="Failure";
		var paymentStatus = "Pending";
		var spCode = MFP.Server.getPropertyValue("epay.DSGOptions.SPCODE");
		var servCode = MFP.Server.getPropertyValue("epay.DSGOptions.SERVCODE");
		
		var spTrn = (spTrnDSG == undefined || spTrnDSG == null) ? getSpTrn(transactionId,serviceCode,"E") : spTrnDSG;
		var result = MFP.Server.invokeProcedure({
													adapter : 'ePayAdapter',
													procedure : 'getTransactionStatus',
													parameters : [ spCode,servCode,spTrn ],			
												});
		try 
		{

				if (result.output!=undefined){
					returnedProperties = result.output.Envelope.Body.getTransactionStatusResponse.result.TRANSACTION;
					messageCode=returnedProperties.MESSAGE;
					statusmessage=returnedProperties.MESSAGECODE;
				}
				else {
					returnedProperties= result.result;
					messageCode=returnedProperties.substring(returnedProperties.lastIndexOf("<MESSAGECODE>")+13,returnedProperties.lastIndexOf("</MESSAGECODE>"));
					statusmessage=returnedProperties.substring(returnedProperties.lastIndexOf("<MESSAGE>")+9,returnedProperties.lastIndexOf("</MESSAGE>"));;
				}
		}catch(e){
				returnedProperties= result.result;
				messageCode=returnedProperties.substring(returnedProperties.lastIndexOf("<MESSAGECODE>")+13,returnedProperties.lastIndexOf("</MESSAGECODE>"));
				statusmessage=returnedProperties.substring(returnedProperties.lastIndexOf("<MESSAGE>")+9,returnedProperties.lastIndexOf("</MESSAGE>"));;

		}
		if(messageCode=="80014")
			paymentStatus = "Cancelled";
		else 
			if(messageCode=="0" )
			{
				paymentStatus = "Success";
				var degTrn = returnedProperties.substring(returnedProperties.lastIndexOf("<DEGTRN>")+8,returnedProperties.lastIndexOf("</DEGTRN>"));
				var transactionDate = returnedProperties.substring(returnedProperties.lastIndexOf("<TRANSDATE>")+11,returnedProperties.lastIndexOf("</TRANSDATE>"));
				if(isCheckOnly == undefined || isCheckOnly == false)
				{
					confirmDSGTransactionReturn = confirmDSGTransaction(transactionId, degTrn,spTrn,spCode,servCode,transactionDate,true);
					transactionConfirmationStatus = confirmDSGTransactionReturn.transactionConfirmationStatus;
				}
			}
			else 
				if(messageCode=="80013")//under processing (pending)
					paymentStatus = "Pending";
				else 
					paymentStatus = "Failure";							
	}
	catch(ex)
	{
		executionStatus = "Exception: " + ex;
	}
	return {paymentStatus:paymentStatus, transactionConfirmationStatus:transactionConfirmationStatus, spTrn:spTrnDSG, messageCode:messageCode, degTrn:degTrn, confirmDSGTransactionReturn:confirmDSGTransactionReturn, executionStatus:executionStatus};
}
function processMPay(transactionId,totalAmount,spTrnDSG,isCheckOnly){
   var result;
   var paymentStatus = "Pending";
   var startDate = new Date();
   var isTimeOut = false;
   
	while(paymentStatus == "Pending" && isTimeOut == false)
	{
		result = checkMPayStatus(transactionId, totalAmount, spTrnDSG, isCheckOnly);
		paymentStatus = result.paymentStatus;
		var now = new Date();
		isTimeOut = (now.getTime() - startDate.getTime()) > 60000;
		if(isTimeOut == false)
			sleep(5000);
	}
   return result;
}	

function checkMPayStatus(transactionId,totalAmount,spTrnDSG,isCheckOnly){
	try{
		var messageCode, statusmessage, returnedProperties;
		var transactionConfirmationStatus="Failure";
		var paymentStatus = "Pending";
		var degTrn;
		var transactionDate;
		var confirmDSGTransactionReturn;
		var spTrn = (spTrnDSG == undefined || spTrnDSG == null) ? getSpTrn(transactionId,serviceCode,"M") : spTrnDSG;
		var DSGParameter = {};
		//DSGParameter.CHANNEL = "MobileApp";
		DSGParameter.KEY_VERSION = "1";
		DSGParameter.SP_CODE = MFP.Server.getPropertyValue("mpay.DSGOptions.SPCODE");
		DSGParameter.SRV_CODE = MFP.Server.getPropertyValue("mpay.DSGOptions.SERVCODE");
		DSGParameter.SP_TRN = spTrn;
		DSGParameter.TRX_ID = "";
		var result = MFP.Server.invokeProcedure({
							adapter : 'mPayAdapter',
							procedure : 'inquireTransactionStatus',
							parameters : [ DSGParameter ]
					});
					returnedProperties = result.output.Envelope.Body.inquireTransactionStatusResponse.properties.property;
					var matchedAmount = false;
					var DSGValue;
					for(var i = 0 ;i<returnedProperties.length;i++){
						if(returnedProperties[i].name=="DEG$PAYMENT_REF_NUMBER")
							degTrn = returnedProperties[i].value;
						if(returnedProperties[i].name=="DEG$TIMESTAMP")
							transactionDate = formatTransactionDate(returnedProperties[i].value);

						if(returnedProperties[i].name=="DEG$AMOUNT" && (totalAmount == null || (totalAmount != null && returnedProperties[i].value == totalAmount)))
								matchedAmount = true;
						if (returnedProperties[i].name=="DEG$STATUS_CODE"){


							DSGValue = returnedProperties[i].value;

							if (DSGValue == "00"){
								paymentStatus = "Success";
							}
							else if (DSGValue == "01"){
								paymentStatus = "Pending";
							}
							else
							{
								paymentStatus = "Failure";
							}
						}
					}//forloop

					if (paymentStatus == "Success")
					{
						if(matchedAmount)
						{
							if(isCheckOnly == undefined || isCheckOnly == false)
							{
								confirmDSGTransactionReturn = confirmDSGTransaction(transactionId, degTrn,spTrn,DSGParameter.SP_CODE,DSGParameter.SRV_CODE,transactionDate,false);
								transactionConfirmationStatus = confirmDSGTransactionReturn.transactionConfirmationStatus;
							}
						}
						else
							paymentStatus = "Failure";
					}
	}
	catch(e){
		
	}
	return {paymentStatus:paymentStatus, transactionConfirmationStatus:transactionConfirmationStatus, spTrn:spTrnDSG, DSGValue:DSGValue, totalAmount:totalAmount, degTrn:degTrn, confirmDSGTransactionReturn:confirmDSGTransactionReturn};
}

function confirmDSGTransaction(transactionId, degTrn,spTrnRef,dsgSpCode,dsgServiceCode,transactionDate,isServiceDeliveryReqd)
{
	var transactionConfirmationStatus = "Failure";
	var result = MFP.Server.invokeProcedure({
												adapter : 'public_transportation_water_taxi',
												procedure : 'confirmDSGTransaction',
												parameters : [transactionId, degTrn,spTrnRef,dsgSpCode,dsgServiceCode,transactionDate,isServiceDeliveryReqd],			
											});
	try {
			transactionConfirmationStatus = result.status;
		}
		catch(ex){}
	return {transactionConfirmationStatus:transactionConfirmationStatus, confirmDSGTransactionReturn:result};
}

function getSpTrn(transactionId,serviceCode,paymentMethod){
		var transactionIdAllowedLength = (serviceCode.length > 3) ? 21 - serviceCode.length : 18;
		var paddedTransactionId = "";
		for(var i = 0; i < (transactionIdAllowedLength - transactionId.length); i++)
			paddedTransactionId+="0";
		paddedTransactionId+=transactionId;
		if(paymentMethod == "epay")
			paymenthMethod = "E";
		else if(paymentMethod == "mpay")
				paymenthMethod = "M";
		var spTrn = "PTA"+ paymentMethod + serviceCode + paddedTransactionId;
		return spTrn
}
function formatTransactionDate(transactionDate)
{
	var result;
	var pos1 = transactionDate.indexOf(" ");
	var pos2 = transactionDate.indexOf(":");
	var hours = parseInt(transactionDate.substring(pos1+1,pos2));
	if(hours < 12)
		result = transactionDate + " AM";
	else
	{
		hours = hours - 12;
		result = transactionDate.substring(0,pos1+1) + hours + transactionDate.substring(pos2) + " PM";
	}
	return result;
}

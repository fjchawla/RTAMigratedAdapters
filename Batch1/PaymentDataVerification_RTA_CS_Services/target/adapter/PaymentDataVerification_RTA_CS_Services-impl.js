
//Vendors should implement the stub function below to verify 
//amount in backend and  return 'dataVerified' with the verification status
//paymentType: EPAT, MPAY
function verifyData(token,sptrn,amount, edata, paymentType) {
	if(token == MFP.Server.getPropertyValue("tokens.recentActivities")){
		//Instead of the check below, do an actual call to your backend and verify amount
		if(sptrn && amount){
			
 			var transactionAmount = getTransactionAmount(sptrn);
			MFP.Logger.warn("|ePayAdapter |verifyData |transactionAmount"+transactionAmount);
			MFP.Logger.warn("|ePayAdapter |verifyData |amount"+amount);
			var isDataVerified = (transactionAmount == amount);
			return {
				dataVerified: isDataVerified
			};
			 
		}
		else{
			return {
				error: 'Invalid amount or transaction number',
				dataVerified: false
			};
		}
	}
	else{
		return {
			error: 'Invalid token',
			dataVerified: false
		};
	}
}


function getTransactionAmount(sptrn){
	// sptrn is common shell service provider transaction number and its contains backend transaction number
	// This function should return the amount from the backend by transaction id 
	
	
	//the below step to get the transation number from the sptrn 
	var transactionId = sptrn.substring(sptrn.length - 8);
	
	
	//TODO calling the backend to get the amount
	
	var amount = '30';
	return amount ; 
}
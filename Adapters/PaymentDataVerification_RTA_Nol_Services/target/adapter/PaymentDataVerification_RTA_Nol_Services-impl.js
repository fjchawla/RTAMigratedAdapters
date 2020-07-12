
//Vendors should implement the stub function below to verify 
//amount in backend and  return 'dataVerified' with the verification status
//paymentType: EPAT, MPAY
function verifyData(token,sptrn,amount, edata, paymentType) {
	if(token == MFP.Server.getPropertyValue("tokens.recentActivities")){
		//Instead of the check below, do an actual call to your backend and verify amount
		if(sptrn && amount){
			return {
				dataVerified: true
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
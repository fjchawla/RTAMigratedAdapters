function processEPay(transactionId,trafficFileNo,serviceCode, isJustCheck, spTrnDSG, appID)
{
	invocationData = {
						adapter : 'drivers_and_vehciles_reconciliationAdapter',
						procedure : 'processEPay',
						parameters : [transactionId,trafficFileNo,serviceCode, isJustCheck, spTrnDSG, appID]
					};
	return MFP.Server.invokeProcedure(invocationData);
}	
function processMPay(transactionId,trafficFileNo,serviceCode, totalAmount, isJustCheck, spTrnDSG, appID)
{
	invocationData = {
						adapter : 'drivers_and_vehciles_reconciliationAdapter',
						procedure : 'processMPay',
						parameters : [transactionId,trafficFileNo,serviceCode, totalAmount, isJustCheck, spTrnDSG, appID]
					};
	return MFP.Server.invokeProcedure(invocationData);
}	
function reconciliatePendingTransactions()
{
	invocationData = {
						adapter : 'drivers_and_vehciles_reconciliationAdapter',
						procedure : 'reconciliatePendingTransactions',
						parameters : []
					};
	return MFP.Server.invokeProcedure(invocationData);
}
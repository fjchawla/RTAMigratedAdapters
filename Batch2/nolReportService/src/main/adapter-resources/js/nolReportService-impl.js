
function getCardPersonaliseReceipt(language,receiptDate,receipt,referenceId,paymentMethod,label,fee,total) {
	MFP.Logger.info("[getCardPersonaliseReceipt][Request]: "+MFP.Server.getPropertyValue("rta.nol.card.personalise.receipt.en.path"));
	MFP.Logger.info("[getCardPersonaliseReceipt][Request]: "+language);
	MFP.Logger.info("[getCardPersonaliseReceipt][Request]: "+receiptDate);
	MFP.Logger.info("[getCardPersonaliseReceipt][Request]: "+receipt);
	MFP.Logger.info("[getCardPersonaliseReceipt][Request]: "+referenceId);
	MFP.Logger.info("[getCardPersonaliseReceipt][Request]: "+paymentMethod);
	MFP.Logger.info("[getCardPersonaliseReceipt][Request]: "+label);
	MFP.Logger.info("[getCardPersonaliseReceipt][Request]: "+fee);
	MFP.Logger.info("[getCardPersonaliseReceipt][Request]: "+total);
	return {pdf:com.rta.java.adapter.PCardReport.getCardPersonaliseReceipt(language,MFP.Server.getPropertyValue("rta.nol.card.personalise.receipt.en.path"),receiptDate,receipt,referenceId,paymentMethod,label,fee,total)};
}

function getTopupReceipt(language,receiptDate,tagId,transactionNumber,balance,amount,total) {
	MFP.Logger.info("[getTopupReceipt][Request]: "+MFP.Server.getPropertyValue("rta.nol.topup.receipt.en.path"));
	MFP.Logger.info("[getTopupReceipt][Request]: "+language);
	MFP.Logger.info("[getTopupReceipt][Request]: "+receiptDate);
	MFP.Logger.info("[getTopupReceipt][Request]: "+tagId);
	MFP.Logger.info("[getTopupReceipt][Request]: "+transactionNumber);
	MFP.Logger.info("[getTopupReceipt][Request]: "+balance);
	MFP.Logger.info("[getTopupReceipt][Request]: "+amount);
	MFP.Logger.info("[getTopupReceipt][Request]: "+total);
	return {pdf:com.rta.java.adapter.PCardReport.getTopupReceipt(language,MFP.Server.getPropertyValue("rta.nol.topup.receipt.en.path"),receiptDate,tagId,transactionNumber,balance,amount,total)};
 }

function getTermAndCondition(language) {

	MFP.Logger.info("[getTermAndCondition][Request]: "+language);
	if(language=="en-US"){
		MFP.Logger.info("[getTermAndCondition][Request]: "+MFP.Server.getPropertyValue("rta.nol.term.and.condition.pdf.path"));
		return {link:MFP.Server.getPropertyValue("rta.nol.term.and.condition.pdf.path")};
	}else{
		MFP.Logger.info("[getTermAndCondition][Request]: "+MFP.Server.getPropertyValue("rta.nol.term.and.condition.pdf.path.ae"));
		return {link:MFP.Server.getPropertyValue("rta.nol.term.and.condition.pdf.path.ae")};
	}

}

function getNolTravelHistory(language,title,records) {
	MFP.Logger.info("[getNolTravelHistory][Request]: "+MFP.Server.getPropertyValue("rta.nol.travel.history.en.path"));
	MFP.Logger.info("[getNolTravelHistory][Request]: "+language);
	MFP.Logger.info("[getNolTravelHistory][Request]: "+title);
	MFP.Logger.info("[getNolTravelHistory][Request]: "+records);
	return {pdf:com.rta.java.adapter.PCardReport.getNolTravelHistory(language,MFP.Server.getPropertyValue("rta.nol.travel.history.en.path"),title,records)};
}

function getNolGeneralHistory(language,title,records) {
	MFP.Logger.info("[getNolGeneralHistory][Request]: "+MFP.Server.getPropertyValue("rta.nol.general.history.en.path"));
	MFP.Logger.info("[getNolGeneralHistory][Request]: "+language);
	MFP.Logger.info("[getNolGeneralHistory][Request]: "+title);
	MFP.Logger.info("[getNolGeneralHistory][Request]: "+records);
	return {pdf:com.rta.java.adapter.PCardReport.getNolGeneralHistory(language,MFP.Server.getPropertyValue("rta.nol.general.history.en.path"),title,records)};
}

function getRenewTravelPass(language, product,receiptDate, receipt, transactionId,method, fee, total) {
	MFP.Logger.info("[getTopupReceipt][Request]: "+MFP.Server.getPropertyValue("rta.nol.renew.travel.pass.receipt.en.path"));
	MFP.Logger.info("[getTopupReceipt][Request]: "+language);
	MFP.Logger.info("[getTopupReceipt][Request]: "+product);
	MFP.Logger.info("[getTopupReceipt][Request]: "+receiptDate);
	MFP.Logger.info("[getTopupReceipt][Request]: "+receipt);
	MFP.Logger.info("[getTopupReceipt][Request]: "+transactionId);
	MFP.Logger.info("[getTopupReceipt][Request]: "+method);
	MFP.Logger.info("[getTopupReceipt][Request]: "+fee);
	MFP.Logger.info("[getTopupReceipt][Request]: "+total);
	return {pdf:com.rta.java.adapter.PCardReport.getRenewTravelPass(language,MFP.Server.getPropertyValue("rta.nol.renew.travel.pass.receipt.en.path"),product,receiptDate,receipt,transactionId,method,fee,total)};
}


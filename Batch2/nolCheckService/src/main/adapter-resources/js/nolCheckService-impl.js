


function processingCheck() {
	
	var report = false;
	var sleep = false;
	var image = false;
	
	try {
		com.rta.java.adapter.PCardReport.getCardPersonaliseReceipt("ar-AE",MFP.Server.getPropertyValue("rta.nol.card.personalise.receipt.en.path"),"1","2","3","4","5","6","7");
		report = true;
		
	}catch(err) {
		MFP.Logger.info("Throw Receipt");
		MFP.Logger.info(err);
		newReportErr = err;
	}
	
	try {
		com.rta.java.util.SleepUtil.sleep(1000);
		sleep = true;
	}catch(err) {
	   MFP.Logger.info("Throw Sleep");
	   MFP.Logger.info(err);
	   sleepErr = err;
	}
	
	
	try {
		com.rta.java.adapter.ImageMerge.getImage("1",MFP.Server.getPropertyValue("rta.image.nolTempPath"));
		image = true;
	}catch(err) {
	   MFP.Logger.info("Throw Get Image");
	   MFP.Logger.info(err);
	   imageErr = err;
	}

	
	return {
		Report_Proccess_Success:report
		,SleepUtil_Process_Success:sleep
		,Image_Process_Success:image
	};

}


function errorCheck() {
	
	var generalreportError = "";
	var reportError = "";
	var sleepError = "";
	var imageError = "";
	
	try {
		com.rta.java.adapter.PCardReport.getCardPersonaliseReceipt("ar-AE",MFP.Server.getPropertyValue("rta.nol.card.personalise.receipt.en.path"),"1","2","3","4","5","6","7");
	}catch(err) {
		MFP.Logger.info("Throw Receipt");
		MFP.Logger.info(err);
		reportError = err;
	}
	

	
	try {
		com.rta.java.adapter.PCardReport.getNolGeneralHistory("ar-AE",MFP.Server.getPropertyValue("rta.nol.general.history.en.path"),"HIHI","1,split,1,split,1;split;")
	}catch(err) {
		MFP.Logger.info("Throw Receipt");
		MFP.Logger.info(err);
		generalreportError = err;
	}
	
	
	try {
		com.rta.java.util.SleepUtil.sleep(1000);
	}catch(err) {
	   MFP.Logger.info("Throw Sleep");
	   MFP.Logger.info(err);
	   sleepError = err;
	}
	
	
	try {
		com.rta.java.adapter.ImageMerge.getImage("1",MFP.Server.getPropertyValue("rta.image.nolTempPath"));
	}catch(err) {
	   MFP.Logger.info("Throw Get Image");
	   MFP.Logger.info(err);
	   imageError = err;
	}

	
	return {
		Report_Error:reportError,
		Sleep_Error:sleepError,
		Image_Error:imageError,
		generalreportError: generalreportError
	};

}


function configCheck() {
	

	var pCardReportPath = "";
	var topupReportPath = "";
	var imagePath = "";
	var nolTravelHistoryPath = "";
	var nolGeneralHistroyPath = "";
	var renewTravelPassPath = "";
	
	try {
		pCardReportPath = MFP.Server.getPropertyValue("rta.nol.card.personalise.receipt.en.path")
	}catch(err) {

	}
	
	try {
		topupReportPath =MFP.Server.getPropertyValue("rta.nol.topup.receipt.en.path")
	}catch(err) {

	}
	
	
	try {
		imagePath =MFP.Server.getPropertyValue("rta.image.nolTempPath")
	}catch(err) {

	}
	
	try {
		nolTravelHistoryPath = MFP.Server.getPropertyValue("rta.nol.travel.history.en.path")
	}catch(err) {

	}
	
	try {
		nolGeneralHistroyPath = MFP.Server.getPropertyValue("rta.nol.general.history.en.path")
	}catch(err) {

	}
	
	try {
		renewTravelPassPath = MFP.Server.getPropertyValue("rta.nol.renew.travel.pass.receipt.en.path")
	}catch(err) {

	}
	
	return 	{
		'rta.nol.card.personalise.receipt.en.path':pCardReportPath
		,'rta.nol.topup.receipt.en.path':topupReportPath
		,'rta.image.nolTempPath':imagePath
		,'nolTravelHistoryPath':nolTravelHistoryPath
		,'nolGeneralHistroyPath':nolGeneralHistroyPath
		,'renewTravelPassPath':renewTravelPassPath
	};

}


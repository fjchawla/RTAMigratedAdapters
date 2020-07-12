var defaultPdfFileUrl = "http://rta.proxym-it.tn/cp/Scalability_and_Hardware_Sizing.pdf";


function downloadPdfFile(url) {
	
	var pdfDownloader = com.proxymit.pdf.utils.PDFDownloader();
	MFP.Logger.info(url);
	MFP.Logger.info(pdfDownloader);
	try{
		var result = pdfDownloader.loadPDFFiles(url);
		return {
			result: result
		};
	}catch(e){
		MFP.Logger.error(e);
		return {
			isSuccessful : false
		};
	}
	
}


function getPDF(url){
	if(typeof url == "undefined"){
		url = defaultPdfFileUrl;
	}
	MFP.Logger.info("PDF downloader adapter : pdf URL");
	MFP.Logger.info(url);
	
	var result =  downloadPdfFile(url);
	MFP.Logger.info("PDF downloader adapter : result start ---------");
	MFP.Logger.info(result); 
	MFP.Logger.info("PDF downloader adapter : result end --------");
	return result;
	
}

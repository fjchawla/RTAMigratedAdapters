
//var defaultUrl = "/Users/hcharfi/Downloads/Dubai_Metro_Leasing Outlets_Datasheet.xlsx";
 var defaultUrl = "D:\\smartgov\\cms\\corpsrvc\\dubai_metro\\dubai_metro_leasing_outlets_datasheet.xlsx";
 
 var defaultTramUrl = "D:\\smartgov\\cms\\corpsrvc\\dubai_tram\\dubai_tram_leasing_vending_machines_datasheet.xlsx";
//var defaultTramUrl = "/Users/malekbelkahla/Desktop/dubai_tram_leasing_vending_machines_datasheet.xlsx";
 
// var defaultVehicleUrl = "/home/mohamed-ali-grissa/Téléchargements/ApprovedVehicles.xlsx";
 var defaultVehicleUrl = "D:\\smartgov\\cms\\corpsrvc\\approved_vehicles\\ApprovedVehicles.xlsx";
 
//var defaultUrl = "http://store.iseeds.fr/test_rta/dubai_metro_leasing_outlets_datasheet.xlsx";

/**
 * @param url
 * @returns json list of items
 */
function getFileData(url) {
	 
	if(typeof url == "undefined"){
		url = defaultUrl;
	}
	
	MFP.Logger.info("Metro adapter : url file list metro stations");
	MFP.Logger.info(url);
	
	MFP.Logger.info("Start executing excel importer script");
	var importer = new com.proxymit.utils.ExcelImporter();
	var result = importer.loadExcelFile(url);
	MFP.Logger.info("Result :");
	MFP.Logger.info(result); 
	MFP.Logger.info("End executing excel importer script");
	
	return {
		result: result
	};
	
}

/**
 * @param url
 * @returns json list of tram stations
 */
function getTramFileData(url) {
	 
	if(typeof url == "undefined"){
		url = defaultTramUrl;
	}
	
	MFP.Logger.info("Metro adapter : url file list tram stations");
	MFP.Logger.info(url);
	
	MFP.Logger.info("Start executing excel importer script");
	var importer = new com.proxymit.utils.ExcelImporter();
	var result = importer.loadTramExcelFile(url);
	MFP.Logger.info("Result :");
	MFP.Logger.info(result); 
	MFP.Logger.info("End executing excel importer script");
	
	return {
		result: result
	};
	
}

/**
 * @param url
 * @returns json list of vehicles stations
 */
function getVehicleFileData(url) {
	 
	if(typeof url == "undefined"){
		url = defaultVehicleUrl;
	}
	
	MFP.Logger.info("Metro adapter : url file list vehicle models");
	MFP.Logger.info(url);
	
	MFP.Logger.info("Start executing excel importer script");
	var importer = new com.proxymit.utils.ExcelImporter();
	var result = importer.loadVehicleExcelFile(url);
	MFP.Logger.info("Result :");
	MFP.Logger.info(result); 
	MFP.Logger.info("End executing excel importer script");
	
	return {
		result: result
	};
	
}


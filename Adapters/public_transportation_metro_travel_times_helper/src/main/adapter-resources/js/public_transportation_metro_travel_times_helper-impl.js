/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
var IsDebugging;
var weekday = new Array(7);
weekday[0]=  "SunToWed";
weekday[1] = "SunToWed";
weekday[2] = "SunToWed";
weekday[3] = "SunToWed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";
function Log(text){
	try {
		IsDebugging=MFP.Server.getPropertyValue("public_transport_is_debugging");
	}catch(e){
		IsDebugging="false";
	}
	// MFP.Logger.warn(""+IsDebugging);
	if(IsDebugging=="true")
		MFP.Logger.warn(text);
	else 
		MFP.Logger.debug(text);
}

var  sheetPath = MFP.Server.getPropertyValue("public_transport_metro_sheet_path");
var  fileName="//file.xlsx";
//var  sheetURl="https://docs.google.com/uc?export=download&id=0B9BMdZDFdOWwRGZhN2pRc2tHN3M";
var  sheetURl="https://www.rta.ae/wpsv5/links/20140225-RL_GL-TT_Q4_2013_&_CRK_JDF_16.3.14%20First_&_Last_Train_New.xlsx";
function getStationNames() {
	try {
		var  fr = new com.ibm.public_transportation.FileReader(fileName,sheetPath,sheetURl);
		var stationNames = fr.getStationNames();
		Log(stationNames.slice());
		return {"stationNames: " : stationNames.slice()};
	}catch(e){}
}
function getLineDirections() {
	try{
		var  fr = new com.ibm.public_transportation.FileReader(fileName,sheetPath,sheetURl);
		var lineDirections = fr.getLineDirections();
		Log(lineDirections.slice());
		return {"lineDirections: " : lineDirections.slice()};
	}catch(e){}
}

function getNextTrain(stationName,lineDirection,day) {
	try{
		var  fileReader = new com.ibm.public_transportation.FileReader(fileName,sheetPath,sheetURl);
		var todayIndex = new Date().getDay();
		var today = weekday[todayIndex];
		var generalFrequencies = JSON.parse(fileReader.getTrainFrequencies(stationName, lineDirection, day));
		var todayFrequencies = JSON.parse(fileReader.getTrainFrequencies(stationName, lineDirection, today));
		var nextTrain = getNextTrainInfo(fileReader,todayFrequencies,stationName,lineDirection);
		var firstTrain;
		var lastTrain;
		
		if(generalFrequencies.length > 0)
		{
			firstTrain = generalFrequencies[0].from;
			var lastFrequencyIndex = generalFrequencies.length - 1;
			lastTrain = generalFrequencies[lastFrequencyIndex].to;
		}
		return {"station" : stationName,
			"nextTrain" : nextTrain,
			"firstTrain" : firstTrain,
			"lastTrain" : lastTrain,
			"trainFrequencies" :generalFrequencies} ;
	}
	catch(e)
	{
		return {exception:e}
	}
}


function getNextTrainInfo(fileReader,todayFrequencies,stationName,lineDirection)
{
	var result;

	var todayIndex = new Date().getDay();
	if(todayFrequencies.length > 0)
	{
		var todayFirstTime = new Date("Sat Apr 18 2015 " + todayFrequencies[0].from + " GMT+0400 (EET)");
		var todayLastTime = new Date("Sat Apr 18 2015 " + todayFrequencies[todayFrequencies.length - 1].to + " GMT+0400 (EET)");
		if(todayLastTime.getTime() <= todayFirstTime.getTime())
			todayLastTime = new Date("Sun Apr 19 2015 " + todayFrequencies[todayFrequencies.length - 1].to + " GMT+0400 (EET)");
		var now = new Date();
		var hour = now.getHours();
		var min = now.getMinutes();
		var sec = now.getSeconds();
		var currentTime = (hour.length < 2 ? "0" + hour:hour) + ":" + (min.length < 2 ? "0" + min:min) + ":" + (sec.length < 2 ? "0" + sec:sec);
		now = new Date("Sat Apr 18 2015 " + currentTime + " GMT+0400 (EET)");
		if(now.getTime() < todayFirstTime)
			result = {from : todayFrequencies[0].from, interval: todayFrequencies[0].interval};
		else if(now.getTime() > todayLastTime)
			{
				var tomorrow = weekday[todayIndex == 6 ? 0 : todayIndex + 1];
				var tomorrowFrequencies = JSON.parse(fileReader.getTrainFrequencies(stationName, lineDirection, tomorrow));
				result = {from : tomorrowFrequencies[0].from, interval: tomorrowFrequencies[0].interval};				
			}
			else
			{
				var isCurrentInterval = false;
				var currentInterval;
				for(var i = 0; i < todayFrequencies.length && !isCurrentInterval; i++)
				{
					var intervalStart = new Date("Sat Apr 18 2015 " + todayFrequencies[i].from + " GMT+0400 (EET)");
					var intervalEnd = new Date("Sat Apr 18 2015 " + todayFrequencies[i].to + " GMT+0400 (EET)");
					isCurrentInterval = (now.getTime() > intervalStart && now.getTime() < intervalEnd);
					if(isCurrentInterval)
						currentInterval = todayFrequencies[i];
				}
				var nextTrainTime = getNextTrainTime(currentInterval.from, currentInterval.to, currentInterval.interval);
				result = {from : nextTrainTime, interval: currentInterval.interval};			
			}
	}
	return result;
}

function getNextTrainTime(fromTime, toTime, interval)
{
	var pos = interval.indexOf(":");
	var min = interval.substring(0,pos);
	var sec = interval.substring(pos+1);
	var intervalInMinutes=parseInt(min) + parseInt(sec)/60;		
	var nextTrainFromTime = new Date("Sat Apr 18 2015 " + fromTime + " GMT+0400 (EET)");
	var nextTrainToTime = new Date("Sat Apr 18 2015 " + toTime + " GMT+0400 (EET)");

	var now = new Date();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	var currentTime = (hour.length < 2 ? "0" + hour:hour) + ":" + (min.length < 2 ? "0" + min:min) + ":" + (sec.length < 2 ? "0" + sec:sec);
	now = new Date("Sat Apr 18 2015 " + currentTime + " GMT+0400 (EET)");

	var nextTrainTime = nextTrainFromTime;
	if(now.getTime() > nextTrainFromTime.getTime() && now.getTime() < nextTrainToTime.getTime())
		while(now.getTime() > nextTrainTime.getTime())
			nextTrainTime = new Date(nextTrainTime.getTime() + intervalInMinutes*60000);
	hour = nextTrainTime.getHours();
	min = nextTrainTime.getMinutes();
	sec = nextTrainTime.getSeconds();
	
	return (hour.length < 2 ? "0" + hour:hour) + ":" + (min.length < 2 ? "0" + min:min) + ":" + (sec.length < 2 ? "0" + sec:sec);
}
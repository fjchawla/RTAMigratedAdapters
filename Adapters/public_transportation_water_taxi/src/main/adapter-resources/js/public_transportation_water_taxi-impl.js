var IsDebugging;

function bookWaterTaxi(userDetails , tripDetails) {
	if(! isUndefinedOrNullOrBlank(tripDetails.duration)&&tripDetails.tripType ==5){
		tripDetails.duration = tripDetails.duration;
	}
	var request = 
		"<urn:bookWaterTaxi>"+
		((isUndefinedOrNullOrBlank(tripDetails.bookingRefNo)) ? "":"<urn:bookingRefNo>"+tripDetails.bookingRefNo+"</urn:bookingRefNo>")+
		((isUndefinedOrNullOrBlank(tripDetails.tripType)) ? "":"<urn:tripType>"+tripDetails.tripType+"</urn:tripType>")+
		((isUndefinedOrNullOrBlank(tripDetails.pickupStation)) ? "":"<urn:pickupStationNo>"+tripDetails.pickupStation+"</urn:pickupStationNo>")+
		((isUndefinedOrNullOrBlank(tripDetails.destinationStation)) ? "":"<urn:destinationStationNo>"+tripDetails.destinationStation+"</urn:destinationStationNo>")+
		((isUndefinedOrNullOrBlank(tripDetails.tripTime)) ? "":"<urn:tripTime>"+tripDetails.tripTime+"</urn:tripTime>")+
		((tripDetails.tripType == 4 || isUndefinedOrNullOrBlank(tripDetails.duration)) ? "":"<urn:duration>"+tripDetails.duration+"</urn:duration>")+
		((isUndefinedOrNullOrBlank(tripDetails.needsTourGuide)) ? "":"<urn:needsTourGuide>"+tripDetails.needsTourGuide+"</urn:needsTourGuide>")+
		((isUndefinedOrNullOrBlank(userDetails.Email)) ? "":"<urn:userId>"+userDetails.Email+"</urn:userId>")+
		"</urn:bookWaterTaxi>";
	var requestString  = getRequest(request);
	return invokeWebServiceString(requestString);
	//return {request:requestString, response:invokeWebServiceString(requestString)}
}
function confirmBooking(userDetails , tripDetails) {
	var request = 
		"<urn:confirmBooking>"+
		((isUndefinedOrNullOrBlank(tripDetails.bookingRefNo)) ? "":"<urn:bookingRefNo>"+tripDetails.bookingRefNo+"</urn:bookingRefNo>")+
		((isUndefinedOrNullOrBlank(tripDetails.custtomerType)) ? "":"<urn:custtomerType>"+tripDetails.custtomerType+"</urn:custtomerType>")+
		((isUndefinedOrNullOrBlank(userDetails.Title)) ? "":"<urn:title>"+userDetails.Title+"</urn:title>")+
		((isUndefinedOrNullOrBlank(userDetails.Name)) ? "":"<urn:callerName>"+userDetails.Name+"</urn:callerName>")+
		((isUndefinedOrNullOrBlank(userDetails.Name)) ? "":"<urn:passengerName>"+userDetails.Name+"</urn:passengerName>")+
		((isUndefinedOrNullOrBlank(userDetails.mobileCountryCode)) ? "":"<urn:mobileCountryCode>"+formatCountryCode(userDetails.mobileCountryCode)+"</urn:mobileCountryCode>")+
		((isUndefinedOrNullOrBlank(userDetails.MobileNumber)) ? "":"<urn:mobileNo>"+userDetails.MobileNumber+"</urn:mobileNo>")+
		((isUndefinedOrNullOrBlank(userDetails.Email)) ? "":"<urn:email>"+userDetails.Email+"</urn:email>")+
		((isUndefinedOrNullOrBlank(userDetails.orgnizationPhone)) ? "<urn:phoneNo>"+userDetails.mobileNo+"</urn:phoneNo>":"<urn:phoneNo>"+userDetails.phoneNo+"</urn:phoneNo>")+
		((isUndefinedOrNullOrBlank(userDetails.Passangers)) ? "":"<urn:passengersNo>"+userDetails.Passangers+"</urn:passengersNo>")+
		((isUndefinedOrNullOrBlank(userDetails.Disabled)) ? "<urn:disabledPassengersNo>0</urn:disabledPassengersNo>":"<urn:disabledPassengersNo>"+userDetails.Disabled+"</urn:disabledPassengersNo>")+
		"<urn:notes>No Data</urn:notes>"+
		((isUndefinedOrNullOrBlank(userDetails.nationalityCode)) ? "":"<urn:nationalityCode>"+userDetails.nationalityCode+"</urn:nationalityCode>")+
		((isUndefinedOrNullOrBlank(userDetails.userId)) ? "":"<urn:userId>"+userDetails.userId+"</urn:userId>")+
		"</urn:confirmBooking>";
	var requestString  = getRequest(request);
	return invokeWebServiceString(requestString);
	//return {request:requestString, response:invokeWebServiceString(requestString)}
}
function getBookingInfo(userDetails , tripDetails) {
	var request = 
		"<urn:getBookingInfo>"+
		((isUndefinedOrNullOrBlank(tripDetails.bookingRefNo)) ? "":"<urn:bookingRefNo>"+tripDetails.bookingRefNo+"</urn:bookingRefNo>")+
		((isUndefinedOrNullOrBlank(userDetails.mobileCountryCode)) ? "":"<urn:mobileCountryCode>"+formatCountryCode(userDetails.mobileCountryCode)+"</urn:mobileCountryCode>")+
		((isUndefinedOrNullOrBlank(userDetails.mobileNo)) ? "":"<urn:mobileNo>"+userDetails.mobileNo+"</urn:mobileNo>")+
		"</urn:getBookingInfo>";
	var requestString  = getRequest(request);
	var response = invokeWebServiceString(requestString);
	try
	{
		if(response.Envelope.Body.getBookingInfoReturn.errorResponse.violationCode == "BR_WTB_007")
		{
			request = 
				"<urn:getBookingInfo>"+
				((isUndefinedOrNullOrBlank(tripDetails.bookingRefNo)) ? "":"<urn:bookingRefNo>"+tripDetails.bookingRefNo+"</urn:bookingRefNo>")+
				((isUndefinedOrNullOrBlank(userDetails.mobileCountryCode)) ? "":"<urn:mobileCountryCode>"+userDetails.mobileCountryCode+"</urn:mobileCountryCode>")+
				((isUndefinedOrNullOrBlank(userDetails.mobileNo)) ? "":"<urn:mobileNo>"+userDetails.mobileNo+"</urn:mobileNo>")+
				"</urn:getBookingInfo>";
			requestString  = getRequest(request);
			response = invokeWebServiceString(requestString);
		}
	}
	catch(ex)
	{
	}
	//return {response:response , request :requestString};
	return response ; 
}
function getFirstAvailableBookingTime(tripDetails) {
	if(! isUndefinedOrNullOrBlank(tripDetails.duration)&&tripDetails.tripType==5){
		tripDetails.duration = tripDetails.duration*60;
	}
	var request = 
		"<urn:getFirstAvailableBookingTime>"+
		((isUndefinedOrNullOrBlank(tripDetails.tripType)) ? "":"<urn:tripType>"+tripDetails.tripType+"</urn:tripType>")+
		((isUndefinedOrNullOrBlank(tripDetails.pickupStation)) ? "":"<urn:pickupStationNo>"+tripDetails.pickupStation+"</urn:pickupStationNo>")+
		((isUndefinedOrNullOrBlank(tripDetails.destinationStation)) ? "":"<urn:destinationStationNo>"+tripDetails.destinationStation+"</urn:destinationStationNo>")+
		((isUndefinedOrNullOrBlank(tripDetails.duration)) ? "":"<urn:duration>"+tripDetails.duration+"</urn:duration>")+
		"</urn:getFirstAvailableBookingTime>";
	var requestString  = getRequest(request);
	return invokeWebServiceString(requestString);
}
function getTripInfo(userDetails,tripDetails) {
	if(! isUndefinedOrNullOrBlank(tripDetails.duration)&&tripDetails.tripType==5){
		tripDetails.duration = tripDetails.duration*60;
	}
	var request = 
		"<urn:getTripInfo>"+
		((isUndefinedOrNullOrBlank(tripDetails.tripType)) ? "":"<urn:tripType>"+tripDetails.tripType+"</urn:tripType>")+
		((isUndefinedOrNullOrBlank(tripDetails.pickupStation)) ? "":"<urn:pickupStationNo>"+tripDetails.pickupStation+"</urn:pickupStationNo>")+
		((isUndefinedOrNullOrBlank(tripDetails.destinationStation)) ? "":"<urn:destinationStationNo>"+tripDetails.destinationStation+"</urn:destinationStationNo>")+
		((isUndefinedOrNullOrBlank(tripDetails.duration)) ? "":"<urn:duration>"+tripDetails.duration+"</urn:duration>")+
		((isUndefinedOrNullOrBlank(userDetails.Email)) ? "":"<urn:userId>"+userDetails.Email+"</urn:userId>")+
		"</urn:getTripInfo>";
	var requestString  = getRequest(request);
	return invokeWebServiceString(requestString);
}

function getTransactionAmount(refNo) {
	var request = 
		"<urn:getPaidAmount>"+
         "<urn:bookingRefNo>"+refNo+"</urn:bookingRefNo>"+
        "</urn:getPaidAmount>";
	var requestString  = getRequest(request);
	var response = invokeWebServiceString(requestString);
	var amount = response.Envelope.Body.getPaidAmountReturn.paidAmount;
	return {amount:amount}
}
function invokeWebServiceString(request, servicePath) {
	var input = {
			method : 'post',
			headers :{
				"SOAPAction" : ""
			},
			returnedContentType : 'xml',
			path : 'waterTaxiService',
			body : {
				content : request,
				contentType : 'text/xml; charset=utf-8'
			}
	};
	return MFP.Server.invokeHttp(input);
}
function isUndefinedOrNullOrBlank(v)
{
	if(v == undefined || v == "undefined" || v == null || v == "")
		result = true;
	else
		result = false;
	return result;
}
function getRequest (requestString){
	var userName = "rta_user";
	var password = "123456"; 
	var request = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:WaterTaxiService'>"+
	"<soapenv:Header>"+
	"<urn:username>"+userName+"</urn:username>"+
	"<urn:password>"+password+"</urn:password>"+
	"</soapenv:Header>"+                         
	"<soapenv:Body>"+
	requestString +
	"</soapenv:Body>"+
	"</soapenv:Envelope>";
	return request ;
}

function confirmDSGTransaction(transactionId, degTrn,spTrnRef,dsgSpCode,dsgServiceCode,transactionDate,isServiceDeliveryReqd) {
	
	var request = 
		"<urn:confirmDsgTransaction>"+
			"<urn:transactionId>"+transactionId+"</urn:transactionId>"+
			"<urn:dsgTrnRef>"+degTrn+"</urn:dsgTrnRef>"+
			"<urn:dsgSpCode>"+dsgSpCode+"</urn:dsgSpCode>"+
			"<urn:spTrnRef>"+spTrnRef+"</urn:spTrnRef>"+
			"<urn:dsgServiceCode>"+dsgServiceCode+"</urn:dsgServiceCode>"+
			"<urn:transactionDate>"+transactionDate+"</urn:transactionDate>"+
			"<urn:paymentMethod>Credit Card</urn:paymentMethod>"+
			"<urn:message>SUCCESS</urn:message>"+
			"<urn:messageCode>0</urn:messageCode>"+
			"<urn:isServiceDeliveryReqd>"+isServiceDeliveryReqd+"</urn:isServiceDeliveryReqd>"+
		"</urn:confirmDsgTransaction>";
	var requestString  = getRequest(request);
	var response = invokeWebServiceString(requestString);
	var result = "Failed";
	try
	{
		var confirmDsgTransactionReturn = response.Envelope.Body.confirmDsgTransactionReturn;
		var errorResponse = confirmDsgTransactionReturn.errorResponse;
		if(errorResponse == undefined || errorResponse == null || errorResponse == "")
			result = "Confirmed";
		else
		{
			var violationCode = errorResponse.violationCode;
			if(violationCode == undefined || violationCode == null || violationCode == "")
				result = "Confirmed";
		}
	}
	catch(ex){}
	return {status:result,request:requestString,response:response};
}
function formatDateTime(dateTime)
{
	var result;
	try
	{
		var year = dateTime.substring(0,4);
		if(isNaN(year))
			result = dateTime;
		else
		{
			var remainingString = dateTime.substring(5);
			var pos = remainingString.indexOf("-");
			var month = remainingString.substring(0,pos);
			remainingString = remainingString.substring(pos+1);
			pos = remainingString.indexOf(" ");
			var day = remainingString.substring(0,pos);
			remainingString = remainingString.substring(pos+1);
			pos = remainingString.indexOf(":");
			var hour = remainingString.substring(0,pos);
			remainingString = remainingString.substring(pos+1);
			pos = remainingString.indexOf(":");
			var min = remainingString.substring(0,pos);
			pos = remainingString.indexOf(":");
			var sec = remainingString.substring(pos+1);
			result = day + "-" + month + "-" + year
			+ " " + hour + ":" + min;
		}
	}
	catch(ex)
	{
		result = dateTime;
	}
	return result;
}

function formatCountryCode(countryCode)
{
	var result = countryCode ; 
	if(isUndefinedOrNullOrBlank(countryCode))
		result = "971";
	else
	{
			if(countryCode.indexOf("00")>-1){
				result = countryCode.substr(2);
			}
			else if (countryCode.indexOf("0")>-1 || countryCode.indexOf("+")>-1){
				result = countryCode.substr(1);
			}
	}
	return result;
}

function isUndefinedOrNullOrBlank(variable)
{
	return (variable == undefined || variable == null || variable == "");
}
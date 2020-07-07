var WSSE_USERNAME = MFP.Server.getPropertyValue("tokens.tipcoService.username");
var WSSE_PASSWORD = MFP.Server.getPropertyValue("tokens.tipcoService.password");

var USER_NAME = "Omnix_User";
//var PASSWORD = "test12345";
var PASSWORD = '555M55MM';

function newRentalBooking(arrayOfTripInfo, contactName, orgName, mobile, phone, email, numberOfPassengers, purposeOfRental) {
	var soapActionHeader = '"NewRentalBooking"';
	var tripInfos = _addTripInfos(arrayOfTripInfo);
	if(tripInfos == ""){
		return {
			isSuccessful : false,
			message : "Provided information are not correct (arrayOfTripInfo)",
			responseCode : "1",
			responseMessageAr : "المعلومات المقدمة غير صحيحة",
			responseMessageEn : "Provided information are not correct",
			reference : response
		};
	}
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/NewRentalBookingService/XMLSchema">\
		   <soapenv:Header>\
    <xs:ExternalUser>\
       <xs:externalUsername>'+USER_NAME+'</xs:externalUsername>\
       <xs:externalUserPassword>'+PASSWORD+'</xs:externalUserPassword>\
    </xs:ExternalUser>\
    <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" soapenv:mustUnderstand="0">\
       <wsse:UsernameToken>\
        <wsse:Username>'+WSSE_USERNAME+'</wsse:Username>\
        <wsse:Password>'+WSSE_PASSWORD+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <xs:RentalBooking>\
       <!--Optional:-->\
       <xs:obj_trip>\
          <!--Zero or more repetitions:-->\
          '+tripInfos+'\
       </xs:obj_trip>\
            <xs:Contact_person>'+contactName+'</xs:Contact_person>\
       <xs:Organization_name>'+orgName+'</xs:Organization_name>\
       <!--Optional:-->\
       <xs:Mobile>'+mobile+'</xs:Mobile>\
       <!--Optional:-->\
       <xs:Phone>'+phone+'</xs:Phone>\
       <!--Optional:-->\
       <xs:Email>'+email+'</xs:Email>\
       <xs:Number_of_passensgers>'+numberOfPassengers+'</xs:Number_of_passensgers>\
       <xs:Purpose_of_rental>'+purposeOfRental+'</xs:Purpose_of_rental>\
    </xs:RentalBooking>\
 </soapenv:Body>\
</soapenv:Envelope>';

	MFP.Logger.warn(transactionString);
	var path = 'newrentalbookingservice';
	var input = {
			method : 'POST',
			returnedContentType : 'xml',
			headers : {'SOAPAction' : soapActionHeader},
			path : path,
			body : {
				content : transactionString.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
	};


	var response = MFP.Server.invokeHttp(input);
	
	if(response.Envelope.Body == undefined || response.Envelope.Body.RentalBookingResponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 450,
			message : "An error has occured while submitting new rental booking. Kindly try again",
			reference : response
		};
	}
	return response.Envelope.Body.RentalBookingResponse;
	
}

function _addTripInfos(input){
	var tripInfos = "";
	try {
		for (i in input) {
			tripInfos += '<xs:TripInfo>\
             <!--Optional:-->\
             <xs:Bus_Type>'
					+ input[i].busType
					+ '</xs:Bus_Type>\
             <xs:Number_of_Buses>'
					+ input[i].busesNo
					+ '</xs:Number_of_Buses>\
             <!--Optional:-->\
             <xs:Pick_up_location>'
					+ input[i].pickUpLocation
					+ '</xs:Pick_up_location>\
             <!--Optional:-->\
             <xs:Drop_off_location>'
					+ input[i].dropOffLocation
					+ '</xs:Drop_off_location>\
             <xs:Pick_up_date>'
					+ input[i].pickUpDate
					+ '</xs:Pick_up_date>\
             <!--Optional:-->\
             <xs:Pick_up_time>'
					+ input[i].pickUpTime
					+ '</xs:Pick_up_time>\
             <xs:Drop_off_date>'
					+ input[i].dropOffDate
					+ '</xs:Drop_off_date>\
             <!--Optional:-->\
             <xs:Drop_off_time>'
					+ input[i].dropOffTime
					+ '</xs:Drop_off_time>\
          </xs:TripInfo>';
		}
	} catch (e) {
		MFP.Logger.warn(e.toString);
	}
	return tripInfos;
}

function generateRentBusReceipt(arrayOfTripInfo, contactName, orgName, mobile, phone, email, numberOfPassengers, purposeOfRental){
	var html = '<html>\
	<body style="font-family: arial;">\
	<div style=" display: block;overflow: hidden;background: white;">\
		 <div style="border: 1px solid #ccc;">\
			<table width="100%">\
				<tr>\
					<td align="left" width="25%"><img src="images/logoDubai.jpg" height="80"/></td>\
					<td align="center" style="font-size:25px;"><em><b>Booking Request</b></em></td>\
					<td align="right" width="50%"><img src="images/logo.jpg"  height="125"/></td>\
				</tr>\
			</table>\
		</div>\
		<br />\<hr />\
	</div><br />';
	for (i in arrayOfTripInfo){
		html += '	<div style="font-size: 15px; border-bottom: 2px solid;padding: 8px 0; overflow: hidden;">\
	<div>\
			<div style="width:50%; float:left; min-height: 30px;">Bus Type</div>\
			<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">'+_getBusType(arrayOfTripInfo[i].busType)+'</div>\
		</div>\
		<div>\
			<div style="width:50%; float:left; min-height: 30px;">Number of Buses</div>\
			<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">'+arrayOfTripInfo[i].busesNo+'</div>\
		</div>\
		<div>\
			<div style="width:50%; float:left; min-height: 30px;">Pick Up</div>\
			<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">'+_reverseTextIfArabic(arrayOfTripInfo[i].pickUpLocation)+'</div>\
		</div>\
		<div>\
			<div style="width:50%; float:left; min-height: 30px;">Drop Off</div>\
			<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">'+_reverseTextIfArabic(arrayOfTripInfo[i].dropOffLocation)+'</div>\
		</div>\
		<div>\
			<div style="width:50%; float:left; min-height: 30px;">Duration</div>\
			<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">'+arrayOfTripInfo[i].duration+'</div>\
		</div>\
		<div>\
			<div style="width:50%; float:left; min-height: 30px;">Date & Time</div>\
			<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">'+arrayOfTripInfo[i].pickUpDate+'      <span style="margin-left: 6px;">      '+arrayOfTripInfo[i].pickUpTime+'</span></div>\
		</div>\
		<br />\<hr />\
	</div><br />';
	}
	html += '<div style="font-size: 15px; border-bottom: 1px solid;padding: 8px 0; overflow: hidden;">\
			<div>\
		<div style="width:50%; float:left; min-height: 30px;">Booking Type</div>\
		<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">Organization</div>\
	</div>\
	<div>\
		<div style="width:50%; float:left; min-height: 30px;">Name</div>\
		<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">'+contactName+'</div>\
	</div>\
	<div>\
		<div style="width:50%; float:left; min-height: 30px;">Organization Name</div>\
		<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">'+orgName+'</div>\
	</div>\
	<div>\
		<div style="width:50%; float:left; min-height: 30px;">Mobile</div>\
		<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">'+mobile+'</div>\
	</div>\
	<div>\
		<div style="width:50%; float:left; min-height: 30px;">Email</div>\
		<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">'+email+'</div>\
	</div>\
	<div>\
		<div style="width:50%; float:left; min-height: 30px;">Number of Passengers</div>\
		<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">'+numberOfPassengers+'</div>\
	</div>\
	<div>\
		<div style="width:50%; float:left; min-height: 30px;">Passengers with Special Needs</div>\
		<div style="width:50%; float:left; font-weight:bold; text-align:right; min-height: 30px;">0</div>\
	</div>\
	<br />\
	</div><br />\<hr />\
	</body>\
	</html>';
//	var base64ImageString =  com.proxymit.pdf.utils.HtmlToPDF.convertWithImg(html, "/home/mohamed-ali-grissa/RTA_Workspace/2014_omnix_rta/server/conf/corporates/");
	var base64ImageString =  com.proxymit.pdf.utils.HtmlToPDF.convertWithImg(html, "D:/smartgov/cms/corpsrvc/servers_res/");
	base64ImageString =  com.proxymit.pdf.utils.PDFToImage.convertPDFToImage(base64ImageString);
	return {
		data : base64ImageString ,
		extension : "pdf"
	};
}

function _getBusType(busTypeId) {
	busesTypes = {
		"1" : "Deluxe Coaches (Volvo) Buses",
		"2" : "Standard Buses",
		"3" : "Articulated Buses",
		"4" : "Double Deck Buses"

	};
	return busesTypes[busTypeId];
}

function _reverseTextIfArabic(input) {
	return com.proxymit.pdf.utils.HtmlToPDF.reverseIfArabic(input);
}

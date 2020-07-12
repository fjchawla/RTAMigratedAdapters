var IsDebugging;

function submitFoundItem(userDetails,itemDetails,tripDetails) {
	var invocationData ; 
	var result;
	var request;
	var referenceNo;
	try
	{
		request = 
		"<xs:SubmitFoundItemRequest>"+
			((itemDetails.Category == undefined || itemDetails.Category == null) ? "":"<xs:Category>"+itemDetails.Category+"</xs:Category>")+
			((itemDetails.Color == undefined || itemDetails.Color == null) ? "":"<xs:Color>"+itemDetails.Color+"</xs:Color>")+
			((itemDetails.Description == undefined || itemDetails.Description == null) ? "":"<xs:Description>"+itemDetails.Description+"</xs:Description>")+
			((userDetails.Email == undefined || userDetails.Email == null) ? "":"<xs:Email>"+userDetails.Email+"</xs:Email>")+
			((userDetails.FirstName == undefined || userDetails.FirstName == null) ? "":"<xs:FirstName>"+userDetails.FirstName+"</xs:FirstName>")+
			((userDetails.LastName == undefined || userDetails.LastName == null) ? "":"<xs:LastName>"+userDetails.LastName+"</xs:LastName>")+
			((userDetails.MobileNumber == undefined || userDetails.MobileNumber == null) ? "":"<xs:MobileNumber>"+userDetails.MobileNumber+"</xs:MobileNumber>")+
			((itemDetails.When == undefined || itemDetails.When == null) ? "":"<xs:When>"+formatDateTime(itemDetails.When)+"</xs:When>")+
		"</xs:SubmitFoundItemRequest>";
		var parameters = [request,"/foundItemService","FoundItemService"];
		invocationData = {
				adapter : 'public_transportation_TibcoServiceAdapter',
				procedure : 'invokeWebServiceByStringRequest',
				parameters : parameters
		};

		result = MFP.Server.invokeProcedure(invocationData);
		referenceNo = result.Envelope.Body.SubmitFineObjectionResponse.SubmitFoundItemResponse;
	}
	catch(ex)
	{
		referenceNo = "Error";
	}

	return {referenceNo : referenceNo, request:request, response:result};
}
function submitlostTaxiService(userDetails,itemDetails,tripDetails) {
	var invocationData ; 
	var result;
	var request;
	var referenceNo;
	try
	{
		request =
		"<xs:Submit>"+
			"<xs:request>"+
				((itemDetails.Category == undefined || itemDetails.Category == null) ? "":"<xs:Category>"+itemDetails.Category+"</xs:Category>")+
				((itemDetails.Color == undefined || itemDetails.Color == null) ? "":"<xs:Color>"+itemDetails.Color+"</xs:Color>")+
				((itemDetails.Description == undefined || itemDetails.Description == null) ? "":"<xs:Description>"+itemDetails.Description+"</xs:Description>")+
				((userDetails.Email == undefined || userDetails.Email == null) ? "":"<xs:Email>"+userDetails.Email+"</xs:Email>")+
				((tripDetails.End == undefined || tripDetails.End == null) ? "":"<xs:End>"+formatDateTime(tripDetails.End)+"</xs:End>")+
				((userDetails.FirstName == undefined || userDetails.FirstName == null) ? "":"<xs:FirstName>"+userDetails.FirstName+"</xs:FirstName>")+
				((tripDetails.From == undefined || tripDetails.From == null) ? "":"<xs:From>"+tripDetails.From+"</xs:From>")+
				((userDetails.LastName == undefined || userDetails.LastName == null) ? "":"<xs:LastName>"+userDetails.LastName+"</xs:LastName>")+
				((userDetails.MobileNumber == undefined || userDetails.MobileNumber == null) ? "":"<xs:MobileNumber>"+userDetails.MobileNumber+"</xs:MobileNumber>")+
				((tripDetails.PlateNumber == undefined || tripDetails.PlateNumber == null) ? "<xs:PlateNumber></xs:PlateNumber>":"<xs:PlateNumber>"+tripDetails.PlateNumber+"</xs:PlateNumber>")+
				((tripDetails.SideNumber == undefined || tripDetails.SideNumber == null) ? "<xs:SideNumber></xs:SideNumber>":"<xs:SideNumber>"+tripDetails.SideNumber+"</xs:SideNumber>")+
				((tripDetails.Start == undefined || tripDetails.Start == null) ? "":"<xs:Start>"+formatDateTime(tripDetails.Start)+"</xs:Start>")+
				((tripDetails.To == undefined || tripDetails.To == null) ? "":"<xs:To>"+tripDetails.To+"</xs:To>")+
				((itemDetails.When == undefined || itemDetails.When == null) ? "":"<xs:When>"+formatDateTime(itemDetails.When)+"</xs:When>")+
			"</xs:request>"+
		"</xs:Submit>";
		var parameters = [request,"/lostAndFoundTaxiService","LostAndFoundTaxiService"];
		invocationData = {
				adapter : 'public_transportation_TibcoServiceAdapter',
				procedure : 'invokeWebServiceByStringRequest',
				parameters : parameters
		};

		result = MFP.Server.invokeProcedure(invocationData);
		referenceNo = result.Envelope.Body.SubmitResponse.SubmitResult;
	}
	catch(ex)
	{
		referenceNo = "Error"+ex;
	}

	return {referenceNo : referenceNo, request:request, response:result};
}
function submitlostBusService(userDetails,itemDetails,tripDetails) {
		var invocationData ; 
		var result;
		var request;
		var referenceNo;
		try
		{
			var request =
	"<xs:Submit>"+
		"<xs:request>"+
			((itemDetails.Category == undefined || itemDetails.Category == null) ? "":"<xs:Category>"+itemDetails.Category+"</xs:Category>")+
			((itemDetails.Color == undefined || itemDetails.Color == null) ? "":"<xs:Color>"+itemDetails.Color+"</xs:Color>")+
            ((itemDetails.Description == undefined || itemDetails.Description == null) ? "":"<xs:Description>"+itemDetails.Description+"</xs:Description>")+
            ((userDetails.Email == undefined || userDetails.Email == null) ? "":"<xs:Email>"+userDetails.Email+"</xs:Email>")+
            ((tripDetails.End == undefined || tripDetails.End == null) ? "":"<xs:End>"+formatDateTime(tripDetails.End)+"</xs:End>")+
            ((userDetails.FirstName == undefined || userDetails.FirstName == null) ? "":"<xs:FirstName>"+userDetails.FirstName+"</xs:FirstName>")+
            ((tripDetails.From == undefined || tripDetails.From == null) ? "":"<xs:From>"+tripDetails.From+"</xs:From>")+
            ((userDetails.LastName == undefined || userDetails.LastName == null) ? "":"<xs:LastName>"+userDetails.LastName+"</xs:LastName>")+
            ((userDetails.MobileNumber == undefined || userDetails.MobileNumber == null) ? "":"<xs:MobileNumber>"+userDetails.MobileNumber+"</xs:MobileNumber>")+
            ((tripDetails.NOLCardNumber == undefined || tripDetails.NOLCardNumber == null) ? "<xs:NOLCardNumber></xs:NOLCardNumber>":"<xs:NOLCardNumber>"+tripDetails.NOLCardNumber+"</xs:NOLCardNumber>")+
            ((tripDetails.PlateNumber == undefined || tripDetails.PlateNumber == null) ? "<xs:PlateNumber></xs:PlateNumber>":"<xs:PlateNumber>"+tripDetails.PlateNumber+"</xs:PlateNumber>")+
            ((tripDetails.RouteNumber == undefined || tripDetails.RouteNumber == null) ? "":"<xs:RouteNumber>"+tripDetails.RouteNumber+"</xs:RouteNumber>")+
            ((tripDetails.SideNumber == undefined || tripDetails.SideNumber == null) ? "<xs:SideNumber>00000000-0000-0000-0000-000000000000</xs:SideNumber>":"<xs:SideNumber>"+tripDetails.SideNumber+"</xs:SideNumber>")+
            ((tripDetails.Start == undefined || tripDetails.Start == null) ? "":"<xs:Start>"+formatDateTime(tripDetails.Start)+"</xs:Start>")+
            ((tripDetails.To == undefined || tripDetails.To == null) ? "":"<xs:To>"+tripDetails.To+"</xs:To>")+
            ((itemDetails.When == undefined || itemDetails.When == null) ? "":"<xs:When>"+formatDateTime(itemDetails.When)+"</xs:When>")+
		"</xs:request>"+
	"</xs:Submit>";
			var parameters = [request,"/lostAndFoundBusService","LostAndFoundBusService"];
			//parameters.push("/lostAndFoundBusService");
			invocationData = {
					adapter : 'public_transportation_TibcoServiceAdapter',
					procedure : 'invokeWebServiceByStringRequest',
					parameters : parameters
			};

			result = MFP.Server.invokeProcedure(invocationData);
			referenceNo = result.Envelope.Body.SubmitResponse.SubmitResult;
		}
		catch(ex)
		{
			referenceNo = "Error";
		}

		return {referenceNo : referenceNo, request:request, response:result};
	}

	function formatDateTime(dateTime)
	{
		var result;
		var year = dateTime.substring(0,4);
		var remainingString = dateTime.substring(5);
		var pos = remainingString.indexOf("-");
		var month = remainingString.substring(0,pos);
		remainingString = remainingString.substring(pos+1);
		pos = remainingString.indexOf("T");
		var day = remainingString.substring(0,pos);
		remainingString = remainingString.substring(pos+1);
		pos = remainingString.indexOf(":");
		var hour = remainingString.substring(0,pos);
		remainingString = remainingString.substring(pos+1);
		pos = remainingString.indexOf(":");
		var min = remainingString.substring(0,pos);
		pos = remainingString.indexOf(":");
		var sec = remainingString.substring(pos+1);
		result = year + "-" + (month.length < 2 ? "0" + month:month) + "-" + (day.length < 2 ? "0" + day:day)
		         + "T" + (hour.length < 2 ? "0" + hour:hour) + ":" + (min.length < 2 ? "0" + min:min) + ":" + (sec.length < 2 ? "0" + sec:sec);
		return result;
	}
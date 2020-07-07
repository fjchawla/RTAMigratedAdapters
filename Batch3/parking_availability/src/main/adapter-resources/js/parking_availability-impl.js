function getMasterData(version){
	try{
		var input = {
				method : 'get',
				returnedContentType : 'application/json',
				path :'rtaParking/masterInformation?version='+version,
		};

		return MFP.Server.invokeHttp(input);
				
	}catch(exp){
		var webServiceResult= {
				Envelope:{

					"Body":{}
		,"error":exp.toString()
		,"Header":""}
		,"totalTime":54
		,"isSuccessful":true
		,"responseHeaders":{"Date":+new Date()+",'Content-Type':'text\/xml; charset=utf-8'"}
		,"statusReason":"OK"
			,"warnings":[]
		,"errors":[]
		,"info":[]
		,"responseTime":53
		,"statusCode":200
		}
		return webServiceResult; 

	}

}

function getAvailability(street){
	try{
		var input = {
				method : 'get',
				returnedContentType : 'application/json',
				path : 'rtaParking/queryAvailability?locationType='+street,

		};

		return MFP.Server.invokeHttp(input);
		
		
	}catch(exp){
		var webServiceResult= {
				Envelope:{

					"Body":{}
		,"error":exp.toString()
		,"Header":""}
		,"totalTime":54
		,"isSuccessful":true
		,"responseHeaders":{"Date":+new Date()+",'Content-Type':'text\/xml; charset=utf-8'"}
		,"statusReason":"OK"
			,"warnings":[]
		,"errors":[]
		,"info":[]
		,"responseTime":53
		,"statusCode":200
		}
		return webServiceResult; 

	}
}
function getAllAvailability(){
	try{
		var input = {
				method : 'get',
				returnedContentType : 'application/json',
				path : 'rtaParking/queryAvailability',

		};

		return MFP.Server.invokeHttp(input);
		
		
	}catch(exp){
		var webServiceResult= {
				Envelope:{

					"Body":{}
		,"error":exp.toString()
		,"Header":""}
		,"totalTime":54
		,"isSuccessful":true
		,"responseHeaders":{"Date":+new Date()+",'Content-Type':'text\/xml; charset=utf-8'"}
		,"statusReason":"OK"
			,"warnings":[]
		,"errors":[]
		,"info":[]
		,"responseTime":53
		,"statusCode":200
		}
		return webServiceResult; 

	}
}
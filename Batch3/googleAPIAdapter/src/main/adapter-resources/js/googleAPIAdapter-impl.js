//Staging 
/*var Dev_Keys = {
		SHELL:{
			iOS:"AIzaSyAr6BMLPCYnNkq-KS1-XD1C3RNjHHZLsRI",
			android:"AIzaSyAg20LnPxTuXx1TC4QZSlSGTs800q8FuN4",
			IPRestrictedKey:"AIzaSyBs6Cxa7JP9u16_O5CA73EuwlwIKKE-G6g"
		},
		DNVAPP:{
			iOS:"AIzaSyAbNjXseGPrzbp9Q44VOxVE8njSqseyW7k",
			android:"AIzaSyBhXYiE4SbLWxA5ft8R4v6dYDlTADMo8f8",
			IPRestrictedKey:"AIzaSyB77xbR-I7PUoA8nW3D3R_2wfkBs2ug_RE"
		},
		CORPAPP:{
			iOS:"AIzaSyAa1z9qh2tGXMJBTUBmJuLo8g_wYbYlZHo",
			android:"AIzaSyC-M4RxhIrWT1WrtQvPAeMETbLgC2guz3o",
			IPRestrictedKey:"AIzaSyAFTZ4bqwVCLkXLEd9Jh0wRpAjL4OeO4Ns"
		},
		PTAPP:{
			iOS:"",
			android:"",
			IPRestrictedKey:"AIzaSyB0PwhPB0vtF4vKAk_7biNGestZw3-05Ts"
		},
		RTADAPP:{
			iOS:"AIzaSyDY143gDfydSVlFcUYjYJJjQTc8C8vkYKM",
			android:"AIzaSyBv4ongG_Z9NwyhluyAbkvV7RoZ8lZyX20",
			IPRestrictedKey:"AIzaSyCCDVgFQqmzg9lFNOHc7026cAT7FTqSGCU"
		},
		Chatbot:{
			web:"AIzaSyAbw3FZM87-wg2UTsaNztNph6_Y4EaNYpk",
		}
};*/

//Production
/*var Keys = {
		SHELL:{
			iOS:"AIzaSyBBLjPKX8mP1C41HNRoPXVvXMLKSX7BNDA",
			android:"AIzaSyBAJ96pug0Vl9YenL1SLyMfpjVE7cV-UBI",
			IPRestrictedKey:"AIzaSyBesPEzjeGY9kc78ITsYU965FCXfYDYfKo"
		},
		DNVAPP:{
			iOS:"AIzaSyDJn9MFrbufwcCy_TV2BMVdtSICfi2EcOc",
			android:"AIzaSyBC4BwuHnn7m43p3YSKPtwmEFZb9dUTsdU",
			IPRestrictedKey:"AIzaSyCqyk2MUhjTYZ2aqmcUS3-ra5bnXyLWwAU"
		},
		CORPAPP:{
			iOS:"AIzaSyAtN6SIldMdsZFGHSMNECrkzRAChMt1qps",
			android:"AIzaSyAp1o7Bs2tT2eApimvvSxLWCbc4gfxi-FI",
			IPRestrictedKey:"AIzaSyBbkYp_uGAGhXVK2e2vvRD_6Y94J89KiTo"
		},
		PTAPP:{
			iOS:"",
			android:"",
			IPRestrictedKey:"AIzaSyB_AAb-iw0Jtga2s9Xnsje53vE39b3ZvKE"
		},
		RTADAPP:{
			iOS:"AIzaSyBbQBgAVkL8AYbxbTywMuzQub95d4S5hGg",
			android:"AIzaSyBAGePSBQjpkT7V_QgLrwFJF5zUvqJEgoY",
			IPRestrictedKey:"AIzaSyDCW-paTyv7gzA8ySHB8AgdJJ007iifzCE"
		},
		Chatbot:{
			web:"AIzaSyDCiH1SVGGpyotgFpDKAKvG2RjYK_p5fTE",
		}
};
Keys=Dev_Keys;*/

function handleError(msg,code){
	var msg= msg || "Internal Server Error";
	var code =code||500;

	adapterLogger("handleError","error", "Internal Error",JSON.stringify([msg,code]));

	return {
		"isSuccessful": false,
		"error": {
			"code": code,
			"message": msg,
			"adapter": "googleAPIAdapter"
		}
	};
}
function adapterLogger(procudureName , type , suffix, msg ){
	var _msg = msg || "";
	try{
		var prefix= "|googleAPIAdapter |" + procudureName +" |"+ suffix + " : " ;
		switch(type){
		case "error":
			MFP.Logger.error(prefix + _msg);
			break;
		case "warn":
			MFP.Logger.warn(prefix+_msg);
			break;
		case "info":
			MFP.Logger.info(prefix+ _msg);
			break;
		}
	}catch(e){
		MFP.Logger.error("|googleAPIAdapter |adapterLogger |Exception" + JSON.stringify(e));
	}
}
var googleAPIs= ['Maps JavaScript API','Maps Static API','Places API','Directions API'];

//Directions API
//Distance Matrix API
//Elevation API
//Geocoding API
//Geolocation API
//Maps Embed API
//Maps JavaScript API
//Maps SDK for Android
//Maps SDK for iOS
//Maps Static API
//Places API
//Places SDK for Android
//Places SDK for iOS
//Roads API
//Street View API
//Time Zone API


//var options ={ 
//'location' : '25.2335517,55.3561821',
//'language':'en',
//'type':'mosque',
//'radius':'1500',
//'keyword':'mosque'
//};


function verifyGoogleAPI(googleAPI){
	if (googleAPIs.indexOf(googleAPI) > -1){
		return true;
	}else{
		return false;
	}
}

function generateOptionStirng(options){
	var _options='';

	for(var key in options){
		var isArrayOfOptions = (Object.prototype.toString.call(options[key]) === '[object Array]');
		if(isArrayOfOptions){
			for (var i = 0 ; i< options[key].length ; i++){
				_options+="&"+ key + "="+ options[key][i];
			}
		}else{
			_options+="&"+ key + "="+ options[key];
		}

	}
	return _options;
}


function getAPIKey(appName, platform/*,googleAPI, options*/) {

	try {
		var invocationData = {
				adapter : 'appConfigAdapter',
				procedure : 'getConfigValue',
				parameters : ["googleAPI"]
		};
		var result = MFP.Server.invokeProcedure(invocationData);
   	//MFP.Logger.warn("googleapisAdapter |getAPIKey |result call App Config : " +  JSON.stringify(result) );

		if (result &&result.isSuccessful){

			var Keys=JSON.parse(result["Value"]);

			var _keyObject=Keys[appName];

			if (_keyObject != undefined && _keyObject != null){
				var _key = _keyObject[platform];
				return {key :_key};
			}
			else{
				return {error :"Please Ask Shell Team to configure the Key for your APP"};
			}
		}else {
			return {error :result};
		}
	}catch(e){
		adapterLogger("getAPIKey","error", "Exception",JSON.stringify(e));
		return handleError();
	}

}
function getAPIURL(appName, platform,googleAPI,query, options) {
	try {
		var _url = "";
		var _getAPIKey= getAPIKey(appName, platform);

		if (_getAPIKey.error){
			return{error : _getAPIKey.error}; 
		}

		var _key = _getAPIKey.key;
		if (verifyGoogleAPI(googleAPI)){
			switch (googleAPI){
			case "Places API":
//				return {'options':generateOptionStirng(options)};
				_url = "https://maps.googleapis.com/maps/api/place/"+query +"/json?key="+_key+ generateOptionStirng(options) ;
				break;

			case 'Maps JavaScript API':
				_url = "https://maps.googleapis.com/maps/api/js?key="+_key +"&libraries=drawing"+ generateOptionStirng(options) ;
				break;
			case 'Maps Static API':
				_url = "https://maps.googleapis.com/maps/api/staticmap?key="+_key + generateOptionStirng(options) ;
				break;
			}
			return {'url' :_url};


		}else {
			return {error :"Please specify the google API with any of the following values [ "+ googleAPIs+" ]" };
		}

		return {error :'Please check all parameters that sent in the request'};
	}catch(e){
		adapterLogger("getAPIURL","error", "Exception",JSON.stringify(e));
		return handleError();
	}
}

function callGoogleAPI(appName, platform,googleAPI,query, options){


	var folmulatedPath=getAPIURL(appName, platform,googleAPI,query, options).url.replace("https://maps.googleapis.com","");

//	return {'folmulatedPath':folmulatedPath};
	var input = {
			method : 'post',
			returnedContentType : 'json',
			path : folmulatedPath
	};
	return MFP.Server.invokeHttp(input);
}


function getChannelCredentials() {
	return {
		username : "mobile_user",
		password : "justfortest"
	};
}

function getExternalChannelCredentials() {
	return {
		externalUsername : "mobile_user",
		externalPassword : "justfortest"
	};
}

function getTibcoCredentials() {
	return {
		username_tibco : "Mobstguser",
		password_tibco : "1^p(4q!7jr*8",
	};
}
function getTibcoMode()
{
	return {tibcoMode:false};
}
function getApplicationSettings()
{
	return 	{ 	currentDate : new Date(),
		currentYear : new Date().getFullYear(),
		tibcoMode : getTibcoMode().tibcoMode,
		centerCode : "1493"
	};
}
function getCurrentDubaiCanalPath()
{
	return 	{ 	
		URL :MFP.Server.getPropertyValue("publicWorkLightProtocol")+"://"+
		MFP.Server.getPropertyValue("publicWorkLightHostname")+":"+
		MFP.Server.getPropertyValue("publicWorkLightPort")+'/index'+
		MFP.Server.getPropertyValue("publicWorkLightContext")+"/apps/pta_files/NewDubaiCanal.pdf"
	};
}

/**
 * This function is used to replace the user/password strings
 * with the actual environment user/password
 * 
 * @param envHeader
 * @returns
 */
function replaceCredentials(envHeader){

	var string = envHeader;
	string = this.replaceAll(string, "%#credentials!#!username#%", getChannelCredentials().username);
	string = this.replaceAll(string, "%#credentials!#!externalUsername#%", getExternalChannelCredentials().externalUsername);
	string = this.replaceAll(string, "%#credentials!#!username_tibco#%", getTibcoCredentials().username_tibco);
	string = this.replaceAll(string, "%#credentials!#!password#%", getChannelCredentials().password);
	string = this.replaceAll(string, "%#credentials!#!password_tibco#%", getTibcoCredentials().password_tibco);
	string = this.replaceAll(string, "%#credentials!#!externalPassword#%", getExternalChannelCredentials().externalPassword);

	MFP.Logger.debug("??????????????????????????????????????????");
	MFP.Logger.debug("converted Body " + string);
	MFP.Logger.debug("??????????????????????????????????????????");
	return string ;
}

/**
 * This function will be used to build the xml soap request of
 * the web service request
 * 
 * @param envHeader
 * @param params
 * @param namespaces
 * @param soapEnvNS
 * @returns {___anonymous2126_2136}
 */
function buildBody(envHeader, params, namespaces, soapEnvNS) {
	var body = '<soapenv:Envelope ' + soapEnvNS + '>\n'+ '<soapenv:Header>\n';

	body = jsonToXml(envHeader, body, namespaces);
	body += '</soapenv:Header>\n';
	body += '<soapenv:Body>\n';
	body  = jsonToXml(params, body, namespaces);
	body += '</soapenv:Body>\n' + '</soapenv:Envelope>\n';	

	MFP.Logger.debug("******bo0000000dy " + body);
	body = replaceCredentials(body);

	return {body : body};
}

/**
 * This function will be used to return the request String
 * to be used after replacing the user/password.
 * 
 * @param request
 * @returns {___anonymous2291_2301}
 */
function buildBodyFromStaticRequest(request) {	
	MFP.Logger.warn("&&&&&&&& "+request+" &&&&&&");
	var body = JSON.stringify(replaceCredentials(request));
	return {body : body};
}


function getAttributes(jsonObj) {
	var attrStr = '';
	for(var attr in jsonObj) {
		var val = jsonObj[attr];
		if (attr.charAt(0) == '@') {
			attrStr += ' ' + attr.substring(1);
			attrStr += '="' + val + '"';
		}
	}
	return attrStr;
}

function jsonToXml(jsonObj, xmlStr, namespaces) {

	var toAppend = '';
	for(var attr in jsonObj) {
		var val = jsonObj[attr];
		if (attr.charAt(0) != '@') {
			toAppend += "<" + attr;
			if (typeof val  === 'object') {
				toAppend += getAttributes(val);
				if (namespaces != null)
					toAppend += ' ' + namespaces;
				toAppend += ">\n";
				toAppend = jsonToXml(val, toAppend);
			}
			else {
				toAppend += ">" + val;
			}
			toAppend += "</" + attr + ">\n";
		}
	}


	return xmlStr += toAppend;
}


function escapeRegExp(string) {
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
	return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function getWorklightProperty(propertyName) {
	var value = MFP.Server.getPropertyValue(propertyName);
	return {value:value};
}
function getPaymentOptions()
{
    var paymentOptions = {ePayEnabled:false, mPayEnabled:false, payOnBoardEnabled:true};
    return paymentOptions;
}
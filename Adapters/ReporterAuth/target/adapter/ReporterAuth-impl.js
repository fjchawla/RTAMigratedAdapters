/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *
 *  	// Optional
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "plain", "xml", "html"
 *  	returnedContentEncoding : 'encoding',
 *  	parameters: {name1: value1, ... },
 *  	headers: {name1: value1, ... },
 *  	cookies: {name1: value1, ... },
 *  	body: {
 *  		contentType: 'text/xml; charset=utf-8' or similar value,
 *  		content: stringValue
 *  	},
 *  	transformation: {
 *  		type: 'default', or 'xslFile',
 *  		xslFile: fileName
 *  	}
 *  }
 */

var REQ_PORTAL_USER_NAME = MFP.Server.getPropertyValue("tokens.portal.vendorUsername");
var REQ_PORTAL_PASSWORD = MFP.Server.getPropertyValue("tokens.portal.vendorPassword");
var REPORTER_USER_NAME = MFP.Server.getPropertyValue("tokens.financialReporter.username");
var REPORTER_PASSWORD = MFP.Server.getPropertyValue("tokens.financialReporter.password");

function sha1(msg)
{
  function rotl(n,s) { return n<<s|n>>>32-s; };
  function tohex(i) { for(var h="", s=28;;s-=4) { h+=(i>>>s&0xf).toString(16); if(!s) return h; } };
  var H0=0x67452301, H1=0xEFCDAB89, H2=0x98BADCFE, H3=0x10325476, H4=0xC3D2E1F0, M=0x0ffffffff; 
  var i, t, W=new Array(80), ml=msg.length, wa=new Array();
  msg += String.fromCharCode(0x80);
  while(msg.length%4) msg+=String.fromCharCode(0);
  for(i=0;i<msg.length;i+=4) wa.push(msg.charCodeAt(i)<<24|msg.charCodeAt(i+1)<<16|msg.charCodeAt(i+2)<<8|msg.charCodeAt(i+3));
  while(wa.length%16!=14) wa.push(0);
  wa.push(ml>>>29),wa.push((ml<<3)&M);
  for( var bo=0;bo<wa.length;bo+=16 ) {
    for(i=0;i<16;i++) W[i]=wa[bo+i];
    for(i=16;i<=79;i++) W[i]=rotl(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);
    var A=H0, B=H1, C=H2, D=H3, E=H4;
    for(i=0 ;i<=19;i++) t=(rotl(A,5)+(B&C|~B&D)+E+W[i]+0x5A827999)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=20;i<=39;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=40;i<=59;i++) t=(rotl(A,5)+(B&C|B&D|C&D)+E+W[i]+0x8F1BBCDC)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=60;i<=79;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    H0=H0+A&M;H1=H1+B&M;H2=H2+C&M;H3=H3+D&M;H4=H4+E&M;
  }
  return tohex(H0)+tohex(H1)+tohex(H2)+tohex(H3)+tohex(H4);
}

function authenticate (username, password){

	if (username == "RTA_FINANCE_ACCOUNT" && password == sha1("rtaSpeed%44%") ){

		return {
			isSuccessful : true,
			authRequired : false,
			response: {
				auth_userName:REQ_PORTAL_USER_NAME,
				auth_password:REQ_PORTAL_PASSWORD
			}
		};

	}else {
		return {
			isSuccessful : false,
			authRequired : true,
			errorCode : "401",
			errorMessage : "Not Authorized"
		};
	}
}
function getAdapterData(adapterName, procedureName, adapterParams) {

	//If the user already logged in, log him out.
	onLogout();

	var identity = {
			userId : "batosoft3@gmail.com"
	};
	WL.Server.setActiveUser("masterAuthRealm", identity);
	WL.Server.setActiveUser("AdapterAuthRealm", identity);
	WL.Server.setActiveUser("AMAdapterAuthRealm", identity);
	WL.Server.setActiveUser("UAEPassAdapterAuthRealm", null);


	var request = WL.Server.getClientRequest();
	var isAuthorizedResponse = this._isAuthorized(request);
	if(isAuthorizedResponse.authRequired == false) {

		var invocationData = {
				adapter : adapterName,
				procedure : procedureName,
				parameters : adapterParams
		};

		return WL.Server.invokeProcedure(invocationData, {
			onSuccess : function(response) {
				return response;
			},
			onFailure : function(response) {
				return {
					isSuccessful : false,
					errorCode: "INTERNAL_SERVER_ERROR",
					errorMessage: "Internal server error"
				};
			}
		});
	}

	return isAuthorizedResponse;
}


/**
 * Check if portal is authorized
 * 
 * @param: String
 * @returns: JSON Object
 */
function _isAuthorized(request) {
	var requestHeader = request.getHeader("Authorization");
	try {
		if (requestHeader) {
			var requestHeaderDecoded = requestHeader.split(' ')[1];
			if (requestHeaderDecoded) {
				var requestHeaderEncoded = new java.lang.String(org.apache.commons.codec.binary.Base64().decodeBase64(requestHeaderDecoded));
				var credentials = requestHeaderEncoded.split(":");
				var username = credentials[0];
				var password = credentials[1];

				if (username == REQ_PORTAL_USER_NAME && password == REQ_PORTAL_PASSWORD) {
					return {
						authRequired : false
					};
				}
			}
		}
	} catch (e) {
	}

	return {
		isSuccessful : false,
		authRequired : true,
		errorCode : "401",
		errorMessage : "Not Authorized"
	};
}


function onLogout(headers, errorMessage) {
	WL.Server.setActiveUser("masterAuthRealm", null);
	WL.Server.setActiveUser("AMAdapterAuthRealm", null);
	WL.Server.setActiveUser("AdapterAuthRealm", null);

	return {
		name : 'authenticationIAM'
	};
}
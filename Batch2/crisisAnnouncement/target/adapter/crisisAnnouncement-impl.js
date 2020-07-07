/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var DB_TABLES = {
		'CRISISANNOUNCEMENT' : {
			sqlInsert : 'INSERT INTO CRISISANNOUNCEMENT(TITLE , TITLE_AR , BODY ,  BODY_AR , TWITTERURL , EXTRNALURL ,EVENT_DATE , ACTIVE , CREATED_DATE) VALUES (?,?,?,?,?,?,?,?,?)',
			sqlGetALL : 'select * FROM CRISISANNOUNCEMENT ',
			sqlGetCrisis : 'select * from CRISISANNOUNCEMENT WHERE ACTIVE=?',
			sqldeactiveCrisis : "UPDATE CRISISANNOUNCEMENT SET ACTIVE=? WHERE ID=?",
			sqlactiveCrisis : "UPDATE CRISISANNOUNCEMENT SET ACTIVE=? WHERE ID=?",
			sqlDelete : "delete from CRISISANNOUNCEMENT  WHERE ID=?",
			updateAnnouncement : "UPDATE CRISISANNOUNCEMENT SET TITLE=? ,TITLE_AR=?,BODY=?, BODY_AR=? ,EVENT_DATE=? WHERE ID=?"
		}}

var REQ_PORTAL_USER_NAME = MFP.Server.getPropertyValue("tokens.portal.vendorUsername");
var REQ_PORTAL_PASSWORD = MFP.Server.getPropertyValue("tokens.portal.vendorPassword");

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

function getAllCrisis(){
	try{
		var result = MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CRISISANNOUNCEMENT'].sqlGetALL ,
			parameters : []
		});	
		return {
			all:result
		}
	}
	catch(e){
		MFP.Logger.error(" AdapterName  crisisAnnouncement ::procedure getAllCrisis :: Error "+e)
		return  {
			"error":e,
			"result":false
		};
	}
}

function deactiveCrisisById(id){
	try{
		var request = MFP.Server.getClientRequest();
		var isAuthorizedResponse = this._isAuthorized(request);
		if(isAuthorizedResponse.authRequired == false) {
			if(id&&id>0){
				var result = MFP.Server.invokeSQLStatement({
					preparedStatement : DB_TABLES['CRISISANNOUNCEMENT'].sqldeactiveCrisis ,
					parameters : ["false",id]
				});	
				return {
					all:result
				}
			}
			else{
				return  {
					"error":"Id is not valid ",
					"result":false
				};
			}
		}
		return isAuthorizedResponse;
	}
	catch(e){
		MFP.Logger.error(" AdapterName  crisisAnnouncement ::procedure deactiveCrisisById :: Error "+e)
		return  {
			"error":e,
			"result":false
		};
	}
}

function activeCrisisById(id){
	try{
		var request = MFP.Server.getClientRequest();
		var isAuthorizedResponse = this._isAuthorized(request);
		if(isAuthorizedResponse.authRequired == false) {
			if(id&&id>0){
				var result = MFP.Server.invokeSQLStatement({
					preparedStatement : DB_TABLES['CRISISANNOUNCEMENT'].sqlactiveCrisis ,
					parameters : ["true",id]
				});	
				return {
					all:result
				}
			}
			else{
				return  {
					"error":"Id is not valid ",
					"result":false
				};
			}
		}
		return isAuthorizedResponse;
	}
	catch(e){
		MFP.Logger.error(" AdapterName  crisisAnnouncement ::procedure activeCrisisById :: Error "+e)
		return  {
			"error":e,
			"result":false
		};
	}
}


function deactiveAllCrisis(){
	try{
		var request = MFP.Server.getClientRequest();
		var isAuthorizedResponse = this._isAuthorized(request);
		if(isAuthorizedResponse.authRequired == false) {
			var result = MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['CRISISANNOUNCEMENT'].sqlGetALL ,
				parameters : []
			});	
			if (result && result.isSuccessful &&result.resultSet && result.resultSet.length > 0) {
				var resultset=result.resultSet;
				for(var i=0; i<resultset.length;i++){
					deactiveCrisisById(resultset[i].ID)
				}
				return{
					deactiveAll:"Success"
				}
			}
		}
		return isAuthorizedResponse;
	}
	catch(e){
		MFP.Logger.error(" AdapterName  crisisAnnouncement ::procedure deactiveAllCrisis :: Error "+e)
		return  {
			"error":e,
			"result":false
		};
	}
}


function insertCrisisAnnouncement(TITLE , TITLE_AR , BODY ,  BODY_AR , TWITTERURL , EXTRNALURL ,EVENT_DATE , ACTIVE ) {
	try{
		var request = MFP.Server.getClientRequest();
		var isAuthorizedResponse = this._isAuthorized(request);
		if(isAuthorizedResponse.authRequired == false) {
			if(TITLE && TITLE_AR && BODY &&  BODY_AR && TWITTERURL && EXTRNALURL &&EVENT_DATE && ACTIVE ){
				
				var CREATED_DATE=new Date();

				var result = MFP.Server.invokeSQLStatement({
					preparedStatement : DB_TABLES['CRISISANNOUNCEMENT'].sqlInsert ,
					parameters : [TITLE , TITLE_AR , BODY ,  BODY_AR , TWITTERURL , EXTRNALURL ,EVENT_DATE , ACTIVE , CREATED_DATE]
				});	
				return {
					Current:result,
				}}
		}
		return isAuthorizedResponse;
	}
	catch(e){
		MFP.Logger.error(" AdapterName  crisisAnnouncement ::procedure insertCrisisAnnouncement :: Error "+e)
		return  {
			"error":e,
			"result":false
		};
	}
}


function getCrisisAnnouncement() {
	try{
		var result = MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CRISISANNOUNCEMENT'].sqlGetCrisis ,
			parameters : ["true"]
		});	
		return {
			Current:result,
		}
	}
	catch(e){
		MFP.Logger.error(" AdapterName  crisisAnnouncement ::procedure getCrisisAnnouncement :: Error "+e)
		return  {
			"error":e,
			"result":false
		};
	}
}

function deleteCrisisById(id) {
	try{
		var request = MFP.Server.getClientRequest();
		var isAuthorizedResponse = this._isAuthorized(request);
		if(isAuthorizedResponse.authRequired == false) {
			var result = MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['CRISISANNOUNCEMENT'].sqlDelete ,
				parameters : [id]
			});	
			return {
				result:result
			}
		}
		return isAuthorizedResponse;
	}
	catch(e){
		MFP.Logger.error(" AdapterName  crisisAnnouncement ::procedure deleteCrisisById :: Error "+e)
		return  {
			"error":e,
			"result":false
		};
	}
}

function updateCrisisAnnouncement(ID,TITLE , TITLE_AR , BODY ,  BODY_AR ,EVENT_DATE){
	try{
		var request = MFP.Server.getClientRequest();
		var isAuthorizedResponse = this._isAuthorized(request);
		if(isAuthorizedResponse.authRequired == false) {
			var result = MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['CRISISANNOUNCEMENT'].updateAnnouncement ,
				parameters : [ID,TITLE , TITLE_AR , BODY ,  BODY_AR ,EVENT_DATE]
			});	
			
				return{
					Result:result
				}
			
		}
		return isAuthorizedResponse;
	}
	catch(e){
		MFP.Logger.error(" AdapterName  crisisAnnouncement ::procedure updateCrisisAnnouncement :: Error "+e)
		return  {
			"error":e,
			"result":false
		};
	}
}


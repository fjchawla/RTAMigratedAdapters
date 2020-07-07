/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

//Create SQL query to get Articles By page key
var getArticlesByPageKeyStatement = "SELECT DISTINCT *  FROM ARTICLE "+
	"WHERE PAGE_KEY = ? ORDER BY LINE_ORDER";

var getArticlesByPageIdStatement = "SELECT *  FROM ARTICLE " +
 "WHERE ID = ?";

//Create SQL query to get Article Locations By article id
var getArticleLocationsByArticleIdStatement = "SELECT DISTINCT *  FROM LOCATION "+
	"WHERE ARTICLE_ID = ? ";

//Create SQL query to get Article Sub Contents By article id
var getArticleSubContentsByArticleIdStatement = "SELECT DISTINCT *  FROM SUBCONTENT "+
		"WHERE CONTENT_ID = ? ORDER BY LINE_ORDER";

//Create SQL query to get Article Documents By article id
var getArticleDocumentsByArticleIdStatement = "SELECT DISTINCT * "+
		"FROM DOCUMENT "+
		"JOIN ARTICLE_DOCUMENT "+
		"ON ARTICLE_DOCUMENT.ARTICLE_ID = ? AND ARTICLE_DOCUMENT.DOCUMENT_ID = DOCUMENT.ID ORDER BY DOCUMENT_ORDER";


var sqlGetViolations = 'SELECT DESCRIPTION_AR "DESCRIPTION_AR", DESCRIPTION_EN "DESCRIPTION_EN", ID "VIOLATION_ID", AMOUNT "AMOUNT" FROM VIOLATIONS WHERE TYPE LIKE ? ORDER BY LINE_ORDER'; 

var sqlDocument = 'SELECT ID "ID", LINK_AR "LINK_AR", LINK_EN "LINK_EN", DOCUMENT_TITLE_AR "DOCUMENT_TITLE_AR", DOCUMENT_TITLE_EN "DOCUMENT_TITLE_EN" FROM DOCUMENT WHERE ID LIKE ? ';

var openConnectionStatment = "SELECT 1 FROM DUAL";


/************************************************************************
 * Implementation code for procedure - 'getArticlesByPageKey'
 * Invoke prepared SQL query
 *
 * @return - invocationResult
 */
function getArticlesByPageId(pageId) {
	try {
		_openConnection();
	} catch (e) {
		MFP.Logger.warn("Connection closed");
		sleep("5000");
	}
	var data = MFP.Server.invokeSQLStatement({
		preparedStatement : getArticlesByPageIdStatement,
		parameters : [pageId]
	}), id;
	data.resultSet = data.resultSet[0];
	id = data.resultSet.ID;
	data.resultSet.MAP = getArticleLocationByArticleId(id).resultSet;
	data.resultSet.DOCUMENTS = getArticleDocumentsByArticleId(id).resultSet;
	data.resultSet.ACCORDION = getArticleSubContentsByArticleId(id).resultSet;
	return data;
}

/************************************************************************
 * Implementation code for procedure - 'getArticlesByPageKey'
 * Invoke prepared SQL query
 *
 * @return - invocationResult
 */
function getArticlesByPageKey(pageKey) {
	try {
		_openConnection();
	} catch (e) {
		MFP.Logger.warn("Connection closed");
		sleep(7000);
	}
	var data = MFP.Server.invokeSQLStatement({
		preparedStatement : getArticlesByPageKeyStatement,
		parameters : [pageKey]
	}), id;
	for(i in data.resultSet){
		id = data.resultSet[i].ID;
		data.resultSet[i].MAP = getArticleLocationByArticleId(id).resultSet;
		data.resultSet[i].DOCUMENTS = getArticleDocumentsByArticleId(id).resultSet;
		data.resultSet[i].ACCORDION = getArticleSubContentsByArticleId(id).resultSet;
	}
	return data;
}

/************************************************************************
 * Implementation code for procedure - 'getArticleLocationsByArticleId'
 * Invoke prepared SQL query
 *
 * @return - invocationResult
 */
function getArticleLocationByArticleId(articleId) {
	try {
		_openConnection();
	} catch (e) {
		MFP.Logger.warn("Connection closed");
		sleep(7000);
	}
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getArticleLocationsByArticleIdStatement,
		parameters : [articleId]
	});
}

/************************************************************************
 * Implementation code for procedure - 'getArticleDocumentsByArticleId'
 * Invoke prepared SQL query
 *
 * @return - invocationResult
 */
function getArticleDocumentsByArticleId(articleId) {
	try {
		_openConnection();
	} catch (e) {
		MFP.Logger.warn("Connection closed");
		sleep(7000);
	}
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getArticleDocumentsByArticleIdStatement,
		parameters : [articleId]
	});
}


/************************************************************************
 * Implementation code for procedure - 'getArticleSubContentsByArticleId'
 * Invoke prepared SQL query
 *
 * @return - invocationResult
 */
function getArticleSubContentsByArticleId(articleId) {
	try {
		_openConnection();
	} catch (e) {
		MFP.Logger.warn("Connection closed");
		sleep(7000);
	}
	var data = MFP.Server.invokeSQLStatement({
		preparedStatement : getArticleSubContentsByArticleIdStatement,
		parameters : [articleId]
	}), id;
	for(var i in data.resultSet){
		id = data.resultSet[i].ID;
		data.resultSet[i].DOCUMENTS = getSubContentDocumentsBySubcontentId(id).resultSet;
	}
	return data;
}


/************************************************************************
 * Implementation code for procedure - 'getSubContentDocumentsBySubcontentId'
 * Invoke prepared SQL query
 *
 * @return - invocationResult
 */
var getSubContentDocumentsBySubcontentIdStatement = "SELECT DISTINCT * "+
		"FROM DOCUMENT "+
		"JOIN SUBCONTENT_DOCUMENT "+
		"ON SUBCONTENT_DOCUMENT.DOCUMENT_ID = DOCUMENT.ID AND SUBCONTENT_DOCUMENT.ACCORDION_ID = ? ORDER BY ID";

function getSubContentDocumentsBySubcontentId(subContentId) {
	try {
		_openConnection();
	} catch (e) {
		MFP.Logger.warn("Connection closed");
		sleep(7000);
	}
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getSubContentDocumentsBySubcontentIdStatement,
		parameters : [subContentId]
	});
}

/**
 * this function returns the list of violations by the ${type} string. 
 */
function getViolations(type){
		try {
			_openConnection();
		} catch (e) {
			MFP.Logger.warn("Connection closed");
			sleep(7000);
		}
	return MFP.Server.invokeSQLStatement({
		preparedStatement : sqlGetViolations,
		parameters : [new String("%" + type + "%")]
	});
}

function _openConnection(){
	 return MFP.Server.invokeSQLStatement({
			preparedStatement : openConnectionStatment,
			parameters : []
		});
}

function sleep(milliseconds) {
	  try {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds) {
				break;
			}
		}
	} catch (e) {
		MFP.Logger.warn("Cannot open DB connection");
	}
}

function getDocumentById(id, language){
	var data = MFP.Server.invokeSQLStatement({
		preparedStatement : sqlDocument,
		parameters : [id]
	});
	var url = language == "ar" ? data.resultSet[0].LINK_AR : data.resultSet[0].LINK_EN;
	var documentTitle = language == "ar" ? data.resultSet[0].DOCUMENT_TITLE_AR : data.resultSet[0].DOCUMENT_TITLE_EN;
	var base64PDFString =  com.proxymit.pdf.utils.PDFDownloader.loadPDFFile(url);
	base64ImageString =  com.proxymit.pdf.utils.PDFToImage.convertPDFToImage(base64PDFString);
	MFP.Logger.warn(base64PDFString);
	return {
		data : base64ImageString ,
		extension : "jpeg",
		title : documentTitle,
		url : url
	};
}

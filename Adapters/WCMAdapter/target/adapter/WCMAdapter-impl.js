/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */


function getAboutRTA() {	
	return getStaticPageData('ABOUT_RTA');
}

function getTermsAndConditions() {	
	return getStaticPageData('TERMS_CONDITIONS');
}

function getNewTermsAndConditions() {	
	return getStaticPageData('NEW_TERMS_CONDITIONS');
}
function getHelpTopics() {	
	return getStaticPageData('HELP_TOPICS');
}

function getHelpTopicsByAppName(appName) {	
	return getStaticPageData(new String('HEIP_TOPICS_'+appName));
}
function getPartnerWebsites() {	
	return getStaticPageData('PARTNER_WEBSITES');
}
function getPrivacyContent() {	
	return getStaticPageData('PRIVACY_SECURITY');
}
function getNewPrivacyContent() {	
	return getStaticPageData('NEW_PRIVACY_SECURITY');
}


/**
 * Get static data from SQL Adapter
 * 
 * @param: No Inputs
 * @returns: JSON object
 */
function getStaticPageData(pageId) {	
	var invocationData = {
		adapter : 'userProfile',
		procedure : 'getStaticPage',
		parameters : [ pageId ]
	};
	
	var response = MFP.Server.invokeProcedure(invocationData);
	
	try {
		var myData = JSON.parse(response.resultSet[0].content);
		response.resultSet = myData;
	} catch (e) {
	}

	return response;
}

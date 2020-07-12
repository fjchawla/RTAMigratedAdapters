/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var USER_NAME = MFP.Server.getPropertyValue("tokens.financialReporter.username");
var PASSWORD = MFP.Server.getPropertyValue("tokens.financialReporter.password");

function onAuthRequired(headers, errorMessage) {
	errorMessage = errorMessage ? errorMessage : null;

	return {
		authRequired : true,
		errorMessage : errorMessage
	};
}

function onLogout(headers, errorMessage) {
	
	
	WL.Server.setActiveUser("masterAuthRealm", null);

	return {
		isSuccessfull : true
	};
}

function authenticate(userName, password) {
	onLogout();

	if (userName == USER_NAME && password == PASSWORD) {
		var identity = {
			userId : userName
		};
		//new AuthenticatedUser(identity.userId, authenticationReporter, this.getName());
		WL.Server.setActiveUser("masterAuthRealm", identity);

		return {
			name : 'authenticationReporter',
			authRequired : false
		};
	}

	return onAuthRequired(null, "Authentication required");
}
/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var URL_SERVICE_PAYMENTS = ""; // Will be added service URL.

function getPayments(username) {
	var input = {
		method : 'get',
		returnedContentType : 'json',
		path : URL_SERVICE_PAYMENTS,
		parameters : {
			username : username
		}
	};

	// return WL.Server.invokeHttp(input);

	return {
		"invocationResult" : [ {
			"nameEN" : "Transportation",
			"nameAR" : "مواصلات",
			"amount" : 100,
			"currency" : "AED",
			"date" : 1397520000000
		}, {
			"nameEN" : "Cinema",
			"nameAR" : "سينيما",
			"amount" : 20,
			"currency" : "AED",
			"date" : 1397692800000
		}, {
			"nameEN" : "Shopping",
			"nameAR" : "تسوق",
			"amount" : 270,
			"currency" : "AED",
			"date" : 1398038400000
		}, {
			"nameEN" : "Shopping",
			"nameAR" : "تسوق",
			"amount" : 270,
			"currency" : "AED",
			"date" : 1398038400000
		}, {
			"nameEN" : "Shopping",
			"nameAR" : "تسوق",
			"amount" : 270,
			"currency" : "AED",
			"date" : 1398038400000
		} ]
	};
}
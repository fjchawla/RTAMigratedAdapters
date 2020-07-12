function sendEmail (subject, fullName, serviceName, message, arrayOfAttachments){
	
	message2 = '';
	
	if (!Array.isArray(arrayOfAttachments))
		arrayOfAttachments = [ arrayOfAttachments ];
	
	var arrTo = [];
	for (i in arrayOfAttachments) {
		var value = arrayOfAttachments[i].fileBase64String;
		var extens = arrayOfAttachments[i].extension;
		arrTo.push({fileExt: extens,
				Value : value});
	}
	
	var invocationData = {
			adapter : 'drivers_and_vehciles_utilitiesAdapter',
			procedure : 'sendMail',
			parameters : [ fullName, subject, message2, arrTo ]
	};
	
	var response = MFP.Server.invokeProcedure(invocationData);
	
	if(response.isSuccessful){
		return {
			isSuccessful : true,
			reference : response
		};
		
		return {
			isSuccessful : false,
			reference : response
		};
	}
	
}
//adapter Mandatory. A string that contains the name of the 
//	 adapter as specified when the adapter was defined. procedure 
//	 Mandatory. A string that contains the name of the procedure as 
//	 specified when the adapter was defined. parameters Optional. An 
//	 array of parameter values that are passed to the back-end 
//	 procedure. A parameter can be a scalar or an object. Example of a 
//	 JSON block of Parameters.</br. { adapter : "AcmeBank", 
//	 procedure : " getTransactions", parameters : [accountId, 
//	 fromDate, toDate], }; 
function getApplications(service_type, data) {
	var invocationData = {
		parameters : data,
	};
	try{
		switch (service_type) {
			case 'building_demolition':
					invocationData.adapter = "corporates_TIBCOAdapter";
					invocationData.procedure = "getBuildingDemolitionApplications";
					var response = MFP.Server.invokeProcedure(invocationData);
					MFP.Logger.info(response);
					return response;
				break;
			case 'roads_diversions':
				invocationData.adapter = "corporates_TIBCOAdapter";
				invocationData.procedure = "getMajorRoadsDiversions";
				var response = MFP.Server.invokeProcedure(invocationData);
				MFP.Logger.info(response);
				return response;
			break;
			case 'issueNocApproved':
				invocationData.adapter = "corporate_eTrafic_getApplicationsService";
				invocationData.procedure = "getApplications";
				var response = MFP.Server.invokeProcedure(invocationData);
				MFP.Logger.info(response);
				return response;
			break;
			case 'renewDrivingInstructor':
				invocationData.adapter = "corporate_eTraffic_Instructorpermitdetailsservice";
				invocationData.procedure = "getInstructorPermitDetailsFiltred";
				var response = MFP.Server.invokeProcedure(invocationData);
				MFP.Logger.info(response);
				return response;
			break;
			case 'schoolTransportNOC':
				invocationData.adapter = "corporate_schoolBusNOC";
				invocationData.procedure = "findCasesFiltred";
				var response = MFP.Server.invokeProcedure(invocationData);
				MFP.Logger.info(response);
				return respo
			break;
		}
	} catch(e) {
		return {isSuccessful: false, errors: [e.toString()], result: null};
	}
}
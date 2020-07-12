/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var EPAY_SERVICE_TYPE = "epay";
var MPAY_SERVICE_TYPE = "mpay";
var DATABASE_CHECKS_NUMBER = 10;
var REQ_RECENT_ACTIVITIES_TOKEN = MFP.Server.getPropertyValue("tokens.recentActivities"];

WL.Server.createEventSource({
	name : 'PaymentEventSource',
	poll : {
		interval : 300, // Job run each 5 minutes
		onPoll : 'updatePendingPayments'
	}
});

function updatePendingPayments() {
	MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: Start");

	try {
		var dateNow = new Date();
		var lastDateMS = dateNow.getTime() - 86400000; // 1 day later
		var lastDate = new Date(lastDateMS);
		MFP.Logger.warn("DatabaseJobs :: dateNow"+dateNow);

		MFP.Logger.warn("DatabaseJobs :: lastDateMS"+lastDateMS);

		MFP.Logger.warn("DatabaseJobs :: lastDate"+lastDate);
		
		var invocationData1 = {
			adapter : 'userProfile',
			procedure : 'getAllNonFinalizedRecentActivitiesByDate',
			parameters : [ lastDate, REQ_RECENT_ACTIVITIES_TOKEN ]
		};

		var allRecords = MFP.Server.invokeProcedure(invocationData1);
		
		MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: Got Records From DB");

		if (allRecords && allRecords.resultSet && allRecords.resultSet.length > 0) {
			allRecords = allRecords.resultSet;
			var allRecordsLength = allRecords.length;
			MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: Records Count " + allRecordsLength);

			for (var i = 0; i < allRecordsLength; i++) {
				var record = allRecords[i];
				MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: Record Index " + i);

				try {
					var currentStepNum = parseInt(record.db_job_chk_counter);
					
					if (record.activity_type && record.sptrn && record.status != "0") {
						if (!currentStepNum || isNaN(currentStepNum) || currentStepNum < DATABASE_CHECKS_NUMBER) {
							if (record.activity_type.toLowerCase() == EPAY_SERVICE_TYPE) {
								MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: ePayTransaction " + record.sptrn);
								var invocationData2 = {
									adapter : 'shellInterface',
									procedure : 'ePayTransactionStatusInternal',
									parameters : [ record.Users_id, record.sptrn, REQ_RECENT_ACTIVITIES_TOKEN ]
								};

								var result1= MFP.Server.invokeProcedure(invocationData2);
//								MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: ePayTransaction " + result1);
							} else if (record.activity_type.toLowerCase() == MPAY_SERVICE_TYPE) {
								MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: mPayTransaction " + record.sptrn);

								var invocationData3 = {
									adapter : 'shellInterface',
									procedure : 'mPayTransactionStatusInternal',
									parameters : [ record.Users_id, record.sptrn, record.deg_trn, REQ_RECENT_ACTIVITIES_TOKEN ]
								};

								var result2= MFP.Server.invokeProcedure(invocationData3);
//								MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: mPayTransaction " + result2);

							}

							try {
								var nextStepNum = parseInt(record.db_job_chk_counter);
								if (!nextStepNum || isNaN(nextStepNum)) {
									nextStepNum = 1;
								}

								nextStepNum++;

								var invocationData4 = {
									adapter : 'userProfile',
									procedure : 'updateUserRecentActivityCheckStep',
									parameters : [ record.Users_id, record.sptrn, nextStepNum, REQ_RECENT_ACTIVITIES_TOKEN ]
								};

								MFP.Server.invokeProcedure(invocationData4);
							} catch (e) {
								MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: catch 1 " + e);

							}
						}
						else if (currentStepNum >= DATABASE_CHECKS_NUMBER) {
							try {
								if (record.activity_type.toLowerCase() == EPAY_SERVICE_TYPE) {
									var invocationData5 = {
										adapter : 'userProfile',
										procedure : 'updateUserRecentActivity',
										parameters : [ record.Users_id, record.sptrn, "EPay", record.amount, record.channel_code, record.serv_code, record.sp_code, record.version_code, "failure", record.deg_trn, REQ_RECENT_ACTIVITIES_TOKEN ]
									};

									MFP.Server.invokeProcedure(invocationData5);
								} else if (record.activity_type.toLowerCase() == MPAY_SERVICE_TYPE) {

									var invocationData6 = {
										adapter : 'userProfile',
										procedure : 'updateUserRecentActivity',
										parameters : [ record.Users_id, record.sptrn, "MPay", record.amount, record.channel_code, record.serv_code, record.sp_code, record.version_code, "failure", record.deg_trn, REQ_RECENT_ACTIVITIES_TOKEN ]
									};

									MFP.Server.invokeProcedure(invocationData6);
								}
							} catch (e) {
								MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: catch 2 " + e);

							}
						}
					}
				}
				catch(e){
					MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: catch 3 " + e);

				}
			}
		}
	} catch (e) {
		MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: catch 4 " + e);

	}
	
	MFP.Logger.warn("DatabaseJobs :: updatePendingPayments :: End");
}

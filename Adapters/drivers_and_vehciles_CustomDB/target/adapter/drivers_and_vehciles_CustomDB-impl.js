/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *  Created by Ahmed Raouf 7-Aug-2018
 */
/************************************************************************
 * Implementation code for SALIK_TRANSACTIONTYPE_LOOKUP
 *
 * @return - invocationResult
 */
var Query = {
    "salikTransactionType": 'SELECT * FROM SALIK_TRANSACTIONTYPE_LOOKUP',
    "dbLogReq": 'INSERT INTO "LOGS" (REF, ADAPTER, OPERATION, REQ) VALUES (?, ?, ?, ?)',
    "dbLogRes": 'UPDATE "LOGS" SET RES = ? WHERE REF = ?',
    "plateAmount": 'SELECT * FROM PLATE_AMOUNT_LOOKUP ORDER BY AMOUNT_FROM ASC',
    "parkingZones":'SELECT URL ,VERSION FROM (SELECT * FROM PARKING WHERE ENV = ? AND TYPE = ? ORDER BY VERSION DESC) WHERE ROWNUM = 1'
};

function getSalikTransactionType() {
    return MFP.Server.invokeSQLStatement({
        preparedStatement: Query.salikTransactionType,
        parameters: []
    });
}

function dbLogReq(REF, ADAPTER, OPERATION, REQ) {

    /*return {
        "REF": REF,
        "ADAPTER": ADAPTER,
        "OPERATION": OPERATION,
        "REQ": REQ,
        "Query": Query.dbLogReq
    };*/

    return MFP.Server.invokeSQLStatement({
        preparedStatement: Query.dbLogReq,
        parameters: [REF, ADAPTER, OPERATION, REQ]
    });
}

function dbLogRes(REF, RES) {

    /*return {
        "REF": REF,
        "RES": RES,
        "Query": Query.dbLogRes
    };*/

    return MFP.Server.invokeSQLStatement({
        preparedStatement: Query.dbLogRes,
        parameters: [RES, REF]
    });
}

function getPlateAmountLookup() {
    return MFP.Server.invokeSQLStatement({
        preparedStatement: Query.plateAmount,
        parameters: []
    });
}

function getParkingZoneFile(ENV, TYPE) {
    return MFP.Server.invokeSQLStatement({
        preparedStatement: Query.parkingZones,
        parameters: [ENV,TYPE]
    });
}
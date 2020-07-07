

var DB_TABLES = {
		'SHELL_LOGGER' : {
			sqlInsert : "INSERT INTO SHELL_LOGGER (ID,ADAPTER_NAME, PROCEDURE_NAME,REQUEST_DATE,RESPONSE_DATE,APP_NAME,USER_NAME,STATUS,REQUEST) VALUES (?,?,?,?,?,?,?,?,?)",
			sqlUpdate :"UPDATE SHELL_LOGGER SET RESPONSE=?,RESPONSE_DATE=?, STATUS=? WHERE ID=?",
			sqlGetAll: 'SELECT ID,ADAPTER_NAME, PROCEDURE_NAME, DBMS_LOB.SUBSTR(REQUEST, 3000) AS REQUEST, DBMS_LOB.SUBSTR(RESPONSE, 3000) AS RESPONSE,REQUEST_DATE,RESPONSE_DATE,APP_NAME,USER_NAME,STATUS FROM SHELL_LOGGER order by REQUEST_DATE',
			lastInsertedId: 'SELECT MAX(ID) ID  FROM SHELL_LOGGER'
		},
		'APP_CONFIG' : {

			sqlGet: 'SELECT VALUE FROM APP_CONFIG WHERE KEY=?'

		}
}

function log(tag) {

//	var message = "Hello Log File"
	MFP.Logger.debug("|debug |Hello Log File");
	MFP.Logger.info("|info |Hello Log File");
	MFP.Logger.warn("|warn |Hello Log File");
	MFP.Logger.error("|error |Hello Log File");

	return {result : true}
}

/*function GenerateGUID(){

		  function s4() {
		    return Math.floor((1 + Math.random()) * 0x10000)
		      .toString(16)
		      .substring(1);
		  }
		  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}*/


function GenerateGUID(){
	return Math.floor((1 + Math.random()) * 0x100000000)
	.toString(16)
	.substring(1);
}
function getLogSettings(){
	
	 logSetting=MFP.Server.invokeSQLStatement({
		preparedStatement :DB_TABLES['APP_CONFIG'].sqlGet ,
		parameters : ["ActiveLogger"]
	});
	if (logSetting && logSetting.isSuccessful)
	{
		return {isLog:logSetting.resultSet[0].VALUE};
	}
	return {isLog:"0"};
}


function validateRequestParms(adapterName, procedureName, adapterParams,appName,request)
{
	if(!adapterName){
		return {code:100,message:"Invalid Adapter Name"};
	}

	if(!procedureName){
		return {code:101,message:"Invalid Procedure Name"};
	}

	if(!adapterParams||(adapterParams&&Object.prototype.toString.call(adapterParams) != '[object Array]')){
		
		return {code:102,message:"Invalid Params,Please enter parms as array []"};
	}
   if(!request){
		
		return {code:107,message:"Invalid Request"};
	}
	
	if(!appName||(appName &&allApp.indexOf(appName)==-1)){
		return {code:103,message:"Invalid App Name"};
	}
	return {code:200,message:"success"}
}

function logRequest(adapterName, procedureName,request,appName,userName){
	var validateParms=validateRequestParms(adapterName, procedureName,appName,userName,request);
if(validateParms&&validateParms.code==200){
	if(isSaveLog&&saveLog.isLog=="1"){
		var isSaveLog=getLogSettings();
		var id=GenerateGUID();
		requestDate=new Date();
		responseDate=null;
		response=null;
		var status=0;// created 
		logResponse=MFP.Server.invokeSQLStatement({
			preparedStatement :DB_TABLES['SHELL_LOGGER'].sqlInsert ,
			parameters :[id,adapterName, procedureName,requestDate,responseDate,appName,userName,status,request]
		});
		if (logResponse && logResponse.isSuccessful)
		{
			return {code:200,
				     message:"success",
				     Id:id};
			}
		}
	}
	return validateParms;
}

function logResonseDetails(id,response,status){	
	var date=new Date();
	var response=response;
			return MFP.Server.invokeSQLStatement({
				preparedStatement :DB_TABLES['SHELL_LOGGER'].sqlUpdate ,
				parameters : [response,date,status,id]
			});
}

function getAllLogs(){
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['SHELL_LOGGER'].sqlGetAll,
		parameters : []
	});

}
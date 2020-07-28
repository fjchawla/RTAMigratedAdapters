var CaptchaStatus={"Binding":1,"Valid":2,"Unvalid":3};
var DB_TABLES = {
		'ANSWERS' : {
			sqlALL : 'select * from CAPTCHA_ANSWERS',
			sqlGet : 'select ID, ENTEXT from CAPTCHA_ANSWERS where ID = ?',
			RandomAnswers:'SELECT * FROM ( SELECT * FROM CAPTCHA_ANSWERS WHERE ID !=? ORDER BY SYS.DBMS_RANDOM.VALUE )WHERE ROWNUM <= ?',
		},
		'QUESTIONS':{
			sqlALL : 'select * from CAPTCHA_QUESTIONS',
			sqlGet : 'select ID, ENTEXT from CAPTCHA_QUESTIONS where ID = ?',
			sqlQuestionAnswer:'select CAPTCHA_QUESTIONS.ID as QuesId, CAPTCHA_QUESTIONS.ENTEXT as QuesENText,CAPTCHA_QUESTIONS.ANS_ID as AnsId,CAPTCHA_ANSWERS.ENTEXT as AnsENText,CAPTCHA_ANSWERS.ARTEXT as AnsARText,CAPTCHA_QUESTIONS.ARTEXT as QuesARText from CAPTCHA_QUESTIONS INNER JOIN  CAPTCHA_ANSWERS ON CAPTCHA_QUESTIONS.ANS_ID=CAPTCHA_ANSWERS.ID where CAPTCHA_QUESTIONS.ID=?',
			sqlRandomQuestionAnswer:'select CAPTCHA_QUESTIONS.ID as QuesId, CAPTCHA_QUESTIONS.ENTEXT as QuesENText,CAPTCHA_QUESTIONS.ARTEXT as QuesARText,CAPTCHA_QUESTIONS.ANS_ID as AnsId,CAPTCHA_ANSWERS.ENTEXT as AnsENText,CAPTCHA_ANSWERS.ARTEXT as AnsARText from CAPTCHA_QUESTIONS INNER JOIN  CAPTCHA_ANSWERS ON CAPTCHA_QUESTIONS.ANS_ID=CAPTCHA_ANSWERS.ID where CAPTCHA_QUESTIONS.ID=(select ID from  (select ID from CAPTCHA_QUESTIONS where ID != ?   order by SYS.DBMS_RANDOM.VALUE) where ROWNUM <=1)'
		},
		'CAPTCHAKEY':{
			sqlALL : 'select * from CAPTCHAKEY',
			sqlGet : 'select KEYID, QUES_ID,STATUS,CREATIONDATE,ANS_ID,TYPE,QUES_ENTEXT,ANS_ENTEXT from CAPTCHAKEY where KEYID = ?',
			validateCaptcha : 'select * from CAPTCHAKEY where KEYID = ? and ANS_ID=? and STATUS=?',
			validateSpeechCaptcha : 'select * from CAPTCHAKEY where KEYID = ? and ANS_ENTEXT=? and STATUS=?',
			sqlGetAllFor : 'select ID, ENTEXT from CAPTCHA_ANSWERS',
			sqlInsert : 'INSERT INTO CAPTCHAKEY( KEYID, QUES_ID,STATUS,CREATIONDATE,ANS_ID,TYPE,ANS_ENTEXT,QUES_ENTEXT,ANS_ARTEXT,QUES_ARTEXT,SERVICE_NAME) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
			sqlUpdateAll : 'UPDATE CAPTCHAKEY SET  KEYID=?, QUES_ID=?,STATUS=?,CREATIONDATE=?,ANS_ID=?,TYPE=?,ANS_ENTEXT=?,QUES_ENTEXT=?,ANS_ARTEXT=?,QUES_ARTEXT=?,SERVICE_NAME=? WHERE KEYID=?',
			sqlUpdate : "UPDATE CAPTCHAKEY SET STATUS=? WHERE KEYID=?",
			sqlDelete : "DELETE FROM Widgets WHERE id=? and Users_id=?",
			sqlDeleteAllFor : "DELETE FROM Widgets WHERE Users_id=?"

		}}
var CaptchaSpeechConfigure={
		"Plus": {
			"questionText": {
				"ar": "%param2% و  %param1% ماذا يكون ناتج جمع ",
				"en": "What is %param1% Plus %param2%"
			},
			"parmCount": 2
		},
		"Minus": {
			"questionText": {
				"ar": "%param2% و  %param1% ماذا يكون ناتج طرح",
				"en": "What is %param1% Minus %param2%"
			},
			"parmCount": 2
		},
		"Divide": {
			"questionText": {
				"ar": "%param2% و  %param1% ماذا يكون ناتج قسمه  ",
				"en": "What is %param1% Divide %param2%"
			},
			"parmCount": 2
		},
		"Multiply": {
			"questionText": {
				"ar": "%param2% و  %param1% ماذا يكون ناتج ضرب ",
				"en": "What is %param1% Multiply By %param2%"
			},
			"parmCount": 2
		}
};
var mathOperations=Object.keys(CaptchaSpeechConfigure);

function allQuestions(){
	MFP.Logger.warn("CaptchAdapter - AllQuestions");
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['QUESTIONS'].sqlALL ,
	});	
}

function allANSWERS(){
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['ANSWERS'].sqlALL ,
	});	
}

function allCAPTCHAKEY(){
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['CAPTCHAKEY'].sqlALL ,
	});	
}

function GetQuestionAnswer(id){
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['QUESTIONS'].sqlQuestionAnswer,
		parameters : [id]
	});	
}

function InsertCaptcha(quesId,ansId){
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['CAPTCHAKEY'].sqlInsert,
		parameters : ['XYZXS',quesId,1,'11-11-2018',ansId,0]
	});	
}

function GetCaptcha(key){
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['CAPTCHAKEY'].sqlGet,
		parameters : [key]
	});	
}

function GenerateGUID(){
	return Math.floor((1 + Math.random()) * 0x100000000)
	.toString(16)
	.substring(1);
}

function GetRandomFour(id,count){
	var result=  MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['ANSWERS'].RandomAnswers,
		parameters : [id,count]
	});	

	return result;
}






function EnecryptCaptchaKey(key){
	var result={"EncryptKey":"","Message":"Error in EnecryptCaptchaKey"};
	var invocationData = {
			adapter : 'cryptoAdapter',
			procedure : 'encryptData',
			parameters : [key]
	};
	var encryptedKey = MFP.Server.invokeProcedure(invocationData);
	if(encryptedKey&&encryptedKey.encryptText)
	{
		generatedKey=encryptedKey.encryptText.toString();
		result={"EncryptKey":generatedKey,"Message":"Success"}
	}
	return result;

}


function GenerateCaptcha(KEY,QuesId,serviceName) {
	try{
		QuesId=='undefined'?0:QuesId;
		var type=1;// this is icon
		var randomQuestion= MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['QUESTIONS'].sqlRandomQuestionAnswer ,
			parameters : [QuesId]  // ID Parm get it random
		});	

		if (randomQuestion && randomQuestion.isSuccessful) 
		{  
			if (randomQuestion.resultSet && randomQuestion.resultSet.length > 0) {

				var quesId=randomQuestion.resultSet[0].QUESID;
				var ansId=randomQuestion.resultSet[0].ANSID;
				var currDate=new Date();

				var binding=CaptchaStatus.Binding;

				var quesENText=randomQuestion.resultSet[0].QUESENTEXT;
				var ansENText=randomQuestion.resultSet[0].ANSENTEXT;

				var quesARText=randomQuestion.resultSet[0].QUESARTEXT;
				var ansARText =randomQuestion.resultSet[0].ANSARTEXT;


				// call encrypt
				var randomKey=GenerateGUID();
				var millSecondDate=currDate.getTime() ; 
				millSecondDateString=millSecondDate.toString();

				var generatedKey= millSecondDateString.concat("-",serviceName);
				generatedKey= generatedKey.concat("-",randomKey);

				/*encryptKey=EnecryptCaptchaKey(generatedKey);
			if(encryptKey&&encryptKey.EncryptKey)
			{
				generatedKey=encryptKey.EncryptKey;

			}*/
				// end call encrypt

				var captchaKeyOject={"KEYID":generatedKey,"QUESID":quesId,"Binding":binding,"ANSID":ansId,"ANSENTEXT":ansENText,
						"QUESENTEXT":quesENText,"ANSARTEXT":ansARText,"QUESARTEXT":quesARText,"SERVICE_NAME":serviceName};
				var captchaRecord;

				if(KEY) // if key exist update record 
				{
					captchaRecord= MFP.Server.invokeSQLStatement({
						preparedStatement : DB_TABLES['CAPTCHAKEY'].sqlUpdateAll,
						parameters : [captchaKeyOject.KEYID ,
						              captchaKeyOject.QUESID ,
						              captchaKeyOject.Binding , 
						              currDate ,
						              captchaKeyOject.ANSID , 
						              type , 
						              captchaKeyOject.ANSENTEXT , 
						              captchaKeyOject.QUESENTEXT,

						              captchaKeyOject.ANSARTEXT , 
						              captchaKeyOject.QUESARTEXT,
						              captchaKeyOject.SERVICE_NAME,
						              KEY
						              ]
					});		    	
				}
				else // Generate new key
				{
					captchaRecord= MFP.Server.invokeSQLStatement({
						preparedStatement : DB_TABLES['CAPTCHAKEY'].sqlInsert,
						parameters : [
						              captchaKeyOject.KEYID ,
						              captchaKeyOject.QUESID , 
						              captchaKeyOject.Binding , 
						              currDate , 
						              captchaKeyOject.ANSID ,
						              type ,
						              captchaKeyOject.ANSENTEXT ,
						              captchaKeyOject.QUESENTEXT,
						              captchaKeyOject.ANSARTEXT , 
						              captchaKeyOject.QUESARTEXT,
						              captchaKeyOject.SERVICE_NAME
						              ]
					});	
				}
				if(captchaRecord)
				{
					//var iconType=1;
					var otherAnswers =  MFP.Server.invokeSQLStatement({
						preparedStatement : DB_TABLES['ANSWERS'].RandomAnswers,
						parameters : [captchaKeyOject.ANSID,4] 
					});	

					if (otherAnswers && otherAnswers.isSuccessful) {
						if (otherAnswers.resultSet &&otherAnswers.resultSet.length > 0)
						{
							var captchaKey=captchaKeyOject.KEYID;

							/*captchaKey=captchaKey.replace(/\+/g,"%2B");
						captchaKey=captchaKey.replace(/\\/g,"%5C");
						captchaKey=captchaKey.replace(/\//g,"%2F");
						captchaKey=captchaKey.replace(/\=/g,"%3D");
						captchaKey=captchaKey.replace(/\,/g,"%2C");*/
							//MFP.Logger.warn("captchaKey result is " + captchaKey);
							var question={"ID":captchaKeyOject.QUESID,"ENTEXT":captchaKeyOject.QUESENTEXT,"ARTEXT":captchaKeyOject.QUESARTEXT};
							var rightAnswer={"ID":captchaKeyOject.ANSID,"ENTEXT":captchaKeyOject.ANSENTEXT,"ARTEXT":captchaKeyOject.ANSARTEXT};
							var faultAnswers=otherAnswers.resultSet;
							//MFP.Logger.warn("faultAnswers result is " + JSON.stringify(faultAnswers));

							var finalAnswersRessult=[];
							var length=(faultAnswers.length)+1;
							for(var index=0; index<length;index++)
							{    		
								index==4?finalAnswersRessult[index]=rightAnswer:finalAnswersRessult[index]=faultAnswers[index];
							}				    	
							MFP.Logger.warn("finalAnswers result is " + JSON.stringify(finalAnswersRessult));
							return {"Key":captchaKey,"Question":question,"Answers":finalAnswersRessult};
						}
					}					
				}
			}
		}	
	}
	catch(e){
		MFP.Logger.warn("|captchaAdapter |GenerateCaptcha |  :" + e.toString());
		return {isSuccessful:false,errorCode:99 , error: e.toString()};
	}
}


function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max))+1;
} 

function generateParams(operation,count){
	var result =[];
	switch (operation ){
	case 'Plus':
		for(var i =0 ; i < count ;i++){
			result.push(getRandomInt(9));
		}
		break;
	case 'Minus':
		for(var i =0 ; i < count ;i++){
			result.push(getRandomInt(result[i-1]) || getRandomInt(9));
		}
		break;
	case 'Divide':
		var p2 = getRandomInt(9);
		var div = getRandomInt(5);
		var p1 =  p2 * div ;
		result.push(p1);
		result.push(p2);
		break;
	case 'Multiply':
		for(var i =0 ; i < count ;i++){
			result.push(getRandomInt(9));
		}
		break;
	}

	return result ;
}

function generateQuestion(question , params){
	var result=question;
	for(var i =0 ; i < params.length ;i++){
		result = result.replace("%param"+(i+1)+"%",params[i]);
	} 
	return result;
}

function generateAnswer(operation , params){

	var result ; 
	switch (operation ){
	case 'Plus':
		result=params[0]+ params[1];
		break;
	case 'Minus':
		result=params[0]- params[1];
		break;
	case 'Divide':
		result=params[0]/ params[1];
		break;
	case 'Multiply':
		result=params[0]* params[1];
		break;
	}
	return Math.floor(result) ;
}

function GenerateSpeechCaptcha(KEY,serviceName) {
	try{
		var quesText,ansText;
		var randomOperation = (0 || mathOperations[Math.floor(Math.random() * mathOperations.length)]);
		var operationConfig=CaptchaSpeechConfigure[randomOperation];
		var params = generateParams(randomOperation,operationConfig.parmCount);
		quesTextEN=generateQuestion(operationConfig.questionText['en'],params);
		quesTextAR=generateQuestion(operationConfig.questionText['ar'],params);
		ansText= generateAnswer(randomOperation,params)
		var currDate=new Date();

		var binding=CaptchaStatus.Binding;
		var TYPE = 2;

		// call encrypt
		var randomKey=GenerateGUID();
		//var serviceName="ForgotPassword";   // Put it parameters
		var millSecondDate=currDate.getTime() ; 
		millSecondDateString=millSecondDate.toString();

		var generatedKey= millSecondDateString.concat("-", serviceName);
		generatedKey= generatedKey.concat("-", randomKey);

		//encryptKey=EnecryptCaptchaKey(generatedKey);
		//if(encryptKey&&encryptKey.EncryptKey)
		//{
		//generatedKey=encryptKey.EncryptKey;
		//generatedKey=generatedKey.replace(/\+/g,"%2B");
		//}
		// end call encrypt



		var captchaKeyOject={"KEYID":generatedKey,"QUESID":null,"Binding":binding,"ANSID":null,"ANSENTEXT":ansText,"QUESENTEXT":quesTextEN ,"ANSARTEXT":ansText,"QUESARTEXT":quesTextAR,"SERVICE_NAME":serviceName};

		var captchaRecord;
		if(KEY){
			captchaRecord= MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['CAPTCHAKEY'].sqlUpdateAll,

				parameters : [
				              captchaKeyOject.KEYID , 
				              captchaKeyOject.QUESID ,
				              captchaKeyOject.Binding , 
				              currDate , 
				              captchaKeyOject.ANSID ,
				              TYPE , 
				              captchaKeyOject.ANSENTEXT , 
				              captchaKeyOject.QUESENTEXT,

				              captchaKeyOject.ANSARTEXT ,
				              captchaKeyOject.QUESARTEXT,
				              captchaKeyOject.SERVICE_NAME,
				              KEY
				              ]
			});		    	

		}else{
			captchaRecord= MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['CAPTCHAKEY'].sqlInsert,
				parameters : [
				              captchaKeyOject.KEYID ,
				              captchaKeyOject.QUESID , 
				              captchaKeyOject.Binding , 
				              currDate , 
				              captchaKeyOject.ANSID ,
				              TYPE ,
				              captchaKeyOject.ANSENTEXT ,
				              captchaKeyOject.QUESENTEXT,
				              captchaKeyOject.ANSARTEXT , 
				              captchaKeyOject.QUESARTEXT,
				              captchaKeyOject.SERVICE_NAME
				              ]
			});	
		}

		if(captchaRecord)
		{
			var captchaKey=captchaKeyOject.KEYID;
			var question={"ID":captchaKeyOject.QUESID,"ENTEXT":captchaKeyOject.QUESENTEXT,"ARTEXT":captchaKeyOject.QUESARTEXT};
			var answer={"ID":captchaKeyOject.ANSID,"ENTEXT":captchaKeyOject.ANSENTEXT,"ARTEXT":captchaKeyOject.ANSENTEXT};			    	
			//MFP.Logger.warn("finalAnswers result is " + JSON.stringify(finalAnswersRessult));
			return {"Key":captchaKey,"Question":question,"Answers":answer};				
		}
	}
	catch(e){
		MFP.Logger.warn("|captchaAdapter |GenerateSpeechCaptcha |  :" + e.toString());
		return {isSuccessful:false,errorCode:99 , error: e.toString()};
	}
}

function CheckCaptcha(key,userAnswerId){
	try{
		var valid=CaptchaStatus.Valid;
		var unValid=CaptchaStatus.Unvalid;
		var binding=CaptchaStatus.Binding;
		var captchaKey=   MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CAPTCHAKEY'].validateCaptcha ,
			parameters : [key,userAnswerId,binding]
		});		


		if (captchaKey.resultSet && captchaKey.resultSet.length > 0) {
			return{"isValid":"Valid"}
		}
		else{ 
			return{"isValid":"Invalid"}
		}
	}
	catch(e){
		MFP.Logger.warn("|captchaAdapter |CheckCaptcha |  :" + e.toString());
		return {isSuccessful:false,errorCode:99 , error: e.toString()};
	}
}

function CheckSpeechCaptcha(key,inputText)
{
	try{
		var valid=CaptchaStatus.Valid;
		var unValid=CaptchaStatus.Unvalid;
		var binding=CaptchaStatus.Binding;
		var captchaKey=   MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CAPTCHAKEY'].validateSpeechCaptcha ,
			parameters : [key,inputText,binding]
		});		
		if (captchaKey.resultSet && captchaKey.resultSet.length > 0) {
			return{"isValid":"Valid"}
		}
		else{ 
			return{"isValid":"Invalid"}
		}
	}
	catch(e){
		MFP.Logger.warn("|captchaAdapter |CheckSpeechCaptcha |  :" + e.toString());
		return {isSuccessful:false,errorCode:99 , error: e.toString()};
	}
}

function DecryptCaptchaKey(encryptKey){
	//var result={"Status":false , "Message":"error"}
	/*var newKey=encryptKey;
	newKey=newKey.replace(/\+/g,"%2B");
	newKey=newKey.replace(/\\/g,"%5C");
	newKey=newKey.replace(/\//g,"%2F");*/
	//newKey=newKey.replace(/\=/g,"%3D");
//	newKey=newKey.replace(/\,/g,"%2C");

	var result={"KeyArr":[],"Message":"Error in DecryptCaptchaKey" +"and Key is " + encryptKey};
	var invocationData = {
			adapter : 'cryptoAdapter',
			procedure : 'decryptData',
			parameters : [encryptKey]
	};
	var decryptKey = MFP.Server.invokeProcedure(invocationData);

	if(decryptKey&&decryptKey.decryptText)
	{	
		result={"decryptData":decryptKey.decryptText,"Message":"Success"};
	}
	return result;
}

function ValidateCaptcha(key,userAnswerId,type,serviceName){

	var result={"isValid":"Invalid" , "Message":"error Validate Captcha"}
	var validSeconds=600;

	//var decryptKey=DecryptCaptchaKey(key);

	/*if(decryptKey&&decryptKey.decryptData)
	{*/
	// Validate Time 

	//var keyArr=decryptKey.decryptData.split(","); 
	MFP.Logger.warn("ValidateCaptcha Key  is " + key + " Service is " +serviceName);
	if(key)
	{
		var keyArr=key.split("-"); 
		var keyDateSecond=keyArr[0];
		var currentDateTime=new Date().getTime();
		var diffSeconds=(currentDateTime - keyDateSecond)/ 1000;
		MFP.Logger.warn("ValidateCaptcha diffSeconds  is " + diffSeconds + " currentDateTime is " + currentDateTime);
		if(!diffSeconds&&diffSeconds > validSeconds)
		{
			var result={"isValid":"Invalid" , "Message":"Error Validate Captcha Datetime over 10 minutes"}
			return result;
		}
		var valid=CaptchaStatus.Valid;
		var unValid=CaptchaStatus.Unvalid;
		var binding=CaptchaStatus.Binding;
		var captchaKey='';  
		//Validate Service App
		var service=keyArr[1];

		if(service&&serviceName&&service==serviceName)
		{
			if(type=='Icon')
			{ // check answer Id 
				MFP.Logger.warn("ValidateCaptcha Icon  key " + key + " userAnswerId is " + userAnswerId);
				captchaKey=MFP.Server.invokeSQLStatement({
					preparedStatement : DB_TABLES['CAPTCHAKEY'].validateCaptcha ,
					parameters : [key,userAnswerId,binding]
				});		
			}
			else{// check answer text string 
				MFP.Logger.warn("ValidateCaptcha Speech  key " + key + " userAnswerId is " + userAnswerId);
				captchaKey=MFP.Server.invokeSQLStatement({
					preparedStatement : DB_TABLES['CAPTCHAKEY'].validateSpeechCaptcha ,
					parameters : [key,userAnswerId,binding]
				});		
			}

			if (captchaKey&&captchaKey.resultSet.length > 0) 
			{
				MFP.Server.invokeSQLStatement({
					preparedStatement : DB_TABLES['CAPTCHAKEY'].sqlUpdate ,
					parameters : [valid,key]  // ID Parm get it random
				});	
				result={"isValid":"Valid" , "Message":"Success"}	
				return result;
			}
			else{
				MFP.Server.invokeSQLStatement({
					preparedStatement : DB_TABLES['CAPTCHAKEY'].sqlUpdate ,
					parameters : [unValid,key]
				});	 
				result={"isValid":"Invalid" , "Message":"Error UnValidKey" + " key "+ key}	;
				return result;
			}
		}
		else
		{
			result={"isValid":"Invalid" , "Message":"Error Unvalid service Name"}	;
			return result;
		}
	}
	return {"isValid":"Invalid" , "Message":"Unvalid captcha key"};

}
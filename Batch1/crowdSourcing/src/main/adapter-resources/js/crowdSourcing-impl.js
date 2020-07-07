/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

//Adapter Constants
var adapterName = "crowdSourcing";
var categoryId={"NewProposedRoute":1,"CreateNewRoute":2};
var token="42F8E795391BA493AAB12EE4D6EBD";
var DB_TABLES = {
		'CSOURCING_QUESTIONS' : {
			sqlALL : "select * from CSOURCING_QUESTIONS",
			insert : 'insert into CSOURCING_QUESTIONS (ID)  VALUES(?)',
			sqlQuestions: 'select * from CSOURCING_QUESTIONS where IS_DELETED = 0 and CATEGORY_ID=?  ORDER BY ID ASC',

		},
		'CSOURCING_VOTES' : {
			sqlALL : 'select * from CSOURCING_VOTES ORDER BY CREATION_DATE DESC',
			sqlVotedRoutesByUserId : 'select * from CSOURCING_VOTES where IS_DELETD = 0 and USER_ID = ?',
			sqlVotedRoutesByDeviceId : 'select * from CSOURCING_VOTES where IS_DELETD = 0 and DEVICE_ID = ?',
			sqlVotedRoutes : 'select * from CSOURCING_VOTES where IS_DELETD = 0 and USER_ID = ? or DEVICE_ID=?',
			//sqlInsertAnswers : 'insert into CSOURCING_VOTES (DEVICE_ID,USER_ID,QUES_EN,QUES_AR,ANSWER,ROUTE_ID,START_LOCATION,END_LOCATION,CATEGORY_ID,CREATION_DATE,IS_DELETD,COMMENTS) values (?,?,?,?,?,?,?,?,?,?,?,?)')
			sqlPagnationVoted : 'SELECT * FROM ( SELECT ord.DEVICE_ID,ord.USER_ID,ord.CATEGORY,ord.A_LOCATION,ord.B_LOCATION ,ord.A_ADDRESS,ord.B_ADDRESS,ord.QUESTION_ANSWER,ord.CREATION_DATE,row_number() over (ORDER BY ord.ID ASC) line_number FROM CSOURCING_VOTES ord ) WHERE line_number BETWEEN ?  AND ?  ORDER BY line_number',
			sqlALLCount : 'select count(*) AS COUNT from CSOURCING_VOTES where IS_DELETD = 0',



			sqlInsertAnswers : 'insert into CSOURCING_VOTES (DEVICE_ID,USER_ID,ROUTE_ID,A_LOCATION,B_LOCATION,A_ADDRESS,B_ADDRESS,QUESTION_ANSWER,CATEGORY_ID,CATEGORY,CREATION_DATE,IS_DELETD) values (?,?,?,?,?,?,?,?,?,?,?,?)',
			sqlVotedRoutesByDate: 'select * from CSOURCING_VOTES where IS_DELETD = 0 and CREATION_DATE >= ?',
			generateSqlVotedRoutes: 'select * from CSOURCING_VOTES',
			AllVotesData: 'select * from CSOURCING_VOTES'


			//	sqlInsertAnswers : 'insert into CSOURCING_VOTES (DEVICE_ID,USER_ID,QUESTION_ANSWER,ROUTE_ID,A_LOCATION,B_LOCATION,CATEGORY_ID,CREATION_DATE,IS_DELETD,A_ADDRESS,B_ADDRESS) values (?,?,?,?,?,?,?,?,?,?,?)')
		},
		'CSOURCING_CONFIG' : {
			sqlProposedRoutes : 'select * from CSOURCING_CONFIG where IS_DELETED=0',
			sqlBusRoutes : 'select * from CSOURCING_CONFIG where IS_DELETED = 0 ',

		},
		"CSOURCING_REPORTING":{
			sqlALL : 'select * from CSOURCING_REPORTING',
			insert : 'insert into CSOURCING_REPORTING (CATEGORY ,USER_ID , QUESTION ,ADDRESS_B ,ADDRESS_A,DEVICE_ID ,ANSWER_D ,ANSWER_C ,ANSWER_B ,ANSWER_A,VOTING_DATE,LOCATION_A,LOCATION_B,VOTING_TIME,VOTINGID,USERCOMMENT) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
			DeleteAll:'DELETE FROM CSOURCING_REPORTING',
			sqlById : 'select * from CSOURCING_REPORTING where VOTINGID = ?',
			sqlMax: 'select MAX(VOTINGID)AS MAX from CSOURCING_REPORTING'
		},
		"NEWROUTE_REPORTING":{
			sqlALL : 'select * from NEWROUTE_REPORTING',
			insert : 'insert into NEWROUTE_REPORTING (DEVICEID,USERID,CATEGORY,ADDRESSA,ADDRESSB,VOTINGDATE,LOCATIONA,LOCATIONB,VOTINGTIME,QUESTION1,DAILY,WEEKLY,SOMETIMES,ANOTHERPUBLIC,SUBQUESTION1,MORNING,AFTERNOON,EVENING,NIGHTAFTER,SUBQUESTION2,WORK,LEISURE,SUBBOTH,QUESTION2,ATLOCATIONA,ATLOCATIONB,BOTH,QUESTION3,YESS,NOO,QUESTION4,COMMENTING) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )',
			DeleteAll:'DELETE FROM NEWROUTE_REPORTING'
		},
		"PROPOSEDROUTE_REPORTING":{
			sqlALL : 'select * from PROPOSEDROUTE_REPORTING',
			insertData : 'insert into PROPOSEDROUTE_REPORTING (DEVICEID,USERID,CATEGORY,FFROM,TTO,VOTINGTIME,QUESTION1,YES1,NO1,QUESTION2,YES2,NO2,QUESTION3,YES3,NO3,QUESTION4,COMMENTING,VOTINGDATE) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
			DeleteAll:'DELETE FROM PROPOSEDROUTE_REPORTING'
		}
};


//Helpers Functions
function toString(param) {
	try {
		var isBoolean = function (arg) { return typeof arg === 'boolean'; }
		var isNumber = function (arg) { return typeof arg === 'number'; }
		var isString = function (arg) { return typeof arg === 'string'; }
		var isFunction = function (arg) { return typeof arg === 'function'; }
		var isObject = function (arg) { return typeof arg === 'object'; }
		var isUndefined = function (arg) { return typeof arg === 'undefined'; }

		if (isUndefined(param)) {
			return "undefined";
		} else if (isObject(param)) {
			return JSON.stringify(param);
		} else if (isString(param)) {
			return param;
		} else {
			//in case of numbers and boolean functions
			return param.toString();
		}
	} catch(e){
		return param;
	}
}

function adapterLogger(procudureName , type , suffix, msg ){
	var _msg = msg || "";
	try{
		var prefix= "|adapterName |" + procudureName +" |"+ suffix + " : " ;
		switch(type){
		case "error":
			MFP.Logger.error(prefix + _msg);
			break;
		case "warn":
			MFP.Logger.warn(prefix+_msg);
			break;
		case "info":
			MFP.Logger.info(prefix+ _msg);
			break;
		}
	}catch(e){
		MFP.Logger.error("|adapterName |adapterLogger |Exception" + JSON.stringify(e));
	}
}

function handleError(msg,code){
	var msg= msg || "Internal Server Error";
	var code =code||500;

	adapterLogger("handleError","error", "Internal Error",toString([msg,code]));
	var response = {
			"isSuccessful": false,
			"error": {
				"code": code,
				"message": msg,
				"adapter": adapterName
			}
	};
	adapterLogger("handleError","error", "Internal Error",toString(response));
	return response;
}

function checkIfExistArray(item, arr){
	var isExist=false;
	if(item && arr)
	{
		for (var i=0 ; i<arr.length ; i++){
			var currentitem=arr[i];

			if(currentitem.ROUTE_ID==item){
				isExist=true;
				return isExist;
			}	 
		}
	}
	return isExist;
}

//Adapter Procdures (Exposed and not Exposed)

function allQuesAnswers(){
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['CSOURCING_QUESTIONS'].sqlALL ,
		parameters : []
	});	
}
function insertQuesAnswers(id){
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['CSOURCING_QUESTIONS'].insert ,
		parameters : [id]
	});	
}


function allVotes(){
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['CSOURCING_VOTES'].sqlALL ,
		parameters : []
	});	
}

function getVotedRoutes(id)
{
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['CSOURCING_VOTES'].sqlVotedRoutes ,
		parameters : [id,id]
	});	


	/*else   // mean select by device Id
	{
		return MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CSOURCING_VOTES'].sqlVotedRoutesByDeviceId ,
		});	
	}*/
}

function allconfig(){
	return MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['CSOURCING_CONFIG'].sqlBusRoutes ,
		parameters : []
	});	
}
//id : userId or deviceId
function getProposedBusRoutes(id)
{
	try{
		adapterLogger("getProposedBusRoutes","info", "params",toString(id));
		var routesList=[];
		var votedRoutesList=getVotedRoutes(id);
		adapterLogger("getProposedBusRoutes","info", "call getVotedRoutes response ",toString(votedRoutesList));
		var allRoutes=MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CSOURCING_CONFIG'].sqlBusRoutes ,

		});	
		adapterLogger("getProposedBusRoutes","info", "get all Bus Routes response ",toString(allRoutes));
		for (var i=0 ; i<allRoutes.resultSet.length ; i++){
			var currentRoute=allRoutes.resultSet[i];
			if (votedRoutesList && votedRoutesList.isSuccessful && votedRoutesList.resultSet.length > 0){

				/*return 	{
					ID:currentRoute.ID,
					votedRoutesList:votedRoutesList.resultSet,
					checkIfExistArray:checkIfExistArray(currentRoute.ID,votedRoutesList.resultSet)
				}*/
				if(!checkIfExistArray(currentRoute.ID,votedRoutesList.resultSet))
				{

					routesList.push(currentRoute);  // filtered voted before 
				}
			}
			else
			{
				routesList.push(currentRoute); // First time to vote
			}
		}
		adapterLogger("getProposedBusRoutes","info", "current route List for this use  ",toString(allRoutes));
		return {
			busRoutes:routesList
		};
	}
	catch(e)
	{
		adapterLogger("getProposedBusRoutes","error", "Exception",toString(e));
		return handleError();
	}
}

function getKMLFile(fileName){
	try{
		//return json details
	}
	catch(e)
	{
		adapterLogger("getKMLFile","error", "Exception",toString(e));
		return handleError();
	}
}

function getQuestionsByCategoryId(categoryId){
	try{

		return MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CSOURCING_QUESTIONS'].sqlQuestions ,
			parameters : [categoryId]
		});	

		return handleError();
	}
	catch(e)
	{
		adapterLogger("getQuestionsByCategoryId","error", "Exception",toString(e));
		return handleError();
	}
}
//vote={userId:'ayman123',deviceId:'32526',routeId:1,catId:1,startLocation:"El Nahda",endLocation:"Daira",quesAnswer:[{ques_EN:"Are you person of determination",ques_AR:"هل أنت شخص العزم",answer_EN:"Are you person of determination",answer_AR:"هل أنت شخص العزم"}]}
//function submitAnswers(DEVICE_ID,USER_ID,ROUTE_ID,A_LOCATION,B_LOCATION,A_ADDRESS,B_ADDRESS,QUESTION_ANSWER,CATEGORY_ID,CATEGORY){
function submitAnswers(Answers){	
	try{

		if(Answers){
			var answerList=JSON.parse(Answers);

			var DEVICEID ="";
			if(answerList.DEVICE_ID)
				DEVICEID=answerList.DEVICE_ID;

			var USERID ="";
			if(answerList.USER_ID)
				USERID=answerList.USER_ID;

			var ROUTEID  =0;
			if(answerList.ROUTE_ID)
				ROUTEID=answerList.ROUTE_ID;


			var ALOCATION="";
			if(answerList.A_LOCATION)
				ALOCATION=answerList.A_LOCATION;

			var BLOCATION="";
			if(answerList.B_LOCATION)
				BLOCATION=answerList.B_LOCATION;

			var AADDRESS  =0;
			if(answerList.A_ADDRESS)
				AADDRESS=answerList.A_ADDRESS;

			var BADDRESS="";
			if(answerList.B_ADDRESS)
				BADDRESS=answerList.B_ADDRESS;


			var QUESTIONANSWER  ="";
			if(answerList.QUESTION_ANSWER)
				QUESTIONANSWER=answerList.QUESTION_ANSWER;

			var CATEGORYID  ="";
			if(answerList.CATEGORY_ID)
				CATEGORYID=answerList.CATEGORY_ID;


			var CATEGORYVALUE  ="";
			if(answerList.CATEGORY)
				CATEGORYVALUE=answerList.CATEGORY; 

			var createDate =new Date();
			var isDeleted=0;
			// return {DEVICE_ID:DEVICE_ID,USER_ID:USER_ID,ROUTE_ID:ROUTE_ID,A_LOCATION:A_LOCATION,B_LOCATION:B_LOCATION,A_ADDRESS:A_ADDRESS,B_ADDRESS:B_ADDRESS,QUESTION_ANSWER:QUESTION_ANSWER,CATEGORY_ID:CATEGORY_ID,CATEGORY:CATEGORY,createDate:createDate,isDeleted:isDeleted

//			}

			return MFP.Server.invokeSQLStatement({
				preparedStatement : DB_TABLES['CSOURCING_VOTES'].sqlInsertAnswers,
				parameters : [DEVICEID,USERID,ROUTEID,ALOCATION,BLOCATION,AADDRESS,BADDRESS,QUESTIONANSWER,CATEGORYID,CATEGORYVALUE,createDate,isDeleted]
			});	
		}

		return handleError();
	}
	catch(e)
	{
		return {error :e}
		adapterLogger("submitAnswers","error", "Exception",toString(e));
		return handleError();
	}
}


function getVotesReportById(id)
{
	try{
		var result = MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CSOURCING_VOTES'].sqlVotedRoutesByUserId,
			parameters : [id]
		});	
		var list=[];
		for (var i=0 ; i<result.resultSet.length ; i++){
			var current=result.resultSet[i];

			current.QUESTION_ANSWER=JSON.parse(current.QUESTION_ANSWER);



			list.push(current);
		}

		return {
			userVotes:list
		}
	}
	catch(e)
	{
		return {error :e}
		adapterLogger("submitAnswers","error", "Exception",toString(e));
		return handleError();
	}
}

function getPagnationVotes(startIndex,length,userToken){

	try{
		if(userToken != token){
			return handleError();
		}
		var from=parseInt(startIndex);
		var to =(startIndex +parseInt(length))-1;

		var result=MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CSOURCING_VOTES'].sqlPagnationVoted ,
			parameters : [from,to]
		});	

		var sqlALLCount=MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CSOURCING_VOTES'].sqlALLCount ,
			parameters : []
		});	

		var list=[];
		for (var i=0 ; i<result.resultSet.length ; i++){
			var currentObject=result.resultSet[i];

			currentObject.QUESTION_ANSWER=JSON.parse(currentObject.QUESTION_ANSWER);
			/*var newQuesAnswerlist=[];
			for (var j=0 ; j<currentObject.QUESTION_ANSWER.length; j++){

				var currentQuesAnswer=currentObject.QUESTION_ANSWER[j];
				var newQuesAnswer={};
				newQuesAnswer.question_EN=currentQuesAnswer.ques_EN +"<br>";
				newQuesAnswer.answer_EN=currentQuesAnswer.answer_EN +"<br><br>";

				newQuesAnswer.question_AR=currentQuesAnswer.ques_AR +"<br>";
				newQuesAnswer.answer_AR=currentQuesAnswer.answer_AR +"<br><hr>";
				newQuesAnswerlist.push(newQuesAnswer);
			}
			currentObject.QUESTION_ANSWER=JSON.stringify(newQuesAnswerlist);
			list.push(currentObject);*/



			var newQuesAnswer="";
			for (var j=0 ; j<currentObject.QUESTION_ANSWER.length; j++){

				var currentQuesAnswer=currentObject.QUESTION_ANSWER[j];
				if(currentQuesAnswer.ques_EN)
					newQuesAnswer+=currentQuesAnswer.ques_EN +"<br>" ;
				if(currentQuesAnswer.answer_EN)
					newQuesAnswer+=currentQuesAnswer.answer_EN +"<br>" ;
				newQuesAnswer+="<br>";
				if(currentQuesAnswer.ques_AR)
					newQuesAnswer+=currentQuesAnswer.ques_AR+"<br>" ;
				if(currentQuesAnswer.answer_AR)
					newQuesAnswer+=currentQuesAnswer.answer_AR +"<hr>";
			}
			currentObject.QUESTION_ANSWER=newQuesAnswer;
			list.push(currentObject);


		}

		return {
			"recordsTotal": sqlALLCount.resultSet[0].COUNT,
			"recordsFiltered": sqlALLCount.resultSet[0].COUNT,
			data:list
		}

		return handleError();
	}
	catch(e)
	{
		adapterLogger("getPagnationVotes","error", "Exception",toString(e));
		return handleError();
	}



}


function crowdSourcingLogin(username,password){

	if(username=='admin'&&password=='rtaadmin'){
		return {
			authenticated:true,
			token:token
		}
	}else {
		return {
			authenticated:false
		}
	}
}

function googleMapKey(environment){

	if(environment&&environment=='staging'){
		return {
			key:"AIzaSyDeneAfP2MFPqtKMU9qThPtMnkWzVlr7Zfs",
			environment:"staging"
		}
	}else {
		return {
			key:"AIzaSyDVVA8h-f-CiA0rwbnHOVfiA7nJzUcmrDc",
			environment:"Producation"
		}
	}
}

function getIndexOfRouteAnswer(answer){
	if(answer){
		var answersList=[{name:"Daily",value:0},{name:"weekly",value:1},{name:"Sometimes",value:2},{name:"I use another public transport service",value:3},
		                 {name:"Morning 6:00 - 9:00",value:0},{name:"Afternoon 1:00-3:00",value:1},{name:"Evening 4:00 – 7:00",value:2},{name:"Night after 10 pm",value:3},
		                 {name:"Work",value:0},{name:"Leisure",value:1},{name:"Both",value:2},
		                 {name:"At location B (Arrival)",value:0},{name:"At location A (Departure)",value:1},{name:"Both",value:2},
		                 {name:"Yes",value:0}, {name:"No",value:1}
		                 ]

		return search(answer,answersList);

	}

}

function getIndexTimingAnswer(answer){
	if(answer){
		var answersList=[
		                 {name:"Morning",value:0},{name:"Afternoon",value:1},
		                 {name:"Evening",value:2},
		                 {name:"Night",value:3}]

		return search(answer,answersList);

	}

}

function search(nameKey, myArray){
	for (var i=0; i < myArray.length; i++) {
		if (myArray[i].name == nameKey) {
			return myArray[i].value;
		}
	}
}

function generateReport(days){
	try{
		if(!days)
			days=1;

		var currentDate=new Date();
		var startDate = new Date(currentDate.getTime() - days*(1000 * 60 * 60 * 24));

		var orginalVote=MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CSOURCING_VOTES'].generateSqlVotedRoutes ,
			parameters : []
		});	
		var list=[];
		if(orginalVote.resultSet&&orginalVote.resultSet.length>0){

			for (var i=0 ; i<orginalVote.resultSet.length ; i++){
				var currentVote=orginalVote.resultSet[i];

				var DEVICE_ID="-";
				if(currentVote.DEVICE_ID)
					DEVICE_ID=new String(currentVote.DEVICE_ID) ;


				var USER_ID="-";
				if(currentVote.USER_ID)
					USER_ID=new String(currentVote.USER_ID);
				var VOTINGID=i+1;

				var VOTING_DATE="";
				var VOTING_TIME="";
				if(currentVote.CREATION_DATE){
					var voteDate=currentVote.CREATION_DATE.toString();
					splitList=voteDate.split(' ');
					VOTING_DATE=splitList[0];

					if(splitList[1])
						VOTING_TIME=splitList[1];
				}

				var QUESTION="-";
				var CATEGORY="-";
				var ADDRESS_A="-";
				var ADDRESS_B="-";
				var ANSWER_D ="-";
				var ANSWER_C ="-";
				var ANSWER_B ="-";
				var ANSWER_A="-";
				var LOCATION_A="-";
				var LOCATION_B="-";
				var USERCOMMENT="-";


				if(currentVote.A_LOCATION)
					LOCATION_A=new String(currentVote.A_LOCATION);

				if(currentVote.B_LOCATION)
					LOCATION_B=new String(currentVote.B_LOCATION);

				ADDRESS_A="-"
					if(currentVote.A_ADDRESS)
						ADDRESS_A=new String(currentVote.A_ADDRESS);


				if(currentVote.B_ADDRESS)
					ADDRESS_B=new String(currentVote.B_ADDRESS);


				// process
				if(currentVote.CATEGORY_ID==1)// this is new route
				{
					CATEGORY="New Route";
				}
				else{
					CATEGORY="Proposed Route";
				}
				// get question and address
				var listQuesAnswers="";


				if(currentVote.QUESTION_ANSWER){
					var parseList=JSON.parse(currentVote.QUESTION_ANSWER);
					/*return {
						"parseList":parseList
					}*/
					if(parseList&&parseList.length>0){
						var currentQues=null;
						for (var j=0 ; j<parseList.length ; j++){
							ANSWER_D ="-";
							ANSWER_C ="-";
							ANSWER_B ="-";
							ANSWER_A="-";
							currentQues=parseList[j];
							QUESTION=new String(parseList[j].ques_EN.replace(/\n/g, '')+" & " + parseList[j].ques_AR.replace(/\n/g, ''));
							/*return {
								USERCOMMENT:currentQues
							}*/
							USERCOMMENT="-";
							if(currentQues.ques_EN=="Comments and suggestions"){
								if(currentQues.answer_EN)
									USERCOMMENT=new String(currentQues.answer_EN)

							}else{
								var index=getIndexOfRouteAnswer(currentQues.answer_EN)
								if(index==0){
									ANSWER_A=new String(currentQues.answer_EN +" & "+ currentQues.answer_AR); 
								}
								else if(index==1){
									ANSWER_B=new String(currentQues.answer_EN  +" & "+ currentQues.answer_AR) ;
								}
								else if(index==2){
									ANSWER_C=new String(currentQues.answer_EN   +" & "+ currentQues.answer_AR) ;
								}
								else if(index==3){
									ANSWER_D=new String(currentQues.answer_EN  +" & "+ currentQues.answer_AR);
								}
							}
							result= MFP.Server.invokeSQLStatement({
								preparedStatement : DB_TABLES['CSOURCING_REPORTING'].insert,
								parameters : [CATEGORY,USER_ID,QUESTION,ADDRESS_B,ADDRESS_A,DEVICE_ID,ANSWER_D,ANSWER_C,ANSWER_B ,ANSWER_A,VOTING_DATE,LOCATION_A,LOCATION_B,VOTING_TIME,VOTINGID,USERCOMMENT]
							});	
						}
					}
				}
			}
		}

	}
	catch(e){
		return{ result :e}
	}
}
function toString(param) {
	try {
		var isBoolean = function (arg) { return typeof arg === 'boolean'; }
		var isNumber = function (arg) { return typeof arg === 'number'; }
		var isString = function (arg) { return typeof arg === 'string'; }
		var isFunction = function (arg) { return typeof arg === 'function'; }
		var isObject = function (arg) { return typeof arg === 'object'; }
		var isUndefined = function (arg) { return typeof arg === 'undefined'; }

		if (isUndefined(param)) {
			return "undefined";
		} else if (isObject(param)) {
			return JSON.stringify(param);
		} else if (isString(param)) {
			return param;
		} else {
			//in case of numbers and boolean functions
			return param.toString();
		}
	} catch (e) {
		return param;
	}
}
   function isInclude (string,search, start) {
//        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return string.indexOf(search, start) !== -1;
        }
    };

function generateFinalReport(){
	try{

		var orginalVote=MFP.Server.invokeSQLStatement({
			preparedStatement : DB_TABLES['CSOURCING_VOTES'].generateSqlVotedRoutes ,
			parameters : []
		});	

/*var orginalVote ={
        "isSuccessful": true,
        "resultSet": [
             {
                "DEVICE_ID": "684c18cd2d15b326",
                "CREATION_DATE": "2019-12-03 19:18:48.679",
                "USER_ID": null,
                "ROUTE_ID": 1,
                "B_LOCATION": "(25.2519659 , 55.3328027)",
                "A_LOCATION": "(25.1259979 , 55.4027059)",
                "A_ADDRESS": "Axis 1 Dubai Silicon Oasis Dubai",
                "QUESTION_ANSWER": "[{\"ques_EN\":\"How often would you use this bus route ?\",\"ques_AR\":\"كم مرة سوف تستخدم هذا المسار ؟\",\"answer_EN\":\"Sometimes\",\"answer_AR\":\"عشوائي\"},{\"ques_EN\":\"At which time do you need to use this bus route?\",\"ques_AR\":\"في أي وقت ستستخدم هذا المسار؟\",\"answer_AR\":\"مساءاً: 4:00-7:00 ,\",\"answer_EN\":\"Afternoon 1:00-3:00,\"},{\"ques_EN\":\"What would be the main purpose of using this bus route?\",\"ques_AR\":\"هل ستستخدم  هذا المسار  للتنقل الى ؟\",\"answer_EN\":\"Leisure\",\"answer_AR\":\" وجهة ترفيهية \"},{\"ques_EN\":\"The suggested route will improve your bus journey at which location\",\"ques_AR\":\"هل سيساعد اقتراحك على تحسين رحلتك عند: \",\"answer_EN\":\"At location A (Departure)\",\"answer_AR\":\"مكان انطلاقك \"},{\"ques_EN\":\"Are you a person of determination?\",\"ques_AR\":\"هل انت من أصحاب الهمم ؟\",\"answer_EN\":\"No\",\"answer_AR\":\" لا\"},{\"ques_EN\":\"Comments and suggestions\",\"ques_AR\":\"ملاحظات و اقتراحات أخرى\",\"answer_AR\":\"\",\"answer_EN\":\"\"}]",
                "B_ADDRESS": "8th St Port Saeed Dubai",
                "ID": 24404,
                "CATEGORY_ID": 1,
                "CATEGORY": "new Routes",
                "IS_DELETD": 0
            },
            {
                "DEVICE_ID": "684c18cd2d15b326",
                "CREATION_DATE": "2019-12-03 19:19:29.494",
                "USER_ID": null,
                "ROUTE_ID": 1,
                "B_LOCATION": "(25.2552903 , 55.330692)",
                "A_LOCATION": "(25.1259979 , 55.4027059)",
                "A_ADDRESS": "Axis 1 Dubai Silicon Oasis Dubai",
                "QUESTION_ANSWER": "[{\"ques_EN\":\"How often would you use this bus route ?\",\"ques_AR\":\"كم مرة سوف تستخدم هذا المسار ؟\",\"answer_EN\":\"Daily\",\"answer_AR\":\"يوميًا \"},{\"ques_EN\":\"At which time do you need to use this bus route?\",\"ques_AR\":\"في أي وقت ستستخدم هذا المسار؟\",\"answer_AR\":\"صباحًا: 6:00- 9:00 ,\",\"answer_EN\":\"Morning 6:00 – 9:00,\"},{\"ques_EN\":\"What would be the main purpose of using this bus route?\",\"ques_AR\":\"هل ستستخدم  هذا المسار  للتنقل الى ؟\",\"answer_EN\":\"Both\",\"answer_AR\":\" كليهما\"},{\"ques_EN\":\"The suggested route will improve your bus journey at which location\",\"ques_AR\":\"هل سيساعد اقتراحك على تحسين رحلتك عند: \",\"answer_EN\":\"At location B (Arrival)\",\"answer_AR\":\" مكان وصولك \"},{\"ques_EN\":\"Are you a person of determination?\",\"ques_AR\":\"هل انت من أصحاب الهمم ؟\",\"answer_EN\":\"No\",\"answer_AR\":\" لا\"},{\"ques_EN\":\"Comments and suggestions\",\"ques_AR\":\"ملاحظات و اقتراحات أخرى\",\"answer_AR\":\"\",\"answer_EN\":\"\"}]",
                "B_ADDRESS": "Dubai Port Saeed Dubai",
                "ID": 24405,
                "CATEGORY_ID": 1,
                "CATEGORY": "new Routes",
                "IS_DELETD": 0
            },
            {
                "DEVICE_ID": "f4824e61bc7875bd",
                "CREATION_DATE": "2019-12-03 19:19:56.647",
                "USER_ID": null,
                "ROUTE_ID": 1,
                "B_LOCATION": "(25.217603 , 55.28281070000003)",
                "A_LOCATION": "(25.2515536 , 55.294947699999966)",
                "A_ADDRESS": "31 10 B St Bur Dubai",
                "QUESTION_ANSWER": "[{\"ques_EN\":\"How often would you use this bus route ?\",\"ques_AR\":\"كم مرة سوف تستخدم هذا المسار ؟\",\"answer_EN\":\"Daily\",\"answer_AR\":\"يوميًا \"},{\"ques_EN\":\"At which time do you need to use this bus route?\",\"ques_AR\":\"في أي وقت ستستخدم هذا المسار؟\",\"answer_AR\":\"صباحًا: 6:00- 9:00 ,\",\"answer_EN\":\"Morning 6:00 – 9:00,\"},{\"ques_EN\":\"What would be the main purpose of using this bus route?\",\"ques_AR\":\"هل ستستخدم  هذا المسار  للتنقل الى ؟\",\"answer_EN\":\"Work\",\"answer_AR\":\"العمل \"},{\"ques_EN\":\"The suggested route will improve your bus journey at which location\",\"ques_AR\":\"هل سيساعد اقتراحك على تحسين رحلتك عند: \",\"answer_EN\":\"Both\",\"answer_AR\":\" مكان الانطلاق ومكان الوصول\"},{\"ques_EN\":\"Are you a person of determination?\",\"ques_AR\":\"هل انت من أصحاب الهمم ؟\",\"answer_EN\":\"No\",\"answer_AR\":\" لا\"},{\"ques_EN\":\"Comments and suggestions\",\"ques_AR\":\"ملاحظات و اقتراحات أخرى\",\"answer_AR\":\"\",\"answer_EN\":\"\"}]",
                "B_ADDRESS": "Sheikh Zayed Rd Trade Centre Dubai",
                "ID": 24406,
                "CATEGORY_ID": 1,
                "CATEGORY": "new Routes",
                "IS_DELETD": 0
            },
            {
                "DEVICE_ID": "e8587a189e7d4cf0",
                "CREATION_DATE": "2019-12-02 21:23:20.058",
                "USER_ID": null,
                "ROUTE_ID": 1,
                "B_LOCATION": "(25.08489519999999 , 55.148926099999926)",
                "A_LOCATION": "(25.271727 , 55.31318299999998)",
                "A_ADDRESS": "Dubai Naif Dubai",
                "QUESTION_ANSWER": "[{\"ques_EN\":\"How often would you use this bus route ?\",\"ques_AR\":\"كم مرة سوف تستخدم هذا المسار ؟\",\"answer_EN\":\"I use another public transport service\",\"answer_AR\":\" استخدم وسيلة نقل بديلة\"},{\"ques_EN\":\"\\n\\t\\tAt which time do you need to use this bus route?\\n\\t\",\"ques_AR\":\"في أي وقت ستستخدم هذا المسار؟\"},{\"ques_EN\":\"\\n\\t\\tWhat would be the main purpose of using this bus route?\\n\\t\",\"ques_AR\":\"هل ستستخدم  هذا المسار  للتنقل الى ؟\"},{\"ques_EN\":\"The suggested route will improve your bus journey at which location\",\"ques_AR\":\"هل سيساعد اقتراحك على تحسين رحلتك عند: \",\"answer_EN\":\"Both\",\"answer_AR\":\" مكان الانطلاق ومكان الوصول\"},{\"ques_EN\":\"Are you a person of determination?\",\"ques_AR\":\"هل انت من أصحاب الهمم ؟\",\"answer_EN\":\"Yes\",\"answer_AR\":\"نعم  \"},{\"ques_EN\":\"Comments and suggestions\",\"ques_AR\":\"ملاحظات و اقتراحات أخرى\",\"answer_AR\":\"\",\"answer_EN\":\"\"}]",
                "B_ADDRESS": "دبي دبي AE",
                "ID": 24462,
                "CATEGORY_ID": 1,
                "CATEGORY": "new Routes",
                "IS_DELETD": 0
            },
            {
                "DEVICE_ID": "e321a66a6d396072",
                "CREATION_DATE": "2019-12-03 18:09:17.088",
                "USER_ID": "shafiaps",
                "ROUTE_ID": 1,
                "B_LOCATION": "(25.1831647 , 55.27288699999997)",
                "A_LOCATION": "(25.2769816 , 55.37242939999999)",
                "A_ADDRESS": "Al Qusais Dubai Dubai",
                "QUESTION_ANSWER": "[{\"ques_EN\":\"How often would you use this bus route ?\",\"ques_AR\":\"كم مرة سوف تستخدم هذا المسار ؟\",\"answer_EN\":\"Daily\",\"answer_AR\":\"يوميًا \"},{\"ques_EN\":\"At which time do you need to use this bus route?\",\"ques_AR\":\"في أي وقت ستستخدم هذا المسار؟\",\"answer_AR\":\"صباحًا: 6:00- 9:00 ,\",\"answer_EN\":\"Morning 6:00 – 9:00,\"},{\"ques_EN\":\"What would be the main purpose of using this bus route?\",\"ques_AR\":\"هل ستستخدم  هذا المسار  للتنقل الى ؟\",\"answer_EN\":\"Work\",\"answer_AR\":\"العمل \"},{\"ques_EN\":\"The suggested route will improve your bus journey at which location\",\"ques_AR\":\"هل سيساعد اقتراحك على تحسين رحلتك عند: \",\"answer_EN\":\"At location A (Departure)\",\"answer_AR\":\"مكان انطلاقك \"},{\"ques_EN\":\"Are you a person of determination?\",\"ques_AR\":\"هل انت من أصحاب الهمم ؟\",\"answer_EN\":\"No\",\"answer_AR\":\" لا\"},{\"ques_EN\":\"Comments and suggestions\",\"ques_AR\":\"ملاحظات و اقتراحات أخرى\",\"answer_AR\":\"\",\"answer_EN\":\"\"}]",
                "B_ADDRESS": "Business Bay Dubai Dubai",
                "ID": 24463,
                "CATEGORY_ID": 1,
                "CATEGORY": "new Routes",
                "IS_DELETD": 0
            },
            {
                "DEVICE_ID": "4F8A8639-8FD1-4632-879F-66AFC1DE7A02",
                "CREATION_DATE": "2019-12-04 17:50:20.994",
                "USER_ID": null,
                "ROUTE_ID": 8,
                "B_LOCATION": null,
                "A_LOCATION": null,
                "A_ADDRESS": "القصيص",
                "QUESTION_ANSWER": "[{\"ques_AR\":\"هل سيحسن هذا الطريق وقت سفرك؟\\n\",\"ques_EN\":\"Will this route improve your travel time?\",\"answer_AR\":\"نعم\",\"answer_EN\":\"Yes \"},{\"ques_AR\":\"هل سيحسن هذا المسار الوقت المستغرق في رحلتك ؟\\n\",\"ques_EN\":\"Would this route improve your journey time ?\",\"answer_AR\":\"نعم\",\"answer_EN\":\"Yes \"},{\"ques_AR\":\"ل انت من أصحاب الهمم ؟\\n\",\"ques_EN\":\"Are you a person of determination? \",\"answer_AR\":\"لا\",\"answer_EN\":\" No\"},{\"ques_AR\":\"أي تعليقات أخرى؟\\n\",\"ques_EN\":\"Any other comments?\",\"answer_EN\":\"\",\"answer_AR\":\"\"}]",
                "B_ADDRESS": "مطار دبي آل مكتوم الدولي",
                "ID": 24464,
                "CATEGORY_ID": 2,
                "CATEGORY": "proposed Routes",
                "IS_DELETD": 0
            },
            {
                "DEVICE_ID": "8ee8fa3aa4907146",
                "CREATION_DATE": "2019-12-04 18:07:25.571",
                "USER_ID": null,
                "ROUTE_ID": 8,
                "B_LOCATION": null,
                "A_LOCATION": null,
                "A_ADDRESS": "AL Qusais",
                "QUESTION_ANSWER": "[{\"ques_EN\":\"Will this route improve your travel time?\",\"ques_AR\":\"هل سيحسن هذا الطريق وقت سفرك؟\",\"answer_EN\":\"Yes\",\"answer_AR\":\"نعم  \"},{\"ques_EN\":\"Would this route improve your journey time ?\",\"ques_AR\":\"هل سيحسن هذا المسار الوقت المستغرق في رحلتك ؟\",\"answer_EN\":\"Yes\",\"answer_AR\":\"نعم  \"},{\"ques_EN\":\"Are you a person of determination?\",\"ques_AR\":\"ل انت من أصحاب الهمم ؟\",\"answer_EN\":\"Yes\",\"answer_AR\":\"نعم  \"},{\"ques_EN\":\"Any other comments?\",\"ques_AR\":\"أي تعليقات أخرى؟\",\"answer_EN\":\"\",\"answer_AR\":\"\"}]",
                "B_ADDRESS": "DWC Airport",
                "ID": 24465,
                "CATEGORY_ID": 2,
                "CATEGORY": "proposed Routes",
                "IS_DELETD": 0
            }]}*/

/* var list=[];*/
		if(orginalVote.resultSet&&orginalVote.resultSet.length>0){
			for (var i=0;i<orginalVote.resultSet.length;i++){
				var currentVote=orginalVote.resultSet[i];
				var DEVICEID="-";
				if(currentVote.DEVICE_ID)
					DEVICEID=toString(currentVote.DEVICE_ID);


				var USERID="-";
				if(currentVote.USER_ID)
					USERID=toString(currentVote.USER_ID);


				var VOTINGDATE="";
				var VOTINGTIME="";
				if(currentVote.CREATION_DATE){
					var voteDate=currentVote.CREATION_DATE.toString();
					splitList=voteDate.split(' ');
					VOTINGDATE=toString(splitList[0]);

					if(splitList[1])
						VOTINGTIME=toString(splitList[1]);
				}
				// process
				if(currentVote.CATEGORY_ID==1)// this is new route
				{

					var CATEGORY="New Route";
					var QUESTION1,DAILY="-",   WEEKLY="-",SOMETIMES="-", ANOTHERPUBLIC="-",SUBQUESTION1="-";  
					var MORNING="-",AFTERNOON="-", EVENING="-",  NIGHTAFTER="-", SUBQUESTION2="-", WORK="-";
					var LEISURE="-",  SUBBOTH="-",QUESTION2="-",ATLOcationA="-",ATLOCATIONB="-", BOTH="-";
					var QUESTION3="-",Yes="-",NO="-",QUESTION4="-",COMMENT="-";
					//A_LOCATION,B_LOCATION,A_ADDRESS,B_ADDRESS,QUESTION_ANSWER


					//locations and addresses  
					var LOCATIONA="-";
					if(currentVote.A_LOCATION&&(currentVote.A_LOCATION!=null||currentVote.A_LOCATION!=0||currentVote.A_LOCATION!="0"||currentVote.A_LOCATION!="null"))
						LOCATIONA=toString(currentVote.A_LOCATION);
					var LOCATIONB="-";;
					if(currentVote.B_LOCATION&&(currentVote.B_LOCATION!=null||currentVote.B_LOCATION!=0||currentVote.B_LOCATION!="0"||currentVote.B_LOCATION!="null"))
						LOCATIONB= toString(currentVote.B_LOCATION);

					var ADDRESSA="-";;
					if(currentVote.A_ADDRESS&&(currentVote.A_ADDRESS!=null||currentVote.A_ADDRESS!=0||currentVote.A_ADDRESS!="0"||currentVote.A_ADDRESS!="null"))
						ADDRESSA=toString(currentVote.A_ADDRESS.replace(/0/g,'-'));


					var ADDRESSB="-";
					if(currentVote.B_ADDRESS&&(currentVote.B_ADDRESS!=null||currentVote.B_ADDRESS!=0||currentVote.B_ADDRESS!="0"||currentVote.B_ADDRESS!="null"))
						ADDRESSB=toString(currentVote.B_ADDRESS);


					// process question 
					if(currentVote.QUESTION_ANSWER){
						var parseList=JSON.parse(currentVote.QUESTION_ANSWER);
						/*return {
							parseList:parseList
						}*/

						if(parseList&&parseList.length>0){
							for(var j=0;j<parseList.length;j++){
								var currentQues=null;
								currentQues=parseList[j];
								//DEVICEID,USERID,CATEGORY,ADDRESSA,ADDRESSB,VOTINGDATE,LOCATIONA,LOCATIONB,VOTINGTIME,QUESTION1,DAILY,WEEKLY,SOMETIMES,ANOTHERPUBLIC,SUBQUESTION1,MORNING,AFTERNOON,EVENING,NIGHTAFTER,SUBQUESTION2,WORK,LEISURE,SUBBOTH,QUESTION2,ATLOCATIONA,ATLOCATIONB,BOTH,QUESTION3,YESS,NOO,QUESTION4,COMMENTING
								//  question 1
								/*var y=toString(currentQues.ques_EN);
								var x=y=="How often would you use this bus route ?"?true:false;
								return {
									result:x,
									ques:currentQues.ques_EN
								}*/
								if(currentQues.ques_EN=="How often would you use this bus route ?"){
									var QUESTION1=new String(currentQues.ques_EN.replace(/\n/g,'')+" & " + currentQues.ques_AR.replace(/\n/g,''));

									var index=getIndexOfRouteAnswer(currentQues.answer_EN);
									/*return {
										index:index,
										answer:currentQues.answer_EN
									}*/
									
									if(index==0||index=="0"){
										DAILY=new String(currentQues.answer_EN +" & "+ currentQues.answer_AR); 
									}
									else if(index==1||index=="1"){
										WEEKLY=new String(currentQues.answer_EN  +" & "+ currentQues.answer_AR);
									}
									else if(index==2||index=="2"){
										SOMETIMES=new String(currentQues.answer_EN   +" & "+ currentQues.answer_AR);
									}
									else if(index==3||index=="3"){
										ANOTHERPUBLIC=new String(currentQues.answer_EN  +" & "+ currentQues.answer_AR);
									}
								}
								//sub question1

								if(currentQues.ques_EN=="At which time do you need to use this bus route?"){

									var SUBQUESTIONN=currentQues;
									if(SUBQUESTIONN){
										SUBQUESTION1=new String(SUBQUESTIONN.ques_EN.replace(/\n/g,'')+" & " + SUBQUESTIONN.ques_AR.replace(/\n/g,''));
										/*return {
											index:index,
											answer:SUBQUESTION1.answer_EN
										}*/
										var splitAns=null;
										var splitAnaAr=null;
										if(SUBQUESTIONN.answer_EN){
											splitAns=SUBQUESTIONN.answer_EN.split(',');
											
											splitAnaAr=SUBQUESTIONN.answer_AR.split(',');
										}

									/*	return {
											splitAns:splitAns,
											splitAnaAr:splitAnaAr
										}*/
										if(splitAns&&splitAns.length>0){
											for(var k=0;k<splitAns.length;k++){
												if(splitAns[k]){
													//var searchAnswer=splitAns[k];
													/*if(searchAnswer=="Morning 6:00 - 9:00")
														searchAnswer="Morning";*/
													//var index=getIndexOfRouteAnswer(splitAns[k]);
													/*return {
														index:index,
														splitAns:splitAns[k]
													}*/
													/*list.push({anser:splitAns[k],
														index:index})*/
													
													  /*{name:"Morning",value:0},{name:"Afternoon",value:1},
										                 {name:"Evening",value:2},
										                 {name:"Night",value:3}*/
													
													/*var searchAnswer=splitAns[k];
													if(searchAnswer.replace(/\s/g, '')=="Morning 6:00 - 9:00".replace(/\s/g, ''))
														searchAnswer="Morning";
													else if(searchAnswer.replace(/\s/g, '')=="Afternoon 1:00-3:00".replace(/\s/g, ''))
														searchAnswer="Afternoon";
													else if(searchAnswer.replace(/\s/g, '')=="Evening 4:00 – 7:00".replace(/\s/g, ''))
														searchAnswer="Evening";
													else if(searchAnswer.replace(/\s/g, '')=="Night after 10 pm".replace(/\s/g, ''))
														searchAnswer="Night";*/
													
													//var index=getIndexTimingAnswer(searchAnswer);
//													if(splitAns[k].replace(/\s/g, '')=="Morning 6:00 - 9:00".replace(/\s/g, '')){
													if(isInclude(splitAns[k],"Morning")){
	
														MORNING=splitAns[k]; //+" & "+ splitAnaAr[0]); 
													}
													else if(isInclude(splitAns[k],"Afternoon")){
														
														AFTERNOON=splitAns[k];  // +" & "+ splitAnaAr[1]) ;
													}
													else if(isInclude(splitAns[k],"Evening")){
														
														EVENING=splitAns[k];   //+" & "+ splitAnaAr[2]);
													}
													else if(isInclude(splitAns[k],"Night")){
														
														NIGHTAFTER=splitAns[k];  // +" & "+ splitAnaAr[3]);
													}
												}
												
											}
										}
									}
								}

								if(currentQues.ques_EN=="What would be the main purpose of using this bus route?"){
									// sub question 2  WORK,LEISURE,SUBBOTH
									var SUBQUESTIN=currentQues;
									SUBQUESTION2=new String(SUBQUESTIN.ques_EN.replace(/\n/g,'')+" & " + SUBQUESTIN.ques_AR.replace(/\n/g,''));
									var index=getIndexOfRouteAnswer(SUBQUESTIN.answer_EN);
									if(index==0||index=="0"){
										WORK=new String(SUBQUESTIN.answer_EN +" & "+ SUBQUESTIN.answer_AR); 
									}
									else if(index==1||index=="1"){
										LEISURE=new String(SUBQUESTIN.answer_EN  +" & "+ SUBQUESTIN.answer_AR) ;
									}
									else if(index==2||index=="2"){
										SUBBOTH=new String(SUBQUESTIN.answer_EN   +" & "+ SUBQUESTIN.answer_AR) ;
									}									


								}

								// question 2

								if(currentQues.ques_EN=="The suggested route will improve your bus journey at which location"){
									var fourQues=currentQues;

									QUESTION2=new String(fourQues.ques_EN.replace(/\n/g,'')+" & " + fourQues.ques_AR.replace(/\n/g,''));
									var index=getIndexOfRouteAnswer(fourQues.answer_EN);
									if(index==0||index=="0"){
										ATLOcationA=new String(fourQues.answer_EN +" & "+ fourQues.answer_AR); 
									}
									else if(index==1||index=="1"){
										ATLOCATIONB=new String(fourQues.answer_EN  +" & "+ fourQues.answer_AR) ;
									}
									else if(index==2||index=="2"){
										BOTH=new String(fourQues.answer_EN   +" & "+ fourQues.answer_AR);
									}
								
								}
								// question 3
								if(currentQues.ques_EN=="Are you a person of determination?"){
									var fiveQues=currentQues;
									if(fiveQues){
										QUESTION3=new String(fiveQues.ques_EN.replace(/\n/g,'')+" & " + fiveQues.ques_AR.replace(/\n/g,''));
										if(QUESTION3){
											var index=getIndexOfRouteAnswer(fiveQues.answer_EN);
											if(index==0||index=="0"){
												Yes=new String(fiveQues.answer_EN +" & "+ fiveQues.answer_AR); 
											}
											else if(index==1||index=="1"){
												NO=new String(fiveQues.answer_EN  +" & "+ fiveQues.answer_AR);
											}
										}
									}
								}
								var USERCOMMENT="-";
								if(currentQues.ques_EN=="Comments and suggestions"){

									var userCommentObject=currentQues;
									if(userCommentObject){
										if(userCommentObject&&userCommentObject.ques_EN=="Comments and suggestions"){
											QUESTION4=new String(userCommentObject.ques_EN);
											if(userCommentObject.answer_EN){
												USERCOMMENT=userCommentObject.answer_EN;
											}
										}
									}
								}}}
					}

					/*var obj= {
						DEVICEID:DEVICEID,USERID:USERID,CATEGORY:CATEGORY, ADDRESS_A:ADDRESSA,ADDRESSB:ADDRESSB,VOTING_DATE:VOTINGDATE,LOCATION_A:LOCATIONA,LOCATION_B:LOCATIONB, 
			              VOTING_TIME:VOTINGTIME,  QUESTION1:QUESTION1,DAILY:DAILY,   WEEKLY:WEEKLY,  SOMETIMES:SOMETIMES, ANOTHEPUBLIC:ANOTHERPUBLIC,SUBQUESTION1:SUBQUESTION1, 
			              MORNING:MORNING, AFTERNOON:AFTERNOON, EVENING:EVENING, NIGHTAFTER:NIGHTAFTER, SUBQUESTION2:SUBQUESTION2, WORK:WORK, LEISURE:LEISURE,SUBBOTH:SUBBOTH,
			              QUESTION2:QUESTION2,ATLOcationA:ATLOcationA,ATLOCATIONB:ATLOCATIONB, BOTH:BOTH,QUESTION3:QUESTION3,Yes:Yes,NO:NO, QUESTION4:QUESTION4,COMMENT:COMMENT
					}*/
					/*if(!ADDRESSA){
						ADDRESSA="-"
					}*/
					

					 MFP.Server.invokeSQLStatement({
						preparedStatement : DB_TABLES['NEWROUTE_REPORTING'].insert,
						parameters : [DEVICEID,USERID,CATEGORY,ADDRESSA,ADDRESSB,VOTINGDATE,LOCATIONA,LOCATIONB, 
						              VOTINGTIME,QUESTION1,DAILY,WEEKLY,SOMETIMES,ANOTHERPUBLIC,SUBQUESTION1, 
						              MORNING,AFTERNOON,EVENING,NIGHTAFTER,SUBQUESTION2,WORK,LEISURE,SUBBOTH,
						              QUESTION2,ATLOcationA,ATLOCATIONB,BOTH,QUESTION3,Yes,NO,QUESTION4,USERCOMMENT]
					});

				}
				else{
					CATEGORY="Proposed Route";
					var FFROM="-",TTO="-",QUESTION1="-",YES1="-";
					var NO1="-",QUESTION2="-",YES2="-",NO2="-",QUESTION3="-";
					var YES3="-",NO3="-",QUESTION4="-",COMMENT="-";

					if(currentVote.A_ADDRESS)
						FFROM= new String(currentVote.A_ADDRESS);

					if(currentVote.B_ADDRESS)
						TTO=new String(currentVote.B_ADDRESS);

					// process question 
					if(currentVote.QUESTION_ANSWER){
						var parseList=JSON.parse(currentVote.QUESTION_ANSWER);


						if(parseList&&parseList.length>0){
							var currentQues=null;
							currentQues=parseList[0];


							var firstQues=parseList[0];
							if(firstQues){
								QUESTION1=new String(firstQues.ques_EN.replace(/\n/g,'')+" & " + firstQues.ques_AR.replace(/\n/g,''));
								if(QUESTION1){
									var index=getIndexOfRouteAnswer(firstQues.answer_EN);
									if(index==0||index=="0"){
										YES1=new String(firstQues.answer_EN +" & "+ firstQues.answer_AR); 
									}
									else if(index==1||index=="1"){
										NO1=new String(firstQues.answer_EN  +" & "+ firstQues.answer_AR) ;
									}
								}
							}

							var secondQues=parseList[1];
							if(secondQues){
								var index=getIndexOfRouteAnswer(secondQues.answer_EN);
								QUESTION2=new String(secondQues.ques_EN.replace(/\n/g,'')+" & " + secondQues.ques_AR.replace(/\n/g,''));
								if(index==0||index=="0"){
									YES2=new String(secondQues.answer_EN +" & "+ secondQues.answer_AR); 
								}
								else if(index==1||index=="1"){
									NO2=new String(secondQues.answer_EN  +" & "+ secondQues.answer_AR) ;
								}
							}

							var thirdQues=parseList[2];
							if(thirdQues){
								var index=getIndexOfRouteAnswer(thirdQues.answer_EN);
								QUESTION3=new String(thirdQues.ques_EN.replace(/\n/g,'')+" & " + thirdQues.ques_AR.replace(/\n/g,''));
								if(index==0||index=="0"){
									YES3=new String(thirdQues.answer_EN +" & "+ thirdQues.answer_AR); 
								}
								else if(index==1||index=="1"){
									NO3=new String(thirdQues.answer_EN  +" & "+ thirdQues.answer_AR) ;
								}
							}
							COMMENT="-";
							var userComment=parseList[3];
							if(userComment){
								QUESTION4=new String(userComment.ques_EN);
								if(userComment.answer_EN)
									COMMENT=new String(userComment.answer_EN);
							}
						}}
					/*	return{
									DEVICE_ID:DEVICE_ID,USER_ID:USER_ID,CATEGORY:CATEGORY,FFROM:FFROM,TTO:TTO,VOTING_TIME:VOTING_TIME,
									QUESTION1:QUESTION1,YES1:YES1,NO1:NO1,QUESTION2:QUESTION2,YES2:YES2,NO2:NO2,QUESTION3:QUESTION3,
									YES3:YES3,NO3:NO3,QUESTION4:QUESTION4,COMMENT:COMMENT
								}*/

					/*result= MFP.Server.invokeSQLStatement({
									preparedStatement : DB_TABLES['PROPOSEDROUTE_REPORTING'].insertData,
									parameters : [CATEGORY ,USER_ID , QUESTION,ADDRESS_B ,ADDRESS_A ,DEVICE_ID ,ANSWER_D ,ANSWER_C ,ANSWER_B ,ANSWER_A,VOTING_DATE,LOCATION_A,LOCATION_B,VOTING_TIME,VOTINGID]
								});	*/

					result= MFP.Server.invokeSQLStatement({
						preparedStatement : DB_TABLES['PROPOSEDROUTE_REPORTING'].insertData,
						parameters : [DEVICEID,USERID,CATEGORY,FFROM,TTO,VOTINGTIME,QUESTION1,YES1,NO1,QUESTION2,YES2,NO2,QUESTION3,YES3,NO3,QUESTION4,COMMENT,VOTINGDATE]
					});	
				}
				
			}

		}
		/*return {
			list:list
		}
*/
	}
	catch(e){
		return{ result :e}
	}

}





function getReportData(days){
	if(!days)
		days=1;

	var currentDate=new Date();
	var startDate = new Date(currentDate.getTime() - days*(1000 * 60 * 60 * 24));

	var insertedList= MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['CSOURCING_REPORTING'].sqlALL,
		parameters : []
	});	
	return{
		reportList :insertedList
	}
}

function DeleteAll(){

	var deleted= MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['CSOURCING_REPORTING'].DeleteAll,
		parameters : []
	});	
	return{
		Delete :deleted
	}
}

function deletecCurrentReport(){

	var deleteProposed= MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['NEWROUTE_REPORTING'].DeleteAll,
		parameters : []
	});	
	var deleteNew= MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['PROPOSEDROUTE_REPORTING'].DeleteAll,
		parameters : []
	});

	return{
		deleteProposed :deleteProposed,
		deleteNew:deleteNew
	}
}
function getRepoertData(){

	var newReported= MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['NEWROUTE_REPORTING'].sqlALL,
		parameters : []
	});	

	var proposedReported= MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['PROPOSEDROUTE_REPORTING'].sqlALL,
		parameters : []
	});	
	return{
		newReported :newReported,
		proposedReported:proposedReported
	}
}

function getAllVotes(){
	var result = MFP.Server.invokeSQLStatement({
		preparedStatement : DB_TABLES['CSOURCING_VOTES'].generateSqlVotedRoutes ,
		parameters : []
	});	
	return {
		rst:result,
		getAllVotes:"getAllVotes"
	}
}
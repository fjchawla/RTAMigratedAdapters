var WSSE_USERNAME = MFP.Server.getPropertyValue("tokens.tipcoService.username");
var WSSE_PASSWORD = MFP.Server.getPropertyValue("tokens.tipcoService.password");

var USER_NAME = "Omnix_User";
//var PASSWORD = "test12345";
var PASSWORD = '555M55MM';

function getInstructorPermitDetails(trafficNO) {
	try {
		trafficNO = (MFP.Server.getAuthenticatedUser('masterAuthRealm') != undefined && MFP.Server.getAuthenticatedUser('masterAuthRealm') != null) ? MFP.Server.getAuthenticatedUser('masterAuthRealm').corporatesAttributes.trafficNo	: trafficNO;
	} catch (e) {
		// TODO: handle exception
	}
//	return {"inDueForRenewalCount":"11","isSuccessful":true,"permit":[{"auditingRequestStatus":"3","instructorName":{"instructorNameAr":"احمد خان غلاب خان","instructorNameEn":"AHMED KHAN GULAB KHAN"},"isReadyForRenewal":"2","permitCategory":{"permitCategoryDescAr":"مؤقت","permitCategoryDescEn":"TEMPORARY","permitCategoryId":"12"},"permitExpiryDate":"2015-02-05","permitId":"49437","permitIssueDate":"2014-02-05","permitNo":"48329","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10443805","trafficFileNo":"10443805","transactionId":"39865157"},{"auditingRequestStatus":"3","instructorName":{"instructorNameAr":"علي احمد احمد عمر","instructorNameEn":"ALI AHMED AHMED UMER"},"isReadyForRenewal":"2","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2014-06-05","permitId":"61193","permitIssueDate":"2007-01-01","permitNo":"446","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10079403","trafficFileNo":"10079403","transactionId":"39865386"},{"auditingRequestStatus":"1","instructorName":{"instructorNameAr":"تبسم خليل محمد خليل","instructorNameEn":"TABASSAM KHALIL MUHAMMAD KHALIL"},"isReadyForRenewal":"2","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2014-10-30","permitId":"62469","permitIssueDate":"2013-10-30","permitNo":"2435","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10568481","trafficFileNo":"10568481","transactionId":"39865301"},{"auditingRequestStatus":"1","instructorName":{"instructorNameAr":"اسلام بادشاه غازي مرجان","instructorNameEn":"ISLAM BAD SHAH GHAZI MARJAN"},"isReadyForRenewal":"2","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-03-13","permitId":"53323","permitIssueDate":"2007-01-01","permitNo":"309","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10269212","trafficFileNo":"10269212","transactionId":"39865292"},{"auditingRequestStatus":"1","instructorName":{"instructorNameAr":"محمد مسلم صفي محمد","instructorNameEn":"MOHAMMED MUSLIM SAFI MOHAMMED"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-03-13","permitId":"53322","permitIssueDate":"2014-03-13","permitNo":"53254","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10414744","trafficFileNo":"10414744","transactionId":"39865155"},{"auditingRequestStatus":"1","instructorName":{"instructorNameAr":"حسين محمد حسن بينوا","instructorNameEn":"HOUSSAIN BINAVA"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-03-04","permitId":"52186","permitIssueDate":"2007-01-01","permitNo":"362","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10254148","trafficFileNo":"10254148","transactionId":"39865166"},{"auditingRequestStatus":"1","instructorName":{"instructorNameAr":"خالق اقبال عجب نور","instructorNameEn":"KHALIQ IQBAL AJAB NOOR"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-03-13","permitId":"53332","permitIssueDate":"2007-01-01","permitNo":"690","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10718796","trafficFileNo":"10718796","transactionId":"39865353"},{"auditingRequestStatus":"1","instructorName":{"instructorNameAr":"رياض الدين شرف الدين","instructorNameEn":"RIAZUDDIN SHARFUDDIN"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-03-23","permitId":"54181","permitIssueDate":"2014-03-23","permitNo":"54345","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"86178877","trafficFileNo":"12010884","transactionId":"39865317"},{"auditingRequestStatus":"1","instructorName":{"instructorNameAr":"عمر فاروق محمد لال كريم","instructorNameEn":"UMAR FAROOQ MOHAMMAD LAL KARIM"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2014-12-15","permitId":"58721","permitIssueDate":"2007-01-01","permitNo":"716","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10646951","trafficFileNo":"10646951","transactionId":"39865295"},{"auditingRequestStatus":"1","instructorName":{"instructorNameAr":"صابر سعيد خان عاقل خان","instructorNameEn":"SABIR SAEED KHAN AQIL KHAN"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2016-02-16","permitId":"54903","permitIssueDate":"2007-01-01","permitNo":"327","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10236753","trafficFileNo":"10236753","transactionId":"39865107"},{"auditingRequestStatus":"1","instructorName":{"instructorNameAr":"توفيق فؤاد سرياني","instructorNameEn":"TOWFIC FOUAD SIRYANY"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2014-07-03","permitId":"63260","permitIssueDate":"2007-01-01","permitNo":"305","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10313223","trafficFileNo":"10313223","transactionId":"39865336"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"محمد دراز كل فراز","instructorNameEn":"MOHAMMAD DARAZ GUL FARAZ KHAN"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-05-18","permitId":"58484","permitIssueDate":"2007-01-01","permitNo":"479","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10184159","trafficFileNo":"10184159"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"فيلو كوتي راجان جي فيلو كوتي","instructorNameEn":"VELU KUTTY RAJAN G VELU KUTTY"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-04-09","permitId":"55604","permitIssueDate":"2014-04-09","permitNo":"56261","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10359992","trafficFileNo":"10359992"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"نعمه الله بلوش محمد","instructorNameEn":"NEHMAT ULLAH BALUCH MUHAMMAD"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-06-22","permitId":"60756","permitIssueDate":"2013-06-10","permitNo":"316","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10300774","trafficFileNo":"10300774"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"فريد خان سردار خان","instructorNameEn":"FARID KHAN SARDAR KHAN"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-08-20","permitId":"68774","permitIssueDate":"2012-08-26","permitNo":"382","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10128578","trafficFileNo":"10128578"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"محمد جاويد محمد صديق","instructorNameEn":"MOHAMMED JAWEED MOHAMMED SIDDIQ"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"مؤقت","permitCategoryDescEn":"TEMPORARY","permitCategoryId":"12"},"permitExpiryDate":"2015-02-01","permitId":"54912","permitIssueDate":"2007-01-01","permitNo":"55325","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10560683","trafficFileNo":"10560683"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"حسين بخش فريد عيسي","instructorNameEn":"HUSSAIN BAKHSH FARID ESSA"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-05-06","permitId":"57713","permitIssueDate":"2014-05-06","permitNo":"58637","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10419923","trafficFileNo":"10419923"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"نصرت عباس سيد فدا حسين شاه","instructorNameEn":"NUSRAT ABBAS SYED FIDA HUSSAIN SHAH"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-07-17","permitId":"58723","permitIssueDate":"2007-01-01","permitNo":"494","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10466878","trafficFileNo":"10466878"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"قاسم حيدر علي","instructorNameEn":"KASSIM HAYDER ALI"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-03-30","permitId":"54905","permitIssueDate":"2014-03-30","permitNo":"55333","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10703090","trafficFileNo":"10703090"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"انور سعيد نواب خان","instructorNameEn":"ANWAR SAEED NAWAB KHAN"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-08-20","permitId":"65461","permitIssueDate":"2013-07-28","permitNo":"355","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10040048","trafficFileNo":"10040048"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"ملنك شاه يار محمد","instructorNameEn":"MALANG SHAH YAR MOHAMMAD"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-05-18","permitId":"58483","permitIssueDate":"2014-05-18","permitNo":"59592","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10330613","trafficFileNo":"10330613"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"خاور حسين نديم صادق","instructorNameEn":"KHAWAR HUSSAIN NADEEM SADIQ"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-08-07","permitId":"61198","permitIssueDate":"2007-01-01","permitNo":"67","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10498369","trafficFileNo":"10498369"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"ابوبكر بن عمر بالحوال","instructorNameEn":"ABUBAKER BIN OMER BALAHAWAL"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-07-10","permitId":"50040","permitIssueDate":"2014-02-13","permitNo":"49036","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10265655","trafficFileNo":"10265655"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"نغمانه شيخ ظفر شيخ ظفر امين","instructorNameEn":"NAGHMANA SHEIKH ZAFAR SHEIKH ZAFAR AMIN"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-06-22","permitId":"60736","permitIssueDate":"2013-06-10","permitNo":"2333","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"86947601","trafficFileNo":"12488562"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"عبدالشكور نادر شاه","instructorNameEn":"ABDUL SHUKKOR NADIR SHA"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-06-26","permitId":"61194","permitIssueDate":"2007-01-01","permitNo":"635","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10595836","trafficFileNo":"10595836"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"وسيم اقبال محمد اقبال","instructorNameEn":"WASEEM IQBAL MOHAMMED IQBAL"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-04-30","permitId":"57189","permitIssueDate":"2007-01-01","permitNo":"326","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10311527","trafficFileNo":"10311527"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"شهانه بيكم منظور الحسن","instructorNameEn":"SHAHANA BEGUM MANZOOR HASSAN"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-08-20","permitId":"68768","permitIssueDate":"2007-01-01","permitNo":"254","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10144432","trafficFileNo":"10144432"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"نازي خان رضا خان","instructorNameEn":"NAZI KHAN RAZA KHAN"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-05-26","permitId":"58898","permitIssueDate":"2013-11-24","permitNo":"370","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10157911","trafficFileNo":"10157911"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"نور نبي خان جاتوي","instructorNameEn":"NOOR NABI KHAN"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-05-26","permitId":"58897","permitIssueDate":"2007-01-01","permitNo":"361","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10201744","trafficFileNo":"10201744"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"روجر سهيل عالم","instructorNameEn":"ROGER SUHAIL ALAM"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-07-10","permitId":"62449","permitIssueDate":"2013-06-18","permitNo":"395","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10304262","trafficFileNo":"10304262"},{"auditingRequestStatus":"0","instructorName":{"instructorNameAr":"طاهر محمود محمد افسر","instructorNameEn":"TAHIR MEHMOOD MUHAMMAD AFSAR"},"isReadyForRenewal":"1","permitCategory":{"permitCategoryDescAr":"دائم","permitCategoryDescEn":"PERMANENT","permitCategoryId":"11"},"permitExpiryDate":"2015-07-17","permitId":"58512","permitIssueDate":"2014-05-18","permitNo":"59575","permitType":{"permitTypeCode":"11","permitTypeDescAr":"تصريح مدرب قيادة","permitTypeDescEn":"Instructor Permit"},"trafficFileId":"10596243","trafficFileNo":"10596243"}],"sponsorNameAr":"شركة وهمية للاختبار فقط93394","sponsorNameEn":"Organization info for testing only93394","sponsorTrafficFileId":"86083388","sponsorTrafficFileNo":"50095686","totalPermitsCount":"31"};
	var soapActionHeader = '"getInstructorPermitDetails"';
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/GetInstructorPermitDetailsServiceSchema/XMLSchema">\
		   <soapenv:Header>\
    <xs:ExternalUser>\
       <xs:externalUsername>'+USER_NAME+'</xs:externalUsername>\
       <xs:externalUserPassword>'+PASSWORD+'</xs:externalUserPassword>\
    </xs:ExternalUser>\
       <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
       <wsse:UsernameToken>\
          <wsse:Username>'+WSSE_USERNAME+'</wsse:Username>\
          <wsse:Password>'+WSSE_PASSWORD+'</wsse:Password>\
       </wsse:UsernameToken>\
    </wsse:Security>\
 </soapenv:Header>\
 <soapenv:Body>\
    <xs:getInstructorPermitDetailsRequest>\
       <xs:trafficNo>'+trafficNO+'</xs:trafficNo>\
    </xs:getInstructorPermitDetailsRequest>\
 </soapenv:Body>\
</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'getinstructorpermitdetailsservice';
	var input = {
			method : 'POST',
			returnedContentType : 'xml',
			headers : {'SOAPAction' : soapActionHeader},
			path : path,
			body : {
				content : transactionString.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
	};


	var response = MFP.Server.invokeHttp(input);
	
	if(response.Envelope.Body.getInstructorPermitDetailsResponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 510,
			message : "An error has occured in Getting instructor permit Details. Kindly try again",
			reference : response
		};
	}
	if(response.Envelope.Body.getInstructorPermitDetailsResponse.response.responseCode !="0" ){
		return {
			isSuccessful : false,
			errorCode : 510,
			message : "Provided information are not correct",
			responseCode : response.Envelope.Body.getInstructorPermitDetailsResponse.response.responseCode,
			responseMessageAr : response.Envelope.Body.getInstructorPermitDetailsResponse.response.responseMessageAr,
			responseMessageEn : response.Envelope.Body.getInstructorPermitDetailsResponse.response.responseMessageEn,
			reference : response
		};
	}	
	
		if(response.Envelope.Body.getInstructorPermitDetailsResponse.permitDetails == undefined){
			return {
				isSuccessful : false,
				errorCode : 510,
				message : "An error has occured in Getting instructor permit Details. Kindly try again.",
				reference : response
			};
		}
	
	var response = MFP.Server.invokeHttp(input);
	MFP.Logger.info(response);
	return response.Envelope.Body.getInstructorPermitDetailsResponse.permitDetails;
}

function getInsLecPermitDetails(permitNo){
	var soapActionHeader = '"getInsLecPermitDetails"';
	var transactionString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.rta.ae/ActiveMatrix/ESB/GetInstructorPermitDetailsServiceSchema/XMLSchema">\
		   <soapenv:Header>\
	    <xs:ExternalUser>\
	       <xs:externalUsername>'+USER_NAME+'</xs:externalUsername>\
	       <xs:externalUserPassword>'+PASSWORD+'</xs:externalUserPassword>\
	    </xs:ExternalUser>\
	       <wsse:Security soapenv:mustUnderstand="0" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:sch="http://schemas.xmlsoap.org/soap/envelope/">\
	       <wsse:UsernameToken>\
	          <wsse:Username>'+WSSE_USERNAME+'</wsse:Username>\
	          <wsse:Password>'+WSSE_PASSWORD+'</wsse:Password>\
	       </wsse:UsernameToken>\
	    </wsse:Security>\
	 </soapenv:Header>\
 <soapenv:Body>\
    <xs:getInsLecPermitDetailsRequest>\
       <xs:permitNo>'+permitNo+'</xs:permitNo>\
    </xs:getInsLecPermitDetailsRequest>\
 </soapenv:Body>\
</soapenv:Envelope>';

	MFP.Logger.info(transactionString);
	var path = 'getinstructorpermitdetailsservice';
	var input = {
			method : 'POST',
			returnedContentType : 'xml',
			headers : {'SOAPAction' : soapActionHeader},
			path : path,
			body : {
				content : transactionString.toString(),
				contentType : 'text/xml; charset=utf-8'
			}
	};


	var response = MFP.Server.invokeHttp(input);
	
	if(response.Envelope.Body.getInsLecPermitDetailsResponse == undefined){
		return {
			isSuccessful : false,
			errorCode : 510,
			message : "An error has occured in Getting instructor permit Details. Kindly try again",
			reference : response
		};
	}
	if(response.Envelope.Body.getInsLecPermitDetailsResponse.response.responseCode !="0" ){
		return {
			isSuccessful : false,
			errorCode : 510,
			message : "Provided information are not correct",
			responseCode : response.Envelope.Body.getInsLecPermitDetailsResponse.response.responseCode,
			responseMessageAr : response.Envelope.Body.getInsLecPermitDetailsResponse.response.responseMessageAr,
			responseMessageEn : response.Envelope.Body.getInsLecPermitDetailsResponse.response.responseMessageEn,
			reference : response
		};
	}	
	
		if(response.Envelope.Body.getInsLecPermitDetailsResponse.permitInfo == undefined){
			return {
				isSuccessful : false,
				errorCode : 510,
				message : "An error has occured in Getting instructor permit Details. Kindly try again.",
				reference : response
			};
		}
	
	var response = MFP.Server.invokeHttp(input);
	return response.Envelope.Body.getInsLecPermitDetailsResponse.permitInfo;
}

function getMpermit(permitNo){
	try {
		var permitDetails = getInsLecPermitDetails(permitNo);
		if (permitDetails.isSuccessful == false) {
			return permitDetails;
		}
		var html = com.proxymit.wl.utils.ResourceLoader
				.loadResource('conf/corporates/Instarctor_permit.html');
		//light vehicle
		if (permitDetails.lightVehicle == "1"
				|| permitDetails.vehiclePermitted.indexOf("2") != "-1") {
			html = html.replace('##1##', '<img src="images/checked.gif" />');
		} else {
			html = html.replace('##1##', '<img src="images/unchecked.gif" />');
		}
		//light bus
		if (permitDetails.lightBus == "1"
				|| permitDetails.vehiclePermitted.indexOf("4") != "-1") {
			html = html.replace('##2##', '<img src="images/checked.gif" />');
		} else {
			html = html.replace('##2##', '<img src="images/unchecked.gif" />');
		}
		//L.M EQ
		if (permitDetails.lMEquipment == "1"
				|| permitDetails.vehiclePermitted.indexOf("6") != "-1") {
			html = html.replace('##3##', '<img src="images/checked.gif" />');
		} else {
			html = html.replace('##3##', '<img src="images/unchecked.gif" />');
		}
		//Auto gear only
		if (permitDetails.automaticGearOnly == "1"
				|| permitDetails.vehiclePermitted.indexOf("8") != "-1") {
			html = html.replace('##4##', '<img src="images/checked.gif" />');
		} else {
			html = html.replace('##4##', '<img src="images/unchecked.gif" />');
		}
		//desert driving
		if (permitDetails.desertDriving == "1"
				|| permitDetails.vehiclePermitted.indexOf("10") != "-1") {
			html = html.replace('##5##', '<img src="images/checked.gif" />');
		} else {
			html = html.replace('##5##', '<img src="images/unchecked.gif" />');
		}
		//motor cycle
		if (permitDetails.motorcycle == "1"
				|| permitDetails.vehiclePermitted.indexOf("1") != "-1") {
			html = html.replace('##6##', '<img src="images/checked.gif" />');
		} else {
			html = html.replace('##6##', '<img src="images/unchecked.gif" />');
		}
		//heavy vehicle
		if (permitDetails.heavyVehicle == "1"
				|| permitDetails.vehiclePermitted.indexOf("3") != "-1") {
			html = html.replace('##7##', '<img src="images/checked.gif" />');
		} else {
			html = html.replace('##7##', '<img src="images/unchecked.gif" />');
		}
		//heavy bus
		if (permitDetails.heavyBus == "1"
				|| permitDetails.vehiclePermitted.indexOf("5") != "-1") {
			html = html.replace('##8##', '<img src="images/checked.gif" />');
		} else {
			html = html.replace('##8##', '<img src="images/unchecked.gif" />');
		}
		//H.M EQ
		if (permitDetails.hMEquipment == "1"
				|| permitDetails.vehiclePermitted.indexOf("7") != "-1") {
			html = html.replace('##9##', '<img src="images/checked.gif" />');
		} else {
			html = html.replace('##9##', '<img src="images/unchecked.gif" />');
		}
		//Quade Bike
		if (permitDetails.quadBike == "1"
				|| permitDetails.vehiclePermitted.indexOf("9") != "-1") {
			html = html.replace('##10##', '<img src="images/checked.gif" />');
		} else {
			html = html.replace('##10##', '<img src="images/unchecked.gif" />');
		}
		html = html.replace('##nameAr##',
				_reverseTextIfArabic(permitDetails.nameAr)).replace(
				'##nameEn##', permitDetails.nameEn).replace(
				'##nationalityEn##', permitDetails.nationalityEn).replace(
				'##nationalityAr##',
				_reverseTextIfArabic(permitDetails.nationalityAr)).replace(
				'##institutionEn##', permitDetails.instituteNameEn).replace(
				'##institutionAr##',
				_reverseTextIfArabic(permitDetails.instituteNameAr)).replace(
				'##issueDate##', permitDetails.permitIssueDate).replace(
				'##expiryDate##', permitDetails.permitExpiryDate).replace(
				'##vehiclePerm##', permitDetails.vehiclePermitted);
		var remarksAr = permitDetails.remarksAr != undefined ? permitDetails.remarksAr
				: "";
		var remarksEn = permitDetails.remarksEn != undefined ? permitDetails.remarksEn
				: "";
		var htmlRemarks = '<tr><td>Remarks: ' + remarksEn
				+ '</td>\
		<td align="right" style="direction: rtl;">'
				+ _reverseTextIfArabic(remarksAr) + ' : ﺕﺎﻈﺣﻼﻣ</td></tr>';
		html = html.replace('##remarks##', htmlRemarks);
		if (permitDetails.assessmentType != undefined) {
			html = html.replace('##assessmentType##',
					permitDetails.assessmentType);
		} else {
			html = html.replace('##assessmentType##', "-");
		}
		if (permitDetails.permitNo != undefined) {
			permitNoHtml = '<tr>\
			<td>\
				<table border="0" width="100%">\
					<tr>\
						<td width="33.3333%"><strong>Permit No: </strong></td>\
						<td width="33.3333%" style="float:left; text-align:center;"><span>'
					+ permitDetails.permitNo
					+ '</span></td>\
						<td width="33.3333%" style="text-align:right; direction: rtl;"><strong> : ﺢﻳﺮﺼﺘﻟﺍ ﻢﻗﺭ</strong></td>\
					</tr>\
				</table>\
			</td>\
		</tr>';
			if (permitDetails.permitTypeCode != undefined
					&& permitDetails.permitTypeCode == "12") {
				html = html.replace('##permitNo##', permitNoHtml);
				html = html.replace('##permitTypeAr##', "ﺮﺿﺎﺤﻣ ﺢﻳﺮﺼﺗ");
				html = html.replace('##permitTypeEn##', "Lecturer Permit");
			}
			if (permitDetails.permitTypeCode != undefined
					&& permitDetails.permitTypeCode == "11") {
				html = html.replace('##permitNo2##', permitDetails.permitNo);
				html = html.replace('##permitTypeAr##', "ﺏﺭﺪﻣ ﺢﻳﺮﺼﺗ");
				html = html.replace('##permitTypeEn##', "Instructor Permit");
			} else {
				html = html.replace('##permitNo2##', "");
			}
		}
		if (permitDetails.permitTypeCode != undefined
				&& permitDetails.permitTypeCode == "11") {
			html = html
					.replace("##instructions##", '<img src="images/permit11.png"/>');
		}
		if (permitDetails.permitTypeCode != undefined
				&& permitDetails.permitTypeCode == "12") {
			html = html
					.replace("##instructions##", '<img src="images/permit12.png"/>');
		}
			var imgName = null;
			if (permitDetails.personPicture == undefined) {
				html = html.replace("##image##", 'images/user.png');
			} else {
//				var imgName = com.proxymit.pdf.utils.ImageUtils
//						.createImageFromBase64(permitDetails.personPicture,
//								"/home/mohamed-ali-grissa/RTA_Workspace/2014_omnix_rta/server/conf/corporates/images/");
				// SIT & UAT
				var imgName = com.proxymit.pdf.utils.ImageUtils
				.createImageFromBase64(permitDetails.personPicture,
						"D:/smartgov/cms/corpsrvc/servers_res/images/");
				html = html.replace("##image##", 'images/'+imgName);
			}
			MFP.Logger.warn(html);
//		var base64ImageString = com.proxymit.pdf.utils.HtmlToPDF
//				.convertWithImg(html,
//						"/home/mohamed-ali-grissa/RTA_Workspace/2014_omnix_rta/server/conf/corporates/");
			var base64ImageString =  com.proxymit.pdf.utils.HtmlToPDF.convertWithImg(html, "D:/smartgov/cms/corpsrvc/servers_res/");
		base64ImageString = com.proxymit.pdf.utils.PDFToImage
				.convertPDFToImage(base64ImageString);
			if(imgName != null){
//				com.proxymit.pdf.utils.ImageUtils.deleteImage("/home/mohamed-ali-grissa/RTA_Workspace/2014_omnix_rta/server/conf/corporates/images/"+imgName);
				// SIT & UAT
				com.proxymit.pdf.utils.ImageUtils.deleteImage("D:/smartgov/cms/corpsrvc/servers_res/images/"+imgName);
			}
		return {
			data : base64ImageString,
			extension : "jpg"
		};
	} catch (e) {
		return {
			isSuccessful : false,
			error : e,
			extension : "jpg"
		};
	}
}

function _reverseTextIfArabic(input) {
	return com.proxymit.pdf.utils.HtmlToPDF.reverseIfArabic(input);
}

function getInstructorPermitDetailsFiltred(trafficFileNo, appRefNo, startDate, endDate){
	var getInstructorPermitDetailsResponse = getInstructorPermitDetails(trafficFileNo);
	if(getInstructorPermitDetailsResponse.isSuccessful == false){
		return getInstructorPermitDetailsResponse;
	}
	var applications = getInstructorPermitDetailsResponse.permit;
	applications = Array.isArray(applications) ? applications : [applications];
				
	var applicationsFiltred = [];
	if(applications.length > 0){
		for(i in applications){
			
			applicationDate = applications[i].permitIssueDate ;
			var isAppRefNo = appRefNo != "" ? applications[i].transactionId == appRefNo : true ;
			var isBigThanStartDate = startDate != "" && applicationDate != "" ? _date2isGreater(startDate, applicationDate) : true ;
			var isLessThanEndDate = endDate != "" && applicationDate != "" ? _date2isGreater(applicationDate, endDate) : true ;

			if(isAppRefNo && isBigThanStartDate && isLessThanEndDate){

				delete applications[i]["emirateId"];
				delete applications[i]["emirateIdExpiryDate"];
				delete applications[i]["isReadyForRenewal"];
				delete applications[i]["instructorName"];
				
				applicationsFiltred.push(applications[i]);
				if(applications[i].transactionId == appRefNo) break;
			}
		}
	}
	
	return {
		isSuccessful : true,
		permit : applicationsFiltred
	};
}

function _isEqual(v1, v2){
	return v1 == v2 ? 0 : ( v1 > v2 ? 1 : 2 ) ;
}

function _date2isGreater(dateStr1, dateStr2){
	var date1 = dateStr1.split(/[-]/);
	var date2 = dateStr2.split(/[-]/);
	
	yearDiff = _isEqual(date1[0], date2[0]);
	monthDiff = _isEqual(date1[1], date2[1]);
	dayDiff = _isEqual(date1[2], date2[2]);
	
	return (yearDiff == 2) || (yearDiff == 0 && monthDiff == 2) || (yearDiff == 0 && monthDiff == 0 && dayDiff == 2);
}


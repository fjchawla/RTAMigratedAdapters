
var DB_TABLES = {
		'APP_CONFIG' : {
			sqlGet: 'SELECT VALUE FROM APP_CONFIG WHERE KEY=?'

		}
}

function getConfigValue(key){
	if(key){
		var result=MFP.Server.invokeSQLStatement({
			preparedStatement :DB_TABLES['APP_CONFIG'].sqlGet ,
			parameters : [key]
		});
		if (result&&result.resultSet.length>0 && result.isSuccessful)
		{
			return {Value:result.resultSet[0].VALUE};
		}
	}
	return {Value:"Invalid Key"};
}
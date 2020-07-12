/**
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */
function getLocations(address, language) {
	
	var options = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : '/maps/api/geocode/json',
	    parameters : {"address":address, "language":language, "components":"country:AE"}
	};
	
	var data = MFP.Server.invokeHttp(options);
	var result = {};
	for(i in data.results) {
		result[data.results[i]['geometry']['location']['lat']+';'+data.results[i]['geometry']['location']['lng']] = data.results[i]['formatted_address'];
	}
	return {results:result};
}
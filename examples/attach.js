/* Uploads any filetype as attachment to a couchdb server instance
 * This Protocol depends on axios for the first instance to upload 
 * resources to document existing on a couchdb database  
 * Parameter fileData is a JSON data object that must have the following 
 * keys and value types: 
 * docid: String => the _id of the document to be updated
 * file: Object  => the uploaded file formdata
 * 
 * Procedure 
 * A resource url is constructed from the fileData object 
 * axios fetches the document at the url endpoint with a GET request 
 * the current revision id is extracted from the document 
 * a new resource url and a request header object is created 
 * axios sends the uploaded file to the new url along with the request headers
 * if all goes well a SUCCESS flag is returned, errors are logged to the console.
 *
 *
 * */

let axios = require('axios')

async uploadAnyFileUpdate (fileData) {
	
	// Configure Resource
	
	let docId = fileData.docid;
	let url = `http://${location.hostname}:5984/DATABASE/${doc_id}`;

	//Verify document Validity & Rerieve document revision
	
	axios.get(url).then(firstResponse => {

		// Configure Payload

		let revision = firstResponse.data._rev;
		let resourceUrl = `${url}/${fileData.file.name}?rev=${revision}`;
		let headers = { 'Content-Type': fileData.file.type }

		// Upload File and Update document
		
		axios.put(resourceUrl, fileData.file, { headers: headers })
			.then( response => {
			// context.commit('MUTATION', response.data)
			console.log('SUCCESS')
			})
			.catch( error => { console.error( error.message ) })

	}).catch(error => { console.error( error.message ) })
	
}

export default uploadAnyFileUpdate; 

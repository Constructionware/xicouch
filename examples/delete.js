/* Deletes a documents from a couchdb server instance
 * This Protocol depends on axios 
 *
 * Parameter doc_id 
 * keys and value types: 
 * docid: String => the _id of the document to be deleted
 *  
 * Procedure 
 * A resource url is constructed from the doc_id object 
 * axios fetches the document at the url endpoint with a GET request 
 * the current revision id is extracted from the document 
 * a new resource url and a request header object is created 
 * axios sends a request to couchdb to delete document with doc_id and revision 
 * if all goes well a SUCCESS flag is returned, errors are logged to the console.
 *
 *
 * */

let axios = require('axios')

async deleteDocument (doc_id) {
	
	// Configure Resource
	let url = `http://${location.hostname}:5984/DATABASE/${doc_id}`;

	//Verify document Validity & Rerieve document revision
	
	axios.get(url).then(firstResponse => {

		// Configure Payload

		let revision = firstResponse.data._rev;
		let resourceUrl = `${url}/?rev=${revision}`;
		
		// Delete document
		
		axios.delete(resourceUrl)
			.then( response => {
			// context.commit('MUTATION', response.data)
			console.log('SUCCESS')
			})
			.catch( error => { console.error( error.message ) })

	}).catch(error => { console.error( error.message ) })
	
}

export default deleteDocument; 

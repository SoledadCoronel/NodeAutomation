import Chai from 'chai';
import Random from 'random-js';

class Request {

	constructor() {
		this.chai = Chai;
    }

    get(url, token) {
    	return this.request(url, 'get', {}, token);
	}

    post(url, body, token) {
    	return this.request(url, 'post', body, token);
	}

	patch(url, body, token) {
    	return this.request(url, 'patch', body, token);
	}

	delete(url, body = null, token) {
		return this.request(url, 'delete', body, token);
	}

	request(url, method = 'get', body = {}, token) {
		return this.chai.request('http://api.cd.gointegro.net')
			[method](url)
			.set('content-type', 'application/vnd.api+json')
			.set('Accept', 'application/vnd.api+json')
			.set('Authorization', 'Bearer ' + token)
			.send(body)
			.then((response) => response.body)
			.catch((error) => {
				return {
					errors: error.response.body.errors
				}
			});
	}

}

export default Request;

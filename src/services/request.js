import Chai from 'chai';
import Random from 'random-js';
import Response from './response';
import { session } from './session';

class Request {

	constructor() {
		this.chai = Chai;
    }

    get(url) {
    	return this.request(url, 'get');
	}

    post(url, body) {
    	return this.request(url, 'post', body);
	}

	patch(url, body) {
    	return this.request(url, 'patch', body);
	}

	delete(url, body = null) {
		return this.request(url, 'delete', body);
	}

	request(url, method = 'get', body = {}, token) {
		return this.chai.request('http://api.cd.gointegro.net')
			[method](url)
			.set('content-type', 'application/vnd.api+json')
			.set('Accept', 'application/vnd.api+json')
			.set('Authorization', 'Bearer ' + session.token())
			.send(body)
			.then((response) => {
				return new Response(response.statusCode, response.body);
			})
			.catch((error) => {
				return new Response(error.response.statusCode, null, error.response.body.errors);
			});
	}

}

export default Request;

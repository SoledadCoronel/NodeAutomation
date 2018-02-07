import Chai from 'chai';
import Random from 'random-js';
import Response from './response';
import { session } from './session';

// SE COMUNICA CON EL MODELO

class Request {

	constructor(baseUrl = 'http://api.cd.gointegro.net') {
		this.chai = Chai;
		this.baseUrl = baseUrl;
    }
    getBaseUrl() {
    	return this.baseUrl;
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

	request(path, method = 'get', body = {}) {
		let credentials = session.getCredentials();
		let token = session.token();

		let chaiRequest = this.chai.request(this.getBaseUrl())
			[method](path)
			.set('content-type', 'application/vnd.api+json')
			.set('Accept', 'application/vnd.api+json');

		if (token) {
			chaiRequest.set('Authorization', 'Bearer ' + token);
		} else if (credentials) {
			chaiRequest.set('HTTP-X-GO5-PLATFORM-ID', credentials.platformId);
			chaiRequest.set('HTTP-X-GO5-USER-ID', credentials.userId);
		}

		return chaiRequest.send(body)
		.then((response) => {
			return new Response(response.statusCode, response.body);
		})
		.catch((error) => {
			return new Response(error.response.statusCode, null, error.response.body.errors);
		});
	}
}

export default Request;

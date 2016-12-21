// FIXME
var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiHttp);
chai.use(chaiColors);

class Request {

	constructor (data = {}) {
		this.chai = chai;
    }

    post(url, body, token) {
    	return this.chai.request('http://api.cd.gointegro.net')
			.post(url)
			.set('content-type', 'application/vnd.api+json')
			.set('Accept', 'application/vnd.api+json')
			.set('Authorization', 'Bearer ' + token)
			.send(body)
			.then((request, response) => {
				return request.body;
			})
			.catch((error) => {
				return {
					errors: error.response.body.errors
				}
			});
	}
}

export default Request;

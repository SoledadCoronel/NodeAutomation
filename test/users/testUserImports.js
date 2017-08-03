import UserImports from './../../src/models/userImports';

var jsonData = require('./../fixtures/data.json');

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");
var random = new Random();
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiHttp);
chai.use(chaiColors);

// variables utilizadas en los tests

var currentUserImport; 

// comienzo de la suite
describe('SUITE - HASHTAG - PRIVATE SPACE', function() {


it('case 1: Creates un new user import - supervisor inválido', function(done) {

	var data = JSON.stringify({
	  "data": {
	    "type": "user-imports",
	    "attributes": {
	      "payload": {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"marta.perez@gointegro.com", 
	    	"supervisor_email":"jorge.motumbo@gointegro.com",
	    	"birthdate": "2000-11-15",
	    	"groups":""
	    	}
	    }
	  }
	});

	chai.request('http://users-ms.cd.gointegro.net')
	.post('/user-imports')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('HTTP-X-GO5-PLATFORM-ID', jsonData.currentPlatform.id)
	.set('HTTP-X-GO5-USER-ID', jsonData.adminUserId)
	.send(data)
	.end(function(err, res) {
		expect(res).to.have.status(400);
	done();
	});
});

it('case 2: Creates un new user import - datos válidos', function(done) {

	var data = {
	  "data": {
	    "type": "user-imports",
	    "attributes": {
	      "payload": JSON.stringify({
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"marta.perez@gointegro.com", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2000-11-15",
	    	"groups":""
	    	})
	    }
	  }
	};

	chai.request('http://users-ms.cd.gointegro.net')
	.post('/user-imports')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('HTTP-X-GO5-PLATFORM-ID', jsonData.currentPlatform.id)
	.set('HTTP-X-GO5-USER-ID', jsonData.adminUserId)
	.send(data)
	.end(function(err, res) {
		expect(res).to.have.status(201);
		console.log(JSON.stringify(res, null, 2));
	done();
	});
});

it('case 3: Creates un new user import - usuario existente', function(done) {

	var data = {
	  "data": {s
	    "type": "user-imports",
	    "attributes": {
	      "payload": JSON.stringify({
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"marta.perez@gointegro.com", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2000-11-15",
	    	"groups":""
	    	})
	    }
	  }
	};

	chai.request('http://users-ms.cd.gointegro.net')
	.post('/user-imports')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('HTTP-X-GO5-PLATFORM-ID', jsonData.currentPlatform.id)
	.set('HTTP-X-GO5-USER-ID', jsonData.adminUserId)
	.send(data)
	.end(function(err, res) {
		expect(res).to.have.status(200);
	done();
	});
	});
});

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
		expect(res).to.have.status(200);
	done();
	});
});


/*it('Caso 4: Basic user joins himself to public space', function(done) {
		var data = {"data": [{"type": "users","id": jsonData.basicUser.id}]}
		chai.request('http://api.cd.gointegro.net')
		.post('/spaces/' + publicSpace.id + '/relationships/members')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + jsonData.basicToken)
		.send(data)
		.end(function(err, res) {
			expect(res).to.have.status(204);
		done();
		});
	});*/

/*it('case 1: Creates un new user import - user existente', function(done) {

	let userImport1 = new UserImports({
		first_name: 'name01',
		last_name: 'lastName01',
		email: 'email01@gointegro.com',
		supervisor_email: jsonData.adminSpaceUser.email,
		birthdate: '1990-09-25',
		groups: ''
	});
	userImport1.create()
	.then((response) => {
		response.should.have.status('201');
		userImport1 = response.content;
		currentUserImport = userImport1;
		done();

	});
});

it('case 1: Creates un new user import - supervisor inválido', function(done) {

	let userImport1 = new UserImports({
		first_name: 'name01',
		last_name: 'lastName01',
		email: 'email01@gointegro.com',
		supervisor_email: 'email02@gointegro.com',
		birthdate: '1990-09-25',
		groups: ''
	});
	userImport1.create()
	.then((response) => {
		response.should.have.status('201');
		userImport1 = response.content;
		currentUserImport = userImport1;
		done();
		});
	});

it('case 1: Creates un new user import - fecha nacimiento inválida', function(done) {

	let userImport1 = new UserImports({
		first_name: 'name01',
		last_name: 'lastName01',
		email: 'email01@gointegro.com',
		supervisor_email: 'email02@gointegro.com',
		birthdate: '2020-09-25',
		groups: ''
	});
	userImport1.create()
	.then((response) => {
		response.should.have.status('201');
		userImport1 = response.content;
		currentUserImport = userImport1;
		done();
		});
	});*/


});

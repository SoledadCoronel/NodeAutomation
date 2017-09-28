import { session } from './../../src/services/session';

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

var currentId = null;

describe('SUITE - USERS - USER JOBS', function() {

/*it('Caso 1: validate csv file', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.post('/user-jobs')
	.set('Content-Type', 'multipart/form-data')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.attach('resource', 'test/users/files/users.csv')
	.end(function(err, res) {
		res.should.have.status(201);
		assert.include(res.text, '\"count-rows\":3', 'string contains substring');
		console.log(JSON.stringify(res.text, null, 2));
		done();
	});
});

it('Caso 2: validate csv file - without email', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.post('/user-jobs')
	.set('Content-Type', 'multipart/form-data')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.attach('resource', 'test/users/files/users_error.csv')
	.end(function(err, res) {
		res.should.have.status(400);
		assert.include(res.text, 'BULK_INVALID_FORMAT', 'string contains substring');
		done();
	});
});

it('Caso 3: validate csv file - empty file', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.post('/user-jobs')
	.set('Content-Type', 'multipart/form-data')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.attach('resource', 'test/users/files/users_vacio.csv')
	.end(function(err, res) {
		res.should.have.status(400);
		assert.include(res.text, 'BULK_INVALID_FILE', 'string contains substring');
		done();
	});
});*/

//JSON.stringify(data.payload);

it('Caso 4: Import a user list', function(done) {
	var body = {
  	"data": {
    	"type": "user-jobs",
    	"id": "1512dff6-0c69-456f-b9df-3433324a351e",
    	"attributes": {
      		"status": "processing"
    	},
    	"relationships": {
      	"author": {
        	"data": {
          	"id": "5970",
          	"type": "users"
        	}
      	},
      	"validated-file": {
        	"data": {
          	"id": "384be1fc2f3a3a4e0bcb12e58e0d40ff15c210d8",
          	"type": "files"
        	}
   	  	}
    }
  	}
	}
	chai.request('http://api.cd.gointegro.net')
	.patch('/user-jobs/' + '6fdf92ff-6234-49ba-a357-c297fde904a2')
	.set('Content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.attach('resource', 'test/users/files/users_vacio.csv')
	.end(function(err, res) {
		console.log(JSON.stringify(res, null, 2));
		done();
	});
});

});
import { session } from './../../src/services/session';

var jsonData = require('./../fixtures/data.json');

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");
var random = new Random();
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;
//var sleep = require('system-sleep');

chai.use(chaiHttp);
chai.use(chaiColors);

var currentId = null;
var currentUserId = null; 
var currentFileId = null;
var currentErrorURL = null;
var currentErrorURL1 = null;

describe('SUITE - USERS - USER JOBS', function() {

it('Caso 1: validate csv file', function(done) {

	chai.request('http://api.cd.gointegro.net')
	.post('/user-jobs')
	.set('Content-Type', 'multipart/form-data')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.attach('resource', 'test/users/files/users.csv')
	.end(function(err, res) {
		res.should.have.status(201);
		expect(res.body.data.attributes['count-rows']).to.equal(3);
		expect(res.body.data.attributes.status).to.equal("validated");
		currentId = res.body.data.id;
		currentUserId = res.body.data.relationships.author.data.id;
		//currentFileId = res.body.data.relationships['validated-file'].data.id;
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
		res.body.errors[0].code.should.be.eql("BULK_INVALID_FORMAT");
		//console.log(JSON.stringify(err, null, 2));
		currentErrorURL = res.body.meta['errors-url'];
		done();
	});
});

it('Caso 3: Gets errors file', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.post('/user-jobs/processed-files/' + currentErrorURL)
	.type('form')
	.send('access_token=' + jsonData.adminToken)
	.end(function(err, res) {
		//console.log(res);
		res.should.have.status(200);
		assert.include(res.text, 'cannot be empty', 'string contains substring');
		done();
	});
});

it('Caso 4: validate csv file - empty file', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.post('/user-jobs')
	.set('Content-Type', 'multipart/form-data')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.attach('resource', 'test/users/files/users_vacio.csv')
	.end(function(err, res) {
		res.should.have.status(400);
		res.body.errors[0].code.should.be.eql("BULK_INVALID_FILE");
		done();
	});
});

it('Caso 5: validate csv file - without lastname', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.post('/user-jobs')
	.set('Content-Type', 'multipart/form-data')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.attach('resource', 'test/users/files/users_error2.csv')
	.end(function(err, res) {
		res.should.have.status(400);
		res.body.errors[0].code.should.be.eql("BULK_INVALID_FORMAT");
		currentErrorURL1 = res.body.meta['errors-url'];
		done();
	});
});

it('Caso 6: Gets errors file', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.post('/user-jobs/processed-files/' + currentErrorURL1)
	.type('form')
	.send('access_token=' + jsonData.adminToken)
	.end(function(err, res) {
		res.should.have.status(200);
		assert.include(res.text, 'cannot be empty', 'string contains substring');
		done();
	});
});

it('Caso 7: validate csv file - file without csv extension', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.post('/user-jobs')
	.set('Content-Type', 'multipart/form-data')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.attach('resource', 'test/users/files/users.xls')
	.end(function(err, res) {
		res.should.have.status(400);
		res.body.errors[0].code.should.be.eql("BULK_INVALID_FORMAT");
		done();
	});
});

it('Caso 8: Import a user list', function(done) {
	var body = {
		"data": {
			"type": "user-jobs",
			"id": currentId,
			"attributes": {
				"status": "processing"
			},
			"relationships": {
				"author": {
					"data": {
						"id": currentUserId,
						"type": "users"
					}
				},
				"validated-file": {
					"data": {
						"id": currentFileId,
						"type": "files"
					}
				}
			}
		}
	}
	chai.request('http://api.cd.gointegro.net')
	.patch('/user-jobs/' + currentId)
	.set('Content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.send(body)
	.end(function(err, res) {
		res.should.have.status(200);
		expect(res.body.data.attributes.status).to.equal("processing");
		expect(res.body.data.attributes['count-rows']).to.equal(3);
		done();
	});
});

it('Caso 9: Get the process status of users', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get('/user-jobs/' + currentId)
	.set('Content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.end(function(err, res) {
		res.should.have.status(200);
		expect(res.body.data.attributes.status).to.equal("processing");
		expect(res.body.data.attributes['count-rows']).to.equal(3);
		done();
	});
});
});
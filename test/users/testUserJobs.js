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

describe('SUITE - USERS - USER JOBS', function() {

it('Caso 1: Import a user list', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.post('/user-jobs')
	.field('Content-Type', 'multipart/form-data')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.attach('resource', 'test/users/users.csv')
	.end(function(err, res) {
		console.log(res);
		done();
	});
});

});
import Role from './../../src/models/role';
import User from './../../src/models/user';
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

var currentUser = null;



describe('SUITE - USERS - MASSIVE ACTIONS', function() {

it('1. Fetches a profile data basicUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		currentUser = response.content;
		response.should.have.status('200');
		done();
	});
});

it('2. Change the country of a user', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User({
	id: jsonData.basicUser.id, 
	country: 'URY',
	role: currentUser.role.id,
	profile: currentUser.profile.id
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		expect(response.content.country).to.equal('URY');
		done();
	});
});

it('3. Change the country to an invalid user data', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User({
	id: jsonData.basicUser.id, 
	country: 'RRR',
	role: currentUser.role.id,
	profile: currentUser.profile.id
	})
	.update()
	.then((response) => {
		response.should.have.status('400');
		response.errors[0].title.should.be.eql("Invalid country");
		done();
	});
});

it('4. change the country to a user to null', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User({
	id: jsonData.basicUser.id, 
	country: null,
	role: currentUser.role.id,
	profile: currentUser.profile.id
	})
	.update()
	.then((response) => {
		response.should.have.status('400');
		response.errors[0].title.should.be.eql("[attributes.country] NULL value found, but a string is required\n");
		done();
	});
});

it('5. change the country to an empty user', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User({
	id: jsonData.basicUser.id, 
	country: '',
	role: currentUser.role.id,
	profile: currentUser.profile.id
	})
	.update()
	.then((response) => {
		response.should.have.status('400');
		//response.errors[0].title.should.be.eql("[attributes.country] NULL value found, but a string is required\n");
		done();
	});
});

});


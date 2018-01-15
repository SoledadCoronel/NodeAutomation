import UserCelebrations from './../../src/models/userCelebrations';
import Role from './../../src/models/role';
import User from './../../src/models/user';
//import UserPreferences from './../../src/models/userPreferences';
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

// variables utilizadas en los tests

var currentUserImport;
var currentUserImport2;
var currentUserImport3;
var currentUser;
var currentActions;

// comienzo de la suite
describe('SUITE - USERS - USERS CELEBRATIONS', function() {

it('1. Fetches a profile data basicUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		currentUser = response.content;
		response.should.have.status('200');
		console.log(JSON.stringify(response.content, null, 2));
		done();
	});
});

/*it('caso 12: list all users who are years old', function(done) {
	//session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	new UserCelebrations()
	.list({filter: {'offset': -3, 'celebration-date': '2017-09-23', 'celebration': 'birthdays', 'offset-range': 1}})
		.then((response) => {
			console.log(JSON.stringify(response.content, null, 2));
			//response.should.have.status('200');
			//assert.property(response.content.meta, 'pagination');
			//assert.property(response.content.meta.pagination, 'total-pages');
			//assert.property(response.content.meta.pagination, 'total-items');
			//expect(response.content.meta.pagination['total-pages']).to.equal(1);
			//expect(response.content.meta.pagination['total-items']).to.equal(5);
			done();
		});
	});*/

it('caso 1: list all users who are years old', function(done) {
	//session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	new UserCelebrations()
	.list({filter: {'offset': -3, 'celebration-date': '2017-09-23', 'celebration': 'birthdays', 'offset-range': 1, 'platform-id': jsonData.currentPlatform.id}})
		.then((response) => {
			console.log(JSON.stringify(response.content, null, 2));
			response.should.have.status('200');
			//assert.property(response.content.meta, 'pagination');
			//assert.property(response.content.meta.pagination, 'total-pages');
			//assert.property(response.content.meta.pagination, 'total-items');
			expect(response.content.meta.pagination['total-pages']).to.equal(1);
			expect(response.content.meta.pagination['total-items']).to.equal(1);
			done();
		});
	});

it('caso 2: list all users who are years old', function(done) {
	//session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	new UserCelebrations()
	.list({filter: {'offset': -3, 'celebration-date': '2017-09-25', 'celebration': 'anniversaries', 'offset-range': 1, 'platform-id': jsonData.currentPlatform.id}})
		.then((response) => {
			console.log(JSON.stringify(response.content, null, 2));
			response.should.have.status('200');
			//assert.property(response.content.meta, 'pagination');
			//assert.property(response.content.meta.pagination, 'total-pages');
			//assert.property(response.content.meta.pagination, 'total-items');
			expect(response.content.meta.pagination['total-pages']).to.equal(1);
			expect(response.content.meta.pagination['total-items']).to.equal(1);
			done();
		});
	});

it('3. Fetches a user preferences basicUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		currentUser = response.content;
		response.should.have.status('200');
		console.log(JSON.stringify(response.preference, null, 2));
		done();
	});
});

/*it('case 4: Change a users timezone', function(done) {

	new UserPreferences({
		id: jsonData.basicUser.id, 
		timezone: 'Pacific/Wake',
		user: currentUser,
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		console.log(JSON.stringify(response.content, null, 2));
		done();
	});
});*/
});
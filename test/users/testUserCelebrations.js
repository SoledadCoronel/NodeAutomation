import UserCelebrations from './../../src/models/userCelebrations';
import Role from './../../src/models/role';
import User from './../../src/models/user';
import UserPreferences from './../../src/models/userPreferences';
import Profile from './../../src/models/profile';
import { session } from './../../src/services/session';

var jsonData = require('./../fixtures/data.json');

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");
var moment = require('moment-timezone');
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
var currentAdminSpaceUser;
var currentAdminUser;
var currentUserPreference;
var currentAdminSpacePreference;
var currentAdminUserPreference;
var profileAdminUser;
var currentActions;

// se obtiene offset para Buenos Aires y 
var date = new Date();
var offsetBsAs = moment(date).tz("America/Argentina/Buenos_Aires").format('Z');
var offsetManagua = moment(date).tz("America/Managua").format('Z');

// comienzo de la suite
describe('SUITE - USERS - USERS CELEBRATIONS', function() {

it('caso 1. Fetches user data basicUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		currentUser = response.content;
		response.should.have.status('200');
		done();
	});
});

it('caso 2. Fetches user data adminSpaceUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.adminSpaceUser.id)
	.then((response) => {
		currentAdminSpaceUser = response.content;
		response.should.have.status('200');
		done();
	});
});

it('caso 3. Fetches user data adminUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.adminUserId)
	.then((response) => {
		currentAdminUser = response.content;
		response.should.have.status('200');
		done();
	});
});

it('caso 4: fetches a profile Adminuser', function(done) {
	new User()
	.fetch(jsonData.adminUserId)
	.then((response) => {
		response.should.have.status('200');
		profileAdminUser = response.content.profile;
		done();
	});
});

it('caso 5. Change birthday to adminUser', function(done) {
	new Profile({
		id: profileAdminUser.id, 
		'birth-date': '1982-09-23'
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		done();
	});
});

it('caso 6. Change anniversaries to adminUser', function(done) {
	new Profile({
		id: profileAdminUser.id, 
		'admission-date': '2016-09-23'
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		done();
	});
});

/*it('caso 12: list all users who are years old', function(done) {
	//session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	new UserCelebrations()
	.list({filter: {'offset': -3, 'celebration-date': '2017-09-23', 'celebration': 'birthdays', 'offset-range': 1}})
		.then((response) => {
			console.log(JSON.stringify(response.content, null, 2));
			response.should.have.status('200');
			assert.property(response.content.meta, 'pagination');
			assert.property(response.content.meta.pagination, 'total-pages');
			assert.property(response.content.meta.pagination, 'total-items');
			//expect(response.content.meta.pagination['total-pages']).to.equal(1);
			expect(response.content.meta.pagination['total-items']).to.equal(1);
			done();
		});
	});*/

it('caso 7: list all users who are years old', function(done) {
	//session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	new UserCelebrations()
	.list({filter: {'offset': offsetBsAs, 'celebration-date': '2017-09-23', 'celebration': 'birthdays', 'offset-range': 1, 'platform-id': jsonData.currentPlatform.id}})
		.then((response) => {
			//console.log(JSON.stringify(response.content, null, 2));
			response.should.have.status('200');
			assert.property(response.content.meta, 'pagination');
			assert.property(response.content.meta.pagination, 'total-pages');
			assert.property(response.content.meta.pagination, 'total-items');
			expect(response.content.meta.pagination['total-pages']).to.equal(1);
			expect(response.content.meta.pagination['total-items']).to.equal(2);
			done();
		});
	});

it('caso 8: list all users who are years old', function(done) {
	//session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	new UserCelebrations()
	.list({filter: {'offset': offsetBsAs, 'celebration-date': '2017-09-25', 'celebration': 'birthdays', 'offset-range': 1, 'platform-id': jsonData.currentPlatform.id}})
		.then((response) => {
			//console.log(JSON.stringify(response.content, null, 2));
			response.should.have.status('200');
			assert.property(response.content.meta, 'pagination');
			assert.property(response.content.meta.pagination, 'total-pages');
			assert.property(response.content.meta.pagination, 'total-items');
			expect(response.content.meta.pagination['total-pages']).to.equal(1);
			expect(response.content.meta.pagination['total-items']).to.equal(1);
			done();
		});
	});

it('caso 9: list all users who are years old', function(done) {
	//session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	new UserCelebrations()
	.list({filter: {'offset': offsetBsAs, 'celebration-date': '2017-09-23', 'celebration': 'anniversaries', 'offset-range': 1, 'platform-id': jsonData.currentPlatform.id}})
		.then((response) => {
			response.should.have.status('200');
			//console.log(JSON.stringify(response.content, null, 2));
			assert.property(response.content.meta, 'pagination');
			assert.property(response.content.meta.pagination, 'total-pages');
			assert.property(response.content.meta.pagination, 'total-items');
			expect(response.content.meta.pagination['total-pages']).to.equal(1);
			expect(response.content.meta.pagination['total-items']).to.equal(2);
			done();
		});
	});

it('caso 10: list all users who are years old', function(done) {
	//session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	new UserCelebrations()
	.list({filter: {'offset': offsetBsAs, 'celebration-date': '2017-09-25', 'celebration': 'anniversaries', 'offset-range': 1, 'platform-id': jsonData.currentPlatform.id}})
		.then((response) => {
			//console.log(JSON.stringify(response.content, null, 2));
			response.should.have.status('200');
			assert.property(response.content.meta, 'pagination');
			assert.property(response.content.meta.pagination, 'total-pages');
			assert.property(response.content.meta.pagination, 'total-items');
			expect(response.content.meta.pagination['total-pages']).to.equal(1);
			expect(response.content.meta.pagination['total-items']).to.equal(1);
			done();
		});
	});

it('caso 11. Fetches a user preferences basicUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		currentUserPreference = response.content.preference;
		response.should.have.status('200');
		done();
	});
});

it('caso 12. Fetches a user preferences adminSpaceUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.adminSpaceUser.id)
	.then((response) => {
		currentAdminSpacePreference = response.content.preference;
		response.should.have.status('200');
		done();
	});
});

it('caso 13. Fetches a user preferences adminUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.adminUserId)
	.then((response) => {
		currentAdminUserPreference = response.content.preference;
		response.should.have.status('200');
		done();
	});
});


it('case 14: Change time zone to basic user', function(done) {
	session.addToken(1, jsonData.basicToken);

	new UserPreferences({
		id: currentUserPreference.id, 
		timezone: "America/Managua",
		user: currentUser
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		//console.log(JSON.stringify(response.content, null, 2));
		done();
	});
});

it('case 15: Change time zone to adminSpace user', function(done) {
	session.addToken(1, jsonData.adminSpaceToken);

	new UserPreferences({
		id: currentAdminSpacePreference.id, 
		timezone: "America/Managua",
		user: currentAdminSpaceUser
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		//console.log(JSON.stringify(response.content, null, 2));
		done();
	});
});

it('case 16: Change time zone to admin user', function(done) {
	session.addToken(1, jsonData.adminToken);

	new UserPreferences({
		id: currentAdminUserPreference.id, 
		timezone: "America/Managua",
		user: currentAdminUser
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		//console.log(JSON.stringify(response.content, null, 2));
		done();
	});
});

it('caso 17: list all users who are years old', function(done) {
	//session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	new UserCelebrations()
	.list({filter: {'offset': offsetManagua, 'celebration-date': '2017-09-23', 'celebration': 'birthdays', 'offset-range': 1, 'platform-id': jsonData.currentPlatform.id}})
		.then((response) => {
			//console.log(JSON.stringify(response.content, null, 2));
			response.should.have.status('200');
			assert.property(response.content.meta, 'pagination');
			assert.property(response.content.meta.pagination, 'total-pages');
			assert.property(response.content.meta.pagination, 'total-items');
			expect(response.content.meta.pagination['total-pages']).to.equal(1);
			expect(response.content.meta.pagination['total-items']).to.equal(2);
			done();
		});
	});

it('caso 18: list all users who meet anniversary', function(done) {
	//session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	new UserCelebrations()
	.list({filter: {'offset': offsetManagua, 'celebration-date': '2017-09-23', 'celebration': 'anniversaries', 'offset-range': 1, 'platform-id': jsonData.currentPlatform.id}})
		.then((response) => {
			//console.log(JSON.stringify(response.content, null, 2));
			response.should.have.status('200');
			assert.property(response.content.meta, 'pagination');
			assert.property(response.content.meta.pagination, 'total-pages');
			assert.property(response.content.meta.pagination, 'total-items');
			expect(response.content.meta.pagination['total-pages']).to.equal(1);
			expect(response.content.meta.pagination['total-items']).to.equal(2);
			done();
		});
	});

})
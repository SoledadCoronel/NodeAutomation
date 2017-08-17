import UserImports from './../../src/models/userImports';
import User from './../../src/models/user';
import Profile from './../../src/models/profile';
import MassiveActions from './../../src/models/massiveActions';
import Group from './../../src/models/group';
import GroupItem from './../../src/models/groupItem';
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
var currentUser;
var currentActions;

// comienzo de la suite
describe('SUITE - USERS - MASSIVE ACTIONS', function() {

//PRECONDICIONES: Se van a crear 2 importaciones de usuarios, para guardar el id del payload y
// luego usarlo en las acciones massivas

it('Creates un new user import', function(done) {
	session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	let attributes = {
		'payload': {
	    	"first_name":"Mauro",
	    	"last_name":"Regna",
	    	"email":"mauro.regna@gointegro.com", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2000-11-15",
	    	"groups": jsonData.currentGroup.name + ':' + jsonData.currentGroupItem.name
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('201');
		userImports = response.content;
		currentUserImport = userImports;
		done();
	});
});

it('Creates a second new user import', function(done) {
	session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	let attributes = {
		'payload': {
	    	"first_name":"Mauro",
	    	"last_name":"Regna",
	    	"email":"mauro.regna+1@gointegro.com", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2000-11-20",
	    	"groups": jsonData.currentGroup.name + ':' + jsonData.currentGroupItem.name
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('201');
		userImports = response.content;
		currentUserImport2 = userImports;
		done();
	});
});


it('Create massive invitations', function(done) {
	session.addToken(1, jsonData.adminToken);


	let actions = new MassiveActions({
		namespace: 'user',
		action: 'SEND_INVITATION',
		payload: {'ids': currentUserImport.id + ',' + currentUserImport2.id}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		//console.log(response.content);
		done();
	});
});

it('fetches a profile data currentUserImport', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(currentUserImport.id)
	.then((response) => {
		currentUser = response.content;
		response.should.have.status('200');
		expect(currentUser['status-invitation']).to.equal('invited');
		done();
	});
});

it('Create bulk blocks', function(done) {
	session.addToken(1, jsonData.adminToken);


	let actions = new MassiveActions({
		namespace: 'user',
		action: 'BLOCK_USER',
		payload: {'ids': jsonData.basicUser.id + ',' + jsonData.adminSpaceUser.id}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		//console.log(response.content);
		done();
	});
});

it('fetches a profile data basicUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		currentUser = response.content;
		response.should.have.status('200');
		expect(currentUser.status).to.equal('inactive');
		done();
	});
});

it('Create bulk unlock', function(done) {
	session.addToken(1, jsonData.adminToken);


	let actions = new MassiveActions({
		namespace: 'user',
		action: 'UNBLOCK_USER',
		payload: {'ids': jsonData.basicUser.id + ',' + jsonData.adminSpaceUser.id}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		//console.log(response.content);
		done();
	});
});

it('fetches a profile data basicUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		currentUser = response.content;
		response.should.have.status('200');
		expect(currentUser.status).to.equal('active');
		done();
	});
});

it('Create bulk login lock', function(done) {
	session.addToken(1, jsonData.adminToken);


	let actions = new MassiveActions({
		namespace: 'user',
		action: 'BLOCK_LOGIN',
		payload: {'ids': jsonData.basicUser.id + ',' + jsonData.adminSpaceUser.id}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		done();
	});
});

it('fetches a profile data basicUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		currentUser = response.content;
		response.should.have.status('200');
		expect(currentUser['login-enabled']).to.equal(false);
		done();
	});
});

it('Create bulk login unlock', function(done) {
	session.addToken(1, jsonData.adminToken);


	let actions = new MassiveActions({
		namespace: 'user',
		action: 'UNBLOCK_LOGIN',
		payload: {'ids': jsonData.basicUser.id + ',' + jsonData.adminSpaceUser.id}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		done();
	});
});

it('fetches a profile data basicUser', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		currentUser = response.content;
		response.should.have.status('200');
		expect(currentUser['login-enabled']).to.equal(true);
		done();
	});
});


// solo va a invitar a dos usuarios porque los demás ya están registrados.
it('Create massive invitations - con filters', function(done) {
	session.addToken(1, jsonData.adminToken);

	let actions = new MassiveActions({
		namespace: 'user',
		action: 'SEND_INVITATION',
		payload: {'filters': {
					'status':'active',
	    			'login-enabled':true,
	    			'query':""
	    		}
	    	}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		expect(response.content.result).to.equal('{"affected-users":2,"errors":null}');
		done();
	});
});

// va a bloquear a los registrados y a los invitados. 
it('Create bulk blocks - con filters', function(done) {
	session.addToken(1, jsonData.adminToken);

	let actions = new MassiveActions({
		namespace: 'user',
		action: 'BLOCK_USER',
		payload: {'filters': {
					'status':'active',
	    			'login-enabled':true,
	    			'query':""
	    		}
	    	}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		expect(response.content.result).to.equal('{"affected-users":4,"errors":null}');
		done();
	});
});

// filtra por usuarios bloqueados anteriormente e itenta volver a bloquearlos
it('Create bulk blocks - con filters', function(done) {
	session.addToken(1, jsonData.adminToken);

	let actions = new MassiveActions({
		namespace: 'user',
		action: 'BLOCK_USER',
		payload: {'filters': {
					'status':'inactive',
	    			'login-enabled':true,
	    			'query':""
	    		}
	    	}
	});
	actions.create()
	.then((response) => {
		//console.log(response);
		response.should.have.status('201');
		expect(response.content.result).to.equal('{"affected-users":0,"errors":null}');
		done();
	});
});

// filtra por usuarios bloqueados y los desbloquea
it('Create bulk unblocks - con filters', function(done) {
	session.addToken(1, jsonData.adminToken);

	let actions = new MassiveActions({
		namespace: 'user',
		action: 'UNBLOCK_USER',
		payload: {'filters': {
					'status':'inactive',
	    			'login-enabled':true,
	    			'query':""
	    		}
	    	}
	});
	actions.create()
	.then((response) => {
		//console.log(response);
		response.should.have.status('201');
		expect(response.content.result).to.equal('{"affected-users":4,"errors":null}');
		done();
	});
});

// filtra por usuarios bloqueados (en este caso no hay) y desbloquearlos
it('Create bulk unblocks - con filters', function(done) {
	session.addToken(1, jsonData.adminToken);

	let actions = new MassiveActions({
		namespace: 'user',
		action: 'UNBLOCK_USER',
		payload: {'filters': {
					'status':'inactive',
	    			'login-enabled':true,
	    			'query':""
	    		}
	    	}
	});
	actions.create()
	.then((response) => {
		console.log(response);
		response.should.have.status('201');
		expect(response.content.result).to.equal('{"affected-users":0,"errors":null}');
		done();
	});
});



});


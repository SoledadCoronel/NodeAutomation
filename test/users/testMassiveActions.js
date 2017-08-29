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
var currentUserImport3;
var currentUser;
var currentActions;

// comienzo de la suite
describe('SUITE - USERS - MASSIVE ACTIONS', function() {

//PRECONDICIONES: Se van a crear 3 importaciones de usuarios, para guardar el id del payload y
// luego usarlo en las acciones massivas

it('1. Creates un new user import', function(done) {
	session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	let attributes = {
		'payload': {
	    	"first_name":"Mauro",
	    	"last_name":"Regña",
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

it('2. Creates a second new user import', function(done) {
	session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	let attributes = {
		'payload': {
	    	"first_name":"Mauro",
	    	"last_name":"R'egna",
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

// se cambia a false el login_enabled del tercer usuario


it('4. Create massive invitations', function(done) {
	session.addToken(1, jsonData.adminToken);


	let actions = new MassiveActions({
		namespace: 'user',
		action: 'SEND_INVITATION',
		payload: {'ids': currentUserImport.id + ',' + currentUserImport2.id}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		console.log()
		done();
	});
});

it('5. Fetches a profile data currentUserImport', function(done) {
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

it('6. Create bulk blocks', function(done) {
	session.addToken(1, jsonData.adminToken);


	let actions = new MassiveActions({
		namespace: 'user',
		action: 'BLOCK_USER',
		payload: {'ids': jsonData.basicUser.id + ',' + jsonData.adminSpaceUser.id}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		done();
	});
});

it('7. Fetches a profile data basicUser', function(done) {
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

it('8. Create bulk unlock', function(done) {
	session.addToken(1, jsonData.adminToken);


	let actions = new MassiveActions({
		namespace: 'user',
		action: 'UNBLOCK_USER',
		payload: {'ids': jsonData.basicUser.id + ',' + jsonData.adminSpaceUser.id}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		done();
	});
});

it('9. Fetches a profile data basicUser', function(done) {
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

it('10. Create bulk login lock', function(done) {
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

it('11. Fetches a profile data basicUser', function(done) {
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

it('12. Create bulk login unlock', function(done) {
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

it('13. Fetches a profile data basicUser', function(done) {
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
it('14. Create massive invitations - con filters', function(done) {
	session.addToken(1, jsonData.adminToken);

	let actions = new MassiveActions({
		namespace: 'user',
		action: 'SEND_INVITATION',
		payload: {'filters': {
					'status':'active',
	    			'login-enabled':'true',
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

// va a bloquear a todos los usuarios que se encuentren activos
it('15. Create bulk blocks - con filters', function(done) {
	session.addToken(1, jsonData.adminToken);

	let actions = new MassiveActions({
		namespace: 'user',
		action: 'BLOCK_USER',
		payload: {'filters': {
					'status':'active',
	    			'login-enabled':'true',
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

// va a desbloquear a todos los usuarios que se encuentren bloqueados
it('16. Create bulk unblocks - con filters', function(done) {
	session.addToken(1, jsonData.adminToken);

	let actions = new MassiveActions({
		namespace: 'user',
		action: 'UNBLOCK_USER',
		payload: {'filters': {
					'status':'inactive',
	    			'login-enabled':'true',
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


// intenta desbloquear a todos los usuarios que estan activos
it('17. Create bulk unblocks - con filters', function(done) {
	session.addToken(1, jsonData.adminToken);

	let actions = new MassiveActions({
		namespace: 'user',
		action: 'UNBLOCK_USER',
		payload: {'filters': {
					'status':'active',
	    			'login-enabled':'true',
	    			'query':""
	    		}
	    	}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		expect(response.content.result).to.equal('{"affected-users":0,"errors":null}');
		done();
	});
});

// modifica el estado de un usuario básico registrado - PRECONDICION
it('18. Change login_enabled to basic user', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User({
		id: jsonData.basicUser.id, 
		status: 'inactive',
		role: jsonData.basicRole
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		done();
	});
});

// intenta desbloquear a todos los usuarios que estan inactivos
it('19. Create bulk unblocks - con filters', function(done) {
	session.addToken(1, jsonData.adminToken);

	let actions = new MassiveActions({
		namespace: 'user',
		action: 'UNBLOCK_USER',
		payload: {'filters': {
					'status':'inactive',
	    			'login-enabled':'true',
	    			'query':""
	    		}
	    	}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		expect(response.content.result).to.equal('{"affected-users":1,"errors":null}');
		done();
	});
});

// se vuelve a correr el mismo caso anterior
it('20. Create bulk unblocks - con filters', function(done) {
	session.addToken(1, jsonData.adminToken);

	let actions = new MassiveActions({
		namespace: 'user',
		action: 'UNBLOCK_USER',
		payload: {'filters': {
					'status':'inactive',
	    			'login-enabled':'true',
	    			'query':""
	    		}
	    	}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		expect(response.content.result).to.equal('{"affected-users":0,"errors":null}');
		done();
	});
});

});


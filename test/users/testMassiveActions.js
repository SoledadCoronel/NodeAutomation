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
		'create':true,
		'payload': {
	    	"first_name":"Mauro",
	    	"last_name":"Regña",
	    	"email":"soledad.coronel+1@gointegro.com", 
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
		'create':true,
		'payload': {
	    	"first_name":"Mauro",
	    	"last_name":"R'egna",
	    	"email":"soledad.coronel+2@gointegro.com", 
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
		//console.log(JSON.stringify(currentUserImport2, null, 2));
		done();
	});
});

it('3. Create massive invitations', function(done) {
	session.addToken(1, jsonData.adminToken);


	let actions = new MassiveActions({
		namespace: 'user',
		action: 'SEND_INVITATION',
		payload: {'ids': currentUserImport.id + ',' + currentUserImport2.id}
	});
	actions.create()
	.then((response) => {
		response.should.have.status('201');
		done();
	});
});

/*it('4. Fetches a profile data currentUserImport', function(done) {
	session.addToken(1, jsonData.adminToken);

	new User()
	.fetch(currentUserImport)
	.then((response) => {
		currentUser = response.content;
		//response.should.have.status('200');
		//expect(currentUser['status-invitation']).to.equal('invited');
		console.log(JSON.stringify(response.errors, null, 2));
		done();
	});
});*/

it('5. Create bulk blocks', function(done) {
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

it('6. Fetches a profile data basicUser', function(done) {
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

it('7. Create bulk unlock', function(done) {
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

it('8. Fetches a profile data basicUser', function(done) {
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

it('9. Create bulk login lock', function(done) {
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

it('10. Fetches a profile data basicUser', function(done) {
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

it('11. Create bulk login unlock', function(done) {
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

it('12. Fetches a profile data basicUser', function(done) {
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
it('13. Create massive invitations - con filters', function(done) {
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
		expect(response.content.result).to.equal('{"affected-users":3,"errors":null}');
		done();
	});
});

// va a bloquear a todos los usuarios que se encuentren activos
it('14. Create bulk blocks - con filters', function(done) {
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
		expect(response.content.result).to.equal('{"affected-users":5,"errors":null}');
		done();
	});
});

// va a desbloquear a todos los usuarios que se encuentren bloqueados
it('15. Create bulk unblocks - con filters', function(done) {
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
		expect(response.content.result).to.equal('{"affected-users":5,"errors":null}');
		done();
	});
});


// intenta desbloquear a todos los usuarios que estan activos
it('16. Create bulk unblocks - con filters', function(done) {
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
it('17. Change status to basic user', function(done) {
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
/*it('18. Create bulk unblocks - con filters', function(done) {
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
		//console.log(JSON.stringify(response.content, null, 2));
		response.should.have.status('201');
		expect(response.content.result).to.equal('{"affected-users":1,"errors":null}');
		done();
	});
});*/

// se vuelve a correr el mismo caso anterior
/*it('19. Create bulk unblocks - con filters', function(done) {
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
		//console.log(JSON.stringify(response.content, null, 2));
		response.should.have.status('201');
		expect(response.content.result).to.equal('{"affected-users":0,"errors":null}');
		done();
	});
});*/

});


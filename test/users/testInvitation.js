import User from './../../src/models/user';
import Role from './../../src/models/role';
import Invitation from './../../src/models/invitation';
import { session } from './../../src/services/session';
import 'babel-polyfill';
var jsonData = require('./../fixtures/data.json');

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");
var random = new Random();
var expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiColors);

// variables utilizadas en los tests
var rolesInfo = null;
var basicUserInfo = null;
var basicUser = null;
var basicUserInfo = null;
var invitationBasicUser = null;
var invitationUpdated = null;


describe('Invitation', function() {
	session.addToken(1, jsonData.adminToken);

before(async function() { 
	let user = new User({
		name: 'UsuarioRolBásico',
    	'last-name': 'UsuarioRolBásico',
     	email : 'mauro.regna+' + random.integer(1, 10000) + '@gointegro.com',
    	status : 'active',
    	'login-enabled' : true,
    	role: new Role({id: jsonData.basicRole})
	});
	const response = await createUser(user);

	//user.create().then((response) => {
		basicUserInfo = response.content;
     	basicUser = {'id': basicUserInfo.id, 'email': basicUserInfo.email};

    	//done();
    //});
});

async function createUser(user) {
	return await user.create();
}

// TESTS CASES
///////////////////////////////////////////////////////////////////////////////////////////

console.log("TESTS CASES");

it('TPGO5-864 - count invitations sent to a user ', function(done) {
	
	let invitation = new Invitation({
    	user: new User(basicUser),
  	});

 	invitation.create().then((response) => {
	    invitationUpdated = response.content;
	    expect(response.status).to.equal(201);
	    expect(invitationUpdated['invitations-sent']).to.equal(1);
	    
	    invitation.create().then((response) => {
	    	invitationUpdated = response.content;

	    	expect(response.status).to.equal(201);
	    	expect(invitationUpdated['invitations-sent']).to.equal(2);
	    
	    	invitationUpdated.resend = true;

		 	invitationUpdated.update().then((responseUpdate) => {
		 		expect(responseUpdate.status).to.equal(200);
		    	expect(responseUpdate.content['invitations-sent']).to.equal(3);

	    		invitationUpdated.update().then((responseUpdate) => {
	    			expect(responseUpdate.status).to.equal(200);
	    			expect(responseUpdate.content['invitations-sent']).to.equal(4);
	    			done();
	    		});	

		    });
		});
	
	});

});

});
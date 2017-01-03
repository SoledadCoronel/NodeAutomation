import User from './../../src/models/user';
import Role from './../../src/models/role';
import Invitation from './../../src/models/invitation';
import UserSerializer from './../../src/serializers/userSerializer';
import RoleSerializer from './../../src/serializers/roleSerializer';
import InvitationSerializer from './../../src/serializers/invitationSerializer';
import { session } from './../../src/services/session';
import Random from 'random-js';

var chai = require('chai');
var chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;
chai.use(chaiHttp);
chai.use(chaiColors);

var token = '28R4XXX7NTLNJAmxe3vVW9rqBovNX1nKAKD67wVO';
var random = new Random();

session.addToken(1, token);

var BasicRole = null;
var BasicUser = null;

describe('SUITE Users', function() {

  it('lists all roles', function(done) {

    new Role()
      .list({
        page: {
          number: 1,
          size: 3
        },
        /*filter: {
          name : 'Test'
        },
        query: 'administrative=1',
        include: ['x', 'y']*/
        //filter: {
        //  name : 'Test'
        //},
        //query: 'administrative=1',
        include: ['x', 'y']
      })
      .then((response) => {
        response.should.have.status('200');
        let collection = response.content;
        collection.elements.forEach(function(role) {
        });
        BasicRole = collection.elements[2];
        //console.log(collection.totalPages());
        //console.log(collection.totalItems());
        done();
      });
  });

  it('creates a basic user', function(done) {

  	let user = new User({
  		'name': 'UsuarioRolBasico',
  		'last-name': 'UsuarioRolBasico',
  		'email' : "basico"+random.integer(1, 10000)+"@gointegro.com",
  		'status' : 'active',
  		'login-enabled' : true,
  		role: BasicRole,
  	});

  	user.create()
  	.then((response) => {
		response.should.have.status('201');
		let user = response.content;
		console.log(user);
		BasicUser = user;
		done();
	});
  });

    it('creates an invitation user', function(done) {

  	let invitation = new Invitation({
  		user: BasicUser,
  	});

  	invitation.create()
  	.then((response) => {
		response.should.have.status('201');
		let invitation = response.content;
		console.log(invitation);
		//console.log(JSON.stringify(jsonSerialized,null,2));
		done();
	});
  });

});


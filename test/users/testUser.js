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

var token = 'W568vq1jEgmuouK7mZdZsRC5lIZ49sQmblRmo2eK';
var random = new Random();

session.addToken(1, token);

var BasicRole = null;
var AdminSpaceRole = null;
var basicUser = null;
var adminSpaceUser = null;
var invitationBasicUser = null;
var invitationAdminSpaceUser = null; 

describe('SUITE Users', function() {

  it('lists all roles', function(done) {

    new Role()
      .list({
        page: {
          number: 1,
          size: 3
        },
        include: ['x', 'y']
      })
      .then((response) => {
        response.should.have.status('200');
        let collection = response.content;
        collection.elements.forEach(function(role) {
  		//
        });
        BasicRole = collection.elements[1];
        AdminSpaceRole = collection.elements[2];
        done();
      });
  });

  it('creates a basic user', function(done) {

  	let user = new User({
  		name: 'UsuarioRolBasico',
  		'last-name': 'UsuarioRolBasico',
  		email : 'basic' + random.integer(1, 10000) + '@gointegro.com',
  		status : 'active',
  		'login-enabled' : true,
  		role: BasicRole,
  	});

  	user.create()
  	.then((response) => {
  		response.should.have.status('201');
  		user = response.content;
  		basicUser = user;
  		done();
  	});
  });

  it('creates a adminSpace user', function(done) {

    let user = new User({
      name: 'UsuarioRolAdminDeEspacio',
      'last-name': 'UsuarioRolAdminDeEspacio',
      email : 'adminSpace' + random.integer(1, 10000) + '@gointegro.com',
      status : 'active',
      'login-enabled' : true,
      role: AdminSpaceRole,
    });

    user.create()
    .then((response) => {
      response.should.have.status('201');
      user = response.content;
      adminSpaceUser = user;
      done();
    });
  });

  it('Create an invitation to a basic user', function(done) {

  	let invitation = new Invitation({
  		user: basicUser
  	});

  	invitation.create()
  	.then((response) => {
      response.should.have.status('201');
      invitation = response.content;
      invitationBasicUser = invitation;
      done();
    });
  });

  it('Create an invitation to a adminSpace user', function(done) {

    let invitation = new Invitation({
      user: adminSpaceUser
    });

    invitation.create()
    .then((response) => {
      response.should.have.status('201');
      invitation = response.content;
      invitationAdminSpaceUser = invitation;
      done();
    });
  });

  it('Complete basic user invitation', function(done) {

    invitationBasicUser
    .complete()
    .update()
    .then((response) => {
      response.should.have.status('200');
      invitationBasicUser.should.have.status('complete');
      done();
    });
  });

  it('Complete adminSpace user invitation', function(done) {

    invitationAdminSpaceUser
    .complete()
    .update()
    .then((response) => {
      response.should.have.status('200');
      invitationAdminSpaceUser.should.have.status('complete');
      done();
    });
  });
});


/*import Profile from './../../src/models/profile';
import User from './../../src/models/user';
import Role from './../../src/models/role';
import UserSerializer from './../../src/serializers/userSerializer';
import RoleSerializer from './../../src/serializers/roleSerializer'
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

var token = '6DLSfFI9yN9tx7XhTprKaiaINaasyKzaCadE5GQR';
var random = new Random();

session.addToken(1, token);

var BasicRole = null;

describe('SUITE Profile', function() {

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
		//console.log(JSON.stringify(jsonSerialized,null,2));
		done();
	});
  });
});/*


	/*it('creates a disabled role', function(done) {
    let role = new Role({
      name: 'Test role ' + random.integer(1, 10000),
      status: 'disabled'
    });

    role.create()
      .then((response) => {
        response.should.have.status('201');
        let role = response.content;
        role.should.have.status('disabled');
        disabledRole = role;
        //console.log(JSON.stringify(disabledRole,null,2));
        done();
      });
  });


});

	/*it('fetches a profile', function(done) {

      .fetch(inactiveSpace.id, {
        include: ['x', 'y']
      })
      .then((space) => {
        assert(space.id == inactiveSpace.id);
        assert(space.name == inactiveSpace.name);
        done();
      });
  });*/
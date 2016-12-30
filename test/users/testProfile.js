import Profile from './../../src/models/profile';
import Role from './../../src/models/role';
import User from './../../src/models/user';
import { session } from './../../src/services/session';
import ProfileSerializer from './../../src/serializers/profileSerializer';
import Random from 'random-js';

var chai = require('chai');
var chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;
chai.use(chaiHttp);
chai.use(chaiColors);

var token = 'OxJFf67C2aO1aJmidKmXP0rdTxBq44kUci6qn9mt';
var random = new Random();
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
    })
		.then((collection) => {
			collection.elements.forEach(function(role) {
          //console.log(role.id)
      });
			AdminRole = collection.elements[2].id;
			console.log(AdminRole);
        //console.log(collection.totalPages());
        //console.log(collection.totalItems());

        done();
    	});
	});

	/*it('creates a basic user', function(done) {
		let user = new User({
			'name': 'UsuarioRolBasico',
			'last-name': 'UsuarioRolBasico',
			'email' : "basico"+random.integer(1, 10000)+"@gointegro.com",
			'status' : 'active',
			'login-enabled' : true,
			role: new Role({
				id: BasicRole,
			})
		});
		user.create()
		.then((user) => {
			role.should.have.status('active');
        console.log(JSON.stringify(disabledRole,null,2));
        done();
    });
	});*/

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
});
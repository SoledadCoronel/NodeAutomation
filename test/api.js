import Random from 'random-js';
import Role from './../src/models/role';
import { session } from './../src/services/session';

var chai = require('chai');
var chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;
chai.use(chaiHttp);
chai.use(chaiColors);

var token = 'dcqTJB3XbH4lcTwVEwx7UILNkBDrVANmqeGxPsOc';
var random = new Random();

session.addToken(1, token);

var disabledRole = null;
var AdminRole = null;

describe('Roles suite', function() {

  it('creates a disabled role', function(done) {
    let role = new Role({
      name: 'Test role ' + random.integer(1, 10000),
      status: 'disabled'
    });

    role.create()
      .then((role) => {
        role.should.have.status('disabled');
        disabledRole = role;
        //console.log(JSON.stringify(disabledRole,null,2));
        done();
      });
  });

  it('validates status is in [active, disabled]', function(done) {
    let role = new Role({
      name: 'Test role ' + random.integer(1, 10000),
      status: 'invalid-status'
    });

    role.create()
      .then((role) => {
        let errors = role.errors.filter((error) => {
          return error.title.startsWith('[attributes.status] Does not have a value in the enumeration')
        });
        assert.lengthOf(errors, 1);
        done();
      });
  });

  it('activates a disabled role', function(done) {
    disabledRole
      .activate()
      .update()
      .then((role) => {
        role.should.have.status('active');
        done();
      });
  });

  it('fetches a role', function(done) {
    new Role()
      .fetch(disabledRole.id, {
        include: ['x', 'y']
      })
      .then((role) => {
        assert(role.id == disabledRole.id);
        assert(role.name == disabledRole.name);
        done();
      });
  });

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
        AdminRole = collection.elements[0].id;
        console.log(AdminRole);
        //console.log(collection.totalPages());
        //console.log(collection.totalItems());

        done();
      });
  });
});

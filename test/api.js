import Random from 'random-js';
import Role from './../src/models/role';

var chai = require('chai');
var chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;
chai.use(chaiHttp);
chai.use(chaiColors);

var token = 'z2wKDh0iw2thXPa9F4nl7NISmjGQpImjCGXc5STC';
var random = new Random();

var disabledRole = null;

describe('Roles suite', function() {

  it('creates a disabled role', function(done) {
    let role = new Role({
      name: 'Test role ' + random.integer(1, 10000),
      status: 'disabled'
    });

    role.create(token)
      .then((role) => {
        role.should.have.status('disabled');
        disabledRole = role;
        done();
      });
  });

  it('validates status is in [active, disabled]', function(done) {
    let role = new Role({
      name: 'Test role ' + random.integer(1, 10000),
      status: 'invalid-status'
    });

    role.create(token)
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
      .update(token)
      .then((role) => {
        role.should.have.status('active');
        done();
      });
  });

  it('fetches a role', function(done) {
    new Role()
      .fetch(disabledRole.id, token)
      .then((role) => {
        assert(role.id == disabledRole.id);
        assert(role.name == disabledRole.name);
        done();
      });
  });

  it('lists all roles', function(done) {
    new Role()
      .list({}, token)
      .then((collection) => {
        collection.elements.forEach(function(role) {
          //console.log(role.id);
        });

        //console.log(collection.totalPages());
        //console.log(collection.totalItems());

        done();
      });
  });

});

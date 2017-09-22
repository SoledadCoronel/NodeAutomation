import UserExports from './../../src/models/userExports';
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

describe('SUITE - USERS - USER EXPORTS', function() {

it('case 1: ', function(done) {
	session.addToken(1, jsonData.adminToken);


	new UserExports()
	.list({filter: {'template': 1}})
	.then((response) => {
		console.log(JSON.stringify(response.content, null, 2));
		//response.should.have.status('200');
		//response.content.elements.should.be.a('array');
		//response.content.elements.length.should.be.eql(2);
		//expect(response.content.meta.pagination['total-items']).to.equal(2);
        done();
    });
});
});
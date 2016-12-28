import Space from './../../src/models/space';
import { session } from './../../src/services/session';
import SpaceSerializer from './../../src/serializers/spaceSerializer';

var chai = require('chai');
var chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;
chai.use(chaiHttp);
chai.use(chaiColors);

var token = 'bLNrBgeuwpEutehWdNnQlttpexJxEKBZCtfMps4v';

session.addToken(1, token);
var inactiveSpace = null;

describe('SUITE Platform', function() {

	it('Create a new inactive space', function(done) {

		let space = new Space({
			name: 'space1',
			description: 'space1 description',
			icon: 'QA',
			active: false,
			'social-enabled': false,
			position: 0,
			visibility: 'public'
		});

		space.create()
		.then((space) => {
			//expect(space).to.have.status(200);
			//space.should.have.active(false);
			//space.should.have.visibility('public');
			space.should.have.visibility('public');
			inactiveSpace = space;
			console.log(JSON.stringify(space,null,2));
			//console.log(inactiveSpace);
			done();
		});
	});
});
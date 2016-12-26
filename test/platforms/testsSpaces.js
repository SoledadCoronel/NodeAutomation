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

var token = '1GhoZKB7tiZEcYQSclBHZsaDDTvUImZSwGB272FF';

session.addToken(1, token);
var inactiveSpace = null;

describe('SUITE Platform', function() {
	it('Create a new inactive space', function(done) {
		let space = new Space({
			name: 'space1',
			description: 'space1 description',
			icon: 'QA',
			active: false,
			'social-enabled': true,
			position: 0,
			visibility: 'public'
		});

	space.create()
	.then((space) => {
		space.should.have.status(false);
		inactiveSpace = space;
		done();
		});
	});
});
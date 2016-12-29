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

var token = 'kg84dQyQViPdeg36fChieBgpcZI82KmjciC1JsvH';

session.addToken(1, token);
var inactiveSpace = null;

describe('SUITE Platform', function() {

	it('Creates a new inactive space', function(done) {

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
			//expect(res).to.have.status(201); // VER
			assert.property(space, 'active');
			expect(space.active).to.equal(false);
			inactiveSpace = space;
			console.log(JSON.stringify(inactiveSpace,null,2));
			done();
		});
	});

	it('Activates a inactive space', function(done) {
		inactiveSpace
		.activate()
		.update()
		.then((space) => {
			assert.property(space, 'active');
			expect(space.active).to.equal(true);
			console.log(JSON.stringify(inactiveSpace,null,2));
			done();
		});
	});

	it('fetches a space', function(done) {
    new Space()
      .fetch(inactiveSpace.id, {
        include: ['x', 'y']
      })
      .then((space) => {
        assert(space.id == inactiveSpace.id);
        assert(space.name == inactiveSpace.name);
        done();
      });
  });
});
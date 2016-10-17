/*
//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('expect.js');
var jsonApiSerializer = require('jsonapi-serializer').Deserializer;
//console.log(jsonApiSerializer);

chai.use(chaiHttp);

describe('AUTOMATION', function() {

	it('AUTOMATION TEST', function(done) {   // <= No done callback
    chai.request('http://api.cd.gointegro.net')
    .get('/platforms?filter[subdomain]=qago65809261')
    .end(function(err, res) {
    expect(res).to.have.property('status', 200);    // <= Test completes before this runs
	//console.log(jsonApiSerializer.deserialize(res.body));
	done();
    expect
		});
	});
});
*/
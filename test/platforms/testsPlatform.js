
import PlatformFixture from './../../src/fixtures/platform';
import Oauth from './../../src/fixtures/oauth2';

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

describe('my suite - platform', function() {

	var fixture = new PlatformFixture();
	var oauth = new Oauth(fixture);

	before(function(done) {
		fixture.load().then(() => {

			oauth.load().then(() => {
				done();
			});
		});
	});


	it('should list a existing SINGLE platform on /platforms/<subdomain> GET', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/platforms?filter[subdomain]=' + fixture.references.platformA.subdomain)
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(200);
			//res.body[0].should.have.property('name');
			//res.body.should.have.property('name');
			//res.should.be.json;
		done();
		});
	});


	// ESTE TESTS NECESITA AUTENTICACION
	it('should list a existing SINGLE platform on /platforms/<id> GET', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/platforms/' + fixture.references.platformA.id)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauth.references.tokenA.access_token)
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(200);
			//res.body[0].should.have.property('name');
			//res.body.should.have.property('name');
			//res.should.be.json;
		done();
		});
		/*.then(function(res) {
			console.log(res.body);
			res.should.have.status(200);
			//res.body[0].should.have.property('name');
			//res.body.should.have.property('name');
			//res.should.be.json;
		})
		.catch(function (e){
   			console.error(e);
 
		})*/
	});

	it('it should GET all the platforms', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/platforms')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauth.references.tokenA.access_token)
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(200);
		done();
		});
	});


	it('should update a SINGLE platform on /platforms/<id> PATCH', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.patch('/platforms/' + fixture.references.platformA.id)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauth.references.tokenA.access_token)
		.send({'data': 
				{
				 'type': 'platforms',
				 'id': fixture.references.platformA.id,
				 'attributes': 
				 {'name': 'plataformaNode'}
				}
			})
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(200);
		done();
		});
	});

	it('it should GET all the roles', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/roles')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauth.references.tokenA.access_token)
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(200);
		done();
		});
	});

});

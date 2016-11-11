import PlatformFixture from './../../src/fixtures/platform';
import OauthFixture from './../../src/fixtures/oauth2AdminUser';

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

describe('my suite - spaces', function() {

	var platformFixture = new PlatformFixture();
	var oauthFixture = new OauthFixture(platformFixture);

	before(function(done) {
		platformFixture.load().then(() => {
			oauthFixture.load().then(() => {
				done();
			});
		});
	});

	it('should create a PUBLIC SPACE on /spaces POST', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.post('/spaces')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(
			{"data": {
    			"type": "spaces",
    			"attributes": {
      			"name": "ESPACIO PUBLICO",
      			"description": "ESPACIO PUBLICO",
      			"icon": "QA",
      			"active": true,
      			"social-enabled": true,
      			"position": 0,
      			"visibility": "public"
    			}
  			}
		})
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(201);
			//res.body[0].should.have.property('name');
			//res.body.should.have.property('name');
			//res.should.be.json;
		done();
		});
	});

	it('should create a PRIVATE SPACE on /spaces POST', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.post('/spaces')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(
			{"data": {
    			"type": "spaces",
    			"attributes": {
      			"name": "ESPACIO PRIVADO",
      			"description": "ESPACIO PRIVADO",
      			"icon": "QA",
      			"active": true,
      			"social-enabled": true,
      			"position": 0,
      			"visibility": "private"
    			}
  			}
		})
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(201);
			//res.body[0].should.have.property('name');
			//res.body.should.have.property('name');
			//res.should.be.json;
		done();
		});
	});

	it('should create a COMPANY SPACE on /spaces POST', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.post('/spaces')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(
			{"data": {
    			"type": "spaces",
    			"attributes": {
      			"name": "ESPACIO COMPANY",
      			"description": "ESPACIO COMPANY",
      			"icon": "QA",
      			"active": true,
      			"social-enabled": true,
      			"position": 0,
      			"visibility": "company"
    			}
  			}
		})
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(201);
			//res.body[0].should.have.property('name');
			//res.body.should.have.property('name');
			//res.should.be.json;
		done();
		});
	});
});
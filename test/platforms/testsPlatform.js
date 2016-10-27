
import PlatformFixture from './../../src/fixtures/platform';

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

describe('my suite - platform', function() {
	var fixture = new PlatformFixture();

	before(function(done) {
		fixture.load().then(() => {
			done();
		});

	});
	
	/*it('should list ALL platforms on /platforms GET', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/platforms')
		.end(function(err, res) {
			res.should.have.status(200);
			done();
		});
	});*/

	it('should list a existing SINGLE platform on /platforms/<id> GET', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/platforms?filter[subdomain]=qago65809261')
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(200);
			//res.body[0].should.have.property('name');
			//res.body.should.have.property('name');
			//res.should.be.json;
		done();
		});
	});

	it('should not add a SINGLE platform on /platforms POST)', function() {
		var random = new Random();

		var platform = 
		{
  			"data": 
  			[
    			{
      				"type": "platforms",
      				"attributes": 
      				{
        			"name": "miPrimerTest"+random.integer(1, 10000),
        			"timezone": "America/Argentina/Buenos_Aires",
        			"status": "active",
        			"users-range": "0-50",
        			"language": "es"
      				}
    			},
    			{
      				"type": "users",
      				"attributes": 
      				{
        				"name": "Soledad",
        				"last-name": "Coronel",
        				"email": "soledad.coronel@gointegro.com",
        				"password": "coquito25"
      				}
    			}
  			]
		}
		chai.request('http://platform-ms.cd.gointegro.net')
		.post('/platforms')
		.send(platform)
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(400);
			res.body.should.have.property('message').eql('Bad Request');
			res.body.should.have.property('errors');
			res.body.errors.should.have.property('subdomain');
			res.body.errors.subdomain.should.have.property('kind').eql('required');
		done();
		});
	});

	it('should add a SINGLE platform on /platforms POST)', function() {
		var random = new Random();

		var platform = 
		{
  			"data": 
  			[
    			{
      				"type": "platforms",
      				"attributes": 
      				{
        			"name": "miPrimerTest"+random.integer(1, 10000),
        			"subdomain": "miPrimerTest"+random.integer(1, 10000),
        			"timezone": "America/Argentina/Buenos_Aires",
        			"status": "active",
        			"users-range": "0-50",
        			"language": "es"
      				}
    			},
    			{
      				"type": "users",
      				"attributes": 
      				{
        				"name": "Soledad",
        				"last-name": "Coronel",
        				"email": "soledad.coronel@gointegro.com",
        				"password": "coquito25"
      				}
    			}
  			]
		}
		chai.request('http://platform-ms.cd.gointegro.net')
		.post('/platforms')
		.send(platform)
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(201);
			res.body.should.be.a('object');
			res.body.should.have.property('message').eql('Created');
			res.body.should.have.property('name');
			res.body.should.have.property('subdomain');
			res.body.should.have.property('timezone');
			res.body.should.have.property('status');
			res.body.should.have.property('users-range');
			res.body.should.have.property('language');
		done();
		});
	});

	it('should update a SINGLE platform on /platforms/<id> PATCH');

	it('should delete a SINGLE platform on /platforms/<id> DELETE');
});

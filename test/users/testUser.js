
import PlatformFixture from './../../src/fixtures/platform';
import OauthFixture from './../../src/fixtures/oauth2';
import RoleFixture from './../../src/fixtures/roles';

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

describe('my suite - users', function() {

	var platformFixture = new PlatformFixture();
	var oauthFixture = new OauthFixture(platformFixture);
	var roleFixture = new RoleFixture(oauthFixture);

	before(function(done) {
		platformFixture.load().then(() => {
			oauthFixture.load().then(() => {
				roleFixture.load().then(() => {
					done();
				});
				
			});
		});
	});

	it('should create a SINGLE user on /users POST', function(done) {
		var random = new Random();

		chai.request('http://api.cd.gointegro.net')
		.patch('/users')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send({
				
			'data': 
			{
    			'type': 'users',
    			'attributes': 
    				{
      				'name': 'UsuarioBasico',
      				'last-name': 'UsuarioBasico',
      				'email': 'basico'+random.integer(1, 10000)+'@gointegro.com',
      				'status': 'active',
      				'login-enabled': true
    				},
    			'relationships': 
    			{
      			'role': 
      				{
        				'data': 
        				{
          					'id': roleFixture.references['rolesA']['basic'].id,
          					'type':'roles'
        				}
      				}
    			}
  			}
		})
		.end(function(err, res) {
			console.log(res.body);
			res.should.have.status(201);
		done();
		});
	});


	/*it('debug', function(done) {
		console.log(roleFixture.references);
	});*/


});

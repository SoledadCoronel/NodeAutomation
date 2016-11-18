import PlatformFixture from './../../src/fixtures/platform';
import OauthFixture from './../../src/fixtures/oauth2AdminUser';
import RoleFixture from './../../src/fixtures/roles';
import BasicUserFixture from './../../src/fixtures/basicUser';
import InvitationBasicUserFixture from './../../src/fixtures/invitationBasicUser';
import InvitationBasicUserCompleteFixture from './../../src/fixtures/invitationBasicUserComplete';
import AdminSpaceUserFixture from './../../src/fixtures/adminSpaceUser';
import InvitationAdminSpaceUserFixture from './../../src/fixtures/invitationAdminSpaceUser';
import InvitationAdminSpaceUserCompleteFixture from './../../src/fixtures/invitationAdminSpaceUserComplete';
import PublicSpaceFixture from './../../src/fixtures/publicSpace';
import User from './../../src/models/user';
import Role from './../../src/models/role';
import UserSerializer from './../../src/serializers/userSerializer';

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

describe('SUITE - SPACES', function() {

	var platformFixture = new PlatformFixture();
	var oauthFixture = new OauthFixture(platformFixture);
	var roleFixture = new RoleFixture(oauthFixture);
	var basicUserFixture = new BasicUserFixture(roleFixture);
	var invitationBasicUserFixture = new InvitationBasicUserFixture(basicUserFixture);
	var invitationBasicUserCompleteFixture = new InvitationBasicUserCompleteFixture(invitationBasicUserFixture);
	var adminSpaceUserFixture = new AdminSpaceUserFixture(roleFixture);
	var invitationAdminSpaceUserFixture = new InvitationAdminSpaceUserFixture(adminSpaceUserFixture);
	var invitationAdminSpaceUserCompleteFixture = new InvitationAdminSpaceUserCompleteFixture(invitationAdminSpaceUserFixture);
	var publicSpaceFixture = new PublicSpaceFixture(oauthFixture);
	var userSerializer = new UserSerializer();

	before(function(done) {
		platformFixture.load().then(() => {
			oauthFixture.load().then(() => {
				roleFixture.load().then(() => {
					basicUserFixture.load().then(() => {
						invitationBasicUserFixture.load().then(() => {
							invitationBasicUserCompleteFixture.load().then(() => {
								adminSpaceUserFixture.load().then(() => {
									invitationAdminSpaceUserFixture.load().then(() => {
										invitationAdminSpaceUserCompleteFixture.load().then(() => {
											publicSpaceFixture.load().then(() => {
												done();
											})
										})
									})
								})
							})
						})
					})
				})
			})
		})
	});

	it('should list a PUBLIC SPACE on /spaces GET', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/spaces/' + publicSpaceFixture.references.spacePublicA.id)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.end(function(err, res) {
			//console.log(res.body);
			res.should.have.status(200);
			//res.body[0].should.have.property('name');
			//res.body.should.have.property('name');
			//res.should.be.json;
		done();
		});
	});

	/*it('should create a PUBLIC SPACE on /spaces POST', function(done) {
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
			//console.log(res.body);
			res.should.have.status(201);
			//res.body[0].should.have.property('name');
			//res.body.should.have.property('name');
			//res.should.be.json;
		done();
		});
	});*/

	/*it('should create a PRIVATE SPACE on /spaces POST', function(done) {
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
			//console.log(res.body);
			res.should.have.status(201);
			//res.body[0].should.have.property('name');
			//res.body.should.have.property('name');
			//res.should.be.json;
		done();
		});
	});*/

	/*it('should create a COMPANY SPACE on /spaces POST', function(done) {
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
			//console.log(res.body);
			res.should.have.status(201);
			//res.body[0].should.have.property('name');
			//res.body.should.have.property('name');
			//res.should.be.json;
		done();
		});
	});*/
});
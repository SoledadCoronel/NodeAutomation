import PlatformFixture from './../../src/fixtures/platform';
import OauthFixture from './../../src/fixtures/oauth2AdminUser';
import RoleFixture from './../../src/fixtures/roles';
import BasicUserFixture from './../../src/fixtures/basicUser';
import InvitationBasicUserFixture from './../../src/fixtures/invitationBasicUser';
import InvitationBasicUserCompleteFixture from './../../src/fixtures/invitationBasicUserComplete';
import AdminSpaceUserFixture from './../../src/fixtures/adminSpaceUser';
import InvitationAdminSpaceUserFixture from './../../src/fixtures/invitationAdminSpaceUser';
import InvitationAdminSpaceUserCompleteFixture from './../../src/fixtures/invitationAdminSpaceUserComplete';
import PrivateSpaceFixture from './../../src/fixtures/privateSpace';
import PublicSpaceFixture from './../../src/fixtures/publicSpace'
import OauthFixtureBasic from './../../src/fixtures/oauth2BasicUser';
import User from './../../src/models/user';
import Role from './../../src/models/role';
import UserSerializer from './../../src/serializers/userSerializer';

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

var currentPostId = null;
var currentPostId2 = null;
var currentPostId3 = null;

chai.use(chaiHttp);
chai.use(chaiColors);

// comienzo de la suite
describe('SUITE - SOCIAL - HASHTAG - ESPACIO PRIVADO', function() {

	// carga de fixtures
	var platformFixture = new PlatformFixture();
	var oauthFixture = new OauthFixture(platformFixture);
	var roleFixture = new RoleFixture(oauthFixture);
	var basicUserFixture = new BasicUserFixture(roleFixture);
	var invitationBasicUserFixture = new InvitationBasicUserFixture(basicUserFixture);
	var invitationBasicUserCompleteFixture = new InvitationBasicUserCompleteFixture(invitationBasicUserFixture);
	var adminSpaceUserFixture = new AdminSpaceUserFixture(roleFixture);
	var invitationAdminSpaceUserFixture = new InvitationAdminSpaceUserFixture(adminSpaceUserFixture);
	var invitationAdminSpaceUserCompleteFixture = new InvitationAdminSpaceUserCompleteFixture(invitationAdminSpaceUserFixture);
	var oauthFixtureBasic = new OauthFixtureBasic(basicUserFixture, platformFixture);
	var privateSpaceFixture = new PrivateSpaceFixture(oauthFixture);
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
											privateSpaceFixture.load().then(() => {
												oauthFixtureBasic.load().then(() => {
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
			})
		})
	});


	// caso 1: usuario no unido intenta postear en espacio privado
	it('Caso 1: Usuario no joineado - intenta postear un hashtag', function(done) {

		var postData = this;
		this.references = {};

		var hashtagPost = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #testing"
				},
				"relationships": {
					"target": {
						"data": {
							"type": "spaces",
							"id": privateSpaceFixture.references.privateSpace.id
						}
					}
				}
			}
		}
		chai.request('http://api.cd.gointegro.net')
		.post('/posts')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixtureBasic.references.tokenA.access_token)
		.send(hashtagPost)
		.end(function(err, res) {
			expect(res).to.have.status(403);
		done();
		});
	});

	// caso 2: usuario creador del espacio postea un hashtag
	it('Caso 2: Usuario creador del espacio - postea hashtag', function(done) {

		var postData2 = this;
		this.references = {};

		var hashtagPost2 = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #TEsting"
				},
				"relationships": {
					"target": {
						"data": {
							"type": "spaces",
							"id": privateSpaceFixture.references.privateSpace.id
						}
					}
				}
			}
		}
		chai.request('http://api.cd.gointegro.net')
		.post('/posts')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(hashtagPost2)
		.then(function(res) {
			postData2.references['singlePost'] = {
				'id': res.body.data.id
			};
			currentPostId2 = res.body.data.id;
		done();
		});
	});

	// caso 3: usuario creador del espacio postea un hashtag
	it('Caso 3: Usuario creador del espacio - postea hashtag', function(done) {

		var postData3 = this;
		this.references = {};

		var hashtagPost3 = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #tésting"
				},
				"relationships": {
					"target": {
						"data": {
							"type": "spaces",
							"id": privateSpaceFixture.references.privateSpace.id
						}
					}
				}
			}
		}
		chai.request('http://api.cd.gointegro.net')
		.post('/posts')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(hashtagPost3)
		.then(function(res) {
			postData3.references['singlePost'] = {
				'id': res.body.data.id
			};
			currentPostId3 = res.body.data.id;
		done();
		});
	});

	// caso 4: Obtiene posts filtrando por un hashtag 
	it('Caso 4: Usuario basico obtiene posts filtrando por hashtag', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + privateSpaceFixture.references.privateSpace.id + '&' + 'filter[hashtag]=testing')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixtureBasic.references.tokenA.access_token)
		.end(function(err, res) {
			expect(res).to.have.status(403);
		done();
		});
	});

	// caso 5: Usuario admin joinea a usuario básico a espacio
	it('Caso 5: Usuario Admin une a usuario básico - espacio privado', function(done) {

		var userData = {
			"data": [
			{
				"type": "users",
				"id": basicUserFixture.references.basicUserA.id
			}
			]
		}
		chai.request('http://api.cd.gointegro.net')
		.post('/spaces/' + privateSpaceFixture.references.privateSpace.id + '/relationships/members')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(userData)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(204);
		done();
		});
	});

	// caso 6: Usuario joineado intenta postear en espacio privado
	it('Caso 6: Usuario joineado - intenta postear un hashtag', function(done) {

		var postData = this;
		this.references = {};

		var hashtagPost = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #testing"
				},
				"relationships": {
					"target": {
						"data": {
							"type": "spaces",
							"id": privateSpaceFixture.references.privateSpace.id
						}
					}
				}
			}
		}
		chai.request('http://api.cd.gointegro.net')
		.post('/posts')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixtureBasic.references.tokenA.access_token)
		.send(hashtagPost)
		.end(function(err, res) {
			expect(res).to.have.status(201);
		done();
		});
	});

	//Usuario básico se joinea a espacio publico
	it('Caso 7: Usuario básico - se joinea a espacio publico', function(done) {

		var userData = {
			"data": [
			{
				"type": "users",
				"id": basicUserFixture.references.basicUserA.id
			}
			]
		}
		chai.request('http://api.cd.gointegro.net')
		.post('/spaces/' + publicSpaceFixture.references.publicSpace.id + '/relationships/members')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixtureBasic.references.tokenA.access_token)
		.send(userData)
		.end(function(err, res) {
			expect(res).to.have.status(204);
		done();
		});
	});

	// caso 7: Usuario joineado intenta postear en espacio privado
	it('Caso 8: Usuario joineado - postea hastag en espacio publico', function(done) {

		var postData = this;
		this.references = {};

		var hashtagPost = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #TESting"
				},
				"relationships": {
					"target": {
						"data": {
							"type": "spaces",
							"id": publicSpaceFixture.references.publicSpace.id
						}
					}
				}
			}
		}
		chai.request('http://api.cd.gointegro.net')
		.post('/posts')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixtureBasic.references.tokenA.access_token)
		.send(hashtagPost)
		.end(function(err, res) {
			expect(res).to.have.status(201);
		done();
		});
	});
	
	// Obtiene posts filtrando por un hashtag 
	it('Caso 9: Usuario admin filtra por hashtag por espacio privado', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + privateSpaceFixture.references.privateSpace.id + '&' + 'filter[hashtag]=testing')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.should.have.property('data');
			res.body.should.have.property('meta');
			res.body.should.have.property('links');
			res.body.meta.should.have.property('pagination');
			res.body.links.should.have.property('first');
			res.body.links.should.have.property('last');
			res.body.links.should.have.property('prev');
			res.body.links.should.have.property('next');
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(2);
		done();
		});
	});

	// Obtiene posts filtrando por un hashtag 
	it('Caso 10: Usuario basico filtra por hashtag por espacio privado', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + privateSpaceFixture.references.privateSpace.id + '&' + 'filter[hashtag]=testing')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixtureBasic.references.tokenA.access_token)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.should.have.property('data');
			res.body.should.have.property('meta');
			res.body.should.have.property('links');
			res.body.meta.should.have.property('pagination');
			res.body.links.should.have.property('first');
			res.body.links.should.have.property('last');
			res.body.links.should.have.property('prev');
			res.body.links.should.have.property('next');
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(2);
		done();
		});
	});

	// Obtiene posts filtrando por un hashtag 
	it('Caso 11: Usuario basico filtra por hashtag por plataforma', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[hashtag]=testing')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixtureBasic.references.tokenA.access_token)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.should.have.property('data');
			res.body.should.have.property('meta');
			res.body.should.have.property('links');
			res.body.meta.should.have.property('pagination');
			res.body.links.should.have.property('first');
			res.body.links.should.have.property('last');
			res.body.links.should.have.property('prev');
			res.body.links.should.have.property('next');
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(1);
		done();
		});
	});
});
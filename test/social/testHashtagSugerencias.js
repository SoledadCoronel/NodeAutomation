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
import CompanySpaceFixture from './../../src/fixtures/companySpace';
import PrivateSpaceFixture from './../../src/fixtures/privateSpace';
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

var currentProfile = null;

chai.use(chaiHttp);
chai.use(chaiColors);

// comienzo de la suite
describe('SUITE - SOCIAL - HASHTAG - SUGERENCIAS', function() {

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
	var publicSpaceFixture = new PublicSpaceFixture(oauthFixture);
	var companySpaceFixture = new CompanySpaceFixture(oauthFixture);
	var privateSpaceFixture = new PrivateSpaceFixture(oauthFixture);
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
											oauthFixtureBasic.load().then(() => {
												publicSpaceFixture.load().then(() => {
													companySpaceFixture.load().then(() => {
														privateSpaceFixture.load().then(() => {
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
		})
	});

	// caso 1: se obtiene el perfil de un usuario 
	it('Precondición: se obtiene el profile de un usuario', function(done) {

		var profileData = this;
		this.references = {};
		chai.request('http://api.cd.gointegro.net')
		.get('/users/' + basicUserFixture.references.basicUserA.id)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.then(function(res) {
			profileData.references['profile'] = {
				'id': res.body.data.relationships.profile.data.id
			};
			currentProfile = res.body.data.relationships.profile.data.id;
		done();
		});
	});

	// usuario postea en perfil de usuario un hashtag
	it('Caso 1: Crea post con hashtag - perfil de usuario', function(done) {

		var postData = this;
		this.references = {};

		var hashtagPost = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "Publicando #testing en perfil de usuario"
				},
				"relationships": {
					"target": {
						"data": {
							"type": "users",
							"id": currentProfile
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
		.send(hashtagPost)
		.then(function(res) {
			postData.references['singlePost'] = {
				'id': res.body.data.id
			};
		done();
		});
	});


	// usuario postea en su propio perfil de usuario un hashtag
	it('Caso 2: Crea post con hashtag - su propio perfil de usuario', function(done) {

		var postData = this;
		this.references = {};

		var hashtagPost = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "Publicando #TEsting en perfil de usuario"
				},
				"relationships": {
					"target": {
						"data": {
							"type": "users",
							"id": currentProfile
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
		.then(function(res) {
			postData.references['singlePost'] = {
				'id': res.body.data.id
			};
		done();
		});
	});

	// Obtiene posts filtrando por un hashtag -> debería traer 2
	it('Caso 3: Obtiene posts filtrando por hashtag - valida mayúscula/minúscula', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[user]=' + currentProfile + '&filter[hashtag]=testing')
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
			res.body.meta.should.have.property('additional_data');
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
	it('Caso 4: Obtiene posts filtrando por hashtag - valida mayúscula/minúscula', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[user]=' + currentProfile + '&filter[hashtag]=testing')
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
			res.body.meta.should.have.property('additional_data');
			res.body.links.should.have.property('first');
			res.body.links.should.have.property('last');
			res.body.links.should.have.property('prev');
			res.body.links.should.have.property('next');
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(2);
		done();
		});
	});

	//////////////////////// CASOS PARA VERIFICAR SUGERENCIAS //////////////////////////////////

	// caso 5: se crea un post con hashtag en un espacio publico
	it('Caso 5: Crea post con hashtag - espacio publico', function(done) {

		var postData = this;
		this.references = {};

		var hashtagPost = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #testeando"
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
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(hashtagPost)
		.then(function(res) {
			postData.references['postHashtag'] = {
				'id': res.body.data.id
			
			};
		done();
		});
	});

	// caso 6: se crea un post con hashtag en un espacio publico
	it('Caso 6: Crea post con hashtag-espacioBlanco - espacio publico', function(done) {

		var postData = this;
		this.references = {};

		var hashtagPost = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #hash tag"
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
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(hashtagPost)
		.then(function(res) {
			postData.references['postHashtag'] = {
				'id': res.body.data.id
			
			};
		done();
		});
	});

	// caso 7: se crea un post con hashtag en un espacio publico
	it('Caso 7: Crea post con hashtag-guión - espacio publico', function(done) {

		var postData = this;
		this.references = {};

		var hashtagPost = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #hash-tag"
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
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(hashtagPost)
		.then(function(res) {
			postData.references['postHashtag'] = {
				'id': res.body.data.id
			
			};
		done();
		});
	});

	// caso 8: usuario creador del espacio postea un hashtag
	it('Caso 8: Crea post con hashtag - espacio company', function(done) {

		var postData = this;
		this.references = {};

		var hashtagPost = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #testDeIntegracion"
				},
				"relationships": {
					"target": {
						"data": {
							"type": "spaces",
							"id": companySpaceFixture.references.companySpace.id
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
		.send(hashtagPost)
		.then(function(res) {
			postData.references['singlePost'] = {
				'id': res.body.data.id
			};
		done();
		});
	});

	// caso 9: usuario creador del espacio postea un hashtag
	it('Caso 9: Crea post con hashtag - espacio privado', function(done) {

		var postData = this;
		this.references = {};

		var hashtagPost = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #testDeRegresion"
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
		.send(hashtagPost)
		.then(function(res) {
			postData.references['singlePost'] = {
				'id': res.body.data.id
			};
		done();
		});
	});

	// caso 10: usuario creador del espacio postea un hashtag
	it('Caso 10: Crea post con hashtag - espacio privado', function(done) {

		var postData = this;
		this.references = {};

		var hashtagPost = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #téstDeRegresion"
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
		.send(hashtagPost)
		.then(function(res) {
			postData.references['singlePost'] = {
				'id': res.body.data.id
			};
		done();
		});
	});

	// caso 11: Obtiene sugerencias
	it('Caso 11: Usuario basico filtra sugerencias de manera publica', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/hashtags?filter[q]=te')
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
			res.body.data.length.should.be.eql(3);
		done();
		});
	});

	// caso 12: Obtiene sugerencias
	it('Caso 12: Usuario basico filtra sugerencias por espacio publico', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/hashtags?filter[q]=te&filter[space]=' + publicSpaceFixture.references.publicSpace.id)
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
			res.body.data.length.should.be.eql(3);
		done();
		});
	});

	// caso 13: Obtiene sugerencias
	it('Caso 13: Usuario básico filtra sugerencias por espacio company', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/hashtags?filter[q]=te&filter[space]=' + companySpaceFixture.references.companySpace.id)
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
			res.body.data.length.should.be.eql(3);
		done();
		});
	});

	// caso 14: Obtiene sugerencias
	it('Caso 14: Usuario filtra sugerencias por espacio privado', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get(encodeURI('/hashtags?filter[q]=te&filter[space]=' + privateSpaceFixture.references.privateSpace.id))
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.end(function(err, res) {
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
			res.body.data.length.should.be.eql(5);
		done();
		});
	});

	// caso 15: Obtiene sugerencias
	it('Caso 15: Usuario basico filtra sugerencias por espacio privado', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get(encodeURI('/hashtags?filter[q]=té&filter[space]=' + privateSpaceFixture.references.privateSpace.id))
		.set('content-type', 'application/vnd.api+json; charset=UTF-8')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.end(function(err, res) {
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
			res.body.data.length.should.be.eql(5);
		done();
		});
	});

	// caso 16: Obtiene sugerencias
	it('Caso 16: Usuario basico filtra sugerencias sin espacio privado', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get(encodeURI('/hashtags?filter[q]=té'))
		.set('content-type', 'application/vnd.api+json; charset=UTF-8')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixtureBasic.references.tokenA.access_token)
		.end(function(err, res) {
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
			res.body.data.length.should.be.eql(3);
		done();
		});
	});

	// caso 17: Obtiene sugerencias
	it('Caso 17: Usuario basico filtra sugerencias-espacioBlanco por espacio publico', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/hashtags?filter[q]=has&filter[space]=' + publicSpaceFixture.references.publicSpace.id)
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

	// caso 18: Obtiene sugerencias
	it('Caso 18: Usuario basico filtra sugerencias-guión por espacio publico', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/hashtags?filter[q]=has&filter[space]=' + publicSpaceFixture.references.publicSpace.id)
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

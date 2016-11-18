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
var expect = chai.expect;
var assert = chai.assert;

// variables utilizadas en los tests
var currentPostId = null;
var currentPostId2 = null;
var currentPostId3 = null;
var currentCommentId = null;
var currentPostId4 = null;
var currentPostId5 = null;
var currentPostId6 = null;
var currentPostId7 = null;

chai.use(chaiHttp);
chai.use(chaiColors);


// comienzo de la suite
describe('SUITE - SOCIAL', function() {

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

	// caso 1: se crea un post con hashtag en un espacio publico
	it('Caso 1: Crea post con hashtag - palabra minúscula', function(done) {

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
			currentPostId = res.body.data.id;
		done();
		});
	});

	// se crea un post con hashtag con parte mayúscula
	it('Caso 2: Crea post con hashtag - palabra mayúscula', function(done) {

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
		.send(hashtagPost2)
		.then(function(res) {
			postData2.references['singlePost'] = {
				'id': res.body.data.id
			};
			currentPostId2 = res.body.data.id;
		done();
		});
	});

	// se crea un post con hashtag con tilde
	it('Caso 3: Crea post con hashtag - palabra con tilde', function(done) {

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
		.send(hashtagPost3)
		.then(function(res) {
			postData3.references['singlePost'] = {
				'id': res.body.data.id
			};
			currentPostId3 = res.body.data.id;
		done();
		});
	});

	// se crea un hashtag no válido, no viene como filtro de hashtag, si como resultado de post en espacio
	it('Caso 4: Crea post con hashtag - símbolos', function(done) {

		var postData4 = this;
		this.references = {};

		var hashtagPost4 = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #😀%&!"
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
		.send(hashtagPost4)
		.then(function(res) {
			postData4.references['singlePost'] = {
				'id': res.body.data.id
			};
			currentPostId4 = res.body.data.id;
		done();
		});
	});

	// se crea un hashtag con letras con cedilla, virgulilla, diéresis y apóstrofe
	it('Caso 5: Crea post con hashtag - letras con cedilla, virgulilla, diéresis, apóstrofe', function(done) {

		var postData5 = this;
		this.references = {};

		var hashtagPost5 = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #MaríaGüillerminaGonçalvesNuñezOcoñor"
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
		.set('content-type', 'application/vnd.api+json; charset=UTF-8')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(hashtagPost5)
		.then(function(res) {
			postData5.references['singlePost'] = {
				'id': res.body.data.id
			};
			currentPostId5 = res.body.data.id;
		done();
		});
	});

	// se crea un hashtag hasta el carácter inválido
	it('Caso 6: Crea post con hashtag - hasta el caracter inválido', function(done) {

		var postData6 = this;
		this.references = {};

		var hashtagPost6 = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #estoEsVádidoHastaAcá😀loQueSigueNoEntra"
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
		.set('content-type', 'application/vnd.api+json; charset=UTF-8')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(hashtagPost6)
		.then(function(res) {
			postData6.references['singlePost'] = {
				'id': res.body.data.id
			};
			currentPostId6 = res.body.data.id;
		done();
		});
	});

	// se crean dos hashtags en el mismo post
	it('Caso 7: Crea post con hashtag - Dos hashtags en el mismo post', function(done) {

		var postData7 = this;
		this.references = {};

		var hashtagPost7 = {
			"data": {
				"type": "posts",
				"attributes": {
					"content": "contenido de post con hashtag #EstosSonDos#Hashtags"
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
		.set('content-type', 'application/vnd.api+json; charset=UTF-8')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(hashtagPost7)
		.then(function(res) {
			postData7.references['singlePost'] = {
				'id': res.body.data.id
			};
			currentPostId7 = res.body.data.id;
		done();
		});
	});

	// se crea un comentario con hashtag sobre un post con hashtag
	it('Caso 8: Crea un comentario sobre un post', function(done) {

		var commentData = this;
		this.references = {};

		var hashtagComment = {
			"data": {
				"type": "comments",
				"attributes": {
					"comment": "commentario de post con hashtag #testing"
				},
				"relationships": {
					"subject": {
						"data": {
							"type": "posts",
							"id": currentPostId
						}
					}
				}
			}
		}
		chai.request('http://api.cd.gointegro.net')
			.post('/comments')
			.set('content-type', 'application/vnd.api+json')
			.set('Accept', 'application/vnd.api+json')
			.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
			.send(hashtagComment)
			.then(function(res) {
				commentData.references['commentHashtag'] = {
					'id': res.body.data.id
				};
			currentCommentId = res.body.data.id;
			done();
			})
	});

	// se crea una respuesta con hashtag a un comentario con hashtag
	it('Caso 9: Crea una respuesta con hashtag sobre un comentario', function(done) {

		var replyData = this;
		this.references = {};

		var hashtagReply = {
			"data": {
				"type": "comments",
				"attributes": {
					"comment": "Respuesta con hashtag a un comentario #testing"
				},
				"relationships": {
					"subject": {
						"data": {
							"type": "posts",
							"id": currentPostId
						}
					},
					"reply-to": {
						"data": {
							"type": "comments",
							"id": currentCommentId
						}
					}    
				}
			}
		}
		chai.request('http://api.cd.gointegro.net')
			.post('/comments')
			.set('content-type', 'application/vnd.api+json')
			.set('Accept', 'application/vnd.api+json')
			.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
			.send(hashtagReply)
			.then(function(res) {
				replyData.references['replyHashtag'] = {
					'id': res.body.data.id
				};
			done();
			})
	});

	// Obtiene posts filtrando por un hashtag -> debería traer 4 resultados (incluye comentario y respuesta)
	it('Caso 10: Obtiene posts filtrando por hashtag - valida mayúscula/minúscula', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + publicSpaceFixture.references.publicSpace.id + '&' + 'filter[hashtag]=testing')
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
			res.body.data.length.should.be.eql(4);
		done();
		});
	});

	// Obtiene posts filtrando por un hashtag -> solo deberia traer 1 resultado
	it('Caso 11: Obtiene posts filtando por hashtag - valida tilde', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get(encodeURI('/feed-items?filter[space]=' + publicSpaceFixture.references.publicSpace.id + '&' + 'filter[hashtag]=tésting'))
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
			res.body.data.length.should.be.eql(1);
		done();
		});
	});

	// Obtiene posts filtrando por un hashtag -> solo deberia traer 1 resultado
	it('Caso 12: Obtiene posts filtando por hashtag - valida caracteres especiales permitidos', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get(encodeURI('/feed-items?filter[space]=' + publicSpaceFixture.references.publicSpace.id + '&' + 'filter[hashtag]=MaríaGüillerminaGonçalvesNuñezO' + 'coñor'))
		.set('content-type', 'application/vnd.api+json; charset=UTF-8')
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
			res.body.data.length.should.be.eql(1);
		done();
		});
	});

	// Obtiene posts filtrando por un hashtag -> hasta el caracter inválido
	it('Caso 13: Obtiene posts filtando por hashtag - valida hasta el caracter inválido', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get(encodeURI('/feed-items?filter[space]=' + publicSpaceFixture.references.publicSpace.id + '&' + 'filter[hashtag]=estoEsVádidoHastaAcá'))
		.set('content-type', 'application/vnd.api+json; charset=UTF-8')
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
			res.body.data.length.should.be.eql(1);
		done();
		});
	});

	// Obtiene posts filtrando por un hashtag -> Dos hashtags en un mismo post
	it('Caso 14: Obtiene posts filtando por hashtag - valida primer hashtag', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get(encodeURI('/feed-items?filter[space]=' + publicSpaceFixture.references.publicSpace.id + '&' + 'filter[hashtag]=EstosSonDos'))
		.set('content-type', 'application/vnd.api+json; charset=UTF-8')
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
			res.body.data.length.should.be.eql(1);
		done();
		});
	});

	// Obtiene posts filtrando por un hashtag -> Dos hashtags en un mismo post
	it('Caso 15: Obtiene posts filtando por hashtag - valida segundo hashtag hashtag', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get(encodeURI('/feed-items?filter[space]=' + publicSpaceFixture.references.publicSpace.id + '&' + 'filter[hashtag]=Hashtags'))
		.set('content-type', 'application/vnd.api+json; charset=UTF-8')
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
			res.body.data.length.should.be.eql(1);
		done();
		});
	});

	// Obtiene todos los posts de un espacio - Omite comentario y respuesta
	it('Caso 16: Obtiene todos los posts del espacio', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + publicSpaceFixture.references.publicSpace.id)
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
			res.body.data.length.should.be.eql(7);
		done();
		});
	});

	// Obtiene los comentarios de un post
	it('Caso 17: Obtiene los comentarios de un post', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/comments?filter[post]=' + currentPostId)
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
			res.body.data.length.should.be.eql(1);
		done();
		});
	});

	// Obtiene las respuestas a un comentario
	it('Caso 18: Obtiene las respuestas a un comentario', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/comments?filter[parent-id]=' + currentCommentId)
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
			res.body.data.length.should.be.eql(1);
		done();
		});
	});
});


import Space from './../../src/models/space';
import Post from './../../src/models/post';
import Comment from './../../src/models/comment';
import { session } from './../../src/services/session';
var jsonData = require('./../fixtures/data.json');

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");
var random = new Random();
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiHttp);
chai.use(chaiColors);

var publicSpace = null;

// variables utilizadas en los tests
var currentPostId = null;
var currentPostId2 = null;
var currentPostId3 = null;
var currentPostId4 = null;
var currentPostId5 = null;
var currentPostId6 = null;
var currentPostId7 = null;
var currentPostId8 = null;
var currentPostId9 = null;
var currentPostId10 = null;
var currentPostId11 = null;
var currentPostId12 = null;
var currentCommentId = null;
var currentCommentId2 = null;



describe('SUITE - HASHTAG', function() {
	session.addToken(1, jsonData.adminToken);

// PRECONDICIONES PARA LA SUITE
///////////////////////////////////////////////////////////////////////////////////////////

console.log("PRECONCIONES");
it('creates a new public space', function(done) {

	let space = new Space({
		name: 'espacio publico',
		description: 'espacio publico',
		icon: 'QA',
		active: true,
		'social-enabled': true,
		position: 0,
		visibility: 'public'
	});
	space.create()
	.then((response) => {
		response.should.have.status('201');
		expect(space.active).to.equal(true);
		space = response.content;
		publicSpace = space;
		done();
	});
});

it('creates new hashtag #testing', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #testing',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId = post;
		done();
	});
});

it('creates new hashtag #TEsting', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #TEsting',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId2 = post;
		done();
	});
});

it('creates new hashtag #tesTING', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #tesTING',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId3 = post;
		done();
	});
});

it('creates new hashtag #TESTING', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #TESTING',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId4 = post;
		done();
	});
});

it('creates new hashtag #Testing', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #Testing',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId5 = post;
		done();
	});
});

it('creates new hashtag #tésting', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #tésting',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId6 = post;
		done();
	});
});

it('creates new hashtag #😀%&!', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #😀%&!',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId7 = post;
		done();
	});
});

it('creates new hashtag #MaríaGüillerminaGonçalvesNuñezOcoñor', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #MaríaGüillerminaGonçalvesNuñezOcoñor',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId8 = post;
		done();
	});
});

it('creates new hashtag #estoEsVálidoHastaAcá😀loQueSigueNoEntra', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #estoEsVálidoHastaAcá😀loQueSigueNoEntra',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId9 = post;
		done();
	});
});

it('creates new hashtag ##testing', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag ##testing',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId10 = post;
		done();
	});
});

it('creates new hashtag #EstosSonDos#Hashtags', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #EstosSonDos#Hashtags',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId11 = post;
		done();
	});
});

it('creates new hashtag #caracterØEspecial #carâcterEspecial', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #caracterØEspecial #carâcterEspecial',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPostId12 = post;
		done();
	});
});

it('Create comment on a post1 #testing', function(done) {

	let comment = new Comment({
		comment: 'commentario de post con hashtag #testing',
		subject: currentPostId
	});
	comment.create()
	.then((response) => {
		response.should.have.status('201');
		comment = response.content;
		currentCommentId = comment;
		done();
	});
});

it('Create comment on a post2 #testing', function(done) {

	let comment = new Comment({
		comment: 'commentario de post con hashtag #testing',
		subject: currentPostId2
	});
	comment.create()
	.then((response) => {
		response.should.have.status('201');
		comment = response.content;
		currentCommentId2 = comment;
		done();
	});
});


it('Create response with hashtag to comment with hashtag', function(done) {

	let comment = new Comment({
		comment: 'Respuesta con hashtag a un comentario #testing',
		subject: currentPostId,
		'reply-to': currentCommentId

	});
	comment.create()
	.then((response) => {
		response.should.have.status('201');
		comment = response.content;
		currentCommentId2 = comment;
		done();
	});
});

});


	// se crea una respuesta con hashtag a un comentario con hashtag
	/*it('Caso 15: Crea una respuesta con hashtag sobre un comentario1', function(done) {

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

	// se crea una respuesta con hashtag a un comentario con hashtag
	it('Caso 16: Crea una respuesta con hashtag sobre un comentario2', function(done) {

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
							"id": currentPostId2
						}
					},
					"reply-to": {
						"data": {
							"type": "comments",
							"id": currentCommentId2
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
	it('Caso 17: Obtiene posts filtrando por hashtag - valida mayúscula/minúscula', function(done) {
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
			res.body.data.length.should.be.eql(6);
		done();
		});
	});

	// Obtiene posts filtrando por un hashtag -> solo deberia traer 1 resultado
	it('Caso 18: Obtiene posts filtando por hashtag - valida tilde', function(done) {
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
	it('Caso 19: Obtiene posts filtando por hashtag - valida caracteres especiales permitidos', function(done) {
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
	it('Caso 20: Obtiene posts filtando por hashtag - valida hasta el caracter inválido', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get(encodeURI('/feed-items?filter[space]=' + publicSpaceFixture.references.publicSpace.id + '&' + 'filter[hashtag]=estoEsVálidoHastaAcá'))
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
	it('Caso 21: Obtiene posts filtando por hashtag - valida primer hashtag', function(done) {
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
			//res.body.meta.should.have.property('additional_data');
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
	it('Caso 22: Obtiene posts filtando por hashtag - valida segundo hashtag hashtag', function(done) {
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
			//res.body.meta.should.have.property('additional_data');
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
	it('Caso 23: Obtiene todos los posts del espacio', function(done) {
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
			res.body.data.length.should.be.eql(12);
		done();
		});
	});

	// Obtiene los comentarios de un post
	it('Caso 24: Obtiene los comentarios de un post', function(done) {
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
	it('Caso 25: Obtiene las respuestas a un comentario', function(done) {
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

	// Obtiene posts filtrando por un hashtag 
	it('Caso 26: Obtiene posts filtrando por hashtag - valida rango y paginado tamaño 2', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + publicSpaceFixture.references.publicSpace.id 
			+ '&' + 'filter[hashtag]=testing' + '&' + 'filter[from]=' + currentPostId4 +
			'filter[to]=' + currentPostId2 + '&' + 'page[size]=' + 2)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(2);
		done();
		});
	});

	// Obtiene posts filtrando por un hashtag 
	it('Caso 27: Obtiene posts filtrando por hashtag - valida rango y paginado tamaño 3', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + publicSpaceFixture.references.publicSpace.id 
			+ '&' + 'filter[hashtag]=testing' + '&' + 'filter[from]=' + currentPostId4 +
			'filter[to]=' + currentPostId2 + '&' + 'page[size]=' + 3)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(3);
		done();
		});
	});

	// Obtiene posts filtrando por un hashtag 
	it('Caso 28: Obtiene posts filtrando por hashtag - olderThan', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + publicSpaceFixture.references.publicSpace.id 
			+ '&' + 'filter[hashtag]=testing' + '&' + 'filter[older-than]=' + currentPostId4)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(3);
		done();
		});
	});*/
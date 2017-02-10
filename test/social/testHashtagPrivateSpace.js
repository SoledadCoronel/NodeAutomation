import Space from './../../src/models/space';
import Post from './../../src/models/post';
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

var privateSpace = null;
var publicSpace = null;

// variables utilizadas en los tests
var currentPost = null;
var currentPost2 = null;
var currentPost3 = null;

// comienzo de la suite
describe('SUITE - HASHTAG - PRIVATE SPACE', function() {

session.addToken(1, jsonData.adminToken);

// PRECONDICIONES PARA LA SUITE
///////////////////////////////////////////////////////////////////////////////////////////

console.log("PRECONCIONES");

it('creates a new private space', function(done) {

	let space = new Space({
		name: 'espacio privado',
		description: 'espacio privado',
		icon: 'QA',
		active: true,
		'social-enabled': true,
		position: 0,
		visibility: 'private'
	});
	space.create()
	.then((response) => {
		response.should.have.status('201');
		expect(space.active).to.equal(true);
		space = response.content;
		privateSpace = space;
		done();
	});
});

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

it('creates new hashtag #TEsting', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #TEsting',
		target: privateSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPost = post;
		done();
	});
});

it('creates new hashtag #tésting', function(done) {

	let post = new Post({
		content: 'contenido de post con hashtag #tésting',
		target: privateSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPost2 = post;
		done();
	});
});


// TESTS CASES
///////////////////////////////////////////////////////////////////////////////////////////

console.log("TESTS CASES");

it('Caso 1: Basic user gets posts filtering by hashtag', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get('/feed-items?filter[space]=' + privateSpace.id + '&' + 'filter[hashtag]=testing')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.basicToken)
	.end(function(err, res) {
		expect(res).to.have.status(403);
		done();
	});
});

it('Caso 2: User Admin joins basic user - private space', function(done) {
		var data = {"data": [{"type": "users","id": jsonData.basicUser.id}]}
		chai.request('http://api.cd.gointegro.net')
		.post('/spaces/' + privateSpace.id + '/relationships/members')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + jsonData.adminToken)
		.send(data)
		.end(function(err, res) {
			expect(res).to.have.status(204);
		done();
		});
	});


it('Caso 3: Joined user posts a hashtag - private space', function(done) {
	session.addToken(1, jsonData.basicToken);
	let post = new Post({
		content: 'contenido de post con hashtag #testing',
		target: privateSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		done();
	});
});

it('Caso 4: Basic user joins himself to public space', function(done) {
		var data = {"data": [{"type": "users","id": jsonData.basicUser.id}]}
		chai.request('http://api.cd.gointegro.net')
		.post('/spaces/' + publicSpace.id + '/relationships/members')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + jsonData.basicToken)
		.send(data)
		.end(function(err, res) {
			expect(res).to.have.status(204);
		done();
		});
	});

it('Caso 5: Joined user posts a hashtag - public space', function(done) {
	session.addToken(1, jsonData.basicToken);
	let post = new Post({
		content: 'contenido de post con hashtag #TESting',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		done();
	});
});

it('Caso 6: User admin filtered by hashtag for private space', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get('/feed-items?filter[space]=' + privateSpace.id + '&' + 'filter[hashtag]=testing')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(2);
		expect(res.body.meta.pagination['total-items']).to.equal(2);
		done();
	});
});

it('Caso 7: Usuario basico filtra por hashtag por espacio privado', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get('/feed-items?filter[space]=' + privateSpace.id + '&' + 'filter[hashtag]=testing')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.basicToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(2);
		expect(res.body.meta.pagination['total-items']).to.equal(2);
		done();
	});
});

it('Caso 8: Basic user filters by hashtag by platform', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + publicSpace.id + '&' + 'filter[hashtag]=testing')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + jsonData.basicToken)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(1);
			expect(res.body.meta.pagination['total-items']).to.equal(1);
		done();
		});
	});
});
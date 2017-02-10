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
var currentPost = null;
var currentPost2 = null;
var currentPost3 = null;
var currentPost4 = null;
var currentPost5 = null;
var currentPost6 = null;
var currentPost7 = null;
var currentPost8 = null;
var currentPost9 = null;
var currentPost10 = null;
var currentPost11 = null;
var currentPost12 = null;
var currentComment = null;
var currentComment2 = null;



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
		currentPost = post;
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
		currentPost2 = post;
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
		currentPost3 = post;
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
		currentPost4 = post;
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
		currentPost5 = post;
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
		currentPost6 = post;
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
		currentPost7 = post;
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
		currentPost8 = post;
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
		currentPost9 = post;
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
		currentPost10 = post;
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
		currentPost11 = post;
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
		currentPost12 = post;
		done();
	});
});

it('Create comment on a post1 #testing', function(done) {

	let comment = new Comment({
		comment: 'commentario de post con hashtag #testing',
		subject: currentPost,
	});
	comment.create()
	.then((response) => {
		response.should.have.status('201');
		comment = response.content;
		currentComment = comment;
		done();
	});
});

it('Create comment on a post2 #testing', function(done) {

	let comment = new Comment({
		comment: 'commentario de post con hashtag #testing',
		subject: currentPost2,
	});
	comment.create()
	.then((response) => {
		response.should.have.status('201');
		comment = response.content;
		currentComment2 = comment;
		done();
	});
});


it('Create response with hashtag to comment1 with hashtag', function(done) {

	let comment = new Comment({
		comment: 'Respuesta con hashtag a un comentario #testing',
		subject: currentPost,
		'reply-to': currentComment

	});
	comment.create()
	.then((response) => {
		response.should.have.status('201');
		done();
	});
});

it('Create response with hashtag to comment2 with hashtag', function(done) {

	let comment = new Comment({
		comment: 'Respuesta con hashtag a un comentario #testing',
		subject: currentPost2,
		'reply-to': currentComment2

	});
	comment.create()
	.then((response) => {
		response.should.have.status('201');
		done();
	});
});

// TESTS CASES
///////////////////////////////////////////////////////////////////////////////////////////

console.log("TESTS CASES");

it('Caso 1: gets posts filtering by hashtag - valid upper / lower case', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get('/feed-items?filter[space]=' + publicSpace.id + '&' + 'filter[hashtag]=testing')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(6);
		expect(res.body.meta.pagination['total-items']).to.equal(6);
		done();
	});
});
		
it('Caso 2: Get posts filtering by hashtag - valid tilde', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get(encodeURI('/feed-items?filter[space]=' + publicSpace.id + '&' + 'filter[hashtag]=tésting'))
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(1);
		expect(res.body.meta.pagination['total-items']).to.equal(1);
		done();
	});
});

it('Caso 3: Get posts filtering by hashtag - validate special characters allowed', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get(encodeURI('/feed-items?filter[space]=' + publicSpace.id + '&' + 'filter[hashtag]=MaríaGüillerminaGonçalvesNuñezO' + 'coñor'))
	.set('content-type', 'application/vnd.api+json; charset=UTF-8')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(1);
		expect(res.body.meta.pagination['total-items']).to.equal(1);
		done();
	});
});

it('Caso 4: Get posts filtering by hashtag - validate to invalid character', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get(encodeURI('/feed-items?filter[space]=' + publicSpace.id + '&' + 'filter[hashtag]=estoEsVálidoHastaAcá'))
	.set('content-type', 'application/vnd.api+json; charset=UTF-8')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(1);
		expect(res.body.meta.pagination['total-items']).to.equal(1);
		done();
	});
});

it('Caso 5: Get posts filtering by hashtag - valid first hashtag', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get(encodeURI('/feed-items?filter[space]=' + publicSpace.id + '&' + 'filter[hashtag]=EstosSonDos'))
		.set('content-type', 'application/vnd.api+json; charset=UTF-8')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + jsonData.adminToken)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(1);
			expect(res.body.meta.pagination['total-items']).to.equal(1);
		done();
		});
	});

it('Caso 6: Get posts filtering by hashtag - validate hashtag second hashtag', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get(encodeURI('/feed-items?filter[space]=' + publicSpace.id + '&' + 'filter[hashtag]=Hashtags'))
		.set('content-type', 'application/vnd.api+json; charset=UTF-8')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + jsonData.adminToken)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(1);
			expect(res.body.meta.pagination['total-items']).to.equal(1);
		done();
		});
	});

it('Caso 7: Get all posts in the space', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + publicSpace.id)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + jsonData.adminToken)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(12);
			expect(res.body.meta.pagination['total-items']).to.equal(12);
		done();
		});
	});

it('Caso 8: Get posts filtering by hashtag - valid range and pagination size 2', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + publicSpace.id 
			+ '&' + 'filter[hashtag]=testing' + '&' + 'filter[from]=' + currentPost4.id +
			'filter[to]=' + currentPost2 + '&' + 'page[size]=' + 2)
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

it('Caso 9: Get posts filtering by hashtag - valid range and pagination size 3', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + publicSpace.id 
			+ '&' + 'filter[hashtag]=testing' + '&' + 'filter[from]=' + currentPost4.id +
			'filter[to]=' + currentPost2 + '&' + 'page[size]=' + 3)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + jsonData.adminToken)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(3);
			expect(res.body.meta.pagination['total-items']).to.equal(3);
		done();
		});
	});

it('Caso 10: Get posts filtering by hashtag - olderThan', function(done) {
		chai.request('http://api.cd.gointegro.net')
		.get('/feed-items?filter[space]=' + publicSpace.id 
			+ '&' + 'filter[hashtag]=testing' + '&' + 'filter[older-than]=' + currentPost4.id)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + jsonData.adminToken)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			res.body.data.should.be.a('array');
			res.body.data.length.should.be.eql(3);
			expect(res.body.meta.pagination['total-items']).to.equal(3);
		done();
		});
	});
});
import Space from './../../src/models/space';
import Post from './../../src/models/post';
import User from './../../src/models/user';
import FeedItem from './../../src/models/feedItem';
import Hashtag from './../../src/models/hashtag';
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
var companySpace = null;
var privateSpace = null;
var currentUser = null;
var currentProfilePost = null;
var currentProfilePost2 = null;
var currentPost = null;
var currentPost2 = null;
var currentPost3 = null;
var currentPost4 = null;
var currentPost5 = null;
var currentPost6 = null;
// comienzo de la suite
describe('SUITE - HASHTAG - SUGGESTIONS', function() {


it('fetches a profile user', function(done) {
	session.addToken(1, jsonData.adminToken);
	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		response.should.have.status('200');
		currentUser = response.content;
		done();
	});
});

it('creates a new public space', function(done) {
	session.addToken(1, jsonData.adminToken);
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

it('creates a new company space', function(done) {
	session.addToken(1, jsonData.adminToken);
	let space = new Space({
		name: 'espacio company',
		description: 'espacio company',
		icon: 'QA',
		active: true,
		'social-enabled': true,
		position: 0,
		visibility: 'company'
	});
	space.create()
	.then((response) => {
		response.should.have.status('201');
		expect(space.active).to.equal(true);
		space = response.content;
		companySpace = space;
		done();
	});
});

it('creates a new private space', function(done) {
	session.addToken(1, jsonData.adminToken);
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

it('creates new hashtag #testing', function(done) {
	session.addToken(1, jsonData.adminToken);
	let post = new Post({
		content: 'Publicando #testing en perfil de usuario',
		target: currentUser
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentProfilePost = post;
		done();
	});
});

it('creates new hashtag #TEsting', function(done) {
	session.addToken(1, jsonData.adminToken);
	let post = new Post({
		content: 'Publicando #TEsting en perfil de usuario',
		target: currentUser
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentProfilePost2 = post;
		done();
	});
});

it('Get posts filtering by hashtag - valid uppercase and lowercase', function(done) {
	session.addToken(1, jsonData.adminToken);
	new FeedItem()
	.list({filter: {'user': currentUser.id, 'hashtag': 'testing'}})
		.then((response) => {
			response.should.have.status('200');
			response.content.elements.should.be.a('array');
			response.content.elements.length.should.be.eql(2);
			expect(response.content.meta.pagination['total-items']).to.equal(2);
			done();
		});
	});

it('Get posts filtering by hashtag - valid uppercase and lowercase', function(done) {

	session.addToken(1, jsonData.basicToken);
	new FeedItem()
	.list({filter: {'user': currentUser.id, 'hashtag': 'testing'}})
		.then((response) => {
			response.should.have.status('200');
			response.content.elements.should.be.a('array');
			response.content.elements.length.should.be.eql(2);
			expect(response.content.meta.pagination['total-items']).to.equal(2);
			done();
		});
	});

it('creates new hashtag #testing', function(done) {
	session.addToken(1, jsonData.adminToken);
	let post = new Post({
		content: 'contenido de post con hashtag #testeando',
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

it('creates new hashtag #hash tag', function(done) {
	session.addToken(1, jsonData.adminToken);
	let post = new Post({
		content: 'contenido de post con hashtag #hash tag',
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

it('creates new hashtag #hash-tag', function(done) {
	session.addToken(1, jsonData.adminToken);
	let post = new Post({
		content: 'contenido de post con hashtag #hash-tag',
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

it('creates new hashtag #testDeIntegracion - company space', function(done) {
	session.addToken(1, jsonData.adminToken);
	let post = new Post({
		content: 'contenido de post con hashtag #testDeIntegracion',
		target: companySpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPost4 = post;
		done();
	});
});

it('creates new hashtag #testDeRegresion - private space', function(done) {
	session.addToken(1, jsonData.adminToken);
	let post = new Post({
		content: 'contenido de post con hashtag #testDeRegresion',
		target: privateSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPost5 = post;
		done();
	});
});

it('creates new hashtag #testDeRegresion - private space', function(done) {
	session.addToken(1, jsonData.adminToken);
	let post = new Post({
		content: 'contenido de post con hashtag #téstDeRegresion',
		target: privateSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPost6 = post;
		done();
	});
});

it('Basic user filters suggestions publicly', function(done) {

	session.addToken(1, jsonData.basicToken);
	new Hashtag()
	.list({filter: {'q': 'te'}})
		.then((response) => {
			response.should.have.status('200');
			response.content.elements.should.be.a('array');
			response.content.elements.length.should.be.eql(3);
			expect(response.content.meta.pagination['total-items']).to.equal(3);
			done();
		});
	});

it('Basic user filters suggestions publicly', function(done) {

	session.addToken(1, jsonData.basicToken);
	new Hashtag()
	.list({filter: {'q': 'te', 'space': publicSpace.id}})
		.then((response) => {
			response.should.have.status('200');
			response.content.elements.should.be.a('array');
			response.content.elements.length.should.be.eql(3);
			expect(response.content.meta.pagination['total-items']).to.equal(3);
			done();
		});
	});

it('Basic user filters suggestions by space company', function(done) {

	session.addToken(1, jsonData.basicToken);
	new Hashtag()
	.list({filter: {'q': 'te', 'space': companySpace.id}})
		.then((response) => {
			response.should.have.status('200');
			response.content.elements.should.be.a('array');
			response.content.elements.length.should.be.eql(3);
			expect(response.content.meta.pagination['total-items']).to.equal(3);
			done();
		});
	});

it('Basic user filters suggestions without private space', function(done) {

	session.addToken(1, jsonData.basicToken);
	new Hashtag()
	.list({filter: {'q': 'té'}})
		.then((response) => {
			response.should.have.status('200');
			response.content.elements.should.be.a('array');
			response.content.elements.length.should.be.eql(3);
			expect(response.content.meta.pagination['total-items']).to.equal(3);
			done();
		});
	});

it('Basic user filters suggestions-spaceBlanco by public space', function(done) {

	session.addToken(1, jsonData.basicToken);
	new Hashtag()
	.list({filter: {'q': 'has', 'space': publicSpace.id}})
		.then((response) => {
			response.should.have.status('200');
			response.content.elements.should.be.a('array');
			response.content.elements.length.should.be.eql(1);
			expect(response.content.meta.pagination['total-items']).to.equal(1);
			done();
		});
	});

it('User filters suggestions for private space', function(done) {

	session.addToken(1, jsonData.adminToken);
	new Hashtag()
	.list({filter: {'q': 'té', 'space': privateSpace.id}})
		.then((response) => {
			response.should.have.status('200');
			response.content.elements.should.be.a('array');
			response.content.elements.length.should.be.eql(5);
			expect(response.content.meta.pagination['total-items']).to.equal(5);
			done();
		});
	});
});


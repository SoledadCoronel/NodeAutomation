import Space from './../../src/models/space';
import Post from './../../src/models/post';
import User from './../../src/models/user';
import FeedItem from './../../src/models/feedItem';
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
var profileUser = null;
var currentProfilePost = null;
var currentProfilePost2 = null;
var currentPost = null;
var currentPost2 = null;
var currentPost3 = null;
var currentPost4 = null;
var currentPost5 = null;
var currentPost6 = null;
// comienzo de la suite
describe('SUITE - SOCIAL - HASHTAG - SUGERENCIAS', function() {
	session.addToken(1, jsonData.adminToken);

// PRECONDICIONES PARA LA SUITE
///////////////////////////////////////////////////////////////////////////////////////////

console.log("PRECONCIONES");

it('fetches a profile user', function(done) {
	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		response.should.have.status('200');
		profileUser = response.content.profile;
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

it('creates a new company space', function(done) {

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

	let post = new Post({
		content: 'Publicando #testing en perfil de usuario',
		target: profileUser
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

	let post = new Post({
		content: 'Publicando #TEsting en perfil de usuario',
		target: profileUser
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentProfilePost2 = post;
		done();
	});
});

/*it('Get posts filtering by hashtag - valid uppercase and lowercase', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get('/feed-items?filter[user]=' + profileUser.id + '&filter[hashtag]=testing')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		//res.body.data.length.should.be.eql(2);
		console.log(res.body);
		done();
	});
});*/

it('prueba feeditem', function(done) {
	var testing = 'testing';
	new FeedItem()
	.list({filter: {'user': profileUser.id}, filter: {'hashtag': testing}})
		.then((response) => {
			response.should.have.status('200');
			expect(response.content.meta.pagination['total-items']).to.equal(2);
			console.log(response.content);
			done();
		});
	});
});

// Obtiene posts filtrando por un hashtag -> debería traer 2
/*it('Get posts filtering by hashtag - valid uppercase and lowercase', function(done) {
	session.addToken(1, jsonData.basicToken);
	chai.request('http://api.cd.gointegro.net')
	.get('/feed-items?filter[user]=' + profileUser.id + '&filter[hashtag]=testing')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.basicToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(2);
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
	chai.request('http://api.cd.gointegro.net')
	.get('/hashtags?filter[q]=te')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.basicToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(3);
		expect(res.body.meta.pagination['total-items']).to.equal(3);
		done();
	});
});

it('Usuario basico filtra sugerencias por espacio publico', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get('/hashtags?filter[q]=te&filter[space]=' + publicSpace.id)
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.basicToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(3);
		expect(res.body.meta.pagination['total-items']).to.equal(3);
		done();
	});
});

it('Usuario básico filtra sugerencias por espacio company', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get('/hashtags?filter[q]=te&filter[space]=' + companySpace.id)
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.basicToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(3);
		expect(res.body.meta.pagination['total-items']).to.equal(3);
		done();
	});
});

it('Usuario filtra sugerencias por espacio privado', function(done) {
	session.addToken(1, jsonData.adminToken);
	chai.request('http://api.cd.gointegro.net')
	.get(encodeURI('/hashtags?filter[q]=té&filter[space]=' + privateSpace.id))
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.end(function(err, res) {
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(5);
		expect(res.body.meta.pagination['total-items']).to.equal(5);
		done();
	});
});


it('Basic user filters suggestions without private space', function(done) {
	session.addToken(1, jsonData.basicToken);
	chai.request('http://api.cd.gointegro.net')
	.get(encodeURI('/hashtags?filter[q]=té'))
	.set('content-type', 'application/vnd.api+json; charset=UTF-8')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.basicToken)
	.end(function(err, res) {
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(3);
		done();
	});
});

it('Caso 17: Usuario basico filtra sugerencias-espacioBlanco por espacio publico', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get('/hashtags?filter[q]=has&filter[space]=' + publicSpace.id)
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.basicToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(1);
		done();
	});
});

it('Caso 18: Usuario basico filtra sugerencias-guión por espacio publico', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get('/hashtags?filter[q]=has&filter[space]=' + publicSpace.id)
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.basicToken)
	.end(function(err, res) {
		expect(err).to.be.null;
		expect(res).to.have.status(200);
		res.body.data.should.be.a('array');
		res.body.data.length.should.be.eql(1);
		done();
	});
});
});*/

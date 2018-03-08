import Space from './../../src/models/space';
import Post from './../../src/models/post';
import Comment from './../../src/models/comment';
import Like from './../../src/models/like';
import { session } from './../../src/services/session';
var jsonData = require('./../fixtures/data.json');

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");
var random = new Random();
var expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiColors);

var publicSpace = null;
// variables utilizadas en los tests
var currentPost = null;
var currentComment = null;
var currentResponse = null;

describe('CREATE LIKE - PUBLIC SPACE', function() {
	session.addToken(1, jsonData.adminToken);

before(function(done) {
	let space = new Space({
		name: 'espacio publico',
		description: 'espacio compañia',
		icon: 'QA',
		active: true,
		'social-enabled': true,
		position: 0,
		visibility: 'company'
	});
	space.create().then((response) => {
		space = response.content;
		expect(response.status).to.equal(201);
		expect(space.active).to.equal(true);
		publicSpace = space;

		let post = new Post({
			content: 'contenido de post',
			target: publicSpace
		});
		post.create().then((response) => {
			expect(response.status).to.equal(201);
			post = response.content;
			currentPost = post;
			
			let comment = new Comment({
				comment: 'commentario de post',
				subject: currentPost,
			});
			comment.create().then((response) => {
				expect(response.status).to.equal(201);
				comment = response.content;
				currentComment = comment;
				
				let resp = new Comment({
					comment: 'Respuesta a un comentario',
					subject: currentPost,
					'reply-to': currentComment
			
				});
				resp.create().then((response) => {
					let reply = response.content;
					expect(response.status).to.equal(201);
					expect(reply['reply-to'].id).to.equal(currentComment.id);
					currentResponse = reply
					done();
				});
			});
		});

	});
});

// TESTS CASES
///////////////////////////////////////////////////////////////////////////////////////////

console.log("TESTS CASES");

it('Caso 1: like post', function(done) {
	
	let like = new Like({
		subject: currentPost,
	});
	like.create().then((response) => {
		expect(response.status).to.equal(201);
		like = response.content;
		done();
	});
});

it('Caso 2: like comment', function(done) {
	
	let like = new Like({
		subject: currentComment,
	});
	like.create().then((response) => {
		expect(response.status).to.equal(201);
		like = response.content;
		done();
	});
});

it('Caso 3: like response', function(done) {
	
	let like = new Like({
		subject: currentResponse,
	});
	like.create().then((response) => {
		like = response.content;
		expect(response.status).to.equal(201);
		expect(like.subject.id).to.equal(currentResponse.id);
		done();
	});
});

it('Caso 4: like post other user', function(done) {
	session.addToken(1, jsonData.basicToken);
	let like = new Like({
		subject: currentPost,
	});
	like.create().then((response) => {
		expect(response.status).to.equal(201);
		like = response.content;
		done();
	});
});

it('Caso 5: like comment other user', function(done) {
	//session.addToken(1, jsonData.basicToken);
	let like = new Like({
		subject: currentComment,
	});
	like.create().then((response) => {
		expect(response.status).to.equal(201);
		like = response.content;
		done();
	});
});

it('Caso 6: like response other user', function(done) {
	//session.addToken(1, jsonData.basicToken);
	let like = new Like({
		subject: currentResponse,
	});
	like.create().then((response) => {
		like = response.content;
		expect(response.status).to.equal(201);
		expect(like.subject.id).to.equal(currentResponse.id);
		done();
	});
});

});

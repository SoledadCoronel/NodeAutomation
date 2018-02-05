import Space from './../../src/models/space';
import Post from './../../src/models/post';
import Comment from './../../src/models/comment';
import FeedItem from './../../src/models/feedItem';
import Like from './../../src/models/like';
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
var currentComment = null;

describe('CREATE POST - PUBLIC SPACE', function() {
	session.addToken(1, jsonData.adminToken);

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

it('creates new POST', function(done) {

	let post = new Post({
		content: 'contenido de post',
		target: publicSpace
	});
	post.create()
	.then((response) => {
		response.should.have.status('201');
		post = response.content;
		currentPost = post;
		console.log(currentPost);
		done();
	});
});

it('Create comment on a post1', function(done) {

	let comment = new Comment({
		comment: 'commentario de post',
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

it('Create response with hashtag to comment1', function(done) {

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

// TESTS CASES
///////////////////////////////////////////////////////////////////////////////////////////

console.log("TESTS CASES");

it('Caso 1: like post', function(done) {
	session.addToken(1, jsonData.adminToken);
	let like = new Like({
		subject: currentPost,
	});
	like.create()
	.then((response) => {
		//response.should.have.status('201');
		//like = response.content;
		console.log(response.errors);
		done();
	});
	});
});
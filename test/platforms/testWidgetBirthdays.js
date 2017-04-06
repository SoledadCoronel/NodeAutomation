
import WidgetBirthday from './../../src/models/widgetBirthday';
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

var currentWidget = null;
var currentWidget2 = null;
var currentWidget3 = null;


describe('SUITE - WIDGET BIRTHDAY', function() {
	session.addToken(1, jsonData.adminToken);

// PRECONDICIONES PARA LA SUITE
///////////////////////////////////////////////////////////////////////////////////////////

it('User admin create a widget birthday', function(done) {
	let widget = new WidgetBirthday({
		position: 1,
		status: 'enabled'
		});
	widget.create()
	.then((response) => {
		//response.should.have.status('201');
		//widget = response.errors;
		console.log(response.errors);
		//currentWidget = widget;
		done();
	});
});

it('get list all widgets birthday', function(done) {

	new WidgetBirthday()
	.list()
	.then((response) => {
		//response.should.have.status('200');
		//response.content.elements.should.be.a('array');
		//response.content.elements.length.should.be.eql(3);
		//expect(response.content.meta.pagination['total-items']).to.equal(3);
		console.log(response.errors);
        done();
    });
});
});

import WidgetBirthday from './../../src/models/widgetBirthday';
import User from './../../src/models/user';
import Profile from './../../src/models/profile';
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
var profileUser = null;


describe('SUITE - WIDGET BIRTHDAY', function() {
	session.addToken(1, jsonData.adminToken);

// PRECONDICIONES PARA LA SUITE
///////////////////////////////////////////////////////////////////////////////////////////

/*it('User admin create a widget birthday', function(done) {
	let widget = new WidgetBirthday({
		position: 1,
		status: 'disabled'
		});
	widget.create()
	.then((response) => {
		response.should.have.status('201');
		widget = response.content;
		console.log(widget);
		currentWidget = widget;
		done();
	});
});*/



it('Change birthday to userBasic', function(done) {
	new Profile({
		id: profileUser.id, 
		'birth-date': '1980-09-23'
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		done();
	});
});

it('fetches a profile user', function(done) {
	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		response.should.have.status('200');
		profileUser = response.content.profile;
		console.log(profileUser);
		done();
	});
});

/*it('Get birthdays that match the date', function(done) {

	new WidgetCustom()
	.list({filter: {'from': '2017-12-12', 'to': '2017-12-12'}})
	.then((response) => {
		response.should.have.status('200');
		response.content.elements.should.be.a('array');
		response.content.elements.length.should.be.eql(1);
		expect(response.content.meta.pagination['total-items']).to.equal(1);
        done();
    });
});*/
});
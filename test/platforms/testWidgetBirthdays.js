
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
var profileBasicUser = null;
var profileAdminSpaceUser = null;


describe('SUITE - WIDGET BIRTHDAY', function() {
	

// PRECONDICIONES PARA LA SUITE
///////////////////////////////////////////////////////////////////////////////////////////

/*it('Validates that a basic user can not create a widget - AUTOMATICO', function(done) {
	session.addToken(1, jsonData.basicToken);
	let widget = new WidgetBirthday({
		position: 1,
		status: 'disabled'
		});
	widget.create()
	.then((response) => {
		response.should.have.status('403');
		done();
	});
});

it('User admin create a widget birthday - AUTOMATICO', function(done) {
	session.addToken(1, jsonData.adminToken);
	let widget = new WidgetBirthday({
		position: 1,
		status: 'disabled'
		});
	widget.create()
	.then((response) => {
		response.should.have.status('201');
		widget = response.content;
		currentWidget = widget;
		done();
	});
});

it('Validate that only an adminUser can see an inactive widget - AUTOMATICO', function(done) {
	session.addToken(1, jsonData.adminToken);
	new WidgetBirthday()
	.fetch(currentWidget.id)
	.then((response) => {
		response.should.have.status('200');
		done();
	});
});

it('Validate that only an basicUser can not see an inactive widget - AUTOMATICO', function(done) {
	session.addToken(1, jsonData.basicToken);
	new WidgetBirthday()
	.fetch(currentWidget.id)
	.then((response) => {
		response.should.have.status('403');
		done();
	});
});

it('Change status to widgetBirthday', function(done) {
	session.addToken(1, jsonData.adminToken);
	new WidgetBirthday({
		id: currentWidget.id, 
		status: 'enabled'
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		done();
	});
});

it('User admin create a second widget birthday', function(done) {
	let widget = new WidgetBirthday({
		position: 1,
		status: 'enabled'
		});
	widget.create()
	.then((response) => {
		response.should.have.status('400');
		done();
	});
});

// PRECONDICIONES

it('fetches a profile user', function(done) {
	new User()
	.fetch(jsonData.basicUser.id)
	.then((response) => {
		response.should.have.status('200');
		profileBasicUser = response.content.profile;
		done();
	});
});

it('fetches a profile user', function(done) {
	new User()
	.fetch(jsonData.adminSpaceUser.id)
	.then((response) => {
		response.should.have.status('200');
		profileAdminSpaceUser = response.content.profile;
		done();
	});
});

it('Change birthday to userBasic', function(done) {
	new Profile({
		id: profileBasicUser.id, 
		'birth-date': '1980-09-23'
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		console.log(response);
		done();
	});
});

it('Change birthday to adminSpaceUser', function(done) {
	new Profile({
		id: profileAdminSpaceUser.id, 
		'birth-date': '1980-09-25'
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		console.log(response);
		done();
	});
});*/

/*it('Get birthdays that match the date', function(done) {

	new WidgetBirthday()
	.list({filter: {'from': '2017-04-10', 'to': '2017-04-12', 'greeted': 0, 'omitted': 0, 'include-logged-user': 1}})
	.then((response) => {
		//response.should.have.status('200');
		//response.content.elements.should.be.a('array');
		//response.content.elements.length.should.be.eql(1);
		//expect(response.content.meta.pagination['total-items']).to.equal(1);
		console.log(response.errors);
        done();
    });
});*/

it('Get birthdays that match the date', function(done) {

		chai.request('http://api.cd.gointegro.net')
		.get('/birthdays?filter[from]=' + '2017-04-10' + '&' + 'filter[to]=' + '2017-09-25' + '&' + 'filter[greeted]=' + 1 + '&' + 'filter[omitted]=' + 1 + '&filter[include-logged-user]=' + 1)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + jsonData.adminToken)
		.end(function(err, res) {
			console.log(JSON.stringify(res.body, null, 2));
			//res.body.data.should.be.a('array');
			//res.body.data.length.should.be.eql(2);
			done();
		});
	});
});
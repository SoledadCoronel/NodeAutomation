
import WidgetBirthday from './../../src/models/widgetBirthday';
import WidgetItem from './../../src/models/widgetItem';
import Birthday from './../../src/models/birthday';
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
var defaultWidgetBirthday = null;
var profileBasicUser = null;
var profileAdminSpaceUser = null;
var profileAdminUser = null;


describe('SUITE - WIDGET BIRTHDAY', function() {
	

// PRECONDICIONES PARA LA SUITE
///////////////////////////////////////////////////////////////////////////////////////////

it('Validates that a basic user can not create a widget', function(done) {
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

it('Get all widgets on the platform', function(done) {
	session.addToken(1, jsonData.adminToken);
	new WidgetItem()
	.list({include: ['item']})
	.then((response) => {
		response.should.have.status('200');
		response.content.elements.should.be.a('array');
		defaultWidgetBirthday = response.content.elements[0];
		
		defaultWidgetHire = response.content.elements[2];
        done();
    });
});

it('deletes a defaultWidgetBirthday', function(done) {
	new WidgetBirthday({'id': defaultWidgetBirthday.id})
	.delete(defaultWidgetBirthday.id)
	.then((response) => {
		response.should.have.status('204');
        done();
    });
});

it('User admin create a widget birthday', function(done) {
	session.addToken(1, jsonData.adminToken);
	let widget = new WidgetBirthday({
		position: 1,
		status: 'disabled'
		});
	widget.create()
	.then((response) => {
		//response.should.have.status('201');
		widget = response.content;
		currentWidget = widget
		done();
	});
});

it('Validate that only an adminUser can see an inactive widget', function(done) {
	session.addToken(1, jsonData.adminToken);
	new WidgetBirthday()
	.fetch(currentWidget.id)
	.then((response) => {
		response.should.have.status('200');
		done();
	});
});

it('Validate that only an basicUser can not see an inactive widget', function(done) {
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
		done();
	});
});

it('Get birthdays that match the date', function(done) {
	session.addToken(1, jsonData.adminToken);

	new Birthday()
	.list({filter: {'from': '2017-04-17', 'to': '2017-09-25', 'greeted': 1, 'omitted': 1, 'include-logged-user': 1}})
	.then((response) => {
		response.should.have.status('200');
		response.content.elements.should.be.a('array');
		response.content.elements.length.should.be.eql(2);
		expect(response.content.meta.pagination['total-items']).to.equal(2);
		//console.log(JSON.stringify(response.content, null, 2));
        done();
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////

it('fetches a profile admin user', function(done) {
	new User()
	.fetch(jsonData.adminUserId)
	.then((response) => {
		response.should.have.status('200');
		profileAdminUser = response.content.profile;
		done();
	});
});

it('Change birthday to adminUser', function(done) {
	new Profile({
		id: profileAdminUser.id, 
		'birth-date': '1980-08-17'
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		done();
	});
});

it('Get birthdays that match the date', function(done) {
	session.addToken(1, jsonData.adminToken);

	new Birthday()
	.list({filter: {'from': '2017-04-18', 'to': '2017-09-25', 'greeted': 1, 'omitted': 1, 'include-logged-user': 1}})
	.then((response) => {
		response.should.have.status('200');
		response.content.elements.should.be.a('array');
		response.content.elements.length.should.be.eql(3);
		expect(response.content.meta.pagination['total-items']).to.equal(3);
        done();
    });
});

it('deletes a widget birthday with basic user logged in', function(done) {
	session.addToken(1, jsonData.basicToken);

	new WidgetBirthday(currentWidget.id)
	.delete(currentWidget.id)
	.then((response) => {
		response.should.have.status('403');
        done();
    });
});

it('deletes a invalid widget birthday with admin user logged in', function(done) {
	session.addToken(1, jsonData.adminToken);

	new WidgetBirthday(0)
	.delete(0)
	.then((response) => {
		response.should.have.status('404');
        done();
    });
});

it('deletes a widget birthday with admin user logged in', function(done) {
	session.addToken(1, jsonData.adminToken);

	new WidgetBirthday(currentWidget)
	.delete(currentWidget)
	.then((response) => {
		response.should.have.status('204');
        done();
    });
});
});

import File from './../../src/models/file';
import WidgetCustom from './../../src/models/widgetCustom';
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

var defaultWidget1 = null;
var defaultWidget2 = null;
var currentImageFile = null;
var currentWidget = null;
var currentWidget2 = null;
var currentWidget3 = null;


describe('SUITE - WIDGET CUSTOMS', function() {
	session.addToken(1, jsonData.adminToken);

// PRECONDICIONES PARA LA SUITE
///////////////////////////////////////////////////////////////////////////////////////////

it('User admin uploads an image', function(done) {
	let file = new File({
		prefix: 'home',
		file: 'data:image/png;base64,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'
		});
	file.create()
	.then((response) => {
		response.should.have.status('201');
		file = response.content;
		currentImageFile = file;
		done();
	});
});

it('get list all widgets custom', function(done) {

	new WidgetCustom()
	.list({include: ['image']})
	.then((response) => {
		response.should.have.status('200');
		response.content.elements.should.be.a('array');
		response.content.elements.length.should.be.eql(2);
		expect(response.content.meta.pagination['total-items']).to.equal(2);
		expect(response.content.elements[0].title).to.equal('Nuestra Cultura');
		expect(response.content.elements[1].title).to.equal('¡Click y completa tu perfil!');
		defaultWidget1 = response.content.elements[0];
		defaultWidget2 = response.content.elements[1];
		//console.log(JSON.stringify(response.content, null, 2));
        done();
    });
});

it('deletes a defaultWidget 1', function(done) {
	new WidgetCustom({'id': defaultWidget1.id, 'image': defaultWidget1.image})
	.delete(defaultWidget1.id)
	.then((response) => {
		response.should.have.status('204');
        done();
    });
});

it('deletes a defaultWidget 2', function(done) {
	new WidgetCustom({'id': defaultWidget2.id, 'image': defaultWidget2.image})
	.delete(defaultWidget2.id)
	.then((response) => {
		response.should.have.status('204');
        done();
    });
});

// TEST CASES
///////////////////////////////////////////////////////////////////////////////////////////


it('Creates a new widget custom', function(done) {

	let widget = new WidgetCustom({
		position: 1,
		status: 'disabled',
		title: 'widget custom automation',
		active: true,
		'show-title': true,
		link: 'link',
		image: currentImageFile,
	});
	widget.create()
	.then((response) => {
		response.should.have.status('201');
		widget = response.content;
		currentWidget = widget;
		done();
	});
});

it('Creates a new widget custom', function(done) {

	let widget = new WidgetCustom({
		position: 1,
		status: 'disabled',
		title: 'widget custom automation',
		active: true,
		'show-title': true,
		link: 'link',
		image: currentImageFile,
	});
	widget.create()
	.then((response) => {
		response.should.have.status('201');
		widget = response.content;
		currentWidget2 = widget;
		done();
	});
});

it('Creates a new widget custom', function(done) {

	let widget = new WidgetCustom({
		position: 1,
		status: 'disabled',
		title: 'widget custom automation',
		active: true,
		'show-title': true,
		link: 'link',
		image: currentImageFile,
	});
	widget.create()
	.then((response) => {
		response.should.have.status('201');
		widget = response.content;
		currentWidget3 = widget;
		done();
	});
});

it('fetches a widget custom', function(done) {
	new WidgetCustom()
	.fetch(currentWidget.id)
	.then((response) => {
		response.should.have.status('200');
		assert.property(currentWidget, 'status');
		expect(currentWidget.status).to.equal('disabled');
        done();
    });
});

it('Change the status of a widget custom', function(done) {
	currentWidget
	.activate()
	.update()
	.then((response) => {
		response.should.have.status('200');
		expect(response.content.status).to.equal('enabled');
		assert.property(currentWidget, 'status');
		done();
	});
});

it('Change title of a widget custom', function(done) {
	new WidgetCustom({
		id: currentWidget2.id, 
		title: 'new title automation',
		image: currentImageFile
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		expect(response.content.title).to.equal('new title automation');
		done();
	});
});

it('Change position of a widget custom', function(done) {
	new WidgetCustom({
		id: currentWidget2.id, 
		position: 2,
		image: currentImageFile
	})
	.update()
	.then((response) => {
		response.should.have.status('200');
		expect(response.content.position).to.equal(2);
		done();
	});
});

it('Change invalid status of a widget custom', function(done) {
	new WidgetCustom({
		id: currentWidget2.id, 
		status: 'enabledd',
		image: currentImageFile
	})
	.update()
	.then((response) => {
		response.should.have.status('400');
		done();
	});
});


it('fetches a widget custom', function(done) {
	new WidgetCustom()
	.fetch(currentWidget.id, {include: ['image']})
	.then((response) => {
		response.should.have.status('200');
		assert.property(currentWidget, 'status');
		expect(currentWidget.status).to.equal('enabled');
		done();
    });
});

it('get list all widgets custom', function(done) {

	new WidgetCustom()
	.list({include: ['image']})
	.then((response) => {
		response.should.have.status('200');
		response.content.elements.should.be.a('array');
		response.content.elements.length.should.be.eql(3);
		expect(response.content.meta.pagination['total-items']).to.equal(3);
        done();
    });
});

it('Get all custom widget filtering paginated', function(done) {

	new WidgetCustom()
	.list({include: ['image'], page: {number: 1, size: 2}})
	.then((response) => {
		response.should.have.status('200');
		response.content.elements.should.be.a('array');
		response.content.elements.length.should.be.eql(2);
		expect(response.content.meta.pagination['total-items']).to.equal(3);
        done();
    });
});

it('Get all widgets custom by filtering by status', function(done) {

	new WidgetCustom()
	.list({filter: {'status': 'enabled'}})
	.then((response) => {
		response.should.have.status('200');
		response.content.elements.should.be.a('array');
		response.content.elements.length.should.be.eql(1);
		expect(response.content.meta.pagination['total-items']).to.equal(1);
        done();
    });
});

it('Get all custom widgets by filtering by id', function(done) {

	new WidgetCustom()
	.list({filter: {'id': currentWidget.id}})
	.then((response) => {
		response.should.have.status('200');
		response.content.elements.should.be.a('array');
		response.content.elements.length.should.be.eql(1);
		expect(response.content.meta.pagination['total-items']).to.equal(1);
        done();
    });
});

it('Get all custom widgets by filtering by invalid id', function(done) {

	new WidgetCustom()
	.list({filter: {'id': 1}})
	.then((response) => {
		response.content.elements.length.should.be.eql(0);
		expect(response.content.meta.pagination['total-items']).to.equal(0);
        done();
    });
});

it('deletes a widget custom', function(done) {
	new WidgetCustom({'id': currentWidget.id, 'image': currentImageFile})
	.delete(currentWidget.id)
	.then((response) => {
		response.should.have.status('204');
        done();
    });
});

it('deletes a invalid widget custom', function(done) {
	new WidgetCustom({'id': 1, 'image': currentImageFile})
	.delete(currentWidget.id)
	.then((response) => {
		response.should.have.status('404');
        done();
    });
});

it('fetches a deleted widget custom', function(done) {
	new WidgetCustom()
	.fetch(currentWidget.id)
	.then((response) => {
		response.should.have.status('404');
		done();
    });
});
});


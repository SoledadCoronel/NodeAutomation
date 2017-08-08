import UserImports from './../../src/models/userImports';
import Group from './../../src/models/group';
import GroupItem from './../../src/models/groupItem';
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

// variables utilizadas en los tests

var currentUserImport;
var currentGroup;
var currentGroupItem;


/*describe('SUITE - USERS - GROUPS', function() {

//console.log("PRECONCIONES");
it('Precondicion: Creates a new group', function(done) {
	session.addToken(1, jsonData.adminToken);

	let group = new Group({
		name: 'grupo1',
		position: 0
	});
	group.create()
	.then((response) => {
		response.should.have.status('201');
		group = response.content;
		currentGroup = group;
		console.log(response.content);
		done();
	});
});

it('Precondicion: Creates un new group item', function(done) {

	let groupItem = new GroupItem({
		name: 'groupItem1',
		position: 0,
		group: currentGroup
	});
	groupItem.create()
	.then((response) => {
		response.should.have.status('201');
		groupItem = response.content;
		currentGroupItem = groupItem;
		console.log(response.content);
		done();
		});
	});
});*/

// comienzo de la suite
describe('SUITE - USERS - USER IMPORTS', function() {

it('case 1: Creates un new user import - supervisor inválido', function(done) {
	session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"marta.perez@gointegro.com", 
	    	"supervisor_email":"jorge.motumbo@gointegro.com",
	    	"birthdate": "2000-11-15",
	    	"groups":""
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('400');
		response.errors[0].title.should.be.eql("Invalid supervisor");
		done();
	});
});

it('case 2: Creates un new user import - supervisor válido', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"marta.perez@gointegro.com", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2000-11-15",
	    	"groups":jsonData.currentGroup.name + ':' + jsonData.currentGroupItem.name
	    	}
	};
	console.log(jsonData.currentGroup.name,jsonData.currentGroupItem.name);
	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('201');
		//console.log(JSON.stringify(response.content, null, 2));
		done();
	});
});

it('case 3: Creates un new user import - fecha nac válida', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"marta.perez@gointegro.com", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2000-11-16",
	    	"groups":""
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('200');
		done();
	});
});

it('case 4: Creates un new user import - nullear last_name (atributo obligatorio)', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"#delete",
	    	"email":"marta.perez@gointegro.com", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2000-11-16",
	    	"groups":""
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('400');
		//console.log(JSON.stringify(response.content, null, 2));
		done();
	});
});

it('case 5: Creates un new user import - fecha nac inválida', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"marta.perez@gointegro.com", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2020-11-00",
	    	"groups":""
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('400');
		response.errors[0].title.should.be.eql("Invalid birthdate");
		done();
	});
});

it('case 6: Creates un new user import - name vacio', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"",
	    	"last_name":"Perez",
	    	"email":"marta.gonzalez@gointegro.com", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2000-11-16",
	    	"groups":""
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('400');
		response.errors[0].title.should.be.eql("name is required");
		done();
	});
});

it('case 7: Creates un new user import - email vacio', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2000-11-16",
	    	"groups":""
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('400');
		response.errors[0].title.should.be.eql("email is required");
		done();
	});
});

it('case 8: Creates un new user import - nullear atributo supervisor', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"marta.perez@gointegro.com", 
	    	"supervisor_email":"#delete",
	    	"birthdate": "2000-11-16",
	    	"groups":""
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('200');
		//console.log(JSON.stringify(response.content, null, 2));
		done();
	});
});
});

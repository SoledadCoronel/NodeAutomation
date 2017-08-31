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

// comienzo de la suite
describe('SUITE - USERS - USER IMPORTS', function() {

it('case 1: Creates un new user import - supervisor inválido', function(done) {
	session.setCredentials(jsonData.adminUserId, jsonData.currentPlatform.id);

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"soledad.coronel+3@gointegro.com", 
	    	"supervisor_email":"jorge.motumbo@gointegro.com",
	    	"birthdate": "2000-11-15",
	    	"groups":""
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('400');
		response.errors[0].title.should.be.eql("The supervisor is not valid");
		done();
	});
});

it('case 2: Creates un new user import - supervisor válido', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"soledad.coronel+3@gointegro.com", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2000-11-15",
	    	"groups": jsonData.currentGroup.name + ':' + jsonData.currentGroupItem.name
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.should.have.status('201');
		//console.log(JSON.stringify(response.content, null, 2));
		done();
	});
});

it('case 3: Creates un new user import - groupItems de un mismo grupo', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"soledad.coronel+3@gointegro.com", 
	    	"supervisor_email":"soledad.coronel@gointegro.com",
	    	"birthdate": "2000-11-15",
	    	"groups":jsonData.currentGroup.name +':'+ jsonData.currentGroupItem.name +','+ jsonData.currentGroup.name +':'+ jsonData.currentGroupItem2.name
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.errors[0].title.should.be.eql("User can only belong to one group-item under a group");
		done();
	});
});

it('case 4: Creates un new user import - fecha nac válida', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"soledad.coronel+3@gointegro.com", 
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

it('case 5: Creates un new user import - nullear last_name (atributo obligatorio)', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"#delete",
	    	"email":"soledad.coronel+3@gointegro.com", 
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

it('case 6: Creates un new user import - fecha nac inválida', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"soledad.coronel+3@gointegro.com", 
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

it('case 7: Creates un new user import - name vacio', function(done) {

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

it('case 8: Creates un new user import - email vacio', function(done) {

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

it('case 9: Creates un new user import - update varios atributos inválidos', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"soledad.coronel+3@gointegro.com", 
	    	"supervisor_email":"soledad.coronel+3@gointegro.com",
	    	"document": "111111111111111111111111111111",
	    	"extension": "515665aaaaaaaaaaaaaaaaaaaaaa",
	    	"birthdate": "1982-03-266",
	    	"admission_date": "1999-02-268",
	    	"gender": "lalal",
	    	"groups":""
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.errors[0].title.should.be.eql("The supervisor is not valid");
		response.errors[1].title.should.be.eql("The phone extension must not exceed 9 digits");
		response.errors[2].title.should.be.eql("Invalid birthdate");
		response.errors[3].title.should.be.eql("Invalid admission date");
		response.errors[4].title.should.be.eql("Value of field \'gender\' must be part of list: male, female, , ");
		done();
	});
});

it('case 10: Creates un new user import - multiples atributos inválidos', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Maria",
	    	"last_name":"Pérez",
	    	"email":"mimail@qa.com", 
	    	"document_type": "blah",
	    	"document": "111111111111111111111111111111",
	    	"extension": "515665aaaaaaaaaaaaaaaaaaaaaa",
	    	"birthdate": "1982-03-266",
	    	"admission_date": "1999-02-268",
	    	"gender": "lalal",
	    	"groups":""
	    	}
	};

	let userImports = new UserImports(attributes);
	userImports.create()
	.then((response) => {
		response.errors[0].title.should.be.eql("The phone extension must not exceed 9 digits");
		response.errors[1].title.should.be.eql("Invalid birthdate");
		response.errors[2].title.should.be.eql("Invalid admission date");
		response.errors[3].title.should.be.eql("Value of field \'documentType\' must be part of list: DNI, CPF, RUT, CD, CI, RFC, , ");
		response.errors[4].title.should.be.eql("Value of field \'gender\' must be part of list: male, female, , ");
		done();
	});
});

it('case 11: Creates un new user import - nullear atributo supervisor', function(done) {

	let attributes = {
		'payload': {
	    	"first_name":"Marta",
	    	"last_name":"Perez",
	    	"email":"soledad.coronel+3@gointegro.com", 
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

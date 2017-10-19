import UserExports from './../../src/models/userExports';
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

describe('SUITE - USERS - USER EXPORTS', function() {

it('Caso 1: Download user template', function(done) {
	chai.request('http://api.cd.gointegro.net')
	.get('/user-exports/' + '?' + 'filter[template]=1')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.end(function(err, res) {
		res.should.have.status(200);
		expect(res.text).to.equal('first_name,last_name,status,access,role,email,supervisor_email,job_title,groups,employee_id,country,job_phone,extension,job_cellphone,personal_phone,personal_cellphone,linkedin,facebook,twitter,admission_date,job_address,personal_address,document_type,document,gender,birthdate,personal_email,marital_status,job_type\n');
		done();
	});
});

it('Caso 2: Download platform users', function(done) {

	chai.request('http://api.cd.gointegro.net')
	.get('/user-exports/' + '?' + 'filter[template]=0')
	.set('content-type', 'application/vnd.api+json')
	.set('Accept', 'application/vnd.api+json')
	.set('Authorization', 'Bearer ' + jsonData.adminToken)
	.end(function(err, res) {
		res.should.have.status(200);
		assert.include(res.text, 'Soledad', 'string contains substring');
		assert.include(res.text, 'UsuarioRolAdminDeEspacio', 'string contains substring');
		done();
	});
});

});
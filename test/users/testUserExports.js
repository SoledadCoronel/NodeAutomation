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
	.post('/user-exports/' + '?' + 'filter[template]=1')
	.type('form')
	.send('access_token=' + jsonData.adminToken)
	.end(function(err, res) {
		res.should.have.status(200);
		expect(res.text).to.equal('first_name,last_name,status,access,role,email,supervisor_email,supervisor_document_type,supervisor_document,supervisor_employee_id,job_title,groups,employee_id,country,job_phone,extension,job_cellphone,personal_phone,personal_cellphone,linkedin,facebook,twitter,admission_date,job_address,personal_address,document_type,document,gender,birthdate,personal_email,marital_status,job_type\n');
		done();
	});
});

it('Caso 2: Download platform users', function(done) {

	chai.request('http://api.cd.gointegro.net')
	.post('/user-exports/' + '?' + 'filter[template]=0')
	.type('form')
	.send('access_token=' + jsonData.adminToken)
	.end(function(err, res) {
		res.should.have.status(200);
		assert.include(res.text, 'Soledad', 'string contains substring');
		assert.include(res.text, 'UsuarioRolAdminDeEspacio', 'string contains substring');
		done();
	});
});

/*it('Caso 3: Download platform users by ids', function(done) {

	chai.request('http://api.cd.gointegro.net')
	.post('/user-exports/')
	.type('form')
	.send('access_token=' + jsonData.adminToken)
	.send(`payload={"ids":"${jsonData.basicUser.id},${jsonData.adminSpaceUser.id}"}`)
	.end(function(err, res) {
		console.log(res.text);
		//res.should.have.status(200);
		done();
	});
});*/

});
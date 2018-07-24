import Oauth from './../../src/models/oauth';
import { session } from './../../src/services/session';
let jsonData = require('./../fixtures/data.json');

let chai = require('chai'), chaiColors = require('chai-colors');
let chaiHttp = require('chai-http');
let expect = chai.expect;
const _ = require('lodash');

chai.use(chaiHttp);
chai.use(chaiColors);

let adminToken = null;
let oauth = new Oauth();

describe('STRONG PASSWORD - LOGIN LOCKED', function() {
	

before(function(done) {
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '12345678',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(200);
        let tokenInfo = response.content;
        adminToken = tokenInfo.access_token;
        session.addToken(1, adminToken);
        done();
      });
});

// TESTS CASES
///////////////////////////////////////////////////////////////////////////////////////////

console.log("TESTS CASES");

it('Caso 1: Activar login-locked unicamente', function(done) {
    let data = {
        "data": {
            "type": "secure-policies",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": true,
                "days-to-expire": 90,
                "login-locked": true,
                "max-historic-passwords": 3,
                "password-history": false,
                "secure-password": false
            }
        }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/secure-policies/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+adminToken)
    .send(data)
    .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data.attributes.enabled).to.equal(true);
        expect(response.body.data.attributes.subdomain).to.equal(jsonData.currentPlatform.subdomain);
        done();
    })
    .catch((error) =>{
        console.log(error)
    })
});

it('Caso 2: Logueo 1 con contraseña errónea (401)', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '123456789',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(401);
        done();
      });
});

it('Caso 3: Logueo 2 con contraseña errónea (401)', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '123456789',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(401);
        done();
      });
});

it('Caso 4: Logueo 3 con contraseña errónea (401)', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '123456789',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(401);
        done();
      });
});

it('Caso 5: Logueo 4 con contraseña correcta (200)', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '12345678',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(200);
        done();
      });
});

it('Caso 6: Logueo 1 con contraseña errónea (401)', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '123456789',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(401);
        done();
      });
});

it('Caso 7: Logueo 2 con contraseña errónea (401)', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '123456789',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(401);
        done();
      });
});

it('Caso 8: Logueo 3 con contraseña errónea (401)', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '123456789',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(401);
        done();
      });
});

it('Caso 9: Logueo 4 con contraseña errónea (401)', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '123456789',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(401);
        done();
      });
});

it('Caso 10: Logueo 5 con contraseña errónea (400 - 10105)', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '123456789',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((error) =>{
        expect(error.status).to.equal(400);
        let errorCode = _.get(error, 'errors.0.code');
        expect(errorCode).to.equal('10105');
        done();
      });
});

it('Caso 11: Logueo con contraseña correcta estando bloqueado (400 - 10105)', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '12345678',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((error) =>{
        expect(error.status).to.equal(400);
        let errorCode = _.get(error, 'errors.0.code');
        expect(errorCode).to.equal('10105');
        done();
      });
});

it('Caso 12: Logueo con contraseña incorrecta estando bloqueado (400 - 10105)', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '123456789',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((error) =>{
        expect(error.status).to.equal(400);
        let errorCode = _.get(error, 'errors.0.code');
        expect(errorCode).to.equal('10105');
        done();
      });
});

});
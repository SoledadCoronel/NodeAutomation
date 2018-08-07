import Oauth from './../../src/models/oauth';
import { session } from './../../src/services/session';
var jsonData = require('./../fixtures/data.json');

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var expect = chai.expect;
const _ = require('lodash');

chai.use(chaiHttp);
chai.use(chaiColors);

let adminToken = null;
let oauth = new Oauth();

describe('STRONG PASSWORD - SECURE PASSWORD', function() {
	

before(function(done) {
    session.addToken(1, jsonData.adminToken);
    done();
});

// TESTS CASES
///////////////////////////////////////////////////////////////////////////////////////////

console.log("TESTS CASES");

it('Caso 1: Activar stronge password', function(done) {
    let data = {
        "data": {
            "type": "secure-policies",
            "attributes": {
                "enabled": true,
                "days-to-expire": 90,
                "login-locked": false,
                "max-historic-passwords": 3,
                "password-history": true,
                "secure-password": false
            }
        }
    };
    chai.request('http://api.cd.gointegro.net')
    .post('/secure-policies/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .send(data)
    .then((response) => {
        expect(response.status).to.equal(201);
        done();
    })
    .catch((error) =>{
        console.log(error)
    })
});

it('Caso 2: Get stronge password activado', function(done) {
    chai.request('http://api.cd.gointegro.net')
    .get('/secure-policies/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
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

it('Caso 3: Loguearse con la misma password anterior', function(done) {
    let oauth = new Oauth();
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: 'myPassword',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(200);
        let tokenInfo = response.content;
        adminToken = tokenInfo.access_token;
        session.addToken(1, adminToken);
        done();
      });
});

it('Caso 4: (PATCH) Activar secure-password', function(done) {
    let data = {
        "data": {
            "type": "secure-policies",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": true,
                "days-to-expire": 90,
                "login-locked": false,
                "max-historic-passwords": 3,
                "password-history": false,
                "secure-password": true
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
})

it('Caso 5: Loguearse con la misma password luego de activar secure-password - Code: 10104', function(done) {
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: 'myPassword',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(400);
        let errorCode = _.get(response, 'errors.0.code');
        expect(errorCode).to.equal('10104');
        done();
      });
});

it('Caso 6: Cambiar contraseña por una inválida para secure-password - Code: 10104', function(done) {
    let data = {
        "data": {
            "username": "soledad.coronel@gointegro.com",
            "old-password": "myPassword",
            "password": "12345678a",
            "platform-id": jsonData.currentPlatform.id
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .post('/change-password')
    .send(data)
    .catch((error) =>{
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10104');
        done();
    })
});

it('Caso 7: Cambiar contraseña por una válida para secure-password y loguear', function(done) {
    let data = {
        "data": {
            "username": "soledad.coronel@gointegro.com",
            "old-password": "myPassword",
            "password": "1234567a#E",
            "platform-id": jsonData.currentPlatform.id
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .post('/change-password')
    .send(data)
    .then((response) =>{
        expect(response.status).to.equal(204);
        oauth.login({
            username: 'soledad.coronel@gointegro.com',
            password: '1234567a#E',
            subdomain: jsonData.currentPlatform.subdomain
          }).then((response) => {
            expect(response.status).to.equal(200);
            let tokenInfo = response.content;
            adminToken = tokenInfo.access_token;
            session.addToken(1, adminToken);
            done();
          });
    })
});

it('Caso 8: Cambiar contraseña estando logueado por una válida', function(done) {
    let data = {
        "data": {
            "attributes":{
                "password": "1234567a@R"
            },
            "type": "users",
            "id": jsonData.adminUserId
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/users/'+jsonData.adminUserId)
    .set('Authorization', 'Bearer '+adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .then((response) =>{
        expect(response.status).to.equal(200);
        expect(response.body.data.id).to.equal(jsonData.adminUserId);
        done();
    })
});

it('Caso 9: Cambiar contraseña estando logueado por una inválida', function(done) {
    let data = {
        "data": {
            "attributes":{
                "password": "1234567a@"
            },
            "type": "users",
            "id": jsonData.adminUserId
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/users/'+jsonData.adminUserId)
    .set('Authorization', 'Bearer '+adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .catch((error) =>{
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10104');
        done();
    })
});

/*it('Caso 4: Desactivar stronge password', function(done) {
    let data = {
        "data": {
            "type": "secure-policies",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": false,
                "days-to-expire": 90,
                "login-locked": false,
                "max-historic-passwords": 3,
                "password-history": true,
                "secure-password": true
            }
        }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/secure-policies/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .send(data)
    .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data.attributes.enabled).to.equal(false);
        expect(response.body.data.attributes.subdomain).to.equal(jsonData.currentPlatform.subdomain);
        done();
    })
    .catch((error) =>{
        console.log(error)
    })
});*/

});

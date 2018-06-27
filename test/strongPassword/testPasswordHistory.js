import Oauth from './../../src/models/oauth';
import { session } from './../../src/services/session';
let jsonData = require('./../fixtures/data.json');

let chai = require('chai'), chaiColors = require('chai-colors');
let chaiHttp = require('chai-http');
let expect = chai.expect;
const _ = require('lodash');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'go5-ms-db.cu2lxyygbem4.us-east-1.rds.amazonaws.com',
    user: 'apiuser',
    password: 'integro12',
    database: 'ms_auth_cd'
})

chai.use(chaiHttp);
chai.use(chaiColors);

let adminToken = null;
let oauth = new Oauth();

describe('STRONG PASSWORD - PASSWORD HISTORY', function() {
	

before(function(done) {
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '1234567a@R',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        expect(response.status).to.equal(200);
        let tokenInfo = response.content;
        adminToken = tokenInfo.access_token;
        session.addToken(1, adminToken);
        done();
      });
      done();
});

// TESTS CASES
///////////////////////////////////////////////////////////////////////////////////////////

console.log("TESTS CASES");

it('Caso 1: Activar password-history con secure-password', function(done) {
    let data = {
        "data": {
            "type": "secure-policies",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": true,
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

it('Caso 2: Cambiar password por la misma password actual - Code: 10103', function(done) {
    let data = {
        "data": {
            "username": "soledad.coronel@gointegro.com",
            "old-password": "1234567a@R",
            "password": "1234567a@R",
            "platform-id": jsonData.currentPlatform.id
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .post('/change-password')
    .send(data)
    .catch((error) =>{
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10103');
        done();
      });
});

it('Caso 3: Cambiar contraseña por una distinta a la actual', function(done) {
    let data = {
        "data": {
            "username": "soledad.coronel@gointegro.com",
            "old-password": "1234567a@R",
            "password": "1234567u#J",
            "platform-id": jsonData.currentPlatform.id
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .post('/change-password')
    .send(data)
    .then((response) =>{
        expect(response.status).to.equal(204);
        done();
    })
});

it('Caso 4: Volver a cambiar contraseña por una distinta a la actual', function(done) {
    let data = {
        "data": {
            "username": "soledad.coronel@gointegro.com",
            "old-password": "1234567u#J",
            "password": "1234567au@H",
            "platform-id": jsonData.currentPlatform.id
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .post('/change-password')
    .send(data)
    .then((response) =>{
        expect(response.status).to.equal(204);
        done();
    })
});

it('Caso 5: Cambiar la contraseña por una de las ultimas 3 ya usadas - Code: 10102', function(done) {
    let data = {
        "data": {
            "username": "soledad.coronel@gointegro.com",
            "old-password": "1234567au@H",
            "password": "1234567u#J",
            "platform-id": jsonData.currentPlatform.id
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .post('/change-password')
    .send(data)
    .catch((error) =>{
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10102');
        done();
      });
});

it('Caso 6: Volver a cambiar contraseña por una distinta a la actual y loguear', function(done) {
    let data = {
        "data": {
            "username": "soledad.coronel@gointegro.com",
            "old-password": "1234567au@H",
            "password": "1234598u@H",
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
            password: '1234598u@H',
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

it('Caso 7: Cambiar contraseña estando logueado por una de las últimas 3 usadas - Code: 10102', function(done) {
    let data = {
        "data": {
            "attributes":{
                "password": "1234567u#J"
            },
            "type": "users",
            "id": jsonData.adminUserId
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/users/'+jsonData.adminUserId)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .catch((error) =>{
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10102');
        done();
    })
});

it('Caso 8: Cambiar contraseña estando logueado por la misma actual - Code: 10102', function(done) {
    let data = {
        "data": {
            "attributes":{
                "password": "1234598u@H"
            },
            "type": "users",
            "id": jsonData.adminUserId
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/users/'+jsonData.adminUserId)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .catch((error) =>{
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10102');
        done();
    })
});

it('Caso 9: Cambiar contraseña estando logueado por una válida para liberar la primera usada', function(done) {
    let data = {
        "data": {
            "attributes":{
                "password": "1234569u@AR"
            },
            "type": "users",
            "id": jsonData.adminUserId
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/users/'+jsonData.adminUserId)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .then((response) =>{
        expect(response.status).to.equal(200);
        expect(response.body.data.id).to.equal(jsonData.adminUserId);
        done();
    })
});

it('Caso 10: Cambiar contraseña estando logueado por la primera usada (ya liberada)', function(done) {
    let data = {
        "data": {
            "attributes":{
                "password": "1234567u#J"
            },
            "type": "users",
            "id": jsonData.adminUserId
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/users/'+jsonData.adminUserId)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .then((response) =>{
        expect(response.status).to.equal(200);
        expect(response.body.data.id).to.equal(jsonData.adminUserId);
        done();
    })
});

it('Caso 11: Desactivar secure-password, max-historic-passwords a 2', function(done) {
    let data = {
        "data": {
            "type": "secure-policies",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": true,
                "days-to-expire": 90,
                "login-locked": false,
                "max-historic-passwords": 2,
                "password-history": true,
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

it('Caso 12: Cambiar contraseña estando logueado (sin secure-password)', function(done) {
    let data = {
        "data": {
            "attributes":{
                "password": "12345678"
            },
            "type": "users",
            "id": jsonData.adminUserId
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/users/'+jsonData.adminUserId)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .then((response) =>{
        expect(response.status).to.equal(200);
        expect(response.body.data.id).to.equal(jsonData.adminUserId);
        done();
    })
});

it('Caso 13: Volver a cambiar contraseña estando logueado (sin secure-password)', function(done) {
    let data = {
        "data": {
            "attributes":{
                "password": "123456abcd"
            },
            "type": "users",
            "id": jsonData.adminUserId
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/users/'+jsonData.adminUserId)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .then((response) =>{
        expect(response.status).to.equal(200);
        expect(response.body.data.id).to.equal(jsonData.adminUserId);
        done();
    })
});

it('Caso 14: Activar secure-password', function(done) {
    let data = {
        "data": {
            "type": "secure-policies",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": true,
                "days-to-expire": 90,
                "login-locked": false,
                "max-historic-passwords": 2,
                "password-history": true,
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
});

it('Caso 15: Cambiar contraseña por una de history-password sin ser secure-password - Code: 10104', function(done) {
    let data = {
        "data": {
            "attributes":{
                "password": "12345678"
            },
            "type": "users",
            "id": jsonData.adminUserId
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/users/'+jsonData.adminUserId)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .catch((error) =>{
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10104');
        done();
    })
});

it('Caso 16: Cambiar max-historic-passwords a 1, desactivar secure-password y days-to-expire a 10', function(done) {
    let data = {
        "data": {
            "type": "secure-policies",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": true,
                "days-to-expire": 10,
                "login-locked": false,
                "max-historic-passwords": 1,
                "password-history": true,
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

it('Caso 17: Cambiar contraseña por la primera guardada por history-password', function(done) {
    let data = {
        "data": {
            "attributes":{
                "password": "12345678"
            },
            "type": "users",
            "id": jsonData.adminUserId
            }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/users/'+jsonData.adminUserId)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .then((response) =>{
        expect(response.status).to.equal(200);
        expect(response.body.data.id).to.equal(jsonData.adminUserId);
        done();
    })
});

/*it('Caso 18: Conectar DB y borrar password_history al usuario', function(done) {
    let query = 'UPDATE password_credentials SET password_history = null WHERE user_id = '+jsonData.adminUserId+' AND platform_id = '+jsonData.currentPlatform.id+';';
    let query2 = 'UPDATE password_credentials SET password_set_at = DATE_SUB(NOW(), INTERVAL 15 DAY) WHERE user_id = '+jsonData.adminUserId+' AND platform_id = '+jsonData.currentPlatform.id+';';

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    });

    new Promise(resolve, reject => {
        connection.query(query,function (error, results, fields) {
            
            
        })
        resolve();
        done();
    });
});

it('Caso 19: Loguearse con la password expirada', function(done) {
    oauth.login({
        username: 'soledad.coronel@gointegro.com',
        password: '12345678',
        subdomain: jsonData.currentPlatform.subdomain
      }).then((response) => {
        console.log(jsonData.adminUserId);
        expect(response.status).to.equal(400);
        let errorCode = _.get(response, 'errors.0.code');
        expect(errorCode).to.equal('10100');
        done();
      });
});*/

});

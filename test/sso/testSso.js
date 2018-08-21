import Oauth from './../../src/models/oauth';
import { session } from './../../src/services/session';
var jsonData = require('./../fixtures/data.json');

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var expect = chai.expect;
const _ = require('lodash');

chai.use(chaiHttp);
chai.use(chaiColors);

let oauth = new Oauth();
let adminToken = null;

describe('ENDPOINT SSO', function() {
	
before(function(done) {
    session.addToken(1, adminToken);
    done();
});

// TESTS CASES
///////////////////////////////////////////////////////////////////////////////////////////

console.log("TESTS CASES");

it('Caso 1: Sso nunca activado (404 Not Found)', function(done) {
    chai.request('http://api.cd.gointegro.net')
    .get('/single-sign-ons/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .send()
    .catch((error) => {
        expect(error.status).to.equal(404);
        done();
    })
});

it('Caso 2: Crear Sso con create-user inactivo', function(done) {
    let data = {
        "data": {
            "type": "single-sign-ons",
            "attributes": {
                "enabled": true,
                "login-url": "https://emberito.com/login",
                "x509-cert": "-----BEGIN CERTIFICATE-----\nMIIDmTCCAwKgAwIBAgIJAOwuihM3pT5xMA0GCSqGSIb3DQEBBQUAMIGQMQswCQYD\nVQQGEwJBUjENMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJ\nR09pbnRlZ3JvMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEq\nMCgGCSqGSIb3DQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tMB4XDTE2\nMDcyNjE4NTgxMloXDTI2MDcyNjE4NTgxMlowgZAxCzAJBgNVBAYTAkFSMQ0wCwYD\nVQQIEwRDQUJBMQ0wCwYDVQQHEwRDQUJBMRIwEAYDVQQKEwlHT2ludGVncm8xCzAJ\nBgNVBAsTAklUMRYwFAYDVQQDEw1nb2ludGVncm8ubmV0MSowKAYJKoZIhvcNAQkB\nFhthZG9sZm8uY2FzdHJvQGdvaW50ZWdyby5jb20wgZ8wDQYJKoZIhvcNAQEBBQAD\ngY0AMIGJAoGBAK+c7htrA8H+l4jCGywu+xlbPZaQZcQW90O2D7hy7+S5KDMegDsx\n7cQ2TkQ4zXU1U3xrvnHOKZcDSJ2TSraIIWsYskdS12fZ0wWbWTKGGqJw6zpV+lN9\ntcHm18Ke2nUBtmwh2unr6VDQQi8ogHFhadScBP3Q+H39w6NRCmHU1zUpAgMBAAGj\ngfgwgfUwHQYDVR0OBBYEFMkLsbOxccvYFge2OTHyPp39NfqcMIHFBgNVHSMEgb0w\ngbqAFMkLsbOxccvYFge2OTHyPp39NfqcoYGWpIGTMIGQMQswCQYDVQQGEwJBUjEN\nMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJR09pbnRlZ3Jv\nMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEqMCgGCSqGSIb3\nDQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tggkA7C6KEzelPnEwDAYD\nVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCCyTu/YUXG6CrU5aKh/Ms5ogcu\nCfQYp2RNIBH4dMaIHGIPHNlDn2PHohG4hqxRr1+ARwOQSEme4eYC9snLbLkleLvg\n+eha59a4xcPrlspFyH1ZknCnEaQ4/706twcKHbSkPkWLCORhW4Ev7za8mJJGjrka\nZ0y3LZ0AAdFDq7Uecw==\n-----END CERTIFICATE-----",
                "attr-email": "correo",
                "create-user": false
            }
        }
    };
    chai.request('http://api.cd.gointegro.net')
    .post('/single-sign-ons/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+jsonData.adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .then((response) => {
        expect(response.status).to.equal(201);
        done();
    })
});

it('Caso 3: Loguearse luego de activar SSO', function(done) {
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

it('Caso 4: Error SSO ya activado (code: 10011)', function(done) {
    let data = {
        "data": {
            "type": "single-sign-ons",
            "attributes": {
                "enabled": true,
                "login-url": "https://emberito.com/login",
                "x509-cert": "-----BEGIN CERTIFICATE-----\nMIIDmTCCAwKgAwIBAgIJAOwuihM3pT5xMA0GCSqGSIb3DQEBBQUAMIGQMQswCQYD\nVQQGEwJBUjENMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJ\nR09pbnRlZ3JvMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEq\nMCgGCSqGSIb3DQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tMB4XDTE2\nMDcyNjE4NTgxMloXDTI2MDcyNjE4NTgxMlowgZAxCzAJBgNVBAYTAkFSMQ0wCwYD\nVQQIEwRDQUJBMQ0wCwYDVQQHEwRDQUJBMRIwEAYDVQQKEwlHT2ludGVncm8xCzAJ\nBgNVBAsTAklUMRYwFAYDVQQDEw1nb2ludGVncm8ubmV0MSowKAYJKoZIhvcNAQkB\nFhthZG9sZm8uY2FzdHJvQGdvaW50ZWdyby5jb20wgZ8wDQYJKoZIhvcNAQEBBQAD\ngY0AMIGJAoGBAK+c7htrA8H+l4jCGywu+xlbPZaQZcQW90O2D7hy7+S5KDMegDsx\n7cQ2TkQ4zXU1U3xrvnHOKZcDSJ2TSraIIWsYskdS12fZ0wWbWTKGGqJw6zpV+lN9\ntcHm18Ke2nUBtmwh2unr6VDQQi8ogHFhadScBP3Q+H39w6NRCmHU1zUpAgMBAAGj\ngfgwgfUwHQYDVR0OBBYEFMkLsbOxccvYFge2OTHyPp39NfqcMIHFBgNVHSMEgb0w\ngbqAFMkLsbOxccvYFge2OTHyPp39NfqcoYGWpIGTMIGQMQswCQYDVQQGEwJBUjEN\nMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJR09pbnRlZ3Jv\nMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEqMCgGCSqGSIb3\nDQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tggkA7C6KEzelPnEwDAYD\nVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCCyTu/YUXG6CrU5aKh/Ms5ogcu\nCfQYp2RNIBH4dMaIHGIPHNlDn2PHohG4hqxRr1+ARwOQSEme4eYC9snLbLkleLvg\n+eha59a4xcPrlspFyH1ZknCnEaQ4/706twcKHbSkPkWLCORhW4Ev7za8mJJGjrka\nZ0y3LZ0AAdFDq7Uecw==\n-----END CERTIFICATE-----",
                "attr-email": "correo",
                "create-user": false
            }
        }
    };
    chai.request('http://api.cd.gointegro.net')
    .post('/single-sign-ons/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .catch((error) => {
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10011');
        done();
    })
});

it('Caso 5: Error certificado inválido (code: 10012)', function(done) {
    let data = {
        "data": {
            "type": "single-sign-ons",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": true,
                "login-url": "https://emberito.com/login",
                "x509-cert": "-----BEGIN\nMIIDmTCCAwKgAwIBAgIJAOwuihM3pT5xMA0GCSqGSIb3DQEBBQUAMIGQMQswCQYD\nVQQGEwJBUjENMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJ\nR09pbnRlZ3JvMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEq\nMCgGCSqGSIb3DQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tMB4XDTE2\nMDcyNjE4NTgxMloXDTI2MDcyNjE4NTgxMlowgZAxCzAJBgNVBAYTAkFSMQ0wCwYD\nVQQIEwRDQUJBMQ0wCwYDVQQHEwRDQUJBMRIwEAYDVQQKEwlHT2ludGVncm8xCzAJ\nBgNVBAsTAklUMRYwFAYDVQQDEw1nb2ludGVncm8ubmV0MSowKAYJKoZIhvcNAQkB\nFhthZG9sZm8uY2FzdHJvQGdvaW50ZWdyby5jb20wgZ8wDQYJKoZIhvcNAQEBBQAD\ngY0AMIGJAoGBAK+c7htrA8H+l4jCGywu+xlbPZaQZcQW90O2D7hy7+S5KDMegDsx\n7cQ2TkQ4zXU1U3xrvnHOKZcDSJ2TSraIIWsYskdS12fZ0wWbWTKGGqJw6zpV+lN9\ntcHm18Ke2nUBtmwh2unr6VDQQi8ogHFhadScBP3Q+H39w6NRCmHU1zUpAgMBAAGj\ngfgwgfUwHQYDVR0OBBYEFMkLsbOxccvYFge2OTHyPp39NfqcMIHFBgNVHSMEgb0w\ngbqAFMkLsbOxccvYFge2OTHyPp39NfqcoYGWpIGTMIGQMQswCQYDVQQGEwJBUjEN\nMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJR09pbnRlZ3Jv\nMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEqMCgGCSqGSIb3\nDQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tggkA7C6KEzelPnEwDAYD\nVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCCyTu/YUXG6CrU5aKh/Ms5ogcu\nCfQYp2RNIBH4dMaIHGIPHNlDn2PHohG4hqxRr1+ARwOQSEme4eYC9snLbLkleLvg\n+eha59a4xcPrlspFyH1ZknCnEaQ4/706twcKHbSkPkWLCORhW4Ev7za8mJJGjrka\nZ0y3LZ0AAdFDq7Uecw==\n-----END CERTIFICATE-----",
                "attr-email": "correo",
                "create-user": false
            }
        }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/single-sign-ons/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .catch((error) => {
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10012');
        done();
    })
});

it('Caso 6: Activar create-user sin los atributos first-name y last-name (code: 10014)', function(done) {
    let data = {
        "data": {
            "type": "single-sign-ons",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": true,
                "login-url": "https://emberito.com/login",
                "x509-cert": "-----BEGIN CERTIFICATE-----\nMIIDmTCCAwKgAwIBAgIJAOwuihM3pT5xMA0GCSqGSIb3DQEBBQUAMIGQMQswCQYD\nVQQGEwJBUjENMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJ\nR09pbnRlZ3JvMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEq\nMCgGCSqGSIb3DQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tMB4XDTE2\nMDcyNjE4NTgxMloXDTI2MDcyNjE4NTgxMlowgZAxCzAJBgNVBAYTAkFSMQ0wCwYD\nVQQIEwRDQUJBMQ0wCwYDVQQHEwRDQUJBMRIwEAYDVQQKEwlHT2ludGVncm8xCzAJ\nBgNVBAsTAklUMRYwFAYDVQQDEw1nb2ludGVncm8ubmV0MSowKAYJKoZIhvcNAQkB\nFhthZG9sZm8uY2FzdHJvQGdvaW50ZWdyby5jb20wgZ8wDQYJKoZIhvcNAQEBBQAD\ngY0AMIGJAoGBAK+c7htrA8H+l4jCGywu+xlbPZaQZcQW90O2D7hy7+S5KDMegDsx\n7cQ2TkQ4zXU1U3xrvnHOKZcDSJ2TSraIIWsYskdS12fZ0wWbWTKGGqJw6zpV+lN9\ntcHm18Ke2nUBtmwh2unr6VDQQi8ogHFhadScBP3Q+H39w6NRCmHU1zUpAgMBAAGj\ngfgwgfUwHQYDVR0OBBYEFMkLsbOxccvYFge2OTHyPp39NfqcMIHFBgNVHSMEgb0w\ngbqAFMkLsbOxccvYFge2OTHyPp39NfqcoYGWpIGTMIGQMQswCQYDVQQGEwJBUjEN\nMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJR09pbnRlZ3Jv\nMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEqMCgGCSqGSIb3\nDQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tggkA7C6KEzelPnEwDAYD\nVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCCyTu/YUXG6CrU5aKh/Ms5ogcu\nCfQYp2RNIBH4dMaIHGIPHNlDn2PHohG4hqxRr1+ARwOQSEme4eYC9snLbLkleLvg\n+eha59a4xcPrlspFyH1ZknCnEaQ4/706twcKHbSkPkWLCORhW4Ev7za8mJJGjrka\nZ0y3LZ0AAdFDq7Uecw==\n-----END CERTIFICATE-----",
                "attr-email": "correo",
                "create-user": true
            }
        }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/single-sign-ons/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .catch((error) => {
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10014');
        done();
    })
});

it('Caso 7: Activar create-user sin los atributos first-name y last-name (code: 10014)', function(done) {
    let data = {
        "data": {
            "type": "single-sign-ons",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": true,
                "login-url": "https://emberito.com/login",
                "x509-cert": "-----BEGIN CERTIFICATE-----\nMIIDmTCCAwKgAwIBAgIJAOwuihM3pT5xMA0GCSqGSIb3DQEBBQUAMIGQMQswCQYD\nVQQGEwJBUjENMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJ\nR09pbnRlZ3JvMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEq\nMCgGCSqGSIb3DQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tMB4XDTE2\nMDcyNjE4NTgxMloXDTI2MDcyNjE4NTgxMlowgZAxCzAJBgNVBAYTAkFSMQ0wCwYD\nVQQIEwRDQUJBMQ0wCwYDVQQHEwRDQUJBMRIwEAYDVQQKEwlHT2ludGVncm8xCzAJ\nBgNVBAsTAklUMRYwFAYDVQQDEw1nb2ludGVncm8ubmV0MSowKAYJKoZIhvcNAQkB\nFhthZG9sZm8uY2FzdHJvQGdvaW50ZWdyby5jb20wgZ8wDQYJKoZIhvcNAQEBBQAD\ngY0AMIGJAoGBAK+c7htrA8H+l4jCGywu+xlbPZaQZcQW90O2D7hy7+S5KDMegDsx\n7cQ2TkQ4zXU1U3xrvnHOKZcDSJ2TSraIIWsYskdS12fZ0wWbWTKGGqJw6zpV+lN9\ntcHm18Ke2nUBtmwh2unr6VDQQi8ogHFhadScBP3Q+H39w6NRCmHU1zUpAgMBAAGj\ngfgwgfUwHQYDVR0OBBYEFMkLsbOxccvYFge2OTHyPp39NfqcMIHFBgNVHSMEgb0w\ngbqAFMkLsbOxccvYFge2OTHyPp39NfqcoYGWpIGTMIGQMQswCQYDVQQGEwJBUjEN\nMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJR09pbnRlZ3Jv\nMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEqMCgGCSqGSIb3\nDQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tggkA7C6KEzelPnEwDAYD\nVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCCyTu/YUXG6CrU5aKh/Ms5ogcu\nCfQYp2RNIBH4dMaIHGIPHNlDn2PHohG4hqxRr1+ARwOQSEme4eYC9snLbLkleLvg\n+eha59a4xcPrlspFyH1ZknCnEaQ4/706twcKHbSkPkWLCORhW4Ev7za8mJJGjrka\nZ0y3LZ0AAdFDq7Uecw==\n-----END CERTIFICATE-----",
                "attr-email": "correo",
                "create-user": true
            }
        }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/single-sign-ons/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .catch((error) => {
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10014');
        done();
    })
});

it('Caso 8: Activar create-user con un solo atributo, si first-name y no last-name (code: 10014)', function(done) {
    let data = {
        "data": {
            "type": "single-sign-ons",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": true,
                "login-url": "https://emberito.com/login",
                "x509-cert": "-----BEGIN CERTIFICATE-----\nMIIDmTCCAwKgAwIBAgIJAOwuihM3pT5xMA0GCSqGSIb3DQEBBQUAMIGQMQswCQYD\nVQQGEwJBUjENMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJ\nR09pbnRlZ3JvMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEq\nMCgGCSqGSIb3DQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tMB4XDTE2\nMDcyNjE4NTgxMloXDTI2MDcyNjE4NTgxMlowgZAxCzAJBgNVBAYTAkFSMQ0wCwYD\nVQQIEwRDQUJBMQ0wCwYDVQQHEwRDQUJBMRIwEAYDVQQKEwlHT2ludGVncm8xCzAJ\nBgNVBAsTAklUMRYwFAYDVQQDEw1nb2ludGVncm8ubmV0MSowKAYJKoZIhvcNAQkB\nFhthZG9sZm8uY2FzdHJvQGdvaW50ZWdyby5jb20wgZ8wDQYJKoZIhvcNAQEBBQAD\ngY0AMIGJAoGBAK+c7htrA8H+l4jCGywu+xlbPZaQZcQW90O2D7hy7+S5KDMegDsx\n7cQ2TkQ4zXU1U3xrvnHOKZcDSJ2TSraIIWsYskdS12fZ0wWbWTKGGqJw6zpV+lN9\ntcHm18Ke2nUBtmwh2unr6VDQQi8ogHFhadScBP3Q+H39w6NRCmHU1zUpAgMBAAGj\ngfgwgfUwHQYDVR0OBBYEFMkLsbOxccvYFge2OTHyPp39NfqcMIHFBgNVHSMEgb0w\ngbqAFMkLsbOxccvYFge2OTHyPp39NfqcoYGWpIGTMIGQMQswCQYDVQQGEwJBUjEN\nMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJR09pbnRlZ3Jv\nMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEqMCgGCSqGSIb3\nDQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tggkA7C6KEzelPnEwDAYD\nVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCCyTu/YUXG6CrU5aKh/Ms5ogcu\nCfQYp2RNIBH4dMaIHGIPHNlDn2PHohG4hqxRr1+ARwOQSEme4eYC9snLbLkleLvg\n+eha59a4xcPrlspFyH1ZknCnEaQ4/706twcKHbSkPkWLCORhW4Ev7za8mJJGjrka\nZ0y3LZ0AAdFDq7Uecw==\n-----END CERTIFICATE-----",
                "attr-email": "correo",
                "create-user": true,
                "attr-first-name": "name"
            }
        }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/single-sign-ons/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .catch((error) => {
        expect(error.status).to.equal(400);
        let errorCode = _.get(JSON.parse(error.response.text), 'errors.0.code');
        expect(errorCode).to.equal('10014');
        done();
    })
});

it('Caso 9: Activar create-user con atributos first-name y last-name', function(done) {
    let data = {
        "data": {
            "type": "single-sign-ons",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": true,
                "login-url": "https://emberito.com/login",
                "x509-cert": "-----BEGIN CERTIFICATE-----\nMIIDmTCCAwKgAwIBAgIJAOwuihM3pT5xMA0GCSqGSIb3DQEBBQUAMIGQMQswCQYD\nVQQGEwJBUjENMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJ\nR09pbnRlZ3JvMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEq\nMCgGCSqGSIb3DQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tMB4XDTE2\nMDcyNjE4NTgxMloXDTI2MDcyNjE4NTgxMlowgZAxCzAJBgNVBAYTAkFSMQ0wCwYD\nVQQIEwRDQUJBMQ0wCwYDVQQHEwRDQUJBMRIwEAYDVQQKEwlHT2ludGVncm8xCzAJ\nBgNVBAsTAklUMRYwFAYDVQQDEw1nb2ludGVncm8ubmV0MSowKAYJKoZIhvcNAQkB\nFhthZG9sZm8uY2FzdHJvQGdvaW50ZWdyby5jb20wgZ8wDQYJKoZIhvcNAQEBBQAD\ngY0AMIGJAoGBAK+c7htrA8H+l4jCGywu+xlbPZaQZcQW90O2D7hy7+S5KDMegDsx\n7cQ2TkQ4zXU1U3xrvnHOKZcDSJ2TSraIIWsYskdS12fZ0wWbWTKGGqJw6zpV+lN9\ntcHm18Ke2nUBtmwh2unr6VDQQi8ogHFhadScBP3Q+H39w6NRCmHU1zUpAgMBAAGj\ngfgwgfUwHQYDVR0OBBYEFMkLsbOxccvYFge2OTHyPp39NfqcMIHFBgNVHSMEgb0w\ngbqAFMkLsbOxccvYFge2OTHyPp39NfqcoYGWpIGTMIGQMQswCQYDVQQGEwJBUjEN\nMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJR09pbnRlZ3Jv\nMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEqMCgGCSqGSIb3\nDQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tggkA7C6KEzelPnEwDAYD\nVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCCyTu/YUXG6CrU5aKh/Ms5ogcu\nCfQYp2RNIBH4dMaIHGIPHNlDn2PHohG4hqxRr1+ARwOQSEme4eYC9snLbLkleLvg\n+eha59a4xcPrlspFyH1ZknCnEaQ4/706twcKHbSkPkWLCORhW4Ev7za8mJJGjrka\nZ0y3LZ0AAdFDq7Uecw==\n-----END CERTIFICATE-----",
                "attr-email": "correo",
                "create-user": true,
                "attr-first-name": "name",
                "attr-last-name": "surname"
            }
        }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/single-sign-ons/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .then((response) => {
        expect(response.status).to.equal(200);
        let attrName = _.get((JSON.parse(response.text)), 'data.attributes.attr-first-name');
        expect(attrName).to.equal('name');
        done();
    })
});

it('Caso 10: Desactivar SSO', function(done) {
    let data = {
        "data": {
            "type": "single-sign-ons",
            "id": jsonData.currentPlatform.subdomain,
            "attributes": {
                "enabled": false,
                "login-url": "https://emberito.com/login",
                "x509-cert": "-----BEGIN CERTIFICATE-----\nMIIDmTCCAwKgAwIBAgIJAOwuihM3pT5xMA0GCSqGSIb3DQEBBQUAMIGQMQswCQYD\nVQQGEwJBUjENMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJ\nR09pbnRlZ3JvMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEq\nMCgGCSqGSIb3DQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tMB4XDTE2\nMDcyNjE4NTgxMloXDTI2MDcyNjE4NTgxMlowgZAxCzAJBgNVBAYTAkFSMQ0wCwYD\nVQQIEwRDQUJBMQ0wCwYDVQQHEwRDQUJBMRIwEAYDVQQKEwlHT2ludGVncm8xCzAJ\nBgNVBAsTAklUMRYwFAYDVQQDEw1nb2ludGVncm8ubmV0MSowKAYJKoZIhvcNAQkB\nFhthZG9sZm8uY2FzdHJvQGdvaW50ZWdyby5jb20wgZ8wDQYJKoZIhvcNAQEBBQAD\ngY0AMIGJAoGBAK+c7htrA8H+l4jCGywu+xlbPZaQZcQW90O2D7hy7+S5KDMegDsx\n7cQ2TkQ4zXU1U3xrvnHOKZcDSJ2TSraIIWsYskdS12fZ0wWbWTKGGqJw6zpV+lN9\ntcHm18Ke2nUBtmwh2unr6VDQQi8ogHFhadScBP3Q+H39w6NRCmHU1zUpAgMBAAGj\ngfgwgfUwHQYDVR0OBBYEFMkLsbOxccvYFge2OTHyPp39NfqcMIHFBgNVHSMEgb0w\ngbqAFMkLsbOxccvYFge2OTHyPp39NfqcoYGWpIGTMIGQMQswCQYDVQQGEwJBUjEN\nMAsGA1UECBMEQ0FCQTENMAsGA1UEBxMEQ0FCQTESMBAGA1UEChMJR09pbnRlZ3Jv\nMQswCQYDVQQLEwJJVDEWMBQGA1UEAxMNZ29pbnRlZ3JvLm5ldDEqMCgGCSqGSIb3\nDQEJARYbYWRvbGZvLmNhc3Ryb0Bnb2ludGVncm8uY29tggkA7C6KEzelPnEwDAYD\nVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCCyTu/YUXG6CrU5aKh/Ms5ogcu\nCfQYp2RNIBH4dMaIHGIPHNlDn2PHohG4hqxRr1+ARwOQSEme4eYC9snLbLkleLvg\n+eha59a4xcPrlspFyH1ZknCnEaQ4/706twcKHbSkPkWLCORhW4Ev7za8mJJGjrka\nZ0y3LZ0AAdFDq7Uecw==\n-----END CERTIFICATE-----",
                "attr-email": "correo",
                "create-user": true,
                "attr-first-name": "name",
                "attr-last-name": "surname"
            }
        }
    };
    chai.request('http://api.cd.gointegro.net')
    .patch('/single-sign-ons/'+jsonData.currentPlatform.subdomain)
    .set('Authorization', 'Bearer '+adminToken)
    .set('Content-Type', 'application/json')
    .send(data)
    .then((response) => {
        expect(response.status).to.equal(200);
        let enable = _.get((JSON.parse(response.text)), 'data.attributes.enabled');
        expect(enable).to.equal(false);
        done();
    })
});

});

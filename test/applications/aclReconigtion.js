//import Invitation from './../../src/models/invitation';
import Oauth from './../../src/models/oauth';
import { session } from './../../src/services/session';
import 'babel-polyfill';
//var jsonData = require('./../fixtures/data.json');

const chai = require('chai'), chaiColors = require('chai-colors');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const lodash = require('lodash');

chai.use(chaiHttp);
chai.use(chaiColors);

let adminToken = null;
let adminUserId = null;
let tokenInfo = null;

// variables utilizadas en los tests
describe('aclReconigtion', function() {
	//session.addToken(1, jsonData.adminToken);

before(function(done) { 
	let oauth = new Oauth();
	
	oauth.loginQa({
        username: 'marina.touceda@gointegro.com',
        password: 'Auto1234',
        subdomain: 'automation3',
	  })
	  .then((response) => {
        expect(response.status).to.equal(200);
        tokenInfo = response.content;
        adminToken = tokenInfo.access_token;
        adminUserId = tokenInfo.user_id;
		done();
      });
});

// TESTS CASES
///////////////////////////////////////////////////////////////////////////////////////////

console.log("TESTS CASES");


it('usario con acceso al programa ', function(done) {
    
    let oauth = new Oauth();
    oauth.chai.request('http://api.qa.go5.gointegro.net')
    .get('/recognition/programs/2110')
    .set('Authorization', 'Bearer '+adminToken)
    .send()
    .then((response) => {
        expect(response.status).to.equal(200);
        done();
    })
});

it('usario existente de otra plataforma ', function(done) {
    
    let oauth = new Oauth();
    oauth.chai.request('http://api.qa.go5.gointegro.net')
    .get('/recognition/programs/2109')
    .set('Authorization', 'Bearer '+adminToken)
    .send()
    .catch((error) => {
        expect(error.status).to.equal(403);
        done();
    })
});

it('usario inexistente ', function(done) {
    
    let oauth = new Oauth();
    oauth.chai.request('http://api.qa.go5.gointegro.net')
    .get('/recognition/programs/2109')
    .set('Authorization', 'Bearer ')
    .send()
    .catch((error) => {
        expect(error.status).to.equal(401);
        done();
    })
});

it('TPGO5-886/usario admin puede ver programa donde no participa ', function(done) {
    const REC_APP = '23751';
    const REC_PROGRAM = '2126';

    let oauth = new Oauth();
    oauth.chai.request('http://api.qa.go5.gointegro.net')
    .get('/recognition/recognition-applications?page=1&size=50')
    .set('Authorization', 'Bearer '+adminToken)
    .send()
    .then((response) => {
        expect(response.status).to.equal(200);
        let recApp = lodash.filter(response.body.applications, { 'id': REC_APP } )[0];
        expect(recApp.id).to.equal(REC_APP);
        expect(recApp.links.program).to.equal(REC_PROGRAM);
        done();
    })
});

it('TPGO5-887/dropdown de programa muestra programa desactivado desde BO ', function(done) {
    const REC_APP = '23753';
    const REC_PROGRAM = '2128';

    let oauth = new Oauth();
    oauth.chai.request('http://api.qa.go5.gointegro.net')
    .get('/recognition/recognition-applications?page=1&size=50')
    .set('Authorization', 'Bearer '+adminToken)
    .send()
    .then((response) => {
        expect(response.status).to.equal(200);
        let recApp = lodash.filter(response.body.applications, { 'id': REC_APP } )[0];
        expect(recApp.id).to.equal(REC_APP);
        expect(recApp.links.program).to.equal(REC_PROGRAM);
        done();
    })
});

it('TPGO5-888/dropdown de programa no muestra programas desactivado desde la aplicación ', function(done) {
    const REC_APP = '23754';
    const REC_PROGRAM = '2129';

    let oauth = new Oauth();
    oauth.chai.request('http://api.qa.go5.gointegro.net')
    .get('/recognition/recognition-applications?page=1&size=50')
    .set('Authorization', 'Bearer '+adminToken)
    .send()
    .then((response) => {
        expect(response.status).to.equal(200);
        var programIds = response.body.applications.map((application) => {
            return lodash.get(application, 'links.program')
        });
        expect(programIds.includes(REC_PROGRAM)).to.equal(false);

        done();
    })
});

});
//import Invitation from './../../src/models/invitation';
import Oauth from './../../src/models/oauth';
import { session } from './../../src/services/session';
import 'babel-polyfill';
//var jsonData = require('./../fixtures/data.json');

const chai = require('chai'), chaiColors = require('chai-colors');
const chaiHttp = require('chai-http');
const expect = chai.expect;

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

});
import Oauth from '../../src/models/oauth';
import Platform from '../../src/models/platform';
import WidgetCustom from '../../src/models/widgetCustom';
import { session } from '../../src/services/session';
import Space from '../../src/models/space';
import Post from '../../src/models/post';
import Like from './../../src/models/like';
import Comment from './../../src/models/comment';
//var jsonData = require('./../fixtures/data.json');

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var Random = require("random-js");
var random = new Random();
const _ = require('lodash');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'go5-ms-db.cu2lxyygbem4.us-east-1.rds.amazonaws.com',
    user: 'apiuser',
    password: 'integro12',
    database: 'ms_platforms_cd'
})

chai.use(chaiHttp);
chai.use(chaiColors);

let oauth = new Oauth();
let adminToken = null;
let platformInfo = null;
let currentPlatform = {};
let adminToken2 = null;
let platformInfo2 = null;
let currentPlatform2 = {};
let publicSpace = null;
let currentPost = null;

describe('INDEPENDENT APP', function() {
	
before(function(done) {
    let platform = new Platform({
        name: 'Platform BNF' + random.integer(1, 10000),
        subdomain: 'subdomain' + random.integer(1, 10000),
        'app-soc': false,
        'app-bnf': true
    });
    platform.create().then((response) => {
        expect(response.status).to.equal(201);
        platformInfo = response.content;
        currentPlatform.subdomain = platformInfo.subdomain;
        currentPlatform.id = platformInfo.id;
        oauth.login({
            username: 'soledad.coronel@gointegro.com',
            password: 'myPassword',
            subdomain: currentPlatform.subdomain
          }).then((response) => {
            expect(response.status).to.equal(200);
            let tokenInfo = response.content;
            adminToken = tokenInfo.access_token;
            session.addToken(1, adminToken);
            done();
          });
    });
});

// TESTS CASES
///////////////////////////////////////////////////////////////////////////////////////////

console.log("TESTS CASES");

it('Caso 1: Plataforma sin widgets custom por defecto', function(done) {
    new WidgetCustom()
	.list({include: ['image']})
	.then((response) => {
		expect(response.status).to.equal(200);
		expect(response.content.meta.pagination['total-items']).to.equal(0);
        done();
    });
});

it('Caso 2: No poder crear posteos en plataforma con solo BNF', function(done) {
    let space = new Space({
		name: 'espacio publico',
		description: 'espacio compañia',
		icon: 'QA',
		active: true,
		'social-enabled': true,
		position: 0,
		visibility: 'company'
	});
	space.create().then((response) => {
        space = response.content;
        expect(response.status).to.equal(201);
        publicSpace = space;
        let post = new Post({
			content: 'contenido de post',
			target: publicSpace
		});
		post.create().then((response) => {
			expect(response.status).to.equal(403);
            done();
        });
    });
});

it('Caso 3: Crear plataforma con SOC + BNF', function(done) {
    let platform = new Platform({
        name: 'Platform SOC+BNF' + random.integer(1, 10000),
        subdomain: 'subdomain' + random.integer(1, 10000),
        'app-soc': true,
        'app-bnf': true
    });
    platform.create().then((response) => {
        expect(response.status).to.equal(201);
        platformInfo2 = response.content;
        currentPlatform2.subdomain = platformInfo2.subdomain;
        currentPlatform2.id = platformInfo2.id;
        oauth.login({
            username: 'soledad.coronel@gointegro.com',
            password: 'myPassword',
            subdomain: currentPlatform2.subdomain
        }).then((response) => {
            expect(response.status).to.equal(200);
            let tokenInfo2 = response.content;
            adminToken2 = tokenInfo2.access_token;
            session.addToken(1, adminToken2);
            done();
        });
    });
});

it('Caso 4: Poder crear posteos en plataforma con SOC + BNF', function(done) {
    let space = new Space({
		name: 'espacio publico',
		description: 'espacio compañia',
		icon: 'QA',
		active: true,
		'social-enabled': true,
		position: 0,
		visibility: 'company'
	});
	space.create().then((response) => {
        space = response.content;
        expect(response.status).to.equal(201);
        publicSpace = space;
        let post = new Post({
			content: 'contenido de post',
			target: publicSpace
		});
		post.create().then((response) => {
			expect(response.status).to.equal(201);
			post = response.content;
			currentPost = post;
            done();
        });
    });
});

it('Caso 5: Conectar DB y desactivar SOC de la plataforma SOC + BNF', function(done) {
    let query = 'UPDATE installation SET status = "disabled" WHERE platform_id = '+platformInfo2.id+' AND application_id = 1;';
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    });
    connection.query(query,function (error, results, fields) { 
        expect(results.affectedRows).to.equal(1);
        done();
    })
    
});

it('Caso 6: No poder comentar post de la plataforma con SOC desactivado', function(done) {
    let comment = new Comment({
        comment: 'commentario de post',
        subject: currentPost,
    });
    comment.create().then((response) => {
        expect(response.status).to.equal(403);
        done();
    });
});

it('Caso 7: Conectar DB y desinstalar SOC de la plataforma SOC + BNF', function(done) {
    let query = 'UPDATE installation SET uninstalled_at = "2018-09-05 00:00:00" WHERE platform_id = '+platformInfo2.id+' AND application_id = 1;';
 
    connection.query(query,function (error, results, fields) { 
        expect(results.affectedRows).to.equal(1);
        done();
    })
    
});

it('Caso 8: No poder comentar post de la plataforma con SOC desactivado', function(done) {
    let like = new Like({
		subject: currentPost,
	});
	like.create().then((response) => {
		expect(response.status).to.equal(403);
		done();
	});
});

});

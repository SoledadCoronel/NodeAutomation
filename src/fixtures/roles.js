var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

const ROLE_ADMIN = "Admin";
const ROLE_BASIC = "Basic";
const ROLE_SPACE_ADMIN = "Administrador de espacios";

class RoleFixture {

	constructor (oauthFixture) {
		this.oauthFixture = oauthFixture;
		this.references = {};
    }

    load() {
    	var fixture = this;

      	return chai.request('http://api.cd.gointegro.net')
		.get('/roles')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + fixture.oauthFixture.references.tokenA.access_token)
		.then(function(res) {
			for (var i in res.body.data) {
				let role = res.body.data[i];
				
				switch (role.attributes.name) {
					case fixture.ROLE_ADMIN:
						fixture.references['rolesA']['admin'] = role;
						break;
					case fixture.ROLE_BASIC:
						fixture.references['rolesA']['basic'] = role;
						break;
					case fixture.ROLE_SPACE_ADMIN:
						fixture.references['rolesA']['spaceAdmin'] = role;
						break;
				}
			}
		
		});
	}
};

export default RoleFixture;




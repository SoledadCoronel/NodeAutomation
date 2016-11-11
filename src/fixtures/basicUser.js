import User from './../../src/models/user';
import Role from './../../src/models/role';
import UserSerializer from './../../src/serializers/userSerializer';


var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

class BasicUserFixture {

	constructor (roleFixture) {
		this.roleFixture = roleFixture;
		this.oauthFixture = roleFixture.oauthFixture;
		this.references = {'basicUserA': {}};
	}

	load() {

		var oauthFixture = this.oauthFixture;
		var roleFixture = this.roleFixture;
		var userBasic = this;
		var userSerializer = new UserSerializer();

		var random = new Random();
		var user = new User({
		    'name': 'UsuarioRolBasico',
		    'last-name': 'UsuarioRolBasico',
		    'email' : "basico"+random.integer(1, 10000)+"@gointegro.com",
		    'status' : 'active',
		    'login-enabled' : true,
		    role: new Role({
		      id: roleFixture.references.rolesA.basic.id,
		    })
		});

		// se serializa el user
		var jsonSerialized = userSerializer.serialize(user);
		
		var postBody = JSON.stringify(jsonSerialized, null, 2);
		
		return chai.request('http://api.cd.gointegro.net')
			.post('/users')
			.set('content-type', 'application/vnd.api+json')
			.set('Accept', 'application/vnd.api+json')
			.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
			.send(postBody)
			.then(function(res) {
				userBasic.references['basicUserA'] = {
					'id': res.body.data.id,
					'email': res.body.data.attributes.email
			};
		});
	}
};

export default BasicUserFixture;

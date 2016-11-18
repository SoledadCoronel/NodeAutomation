import User from './../../src/models/user';
import Role from './../../src/models/role';
import UserSerializer from './../../src/serializers/userSerializer';


var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

class AdminSpaceUserFixture {

	constructor (roleFixture) {
		this.roleFixture = roleFixture;
		this.oauthFixture = roleFixture.oauthFixture;
		this.references = {'adminSpaceUserA': {}};
	}

	load() {

		var oauthFixture = this.oauthFixture;
		var roleFixture = this.roleFixture;
		var adminSpaceUser = this;
		var userSerializer = new UserSerializer();

		var random = new Random();
		var user = new User({
		    'name': 'UsuarioRolAdminSpace',
		    'last-name': 'UsuarioRolAdminSpace',
		    'email' : "spaceAdmin"+random.integer(1, 10000)+"@gointegro.com",
		    'status' : 'active',
		    'login-enabled' : true,
		    role: new Role({
		      id: roleFixture.references.rolesA.spaceAdmin.id,
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
				adminSpaceUser.references['adminSpaceUserA'] = {
					'id': res.body.data.id,
					'email': res.body.data.attributes.email
			};
		});
	}
};

export default AdminSpaceUserFixture;

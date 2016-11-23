var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

class OauthFixtureBasic {

	constructor (basicUserFixture, platformFixture) {
		this.basicUserFixture = basicUserFixture;
		this.platformFixture = platformFixture;
		this.references = {'tokenA': {}};
	}

	load() {

		var basicOauth = this;
		var basicUserFixture = this.basicUserFixture;

		var loginData = { username: basicUserFixture.references.basicUserA.email,
			password: 'coquito25',
			subdomain: basicOauth.platformFixture.references.platformA.subdomain,
			client_id: 'xquxqcct2m80ocswgksskgcs04gokg4ccg8wosk4o8skc0gsw',
			client_secret: 'xlqzn4qpq2o44g4kks8o40w0gkw004sck440osc0cso8g8844',
			grant_type: 'password' 
		}
      	return chai.request('http://api.cd.gointegro.net')
		.post('/oauth/token')
		.set('content-type', 'application/x-www-form-urlencoded')
		.send(loginData)
		.then(function(res) {
			basicOauth.references['tokenA'] = {
				'access_token': res.body.access_token, 
				'user_id': res.body.user_id
			};
		}); 
	}
};

export default OauthFixtureBasic;
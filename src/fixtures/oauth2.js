import PlatformFixture from './../../src/fixtures/platform';

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

class Oauth {

	constructor (platformFixture) {
		this.platformFixture = platformFixture;
		this.references = {};
    }

    load() {
    	var oauth = this;
    	//var fixture = new PlatformFixture();

      	return chai.request('http://api.cd.gointegro.net')
		.post('/oauth/token')
		.set('content-type', 'application/x-www-form-urlencoded')
		.send({ username: 'soledad.coronel@gointegro.com',
				password: 'coquito25',
				subdomain: oauth.platformFixture.references.platformA.subdomain,
				client_id: 'xquxqcct2m80ocswgksskgcs04gokg4ccg8wosk4o8skc0gsw',
				client_secret: 'xlqzn4qpq2o44g4kks8o40w0gkw004sck440osc0cso8g8844',
				grant_type: 'password' 
			})
		.then(function(res) {
			oauth.references['tokenA'] = {
				'access_token': res.body.access_token, 
				'platform_id' : res.body.platform_id,
				'user_id': res.body.user_id
			};
			console.log(res.body);
			console.log(oauth.references['tokenA']);

		}); 
	}
};

export default Oauth;




var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

class PublicSpaceFixture {

	constructor (oauthFixture) {
		this.oauthFixture = oauthFixture;
		this.references = {'publicSpace': {}}
	}

	load() {

		var publicSpace = this;
		var oauthFixture = this.oauthFixture;

		return chai.request('http://api.cd.gointegro.net')
		.post('/spaces')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(
			{"data": {
    			"type": "spaces",
    			"attributes": {
      			"name": "ESPACIO PUBLICO",
      			"description": "ESPACIO PUBLICO",
      			"icon": "QA",
      			"active": true,
      			"social-enabled": true,
      			"position": 0,
      			"visibility": "private"
    			}
  			}
		})
		.then(function(res) {
			publicSpace.references['publicSpace'] = {
				'id': res.body.data.id
			};
		});
	}
};

export default PublicSpaceFixture;
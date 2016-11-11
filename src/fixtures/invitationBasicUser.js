var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

class InvitationBasicUserFixture {

	constructor (basicUserFixture) {
		this.basicUserFixture = basicUserFixture;
		this.oauthFixture = basicUserFixture.roleFixture.oauthFixture;
		this.references = {'invitationBasicUser': {}};
	}

	load() {

		var oauthFixture = this.oauthFixture;
		var basicUserFixture = this.basicUserFixture;
		var basicInvitation = this;

		var invitation = {
			  'data': {
    			'type': 'invitations',
    			'relationships': {
      			'user': {
        			'data': {
          			'id': basicUserFixture.references.basicUserA.id,
          			'type': 'users'
        				}
      				}
    			}
  			}
		}
		return chai.request('http://api.cd.gointegro.net')
		.post('/invitations')
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send(invitation)
		.then(function(res) {
				basicInvitation.references['invitationBasicUser'] = {
					'id': res.body.data.id
			};
		});

	}
};

export default InvitationBasicUserFixture;
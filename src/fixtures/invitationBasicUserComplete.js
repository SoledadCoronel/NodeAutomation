var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

class InvitationBasicUserCompleteFixture {

	constructor (invitationBasicUserFixture) {
		this.invitationBasicUserFixture = invitationBasicUserFixture;
		this.oauthFixture = invitationBasicUserFixture.basicUserFixture.roleFixture.oauthFixture;
		this.references = {'invitationBasicUserComplete': {}};
	}

	load() {

		var oauthFixture = this.oauthFixture;
		var invitationBasicUserFixture = this.invitationBasicUserFixture;
		var basicComplete = this;

		return chai.request('http://api.cd.gointegro.net')
		.patch('/invitations/' + invitationBasicUserFixture.references.invitationBasicUser.id)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send({'data': 
				{
				 'type': 'invitations',
				 'id': invitationBasicUserFixture.references.invitationBasicUser.id,
				 'attributes': 
				 {'status': 'complete',
				  'password': 'coquito25'
				 }
				}
			})
		.then(function(res) {
				basicComplete.references['invitationBasicUserComplete'] = {
					'id': res.body.data.id
			};
		});
	}
};

export default InvitationBasicUserCompleteFixture;
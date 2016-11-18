var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

class InvitationAdminSpaceUserCompleteFixture {

	constructor (invitationAdminSpaceUserFixture) {
		this.invitationAdminSpaceUserFixture = invitationAdminSpaceUserFixture;
		this.oauthFixture = invitationAdminSpaceUserFixture.adminSpaceUserFixture.roleFixture.oauthFixture;
		this.references = {'invitationAdminSpaceUserComplete': {}};
	}

	load() {

		var oauthFixture = this.oauthFixture;
		var invitationAdminSpaceUserFixture = this.invitationAdminSpaceUserFixture;
		var adminSpaceComplete = this;

		return chai.request('http://api.cd.gointegro.net')
		.patch('/invitations/' + invitationAdminSpaceUserFixture.references.invitationAdminSpaceUser.id)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.set('Authorization', 'Bearer ' + oauthFixture.references.tokenA.access_token)
		.send({'data': 
				{
				 'type': 'invitations',
				 'id': invitationAdminSpaceUserFixture.references.invitationAdminSpaceUser.id,
				 'attributes': 
				 {'status': 'complete',
				  'password': 'coquito25'
				 }
				}
			})
		.then(function(res) {
				adminSpaceComplete.references['invitationAdminSpaceUserComplete'] = {
					'id': res.body.data.id
			};
		});
	}
};

export default InvitationAdminSpaceUserCompleteFixture;
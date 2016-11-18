var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);

class InvitationAdminSpaceUserFixture {

	constructor (adminSpaceUserFixture) {
		this.adminSpaceUserFixture = adminSpaceUserFixture;
		this.oauthFixture = adminSpaceUserFixture.roleFixture.oauthFixture;
		this.references = {'invitationAdminSpaceUser': {}};
	}

	load() {

		var oauthFixture = this.oauthFixture;
		var adminSpaceUserFixture = this.adminSpaceUserFixture;
		var adminSpaceUserInvitation = this;

		var invitation2 = {
			  'data': {
    			'type': 'invitations',
    			'relationships': {
      			'user': {
        			'data': {
          			'id': adminSpaceUserFixture.references.adminSpaceUserA.id,
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
		.send(invitation2)
		.then(function(res) {
				adminSpaceUserInvitation.references['invitationAdminSpaceUser'] = {
					'id': res.body.data.id
			};
		});
	}
};

export default InvitationAdminSpaceUserFixture;
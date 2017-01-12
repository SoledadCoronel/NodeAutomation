import Serializer from './../serializers/invitationSerializer';
import AbstractModel from './abstractModel';
import User from './user';

class Invitation extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.status = data.status;
		this.password = data.password;
		this['created-at'] = data['created-at'];
		this['updated-at'] = data['updated-at'];

	    this.user = data.user;
    }

    endpoint() {
    	return '/invitations';
    }

    deconstruct(invitation) {
		return new Invitation({
			id: invitation.id,
			status: invitation.status,
			password: invitation.password,
			'created-at': invitation['created-at'],
			'updated-at': invitation['updated-at'],
			//relationships
			user: invitation.user,
		});
	}

	complete() {
		this.status = 'complete';
		this.password = 'myPassword';
		return this;
	}
};

export default Invitation;
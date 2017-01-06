import Serializer from './../serializers/invitationSerializer';
import AbstractModel from './abstractModel';

class Invitation extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.status = data.status;
		this.password = data.password || null;
		this['created-at'] = data['created-at'];
		this['updated-at'] = data['updated-at'];

	    this.user = data.user;
    }

    endpoint() {
    	return '/invitations';
    }

    deconstruct(invitation) {
		// FIXME
		return new Invitation(invitation);
	}

	/*complete(invitation) {
		this.status = 'complete';
		return this;
	}*/
};

export default Invitation;
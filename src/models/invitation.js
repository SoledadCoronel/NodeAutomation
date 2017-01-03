import Serializer from './../serializers/invitationSerializer';
import AbstractModel from './abstractModel';

class Invitation extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.status = data.status || 'pendin';
		this.password = data.password || [];
		this['created-at'] = data['created-at'];
		this['updated-at'] = data['updated-at'];

		if (data.id) {
			this.id = data.id;
		}

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
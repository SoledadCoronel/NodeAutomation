import {Serializer, Deserializer} from 'jsonapi-serializer';

class InvitationSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('invitation', {
			attributes: [],
      user: {
        ref: (user, invitation) => invitation.id,
        attributes: [],
        included: true
      }
    });

		this.deserializer = new Deserializer({});
	}

    serialize (data = {}) {
        
        let serialized = this.serializer.serialize(data);
        if (!data.id) {
            delete serialized.data.id;
        }
        return serialized;
    }

    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
            //
        });
	}
};

export default InvitationSerializer;
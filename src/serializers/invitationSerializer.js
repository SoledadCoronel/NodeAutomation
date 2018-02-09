import {Serializer, Deserializer} from 'jsonapi-serializer';
import User from './../models/user';


class InvitationSerializer {

	constructor (config = {}) {
    this.serializer = new Serializer('invitation', {
      attributes: [
      'status',
      'password',
      'user',
      'resend'
      ],
      user: {
        ref: (invitation, user) => user.id,
        attributes: ['name'],
        included: false
      }
    });

		this.deserializer = new Deserializer({
      users: {
        valueForRelationship: function (relationship) {
          return new User({
            id: relationship.id,
          });
        }
      }
    });
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
            //console.log(data);
        });
	}
};

export default InvitationSerializer;
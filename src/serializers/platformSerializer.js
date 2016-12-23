import {Serializer, Deserializer} from 'jsonapi-serializer';
import User from './../models/users';

class PlatformSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('platform', {
			attributes: [
				'name',
				'subdomain',
				'timezone',
				'status',
				'users-range',
				'language',
			],
			//  VER CON FRAN
			user: {
				ref: (platform, user) => user.id,
				attributes: ['name'],
							['last-name'],
							['email'],
							['password'],
				included: true
			}
		});

        this.deserializer = new Deserializer({
            user: {
                valueForRelationship: function (relationship) {
                    return new User({
                        id: relationship.id,
                        name: relationship.name,
                        'last-name': relationship.'last-name',
                        email: relationship.email,
                        password: relationship.password,
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
            //
        });
    }
}; 

export default PlatformSerializer;
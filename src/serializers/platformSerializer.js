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
        });
        this.serializer = new Serializer('user', {
            attributes: [
                'name',
                'last-name',
                'email',
                'password',
                'users-range',
                'language',
            ],
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

export default PlatformSerializer;
import {Serializer, Deserializer} from 'jsonapi-serializer';

class OauthSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('oauth', {
			attributes: [
				'client_id',
				'client_secret',
				'grant_type',
				'refresh_token'
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

export default OauthSerializer;
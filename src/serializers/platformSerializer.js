import {Serializer, Deserializer} from 'jsonapi-serializer';

class PlatformSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('platform', {
			attributes: [
				'name',
				'subdomain',
				'timezone',
				'status',
				'users-range',
                'country',
                'language',
                'app-soc',
                'app-bnf'
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
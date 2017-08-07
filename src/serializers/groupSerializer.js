import {Serializer, Deserializer} from 'jsonapi-serializer';

class GroupSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('groups', {
			attributes: [
      			'name',
      			'position'
			]
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

export default GroupSerializer;
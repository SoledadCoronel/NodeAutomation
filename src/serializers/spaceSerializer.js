import {Serializer, Deserializer} from 'jsonapi-serializer';

class SpaceSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('space', {
			attributes: [
      			'name',
      			'description',
      			'icon',
      			'active',
      			'social-enabled',
      			'position',
      			'visibility'
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

export default SpaceSerializer;
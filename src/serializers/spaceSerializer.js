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

	serializer(config = {}) {

		let serialized = this.serialized.serialize(data);
		if(!data.id) {
			delete serialized.data.id; 
		}
		return serialized;
	}

	deserializer(config = {}) {

		return this.deserializer.deserialize(data, function(error, data) {
			//
		});
	}
};

export default SpaceSerializer;
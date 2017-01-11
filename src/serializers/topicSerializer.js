import {Serializer, Deserializer} from 'jsonapi-serializer';

class TopicSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('topic', {
			attributes: [
     'name',
     'position'
     ],
     space: {
      ref: (topic, space) => space.id,
      attributes: ['name'],
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

export default TopicSerializer;
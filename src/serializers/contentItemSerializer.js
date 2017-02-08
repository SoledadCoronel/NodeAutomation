import {Serializer, Deserializer} from 'jsonapi-serializer';

class ContentItemSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('contentItem', {
			attributes: []			]
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

export default ContentItemSerializer;
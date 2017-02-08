import {Serializer, Deserializer} from 'jsonapi-serializer';

class FileSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('file', {
			attributes: [
      			'prefix',
      			'file'
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

export default FileSerializer;
import {Serializer, Deserializer} from 'jsonapi-serializer';

class MassiveActionsSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('massive-actions', {
			attributes: [
      			'namespace',
      			'action',
                'payload',
                'result'
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

export default MassiveActionsSerializer;
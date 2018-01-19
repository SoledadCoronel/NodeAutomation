import {Serializer, Deserializer} from 'jsonapi-serializer';

class UserCelebrationsSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('user-celebrations', {
			attributes: [
                'name',
                'last-name',
                'job-title',
                'picture',
                'language',
                'timezone',
                'email',
                'platform-id',
                'birth-date',
                'admission-date',
                'registration-date'
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

export default UserCelebrationsSerializer;
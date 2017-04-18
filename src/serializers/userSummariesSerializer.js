import {Serializer, Deserializer} from 'jsonapi-serializer';

class UserSummariesSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('posts', {
      attributes: [
        'name',
        'last-name',
        'job-title',
        'picture',
        'language',
        'timezone',
        'birth-date',
        'admission-date'
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

export default UserSummariesSerializer;
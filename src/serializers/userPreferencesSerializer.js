import {Serializer, Deserializer} from 'jsonapi-serializer';
import User from './../models/user';


class UserPreferencesSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('topic', {
      attributes: [
      'timezone',
      'language',
      'created-at',
      'updated-at',
      'user'
      ],
      user: {
        ref: (userPreferences, user) => user.id,
        attributes: ['timezone'],
        included: false
      }
    });

    this.deserializer = new Deserializer({
      user: {
        valueForRelationship: function (relationship) {
          return new User({
            id: relationship.id,
          });
        }
      }
    });
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

export default UserPreferencesSerializer;
import {Serializer, Deserializer} from 'jsonapi-serializer';
import Space from './../models/space';


class TopicSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('topic', {
      attributes: [
      'name',
      'position',
      'space'
      ],
      space: {
        ref: (topic, space) => space.id,
        attributes: ['name'],
        included: false
      }
    });

    this.deserializer = new Deserializer({
      spaces: {
        valueForRelationship: function (relationship) {
          return new Space({
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

export default TopicSerializer;
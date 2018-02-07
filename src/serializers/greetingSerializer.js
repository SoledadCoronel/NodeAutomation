import {Serializer, Deserializer} from 'jsonapi-serializer';
import UserSummaries from './../models/userSummaries';


class greetingSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('birthdays', {
      attributes: [
            'greeting-type',
            'omit',
            'event-date',
            'target'
      ],
      target: {
        ref: (greeting, target) => target.id,
        attributes: [],
        included: true,
        typeForAttribute: function() {
          return 'user-summaries'
        }
      }
    });

    this.deserializer = new Deserializer({
      'user-summaries': {
        valueForRelationship: function (relationship) {
          return new UserSummaries({
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
        if (data.target instanceof UserSummaries) {
          serialized.data.relationships.target.data.type = 'user-summaries';
        }
        return serialized;
    }

    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
            //
        });
  }
};

export default greetingSerializer;
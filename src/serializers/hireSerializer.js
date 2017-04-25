import {Serializer, Deserializer} from 'jsonapi-serializer';
import UserSummaries from './../models/userSummaries';
import Greeting from './../models/greeting';


class hireSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('hires', {
      attributes: [
            'event-date',
            'target',
            'greeting'
      ],
      target: {
        ref: (hires, target) => target.id,
        attributes: [],
        included: true,
        typeForAttribute: function() {
          return 'user-summaries'
        }
      },
      greeting: {
        ref: (hires, greeting) => greeting.id,
        attributes: [],
        included: true
      }
    });

    this.deserializer = new Deserializer({
      'user-summaries': {
        valueForRelationship: function (relationship) {
          return new UserSummaries({
            id: relationship.id,
          });
        }
      },
      greeting: {
        valueForRelationship: function (relationship) {
          return new Greeting({
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

export default hireSerializer;
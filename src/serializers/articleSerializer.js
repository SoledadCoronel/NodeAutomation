import {Serializer, Deserializer} from 'jsonapi-serializer';
import Topic from './../models/topic';


class ArticleSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('article', {
      attributes: [
      'title',
      'content',
      'active',
      'generate-post',
      'generate-notification',
      'topic'
      ],
      topic: {
        ref: (article, topic) => topic.id,
        attributes: ['name'],
        included: true
      }
    });

    this.deserializer = new Deserializer({
      topics: {
        valueForRelationship: function (relationship) {
          return new Topic({
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

export default ArticleSerializer;
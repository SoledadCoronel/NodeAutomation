import {Serializer, Deserializer} from 'jsonapi-serializer';
import FeedItem from './../models/feedItem';
import Post from './../models/post';

class FeedItemSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('feed-items', {
      attributes: [
      'item',
      ],
      item: {
        ref: (post, item) => item.id,
        attributes: [],
        included: true,
        typeForAttribute: function() {
          return 'posts'
        }
      }
    });

    this.deserializer = new Deserializer({
      posts: {
        valueForRelationship: function (relationship) {
          return new Post({
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
        if (data.item instanceof Post) {
          serialized.data.relationships.item.data.type = 'posts';
        }
        return serialized;
    }

    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
            //
        });
  }
};

export default FeedItemSerializer;
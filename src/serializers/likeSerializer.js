import {Serializer, Deserializer} from 'jsonapi-serializer';
import Post from './../models/post';
import Comment from './../models/comment';

class LikeSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('likes', {
      attributes: [
      'subject'
      ],
      subject: {
        ref: (like, subject) => subject.id,
        included: true
      }
    });

    this.deserializer = new Deserializer({
      posts: {
        valueForRelationship: function (relationship) {
          return new Post({
            id: relationship.id,
          });
        }
      },
      comments: {
        valueForRelationship: function (relationship) {
          return new Comment({
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
        if (data.subject instanceof Post) {
          serialized.data.relationships.subject.data.type = 'posts';
        }
        if (data.subject instanceof Comment) {
          serialized.data.relationships.subject.data.type = 'comments';
        }
        delete serialized.data.attributes;
        return serialized;
    }

    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
            //
        });
  }
};

export default LikeSerializer;
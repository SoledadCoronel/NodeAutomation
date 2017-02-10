import {Serializer, Deserializer} from 'jsonapi-serializer';
import Post from './../models/post';
import Comment from './../models/comment';


class CommentSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('comments', {
      attributes: [
      'comment',
      'subject',
      'reply-to'
      ],
      subject: {
        ref: (post, subject) => subject.id,
        //attributes: ['id', 'content', 'count-likes', 'count-comments'],
        included: true
      },
      'reply-to': {
        ref: (comment, replyTo) => replyTo.id,
        //attributes: [],
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
        if (data['reply-to'] instanceof Comment) {
          serialized.data.relationships['reply-to'].data.type = 'comments';
        }
        return serialized;
    }

    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
            //
        });
  }
};

export default CommentSerializer;
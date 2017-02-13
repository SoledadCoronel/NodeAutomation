import {Serializer, Deserializer} from 'jsonapi-serializer';
import Space from './../models/space';
import User from './../models/user';
import Profile from './../models/profile';



class PostSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('posts', {
      attributes: [
      'content',
      'target',
      ],
      target: {
        ref: (post, target) => target.id,
        attributes: [],
        included: true,
        typeForAttribute: function() {
          return 'spaces'
        }
      },
      target: {
        ref: (post, target) => target.id,
        attributes: [],
        included: true,
        typeForAttribute: function() {
          return 'users'
        }
      }
    });

    this.deserializer = new Deserializer({
      spaces: {
        valueForRelationship: function (relationship) {
          return new Space({
            id: relationship.id,
          });
        }
      },
     users: {
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
        if (data.target instanceof Space) {
          serialized.data.relationships.target.data.type = 'spaces';
        }
        if (data.target instanceof Profile) {
          serialized.data.relationships.target.data.type = 'users';
        }
        return serialized;
    }

    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
            //
        });
  }
};

export default PostSerializer;
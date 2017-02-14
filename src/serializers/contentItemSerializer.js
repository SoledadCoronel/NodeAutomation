import {Serializer, Deserializer} from 'jsonapi-serializer';
import Article from './../models/article';
import Gallery from './../models/gallery';

class ContentItemSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('content-items', {
      attributes: [
      'item',
      ],
      item: {
        ref: (article, item) => item.id,
        attributes: [],
        included: true,
        typeForAttribute: function() {
          return 'articles'
        }
      },
      item: {
        ref: (gallery, item) => item.id,
        attributes: [],
        included: true,
        typeForAttribute: function() {
          return 'galleries'
        }
      }
    });

    this.deserializer = new Deserializer({
      articles: {
        valueForRelationship: function (relationship) {
          return new Article({
            id: relationship.id,
          });
        }
      },
      galleries: {
        valueForRelationship: function (relationship) {
          return new Gallery({
            id: relationship.id,
          });
        }
      },
    });
  }

    serialize (data = {}) {
        
        let serialized = this.serializer.serialize(data);
        if (!data.id) {
            delete serialized.data.id;
        }
        if (data.item instanceof Article) {
          serialized.data.relationships.item.data.type = 'articles';
        }
        if (data.item instanceof Gallery) {
          serialized.data.relationships.item.data.type = 'galleries';
        }
        return serialized;
    }

    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
            //
        });
  }
};

export default ContentItemSerializer;
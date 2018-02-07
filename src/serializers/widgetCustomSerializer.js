import {Serializer, Deserializer} from 'jsonapi-serializer';
import File from './../models/file'


class WidgetCustomSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('widget-customs', {
      attributes: [
            'position',
            'status',
            'title',
            'show-title',
            'link',
            'image'
      ],
      image: {
        ref: (file, image) => image.id,
        attributes: [],
        included: true,
        typeForAttribute: function() {
          return 'files'
        }
      }
    });

    this.deserializer = new Deserializer({
      files: {
        valueForRelationship: function (relationship) {
          return new File({
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
        if (data.image instanceof File) {
          serialized.data.relationships.image.data.type = 'files';
        }
        return serialized;
    }

    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
            //
        });
  }
};

export default WidgetCustomSerializer;
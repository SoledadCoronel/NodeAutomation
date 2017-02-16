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
            'file'
      ],
      file: {
        ref: (widgetCustom, file) => file.id,
        attributes: ['name'],
        included: true
      }
    });

    this.deserializer = new Deserializer({
      galleries: {
        valueForRelationship: function (relationship) {
          return new Gallery({
            id: relationship.id,
          });
        }
      },
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
        return serialized;
    }

    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
            //
        });
  }
};

export default WidgetCustomSerializer;